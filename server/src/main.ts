import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as Express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

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
