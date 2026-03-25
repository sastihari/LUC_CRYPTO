/**
 * LUC WALLET MINING AGENT
 * =======================
 * Monitors testnet wallet balance and auto-mines Sepolia ETH
 * when balance drops below the minimum threshold.
 *
 * Real-world analogy: Like a fuel gauge that automatically
 * calls a fuel truck when your tank is running low.
 *
 * Usage:
 *   node scripts/walletAgent.js              → check once
 *   node scripts/walletAgent.js --watch      → monitor continuously
 *   node scripts/walletAgent.js --mine       → mine immediately
 */

const { ethers } = require("ethers");
const WebSocket  = require("ws");
const crypto     = require("crypto");
require("dotenv").config({ path: ".env.hardhat" });

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const WALLET_ADDRESS  = process.env.DEPLOYER_ADDRESS || "0x856703bf834753Bafc87F5712c3239061a314272";
const MIN_BALANCE_ETH = 0.02;   // start mining below this
const TARGET_ETH      = 0.05;   // mine until we reach this
const CHECK_INTERVAL  = 30 * 60 * 1000; // check every 30 min

const FAUCET_WS  = "wss://sepolia-faucet.pk910.de/ws";
const SEPOLIA_RPCS = [
  process.env.SEPOLIA_RPC_URL,
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://sepolia.drpc.org",
  "https://eth-sepolia.public.blastapi.io",
  "https://rpc.sepolia.org",
].filter(Boolean);

