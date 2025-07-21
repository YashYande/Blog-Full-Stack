import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Author {
  firstName: string;
  lastName: string;
}

interface BlogCardProps {
  id: string;
  title: string;
  synopsis: string;
  imageUrl?: string;
  createdAt: string;
  Author: Author;
}

function BlogCard({
  id,
  title,
  synopsis,
  imageUrl,
  createdAt,
  Author,
}: BlogCardProps) {
  const initials = `${Author.firstName[0] || ""}${
    Author.lastName[0] || ""
  }`.toUpperCase();

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Blog cover"
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            color: "#555",
          }}
        >
          No Image
        </Box>
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            overflow: "hidden",
          }}
        >
          {synopsis}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar sx={{ bgcolor: "sky-blue", mr: 1 }}>{initials}</Avatar>
          <Box>
            <Typography variant="body2">
              {Author.firstName} {Author.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/blogs/${id}`}
          sx={{ ml: "auto", color: "sky-blue" }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
