import React, { useEffect } from "react";
import { UseAuth } from "../../../context/useAuth";
import Swal from "sweetalert2";
import {
  BankStyle,
  AccountStyle,
  BankHeader,
  BankWrapper,
} from "../../../styles/DashboardStyles/TabStyles/addBankStyle";
import StyleButton from "../../../styles/ButtonStyles";
import backicon from "../../../assets/icon/backicon.svg";

const ViewBank = ({ show }) => {
  const { getUserAccount, userbank, deleteBank } = UseAuth();

  useEffect(() => {
    getUserAccount(`${localStorage.getItem("id")}`);
    // eslint-disable-next-line
  }, []);

  const confirmDelete = (bankId, event) => {
    Swal.fire({
      title: "Are you sure you want to remove the bank?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const thisClicked = event.target.parentElement;
        deleteBank(bankId);
        thisClicked.closest("div").remove();
        Swal.fire("Deleted!", "Bank has been removed.", "success");
      }
    });
  };

  return (
    <BankWrapper>
      <img src={backicon} alt="Back" onClick={show} style={{
        cursor: 'pointer',
        width: '1rem',
      }}/>
      <BankHeader>
        <h3 className="bank-acct">Bank Account</h3>
      </BankHeader>
      <BankStyle>
        <div className="accounts">
          {userbank.length === 0 && (
            <h3 style={{ color: "#012a4a" }}>
              No bank added yet. Click button to add a bank
            </h3>
          )}
          {userbank.map((account) => (
            <AccountStyle key={account.id}>
              <div className="content">
                <p>{account.bankName}</p>
                <p>{account.accountNumber}</p>
                <p>{account.accountName}</p>
              </div>
              <button
                id={account.id}
                type="submit"
                className="remove-btn"
                onClick={(e) => {
                  confirmDelete(account.id, e);
                }}
              >
                Remove
              </button>
            </AccountStyle>
          ))}
          <StyleButton
            borderRadius="0px"
            height="48px"
            width="35%"
            style={{
              marginTop: "2rem",
            }}
            onClick={show}
          >
            Add New Bank
          </StyleButton>
        </div>
      </BankStyle>
    </BankWrapper>
  );
};

export default ViewBank;
