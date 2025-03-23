import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header";
import { Footer } from "../../Shared/Footer";
import { Navbar } from "../../Shared/Navbar";
import { apiClint } from "../../../api/Config";
import { API_PATHS } from "../../../api/ApiPath";
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const Banner = () => {
  const [bannerImage, setBannerImage] = useState(null);

  // Fetch banner images
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const bannerResponse = await apiClint.get(API_PATHS.BANNER_IMAGES);
        const imageUrl = bannerResponse.data[0].bannerImagePath;
        setBannerImage(imageUrl);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center",  }}>
      {bannerImage ? (
        <img
          src={bannerImage}
          alt="Banner"
          style={{
          whidth:"100%"        
        
          }}
        />
      ) : (
        <Typography variant="h6" sx={{ color: "gray" }}>
          No banner available
        </Typography>
      )}
    </Box>
  );
};

export const Landing = () => {
  const [subcategories, setSubcategories] = useState([]);
  // Fetch subcategories with images

    const fetchSubcategories = async () => {
      try {
        const response = await apiClint.get(API_PATHS.CATEGORIES_WITHSUB_API);
        if (response.data) {
          console.log(response.data[0]);
          const Subcategories = response.data[0].flatMap(category => 
            category.product.map(sub => ({
              id: sub.id,
              name: sub.name,
              // image: sub.categoryImagePath, 
            }))
          );
          setSubcategories(Subcategories);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

  useEffect(() => {
    fetchSubcategories();
  }, []);
  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Banner />
        {/* Subcategories Grid */}
        <Box sx={{ mt: 5 }}>
        
          <Grid container spacing={3}>
            {subcategories.map((sub) => (
              <Grid item key={sub.id} xs={12} sm={6} md={3}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={sub.
                      categoryImagePath} // Fallback image
                    alt={sub.name}
                  />
                  <CardContent>
                    <Typography variant="h6" textAlign="center">
                      {sub.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};
