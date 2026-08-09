import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getItem } from "@/data/items";
import { ItemDetail } from "@/components/ItemDetail";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const item = getItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Nie znaleziono przedmiotu — SCUM Skup" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.name} — cena skupu ${item.price} | SCUM Skup`;
    const description = item.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ItemNotFound,
  component: ItemDetailRoute,
});

function ItemNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl text-primary">Nie ma takiego przedmiotu w bazie</h1>
      <Link
        to="/"
        className="stencil mt-6 inline-block text-xs text-muted-foreground hover:text-primary"
      >
        ← Wróć do cennika
      </Link>
    </main>
  );
}

function ItemDetailRoute() {
  const { item } = Route.useLoaderData();
  return <ItemDetail item={item} />;
}
