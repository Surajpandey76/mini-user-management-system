import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await prisma.user.update({
      where: { id },
      data: { status }
    });

    return res.json({ message: "User status updated" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};
