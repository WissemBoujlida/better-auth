"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas/login-schema";
import { auth } from "@/auth";
import { APIError } from "better-auth";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const valid = loginSchema.safeParse(data);

  if (!valid.success) {
    return { error: "invalid fields!" };
  }

  const { email, password } = valid.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { sucess: "true" };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }

    throw error;
  }
};
