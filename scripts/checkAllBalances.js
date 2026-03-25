const { ethers } = require("ethers");
require('dotenv').config({ path: '.env.hardhat' });

const WALLET = process.env.DEPLOYER_ADDRESS || "0x856703bf834753Bafc87F5712c3239061a314272";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

const NETWORKS = [
  {
    name: "Ethereum Sepolia",
    rpcs: [
      process.env.SEPOLIA_RPC_URL,
      "https://1rpc.io/sepolia",
      "https://sepolia.drpc.org",
    ].filter(Boolean),
    native: "ETH",
    explorer: "https://sepolia.etherscan.io",
    luc: "0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75"
  },
  {
    name: "Polygon Amoy",
    rpcs: [
      process.env.AMOY_RPC_URL,
      "https://rpc-amoy.polygon.technology",
      "https://polygon-amoy.drpc.org",
    ].filter(Boolean),
    native: "POL",
    explorer: "https://amoy.polygonscan.com",
    luc: "0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63"
  },
  {
    name: "BNB Chain Testnet",
    rpcs: [
      process.env.BSC_TESTNET_RPC_URL,
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://data-seed-prebsc-2-s1.binance.org:8545",
    ].filter(Boolean),
    native: "tBNB",
    explorer: "https://testnet.bscscan.com",
    luc: null
  }
];

async function getProvider(rpcs) {
  for (const rpc of rpcs) {
    try {
      const provider = new ethers.JsonRpcProvider(rpc);
      await provider.getBlockNumber();
      return provider;
    } catch {
      // try next
    }
  }
  return null;
}

async function check() {
  console.log("\n" + "═".repeat(60));
  console.log("  LUC PROJECT — MULTI-NETWORK BALANCE CHECK");
  console.log("═".repeat(60));
  console.log(`  Wallet: ${WALLET}\n`);

  for (const net of NETWORKS) {
    console.log(`\n🌐  ${net.name}`);

    const provider = await getProvider(net.rpcs);

    if (!provider) {
      console.log(`    ⚠️  All RPCs failed — try again later or add Alchemy key to .env.hardhat`);
      continue;
    }

    try {
      // Native balance
      const native = await provider.getBalance(WALLET);
      const nativeFmt = parseFloat(ethers.formatEther(native)).toFixed(6);
      const nativeOk = parseFloat(nativeFmt) > 0;
      console.log(`    ${nativeOk ? "✅" : "❌"} ${net.native} (gas): ${nativeFmt}`);

      // LUC balance
      if (net.luc) {
        try {
          const luc = new ethers.Contract(net.luc, ERC20_ABI, provider);
          const lucBal = await luc.balanceOf(WALLET);
          const lucFmt = parseFloat(ethers.formatEther(lucBal)).toLocaleString();
          const lucOk = parseFloat(ethers.formatEther(lucBal)) > 0;
          console.log(`    ${lucOk ? "✅" : "❌"} LUC token:   ${lucFmt}`);
          console.log(`    📄 Contract: ${net.luc}`);
        } catch {
          console.log(`    ⚠️  LUC:       Could not fetch token balance`);
        }
      }

      console.log(`    🔗 ${net.explorer}/address/${WALLET}`);
    } catch (e) {
      console.log(`    ⚠️  Error: ${e.message.slice(0, 80)}`);
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log("  DEPLOYMENT STATUS");
  console.log("  Sepolia LUC : 0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75 ✅");
  console.log("  Amoy LUC    : 0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63 ✅");
  console.log("  BNB Testnet : not deployed yet");
  console.log("═".repeat(60) + "\n");
}

check().catch(console.error);
