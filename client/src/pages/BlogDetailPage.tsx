import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import API from "../services/axios";
import useAuthStore from "../store/authStore";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await API.get(`/blogs/${id}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await API.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      navigate("/profile");
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !post) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">
          Blog not found or something went wrong.
        </Typography>
      </Box>
    );
  }

  const isAuthor = user?.id === post.userId;

  return (
    <Box maxWidth="800px" mx="auto" mt={5}>
      <Card elevation={3}>
        {post.image && (
          <CardMedia
            component="img"
            height="350"
            image={post.image}
            alt={post.title}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            By {post.author?.userName || "Unknown"} ·{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>

          <Box mt={3}>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {post.content}
            </Typography>
          </Box>

          {isAuthor && (
            <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate(`/blogs/edit/${id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteMutation.mutate()}
              >
                Delete
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
