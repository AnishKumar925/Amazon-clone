import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  width: 400,
  textAlign: "left",
};

const CustomModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showCVV, setShowCVV] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    if (paymentMethod === "card") {
      const { cardNumber, cardHolderName, expiryDate, cvv } = cardDetails;
      if (cardNumber && cardHolderName && expiryDate && cvv) {
        setStep("success");
      }
    } else if (paymentMethod) {
      setStep("success");
    }
  };

  const handleClose = () => {
    setStep("select");
    setPaymentMethod("");
    setCardDetails({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    });
    setShowCVV(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        {step === "select" ? (
          <>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Select Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Debit Card or Credit Card"
                />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>
            </FormControl>

            {paymentMethod === "card" && (
              <>
                <TextField
                  label="Card number *"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Cardholder Name *"
                  name="cardHolderName"
                  value={cardDetails.cardHolderName}
                  onChange={handleCardDetailsChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  fullWidth
                  margin="dense"
                />
                <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5 }}>
                  CVV
                </Typography>
                <TextField
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  fullWidth
                  margin="dense"
                  type={showCVV ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowCVV(!showCVV)} edge="end">
                          {showCVV ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#FFD814",
                color: "black",
                fontWeight: "bold",
                mt: 2,
                "&:hover": { bgcolor: "#f7ca00" },
              }}
              onClick={handleProceed}
            >
              PROCEED TO BUY
            </Button>
          </>
        ) : (
          <>
            <Box textAlign="center">
              <CheckCircleIcon sx={{ color: "green", fontSize: 60, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Payment Successful!
              </Typography>
              <Typography variant="body2" mb={3}>
                Your payment has been processed successfully.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#111", color: "white", fontWeight: "bold" }}
                onClick={handleClose}
              >
                CONTINUE TO SHOPPING
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
