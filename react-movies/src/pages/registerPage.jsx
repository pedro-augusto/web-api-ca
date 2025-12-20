import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';
import {Container, Card, CardContent, Typography, TextField, Button, Box} from "@mui/material";

const RegisterPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  
  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      let result = await context.register(userName, password);
      setRegistered(result);
    }
  }

  if (registered === true) {
    return <Navigate to="/user/login" />;
  }

  return (
  <Container maxWidth="sm">
        <Card sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10
        }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              SignUp
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 3 }}
            >
              You must register a username and password to log in. Usernames must be unique and passwords must contain a minimum of 8 characters (with at least one uppercase letter, one lowercase letter, and one symbol). 
            </Typography>

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Password (again)"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) =>  setPasswordAgain(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={register}
            >
              Register
            </Button>
          </CardContent>
        </Card>
    </Container>
  );
};

export default RegisterPage;
