"use client";

import { usePathname } from "next/navigation";

const HIDDEN_HEADER_PATHS = new Set(["/login", "/signup"]);

type Props = {
  children: React.ReactNode;
};

export function HeaderVisibility({ children }: Props) {
  const pathname = usePathname();

  if (HIDDEN_HEADER_PATHS.has(pathname)) {
    return null;
  }

  return <>{children}</>;
}
