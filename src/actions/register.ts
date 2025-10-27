"use server";

import * as z from "zod";

import { registerSchema } from "@/schemas/register-schema";
import { auth } from "@/auth";
import { APIError } from "better-auth";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const valid = registerSchema.safeParse(data);

  if (!valid.success) {
    return { error: "invalid fields!" };
  }

  const { name, email, password } = valid.data;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { sucess: "User created!" };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }

    throw error;
  }
};
