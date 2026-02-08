---
id: configuration
title: Konfiguracja
---

W zależności od [typu konfiguracji](/docs/setuptypes) (np. używanie surowych protokołów WebDriver, WebdriverIO jako samodzielnego pakietu lub testrunner WDIO) dostępne są różne opcje kontrolowania środowiska.

## Opcje WebDriver

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

Parametry zapytania przekazywane do serwera sterownika.

Typ: `Object`<br />
Domyślnie: `undefined`

### user

Twoja nazwa użytkownika usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [TestMu AI](https://www.testmuai.com/)). Jeśli ustawiona, WebdriverIO automatycznie skonfiguruje opcje połączenia za Ciebie. Jeśli nie korzystasz z dostawcy chmury, może być używana do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### key

Twój klucz dostępu lub klucz tajny do usługi w chmurze (działa tylko dla kont [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) lub [TestMu AI](https://www.testmuai.com/)). Jeśli ustawiony, WebdriverIO automatycznie skonfiguruje opcje połączenia za Ciebie. Jeśli nie korzystasz z dostawcy chmury, może być używany do uwierzytelnienia dowolnego innego backendu WebDrivera.

Typ: `String`<br />
Domyślnie: `undefined`

### capabilities

Definiuje możliwości, które chcesz uruchomić w swojej sesji WebDrivera. Sprawdź [Protokół WebDriver](https://w3c.github.io/webdriver/#capabilities), aby uzyskać więcej szczegółów. Jeśli używasz starszego sterownika, który nie obsługuje protokołu WebDriver, musisz użyć [możliwości JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), aby pomyślnie uruchomić sesję.

Oprócz możliwości opartych na WebDriver, możesz zastosować opcje specyficzne dla przeglądarki i dostawcy, które pozwalają na głębszą konfigurację zdalnej przeglądarki lub urządzenia. Są one udokumentowane w odpowiednich dokumentach dostawców, np.:

- `goog:chromeOptions`: dla [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: dla [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: dla [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: dla [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: dla [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: dla [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Dodatkowo, przydatnym narzędziem jest [Konfigurator Automatycznych Testów](https://docs.saucelabs.com/basics/platform-configurator/) od Sauce Labs, który pomaga stworzyć ten obiekt poprzez wybieranie pożądanych możliwości.

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

Jeśli uruchamiasz testy webowe lub natywne na urządzeniach mobilnych, `capabilities` różnią się od protokołu WebDriver. Zobacz [Dokumentację Appium](https://appium.io/docs/en/latest/guides/caps/) aby uzyskać więcej szczegółów.

### logLevel

Poziom szczegółowości logowania.

Typ: `String`<br />
Domyślnie: `info`<br />
Opcje: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Katalog do przechowywania wszystkich plików logów testrunner (w tym logów reporterów i logów `wdio`). Jeśli nie jest ustawiony, wszystkie logi są przesyłane do `stdout`. Ponieważ większość reporterów jest skonfigurowana do logowania do `stdout`, zalecane jest używanie tej opcji tylko dla określonych reporterów, gdzie bardziej sensowne jest zapisywanie raportów do pliku (jak na przykład reporter `junit`).

W trybie standalone, jedynym generowanym logiem przez WebdriverIO będzie log `wdio`.

Typ: `String`<br />
Domyślnie: `null`

### connectionRetryTimeout

Limit czasu dla dowolnego żądania WebDrivera do sterownika lub grida.

Typ: `Number`<br />
Domyślnie: `120000`

### connectionRetryCount

Maksymalna liczba prób ponowienia żądania do serwera Selenium.

Typ: `Number`<br />
Domyślnie: `3`

### agent

Pozwala na użycie niestandardowego agenta `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) do wykonywania żądań.

Typ: `Object`<br />
Domyślnie:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Określa niestandardowe nagłówki `headers` przekazywane do każdego żądania WebDrivera. Jeśli Twój Grid Selenium wymaga Uwierzytelnienia Podstawowego, zalecamy przekazanie nagłówka `Authorization` przez tę opcję w celu uwierzytelnienia żądań WebDrivera, np.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Odczytaj nazwę użytkownika i hasło ze zmiennych środowiskowych
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Połącz nazwę użytkownika i hasło separatorem dwukropka
const credentials = `${username}:${password}`;
// Zakoduj poświadczenia używając Base64
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

Funkcja przechwytująca [opcje żądania HTTP](https://github.com/sindresorhus/got#options) przed wykonaniem żądania WebDrivera.

Typ: `(RequestOptions) => RequestOptions`<br />
Domyślnie: *brak*

### transformResponse

Funkcja przechwytująca obiekty odpowiedzi HTTP po otrzymaniu odpowiedzi WebDrivera. Funkcja otrzymuje oryginalny obiekt odpowiedzi jako pierwszy argument i odpowiadające mu `RequestOptions` jako drugi argument.

Typ: `(Response, RequestOptions) => Response`<br />
Domyślnie: *brak*

### strictSSL

Określa, czy wymagane jest, aby certyfikat SSL był ważny.
Może być ustawione za pomocą zmiennych środowiskowych jako `STRICT_SSL` lub `strict_ssl`.

Typ: `Boolean`<br />
Domyślnie: `true`

### enableDirectConnect

Określa, czy włączyć [funkcję bezpośredniego połączenia Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Nie robi nic, jeśli odpowiedź nie ma odpowiednich kluczy, podczas gdy flaga jest włączona.

Typ: `Boolean`<br />
Domyślnie: `true`

### cacheDir

Ścieżka do katalogu głównego pamięci podręcznej. Ten katalog jest używany do przechowywania wszystkich sterowników, które są pobierane podczas próby rozpoczęcia sesji.

Typ: `String`<br />
Domyślnie: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Dla bezpieczniejszego logowania, wyrażenia regularne ustawione za pomocą `maskingPatterns` mogą zasłonić poufne informacje z dziennika.
 - Format ciągu to wyrażenie regularne z flagami lub bez (np. `/.../i`) i oddzielone przecinkami dla wielu wyrażeń regularnych.
 - Więcej szczegółów na temat wzorców maskowania znajdziesz w [sekcji Masking Patterns w README Loggera WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Definiuj protokół, którego chcesz użyć do automatyzacji przeglądarki. Obecnie obsługiwany jest tylko [`webdriver`](https://www.npmjs.com/package/webdriver), ponieważ jest to główna technologia automatyzacji przeglądarki używana przez WebdriverIO.

Jeśli chcesz automatyzować przeglądarkę za pomocą innej technologii automatyzacji, upewnij się, że ustawiłeś tę właściwość na ścieżkę, która prowadzi do modułu zgodnego z następującym interfejsem:

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
     * @param {Function} hook który pozwala modyfikować klienta przed zwolnieniem z funkcji
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

Skróć wywołania polecenia `url` ustawiając bazowy URL.
- Jeśli Twój parametr `url` zaczyna się od `/`, to `baseUrl` jest dołączany na początku (z wyjątkiem ścieżki `baseUrl`, jeśli ją ma).
- Jeśli Twój parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), to pełny `baseUrl` jest dołączany bezpośrednio na początku.

Typ: `String`<br />
Domyślnie: `null`

### waitforTimeout

Domyślny limit czasu dla wszystkich poleceń `waitFor*`. (Zwróć uwagę na małą literę `f` w nazwie opcji.) Ten limit czasu __tylko__ wpływa na polecenia zaczynające się od `waitFor*` i ich domyślny czas oczekiwania.

Aby zwiększyć limit czasu dla _testu_, zapoznaj się z dokumentacją frameworka.

Typ: `Number`<br />
Domyślnie: `5000`

### waitforInterval

Domyślny interwał dla wszystkich poleceń `waitFor*` do sprawdzania, czy oczekiwany stan (np. widoczność) uległ zmianie.

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

## Opcje Testrunner

Następujące opcje (w tym te wymienione powyżej) są zdefiniowane tylko dla uruchamiania WebdriverIO z testrunnerem WDIO:

### specs

Definiuje pliki specyfikacji do wykonania testów. Możesz określić wzorzec glob, aby dopasować wiele plików naraz, lub owinąć glob lub zestaw ścieżek w tablicę, aby uruchomić je w ramach jednego procesu roboczego. Wszystkie ścieżki są traktowane jako względne od ścieżki pliku konfiguracyjnego.

Typ: `(String | String[])[]`<br />
Domyślnie: `[]`

### exclude

Wyklucza specyfikacje z wykonania testów. Wszystkie ścieżki są traktowane jako względne od ścieżki pliku konfiguracyjnego.

Typ: `String[]`<br />
Domyślnie: `[]`

### suites

Obiekt opisujący różne zestawy, które można następnie określić za pomocą opcji `--suite` w interfejsie wiersza poleceń `wdio`.

Typ: `Object`<br />
Domyślnie: `{}`

### capabilities

To samo co sekcja `capabilities` opisana powyżej, z opcją określenia obiektu [`multiremote`](/docs/multiremote) lub wielu sesji WebDrivera w tablicy do równoległego wykonania.

Możesz zastosować te same możliwości specyficzne dla dostawcy i przeglądarki, jak zdefiniowano [powyżej](/docs/configuration#capabilities).

Typ: `Object`|`Object[]`<br />
Domyślnie: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maksymalna liczba wszystkich równolegle działających pracowników.

__Uwaga:__ może to być liczba tak wysoka jak `100`, gdy testy są wykonywane na zewnętrznych dostawcach, takich jak maszyny Sauce Labs. Tam testy nie są testowane na pojedynczej maszynie, ale raczej na wielu maszynach wirtualnych. Jeśli testy mają być uruchamiane na lokalnej maszynie developerskiej, użyj bardziej rozsądnej liczby, takiej jak `3`, `4` lub `5`. Zasadniczo jest to liczba przeglądarek, które będą jednocześnie uruchamiane i wykonywać Twoje testy w tym samym czasie, więc zależy to od ilości pamięci RAM na Twojej maszynie i od tego, ile innych aplikacji jest uruchomionych na Twojej maszynie.

Możesz również zastosować `maxInstances` w obiektach capability za pomocą możliwości `wdio:maxInstances`. Ograniczy to liczbę równoległych sesji dla tej konkretnej możliwości.

Typ: `Number`<br />
Domyślnie: `100`

### maxInstancesPerCapability

Maksymalna liczba wszystkich równolegle działających pracowników na możliwość.

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

Jeśli chcesz, aby uruchomienie testów zatrzymało się po określonej liczbie niepowodzeń testów, użyj `bail`.
(Domyślnie jest to `0`, co oznacza uruchomienie wszystkich testów niezależnie od wyniku.) **Uwaga:** Test w tym kontekście to wszystkie testy w ramach jednego pliku specyfikacji (podczas używania Mocha lub Jasmine) lub wszystkie kroki w pliku funkcji (podczas używania Cucumber). Jeśli chcesz kontrolować zachowanie bail w ramach testów w pojedynczym pliku testowym, zapoznaj się z dostępnymi opcjami [frameworków](frameworks).

Typ: `Number`<br />
Domyślnie: `0` (nie zatrzymuje; uruchamia wszystkie testy)

### specFileRetries

Liczba prób ponowienia całego pliku specyfikacji, gdy całość kończy się niepowodzeniem.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDelay

Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji.

Typ: `Number`<br />
Domyślnie: `0`

### specFileRetriesDeferred

Określa, czy powtórzone pliki specyfikacji powinny być powtarzane natychmiast, czy odłożone na koniec kolejki.

Typ: `Boolean`<br />
Domyślnie: `true`

### groupLogsByTestSpec

Wybierz widok wyjścia dziennika.

Jeśli ustawione na `false`, logi z różnych plików testowych będą drukowane w czasie rzeczywistym. Należy pamiętać, że może to prowadzić do mieszania wyjść logów z różnych plików podczas równoległego uruchamiania.

Jeśli ustawione na `true`, wyjścia logów będą grupowane według specyfikacji testowej i drukowane tylko po zakończeniu specyfikacji testowej.

Domyślnie jest ustawione na `false`, więc logi są drukowane w czasie rzeczywistym.

Typ: `Boolean`<br />
Domyślnie: `false`

### autoAssertOnTestEnd

Kontroluje, czy WebdriverIO automatycznie sprawdza wszystkie miękkie asercje na końcu każdego testu. Gdy ustawione na `true`, wszystkie zgromadzone miękkie asercje zostaną automatycznie sprawdzone i spowodują niepowodzenie testu, jeśli którakolwiek z asercji się nie powiedzie. Gdy ustawione na `false`, musisz ręcznie wywołać metodę assert, aby sprawdzić miękkie asercje.

Typ: `Boolean`<br />
Domyślnie: `true`

### services

Usługi przejmują określoną pracę, o którą nie chcesz się martwić. Ulepszają Twoją konfigurację testową prawie bez wysiłku.

Typ: `String[]|Object[]`<br />
Domyślnie: `[]`

### framework

Definiuje framework testowy, który ma być używany przez testrunner WDIO.

Typ: `String`<br />
Domyślnie: `mocha`<br />
Opcje: `mocha` | `jasmine`

### mochaOpts, jasmineOpts i cucumberOpts

Opcje specyficzne dla frameworka. Zobacz dokumentację adaptera frameworka, aby dowiedzieć się, które opcje są dostępne. Przeczytaj więcej na ten temat w [Frameworkach](frameworks).

Typ: `Object`<br />
Domyślnie: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista funkcji cucumber z numerami linii (podczas [używania frameworka cucumber](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Domyślnie: `[]`

### reporters

Lista reporterów do użycia. Reporter może być albo ciągiem znaków, albo tablicą
`['reporterName', { /* opcje reportera */}]`, gdzie pierwszy element to ciąg z nazwą reportera, a drugi element to obiekt z opcjami reportera.

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

Określa, w jakim interwale reporter powinien sprawdzać, czy są zsynchronizowane, jeśli raportują swoje dzienniki asynchronicznie (np. jeśli dzienniki są przesyłane do dostawcy zewnętrznego).

Typ: `Number`<br />
Domyślnie: `100` (ms)

### reporterSyncTimeout

Określa maksymalny czas, jaki reportery mają na zakończenie przesyłania wszystkich swoich dzienników, zanim zostanie zgłoszony błąd przez testrunner.

Typ: `Number`<br />
Domyślnie: `5000` (ms)

### execArgv

Argumenty Node do określenia podczas uruchamiania procesów podrzędnych.

Typ: `String[]`<br />
Domyślnie: `null`

### filesToWatch

Lista wzorców ciągów obsługujących glob, które informują testrunner, aby dodatkowo obserwował inne pliki, np. pliki aplikacji, podczas uruchamiania go z flagą `--watch`. Domyślnie testrunner już obserwuje wszystkie pliki specyfikacji.

Typ: `String[]`<br />
Domyślnie: `[]`

### updateSnapshots

Ustaw na true, jeśli chcesz zaktualizować swoje snapshoty. Idealnie używany jako parametr CLI, np. `wdio run wdio.conf.js --s`.

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
Domyślnie: przechowuje pliki snapshotów w katalogu `__snapshots__` obok pliku testowego

### tsConfigPath

WDIO używa `tsx` do kompilacji plików TypeScript. Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego, ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH.

Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Domyślnie: `null`<br />

## Hooki

Testrunner WDIO pozwala na ustawienie hooków, które są wyzwalane w określonych momentach cyklu życia testu. Pozwala to na niestandardowe działania (np. wykonanie zrzutu ekranu, jeśli test się nie powiedzie).

Każdy hook ma jako parametr konkretne informacje o cyklu życia (np. informacje o zestawie testów lub teście). Przeczytaj więcej o wszystkich właściwościach hooków w [naszej przykładowej konfiguracji](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Uwaga:** Niektóre hooki (`onPrepare`, `onWorkerStart`, `onWorkerEnd` i `onComplete`) są wykonywane w innym procesie i dlatego nie mogą dzielić żadnych globalnych danych z innymi hookami, które działają w procesie roboczym.

### onPrepare

Wykonywany jednorazowo przed uruchomieniem wszystkich pracowników.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `param` (`object[]`): lista szczegółów możliwości

### onWorkerStart

Wykonywany przed uruchomieniem procesu roboczego i może być używany do inicjalizacji konkretnej usługi dla tego pracownika, a także do modyfikacji środowisk wykonawczych w sposób asynchroniczny.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym
- `args` (`object`): obiekt, który zostanie scalony z główną konfiguracją po inicjalizacji pracownika
- `execArgv` (`string[]`): lista argumentów ciągu przekazanych do procesu roboczego

### onWorkerEnd

Wykonywany zaraz po zakończeniu procesu roboczego.

Parametry:

- `cid` (`string`): identyfikator możliwości (np. 0-0)
- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `specs` (`string[]`): specyfikacje uruchomione w procesie roboczym
- `retries` (`number`): liczba ponownych prób specyfikacji użytych zgodnie z definicją w [_"Dodaj ponowne próby na poziomie pliku specyfikacji"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Wykonywany tuż przed inicjalizacją sesji webdriver i frameworka testowego. Pozwala manipulować konfiguracjami w zależności od możliwości lub specyfikacji.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym

### before

Wykonywany przed rozpoczęciem wykonania testu. W tym momencie możesz uzyskać dostęp do wszystkich zmiennych globalnych takich jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.

Parametry:

- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
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

Hook, który jest wykonywany *po* zakończeniu hooka w ramach zestawu (np. uruchamia się po wywołaniu afterEach w Mocha)

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
- `args` (`*`): argumenty, które polecenie otrzymałoby

### afterCommand

Uruchamia się po wykonaniu polecenia WebdriverIO.

Parametry:

- `commandName` (`string`): nazwa polecenia
- `args` (`*`): argumenty, które polecenie otrzymałoby
- `result` (`*`): wynik polecenia
- `error` (`Error`): obiekt błędu, jeśli wystąpił

### afterTest

Funkcja do wykonania po zakończeniu testu (w Mocha/Jasmine).

Parametry:

- `test` (`object`): szczegóły testu
- `context` (`object`): obiekt zakresu, z którym test został wykonany
- `result.error` (`Error`): obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
- `result.result` (`Any`): obiekt zwrotny funkcji testowej
- `result.duration` (`Number`): czas trwania testu
- `result.passed` (`Boolean`): true jeśli test został zaliczony, w przeciwnym razie false
- `result.retries` (`Object`): informacje o pojedynczych ponownych próbach testu zgodnie z definicją dla [Mocha i Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) oraz [Cucumber](./Retry.md#rerunning-in-cucumber), np. `{ attempts: 0, limit: 0 }`, zobacz
- `result` (`object`): wynik hooka (zawiera właściwości `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, który jest wykonywany po zakończeniu zestawu (tylko w Mocha/Jasmine)

Parametry:

- `suite` (`object`): szczegóły zestawu

### after

Wykonywany po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych z testu.

Parametry:

- `result` (`number`): 0 - test zaliczony, 1 - test nie zaliczony
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym

### afterSession

Wykonywany zaraz po zakończeniu sesji webdriver.

Parametry:

- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
- `specs` (`string[]`): specyfikacje do uruchomienia w procesie roboczym

### onComplete

Wykonywany po zamknięciu wszystkich pracowników i przed zakończeniem procesu. Błąd zgłoszony w hooku onComplete spowoduje niepowodzenie uruchomienia testu.

Parametry:

- `exitCode` (`number`): 0 - sukces, 1 - niepowodzenie
- `config` (`object`): obiekt konfiguracyjny WebdriverIO
- `caps` (`object`): zawierający możliwości dla sesji, która zostanie uruchomiona w procesie roboczym
- `result` (`object`): obiekt wyników zawierający wyniki testów

### onReload

Wykonywany, gdy następuje odświeżenie.

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
- `context` (`object`): obiekt Cucumber World

### afterScenario

Uruchamia się po scenariuszu Cucumber.

Parametry:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): obiekt świata zawierający informacje o pickle i kroku testowym
- `result` (`object`): obiekt wyników zawierający wyniki scenariusza
- `result.passed` (`boolean`): true jeśli scenariusz został zaliczony
- `result.error` (`string`): stos błędów, jeśli scenariusz się nie powiódł
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt Cucumber World

### beforeStep

Uruchamia się przed krokiem Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `context` (`object`): obiekt Cucumber World

### afterStep

Uruchamia się po kroku Cucumber.

Parametry:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): obiekt kroku Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): obiekt scenariusza Cucumber
- `result`: (`object`): obiekt wyników zawierający wyniki kroku
- `result.passed` (`boolean`): true jeśli scenariusz został zaliczony
- `result.error` (`string`): stos błędów, jeśli scenariusz się nie powiódł
- `result.duration` (`number`): czas trwania scenariusza w milisekundach
- `context` (`object`): obiekt Cucumber World

### beforeAssertion

Hook, który jest wykonywany przed asercją WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera (np. `toHaveTitle`)
- `params.expectedValue`: wartość przekazywana do matchera
- `params.options`: opcje asercji

### afterAssertion

Hook, który jest wykonywany po asercji WebdriverIO.

Parametry:

- `params`: informacje o asercji
- `params.matcherName` (`string`): nazwa matchera (np. `toHaveTitle`)
- `params.expectedValue`: wartość przekazywana do matchera
- `params.options`: opcje asercji
- `params.result`: wyniki asercji