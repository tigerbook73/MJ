import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((issue) => issue.message).join(", ");
        throw new BadRequestException(message);
      }
      throw error;
    }
  }
}
