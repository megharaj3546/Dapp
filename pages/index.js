import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    accountHolderName: "Megharaj",
    address: "123 Church st ,Banglore",
    amountType: "",
    amount: 0,
    balance: 0,
    time: "",
    date: "",
    location: "ATM Location",
  });

  const [transactionHistory, setTransactionHistory] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({
      method: "eth_requestAccounts",
    });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(
      contractAddress,
      atmABI,
      signer
    );

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(100); // Prompting user to deposit 100 ETH
      await tx.wait();
      getBalance();
      showTransactionReceipt("Deposit", 100);
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(50); // Prompting user to withdraw 50 ETH
      await tx.wait();
      getBalance();
      showTransactionReceipt("Withdrawal", 50);
    }
  };

  const showTransactionReceipt = (type, amount) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    const newReceipt = {
      accountHolderName: "Megharaj", 
      address: "123 Church St, Banglore", 
      amountType: type,
      amount: amount,
      balance: balance,
      time: formattedTime,
      date: formattedDate,
      location: "ATM Location",
    };

    setReceiptData(newReceipt);
    setShowReceipt(true);

    // Store the transaction details in the history
    setTransactionHistory((prevHistory) => [newReceipt, ...prevHistory]);
  };

  const hideReceipt = () => {
    setShowReceipt(false);
  };

  const showRecentReceipt = () => {
    if (transactionHistory.length > 0) {
      setReceiptData(transactionHistory[0]);
      setShowReceipt(true);
    }
  };

  const renderReceipt = () => {
    return (
      <div className="receipt">
        <h2>Receipt</h2>
        <p>Account Holder: {receiptData.accountHolderName}</p>
        <p>Address: {receiptData.address}</p>
        <p>Amount Type: {receiptData.amountType}</p>
        <p>Amount: {receiptData.amount} ETH</p>
        <p>Balance: {receiptData.balance} ETH</p>
        <p>Date: {receiptData.date}</p>
        <p>Time: {receiptData.time}</p>
        <p>Location: {receiptData.location}</p>
      </div>
    );
  };

  const initUser = () => {
    if (!ethWallet) {
      return (
        <p>Please install Metamask in order to use this ATM.</p>
      );
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit} style={{ background: 'blue', color: 'white' }}>
          Deposit 100 ETH
        </button>
        <button onClick={withdraw} style={{ background: 'brown', color: 'white' }}>
          Withdraw 50 ETH
        </button>
        <button
          onClick={showRecentReceipt}
          style={{ background: 'green', color: 'white' }}
        >
          Show Recent Receipt
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the MetaATM Experience!</h1>
        <p>Empowering Your Digital Finances with Blockchain</p>
      </header>
      {initUser()}
      {showReceipt && (
        <div className="modal">
          <div className="modal-content">
            {renderReceipt()}
            <button onClick={hideReceipt}>Close Receipt</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          text-align: center;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .receipt {
          text-align: left;
        }
      `}</style>
    </main>
  );
}
