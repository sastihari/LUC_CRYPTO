# 💧 POLYGON TESTNET FAUCET GUIDE

## ⚠️ Important: Mumbai → Amoy Migration

**Mumbai testnet is DEPRECATED!** Polygon has migrated to **Amoy testnet**.

- **Old testnet:** Mumbai (Chain ID: 80001) - Being phased out
- **New testnet:** Amoy (Chain ID: 80002) - Current active testnet

---

## 📋 Your Wallet Address
```
0x7BFDa08453f505c37673773D21cd721007629842
```

---

## 💧 Working Faucets for Amoy

### Option 1: Polygon Official Faucet
```
https://faucet.polygon.technology/
```
- Select "Amoy" network
- May require Discord verification
- Gives 0.5 POL

### Option 2: Alchemy Faucet (Requires 0.001 ETH on mainnet)
```
https://www.alchemy.com/faucets/polygon-amoy
```
⚠️ **Issue:** Requires 0.001 ETH on Ethereum mainnet
- This is to prevent spam
- If you don't have mainnet ETH, use other options

### Option 3: QuickNode Faucet
```
https://faucet.quicknode.com/polygon/amoy
```
- May require creating a free account
- Usually works without mainnet balance

### Option 4: Chainstack Faucet  
```
https://faucet.chainstack.com/polygon-amoy-testnet-faucet
```
- Free, just enter address
- May have rate limits

### Option 5: thirdweb Faucet
```
https://thirdweb.com/polygon-amoy-testnet
```
- Connect wallet
- Get test tokens

### Option 6: POL Token Holders Discord
```
Join Polygon Discord and request in #faucet channel
https://discord.gg/polygon
```

---

## 🔄 If All Faucets Fail

### Alternative A: Get a tiny bit of mainnet ETH
- Some faucets require 0.001 ETH on mainnet (~$2.50)
- This proves you're not a bot
- You can get this from:
  - An exchange (buy minimum amount)
  - A friend who has ETH
  - Some platforms offer free ETH for new accounts

### Alternative B: Use Different Testnet
We can deploy on another testnet first:

**Sepolia (Ethereum testnet):**
- Faucet: https://sepoliafaucet.com/
- More lenient requirements

**Base Sepolia:**
- Faucet: https://www.alchemy.com/faucets/base-sepolia

---

## 📊 Network Details for Amoy

| Parameter | Value |
|-----------|-------|
| Network Name | Polygon Amoy Testnet |
| Chain ID | 80002 |
| Currency | POL |
| RPC URL | https://rpc-amoy.polygon.technology |
| Explorer | https://amoy.polygonscan.com |

### Add to MetaMask:
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter above details
4. Save

---

## 🚀 Deploy Command (Once you have test tokens)

```bash
# For Amoy testnet
npx hardhat run scripts/deploy.js --network amoy

# For Mumbai (deprecated, but may still work)
npx hardhat run scripts/deploy.js --network mumbai
```

---

## 🔍 Check Balance

### On Block Explorer:
```
https://amoy.polygonscan.com/address/0x7BFDa08453f505c37673773D21cd721007629842
```

### Via Command:
```bash
node scripts/checkBalance.js
```

---

## 💡 Tips

1. **Try multiple faucets** - Some work, some don't, it varies
2. **Wait between requests** - Most have rate limits (1 request per 24h)
3. **Use incognito/VPN** - If you hit rate limits
4. **Discord is reliable** - Polygon Discord faucet usually works
5. **Be patient** - Testnet infrastructure can be slow

---

## 📞 Need Help?

If no faucets work:
1. Try Polygon Discord #faucet channel
2. Ask on Polygon Telegram
3. Consider alternative testnets (Sepolia)
4. Get minimal mainnet ETH ($2-3) to unlock gated faucets

---

**Once you have test tokens, deployment is just one command away!** 🚀
