---
id: visual-reporter
title: Raporter Wizualny
---

Visual Reporter to nowa funkcja wprowadzona w `@wdio/visual-service`, począwszy od wersji [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Ten reporter pozwala użytkownikom wizualizować raporty różnic JSON generowane przez usługę Visual Testing i przekształcać je w format czytelny dla człowieka. Pomaga zespołom lepiej analizować i zarządzać wynikami testów wizualnych, zapewniając graficzny interfejs do przeglądania wyników.

Aby korzystać z tej funkcji, upewnij się, że masz wymaganą konfigurację do generowania niezbędnego pliku `output.json`. Ten dokument przeprowadzi Cię przez proces konfiguracji, uruchamiania i zrozumienia Visual Reportera.

# Wymagania wstępne

Przed użyciem Visual Reportera upewnij się, że skonfigurowałeś usługę Visual Testing do generowania plików raportów JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Generuje plik output.json
            },
        ],
    ],
};
```

Aby uzyskać bardziej szczegółowe instrukcje konfiguracji, zapoznaj się z dokumentacją WebdriverIO [Visual Testing Documentation](./) lub [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Instalacja

Aby zainstalować Visual Reporter, dodaj go jako zależność deweloperską do swojego projektu za pomocą npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Zapewni to dostępność niezbędnych plików do generowania raportów z testów wizualnych.

# Użycie

## Tworzenie raportu wizualnego

Po uruchomieniu testów wizualnych i wygenerowaniu pliku `output.json` możesz zbudować raport wizualny za pomocą wiersza poleceń lub interaktywnych monitów.

### Użycie CLI

Możesz użyć polecenia CLI do wygenerowania raportu, uruchamiając:

```bash
npx wdio-visual-reporter --jsonOutput=<ścieżka-do-output.json> --reportFolder=<ścieżka-do-zapisania-raportu> --logLevel=debug
```

#### Wymagane opcje:

-   `--jsonOutput`: Względna ścieżka do pliku `output.json` wygenerowanego przez usługę Visual Testing. Ta ścieżka jest względna do katalogu, z którego wykonujesz polecenie.
-   `--reportFolder`: Względny katalog, w którym zostanie zapisany wygenerowany raport. Ta ścieżka jest również względna do katalogu, z którego wykonujesz polecenie.

#### Opcjonalne opcje:

-   `--logLevel`: Ustaw na `debug`, aby uzyskać szczegółowe logowanie, szczególnie przydatne do rozwiązywania problemów.

#### Przykład

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Spowoduje to wygenerowanie raportu w określonym folderze i dostarczenie informacji zwrotnej w konsoli. Na przykład:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Przeglądanie raportu

:::warning
Otwieranie `path/to/report/index.html` bezpośrednio w przeglądarce **bez serwowania go z lokalnego serwera** **NIE** zadziała.
:::

Aby wyświetlić raport, musisz użyć prostego serwera, takiego jak [sirv-cli](https://www.npmjs.com/package/sirv-cli). Możesz uruchomić serwer za pomocą następującego polecenia:

```bash
npx sirv-cli /path/to/report --single
```

Spowoduje to wyświetlenie logów podobnych do poniższego przykładu. Zauważ, że numer portu może się różnić:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Teraz możesz przeglądać raport, otwierając podany adres URL w przeglądarce.

### Korzystanie z interaktywnych monitów

Alternatywnie możesz uruchomić następujące polecenie i odpowiedzieć na monity, aby wygenerować raport:

```bash
npx @wdio/visual-reporter
```

Monity przeprowadzą Cię przez podanie wymaganych ścieżek i opcji. Na koniec interaktywny monit zapyta również, czy chcesz uruchomić serwer, aby wyświetlić raport. Jeśli zdecydujesz się uruchomić serwer, narzędzie uruchomi prosty serwer i wyświetli adres URL w logach. Możesz otworzyć ten adres URL w przeglądarce, aby wyświetlić raport.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Przeglądanie raportu

:::warning
Otwieranie `path/to/report/index.html` bezpośrednio w przeglądarce **bez serwowania go z lokalnego serwera** **NIE** zadziała.
:::

Jeśli zdecydowałeś się **nie** uruchamiać serwera za pomocą interaktywnego monitu, nadal możesz wyświetlić raport, uruchamiając ręcznie następujące polecenie:

```bash
npx sirv-cli /path/to/report --single
```

Spowoduje to wyświetlenie logów podobnych do poniższego przykładu. Zauważ, że numer portu może się różnić:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Teraz możesz przeglądać raport, otwierając podany adres URL w przeglądarce.

# Demo raportu

Aby zobaczyć przykład wyglądu raportu, odwiedź nasze [demo na GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Zrozumienie raportu wizualnego

Visual Reporter zapewnia uporządkowany widok wyników testów wizualnych. Dla każdego uruchomienia testu będziesz w stanie:

-   Łatwo nawigować między przypadkami testowymi i oglądać zagregowane wyniki.
-   Przeglądać metadane, takie jak nazwy testów, używane przeglądarki i wyniki porównań.
-   Wyświetlać obrazy różnic pokazujące, gdzie wykryto różnice wizualne.

Ta wizualna reprezentacja upraszcza analizę wyników testów, ułatwiając identyfikację i rozwiązywanie problemów z regresjami wizualnymi.

# Integracje CI

Pracujemy nad wsparciem różnych narzędzi CI, takich jak Jenkins, GitHub Actions i tak dalej. Jeśli chcesz nam pomóc, skontaktuj się z nami na [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).