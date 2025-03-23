import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

// Back to Top Section
export const BackToTop = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "#37475A",
  height: "50px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#485769",
  },
});

// Footer Container (Holds all sections)
export const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  backgroundColor: "#232F3E",
  color: "white",
  padding: "40px 20px",
});

// Footer Individual Sections
export const FooterSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "white",
  padding: "10px",
  maxWidth: "250px",
});

// Footer Links Styling
export const StyledLink = styled(Link)({
  color: "#DDD",
  textDecoration: "none",
  fontSize: "14px", 
  "&:hover": {
    textDecoration: "underline",
  },
});

// // Bottom Footer Section
// export const BottomFooter = styled(Box)({
//   textAlign: "center",
//   backgroundColor: "#131A22",
//   color: "#CCCCCC",
//   padding: "15px",
//   fontSize: "12px",
// });
