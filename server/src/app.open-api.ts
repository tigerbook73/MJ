import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("MJ Game API")
    .setDescription("Mahjong Game REST API Documentation")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      schemasSorter: "alpha", // currently not working, TODO
      persistAuthorization: true,
    },
  });
  return document;
}
