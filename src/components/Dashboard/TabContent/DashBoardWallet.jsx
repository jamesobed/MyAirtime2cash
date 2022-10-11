import React from "react";
// import naira from "../../../assets/icon/naira.svg";
// import newnaira from "../../../assets/newnaira.png";
function DashBoardWallet() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ padding: "0 3%" }}>
        <div className="balance-wrapper">
          <div className="balance">
            <p className="text">Wallet Balance</p>
            <p className="acct-bal">
              {/* <img src={newnaira} alt="" width={35} /> */}
              {/* <img src={naira} alt="" /> */}
              {/* <h3 style={{ textDecoration: "line-through" }}>N</h3> */}
              &#8358;{localStorage.getItem("walletBalance")}.00
            </p>
            <button>Active is active</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardWallet;
