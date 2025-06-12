---
id: configuration
title: Konfiguracja
---

W zależności od [rodzaju konfiguracji](/docs/setuptypes) (np. korzystanie z surowych powiązań protokołu, WebdriverIO jako samodzielnego pakietu lub testrunner WDIO) dostępny jest różny zestaw opcji do kontrolowania środowiska.

## Opcje WebDriver

Następujące opcje są zdefiniowane podczas korzystania z pakietu protokołu [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protokół używany do komunikacji z serwerem sterownika.

Typ: `String`<br />
Domyślnie: `http`

### hostname

Host twojego serwera sterownika.

Typ: `String`<br />
Domyślnie: `0.0.0.0`

### port

Port, na którym znajduje się twój serwer sterownika.

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

Nazwa użytkownika twojej usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli ustawiona, WebdriverIO automatycznie skonfiguruje opcje połączenia dla Ciebie. Jeśli nie korzystasz z dostawcy usług w chmurze, może to służyć do uwierzytelniania dowolnego innego backendu WebDriver.

Typ: `String`<br />
Domyślnie: `undefined`

### key

Twój klucz dostępu lub tajny klucz usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli ustawiony, WebdriverIO automatycznie skonfiguruje opcje połączenia dla Ciebie. Jeśli nie korzystasz z dostawcy usług w chmurze, może to służyć do uwierzytelniania dowolnego innego backendu WebDriver.

Typ: `String`<br />
Domyślnie: `undefined`

### capabilities

Definiuje funkcje, które chcesz uruchomić w swojej sesji WebDriver. Sprawdź [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities), aby uzyskać więcej szczegółów. Jeśli korzystasz ze starszego sterownika, który nie obsługuje protokołu WebDriver, będziesz musiał użyć [funkcji JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), aby pomyślnie uruchomić sesję.

Oprócz podstawowych funkcji WebDriver, możesz stosować opcje specyficzne dla przeglądarki i dostawcy, które umożliwiają głębszą konfigurację zdalnej przeglądarki lub urządzenia. Są one udokumentowane w odpowiednich dokumentacjach producentów, np.:

- `goog:chromeOptions`: dla [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: dla [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: dla [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: dla [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: dla [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: dla [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dodatkowo, przydatnym narzędziem jest [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) od Sauce Labs, który pomaga stworzyć ten obiekt, klikając razem żądane funkcje.

Typ: `Object`<br />
Domyślnie: `null`

**Przykład:**

```js
{
    browserName: 'chrome', // opcje: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // wersja przeglądarki
    platformName: 'Windows 10' // platforma OS
}
```

Jeśli przeprowadzasz testy internetowe lub natywne na urządzeniach mobilnych, `capabilities` różni się od protokołu WebDriver. Zobacz [Dokumentację Appium](https://appium.io/docs/en/latest/guides/caps/), aby uzyskać więcej szczegółów.

### logLevel

Poziom szczegółowości logowania.

Typ: `String`<br />
Domyślnie: `info`<br />
Opcje: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Katalog do przechowywania wszystkich plików dziennika testrunner (w tym dzienników reportera i dzienników `wdio`). Jeśli nie jest ustawiony, wszystkie logi są przekazywane do `stdout`. Ponieważ większość reporterów jest stworzona do logowania do `stdout`, zaleca się używanie tej opcji tylko dla określonych reporterów, dla których ma więcej sensu przekierowanie raportu do pliku (jak reporter `junit`, na przykład).

Podczas pracy w trybie standalone, jedynym generowanym dziennikiem będzie dziennik `wdio`.

Typ: `String`<br />
Domyślnie: `null`

### connectionRetryTimeout

Limit czasu dla żądania WebDriver do sterownika lub siatki.

Typ: `Number`<br />
Domyślnie: `120000`

### connectionRetryCount

Maksymalna liczba ponownych prób żądania do serwera Selenium.

Typ: `Number`<br />
Domyślnie: `3`

### agent

Pozwala użyć niestandardowego agenta `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) do wykonywania żądań.

Typ: `Object`<br />
Domyślnie:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Określa niestandardowe `nagłówki` do przekazania w każdym żądaniu WebDriver. Jeśli Twoja siatka Selenium wymaga uwierzytelnienia podstawowego, zalecamy przekazanie nagłówka `Authorization` przez tę opcję, aby uwierzytelnić żądania WebDriver, np.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
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

Czy nie wymaga, aby certyfikat SSL był ważny.
Może być ustawiony za pomocą zmiennych środowiskowych jako `STRICT_SSL` lub `strict_ssl`.

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

Dla bezpieczniejszego logowania, wyrażenia regularne ustawione za pomocą `maskingPatterns` mogą zaciemniać wrażliwe informacje z dziennika.
 - Format ciągu to wyrażenie regularne z flagami lub bez (np. `/.../i`) i oddzielony przecinkami dla wielu wyrażeń regularnych.
 - Więcej szczegółów na temat wzorców maskowania można znaleźć w [sekcji Wzorce maskowania w README modułu WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Następujące opcje (w tym te wymienione powyżej) mogą być używane z WebdriverIO w trybie standalone:

### automationProtocol

Zdefiniuj protokół, którego chcesz używać do automatyzacji przeglądarki. Obecnie obsługiwany jest tylko [`webdriver`](https://www.npmjs.com/package/webdriver), ponieważ jest to główna technologia automatyzacji przeglądarki używana przez WebdriverIO.

Jeśli chcesz zautomatyzować przeglądarkę za pomocą innej technologii automatyzacji, upewnij się, że ta właściwość jest ustawiona na ścieżkę, która rozwiązuje się do modułu zgodnego z następującym interfejsem:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
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

Skraca wywołania komendy `url` poprzez ustawienie podstawowego adresu URL.
- Jeśli Twój parametr `url` zaczyna się od `/`, to `baseUrl` jest dodawany na początku (z wyjątkiem ścieżki `baseUrl`, jeśli taką ma).
- Jeśli Twój parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), to pełny `baseUrl` jest dodawany bezpośrednio na początku.

Typ: `String`<br />
Domyślnie: `null`

### waitforTimeout

Domyślny limit czasu dla wszystkich komend `waitFor*`. (Zauważ małą literę `f` w nazwie opcji.) Ten limit czasu __tylko__ wpływa na komendy zaczynające się od `waitFor*` i ich domyślny czas oczekiwania.

Aby zwiększyć limit czasu dla _testu_, sprawdź dokumentację frameworka.

Typ: `Number`<br />
Domyślnie: `5000`

### waitforInterval

Domyślny interwał dla wszystkich komend `waitFor*`, aby sprawdzić, czy oczekiwany stan (np. widoczność) został zmieniony.

Typ: `Number`<br />
Domyślnie: `100`

### region

Jeśli korzystasz z Sauce Labs, możesz wybrać uruchamianie testów między różnymi centrami danych: US lub EU.
Aby zmienić region na EU, dodaj `region: 'eu'` do swojej konfiguracji.

__Uwaga:__ To ma wpływ tylko wtedy, gdy podasz opcje `user` i `key`, które są połączone z Twoim kontem Sauce Labs.

Typ: `String`<br />
Domyślnie: `us`

*(tylko dla vm i/lub em/symulatorów)*

---

## Opcje Testrunner

Następujące opcje (w tym te wymienione powyżej) są zdefiniowane tylko do uruchamiania WebdriverIO z testrunnerem WDIO:

### specs

Definiuje specyfikacje do wykonania testu. Możesz określić wzorzec glob, aby dopasować wiele plików jednocześnie, lub opakować glob lub zestaw ścieżek w tablicę, aby uruchomić je w ramach jednego procesu roboczego. Wszystkie ścieżki są traktowane jako względne w stosunku do ścieżki pliku konfiguracyjnego.

Typ: `(String | String[])[]`<br />
Domyślnie: `[]`

### exclude

Wyklucza specyfikacje z wykonania testu. Wszystkie ścieżki są traktowane jako względne w stosunku do ścieżki pliku konfiguracyjnego.

Typ: `String[]`<br />
Domyślnie: `[]`

### suites

Obiekt opisujący różne zestawy, które można następnie określić za pomocą opcji `--suite` w interfejsie wiersza poleceń `wdio`.

Typ: `Object`<br />
Domyślnie: `{}`

### capabilities

To samo co sekcja `capabilities` opisana powyżej, z możliwością określenia albo obiektu [`multiremote`](/docs/multiremote), albo wielu sesji WebDrivera w tablicy do równoległego wykonania.

Możesz zastosować te same specyficzne dla dostawcy i przeglądarki funkcje, jak zdefiniowano [powyżej](/docs/configuration#capabilities).

Typ: `Object`|`Object[]`<br />
Domyślnie: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maksymalna liczba wszystkich równolegle działających pracowników.

__Uwaga:__ może to być liczba tak wysoka jak `100`, gdy testy są wykonywane na zewnętrznych dostawcach, takich jak maszyny Sauce Labs. Tam testy nie są testowane na jednej maszynie, ale raczej na wielu maszynach wirtualnych. Jeśli testy mają być uruchamiane na lokalnej maszynie programistycznej, użyj bardziej rozsądnej liczby, takiej jak `3`, `4` lub `5`. Zasadniczo jest to liczba przeglądarek, które będą jednocześnie uruchamiane i uruchamiające Twoje testy w tym samym czasie, więc zależy to od ilości pamięci RAM na Twojej maszynie i liczby innych aplikacji działających na Twojej maszynie.

Możesz również zastosować `maxInstances` w ramach swoich obiektów capability, używając funkcji `wdio:maxInstances`. Ograniczy to liczbę równoległych sesji dla tej konkretnej funkcji.

Typ: `Number`<br />
Domyślnie: `100`

### maxInstancesPerCapability

Maksymalna liczba wszystkich równolegle działających pracowników na capability.

Typ: `Number`<br />
Domyślnie: `100`

### injectGlobals

Wstawia globalne elementy WebdriverIO (np. `browser`, `$` i `$$`) do globalnego środowiska.
Jeśli ustawisz na `false`, powinieneś importować z `@wdio/globals`, np.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Uwaga: WebdriverIO nie obsługuje wstrzykiwania globalnych elementów specyficznych dla frameworka testowego.

Typ: `Boolean`<br />
Domyślnie: `true`

### bail

Jeśli chcesz, aby Twój test zatrzymał się po określonej liczbie niepowodzeń, użyj `bail`.
(Domyślnie jest `0`, co oznacza uruchamianie wszystkich testów bez względu na wynik.) **Uwaga:** Test w tym kontekście to wszystkie testy w ramach pojedynczego pliku specyfikacji (gdy używasz Mocha lub Jasmine) lub wszystkie kroki w pliku funkcji (gdy używasz Cucumber). Jeśli chcesz kontrolować zachowanie bail w ramach testów pojedynczego pliku testowego, sprawdź dostępne opcje [framework](frameworks).

Typ: `Number`<br />
Domyślnie: `0` (nie bail; uruchom wszystkie testy)

### specFileRetries

Liczba ponownych prób całego pliku specyfikacji, gdy nie powiedzie się jako całość.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDelay

Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDeferred

Czy ponowne próby plików specyfikacji powinny być powtarzane natychmiast, czy odroczone na koniec kolejki.

Typ: `Boolean`<br />
Domyślnie: `true`

### groupLogsByTestSpec

Wybierz widok wyjścia dziennika.

Jeśli ustawione na `false`, dzienniki z różnych plików testowych będą drukowane w czasie rzeczywistym. Należy zauważyć, że może to spowodować mieszanie się wyjść dzienników z różnych plików podczas równoległego uruchamiania.

Jeśli ustawione na `true`, wyjścia dzienników będą grupowane według specyfikacji testowej i drukowane tylko po zakończeniu specyfikacji testowej.

Domyślnie jest ustawione na `false`, więc dzienniki są drukowane w czasie rzeczywistym.

Typ: `Boolean`<br />
Domyślnie: `false`

### autoAssertOnTestEnd

Kontroluje, czy WebdriverIO automatycznie sprawdza wszystkie asercje miękkie na końcu każdego testu. Gdy ustawione na `true`, wszystkie zgromadzone asercje miękkie zostaną automatycznie sprawdzone i spowodują niepowodzenie testu, jeśli którakolwiek z asercji nie powiedzie się. Gdy ustawione na `false`, musisz ręcznie wywołać metodę asercji, aby sprawdzić asercje miękkie.

Typ: `Boolean`<br />
Domyślnie: `true`

### services

Usługi przejmują określone zadanie, którym nie chcesz się zajmować. Rozszerzają one konfigurację testu prawie bez wysiłku.

Typ: `String[]|Object[]`<br />
Domyślnie: `[]`

### framework

Definiuje framework testowy, który ma być używany przez testrunner WDIO.

Typ: `String`<br />
Domyślnie: `mocha`<br />
Opcje: `mocha` | `jasmine`

### mochaOpts, jasmineOpts i cucumberOpts

Opcje specyficzne dla frameworka. Zobacz dokumentację adaptera frameworka, aby dowiedzieć się, jakie opcje są dostępne. Więcej informacji na ten temat w [Frameworks](frameworks).

Typ: `Object`<br />
Domyślnie: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista funkcji cucumber z numerami linii (podczas [korzystania z frameworka cucumber](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Domyślnie: `[]`

### reporters

Lista reporterów do użycia. Reporter może być albo ciągiem znaków, albo tablicą
`['reporterName', { /* reporter options */}]`, gdzie pierwszy element jest ciągiem z nazwą reportera, a drugi element jest obiektem z opcjami reportera.

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

Określa w jakim interwale reporter powinien sprawdzać, czy są zsynchronizowane, jeśli raportują swoje dzienniki asynchronicznie (np. jeśli dzienniki są przesyłane strumieniowo do dostawcy zewnętrznego).

Typ: `Number`<br />
Domyślnie: `100` (ms)

### reporterSyncTimeout

Określa maksymalny czas, jaki reporterzy mają na zakończenie przesyłania wszystkich swoich dzienników, zanim testrunner zgłosi błąd.

Typ: `Number`<br />
Domyślnie: `5000` (ms)

### execArgv

Argumenty Node do określenia podczas uruchamiania procesów potomnych.

Typ: `String[]`<br />
Domyślnie: `null`

### filesToWatch

Lista wzorców ciągów znaków obsługujących glob, które informują testrunner, aby dodatkowo obserwował inne pliki, np. pliki aplikacji, podczas uruchamiania go z flagą `--watch`. Domyślnie testrunner już obserwuje wszystkie pliki specyfikacji.

Typ: `String[]`<br />
Domyślnie: `[]`

### updateSnapshots

Ustaw na true, jeśli chcesz zaktualizować swoje snapshoty. Idealnie używane jako część parametru CLI, np. `wdio run wdio.conf.js --s`.

Typ: `'new' | 'all' | 'none'`<br />
Domyślnie: `none` jeśli nie podano i testy są uruchamiane w CI, `new` jeśli nie podano, w przeciwnym razie to, co zostało podane

### resolveSnapshotPath

Nadpisuje domyślną ścieżkę snapshota. Na przykład, aby przechowywać snapshoty obok plików testowych.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Typ: `(testPath: string, snapExtension: string) => string`<br />
Domyślnie: przechowuje pliki snapshota w katalogu `__snapshots__` obok pliku testowego

### tsConfigPath

WDIO używa `tsx` do kompilacji plików TypeScript. Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego, ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH.

Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Domyślnie: `null`<br />

## Hooks

Testrunner WDIO pozwala ustawić hooki, które są wyzwalane w określonych momentach cyklu życia testu. Pozwala to na niestandardowe akcje (np. zrobienie zrzutu ekranu, jeśli test nie powiedzie się).

Każdy hook ma jako parametr określone informacje o cyklu życia (np. informacje o zestawie testów lub teście). Przeczytaj więcej o wszystkich właściwościach hooka w [naszym przykładowym pliku konfiguracyjnym](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Uwaga:** Niektóre hooki (`onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`) są wykonywane w innym procesie i dlatego nie mogą dzielić żadnych globalnych danych z innymi hookami, które żyją w procesie roboczym.

### onPrepare

Wykonywane raz przed uruchomieniem wszystkich pracowników.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `param` (`object[]`): lista szczegółów capabilities

### onWorkerStart

Wykonywane przed uruchomieniem procesu roboczego i może być używane do inicjalizacji określonej usługi dla tego pracownika, a także do modyfikacji środowisk wykonawczych w sposób asynchroniczny.

Parametry:

- `cid` (`string`): id capabilities (np. 0-0)
- `caps` (`object`): zawierający capabilities dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym
- `args` (`object`): obiekt, który zostanie połączony z główną konfiguracją po zainicjowaniu pracownika
- `execArgv` (`string[]`): lista argumentów ciągu znaków przekazanych do procesu roboczego

### onWorkerEnd

Wykonywane zaraz po zakończeniu procesu roboczego.

Parametry:

- `cid` (`string`): id capabilities (np. 0-0)
- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `specs` (`string[]`): specyfikacje uruchomione w procesie roboczym
- `retries` (`number`): liczba ponownych prób na poziomie specyfikacji użytych zgodnie z definicją w [_"Dodaj ponowne próby na podstawie specyfikacji pliku"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Wykonywane tuż przed inicjalizacją sesji webdriver i frameworka testowego. Pozwala manipulować konfiguracjami w zależności od funkcji lub specyfikacji.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający capabilities dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym

### before

Wykonywane przed rozpoczęciem wykonania testu. W tym momencie masz dostęp do wszystkich zmiennych globalnych, takich jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.

Parametry:

- `caps` (`object`): zawierający capabilities dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym
- `browser` (`object`): instancja utworzonej sesji przeglądarki/urządzenia

### beforeSuite

Hook, który jest wykonywany przed rozpoczęciem zestawu (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu

### beforeHook

Hook, który jest wykonywany *przed* hookiem w ramach zestawu (np. uruchamia się przed wywołaniem beforeEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)

### afterHook

Hook, który jest wykonywany *po* hooku w ramach zestawu (np. uruchamia się po wywołaniu afterEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funkcja wykonywana przed testem (tylko w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym test został wykonany

### beforeCommand

Uruchamiane przed wykonaniem polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie otrzymałoby

### afterCommand

Uruchamiane po wykonaniu polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie otrzymałoby
- `result` (`number`): 0 - sukces polecenia, 1 - błąd polecenia
- `error` (`Error`): obiekt błędu, jeśli wystąpił

### afterTest

Funkcja wykonywana po zakończeniu testu (w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym test został wykonany
- `result.error` (`Error`): obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
- `result.result` (`Any`): obiekt zwracany przez funkcję testową
- `result.duration` (`Number`): czas trwania testu
- `result.passed` (`Boolean`): true, jeśli test został zaliczony, w przeciwnym razie false
- `result.retries` (`Object`): informacje o pojedynczych ponownych próbach testu, jak zdefiniowano dla [Mocha i Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) oraz [Cucumber](./Retry.md#rerunning-in-cucumber), np. `{ attempts: 0, limit: 0 }`, zobacz
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, który jest wykonywany po zakończeniu zestawu (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu

### after

Wykonywane po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych z testu.

Parametry:

- `result` (`number`): 0 - test zaliczony, 1 - test niezaliczony
- `caps` (`object`): zawierający capabilities dla sesji, która została uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje uruchomione w procesie roboczym

### afterSession

Wykonywane zaraz po zakończeniu sesji webdriver.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający capabilities dla sesji, która została uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje uruchomione w procesie roboczym

### onComplete

Wykonywane po zamknięciu wszystkich pracowników i przed zakończeniem procesu. Błąd zgłoszony w hooku onComplete spowoduje niepowodzenie uruchomienia testu.

Parametry:

- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający capabilities dla sesji, która została uruchomiona w procesie roboczym
- `result` (`object`): obiekt wyników zawierający wyniki testów

### onReload

Wykonywane, gdy następuje odświeżenie.

Parametry:

- `oldSessionId` (`string`): ID sesji starej sesji
- `newSessionId` (`string`): ID sesji nowej sesji

### beforeFeature

Uruchamiane przed funkcją Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### afterFeature

Uruchamiane po funkcji Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### beforeScenario

Uruchamiane przed scenariuszem Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `context` (`object`): obiekt World Cucumber

### afterScenario

Uruchamiane po scenariuszu Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `result` (`object`): obiekt wyników zawierający wyniki scenariusza
- `result.passed` (`boolean`): true, jeśli scenariusz został zaliczony
- `result.error` (`string`): stos błędu, jeśli scenariusz nie powiódł się
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt World Cucumber

### beforeStep

Uruchamiane przed krokiem Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `context` (`object`): obiekt World Cucumber

### afterStep

Uruchamiane po kroku Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `result`: (`object`): obiekt wyników zawierający wyniki kroku
- `result.passed` (`boolean`): true, jeśli scenariusz został zaliczony
- `result.error` (`string`): stos błędu, jeśli scenariusz nie powiódł się
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