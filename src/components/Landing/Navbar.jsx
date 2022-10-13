import React from "react";
import logo from "../../assets/icon/logo2.svg";
// import { NavLink } from 'react-router-dom'
import { useState } from "react";
import {
  Wrapper,
  Nav,
  Logo,
  Hamburger,
  Menu,
  MenuLinks,
  LogoWrapper,
} from "../../styles/NavbarStyles";
import StyleButton from "../../styles/ButtonStyles.js";
import UserProfileNav from "./UserProfileNav";
import { Link } from "react-router-dom";
import useOutsideClick from "../../context/useOutsideClick";


export const Navbar = ({ landing, dashboard }) => {
  const [open, setOpen] = useState(false);
  
  // eslint-disable-next-line
  const [isLogin, setIsLogin] = useState(false);


  return (

    <Wrapper>
      <Nav>
      
        <LogoWrapper style={{width: dashboard ? "100%" : ""}} >
        <a href="/">
          <Logo src={logo} alt="" />
        </a>
        {landing && (
          <Hamburger onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span />
          </Hamburger>
        )}
        {dashboard && <UserProfileNav  dashboard setLogout={setIsLogin} />}
        </LogoWrapper>
        {landing && (
          <Menu open={open}>
            <MenuLinks onClick={() => setOpen(!open)}>
              <a href="/">Home</a>
            </MenuLinks>
            <MenuLinks onClick={() => setOpen(!open)}>
              <a href="/#about">About Us</a>
            </MenuLinks>
            <MenuLinks onClick={() => setOpen(!open)}>
              <a href="/#product">Products</a>
            </MenuLinks>
            <MenuLinks onClick={() => setOpen(!open)}>
              <a href="/#contactUs">Contact Us</a>
            </MenuLinks>
            {localStorage.getItem("token") ? (
              <UserProfileNav setLogout={setIsLogin} />
            ) : (
              <StyleButton onClick={() => setIsLogin(true)} width="20%">
                <Link to="/login">Login</Link>
              </StyleButton>
            )}
          </Menu>
        )}
      </Nav>
    </Wrapper>
  );
};

// activeClassName="active"
