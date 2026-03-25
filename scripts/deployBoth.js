/**
 * DEPLOY TO BOTH NETWORKS (Sepolia + Polygon Amoy)
 * =================================================
 * Deploys LUC token to Sepolia AND Polygon Amoy in one command.
 *
 * Real-world analogy: Like opening your shop in two cities at the same time.
 * If one city has problems, the other still works.
 *
 * Usage:
 *   node scripts/deployBoth.js              → deploy to both (skip if already deployed)
 *   node scripts/deployBoth.js --force      → redeploy even if already deployed
 *   node scripts/deployBoth.js --sepolia    → Sepolia only
 *   node scripts/deployBoth.js --amoy       → Polygon Amoy only
 */

const { execSync, spawnSync } = require("child_process");
const { ethers }              = require("ethers");
const fs                      = require("fs");
require("dotenv").config({ path: ".env.hardhat" });

// ─────────────────────────────────────────────
// NETWORK CONFIG
// ─────────────────────────────────────────────
const NETWORKS = {
  sepolia: {
    name:        "Sepolia (Ethereum Testnet)",
    flag:        "sepolia",
    rpcs: [
      process.env.SEPOLIA_RPC_URL,
      "https://ethereum-sepolia-rpc.publicnode.com",
      "https://sepolia.drpc.org",
      "https://eth-sepolia.public.blastapi.io",
    ].filter(Boolean),
    symbol:      "ETH",
    explorer:    "https://sepolia.etherscan.io",
    faucet:      "https://sepolia-faucet.pk910.de/",
    minBalance:  0.01,
  },
  amoy: {
    name:        "Polygon Amoy (Polygon Testnet)",
    flag:        "amoy",
    rpcs: [
      process.env.AMOY_RPC_URL,
      "https://rpc-amoy.polygon.technology",
      "https://polygon-amoy-bor-rpc.publicnode.com",
      "https://polygon-amoy.drpc.org",
    ].filter(Boolean),
    symbol:      "POL",
    explorer:    "https://amoy.polygonscan.com",
    faucet:      "https://faucets.chain.link/polygon-amoy",
    minBalance:  0.01,
  },
};

const COLORS = {
  reset:  "\x1b[0m",  green:  "\x1b[32m",
  yellow: "\x1b[33m", red:    "\x1b[31m",
  cyan:   "\x1b[36m", bold:   "\x1b[1m",
  blue:   "\x1b[34m",
};
const c = (col, txt) => `${COLORS[col]}${txt}${COLORS.reset}`;

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
async function getBalance(rpcs, address) {
  for (const rpc of rpcs) {
    try {
      const provider = new ethers.JsonRpcProvider(rpc);
      const bal = await provider.getBalance(address);
      return parseFloat(ethers.formatEther(bal));
    } catch { /* try next */ }
  }
  return null;
}

function deploymentFile(network) {
  return `deployment-${network}.json`;
}

function alreadyDeployed(network) {
  const file = deploymentFile(network);
  if (!fs.existsSync(file)) return false;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return !!data.contractAddress;
  } catch { return false; }
}

function printBanner(text) {
  const line = "═".repeat(60);
  console.log(`\n${c("bold", line)}`);
  console.log(c("bold", `  ${text}`));
  console.log(c("bold", line));
}

// ─────────────────────────────────────────────
// SINGLE NETWORK DEPLOY (calls hardhat)
// ─────────────────────────────────────────────
function runDeploy(networkFlag) {
  const result = spawnSync(
    "npx",
    ["hardhat", "run", "scripts/deploy.js", "--network", networkFlag],
    { stdio: "inherit", shell: true }
  );
  return result.status === 0;
}

