// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title LuciferToken
 * @author LUCIFER Development Team
 * @notice ERC-20 token with fixed supply, designed for longevity and security
 * @dev This is a simple, secure ERC-20 token with the following properties:
 *      - Fixed supply of 1 billion tokens, minted at deployment to deployer
 *      - No additional minting capability (supply is immutable)
 *      - No burning capability (to maintain simplicity)
 *      - No pause functionality (to prevent admin abuse)
 *      - No blacklist functionality (to maintain decentralization)
 *      - No owner/admin role (truly decentralized after deployment)
 *      - Standard 18 decimals
 *      - Built on OpenZeppelin ERC20 for security
 * 
 * SECURITY NOTES:
 *      - Uses Solidity 0.8+ with built-in overflow protection
 *      - Inherits battle-tested OpenZeppelin ERC20 implementation
 *      - Minimal attack surface due to simple design
 *      - No external calls that could introduce reentrancy risks
 *      - Immutable after deployment - code cannot be changed
 * 
 * TOKENOMICS:
 *      - Total Supply: 1,000,000,000 LUC (1 billion)
 *      - Distribution: 45% Community, 20% Development, 15% Team, 15% Liquidity, 5% Advisors
 *      - Team tokens subject to 4-year vesting with 1-year cliff (separate contract)
 * 
 * AUDIT INFORMATION:
 *      - Audit Status: Pending
 *      - Complexity: Low (inherits only from standard ERC20)
 *      - Lines of Code: ~30 (excluding comments)
 *      - External Dependencies: OpenZeppelin Contracts v5.0+
 */
contract LuciferToken is ERC20 {
    /**
     * @notice The fixed total supply of LUC tokens
     * @dev Equals 1 billion tokens with 18 decimals
     *      Calculation: 1,000,000,000 * 10^18 = 1e27 wei
     */
    uint256 private constant TOTAL_SUPPLY = 1_000_000_000 * 10**18;

    /**
     * @notice Creates the LuciferToken and mints entire supply to deployer
     * @dev Constructor is called once at deployment and:
     *      1. Sets token name to "LUCIFER"
     *      2. Sets token symbol to "LUC"
     *      3. Mints entire 1 billion supply to msg.sender
     * 
     *      After deployment, the deployer should distribute tokens
     *      according to the tokenomics plan using separate transactions.
     * 
     *      This constructor has no parameters to ensure deterministic deployment.
     */
    constructor() ERC20("LUCIFER", "LUC") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    /**
     * @notice Returns the number of decimals used for display purposes
     * @dev Overrides ERC20 default of 18 to explicitly confirm 18 decimals
     *      This is the standard for most ERC-20 tokens including USDT, USDC, etc.
     * @return uint8 Always returns 18
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }

    // ============================================================
    // INTENTIONALLY OMITTED FUNCTIONS (Security by Simplicity)
    // ============================================================
    //
    // The following functions are intentionally NOT included:
    //
    // 1. mint() - No additional tokens can ever be created
    //    Reason: Fixed supply protects against inflation
    //
    // 2. burn() - Token holders cannot destroy tokens
    //    Reason: Simplicity; can add via separate contract if needed
    //
    // 3. pause() / unpause() - Contract cannot be paused
    //    Reason: No admin control after deployment
    //
    // 4. blacklist() - No addresses can be blocked
    //    Reason: Maintains decentralization principles
    //
    // 5. owner() / transferOwnership() - No owner role exists
    //    Reason: Truly decentralized, no single point of control
    //
    // 6. upgradeTo() - Contract is not upgradeable
    //    Reason: Immutability ensures code cannot change
    //
    // ============================================================
}
