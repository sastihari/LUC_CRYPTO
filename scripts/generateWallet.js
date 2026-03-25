const { ethers } = require("ethers");
const fs = require("fs");
const crypto = require("crypto");

/**
 * SECURE WALLET GENERATOR
 * 
 * ⚠️ SECURITY NOTES:
 * - This wallet is for TESTNET ONLY
 * - For MAINNET, use hardware wallet (Ledger/Trezor)
 * - NEVER share private keys
 * - Store seed phrase on paper, not digitally
 */

console.log("🔐 LUC Token - Secure Wallet Generator\n");
console.log("═".repeat(60));

// Generate cryptographically secure wallet
const wallet = ethers.Wallet.createRandom();

console.log("\n⚠️  SECURITY WARNING ⚠️");
console.log("─".repeat(60));
console.log("This wallet is for MUMBAI TESTNET ONLY!");
console.log("For MAINNET with real funds:");
console.log("  → Use a hardware wallet (Ledger/Trezor)");
console.log("  → Or generate wallet in MetaMask directly");
console.log("─".repeat(60));

console.log("\n📋 WALLET INFORMATION");
console.log("═".repeat(60));
console.log("\n🏠 Address:");
console.log(`   ${wallet.address}`);

console.log("\n🔑 Private Key (KEEP SECRET!):");
console.log(`   ${wallet.privateKey}`);

console.log("\n📝 Mnemonic Phrase (BACKUP THIS!):");
console.log(`   ${wallet.mnemonic.phrase}`);

console.log("\n═".repeat(60));

// Create secure .env file
const envContent = `# LUC Token Deployment Configuration
# Generated: ${new Date().toISOString()}
# ⚠️ THIS IS FOR MUMBAI TESTNET ONLY!

# Wallet Configuration
PRIVATE_KEY=${wallet.privateKey.slice(2)}
DEPLOYER_ADDRESS=${wallet.address}

# Network Configuration
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com

# PolygonScan API (get from https://polygonscan.com/apis)
POLYGONSCAN_API_KEY=

# Gas Settings
REPORT_GAS=true

# ⚠️ SECURITY REMINDERS:
# 1. NEVER commit this file to git
# 2. NEVER share your private key
# 3. For MAINNET, use a hardware wallet
# 4. This testnet wallet has no real value
`;

fs.writeFileSync(".env.hardhat", envContent);
console.log("\n✅ Wallet configured in .env.hardhat");

// Create backup file (encrypted concept)
const backupContent = `# LUC WALLET BACKUP
# Generated: ${new Date().toISOString()}
# ⚠️ STORE THIS SECURELY - PREFERABLY ON PAPER!

═══════════════════════════════════════════════════════════
                    TESTNET WALLET BACKUP
═══════════════════════════════════════════════════════════

🏠 WALLET ADDRESS:
${wallet.address}

🔑 PRIVATE KEY:
${wallet.privateKey}

📝 MNEMONIC PHRASE (12 words):
${wallet.mnemonic.phrase}

═══════════════════════════════════════════════════════════
                    SECURITY INSTRUCTIONS
═══════════════════════════════════════════════════════════

1. WRITE DOWN the mnemonic phrase on paper
2. STORE paper in safe location (fireproof safe)
3. NEVER store digitally (no photos, no cloud)
4. NEVER share with anyone
5. This testnet wallet is for testing ONLY
6. For MAINNET: Use hardware wallet!

═══════════════════════════════════════════════════════════
                    NEXT STEPS
═══════════════════════════════════════════════════════════

1. Copy wallet address: ${wallet.address}

2. Get Mumbai MATIC from faucet:
   https://faucet.polygon.technology/
   
3. Deploy contract:
   npx hardhat run scripts/deploy.js --network mumbai

═══════════════════════════════════════════════════════════
`;

fs.writeFileSync("WALLET_BACKUP.txt", backupContent);
console.log("✅ Backup saved to WALLET_BACKUP.txt");
console.log("\n⚠️  DELETE THIS FILE AFTER WRITING DOWN THE MNEMONIC!");

console.log("\n" + "═".repeat(60));
console.log("📋 WHAT TO DO NEXT:");
console.log("═".repeat(60));
console.log("\n1️⃣  Copy this address:");
console.log(`    ${wallet.address}`);
console.log("\n2️⃣  Get Mumbai MATIC from faucet:");
console.log("    https://faucet.polygon.technology/");
console.log("\n3️⃣  Wait for MATIC to arrive (1-2 minutes)");
console.log("\n4️⃣  Deploy with:");
console.log("    npx hardhat run scripts/deploy.js --network mumbai");
console.log("\n" + "═".repeat(60));
console.log("🔐 Wallet ready for Mumbai testnet deployment!");
console.log("═".repeat(60) + "\n");
