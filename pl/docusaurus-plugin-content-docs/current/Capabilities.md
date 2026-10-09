---
id: capabilities
title: Capabilities
description: "Zdefiniuj capabilities, aby wybrać środowisko przeglądarki lub urządzenia mobilnego, w którym uruchamiane są Twoje testy, w tym niestandardowe capabilities dostawców i specjalne przypadki użycia."
---

Capability to definicja zdalnego interfejsu. Pomaga WebdriverIO zrozumieć, w jakiej przeglądarce lub w jakim środowisku mobilnym chcesz uruchamiać swoje testy. Capabilities są mniej istotne podczas lokalnego tworzenia testów, ponieważ przez większość czasu uruchamiasz je na jednym zdalnym interfejsie, ale stają się ważniejsze przy uruchamianiu dużego zestawu testów integracyjnych w CI/CD.

:::info

Format obiektu capability jest dobrze zdefiniowany przez [specyfikację WebDriver](https://w3c.github.io/webdriver/#capabilities). Testrunner WebdriverIO zakończy działanie na wczesnym etapie, jeśli capabilities zdefiniowane przez użytkownika nie są zgodne z tą specyfikacją.

:::

## Niestandardowe capabilities

Chociaż liczba ściśle zdefiniowanych capabilities jest bardzo mała, każdy może dostarczać i akceptować niestandardowe capabilities, które są specyficzne dla danego sterownika automatyzacji lub zdalnego interfejsu:

### Rozszerzenia capabilities specyficzne dla przeglądarek

- `goog:chromeOptions`: rozszerzenia [Chromedriver](https://chromedriver.chromium.org/capabilities), mające zastosowanie wyłącznie podczas testowania w Chrome
- `moz:firefoxOptions`: rozszerzenia [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), mające zastosowanie wyłącznie podczas testowania w Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) do określania środowiska podczas korzystania z EdgeDriver przy testowaniu Chromium Edge

### Rozszerzenia capabilities dostawców chmurowych

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- i wiele innych...

### Rozszerzenia capabilities silników automatyzacji

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- i wiele innych...

### Capabilities WebdriverIO do zarządzania opcjami sterownika przeglądarki

WebdriverIO zarządza za Ciebie instalacją i uruchamianiem sterownika przeglądarki. WebdriverIO używa niestandardowej capability, która pozwala przekazywać parametry do sterownika.

#### `wdio:chromedriverOptions`

Specyficzne opcje przekazywane do Chromedriver podczas jego uruchamiania.

#### `wdio:geckodriverOptions`

Specyficzne opcje przekazywane do Geckodriver podczas jego uruchamiania.

#### `wdio:edgedriverOptions`

Specyficzne opcje przekazywane do Edgedriver podczas jego uruchamiania.

#### `wdio:safaridriverOptions`

Specyficzne opcje przekazywane do Safari podczas jego uruchamiania.

#### `wdio:maxInstances`

<Option type="number">

Maksymalna łączna liczba równolegle działających workerów dla danej przeglądarki/capability. Ma pierwszeństwo przed [maxInstances](#configuration#maxInstances) i [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Definiuje pliki specs do wykonania testów dla danej przeglądarki/capability. Działa tak samo jak [zwykła opcja konfiguracyjna `specs`](configuration#specs), ale jest specyficzna dla danej przeglądarki/capability. Ma pierwszeństwo przed `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Wyklucza pliki specs z wykonywania testów dla danej przeglądarki/capability. Działa tak samo jak [zwykła opcja konfiguracyjna `exclude`](configuration#exclude), ale jest specyficzna dla danej przeglądarki/capability. Wykluczenie następuje po zastosowaniu globalnej opcji konfiguracyjnej `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Domyślnie WebdriverIO próbuje nawiązać sesję WebDriver Bidi. Jeśli tego nie chcesz, możesz ustawić tę flagę, aby wyłączyć to zachowanie.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Pobiera Chromedriver dołączony do tego wydania Electrona zamiast tego z Chrome for Testing, w celu testowania aplikacji Electron ustawionej jako `goog:chromeOptions.binary`. Jeśli ustawiono również `browserVersion`, WebdriverIO użyje zamiast tego Chromedriver dla tej wersji, gdy nie można pobrać wydania Electrona lub gdy ustawiono `CHROMEDRIVER_CDNURL`. Wersje nightly pochodzą z [electron/nightlies](https://github.com/electron/nightlies/releases). Usługa Electron ustawia tę wartość za Ciebie na podstawie wersji Electrona używanej przez aplikację.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // sesja BiDi zastępuje okno aplikacji przez `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Wspólne opcje sterowników

Chociaż wszystkie sterowniki oferują różne parametry konfiguracyjne, istnieje kilka wspólnych, które WebdriverIO rozumie i wykorzystuje do konfiguracji sterownika lub przeglądarki:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog służy do przechowywania wszystkich sterowników pobieranych podczas próby rozpoczęcia sesji.

</Option>

##### `binary`

<Option type="string">

Ścieżka do niestandardowego pliku binarnego sterownika. Jeśli jest ustawiona, WebdriverIO nie będzie próbował pobierać sterownika, lecz użyje tego wskazanego tą ścieżką. Upewnij się, że sterownik jest kompatybilny z używaną przeglądarką.

Możesz podać tę ścieżkę za pomocą zmiennych środowiskowych `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` lub `EDGEDRIVER_PATH`.

</Option>
:::caution

Jeśli ustawiono `binary` sterownika, WebdriverIO nie będzie próbował pobierać sterownika, lecz użyje tego wskazanego tą ścieżką. Upewnij się, że sterownik jest kompatybilny z używaną przeglądarką.

:::

#### Niestandardowy host pobierania sterowników

Jeśli publiczne CDN-y sterowników nie są osiągalne z Twojego środowiska, np. ponieważ uruchamiasz testy za firmowym proxy lub utrzymujesz kopie lustrzane sterowników w wewnętrznym rejestrze artefaktów, możesz skierować pobieranie na niestandardowy host za pomocą następujących zmiennych środowiskowych:

- Chrome: `CHROMEDRIVER_CDNURL`, domyślnie `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, domyślnie `https://msedgedriver.microsoft.com`

Oczekuje się, że serwer lustrzany udostępnia archiwa sterowników pod tymi samymi ścieżkami co oryginalny CDN, np. dla Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

co rozwiązuje adres sterownika do `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, gdzie `<platform>` to jedna z wartości `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` lub `win64`, np. `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Środowiska w pełni offline

Te zmienne przekierowują wyłącznie pobieranie sterownika. Aby WebdriverIO w ogóle nie łączył się z publicznym internetem, muszą zostać spełnione jeszcze cztery warunki:

- **Przeglądarka musi być dostępna lokalnie.** Jeśli WebdriverIO nie znajdzie zainstalowanego Chrome lub Firefox, pobierze również przeglądarkę, a to pobieranie nie uwzględnia tych zmiennych. Zainstaluj przeglądarkę na maszynie lub wskaż ją WebdriverIO za pomocą `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Używaj pełnego numeru wersji.** Jeśli pominięto `browserVersion`, WebdriverIO odczytuje dokładną wersję z lokalnej przeglądarki i wyszukiwanie wersji nie jest potrzebne. Jeśli ją ustawiasz, użyj pełnej, czteroczęściowej wersji, np. `140.0.7339.207`. Kanał wydania (`stable`), kamień milowy (`140`) lub niepełna wersja (`140.0.7339`) wymagają wyszukania wersji w publicznym endpoincie Google, którego nie można przekierować.
- **Chromedriver musi pochodzić z Chrome for Testing.** Dla Chrome starszego niż `153.0.8001.0` na Linux ARM64 oraz przy użyciu `wdio:electronVersion` bez `browserVersion` Chromedriver jest pobierany z wydań Electrona na GitHubie, których te zmienne nie przekierowują.
- **Upewnij się, że serwer lustrzany rzeczywiście zawiera potrzebną wersję.** Jeśli sterownika nie można pobrać z Twojego hosta — ponieważ dana wersja nie jest dostępna w kopii lustrzanej, ale równie dobrze dlatego, że adres URL jest błędny lub dane uwierzytelniające zostały odrzucone — WebdriverIO zapisuje ostrzeżenie w logach, a następnie wyszukuje najbliższą znaną działającą wersję, co ponownie odpytuje publiczny endpoint. Jeśli uruchomienie niespodziewanie łączy się z internetem lub wybiera wersję, o którą nie prosiłeś, sprawdź w ostrzeżeniu, z jakim hostem próbowano się połączyć.

:::

#### Opcje sterowników specyficzne dla przeglądarek

Aby przekazać opcje do sterownika, możesz użyć następujących niestandardowych capabilities:

- Chrome lub Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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

<Option type="number">

Port, na którym powinien działać sterownik ADB.

Przykład: `9515`

</Option>

##### urlBase

<Option type="string">

Prefiks bazowej ścieżki URL dla komend, np. `wd/url`.

Przykład: `/`

</Option>

##### logPath

<Option type="string">

Zapisuje log serwera do pliku zamiast do stderr, zwiększa poziom logowania do `INFO`

</Option>

##### logLevel

<Option type="string">

Ustawia poziom logowania. Możliwe opcje: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Szczegółowe logowanie (odpowiednik `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Brak logowania (odpowiednik `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Dopisuje do pliku logu zamiast go nadpisywać.

</Option>

##### replayable

<Option type="boolean">

Szczegółowe logowanie bez skracania długich ciągów znaków, dzięki czemu log można odtworzyć (eksperymentalne).

</Option>

##### readableTimestamp

<Option type="boolean">

Dodaje czytelne znaczniki czasu do logu.

</Option>

##### enableChromeLogs

<Option type="boolean">

Wyświetla logi z przeglądarki (nadpisuje inne opcje logowania).

</Option>

##### bidiMapperPath

<Option type="string">

Niestandardowa ścieżka do bidi mappera.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Rozdzielona przecinkami lista dozwolonych zdalnych adresów IP, które mogą łączyć się z EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Rozdzielona przecinkami lista dozwolonych źródeł żądań (origins), które mogą łączyć się z EdgeDriver. Używanie `*` w celu zezwolenia na dowolne źródło jest niebezpieczne!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Opcje przekazywane do procesu sterownika.

</Option>
</TabItem>
<TabItem value="firefox">

Wszystkie opcje Geckodriver znajdziesz w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Wszystkie opcje Edgedriver znajdziesz w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Wszystkie opcje Safaridriver znajdziesz w oficjalnym [pakiecie sterownika](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Specjalne capabilities dla określonych przypadków użycia

Oto lista przykładów pokazujących, jakie capabilities należy zastosować, aby osiągnąć określony przypadek użycia.

### Uruchamianie przeglądarki w trybie headless

Uruchomienie przeglądarki w trybie headless oznacza uruchomienie instancji przeglądarki bez okna i interfejsu użytkownika. Jest to używane głównie w środowiskach CI/CD, w których nie ma wyświetlacza. Aby uruchomić przeglądarkę w trybie headless, zastosuj następujące capabilities:

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

Jeśli chcesz przetestować wersję przeglądarki, która nie została jeszcze wydana jako stabilna, np. Chrome Canary, możesz to zrobić, ustawiając capabilities i wskazując przeglądarkę, którą chcesz uruchomić, np.:

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

Podczas testowania w Chrome WebdriverIO automatycznie pobierze za Ciebie żądaną wersję przeglądarki i sterownika na podstawie zdefiniowanej wartości `browserVersion`, np.:

```ts
{
    browserName: 'chrome', // lub 'chromium'
    browserVersion: '116' // lub '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' lub 'latest' (to samo co 'canary')
}
```

Jeśli chcesz przetestować ręcznie pobraną przeglądarkę, możesz podać ścieżkę do jej pliku binarnego za pomocą:

```ts
{
    browserName: 'chrome',  // lub 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę do jego pliku binarnego za pomocą:

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

Podczas testowania w Firefox WebdriverIO automatycznie pobierze za Ciebie żądaną wersję przeglądarki i sterownika na podstawie zdefiniowanej wartości `browserVersion`, np.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // lub 'latest'
}
```

Jeśli chcesz przetestować ręcznie pobraną wersję, możesz podać ścieżkę do pliku binarnego przeglądarki za pomocą:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę do jego pliku binarnego za pomocą:

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

Podczas testowania w Microsoft Edge upewnij się, że masz zainstalowaną na swojej maszynie żądaną wersję przeglądarki. Możesz wskazać WebdriverIO przeglądarkę do uruchomienia za pomocą:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO automatycznie pobierze za Ciebie żądaną wersję sterownika na podstawie zdefiniowanej wartości `browserVersion`, np.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // lub '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Dodatkowo, jeśli chcesz użyć ręcznie pobranego sterownika, możesz podać ścieżkę do jego pliku binarnego za pomocą:

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

Podczas testowania w Safari upewnij się, że masz zainstalowaną na swojej maszynie [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/). Możesz wskazać WebdriverIO tę wersję za pomocą:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Rozszerzanie niestandardowych capabilities

Jeśli chcesz zdefiniować własny zestaw capabilities, aby np. przechowywać dowolne dane do wykorzystania w testach dla danej capability, możesz to zrobić, ustawiając np.:

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

Zaleca się przestrzeganie [protokołu W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) w zakresie nazewnictwa capabilities, który wymaga znaku `:` (dwukropka) oznaczającego przestrzeń nazw specyficzną dla implementacji. W swoich testach możesz uzyskać dostęp do niestandardowej capability np. poprzez:

```ts
browser.capabilities['custom:caps']
```

Aby zapewnić bezpieczeństwo typów, możesz rozszerzyć interfejs capabilities WebdriverIO za pomocą:

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