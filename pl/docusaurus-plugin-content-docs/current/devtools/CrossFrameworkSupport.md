---
id: cross-framework
title: Obsługa wielu frameworków
description: "Porównaj, jak kompletnie tryb śledzenia DevTools przechwytuje przebiegi WebdriverIO, Selenium i Nightwatch oraz jakie luki ma każdy adapter."
---

Format śladu i odtwarzacz `show-trace` są identyczne dla WebdriverIO / Selenium / Nightwatch; ta strona pokazuje, w czym różni się kompletność przechwytywania. Pełną dokumentację trybu śledzenia znajdziesz w sekcji [Trace Mode](/docs/devtools/wdio/trace-mode).

Transformacje budujące ślad znajdują się w [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), jedną warstwę poniżej adapterów, dlatego **format śladu i odtwarzacz `show-trace` są identyczne dla każdego adaptera** — ten sam plik `.zip` (lub katalog) otwiera się w tym samym odtwarzaczu niezależnie od tego, który adapter go wygenerował. Trzy poniższe adaptery dodatkowo współdzielą podstawowe opcje (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Kompletność przechwytywania różni się jednak w zależności od adaptera** — WebdriverIO jest najbardziej kompletny; Selenium i Nightwatch obejmują podstawowy przepływ z lukami opisanymi poniżej. Składnia włączania specyficzna dla danego frameworka znajduje się na stronie każdego adaptera — zobacz [Selenium](/docs/devtools/selenium#trace-mode) i [Nightwatch](/docs/devtools/nightwatch#trace-mode).

Adapter Pythona (zobacz zakładki **Python** na stronie [Selenium](/docs/devtools/selenium)) zapisuje to samo archiwum i otwiera się w tym samym odtwarzaczu, ale nie ma go w tej tabeli: nie uruchamia żadnego kodu JavaScript w procesie testowym, więc backend buduje ślad z przechwyconego strumienia, zamiast adaptera budującego go wewnątrz procesu. Granularność i retencja mają odpowiedniki w Pythonie — `--devtools-trace-granularity session|test` oraz `--devtools-trace-policy`, przy czym wartości uwzględniające ponowienia tej drugiej opcji degradują się do `retain-on-failure`, ponieważ nic w tym kanale nie przenosi numeru próby. Wiersze bez odpowiednika w Pythonie to te dotyczące artefaktów per test: `screenshot`, `video` oraz bezpośrednie dołączanie do Allure. To, co adapter przechwytuje — podróż w czasie po DOM, gęsty filmstrip, drzewo A11y i nakładka elementów, polecenia, konsola, sieć, asercje, sterowanie przebiegiem oraz Preserve & Rerun — opisano na osobnej stronie.

| Funkcja | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Tryb śledzenia + odtwarzacz `show-trace` | ✅ | ✅ | ✅ |
| Podróż w czasie po DOM (przechwytywanie mutacji) | ✅ | ✅ ¹ | ✅ |
| Zakładka A11y + nakładka wyboru lokatora (odtwarzacz śladu) | ✅ | ✅ | ✅ |
| Transkrypcja + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` per test | ✅ bezpośrednio w Allure | ✅ bezpośrednio w Allure | ⚠️ tylko generowanie ² |
| Automatyczne wykrywanie `emitArtifactsManifest` | ✅ | ✅ | ⚠️ tylko po włączeniu |
| `tracePolicy` uwzględniające ponowienia | ✅ | ✅ | ⚠️ tylko `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object; BDD `describe/it` zwija się do wycinka sesji |
| Zagnieżdżanie Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ pełne | Feature→Scenario ⁵ |
| Przechwytywanie BiDi (konsola / sieć / wyjątki) | ✅ automatycznie | ✅ automatycznie | ⚠️ po włączeniu (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / wideo) | CDP push | CDP push | tylko odpytywanie |
| Zakładka A11y + nakładka w panelu na żywo | ✅ | tylko odtwarzacz śladu | tylko odtwarzacz śladu |

¹ Selenium rekonstruuje DOM dla każdej nawigacji; czas zakotwiczenia jest przybliżony (migawka nawigacji może opóźniać się względem polecenia, które ją wywołało).
² Nightwatch nie ma API do dołączania na żywo do Allure, więc artefakty per test są zapisywane w katalogu wyjściowym śladu i wymieniane w manifeście, ale nie są dołączane do testu w Allure.
³ Opcja `--retries` w Nightwatch ponownie uruchamia test wewnętrznie, bez ponownego wywoływania hooków per test wtyczki, więc polityki uwzględniające ponowienia (`on-first-retry`, `retain-on-first-failure`, …) degradują się do `retain-on-failure`.
⁴ WebdriverIO nie przenosi jeszcze hierarchii na poziomie feature, więc zagnieżdżanie Cucumber ma postać Scenario→Step.
⁵ Nightwatch nie oznacza jeszcze zagnieżdżenia per krok (tylko Feature→Scenario).