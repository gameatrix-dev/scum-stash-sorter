import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, RotateCcw } from "lucide-react";
import { getItem, items } from "@/data/items";
import { iconFor } from "@/data/icons";
import { useQty } from "@/hooks/useQty";

const currency = (n: number) => new Intl.NumberFormat("pl-PL").format(n);

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const item = getItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Nie znaleziono przedmiotu — SCUM Skup" }, { name: "robots", content: "noindex" }],
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
  component: ItemDetail,
});

function ItemNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl text-primary">Nie ma takiego przedmiotu w bazie</h1>
      <Link to="/" className="stencil mt-6 inline-block text-xs text-muted-foreground hover:text-primary">
        ← Wróć do cennika
      </Link>
    </main>
  );
}

function ItemDetail() {
  const { item } = Route.useLoaderData();
  const { qty, setItemQty } = useQty();
  const q = qty[item.slug] ?? 0;
  const Icon = iconFor(item.slug);

  const bump = (d: number) => setItemQty(item.slug, q + d);

  return (
    <main className="min-h-screen">
      <div className="hazard-strip h-2" />

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Link
          to="/"
          className="stencil inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-xs text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Cennik
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Grafika */}
          <div className="panel corner-frame scanline overflow-hidden">
            <img
              src={item.image}
              alt={item.imageAlt}
              width={1024}
              height={640}
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/60 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h1 className="glow-primary text-2xl text-primary sm:text-3xl">{item.name}</h1>
                  <p className="stencil text-[11px] text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <ul className="mt-4 space-y-1.5">
                {item.notes.map((n) => (
                  <li key={n} className="mono-num flex gap-2 text-xs text-muted-foreground">
                    <span className="text-primary">›</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kalkulator */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="panel corner-frame p-4">
              <h2 className="text-lg text-primary">Szybkie wyliczenie</h2>
              <div className="hazard-strip my-3 h-1" />

              <div className="mono-num flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">Cena skupu</span>
                <span className="text-primary">
                  {currency(item.price)}{" "}
                  <span className="text-[10px] text-muted-foreground">{item.unit}</span>
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => bump(-1)}
                  aria-label="Zmniejsz ilość"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min={0}
                  value={q === 0 ? "" : q}
                  placeholder="0"
                  aria-label={`Ilość: ${item.name}`}
                  onChange={(e) => setItemQty(item.slug, Number(e.target.value))}
                  className="mono-num h-10 w-full rounded-sm border border-input bg-background/60 px-2 text-center text-lg outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                />
                <button
                  onClick={() => bump(1)}
                  aria-label="Zwiększ ilość"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[1, 5, 10, 20, 50, 100].map((n) => (
                  <button
                    key={n}
                    onClick={() => bump(n)}
                    className="stencil rounded-sm border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    +{n}
                  </button>
                ))}
                <button
                  onClick={() => setItemQty(item.slug, 0)}
                  className="stencil inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                >
                  <RotateCcw className="h-3 w-3" /> Zeruj
                </button>
              </div>

              <div className="mt-5 border-t border-border pt-3">
                <div className="flex items-end justify-between">
                  <span className="stencil text-xs text-muted-foreground">Koszt skupu</span>
                  <span className="mono-num glow-primary text-3xl text-primary">
                    {currency(item.price * q)}
                  </span>
                </div>
              </div>
            </div>

            {/* Inne przedmioty */}
            <div className="panel mt-4 p-3">
              <p className="stencil mb-2 text-[10px] text-muted-foreground">Inne pozycje</p>
              <ul className="space-y-1">
                {items
                  .filter((i) => i.slug !== item.slug)
                  .map((i) => (
                    <li key={i.slug}>
                      <Link
                        to="/produkt/$slug"
                        params={{ slug: i.slug }}
                        className="mono-num flex items-center justify-between rounded-sm px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
                      >
                        <span className="truncate">{i.name}</span>
                        <span>{currency(i.price)}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
