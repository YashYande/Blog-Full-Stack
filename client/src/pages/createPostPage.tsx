import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Box, Typography, Alert, Paper } from '@mui/material';
import BlogForm, { type BlogFormData } from '../components/BlogForm';
import { createBlog } from '../services/blogApi';
import useAuthStore from '../store/authStore';

function CreateBlogPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const { mutate, status, error } = useMutation({
    mutationFn: (newBlog: BlogFormData) => createBlog(newBlog),
    onSuccess: () => {
      navigate('/profile');
    },
  });

  const handleFormSubmit = (formData: BlogFormData) => {
    if (!user?.id) {
      console.error("User not logged in.");
      return;
    }

    mutate({
      ...formData,
      authorId: user.id,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f9f9f9', p: 2 }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
          width: '100%',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3, color: 'primary.main' }}
        >
          Create New Blog
        </Typography>

        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error creating blog: {(error as Error).message}
          </Alert>
        )}

        <BlogForm
          onSubmit={handleFormSubmit}
          isSubmitting={status === 'pending'}
        />
      </Paper>
    </Box>
  );
}

export default CreateBlogPage;
