# 🗳️ Decentralized Voting DApp

A blockchain-based decentralized voting application that ensures transparency, immutability, and fairness using **Ethereum**, **Solidity**, and **Web3.js**. This project uses **Truffle**, **Ganache**, and **MetaMask** to simulate a real-world election process without a central authority.

![License](https://img.shields.io/badge/license-MIT-green)
![Ethereum](https://img.shields.io/badge/built%20with-Ethereum-blue)
![Made with Web3](https://img.shields.io/badge/Web3.js-Ethereum-orange)

---

## 📌 Features

### 👑 Admin
- Automatically assigned as the contract deployer.
- Can start, end, and reset the election.
- Can view the winning candidate at the end of voting.

### 🧑‍💻 Voters
- Connect using MetaMask.
- Cast **one** vote per wallet address.
- View **real-time vote counts** of all candidates.
- Cannot vote after session ends or vote more than once.

---

## 🔧 Tech Stack

| Layer        | Technologies Used                       |
|--------------|------------------------------------------|
| Smart Contract | Solidity                                |
| Frontend     | HTML, CSS, JavaScript                   |
| Web3 Integration | Web3.js                               |
| Blockchain Simulator | Ganache                         |
| Framework    | Truffle                                 |
| Wallet       | MetaMask                                |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/decentralized-voting-dapp.git
cd decentralized-voting-dapp

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Ganache  
Open Ganache and create a new workspace (use default RPC: `http://127.0.0.1:7545`).

### 4. Compile & Migrate Smart Contract
```bash
truffle compile
truffle migrate --network development
```

### 5. Run the App
Just open `index.html` in a browser (preferably Chrome).  
Make sure MetaMask is installed and connected to the same Ganache network.

---

## 🧠 Smart Contract Functions

- `startVoting()` – Initiates the voting process.
- `vote(uint id)` – Allows a user to vote for a candidate.
- `endVoting()` – Closes voting and determines the winner.
- `resetElection()` – Clears previous data and sets up a new election.
- `getWinner()` – Returns the winning candidate.
- `getCandidate(uint id)` – Returns candidate details.

---

## 📸 Screenshots

> Add screenshots of:
> - Voting interface
> - Admin panel
> - Live vote count
> - Winner announcement

---

## ✨ Future Enhancements

- ✅ Identity verification using ZK-proofs or wallet linkage.
- ✅ IPFS-based decentralized candidate storage.
- ✅ Integration with public Ethereum testnet.
- ✅ Full React or Vue.js frontend for dynamic UI.

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to fork, contribute, and build upon it.

---

## 🙌 Acknowledgments

- [Ethereum Documentation](https://ethereum.org)
- [Solidity Docs](https://docs.soliditylang.org)
- [Truffle Suite](https://trufflesuite.com/)
- [Web3.js](https://web3js.readthedocs.io/)

---

> Made with 💙 by Shivam
```
