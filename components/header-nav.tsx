"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutList, Plus, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { getTabValue } from "@/lib/utils";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function HeaderNav() {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  return (
    <Tabs value={tabValue} className="w-fit">
      <TabsList>
        <TabsTrigger value="dashboard" asChild>
          <Link href="/dashboard">
            <Plus className="h-4 w-4" />
            Создать сборку
          </Link>
        </TabsTrigger>
        <TabsTrigger value="builds" asChild>
          <Link href="/builds">
            <LayoutList className="h-4 w-4" />
            Мои сборки
          </Link>
        </TabsTrigger>
        <TabsTrigger value="explore" asChild>
          <Link href="/builds/explore">
            <Users className="h-4 w-4" />
            Публичные сборки
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function HeaderAuthButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={() => signOut({ redirectTo: "/" })}
    >
      Выйти
    </Button>
  );
}
