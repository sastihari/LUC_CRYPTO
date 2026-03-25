# 🔐 MULTI-SIG WALLET SETUP GUIDE

## For LUC Token Treasury Management

---

## 📋 Overview

Multi-signature (multi-sig) wallets require multiple approvals to execute transactions. This prevents any single person from having unilateral control over funds.

**Our Setup:**
- **Development Fund:** 5-of-9 multi-sig
- **Team Tokens:** 3-of-5 multi-sig  
- **Emergency:** 2-of-3 multi-sig

---

## 🛠️ Recommended: Gnosis Safe

Gnosis Safe (now Safe) is the industry standard for multi-sig wallets.

### Setup Steps:

#### Step 1: Go to Safe
```
https://app.safe.global
```

#### Step 2: Connect Wallet
- Connect with MetaMask or other wallet
- This will be one of the signers

#### Step 3: Create New Safe
1. Click "Create New Safe"
2. Select network: **Polygon**
3. Name your Safe (e.g., "LUC Development Fund")

#### Step 4: Add Owners (Signers)
Add addresses for all signers:
```
Owner 1: 0x... (Founder)
Owner 2: 0x... (CTO)
Owner 3: 0x... (Lead Dev)
Owner 4: 0x... (Advisor 1)
Owner 5: 0x... (Advisor 2)
... up to 9 for dev fund
```

#### Step 5: Set Threshold
- For 5-of-9: Set threshold to 5
- This means 5 out of 9 signers must approve any transaction

#### Step 6: Review & Deploy
- Review all settings
- Deploy the Safe contract
- Pay gas fee (~$1-5 on Polygon)

---

## 🏦 Our Multi-Sig Structure

### 1. Development Fund (200M LUC)
```
Type: 5-of-9 Multi-sig
Purpose: Development expenses, partnerships, operations
Access: Requires 5 of 9 signers to approve

Signers:
1. Founder (internal)
2. CTO (internal)
3. Lead Developer (internal)
4. Operations Manager (internal)
5. Advisor 1 (external)
6. Advisor 2 (external)
7. Community Representative (external)
8. Legal Advisor (external)
9. Security Consultant (external)
```

### 2. Team Allocation (150M LUC in Vesting)
```
Type: 3-of-5 Multi-sig
Purpose: Team token management and vesting
Access: Requires 3 of 5 signers

Signers:
1. Founder
2. CTO
3. Lead Developer
4. HR Manager
5. External Advisor
```

### 3. Emergency Multi-sig
```
Type: 2-of-3 Multi-sig
Purpose: Emergency actions only
Access: Quick response for critical issues

Signers:
1. Founder
2. CTO
3. Security Lead
```

---

## 📝 Multi-Sig Policies

### Transaction Approval Process:

1. **Propose:** Any signer can propose a transaction
2. **Review:** Other signers review the proposal
3. **Discuss:** Team discusses in private channel
4. **Sign:** Signers approve by signing
5. **Execute:** Once threshold met, transaction executes

### Approval Timeframes:

| Transaction Type | Discussion Period | Minimum Signers |
|------------------|-------------------|-----------------|
| Regular (<$10k) | 24 hours | 5 of 9 |
| Large ($10k-$100k) | 72 hours | 6 of 9 |
| Critical (>$100k) | 7 days | 7 of 9 |
| Emergency | Immediate | 2 of 3 |

### What Requires Multi-Sig:

✅ Token transfers from treasury
✅ Liquidity additions/removals
✅ Contract deployments
✅ Partnership payments
✅ Marketing expenses
✅ Team salary payments
✅ Any fund movement

### What Doesn't Need Multi-Sig:

❌ Personal wallets
❌ Testnet operations
❌ Documentation updates
❌ Social media posts

---

## 🔒 Security Best Practices

### For Signers:

1. **Hardware Wallet Required**
   - Use Ledger or Trezor
   - Never sign from hot wallet

2. **Verify Before Signing**
   - Check transaction details carefully
   - Verify recipient address
   - Confirm amount is correct

3. **Separate Signing Device**
   - Don't use daily computer for signing
   - Consider dedicated laptop

4. **Secure Communication**
   - Use encrypted channels for discussions
   - Never share signing intentions publicly

5. **Regular Key Rotation**
   - Update signer list if someone leaves
   - Review access quarterly

### Emergency Procedures:

**If a signer is compromised:**
1. Immediately notify other signers
2. Do NOT sign any pending transactions
3. Create new Safe with new signers
4. Transfer funds to new Safe

**If majority of signers compromised:**
1. This is a critical emergency
2. Remaining signers should NOT sign anything
3. Engage security team and legal
4. Public disclosure may be needed

---

## 📊 Tracking & Transparency

### Public Dashboards:

All multi-sig transactions are viewable on:
- PolygonScan
- Safe Transaction Service
- Our transparency page (coming soon)

### Reporting:

| Report Type | Frequency |
|-------------|-----------|
| Transaction log | Real-time (on-chain) |
| Summary report | Monthly |
| Financial audit | Quarterly |
| Full audit | Annually |

---

## 🛠️ Technical Setup

### Adding LUC Token to Safe:

1. Open your Safe
2. Go to "Assets" → "Coins"
3. Click "Add custom token"
4. Enter LUC contract address
5. Token appears in asset list

### Creating a Transaction:

1. Go to "New Transaction"
2. Select "Send tokens"
3. Choose LUC token
4. Enter recipient address
5. Enter amount
6. Add description/memo
7. Submit for signatures

### Checking Status:

1. Go to "Transactions" → "Queue"
2. See pending transactions
3. View who has signed
4. See who still needs to sign

---

## 📋 Checklist Before Launch

### Multi-Sig Setup:
- [ ] Create Development Fund Safe (5-of-9)
- [ ] Create Team Token Safe (3-of-5)
- [ ] Create Emergency Safe (2-of-3)
- [ ] All signers confirmed and added
- [ ] All signers using hardware wallets
- [ ] Test transaction executed successfully
- [ ] Policies documented and agreed

### Token Distribution:
- [ ] Transfer 200M LUC to Dev Fund Safe
- [ ] Transfer 150M LUC to Vesting Contract (team)
- [ ] Transfer 50M LUC to Advisor Vesting
- [ ] Transfer 150M LUC to Liquidity multi-sig
- [ ] Verify all balances correct

---

## 📞 Contact

For multi-sig related questions:
- Internal: Secure channel only
- Emergency: [Emergency contact]

---

**Remember:** Multi-sig is a KEY security measure. Never bypass it, even for "small" transactions.

🔐 **Security is not optional - it's foundational.**
