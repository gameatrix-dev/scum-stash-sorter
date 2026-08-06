# Świeży build .exe dla Windows

Cel: wygenerować aktualną paczkę Windows z cennikiem skupu SCUM i udostępnić ją do pobrania w czacie.

## Skąd pobrać

Gotowy plik pojawia się w czacie jako załącznik `SCUM-Skup-win32-x64.zip`. Po pobraniu rozpakowujesz folder i uruchamiasz `SCUM-Skup.exe`. Instalator nie jest potrzebny — aplikacja działa z rozpakowanego katalogu.

## Co zrobię

1. Zbuduję desktopową wersję aplikacji z aktualną bazą (gwoździe 50, śruby 50, przecinarki 800, wiertarki 800, pamiętniki stack 20x 500).
2. Spakuję ją do aplikacji Windows 64-bit.
3. Dodam zapamiętywanie wpisanych ilości po zamknięciu programu, żeby praca w skupie nie ginęła.
4. Wgram archiwum ZIP do pobrania i podam link w czacie.

## Szczegóły techniczne

- Renderer budowany osobnym configiem Vite (`electron/vite.config.ts`) do `dist-desktop/`, `base: './'`.
- Pakowanie przez `@electron/packager` (`--platform=win32 --arch=x64`), instalowane jednorazowo w sandboxie i nieutrwalane w `package.json`, żeby nie psuć instalacji zależności projektu.
- Wyniki buildu (`electron-release/`, `dist-desktop/`) pozostają w `.gitignore`; do repo nie trafiają binaria.
- Persistencja ilości: `localStorage` w komponencie `PriceList` (bez backendu, działa offline).
- Czcionki: aplikacja korzysta z lokalnych fallbacków, więc wygląd nie zależy od internetu.
