// One-time script: transfer Sepolia ETH from old wallet to MetaMask wallet
// Run: node scripts/transferSepolia.js
const { ethers } = require("ethers");

const OLD_WALLET_KEY = "33f4d9151f7f63f975af152dc154e99a2618ae08cbabc7a5c2940d5349efb160";
const TO_ADDRESS     = "0x856703bf834753Bafc87F5712c3239061a314272";

// Try multiple public RPCs in order
const RPCS = [
  "https://eth-sepolia.public.blastapi.io",
  "https://rpc2.sepolia.org",
  "https://rpc.sepolia.org",
  "https://sepolia.drpc.org",
];

async function main() {
  let provider;
  for (const rpc of RPCS) {
    try {
      console.log(`Trying RPC: ${rpc}`);
      const p = new ethers.JsonRpcProvider(rpc);
      await p.getBlockNumber(); // quick connectivity test
      provider = p;
      console.log(`Connected to: ${rpc}`);
      break;
    } catch (e) {
      console.log(`  Failed: ${e.message.slice(0, 60)}`);
    }
  }

  if (!provider) {
    console.error("All RPCs failed. Try adding an Alchemy key to .env.hardhat");
    process.exit(1);
  }

  const wallet = new ethers.Wallet(OLD_WALLET_KEY, provider);
  console.log(`From: ${wallet.address}`);
  console.log(`To:   ${TO_ADDRESS}`);

  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.error("Balance is 0. Nothing to transfer.");
    process.exit(1);
  }

  // Estimate gas and send max balance minus fee
  const feeData = await provider.getFeeData();
  const gasLimit = 21000n;
  const gasCost = gasLimit * (feeData.gasPrice || ethers.parseUnits("10", "gwei"));
  const sendAmount = balance - gasCost;

  if (sendAmount <= 0n) {
    console.error("Not enough to cover gas.");
    process.exit(1);
  }

  console.log(`Sending: ${ethers.formatEther(sendAmount)} ETH (minus gas)`);

  const tx = await wallet.sendTransaction({
    to: TO_ADDRESS,
    value: sendAmount,
    gasLimit,
    gasPrice: feeData.gasPrice,
  });

  console.log(`TX sent! Hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  await tx.wait();
  console.log(`Done! Sepolia ETH transferred to ${TO_ADDRESS}`);
  console.log(`View: https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main().catch(console.error);
