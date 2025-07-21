import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../components/BlogCard";
import {getAllBlogs} from "../services/blogApi"; 

export default function HomePage() {
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["allBlogs"],
    queryFn:getAllBlogs,
  });

  if (isLoading) return <Typography>Loading blogs...</Typography>;
  if (isError) return <Typography>Error fetching blogs.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Blogs
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        {blogs?.map((blog:any) => (
          <Box key={blog.id}>
            <BlogCard {...blog} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
