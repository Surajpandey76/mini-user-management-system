"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getMe = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../utils/prisma");
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        if (!fullName || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedUser = await prisma_1.prisma.user.update({
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
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect old password" });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await prisma_1.prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedPassword }
        });
        return res.json({ message: "Password updated successfully" });
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.changePassword = changePassword;
