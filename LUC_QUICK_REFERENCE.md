# LUC TOKEN — QUICK REFERENCE
# Everything in one place

---

## WALLET

| Item | Value |
|------|-------|
| Address | `0x856703bf834753Bafc87F5712c3239061a314272` |
| Private key location | `.env.hardhat` (NEVER share) |
| MetaMask account | sastihari (polygonscan login) |

---

## DEPLOYED CONTRACTS

| Network | Contract Address | Status |
|---------|-----------------|--------|
| Sepolia (Ethereum) | `0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75` | ✅ Deployed + Verified |
| Polygon Amoy | `0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63` | ✅ Deployed + Verified |
| BNB Testnet | — | Not deployed yet |
| Polygon Mainnet | — | Planned (after audit) |

---

## BLOCK EXPLORER LINKS

### Sepolia (Ethereum Testnet)
| Purpose | URL |
|---------|-----|
| Token overview | https://sepolia.etherscan.io/token/0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75 |
| Write contract (transfer tokens) | https://sepolia.etherscan.io/token/0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75#writeContract |
| Wallet activity | https://sepolia.etherscan.io/address/0x856703bf834753Bafc87F5712c3239061a314272 |
| Verified source code | https://sepolia.etherscan.io/address/0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75#code |

### Polygon Amoy (Polygon Testnet)
| Purpose | URL |
|---------|-----|
| Token overview | https://amoy.polygonscan.com/token/0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63 |
| Write contract (transfer tokens) | https://amoy.polygonscan.com/address/0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63#writeContract |
| Wallet activity | https://amoy.polygonscan.com/address/0x856703bf834753Bafc87F5712c3239061a314272 |
| Verified source code | https://amoy.polygonscan.com/address/0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63#code |

---

## FREE TESTNET TOKEN FAUCETS

### Get Free Sepolia ETH (Ethereum Testnet)
| Faucet | URL | Notes |
|--------|-----|-------|
| Chainlink | https://faucets.chain.link/sepolia | Requires GitHub login — gives 0.5 ETH |
| Alchemy | https://www.alchemy.com/faucets/ethereum-sepolia | Free account required |
| QuickNode | https://faucet.quicknode.com/ethereum/sepolia | Free, no account needed |
| Sepolia PoW | https://sepolia-faucet.pk910.de | Mine directly in browser |

### Get Free POL (Polygon Amoy Testnet)
| Faucet | URL | Notes |
|--------|-----|-------|
| Chainlink | https://faucets.chain.link/polygon-amoy | Requires GitHub login — check Native Token (POL) only, uncheck LINK |
| Alchemy | https://www.alchemy.com/faucets/polygon-amoy | Free account required |
| QuickNode | https://faucet.quicknode.com/polygon/amoy | Free |
| Polygon Official | https://faucet.polygon.technology | Select Amoy network |

---

## API DASHBOARDS

| Service | URL | Key stored in |
|---------|-----|---------------|
| PolygonScan API | https://polygonscan.com/apidashboard | `.env.hardhat` → `POLYGONSCAN_API_KEY` |
| Etherscan API | https://etherscan.io/myapikey | `.env.hardhat` → `ETHERSCAN_API_KEY` |

---

## METAMASK NETWORK SETTINGS

### Ethereum Sepolia
```
Network Name:  Sepolia
RPC URL:       https://ethereum-sepolia-rpc.publicnode.com
Chain ID:      11155111
Symbol:        ETH
Explorer:      https://sepolia.etherscan.io
```

### Polygon Amoy
```
Network Name:  Amoy
RPC URL:       https://rpc-amoy.polygon.technology
Chain ID:      80002
Symbol:        POL
Explorer:      https://amoy.polygonscan.com
```

### Import LUC Token in MetaMask
- Sepolia contract: `0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75`
- Amoy contract:    `0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63`
- Symbol: `LUC`
- Decimals: `18`

---

## TERMINAL COMMANDS

```bash
# Check balances on all networks
node scripts/checkAllBalances.js

# Deploy to both Sepolia + Amoy
npm run deploy:both

# Deploy to Sepolia only
npm run deploy:sepolia

# Deploy to Amoy only
npm run deploy:amoy

# Verify contract on Amoy
npx hardhat verify --network amoy 0xc084B9C0fA0C901F38B05EE3b522B0b5eAfaDF63

# Verify contract on Sepolia
npx hardhat verify --network sepolia 0xb8C7876CA43D372dB6d44C4f3b5fc117b585ce75
```

---

## COMPLETED MILESTONES

- [x] Smart contract written — `contracts/LuciferToken.sol`
- [x] Deployed to Sepolia testnet
- [x] Deployed to Polygon Amoy testnet
- [x] LUC token visible in MetaMask (both networks)
- [x] Token transfer test — Sepolia (via Etherscan writeContract)
- [x] Token transfer test — Amoy (via PolygonScan writeContract)
- [x] Contract verified on Sepolia Etherscan (green checkmark)
- [x] Contract verified on Polygon Amoy PolygonScan (green checkmark)
- [x] Balance check script working for all networks

---

## PENDING / NEXT STEPS

- [ ] Plan mainnet launch — tokenomics, supply distribution
- [ ] Build website — `website/` folder exists in project
- [ ] Audit smart contract before mainnet
- [ ] Set up multi-sig wallet for mainnet
- [ ] Add liquidity on DEX (Uniswap / QuickSwap)
- [ ] List on CoinGecko / CoinMarketCap

---

## PROJECT FILES

| File | Purpose |
|------|---------|
| `contracts/LuciferToken.sol` | Main smart contract |
| `scripts/deploy.js` | Deploy to any network |
| `scripts/deployBoth.js` | Deploy to Sepolia + Amoy at once |
| `scripts/checkAllBalances.js` | Check balances on all networks |
| `scripts/walletAgent.js` | Monitor wallet balance |
| `hardhat.config.js` | Network + compiler configuration |
| `.env.hardhat` | Private keys + API keys (never share) |
| `deployment-amoy.json` | Amoy deployment record |
| `docs/METAMASK_GUIDE.md` | MetaMask beginner guide |
| `docs/AMOY_METAMASK_SETUP.md` | Amoy setup step-by-step |
| `docs/FAUCET_GUIDE.md` | All faucet options |
| `docs/MULTISIG_GUIDE.md` | Multi-sig wallet guide |
