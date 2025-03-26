import { React, useState } from "react";
import {Image,Container,Label,Register,InputField,LoginButton,} from "../../../styles/Sign"
import { Typography, Box, IconButton, Button,Snackbar,Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import img from "../../../../src/assets/Logo.png"
import { useNavigate } from "react-router-dom";

// login
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

  const handleContinue = async () => {

    if (!mobile || !password) {
      setSnackbar({ open: true, message: "All fields are required", severity: "error" });
      return;
    }
    if (!validatePhoneNumber(mobile)) {
      setSnackbar("Invalid phone number Must be 10 digits.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://api-ecommerce-app.bluetickcoders.com/login",
        {
          mobileNo: mobile,
          password: password,
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop:"6%"}}>
        <Image src={img} alt="Registration Page" sx={{height :"60px", }}/>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Container sx={{width:"370px",height:"350px",padding: "20px 26px",}}>
          <Typography variant="h6" sx={{ marginLeft: "15px" }}>
            Sign in or create account
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
  <Label>Email or Mobile number</Label>
  <InputField
    fullWidth
    type="text"
    variant="outlined"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    aria-label="Phone Number"
  />
  <Label>Password</Label>
  <InputField
    fullWidth
    type={showPassword ? "text" : "password"}
    variant="outlined"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    InputProps={{
      endAdornment: (
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      ),
    }}
  />
  <Register type="submit" onClick={handleContinue} sx={{borderRadius:"20px",height:"40px",width:"90%"}} disabled={loading}>
    {loading ? <CircularProgress size={24} /> : "Continue"}
  </Register>
</form>

          <Button>Login in Business Account ?</Button>
          <Button>Go Back</Button>
        </Container>
        <Box sx={{ textAlign: "center", marginTop: "10px" }}>
          <Typography variant="body2">New to Amazon ?</Typography>
          <LoginButton onClick={() => navigate("/login")}>
            CREATE NEW ACCOUNT
          </LoginButton>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;


