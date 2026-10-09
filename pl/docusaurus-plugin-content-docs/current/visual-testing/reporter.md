---
id: visual-reporter
title: Visual Reporter
description: "Wygeneruj i przeglądaj Visual Reporter, aby analizować różnice w testach wizualnych na podstawie danych wyjściowych JSON z @wdio/visual-service, lokalnie lub w CI."
---

Visual Reporter to nowa funkcja wprowadzona w `@wdio/visual-service`, dostępna od wersji [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Ten reporter pozwala użytkownikom wizualizować raporty różnic w formacie JSON generowane przez usługę Visual Testing i przekształcać je w format czytelny dla człowieka. Pomaga zespołom lepiej analizować wyniki testów wizualnych i zarządzać nimi, zapewniając graficzny interfejs do przeglądania danych wyjściowych.

Aby skorzystać z tej funkcji, upewnij się, że masz wymaganą konfigurację do wygenerowania niezbędnego pliku `output.json`. Ten dokument przeprowadzi Cię przez konfigurację, uruchamianie i interpretację Visual Reportera.

# Wymagania wstępne

Przed użyciem Visual Reportera upewnij się, że skonfigurowałeś usługę Visual Testing tak, aby generowała pliki raportów JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Generates the output.json file
            },
        ],
    ],
};
```

Bardziej szczegółowe instrukcje konfiguracji znajdziesz w [dokumentacji Visual Testing](./) WebdriverIO lub w opisie opcji [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Instalacja

Aby zainstalować Visual Reporter, dodaj go jako zależność deweloperską do swojego projektu za pomocą npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Dzięki temu niezbędne pliki będą dostępne do generowania raportów z Twoich testów wizualnych.

# Użycie

## Budowanie raportu wizualnego

Po uruchomieniu testów wizualnych i wygenerowaniu przez nie pliku `output.json` możesz zbudować raport wizualny za pomocą CLI lub interaktywnych pytań.

### Użycie CLI

Możesz wygenerować raport za pomocą polecenia CLI, uruchamiając:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Wymagane opcje:

-   `--jsonOutput`: Ścieżka względna do pliku `output.json` wygenerowanego przez usługę Visual Testing. Ścieżka ta jest względna wobec katalogu, z którego wykonujesz polecenie.
-   `--reportFolder`: Katalog względny, w którym zostanie zapisany wygenerowany raport. Ta ścieżka również jest względna wobec katalogu, z którego wykonujesz polecenie.

#### Opcje opcjonalne:

-   `--logLevel`: Ustaw na `debug`, aby uzyskać szczegółowe logi, szczególnie przydatne przy rozwiązywaniu problemów.

#### Przykład

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Spowoduje to wygenerowanie raportu we wskazanym folderze i wyświetlenie informacji zwrotnych w konsoli. Na przykład:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Wyświetlanie raportu

:::warning
Otwarcie pliku `path/to/report/index.html` bezpośrednio w przeglądarce **bez serwowania go z lokalnego serwera** **NIE** zadziała.
:::

Aby wyświetlić raport, musisz użyć prostego serwera, takiego jak [sirv-cli](https://www.npmjs.com/package/sirv-cli). Możesz uruchomić serwer za pomocą następującego polecenia:

```bash
npx sirv-cli /path/to/report --single
```

Spowoduje to wyświetlenie logów podobnych do poniższego przykładu. Pamiętaj, że numer portu może się różnić:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Możesz teraz wyświetlić raport, otwierając podany adres URL w przeglądarce.

### Korzystanie z interaktywnych pytań

Alternatywnie możesz uruchomić następujące polecenie i odpowiedzieć na pytania, aby wygenerować raport:

```bash
npx @wdio/visual-reporter
```

Pytania przeprowadzą Cię przez podanie wymaganych ścieżek i opcji. Na koniec interaktywny kreator zapyta również, czy chcesz uruchomić serwer, aby wyświetlić raport. Jeśli zdecydujesz się uruchomić serwer, narzędzie uruchomi prosty serwer i wyświetli adres URL w logach. Możesz otworzyć ten adres URL w przeglądarce, aby wyświetlić raport.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Wyświetlanie raportu

:::warning
Otwarcie pliku `path/to/report/index.html` bezpośrednio w przeglądarce **bez serwowania go z lokalnego serwera** **NIE** zadziała.
:::

Jeśli **nie** zdecydowałeś się uruchomić serwera za pomocą interaktywnego kreatora, nadal możesz wyświetlić raport, uruchamiając ręcznie następujące polecenie:

```bash
npx sirv-cli /path/to/report --single
```

Spowoduje to wyświetlenie logów podobnych do poniższego przykładu. Pamiętaj, że numer portu może się różnić:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Możesz teraz wyświetlić raport, otwierając podany adres URL w przeglądarce.

# Demo raportu

Aby zobaczyć przykład, jak wygląda raport, odwiedź nasze [demo na GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Interpretacja raportu wizualnego

Visual Reporter zapewnia uporządkowany widok wyników Twoich testów wizualnych. Dla każdego uruchomienia testów będziesz mógł:

-   Łatwo przechodzić między przypadkami testowymi i przeglądać zbiorcze wyniki.
-   Przeglądać metadane, takie jak nazwy testów, użyte przeglądarki i wyniki porównań.
-   Wyświetlać obrazy różnic pokazujące, gdzie wykryto różnice wizualne.

Ta wizualna prezentacja upraszcza analizę wyników testów, ułatwiając identyfikowanie i eliminowanie regresji wizualnych.

# Integracje z CI

Pracujemy nad obsługą różnych narzędzi CI, takich jak Jenkins, GitHub Actions i inne. Jeśli chcesz nam pomóc, skontaktuj się z nami na [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).