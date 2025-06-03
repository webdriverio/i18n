---
id: configuration
title: Konfiguracja
---

W zależności od [typu konfiguracji](/docs/setuptypes) (np. korzystania z bezpośrednich wiązań protokołu, WebdriverIO jako niezależnego pakietu lub testera WDIO) dostępny jest różny zestaw opcji do kontrolowania środowiska.

## Opcje WebDrivera

Następujące opcje są zdefiniowane podczas używania pakietu protokołu [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protokół używany do komunikacji z serwerem sterownika.

Typ: `String`<br />
Domyślnie: `http`

### hostname

Host serwera sterownika.

Typ: `String`<br />
Domyślnie: `0.0.0.0`

### port

Port, na którym działa serwer sterownika.

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

Nazwa użytkownika usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli jest ustawiona, WebdriverIO automatycznie skonfiguruje opcje połączenia. Jeśli nie korzystasz z dostawcy chmury, można jej użyć do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### key

Klucz dostępu lub klucz tajny usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [LambdaTest](https://www.lambdatest.com)). Jeśli jest ustawiony, WebdriverIO automatycznie skonfiguruje opcje połączenia. Jeśli nie korzystasz z dostawcy chmury, można go użyć do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### capabilities

Definiuje możliwości, które chcesz uruchomić w swojej sesji WebDrivera. Sprawdź [Protokół WebDriver](https://w3c.github.io/webdriver/#capabilities), aby uzyskać więcej szczegółów. Jeśli korzystasz ze starszego sterownika, który nie obsługuje protokołu WebDriver, musisz użyć [możliwości JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), aby pomyślnie uruchomić sesję.

Oprócz możliwości opartych na WebDriverze, możesz zastosować opcje specyficzne dla przeglądarki i dostawcy, które umożliwiają głębszą konfigurację zdalnej przeglądarki lub urządzenia. Są one udokumentowane w odpowiednich dokumentacjach dostawców, np.:

- `goog:chromeOptions`: dla [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: dla [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: dla [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: dla [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: dla [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: dla [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dodatkowo przydatnym narzędziem jest [Konfigurator Automatycznych Testów](https://docs.saucelabs.com/basics/platform-configurator/) Sauce Labs, który pomaga stworzyć ten obiekt poprzez kliknięcie wybranych możliwości.

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

Jeśli uruchamiasz testy internetowe lub natywne na urządzeniach mobilnych, `capabilities` różnią się od protokołu WebDriver. Zobacz [Dokumentację Appium](https://appium.io/docs/en/latest/guides/caps/) w celu uzyskania dodatkowych informacji.

### logLevel

Poziom szczegółowości logowania.

Typ: `String`<br />
Domyślnie: `info`<br />
Opcje: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Katalog do przechowywania wszystkich plików logów testera (w tym logów reportera i logów `wdio`). Jeśli nie jest ustawiony, wszystkie logi są przesyłane do `stdout`. Ponieważ większość reporterów jest przeznaczona do logowania do `stdout`, zaleca się używanie tej opcji tylko dla określonych reporterów, gdzie ma większy sens kierowanie raportu do pliku (na przykład reporter `junit`).

Podczas pracy w trybie standalone, jedynym logiem generowanym przez WebdriverIO będzie log `wdio`.

Typ: `String`<br />
Domyślnie: `null`

### connectionRetryTimeout

Limit czasu dla dowolnego żądania WebDriver do sterownika lub siatki.

Typ: `Number`<br />
Domyślnie: `120000`

### connectionRetryCount

Maksymalna liczba prób ponowienia żądania do serwera Selenium.

Typ: `Number`<br />
Domyślnie: `3`

### agent

Pozwala na użycie niestandardowego [agenta](https://www.npmjs.com/package/got#agent) `http`/`https`/`http2` do wykonywania żądań.

Typ: `Object`<br />
Domyślnie:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Określ niestandardowe `headers` do przekazania w każdym żądaniu WebDrivera. Jeśli Twoja siatka Selenium wymaga uwierzytelnienia podstawowego, zalecamy przekazanie nagłówka `Authorization` przez tę opcję w celu uwierzytelnienia żądań WebDrivera, np.:

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

Funkcja przechwytująca [opcje żądania HTTP](https://github.com/sindresorhus/got#options) przed wykonaniem żądania WebDrivera

Typ: `(RequestOptions) => RequestOptions`<br />
Domyślnie: *brak*

### transformResponse

Funkcja przechwytująca obiekty odpowiedzi HTTP po nadejściu odpowiedzi WebDrivera. Funkcja otrzymuje oryginalny obiekt odpowiedzi jako pierwszy argument i odpowiadające mu `RequestOptions` jako drugi argument.

Typ: `(Response, RequestOptions) => Response`<br />
Domyślnie: *brak*

### strictSSL

Czy nie wymaga, aby certyfikat SSL był ważny.
Można to ustawić za pomocą zmiennych środowiskowych jako `STRICT_SSL` lub `strict_ssl`.

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

Dla bezpieczniejszego logowania, wyrażenia regularne ustawione za pomocą `maskingPatterns` mogą zamazywać wrażliwe informacje z logów.
 - Format ciągu to wyrażenie regularne z flagami lub bez nich (np. `/.../i`), oddzielone przecinkami dla wielu wyrażeń regularnych.
 - Więcej informacji na temat wzorców maskowania znajdziesz w [sekcji Wzorce Maskowania w README Loggera WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Następujące opcje (w tym wymienione powyżej) mogą być używane z WebdriverIO w trybie standalone:

### automationProtocol

Zdefiniuj protokół, którego chcesz użyć do automatyzacji przeglądarki. Obecnie obsługiwany jest tylko [`webdriver`](https://www.npmjs.com/package/webdriver), ponieważ jest to główna technologia automatyzacji przeglądarki używana przez WebdriverIO.

Jeśli chcesz zautomatyzować przeglądarkę za pomocą innej technologii automatyzacji, upewnij się, że ustawiłeś tę właściwość na ścieżkę, która prowadzi do modułu przestrzegającego następującego interfejsu:

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

Skróć wywołania komendy `url` poprzez ustawienie podstawowego adresu URL.
- Jeśli parametr `url` zaczyna się od `/`, to `baseUrl` jest dołączany na początku (z wyjątkiem ścieżki `baseUrl`, jeśli ją posiada).
- Jeśli parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), to pełny `baseUrl` jest dołączany bezpośrednio na początku.

Typ: `String`<br />
Domyślnie: `null`

### waitforTimeout

Domyślny limit czasu dla wszystkich poleceń `waitFor*`. (Zwróć uwagę na małą literę `f` w nazwie opcji.) Ten limit czasu __tylko__ wpływa na polecenia zaczynające się od `waitFor*` i ich domyślny czas oczekiwania.

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

*(tylko dla maszyn wirtualnych i/lub emulatorów/symulatorów)*

---

## Opcje Testera

Następujące opcje (w tym wymienione powyżej) są zdefiniowane tylko dla uruchamiania WebdriverIO z testerem WDIO:

### specs

Definiuj specyfikacje dla wykonania testu. Możesz określić wzorzec glob, aby dopasować wiele plików jednocześnie, lub owinąć glob lub zestaw ścieżek w tablicę, aby uruchomić je w ramach jednego procesu roboczego. Wszystkie ścieżki są traktowane jako względne od ścieżki pliku konfiguracyjnego.

Typ: `(String | String[])[]`<br />
Domyślnie: `[]`

### exclude

Wyklucz specyfikacje z wykonania testu. Wszystkie ścieżki są traktowane jako względne od ścieżki pliku konfiguracyjnego.

Typ: `String[]`<br />
Domyślnie: `[]`

### suites

Obiekt opisujący różne zestawy testów, które możesz następnie określić za pomocą opcji `--suite` w CLI `wdio`.

Typ: `Object`<br />
Domyślnie: `{}`

### capabilities

To samo co sekcja `capabilities` opisana powyżej, z możliwością określenia albo obiektu [`multiremote`](/docs/multiremote), albo wielu sesji WebDrivera w tablicy dla równoległego wykonania.

Możesz zastosować te same możliwości specyficzne dla dostawcy i przeglądarki, jak zdefiniowano [powyżej](/docs/configuration#capabilities).

Typ: `Object`|`Object[]`<br />
Domyślnie: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maksymalna liczba równocześnie działających pracowników.

__Uwaga:__ To może być liczba tak wysoka jak `100`, gdy testy są wykonywane na zewnętrznych dostawcach, takich jak maszyny Sauce Labs. Tam testy nie są wykonywane na pojedynczej maszynie, ale raczej na wielu maszynach wirtualnych. Jeśli testy mają być uruchomione na lokalnej maszynie deweloperskiej, użyj bardziej rozsądnej liczby, takiej jak `3`, `4` lub `5`. Zasadniczo jest to liczba przeglądarek, które będą jednocześnie uruchamiane i wykonujące testy w tym samym czasie, więc zależy to od ilości pamięci RAM na Twojej maszynie i od liczby innych aplikacji działających na Twojej maszynie.

Możesz również zastosować `maxInstances` w obiektach możliwości za pomocą możliwości `wdio:maxInstances`. Ograniczy to liczbę równoległych sesji dla danej możliwości.

Typ: `Number`<br />
Domyślnie: `100`

### maxInstancesPerCapability

Maksymalna liczba równocześnie działających pracowników na możliwość.

Typ: `Number`<br />
Domyślnie: `100`

### injectGlobals

Wstawia globalne zmienne WebdriverIO (np. `browser`, `$` i `$$`) do globalnego środowiska.
Jeśli ustawisz na `false`, powinieneś importować z `@wdio/globals`, np.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Uwaga: WebdriverIO nie obsługuje wstrzykiwania globalnych zmiennych specyficznych dla frameworka testowego.

Typ: `Boolean`<br />
Domyślnie: `true`

### bail

Jeśli chcesz, aby Twój test zatrzymał się po określonej liczbie niepowodzeń testów, użyj `bail`.
(Domyślnie wynosi `0`, co oznacza uruchomienie wszystkich testów bez względu na wynik.) **Uwaga:** Test w tym kontekście to wszystkie testy w ramach jednego pliku specyfikacji (podczas używania Mocha lub Jasmine) lub wszystkie kroki w ramach pliku funkcji (podczas używania Cucumber). Jeśli chcesz kontrolować zachowanie przerwania w testach jednego pliku testowego, zapoznaj się z dostępnymi opcjami [frameworka](frameworks).

Typ: `Number`<br />
Domyślnie: `0` (nie przerywaj; uruchom wszystkie testy)

### specFileRetries

Liczba ponownych prób całego pliku specyfikacji, gdy kończy się niepowodzeniem jako całość.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDelay

Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDeferred

Czy ponownie próbowane pliki specyfikacji powinny być ponownie próbowane natychmiast, czy odroczone na koniec kolejki.

Typ: `Boolean`<br />
Domyślnie: `true`

### groupLogsByTestSpec

Wybierz widok wyjścia logów.

Jeśli ustawione na `false`, logi z różnych plików testowych będą drukowane w czasie rzeczywistym. Pamiętaj, że może to spowodować mieszanie się wyjść logów z różnych plików podczas równoległego uruchamiania.

Jeśli ustawione na `true`, wyjścia logów będą pogrupowane według specyfikacji testowej i drukowane tylko po zakończeniu specyfikacji testowej.

Domyślnie jest ustawione na `false`, więc logi są drukowane w czasie rzeczywistym.

Typ: `Boolean`<br />
Domyślnie: `false`

### services

Usługi przejmują określone zadanie, którym nie chcesz się zajmować. Zwiększają one konfigurację testową prawie bez wysiłku.

Typ: `String[]|Object[]`<br />
Domyślnie: `[]`

### framework

Definiuje framework testowy, który ma być używany przez tester WDIO.

Typ: `String`<br />
Domyślnie: `mocha`<br />
Opcje: `mocha` | `jasmine`

### mochaOpts, jasmineOpts i cucumberOpts

Opcje specyficzne dla frameworka. Zobacz dokumentację adaptera frameworka, aby dowiedzieć się, jakie opcje są dostępne. Przeczytaj więcej na ten temat w [Frameworks](frameworks).

Typ: `Object`<br />
Domyślnie: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista funkcji cucumber z numerami linii (podczas [używania frameworka cucumber](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Domyślnie: `[]`

### reporters

Lista reporterów do użycia. Reporter może być albo ciągiem znaków, albo tablicą
`['reporterName', { /* opcje reportera */}]`, gdzie pierwszy element to ciąg znaków z nazwą reportera, a drugi element to obiekt z opcjami reportera.

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

Określa, w jakim interwale reporter powinien sprawdzać, czy są zsynchronizowane, jeśli raportują swoje logi asynchronicznie (np. jeśli logi są przesyłane do dostawcy zewnętrznego).

Typ: `Number`<br />
Domyślnie: `100` (ms)

### reporterSyncTimeout

Określa maksymalny czas, jaki reporterzy mają na zakończenie przesyłania wszystkich swoich logów, zanim zostanie zgłoszony błąd przez tester.

Typ: `Number`<br />
Domyślnie: `5000` (ms)

### execArgv

Argumenty Node do określenia podczas uruchamiania procesów potomnych.

Typ: `String[]`<br />
Domyślnie: `null`

### filesToWatch

Lista wzorców ciągów znaków obsługujących glob, które informują tester, aby dodatkowo obserwował inne pliki, np. pliki aplikacji, podczas uruchamiania go z flagą `--watch`. Domyślnie tester już obserwuje wszystkie pliki specyfikacji.

Typ: `String[]`<br />
Domyślnie: `[]`

### updateSnapshots

Ustaw na true, jeśli chcesz zaktualizować swoje zrzuty ekranu. Idealnie używane jako parametr CLI, np. `wdio run wdio.conf.js --s`.

Typ: `'new' | 'all' | 'none'`<br />
Domyślnie: `none` jeśli nie podano i testy działają w CI, `new` jeśli nie podano, w przeciwnym razie to, co zostało podane

### resolveSnapshotPath

Nadpisuje domyślną ścieżkę zrzutu ekranu. Na przykład, aby przechowywać zrzuty ekranu obok plików testowych.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Typ: `(testPath: string, snapExtension: string) => string`<br />
Domyślnie: przechowuje pliki zrzutów ekranu w katalogu `__snapshots__` obok pliku testowego

### tsConfigPath

WDIO używa `tsx` do kompilacji plików TypeScript. Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego, ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH.

Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Domyślnie: `null`<br />

## Hooki

Tester WDIO pozwala ustawić hooki, które są wyzwalane w określonych momentach cyklu życia testu. Umożliwia to niestandardowe akcje (np. zrobienie zrzutu ekranu, jeśli test zakończy się niepowodzeniem).

Każdy hook ma jako parametr specyficzne informacje o cyklu życia (np. informacje o zestawie testów lub teście). Przeczytaj więcej o wszystkich właściwościach hooków w [naszym przykładowym pliku konfiguracyjnym](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Uwaga:** Niektóre hooki (`onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`) są wykonywane w innym procesie i dlatego nie mogą udostępniać żadnych danych globalnych z innymi hookami, które żyją w procesie roboczym.

### onPrepare

Jest wykonywany raz przed uruchomieniem wszystkich pracowników.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `param` (`object[]`): lista szczegółów możliwości

### onWorkerStart

Jest wykonywany przed uruchomieniem procesu pracownika i może być używany do inicjowania określonej usługi dla tego pracownika, a także do modyfikowania środowisk wykonawczych w sposób asynchroniczny.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `args` (`object`): obiekt, który zostanie połączony z główną konfiguracją po zainicjowaniu pracownika
- `execArgv` (`string[]`): lista argumentów ciągów znaków przekazanych do procesu pracownika

### onWorkerEnd

Jest wykonywany zaraz po zakończeniu procesu pracownika.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `retries` (`number`): liczba ponownych prób na poziomie specyfikacji użytych zgodnie z definicją w [_"Dodaj ponowne próby na podstawie pliku specyfikacji"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Jest wykonywany tuż przed inicjalizacją sesji webdriver i frameworka testowego. Pozwala manipulować konfiguracjami w zależności od możliwości lub specyfikacji.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### before

Jest wykonywany przed rozpoczęciem wykonania testu. W tym momencie masz dostęp do wszystkich zmiennych globalnych, takich jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.

Parametry:

- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika
- `browser` (`object`): instancja utworzonej sesji przeglądarki/urządzenia

### beforeSuite

Hook, który jest wykonywany przed rozpoczęciem zestawu testów (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu testów

### beforeHook

Hook, który jest wykonywany *przed* hookiem w ramach zestawu testów (np. działa przed wywołaniem beforeEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)

### afterHook

Hook, który jest wykonywany *po* hooku w ramach zestawu testów (np. działa po wywołaniu afterEach w Mocha)

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): kontekst testu (reprezentuje obiekt World w Cucumber)
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funkcja do wykonania przed testem (tylko w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym test został wykonany

### beforeCommand

Uruchamia się przed wykonaniem polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie by otrzymało

### afterCommand

Uruchamia się po wykonaniu polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie by otrzymało
- `result` (`number`): 0 - sukces polecenia, 1 - błąd polecenia
- `error` (`Error`): obiekt błędu, jeśli występuje

### afterTest

Funkcja do wykonania po zakończeniu testu (w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym test został wykonany
- `result.error` (`Error`): obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
- `result.result` (`Any`): obiekt zwracany funkcji testowej
- `result.duration` (`Number`): czas trwania testu
- `result.passed` (`Boolean`): true, jeśli test przeszedł, w przeciwnym razie false
- `result.retries` (`Object`): informacje o ponownych próbach pojedynczego testu, jak zdefiniowano dla [Mocha i Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) oraz [Cucumber](./Retry.md#rerunning-in-cucumber), np. `{ attempts: 0, limit: 0 }`, zobacz
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, który jest wykonywany po zakończeniu zestawu testów (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu testów

### after

Jest wykonywany po zakończeniu wszystkich testów. Wciąż masz dostęp do wszystkich zmiennych globalnych z testu.

Parametry:

- `result` (`number`): 0 - test zaliczony, 1 - test niezaliczony
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### afterSession

Jest wykonywany zaraz po zakończeniu sesji webdriver.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie pracownika

### onComplete

Jest wykonywany po zamknięciu wszystkich pracowników i przed zakończeniem procesu. Błąd rzucony w hooku onComplete spowoduje niepowodzenie uruchomienia testu.

Parametry:

- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie pracownika
- `result` (`object`): obiekt wyników zawierający wyniki testów

### onReload

Jest wykonywany, gdy nastąpi odświeżenie.

Parametry:

- `oldSessionId` (`string`): identyfikator sesji starej sesji
- `newSessionId` (`string`): identyfikator sesji nowej sesji

### beforeFeature

Uruchamia się przed funkcją Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### afterFeature

Uruchamia się po funkcji Cucumber.

Parametry:

- `uri` (`string`): ścieżka do pliku funkcji
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): obiekt funkcji Cucumber

### beforeScenario

Uruchamia się przed scenariuszem Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `context` (`object`): obiekt świata Cucumber

### afterScenario

Uruchamia się po scenariuszu Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `result` (`object`): obiekt wyników zawierający wyniki scenariusza
- `result.passed` (`boolean`): true, jeśli scenariusz przeszedł
- `result.error` (`string`): stos błędu, jeśli scenariusz nie powiódł się
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt świata Cucumber

### beforeStep

Uruchamia się przed krokiem Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `context` (`object`): obiekt świata Cucumber

### afterStep

Uruchamia się po kroku Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `result`: (`object`): obiekt wyników zawierający wyniki kroków
- `result.passed` (`boolean`): true, jeśli scenariusz przeszedł
- `result.error` (`string`): stos błędu, jeśli scenariusz nie powiódł się
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt świata Cucumber

### beforeAssertion

Hook, który jest wykonywany przed wykonaniem asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa dopasowania (np. `toHaveTitle`)
- `params.expectedValue`: wartość przekazywana do dopasowania
- `params.options`: opcje asercji

### afterAssertion

Hook, który jest wykonywany po wykonaniu asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa dopasowania (np. `toHaveTitle`)
- `params.expectedValue`: wartość przekazywana do dopasowania
- `params.options`: opcje asercji
- `params.result`: wyniki asercji
