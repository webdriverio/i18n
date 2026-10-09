---
id: configuration
title: Konfiguracja
description: "Sprawdź wszystkie opcje konfiguracyjne dla WebDriver, samodzielnego WebdriverIO oraz testrunnera WDIO, w tym wszystkie hooki testrunnera."
---

W zależności od [typu konfiguracji](/docs/setuptypes) (np. korzystanie z surowych powiązań protokołu, WebdriverIO jako samodzielnego pakietu lub testrunnera WDIO) dostępny jest inny zestaw opcji do sterowania środowiskiem.

## Opcje WebDriver

Następujące opcje są zdefiniowane podczas korzystania z pakietu protokołu [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Protokół używany do komunikacji z serwerem sterownika.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host Twojego serwera sterownika.

</Option>

### port

<Option type="Number" default="undefined">

Port, na którym działa Twój serwer sterownika.

</Option>

### path

<Option type="String" default="/">

Ścieżka do punktu końcowego serwera sterownika.

</Option>

### queryParams

<Option type="Object" default="undefined">

Parametry zapytania przekazywane do serwera sterownika.

</Option>

### user

<Option type="String" default="undefined">

Nazwa użytkownika Twojej usługi chmurowej (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [TestMu AI](https://www.testmuai.com/)). Jeśli jest ustawiona, WebdriverIO automatycznie ustawi za Ciebie opcje połączenia. Jeśli nie korzystasz z dostawcy chmurowego, możesz jej użyć do uwierzytelnienia w dowolnym innym backendzie WebDriver.

</Option>

### key

<Option type="String" default="undefined">

Klucz dostępu lub klucz tajny Twojej usługi chmurowej (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [TestMu AI](https://www.testmuai.com/)). Jeśli jest ustawiony, WebdriverIO automatycznie ustawi za Ciebie opcje połączenia. Jeśli nie korzystasz z dostawcy chmurowego, możesz go użyć do uwierzytelnienia w dowolnym innym backendzie WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Definiuje capabilities, które chcesz uruchomić w swojej sesji WebDriver. Więcej szczegółów znajdziesz w [protokole WebDriver](https://w3c.github.io/webdriver/#capabilities).

Oprócz capabilities opartych na WebDriver możesz zastosować opcje specyficzne dla przeglądarki i dostawcy, które pozwalają na głębszą konfigurację zdalnej przeglądarki lub urządzenia. Są one opisane w dokumentacji odpowiednich dostawców, np.:

- `goog:chromeOptions`: dla [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: dla [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: dla [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: dla [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: dla [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: dla [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dodatkowo przydatnym narzędziem jest [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) od Sauce Labs, który pomaga utworzyć ten obiekt poprzez wyklikanie żądanych capabilities.

</Option>
**Przykład:**

```js
{
    browserName: 'chrome', // opcje: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // wersja przeglądarki
    platformName: 'Windows 10' // platforma systemu operacyjnego
}
```

Jeśli uruchamiasz testy webowe lub natywne na urządzeniach mobilnych, `capabilities` różnią się od protokołu WebDriver. Więcej szczegółów znajdziesz w [dokumentacji Appium](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Poziom szczegółowości logowania.

</Option>

### outputDir

<Option type="String" default="null">

Katalog do przechowywania wszystkich plików logów testrunnera (w tym logów reporterów i logów `wdio`). Jeśli nie jest ustawiony, wszystkie logi są przesyłane strumieniowo do `stdout`. Ponieważ większość reporterów jest przystosowana do logowania do `stdout`, zaleca się używanie tej opcji tylko dla określonych reporterów, w przypadku których bardziej sensowne jest zapisywanie raportu do pliku (jak na przykład reporter `junit`).

Podczas działania w trybie samodzielnym jedynym logiem generowanym przez WebdriverIO będzie log `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Limit czasu dla dowolnego żądania WebDriver do sterownika lub gridu.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Maksymalna liczba ponownych prób żądań do serwera Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Limit czasu (w ms) na otrzymanie odpowiedzi z przeglądarki na polecenie WebDriver Bidi. Zwiększ tę wartość, jeśli uruchamiasz polecenia, np. [`execute`](/docs/api/browser/execute), których rozwiązanie w uzasadniony sposób trwa dłużej niż domyślnie — w przeciwnym razie WebdriverIO przestanie czekać, zanim przeglądarka zakończy działanie.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Pozwala na użycie niestandardowego [agenta](https://www.npmjs.com/package/got#agent)` http`/`https`/`http2` do wykonywania żądań.

</Option>

### headers

<Option type="Object" default={`{}`}>

Określ niestandardowe `headers`, które mają być przekazywane w każdym żądaniu WebDriver. Jeśli Twój Selenium Grid wymaga uwierzytelniania Basic, zalecamy przekazanie nagłówka `Authorization` za pomocą tej opcji, aby uwierzytelnić żądania WebDriver, np.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Odczytaj nazwę użytkownika i hasło ze zmiennych środowiskowych
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Połącz nazwę użytkownika i hasło, rozdzielając je dwukropkiem
const credentials = `${username}:${password}`;
// Zakoduj dane uwierzytelniające za pomocą Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Funkcja przechwytująca [opcje żądania HTTP](https://github.com/sindresorhus/got#options) przed wykonaniem żądania WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Funkcja przechwytująca obiekty odpowiedzi HTTP po nadejściu odpowiedzi WebDriver. Funkcja otrzymuje oryginalny obiekt odpowiedzi jako pierwszy argument i odpowiadające mu `RequestOptions` jako drugi argument.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Określa, czy certyfikat SSL nie musi być ważny.
Można to ustawić za pomocą zmiennych środowiskowych `STRICT_SSL` lub `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Określa, czy włączyć [funkcję bezpośredniego połączenia Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Nie ma żadnego efektu, jeśli odpowiedź nie zawierała odpowiednich kluczy, mimo że flaga jest włączona.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog służy do przechowywania wszystkich sterowników pobieranych podczas próby uruchomienia sesji.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Dla bezpieczniejszego logowania wyrażenia regularne ustawione w `maskingPatterns` mogą ukrywać wrażliwe informacje w logach.
 - Format ciągu znaków to wyrażenie regularne z flagami lub bez nich (np. `/.../i`), a wiele wyrażeń regularnych oddziela się przecinkami.
 - Więcej szczegółów na temat wzorców maskowania znajdziesz w [sekcji Masking Patterns w README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Przykład:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Następujące opcje (w tym wymienione powyżej) mogą być używane z WebdriverIO w trybie samodzielnym:

### automationProtocol

<Option type="String" default="webdriver">

Określ protokół, którego chcesz używać do automatyzacji przeglądarki. Obecnie obsługiwany jest tylko [`webdriver`](https://www.npmjs.com/package/webdriver), ponieważ jest to główna technologia automatyzacji przeglądarki używana przez WebdriverIO.

Jeśli chcesz automatyzować przeglądarkę przy użyciu innej technologii automatyzacji, ustaw tę właściwość na ścieżkę wskazującą na moduł zgodny z następującym interfejsem:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Uruchom sesję automatyzacji i zwróć [monadę](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * z odpowiednimi poleceniami automatyzacji. Zobacz pakiet [webdriver](https://www.npmjs.com/package/webdriver)
     * jako implementację referencyjną
     *
     * @param {Capabilities.RemoteConfig} options opcje WebdriverIO
     * @param {Function} hook pozwalający zmodyfikować klienta, zanim zostanie zwrócony z funkcji
     * @param {PropertyDescriptorMap} userPrototype pozwala użytkownikowi dodawać niestandardowe polecenia protokołu
     * @param {Function} customCommandWrapper pozwala modyfikować wykonywanie poleceń
     * @returns instancja klienta zgodna z WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * pozwala użytkownikowi podłączyć się do istniejących sesji
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Zmienia identyfikator sesji instancji i capabilities przeglądarki dla nowej sesji
     * bezpośrednio w przekazanym obiekcie przeglądarki
     *
     * @optional
     * @param   {object} instance  obiekt otrzymany z nowej sesji przeglądarki.
     * @returns {string}           nowy identyfikator sesji przeglądarki
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Skróć wywołania polecenia `url`, ustawiając bazowy URL.
- Jeśli Twój parametr `url` zaczyna się od `/`, wówczas `baseUrl` jest dodawany na początku (z wyjątkiem ścieżki `baseUrl`, jeśli ją posiada).
- Jeśli Twój parametr `url` nie zaczyna się od schematu ani od `/` (np. `some/path`), wówczas pełny `baseUrl` jest dodawany bezpośrednio na początku.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Domyślny limit czasu dla wszystkich poleceń `waitFor*`. (Zwróć uwagę na małą literę `f` w nazwie opcji). Ten limit czasu wpływa __tylko__ na polecenia zaczynające się od `waitFor*` i ich domyślny czas oczekiwania.

Aby zwiększyć limit czasu dla _testu_, zapoznaj się z dokumentacją frameworka.

</Option>

### waitforInterval

<Option type="Number" default="100">

Domyślny interwał, w jakim wszystkie polecenia `waitFor*` sprawdzają, czy oczekiwany stan (np. widoczność) uległ zmianie.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Sprawia, że polecenie [`$`](/docs/api/browser/$) zgłasza `StrictSelectorError`, gdy podany selektor wskazuje na więcej niż jeden element, zamiast po cichu używać pierwszego dopasowania. Nie dotyczy to `$$`.

Możesz zrezygnować z tego zachowania dla pojedynczego zapytania, przekazując `{ strict: false }` jako drugi argument, np. `$('button', { strict: false })`.

Szczegóły znajdziesz w przewodniku [Selektory](/docs/selectors#strict-mode).

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Maksymalny rozmiar treści odpowiedzi (w bajtach), która może zostać zwrócona podczas używania polecenia [`mock`](/docs/api/browser/mock). Użyj `0`, aby wyłączyć zbieranie danych szpiegowanego ładunku.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Jeśli uruchamiasz testy w Sauce Labs, możesz wybrać uruchamianie testów w różnych centrach danych.
Użyj krótkich oznaczeń regionów `us` (domyślnie, odpowiada `us-west-1`) lub `eu` (odpowiada `eu-central-1`) albo bezpośrednio pełnych nazw regionów.

__Uwaga:__ Ma to wpływ tylko wtedy, gdy podasz opcje `user` i `key` powiązane z Twoim kontem Sauce Labs.

</Option>
*(tylko dla maszyn wirtualnych i/lub emulatorów/symulatorów, z wyjątkiem `us-east-4` i `asia-south-2`, które obsługują wyłącznie prawdziwe urządzenia)*

## Opcje testrunnera

Następujące opcje (w tym wymienione powyżej) są zdefiniowane tylko dla uruchamiania WebdriverIO z testrunnerem WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

Zdefiniuj specyfikacje (specs) do wykonania testów. Możesz określić wzorzec glob, aby dopasować wiele plików naraz, albo opakować glob lub zestaw ścieżek w tablicę, aby uruchomić je w ramach jednego procesu workera. Wszystkie ścieżki są traktowane jako względne wobec ścieżki pliku konfiguracyjnego.

</Option>

### exclude

<Option type="String[]" default="[]">

Wyklucz specyfikacje z wykonywania testów. Wszystkie ścieżki są traktowane jako względne wobec ścieżki pliku konfiguracyjnego.

</Option>

### suites

<Option type="Object" default={`{}`}>

Obiekt opisujący różne zestawy testów (suites), które możesz następnie wskazać za pomocą opcji `--suite` w CLI `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

To samo co opisana powyżej sekcja `capabilities`, z tą różnicą, że można określić obiekt [multi-remote](/docs/multiremote) lub wiele sesji WebDriver w tablicy w celu równoległego wykonania.

Możesz zastosować te same capabilities specyficzne dla dostawcy i przeglądarki, co zdefiniowane [powyżej](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Maksymalna łączna liczba równolegle działających workerów.

__Uwaga:__ może to być liczba nawet tak wysoka jak `100`, gdy testy są wykonywane u zewnętrznych dostawców, takich jak maszyny Sauce Labs. Tam testy nie są uruchamiane na jednej maszynie, lecz na wielu maszynach wirtualnych. Jeśli testy mają być uruchamiane na lokalnej maszynie deweloperskiej, użyj rozsądniejszej liczby, takiej jak `3`, `4` lub `5`. Zasadniczo jest to liczba przeglądarek, które zostaną jednocześnie uruchomione i będą wykonywać Twoje testy w tym samym czasie, więc zależy ona od ilości pamięci RAM na Twojej maszynie oraz od tego, ile innych aplikacji na niej działa.

Możesz także zastosować `maxInstances` w swoich obiektach capabilities, używając capability `wdio:maxInstances`. Ograniczy to liczbę równoległych sesji dla tej konkretnej capability.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Maksymalna łączna liczba równolegle działających workerów na jedną capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Wstrzykuje globalne zmienne WebdriverIO (np. `browser`, `$` i `$$`) do środowiska globalnego.
Jeśli ustawisz ją na `false`, powinieneś importować je z `@wdio/globals`, np.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Uwaga: WebdriverIO nie obsługuje wstrzykiwania zmiennych globalnych specyficznych dla frameworka testowego.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Jeśli chcesz, aby przebieg testów zatrzymał się po określonej liczbie niepowodzeń testów, użyj `bail`.
(Domyślnie wynosi `0`, co oznacza uruchomienie wszystkich testów bez względu na wszystko). **Uwaga:** Test w tym kontekście to wszystkie testy w obrębie jednego pliku specyfikacji (przy użyciu Mocha lub Jasmine) lub wszystkie kroki w obrębie pliku feature (przy użyciu Cucumber). Jeśli chcesz kontrolować zachowanie bail w obrębie testów pojedynczego pliku testowego, zapoznaj się z dostępnymi opcjami [frameworka](frameworks).

</Option>

### specFileRetries

<Option type="Number" default="0">

Liczba ponownych prób uruchomienia całego pliku specyfikacji, gdy zakończy się on niepowodzeniem jako całość.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Opóźnienie w sekundach między kolejnymi próbami ponownego uruchomienia pliku specyfikacji

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Określa, czy ponownie uruchamiane pliki specyfikacji mają być uruchamiane natychmiast, czy odkładane na koniec kolejki.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Wybierz widok wyjścia logów.

Jeśli ustawiono `false`, logi z różnych plików testowych będą wyświetlane w czasie rzeczywistym. Pamiętaj, że może to powodować mieszanie się wyjścia logów z różnych plików podczas równoległego uruchamiania.

Jeśli ustawiono `true`, wyjście logów będzie grupowane według specyfikacji testu (Test Spec) i wyświetlane dopiero po jej zakończeniu.

Domyślnie ustawiono `false`, więc logi są wyświetlane w czasie rzeczywistym.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Określa, czy WebdriverIO automatycznie weryfikuje wszystkie miękkie asercje (soft assertions) na końcu każdego testu. Gdy ustawiono `true`, wszystkie zgromadzone miękkie asercje zostaną automatycznie sprawdzone i spowodują niepowodzenie testu, jeśli którakolwiek asercja nie przeszła. Gdy ustawiono `false`, musisz ręcznie wywołać metodę assert, aby sprawdzić miękkie asercje.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Usługi (services) przejmują konkretne zadanie, którym nie chcesz się zajmować. Rozszerzają one Twoją konfigurację testów niemal bez wysiłku.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Określa framework testowy, który ma być używany przez testrunner WDIO.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Opcje specyficzne dla danego frameworka. Sprawdź w dokumentacji adaptera frameworka, które opcje są dostępne. Więcej na ten temat przeczytasz w sekcji [Frameworki](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Lista funkcjonalności (features) Cucumber z numerami linii (podczas [korzystania z frameworka Cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Lista reporterów do użycia. Reporter może być ciągiem znaków lub tablicą
`['reporterName', { /* reporter options */}]`, w której pierwszy element jest ciągiem znaków z nazwą reportera, a drugi element obiektem z opcjami reportera.

</Option>
Przykład:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

Określa, w jakim interwale reportery powinny sprawdzać, czy są zsynchronizowane, jeśli raportują swoje logi asynchronicznie (np. gdy logi są przesyłane strumieniowo do zewnętrznego dostawcy).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Określa maksymalny czas, jaki reportery mają na zakończenie przesyłania wszystkich swoich logów, zanim testrunner zgłosi błąd.

</Option>

### execArgv

<Option type="String[]" default="null">

Argumenty Node, które mają zostać przekazane podczas uruchamiania procesów potomnych.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Włącza profilowanie CPU dla procesu workera. Profil zostanie wygenerowany automatycznie po zakończeniu procesu workera.

</Option>

### heapProf

<Option type="Boolean" default="false">

Włącza profilowanie sterty (Heap) dla procesu workera. Zrzut zostanie wygenerowany automatycznie po zakończeniu procesu workera (używa próbkującego profilera sterty).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Katalog, w którym zostaną zapisane profile CPU (`.cpuprofile`) oraz profile sterty (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Lista wzorców tekstowych obsługujących glob, które informują testrunner, aby dodatkowo obserwował inne pliki, np. pliki aplikacji, podczas uruchamiania go z flagą `--watch`. Domyślnie testrunner obserwuje już wszystkie pliki specyfikacji.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Ustaw na true, jeśli chcesz zaktualizować swoje snapshoty. Najlepiej używać jako parametru CLI, np. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Nadpisuje domyślną ścieżkę snapshotów. Na przykład, aby przechowywać snapshoty obok plików testowych.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO używa `tsx` do kompilowania plików TypeScript. Twój plik TSConfig jest automatycznie wykrywany w bieżącym katalogu roboczym, ale możesz tutaj określić niestandardową ścieżkę lub ustawić zmienną środowiskową TSX_TSCONFIG_PATH.

Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Uruchamia wirtualny ekran na potrzeby przebiegu w systemie Linux, gdy nie jest ustawiona ani zmienna `DISPLAY`, ani `WAYLAND_DISPLAY`. Ustaw na `false`, gdy uruchamiasz testy w trybie headless lub wyłącznie w usłudze chmurowej albo zdalnym gridzie. Opcja ta kontroluje jedynie, czy uruchamiany jest serwer wyświetlania: gdy ustawiona jest tylko zmienna `WAYLAND_DISPLAY`, testrunner nadal ustawia `XDG_SESSION_TYPE`, `GDK_BACKEND` i `ELECTRON_OZONE_PLATFORM_HINT` na `wayland` na potrzeby przebiegu. Zobacz [Headless i serwery wyświetlania](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Który serwer wyświetlania uruchomić. `auto` próbuje uruchomić Weston, a w przypadku jego braku lub niepowodzenia uruchomienia przełącza się na Xvfb. `wayland` i `xvfb` próbują uruchomić tylko dany serwer.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Instaluje brakujący serwer wyświetlania za pomocą systemowego menedżera pakietów, gdy żaden z zainstalowanych się nie uruchamia.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Sposób działania wbudowanej instalacji: `root` instaluje tylko wtedy, gdy proces działa jako root, `sudo` używa nieinteraktywnego `sudo -n`, gdy proces nie działa jako root, lub instaluje bez niego, gdy `sudo` nie jest zainstalowane.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Polecenie uruchamiane zamiast wbudowanej instalacji, w niezmienionej postaci i bez `sudo`. Jest uruchamiane tylko przy `displayServerAutoInstall: true`. Ciąg znaków jest uruchamiany w powłoce, tablica — bez niej. Przy `auto` polecenie uruchamiane jest najpierw dla Westona, a ponownie dla Xvfb tylko wtedy, gdy Weston nadal jest niedostępny lub nie udaje się go uruchomić, a Xvfb wciąż brakuje. Ustaw `displayServer` na serwer, który instaluje to polecenie, aby pominąć próbę z drugim serwerem.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Szerokość ekranu wirtualnego wyświetlacza w pikselach.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Wysokość ekranu wirtualnego wyświetlacza w pikselach.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Głębia kolorów wirtualnego wyświetlacza. Tylko Xvfb.

</Option>

## Hooki

Testrunner WDIO pozwala ustawić hooki wywoływane w określonych momentach cyklu życia testu. Umożliwia to wykonywanie niestandardowych akcji (np. zrobienie zrzutu ekranu, jeśli test się nie powiedzie).

Każdy hook otrzymuje jako parametr określone informacje o cyklu życia (np. informacje o zestawie testów lub teście). Więcej o wszystkich właściwościach hooków przeczytasz w [naszej przykładowej konfiguracji](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Uwaga:** Niektóre hooki (`onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`) są wykonywane w innym procesie i dlatego nie mogą współdzielić żadnych danych globalnych z pozostałymi hookami działającymi w procesie workera.

### onPrepare

Wykonywany jednokrotnie przed uruchomieniem wszystkich workerów.

Parametry:

- `config` (`object`): obiekt konfiguracji WebdriverIO
- `param` (`object[]`): lista szczegółów capabilities

### onWorkerStart

Wykonywany przed utworzeniem procesu workera; może służyć do inicjalizacji określonej usługi dla tego workera, a także do asynchronicznej modyfikacji środowisk uruchomieniowych.

Parametry:

- `cid` (`string`): identyfikator capability (np. 0-0)
- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera
- `args` (`object`): obiekt, który zostanie scalony z główną konfiguracją po zainicjalizowaniu workera
- `execArgv` (`string[]`): lista argumentów tekstowych przekazanych do procesu workera

### onWorkerEnd

Wykonywany zaraz po zakończeniu procesu workera.

Parametry:

- `cid` (`string`): identyfikator capability (np. 0-0)
- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie. Worker zakończony przez sygnał zgłasza zamiast tego `128` + numer sygnału, np. `139` dla `SIGSEGV`
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera
- `retries` (`number`): liczba wykorzystanych ponownych prób na poziomie specyfikacji, zgodnie z opisem w [_"Dodawanie ponownych prób dla poszczególnych plików specyfikacji"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): sygnał, który zakończył workera, np. `SIGSEGV`, lub `null`, jeśli zakończył się on samodzielnie

### beforeSession

Wykonywany tuż przed zainicjalizowaniem sesji webdriver i frameworka testowego. Pozwala manipulować konfiguracją w zależności od capability lub specyfikacji.

Parametry:

- `config` (`object`): obiekt konfiguracji WebdriverIO
- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera

### before

Wykonywany przed rozpoczęciem wykonywania testów. W tym momencie masz dostęp do wszystkich zmiennych globalnych, takich jak `browser`. To idealne miejsce do definiowania niestandardowych poleceń.

Parametry:

- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera
- `browser` (`object`): instancja utworzonej sesji przeglądarki/urządzenia

### beforeSuite

Hook wykonywany przed rozpoczęciem zestawu testów (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu testów

### beforeHook

Hook wykonywany *przed* rozpoczęciem hooka w obrębie zestawu testów (np. uruchamia się przed wywołaniem beforeEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)

### afterHook

Hook wykonywany *po* zakończeniu hooka w obrębie zestawu testów (np. uruchamia się po wywołaniu afterEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funkcja wykonywana przed testem (tylko w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, w którym test został wykonany

### beforeCommand

Uruchamiany przed wykonaniem polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które otrzymałoby polecenie

### afterCommand

Uruchamiany po wykonaniu polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które otrzymałoby polecenie
- `result` (`*`): wynik polecenia
- `error` (`Error`): obiekt błędu, jeśli wystąpił

### afterTest

Funkcja wykonywana po zakończeniu testu (w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, w którym test został wykonany
- `result.error` (`Error`): obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
- `result.result` (`Any`): obiekt zwrócony przez funkcję testu
- `result.duration` (`Number`): czas trwania testu
- `result.passed` (`Boolean`): true, jeśli test zakończył się powodzeniem, w przeciwnym razie false
- `result.retries` (`Object`): informacje o ponownych próbach pojedynczego testu, zgodnie z definicją dla [Mocha i Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) oraz [Cucumber](./Retry.md#rerunning-in-cucumber), np. `{ attempts: 0, limit: 0 }`, zobacz
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook wykonywany po zakończeniu zestawu testów (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu testów

### after

Wykonywany po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych z testu.

Parametry:

- `result` (`number`): 0 - test zaliczony, 1 - test niezaliczony
- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera

### afterSession

Wykonywany zaraz po zakończeniu sesji webdriver.

Parametry:

- `config` (`object`): obiekt konfiguracji WebdriverIO
- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie workera

### onComplete

Wykonywany po zamknięciu wszystkich workerów, gdy proces ma się zakończyć. Błąd zgłoszony w hooku onComplete spowoduje niepowodzenie przebiegu testów.

Parametry:

- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `config` (`object`): obiekt konfiguracji WebdriverIO
- `caps` (`object`): zawiera capabilities dla sesji, która zostanie utworzona w workerze
- `result` (`object`): obiekt wyników zawierający wyniki testów

### onReload

Wykonywany, gdy następuje odświeżenie.

Parametry:

- `oldSessionId` (`string`): identyfikator starej sesji
- `newSessionId` (`string`): identyfikator nowej sesji

### beforeFeature

Uruchamiany przed funkcjonalnością (Feature) Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcjonalności Cucumber

### afterFeature

Uruchamiany po funkcjonalności (Feature) Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcjonalności Cucumber

### beforeScenario

Uruchamiany przed scenariuszem Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt world zawierający informacje o pickle i kroku testu
- `context` (`object`): obiekt World w Cucumber

### afterScenario

Uruchamiany po scenariuszu Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt world zawierający informacje o pickle i kroku testu
- `result` (`object`): obiekt wyników zawierający wyniki scenariusza
- `result.passed` (`boolean`): true, jeśli scenariusz zakończył się powodzeniem
- `result.error` (`string`): stos błędu, jeśli scenariusz się nie powiódł
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt World w Cucumber

### beforeStep

Uruchamiany przed krokiem Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `context` (`object`): obiekt World w Cucumber

### afterStep

Uruchamiany po kroku Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `result`: (`object`): obiekt wyników zawierający wyniki kroku
- `result.passed` (`boolean`): true, jeśli scenariusz zakończył się powodzeniem
- `result.error` (`string`): stos błędu, jeśli scenariusz się nie powiódł
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt World w Cucumber

### beforeAssertion

Hook wykonywany przed wykonaniem asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera wywołanego przez test (np. `toHaveTitle`). W przypadku aliasu jest to nazwa aliasu (np. `toBeExisting`, a nie `toExist`).
- `params.expectedValue`: wartość przekazana do matchera
- `params.options`: opcje asercji

### afterAssertion

Hook wykonywany po wykonaniu asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera wywołanego przez test (np. `toHaveTitle`). W przypadku aliasu jest to nazwa aliasu (np. `toBeExisting`, a nie `toExist`).
- `params.expectedValue`: wartość przekazana do matchera
- `params.options`: opcje asercji
- `params.result` (`object`): wynik matchera, zawierający `pass` (`boolean`) oraz `message()`. `pass` ma wartość `true`, gdy wartość odpowiada wartości oczekiwanej, również w przypadku `.not`: z `.not` asercja przechodzi, gdy `pass` ma wartość `false`.