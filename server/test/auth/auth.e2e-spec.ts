import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import * as cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authCookie: string;
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
    app.use(cookieParser());
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

  function extractAuthCookie(res: request.Response): string {
    const cookies = res.headers["set-cookie"];
    if (!cookies) {
      return "";
    }
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
    const authCookieStr = cookieArray.find((c: string) =>
      c.startsWith("auth_token="),
    );
    return authCookieStr || "";
  }

  describe("/api/auth/register (POST)", () => {
    it("should register a new user successfully", () => {
      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("email");
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).toHaveProperty("name");
          expect(res.body).not.toHaveProperty("accessToken");
          expect(extractAuthCookie(res)).toContain("auth_token=");
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
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("email");
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).toHaveProperty("name");
          expect(res.body).not.toHaveProperty("accessToken");
          const cookie = extractAuthCookie(res);
          expect(cookie).toContain("auth_token=");
          authCookie = cookie;
        });
    });

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

  describe("/api/auth/me (GET)", () => {
    beforeAll(async () => {
      // Ensure we have a valid cookie before running profile tests
      const response = await request(app.getHttpServer())
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      authCookie = extractAuthCookie(response);
    });

    it("should get user profile with valid cookie", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/auth/me")
        .set("Cookie", authCookie);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(testUser.email);
      expect(response.body.name).toBe(testUser.name);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should fail to get profile without cookie", () => {
      return request(app.getHttpServer()).get("/api/auth/me").expect(401);
    });

    it("should fail to get profile with invalid cookie", () => {
      return request(app.getHttpServer())
        .get("/api/auth/me")
        .set("Cookie", "auth_token=invalid-token")
        .expect(401);
    });
  });

  describe("/api/auth/ws-token (GET)", () => {
    it("should get a WS token with valid cookie", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/auth/ws-token")
        .set("Cookie", authCookie);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("should fail without cookie", () => {
      return request(app.getHttpServer()).get("/api/auth/ws-token").expect(401);
    });
  });

  describe("/api/auth/logout (POST)", () => {
    it("should clear the auth cookie", async () => {
      const response = await request(app.getHttpServer()).post(
        "/api/auth/logout",
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Logged out successfully" });
      const cookie = extractAuthCookie(response);
      // Cookie should be cleared (empty value or expired)
      if (cookie) {
        expect(cookie).toContain("auth_token=;");
      }
    });
  });
});
