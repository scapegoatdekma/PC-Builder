"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import NextImage from "next/image";
import signupImage from "@/app/images/image.png";
import { useActionState } from "react";
import { LoginState, loginAction } from "@/app/login/actions";
import { ErrorMessage } from "./error-message";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<LoginState | null, FormData>(
    loginAction,
    null,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Добро пожаловать обратно</h1>
                <p className="text-balance text-muted-foreground">
                  Войдите в свой аккаунт
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>

              {state?.error && <ErrorMessage message={state.error} />}

              <Field>
                <Button type="submit">Войти</Button>
              </Field>

              <FieldDescription className="text-center">
                Нет аккаунта? <a href="/signup">Зарегистрироваться</a>
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
        Нажимая "Войти", вы соглашаетесь с нашими{" "}
        <a href="#">Условиями использования</a> и{" "}
        <a href="#">Политикой конфиденциальности</a>.
      </FieldDescription>
    </div>
  );
}
