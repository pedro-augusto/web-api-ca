import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { Container, Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {

  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let errorMessage = null;

  const login = async () => {
    setError("");

    try {
      await context.authenticate(userName, password);
    } catch (err) {
      setError(err.message);
    }
  };

  let location = useLocation();

  // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/movies/favorites" };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  if (error) {
    errorMessage = (
      <Typography color="error" align="center" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );
  }


  return (
    <Container maxWidth="sm">
      <Card sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10
      }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Login
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3 }}
          >
            You must log in to view protected pages
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

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={login}
          >
            Log In
          </Button>
          {errorMessage}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Not registered?{" "}
            <Link to="/user/register" style={{ color: "#309898", textDecoration: "none" }}>Sign Up!</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
