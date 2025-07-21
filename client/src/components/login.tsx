import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginApi } from "../services/authApi";

interface LoginForm {
  identifier: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      const { user, token } = await loginApi(formData);
      login(user, token);
      navigate("/");
    } catch (err) {
      setError( "Login failed.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="white"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} align="center">
          Login to <span style={{ color: "blue" }}>BlogIt</span>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Email"
            name="identifier"
            fullWidth
            margin="normal"
            value={formData.identifier}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>

        <Typography mt={3} fontSize={14} align="center">
          Don't have an account?{" "}
          <Link href="/register" underline="hover" color="primary">
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
