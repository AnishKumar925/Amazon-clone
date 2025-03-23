import { styled,Box,Typography, Button,TextField } from "@mui/material";

export const Image = styled("img")({
    // display: "block",
    // margin: "auto",
    // padding: "2%",
  });
  
export const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    border: "1px solid #ddd",
    fontFamily : "Roboto, Helvetica, Arial, sans-serif",
   
    width:"370px",height:"450px",padding: "20px 26px",
    marginTop : "10px"
});

export const Label = styled(Typography)({
    fontWeight: "bold",
    fontFamily : "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "14px", 
    margin : "0%",
    marginLeft : "18px",
    paddingTop : "10px"
});

export const InputField = styled(TextField)({
     marginBottom: "10px",
     marginLeft : "18px", 
     '& .MuiInputBase-root': { height: "40px",width:"90%"}
})
export const Login = styled(Button)({
    margin : "0%",
    backgroundColor : "gainsboro",
    color : "black",

    marginTop : "20px"
});

export const Register = styled(Button)({
  backgroundColor:"#FCDD3D",
    border: "none",
    height: "30px",
    width : "370px",
    marginBottom: "10px",
    color : "black",
    marginLeft : "15px",
    marginTop : "20px"
});

export const LoginButton = styled(Button)({
    margin : "0%",
    backgroundColor : "gainsboro",
    color : "black",
    width : "310px",
    marginTop : "20px"
});