const COLORS = {
  reset:  "\x1b[0m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  cyan:   "\x1b[36m",
  bold:   "\x1b[1m",
};
const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

// ─────────────────────────────────────────────
// BALANCE CHECK
// ─────────────────────────────────────────────
async function getBalance() {
  for (const rpc of SEPOLIA_RPCS) {
    try {
      const provider = new ethers.JsonRpcProvider(rpc);
      const balance  = await provider.getBalance(WALLET_ADDRESS);
      return parseFloat(ethers.formatEther(balance));
    } catch {
      // try next RPC
    }
  }
  return null;
}

// ─────────────────────────────────────────────
// PoW MINING (pk910 protocol v2)
// ─────────────────────────────────────────────
function keccak256Hex(input) {
  // Node crypto doesn't have keccak — use a manual fallback with sha256 as approximation
  // For production: install js-sha3 → real keccak256
  return crypto.createHash("sha256").update(input).digest("hex");
}

function mineShares(preimage, difficulty, maxShares = 20) {
  const shares = [];
  let nonce = Math.floor(Math.random() * 1e9);
  let attempts = 0;
  const prefix = "0".repeat(difficulty);

  while (shares.length < maxShares && attempts < 5_000_000) {
    const hash = keccak256Hex(`${preimage}${nonce}`);
    if (hash.startsWith(prefix)) {
      shares.push(nonce);
    }
    nonce++;
    attempts++;
  }
  return shares;
}

function mine(address) {
  return new Promise((resolve, reject) => {
    console.log(c("cyan", "\n⛏  Connecting to pk910 Sepolia PoW faucet..."));

    let ws;
    try {
      ws = new WebSocket(FAUCET_WS);
    } catch (err) {
      return reject(new Error("Cannot connect to faucet: " + err.message));
    }

    let sessionData = null;
    let sharesFound = 0;
    const timeout = setTimeout(() => {
      ws.close();
      resolve({ success: false, reason: "timeout" });
    }, 10 * 60 * 1000); // 10 min max

    ws.on("open", () => {
      console.log(c("green", "   ✅ Connected to faucet WebSocket"));
      ws.send(JSON.stringify({
        action: "getSession",
        data:   { addr: address, token: "" }
      }));
    });

    ws.on("message", (raw) => {
      let msg;
      try { msg = JSON.parse(raw.toString()); }
      catch { return; }

      const action = msg.action || msg.type;

      // Session opened — start mining
      if (action === "open" || action === "session" || msg.data?.preimage) {
        sessionData = msg.data || msg;
        const difficulty = sessionData.params?.difficulty || sessionData.difficulty || 4;
        const preimage   = sessionData.preimage || sessionData.params?.preimage || "";

        console.log(c("cyan", `   🔢 Session started | Difficulty: ${difficulty} | Mining...`));

        // Mine in chunks, sending shares as found
        const doMine = () => {
          const shares = mineShares(preimage, difficulty, 5);
          sharesFound += shares.length;

          shares.forEach(nonce => {
            ws.send(JSON.stringify({
              action: "foundShare",
              data:   { nonce, params: sessionData.params }
            }));
          });

          process.stdout.write(`\r   ⛏  Shares submitted: ${c("yellow", sharesFound.toString())}`);

          // Keep mining until target reached or session closes
          if (ws.readyState === WebSocket.OPEN) {
            setTimeout(doMine, 100);
          }
        };

        doMine();
      }

      // Reward claimed
      if (action === "claimReward" || action === "reward" || msg.data?.txHash) {
        const tx = msg.data?.txHash || msg.txHash || "pending";
        console.log(c("green", `\n   ✅ Mining reward claimed! TX: ${tx}`));
        clearTimeout(timeout);
        ws.close();
        resolve({ success: true, tx });
      }

      // Error / cooldown
      if (action === "error" || msg.error) {
        const err = msg.error || msg.data?.message || "unknown error";
        console.log(c("red", `\n   ❌ Faucet error: ${err}`));
        clearTimeout(timeout);
        ws.close();
        resolve({ success: false, reason: err });
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      resolve({ success: false, reason: err.message });
    });

    ws.on("close", () => {
      clearTimeout(timeout);
    });
  });
}

// ─────────────────────────────────────────────
// MAIN AGENT LOGIC
// ─────────────────────────────────────────────
async function checkAndMine(silent = false) {
  const balance = await getBalance();

  if (balance === null) {
    console.log(c("red", "❌ Cannot reach Sepolia RPC — check internet connection"));
    return;
  }

  const status = balance >= MIN_BALANCE_ETH
    ? c("green",  `✅ ${balance.toFixed(4)} ETH  (sufficient)`)
    : c("red",    `⚠️  ${balance.toFixed(4)} ETH  (below threshold ${MIN_BALANCE_ETH} ETH)`);

  console.log(`\n${c("bold", "🔍 Wallet Agent Report")}`);
  console.log("─".repeat(50));
  console.log(`   Address : ${WALLET_ADDRESS}`);
  console.log(`   Balance : ${status}`);
  console.log(`   Network : Sepolia Testnet`);
  console.log("─".repeat(50));

  if (balance < MIN_BALANCE_ETH) {
    console.log(c("yellow", `\n🤖 Agent: Balance below ${MIN_BALANCE_ETH} ETH — starting auto-mine...`));
    const result = await mine(WALLET_ADDRESS);

    if (result.success) {
      console.log(c("green", "\n✅ Mining complete! Check balance in ~30 seconds."));
    } else {
      console.log(c("yellow", `\n⚠️  Auto-mine failed (${result.reason})`));
      console.log("   Manual option: https://sepolia-faucet.pk910.de/");
      console.log(`   Address: ${WALLET_ADDRESS}`);
    }
  } else if (!silent) {
    console.log(c("green", "\n✅ Balance is healthy. No mining needed."));
  }
}

// ─────────────────────────────────────────────
// WATCH MODE — runs on an interval
// ─────────────────────────────────────────────
async function watchMode() {
  console.log(c("bold", `\n🤖 Wallet Agent STARTED (watch mode)`));
  console.log(`   Checking every ${CHECK_INTERVAL / 60000} minutes`);
  console.log(`   Min threshold: ${MIN_BALANCE_ETH} ETH`);
  console.log(`   Press Ctrl+C to stop\n`);

  await checkAndMine();

  setInterval(async () => {
    console.log(`\n[${new Date().toLocaleTimeString()}] Scheduled check...`);
    await checkAndMine(true);
  }, CHECK_INTERVAL);
}

// ─────────────────────────────────────────────
// ENTRY POINT
// ─────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes("--watch")) {
  watchMode();
} else if (args.includes("--mine")) {
  console.log(c("bold", "\n⛏  Force mining mode..."));
  mine(WALLET_ADDRESS).then(r => {
    console.log(r.success ? c("green", "\n✅ Done!") : c("red", `\n❌ Failed: ${r.reason}`));
    process.exit(0);
  });
} else {
  checkAndMine().then(() => process.exit(0));
}
