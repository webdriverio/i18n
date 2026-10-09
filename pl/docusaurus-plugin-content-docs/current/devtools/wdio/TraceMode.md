---
id: trace-mode
title: Tryb śledzenia
description: "Przechwytuj artefakty śledzenia w trybie headless za pomocą trybu śledzenia DevTools i konfiguruj format, szczegółowość, retencję, zrzuty ekranu, wideo oraz asercje."
---

Ścieżka przechwytywania w trybie headless — okno interfejsu DevTools się nie otwiera. Na koniec sesji adapter zapisuje artefakty śledzenia w folderze `test-results/` obok katalogu ze specyfikacjami / konfiguracją. Przy szczegółowości `session` / `spec` jest to plik `trace-<sessionId>.zip` (lub katalog `trace-<sessionId>/`); przy szczegółowości `test` każdy test otrzymuje własny podfolder (zobacz [Szczegółowość śledzenia](#trace-granularity--tracegranularity)). Artefakt jest przenośny i zawiera wszystko, co potrzebne do odtwarzania offline, porównywania przez agentów AI lub dowolnego konsumenta, który woli plik od interfejsu na żywo.

Tryb śledzenia **wyklucza się wzajemnie z trybem na żywo**. Wybierz jeden na sesję: ludzie debugujący interaktywnie potrzebują trybu na żywo; agenci porównujący przebiegi lub boty CI zbierające artefakty potrzebują trybu śledzenia.

## Włączanie

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

Kompletna konfiguracja referencyjna, gotowa do skopiowania, jest dostępna w [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium i Nightwatch udostępniają ten sam potok śledzenia — składnię włączania specyficzną dla danego frameworka znajdziesz na stronach ich adapterów: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Zawartość artefaktu

| Plik | Zawartość |
|---|---|
| `trace.trace` | NDJSON ze zdarzeniami `context-options` + akcji `before` / `after`; jeden wiersz na rekord |
| `trace.network` | Wpisy sieciowe w stylu HAR, jeden na wiersz |
| `transcript.md` | Czytelne dla ludzi/LLM podsumowanie w Markdown z czasami, selektorami i adnotacjami wartości |
| `resources/page@<id>-<ts>.jpeg` | Zrzut ekranu wykonany przy każdej akcji widocznej dla użytkownika |
| `resources/page@<id>-<ts>-elements.json` | Płaska lista interaktywnych elementów w momencie danej akcji |
| `resources/page@<id>-<ts>-snapshot.txt` | Migawka drzewa dostępności z wcięciami według głębokości (przyjazna dla AI) |

### Co liczy się jako „akcja”

Polecenia są filtrowane przez listę dozwolonych, zanim wygenerują wpisy śledzenia. Przykłady trafiające do śledzenia:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Polecenia wewnętrzne, takie jak `findElement`, `waitUntil`, `executeScript`, są celowo wykluczone — nie reprezentują intencji widocznej dla użytkownika i zaśmiecałyby oś czasu. Pełna lista dozwolonych znajduje się w [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Format wyjściowy — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (domyślnie) — pojedyncze archiwum w `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — te same pliki rozpakowane do `test-results/trace-<sessionId>/`. O jeden krok rozpakowywania mniej dla skryptowych lub agentowych konsumentów, którzy chcą bezpośrednio przeszukiwać (grep) / strumieniować NDJSON.

Oba formaty otwierają się w natywnym [odtwarzaczu `show-trace`](/docs/devtools/trace-player) oraz w innych zgodnych przeglądarkach śledzeń.

## Szczegółowość śledzenia — `traceGranularity`

Ile artefaktów śledzenia generuje przebieg:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Wartość | Wynik |
|---|---|
| `session` (domyślnie) | Jedno śledzenie na workera/sesję — `test-results/trace-<sessionId>.zip`. |
| `spec` | Jedno śledzenie na plik specyfikacji. Mniejsze, łatwiejsze w nawigacji. |
| `test` | Jedno śledzenie **na test**, każde we własnym folderze: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Przy szczegółowości `test` nazwa folderu jest budowana z nazwy bazowej specyfikacji, sluga tytułu testu, przeglądarki oraz sufiksu `-retry<N>` przy ponownych próbach — np. `test-results/login_e2e-logs-in-chrome/trace.zip`, a pierwsza ponowna próba w `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Śledzenia per test są najłatwiejsze w nawigacji i najlepiej łączyć je z polityką retencji, aby zapisywane były tylko te śledzenia, które Cię interesują.

## Retencja — `tracePolicy`

Domyślnie zachowywane jest każde śledzenie (`'on'`). Aby zachować tylko te interesujące — idealne w połączeniu z `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Polityka | Zachowuje śledzenie, gdy… |
|---|---|
| `'on'` (domyślnie) | Zawsze — każde śledzenie jest zapisywane. |
| `'retain-on-failure'` | **Ostatnia** próba testu zakończyła się niepowodzeniem. Sekwencja ponownych prób „niepowodzenie, potem sukces” kończy się stanem `passed`, więc *nie* jest zachowywana — nie zachowujesz nadmiarowo niestabilnego testu, który ostatecznie przeszedł. |
| `'retain-on-first-failure'` | **Próba 0** zakończyła się niepowodzeniem, niezależnie od tego, czy późniejsza ponowna próba się powiodła. |
| `'on-first-retry'` | Test został ponowiony co najmniej raz (istnieje próba 1). |
| `'on-all-retries'` | Istnieje dowolna ponowiona próba (próba ≥ 1). |
| `'retain-on-failure-and-retries'` | Ostatnia próba zakończyła się niepowodzeniem **lub** test był ponawiany. |

Fragment, który nie ma być zachowany, zostaje odrzucony i nigdy nie jest zapisywany na dysk. Polityki uwzględniające ponowne próby opierają się na **rejestrze wyników** poszczególnych prób, który adapter prowadzi dla każdego stabilnego między próbami identyfikatora testu, dzięki czemu `retain-on-failure` i `retain-on-first-failure` oceniają właściwą próbę. Gdy runner nie udostępnia informacji o ponownych próbach, każda polityka poza `retain-on-failure` degraduje do `retain-on-failure`; przebieg bez zaobserwowanych wyników (np. zwykły samodzielny skrypt) działa w trybie **fail-open** i zachowuje śledzenie, zamiast ryzykować utratę takiego, którego potrzebujesz.

> Retencja uwzględniająca ponowne próby jest zweryfikowana end-to-end dla **WebdriverIO** (mocha / cucumber) oraz **Selenium** (mocha). W przypadku **Nightwatch** `retain-on-failure` działa, ale pozostałe polityki uwzględniające ponowne próby degradują do niej, ponieważ `--retries` w Nightwatch uruchamia przypadek testowy ponownie wewnętrznie, bez ponownego wywoływania hooków per test. Międzyprocesowe `specFileRetries` w WDIO również wykracza poza rejestr (prowadzony per worker). Szczegóły znajdziesz na [stronie adaptera Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Gęsty filmstrip — `filmstrip`

**Domyślnie** śledzenie rejestruje **gęsty, ciągły** screencast, dzięki czemu odtwarzacz przewija płynnie, zamiast przeskakiwać z klatki na klatkę. Gęste klatki znajdują się obok klatek per akcja (które zawierają migawki DOM). Ustaw `filmstrip: false`, aby rejestrować tylko jedną klatkę na akcję — mniejsze śledzenie bez ciągłego rejestratora:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Gęste klatki są dodawane **obok** klatek per akcja (które zawierają migawki DOM), więc żadne dane DOM nie są tracone — gdy gęste klatki są obecne, zastępują rzadki filmstrip per akcja podczas przewijania.
- Klatki są przerzedzane podczas eksportu (co najmniej 100 ms odstępu) i adresowane treścią, więc identyczne klatki (statyczne oczekiwanie) zwijają się do jednego zasobu. Bufor sesji na żywo jest ograniczony przez `screencast.maxBufferFrames` (domyślnie 2000).
- Nagrywanie korzysta z rejestratora screencastu — push CDP w Chrome/Chromium, odpytywanie zrzutami ekranu w pozostałych przeglądarkach. W przeglądarkach innych niż Chrome odpytywanie wysyła wiele poleceń `takeScreenshot`; połącz to z opcją wyciszania kroków w swoim reporterze (zobacz [Integracja z Allure](/docs/devtools/allure)).

`filmstrip` jest dostępny we wszystkich trzech adapterach (WebdriverIO / Selenium / Nightwatch).

## Zrzut ekranu i wideo per test — `screenshot` / `video`

Przy `traceGranularity: 'test'` każdy test może również wygenerować samodzielny zrzut ekranu i/lub fragment wideo per test, odzwierciedlając znaną ergonomię zrzutów ekranu/wideo przy niepowodzeniu:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Opcja | Wartości | Zachowanie |
|---|---|---|
| `screenshot` | `'off'` (domyślnie) · `'on'` · `'only-on-failure'` | `'on'` wykonuje zrzut po każdym teście; `'only-on-failure'` tylko po teście zakończonym niepowodzeniem. PNG. |
| `video` | `'off'` (domyślnie) · dowolna wartość `tracePolicy` | Nagrywa screencast w sposób ciągły i zachowuje fragment każdego testu zgodnie z tą samą semantyką retencji co `tracePolicy`. WebM. Ustawienie wartości innej niż `off` samo uruchamia rejestrator — nie potrzebujesz dodatkowo `filmstrip` ani `screencast.enabled`. |

Obie opcje działają tylko w trybie śledzenia + `traceGranularity: 'test'` (zakres per test, do którego są dołączane). Przy mniej szczegółowych ustawieniach nic nie robią.

- **WebdriverIO** — `screenshot` / `video` to opcje serwisu; są dołączane inline do Allure, gdy obecny jest `@wdio/allure-reporter`.
- **Selenium** — te same opcje w jego `DevToolsOptions`; dołączane inline do Allure przez `allure-js-commons`, gdy aktywny jest adapter runnera Allure.
- **Nightwatch** — **tylko generowanie**: pliki są zapisywane w katalogu wyjściowym śledzenia (i wymienione w manifeście), ale nie są dołączane inline do Allure — Nightwatch nie ma API do dołączania na żywo do Allure. Zobacz [Ograniczenia trybu śledzenia](/docs/devtools/limitations).

> `screencast.enabled` to osobne ciągłe nagrywanie `.webm` w **trybie na żywo** i jest ignorowane w trybie śledzenia. W trybie śledzenia używaj `filmstrip` (gęste klatki w śledzeniu) lub `video` per test; pola dostrajania screencastu (`quality`, `maxWidth`, `pollIntervalMs`, …) nadal mają zastosowanie do działającego rejestratora.

## Manifest artefaktów — `emitArtifactsManifest`

Zapisuje plik `devtools-artifacts-<sessionId>.json` obok śledzenia — ogólny indeks, z którego reportery i CI korzystają, aby odnaleźć wygenerowane artefakty (każde śledzenie / zrzut ekranu / wideo oraz stan każdego testu):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Domyślnie wyłączony.** **Włącza się automatycznie**, gdy wykryty zostanie reporter Allure — `@wdio/allure-reporter` WebdriverIO w konfiguracji lub aktywne środowisko uruchomieniowe `allure-js-commons` w Selenium.
- **Nightwatch wymaga jawnego włączenia**: nie ma sygnału Allure na żywo, który można by wykryć (`nightwatch-allure` działa po fakcie), więc nigdy nie włącza się automatycznie — ustaw opcję jawnie, jeśli chcesz mieć manifest.

## Asercje — `captureAssertions`

Asercje pojawiają się w śledzeniu jako pełnoprawne wiersze akcji (domyślnie włączone; ustaw `captureAssertions: false`, aby zrezygnować):

- **`node:assert`** — przechwytywane we wszystkich trzech adapterach jako wiersze `assert.<method>`.
- **`expect` w WebdriverIO** — zarówno udane, *jak i* nieudane matchery `expect(...)` (`expect($el).toHaveText(...)`, `toBeExisting()`, …) pojawiają się jako wiersze `expect.<matcher>` zawierające oczekiwaną wartość, lokalizację elementu w kodzie źródłowym oraz migawkę; wewnętrzne polecenia odpytywania matchera są pomijane, więc widoczna jest tylko asercja.
- **`browser.assert.*` / `browser.verify.*` w Nightwatch** — natywne asercje pojawiają się jako wiersze `assert.<m>` / `verify.<m>`.

Udane asercje wyświetlane są na zielono; nieudane — na czerwono wraz z komunikatem błędu.

## Testowanie mobilne

Tryb śledzenia wykrywa sesje mobilne na podstawie `platformName: 'android' | 'ios'` (bez rozróżniania wielkości liter) i dostosowuje się:

- **Mobilna przeglądarka** (Chrome na Androidzie, Safari na iOS): ten sam potok migawek oparty na DOM co na desktopie.
- **Natywne aplikacje mobilne**: skrypty DOM wstrzykiwane do strony są wyłączone; zamiast tego używane jest `getPageSource()` do pobrania drzewa XML Appium, które zasila serializer migawek.

`context-options` śledzenia zapisuje `title: 'android — <deviceName>'` / `'ios — <deviceName>'`, dzięki czemu przeglądarka poprawnie oznacza klatki. Referencyjna konfiguracja WDIO dla Chrome na Androidzie przez Appium jest dostępna w [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Przeglądanie artefaktu

Otwórz śledzenie w natywnym **[Odtwarzaczu śledzeń](/docs/devtools/trace-player)** — interfejsie WebdriverIO DevTools w dedykowanym trybie odtwarzacza tylko do odczytu:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Odtwarzacz oferuje podróż w czasie po DOM, zakładkę A11y i nakładkę wyboru lokatora, zakładkę Transcript z funkcją Copy-for-LLM, zakładki dokowane Errors / Console / Network / Source oraz przewijalną oś czasu. Ten sam przenośny plik `.zip` otwiera się również w innych samodzielnych przeglądarkach śledzeń oraz we wbudowanej przeglądarce raportu Allure. Pełny przewodnik, funkcje i skróty klawiszowe znajdziesz na stronie **[Odtwarzacz śledzeń](/docs/devtools/trace-player)**.

## Dowiedz się więcej
Plik wykonywalny `show-trace` dostarczany przez każdy adapter otwiera to samo archiwum w odtwarzaczu DevTools, który dodatkowo udostępnia **zakładkę A11y**: drzewo dostępności przechwycone dla każdej akcji, gdzie kliknięcie wiersza kopiuje lokator danego elementu.

Lokatory te są zapisywane w dialekcie runnera, który wykonał nagranie, więc można je wkleić bezpośrednio do frameworka, który wygenerował śledzenie. Element identyfikowany wyłącznie po tekście to `a*=Logout` w WebdriverIO i `//a[contains(., "Logout")]` w Selenium — opisany wywołaniem, które go rozwiązuje, `By.xpath()`. Nightwatch preferuje natywny lokator CSS, taki jak `button[type="submit"]`, ponieważ jest to jedyny runner, który odczytuje sam ciąg selektora przy domyślnej strategii CSS, i wraca do XPath (opisanego jako `useXpath()` / `locateStrategy: 'xpath'`) tylko wtedy, gdy nie istnieje unikalny lokator CSS. Każdy inny lokator to przenośny CSS.

Na potrzeby LLM / agentów czytaj bezpośrednio `transcript.md` — to zwięzła reprezentacja akcji w Markdown z selektorami i wartościami.

- **[Odtwarzacz śledzeń](/docs/devtools/trace-player)** — pełny przewodnik po odtwarzaczu `show-trace`, jego funkcjach i skrótach klawiszowych.
- **[Integracja z Allure](/docs/devtools/allure)** — jak artefakty śledzenia / zrzutów ekranu / wideo są dołączane do raportu Allure.
- **[Obsługa wielu frameworków](/docs/devtools/cross-framework)** — macierz możliwości poszczególnych adapterów (WebdriverIO / Selenium / Nightwatch).
- **[Ograniczenia trybu śledzenia](/docs/devtools/limitations)** — co pomija tryb śledzenia i znane braki poszczególnych adapterów.
- **[Dokumentacja konfiguracji](/docs/devtools/reference)** — wszystkie opcje w jednym miejscu.