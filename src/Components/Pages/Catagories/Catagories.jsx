import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { apiClint } from "../../../api/Config";
import { API_PATHS } from "../../../api/ApiPath";
import { Box, Typography, Card, CardMedia, Grid } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
  
      <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
        Shop by Category
      </Typography>

      {/* Product Listing */}
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category.id}>
            {/* Fix: Use Link instead of <naviggate> */}
            <Link to={`/subcategories?id=${category.id}`} style={{ textDecoration: "none" }}>

              <Card sx={{ height: "220px", width: "200px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  image={category.categoryImagePath}
                  alt="Category"
                  sx={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </Card>
              <Typography sx={{ textAlign: "center", color: "black" }}>
                {category.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>

    </>
  );
};

export default Categories;
