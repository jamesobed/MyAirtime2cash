import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../styles/ButtonStyles'
import { OtpInputWrapper } from '../styles/OtpInputStyles'
import OtpInputField from 'react-otp-input';
import { UseAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loading-icons'

const OtpInput = ({data, setCloseOtp, setFormData}) => {
const [showLoading, setShowLoading] = useState(false);
const [payLoad, setPayLoad] = useState(data);
const { withdraw, creditWallet } = UseAuth();

const [otp, setOtp] = useState('')
const handleChange = (e) => {
    // console.log(e)
    setOtp(e)
    console.log(otp)
    setPayLoad({ 
        ...payLoad, 
        Otp: e,
       });
}
        const handleConfirm = async(e) => {
            e.preventDefault();
            if(otp.length < 6){
               return  toast.error("Invalid Token");
            }

            setShowLoading(true);
          
      await withdraw(payLoad).then((data) => {
              console.log(data)
              setShowLoading(false);
              setCloseOtp(true)
              if(data.status===201){
                setFormData({
                  bank: "",
                  accountNumber: "",
                  accountName: "",
                  amount: "",
                  password: "",
                });
              // window.location.reload();
        
              }
            }).catch((error) => {
              console.log(error)
              setShowLoading(false);
            });
             
          };


 
  return (
    <OtpInputWrapper>
    <div className="otp-input">
      <AiOutlineClose
        className="closeIcon"
        onClick={() => setCloseOtp(true)}
      />
      <form className="input-wrapper" onSubmit={handleConfirm}>
            <p>Otp Sent to your email and phone number</p>
          <OtpInputField 
          required
                value={otp} 
                onChange={handleChange}
                numInputs={6}
                inputStyle = {{ 
                    boxSizing: 'border-box',
                    width: '2.5rem',
                    padding: '14px',
                    margin: '10px 0',
                    border: '1px solid #d9d9d9',
                    outline: 'none',
                    color:'black',
                }}
      />
        <div className="buttonWrapper">
        <Button disabled={showLoading}  type="submit" borderRadius="0%" height="48px" width="198px">
            {!showLoading ? <span>Confirm</span>:
              <ThreeDots height="1rem" fill="#DE3D6D" />}
            </Button>

         
        </div>
      </form>
    </div>
  </OtpInputWrapper>
  )
}

export default OtpInput