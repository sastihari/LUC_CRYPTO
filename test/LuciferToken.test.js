const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuciferToken", function () {
  let token;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const TOTAL_SUPPLY = ethers.parseEther("1000000000"); // 1 billion tokens

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy contract
    const LuciferToken = await ethers.getContractFactory("LuciferToken");
    token = await LuciferToken.deploy();
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name", async function () {
      expect(await token.name()).to.equal("LUCIFER");
    });

    it("Should set the correct symbol", async function () {
      expect(await token.symbol()).to.equal("LUC");
    });

    it("Should set the correct decimals", async function () {
      expect(await token.decimals()).to.equal(18);
    });

    it("Should mint total supply to deployer", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(TOTAL_SUPPLY);
    });

    it("Should have correct total supply", async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.equal(TOTAL_SUPPLY);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.parseEther("100");
      
      await token.transfer(addr1.address, amount);
      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const tooMuch = initialOwnerBalance + 1n;
      
      await expect(
        token.connect(addr1).transfer(owner.address, tooMuch)
      ).to.be.reverted;
    });

    it("Should update balances after transfers", async function () {
      const amount = ethers.parseEther("100");
      
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, amount);
      await token.transfer(addr2.address, amount);
      
      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - (amount * 2n));
      
      expect(await token.balanceOf(addr1.address)).to.equal(amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should emit Transfer event", async function () {
      const amount = ethers.parseEther("100");
      
      await expect(token.transfer(addr1.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, amount);
    });
  });

  describe("Allowances", function () {
    it("Should approve tokens for delegated transfer", async function () {
      const amount = ethers.parseEther("100");
      
      await token.approve(addr1.address, amount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("Should allow delegated transfer", async function () {
      const amount = ethers.parseEther("100");
      
      await token.approve(addr1.address, amount);
      await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
      
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should fail delegated transfer if not approved", async function () {
      const amount = ethers.parseEther("100");
      
      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
      ).to.be.reverted;
    });

    it("Should emit Approval event", async function () {
      const amount = ethers.parseEther("100");
      
      await expect(token.approve(addr1.address, amount))
        .to.emit(token, "Approval")
        .withArgs(owner.address, addr1.address, amount);
    });
  });

  describe("Supply", function () {
    it("Should have fixed total supply", async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.equal(TOTAL_SUPPLY);
      
      // Transfer some tokens
      await token.transfer(addr1.address, ethers.parseEther("1000"));
      
      // Total supply should remain same
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it("Should not allow minting", async function () {
      // Contract has no mint function
      expect(token.mint).to.be.undefined;
    });

    it("Should not allow burning (initially)", async function () {
      // Contract has no burn function initially
      expect(token.burn).to.be.undefined;
    });
  });

  describe("Security", function () {
    it("Should prevent integer overflow", async function () {
      // Solidity 0.8+ has built-in overflow protection
      const maxUint256 = 2n ** 256n - 1n;
      
      await expect(
        token.transfer(addr1.address, maxUint256)
      ).to.be.reverted;
    });

    it("Should not have admin functions", async function () {
      expect(token.pause).to.be.undefined;
      expect(token.unpause).to.be.undefined;
      expect(token.blacklist).to.be.undefined;
      expect(token.setFee).to.be.undefined;
    });
  });

  describe("Gas Efficiency", function () {
    it("Should have reasonable transfer gas cost", async function () {
      const amount = ethers.parseEther("100");
      const tx = await token.transfer(addr1.address, amount);
      const receipt = await tx.wait();
      
      // Transfer should cost less than 100k gas
      expect(receipt.gasUsed).to.be.below(100000n);
    });
  });

  describe("ERC20 Compliance", function () {
    it("Should implement totalSupply()", async function () {
      expect(await token.totalSupply()).to.be.a('bigint');
    });

    it("Should implement balanceOf()", async function () {
      expect(await token.balanceOf(owner.address)).to.be.a('bigint');
    });

    it("Should implement transfer()", async function () {
      const amount = ethers.parseEther("1");
      await expect(token.transfer(addr1.address, amount))
        .to.emit(token, "Transfer");
    });

    it("Should implement approve()", async function () {
      const amount = ethers.parseEther("1");
      await expect(token.approve(addr1.address, amount))
        .to.emit(token, "Approval");
    });

    it("Should implement transferFrom()", async function () {
      const amount = ethers.parseEther("1");
      await token.approve(addr1.address, amount);
      
      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
      ).to.emit(token, "Transfer");
    });

    it("Should implement allowance()", async function () {
      expect(await token.allowance(owner.address, addr1.address))
        .to.be.a('bigint');
    });
  });
});
