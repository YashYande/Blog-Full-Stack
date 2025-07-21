import { Request, Response } from "express";
import prisma from "../config/Prisma";
import bcrypt from "bcrypt";

// Update password
export async function updatePassword(req: Request, res: Response) {
  const { authorId, currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { id: authorId },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json("Incorrect current password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.users.update({
      where: { id: authorId },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json(updatedUser);
  } catch (e) {
    console.error(e);
    res.status(500).json("Something went wrong");
  }
}

// Get posts for a specific user
export async function postForUser(req: Request, res: Response) {
  const { authorId } = req.params;

  try {
    const posts = await prisma.blogs.findMany({
      where: {
        authorId,
        isDeleted: false,
      },
      include: {
        Author: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
      },
    });

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json("Something went wrong");
  }
}

// update user information

export async function UserInfoUpdate(req: Request, res: Response) {
  const { userId } = req.params;
  const { firstName, lastName, userName, emailAddress } = req.body;

  try {
    const infoUpdate = await prisma.users.update({
      where: { id: userId},
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
      },
    });
    res.status(200).json(infoUpdate);
  } catch (e) {
    res.status(500).json({ error: "Failed to update user info" });
  }
}
