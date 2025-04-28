---
id: frameworks
title: Frameworki
---

WebdriverIO Runner ma wbudowane wsparcie dla [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) i [Cucumber.js](https://cucumber.io/). Możesz również zintegrować go z zewnętrznymi frameworkami open-source, takimi jak [Serenity/JS](#using-serenityjs).

:::tip Integracja WebdriverIO z frameworkami testowymi
Aby zintegrować WebdriverIO z frameworkiem testowym, potrzebujesz pakietu adaptera dostępnego na NPM.
Pamiętaj, że pakiet adaptera musi być zainstalowany w tym samym miejscu, gdzie jest zainstalowane WebdriverIO.
Więc jeśli zainstalowałeś WebdriverIO globalnie, upewnij się, że również zainstalowałeś pakiet adaptera globalnie.
:::

Integracja WebdriverIO z frameworkiem testowym pozwala na dostęp do instancji WebDrivera przy użyciu globalnej zmiennej `browser`
w plikach specyfikacji lub definicjach kroków.
Zauważ, że WebdriverIO zajmie się również tworzeniem i kończeniem sesji Selenium, więc nie musisz tego robić
samodzielnie.

## Używanie Mocha

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Domyślnie WebdriverIO dostarcza [bibliotekę asercji](assertion), która jest wbudowana i z której możesz korzystać od razu:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO obsługuje interfejsy Mocha `BDD` (domyślny), `TDD` i `QUnit` [interfaces](https://mochajs.org/#interfaces).

Jeśli chcesz pisać swoje specyfikacje w stylu TDD, ustaw właściwość `ui` w konfiguracji `mochaOpts` na `tdd`. Teraz twoje pliki testowe powinny być napisane w następujący sposób:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Jeśli chcesz zdefiniować inne ustawienia specyficzne dla Mocha, możesz to zrobić za pomocą klucza `mochaOpts` w pliku konfiguracyjnym. Listę wszystkich opcji można znaleźć na [stronie projektu Mocha](https://mochajs.org/api/mocha).

__Uwaga:__ WebdriverIO nie wspiera przestarzałego używania callbacków `done` w Mocha:

```js
it('should test something', (done) => {
    done() // wyrzuca "done is not a function"
})
```

### Opcje Mocha

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Mocha. __Uwaga:__ nie wszystkie opcje są obsługiwane, np. zastosowanie opcji `parallel` spowoduje błąd, ponieważ testrunner WDIO ma własny sposób uruchamiania testów równolegle. Możesz przekazywać te opcje frameworka jako argumenty, np.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

To przekaże następujące opcje Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Obsługiwane są następujące opcje Mocha:

#### require
Opcja `require` jest przydatna, gdy chcesz dodać lub rozszerzyć podstawową funkcjonalność (opcja frameworka WebdriverIO).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Używaj podanego modułu (lub modułów) do kompilacji plików. Kompilatory zostaną dołączone przed wymogami (opcja frameworka WebdriverIO).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Propagowanie nieobsłużonych błędów.

Type: `boolean`<br />
Default: `false`

#### bail
Zakończ po pierwszym nieudanym teście.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Sprawdź wycieki zmiennych globalnych.

Type: `boolean`<br />
Default: `false`

#### delay
Opóźnij wykonanie głównego zestawu.

Type: `boolean`<br />
Default: `false`

#### fgrep
Filtrowanie testów według danego ciągu znaków.

Type: `string`<br />
Default: `null`

#### forbidOnly
Testy oznaczone jako `only` powodują niepowodzenie zestawu.

Type: `boolean`<br />
Default: `false`

#### forbidPending
Oczekujące testy powodują niepowodzenie zestawu.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Pełny ślad stosu przy niepowodzeniu.

Type: `boolean`<br />
Default: `false`

#### global
Zmienne oczekiwane w globalnym zakresie.

Type: `string[]`<br />
Default: `[]`

#### grep
Filtrowanie testów za pomocą wyrażenia regularnego.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Odwróć dopasowania filtra testów.

Type: `boolean`<br />
Default: `false`

#### retries
Liczba powtórzeń nieudanych testów.

Type: `number`<br />
Default: `0`

#### timeout
Wartość progu limitu czasu (w ms).

Type: `number`<br />
Default: `30000`

## Używanie Jasmine

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Następnie możesz skonfigurować swoje środowisko Jasmine, ustawiając właściwość `jasmineOpts` w konfiguracji. Listę wszystkich opcji można znaleźć na [stronie projektu Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Opcje Jasmine

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Jasmine za pomocą właściwości `jasmineOpts`. Aby uzyskać więcej informacji na temat tych opcji konfiguracyjnych, sprawdź [dokumentację Jasmine](https://jasmine.github.io/api/edge/Configuration). Możesz przekazywać te opcje frameworka jako argumenty, np.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

To przekaże następujące opcje Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Obsługiwane są następujące opcje Jasmine:

#### defaultTimeoutInterval
Domyślny interwał limitu czasu dla operacji Jasmine.

Type: `number`<br />
Default: `60000`

#### helpers
Tablica ścieżek plików (i wzorców glob) względem spec_dir do dołączenia przed specyfikacjami jasmine.

Type: `string[]`<br />
Default: `[]`

#### requires
Opcja `requires` jest przydatna, gdy chcesz dodać lub rozszerzyć podstawową funkcjonalność.

Type: `string[]`<br />
Default: `[]`

#### random
Czy losować kolejność wykonywania specyfikacji.

Type: `boolean`<br />
Default: `true`

#### seed
Ziarno do użycia jako podstawa losowości. Null powoduje, że ziarno jest określane losowo na początku wykonania.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Czy specyfikacja ma zakończyć się niepowodzeniem, jeśli nie uruchomiła żadnych oczekiwań. Domyślnie specyfikacja, która nie uruchomiła żadnych oczekiwań, jest raportowana jako zaliczona. Ustawienie tego na true spowoduje zgłoszenie takiej specyfikacji jako niepowodzenia.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Czy specyfikacje mają mieć tylko jedno niepowodzenie oczekiwania.

Type: `boolean`<br />
Default: `false`

#### specFilter
Funkcja do filtrowania specyfikacji.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Uruchamiaj tylko testy pasujące do tego ciągu znaków lub wyrażenia regularnego. (Dotyczy tylko przypadków, gdy nie jest ustawiona niestandardowa funkcja `specFilter`)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Jeśli ma wartość true, odwraca dopasowywanie testów i uruchamia tylko testy, które nie pasują do wyrażenia użytego w `grep`. (Dotyczy tylko przypadków, gdy nie jest ustawiona niestandardowa funkcja `specFilter`)

Type: `boolean`<br />
Default: `false`

## Używanie Cucumber

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Jeśli chcesz używać Cucumber, ustaw właściwość `framework` na `cucumber`, dodając `framework: 'cucumber'` do [pliku konfiguracyjnego](configurationfile).

Opcje dla Cucumber można podać w pliku konfiguracyjnym za pomocą `cucumberOpts`. Sprawdź pełną listę opcji [tutaj](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Aby szybko rozpocząć pracę z Cucumber, zapoznaj się z naszym projektem [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), który zawiera wszystkie definicje kroków, jakich potrzebujesz na start, i będziesz mógł od razu pisać pliki funkcji.

### Opcje Cucumber

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Cucumber za pomocą właściwości `cucumberOpts`:

:::tip Dostosowywanie opcji przez wiersz poleceń
Opcje `cucumberOpts`, takie jak niestandardowe `tags` do filtrowania testów, można określić za pomocą wiersza poleceń. Można to osiągnąć, używając formatu `cucumberOpts.{nazwaOpcji}="wartość"`.

Na przykład, jeśli chcesz uruchomić tylko testy oznaczone tagiem `@smoke`, możesz użyć następującego polecenia:

```sh
# Gdy chcesz uruchomić tylko testy z tagiem "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

To polecenie ustawia opcję `tags` w `cucumberOpts` na `@smoke`, zapewniając, że tylko testy z tym tagiem są wykonywane.

:::

#### backtrace
Pokaż pełny backtrace dla błędów.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Wymagaj modułów przed wymaganiem jakichkolwiek plików wsparcia.

Type: `string[]`<br />
Default: `[]`<br />
Example:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // lub
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Przerwij wykonywanie po pierwszym niepowodzeniu.

Type: `boolean`<br />
Default: `false`

#### name
Wykonuj tylko scenariusze z nazwą pasującą do wyrażenia (powtarzalne).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Wymagaj plików zawierających definicje kroków przed wykonaniem funkcji. Możesz również określić wzorzec glob dla swoich definicji kroków.

Type: `string[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Ścieżki do miejsc, gdzie znajduje się twój kod wsparcia, dla ESM.

Type: `String[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Niepowodzenie, jeśli istnieją niezdefiniowane lub oczekujące kroki.

Type: `boolean`<br />
Default: `false`

#### tags
Wykonuj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia.
Więcej informacji znajdziesz w [dokumentacji Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions).

Type: `String`<br />
Default: ``

#### timeout
Limit czasu w milisekundach dla definicji kroków.

Type: `Number`<br />
Default: `30000`

#### retry
Określ liczbę ponownych prób nieudanych przypadków testowych.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Powtarzaj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia (powtarzalne). Ta opcja wymaga określenia '--retry'.

Type: `RegExp`

#### language
Domyślny język dla twoich plików funkcji

Type: `String`<br />
Default: `en`

#### order
Uruchamiaj testy w zdefiniowanej / losowej kolejności

Type: `String`<br />
Default: `defined`

#### format
Nazwa i ścieżka pliku wyjściowego formatera do użycia.
WebdriverIO obsługuje głównie tylko [Formatterów](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), którzy zapisują dane wyjściowe do pliku.

Type: `string[]`<br />

#### formatOptions
Opcje do dostarczenia formatterom

Type: `object`<br />

#### tagsInTitle
Dodaj tagi cucumber do nazwy funkcji lub scenariusza

Type: `Boolean`<br />
Default: `false`

***Proszę zauważyć, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samego cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Traktuj niezdefiniowane definicje jako ostrzeżenia.

Type: `Boolean`<br />
Default: `false`

***Proszę zauważyć, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samego cucumber-js***<br/>

#### failAmbiguousDefinitions
Traktuj niejednoznaczne definicje jako błędy.

Type: `Boolean`<br />
Default: `false`

***Proszę zauważyć, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samego cucumber-js***<br/>

#### tagExpression
Wykonuj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia.
Więcej informacji znajdziesz w [dokumentacji Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions).

Type: `String`<br />
Default: ``

***Proszę zauważyć, że ta opcja będzie przestarzała w przyszłości. Zamiast tego użyj właściwości konfiguracyjnej [`tags`](#tags)***

#### profile
Określ profil do użycia.

Type: `string[]`<br />
Default: `[]`

***Uprzejmie zauważ, że tylko określone wartości (worldParameters, name, retryTagFilter) są obsługiwane w profilach, ponieważ `cucumberOpts` ma pierwszeństwo. Dodatkowo, korzystając z profilu, upewnij się, że wymienione wartości nie są zadeklarowane w ramach `cucumberOpts`.***

### Pomijanie testów w cucumber

Zauważ, że jeśli chcesz pominąć test za pomocą zwykłych funkcji filtrowania testów Cucumber dostępnych w `cucumberOpts`, zrobisz to dla wszystkich przeglądarek i urządzeń skonfigurowanych w możliwościach. Aby móc pomijać scenariusze tylko dla określonych kombinacji możliwości bez konieczności rozpoczynania sesji, jeśli nie jest to konieczne, webdriverio zapewnia następującą specyficzną składnię tagów dla cucumber:

`@skip([condition])`

gdzie condition jest opcjonalną kombinacją właściwości capabilities z ich wartościami, które gdy **wszystkie** zostaną dopasowane, spowodują pominięcie oznaczonego scenariusza lub funkcji. Oczywiście możesz dodać kilka tagów do scenariuszy i funkcji, aby pomijać testy w różnych warunkach.

Możesz również użyć adnotacji '@skip' do pomijania testów bez zmiany `tagExpression`. W tym przypadku pominięte testy będą wyświetlane w raporcie testowym.

Oto kilka przykładów tej składni:
- `@skip` lub `@skip()`: zawsze pominie oznaczony element
- `@skip(browserName="chrome")`: test nie zostanie wykonany na przeglądarkach chrome.
- `@skip(browserName="firefox";platformName="linux")`: pominie test w wykonaniach firefox na linuxie.
- `@skip(browserName=["chrome","firefox"])`: oznaczone elementy zostaną pominięte zarówno dla przeglądarek chrome, jak i firefox.
- `@skip(browserName=/i.*explorer/)`: możliwości z przeglądarkami pasującymi do wyrażenia regularnego zostaną pominięte (jak `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Import pomocnika definicji kroków

Aby używać pomocnika definicji kroków, takiego jak `Given`, `When` lub `Then` lub hooki, musisz je zaimportować z `@cucumber/cucumber`, np. w ten sposób:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Teraz, jeśli używasz już Cucumber do innych rodzajów testów niezwiązanych z WebdriverIO, dla których używasz określonej wersji, musisz importować te pomocniki w swoich testach e2e z pakietu WebdriverIO Cucumber, np.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Zapewnia to, że używasz właściwych pomocników w ramach frameworka WebdriverIO i pozwala używać niezależnej wersji Cucumber dla innych rodzajów testów.

### Publikowanie raportu

Cucumber oferuje funkcję publikowania raportów z testów na stronie `https://reports.cucumber.io/`, którą można kontrolować albo przez ustawienie flagi `publish` w `cucumberOpts`, albo przez skonfigurowanie zmiennej środowiskowej `CUCUMBER_PUBLISH_TOKEN`. Jednak gdy używasz `WebdriverIO` do wykonywania testów, istnieje ograniczenie w tym podejściu. Aktualizuje ono raporty osobno dla każdego pliku funkcji, co utrudnia przeglądanie skonsolidowanego raportu.

Aby rozwiązać to ograniczenie, wprowadziliśmy metodę opartą na promise o nazwie `publishCucumberReport` w `@wdio/cucumber-framework`. Ta metoda powinna być wywoływana w hooku `onComplete`, który jest optymalnym miejscem do jej wywołania. `publishCucumberReport` wymaga wprowadzenia katalogu raportu, w którym przechowywane są raporty komunikatów cucumber.

Możesz generować raporty `cucumber message` poprzez skonfigurowanie opcji `format` w `cucumberOpts`. Zdecydowanie zaleca się podanie dynamicznej nazwy pliku w opcji formatu `cucumber message`, aby zapobiec nadpisywaniu raportów i zapewnić dokładne rejestrowanie każdego przebiegu testu.

Przed użyciem tej funkcji upewnij się, że ustawione są następujące zmienne środowiskowe:
- CUCUMBER_PUBLISH_REPORT_URL: URL, pod którym chcesz opublikować raport Cucumber. Jeśli nie podano, zostanie użyty domyślny URL 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Token autoryzacyjny wymagany do publikacji raportu. Jeśli ten token nie jest ustawiony, funkcja zakończy działanie bez publikowania raportu.

Oto przykład niezbędnych konfiguracji i przykładów kodu do implementacji:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Inne opcje konfiguracyjne
    cucumberOpts: {
        // ... Konfiguracja opcji Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Proszę zauważyć, że `./reports/` to katalog, w którym będą przechowywane raporty `cucumber message`.

## Używanie Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) to framework open-source zaprojektowany, aby uczynić testowanie akceptacyjne i regresyjne złożonych systemów oprogramowania szybszym, bardziej współpracującym i łatwiejszym do skalowania.

Dla zestawów testowych WebdriverIO, Serenity/JS oferuje:
- [Rozszerzone raportowanie](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Możesz używać Serenity/JS
  jako zamiennika dla dowolnego wbudowanego frameworka WebdriverIO, aby tworzyć szczegółowe raporty z wykonania testów i żywą dokumentację Twojego projektu.
- [API wzorców Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Aby twój kod testowy był przenośny i możliwy do ponownego użycia w różnych projektach i zespołach,
  Serenity/JS oferuje opcjonalną [warstwę abstrakcji](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) na natywnych API WebdriverIO.
- [Biblioteki integracyjne](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Dla zestawów testowych, które podążają za wzorcem Screenplay,
  Serenity/JS zapewnia również opcjonalne biblioteki integracyjne, aby pomóc Ci pisać [testy API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [zarządzać lokalnymi serwerami](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [przeprowadzać asercje](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) i wiele więcej!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Instalacja Serenity/JS

Aby dodać Serenity/JS do [istniejącego projektu WebdriverIO](https://webdriver.io/docs/gettingstarted), zainstaluj następujące moduły Serenity/JS z NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Dowiedz się więcej o modułach Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Konfiguracja Serenity/JS

Aby włączyć integrację z Serenity/JS, skonfiguruj WebdriverIO w następujący sposób:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            // Optional, print test execution results to standard output
            '@serenity-js/console-reporter',

            // Optional, produce Serenity BDD reports and living documentation (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Optional, automatically capture screenshots upon interaction failure
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
</Tabs>

Dowiedz się więcej o:
- [Opcjach konfiguracji Serenity/JS Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opcjach konfiguracji Serenity/JS Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opcjach konfiguracji Serenity/JS Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Pliku konfiguracyjnym WebdriverIO](configurationfile)

### Tworzenie raportów Serenity BDD i żywej dokumentacji

[Raporty Serenity BDD i żywa dokumentacja](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) są generowane przez [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
program Java pobierany i zarządzany przez moduł [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Aby tworzyć raporty Serenity BDD, twój zestaw testowy musi:
- pobrać Serenity BDD CLI, wywołując `serenity-bdd update`, co lokalnie buforuje CLI `jar`
- tworzyć pośrednie raporty Serenity BDD `.json`, rejestrując [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) zgodnie z [instrukcjami konfiguracji](#configuring-serenityjs)
- wywołać Serenity BDD CLI, gdy chcesz wygenerować raport, wywołując `serenity-bdd run`

Wzorzec używany przez wszystkie [szablony projektów Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) opiera się
na użyciu:
- skryptu NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) do pobrania Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) do uruchamiania procesu raportowania nawet jeśli sam zestaw testowy zakończył się niepowodzeniem (co jest dokładnie tym momentem, kiedy najbardziej potrzebujesz raportów testowych...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) jako wygodnej metody do usuwania raportów testów pozostałych z poprzedniego uruchomienia

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Aby dowiedzieć się więcej o `SerenityBDDReporter`, zapoznaj się z:
- instrukcjami instalacji w [dokumentacji `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- przykładami konfiguracji w [dokumentacji API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [przykładami Serenity/JS na GitHubie](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Używanie API wzorca Screenplay w Serenity/JS

[Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) to innowacyjne, skoncentrowane na użytkowniku podejście do pisania wysokiej jakości zautomatyzowanych testów akceptacyjnych. Kieruje Cię w kierunku efektywnego wykorzystania warstw abstrakcji,
pomaga Twoim scenariuszom testowym uchwycić biznesowy żargon Twojej domeny i zachęca do dobrych nawyków w testowaniu i inżynierii oprogramowania w Twoim zespole.

Domyślnie, gdy rejestrujesz `@serenity-js/webdriverio` jako swój `framework` WebdriverIO,
Serenity/JS konfiguruje domyślną [obsadę](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) [aktorów](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
gdzie każdy aktor może:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Powinno to wystarczyć, aby pomóc Ci rozpocząć wprowadzanie scenariuszy testowych, które podążają za wzorcem Screenplay, nawet do istniejącego zestawu testów, na przykład:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Aby dowiedzieć się więcej o wzorcu Screenplay, sprawdź:
- [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Testowanie webowe z Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)