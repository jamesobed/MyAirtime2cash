import React, { useState } from "react";
import Button from "../../styles/ButtonStyles";
import { StyledInput } from "../../styles/DashboardStyles/TabStyles/SellAirTimeStyles";
import { InputAlertWrapper } from "../../styles/InputAlertStyle";
import { AiOutlineClose } from "react-icons/ai";
import { ThreeDots } from 'react-loading-icons'
import { UseAuth } from "../../context/useAuth";
import OtpInput from "../OtpInput";

const InputAlert = ({ innerRef, setClose, transactionDetails, rowData }) => {
  const [transact, setTransact] = useState({...transactionDetails,status:'sent'}); 
  const [showLoading, setShowLoading] = useState(false);
  const [closeOtp, setCloseOtp] = useState(true)

  const { generateOtp } = UseAuth();


  const handleOtp = async(e) => {
    e.preventDefault();
    setShowLoading(true)
    await generateOtp('To Credit user wallet', 'sendOTPAdmin').then((data) => {
      setShowLoading(false);
      
      if(data.status===201){
        setCloseOtp(false)
      }
    }).catch((error) => {
      console.log(error)
      setShowLoading(false);
    });
  }



  const handleChange = (e) => {  
    setTransact({ 
      ...transact, 
      amountsent: e.target.value, 
      amountreceived:(70 * e.target.value) / 100,
      status: 'sent'
     });
  };



  return (
    <InputAlertWrapper>
    
      <div className="input-alert" ref={innerRef}>
      {!closeOtp && <OtpInput setCloseOtp={setCloseOtp} data={transact}/>}

        <AiOutlineClose className="closeIcon" onClick={() => setClose(false)} />
        <h3>Enter an amount</h3>
        <form className="inputs" onSubmit={handleOtp}>
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
            {!showLoading ? <span>Send Otp</span>:
              <ThreeDots height="1rem" fill="#DE3D6D" />}
            </Button>
          </div>

        </form>

      </div>
    </InputAlertWrapper>
  );
};

export default InputAlert;
