import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/Prisma";


const JWT_SECRET = process.env.JWT_SECRET!

// Register a new user

export async function Register(req: Request, res: Response) {
  const { firstName, lastName, userName, emailAddress, password } = req.body;

  try {
    const exist = await prisma.users.findFirst({
      where: {
        OR: [{ emailAddress }, { userName }],
      },
    });

    if (exist) {
      return res.status(403).json("The user already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    

    const createUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashPassword,
      },
    });

    
    const token = jwt.sign({ userId: createUser.id }, JWT_SECRET, { expiresIn: "2h" });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: createUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Error creating user");
  }
}

// Log in an existing user
export async function Login(req: Request, res: Response) {
  const { identifier, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ emailAddress: identifier }, { userName: identifier }],
      },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json("Wrong credentials");
    }
 
    
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error });
  }
}

// Logout client
export async function Logout(_req: Request, res: Response) {
  res.status(200).json({ message: "Logged out successfully" });
}
