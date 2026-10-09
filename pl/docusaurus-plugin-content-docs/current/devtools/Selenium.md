---
id: selenium
title: Selenium DevTools
description: "Dodaj interfejs debugowania DevTools do testów Selenium WebDriver w Node.js lub Pythonie z dowolnym test runnerem i włącz tryb śledzenia (trace mode)."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapter Selenium WebDriver dla [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - zapewnia ten sam wizualny interfejs debugowania dla dowolnego testu Selenium, w **Node.js** lub **Pythonie**, niezależnie od test runnera.

Node.js działa z **Mocha**, **Jest**, **Cucumber** lub zwykłym skryptem - wtyczka automatycznie wykrywa runner i odpowiednio podpina granice testów. Python działa z **pytest** lub zwykłym skryptem, a w przypadku pytest nie wymaga żadnych zmian w plikach testowych.

Wybierz swój język w zakładkach poniżej; wybór obowiązuje na całej stronie.

## Instalacja

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Wymaga Pythona 3.10+ oraz `selenium>=4.44`.** Oba wymagania są zadeklarowane w metadanych pakietu, więc pip je egzekwuje, zamiast pozostawiać cię z pustą zakładką Network w czasie działania. Przechwytywanie ruchu sieciowego subskrybuje zdarzenia przez publiczne API zdarzeń BiDi, które selenium wygenerowało na nowo w wersji 4.44; prywatne połączenie, które ono zastąpiło, zostało usunięte w tym samym wydaniu, i to właśnie 4.44 wyznacza minimalną wersję dla Pythona.

</TabItem>
</Tabs>

## Konfiguracja

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Każdy poniższy blok to **kompletny, gotowy do skopiowania przykład** zawierający wywołanie `DevTools.configure(...)`. Wybierz runner, którego używasz, wklej fragment do swojego projektu i uruchom go.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Uruchom:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternatywa: pomiń import w każdym pliku i użyj `mocha --require @wdio/selenium-devtools`, aby załadować wtyczkę jednorazowo dla całego uruchomienia.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Uruchom (ESM wymaga flagi eksperymentalnej):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Podzielona struktura Cucumbera oznacza trzy małe pliki - jeden do załadowania wtyczki, jeden dla World/hooków i jeden dla definicji kroków.

`features/support/setup.js` - załaduj wtyczkę i skonfiguruj ją jednorazowo:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - cykl życia drivera:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - podepnij plik setup **jako pierwszy**, aby wtyczka zmodyfikowała Selenium, zanim uruchomi się jakikolwiek krok:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Uruchom:

```bash
cucumber-js --config cucumber.json
```

### Zwykły skrypt Node (bez test runnera)

Jeśli uruchamiasz `node tests/google.test.js` bezpośrednio, nie ma runnera, do którego wtyczka mogłaby się automatycznie podpiąć. Domyślnie w panelu otrzymujesz pojedynczy wiersz "Selenium Session". Aby uzyskać nazwaną granicę testu, wywołaj `DevTools.startTest` / `endTest` wokół swojego kodu:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opcjonalne - nadaje nazwę wierszowi testu

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Używaj `startTest` / `endTest` wyłącznie w zwykłych skryptach Node. W Mocha / Jest / Cucumber wtyczka już wie, kiedy każdy test się zaczyna i kończy - ręczne wywoływanie tych metod utworzyłoby zduplikowane wiersze.

</TabItem>
<TabItem value="python" label="Python">

### pytest

W plikach testowych nic nie trzeba dodawać - wtyczka jest wykrywana automatycznie, a flaga włącza ją dla danego uruchomienia:

```bash
pytest --devtools tests/              # panel na żywo
pytest --devtools-trace tests/        # zamiast tego zapisz archiwum śledzenia (implikuje --devtools)
```

Możesz też zapisać ten wybór w repozytorium, żeby nikt nie musiał pamiętać o fladze:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archiwum śledzenia zamiast panelu
# devtools_trace_granularity = "test"            # ... jedno archiwum na test
# devtools_trace_policy = "retain-on-failure"    # ... zachowując tylko to, co nie przeszło
```

Plik `pytest.ini` z sekcją `[pytest]` przyjmuje te same klucze. Dwa ustawienia śledzenia są opisane w sekcji [Ile archiwów i które zachować](#how-many-archives-and-which-ones-to-keep).

Przechwytywanie jest zawsze opcjonalne (opt-in) - sama instalacja pakietu nigdy nie może zmienić zachowania istniejącego zestawu testów. Różni się jedynie *sposób*, w jaki wyrażasz zgodę:

| Jak włączasz | Zakres |
|---|---|
| `--devtools` / `--devtools-trace` | to uruchomienie |
| `devtools` / `devtools_trace` w `[tool.pytest.ini_options]` | ten projekt |
| `DEVTOOLS_ENABLE=1` (lub `DEVTOOLS_PORT=<n>`, które dodatkowo podłącza się do już działającego panelu) | ta powłoka - dla CI |

Wygrywa najwyższy priorytet: CLI, potem ini, potem środowisko. `pytest -o devtools=false` wyłącza domyślne ustawienie projektu dla pojedynczego uruchomienia, dlatego nie istnieje `--no-devtools`. `DEVTOOLS_TRACE=1` wybiera tryb śledzenia, ale **nie** włącza przechwytywania samodzielnie, więc wyeksportowanie tej zmiennej na potrzeby własnych skryptów nigdy nie spowoduje przechwycenia uruchomienia pytest, o które nie prosiłeś.

W trybie na żywo panel otwiera się w osobnym oknie przeglądarki i **pozostaje otwarty po zakończeniu uruchomienia**, abyś mógł przejrzeć, co się wydarzyło; zamknij go (lub naciśnij `Ctrl-C`), aby zakończyć. Dwa rodzaje uruchomień pozostają nieprzechwycone nawet po włączeniu: `--collect-only`, gdzie nic się nie wykonuje, oraz uruchomienie, które nie zebrało żadnych testów - w przeciwnym razie literówka w ścieżce zostawiłaby twój terminal zawieszony na pustym panelu.

### Zwykły skrypt Pythona (bez test runnera)

Dwie linie wokół istniejącego kodu Selenium:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # otwórz panel, przechwytuj każde polecenie
# devtools.enable(trace=True)         # lub: zapisz trace.zip i nie otwieraj okna

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # pozostaw UI otwarte do przeglądania (nic nie robi, gdy okno nie jest otwarte)
devtools.disable()
```

Jeśli backendu nie można uruchomić ani się z nim połączyć, `enable()` zapisuje ostrzeżenie w logach i zwraca `None`. Przechwytywanie jest pomijane, a twoje testy nadal się wykonują - brak panelu nigdy nie powoduje niepowodzenia zestawu testów.

### Uruchomienia równoległe (`pytest -n`)

**pytest-xdist działa bez dodatkowej konfiguracji.** Każdy proces raportujący do jednego uruchomienia musi uzgodnić identyfikator uruchomienia, w przeciwnym razie backend traktuje każde połączenie jako nowe uruchomienie i usuwa to, co przechwyciło poprzednie. Z xdist identyfikatory się zgadzają: wtyczka ładuje się także w **kontrolerze**, a włączenie przechwytywania w nim ustala identyfikator, zanim xdist uruchomi jakikolwiek worker - workery są procesami potomnymi, więc go dziedziczą.

Co faktycznie zostanie odczytane jako osobne uruchomienia: dwa niezależne wywołania `pytest` lub worker uruchomiony bez tego środowiska. Wyeksportuj samodzielnie `DEVTOOLS_RUN_ID`, aby połączyć takie procesy w jedno uruchomienie.

</TabItem>
</Tabs>

## Opcje konfiguracji

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opcja | Typ | Domyślnie | Opis |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port serwera backendu DevTools. Automatycznie zwiększany, jeśli jest już zajęty. |
| `hostname` | `string` | `'localhost'` | Nazwa hosta, na której nasłuchuje serwer backendu. |
| `openUi` | `boolean` | `true` | Automatycznie otwiera interfejs DevTools w nowym oknie Chrome. Ustaw `false` dla CI. |
| `captureScreenshots` | `boolean` | `true` | Wykonuje zrzut ekranu po każdym poleceniu WebDriver. |
| `headless` | `boolean` | `false` | Uruchamia **testową** przeglądarkę w trybie headless (wstrzykuje `--headless=old`). Nie wpływa na okno interfejsu DevTools. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Nagrywanie wideo `.webm` dla każdej sesji. Opcje są takie same jak na stronie [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Szablon polecenia do ponownego uruchomienia pojedynczego testu. `{{testName}}` jest podstawiane. Jeśli pominięto, wyznaczany automatycznie z argv runnera. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` otwiera interfejs DevTools; `trace` go pomija i zamiast tego zapisuje przenośny artefakt. Zobacz [Trace Mode](/docs/devtools/wdio/trace-mode). Nadpisuje `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Układ artefaktu śledzenia. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Jedno śledzenie na sesję / plik spec / test. `'test'` zapisuje każde do `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ma zastosowanie tylko przy `mode: 'trace'`. Zobacz [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Które śledzenia zachować. Łączy się z `traceGranularity: 'test'`. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Nagrywa gęsty, ciągły screencast do śledzenia, umożliwiając przewijanie klatka po klatce w odtwarzaczu. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Tryb śledzenia + `traceGranularity: 'test'`. Zrzut ekranu dla każdego testu, dołączany bezpośrednio do Allure (`image/png`) przez `allure-js-commons`, gdy aktywny jest adapter runnera Allure. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Tryb śledzenia + `traceGranularity: 'test'`. Wideo screencastu dla każdego testu, zachowywane zgodnie z podaną polityką, dołączane bezpośrednio do Allure (`video/webm`) przez `allure-js-commons`, gdy aktywny jest adapter runnera Allure. |
| `emitArtifactsManifest` | `boolean` | auto | Zapisuje manifest `devtools-artifacts-<sessionId>.json` — ogólny indeks, z którego reportery/CI korzystają, aby odnaleźć wygenerowane artefakty — obok śledzenia. Domyślnie wyłączone; **włącza się automatycznie**, gdy aktywne jest środowisko uruchomieniowe `allure-js-commons`. Tylko tryb śledzenia. |
| `captureAssertions` | `boolean` | `true` | Przechwytuje asercje `node:assert` (zarówno udane, jak i nieudane) jako wiersze akcji w śledzeniu. Ustaw `false`, aby zrezygnować. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Dla CI** ustaw zarówno `headless: true` (ukrywa testową przeglądarkę), jak i `openUi: false` (nie próbuje otwierać okna panelu - środowiska CI nie mają ekranu). Backend nadal działa na skonfigurowanym porcie, więc w razie potrzeby możesz później otworzyć interfejs.

</TabItem>
<TabItem value="python" label="Python">

Nie ma obiektu opcji - w kodzie testów nie musi pojawić się nic specyficznego dla devtools. W pytest konfigurujesz adapter tak samo, jak konfigurujesz pytest; skrypt przekazuje argumenty nazwane do `enable()`; wszystko, co nie ma flagi, jest zmienną środowiskową.

| Flaga pytest | `[tool.pytest.ini_options]` | Efekt |
|---|---|---|
| `--devtools` | `devtools = true` | Przechwytuje to uruchomienie i otwiera panel. |
| `--devtools-trace` | `devtools_trace = true` | Przechwytuje to uruchomienie i zapisuje archiwum śledzenia zamiast otwierać panel. Implikuje `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Jedno archiwum dla całego uruchomienia (`session`, domyślnie) lub jedno na test. Implikuje `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Które archiwa warto zachować. Implikuje `--devtools-trace`. Zobacz [Ile archiwów i które zachować](#how-many-archives-and-which-ones-to-keep). |

Wygrywa najwyższy priorytet: CLI, potem ini, potem poniższe środowisko. `pytest -o devtools=false` wyłącza domyślne ustawienie projektu dla jednego uruchomienia, a `pytest -o devtools_trace_policy=on` robi to samo dla każdego z pozostałych.

| Zmienna | Efekt |
|---|---|
| `DEVTOOLS_ENABLE=1` | Włącza przechwytywanie, jeśli nie zrobiła tego już flaga ani opcja ini. |
| `DEVTOOLS_PORT=<n>` | Podłącza się do panelu już nasłuchującego na tym porcie; również włącza przechwytywanie. |
| `DEVTOOLS_HOST=<host>` | Host, pod którym dostępny jest panel (domyślnie `localhost`). |
| `DEVTOOLS_TRACE=1` | Zapisuje archiwum śledzenia zamiast otwierać panel. Wybiera tryb dla zwykłego skryptu; w pytest sama nie włącza przechwytywania uruchomienia. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Tryb śledzenia: jedno archiwum dla całego uruchomienia lub jedno na test. Zmienna otoczenia, więc nigdy sama nie wybiera trybu śledzenia - połącz ją z `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Tryb śledzenia: które archiwa warto zachować. Zmienna otoczenia, więc nigdy sama nie wybiera trybu śledzenia - połącz ją z `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Tryb śledzenia: pomija gęsty filmstrip w archiwum. |
| `DEVTOOLS_A11Y=0` | Tryb śledzenia: pomija drzewo A11y i prostokąty elementów dla każdej akcji. |
| `DEVTOOLS_OPEN=0` | Nie otwiera okna panelu (CI). |
| `DEVTOOLS_BIDI=0` | Wyłącza BiDi, a wraz z nim przechwytywanie konsoli i sieci. |
| `DEVTOOLS_RUN_ID=<id>` | Łączy kilka procesów w jedno uruchomienie. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Uruchamia backend za pomocą jawnie podanego polecenia zamiast ustalonego automatycznie. |

Backend jest aplikacją Node, więc **Node.js 22.19 lub nowszy musi być dostępny w każdym trybie** - nawet w trybie śledzenia, w którym okno panelu nigdy się nie otwiera. Nie chodzi tylko o interfejs: kolektor strony jest serwowany przez backend, cały strumień zdarzeń przechodzi przez jego WebSocket, a w trybie śledzenia to on również buduje archiwum. `enable()` sprawdza obecność Node na samym początku i wskazuje, czego brakuje, zamiast zawieść później z przekroczeniem czasu uruchamiania procesu. Adapter sam znajduje lub uruchamia backend - zobacz [uruchamianie backendu samodzielnie](/docs/devtools/dashboard#running-the-backend-on-its-own), jeśli wolisz zarządzać nim sam, lub wskaż przez `DEVTOOLS_PORT` backend, który już działa; wtedy lokalny Node nie jest potrzebny.

### Asercje

Udane i nieudane instrukcje `assert` pojawiają się jako wiersze zawierające wartości **expected** i **actual**, a niepowodzenia trafiają do zakładki Errors. W Pythonie `assert` jest instrukcją, a nie wywołaniem, więc w przeciwieństwie do modyfikacji `node:assert` w adapterze Node nie ma czego opakować - wynik pochodzi z runnera.

**W pytest** wartości pochodzą z mechanizmu przepisywania asercji (assertion rewriter), więc każdy wiersz zawiera rzeczywiste operandy. Przechwytywanie *udanych* asercji wymaga `enable_assertion_pass_hook` w pytest, który wtyczka włącza sama. Jedno zastrzeżenie: pytest decyduje dla każdego modułu, *podczas jego przepisywania*, czy emitować ten hook, więc moduł, którego przepisany kod bajtowy został zapisany w pamięci podręcznej przed instalacją wtyczki, nadal raportuje tylko niepowodzenia. Adapter informuje o tym jednorazowo podczas zbierania testów i wskazuje pamięć podręczną do usunięcia - która **nie** zawsze jest katalogiem `__pycache__` obok twoich testów, ponieważ `sys.pycache_prefix` (ustawiony domyślnie w systemowym Pythonie na macOS) kieruje każdy przepisany moduł do jednego centralnego drzewa.

**W zwykłym skrypcie** nie ma mechanizmu przepisywania, więc wyniki pochodzą ze zdarzeń liniowych interpretera, a wartości są odczytywane z ramki, która ma wykonać asercję. Ustalane są tylko odczyty, które nie mogą wykonać twojego kodu: literał lub zmienna lokalna zostaną ustalone, atrybut lub wywołanie już nie, ponieważ ponowne obliczenie `driver.current_url` wysłałoby kolejne polecenie WebDriver.

</TabItem>
</Tabs>

## Tryb śledzenia

Ścieżka przechwytywania bez interfejsu, w **obu językach** - nie otwiera się okno interfejsu DevTools, a uruchomienie zapisuje przenośne archiwum śledzenia w folderze `test-results/`, o tym samym kształcie co artefakt śledzenia WebdriverIO. Oba języki różnią się jedynie tym, jak bardzo można dostosować artefakt, oraz tym, kto go buduje.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Na koniec sesji adapter sam zapisuje `trace-<sessionId>.zip` (lub katalog) w `test-results/` obok ustalonego katalogu testów / konfiguracji.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcjonalne; domyślnie 'zip'
})
```

W trybie śledzenia pomijane są: wiązanie portu backendu, okno interfejsu oraz opcja `screencast`. Pełny opis funkcji (zawartość artefaktu, przeglądarka, testowanie mobilne, kiedy wybrać `zip`, a kiedy `ndjson-directory`) znajdziesz na [stronie Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefakty dla każdego testu i ich zachowywanie

Przy `traceGranularity: 'test'` każdy test otrzymuje własny folder artefaktów, a `tracePolicy` decyduje, które z nich są zachowywane (np. `retain-on-failure`). W tym trybie możesz również przechwycić dla każdego testu `screenshot` (PNG) i `video` (`.webm`) oraz włączyć gęsty `filmstrip` nagrywany do śledzenia w celu przewijania klatka po klatce. Gdy aktywny jest adapter runnera `allure-js-commons`, śledzenia / zrzuty ekranu / filmy dla każdego testu są dołączane bezpośrednio do raportu Allure (a `emitArtifactsManifest` włącza się automatycznie); w przeciwnym razie są zapisywane w `test-results/` i rejestrowane w manifeście.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Nie ma obiektu opcji do ustawienia - flaga w pytest, argument nazwany w skrypcie:

```bash
pytest --devtools-trace tests/        # implikuje --devtools
DEVTOOLS_TRACE=1 python3 login.py     # zwykły skrypt; to samo co devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # zapisz trace.zip zamiast otwierać panel
```

Archiwum trafia do `test-results/` obok pliku testowego, z którego pochodziło pierwsze przechwycone polecenie - tego samego katalogu, do którego już zapisywane są filmy screencastu - pod nazwą `trace-<sessionId>.zip` lub nazwą każdego testu, gdy poprosisz o [jedno archiwum na test](#how-many-archives-and-which-ones-to-keep). Gdy żadne polecenie nie zawierało lokalizacji w twoim kodzie źródłowym, archiwum trafia do `test-results/` w bieżącym katalogu.

**Nie otwiera się żadne okno panelu.** Wynikiem jest artefakt, a uruchomienie na żywo blokuje się na oknie, dopóki go nie zamkniesz - okno zamieniłoby zapis pliku w sesję interaktywną. Backend nadal się uruchamia, ponieważ to on *buduje* archiwum: transformacje śledzenia są napisane w TypeScript, więc uruchomienie w Pythonie prosi o nie backend, zamiast dostarczać ich drugą kopię. To jedyna różnica względem trybu śledzenia adaptera Node.js działającego bez backendu i powód, dla którego [Node.js 22.19 lub nowszy jest wymagany w każdym trybie](#configuration-options).

Oprócz wierszy poleceń, zrzutów ekranu i selektorów dla każdego polecenia, konsoli i sieci, które przechwytują oba tryby, archiwum zawiera:

| W archiwum | Domyślnie | Wyłączenie |
|---|---|---|
| Podróż w czasie po DOM - strumień mutacji odtwarzany przez odtwarzacz krok po kroku | włączone | - |
| Gęsty filmstrip - klatki screencastu przeniesione do śledzenia zamiast `.webm` | włączone | `DEVTOOLS_FILMSTRIP=0` |
| Drzewo A11y i nakładka elementów - odczytywane przy każdej akcji, kosztem dwóch dodatkowych zapytań na polecenie | włączone | `DEVTOOLS_A11Y=0` |

Tryb śledzenia nie koduje `.webm`, więc nie potrzebuje `ffmpeg` - klatki *są* filmstripem.

**Eksport jest żądany po zakończeniu uruchomienia, a nie przy zakończeniu procesu** - pytest prosi o niego w `sessionfinish`, a `disable()` w skrypcie eksportuje przed zamknięciem transportu, więc CI otrzymuje artefakt niezależnie od tego, czy kiedykolwiek pojawiło się jakieś okno.

### Ile archiwów i które zachować

Decydują o tym dwa ustawienia i żadne z nich nie ma znaczenia poza trybem śledzenia.

**Granularność** - ile archiwów zapisuje uruchomienie:

| `--devtools-trace-granularity` | Wynik |
|---|---|
| `session` (domyślnie) | Jedno archiwum dla całego uruchomienia. |
| `test` | Jedno archiwum na test, każde zawierające wyłącznie polecenia, konsolę, sieć, mutacje DOM, drzewa a11y i klatki screencastu danego testu. |

Celowo nie ma tu wartości `spec`. Specem tego adaptera *jest* jego plik testowy, więc trzecia nazwa mogłaby po cichu oznaczać tylko jedną z dwóch powyższych.

**Polityka** - które z tych archiwów są zachowywane:

| `--devtools-trace-policy` | Wynik |
|---|---|
| `on` (domyślnie) | Zachowuje wszystko. |
| `retain-on-failure` | Zachowuje tylko to, co nie przeszło. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Akceptowane, ale obecnie działają **dokładnie tak jak `retain-on-failure`**. |

Te ostatnie cztery nie uwzględniają jeszcze ponownych prób i warto powiedzieć to wprost, zamiast pozwolić odkryć to na podstawie archiwum, którego się spodziewałeś: nic, co ten adapter przesyła, nie zawiera numeru próby, więc ponawiany test nadpisuje swój wcześniejszy wynik i pytania uwzględniającego ponowne próby w ogóle nie da się zadać. Backend zapisuje w logach informację o tym ograniczeniu, zamiast udawać, że jest inaczej. Wybierz jedną z nich tylko wtedy, gdy chcesz `retain-on-failure` pod nazwą, która w przyszłości będzie znaczyć więcej.

Oba ustawienia się łączą:

| Granularność | Polityka | Co otrzymujesz |
|---|---|---|
| `test` | `retain-on-failure` | Tylko testy, które nie przeszły. |
| `session` | `retain-on-failure` | Archiwum całego uruchomienia, jeśli cokolwiek w nim nie przeszło. |
| dowolna | `on` | Wszystko. |

Każde archiwum zachowane przy granularności `test` nosi nazwę swojego testu (`trace-<test>-<hash>.zip`, gdzie hash pochodzi z nodeid testu, dzięki czemu dwa sparametryzowane przypadki o tym samym tytule nie mogą się nawzajem nadpisać). Uruchomienie, które niczego nie zachowuje, niczego nie zapisuje - i o to właśnie chodzi: archiwa, które zostają, to te, które warto otworzyć, a odrzucony eksport oznacza działanie polityki, a nie błąd.

Ustaw je dla jednego uruchomienia:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Lub zapisz je w repozytorium, aby współtwórca, który sklonuje projekt, przechwytywał w ten sam sposób bez konieczności informowania go o tym:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` w `pyproject.toml` przyjmuje te same klucze, a `pytest -o devtools_trace_policy=on tests/` nadpisuje jeden z nich dla pojedynczego uruchomienia bez edytowania pliku. W pełni skomentowana wersja - każde ustawienie i każda zmienna środowiskowa wraz z ich przeznaczeniem - znajduje się w repozytorium w [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Zwykły skrypt przekazuje te same dwa ustawienia jako argumenty nazwane:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Jawne podanie któregokolwiek z nich wybiera tryb śledzenia.** Flaga CLI, opcja ini i argument `enable()` implikują go, ponieważ polityka czy granularność nic nie znaczą w trybie na żywo, a uwzględnienie ich bez tego trybu po cichu porzuciłoby to, o co prosiłeś. `DEVTOOLS_TRACE_POLICY` i `DEVTOOLS_TRACE_GRANULARITY` celowo tego **nie** robią: wyeksportowana zmienna jest częścią otoczenia i mogła zostać ustawiona dla innego skryptu w tej samej powłoce, więc przełączenie na tej podstawie uruchomienia na żywo w tryb śledzenia odebrałoby panel, którego nikt nie chciał stracić - połącz je z `DEVTOOLS_TRACE=1`. Uruchomienie, które ostatecznie ignoruje wyeksportowane ustawienie śledzenia, zapisuje ostrzeżenie w logach, zamiast zostawiać cię z archiwum, które nigdy się nie pojawiło.

</TabItem>
</Tabs>

### Przeglądanie śledzenia

Otwórz dowolny plik śledzenia `.zip` w oficjalnym odtwarzaczu — tym samym interfejsie DevTools w dedykowanym trybie **odtwarzacza**:

```bash
npx show-trace path/to/trace.zip      # w projekcie, który instaluje adapter
pnpm show-trace path/to/trace.zip     # z monorepo devtools
```

Plik wykonywalny `show-trace` jest dostarczany z `@wdio/selenium-devtools`, więc jest dostępny w każdym projekcie, który go instaluje — bez dodatkowych zależności. Projekt w Pythonie nie instaluje adaptera Node.js, ale ten sam odtwarzacz jest dostarczany z backendem, który adapter już za ciebie pobiera: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Ponieważ adapter Selenium przechwytuje **strumień mutacji DOM** strony oraz migawkę elementów / dostępności dla każdego polecenia obok każdego zrzutu ekranu, śledzenie Selenium obsługuje pełen zestaw funkcji odtwarzacza — podróż w czasie po DOM, zakładkę A11y i nakładkę wybierania lokatora, zakładkę Transcript z Copy-for-LLM, zagnieżdżanie Cucumber Feature → Scenario → Step oraz przewijaną oś czasu. Śledzenie z Pythona zawiera ten sam strumień mutacji i migawkę dla każdej akcji (odczyt elementów / a11y działa tam tylko w trybie śledzenia i jest domyślnie włączony); zagnieżdżanie Gherkin to jedyna pozycja, która nie ma odpowiednika w pytest.

Śledzenie używa przenośnego schematu NDJSON, więc ten sam plik `.zip` (lub katalog) można otworzyć również w innych kompatybilnych przeglądarkach śledzeń. Pełny przewodnik znajdziesz na stronie **[Trace Player](/docs/devtools/trace-player)**.

## Publiczne API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ustaw opcje środowiska uruchomieniowego (patrz wyżej)
DevTools.startTest(name, meta?)      // oznacz nazwaną granicę testu (tylko zwykłe skrypty Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

W Mocha / Jest / Cucumber wtyczka automatycznie podpina się pod cykl życia runnera, więc nie musisz ręcznie wywoływać `startTest` / `endTest` - ich wywołanie utworzyłoby zduplikowane wiersze.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # połącz i zainstrumentuj; idempotentne
devtools.disable()                    # zamknij; bezpieczne przy dwukrotnym wywołaniu
devtools.wait_for_dashboard_close()   # blokuj, dopóki okno nie zostanie zamknięte
devtools.get_capturer()               # aktywny SessionCapturer lub None
devtools.dashboard_url()              # URL, pod którym serwowany jest panel
```

`enable()` przyjmuje opcjonalne `host` i `port` oraz argumenty nazwane:

```python
devtools.enable(trace=True)                            # zapisz trace.zip; nie otwieraj okna
devtools.enable(trace=True, filmstrip=False)           # ... bez gęstego filmstripu
devtools.enable(trace=True, a11y=False)                # ... bez odczytu elementów / a11y dla każdej akcji
devtools.enable(trace_granularity='test')              # ... jedno archiwum na test (implikuje trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... zachowaj tylko to, co nie przeszło (implikuje trace=True)
```

`filmstrip` i `a11y` dotyczą tylko trybu śledzenia i każde z nich jest domyślnie włączone (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` ustawiają to samo ze środowiska). `trace` w razie braku wartości korzysta z `DEVTOOLS_TRACE`. `trace_granularity` i `trace_policy` w razie braku wartości korzystają z `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, a przekazanie któregokolwiek z nich samo włącza tryb śledzenia - zobacz [Ile archiwów i które zachować](#how-many-archives-and-which-ones-to-keep). Wartość spoza akceptowanego zbioru generuje ostrzeżenie i powoduje powrót do wartości domyślnej, zamiast zostać odkryta później jako brakujący plik.

W pytest wtyczka steruje tym wszystkim na podstawie `--devtools` / `--devtools-trace` (lub odpowiadającej opcji ini albo `DEVTOOLS_ENABLE=1`), a granice testów pochodzą z własnych hooków pytest - nie ma odpowiednika `startTest` / `endTest` do wywołania.

</TabItem>
</Tabs>

## Przykłady

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Działające przykłady znajdują się w katalogu `examples/` na najwyższym poziomie repozytorium. Zbuduj workspace jednorazowo (`pnpm install && pnpm build`), a następnie uruchamiaj z katalogu głównego repozytorium. `pnpm demo:selenium` uruchamia domyślny przykład (Cucumber); warianty dla poszczególnych runnerów to:

| Katalog | Runner | Polecenie |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Przykłady w Pythonie znajdują się w [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Zainstaluj adapter i zbuduj workspace jednorazowo (`pnpm install && pnpm build`, aby backend istniał), a następnie uruchamiaj z katalogu głównego repozytorium:

| Przykład | Co pokazuje | Polecenie |
|---|---|---|
| `web_form.py` | Trzylinijkowa konfiguracja zwykłego skryptu | `pnpm demo:python` |
| `login.py` | Dłuższy skrypt: nawigacja, wypełnianie formularza, asercje | `pnpm demo:python:login` |
| `trace-py-test/` | pytest z klasą i testem na poziomie modułu oraz `pytest.ini`, który zapisuje tryb śledzenia, granularność i zachowywanie - każde ustawienie jest w nim opatrzone komentarzem wyjaśniającym jego działanie | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funkcje

Adapter Selenium zapewnia takie samo doświadczenie z interfejsem DevTools jak WebdriverIO, w obu językach. Każda z poniższych funkcji jest przechwytywana automatycznie, bez konfiguracji dla poszczególnych funkcji — wystarczy podstawowe `DevTools.configure({})` w Node.js lub `pytest --devtools` w Pythonie. Konsola i sieć są przesyłane strumieniowo przez handlery BiDi w Selenium, z zapasowym wstrzykiwanym kolektorem w Node.js. Linki prowadzą do pełnego opisu każdej funkcji.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Podgląd przeglądarki na żywo, zrzuty ekranu dla każdego polecenia i ponowne uruchamianie testu/zestawu jednym kliknięciem
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Zapisz migawkę nieudanego testu, uruchom go ponownie i porównaj oba uruchomienia obok siebie
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Automatycznie wykrywa Mocha, Jest, Cucumber lub zwykły skrypt w Node.js; pytest lub zwykły skrypt w Pythonie
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Przechwytywanie i przeglądanie wyjścia konsoli przeglądarki
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Monitorowanie wywołań API i aktywności sieciowej
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities sesji, środowisko i czasy dla każdej sesji przeglądarki
- **[TestLens](/docs/devtools/wdio/testlens)** - Przejście z dowolnego polecenia do linii kodu źródłowego, która je wywołała
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Automatyczne nagrywanie wideo sesji przeglądarki
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Przechwytywanie bez interfejsu, tworzące przenośny `trace.zip` (bez okna UI), w obu językach, z podziałem na testy i zachowywaniem w obu (`traceGranularity` / `tracePolicy` w Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` w Pythonie). `screenshot` / `video` dla każdego testu oraz bezpośrednie dołączanie do Allure pozostają dostępne tylko w Node.js; zobacz [Tryb śledzenia](#trace-mode)

W Node.js screencast jest jedyną funkcją z własnymi opcjami (zobacz [Opcje konfiguracji](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

W Pythonie nie wymaga on konfiguracji: Chrome przesyła klatki przez CDP, inne przeglądarki wykonują zamiast tego jeden zrzut ekranu na polecenie, a kodowanie `.webm` wymaga `ffmpeg` w `PATH`. W trybie śledzenia te same klatki stają się gęstym filmstripem archiwum zamiast `.webm`, więc nic nie jest kodowane i `ffmpeg` nie jest potrzebny.

## Jak to działa

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Wtyczka modyfikuje prototypy `Builder`, `WebDriver` i `WebElement` z `selenium-webdriver` w momencie importu:

- **`Builder.build()`** - po utworzeniu driver jest rejestrowany w mechanizmie przechwytywania sesji, a backend DevTools jest uruchamiany w odłączonym procesie potomnym.
- **Każda publiczna metoda `WebDriver` / `WebElement`** - opakowana przechwytywaniem poleceń (argumenty + wynik + zrzut ekranu + źródło wywołania).
- **`WebDriver.quit()`** - oczekiwany hook czyszczący opróżnia kodowanie screencastu, bufor WebSocket i końcowe metadane, zanim wykona się oryginalne quit.

Gdy BiDi jest dostępne (Chrome ≥114), logi konsoli, wyjątki JavaScript i zdarzenia sieciowe są przesyłane bezpośrednio przez handlery BiDi w Selenium. W przeciwnym razie wtyczka korzysta ze wstrzykiwanego skryptu kolektora po stronie przeglądarki.

Ten sam wstrzykiwany kolektor rejestruje również **strumień mutacji DOM** strony oraz migawkę elementów / dostępności dla każdego polecenia, dzięki czemu śledzenie zawiera wystarczająco dużo danych, by odtworzyć aktualny DOM na każdym kroku (mapowanie per nawigacja) — to właśnie zasila podróż w czasie po DOM i zakładkę A11y w odtwarzaczu, zamiast odtwarzania opartego wyłącznie na zrzutach ekranu.

</TabItem>
<TabItem value="python" label="Python">

Nie ma prototypów do modyfikacji, więc adapter Pythona opakowuje zamiast tego jedną metodę:

- **`WebDriver.execute()`** - jedyny punkt, przez który przechodzi każde polecenie. Metody elementów również do niej delegują (`self._parent.execute`), więc `click`, `send_keys` i `text` są przechwytywane przez to samo opakowanie bez ingerencji w klasy elementów.
- **Konfiguracja sesji** - przy pierwszym rzeczywistym poleceniu driver jest rejestrowany, wysyłane są metadane, a BiDi, kolektor i screencast zostają uruchomione.
- **`quit()`** - przechwytywane przed zamknięciem sesji, dzięki czemu screencast jest kodowany, a ostatnie klatki opróżniane, dopóki driver jeszcze istnieje.

Konsola, wyjątki JavaScript i sieć są przesyłane przez warstwę BiDi selenium (4.44+), którą adapter włącza za ciebie, wstrzykując capability `webSocketUrl` do żądania `newSession`.

**Strumień mutacji DOM** pochodzi z tego samego kolektora po stronie przeglądarki co w Node.js, rejestrowanego na początku dokumentu przez BiDi, dzięki czemu strona instrumentuje się, zanim uruchomi się jakikolwiek jej własny skrypt. W Chrome screencast jest wysyłany przez przeglądarkę przez osobny websocket CDP — oddzielony od kanału poleceń sesji, co sprawia, że rzeczywisty strumień klatek jest bezpieczny, mimo że sesja Selenium nie jest bezpieczna wątkowo.

</TabItem>
</Tabs>

## Ograniczenia

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Ograniczenie | Szczegóły |
|-----------|--------|
| Ponowne uruchamianie pojedynczych kroków Cucumber | Filtr `--name` w Cucumberze dotyczy scenariuszy, a nie pojedynczych kroków Gherkin. Ponowne uruchamianie pojedynczych kroków w panelu jest wyłączone dla Cucumbera. |
| Zastrzeżenie dotyczące trybu headless | `headless: true` wstrzykuje `--headless=old`; `--headless=new` generuje w screencaście całkowicie czarne klatki CDP. |
| Początkowy viewport | Iframe migawki w panelu używa rozmiaru 1280×800, dopóki nie zakończy się pierwsza nawigacja, a kolektor po stronie przeglądarki nie zgłosi rzeczywistego viewportu. |

</TabItem>
<TabItem value="python" label="Python">

| Ograniczenie | Szczegóły |
|-----------|--------|
| Brak zrzutów ekranu, wideo i dołączania do Allure dla każdego testu | **Archiwa śledzenia** dla każdego testu są obsługiwane (`--devtools-trace-granularity test`), ale opcje `screenshot` i `video` dla każdego testu z adaptera Node.js oraz jego bezpośrednie dołączanie przez `allure-js-commons` nie mają odpowiednika w Pythonie - artefaktami są archiwa. |
| Zachowywanie uwzględniające ponowne próby jest ograniczone | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` i `retain-on-failure-and-retries` są akceptowane, ale działają dokładnie tak jak `retain-on-failure`: nic, co jest przesyłane, nie zawiera numeru próby, więc ponawiany test nadpisuje swój wcześniejszy wynik. Backend zapisuje w logach informację o tym ograniczeniu. |
| Node jest wymagany w każdym trybie | Backend jest aplikacją Node - serwuje kolektor strony, przenosi strumień zdarzeń i buduje archiwum śledzenia - więc Node.js 22.19 lub nowszy musi być obecny nawet w trybie śledzenia, w którym nie otwiera się żadne okno. Adapter sam go znajduje lub uruchamia. |
| Opcje przeglądarki należą do ciebie | Nie ma opcji `headless`; konfiguruj Chrome przez własny obiekt `Options` selenium, tak jak zwykle. |
| Wideo w trybie na żywo wymaga ffmpeg | Bez `ffmpeg` w `PATH` kodowanie `.webm` jest pomijane z ostrzeżeniem, a nie błędem. Tryb śledzenia niczego nie koduje - jego klatki trafiają do filmstripu - więc nigdy nie potrzebuje ffmpeg. |

</TabItem>
</Tabs>