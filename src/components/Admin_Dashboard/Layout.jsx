import React,  { useEffect, useState }  from "react";
import {MdOutlineDashboardCustomize} from "react-icons/md";
import {GrClose} from "react-icons/gr";
import {BiTransfer} from "react-icons/bi";
import { FaBars}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { SideBarStyle } from "../../styles/AdminDashboardStyle/Layout";

const Layout = ({children}) => {
 const[isOpen ,setIsOpen] = useState(true);
 const toggle = () => setIsOpen (!isOpen);
//  const [isMobile, setIsMobile] = useState(false)

//choose the screen size 
const handleResize = () => {
    if (window.innerWidth > 768) {
        setIsOpen(true)
    } else {
        setIsOpen(false)
    }
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })



 const menuItem=[
     {
         path:"/dashboard/admin/",
         name:"Overview",
         icon:<MdOutlineDashboardCustomize/>
     },
     {
         path:"/dashboard/admin/transactions",
         name:"Transactions",
         icon:<BiTransfer/>
     },
 ]

  return (
    <SideBarStyle>
      {/* SIDE BAR */}
      <div className="container"> 
           <div style={{width: isOpen ? "302px" : "50px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                   <div  className="bars">

                   {!isOpen &&<FaBars onClick={toggle}/>}
                    {isOpen && <GrClose onClick={toggle}/>}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active" end>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className="mainPage">{children}</main>
        </div>
    </SideBarStyle>
  );
};

export default Layout;
