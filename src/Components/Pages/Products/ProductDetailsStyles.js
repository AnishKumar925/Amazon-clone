import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const BackToResults = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: theme.spacing(2),
  fontSize: "12px",
  letterSpacing: "0.5px",
  color: "#565059",
  "&:hover": { textDecoration: "underline" },
}));

export const ProductImage = styled(Box)({
  width: "460px",
  height: "550px",
  alignContent: "center",
});

export const StyledCardMedia = styled("img")({
  width: "430px",
  height: "540px",
  objectFit: "contain",
  border: "0.2px solid #E0E0E0",
});

export const ProductName = styled(Typography)({
  fontSize: "19.5px",
  fontFamily: "Inter",
  cursor: "pointer",
});

export const RatingsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#00718D",
  cursor: "pointer",
  fontFamily: "Inter",
});

export const DiscountText = styled(Typography)({
  fontWeight: "380",
  fontFamily: "Rubik",
  fontSize: "25px",
  margin: "6px 10px 0 0",
  color: "red",
});

export const PriceText = styled(Typography)({
  fontSize: "28px",
  fontWeight: "400",
  fontFamily: "Inter",
});

export const OldPriceText = styled(Typography)({
  textDecoration: "line-through",
  color: "#565959",
  fontFamily: "Rubik",
});

export const DeliveryIconsBox = styled(Box)({
  display: "flex",
  gap: "16px",
  width: "auto",
  height: "95px",
  justifyContent: "center",
  color: "#00718D",
});

export const GeneralDetailsTitle = styled(Typography)({
  margin: "20px 0 0 0",
});

export const GeneralDetailsListItem = styled(Box)({
  width: "170px",
});

export const AboutProductBox = styled(Box)({
  marginTop: "24px",
});

export const StockStatusText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: "500",
  fontFamily: "Rubik",
}));

export const BuyNowButton = styled(Button)({
  fontWeight: "400",
  color: "black",
  borderRadius: "20px",
  fontSize: "13px",
  textTransform: "none",
  backgroundColor: "#FFA41C",
  margin: "14px 0 0 0",
  border: "none",
});

export const ProductSpecificationsBox = styled(Box)({
  width: "40%",
  margin: "8px",
});

export const SpecificationItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #E0E0E0",
});

export const SpecificationName = styled(Typography)({
  fontWeight: "400",
  width: "65%",
  backgroundColor: "#EBEBEB",
  padding: "12px",
  display: "block",
  letterSpacing: "0.7px",
});

export const SpecificationValue = styled(Typography)({
  width: "100%",
  textAlign: "left",
  padding: "12px",
  letterSpacing: "0.7px",
});
