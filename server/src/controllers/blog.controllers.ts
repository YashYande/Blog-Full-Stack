import { Request, Response } from "express";
import prisma from "../config/Prisma";

// create a post
export async function createBlog(req: Request, res: Response) {
  const {authorId, imageUrl, title, synopsis, content } = req.body;
  

  try {
    if (!authorId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newBlog = await prisma.blogs.create({
      data: {
        imageUrl,
        title,
        synopsis,
        content,
        authorId,
      },
      include: {
        Author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json(newBlog);
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to create new blog");
  }
}

//getting all posts

export async function getAllBlogs(req: Request, res: Response) {
  try {
    const allBlogs = await prisma.blogs.findMany({
      where: { isDeleted: false },
      include: {
        Author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json(allBlogs);
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to fetch blogs");
  }
}

//get specific post

export async function getBlogById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await prisma.blogs.findUnique({
      where: { id: id },
      include: {
        Author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!post || post.isDeleted) {
      return res.status(404).json("Post not found");
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to get post");
  }
}
//updating a post

export async function updatePost(req: Request, res: Response) {
  const { title, imageUrl, synopsis, content } = req.body;
  const { id } = req.params;

  try {
    const updateBlog = await prisma.blogs.update({
      where: { id: id },
      data: {
        title,
        imageUrl,
        synopsis,
        content,
        lastUpdatedAt: new Date(),
      },
    });

    res.status(200).json(updateBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
}
// delete a post

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deleted = await prisma.blogs.update({
      where: { id: id },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json(deleted);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete post" });
  }
}
