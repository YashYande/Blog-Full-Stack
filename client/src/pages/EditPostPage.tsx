
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import BlogForm, { type BlogFormData } from "../components/BlogForm";
import { getBlogById, updateBlog } from "../services/blogApi";
import useAuthStore from "../store/authStore";

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  });

  const updateBlogMutation = useMutation({
    mutationFn: (updatedData: BlogFormData) => updateBlog(id!, updatedData),
    onSuccess: () => {
      navigate(`/blogs/${id}`);
    },
  });

  if (!user) return <Navigate to="/login" replace />;

  if (isLoading) {
    return (
      <Box mt={8} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !blog) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 6 }}>
          Failed to load blog data.
        </Alert>
      </Container>
    );
  }

  if (blog.authorId !== user.id) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 6 }}>
          You are not authorized to edit this blog.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Blog
        </Typography>

        {updateBlogMutation.isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            Error updating blog. Please try again.
          </Alert>
        )}

        <BlogForm
          initialData={blog}
          onSubmit={(formData) => updateBlogMutation.mutate(formData)}
          isSubmitting={updateBlogMutation.isPending}
        />
      </Paper>
    </Container>
  );
}

export default EditBlogPage;