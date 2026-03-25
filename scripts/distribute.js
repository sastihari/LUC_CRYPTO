const hre = require("hardhat");

/**
 * Script to set up token distribution according to PROD tokenomics
 * 
 * Distribution:
 * 45% Community & Ecosystem - 450,000,000 LUC
 * 15% Team - 150,000,000 LUC (4-year vesting, 1-year cliff)
 * 20% Development Fund - 200,000,000 LUC
 * 15% Initial Liquidity - 150,000,000 LUC
 * 5% Advisors - 50,000,000 LUC (2-year vesting)
 */

async function main() {
  console.log("🔥 LUC Token Distribution Setup\n");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deployer address:", deployer.address);
  
  // Token contract address (update after deployment)
  const TOKEN_ADDRESS = process.env.LUC_TOKEN_ADDRESS || "UPDATE_THIS";
  
  // Distribution addresses (update with actual multi-sig addresses)
  const ADDRESSES = {
    community: process.env.COMMUNITY_ADDRESS || "UPDATE_THIS",
    team: process.env.TEAM_ADDRESS || "UPDATE_THIS",
    development: process.env.DEV_FUND_ADDRESS || "UPDATE_THIS",
    liquidity: process.env.LIQUIDITY_ADDRESS || "UPDATE_THIS",
    advisors: process.env.ADVISORS_ADDRESS || "UPDATE_THIS"
  };
  
  // Distribution amounts (in tokens, will multiply by 10^18)
  const DISTRIBUTION = {
    community: 450_000_000n,      // 45%
    team: 150_000_000n,           // 15%
    development: 200_000_000n,    // 20%
    liquidity: 150_000_000n,      // 15%
    advisors: 50_000_000n         // 5%
  };
  
  const DECIMALS = 10n ** 18n;
  
  console.log("\n📊 Planned Distribution:");
  console.log("========================");
  for (const [name, amount] of Object.entries(DISTRIBUTION)) {
    console.log(`${name}: ${amount.toLocaleString()} LUC (${Number(amount) / 10_000_000}%)`);
  }
  
  // Check if addresses are configured
  const hasPlaceholders = Object.values(ADDRESSES).some(addr => addr === "UPDATE_THIS");
  
  if (hasPlaceholders) {
    console.log("\n⚠️  WARNING: Distribution addresses not configured!");
    console.log("Please update the following in .env or this script:");
    for (const [name, addr] of Object.entries(ADDRESSES)) {
      if (addr === "UPDATE_THIS") {
        console.log(`  - ${name.toUpperCase()}_ADDRESS`);
      }
    }
    console.log("\n📝 Generating distribution commands for later use...\n");
    
    // Generate commands for manual execution
    console.log("// Commands to run after setting up addresses:");
    console.log("// ============================================\n");
    
    for (const [name, amount] of Object.entries(DISTRIBUTION)) {
      const amountWithDecimals = (amount * DECIMALS).toString();
      console.log(`// Transfer to ${name}:`);
      console.log(`// await token.transfer("${name}_ADDRESS", "${amountWithDecimals}");`);
      console.log();
    }
    
    return;
  }
  
  // If addresses are configured, execute distribution
  console.log("\n🚀 Executing distribution...\n");
  
  const token = await hre.ethers.getContractAt("LuciferToken", TOKEN_ADDRESS);
  
  for (const [name, amount] of Object.entries(DISTRIBUTION)) {
    const address = ADDRESSES[name];
    const amountWithDecimals = amount * DECIMALS;
    
    console.log(`Transferring ${amount.toLocaleString()} LUC to ${name}...`);
    
    const tx = await token.transfer(address, amountWithDecimals);
    await tx.wait();
    
    console.log(`  ✅ Done! TX: ${tx.hash}`);
  }
  
  console.log("\n✅ Distribution complete!");
  
  // Verify balances
  console.log("\n📊 Final balances:");
  for (const [name, address] of Object.entries(ADDRESSES)) {
    const balance = await token.balanceOf(address);
    console.log(`  ${name}: ${hre.ethers.formatEther(balance)} LUC`);
  }
  
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log(`  deployer: ${hre.ethers.formatEther(deployerBalance)} LUC`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
