import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(1, "Password is required"),
  });
