import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Minimum 6 characters required"),
});
