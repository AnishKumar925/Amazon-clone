import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClint } from "../../../api/Config";
import { API_PATHS } from "../../../api/ApiPath";
import {
  Typography,
  Box,
  Rating,
  Divider,
  List,
  ListItem,
  Modal,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CustomModal from "../../Shared/Modal";
import {FreeDelivery,PayOnDelivery,TopBrand,InstallationAvailable }from "../../../Constants/Constant";
import { BackToResults, ProductImage, StyledCardMedia, ProductName, RatingsBox,  DiscountText,  PriceText,  OldPriceText,  DeliveryIconsBox,  GeneralDetailsTitle,  GeneralDetailsListItem, AboutProductBox,
  StockStatusText, BuyNowButton, ProductSpecificationsBox, SpecificationItem, SpecificationName, SpecificationValue,} from "./ProductDetailsStyles";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  console.log("product ID ", productId);
  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await apiClint.get(
          `${API_PATHS.PRODUCT_DETAILS_API}/${productId}`
        );
        setProduct(response.data);
        console.log("Fetched Product Data:", response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) return <Typography>Loading...</Typography>;

  // Determine visible properties for General Details
  const visibleProperties = expanded
    ? product.propertyValues
    : product.propertyValues.slice(0, 4);

  return (
    <Box sx={{ padding: "7px 20px 20px" }}>
      <BackToResults
        variant="body1"
        component="span"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon sx={{ mr: 1, fontSize: "10px" }} />
        {` Back to results`}
      </BackToResults>

      <Grid2 container spacing={3} alignItems="flex-start">
        <ProductImage>
          <StyledCardMedia
            src={product.productImages[0]?.productImagePath}
            alt={product.name}
          />
        </ProductImage>
        <Grid2 size={5}>
          <ProductName>{product.name || "Unnamed Product"}</ProductName>

          <RatingsBox>
            <Typography
              sx={{ color: "black", fontSize: "14px", padding: "0 7px 0 0" }}
            >
              {product.overallRatings}
            </Typography>
            <Rating
              value={product.overallRatings || 0}
              readOnly
              precision={0.5}
              sx={{ my: 1, color: "#DE7921" }}
            />
            <KeyboardArrowDownIcon sx={{ color: "black" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                fontFamily: "Rubik",
                padding: "0 0 0 30px",
              }}
            >
              {product.noOfRatings === 0
                ? "No rating"
                : `${product.noOfRatings} Ratings | Search in this page`}
            </Typography>
          </RatingsBox>

          <Typography
            variant="body2"
            sx={{ fontFamily: "Rubik", color: "#565959" }}
          >
            {product.bought || 0} peoples bought in past
          </Typography>

          <Box sx={{ display: "flex" }}>
            <DiscountText>-{product.discount || 0} %</DiscountText>
            <PriceText>
              <Typography
                component="span"
                sx={{ fontSize: "1rem", verticalAlign: "super" }}
              >
                ₹
              </Typography>
              {product.discountedPrice
                ? product.discountedPrice.toLocaleString()
                : "N/A"}
            </PriceText>
          </Box>
          <OldPriceText>
            M.R.P{" "}
            {product.actualPrice
              ? product.actualPrice.toLocaleString()
              : "N/A"}
          </OldPriceText>
          <Divider />

          <DeliveryIconsBox>
            {product.hasFreeDelivery > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={FreeDelivery}
                  alt="Free Delivery"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Free <br /> Delivery
                </Typography>
              </Box>
            )}
            {product.hasCashOnDelivery > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={PayOnDelivery}
                  alt="Cash on Delivery"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Pay on <br /> Delivery
                </Typography>
              </Box>
            )}
            {product.isTopBrand > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={TopBrand}
                  alt="Top Brand"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Top <br /> Brand
                </Typography>
              </Box>
            )}
            {product.isInstallationAvailable > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={InstallationAvailable}
                  alt="Installation Available"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Installation <br /> Available
                </Typography>
              </Box>
            )}
          </DeliveryIconsBox>
          <Divider />

          <Box>
            <GeneralDetailsTitle>General Details</GeneralDetailsTitle>
            <List>
              {visibleProperties.map((property) => (
                <ListItem key={property.id} sx={{ padding: "5px" }}>
                  <GeneralDetailsListItem>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        width: "300px",
                        fontSize: "14px",
                        letterSpacing: "0.8px",
                      }}
                    >
                      {property.name}
                    </Typography>
                  </GeneralDetailsListItem>
                  <Box>
                    <Typography
                      component="span"
                      sx={{ fontSize: "14px", fontFamily: "Rubik" }}
                    >
                      {property.value}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            {product.propertyValues.length > 4 && (
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  onClick={() => setExpanded(!expanded)}
                  variant="body2"
                  component="div"
                  sx={{ textTransform: "none", padding: "0 0 0 15px" }}
                >
                  {expanded ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#00718D",
                        }}
                      >
                        <KeyboardArrowUpIcon sx={{ fontSize: "19px" }} />

                        <Typography sx={{ fontSize: "13px" }}>
                          Show Less
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#00718D",
                        }}
                      >
                        <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />

                        <Typography sx={{ fontSize: "13px" }}>
                          {" "}
                          Show More
                        </Typography>
                      </Box>
                    </>
                  )}
                </Typography>
              </Box>
            )}
          </Box>

          {product.about && (
            <AboutProductBox>
              <Typography
                variant="h6"
                sx={{ fontSize: "17px", padding: "0 0 8px 0" }}
              >
                About this Product
              </Typography>
              <Typography
                sx={{ fontSize: "14px", letterSpacing: "0.5px" }}
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: product.about.replace(
                    /<li>/g,
                    '<li style="margin-bottom: 8px; margin-left: 10px;">'
                  ),
                }}
              />
            </AboutProductBox>
          )}
        </Grid2>

        <Grid2
          size={2}
          sx={{
            padding: "14px",
            border: "0.2px solid #E0E0E0",
            borderRadius: "5px",
            width: "16.5%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <PlaceOutlinedIcon
              sx={{ fontSize: "20px", verticalAlign: "super" }}
            />
            <Typography
              variant="caption"
              component="span"
              sx={{ marginLeft: "5px", color: "#00718D" }}
            >
              Deliver To Tester - Chennai <br />
              600042
            </Typography>
          </Box>

          <StockStatusText
            color={
              product.quantity === 0
                ? "error"
                : product.quantity < 5
                ? "error"
                : "success"
            }
          >
            {product.quantity === 0
              ? "Out of stock"
              : product.quantity < 5
              ? ` Only ${product.quantity} left in stock`
              : "In Stock"}
          </StockStatusText>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ color: "#565959" }}>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                Payment
              </Typography>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                Ships from
              </Typography>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                Sold by
              </Typography>
            </Box>

            <Box sx={{ color: "#00718D", textAlign: "end" }}>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                Secure Transaction
              </Typography>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                Amazon
              </Typography>
              <Typography sx={{ fontSize: "12px", padding: "3px" }}>
                {product.sellerUser.seller.storeName}
              </Typography>
            </Box>
          </Box>
          {product.quantity !== 0 && (
            <BuyNowButton
              variant="contained"
              fullWidth
              disableRipple
              onClick={() => setIsModalOpen(true)}
            >
              Buy now
            </BuyNowButton>
          )}
          <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Grid2>
      </Grid2>

      <Divider />

      {product.description && (
        <ProductSpecificationsBox>
          <Typography variant="h6">Product Specifications:</Typography>
          {product.description.map((item, index) => (
            <SpecificationItem key={index}>
              <SpecificationName>{item.name}</SpecificationName>
              <SpecificationValue>{item.value}</SpecificationValue>
            </SpecificationItem>
          ))}
        </ProductSpecificationsBox>
      )}
    </Box>
  );
};

export default ProductDetails;