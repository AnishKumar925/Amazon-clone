import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress, Typography, Tooltip } from "@mui/material";
import { NavbarSection } from "../../styles/Navbar";
import { apiClint } from "../../api/Config";
import { API_PATHS } from "../../api/ApiPath";

export const Navbar = () => {
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
            sx={{ "& .MuiTabs-flexContainer": { justifyContent: "center" } }}
          >
            {categories.map((category) => {
              const subcategories = category.subCategories || []; // ✅ Fix: Reference subCategories correctly

              return (
                <Tooltip
                key={category.id}
                title={
                  subcategories.length > 0 ? (
                    <Box sx={{ bgcolor: "white", p: 1, borderRadius: 1, boxShadow: 3 }}>
                      {subcategories.map((sub) => (
                        <Typography key={sub.id} sx={{ fontSize: "14px", color: "black", px: 1 }}>
                          {sub.name}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    "No subcategories"
                  )
                }
                arrow
                PopperProps={{
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
              >
                <Tab label={category.name} sx={{ color: "white" }} />
              </Tooltip>
              
              );
            })}
          </Tabs>
        )}
      </Box>
    </NavbarSection>
  );
};
