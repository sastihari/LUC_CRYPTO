const hre = require("hardhat");

async function main() {
  console.log("🔥 Deploying LUCIFER (LUC) Token...\n");
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deploying from address:", deployer.address);
  
  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "MATIC\n");
  
  // Deploy contract
  console.log("🚀 Deploying LuciferToken contract...");
  const LuciferToken = await hre.ethers.getContractFactory("LuciferToken");
  const token = await LuciferToken.deploy();
  
  await token.waitForDeployment();
  
  const tokenAddress = await token.getAddress();
  console.log("✅ LuciferToken deployed to:", tokenAddress);
  
  // Verify deployment
  const name = await token.name();
  const symbol = await token.symbol();
  const totalSupply = await token.totalSupply();
  const decimals = await token.decimals();
  
  console.log("\n📊 Token Info:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Decimals:", decimals);
  console.log("   Total Supply:", hre.ethers.formatEther(totalSupply), symbol);
  console.log("   Deployer Balance:", hre.ethers.formatEther(await token.balanceOf(deployer.address)), symbol);
  
  console.log("\n⚠️  IMPORTANT NEXT STEPS:");
  console.log("   1. Save contract address:", tokenAddress);
  console.log("   2. Verify contract on PolygonScan");
  console.log("   3. Transfer to multi-sig wallets per tokenomics");
  console.log("   4. Set up vesting contracts");
  console.log("   5. Provide initial liquidity");
  
  console.log("\n📝 Verification Command:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${tokenAddress}`);
  
  // Save deployment info
  const fs = require('fs');
  const deployment = {
    network: hre.network.name,
    contractAddress: tokenAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    tokenInfo: {
      name: name,
      symbol: symbol,
      decimals: Number(decimals),
      totalSupply: totalSupply.toString()
    }
  };
  
  fs.writeFileSync(
    `deployment-${hre.network.name}.json`,
    JSON.stringify(deployment, null, 2)
  );
  
  console.log(`\n💾 Deployment info saved to: deployment-${hre.network.name}.json`);
  console.log("\n🔥 Deployment complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
