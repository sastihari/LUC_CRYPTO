# 🧪 LUC TOKEN - COMMUNITY TESTING GUIDE

## Welcome Beta Testers! 🎉

You're helping test the **LUCIFER (LUC)** token before mainnet launch.
Your feedback is crucial for making LUC safe and successful!

---

## 📋 What is LUC?

**LUCIFER (LUC)** is a utility token built on Polygon.

**Key Features:**
- 🔢 **Total Supply:** 1,000,000,000 LUC (1 billion)
- 🌐 **Platform:** Polygon (low fees, fast transactions)
- 🔒 **Standard:** ERC-20 (compatible with all wallets)
- 🛡️ **Security:** OpenZeppelin-based, audited code

---

## 🎯 Testing Goals

We need you to test:

1. ✅ **Receiving tokens** - Can you receive LUC?
2. ✅ **Sending tokens** - Can you send LUC to others?
3. ✅ **Wallet display** - Does LUC show correctly in your wallet?
4. ✅ **DEX interaction** - Can you swap LUC on testnet DEX?
5. ✅ **Edge cases** - Any unexpected behavior?

---

## 🔧 Setup Instructions

### Step 1: Add Mumbai Testnet to Wallet

**MetaMask:**
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter these details:

```
Network Name: Mumbai Testnet
RPC URL: https://rpc-mumbai.maticvigil.com
Chain ID: 80001
Currency Symbol: MATIC
Block Explorer: https://mumbai.polygonscan.com/
```

### Step 2: Get Test MATIC

Visit these faucets (free):
- https://faucet.polygon.technology/
- https://mumbaifaucet.com/

You need ~0.1 MATIC for gas fees.

### Step 3: Add LUC Token to Wallet

**MetaMask:**
1. Go to "Import tokens"
2. Enter contract address: `[CONTRACT_ADDRESS]`
3. LUC should appear automatically

---

## 📝 Testing Checklist

### Basic Tests (Everyone):

- [ ] **Test 1:** Receive LUC from faucet/team
  - Did tokens appear in your wallet?
  - Is the balance correct?

- [ ] **Test 2:** Send LUC to another address
  - Did transaction succeed?
  - Were gas fees reasonable?

- [ ] **Test 3:** Check on block explorer
  - Can you see your transactions?
  - Is token info correct?

### Advanced Tests (If comfortable):

- [ ] **Test 4:** Approve tokens for a contract
  - Use approve() function
  - Check allowance

- [ ] **Test 5:** Transfer using allowance
  - Have someone use transferFrom()
  - Did it work correctly?

- [ ] **Test 6:** Maximum transfer
  - Transfer your entire balance
  - Any issues?

- [ ] **Test 7:** Zero transfer
  - Send 0 tokens
  - Does it fail gracefully?

---

## 🐛 Reporting Issues

### If You Find a Bug:

**Report these details:**
1. What you were trying to do
2. What happened (actual behavior)
3. What you expected (expected behavior)
4. Transaction hash (if applicable)
5. Your wallet address
6. Screenshot (if possible)

### Where to Report:
- Discord: [LINK]
- Telegram: [LINK]
- Email: [EMAIL]
- GitHub Issues: [LINK]

### Bug Severity:
- 🔴 **Critical:** Funds at risk, contract broken
- 🟠 **High:** Major functionality broken
- 🟡 **Medium:** Minor functionality issues
- 🟢 **Low:** UI/UX issues, suggestions

---

## 🎁 Rewards for Testers

**Thank you for helping!**

- 🏆 Active testers will be recognized
- 🎁 Bug bounties for critical findings
- 💎 Priority access to mainnet launch
- 📜 Listed in project credits

---

## ⚠️ Important Notes

1. **This is TESTNET** - Tokens have no real value
2. **Do NOT use real funds** - Only test MATIC
3. **Report all issues** - Even small ones help
4. **Be patient** - We'll address all feedback

---

## 📅 Testing Schedule

| Week | Focus |
|------|-------|
| Week 1 | Basic transfers |
| Week 2 | Wallet compatibility |
| Week 3 | DEX interactions |
| Week 4 | Stress testing |

---

## 🙋 FAQ

**Q: Is this real money?**
A: No! This is testnet. Tokens have no value.

**Q: How do I get test tokens?**
A: Request in Discord/Telegram, or get from faucet.

**Q: What wallet should I use?**
A: MetaMask is recommended. Any ERC-20 wallet works.

**Q: I found a bug, what do I get?**
A: Recognition + potential bounty for critical bugs!

---

## 📞 Support

**Need help?**
- Discord: [LINK]
- Telegram: [LINK]
- Email: [EMAIL]

**Response time:** 24-48 hours

---

## 🔥 Thank You!

Your testing makes LUC safer for everyone.

**Together, we're building something great!** 🚀

---

**Contract Address (Mumbai):** `[TO BE FILLED AFTER DEPLOYMENT]`

**Block Explorer:** https://mumbai.polygonscan.com/address/[ADDRESS]
