"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe("Auth APIs", () => {
    it("Signup should fail without data", async () => {
        const res = await (0, supertest_1.default)(index_1.app).post("/auth/signup").send({});
        expect(res.statusCode).toBe(400);
    });
    it("Login should fail for invalid credentials", async () => {
        const res = await (0, supertest_1.default)(index_1.app).post("/auth/login").send({
            email: "wrong@test.com",
            password: "123456"
        });
        expect(res.statusCode).toBe(401);
    });
});