// ─────────────────────────────────────────────
// PRE-FLIGHT CHECK
// ─────────────────────────────────────────────
async function preflight(networkKey, cfg, force) {
  const deployer = process.env.DEPLOYER_ADDRESS;

  console.log(`\n${c("cyan", `🔍 Pre-flight: ${cfg.name}`)}`);

  // Already deployed?
  if (!force && alreadyDeployed(networkKey)) {
    const data = JSON.parse(fs.readFileSync(deploymentFile(networkKey)));
    console.log(c("yellow", `   ⏭  Already deployed: ${data.contractAddress}`));
    console.log(c("yellow", `      Use --force to redeploy`));
    return { skip: true, address: data.contractAddress };
  }

  // Check balance
  const bal = await getBalance(cfg.rpcs, deployer);

  if (bal === null) {
    console.log(c("red", `   ❌ Cannot reach any RPC for ${cfg.name}`));
    return { skip: true, error: "rpc_unreachable" };
  }

  console.log(`   💰 Balance: ${bal.toFixed(4)} ${cfg.symbol}`);

  if (bal < cfg.minBalance) {
    console.log(c("red", `   ❌ Insufficient balance (need ${cfg.minBalance} ${cfg.symbol})`));
    console.log(c("yellow", `   💧 Get tokens: ${cfg.faucet}`));
    console.log(c("yellow", `   📋 Address:    ${deployer}`));
    return { skip: true, error: "insufficient_funds" };
  }

  console.log(c("green", `   ✅ Ready to deploy`));
  return { skip: false };
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main() {
  const args       = process.argv.slice(2);
  const force      = args.includes("--force");
  const sepoliaOnly = args.includes("--sepolia");
  const amoyOnly   = args.includes("--amoy");

  const targets = sepoliaOnly ? ["sepolia"]
                : amoyOnly    ? ["amoy"]
                : ["sepolia", "amoy"];   // ← both by default (the || condition)

  printBanner("🔥 LUC TOKEN — DUAL NETWORK DEPLOYMENT");
  console.log(`   Targets : ${targets.map(t => NETWORKS[t].name).join("  ||  ")}`);
  console.log(`   Deployer: ${process.env.DEPLOYER_ADDRESS}`);
  console.log(`   Force   : ${force ? "yes (redeploy)" : "no (skip if done)"}`);

  const results = {};

  // ── Pre-flight all targets first ──────────────
  for (const key of targets) {
    results[key] = await preflight(key, NETWORKS[key], force);
  }

  // ── Deploy to each passing network ────────────
  let anyDeployed = false;

  for (const key of targets) {
    const cfg = NETWORKS[key];

    if (results[key].skip) {
      if (results[key].error === "insufficient_funds") {
        console.log(c("red", `\n⛔ Skipping ${cfg.name} — no funds`));
      } else if (results[key].error === "rpc_unreachable") {
        console.log(c("red", `\n⛔ Skipping ${cfg.name} — RPC unreachable`));
      }
      continue;
    }

    printBanner(`🚀 Deploying to ${cfg.name}`);
    const ok = runDeploy(cfg.flag);
    results[key].deployed = ok;

    if (ok) {
      anyDeployed = true;
      // Read back the saved deployment
      const data = JSON.parse(fs.readFileSync(deploymentFile(key)));
      results[key].address = data.contractAddress;
      console.log(c("green", `\n✅ ${cfg.name} deployment successful!`));
      console.log(`   Contract : ${data.contractAddress}`);
      console.log(`   Explorer : ${cfg.explorer}/address/${data.contractAddress}`);
    } else {
      console.log(c("red", `\n❌ ${cfg.name} deployment FAILED`));
    }
  }

  // ── Final Summary ──────────────────────────────
  printBanner("📊 DEPLOYMENT SUMMARY");

  for (const key of targets) {
    const cfg = NETWORKS[key];
    const r   = results[key];

    if (r.address) {
      console.log(c("green", `\n✅ ${cfg.name}`));
      console.log(`   Address : ${r.address}`);
      console.log(`   Verify  : npx hardhat verify --network ${key} ${r.address}`);
      console.log(`   View    : ${cfg.explorer}/address/${r.address}`);
    } else if (r.error === "insufficient_funds") {
      console.log(c("red", `\n❌ ${cfg.name} — NEEDS FUNDS`));
      console.log(`   Faucet  : ${cfg.faucet}`);
      console.log(`   Address : ${process.env.DEPLOYER_ADDRESS}`);
    } else if (r.error === "rpc_unreachable") {
      console.log(c("yellow", `\n⚠️  ${cfg.name} — RPC unreachable (try again)`));
    }
  }

  // Save combined deployment record
  const combined = {
    timestamp: new Date().toISOString(),
    deployer:  process.env.DEPLOYER_ADDRESS,
    networks:  {}
  };
  for (const key of targets) {
    if (results[key].address) {
      combined.networks[key] = {
        contractAddress: results[key].address,
        explorer: `${NETWORKS[key].explorer}/address/${results[key].address}`
      };
    }
  }
  fs.writeFileSync("deployment-combined.json", JSON.stringify(combined, null, 2));
  console.log(c("cyan", "\n💾 Combined record saved: deployment-combined.json"));

  if (!anyDeployed) {
    console.log(c("yellow", "\n⚠️  Nothing was deployed. Check balances above."));
  } else {
    console.log(c("green", "\n🔥 Done! LUC is live on testnet(s).\n"));
  }
}

main().catch(err => {
  console.error(c("red", "\n❌ Fatal error:"), err.message);
  process.exit(1);
});
