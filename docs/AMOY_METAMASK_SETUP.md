# Polygon Amoy + MetaMask + Faucet Setup
# Complete Step-by-Step Guide

---

## WHAT YOU SAW IN THE SCREENSHOT — EXPLAINED

Your screenshot showed:
- ✅ MetaMask IS connected to Chainlink faucet (wallet 0x6eb61...272)
- ✅ The faucet page is correct
- ❌ You clicked LINK tokens — you need POL tokens (different button)
- ❌ MetaMask shows $0 — NORMAL for testnet, not broken

---

## STEP 1 — Add Polygon Amoy to MetaMask

MetaMask does not have Amoy by default. You must add it manually.

**Method A — Automatic (30 seconds):**
1. Open your browser → go to: `https://chainlist.org/?search=amoy&testnets=true`
2. Find **"Polygon Amoy"** (Chain ID: 80002)
3. Click **"Add to MetaMask"**
4. MetaMask popup appears → click **"Approve"**
5. Click **"Switch network"**
6. Done — MetaMask now shows "Polygon Amoy" at the top

**Method B — Manual:**
1. Open MetaMask → click network dropdown (top center)
2. Click **"Add network"** → **"Add a network manually"**
3. Fill in exactly:
   ```
   Network Name:       Polygon Amoy Testnet
   New RPC URL:        https://rpc-amoy.polygon.technology
   Chain ID:           80002
   Currency Symbol:    POL
   Block Explorer URL: https://amoy.polygonscan.com
   ```
4. Click **Save**

---

## STEP 2 — Get Your MetaMask Wallet Address

1. Open MetaMask
2. Switch to **Polygon Amoy** network (from Step 1)
3. Click your account name at the top → click **"Copy address"**
4. Your address is copied (it starts with 0x...)

**This is the address you paste into faucets.**

---

## STEP 3 — Get POL Tokens from Chainlink Faucet (Correct Way)

You were on the right page but clicked the wrong token. Here's the exact steps:

1. Go to: `https://faucets.chain.link/polygon-amoy`
2. Click **"Connect wallet"** → select MetaMask → Approve
3. **IMPORTANT:** Make sure the dropdown shows **"Polygon Amoy"** (not Ethereum)
4. In the "Request type" section:
   - ✅ Check **"Native Token (POL)"**
   - ❌ UNCHECK "LINK" (you don't need this for deployment)
5. Your wallet address auto-fills
6. Click **"Send request"**
7. MetaMask popup → click **"Sign"**
8. Wait ~30 seconds → you receive **0.5 POL**

---

## STEP 4 — Verify Balance in MetaMask

After receiving POL:
1. Open MetaMask
2. Switch to **Polygon Amoy** network
3. You should see **0.5 POL** (not $0.50 — it shows POL amount, not dollar value)
4. Dollar value shows $0 because testnet tokens have no real price — **this is normal**

---

## STEP 5 — Connect Your MetaMask Wallet to the LUC Project

Right now the project uses a generated wallet (`0x019D81...`).
If you want to use YOUR MetaMask wallet for deployment:

### Option A: Export MetaMask private key and use it (Recommended for testnet)

1. MetaMask → click 3 dots (⋮) next to your account → **"Account details"**
2. Click **"Show private key"**
3. Enter your MetaMask password
4. Copy the private key (starts with 0x, remove the 0x when pasting)
5. Open `.env.hardhat` in the project
6. Replace:
   ```
   PRIVATE_KEY=33f4d9151f7f63f975af152dc154e99a2618ae08cbabc7a5c2940d5349efb160
   DEPLOYER_ADDRESS=0x019D81c90eBF9a1df58Bccf279329669E07767d8
   ```
   With your MetaMask values:
   ```
   PRIVATE_KEY=your_metamask_private_key_without_0x
   DEPLOYER_ADDRESS=your_metamask_wallet_address
   ```

### Option B: Fund the generated wallet instead (Simpler)

Send POL from your MetaMask wallet to the deployment wallet:
1. MetaMask → **"Send"**
2. Paste: `0x019D81c90eBF9a1df58Bccf279329669E07767d8`
3. Amount: **0.1 POL**
4. Network: **Polygon Amoy**
5. Confirm

---

## STEP 6 — Verify Everything Works

Run the balance check:
```bash
node scripts/walletAgent.js
```

Or check balance manually on PolygonScan:
```
https://amoy.polygonscan.com/address/YOUR_ADDRESS
```

---

## COMMON ERRORS & FIXES

| Error | Cause | Fix |
|-------|-------|-----|
| "Wrong network" | MetaMask on Ethereum, faucet wants Amoy | Switch MetaMask to Polygon Amoy |
| Balance shows $0 | Normal for testnet | Look at POL amount, not dollar value |
| "Convert LINK" popup | You requested LINK not POL | Uncheck LINK, check Native Token only |
| MetaMask not connecting | Page needs permission | Click Connect Wallet → Approve |
| Transaction failed | Not enough POL for gas | Get more POL from faucet first |

---

## AFTER SETUP — DEPLOY COMMANDS

Once wallet is funded on BOTH networks:

```bash
# Deploy to both Sepolia + Polygon Amoy at once
npm run deploy:both

# Deploy to Polygon Amoy only
npm run deploy:amoy

# Deploy to Sepolia only
npm run deploy:sepolia
```

---

## NETWORK SUMMARY

| Network | Real money? | Purpose | Status |
|---------|------------|---------|--------|
| Sepolia | No | Testing (Ethereum) | ✅ Funded (0.05 ETH) |
| Polygon Amoy | No | Testing (Polygon) | ⏳ Need POL from faucet |
| Polygon Mainnet | YES | Real launch | After audits |
