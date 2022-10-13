import React, { useEffect, useState } from "react"; 
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import { UseAuth } from "../../../context/useAuth"; 
import CurrencyFormat from 'react-currency-format';

function DashBoardWallet() {
  const { walletBalance } = UseAuth(); 
  const [loading, setLoading] = useState(true); 
  const [balance, setBalance] = useState(0);

  const GetWalletBalance = async() => {
    await walletBalance().then(() => { 
      setBalance(Number(localStorage.getItem("walletBalance")).toFixed(2)); 
      setLoading(false);
    }
    );
  }
useEffect(() => {
  GetWalletBalance();
}, [])
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ padding: "0 3%" }}>
        <div className="balance-wrapper">
          <div className="balance">
            <p className="text">Wallet Balance</p>
            <p className="acct-bal"> 
            {loading ? <ThreeDots /> : <>&#8358;
            <CurrencyFormat value={balance} displayType={'text'} thousandSeparator={true} />
             </>} 
            </p>
            <button>Active is active</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardWallet;
