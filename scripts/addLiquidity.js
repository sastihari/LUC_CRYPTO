const hre = require("hardhat");

/**
 * Script to add initial liquidity to QuickSwap (Polygon DEX)
 * 
 * This script:
 * 1. Approves router to spend LUC tokens
 * 2. Adds liquidity to LUC/MATIC pair
 * 
 * Note: For mainnet, use proper slippage protection!
 */

// QuickSwap Router addresses
const QUICKSWAP_ROUTER = {
  mumbai: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // Same as mainnet
  polygon: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"
};

// Router ABI (minimal, just what we need)
const ROUTER_ABI = [
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
  "function factory() external view returns (address)"
];

async function main() {
  console.log("💧 LUC Token - Add Liquidity to QuickSwap\n");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deployer address:", deployer.address);
  
  const network = hre.network.name;
  console.log("🌐 Network:", network);
  
  // Configuration
  const TOKEN_ADDRESS = process.env.LUC_TOKEN_ADDRESS || "UPDATE_THIS";
  const ROUTER_ADDRESS = QUICKSWAP_ROUTER[network] || QUICKSWAP_ROUTER.polygon;
  
  // Liquidity amounts (adjust as needed)
  const TOKEN_AMOUNT = hre.ethers.parseEther("10000000"); // 10M LUC
  const MATIC_AMOUNT = hre.ethers.parseEther("1000");     // 1000 MATIC
  
  if (TOKEN_ADDRESS === "UPDATE_THIS") {
    console.log("\n⚠️  Please set LUC_TOKEN_ADDRESS in .env");
    console.log("\nExample usage:");
    console.log("  LUC_TOKEN_ADDRESS=0x123... npx hardhat run scripts/addLiquidity.js --network mumbai");
    return;
  }
  
  console.log("\n📊 Liquidity Parameters:");
  console.log(`  Token: ${hre.ethers.formatEther(TOKEN_AMOUNT)} LUC`);
  console.log(`  MATIC: ${hre.ethers.formatEther(MATIC_AMOUNT)} MATIC`);
  console.log(`  Router: ${ROUTER_ADDRESS}`);
  
  // Get contracts
  const token = await hre.ethers.getContractAt("LuciferToken", TOKEN_ADDRESS);
  const router = new hre.ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, deployer);
  
  // Check balances
  const tokenBalance = await token.balanceOf(deployer.address);
  const maticBalance = await hre.ethers.provider.getBalance(deployer.address);
  
  console.log("\n💰 Your balances:");
  console.log(`  LUC: ${hre.ethers.formatEther(tokenBalance)}`);
  console.log(`  MATIC: ${hre.ethers.formatEther(maticBalance)}`);
  
  if (tokenBalance < TOKEN_AMOUNT) {
    console.log("\n❌ Insufficient LUC balance!");
    return;
  }
  
  if (maticBalance < MATIC_AMOUNT) {
    console.log("\n❌ Insufficient MATIC balance!");
    return;
  }
  
  // Step 1: Approve router
  console.log("\n🔓 Approving router to spend tokens...");
  const approveTx = await token.approve(ROUTER_ADDRESS, TOKEN_AMOUNT);
  await approveTx.wait();
  console.log("  ✅ Approved!");
  
  // Step 2: Add liquidity
  console.log("\n💧 Adding liquidity...");
  
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
  
  const tx = await router.addLiquidityETH(
    TOKEN_ADDRESS,
    TOKEN_AMOUNT,
    TOKEN_AMOUNT * 95n / 100n,  // 5% slippage for token
    MATIC_AMOUNT * 95n / 100n,  // 5% slippage for MATIC
    deployer.address,
    deadline,
    { value: MATIC_AMOUNT }
  );
  
  console.log("  ⏳ Transaction submitted:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("  ✅ Liquidity added successfully!");
  console.log("  📝 Block:", receipt.blockNumber);
  
  // Get pair address
  console.log("\n🔍 Finding pair address...");
  const factoryAddress = await router.factory();
  const factory = await hre.ethers.getContractAt(
    ["function getPair(address, address) view returns (address)"],
    factoryAddress
  );
  
  const WMATIC = network === "mumbai" 
    ? "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" 
    : "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    
  const pairAddress = await factory.getPair(TOKEN_ADDRESS, WMATIC);
  
  console.log("\n✅ Liquidity Pool Created!");
  console.log("========================");
  console.log(`  Token: ${TOKEN_ADDRESS}`);
  console.log(`  Pair: ${pairAddress}`);
  console.log(`  Router: ${ROUTER_ADDRESS}`);
  
  console.log("\n📊 Next steps:");
  console.log("  1. Lock LP tokens for safety");
  console.log("  2. Add to token info (CoinGecko, etc.)");
  console.log("  3. Share pool address with community");
  
  // Save liquidity info
  const fs = require('fs');
  const liquidityInfo = {
    network: network,
    token: TOKEN_ADDRESS,
    pair: pairAddress,
    router: ROUTER_ADDRESS,
    tokenAmount: TOKEN_AMOUNT.toString(),
    maticAmount: MATIC_AMOUNT.toString(),
    timestamp: new Date().toISOString(),
    txHash: tx.hash
  };
  
  fs.writeFileSync(
    `liquidity-${network}.json`,
    JSON.stringify(liquidityInfo, null, 2)
  );
  
  console.log(`\n💾 Info saved to: liquidity-${network}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
