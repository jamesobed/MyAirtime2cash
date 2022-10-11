import React, { useState } from "react";
import Button from "../../styles/ButtonStyles";
import { StyledInput } from "../../styles/DashboardStyles/TabStyles/SellAirTimeStyles";
import { InputAlertWrapper } from "../../styles/InputAlertStyle";
import { AiOutlineClose } from "react-icons/ai";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import { UseAuth } from "../../context/useAuth";

const InputAlert = ({ innerRef, setClose, transactionDetails, rowData }) => {
  const [transact, setTransact] = useState({...transactionDetails,status:'sent'}); 
  const [showLoading, setShowLoading] = useState(false);

  const { creditWallet } = UseAuth();


  const handleConfirm = async(e) => {
    e.preventDefault();
    setShowLoading(true) 
    await creditWallet(transact).then((data) => {
      console.log(transact)
      setShowLoading(false);
      if(data.status===201){
      // rowData.splice(transact.rowIndex, 1)
      window.location.reload();

      }
    }).catch((error) => {
      console.log(error)
      setShowLoading(false);
    });

 
    setClose(false);
  };

  const handleChange = (e) => {  
    setTransact({ 
      ...transact, 
      amountsent: e.target.value, 
      amountreceived: 0.7 * e.target.value,
      status: 'sent'
     });
  };



  return (
    <InputAlertWrapper>
      <div className="input-alert" ref={innerRef}>
        <AiOutlineClose className="closeIcon" onClick={() => setClose(false)} />
        <h3>Enter an amount</h3>
        <form className="inputs" onSubmit={handleConfirm}>
          <div className="inputWrapper">
            <label>Amount Sent</label>
            <StyledInput
            required
              Padding="18px"
              type="number"
              name="amount"
              value={`${transact.amountsent}`}
              onChange={handleChange}
            />
          </div>
          <div className="inputWrapper">
            <label>Amount receive</label>
            <StyledInput
              Padding="18px"
              disabled
              style={{ border: "none" }}
              type="text"
              value={`N${transact.amountreceived}`}
              // onChange={(e)=>handleChange(e.target.value)}
            />
          </div>
          <div className="buttonWrapper">
            <Button disabled={showLoading}  type="submit" borderRadius="0%" height="48px" width="198px">
            {!showLoading ? <span>Confirm</span>:
              <ThreeDots height="1rem" fill="#DE3D6D" />}
            </Button>
          </div>
        </form>
      </div>
    </InputAlertWrapper>
  );
};

export default InputAlert;
