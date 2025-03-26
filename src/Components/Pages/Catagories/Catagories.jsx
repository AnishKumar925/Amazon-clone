import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header";
import { Footer } from "../../Shared/Footer";
import { apiClint } from "../../../api/Config";
import { API_PATHS } from "../../../api/ApiPath";
import { Box, Typography, Card, CardMedia, Grid2 } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  console.log("asdfghjkl;", categories);
  const fetchCategory = async () => {
    try {
      const response = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
      console.log("API Response:", response.data);
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
      <Header />
      <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
        Shop by Category
      </Typography>

      {/* Product Listing */}
      <Grid2 container spacing={3}>
        {categories.map((category) => {
          return (
            <Grid2>
              <Link to={`/SubCatagories/${category.id}`} style={{ textDecoration: "none" }}>

              <Card sx={{ height: "220px", width: "200px" }}>
                <CardMedia
                  component="img"
                  image={category.categoryImagePath}
                  alt="Product"
                  sx={{
                    width: "200px",
                    height: "200px",

                    objectFit: "contain",
                  }}
                />
              </Card>
              </Link>

              <Typography sx={{ textAlign: "center" }} key={category.id}>
                {category.name}
              </Typography>
            </Grid2>
          );
        })}
      </Grid2>
      <Footer />
    </>
  );
};

export default Categories;
