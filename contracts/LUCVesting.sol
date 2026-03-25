// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title LUCVesting
 * @dev Token vesting contract for LUC token distribution
 * 
 * Features:
 * - Linear vesting over time
 * - Optional cliff period
 * - Revocable by owner (for team tokens)
 * - Claim any time after vesting starts
 */
contract LUCVesting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    struct VestingSchedule {
        uint256 totalAmount;      // Total tokens to vest
        uint256 startTime;        // Vesting start timestamp
        uint256 cliffDuration;    // Cliff period in seconds
        uint256 vestingDuration;  // Total vesting duration in seconds
        uint256 releasedAmount;   // Already released tokens
        bool revocable;           // Can be revoked by owner
        bool revoked;             // Has been revoked
    }

    mapping(address => VestingSchedule) public vestingSchedules;
    
    event VestingCreated(
        address indexed beneficiary,
        uint256 amount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration
    );
    
    event TokensReleased(address indexed beneficiary, uint256 amount);
    event VestingRevoked(address indexed beneficiary, uint256 amountRevoked);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Token address cannot be zero");
        token = IERC20(_token);
    }

    /**
     * @dev Creates a vesting schedule for a beneficiary
     */
    function createVesting(
        address beneficiary,
        uint256 amount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool revocable
    ) external onlyOwner {
        require(beneficiary != address(0), "Beneficiary cannot be zero");
        require(amount > 0, "Amount must be greater than 0");
        require(vestingDuration > 0, "Duration must be greater than 0");
        require(vestingSchedules[beneficiary].totalAmount == 0, "Vesting already exists");

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            startTime: startTime,
            cliffDuration: cliffDuration,
            vestingDuration: vestingDuration,
            releasedAmount: 0,
            revocable: revocable,
            revoked: false
        });

        token.safeTransferFrom(msg.sender, address(this), amount);

        emit VestingCreated(
            beneficiary,
            amount,
            startTime,
            cliffDuration,
            vestingDuration
        );
    }

    /**
     * @dev Calculates the amount that has vested for a beneficiary
     */
    function vestedAmount(address beneficiary) public view returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        
        if (schedule.revoked) {
            return schedule.releasedAmount;
        }

        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0;
        }

        if (block.timestamp >= schedule.startTime + schedule.vestingDuration) {
            return schedule.totalAmount;
        }

        uint256 timeFromStart = block.timestamp - schedule.startTime;
        return (schedule.totalAmount * timeFromStart) / schedule.vestingDuration;
    }

    /**
     * @dev Returns the amount that can be released now
     */
    function releasableAmount(address beneficiary) public view returns (uint256) {
        return vestedAmount(beneficiary) - vestingSchedules[beneficiary].releasedAmount;
    }

    /**
     * @dev Releases vested tokens to the beneficiary
     */
    function release() external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(!schedule.revoked, "Vesting revoked");

        uint256 releasable = releasableAmount(msg.sender);
        require(releasable > 0, "No tokens to release");

        schedule.releasedAmount += releasable;
        token.safeTransfer(msg.sender, releasable);

        emit TokensReleased(msg.sender, releasable);
    }

    /**
     * @dev Revokes the vesting schedule (only for revocable schedules)
     */
    function revoke(address beneficiary) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        require(schedule.revocable, "Vesting is not revocable");
        require(!schedule.revoked, "Already revoked");

        uint256 vested = vestedAmount(beneficiary);
        uint256 unreleased = vested - schedule.releasedAmount;
        uint256 refund = schedule.totalAmount - vested;

        schedule.revoked = true;

        if (unreleased > 0) {
            schedule.releasedAmount += unreleased;
            token.safeTransfer(beneficiary, unreleased);
        }

        if (refund > 0) {
            token.safeTransfer(owner(), refund);
        }

        emit VestingRevoked(beneficiary, refund);
    }

    /**
     * @dev Returns vesting schedule info for a beneficiary
     */
    function getVestingInfo(address beneficiary) external view returns (
        uint256 totalAmount,
        uint256 releasedAmount,
        uint256 vestedNow,
        uint256 releasableNow,
        bool revoked
    ) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        return (
            schedule.totalAmount,
            schedule.releasedAmount,
            vestedAmount(beneficiary),
            releasableAmount(beneficiary),
            schedule.revoked
        );
    }
}
