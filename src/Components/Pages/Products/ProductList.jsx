import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiClint } from "../../../api/Config";
import { Typography, CardMedia, Box, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { API_PATHS } from "../../../api/ApiPath";
import { ROUTH_PATHS } from "../../../Router/RouthPath";
import CustomModal from "../../Shared/Modal";
import BuyNowButton from "../../Shared/BuyNowButton";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const subcategoriesId = searchParams.get("id");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      if (!subcategoriesId) {
        console.warn("No subcategoriesId found");
        return;
      }

      const payload = {
        productFilters: [],
        filters: [
          { field: "overallRatings", value: 0, type: "ge" },
          { field: "subCategoryId", value: subcategoriesId, type: "eq" },
        ],
        sorting: [{ column: "createdAt", order: "desc" }],
      };

      try {
        const response = await apiClint.post(
          API_PATHS.GET_PRODUCTS_API,
          payload
        );
        const data = response.data || {};

        console.log("Fetched Data:", data);

        setProducts(response.data.rows || []);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [subcategoriesId]);

  return (
    <Box p={3}>
      <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: "bold" }}>
        Result
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Check each product page for other buying options.
      </Typography>
      {products.length === 0 ? (
        <Typography color="error">
          No products found for this subcategory.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                p: 3,
                borderRadius: "4px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
                maxWidth: "80%",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`${ROUTH_PATHS.PRODUCT_DETAILS}?id=${product.id || ""}`)
              }
            >
              {console.log("productasdfghjkl", product)}
              <CardMedia
                component="img"
                sx={{ width: "180px", height: "180px", objectFit: "contain" }}
                image={
                  product.fileBaseUrl &&
                  product.productImages[0]?.productImagePath
                    ? `${product.fileBaseUrl}${product.productImages[0].productImagePath}`
                    : "no_image_placeholder.png"
                }
                alt={product.name || "Product"}
              />
              <Box sx={{ flex: 1, pl: 2 }}>
                <Typography
                  variant="p"
                  component="div"
                  sx={{ fontSize: "17px", fontFamily: "Inter" }}
                >
                  {product.name || "Unnamed Product"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00718D",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    value={product.overallRatings || 0}
                    readOnly
                    precision={0.5}
                    sx={{ my: 1, color: "#DE7921" }}
                  />
                  <KeyboardArrowDownIcon />
                  <Typography variant="body2" sx={{ fontSize: "17px" }}>
                    {product.noOfRatings === 0
                      ? "No rating"
                      : `${product.noOfRatings} ratings`}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {product.bought || 0} peoples bought in past
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    maxWidth: "26%",
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: "28px" }}>
                    <Typography
                      component="span"
                      sx={{ fontSize: "1rem", verticalAlign: "super" }}
                    >
                      ₹
                    </Typography>
                    {product.discountedPrice
                      ? product.discountedPrice.toLocaleString()
                      : "N/A"}
                  </Typography>
                  M.R.P
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    {product.actualPrice
                      ? product.actualPrice.toLocaleString()
                      : "N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "450", fontSize: "17px" }}
                  >
                    ({product.discount || 0}% off)
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="p"
                    sx={{
                      margin: "10px 0 0 0",
                      padding: "1px 5px",
                      fontSize: "14px",
                      backgroundColor: "#7FDA89",
                      borderRadius: "2px",
                    }}
                  >
                    Save ₹{product.actualPrice - product.discountedPrice || 0}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontSize: "14px", padding: "12px 0 0 6px" }}
                  >
                    with this offer
                  </Typography>
                </Box>
                {product.quantity < 5 && product.quantity > 0 && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ fontSize: "14px" }}
                  >
                    Only {product.quantity} left in stock
                  </Typography>
                )}
                {product.quantity === 0 ? (
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      borderRadius: "20px",
                      fontSize: "13px",
                      marginTop: "10px",
                    }}
                  >
                    Out of Stock
                  </Button>
                ) : (
                  <BuyNowButton />
                )}
                <CustomModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
