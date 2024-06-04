import { randomUUID } from "crypto";
import { app } from "../config/config";
import request from "supertest";
import mongo from "../mongodb/mongo";
import { ObjectId } from "mongodb";

describe("Create Avaliação", () => {
  beforeAll(async () => {
    try {
      await mongo.getConnect().connect();
    } catch (error) {
      console.log(error);
    }
  });

  it("Criar Avaliação Controller", async () => {
    const responseAuth = await request(app).post("/login").send({
      email: "joel100@gmail.com",
      password: "451236",
    });

    expect(responseAuth.status).toBe(200);
    expect(responseAuth.body).toHaveProperty("token");

    const response = await request(app)
      .post("/create-review")
      .auth(responseAuth.body.token, { type: "bearer" })
      .send({
        userId: new ObjectId(),
        rating: 1,
        comment: "testes1",
      });

    expect(response.status).toBe(201);
  });

  it("Busca Avaliação Controller", async () => {
    const responseAuth = await request(app).post("/login").send({
      email: "joel100@gmail.com",
      password: "451236",
    });

    expect(responseAuth.status).toBe(200);
    expect(responseAuth.body).toHaveProperty("token");

    const response = await request(app)
      .get("/find-all-reviews")
      .auth(responseAuth.body.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("Busca id por Avaliação Controller", async () => {
    const id = "665e9ddb54f39d0689b8ff43";
    const responseAuth = await request(app).post("/login").send({
      email: "joel100@gmail.com",
      password: "451236",
    });

    expect(responseAuth.status).toBe(200);
    expect(responseAuth.body).toHaveProperty("token");

    const response = await request(app)
      .get("/find-byId-review/665e9ddb54f39d0689b8ff43")
      .auth(responseAuth.body.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("Deleta id por Avaliação Controller", async () => {
    const id = "665e9ddb54f39d0689b8ff43";
    const responseAuth = await request(app).post("/login").send({
      email: "joel100@gmail.com",
      password: "451236",
    });

    expect(responseAuth.status).toBe(200);
    expect(responseAuth.body).toHaveProperty("token");

    const response = await request(app)
      .get("/delete-review/665e9ddb54f39d0689b8ff43")
      .auth(responseAuth.body.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });
});
