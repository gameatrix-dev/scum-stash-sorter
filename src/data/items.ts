import gwozdzieImg from "@/assets/item-gwozdzie.jpg";
import srubyImg from "@/assets/item-sruby.jpg";
import przecinarkiImg from "@/assets/item-przecinarki.jpg";
import wiertarkiImg from "@/assets/item-wiertarki.jpg";
import pamietnikiImg from "@/assets/item-pamietniki.jpg";

export type Item = {
  slug: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  imageAlt: string;
  description: string;
  notes: string[];
};

/** Ceny skupu w walucie gry (można edytować) */
export const items: Item[] = [
  {
    slug: "gwozdzie",
    name: "Gwoździe",
    category: "Materiały",
    price: 50,
    unit: "za sztukę",
    image: gwozdzieImg,
    imageAlt: "Sterta zardzewiałych gwoździ w wojskowej skrzyni",
    description:
      "Podstawowy materiał konstrukcyjny. Niezbędny przy budowie baz, barykad i napraw drewnianych elementów. Skupujemy w dowolnej ilości.",
    notes: ["Znajdziesz w garażach i szopach", "Zajmuje mało miejsca w plecaku", "Zawsze na stanie skupu"],
  },
  {
    slug: "sruby",
    name: "Śruby",
    category: "Materiały",
    price: 50,
    unit: "za sztukę",
    image: srubyImg,
    imageAlt: "Garść metalowych śrub na porysowanej stalowej powierzchni",
    description:
      "Element craftingowy do konstrukcji metalowych i pojazdów. Chodliwy towar — przyjmujemy każdą ilość po stałej stawce.",
    notes: ["Loot z warsztatów i fabryk", "Wymagane przy naprawie pojazdów", "Stała cena skupu"],
  },
  {
    slug: "przecinarki",
    name: "Przecinarki",
    category: "Narzędzia",
    price: 800,
    unit: "za sztukę",
    image: przecinarkiImg,
    imageAlt: "Zużyta przecinarka kątowa na warsztatowym stole",
    description:
      "Elektronarzędzie wysokiej wartości. Pozwala ciąć metal, otwierać skrytki i rozbierać konstrukcje. Jeden z najlepiej płatnych przedmiotów w skupie.",
    notes: ["Wysoka wartość — 800 za sztukę", "Sprawdź stan przed sprzedażą", "Loot z warsztatów i baz wojskowych"],
  },
  {
    slug: "wiertarki",
    name: "Wiertarki",
    category: "Narzędzia",
    price: 800,
    unit: "za sztukę",
    image: wiertarkiImg,
    imageAlt: "Zniszczona wiertarka akumulatorowa na metalowym stole warsztatowym",
    description:
      "Kluczowe narzędzie craftingowe. Potrzebne przy zaawansowanych konstrukcjach i modyfikacjach. Skupujemy w każdej ilości po najwyższej stawce.",
    notes: ["Wysoka wartość — 800 za sztukę", "Częsty loot z garaży", "Przyjmujemy również zużyte"],
  },
  {
    slug: "pamietniki",
    name: "Pamiętniki (stack 20x)",
    category: "Loot",
    price: 500,
    unit: "za stack 20 sztuk",
    image: pamietnikiImg,
    imageAlt: "Stos zniszczonych, skórzanych pamiętników na zakurzonym stole",
    description:
      "Cenny loot zbierany w opuszczonych domach. Skup przyjmuje wyłącznie pełne stacki po 20 sztuk — cena dotyczy całego stacka.",
    notes: ["Cena za pełny stack 20x", "Niepełne stacki nie są przyjmowane", "Loot z domów i biur"],
  },
];

export const getItem = (slug: string) => items.find((i) => i.slug === slug);
