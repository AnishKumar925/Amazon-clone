import { styled, Select, OutlinedInput, IconButton, Box, Typography } from "@mui/material";

// Logo Image Styling
export const Image = styled("img")({
  height: "40px",
});

// Product Dropdown (Category Selection)
export const ProductList = styled(Select)({
  backgroundColor: "#E6E6E6",
  width: "5%",
  height: "38px",
  borderRadius: "5px 0px 0px 5px",
  marginLeft: "2rem",
});

// Language Selector (Currently Empty)
export const LanguageSelect = styled(Select)({});

// Search Input Box
export const InputSearch = styled(OutlinedInput)({
  backgroundColor: "white",
  width: "40%",
  height: "38px",
  borderRadius: "0px",
  outline: "none",
  border: "none",
});

// Search Button
export const SearchButton = styled(IconButton)({
  backgroundColor: "#FEBD69",
  textAlign: "center",
  borderRadius: "0px 5px 5px 0px",
  height: "38px",
  width: "3%",
  "&:hover": {
    backgroundColor: "#FCDD3D",
    height: "37px",
  },
  marginRight: "60px",
});

// Language Tooltip Container
export const ShowLang = styled(Box)({
  backgroundColor: "white",
  padding: "0 0 0 10px",
});

// Language Option Styling
export const LangStyle =styled(Typography)({
    padding:"5px",
   
    padding:"0",
    margin:"0",
     cursor: "pointer", "&:hover": {textDecoration:"underline",color: "#FEBD69" }
})
export const IndiaFlag = styled("img")({
    width: "20px",
    height: "15px",
    marginRight: "5px",
    borderRadius: "2px",
    margin:"0"
  });

