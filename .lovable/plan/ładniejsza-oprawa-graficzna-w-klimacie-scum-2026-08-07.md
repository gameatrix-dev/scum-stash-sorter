# Ładniejsza oprawa graficzna w klimacie SCUM

## Co się zmieni

1. **Hero z grafiką** — na górze strony baner z wygenerowaną grafiką w stylu SCUM (post-apo wyspa, opuszczona baza, mgła, militarny sprzęt). Ciemny gradient na dole obrazu, na nim tytuł "SCUM · Punkt skupu" i licznik pozycji. Zamiast obecnego pustego nagłówka.

2. **Tło strony** — subtelna tekstura (siatka / noise / metal) pod całą treścią, żeby panel nie leżał na płaskim czarnym tle.

3. **Panele i karty** — mocniejszy klimat HUD: cienkie obramowania z narożnikami, delikatny blask (glow) na cenach, hazard-strip jako akcent, hover z podświetleniem wiersza.

4. **Podsumowanie skupu** — wyróżniony panel z dużą sumą w stylu terminala + subtelny scanline.

5. **Ikony pozycji** — mała ikona kategorii przy każdym przedmiocie (gwoździe/śruby/narzędzia/dokumenty), żeby lista nie była samym tekstem.

Funkcjonalność (wyszukiwanie, sortowanie, ilości, przelicznik) zostaje bez zmian.

## Szczegóły techniczne

- 1–2 grafiki generowane do `src/assets/` (hero + ewentualna tekstura tła), importowane jako moduły.
- Nowe tokeny w `src/styles.css`: gradient hero, glow cienia, scanline/noise jako `@utility`.
- Zmiany wyłącznie w `src/components/PriceList.tsx` i `src/styles.css` (wersja desktop korzysta z tego samego komponentu).
- Po akceptacji mogę przebudować też paczkę .exe z nowym wyglądem.
