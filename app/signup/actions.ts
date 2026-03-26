"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { error } from "console";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirm-password")?.toString() || "";

  console.log({ name, email, password, confirmPassword });
  if (!email) return { error: "Введите email" };
  if (!EMAIL_REGEX.test(email)) return { error: "Введите корректный email" };
  if (!password) return { error: "Введите пароль" };
  if (password.length < MIN_PASSWORD_LENGTH)
    return {
      error: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`,
    };
  if (password !== confirmPassword) return { error: "Пароли не совпадают" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Пользователь с таким email уже существует" };

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
