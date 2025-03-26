import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const NavbarSection = styled(Box)({
  height: "50px",
  backgroundColor: "#232F3E",
  color:"white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap", // Makes it responsive
  padding: "0 20px",
});

export const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  padding: "5px 10px",
  fontWeight: "bold",
  
});
