---
id: capabilities
title: Zdolności
---

Zdolność (capability) to definicja dla zdalnego interfejsu. Pomaga WebdriverIO zrozumieć, w jakim środowisku przeglądarki lub urządzenia mobilnego chcesz uruchamiać swoje testy. Zdolności są mniej kluczowe podczas lokalnego rozwijania testów, ponieważ najczęściej uruchamiasz je na jednym zdalnym interfejsie, ale stają się ważniejsze podczas uruchamiania dużego zestawu testów integracyjnych w CI/CD.

:::info

Format obiektu zdolności jest dobrze zdefiniowany przez [specyfikację WebDriver](https://w3c.github.io/webdriver/#capabilities). Testrunner WebdriverIO zakończy się wcześnie niepowodzeniem, jeśli zdolności zdefiniowane przez użytkownika nie będą zgodne z tą specyfikacją.

:::

## Niestandardowe zdolności

Podczas gdy liczba ściśle zdefiniowanych zdolności jest bardzo niska, każdy może dostarczać i akceptować niestandardowe zdolności, które są specyficzne dla sterownika automatyzacji lub zdalnego interfejsu:

### Rozszerzenia zdolności specyficzne dla przeglądarki

- `goog:chromeOptions`: Rozszerzenia [Chromedriver](https://chromedriver.chromium.org/capabilities), stosowane tylko do testowania w Chrome
- `moz:firefoxOptions`: Rozszerzenia [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), stosowane tylko do testowania w Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) do określania środowiska podczas używania EdgeDriver do testowania Chromium Edge

### Rozszerzenia zdolności dostawców usług w chmurze

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- i wiele innych...

### Rozszerzenia zdolności silnika automatyzacji

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- i wiele innych...

### Zdolności WebdriverIO do zarządzania opcjami sterownika przeglądarki

WebdriverIO zarządza instalacją i uruchamianiem sterownika przeglądarki za Ciebie. WebdriverIO używa niestandardowej zdolności, która pozwala na przekazanie parametrów do sterownika.

#### `wdio:chromedriverOptions`

Konkretne opcje przekazywane do Chromedriver podczas jego uruchamiania.

#### `wdio:geckodriverOptions`

Konkretne opcje przekazywane do Geckodriver podczas jego uruchamiania.

#### `wdio:edgedriverOptions`

Konkretne opcje przekazywane do Edgedriver podczas jego uruchamiania.

#### `wdio:safaridriverOptions`

Konkretne opcje przekazywane do Safari podczas jego uruchamiania.

#### `wdio:maxInstances`

Maksymalna liczba wszystkich równolegle działających pracowników dla określonej przeglądarki/zdolności. Ma pierwszeństwo przed [maxInstances](#configuration#maxInstances) i [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Określa specyfikacje dla wykonania testów dla tej przeglądarki/zdolności. Tak samo jak [zwykła opcja konfiguracyjna `specs`](configuration#specs), ale specyficzna dla przeglądarki/zdolności. Ma pierwszeństwo przed `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Wyklucza specyfikacje z wykonania testów dla tej przeglądarki/zdolności. Tak samo jak [zwykła opcja konfiguracyjna `exclude`](configuration#exclude), ale specyficzna dla przeglądarki/zdolności. Ma pierwszeństwo przed `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Domyślnie WebdriverIO próbuje ustanowić sesję WebDriver Bidi. Jeśli tego nie preferujesz, możesz ustawić tę flagę, aby wyłączyć to zachowanie.

Typ: `boolean`

#### Wspólne opcje sterownika

Podczas gdy wszystkie sterowniki oferują różne parametry konfiguracyjne, istnieją pewne wspólne, które WebdriverIO rozumie i używa do konfiguracji sterownika lub przeglądarki:

##### `cacheDir`

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog jest używany do przechowywania wszystkich sterowników, które są pobierane podczas próby rozpoczęcia sesji.

Typ: `string`<br />
Domyślnie: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Ścieżka do niestandardowego pliku binarnego sterownika. Jeśli ustawiona, WebdriverIO nie będzie próbować pobrać sterownika, ale użyje tego dostarczonego przez tę ścieżkę. Upewnij się, że sterownik jest kompatybilny z używaną przeglądarką.

Możesz podać tę ścieżkę za pomocą zmiennych środowiskowych `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` lub `EDGEDRIVER_PATH`.

Typ: `string`

:::caution

Jeśli `binary` sterownika jest ustawione, WebdriverIO nie będzie próbować pobrać sterownika, ale użyje tego dostarczonego przez tę ścieżkę. Upewnij się, że sterownik jest kompatybilny z używaną przeglądarką.

:::

#### Opcje sterownika specyficzne dla przeglądarki

Aby przekazać opcje do sterownika, możesz użyć następujących niestandardowych zdolności:

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
Zapisz dziennik serwera do pliku zamiast do stderr, zwiększa poziom logowania do `INFO`

Typ: `string`

##### logLevel
Ustaw poziom logowania. Możliwe opcje `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Loguj szczegółowo (odpowiednik `--log-level=ALL`)

Typ: `boolean`

##### silent
Nie loguj niczego (odpowiednik `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Dołącz do pliku dziennika zamiast ponownego zapisywania.

Typ: `boolean`

##### replayable
Loguj szczegółowo i nie obcinaj długich ciągów, aby można było odtworzyć dziennik (eksperymentalne).

Typ: `boolean`

##### readableTimestamp
Dodaj czytelne znaczniki czasu do dziennika.

Typ: `boolean`

##### enableChromeLogs
Pokazuj dzienniki z przeglądarki (nadpisuje inne opcje logowania).

Typ: `boolean`

##### bidiMapperPath
Niestandardowa ścieżka mappera bidi.

Typ: `string`

##### allowedIps
Oddzielona przecinkami lista dozwolonych zdalnych adresów IP, które mogą łączyć się z EdgeDriver.

Typ: `string[]`<br />
Domyślnie: `['']`

##### allowedOrigins
Oddzielona przecinkami lista dozwolonych źródeł żądań, które mogą łączyć się z EdgeDriver. Używanie `*` do zezwolenia na dowolne źródło hosta jest niebezpieczne!

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

## Specjalne zdolności dla konkretnych przypadków użycia

To jest lista przykładów pokazujących, jakie zdolności należy zastosować, aby osiągnąć określony przypadek użycia.

### Uruchamianie przeglądarki w trybie headless

Uruchamianie przeglądarki w trybie headless oznacza uruchamianie instancji przeglądarki bez okna lub interfejsu użytkownika. Jest to głównie używane w środowiskach CI/CD, gdzie nie używa się wyświetlacza. Aby uruchomić przeglądarkę w trybie headless, zastosuj następujące zdolności:

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
    browserName: 'chrome',   // or 'chromium'
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

### Automatyzacja różnych kanałów przeglądarki

Jeśli chcesz testować wersję przeglądarki, która nie została jeszcze wydana jako stabilna, np. Chrome Canary, możesz to zrobić, ustawiając zdolności i wskazując przeglądarkę, którą chcesz uruchomić, np.:

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

Podczas testowania na Chrome, WebdriverIO automatycznie pobierze żądaną wersję przeglądarki i sterownika na podstawie zdefiniowanego `browserVersion`, np.:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

Jeśli chcesz przetestować ręcznie pobraną przeglądarkę, możesz podać ścieżkę binarną do przeglądarki za pomocą:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę binarną do sterownika za pomocą:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Podczas testowania na Firefox, WebdriverIO automatycznie pobierze żądaną wersję przeglądarki i sterownika na podstawie zdefiniowanego `browserVersion`, np.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
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

Podczas testowania na Microsoft Edge, upewnij się, że masz zainstalowaną pożądaną wersję przeglądarki na swoim komputerze. Możesz wskazać WebdriverIO przeglądarkę do wykonania za pomocą:

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
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
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

Podczas testowania na Safari, upewnij się, że masz zainstalowany [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) na swoim komputerze. Możesz wskazać WebdriverIO tę wersję za pomocą:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Rozszerzanie niestandardowych zdolności

Jeśli chcesz zdefiniować własny zestaw zdolności, aby np. przechowywać dowolne dane do wykorzystania w testach dla tej konkretnej zdolności, możesz to zrobić, np. ustawiając:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

Zaleca się postępowanie zgodnie z [protokołem W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) dotyczącym nazewnictwa zdolności, które wymaga znaku `:` (dwukropek), oznaczającego przestrzeń nazw specyficzną dla implementacji. W swoich testach możesz uzyskać dostęp do niestandardowej zdolności za pomocą, np.:

```ts
browser.capabilities['custom:caps']
```

Aby zapewnić bezpieczeństwo typów, możesz rozszerzyć interfejs zdolności WebdriverIO za pomocą:

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