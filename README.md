# MetaATM - Empowering Your Digital Finances with Blockchain

Welcome to the MetaATM Experience! This decentralized application (DApp) provides a seamless and secure way for users to interact with a blockchain-based ATM smart contract. The MetaATM DApp leverages the Ethereum blockchain and MetaMask wallet to empower users in managing their digital finances.

## Features

### 1. Account Connection

- **MetaMask Integration**: MetaATM seamlessly integrates with MetaMask, a popular Ethereum wallet extension for web browsers.

- **Connect Your Wallet**: Users can connect their MetaMask wallet to the MetaATM DApp to access and manage their Ethereum account.

### 2. ATM Operations

- **Deposit ETH**: Users can deposit Ether (ETH) into the smart contract by initiating a deposit operation. The DApp prompts the user to deposit a specific amount (e.g., 100 ETH).

- **Withdraw ETH**: Users can withdraw Ether from the smart contract by initiating a withdrawal operation. The DApp prompts the user to withdraw a specific amount (e.g., 50 ETH).

### 3. Transaction History

- **Receipt Generation**: After each successful deposit or withdrawal, a detailed receipt is generated. The receipt includes information such as the account holder's name, address, transaction type, amount, balance, date, time, and location.

- **Transaction History**: The DApp maintains a transaction history, allowing users to view their recent transactions and receipts.

## Getting Started

1. **Install MetaMask**: Ensure that you have the MetaMask wallet extension installed in your web browser. If not, please install it from [metamask.io](https://metamask.io/).

2. **Connect Your Wallet**: Open the MetaATM DApp and connect your MetaMask wallet. Follow the prompts to authorize and connect your Ethereum account.

3. **Explore MetaATM**: Once connected, you can view your account details, check your balance, deposit ETH, withdraw ETH, and view transaction receipts.

## Usage

- **Deposit 100 ETH**: Click the "Deposit 100 ETH" button to initiate a deposit transaction. Confirm the transaction in MetaMask.

- **Withdraw 50 ETH**: Click the "Withdraw 50 ETH" button to initiate a withdrawal transaction. Confirm the transaction in MetaMask.

- **View Balance**: Your current account balance is displayed on the page.

- **View Receipts**: Click the "Show Recent Receipt" button to view the most recent transaction receipt.

## Development

The MetaATM DApp is built using:

- **Solidity**: Smart contract development language for Ethereum.
- **React**: Frontend library for building user interfaces.
- **MetaMask**: Ethereum wallet extension for browser integration.
- **ethers.js**: JavaScript library for interacting with the Ethereum blockchain.

# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Megharaj T S

megharaj25317@gmail.com
