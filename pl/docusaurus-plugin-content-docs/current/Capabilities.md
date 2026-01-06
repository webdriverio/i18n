---
id: capabilities
title: Możliwości
---

Możliwość (capability) to definicja dla zdalnego interfejsu. Pomaga ona WebdriverIO zrozumieć, w jakim środowisku przeglądarki lub urządzenia mobilnego chcesz uruchamiać swoje testy. Możliwości są mniej kluczowe podczas lokalnego tworzenia testów, ponieważ najczęściej uruchamiasz je na jednym zdalnym interfejsie, ale stają się ważniejsze podczas uruchamiania dużego zestawu testów integracyjnych w CI/CD.

:::info

Format obiektu możliwości jest dobrze zdefiniowany przez [specyfikację WebDriver](https://w3c.github.io/webdriver/#capabilities). Testrunner WebdriverIO zakończy działanie wcześnie, jeśli zdefiniowane przez użytkownika możliwości nie będą zgodne z tą specyfikacją.

:::

## Niestandardowe możliwości

Podczas gdy liczba stałych zdefiniowanych możliwości jest bardzo niska, każdy może dostarczać i akceptować niestandardowe możliwości, które są specyficzne dla sterownika automatyzacji lub zdalnego interfejsu:

### Rozszerzenia możliwości specyficzne dla przeglądarek

- `goog:chromeOptions`: rozszerzenia [Chromedriver](https://chromedriver.chromium.org/capabilities), mają zastosowanie tylko dla testów w Chrome
- `moz:firefoxOptions`: rozszerzenia [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), mają zastosowanie tylko dla testów w Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) do określania środowiska podczas używania EdgeDriver do testowania Chromium Edge

### Rozszerzenia możliwości dostawców usług chmurowych

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- i wiele więcej...

### Rozszerzenia możliwości silnika automatyzacji

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- i wiele więcej...

### Możliwości WebdriverIO do zarządzania opcjami sterownika przeglądarki

WebdriverIO zarządza instalowaniem i uruchamianiem sterownika przeglądarki za Ciebie. WebdriverIO używa niestandardowej możliwości, która pozwala przekazać parametry do sterownika.

#### `wdio:chromedriverOptions`

Konkretne opcje przekazywane do Chromedriver podczas uruchamiania.

#### `wdio:geckodriverOptions`

Konkretne opcje przekazywane do Geckodriver podczas uruchamiania.

#### `wdio:edgedriverOptions`

Konkretne opcje przekazywane do Edgedriver podczas uruchamiania.

#### `wdio:safaridriverOptions`

Konkretne opcje przekazywane do Safari podczas uruchamiania.

#### `wdio:maxInstances`

Maksymalna liczba równolegle uruchomionych procesów roboczych dla konkretnej przeglądarki/możliwości. Ma pierwszeństwo przed [maxInstances](#configuration#maxInstances) i [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiuje specyfikacje dla wykonywania testów dla danej przeglądarki/możliwości. Tak samo jak [regularna opcja konfiguracji `specs`](configuration#specs), ale specyficzna dla przeglądarki/możliwości. Ma pierwszeństwo przed `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Wyklucza specyfikacje z wykonywania testów dla tej przeglądarki/możliwości. Tak samo jak [regularna opcja konfiguracji `exclude`](configuration#exclude), ale specyficzna dla przeglądarki/możliwości. Wyklucza po zastosowaniu globalnej opcji konfiguracji `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Domyślnie WebdriverIO próbuje ustanowić sesję WebDriver Bidi. Jeśli wolisz tego uniknąć, możesz ustawić tę flagę, aby wyłączyć to zachowanie.

Typ: `boolean`

#### Wspólne opcje sterowników

Podczas gdy wszystkie sterowniki oferują różne parametry konfiguracji, istnieją pewne wspólne, które WebdriverIO rozumie i wykorzystuje do konfigurowania sterownika lub przeglądarki:

##### `cacheDir`

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog służy do przechowywania wszystkich sterowników, które są pobierane podczas próby rozpoczęcia sesji.

Typ: `string`<br />
Domyślnie: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Ścieżka do niestandardowego pliku binarnego sterownika. Jeśli ustawione, WebdriverIO nie będzie próbować pobrać sterownika, ale użyje tego dostarczanego przez tę ścieżkę. Upewnij się, że sterownik jest kompatybilny z przeglądarką, której używasz.

Możesz podać tę ścieżkę za pomocą zmiennych środowiskowych `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` lub `EDGEDRIVER_PATH`.

Typ: `string`

:::caution

Jeśli plik binarny sterownika `binary` jest ustawiony, WebdriverIO nie będzie próbować pobrać sterownika, ale użyje tego dostarczanego przez tę ścieżkę. Upewnij się, że sterownik jest kompatybilny z przeglądarką, której używasz.

:::

#### Opcje sterownika specyficzne dla przeglądarki

Aby przekazać opcje do sterownika, możesz użyć następujących niestandardowych możliwości:

- Chrome lub Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
Port, na którym powinien działać sterownik ADB.

Przykład: `9515`

Typ: `number`

##### urlBase
Prefiks podstawowej ścieżki URL dla poleceń, np. `wd/url`.

Przykład: `/`

Typ: `string`

##### logPath
Zapisuje dziennik serwera do pliku zamiast stderr, zwiększa poziom logowania do `INFO`

Typ: `string`

##### logLevel
Ustaw poziom logowania. Możliwe opcje to `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Logowanie szczegółowe (równoważne z `--log-level=ALL`)

Typ: `boolean`

##### silent
Nie loguj niczego (równoważne z `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Dołącz plik dziennika zamiast nadpisywać.

Typ: `boolean`

##### replayable
Logowanie szczegółowe i brak skracania długich ciągów znaków, aby dziennik mógł być odtwarzany (eksperymentalne).

Typ: `boolean`

##### readableTimestamp
Dodaj czytelne znaczniki czasu do dziennika.

Typ: `boolean`

##### enableChromeLogs
Pokazuje dzienniki z przeglądarki (nadpisuje inne opcje logowania).

Typ: `boolean`

##### bidiMapperPath
Niestandardowa ścieżka do mappera bidi.

Typ: `string`

##### allowedIps
Rozdzielona przecinkami lista dozwolonych zdalnych adresów IP, które mogą łączyć się z EdgeDriver.

Typ: `string[]`<br />
Domyślnie: `['']`

##### allowedOrigins
Rozdzielona przecinkami lista dozwolonych źródeł żądań, które mogą łączyć się z EdgeDriver. Używanie `*` do zezwolenia na dowolne źródło hosta jest niebezpieczne!

Typ: `string[]`<br />
Domyślnie: `['*']`

##### spawnOpts
Opcje przekazywane do procesu sterownika.

Typ: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Domyślnie: `undefined`

</TabItem>
<TabItem value="firefox">

Zobacz wszystkie opcje Geckodriver w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Zobacz wszystkie opcje Edgedriver w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Zobacz wszystkie opcje Safaridriver w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Specjalne możliwości dla konkretnych przypadków użycia

To lista przykładów pokazujących, które możliwości należy zastosować, aby osiągnąć określony przypadek użycia.

### Uruchamianie przeglądarki w trybie headless

Uruchamianie przeglądarki w trybie headless oznacza uruchamianie instancji przeglądarki bez okna lub interfejsu użytkownika. Jest to najczęściej używane w środowiskach CI/CD, gdzie nie jest używany wyświetlacz. Aby uruchomić przeglądarkę w trybie headless, zastosuj następujące możliwości:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // lub 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Wygląda na to, że Safari [nie obsługuje](https://discussions.apple.com/thread/251837694) uruchamiania w trybie headless.

</TabItem>
</Tabs>

### Automatyzacja różnych kanałów przeglądarek

Jeśli chcesz przetestować wersję przeglądarki, która nie została jeszcze wydana jako stabilna, np. Chrome Canary, możesz to zrobić ustawiając możliwości i wskazując na przeglądarkę, którą chcesz uruchomić, np.:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Podczas testowania w Chrome, WebdriverIO automatycznie pobierze żądaną wersję przeglądarki i sterownik na podstawie zdefiniowanego `browserVersion`, np.:

```ts
{
    browserName: 'chrome', // lub 'chromium'
    browserVersion: '116' // lub '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' lub 'latest' (to samo co 'canary')
}
```

Jeśli chcesz przetestować ręcznie pobraną przeglądarkę, możesz podać ścieżkę binarną do przeglądarki za pomocą:

```ts
{
    browserName: 'chrome',  // lub 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę binarną do sterownika za pomocą:

```ts
{
    browserName: 'chrome', // lub 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Podczas testowania w Firefox, WebdriverIO automatycznie pobierze żądaną wersję przeglądarki i sterownik na podstawie zdefiniowanego `browserVersion`, np.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // lub 'latest'
}
```

Jeśli chcesz przetestować ręcznie pobraną wersję, możesz podać ścieżkę binarną do przeglądarki za pomocą:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę binarną do sterownika za pomocą:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Podczas testowania w Microsoft Edge, upewnij się, że masz zainstalowaną na swoim urządzeniu żądaną wersję przeglądarki. Możesz wskazać WebdriverIO przeglądarkę do uruchomienia za pomocą:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO automatycznie pobierze odpowiednią wersję sterownika na podstawie zdefiniowanego `browserVersion`, np.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // lub '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę binarną do sterownika za pomocą:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Podczas testowania w Safari, upewnij się, że masz zainstalowany [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) na swoim urządzeniu. Możesz wskazać WebdriverIO tę wersję za pomocą:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Rozszerzenie niestandardowych możliwości

Jeśli chcesz zdefiniować własny zestaw możliwości, na przykład w celu przechowywania dowolnych danych do wykorzystania w testach dla tej konkretnej możliwości, możesz to zrobić np. ustawiając:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // niestandardowe konfiguracje
        }
    }]
}
```

Zaleca się przestrzeganie [protokołu W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) w odniesieniu do nazewnictwa możliwości, które wymaga znaku `:` (dwukropka), oznaczającego przestrzeń nazw specyficzną dla implementacji. W swoich testach możesz uzyskać dostęp do niestandardowej możliwości poprzez, np.:

```ts
browser.capabilities['custom:caps']
```

Aby zapewnić bezpieczeństwo typów, możesz rozszerzyć interfejs możliwości WebdriverIO poprzez:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```