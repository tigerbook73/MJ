// src/prisma/prisma.module.ts
import { Module, Global } from "@nestjs/common"; // Import Global decorator
import { PrismaService } from "./prisma.service"; // Assuming prisma.service.ts is in the same directory

@Global() // Make this module global
@Module({
  providers: [PrismaService], // Register PrismaService as a provider
  exports: [PrismaService], // Export PrismaService so other modules can use it
})
export class PrismaModule {}
