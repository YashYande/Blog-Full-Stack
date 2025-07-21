import { Router } from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updatePost,
  deletePost,
} from "../controllers/blog.controllers";

const router = Router();

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.patch("/blogs/:id", updatePost);
router.delete("/blogs/:id", deletePost);

export default router;
