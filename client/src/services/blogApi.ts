import API from "./axios";
import { type BlogFormData } from "../components/BlogForm";

// Get all blogs
export async function getAllBlogs() {
  const response = await API.get("/blogs");
  return response.data;
}

// Get a blog by ID
export async function getBlogById(id: string) {
  const response = await API.get(`/blogs/${id}`);
  return response.data;
}

// Update a blog
export async function updateBlog(id: string, blogData: BlogFormData) {
  const response = await API.patch(`/blogs/${id}`, blogData);
  return response.data;
}

// Create a blog
export async function createBlog(blog: {
  title: string;
  synopsis: string;
  content: string;
  imageUrl?: string;
  authorId: string;
}) {
  const response = await API.post("/blogs", blog);

  return await response.data;
}

// Delete a blog
export async function deleteBlog(id: string) {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
}
