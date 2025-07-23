import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const { user, token, login } = useAuthStore();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        emailAddress: user.emailAddress || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user || !user.id) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://blog-full-stack-us4u.onrender.com/api/user/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      login(response.data, token!);
      setSuccess("Profile updated successfully.");
      navigate("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to update profile.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="#f9f9f9"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={3} fontWeight={600} sx={{textAlign:'center'}}>
          Update Your Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                mt: 1,
                backgroundColor: "#1976d2",
                ":hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
