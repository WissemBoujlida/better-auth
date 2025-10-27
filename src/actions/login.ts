"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas/login-schema";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const valid = loginSchema.safeParse(data);

  if (!valid.success) {
    return { error: "invalid fields!" };
  }

  const { email, password } = valid.data;
};
