import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as Express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("MJ Game API")
    .setDescription("Mahjong Game REST API Documentation")
    .setVersion("1.0")
    .addTag("users", "User management endpoints")
    .addTag("game", "Game action endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const spaPath = ["..", "public"];
  app.use(Express.static(join(__dirname, ...spaPath)));
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
          res.sendFile(join(__dirname, ...spaPath, "react", "index.html"));
        } else {
          res.sendFile(join(__dirname, ...spaPath, "index.html"));
        }
      } else {
        next();
      }
    },
  );
  await app.listen(3000);

  const httpAdapter = app.getHttpAdapter();
  if (httpAdapter.getType() === "express") {
    return;
  }
}
bootstrap();
