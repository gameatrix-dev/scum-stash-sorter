# Nowa lista produktów + build .exe

## Zmiany w cenniku

Usuwam: Gwoździe, Śruby.

Zmiany cen: Przecinarki 1000, Wiertarki 1000, Pamiętniki/papier (stack 20x) 1600.

Nowe pozycje:

| Przedmiot | Cena |
| --- | --- |
| Papier/pamiętnik (1 szt.) | 80 |
| Kula medyczna | 1000 |
| Telefon | 200 |
| Gumowy wąż | 200 |
| Nożyce do drutu | 200 |
| Skalpel | 100 |
| Nożyczki | 100 |
| Taśma | 40 |
| Strzykawki | 100 |
| Filtr oleju | 500 |
| Kable rozruchowe | 400 |
| Olej hamulcowy | 300 |
| Kamień szlifierski | 500 |
| Baterie | 200 |
| Baterie do smartfona | 200 |
| Wsuwki (stack 20x) | 200 |
| Małe kanistry | 500 |
| Duże kanistry | 1000 |
| Zamek | 700 |
| Bandaż elastyczny | 1000 |
| Nawóz przemysłowy | 1000 |
| Środki od chwastów | 400 |
| Radio zielone | 300 |
| Karimata | 800 |
| Zwierzęta w całości | 1000 |
| Skóry | 200 |
| Klej | 200 |

Razem 30 pozycji.

## Kategorie

Pozycje pogrupowane w filtry: Narzędzia, Medyczne, Pojazdy, Elektronika, Loot, Chemia, Obóz. Filtrowanie, wyszukiwarka, sortowanie A-Z i kalkulator ilości działają bez zmian.

## Grafiki

Zamiast 30 osobnych zdjęć generuję zestaw grafik kategorii (ok. 7) w tym samym mrocznym klimacie SCUM; każdy przedmiot dostaje grafikę swojej kategorii plus własną ikonę lucide na liście i w szczegółach. Dzięki temu ekran szczegółów nadal ma dużą grafikę, a build zostaje lekki.

## Ekran szczegółów

Każdy nowy przedmiot dostaje krótki opis i 3 punkty informacyjne (gdzie znaleźć, uwagi do skupu), zgodnie z obecnym układem strony produktu.

## Build .exe

Po zmianach: build SPA dla Electrona, spakowanie przez @electron/packager (platforma win32/x64) i wrzucenie gotowego ZIP-a do pobrania, tak jak poprzednio. Paczki electron instaluję tymczasowo na czas builda, żeby nie wracał błąd instalacji zależności w projekcie.

## Szczegóły techniczne

- `src/data/items.ts` — nowa lista pozycji, ceny, jednostki, opisy, kategorie.
- `src/data/icons.ts` — mapa slug → ikona lucide dla nowych pozycji.
- `src/assets/` — nowe grafiki kategorii.
- Bez zmian w logice `useQty`, `PriceList` i `produkt.$slug` (poza ewentualnym drobnym dopasowaniem układu przy większej liczbie kategorii).
