import React, { useEffect, useState } from "react";
import { Box, Icon, Typography, MenuItem, Tooltip, Button } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Logo } from"../../Constants/Constant";

import { IndiaFlag } from "../../styles/Header";
import { Image, ProductList, InputSearch, SearchButton, ShowLang, LangStyle } from "../../styles/Header";
import { apiClint } from "../../api/Config";
import { API_PATHS } from "../../api/ApiPath";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories using fetch API
  const fetchCategories = async () => {
    try {
      const { data = [] } = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const Languages = [
    "English - EN", "हिंदी - HI", "தமிழ் - TA", "తెలుగు - TE", "ಕನ್ನಡ - KN",
    "മലയാളം - ML", "বাংলা - BN", "मराठी - MR"
  ];

  return (
    <>
      <Box sx={{ backgroundColor: "#131921", display: "flex", alignItems: "center", padding: "10px", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box sx={{ marginRight: "20px" }}>
          <Link to= "/">
          <Image src={Logo} alt="amazon logo" />
          </Link>
        </Box>

        {/* Location Section */}
        <Box sx={{ display: "flex", alignItems: "center", color: "white", marginRight: "20px" }}>
          <Icon sx={{ color: "white", marginRight: "5px" }}>
            <FmdGoodOutlinedIcon fontSize="medium" />
          </Icon>
          <Typography sx={{ fontSize: "15px", lineHeight: 1.2 }}>
            Deliver to <br />
            <Typography component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Update location
            </Typography>
          </Typography>
        </Box>

        {/* Category and Search Section */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, marginLeft: "20px" }}>
          <ProductList sx={{width:"70px"}}value={selectedCategory} onChange={handleCategoryChange} displayEmpty>
            <MenuItem value="">All</MenuItem>
            {categories.length === 0 ? (
              <MenuItem disabled>Loading categories...</MenuItem>
            ) : (
              categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Box sx={{ fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {category.name}
                  </Box>
                </MenuItem>
              ))
            )}
          </ProductList>
          <InputSearch placeholder="Search Amazon.in" />
          <SearchButton sx={{width:"50px"}}>
            <SearchIcon />
          </SearchButton>
        </Box>

        {/* Language Selection */}
        <Tooltip
          title={
            <ShowLang>
              {Languages.map((lang, index) => (
                <LangStyle key={index}>{lang}</LangStyle>
              ))}
            </ShowLang>
          }
          arrow
          slotProps={{
            tooltip: { sx: { bgcolor: "white", color: "black", boxShadow: 3, borderRadius: 2 } },
            arrow: { sx: { color: "white" } },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer",padding:"5px", marginRight: "50px","&:hover": { border: "2px solid white" } }}>
            <IndiaFlag src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" />
            <Button sx={{ color: "white", textTransform: "none", padding: 0, minWidth: "auto",paddingLeft:"10px" }}>En</Button>
          </Box>
        </Tooltip>

        {/* Sign-in Section */}
        <Tooltip 
          title={
            <Box sx={{ padding: "10px" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline", color: "orange" } }}>
                <Link to="/Register" style={{ textDecoration: "none", color: "inherit" }}>Sign in</Link>
              </Typography>
            </Box>
          } 
          arrow
          slotProps={{
            tooltip: { sx: { bgcolor: "white", color: "black", boxShadow: 3, borderRadius: 2 } },
            arrow: { sx: { color: "white" } },
          }}
        >
          <Box sx={{ color: "white", marginLeft: "15px",padding:"2px",  marginRight: "50px",cursor: "pointer", "&:hover": { border: "2px solid white" } }}>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>Hello, sign in</Typography>
            <Typography component="span" variant="subtitle2" sx={{ display: "block", fontWeight: "bold" }}>Accounts & Lists</Typography>
          </Box>
        </Tooltip>
      </Box>
      <Navbar />
    </>
  );
};

export default Header;
