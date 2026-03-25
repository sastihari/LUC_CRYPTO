# MetaMask & Crypto Basics — Complete Learning Guide

> This guide teaches you MetaMask from zero, with real-world examples.
> Read top to bottom. Each section builds on the last.

---

## PART 1 — What is MetaMask?

**Simple answer:** MetaMask is your crypto wallet — like a bank account that only you control, with no bank in the middle.

**Real-world analogy:**

| Traditional Banking | Crypto with MetaMask |
|---------------------|----------------------|
| Bank holds your money | YOU hold your money |
| Bank can freeze account | Nobody can freeze it |
| Need ID to open | Anonymous |
| Bank hours | 24/7 globally |
| Transfer takes 1-3 days | Transfer takes seconds |

MetaMask is a **browser extension** (Chrome/Firefox/Brave) AND a **mobile app**.

---

## PART 2 — Key Concepts (Know These First)

### 1. Wallet Address
Your public identity on the blockchain. Share this freely.
```
Example: 0x019D81c90eBF9a1df58Bccf279329669E07767d8
```
Like your bank account number — safe to share so people can send you money.

### 2. Private Key
The master password to your wallet. **NEVER share this with anyone, ever.**
```
Example: 33f4d9151f7f63f975af152dc154e99a2618ae08...
```
Like the PIN + password to your bank combined. Whoever has this controls all your funds.

### 3. Seed Phrase (Recovery Phrase)
12 or 24 random words that can restore your wallet on any device.
```
Example: anger six gospel then fall frequent economy laptop rough drift divert first
```
Write this on paper. Keep it offline. Never type it anywhere online.

### 4. Network
Which blockchain you're connected to.
- **Ethereum Mainnet** → real ETH, real money
- **Polygon** → real MATIC/POL, real money, cheaper fees
- **Sepolia** → fake ETH, for testing only (where we are now)

### 5. Gas Fee
The cost to do anything on the blockchain (like a delivery charge).
- Ethereum: expensive ($5–$50 per transaction)
- Polygon: cheap ($0.001–$0.01 per transaction) ← why we chose Polygon for LUC

---

## PART 3 — Setting Up MetaMask (Step by Step)

### Step 1: Install
1. Go to `https://metamask.io/download/`
2. Click "Install MetaMask for Chrome" (or your browser)
3. Click "Add to Chrome" → "Add Extension"
4. The fox icon appears in your toolbar

### Step 2: Create a New Wallet
1. Click the MetaMask fox icon
2. Click **"Create a new wallet"**
3. Set a password (this unlocks MetaMask on this device only)
4. **CRITICAL:** Write down your 12-word seed phrase on paper
5. Confirm it by selecting words in order
6. Your wallet is ready

### Step 3: Your Wallet Address
1. Open MetaMask
2. Click the account name at the top
3. Your address is the `0x...` text — click to copy
4. This is what you share to receive crypto

---

## PART 4 — Adding Polygon Network to MetaMask

By default MetaMask shows Ethereum. To use LUC token you need Polygon.

**Automatic (easiest):**
1. Go to `https://chainlist.org/`
2. Search "Polygon"
3. Click "Add to MetaMask" next to Polygon Mainnet
4. Confirm in MetaMask

**Manual:**
1. MetaMask → top dropdown → "Add network" → "Add a network manually"
2. Fill in:
   ```
   Network Name:    Polygon Mainnet
   RPC URL:         https://polygon-rpc.com
   Chain ID:        137
   Currency Symbol: POL
   Block Explorer:  https://polygonscan.com
   ```

