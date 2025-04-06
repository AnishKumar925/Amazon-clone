import { useSearchParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiClint } from "../../../api/Config";
import { Typography, Card, CardMedia, Grid } from "@mui/material";

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id"); 
  console.log("Category ID:", categoryId);

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryId) {
        console.warn("No categoryId found");
        return;
      }

      try {
        console.log("Fetching subcategories for categoryId:", categoryId); // Debugging log
        const { data = {} } = await apiClint.get(`/category/${categoryId}`);
        console.log("Fetched Data:", data);

        // Assuming the API returns the category details including its name
        setCategory(data);

        // Set subcategories if available
        setSubCategories(Array.isArray(data.subCategories) ? data.subCategories : []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        console.error("Error details:", error.response?.data || error.message); // Log detailed error response
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  return (
    <>
      {/* Show the category name if available */}
      <Typography variant="h4" sx={{ textAlign: "center", mt: 3, color: "black" }}>
        {category ? category.name : "Category"}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {subCategories.length > 0 ? (
          subCategories.map((sub) => {
            console.log("Subcategory:", sub);
            // Safely access product image path
            let imagePath = sub.product?.[0]?.productImages?.[0]?.productImagePath || "default-image.jpg";

            return (
              <Grid item key={sub.id}>
                <Link to={`/ProductList?id=${sub.id}`} style={{ textDecoration: "none" }}>
                  <Card sx={{ height: "180px", width: "180px", textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      image={imagePath}
                      alt={sub.name}
                      sx={{ width: "100%", height: "140px", objectFit: "contain" }}
                    />
                  </Card>
                  <Typography sx={{ textAlign: "center", color: "black", mt: 1 }}>
                    {sub.name}
                  </Typography>
                </Link>
              </Grid>
            );
          })
        ) : (
          <Typography sx={{ textAlign: "center", mt: 3 }}>No Subcategories Found</Typography>
        )}
      </Grid>
    </>
  );
};

export default SubCategories;
