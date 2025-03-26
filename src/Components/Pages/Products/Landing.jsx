import React, { useEffect, useState } from "react";

import { apiClint } from "../../../api/Config";
import { API_PATHS } from "../../../api/ApiPath";
import {  Box, Typography, Card, CardMedia, CardContent, Grid, Grid2 } from "@mui/material";

export const Landing = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const bannerResponse = await apiClint.get(API_PATHS.BANNER_IMAGES);
        
          setBannerImage(bannerResponse.data[0].bannerImagePath);
        
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchCategory();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClint.get(API_PATHS.LANDING_API);
      console.log("API Response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>

      {/* Banner Image */}
      <Box sx={{ display: "flex", justifyContent: "center", position:"absolute"}}>
        {bannerImage ? (
          <img src={bannerImage} alt="Banner" style={{ width: "100%", borderRadius: "8px" }} />
        ) : (
          <Typography variant="h6" sx={{ color: "gray" }}>No banner available</Typography>
        )}
      </Box>

      {/* Product Listing */}
        <Box sx={{position:"relative", marginTop:"260px" }}>
          <Grid2 container spacing={3}  justifyContent="center">
            {products.map((prod, index) => {
              // Check if product and image data exist
              const productData = prod.product?.[0];
              const productImage = productData?.productImages?.[0]?.productImagePath;
              const baseUrl = productData?.fileBaseUrl;

              return (
                <Grid2 item xs={12} sm={6}   key={index}>
                  <Card sx={{ width: 490, height: 200, display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ textAlign: "center", padding: "8px" }}>
                      <Typography variant="h6">{prod.name}</Typography>
                    </CardContent>
                    {productImage ? (
                      <CardMedia
                        component="img"
                        image={`${baseUrl}${productImage}`}
                        alt="Product"
                        sx={{
                          width: "100px",
                          height: "150px",
                         objectFit:"contain",
                          margin: "auto",
                        }}
                      />
                    ) : (
                      <Typography sx={{ textAlign: "center", color: "gray", flexGrow: 1 }}>
                        No Image Available
                      </Typography>
                    )}
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
    </>
  );
};

export default Landing;
