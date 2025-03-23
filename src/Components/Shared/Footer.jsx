import React from "react";
import { BackToTop, FooterContainer, FooterSection, StyledLink } from "../../styles/Footer";
import {  Typography } from "@mui/material";


export const Footer = () => {
  return (
    <>
      {/* Back to Top Section */}
      <BackToTop>
        <Typography>Back to top</Typography>
      </BackToTop>

      {/* Footer Main Section */}
      <FooterContainer>
        <FooterSection>
          <Typography variant="h6">Get to Know Us</Typography>
          <StyledLink to="/about">About Us</StyledLink>
          <StyledLink to="/careers">Careers</StyledLink>
          <StyledLink to="/press-releases">Press Releases</StyledLink>
          <StyledLink to="/amazon-science">Amazon Science</StyledLink>
        </FooterSection>

        <FooterSection>
          <Typography variant="h6">Connect with Us</Typography>
          <StyledLink to="/facebook">Facebook</StyledLink>
          <StyledLink to="/twitter">Twitter</StyledLink>
          <StyledLink to="/instagram">Instagram</StyledLink>
        </FooterSection>

        <FooterSection>
          <Typography variant="h6">Make Money with Us</Typography>
          <StyledLink to="/sell-on-amazon">Sell on Amazon</StyledLink>
          <StyledLink to="/amazon-accelerator">Sell under Amazon Accelerator</StyledLink>
          <StyledLink to="/affiliate">Become an Affiliate</StyledLink>
          <StyledLink to="/advertise">Advertise Your Products</StyledLink>
          <StyledLink to="/sell-on-amazon">Supply to Amazon</StyledLink>
          <StyledLink to="/amazon-accelerator">Become an Affiliate</StyledLink>
          <StyledLink to="/affiliate">Fulfilment by Amazon</StyledLink>
          <StyledLink to="/advertise">Advertise Your Products</StyledLink>
          <StyledLink to="/advertise">Amazon Pay on Merchants</StyledLink>


          
        </FooterSection>

        <FooterSection>
          <Typography variant="h6">Let Us Help You</Typography>
          <StyledLink to="/your-account">Your Account</StyledLink>
          <StyledLink to="/returns">Returns Centre</StyledLink>
          <StyledLink to="/purchase-protection">100% Purchase Protection</StyledLink>
          <StyledLink to="/help">Help</StyledLink>
          <StyledLink to="/your-account">Your Account</StyledLink>
          <StyledLink to="/returns">Returns Centre</StyledLink>
        </FooterSection>
      </FooterContainer>
    </>
  );
};
