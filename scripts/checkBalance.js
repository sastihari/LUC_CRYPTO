const { ethers } = require("ethers");

const WALLET_ADDRESS = "0x856703bf834753Bafc87F5712c3239061a314272";

const networks = [
  {
    name: "Polygon Amoy (Primary Target)",
    rpc: "https://rpc-amoy.polygon.technology",
    explorer: "https://amoy.polygonscan.com",
    symbol: "POL",
    minRequired: 0.1,
    faucet: "https://faucets.chain.link/polygon-amoy  (GitHub login)"
  },
  {
    name: "Sepolia (Ethereum Testnet)",
    rpc: "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io",
    symbol: "ETH",
    minRequired: 0.05,
    faucet: "https://www.alchemy.com/faucets/ethereum-sepolia  (free account)"
  },
  {
    name: "BSC Testnet (Easiest faucet)",
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
    explorer: "https://testnet.bscscan.com",
    symbol: "tBNB",
    minRequired: 0.05,
    faucet: "https://testnet.bnbchain.org/faucet-smart  (no auth needed)"
  }
];

async function checkBalance() {
  console.log("🔍 LUC Token — Testnet Wallet Balance Check");
  console.log("═".repeat(60));
  console.log(`📋 Wallet: ${WALLET_ADDRESS}`);
  console.log("═".repeat(60));

  let funded = [];

  for (const network of networks) {
    try {
      const provider = new ethers.JsonRpcProvider(network.rpc);
      const balance = await provider.getBalance(WALLET_ADDRESS);
      const formatted = ethers.formatEther(balance);
      const amount = parseFloat(formatted);

      console.log(`\n🌐 ${network.name}`);
      console.log(`   💰 Balance: ${formatted} ${network.symbol}`);
      console.log(`   🔗 ${network.explorer}/address/${WALLET_ADDRESS}`);

      if (amount >= network.minRequired) {
        console.log(`   ✅ READY TO DEPLOY!`);
        funded.push(network);
      } else if (amount > 0) {
        console.log(`   ⚠️  Low balance (need ${network.minRequired} ${network.symbol})`);
        console.log(`   💧 Faucet: ${network.faucet}`);
      } else {
        console.log(`   ❌ No balance`);
        console.log(`   💧 Faucet: ${network.faucet}`);
      }
    } catch (err) {
      console.log(`\n🌐 ${network.name}`);
      console.log(`   ⚠️  RPC error: ${err.message.slice(0, 50)}`);
    }
  }

  console.log("\n" + "═".repeat(60));

  if (funded.length > 0) {
    console.log("\n🚀 DEPLOY COMMANDS (funded networks):");
    for (const n of funded) {
      const flag = n.name.includes("Amoy") ? "amoy" :
                   n.name.includes("Sepolia") ? "sepolia" : "bscTestnet";
      console.log(`   npx hardhat run scripts/deploy.js --network ${flag}`);
    }
  } else {
    console.log("\n📋 NEXT STEP — Get testnet tokens:");
    console.log("   Easiest:  https://testnet.bnbchain.org/faucet-smart  (BSC, no auth)");
    console.log("   Polygon:  https://faucets.chain.link/polygon-amoy  (GitHub login)");
    console.log("   Sepolia:  https://www.alchemy.com/faucets/ethereum-sepolia");
    console.log(`\n   Address to paste: ${WALLET_ADDRESS}`);
  }
  console.log();
}

checkBalance().catch(console.error);
