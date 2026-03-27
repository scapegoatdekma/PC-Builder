import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { TypographyH3 } from "./ui/typography-h3";
import { HeaderAuthButton, HeaderNav } from "./header-nav";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="container mx-auto grid min-h-20 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
        <div className="justify-self-start">
          <TypographyH3>
            <Link href={session?.user ? "/dashboard" : "/"}>ПК Сборщик</Link>
          </TypographyH3>
        </div>

        <div className="justify-self-center">
          {session?.user ? (
            <HeaderNav />
          ) : (
            <Button variant="secondary" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          )}
        </div>

        <div className="justify-self-end">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session?.user ? <HeaderAuthButton /> : <div className="w-16" />}
          </div>
        </div>
      </div>
    </header>
  );
}
