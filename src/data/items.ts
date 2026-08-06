export type Item = {
  name: string;
  category: string;
  price: number;
};

/** Ceny skupu w walucie gry (można edytować) */
export const items: Item[] = [
  { name: "AK-47", category: "Broń", price: 4500 },
  { name: "M82A1", category: "Broń", price: 12000 },
  { name: "MK18", category: "Broń", price: 6800 },
  { name: "SVD Dragunov", category: "Broń", price: 9000 },
  { name: "M1 Garand", category: "Broń", price: 2600 },
  { name: "Mosin", category: "Broń", price: 1800 },
  { name: "Deagle", category: "Broń", price: 3200 },
  { name: "Glock 18", category: "Broń", price: 1500 },
  { name: "Kar98", category: "Broń", price: 1700 },
  { name: "MP5", category: "Broń", price: 2400 },

  { name: "Amunicja 7.62x39 (szt.)", category: "Amunicja", price: 12 },
  { name: "Amunicja 5.56x45 (szt.)", category: "Amunicja", price: 14 },
  { name: "Amunicja 9x19 (szt.)", category: "Amunicja", price: 8 },
  { name: "Amunicja .50 BMG (szt.)", category: "Amunicja", price: 90 },
  { name: "Amunicja 12 Gauge (szt.)", category: "Amunicja", price: 20 },
  { name: "Amunicja .308 (szt.)", category: "Amunicja", price: 25 },

  { name: "Celownik ACOG", category: "Akcesoria", price: 2200 },
  { name: "Celownik Red Dot", category: "Akcesoria", price: 900 },
  { name: "Luneta MilDot", category: "Akcesoria", price: 1800 },
  { name: "Tłumik", category: "Akcesoria", price: 1500 },
  { name: "Latarka taktyczna", category: "Akcesoria", price: 350 },
  { name: "Magazynek AK (30)", category: "Akcesoria", price: 400 },

  { name: "Apteczka", category: "Medycyna", price: 500 },
  { name: "Bandaż", category: "Medycyna", price: 60 },
  { name: "Antybiotyk", category: "Medycyna", price: 250 },
  { name: "Morfina", category: "Medycyna", price: 300 },
  { name: "Witaminy", category: "Medycyna", price: 120 },
  { name: "Worek krwi", category: "Medycyna", price: 450 },

  { name: "Konserwa", category: "Jedzenie", price: 45 },
  { name: "MRE", category: "Jedzenie", price: 150 },
  { name: "Butelka wody", category: "Jedzenie", price: 25 },
  { name: "Kawa", category: "Jedzenie", price: 80 },
  { name: "Czekolada", category: "Jedzenie", price: 40 },
  { name: "Mięso (surowe)", category: "Jedzenie", price: 30 },

  { name: "Kamizelka kuloodporna", category: "Wyposażenie", price: 3500 },
  { name: "Hełm balistyczny", category: "Wyposażenie", price: 1600 },
  { name: "Plecak wojskowy", category: "Wyposażenie", price: 1200 },
  { name: "Noktowizor", category: "Wyposażenie", price: 5000 },
  { name: "Lornetka", category: "Wyposażenie", price: 700 },
  { name: "Kompas", category: "Wyposażenie", price: 150 },
  { name: "Maska gazowa", category: "Wyposażenie", price: 900 },

  { name: "Kanister paliwa", category: "Zasoby", price: 400 },
  { name: "Akumulator", category: "Zasoby", price: 800 },
  { name: "Świeca zapłonowa", category: "Zasoby", price: 250 },
  { name: "Opona", category: "Zasoby", price: 350 },
  { name: "Złom metalowy", category: "Zasoby", price: 20 },
  { name: "Deska drewniana", category: "Zasoby", price: 15 },
  { name: "Taśma klejąca", category: "Zasoby", price: 90 },
  { name: "Proch strzelniczy", category: "Zasoby", price: 60 },
  { name: "Ulepszony zestaw narzędzi", category: "Zasoby", price: 1100 },

  { name: "Karta dostępu (żółta)", category: "Loot", price: 2500 },
  { name: "Karta dostępu (czerwona)", category: "Loot", price: 6000 },
  { name: "Płytka drukowana", category: "Loot", price: 750 },
  { name: "Bateria litowa", category: "Loot", price: 550 },
];
