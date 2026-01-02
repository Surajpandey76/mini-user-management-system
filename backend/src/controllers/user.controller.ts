import { Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    return res.json(user);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { fullName, email },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        status: true
      }
    });

    return res.json(updatedUser);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    return res.json({ message: "Password updated successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};
