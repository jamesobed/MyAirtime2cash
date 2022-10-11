import React, { useState } from "react";
import StyleButton from "../styles/ButtonStyles.js";
import { UseAuth } from "../context/useAuth";
import logo from "../assets/icon/logo2.svg";

import {
  StyledContainer,
  StyledFormArea,
  StyledTitle, 
  ResetPassword,
  FormInput,
  Logo,
  FormLabel, 
} from "../styles/resetPassStyle";
import { RestForm } from "../styles/forgetPassStyle";
import { Link, useParams } from "react-router-dom";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots.js";

export const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showLoading, setShowLoading] = useState(false);

  const { resetPassword } = UseAuth();
  const {token} = useParams()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    await resetPassword(formData, token).then(() => {
      setShowLoading(false);
    }).catch(() => {
      setShowLoading(false);
    });
  };

  return (
    <div>
      <StyledContainer>
        <StyledFormArea>
          <Link to="/">
          <Logo><img src={logo} alt="" /></Logo>
          </Link>
          <RestForm onSubmit={handleResetPassword}>
          <StyledTitle>Password Reset</StyledTitle>
            <FormLabel className="formLabel">New Password</FormLabel>
            <FormInput
              name="password"
              type="password"
              placeholder="Enter new password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
            <FormLabel className="formLabel">Confirm Password</FormLabel>
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
              }}
            />

            <StyleButton disabled={showLoading} width="100%" borderRadius="0" type="submit">
             
              {!showLoading ? <ResetPassword type='submit'>Reset Password</ResetPassword>:
              <ThreeDots height="1rem" fill="#DE3D6D" />}
            </StyleButton>
          </RestForm>
        </StyledFormArea>
      </StyledContainer>
    </div>
  );
};
