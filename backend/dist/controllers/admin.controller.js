"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.getAllUsers = void 0;
const prisma_1 = require("../utils/prisma");
const getAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const users = await prisma_1.prisma.user.findMany({
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
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllUsers = getAllUsers;
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        await prisma_1.prisma.user.update({
            where: { id },
            data: { status }
        });
        return res.json({ message: "User status updated" });
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUserStatus = updateUserStatus;
