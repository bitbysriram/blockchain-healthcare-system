# 🏥 Blockchain-Based Healthcare Decentralized Application

A secure and decentralized healthcare management system built using ReactJS, Solidity, Ethereum, Hardhat, Ethers.js, MetaMask, and IPFS. The application enables patients to securely manage medical records while providing controlled access to verified doctors through blockchain technology.

---

## 🚀 Features

- Secure medical record management
- Patient-controlled access permissions
- Doctor registration and verification
- Smart contract-based authorization
- MetaMask wallet integration
- Decentralized storage using IPFS
- Transparent and tamper-proof records

---

## 🛠️ Technologies Used

- ReactJS
- Solidity
- Ethereum
- Hardhat
- Ethers.js
- MetaMask
- IPFS

---

## 📂 Project Structure

```bash
Healthcare-DApp
│
├── contracts
│   └── Healthcare.sol
│
├── scripts
│   └── deploy.js
│
├── src
│   ├── App.jsx
│   ├── main.jsx
│   └── Healthcare.json
│
└── README.md
```

## ⚙️ Smart Contract Functionalities

### Doctor Module
- Register Doctor
- Verify Doctor

### Patient Module
- Add Medical Records
- Grant Access
- Revoke Access

### Access Control
- Only verified doctors can access records
- Patients control who can view their records

---

## 🔐 Workflow

1. Patient uploads medical records.
2. Records are stored on IPFS.
3. IPFS hash is stored on Ethereum blockchain.
4. Patient grants access to a verified doctor.
5. Authorized doctor views medical records.

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/healthcare-dapp.git
cd healthcare-dapp
```

### Install Dependencies

```bash
npm install
```

### Compile Smart Contract

```bash
npx hardhat compile
```

### Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js
```

### Run Frontend

```bash
npm run dev
```

---

## 📊 Dataset

Sample Electronic Health Records (EHR) and patient medical data were used for testing and demonstration purposes.

---

## 🎯 Objectives

- Improve healthcare data security
- Enable patient ownership of records
- Ensure transparency and trust
- Reduce dependency on centralized systems

---

## 🔮 Future Enhancements

- Deploy on Ethereum Sepolia Testnet
- Full IPFS integration
- Mobile Application
- AI-Based Diagnosis Support
- Emergency Access Mechanism

---

## 👨‍💻 Team Members

- Urjana Sudhir Rao
- Arghyadeep Jana
- Smruti Ranjan Sahu
- Sri Ram Satapathi

---

## 📜 License

This project is licensed under the MIT License.

---

### ⭐ Blockchain-Based Healthcare Decentralized Application
Secure • Transparent • Patient-Centric
