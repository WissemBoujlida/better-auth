"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { registerSchema } from "@/schemas/register-schema";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const valid = registerSchema.safeParse(data);

  if (!valid.success) {
    return { error: "invalid fields!" };
  }

  const { name, email, password } = valid.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already taken!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismadb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { sucess: "User created!" };
};
