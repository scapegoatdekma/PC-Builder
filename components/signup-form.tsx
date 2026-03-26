"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NextImage from "next/image";
import signupImage from "@/app/images/image.png";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signupAction, SignupState } from "@/app/signup/actions";
import { ErrorMessage } from "./error-message";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<SignupState | null, FormData>(
    signupAction,
    null,
  );
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Создать аккаунт</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Заполните данные, чтобы создать новый аккаунт
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
                <FieldDescription>
                  Мы никогда не будем делиться вашей электронной почтой с
                  кем-либо еще.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Имя</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                />
                <FieldDescription>
                  Укажите ваше имя или никнейм, который будет отображаться в
                  вашем профиле.
                </FieldDescription>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Пароль</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Подтвердите пароль
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Пароли должны совпадать и быть не менее 8 символов в длину.
                </FieldDescription>
              </Field>
              {state?.error && <ErrorMessage message={state.error} />}
              <Field>
                <Button type="submit">Создать аккаунт</Button>
              </Field>
              <FieldDescription className="text-center">
                Уже есть аккаунт? <a href="/login">Войти</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <NextImage
              src={signupImage}
              alt="Sign up illustration"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              objectFit="cover"
              className="object-cover dark:brightness-[0.2] object-[65%_center] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Нажимая "Создать аккаунт", вы соглашаетесь с нашими{" "}
        <a href="#">Условиями использования</a> и{" "}
        <a href="#">Политикой конфиденциальности</a>.
      </FieldDescription>
    </div>
  );
}
