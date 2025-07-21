import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/userApi';
import useAuthStore from '../store/authStore';

function PasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const user = useAuthStore((state) => state.user);
  const authorId = user?.id;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { authorId: string; currentPassword: string; newPassword: string }) =>
      changePassword(data),
    onSuccess: () => {
      setSuccess('Password updated successfully!');
      setError('');
      setFormData({ currentPassword: '', newPassword: '' });
    },
    onError: () => {
      setSuccess('');
      setError('Something went wrong.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword } = formData;

    if (!currentPassword || !newPassword) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    if (!authorId) {
      setError('User not logged in.');
      return;
    }

    mutate({ authorId, currentPassword, newPassword });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 420,
        margin: '40px auto',
        padding: 4,
        borderRadius: 3,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
        Change Password
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

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, textTransform: 'none', fontWeight: 'bold' }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
        </Button>
      </form>
    </Paper>
  );
};

export default PasswordForm;
