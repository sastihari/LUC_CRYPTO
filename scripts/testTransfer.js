// Test transfer: send 1000 LUC from deployer to GAYU wallet
const { ethers } = require("ethers");
require("dotenv").config({ path: ".env.hardhat" });

const CONTRACT_ADDRESS = "0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75";
const TO_ADDRESS = "0x7b3254fb786e4E2c2a2BC43140f24f672f0A734C"; // GAYU
const AMOUNT = ethers.parseUnits("1000", 18); // 1000 LUC

const ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function symbol() view returns (string)",
];

async function main() {
  const provider = new ethers.JsonRpcProvider("https://sepolia.drpc.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const token = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const symbol = await token.symbol();
  const beforeFrom = await token.balanceOf(wallet.address);
  const beforeTo = await token.balanceOf(TO_ADDRESS);

  console.log(`Token: ${symbol}`);
  console.log(`From (LUC wallet):  ${ethers.formatUnits(beforeFrom, 18)} ${symbol}`);
  console.log(`To   (GAYU wallet): ${ethers.formatUnits(beforeTo, 18)} ${symbol}`);
  console.log(`\nSending 1000 ${symbol} to ${TO_ADDRESS}...`);

  const tx = await token.transfer(TO_ADDRESS, AMOUNT);
  console.log(`TX sent: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);
  await tx.wait();

  const afterFrom = await token.balanceOf(wallet.address);
  const afterTo = await token.balanceOf(TO_ADDRESS);

  console.log(`\nDone!`);
  console.log(`From (LUC wallet):  ${ethers.formatUnits(afterFrom, 18)} ${symbol}`);
  console.log(`To   (GAYU wallet): ${ethers.formatUnits(afterTo, 18)} ${symbol}`);
  console.log(`\nView TX: https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main().catch(console.error);
