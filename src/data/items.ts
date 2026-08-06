export type Item = {
  name: string;
  category: string;
  price: number;
};

/** Ceny skupu w walucie gry (można edytować) */
export const items: Item[] = [
  { name: "Gwoździe", category: "Materiały", price: 50 },
  { name: "Śruby", category: "Materiały", price: 50 },
  { name: "Przecinarki", category: "Narzędzia", price: 800 },
  { name: "Wiertarki", category: "Narzędzia", price: 800 },
  { name: "Pamiętniki (stack 20x)", category: "Loot", price: 500 },
];
