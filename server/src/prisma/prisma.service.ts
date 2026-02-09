import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is required");
    }

    const adapter = new PrismaBetterSqlite3({
      url: databaseUrl,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("PrismaService connected to the database");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("PrismaService disconnected from the database");
  }
}
