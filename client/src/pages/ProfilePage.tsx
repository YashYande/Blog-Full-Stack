import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import BlogCard from "../components/BlogCard";
import { deleteBlog } from "../services/blogApi";
import { getUserBlogs } from "../services/userApi";
import UpdateUserInfoForm from "../components/updateProfile";
import ChangePasswordForm from "../components/PasswordForm";

export interface Blog {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  userId: string;
  Author: {
    firstName: string;
    lastName: string;
  };
}

export default function ProfilePage() {
  const { data: blogs, isLoading, refetch } = useQuery<Blog[]>({
    queryKey: ["userBlogs"],
    queryFn: getUserBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (blogId: string) => {
    deleteMutation.mutate(blogId);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <UpdateUserInfoForm />
      <ChangePasswordForm />

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2rem",
          mb: 3,
          color: "text.primary",
        }}
      >
        My Blogs
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {blogs?.map((blog) => (
          <Box
            key={blog.id}
            sx={{
              flex: "1 1 300px",
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <BlogCard {...blog} />

            <Button
              component={Link}
              to={`/blogs/edit/${blog.id}`}
              variant="contained"
              color="primary"
              sx={{ mt: 2, alignSelf: "center" }}
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 1, alignSelf: "center" }}
              onClick={() => handleDelete(blog.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
