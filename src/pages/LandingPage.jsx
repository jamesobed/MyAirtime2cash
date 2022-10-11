import React from "react";
import {
  Hero,
  AboutSection,
  SideIndicator,
  AboutCardWrapper,
  AboutCard,
  ProductSection,
  TestimonialSection,
  TestimonialCardWrapper,
} from "../styles/LandingStyles";
import heroImage from "../assets/images/HeroImage.png";
import rechargeImage from "../assets/images/Recharge.png";
import loginIcon from "../assets/icon/Login.svg";
import DashboardIcon from "../assets/icon/Dashboard.svg";
import Spinning from "../assets/icon/Spinning.svg";
import StyleButton from "../styles/ButtonStyles.js";
import SliderItem from "../components/Landing/SliderItem.jsx";
import { Navbar } from "../components/Landing/Navbar";
import { Footer } from "../components/Landing/Footer";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export const LandingPage = () => {
  useEffect(() => {
        AOS.init();
      }, [])

  const slideData = [
    {
      name: "Adekola Johnson",
      message:
        "I mistakenly use my school fee to purchase a recharge card via my bank’s USSD, this was really heartbreaking to me, but thanks to Reacharge2Cash, I was able to convert my recharge card to cash in no time.",
    },
    {
      name: "King David",
      message:
        "This platform is easy and straightforward. I was in a tight situation and needed to sell my excess recharge card for cash because of my pressing need at that point in time, and this platform bailed me out",
    },
    {
      name: "Paul James",
      message:
        "I got to know about this platform from a friend of mine, and ever since I have been using their services, I have never been disappointed at any point, the customer response services are great.",
    },
    {
      name: "John Doe",
      message:
        "I thank God for making me stumble on this platform, before now I have searched all over the internet looking for a reliable and secure platform to carry out recharge card sales transactions but ended up being scammed.",
    },
  ];
  return (
    <div>
      {/* HERO SECTION  */}
      <Navbar landing />
      <Hero>
        <div data-aos="fade-right" className="heroText">
          <p>
            <b>Surplus Airtime? Don't worry we got you covered</b>
          </p>
          <small>
            Excess recharge!, this is usually heartbreaking, worry no more. Now
            you can exchange your excess airtime for cash value via this
            platform
          </small>
          <Link to="/register">
            <StyleButton height="48px" width="185px">
              Get Started
            </StyleButton>
          </Link>
        </div>
        <div className="heroImage">
          <img data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500" src={heroImage} alt="" />
        </div>
      </Hero>
      {/* ABOUT SECTION */}
      <AboutSection id="about">
        <SideIndicator />
        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="aboutDescription">
          <h2>Change Surplus Airtime to Real Cash</h2>
          <small>In three simple steps, change airtime to cash</small>
        </div>
      </AboutSection>
      <AboutCardWrapper>
        <AboutCard data-aos="fade-up" data-aos-anchor-placement="top-center" backgroundColor="#FFF1F3">
          <img src={loginIcon} alt="" />
          <h4>Login or Register</h4>
          <p>
            First step is to Register, or you can login if you already have an
            account with us. The registration steps is easy and straightforward.
          </p>
        </AboutCard>
        <AboutCard data-aos="fade-up" data-aos-anchor-placement="top-center"  backgroundColor="#FFF1F3">
          <img src={DashboardIcon} alt="" />
          <h4>Deposit From Dashboard</h4>
          <p>
            After successful registration and email verification, login to your
            dashboard to access your wallet where you can make deposit.
          </p>
        </AboutCard>
        <AboutCard data-aos="fade-up" data-aos-anchor-placement="top-center"  backgroundColor="#F5FCF5">
          <img src={Spinning} alt="" />
          <h4>Convert</h4>
          <p>
            Then on the dashboard you can convert your recharge card which to
            cash
          </p>
        </AboutCard>
      </AboutCardWrapper>
      {/* PRODUCT SECTION */}
      <ProductSection id="product" data-aos="fade-up" data-aos-anchor-placement="top-center" >
        <div className="productDescription">
          <h2>The best platform for your convenient airtime exchange</h2>
          <p>
            You can also sell and buy recharge cards via this platform. The
            basis you need to do is verify you email
          </p>
          <Link to="/register">
            <StyleButton height="48px" width="185px">
              Get Started
            </StyleButton>
          </Link>
        </div>
        <div className="productImage">
          <img src={rechargeImage} alt="" />
        </div>
      </ProductSection>
      {/* TESTIMONIAL SECTION */}
      <TestimonialSection data-aos="fade-up" id="contactUs">
        <h1>Hear what our customers are saying</h1>
        <p>
          We have earn respect and trust from our client, because we respect
          them, and we are proud of them
        </p>
      </TestimonialSection>
      <TestimonialCardWrapper>
        <SliderItem data-aos="fade-up" data-aos-anchor-placement="bottom-center" slideData={slideData} />
      </TestimonialCardWrapper>
      <Footer />
    </div>
  );
};
