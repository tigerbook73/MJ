import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { join } from "path";
import { createSwaggerDocument } from "./app.open-api";

async function bootstrap() {
  // only for production
  if (!process.env.RENDER) {
    console.error(
      `This entry point ${__filename} is only for Render deployment.`,
    );
    process.exit(1);
  }

  // 1. 初始化 Next
  /* eslint-disable @typescript-eslint/no-require-imports */
  const next = require("next");
  const nextApp = next({
    dev: false,
    dir: join(process.cwd(), "../../mj-next"), // 指向聚合 repo 中的 web（相对server目录）
  });
  await nextApp.prepare();
  const nextHandle = nextApp.getRequestHandler();

  // 2. 创建共享 Express 实例，Next.js 优先处理非 API/Socket.IO 请求
  const server = express();
  server.use((req, res, nextFn) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/socket.io")) {
      return nextFn(); // 让 NestJS 处理
    }
    return nextHandle(req, res); // 交给 Next.js
  });

  // 3. 启动 Nest，复用同一 Express 实例
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  });

  createSwaggerDocument(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
