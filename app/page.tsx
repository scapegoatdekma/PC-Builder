import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 md:px-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            PC Builder
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl">
            Создай свою сборку мечты
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Подбирай комплектующие, сравнивай совместимость и собирай ПК без
            хаоса во вкладках и случайных несовместимых деталей.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/dashboard">Собрать ПК</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
