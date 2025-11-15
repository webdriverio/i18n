---
id: configuration
title: Konfiguracja
---

W zależności od [typu konfiguracji](/docs/setuptypes) (np. używając surowych bindingów protokołu, WebdriverIO jako samodzielnego pakietu lub testera WDIO) dostępny jest różny zestaw opcji do kontrolowania środowiska.

## Opcje WebDriver

Następujące opcje są zdefiniowane podczas korzystania z pakietu protokołu [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protokół używany do komunikacji z serwerem sterownika.

Typ: `String`<br />
Domyślnie: `http`

### hostname

Host serwera sterownika.

Typ: `String`<br />
Domyślnie: `0.0.0.0`

### port

Port, na którym znajduje się serwer sterownika.

Typ: `Number`<br />
Domyślnie: `undefined`

### path

Ścieżka do punktu końcowego serwera sterownika.

Typ: `String`<br />
Domyślnie: `/`

### queryParams

Parametry zapytania, które są przekazywane do serwera sterownika.

Typ: `Object`<br />
Domyślnie: `undefined`

### user

Nazwa użytkownika usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli jest ustawiona, WebdriverIO automatycznie skonfiguruje opcje połączenia za Ciebie. Jeśli nie korzystasz z dostawcy usług w chmurze, możesz użyć tej opcji do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### key

Klucz dostępu lub tajny klucz usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli jest ustawiony, WebdriverIO automatycznie skonfiguruje opcje połączenia za Ciebie. Jeśli nie korzystasz z dostawcy usług w chmurze, możesz użyć tej opcji do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### capabilities

Definiuje możliwości, które chcesz uruchomić w swojej sesji WebDriver. Więcej szczegółów znajdziesz w [protokole WebDriver](https://w3c.github.io/webdriver/#capabilities). Jeśli używasz starszego sterownika, który nie obsługuje protokołu WebDriver, musisz użyć [możliwości JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), aby pomyślnie uruchomić sesję.

Oprócz możliwości opartych na WebDriver, możesz zastosować opcje specyficzne dla przeglądarki i dostawcy, które umożliwiają głębszą konfigurację zdalnej przeglądarki lub urządzenia. Są one udokumentowane w odpowiednich dokumentach dostawcy, np.:

- `goog:chromeOptions`: dla [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: dla [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: dla [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: dla [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: dla [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: dla [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dodatkowo, przydatnym narzędziem jest [Konfigurator Testów Automatycznych](https://docs.saucelabs.com/basics/platform-configurator/) od Sauce Labs, który pomaga utworzyć ten obiekt poprzez kliknięcie i zestawienie pożądanych możliwości.

Typ: `Object`<br />
Domyślnie: `null`

**Przykład:**

```js
{
    browserName: 'chrome', // opcje: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // wersja przeglądarki
    platformName: 'Windows 10' // platforma systemu operacyjnego
}
```

Jeśli uruchamiasz testy internetowe lub natywne na urządzeniach mobilnych, `capabilities` różni się od protokołu WebDriver. Więcej szczegółów można znaleźć w [dokumentacji Appium](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

Poziom szczegółowości logowania.

Typ: `String`<br />
Domyślnie: `info`<br />
Opcje: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Katalog do przechowywania wszystkich plików logów testera (w tym logów reporterów i logów `wdio`). Jeśli nie jest ustawiony, wszystkie logi są przekazywane do `stdout`. Ponieważ większość reporterów jest skonfigurowana do logowania do `stdout`, zaleca się używanie tej opcji tylko dla konkretnych reporterów, gdzie bardziej sensowne jest przesyłanie raportów do pliku (na przykład dla reportera `junit`).

W trybie samodzielnym jedynym logiem generowanym przez WebdriverIO będzie log `wdio`.

Typ: `String`<br />
Domyślnie: `null`

### connectionRetryTimeout

Limit czasu dla dowolnego żądania WebDriver do sterownika lub siatki.

Typ: `Number`<br />
Domyślnie: `120000`

### connectionRetryCount

Maksymalna liczba ponownych prób żądania do serwera Selenium.

Typ: `Number`<br />
Domyślnie: `3`

### agent

Umożliwia użycie niestandardowego agenta `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) do wykonywania żądań.

Typ: `Object`<br />
Domyślnie:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Określ niestandardowe `nagłówki` do przekazania w każdym żądaniu WebDriver. Jeśli Twoja siatka Selenium wymaga uwierzytelnienia Basic, zalecamy przekazanie nagłówka `Authorization` przez tę opcję, aby uwierzytelnić żądania WebDrivera, np.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Odczytaj nazwę użytkownika i hasło ze zmiennych środowiskowych
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Połącz nazwę użytkownika i hasło separatorem dwukropka
const credentials = `${username}:${password}`;
// Koduj poświadczenia używając Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Typ: `Object`<br />
Domyślnie: `{}`

### transformRequest

Funkcja przechwytująca [opcje żądania HTTP](https://github.com/sindresorhus/got#options) przed wykonaniem żądania WebDriver

Typ: `(RequestOptions) => RequestOptions`<br />
Domyślnie: *brak*

### transformResponse

Funkcja przechwytująca obiekty odpowiedzi HTTP po nadejściu odpowiedzi WebDriver. Funkcja otrzymuje oryginalny obiekt odpowiedzi jako pierwszy argument i odpowiednie `RequestOptions` jako drugi argument.

Typ: `(Response, RequestOptions) => Response`<br />
Domyślnie: *brak*

### strictSSL

Określa, czy wymaga się, aby certyfikat SSL był ważny.
Można ustawić za pomocą zmiennych środowiskowych `STRICT_SSL` lub `strict_ssl`.

Typ: `Boolean`<br />
Domyślnie: `true`

### enableDirectConnect

Czy włączyć [funkcję bezpośredniego połączenia Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Nie robi nic, jeśli odpowiedź nie zawierała odpowiednich kluczy, gdy flaga jest włączona.

Typ: `Boolean`<br />
Domyślnie: `true`

### cacheDir

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog jest używany do przechowywania wszystkich sterowników, które są pobierane podczas próby rozpoczęcia sesji.

Typ: `String`<br />
Domyślnie: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Dla bezpieczniejszego logowania, wyrażenia regularne ustawione za pomocą `maskingPatterns` mogą zaciemniać poufne informacje w logach.
 - Format ciągu to wyrażenie regularne z flagami lub bez nich (np. `/.../i`) i oddzielone przecinkami dla wielu wyrażeń regularnych.
 - Więcej szczegółów na temat masek wzorców znajdziesz w [sekcji Maski wzorców w pliku README loggera WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Typ: `String`<br />
Domyślnie: `undefined`

**Przykład:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Następujące opcje (w tym wymienione powyżej) można wykorzystać z WebdriverIO w trybie samodzielnym:

### automationProtocol

Zdefiniuj protokół, którego chcesz użyć do automatyzacji przeglądarki. Obecnie obsługiwany jest tylko [`webdriver`](https://www.npmjs.com/package/webdriver), ponieważ jest to główna technologia automatyzacji przeglądarki, z której korzysta WebdriverIO.

Jeśli chcesz zautomatyzować przeglądarkę za pomocą innej technologii automatyzacji, upewnij się, że ustawiłeś tę właściwość na ścieżkę, która rozwiązuje się do modułu zgodnego z następującym interfejsem:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Uruchom sesję automatyzacji i zwróć WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * z odpowiednimi poleceniami automatyzacji. Zobacz pakiet [webdriver](https://www.npmjs.com/package/webdriver)
     * jako przykładową implementację
     *
     * @param {Capabilities.RemoteConfig} options Opcje WebdriverIO
     * @param {Function} hook który pozwala modyfikować klienta przed zwolnieniem go z funkcji
     * @param {PropertyDescriptorMap} userPrototype pozwala użytkownikowi dodawać niestandardowe polecenia protokołu
     * @param {Function} customCommandWrapper pozwala modyfikować wykonanie polecenia
     * @returns instancję klienta zgodną z WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * pozwala użytkownikowi dołączyć do istniejących sesji
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Zmienia identyfikator sesji instancji i możliwości przeglądarki dla nowej sesji
     * bezpośrednio w przekazanym obiekcie przeglądarki
     *
     * @optional
     * @param   {object} instance  obiekt, który otrzymujemy z nowej sesji przeglądarki.
     * @returns {string}           nowy identyfikator sesji przeglądarki
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Typ: `String`<br />
Domyślnie: `webdriver`

### baseUrl

Skróć wywołania polecenia `url` ustawiając podstawowy URL.
- Jeśli parametr `url` zaczyna się od `/`, wtedy `baseUrl` jest dodawany na początku (z wyjątkiem ścieżki `baseUrl`, jeśli taką posiada).
- Jeśli parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), wtedy pełny `baseUrl` jest dodawany bezpośrednio na początku.

Typ: `String`<br />
Domyślnie: `null`

### waitforTimeout

Domyślny limit czasu dla wszystkich poleceń `waitFor*`. (Uwaga: mała litera `f` w nazwie opcji.) Ten limit czasu __tylko__ wpływa na polecenia zaczynające się od `waitFor*` i ich domyślny czas oczekiwania.

Aby zwiększyć limit czasu dla _testu_, zapoznaj się z dokumentacją frameworka.

Typ: `Number`<br />
Domyślnie: `5000`

### waitforInterval

Domyślny interwał dla wszystkich poleceń `waitFor*` do sprawdzania, czy oczekiwany stan (np. widoczność) został zmieniony.

Typ: `Number`<br />
Domyślnie: `100`

### region

Jeśli korzystasz z Sauce Labs, możesz wybrać uruchamianie testów między różnymi centrami danych: US lub EU.
Aby zmienić region na EU, dodaj `region: 'eu'` do swojej konfiguracji.

__Uwaga:__ Ma to wpływ tylko wtedy, gdy podasz opcje `user` i `key`, które są połączone z Twoim kontem Sauce Labs.

Typ: `String`<br />
Domyślnie: `us`

*(tylko dla vm i/lub em/symulatorów)*

---

## Opcje Testera

Następujące opcje (w tym wymienione powyżej) są zdefiniowane tylko dla uruchamiania WebdriverIO z testerem WDIO:

### specs

Określa specyfikacje do wykonania testów. Możesz podać wzorzec glob, aby dopasować wiele plików jednocześnie, lub opakować glob czy zestaw ścieżek w tablicę, aby uruchomić je w ramach jednego procesu roboczego. Wszystkie ścieżki są traktowane jako względne w stosunku do ścieżki pliku konfiguracyjnego.

Typ: `(String | String[])[]`<br />
Domyślnie: `[]`

### exclude

Wyklucza specyfikacje z wykonania testów. Wszystkie ścieżki są traktowane jako względne w stosunku do ścieżki pliku konfiguracyjnego.

Typ: `String[]`<br />
Domyślnie: `[]`

### suites

Obiekt opisujący różne zestawy, które można określić za pomocą opcji `--suite` w CLI `wdio`.

Typ: `Object`<br />
Domyślnie: `{}`

### capabilities

Tak samo jak sekcja `capabilities` opisana powyżej, z opcją określenia obiektu [`multiremote`](/docs/multiremote) lub wielu sesji WebDrivera w tablicy do równoległego wykonania.

Możesz zastosować te same możliwości specyficzne dla dostawcy i przeglądarki, jak zdefiniowano [powyżej](/docs/configuration#capabilities).

Typ: `Object`|`Object[]`<br />
Domyślnie: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maksymalna liczba wszystkich równoległych działających pracowników.

__Uwaga:__ może to być liczba tak wysoka jak `100`, gdy testy są wykonywane na maszynach zewnętrznych dostawców, takich jak Sauce Labs. Tam testy nie są testowane na pojedynczej maszynie, ale na wielu maszynach wirtualnych. Jeśli testy mają być uruchamiane na lokalnej maszynie deweloperskiej, użyj bardziej rozsądnej liczby, takiej jak `3`, `4` lub `5`. W istocie jest to liczba przeglądarek, które będą jednocześnie uruchamiane i wykonywać Twoje testy w tym samym czasie, więc zależy to od ilości pamięci RAM w Twojej maszynie i ilości innych aplikacji uruchomionych na Twojej maszynie.

Możesz również zastosować `maxInstances` w obiektach capability za pomocą capability `wdio:maxInstances`. Ograniczy to liczbę równoległych sesji dla tej konkretnej możliwości.

Typ: `Number`<br />
Domyślnie: `100`

### maxInstancesPerCapability

Maksymalna liczba wszystkich równoległych działających pracowników na capability.

Typ: `Number`<br />
Domyślnie: `100`

### injectGlobals

Wstawia globalne zmienne WebdriverIO (np. `browser`, `$` i `$$`) do globalnego środowiska.
Jeśli ustawisz na `false`, powinieneś zaimportować z `@wdio/globals`, np.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Uwaga: WebdriverIO nie obsługuje wstrzykiwania globalnych zmiennych specyficznych dla frameworka testowego.

Typ: `Boolean`<br />
Domyślnie: `true`

### bail

Jeśli chcesz, aby uruchomienie testu zatrzymało się po określonej liczbie niepowodzeń testów, użyj `bail`.
(Domyślnie jest to `0`, co oznacza wykonanie wszystkich testów bez względu na wyniki.) **Uwaga:** Test w tym kontekście to wszystkie testy w pojedynczym pliku spec (podczas korzystania z Mocha lub Jasmine) lub wszystkie kroki w pliku funkcji (podczas korzystania z Cucumber). Jeśli chcesz kontrolować zachowanie zatrzymywania wewnątrz testów w pojedynczym pliku testowym, zapoznaj się z dostępnymi opcjami [framework](frameworks).

Typ: `Number`<br />
Domyślnie: `0` (nie zatrzymuj; uruchom wszystkie testy)

### specFileRetries

Liczba ponownych prób całego pliku specyfikacji, gdy nie powiedzie się jako całość.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDelay

Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDeferred

Czy ponownie próbować uruchomić pliki specyfikacji natychmiast, czy odłożyć je na koniec kolejki.

Typ: `Boolean`<br />
Domyślnie: `true`

### groupLogsByTestSpec

Wybierz widok wyjścia logów.

Jeśli ustawiono na `false`, logi z różnych plików testowych będą drukowane w czasie rzeczywistym. Należy zauważyć, że może to prowadzić do mieszania się wyjść logów z różnych plików podczas równoległego uruchamiania.

Jeśli ustawiono na `true`, wyjścia logów będą grupowane według Specyfikacji Testowej i drukowane tylko po zakończeniu danej Specyfikacji Testowej.

Domyślnie jest ustawione na `false`, więc logi są drukowane w czasie rzeczywistym.

Typ: `Boolean`<br />
Domyślnie: `false`

### autoAssertOnTestEnd

Kontroluje, czy WebdriverIO automatycznie potwierdza wszystkie miękkie asercje na końcu każdego testu. Gdy ustawiono na `true`, wszystkie zgromadzone miękkie asercje zostaną automatycznie sprawdzone i spowodują niepowodzenie testu, jeśli jakakolwiek asercja nie powiodła się. Gdy ustawiono na `false`, musisz ręcznie wywołać metodę assert, aby sprawdzić miękkie asercje.

Typ: `Boolean`<br />
Domyślnie: `true`

### services

Usługi przejmują określone zadania, którymi nie chcesz się zajmować. Wzmacniają konfigurację testu przy minimalnym wysiłku.

Typ: `String[]|Object[]`<br />
Domyślnie: `[]`

### framework

Określa framework testowy, który ma być używany przez testera WDIO.

Typ: `String`<br />
Domyślnie: `mocha`<br />
Opcje: `mocha` | `jasmine`

### mochaOpts, jasmineOpts i cucumberOpts

Opcje specyficzne dla frameworka. Zobacz dokumentację adaptera frameworka, aby dowiedzieć się, jakie opcje są dostępne. Więcej informacji na ten temat znajdziesz w [Frameworki](frameworks).

Typ: `Object`<br />
Domyślnie: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista funkcji cucumber z numerami linii (podczas [używania frameworka cucumber](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Domyślnie: `[]`

### reporters

Lista reporterów do użycia. Reporter może być ciągiem znaków lub tablicą
`['nazwaReportera', { /* opcje reportera */}]`, gdzie pierwszy element to ciąg znaków z nazwą reportera, a drugi element to obiekt z opcjami reportera.

Typ: `String[]|Object[]`<br />
Domyślnie: `[]`

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

Określa, w jakim interwale reporter powinien sprawdzać, czy są zsynchronizowane, jeśli raportują swoje logi asynchronicznie (np. jeśli logi są przesyłane do zewnętrznego dostawcy).

Typ: `Number`<br />
Domyślnie: `100` (ms)

### reporterSyncTimeout

Określa maksymalny czas, w którym reportery mają zakończyć przesyłanie wszystkich swoich logów, zanim zostanie zgłoszony błąd przez testera.

Typ: `Number`<br />
Domyślnie: `5000` (ms)

### execArgv

Argumenty Node do określenia podczas uruchamiania procesów potomnych.

Typ: `String[]`<br />
Domyślnie: `null`

### filesToWatch

Lista wzorców ciągów znaków wspierających glob, które informują testera, aby dodatkowo obserwował inne pliki, np. pliki aplikacji, podczas uruchamiania z flagą `--watch`. Domyślnie tester już obserwuje wszystkie pliki specyfikacji.

Typ: `String[]`<br />
Domyślnie: `[]`

### updateSnapshots

Ustaw na true, jeśli chcesz zaktualizować swoje snapshoty. Najlepiej używać jako część parametru CLI, np. `wdio run wdio.conf.js --s`.

Typ: `'new' | 'all' | 'none'`<br />
Domyślnie: `none` jeśli nie podano i testy są uruchamiane w CI, `new` jeśli nie podano, w przeciwnym razie to, co zostało dostarczone

### resolveSnapshotPath

Nadpisuje domyślną ścieżkę snapshota. Na przykład, aby przechowywać snapshoty obok plików testowych.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Typ: `(testPath: string, snapExtension: string) => string`<br />
Domyślnie: przechowuje pliki snapshotu w katalogu `__snapshots__` obok pliku testowego

### tsConfigPath

WDIO używa `tsx` do kompilacji plików TypeScript. Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego, ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH.

Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Domyślnie: `null`<br />

## Hooki

Tester WDIO pozwala ustawić hooki, które są wyzwalane w określonych momentach cyklu życia testu. Umożliwia to wykonywanie niestandardowych działań (np. zrobienie zrzutu ekranu, jeśli test nie powiedzie się).

Każdy hook ma jako parametr specyficzne informacje o cyklu życia (np. informacje o zestawie testów lub teście). Więcej informacji o wszystkich właściwościach hooków można znaleźć w [naszej przykładowej konfiguracji](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Uwaga:** Niektóre hooki (`onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`) są wykonywane w innym procesie i dlatego nie mogą dzielić żadnych globalnych danych z innymi hookami, które żyją w procesie pracownika.

### onPrepare

Wykonywane raz przed uruchomieniem wszystkich pracowników.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `param` (`object[]`): lista szczegółów możliwości

### onWorkerStart

Wykonywane przed utworzeniem procesu pracownika i może być użyte do inicjalizacji określonej usługi dla tego pracownika, a także do modyfikacji środowisk wykonawczych w sposób asynchroniczny.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `args` (`object`): obiekt, który zostanie połączony z główną konfiguracją po inicjalizacji pracownika
- `execArgv` (`string[]`): lista argumentów ciągu znaków przekazanych do procesu pracownika

### onWorkerEnd

Wykonywane zaraz po zakończeniu procesu pracownika.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `retries` (`number`): liczba ponownych prób na poziomie specyfikacji zdefiniowana w [_"Dodaj ponowne próby na podstawie pliku specyfikacji"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Wykonywane zaraz przed inicjalizacją sesji webdriver i frameworka testowego. Pozwala manipulować konfiguracjami w zależności od możliwości lub specyfikacji.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### before

Wykonywane przed rozpoczęciem wykonywania testu. W tym momencie masz dostęp do wszystkich zmiennych globalnych, takich jak `browser`. Jest to idealne miejsce do zdefiniowania niestandardowych poleceń.

Parametry:

- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `browser` (`object`): instancja utworzonej sesji przeglądarki/urządzenia

### beforeSuite

Hook, który jest wykonywany przed rozpoczęciem zestawu (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu

### beforeHook

Hook, który jest wykonywany *przed* hookiem wewnątrz zestawu (np. uruchamiany przed wywołaniem beforeEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)

### afterHook

Hook, który jest wykonywany *po* hooku wewnątrz zestawu (np. uruchamiany po wywołaniu afterEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funkcja, która ma być wykonana przed testem (tylko w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym został wykonany test

### beforeCommand

Uruchamiany przed wykonaniem polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie otrzymałoby

### afterCommand

Uruchamiany po wykonaniu polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie otrzymałoby
- `result` (`*`): wynik polecenia
- `error` (`Error`): obiekt błędu, jeśli wystąpił

### afterTest

Funkcja, która ma być wykonana po zakończeniu testu (w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym został wykonany test
- `result.error` (`Error`): obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
- `result.result` (`Any`): obiekt zwrotny funkcji testowej
- `result.duration` (`Number`): czas trwania testu
- `result.passed` (`Boolean`): true, jeśli test zakończył się powodzeniem, w przeciwnym razie false
- `result.retries` (`Object`): informacje o ponownych próbach pojedynczego testu zdefiniowane dla [Mocha i Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) oraz [Cucumber](./Retry.md#rerunning-in-cucumber), np. `{ attempts: 0, limit: 0 }`, zobacz
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, który jest wykonywany po zakończeniu zestawu (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu

### after

Wykonywane po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych z testu.

Parametry:

- `result` (`number`): 0 - test zaliczony, 1 - test nie zaliczony
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### afterSession

Wykonywane bezpośrednio po zakończeniu sesji webdriver.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### onComplete

Wykonywane po zamknięciu wszystkich pracowników, gdy proces ma się zakończyć. Błąd zgłoszony w hooku onComplete spowoduje niepowodzenie uruchomienia testu.

Parametry:

- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie utworzona w procesie pracownika
- `result` (`object`): obiekt wyników zawierający wyniki testów

### onReload

Wykonywane, gdy następuje odświeżenie.

Parametry:

- `oldSessionId` (`string`): identyfikator sesji starej sesji
- `newSessionId` (`string`): identyfikator sesji nowej sesji

### beforeFeature

Uruchamiany przed Funkcją Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### afterFeature

Uruchamiany po Funkcji Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### beforeScenario

Uruchamiany przed Scenariuszem Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `context` (`object`): obiekt World Cucumber

### afterScenario

Uruchamiany po Scenariuszu Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `result` (`object`): obiekt wyników zawierający wyniki scenariusza
- `result.passed` (`boolean`): true, jeśli scenariusz zakończył się powodzeniem
- `result.error` (`string`): stos błędów, jeśli scenariusz nie powiódł się
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt World Cucumber

### beforeStep

Uruchamiany przed Krokiem Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `context` (`object`): obiekt World Cucumber

### afterStep

Uruchamiany po Kroku Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `result`: (`object`): obiekt wyników zawierający wyniki kroku
- `result.passed` (`boolean`): true, jeśli scenariusz zakończył się powodzeniem
- `result.error` (`string`): stos błędów, jeśli scenariusz nie powiódł się
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt World Cucumber

### beforeAssertion

Hook, który jest wykonywany przed asercją WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera (np. `toHaveTitle`)
- `params.expectedValue`: wartość, która jest przekazywana do matchera
- `params.options`: opcje asercji

### afterAssertion

Hook, który jest wykonywany po asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera (np. `toHaveTitle`)
- `params.expectedValue`: wartość, która jest przekazywana do matchera
- `params.options`: opcje asercji
- `params.result`: wyniki asercji