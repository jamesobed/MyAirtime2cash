import React, { useState } from "react";
import logo from "../../assets/icon/logo2.svg";
import { Link } from "react-router-dom";
import backicon from "../../assets/icon/backicon.svg";
import StyleButton from "../../styles/ButtonStyles.js";
import { toast } from "react-toastify";
import {
  Wrapper,
  Wrapper2,
  Logo,
  HeaderAndButton,
  Back,
  FormHeader,
  FormStyle,
  StyledLabel,
  StyledInput,
  StyledFooter,
} from "../../styles/registerStyle";

import { UseAuth } from "../../context/useAuth";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

export const Register = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [passwordMiss, setPasswordMiss] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = UseAuth();

  // console.log(formData);
  const handleCheckPassword = ()=>{
    if(formData.password !== formData.confirmPassword && formData.confirmPassword !== ""){
      setPasswordMiss(true)
    }else{
      setPasswordMiss(false)
    }
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword){
      setShowLoading(true);
    await register(formData).then(() => {
      setShowLoading(false);
    }).catch(() => {
      setShowLoading(false);
    });
    }else{
      toast.error("Password mismatch", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Wrapper>
      <Wrapper2>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>

        <HeaderAndButton>
          <Link to="/login">
            <Back>
              <img src={backicon} alt="logo" />
              Go back
            </Back>
          </Link>
          <FormHeader>Create an account</FormHeader>
        </HeaderAndButton>

        <FormStyle onSubmit={handleRegister}>
          <StyledLabel>First Name</StyledLabel>
          <StyledInput
            required
            placeholder="Enter your first name"
            type="text"
            name="firstName"
            onChange={(e) =>
              setFormData({
                ...formData,
                firstName: e.target.value.trim(),
              })
            }
          ></StyledInput>
          <StyledLabel>Last Name</StyledLabel>
          <StyledInput
            required
            placeholder="Enter your last name"
            type="text"
            name="lastName"
            onChange={(e) =>
              setFormData({
                ...formData,
                lastName: e.target.value.trim(),
              })
            }
          ></StyledInput>

          <StyledLabel> Email</StyledLabel>
          <StyledInput
          required
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.trim(),
              })
            }
          ></StyledInput>

          <StyledLabel> Username</StyledLabel>
          <StyledInput
          required
            placeholder="Enter your username"
            type="text"
            name="userName"
            onChange={(e) =>
              setFormData({
                ...formData,
                userName: e.target.value.trim(),
              })
            }
          ></StyledInput>

          <StyledLabel> Phone Number</StyledLabel>
          <StyledInput
          required
            placeholder="Enter your phone number"
            type="text"
            name="phoneNumber"
            onChange={(e) =>
              setFormData({
                ...formData,
                phoneNumber: e.target.value.trim(),
              })
            }
          ></StyledInput>
          {passwordMiss && <p className="passwordCheck">Password mismatch</p>}
          <StyledLabel> Password</StyledLabel>
          <StyledInput
          required
            placeholder="Enter your password"
            type="password"
            name="password"
            onKeyUp={handleCheckPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value.trim()
              })
            }
          ></StyledInput>
          <StyledLabel> Confirm Password</StyledLabel>

          <StyledInput
          required
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            onKeyUp={handleCheckPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value.trim(),
              })
            }
          ></StyledInput>
          <StyleButton disabled={showLoading} width="100%" borderRadius="0" type="submit">
            {showLoading ? <ThreeDots height="1rem" fill="#DE3D6D" /> : "Sign Up"}
           </StyleButton>
        </FormStyle>

        <StyledFooter>
          Already have an an account? <Link to="/login"> Sign In </Link>
        </StyledFooter>
      </Wrapper2>
    </Wrapper>
  );
};
