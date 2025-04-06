import React, { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "./Modal";

const BuyNowButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation
          setIsModalOpen(true); // Open modal
        }}
        sx={{
          color: "black",
          borderRadius: "20px",
          fontSize: "13px",
          backgroundColor: "#FFA41C",
          marginTop: "10px",
        }}
      >
        Buy Now
      </Button>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default BuyNowButton;
