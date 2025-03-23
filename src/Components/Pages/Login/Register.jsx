import React, { useState } from "react";
import { Image, Container, Label, Login, Register, InputField } from "../../../styles/Sign";
import { Typography, Box, IconButton, InputAdornment, CircularProgress ,Snackbar,Alert} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,seterror] = useState("")
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  console.log(name,email,ph,password);
  
// reg 
  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

  const handleRegister = async () => {
    // error declaration
    if (!name || !email || !ph || !password) {
      setSnackbar({ open: true, message: "All fields are required", severity: "error" });
      return;
    };

    if (!validatePhoneNumber(ph)) {
      setSnackbar({ open: true, message: "invalid mobile number", severity: "error" });
      return;
    }
    // circular calling true
    setLoading(true);

    // user details
    const user = {
      name :name,
      email:email,
      password :password,
      mobileNo: ph,
    };
    // console.log(user);


    try {
      const response = await axios.post("http://api-ecommerce-app.bluetickcoders.com/register",user,{
      });
      console.log(response);
      navigate("/Login");
    } catch (error) {
      setSnackbar( error.response.data.message ||{ open: true, message: "Registration failed", severity: "error" });
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Image src={Logo} alt="Registration Page" sx={{height :"60px", }}/>
</Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Container>
          <Typography variant="h6" sx={{ marginLeft: "15px",fontSize :"30px", }}>
            Create Your Account
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ marginLeft: "15px" }}>
              {error}
            </Typography>
          )}

          <Label>Name</Label>
          <InputField
            fullWidth
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label>Mobile number</Label>
          <InputField
            fullWidth
            type="tel"
            variant="outlined"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            aria-label="Phone Number"
          />

          <Label>Email</Label>
          <InputField
            fullWidth
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />

          <Label>Password</Label>
          <InputField
            fullWidth
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Register onClick={handleRegister} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Register>
        </Container>

        <Box sx={{ textAlign: "center", marginTop: "10px" }}>
          <Typography variant="body2">Already have an account?</Typography>
          <Login onClick={() => navigate("/login")}>GO TO LOGIN</Login>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal:  "left" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPage;