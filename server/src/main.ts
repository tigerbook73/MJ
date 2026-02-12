import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as Express from "express";
import { join } from "path";
import { createSwaggerDocument } from "./app.open-api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  createSwaggerDocument(app);

  // using process.cwd(), command must start from server's root directory
  const publicPath = join(process.cwd(), "public");
  app.use(Express.static(publicPath));
  app.use(
    (
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction,
    ) => {
      if (
        req.method === "GET" &&
        !req.url.startsWith("/api") &&
        !req.url.startsWith("/react/api")
      ) {
        if (req.url.startsWith("/react")) {
          res.sendFile(join(publicPath, "react", "index.html"));
        } else {
          res.sendFile(join(publicPath, "index.html"));
        }
      } else {
        next();
      }
    },
  );
  await app.listen(process.env.PORT || 3000);

  const httpAdapter = app.getHttpAdapter();
  if (httpAdapter.getType() === "express") {
    return;
  }
}
bootstrap();
