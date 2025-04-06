import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress, Typography, Tooltip } from "@mui/material";
import { NavbarSection } from "../../styles/Navbar";
import { apiClint } from "../../api/Config";
import { API_PATHS } from "../../api/ApiPath";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data = [] } = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <NavbarSection>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        {loading && <CircularProgress sx={{ color: "white" }} />}
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

        {!loading && !error && categories.length > 0 && (
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {/* All Categories Tab (White Font & Hover Border) */}
            <Tab
              component={Link}
              to="/categories"
              label="All Categories"
              sx={{
                color: "white !important",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  border: "2px solid white",
                },
              }}
            />

            {categories.map((category) => {
              const subcategories = category.subCategories || [];

              return (
                <Tooltip
                  key={category.id}
                  title={
                    subcategories.length > 0 ? (
                      <Box>
                        {subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/ProductList?id=${sub.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography sx={{ fontSize: "14px", color: "black", px: 1 }}>
                              {sub.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    ) : (
                      "No subcategories"
                    )
                  }
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "white",
                        color: "black",
                        boxShadow: 3,
                      },
                    },
                    arrow: {
                      sx: {
                        color: "white",
                      },
                    },
                  }}
                >
                  <Tab
                    component={Link}
                    to={`/subcategories?id=${category.id}`}
                    label={category.name}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      "&:hover": {
                        border: "2px solid white",
                      },
                    }}
                  />
                </Tooltip>
              );
            })}
          </Tabs>
        )}
      </Box>
    </NavbarSection>
  );
};

export default Navbar;
