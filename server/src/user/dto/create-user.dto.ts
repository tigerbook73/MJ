import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
