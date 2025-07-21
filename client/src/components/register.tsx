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
import { register } from "../services/authApi";

interface RegisterForm {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword, ...rest } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (Object.values(formData).some((val) => val.trim() === "")) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await register({ ...rest, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper elevation={4} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center">
          Register for <span style={{ color: "#1976d2" }}>BlogIt</span>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="dense"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="dense"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="userName"
            fullWidth
            margin="dense"
            value={formData.userName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="emailAddress"
            type="email"
            fullWidth
            margin="dense"
            value={formData.emailAddress}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="dense"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1.3,
              fontWeight: 600,
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#125ea2" },
            }}
          >
            Register
          </Button>
        </form>

        <Typography mt={3} textAlign="center">
          Already have an account?{" "}
          <Link href="/login" underline="hover" color="primary">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