**For Sepolia Testnet (what we're using now):**
```
Network Name:    Sepolia Testnet
RPC URL:         https://rpc.sepolia.org
Chain ID:        11155111
Currency Symbol: ETH
Block Explorer:  https://sepolia.etherscan.io
```

---

## PART 5 — Adding the LUC Token to MetaMask

Once LUC is deployed, add it so you can see your balance:

1. Open MetaMask → select Polygon network
2. Scroll down → click "Import tokens"
3. Paste the LUC contract address (from deployment)
4. MetaMask auto-fills: Symbol = LUC, Decimals = 18
5. Click "Add custom token" → "Import tokens"

Now your LUC balance appears in MetaMask.

---

## PART 6 — Common MetaMask Operations

### Send Crypto
1. Click "Send"
2. Paste recipient address
3. Enter amount
4. Review gas fee
5. Click "Confirm"

### Receive Crypto
1. Click "Receive"
2. Copy your address OR show QR code
3. Share with sender

### Connect to a Website (dApp)
1. Visit the website (e.g., QuickSwap, Uniswap)
2. Click "Connect Wallet"
3. Select MetaMask
4. Approve the connection in MetaMask popup
5. You're connected — the site can see your address but cannot move funds without your approval

---

## PART 7 — Binance + MetaMask Together

Since you use Binance, here's how they work together:

**Withdraw from Binance to MetaMask:**
1. Binance → Wallet → Withdraw
2. Select coin (e.g., POL)
3. Paste your MetaMask address
4. Select network: **Polygon** (NOT Ethereum — fees are much cheaper)
5. Confirm → funds arrive in MetaMask in ~2 minutes

**Deposit to Binance from MetaMask:**
1. Binance → Wallet → Deposit → select coin
2. Copy the Binance deposit address
3. MetaMask → Send → paste Binance address
4. Make sure network matches!

**IMPORTANT — Network mismatch = lost funds:**
Always send on the same network. Sending MATIC on Ethereum network to a Polygon address = funds lost.

---

## PART 8 — Sepolia Testnet (Where We Are Now)

**What it is:** A fake version of Ethereum for testing.

- Sepolia ETH has **zero real value**
- You cannot sell or withdraw testnet tokens to Binance
- It exists only so developers can test without risking real money
- We are using it to test the LUC contract before Polygon mainnet launch

**Our journey:**
```
Sepolia Testnet (now) → Test LUC contract → Security Audit → Polygon Mainnet (real)
```

When LUC deploys on Polygon mainnet, THAT is the real token. Testnet deployment is just rehearsal.

---

## PART 9 — Security Rules (Never Break These)

1. **Never share your seed phrase** — not with MetaMask support, not with us, not with anyone
2. **Never enter seed phrase on any website** — MetaMask never asks for it online
3. **Never click "Connect Wallet"** on a link sent to you via DM/email
4. **Use a separate wallet** for testnet (which we've done — 0x019D...)
5. **Hardware wallet for mainnet** — Ledger or Trezor for large amounts
6. **Verify contract addresses** — only use addresses from official sources

---

## PART 10 — Glossary

| Term | Meaning |
|------|---------|
| dApp | Decentralized app (runs on blockchain) |
| Gas | Fee paid to process a transaction |
| Gwei | Tiny unit of ETH (1 ETH = 1,000,000,000 Gwei) |
| ERC-20 | Standard for tokens on Ethereum/Polygon |
| Smart Contract | Code deployed on blockchain (like LUC) |
| Testnet | Fake blockchain for testing |
| Mainnet | Real blockchain with real money |
| Block | A batch of transactions added to blockchain |
| Explorer | Website to view blockchain transactions (Etherscan, PolygonScan) |
| Seed Phrase | 12 words that back up your wallet |
| Liquidity | Crypto deposited to enable trading on a DEX |
| DEX | Decentralized exchange (QuickSwap, Uniswap) |
| CEX | Centralized exchange (Binance, CoinDCX) |

---

## PART 11 — Next Steps for You

- [ ] Install MetaMask on Chrome
- [ ] Write down your seed phrase (paper, offline)
- [ ] Add Polygon network
- [ ] Practice sending a small amount of test tokens
- [ ] When LUC launches: import LUC token to MetaMask
- [ ] Use Binance to get POL → send to MetaMask → provide liquidity

---

*Questions? Everything in this guide applies to real crypto, not just LUC. This is the foundation you need for any crypto project.*
