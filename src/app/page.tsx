import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const restaurants: Array<{ id: string; name: string; slug: string }> =
    await db.restaurant.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Escolha um restaurante</h1>
        <p className="text-sm text-muted-foreground">
          Selecione uma opcao abaixo para continuar.
        </p>

        <div className="flex flex-col gap-3">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant: (typeof restaurants)[number]) => (
              <Button key={restaurant.id} asChild className="w-full" size="lg">
                <Link href={`/${restaurant.slug}`}>{restaurant.name}</Link>
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum restaurante disponivel no momento.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
