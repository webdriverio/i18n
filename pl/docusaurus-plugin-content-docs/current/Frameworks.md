---
id: frameworks
title: Frameworki
description: "Skonfiguruj Mocha, Jasmine lub Cucumber.js jako framework testowy dla WDIO testrunnera albo zintegruj frameworki zewnętrzne, takie jak Serenity/JS."
---

WebdriverIO Runner ma wbudowaną obsługę [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) i [Cucumber.js](https://cucumber.io/). Możesz go również zintegrować z zewnętrznymi frameworkami open source, takimi jak [Serenity/JS](#using-serenityjs).

:::tip Integracja WebdriverIO z frameworkami testowymi
Aby zintegrować WebdriverIO z frameworkiem testowym, potrzebujesz pakietu adaptera dostępnego w NPM.
Pamiętaj, że pakiet adaptera musi być zainstalowany w tym samym miejscu, w którym zainstalowano WebdriverIO.
Jeśli więc zainstalowałeś WebdriverIO globalnie, pamiętaj, aby również pakiet adaptera zainstalować globalnie.
:::

Integracja WebdriverIO z frameworkiem testowym pozwala uzyskać dostęp do instancji WebDriver za pomocą globalnej zmiennej `browser`
w plikach specyfikacji lub definicjach kroków.
Pamiętaj, że WebdriverIO zajmie się również utworzeniem i zakończeniem sesji Selenium, więc nie musisz robić tego
samodzielnie.

## Korzystanie z Mocha

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Domyślnie WebdriverIO udostępnia wbudowaną [bibliotekę asercji](assertion), z której możesz od razu zacząć korzystać:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 zawiera [Mocha 12](https://mochajs.org/) i obsługuje [interfejsy](https://mochajs.org/#interfaces) Mocha: `BDD` (domyślny), `TDD` oraz `QUnit`.

Jeśli chcesz pisać specyfikacje w stylu TDD, ustaw właściwość `ui` w konfiguracji `mochaOpts` na `tdd`. Wtedy pliki testowe powinny wyglądać tak:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Jeśli chcesz zdefiniować inne ustawienia specyficzne dla Mocha, możesz to zrobić za pomocą klucza `mochaOpts` w pliku konfiguracyjnym. Listę wszystkich opcji znajdziesz na [stronie projektu Mocha](https://mochajs.org/api/mocha).

__Uwaga:__ WebdriverIO nie obsługuje przestarzałego użycia callbacków `done` w Mocha:

```js
it('should test something', (done) => {
    done() // rzuca błąd "done is not a function"
})
```

### Opcje Mocha

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Mocha. __Uwaga:__ nie wszystkie opcje Mocha są obsługiwane. `parallel` nadal należy do własnej puli workerów Mocha i spowoduje tu błąd — WDIO testrunner już równolegle uruchamia specyfikacje w ramach capabilities i workerów. CLI Mocha 12 przeszło także z yargs na `util.parseArgs` z Node; dotyczy to jedynie bezpośredniego wywołania `mocha`, a nie `mochaOpts` przekazywanych przez `wdio`. Możesz przekazać te opcje frameworka jako argumenty, np.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Spowoduje to przekazanie następujących opcji Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Obsługiwane są następujące opcje Mocha:

#### require

<Option type="string|string[]" default="[]">

Opcja `require` jest przydatna, gdy chcesz dodać lub rozszerzyć jakąś podstawową funkcjonalność (opcja frameworka WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Propaguj nieprzechwycone błędy.

</Option>

#### bail

<Option type="boolean" default="false">

Przerwij po pierwszym nieudanym teście.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Sprawdzaj wycieki zmiennych globalnych.

</Option>

#### delay

<Option type="boolean" default="false">

Opóźnij wykonanie głównego zestawu testów (root suite).

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Raportuj każdy test pominięty z powodu nieudanego hooka `before` lub `beforeEach` jako niepowodzenie. WebdriverIO włącza tę opcję, aby uszkodzony hook przygotowujący był widoczny przy każdej pominiętej przez niego specyfikacji. Ustaw ją na `false`, aby raportować tylko hook.

</Option>

#### fgrep

<Option type="string" default="null">

Filtr testów na podstawie podanego ciągu znaków.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Testy oznaczone jako `only` powodują niepowodzenie zestawu.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Oczekujące (pending) testy powodują niepowodzenie zestawu.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Pełny stacktrace w razie niepowodzenia.

</Option>

#### global

<Option type="string[]" default="[]">

Zmienne oczekiwane w zasięgu globalnym.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Filtr testów na podstawie podanego wyrażenia regularnego. Mocha 12 akceptuje w tym filtrze nowoczesne flagi RegExp (na przykład `s` lub `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Odwróć dopasowania filtra testów.

</Option>

#### retries

<Option type="number" default="0">

Liczba ponownych prób dla nieudanych testów.

</Option>

#### timeout

<Option type="number" default="30000">

Wartość progu limitu czasu (w ms).

</Option>

## Korzystanie z Jasmine

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Następnie możesz skonfigurować środowisko Jasmine, ustawiając właściwość `jasmineOpts` w konfiguracji. Listę wszystkich opcji znajdziesz na [stronie projektu Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Opcje Jasmine

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Jasmine za pomocą właściwości `jasmineOpts`. Więcej informacji o tych opcjach konfiguracyjnych znajdziesz w [dokumentacji Jasmine](https://jasmine.github.io/api/edge/Configuration). Możesz przekazać te opcje frameworka jako argumenty, np.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Spowoduje to przekazanie następujących opcji Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Obsługiwane są następujące opcje Jasmine:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Domyślny limit czasu dla operacji Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Tablica ścieżek plików (i globów) względnych do spec_dir, które mają zostać dołączone przed specyfikacjami Jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

Opcja `requires` jest przydatna, gdy chcesz dodać lub rozszerzyć jakąś podstawową funkcjonalność.

</Option>

#### random

<Option type="boolean" default="false">

Czy losować kolejność wykonywania specyfikacji. Domyślną wartością w samym Jasmine jest `true`, ale WebdriverIO uruchamia specyfikacje po kolei, chyba że ustawisz tę opcję.

</Option>

#### seed

<Option type="Function" default="null">

Ziarno używane jako podstawa losowania. Wartość null powoduje, że ziarno jest wybierane losowo na początku wykonania.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Czy oznaczać specyfikację jako nieudaną, jeśli nie wykonała żadnych oczekiwań (expectations). Domyślnie specyfikacja, która nie wykonała żadnych oczekiwań, jest raportowana jako zaliczona. Ustawienie tej opcji na true spowoduje raportowanie takiej specyfikacji jako niepowodzenia.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Zatrzymaj specyfikację przy jej pierwszym nieudanym oczekiwaniu. Nieudany synchroniczny matcher zatrzymuje specyfikację natychmiast, a oczekiwany (awaited) asynchroniczny matcher zatrzymuje ją, gdy jego promise zostanie rozstrzygnięty. Pozostałe specyfikacje nadal są uruchamiane.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Funkcja używana do filtrowania specyfikacji.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Uruchamiaj tylko testy pasujące do tego ciągu znaków lub wyrażenia regularnego. (Ma zastosowanie tylko wtedy, gdy nie ustawiono własnej funkcji `specFilter`)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Jeśli ma wartość true, odwraca dopasowanie testów i uruchamia tylko te testy, które nie pasują do wyrażenia użytego w `grep`. (Ma zastosowanie tylko wtedy, gdy nie ustawiono własnej funkcji `specFilter`)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Zatrzymaj plik specyfikacji przy jego pierwszej nieudanej specyfikacji (`it`): pozostałe specyfikacje z pliku nie zostaną uruchomione, także te w innych blokach `describe`. Inne pliki specyfikacji działają we własnych workerach i są kontynuowane.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Usuwaj linie pakietów z `node_modules` ze stack trace'ów niepowodzeń.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Wywoływana z argumentami `(passed, assertion)` dla każdego oczekiwania, na przykład w celu zrobienia zrzutu ekranu, gdy oczekiwanie się nie powiedzie. Jeśli funkcja rzuci błąd dla zaliczonego oczekiwania, oczekiwanie zakończy się niepowodzeniem z tym błędem.

</Option>

### Asercje

W Jasmine globalne `expect` łączy matchery Jasmine i [matchery WebdriverIO](/docs/api/expect-webdriverio):

- Matchery Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) oraz matchery dodane za pomocą `jasmine.addMatchers` są synchroniczne. Zwracają `undefined`, więc nie potrzebujesz `await`.
- Matchery WebdriverIO, asynchroniczne matchery Jasmine (`toBeResolved`, `toBeRejectedWith`, …) oraz matchery dodane za pomocą `jasmine.addAsyncMatchers` zwracają promise. Zawsze używaj z nimi `await`.

Używaj `expect()` dla obu rodzajów: kieruje on każdy matcher do `expect` lub `expectAsync` Jasmine za ciebie. `await expectAsync($('#logo')).toBeDisplayed()` również działa. W przypadku TypeScriptu `@wdio/jasmine-framework` w `types` udostępnia matchery WebdriverIO także dla `expectAsync()`.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchronicznie
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchronicznie
    await expect(loadData()).toBeResolved()                        // asynchroniczny matcher Jasmine
})
```

`toHaveSize` istnieje w obu bibliotekach. Matcher WebdriverIO działa na wartościach WebdriverIO: elemencie, tablicy elementów lub `Element[]` (na przykład wyniku `$$().filter()`), elemencie multi-remote, przeglądarce, kontekście przeglądania, mocku, wrapperze `some()` lub promise, takim jak łańcuchowe `$()`. Matcher Jasmine działa na wszystkich innych wartościach.

Asymetryczne matchery obu bibliotek działają zarówno w matcherach Jasmine, jak i WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … oraz `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Aby użyć `some()`, zaimportuj go:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Elementy `expect` pochodzące z Jest nie są dostępne w Jasmine: matchery dostępne tylko w Jest, takie jak `toStrictEqual` lub `toHaveLength`, oraz `expect.soft()`. Aby dodać własny matcher, użyj `expect.extend()` w pliku specyfikacji lub w hooku `before` (zobacz [Własne matchery](/docs/custommatchers)) albo `jasmine.addMatchers` dla matchera synchronicznego i `jasmine.addAsyncMatchers` dla matchera asynchronicznego.

W przypadku TypeScriptu dodaj `jasmine` do `types`, zobacz [Konfiguracja TypeScript](/docs/typescript).

## Korzystanie z Cucumber

Najpierw zainstaluj pakiet adaptera z NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Jeśli chcesz używać Cucumber, ustaw właściwość `framework` na `cucumber`, dodając `framework: 'cucumber'` do [pliku konfiguracyjnego](configurationfile).

Opcje dla Cucumber można podać w pliku konfiguracyjnym za pomocą `cucumberOpts`. Pełną listę opcji znajdziesz [tutaj](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). Adapter używa Cucumber 13. Opcja `tagExpression` została usunięta; do filtrowania używaj `tags`. Zobacz [przewodnik migracji do v10](v10-migration#cucumber).

Aby szybko zacząć pracę z Cucumber, zapoznaj się z naszym projektem [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), który zawiera wszystkie definicje kroków potrzebne na start, dzięki czemu od razu zaczniesz pisać pliki feature.

### Opcje Cucumber

Poniższe opcje można zastosować w pliku `wdio.conf.js`, aby skonfigurować środowisko Cucumber za pomocą właściwości `cucumberOpts`:

:::tip Dostosowywanie opcji z poziomu wiersza poleceń
Opcje `cucumberOpts`, takie jak własne `tags` do filtrowania testów, można określić z poziomu wiersza poleceń. Robi się to za pomocą formatu `cucumberOpts.{optionName}="value"`.

Na przykład, jeśli chcesz uruchomić tylko testy oznaczone tagiem `@smoke`, możesz użyć następującego polecenia:

```sh
# Gdy chcesz uruchomić tylko testy posiadające tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

To polecenie ustawia opcję `tags` w `cucumberOpts` na `@smoke`, dzięki czemu wykonywane są tylko testy z tym tagiem.

:::

#### backtrace

<Option type="Boolean" default="true">

Pokazuj pełny backtrace dla błędów.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Wczytaj moduły przed wczytaniem jakichkolwiek plików wspierających.

</Option>
Przykład:

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

<Option type="boolean" default="false">

Przerwij uruchomienie przy pierwszym niepowodzeniu.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Wykonuj tylko scenariusze, których nazwa pasuje do wyrażenia (opcja powtarzalna).

</Option>

#### require

<Option type="string[]" default="[]">

Wczytaj pliki zawierające definicje kroków przed wykonaniem feature'ów. Możesz również podać glob do definicji kroków.

</Option>
Przykład:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Ścieżki do kodu wspierającego, dla ESM.

</Option>
Przykład:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Zakończ niepowodzeniem, jeśli istnieją jakiekolwiek niezdefiniowane lub oczekujące kroki.

</Option>

#### tags

<Option type="String" default="">

Wykonuj tylko feature'y lub scenariusze z tagami pasującymi do wyrażenia.
Więcej szczegółów znajdziesz w [dokumentacji Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions).

</Option>

#### timeout

<Option type="Number" default="30000">

Limit czasu w milisekundach dla definicji kroków.

</Option>

#### retry

<Option type="Number" default="0">

Określ liczbę ponownych prób dla nieudanych przypadków testowych.

</Option>

#### retryTagFilter

<Option type="RegExp">

Ponawiaj tylko feature'y lub scenariusze z tagami pasującymi do wyrażenia (opcja powtarzalna). Ta opcja wymaga podania '--retry'.

</Option>

#### language

<Option type="String" default="en">

Domyślny język plików feature

</Option>

#### order

<Option type="String" default="defined">

Uruchamiaj testy w zdefiniowanej / losowej kolejności

</Option>

#### format

<Option type="string[]">

Nazwa i ścieżka pliku wyjściowego formatera do użycia.
WebdriverIO obsługuje przede wszystkim tylko te [formatery](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), które zapisują dane wyjściowe do pliku.

</Option>

#### formatOptions

<Option type="object">

Opcje przekazywane do formaterów

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Dodaj tagi cucumber do nazwy feature'a lub scenariusza

</Option>
***Pamiętaj, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samo cucumber-js***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Traktuj niezdefiniowane definicje jako ostrzeżenia.

</Option>
***Pamiętaj, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samo cucumber-js***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Traktuj niejednoznaczne definicje jako błędy.

</Option>
***Pamiętaj, że jest to opcja specyficzna dla @wdio/cucumber-framework i nie jest rozpoznawana przez samo cucumber-js***<br/>

#### profile

<Option type="string[]" default="[]">

Określ profil do użycia.

</Option>
***Pamiętaj, że w profilach obsługiwane są tylko określone wartości (worldParameters, name, retryTagFilter), ponieważ `cucumberOpts` ma pierwszeństwo. Ponadto, korzystając z profilu, upewnij się, że wymienione wartości nie są zadeklarowane w `cucumberOpts`.***

### Pomijanie testów w cucumber

Pamiętaj, że jeśli chcesz pominąć test za pomocą standardowych możliwości filtrowania testów cucumber dostępnych w `cucumberOpts`, zrobisz to dla wszystkich przeglądarek i urządzeń skonfigurowanych w capabilities. Aby móc pomijać scenariusze tylko dla określonych kombinacji capabilities bez niepotrzebnego uruchamiania sesji, webdriverio udostępnia następującą specjalną składnię tagów dla cucumber:

`@skip([condition])`

gdzie condition to opcjonalna kombinacja właściwości capabilities wraz z ich wartościami, które – gdy **wszystkie** zostaną dopasowane – spowodują pominięcie oznaczonego scenariusza lub feature'a. Oczywiście możesz dodać kilka tagów do scenariuszy i feature'ów, aby pomijać testy w kilku różnych warunkach.

Możesz także użyć adnotacji '@skip', aby pominąć testy bez zmieniania `tags`. W takim przypadku pominięte testy zostaną wyświetlone w raporcie z testów.

Oto kilka przykładów tej składni:
- `@skip` lub `@skip()`: zawsze pominie oznaczony element
- `@skip(browserName="chrome")`: test nie zostanie wykonany w przeglądarkach chrome.
- `@skip(browserName="firefox";platformName="linux")`: pominie test przy wykonaniach w firefox na linuxie.
- `@skip(browserName=["chrome","firefox"])`: oznaczone elementy zostaną pominięte zarówno dla przeglądarki chrome, jak i firefox.
- `@skip(browserName=/i.*explorer/)`: capabilities z przeglądarkami pasującymi do wyrażenia regularnego zostaną pominięte (np. `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importowanie helperów definicji kroków

Aby używać helperów definicji kroków, takich jak `Given`, `When` lub `Then`, albo hooków, należy zaimportować je z `@cucumber/cucumber`, np. w ten sposób:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Jeśli jednak używasz już Cucumber do innych rodzajów testów niezwiązanych z WebdriverIO, dla których korzystasz z określonej wersji, musisz importować te helpery w testach e2e z pakietu WebdriverIO Cucumber, np.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Dzięki temu używasz właściwych helperów w ramach frameworka WebdriverIO i możesz korzystać z niezależnej wersji Cucumber dla innych rodzajów testów.

### Publikowanie raportu

Cucumber udostępnia funkcję publikowania raportów z uruchomień testów na `https://reports.cucumber.io/`, którą można kontrolować, ustawiając flagę `publish` w `cucumberOpts` lub konfigurując zmienną środowiskową `CUCUMBER_PUBLISH_TOKEN`. Jednak gdy używasz `WebdriverIO` do wykonywania testów, takie podejście ma ograniczenie. Raporty są aktualizowane osobno dla każdego pliku feature, co utrudnia przeglądanie zbiorczego raportu.

Aby obejść to ograniczenie, wprowadziliśmy opartą na promise metodę `publishCucumberReport` w `@wdio/cucumber-framework`. Metodę tę należy wywołać w hooku `onComplete`, który jest optymalnym miejscem do jej wywołania. `publishCucumberReport` wymaga podania katalogu, w którym przechowywane są raporty cucumber message.

Raporty `cucumber message` możesz generować, konfigurując opcję `format` w `cucumberOpts`. Zdecydowanie zaleca się podanie dynamicznej nazwy pliku w opcji formatu `cucumber message`, aby zapobiec nadpisywaniu raportów i zapewnić dokładne zarejestrowanie każdego uruchomienia testów.

Przed użyciem tej funkcji upewnij się, że ustawiono następujące zmienne środowiskowe:
- CUCUMBER_PUBLISH_REPORT_URL: URL, pod którym chcesz opublikować raport Cucumber. Jeśli nie zostanie podany, użyty zostanie domyślny URL 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Token autoryzacyjny wymagany do opublikowania raportu. Jeśli ten token nie jest ustawiony, funkcja zakończy działanie bez publikowania raportu.

Oto przykład niezbędnej konfiguracji i fragmentów kodu do implementacji:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Pozostałe opcje konfiguracji
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

Pamiętaj, że `./reports/` to katalog, w którym będą przechowywane raporty `cucumber message`.

## Korzystanie z Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) to framework open source zaprojektowany po to, aby testy akceptacyjne i regresyjne złożonych systemów oprogramowania były szybsze, bardziej oparte na współpracy i łatwiejsze do skalowania.

Dla zestawów testów WebdriverIO Serenity/JS oferuje:
- [Rozszerzone raportowanie](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Możesz używać Serenity/JS
  jako bezpośredniego zamiennika dowolnego wbudowanego frameworka WebdriverIO, aby generować szczegółowe raporty z wykonania testów oraz żywą dokumentację projektu.
- [API wzorca Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Aby kod testów był przenośny i wielokrotnego użytku w różnych projektach i zespołach,
  Serenity/JS udostępnia opcjonalną [warstwę abstrakcji](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) ponad natywnymi API WebdriverIO.
- [Biblioteki integracyjne](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Dla zestawów testów stosujących wzorzec Screenplay
  Serenity/JS udostępnia również opcjonalne biblioteki integracyjne, które pomagają pisać [testy API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [zarządzać lokalnymi serwerami](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [wykonywać asercje](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) i wiele więcej!

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

    // Poinstruuj WebdriverIO, aby używał frameworka Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Konfiguracja Serenity/JS
    serenity: {
        // Skonfiguruj Serenity/JS, aby używał odpowiedniego adaptera dla twojego test runnera
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Zarejestruj usługi raportowania Serenity/JS, tzw. "ekipę techniczną" (stage crew)
        crew: [
            // Opcjonalnie: wypisuj wyniki wykonania testów na standardowe wyjście
            '@serenity-js/console-reporter',

            // Opcjonalnie: generuj raporty Serenity BDD i żywą dokumentację (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opcjonalnie: automatycznie rób zrzuty ekranu w przypadku niepowodzenia interakcji
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Skonfiguruj runner Cucumber
    cucumberOpts: {
        // zobacz opcje konfiguracji Cucumber poniżej
    },

    // ... lub runner Jasmine
    jasmineOpts: {
        // zobacz opcje konfiguracji Jasmine poniżej
    },

    // ... lub runner Mocha
    mochaOpts: {
        // zobacz opcje konfiguracji Mocha poniżej
    },

    runner: 'local',

    // Dowolna inna konfiguracja WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Poinstruuj WebdriverIO, aby używał frameworka Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Konfiguracja Serenity/JS
    serenity: {
        // Skonfiguruj Serenity/JS, aby używał odpowiedniego adaptera dla twojego test runnera
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Zarejestruj usługi raportowania Serenity/JS, tzw. "ekipę techniczną" (stage crew)
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Skonfiguruj runner Cucumber
    cucumberOpts: {
        // zobacz opcje konfiguracji Cucumber poniżej
    },

    // ... lub runner Jasmine
    jasmineOpts: {
        // zobacz opcje konfiguracji Jasmine poniżej
    },

    // ... lub runner Mocha
    mochaOpts: {
        // zobacz opcje konfiguracji Mocha poniżej
    },

    runner: 'local',

    // Dowolna inna konfiguracja WebdriverIO
};
```

</TabItem>
</Tabs>

Dowiedz się więcej o:
- [Opcjach konfiguracji Cucumber w Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opcjach konfiguracji Jasmine w Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opcjach konfiguracji Mocha w Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Pliku konfiguracyjnym WebdriverIO](configurationfile)

### Generowanie raportów Serenity BDD i żywej dokumentacji

[Raporty Serenity BDD i żywa dokumentacja](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) są generowane przez [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
program w Javie pobierany i zarządzany przez moduł [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Aby generować raporty Serenity BDD, twój zestaw testów musi:
- pobrać Serenity BDD CLI, wywołując `serenity-bdd update`, co zapisuje plik `jar` CLI lokalnie w pamięci podręcznej
- generować pośrednie raporty Serenity BDD w formacie `.json`, rejestrując [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) zgodnie z [instrukcjami konfiguracji](#configuring-serenityjs)
- wywołać Serenity BDD CLI, gdy chcesz wygenerować raport, za pomocą `serenity-bdd run`

Wzorzec stosowany we wszystkich [szablonach projektów Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) opiera się
na użyciu:
- skryptu NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) do pobrania Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) do uruchomienia procesu raportowania nawet wtedy, gdy sam zestaw testów zakończył się niepowodzeniem (czyli właśnie wtedy, gdy raporty z testów są najbardziej potrzebne...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) jako wygodnego sposobu na usunięcie raportów z testów pozostałych po poprzednim uruchomieniu

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

### Korzystanie z API wzorca Screenplay w Serenity/JS

[Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) to innowacyjne, skoncentrowane na użytkowniku podejście do pisania wysokiej jakości automatycznych testów akceptacyjnych. Kieruje cię ono ku efektywnemu wykorzystaniu warstw abstrakcji,
pomaga twoim scenariuszom testowym oddać język biznesowy twojej domeny i zachęca do dobrych nawyków w zakresie testowania i inżynierii oprogramowania w twoim zespole.

Domyślnie, gdy zarejestrujesz `@serenity-js/webdriverio` jako `framework` WebdriverIO,
Serenity/JS konfiguruje domyślną [obsadę](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) [aktorów](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
w której każdy aktor potrafi:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

To powinno wystarczyć, aby zacząć wprowadzać scenariusze testowe zgodne ze wzorcem Screenplay nawet do istniejącego zestawu testów, na przykład:

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

Aby dowiedzieć się więcej o wzorcu Screenplay, zapoznaj się z:
- [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Testowanie aplikacji webowych z Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)