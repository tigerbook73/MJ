import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { createSwaggerDocument } from "../src/app.open-api";
import * as fs from "fs";
import * as path from "path";
import openapiTS, { astToString } from "openapi-typescript";

function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function generate() {
  try {
    process.env.API_GEN = "true";
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
      abortOnError: false,
    });
    app.setGlobalPrefix("api");

    const document = createSwaggerDocument(app);

    // generate apis.json in shared/docs
    const jsonOutPath = path.resolve(
      process.cwd(),
      "../shared/docs",
      "apis.json",
    );
    ensureDir(jsonOutPath);
    fs.writeFileSync(jsonOutPath, JSON.stringify(document, null, 2));
    console.log("API spec generated");

    // generate apis.ts in shared/src/api
    const tsOutputPath = path.resolve(
      process.cwd(),
      "../shared/src/api",
      "apis.ts",
    );
    // generate apis.ts using openapi-typescript
    ensureDir(tsOutputPath);
    const ast = await openapiTS(document as any, {});
    const tsContent = astToString(ast);
    fs.writeFileSync(tsOutputPath, tsContent);
    console.log("API types generated");

    await app.close();
  } catch (error) {
    console.error("Error generating API Spec:", error);
    process.exit(1);
  }
}

(async () => {
  await generate();
})();
