---
id: allure
title: Integracja z Allure
description: "Automatycznie dołączaj artefakty trybu śledzenia DevTools, takie jak archiwa zip śladów, zrzuty ekranu i nagrania wideo, do raportu Allure."
---

Artefakty trybu śledzenia — archiwum zip śladu oraz zrzut ekranu i nagranie wideo każdego testu — są automatycznie dołączane do raportu Allure, dzięki czemu możesz je otworzyć bezpośrednio z raportu. Zobacz [Tryb śledzenia](/docs/devtools/wdio/trace-mode), aby dowiedzieć się, jak włączyć tryb śledzenia i generować te artefakty.

Gdy obecny jest reporter Allure, artefakty trybu śledzenia są automatycznie dołączane do raportu Allure — bez dodatkowej konfiguracji:

- **`traceGranularity: 'test'`** — plik `trace.zip` każdego testu (`application/zip`, plik do pobrania, który otwiera się w `show-trace`), `screenshot` (`image/png`, wyświetlany w treści) oraz `video` (`video/webm`, wyświetlane w treści) są dołączane do karty danego testu. Tej granulacji należy używać w przypadku raportu Allure dla poszczególnych testów.
- **`traceGranularity: 'session'` / `'spec'`** — ślad obejmujący całą sesję/specyfikację jest zapisywany na dysku i wymieniany w [manifeście artefaktów](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), ale **nie** jest dołączany do kart poszczególnych testów: ślad sesji/specyfikacji jest finalizowany dopiero po wykonaniu wszystkich jego testów, a wtedy ich karty Allure są już zamknięte i nie ma otwartego testu, do którego można by go dołączyć. Aby mimo to go udostępnić, przetwórz manifest we własnym hooku `onComplete`.

Obsługa według adaptera:

| Adapter | Mechanizm dołączania |
|---|---|
| **WebdriverIO** | Pełna obsługa za pomocą `addAttachment` z `@wdio/allure-reporter`. |
| **Selenium** | Za pomocą `attachment()` z `allure-js-commons` — niezależnie od środowiska uruchomieniowego, dołącza w ramach dowolnego adaptera runnera Allure, pod warunkiem aktywnego środowiska uruchomieniowego `allure-js-commons`. |
| **Nightwatch** | **Tylko generowanie** — pliki i manifest są zapisywane, ale nie są dołączane w treści (brak API dołączania Allure na żywo). |

**Wbudowana przeglądarka śladów.** Ponieważ archiwum korzysta z przenośnego, standardowego formatu zapisu na dysku przeglądarki śladów, własna **wbudowana przeglądarka śladów** raportu Allure (Allure ≥ 2.35) może otworzyć dołączony plik `trace.zip` bezpośrednio w raporcie.

**Szum w raporcie.** W trybie śledzenia przechwytywanie wykonuje `takeScreenshot` dla każdej akcji, aby zbudować oś czasu; Allure loguje każde polecenie WebDriver jako krok oraz zrzut ekranu dla każdego `takeScreenshot`. Wycisz ten zalew za pomocą własnych opcji reportera — nie wpływa to na załączniki śladu / zrzutu ekranu / wideo:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```