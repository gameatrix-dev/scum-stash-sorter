import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Search,
  Trash2,
  Crosshair,
  Hammer,
  Wrench,
  Drill,
  Scissors,
  BookOpen,
  Package,
} from "lucide-react";
import { items as ITEMS } from "@/data/items";
import heroImg from "@/assets/scum-hero.jpg";

const currency = (n: number) => new Intl.NumberFormat("pl-PL").format(n);

const iconFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("gwoźd") || n.includes("gwozd")) return Hammer;
  if (n.includes("śrub") || n.includes("srub")) return Wrench;
  if (n.includes("wiertar")) return Drill;
  if (n.includes("przecinar")) return Scissors;
  if (n.includes("pamiętnik") || n.includes("pamietnik")) return BookOpen;
  return Package;
};


export function PriceList() {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [category, setCategory] = useState("Wszystkie");
  const [qty, setQty] = useState<Record<string, number>>({});

  const categories = useMemo(
    () => ["Wszystkie", ...Array.from(new Set(ITEMS.map((i) => i.category))).sort()],
    [],
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter(
      (i) =>
        (category === "Wszystkie" || i.category === category) &&
        (q === "" || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)),
    ).sort((a, b) => (asc ? 1 : -1) * a.name.localeCompare(b.name, "pl"));
  }, [query, asc, category]);

  const cart = ITEMS.filter((i) => (qty[i.name] ?? 0) > 0);
  const total = cart.reduce((s, i) => s + i.price * (qty[i.name] ?? 0), 0);
  const totalUnits = cart.reduce((s, i) => s + (qty[i.name] ?? 0), 0);

  const setItemQty = (name: string, value: number) =>
    setQty((p) => ({ ...p, [name]: Math.max(0, Math.floor(value) || 0) }));

  return (
    <main className="min-h-screen">
      <div className="hazard-strip h-2" />

      <header className="relative border-b border-border">
        <div className="scanline relative h-56 overflow-hidden sm:h-72">
          <img
            src={heroImg}
            alt="Opuszczona baza wojskowa na wyspie SCUM o zmierzchu"
            width={1920}
            height={800}
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end gap-3 px-4 pb-6">
              <Crosshair className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <h1 className="glow-primary text-3xl font-bold text-primary sm:text-5xl">
                  SCUM · Punkt skupu
                </h1>
                <p className="mono-num mt-1 text-xs text-muted-foreground">
                  CENNIK OPERACYJNY // {ITEMS.length} POZYCJI W BAZIE
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>


      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_20rem]">
        <section>
          {/* Sterowanie */}
          <div className="panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj przedmiotu..."
                aria-label="Szukaj przedmiotu"
                className="mono-num w-full rounded-sm border border-input bg-background/60 py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </div>
            <button
              onClick={() => setAsc((v) => !v)}
              className="stencil inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-xs text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {asc ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpAZ className="h-4 w-4" />}
              {asc ? "A → Z" : "Z → A"}
            </button>
          </div>

          {/* Kategorie */}
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`stencil rounded-sm border px-3 py-1.5 text-[11px] transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Tabela */}
          <div className="panel corner-frame mt-4 overflow-hidden">
            <div className="stencil grid grid-cols-[1fr_5.5rem_6rem_7rem] gap-2 border-b border-border bg-secondary/60 px-3 py-2 text-[10px] text-muted-foreground">
              <span>Przedmiot</span>
              <span className="text-right">Cena</span>
              <span className="text-center">Ilość</span>
              <span className="text-right">Suma</span>
            </div>

            {list.length === 0 && (
              <p className="mono-num px-3 py-10 text-center text-sm text-muted-foreground">
                Brak wyników w bazie.
              </p>
            )}

            <ul>
              {list.map((i) => {
                const q = qty[i.name] ?? 0;
                const Icon = iconFor(i.name);
                return (
                  <li
                    key={i.name}
                    className={`grid grid-cols-[1fr_5.5rem_6rem_7rem] items-center gap-2 border-b border-border/60 px-3 py-2 transition-colors last:border-0 ${
                      q > 0 ? "bg-primary/5" : "hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                          q > 0
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : "border-border bg-background/50 text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{i.name}</p>
                        <p className="stencil text-[10px] text-muted-foreground">{i.category}</p>
                      </div>
                    </div>

                    <span className="mono-num text-right text-sm text-primary">
                      {currency(i.price)}
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={q === 0 ? "" : q}
                      placeholder="0"
                      aria-label={`Ilość: ${i.name}`}
                      onChange={(e) => setItemQty(i.name, Number(e.target.value))}
                      className="mono-num w-full rounded-sm border border-input bg-background/60 px-2 py-1 text-center text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                    />
                    <span
                      className={`mono-num text-right text-sm ${q > 0 ? "text-signal" : "text-muted-foreground"}`}
                    >
                      {currency(i.price * q)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Podsumowanie */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="panel corner-frame scanline p-4">
            <h2 className="text-lg text-primary">Kalkulacja skupu</h2>
            <div className="hazard-strip my-3 h-1" />

            {cart.length === 0 ? (
              <p className="mono-num text-xs text-muted-foreground">
                Wpisz ilość sztuk przy przedmiotach, aby wyliczyć koszt skupu.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {cart.map((i) => (
                  <li key={i.name} className="mono-num flex justify-between gap-2 text-xs">
                    <span className="truncate text-muted-foreground">
                      {i.name} ×{qty[i.name] ?? 0}
                    </span>
                    <span className="text-foreground">{currency(i.price * (qty[i.name] ?? 0))}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 border-t border-border pt-3">
              <div className="mono-num flex justify-between text-xs text-muted-foreground">
                <span>Sztuk łącznie</span>
                <span>{totalUnits}</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="stencil text-xs text-muted-foreground">Koszt skupu</span>
                <span className="mono-num glow-primary text-3xl text-primary">
                  {currency(total)}
                </span>
              </div>

            </div>

            <button
              onClick={() => setQty({})}
              disabled={cart.length === 0}
              className="stencil mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-secondary px-3 py-2 text-xs text-secondary-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" /> Wyczyść
            </button>
          </div>
        </aside>
      </div>

      <footer className="mono-num border-t border-border px-4 py-6 text-center text-[11px] text-muted-foreground">
        Ceny orientacyjne — dostosuj je w bazie do stawek swojego skupu.
      </footer>
    </main>
  );
}
