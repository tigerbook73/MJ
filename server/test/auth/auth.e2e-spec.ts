import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;
  const testUser = {
    email: "test@example.com",
    name: "Test User",
    password: "password123",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);

    // Clean up test user if exists
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });
    await app.close();
  });

  describe("/api/auth/register (POST)", () => {
    it("should register a new user successfully", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty("accessToken");
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("email");
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).toHaveProperty("expiresIn");
        });
    });

    it("should fail to register with existing email", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send(testUser)
        .expect(409);
    });

    it("should fail to register with invalid email", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send({
          email: "invalid-email",
          name: "Test User",
          password: "password123",
        })
        .expect(400);
    });

    it("should fail to register with short password", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send({
          email: "newuser@example.com",
          name: "Test User",
          password: "12345",
        })
        .expect(400);
    });

    it("should fail to register with short name", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send({
          email: "newuser@example.com",
          name: "A",
          password: "password123",
        })
        .expect(400);
    });

    it("should fail to register with missing fields", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send({
          email: "newuser@example.com",
        })
        .expect(400);
    });
  });

  describe("/api/auth/login (POST)", () => {
    it("should login successfully with correct credentials", () => {
      return request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("accessToken");
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("email");
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).toHaveProperty("expiresIn");
          authToken = res.body.accessToken;
        });
    });

    return;

    it("should fail to login with incorrect password", () => {
      return request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        })
        .expect(401);
    });

    it("should fail to login with non-existent user", () => {
      return request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        })
        .expect(401);
    });

    it("should fail to login with invalid email format", () => {
      return request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: "invalid-email",
          password: "password123",
        })
        .expect(400);
    });

    it("should fail to login with missing fields", () => {
      return request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: testUser.email,
        })
        .expect(400);
    });
  });

  describe("/api/auth/profile (GET)", () => {
    beforeAll(async () => {
      // Ensure we have a valid token before running profile tests
      const response = await request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      authToken = response.body.accessToken;
    });

    it("should get user profile with valid token", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(testUser.email);
      expect(response.body.name).toBe(testUser.name);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should fail to get profile without token", () => {
      return request(app.getHttpServer()).get("/api/auth/profile").expect(401);
    });

    it("should fail to get profile with invalid token", () => {
      return request(app.getHttpServer())
        .get("/api/auth/profile")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
    });

    it("should fail to get profile with malformed authorization header", () => {
      return request(app.getHttpServer())
        .get("/api/auth/profile")
        .set("Authorization", "InvalidFormat")
        .expect(401);
    });
  });
});
