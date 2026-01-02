import request from "supertest";
import { app } from "../index";


describe("Auth APIs", () => {
  it("Signup should fail without data", async () => {
    const res = await request(app).post("/auth/signup").send({});
    expect(res.statusCode).toBe(400);
  });

  it("Login should fail for invalid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "wrong@test.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(401);
  });
});
