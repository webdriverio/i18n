---
id: v10-migration
title: Z v9 do v10
description: Zaktualizuj projekt WebdriverIO v9 do v10, z uwzględnieniem wszystkich zmian niekompatybilnych wstecz oraz umiejętności (skill) dla agenta kodującego, która stosuje ten przewodnik.
---

Ten przewodnik zbiera zmiany niekompatybilne wstecz w WebdriverIO `v10` i opisuje, co musisz z nimi zrobić.

W przeciwieństwie do poprzednich wersji głównych większości tych zmian nie da się zastosować za pomocą [codemoda](https://github.com/webdriverio/codemod) WebdriverIO, ponieważ zależą one od tego, co faktycznie oznaczają Twoje testy. Opisane niżej [przestarzałe sygnatury poleceń](#legacy-command-signatures) to zamiany mechaniczne. Każda pozostała sekcja opisuje, jak znaleźć miejsca w Twoim zestawie testów, których dotyczy zmiana.

## Migracja z agentem kodującym {#migrate-with-a-coding-agent}

Przekaż swojemu agentowi umiejętność migracji do v10 i poproś go o migrację zestawu testów do WebdriverIO v10 zgodnie z tą stroną. Umiejętność to procedura: czego szukać, który codemod uruchomić i kiedy się zatrzymać. Ta strona jest źródłem prawdy dla każdej zmiany.

Zainstaluj ją z poziomu projektu, który aktualizujesz. [CLI skills](https://skills.sh) odczytuje plik [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) z tego repozytorium i zapisuje go w katalogu umiejętności wybranych agentów:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` instaluje tę umiejętność. Umiejętności do pracy nad repozytorium WebdriverIO są oznaczone jako wewnętrzne i nie są oferowane. CLI pyta, dla których agentów zainstalować umiejętność, i zapisuje ją w katalogu projektu każdego agenta. Możesz też dołączyć ten plik do czatu.

Ścisłe selektory oraz same listy `specs` / `exclude` w capabilities ujawniają się dopiero podczas uruchomienia zestawu testów. Umiejętność nie jest w stanie rozstrzygnąć ich na podstawie samego kodu źródłowego.

## Node.js

WebdriverIO v10 wymaga Node.js 22.19.0 lub nowszego. Node.js 18 i 20 nie są już obsługiwane. CI obejmuje Node.js 22, 24 i 26.

## Testy komponentów

Browser runner nadal działa w Chrome 90, Edge 90, Firefox 90 i Safari 14.1 lub nowszych. Zobacz [Obsługa przeglądarek](/docs/component-testing#browser-support).

Kod przekazywany do `browser.execute` pozostaje na poziomie ES2021, dzięki czemu może działać w starszych testowanych przeglądarkach. Ten próg się nie zmienił.

## Mocha

`@wdio/mocha-framework` i `@wdio/browser-runner` zależą od [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 wymaga Node.js `^20.19.0 || >=22.12.0`, co mieści się w progu v10 wynoszącym 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` zostało usunięte. Mocha usunęła od dawna przestarzałą flagę `--compilers`, więc pozostałe mapowania kompilatorów są ignorowane. Ładuj transpilatory lub inne pliki konfiguracyjne za pomocą `mochaOpts.require`.

`failHookAffectedTests` ma domyślnie wartość `true`. Nieudany hook `before` lub `beforeEach` powoduje niepowodzenie testów, które ten hook pominął. Ustaw `mochaOpts.failHookAffectedTests` na `false`, aby raportować tylko hook.

Używaj `expect-webdriverio` 8, zobacz [expect-webdriverio 8](#expect-webdriverio-8). Mocha może załadować ten pakiet dwukrotnie w jednym procesie; współdzieli on stan asercji między tymi kopiami ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Zmiany w Mocha 12, które mogą przeniknąć przez `mochaOpts`:

- `grep` akceptuje nowoczesne flagi RegExp.
- `ui` to nadal `bdd`, `tdd`, `qunit` lub `exports`. Niestandardowe interfejsy powinny zachować sufiks `*-bdd`, `*-tdd` lub `*-qunit`.
- `parallel` nadal nie jest obsługiwane. Za równoległość specyfikacji odpowiada WDIO; pula workerów Mocha zgłosi błąd, jeśli ją włączysz.

Mocha 12 jest przede wszystkim ESM (`"type": "module"`). Programowe `require('mocha')` nadal działa w Node 22 dzięki `require(esm)`. CLI Mocha w WDIO (`wdio run … --mochaOpts.*`) się nie zmieniło; własne CLI Mocha używa teraz `util.parseArgs` zamiast yargs.

## Cucumber

`@wdio/cucumber-framework` zależy od [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 wymaga Node.js 22, 24 lub 26 albo nowszego. Nie działa na Node.js 20, 23 ani 25. Pakiet frameworka deklaruje ten sam zakres, zaczynając od progu v10 wynoszącego 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` nie ma aliasu. Ustawienie tej opcji zgłasza błąd, więc pozostawiony filtr nie może po cichu uruchomić wszystkich scenariuszy.

Cucumber 13 nie eksportuje już `Cli`. Uruchomienia programowe przechodzą przez `runCucumber` z `@cucumber/cucumber/api`, którego adapter już używa.

Inne zmiany niekompatybilne w Cucumber 13 (niejednoznaczne ścieżki formatterów, równoległe workery, `BeforeAll` / `AfterAll`) są opisane w [przewodniku aktualizacji Cucumbera](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` zależy od [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 jest testowany na Node.js 20, 22 i 24. Próg v10 wynoszący 22.19.0 już obejmuje ten zakres.

`jasmineNodeOpts` zostało usunięte. Konfiguruj Jasmine za pomocą `jasmineOpts`. Ustawienie `jasmineNodeOpts` zgłasza błąd:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` nie jest już odczytywane. Używaj `jasmineOpts.stopOnSpecFailure`. Pozostawione `failFast` nie zatrzymuje zestawu testów. `failFast` w Cucumberze to inna opcja i nadal działa.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` zostało usunięte. Używaj `jasmineOpts.oneFailurePerSpec`. Ustawienie starego klucza zgłasza błąd:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Synchroniczne matchery Jasmine znów są synchroniczne. W v9 globalne `expect` było `expectAsync` z Jasmine, więc `expect(1).toBe(1)` zwracało obietnicę. W v10 wbudowane matchery Jasmine oraz matchery dodane przez `jasmine.addMatchers` zwracają `undefined`. Matchery WebdriverIO, asynchroniczne matchery Jasmine i matchery z `jasmine.addAsyncMatchers` nadal zwracają obietnicę, więc nadal używaj dla nich `await`. Nie musisz zmieniać `await expect($('#logo')).toBeDisplayed()` na `expectAsync()`: globalne `expect` samo kieruje matchery WebdriverIO do `expectAsync`. `await expect(1).toBe(1)` nadal działa.

Nieudana synchroniczna asercja bez `await` powoduje teraz niepowodzenie specyfikacji. W v9 była to odrzucona obietnica: jeśli nic na nią nie czekało, specyfikacja mogła przejść, a w logu pojawiało się jedynie nieobsłużone odrzucenie. Po aktualizacji przyjrzyj się specyfikacjom, które zaczną się nie udawać. Miały one ukryty błąd w v9, a poprawka leży w teście lub w aplikacji, a nie w wywołaniu `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: przechodziło nawet wtedy, gdy `onSave` nie zostało wywołane
    // v10: nie przechodzi, gdy `onSave` nie zostało wywołane
    expect(onSave).toHaveBeenCalled()
})
```

Wynik synchronicznego matchera to teraz `undefined`, więc `.then()` lub `.catch()` na nim zgłasza `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Inne skutki tej zmiany:

- `oneFailurePerSpec` zatrzymuje teraz specyfikację przy pierwszej nieudanej asercji: od razu w przypadku synchronicznego matchera, a w przypadku asynchronicznego matchera z `await` — gdy obietnica się rozstrzygnie.
- Matchery szpiegów (spy) w Jasmine działają bez `await`. W v9 `toHaveBeenCalled`, `toHaveSpyInteractions` i `toHaveNoOtherSpyInteractions` kończyły się błędem „Does not take arguments”, a niewywołany szpieg przechodził bez `await`.
- `jasmine.addMatchers` nie jest już podmieniane, więc Jasmine nie wyświetla już ostrzeżenia „Monkey patching detected”.

`toHaveSize` ma dwa znaczenia. Na wartości WebdriverIO jest to matcher WebdriverIO, który sprawdza rozmiar elementu: elementu, tablicy elementów (w tym wyniku `$$().filter()`), `Element[]`, elementu multi-remote, przeglądarki, kontekstu przeglądania, mocka, wrappera `some()` lub obietnicy, takiej jak łańcuchowe `$()`. Na każdej innej wartości jest to matcher Jasmine, który sprawdza długość. W v9 zawsze uruchamiany był matcher Jasmine.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchronicznie
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchronicznie
```

Typy podlegają tym samym regułom. `@wdio/jasmine-framework` typuje teraz globalne `expect` za pomocą matcherów Jasmine oraz matcherów WebdriverIO i asynchronicznych matcherów Jasmine, które zwracają obietnicę. Usuń `expect-webdriverio/jasmine-wdio-expect-async` z `types` w swoim `tsconfig.json`, ponieważ typuje on każdy matcher jako asynchroniczny. Dodaj `jasmine`, jeśli go tam nie ma:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` i `expect.multiRemote()` działają teraz również w specyfikacjach Jasmine. Wcześniej nie były dostępne w `expect` Jasmine w czasie wykonywania.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` i `@wdio/browser-runner` wymagają `expect-webdriverio` 8 jako zależności peer. W v9 był to `expect-webdriverio` 7. Jeśli Twój `package.json` wymienia `expect-webdriverio`, zaktualizuj go do wersji 8 w tej samej zmianie co pakiety `@wdio/*`.

`expect-webdriverio` 8 ma własne zmiany niekompatybilne wstecz. Jego [przewodnik migracji z v7 do v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) wymienia każdą zmianę i jej zamiennik. Te zmiany najprawdopodobniej wpłyną na zestaw testów:

- `toHaveText` na `$$()` porównuje elementy indeks po indeksie. Oczekiwana tablica w innej kolejności niż na stronie nie przechodzi. Użyj kolejności ze strony, `expect.oneOf()` lub `expect.arrayContaining()`.
- Tablica oczekiwanych wartości dla pojedynczego elementu powoduje niepowodzenie `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` i `toHaveComputedRole`. Użyj `expect.oneOf()`.
- `setFeatureFlags()` i opcja `featureFlags` zostały usunięte.
- Usunięto następujące przestarzałe API: `setOptions` (użyj `setDefaultOptions`), `getConfig` (użyj `getDefaultOptions`), `matchers` (użyj `wdioCustomMatchers`), `toHaveAttr` (użyj `toHaveAttribute`), `toHaveClass` (użyj `toHaveElementClass`), `toBeRequestedWithResponse()` (użyj `toBeRequestedWith({ response })`) oraz `expect-webdriverio/types` (użyj `expect-webdriverio/expect-global`).
- Hooki `beforeAssertion` i `afterAssertion` otrzymują nazwę aliasu, który wywołał test, dla `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` i `toBeRequested`. W v9 otrzymywały nazwę matchera stojącego za aliasem, na przykład `toExist` dla `toBeExisting`.
- W przeglądarce multi-remote przekazuj do `expect` wynik `$$()`. Zwykła tablica, taka jak `[...elements]` lub `Array.from(elements)`, nie jest rozpoznawana jako elementy i asercja się nie powiedzie.

W przeglądarce multi-remote jedna asercja sprawdza każdą instancję, a `expect.multiRemote()` podaje jedną oczekiwaną wartość na instancję. Zobacz [Asercje multiremote](/docs/multiremote#assertions).

## Globalna zmienna multi-remote

Globalna zmienna `multiremotebrowser` pisana małymi literami została usunięta, zarówno z `@wdio/globals`, jak i ze zmiennych globalnych `eslint-plugin-wdio`. Używaj `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` i `exclude` w capabilities nie są już odczytywane. Używaj `wdio:specs` i `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Klucze konfiguracji najwyższego poziomu pozostają `specs` i `exclude`. Pozostawiona sama lista w capability nie wybiera plików dla tej capability. Capability używa wtedy `specs` i `exclude` z najwyższego poziomu.

Aliasy `tunnelIdentifier` i `parentTunnel` zostały usunięte z typów opcji Sauce Labs. Używaj `tunnelName` i `tunnelOwner`.

## TypeScript

Typy `Element`, `MultiRemoteBrowser` i `MultiRemoteElement` eksportowane przez `webdriverio` zostały usunięte. Używaj globalnej przestrzeni nazw `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` deklaruje teraz `then`, a `ChainablePromiseArray` deklaruje `then`, `catch` i `finally`. Typy łańcuchowe opisują wartość przed `await`. Nie pasują już do wartości po `await`:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Typuj wartość po `await` jako `WebdriverIO.Element` lub `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Oba typy łańcuchowe pasują teraz do `T extends PromiseLike<unknown>`. Typ warunkowy, który sprawdza `PromiseLike`, wybiera dla `$()` i `$$()` inną gałąź niż w v9. Na przykład `Awaited<ChainablePromiseElement>` to teraz `WebdriverIO.Element`, a `Awaited<ChainablePromiseArray>` to `WebdriverIO.ElementArray`.

Właściwości `$$()` bez `await` zmieniły typ. Są dostępne od razu, zanim zapytanie się rozwiąże, więc odczytuj je bez `await` czy `.then()`:

| Właściwość | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | rodzic, nie obietnica (zobacz niżej) |
| `foundWith` | brak | polecenie, które znalazło listę, np. `$$` lub `custom$$` |
| `props` | brak | dodatkowe argumenty tego polecenia |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

W zapytaniu łańcuchowym, takim jak `$('form').$$('input')`, `parent` jest łańcuchowym `$('form')` do czasu rozwiązania listy, a po nim — rozwiązanym elementem. Użyj `await` na liście, zanim użyjesz `parent` jako elementu.

W czasie wykonywania `filter()`, `filterSeries()` i `slice()` na liście `$$()` zwracają listę elementów, a nie zwykłą tablicę. Wynik zachowuje `selector`, `foundWith`, `parent` i `props` listy źródłowej. W v9 `filter()` zwracało zwykłą tablicę bez tych właściwości. Typy jeszcze tego nie odzwierciedlają: `filter()` i `filterSeries()` są zadeklarowane jako zwracające `Promise<WebdriverIO.Element[]>`, a `slice()` zwraca `WebdriverIO.Element[]`, więc TypeScript zgłasza błąd, gdy odczytujesz te właściwości na wyniku.

WebdriverIO nie uruchamia ponownie zapytania dla samej listy pochodnej: indeks wykraczający poza jej koniec nie czeka na kolejne dopasowania i nigdy nie zwraca elementu, który filtr wykluczył. Jej elementy nadal są elementami zapytania źródłowego, z oryginalnymi `selector` i `index`. Jeśli element stanie się nieaktualny (stale), WebdriverIO pobiera go ponownie z zapytania źródłowego pod tym indeksem, co może dać inny element, jeśli strona się zmieniła. Kod, który ponownie uruchamia zapytanie listy na podstawie jej właściwości, na przykład `parent[foundWith](selector, ...props)`, otrzymuje pełną listę, a nie przefiltrowaną.

Publikowane pakiety ustawiają `typeScriptVersion` na 6.0.3, zgodnie z wersją TypeScript, z którą kompiluje się to repozytorium.

`browser.mock()` akceptuje `URLPattern` z `urlpattern-polyfill` oraz natywny `URLPattern` (globalny w Node.js 24 i typowany przez bibliotekę `dom` w TypeScript 6).

TypeScript 6 oznacza jako przestarzałe `"moduleResolution": "node"` i `"baseUrl"` oraz ustawia `strict` jako domyślne. `create-wdio` generuje teraz `"moduleResolution": "bundler"` dla projektów ESM i `"NodeNext"` dla projektów CommonJS. Jeśli aktualizujesz TypeScript w istniejącym projekcie, zmień te opcje w swoim `tsconfig.json`.

Dla projektu ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Dla projektu CommonJS użyj `NodeNext` dla obu opcji, tak jak robi to `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 zmienia też domyślną wartość `types` na `[]`, więc nie ładuje już każdego zainstalowanego pakietu `@types/*`. Jeśli Twój `tsconfig.json` nie ma listy `types`, zmienne globalne, takie jak `describe` i `it` z Mocha, kończą się błędem `Cannot find name`. Wymień pakiety typów, których używają Twoje testy, tak jak robi to `create-wdio`. Na przykład z Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` zapisuje `compilerOptions.target` i `compilerOptions.lib` jako `es2024`. Sprawdzanie typów tego pliku wymaga TypeScript 5.7 lub nowszego. `tsx`, który uruchamia konfigurację i testy, nie sprawdza typów, więc starszy kompilator ma znaczenie tylko wtedy, gdy samodzielnie uruchamiasz `tsc`.

Istniejący `tsconfig.json` nie jest nadpisywany. Wygenerowana konfiguracja, która rozszerza inną konfigurację, zachowuje `target` i `lib` konfiguracji nadrzędnej.

W hooku `afterAssertion` typ `params.result` to teraz `{ pass, message }`, tak jak przekazują go matchery. W v9 typem było `{ result, message }`, ale `params.result.result` w czasie wykonywania zawsze miało wartość `undefined`. Odczytuj `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` ma wartość `true`, gdy wartość pasuje do oczekiwanej, również przy `.not`. Zatem przy `.not` asercja przechodzi, gdy `pass` ma wartość `false`. Hook nie informuje, czy test użył `.not`.

## Reportery

Zdarzenie przeglądarki `result` jest przekazywane do reporterów jako `client:afterCommand`. Ten ładunek i typ `AfterCommandArgs` nie mają już właściwości `name`. Zamiast tego odczytuj `command`. Niestandardowe polecenia już wysyłały `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` w `@wdio/allure-reporter` zostało usunięte. Nie miało żadnego efektu. Ustawiaj wiersze środowiska za pomocą [`reportedEnvironmentVars`](/docs/allure-reporter) w opcjach reportera Allure.

## `$` jest ścisły

`$` reprezentuje teraz __dokładnie jeden__ element. Jeśli selektor rozwiązuje się do więcej niż jednego elementu, polecenie zgłasza `StrictSelectorError`, zamiast po cichu używać pierwszego dopasowania:

```js
// v9 — klika pierwszy przycisk, nawet jeśli jest ich 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Odpowiada to [lokatorom Playwright](https://playwright.dev/docs/locators#strictness). Cypress działa inaczej: jego zapytania mogą rozwiązywać się do kilku elementów, a to polecenia akcji, takie jak [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), domyślnie odrzucają podmiot składający się z wielu elementów. Selektor, który po cichu rozwiązuje się do kilku elementów, to niemal zawsze ukryty błąd: dziś przechodzi, a gdy tylko ktoś doda drugi przycisk do strony, zaczyna wchodzić w interakcję z niewłaściwym elementem.

Reguła dotyczy każdego kroku łańcucha (`$('form').$('input')`) i każdego typu selektora akceptowanego przez `$` — selektorów tekstowych (w tym przebijających shadow DOM), funkcji JS, selektorów mobilnych i referencji do niestandardowych strategii.

### Co się nie zmieniło

- `$$` nadal zwraca zero lub wiele elementów. Od v10 ta lista jest [`ElementArray`](/docs/api/browser/$$): prawdziwą tablicą, na której można użyć `await`, z `for await` i asynchronicznymi `map` / `filter` dostępnymi przed jej rozwiązaniem. `await $$('button').length` to liczba elementów. `$$('button').length > 0` nią nie jest, ponieważ `length` jest obietnicą do czasu rozwiązania listy. `for (const el of $$('button'))` zgłasza błąd, dopóki nie użyjesz `await` na liście; użyj `for await` lub `for...of` po `await`.
- Dedykowane polecenia pomocnicze `custom$`, `shadow$` i `react$` nie są ścisłe — nadal zwracają pierwsze dopasowanie, podobnie jak ich odpowiedniki `$$`.
- Selektor, który niczego nie dopasowuje, nadal zwraca element rozwiązywany leniwie, więc `waitForExist` i [automatyczne oczekiwanie](/docs/autowait) działają jak wcześniej.
- Przekazanie referencji do elementu, np. `$(await browser.getActiveElement())`, zawsze odnosi się do pojedynczego węzła i nigdy nie jest sprawdzane.

### Jak przeprowadzić audyt zestawu testów

Nie ma do tego codemoda: tylko Ty możesz ocenić, czy drugie dopasowanie to błąd, czy zamierzone działanie. Dwa praktyczne podejścia:

1. __Uruchom zestaw testów.__ Każde naruszenie zgłasza błąd z selektorem i liczbą dopasowań, co zwykle wystarcza, by od razu je naprawić.
2. __Sprawdź z góry szerokie selektory.__ Dla każdego ogólnego `$(...)` w swoich page objectach wypisz, ile elementów faktycznie dopasowuje:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` jest zbyt szeroki
   ```

Następnie albo zawęź selektor — najlepiej w kierunku zapytania zorientowanego na użytkownika, takiego jak `$('button=Submit')` lub `$('aria/Submit')`, zobacz [Selektory](/docs/selectors) — albo wyraźnie zaznacz, że chcesz pierwsze dopasowanie:

```js
await $('button[type="submit"]').click()
// ...lub, jeśli naprawdę chodzi Ci o pierwszy
await $$('button')[0].click()
```

### Rezygnacja

Dla pojedynczego zapytania:

```js
await $('button', { strict: false }).click()
```

Dla całego projektu, przywracając zachowanie z v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Element pamięta, w jaki sposób został wyszukany, więc jego ponowne pobranie — po nieaktualnej referencji do elementu lub przez `waitForExist` — zachowuje ścisłość pierwotnego wywołania.

:::info

Pod spodem ścisłe `$` wysyła żądanie `findElements` zamiast `findElement`, ponieważ zliczenie dopasowań to jedyny sposób na wymuszenie reguły. W obu przypadkach to pojedyncza wymiana z serwerem, ale jest to widoczne dla niestandardowych serwisów i mocków WebDriver, które opierają się na poleceniu `findElement`.

:::

## Przestarzałe sygnatury poleceń {#legacy-command-signatures}

v9 nadal akceptowało starsze formy pozycyjne i wyświetlało ostrzeżenie. v10 akceptuje wyłącznie obiekt opcji.

[Codemod](https://github.com/webdriverio/codemod) dla v10 przepisuje `addCommand` i `overwriteCommand`, gdy trzeci argument jest wartością logiczną, `getHTML(true)` i `getHTML(false)` oraz `getCookies`, gdy filtr jest ciągiem znaków lub jednoelementową tablicą. Wywołanie `getCookies` z więcej niż jedną nazwą pozostaje bez zmian, ponieważ jeden filtr dopasowuje jedną nazwę.

Najpierw zainstaluj codemod. WebdriverIO od niego nie zależy.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Dla plików TypeScript użyj `--parser=tsx`.

### `addCommand` i `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Wartość logiczna jako trzeci argument to błąd TypeScript. W czasie wykonywania zgłaszany jest błąd:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` i `instances` należą do tego samego obiektu opcji. Pomiń trzeci argument, aby dołączyć polecenie do przeglądarki.

### `getCookies`

Filtry w postaci ciągu znaków i tablicy ciągów są odrzucane. Przekaż [obiekt filtra ciasteczek](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Jedno wywołanie filtruje jedną nazwę; dla kolejnej nazwy wywołaj je ponownie.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` bez argumentów nadal zwraca wszystkie ciasteczka widoczne dla strony.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` bez argumentów nadal uwzględnia własny tag elementu.

### `newWindow`

`windowName` i `windowFeatures` zostały usunięte. Dotyczyły tylko WebDriver Classic. Polecenie nadal akceptuje `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Użyj `type: 'tab'`, aby otworzyć kartę.

### `startActivity`

Akceptowany jest tylko obiekt opcji. `appWaitPackage`, `appWaitActivity` i `optionalIntentArguments` zostały usunięte. Dotyczyły tylko usuniętego endpointu HTTP Appium. `mobile: startActivity` ich nie akceptuje, a ich przekazanie zgłasza błąd.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Usunięte polecenia

`browser.throttle` i przestarzałe polecenia `touchAction` zostały usunięte.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions API](/docs/api/browser/action) ze wskaźnikiem dotykowym lub polecenia mobilne [`tap`](/docs/api/mobile/tap) i [`swipe`](/docs/api/mobile/swipe) |

Gest dotykowy z Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` zostało usunięte. Pakowało lokalny plik do archiwum zip i wysyłało go do endpointu Selenium `file`, który nie jest częścią WebDriver ani WebDriver BiDi. Ustawiaj pole wyboru pliku za pomocą [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` wymaga sesji BiDi. Ścieżki są otwierane przez przeglądarkę. Ścieżka względna jest rozwiązywana względem `process.cwd()`. Przekazywanie plików do Selenium Grid nie jest częścią v10. Zestaw testów, który polegał na `uploadFile` przy wysyłaniu danych do węzła, musi umieścić plik tam, gdzie przeglądarka może go odczytać, a następnie wywołać `setFiles`.

W klasycznej sesji lokalnej `element.setValue('/local/path')` nadal wpisuje ścieżkę, którą lokalna przeglądarka już widzi. Surowy endpoint Selenium pozostaje dostępny jako `browser.file()` dla użytkowników Grid, którzy wywołują go bezpośrednio.

## `executeAsync`

`browser.executeAsync` i `element.executeAsync` zostały usunięte. Przekaż funkcję `async` do [`execute`](/docs/api/browser/execute). Wartość zwracana przez funkcję, w tym zwrócona obietnica, jest wynikiem polecenia. Timeout `script` nadal obowiązuje.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Usuń callback `done` z WebDriver. Skrypt w postaci ciągu znaków, który oczekiwał tego callbacku jako ostatniego argumentu, musi zamiast tego zwracać obietnicę. W czasie wykonywania `executeAsync` nie jest funkcją.

## `switchToFrame`

`browser.switchToFrame` nie jest już publicznym poleceniem.

W sesji WebDriver BiDi `switchFrame` i `switchWindow` zgłaszają błąd. Karta, okno i ramka to `WebdriverIO.BrowsingContext`, który przechowujesz. `browser.url()` nawiguje w początkowym kontekście najwyższego poziomu sesji i go zwraca. `browser.newWindow()` zwraca nowy kontekst i nie przełącza się na niego. `context.frame()` zwraca ramkę potomną. `context.parent` to ramka, z której ją otworzyłeś.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` to ciąg znaków z adresem URL dokumentu. Nawiguj w przechowywanym kontekście za pomocą `context.navigate(url)`. Metadane ładowania z `browser.url()` są dostępne jako `context.request`.

W sesji Classic nadal wywołuj `switchFrame` z elementem lub `null` dla ramki najwyższego poziomu. Ciąg znaków lub funkcja są tam odrzucane.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

Klucz `page load` z JSON Wire Protocol jest odrzucany. Używaj `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` i `script` pozostają bez zmian.

## Dostęp do instancji multi-remote

Przeglądarka multi-remote nie przechowuje już każdej sesji jako osobnej właściwości. To samo dotyczy elementu multi-remote. Do odwoływania się do jednej sesji służą `getInstance` i `select`.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Rozszerzenie TypeScript, które dodaje `myChromeBrowser: WebdriverIO.Browser` do `WebdriverIO.MultiRemoteBrowser`, nie odpowiada już właściwości w czasie wykonywania. Usuń to rozszerzenie i wywołuj `getInstance`.

Z testrunnerem i pozostawionym włączonym `injectGlobals` nazwa instancji nadal jest zmienną globalną (`myChromeBrowser.url(...)`). Ta zmienna globalna to pojedyncza sesja. Nie jest to `browser.myChromeBrowser`.

Wyniki poleceń pozostają w kolejności capabilities: pierwszy wpis należy do pierwszego klucza w obiekcie capabilities.

`browser.$$()` w przeglądarce multi-remote zwraca `WebdriverIO.MultiRemoteElementArray`, a nie zwykłe `MultiRemoteElement[]`. Nadal jest to tablica, więc odczyt po indeksie, taki jak `elements[0]`, nadal działa.

Jej metody `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` i `reduce` są asynchroniczne, tak jak w `WebdriverIO.ElementArray`, i zwracają obietnicę, również po `await`. To samo dotyczy list zwracanych przez `custom$$()`, `react$$()` i `shadow$$()`. W v9 były to synchroniczne metody zwykłej tablicy:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` oraz, na elemencie, `shadow$()`, `nextElement()`, `previousElement()` i `parentElement()` zwracają jeden `WebdriverIO.MultiRemoteElement`, tak jak `$()`. W v9 zwracały po jednym elemencie na instancję w zwykłej tablicy. Element jednej przeglądarki odczytasz za pomocą `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` oraz, na elemencie, `shadow$$()` zwracają jeden `WebdriverIO.MultiRemoteElementArray`, tak jak `$$()`. W v9 zwracały po jednej liście na instancję w zwykłej tablicy. Każdy wpis odnosi się do wszystkich instancji. Instancja, która znajduje mniej elementów, nie ma elementu pod danym indeksem:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` ma typ `Selector`, tak jak `WebdriverIO.Element['selector']`. W v9 miało typ `string`, ale wartość mogła być również funkcją lub referencją do niestandardowej strategii. Kod TypeScript, który używa go jako ciągu znaków, na przykład `element.selector.includes('…')`, musi najpierw sprawdzić typ.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` i `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` zostały usunięte. `select()` jest zawsze dostępne, a `$$()` zawsze zwraca opisaną wyżej tablicę elementów. Usuń obie zmienne.

## Binarne odpowiedzi mocków

`mock.respond()` i `mock.respondOnce()` akceptują ładunki `Uint8Array` i `ArrayBuffer`, w tym `Buffer` z polyfilla w testach komponentów bez globalnego `Buffer`.

`mock.getBinaryResponse()` jest teraz typowane jako `Uint8Array | null`. W Node.js nadal zwraca `Buffer`, ale w przeglądarce zwraca `Uint8Array`. Aby użyć metod specyficznych dla Buffer w Node.js, najpierw przekonwertuj wynik różny od null:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mocki sieciowe multi-remote

`browser.mock()` w przeglądarce multi-remote zwraca `WebdriverIO.MultiRemoteMock`, a nie tablicę mocków. `respond`, `restore` i pozostałe metody mocka działają na każdej instancji. Przechwycone żądania odczytuj z mocka dla jednej przeglądarki. Używaj typu `WebdriverIO.MultiRemoteMock` z globalnej przestrzeni nazw `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` zgłasza `Multi-remote object has no instance named "<name>"`, gdy nazwa nie należy do `instances`. Mock z `browser.select('myFirefoxBrowser', 'myChromeBrowser')` wymienia te instancje w tej kolejności, która może różnić się od `browser.instances`. Nie zakładaj, że `mocks[0]` to konkretna przeglądarka.

## Odpowiedzi mocków pomijające backend

`mock.respond(..., { fetchResponse: false })` nie wywołuje backendu. W v9 mock, który dodatkowo filtrował po `statusCode` lub `responseHeaders`, ignorował ten filtr i nadal odpowiadał na każde pasujące żądanie. W v10 `respond()` i `respondOnce()` zgłaszają błąd, ponieważ o tych filtrach można zdecydować tylko na podstawie odpowiedzi backendu.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Aby zachować filtr, pomiń `fetchResponse`, tak aby mock pobrał odpowiedź, sprawdził status lub nagłówki, a następnie zastąpił treść.

## Referencje do elementów {#element-references}

Identyfikatory elementów używają klucza W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` i właściwości `elementId`. Pole `ELEMENT` z JSON Wire Protocol nie jest już częścią kontraktu elementu.

`WebdriverIO.Element` nie deklaruje już `ELEMENT`. Odczytuj `element.elementId`, które instancje elementów już udostępniają.

`browser.execute` oraz wbudowane skrypty, które przekazują element do strony (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` i pozostałe), przekazują tylko referencję W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Treść odpowiedzi find-element, która zawiera tylko `{ ELEMENT: '...' }`, nie jest elementem. Uwzględnij klucz W3C. Jeśli obecne są oba klucze, WebdriverIO używa identyfikatora W3C.

Jasmine wypisuje wynik łańcuchowego `$()` przez `toJSON`. Ta wartość to ta sama referencja W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

W WebDriver BiDi skrypt, który zwraca `NodeList` (na przykład z `querySelectorAll`) lub `HTMLCollection` (na przykład `element.children`), daje teraz listę referencji do elementów, tak jak WebDriver Classic. W v9 dawał surowe wartości BiDi, więc `browser.execute` zwracało obiekty, które nie są elementami, a strategia `custom$` lub `custom$$` zwracająca `querySelectorAll(...)` nie znajdowała żadnego elementu. Obejście takie jak `Array.from(document.querySelectorAll(...))` nadal działa i możesz je usunąć:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Selektory React

`react$` i `react$$` działają teraz z React od 16 do 19, dla aplikacji uruchamianej przez `createRoot` lub przez `ReactDOM.render`. Wcześniej `browser.react$` i `browser.react$$` nie działały z React 18 i nowszym (`Could not find the root element of your application`), a w każdej wersji wynik mógł pochodzić z renderowania sprzed ostatniej aktualizacji, więc komponent dodany przez zmianę stanu nie był znajdowany.

Na stronie, na której React nie wyrenderował jeszcze korzenia, polecenia czekają teraz na niego do 5 sekund, zanim zakończą się błędem. Wcześniej kończyły się błędem od razu, więc aplikacja uruchamiająca się z opóźnieniem nie była znajdowana.

Polecenia nie używają już biblioteki [resq](https://github.com/baruchvlz/resq), a WebdriverIO już jej nie instaluje. Reguły selektorów się nie zmieniają (zobacz [Selektory React](/docs/selectors#react-selectors)), z następującymi wyjątkami:

- `react$` z jednocześnie `props` i `state` znajduje komponent, który pasuje do obu. Wcześniej ignorowało `props`, gdy podano również `state`.
- `react$$` podaje każdy węzeł DOM raz. Wcześniej komponent wyższego rzędu i jego dziecko w niektórych przeglądarkach dawały ten sam element dwukrotnie.
- Fragment zawierający fragment daje jedną płaską listę węzłów. Wcześniej `react$` mogło zwrócić listę.
- Filtr z wartością `null` działa. Wcześniej kończył się błędem `Cannot convert undefined or null to object`.
- Bez zakresu elementu polecenia przeszukują wszystkie korzenie React na stronie, w kolejności dokumentu, również korzenie wewnątrz innych korzeni i korzenie w otwartych shadow rootach. `react$` podaje pierwsze dopasowanie. Wcześniej przeszukiwały tylko pierwszy korzeń, również taki, którego React jeszcze nie wyrenderował lub już odmontował, i nie przeszukiwały shadow rootów. Na stronie z więcej niż jednym korzeniem `react$$` może teraz zwrócić więcej elementów: aby przeszukać tylko jeden korzeń, wywołaj polecenie na jego kontenerze, na przykład `$('#root').react$$('MyComponent')`.
- Na kontenerze korzenia znajdującego się wewnątrz innego korzenia polecenia przeszukują korzeń wewnętrzny. Wcześniej przeszukiwały korzeń zewnętrzny.
- Na kontekście przeglądania ramki oraz na elemencie ramki polecenia działają. Wcześniej polecenie kontekstu kończyło się błędem `this.executeScript is not a function`, a polecenie elementu — błędem `Could not find instance of React in given element`.

Wewnętrzny skrypt `webdriverio/scripts/resq` został usunięty.

## Testowanie komponentów

`@wdio/browser-runner` reeksportuje `fn`, `spyOn` i typy mocków z `@vitest/spy` 5 (wcześniej 3). Mock, który Twój kod wywołuje z `new`, wymaga implementacji w postaci `function` lub `class`. Funkcja strzałkowa zgłasza `is not a constructor`, a `mockReturnValue` zgłasza błąd, gdy mock jest wywoływany z `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Inne zmiany dotyczące szpiegów opisuje [przewodnik migracji Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` akceptuje `puppeteer-core` `>=24 <26`, w tym Puppeteer 25. `getPuppeteer()` i `@wdio/lighthouse-service` są testowane z tą linią wersji.

## ESLint

`eslint-plugin-wdio` wymaga ESLint 10. ESLint 9 osiągnął [koniec wsparcia](https://eslint.org/version-support/) 2026-08-06 i nie jest już obsługiwany. Z TypeScript używaj `typescript-eslint` 8.56.0 lub nowszego.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` eksportuje tylko płaską konfigurację `flat/recommended`. Nazwa eslintrc `plugin:wdio/recommended` została usunięta.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

Rekomendowana konfiguracja przełącza się na świadomą typów regułę `wdio/no-floating-promise` zamiast `wdio/await-expect`, gdy zainstalowany jest pakiet `typescript-eslint`. Zainstalowanie samego `@typescript-eslint/eslint-plugin` nie wystarczy.

```sh
npm install --save-dev typescript typescript-eslint
```

W tym trybie konfiguracja parsuje każdy dopasowany plik za pomocą TypeScript project service. Ogranicz ją do plików TypeScript i upewnij się, że należą one do `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Dopasowany plik JavaScript, który nie należy do projektu TypeScript, taki jak `wdio.conf.js`, kończy się błędem „was not found by the project service”. Aby lintować również pliki JavaScript, ustaw `"allowJs": true`, dodaj je do `include` w `tsconfig.json` i poszerz wzorzec do `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Niestandardowe frameworki

`setupExpect` w niestandardowym adapterze frameworka nie akceptuje już `Map` matcherów, a runner nie dodaje już metody `entries` do obiektu matcherów. Iteruj za pomocą `Object.entries(wdioMatchers)`.

## Profil Firefox

`@wdio/firefox-profile-service` nie traktuje już `legacy` jako opcji serwisu. Ta flaga dotyczyła tylko Firefoksa 55 i starszych. Usuń ją. Pozostawione `legacy: true` zostaje zapisane w profilu jako preferencja o nazwie `legacy`.

## Protokół WebDriver

Każda sesja jest sesją [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO nie obsługuje JSON Wire Protocol ani Mobile JSON Wire Protocol. v9 usunęło te polecenia. v10 rezygnuje również z koperty odpowiedzi używanej przez te protokoły, więc serwer, który nadal ją zwraca, nie może rozpocząć sesji.

`browser.isW3C` zostało usunięte, łącznie z wartością przekazywaną wcześniej w wiadomości workera `sessionStarted`. Przekazanie `isW3C` do `attach` jest ignorowane. Zestaw poleceń BiDi pozostaje w kliencie. Aktywne połączenie BiDi nadal zależy od `webSocketUrl`.

### `browser.back()` i `browser.forward()` w BiDi

Wywołania pozostają `await browser.back()` i `await browser.forward()`. Żadne z tych poleceń nie przyjmuje argumentu ani nie zwraca wartości.

W sesji BiDi te polecenia wywołują `browsingContext.traverseHistory` z `delta` równym `-1` lub `1` na kontekście przeglądania najwyższego poziomu, a następnie czekają na gotowość dokumentu odpowiadającą `pageLoadStrategy`. `none` kończy się, gdy polecenie przejścia zostanie zaakceptowane. `eager` czeka na `browsingContext.domContentLoaded`. `normal`, wartość domyślna, czeka na `browsingContext.load`. Przywrócenie z back-forward cache nie emituje tych zdarzeń; polecenie kończy się, gdy `readyState` zatwierdzonego dokumentu już odpowiada strategii. Oczekiwanie korzysta z timeoutu ładowania strony sesji (`timeouts.pageLoad`, 300000 ms, gdy nie ustawiono). Sesje Classic nadal wysyłają `POST /session/:sessionId/back` i `POST /session/:sessionId/forward`.

Brakujący wpis historii nadal powoduje odrzucenie. W BiDi komunikat pochodzi z `browsingContext.traverseHistory` i zawiera `no such history entry`, a nie tekst błędu klasycznego WebDriver. Przejście, które nigdy nie osiąga oczekiwanej gotowości, jest odrzucane z komunikatem `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` lub `browsingContext.load`.

### Odpowiedź nowej sesji

Create Session musi zwracać treść W3C. WebdriverIO odczytuje `value.sessionId` i `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Treść JSON Wire Protocol jest odrzucana. Taka treść umieszcza `sessionId` i `status` obok `value`, a capabilities w samym `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

Tworzenie sesji zgłasza wtedy `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Ten sam błąd jest zgłaszany, gdy brakuje `value.capabilities`, nawet jeśli `value.sessionId` jest obecne.

Płaski obiekt capabilities w konfiguracji jest nadal prawidłowy. WebdriverIO opakowuje `{ browserName: 'chrome' }` w `alwaysMatch` przed wysłaniem żądania. Klucze z prefiksem dostawcy pomieszane z kluczami spoza zestawu capabilities W3C są nadal odrzucane. Umieszczaj ustawienia dostawcy w `sauce:options`, `bstack:options`, `appium:options` lub innym kluczu z prefiksem.

### Odpowiedzi poleceń

Wynik polecenia to `{ "value": … }`. HTTP 200 bez `error` w `value` oznacza sukces. Brakujący element to HTTP 404 z `value.error` ustawionym na `"no such element"`, co nadal umożliwia leniwe wyszukiwanie elementu. Numeryczny `status` w treści jest ignorowany, w tym `status: 0` i stary kod `status: 7` („no such element”). Zamiast tego wysyłaj obiekt błędu W3C.

Eksportowany typ błędu `JSONWPCommandError` to teraz `SessionRequestError`.

### Serwery

Sterowniki, z którymi działa WebdriverIO, już obsługują W3C w połączeniu z klientem:

- ChromeDriver domyślnie używa W3C od Chrome 75. Edge oparty na Chromium działa tak samo. Aktualny ChromeDriver nadal akceptuje `goog:chromeOptions.w3c: false`, co przełącza tę jedną sesję z powrotem na przestarzały protokół. WebdriverIO nie obsługuje tego przełącznika.
- geckodriver i safaridriver firmy Apple obsługują wyłącznie W3C. Odpowiedź Safari, w której brakuje `platformName` lub `browserVersion`, nadal jest W3C.
- Selenium 4 i Grid 4 obsługują W3C. Grid przestał tłumaczyć JSON Wire Protocol w wersji 4.9.
- Appium 2 zrezygnowało z JSON Wire Protocol i Mobile JSON Wire Protocol. Appium 3 zrezygnowało również z pozostałych kształtów parametrów. v10 wymaga Appium 3, co opisano niżej. Sesja mobilna, w której brakuje `setWindowRect`, nadal jest W3C; ta capability oznacza, że urządzenie nie może zmieniać rozmiaru okna.

Następujące serwery nadal używają JSON Wire Protocol i nie są obsługiwane: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) oraz WinAppDriver podłączony bezpośrednio. Sterownik Appium Windows pozostaje obsługiwany jako klient W3C. Tłumaczy on polecenia na WinAppDriver, w tym Get Element Property na endpoint atrybutu. Kieruj WebdriverIO na Appium, a nie na port WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) nie sprawia, że te serwery działają z v10. Uruchomienie sesji nadal wymaga opisanej wyżej treści W3C, a wyniki poleceń nadal ignorują numeryczny `status`. Pozostań przy WebdriverIO 9, jeśli ten serwer jest nadal wymagany.

`webdriver.remote.sessionid` nie oznacza już sesji Selenium standalone. Selenium Grid 4 jest nadal wykrywany na podstawie `se:cdp`.

Klucz timeoutu `page load` opisano w sekcji [`setTimeout`](#settimeout). Identyfikatory elementów opisano w sekcji [Referencje do elementów](#element-references). Na desktopie `[name="..."]` jest selektorem CSS. Strategia lokalizowania `name` pozostaje dla sesji mobilnych.

## Appium

WebdriverIO 10 wymaga **Appium 3** i aktualnych oficjalnych sterowników (UiAutomator2, XCUITest, Espresso, Windows, Mac2 i tak dalej). Appium 1.x i 2.x nie są obsługiwane. Pozostań przy WebdriverIO 9, jeśli nie możesz zaktualizować serwera.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` deklaruje opcjonalną zależność peer `appium` w wersji `>=3` i odmawia uruchomienia starszego serwera. `create-wdio` instaluje `appium@^3`, gdy Appium jest nieobecne lub starsze niż 3.

Dostawcy chmurowi, którzy nadal udostępniają Appium 2, potrzebują obrazu z Appium 3; w przeciwnym razie musisz pozostać przy WebdriverIO 9.

### Polecenia mobilne nie przechodzą już awaryjnie na HTTP

W v9 wiele pomocników mobilnych próbowało `browser.execute('mobile: …')`, a w przypadku błędu nieznanej metody przechodziło awaryjnie na usunięty endpoint HTTP Appium. W v10 tego mechanizmu już nie ma: ten sam błąd informuje, że należy zaktualizować Appium do wersji 3. Preferuj polecenia mobilne WebdriverIO (`browser.lock()`, `browser.shake()`, …) lub bezpośrednio `browser.execute('mobile: …')`.

### Usunięte polecenia protokołu

Appium 3 [usunęło wiele przestarzałych endpointów base-driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO nie udostępnia już metod klienta dla większości tych tras (na przykład `appiumLock`, `touchPerform` i mapy Mobile JSON Wire Protocol). Zamiast nich używaj W3C Actions, odpowiedniego polecenia mobilnego lub metody `mobile:` sterownika wywoływanej przez execute.

### Zakres `--allow-insecure` w Appium

Appium 3 wymaga prefiksu sterownika lub zakresu `*` dla funkcji `--allow-insecure`, na przykład `uiautomator2:adb_shell` lub `*:adb_shell`.

### Capabilities Appium bez prefiksu nie wybierają już sesji Appium

`automationName`, `deviceName` i `appiumVersion` bez prefiksu `appium:` nie sprawiają już, że WebdriverIO pomija sterownik przeglądarki i dołącza serwis Appium. Użyj capability z prefiksem lub zagnieźdź ją w `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` emituje teraz te klucze z prefiksem, w tym `appium:app`, `appium:platformVersion` i `appium:udid`.

### `getValue` na urządzeniach mobilnych odczytuje właściwość elementu

`element.getValue()` wywołuje Get Element Property w każdej sesji, w tym w Appium 3. W sesji mobilnej wcześniej wywoływało Get Element Attribute.

### Sygnatura `stopRecordingScreen` ujednolicona z `startRecordingScreen`

`driver.stopRecordingScreen` akceptuje teraz tylko jeden argument `options` zamiast wcześniejszych 4 argumentów, zgodnie z `driver.startRecordingScreen`. Przenieś poszczególne argumenty do obiektu:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nazewnictwo multi-remote

API pisane jako `multiremote` lub `Multiremote` mają teraz zapis camelCase / PascalCase: `multiRemote` / `MultiRemote`. Stare nazwy nie mają aliasów.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` w przeglądarce oraz wynikach `$` i `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reportery) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` w `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) i `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Wyszukaj `multiremote` i `Multiremote` (z uwzględnieniem wielkości liter) i zastąp każde dopasowanie. Raporty Allure oznaczają też testy multi-remote etykietą `isMultiRemote` zamiast `isMultiremote`.

## Wirtualne wyświetlacze w Linuksie

`@wdio/xvfb` zostało zastąpione przez `@wdio/display-server`. Zamiast opakowywać każdego workera w `xvfb-run`, testrunner uruchamia jeden serwer wyświetlania dla całego przebiegu, przed hookiem `onPrepare` jakiegokolwiek serwisu. Preferuje Weston w trybie headless, a awaryjnie używa Xvfb. Szczegóły znajdziesz w sekcji [Headless i serwery wyświetlania](/docs/headless-and-display-servers).

Nazwy opcji zostały zmienione. Stare nazwy nadal działają w v10, ale wyświetlają ostrzeżenie o przestarzałości i zostaną usunięte w v11. Jeśli ustawisz obie nazwy, wygrywa nowa:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` i `xvfbRetryDelay` nie mają żadnego efektu i również zostaną usunięte w v11. Uruchamianie nie jest już ponawiane: jeśli Weston nie uruchomi się, testrunner próbuje Xvfb, a jeśli żaden się nie uruchomi, przebieg kontynuuje bez wyświetlacza.

Konfiguracja, która ustawia jedną z czterech przemianowanych opcji bez jej zamiennika i nie ustawia `displayServer`, nadal używa Xvfb, tak jak v9. O ile nie wyłącza serwera wyświetlania, wyświetla też komunikat `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Po zmianie nazw opcji dodaj `displayServer: 'xvfb'`, aby zachować Xvfb, lub pomiń tę opcję, aby preferować Weston. W trybie automatycznym niestandardowe polecenie instalacji jest uruchamiane najpierw dla Weston, a ponownie dla Xvfb tylko wtedy, gdy Weston nadal nie jest dostępny lub nie uruchamia się, a Xvfb wciąż brakuje — ustaw więc `displayServer` na serwer, który to polecenie instaluje, aby pominąć próbę z drugim serwerem.

Automatyczna instalacja nie obsługuje już `yum`, którego v9 używało na hostach bez `dnf`. v10 wykrywa tylko `apt-get`, `dnf`, `zypper`, `pacman`, `apk` i `xbps-install`, więc na hoście z samym `yum` zainstaluj Xvfb samodzielnie.

Tablica `xvfbAutoInstallCommand` była w v9 uruchamiana przez powłokę, więc elementy takie jak `&&` lub `VAR=value` działały. Tablice są teraz uruchamiane bez powłoki przy obu nazwach opcji, więc do składni powłoki używaj ciągu znaków.

Inne zmiany, które możesz zauważyć:

- Wszystkie workery współdzielą jeden wyświetlacz. W v9 każdy worker miał własny wyświetlacz. Strony w Chrome i Edge mogą teraz nie mieć fokusu, zobacz [Fokus okna](/docs/headless-and-display-servers#window-focus).
- Numer wyświetlacza Xvfb nie jest stały. Odczytuj go z `DISPLAY` zamiast zakładać `:99`.
- Host, na którym ustawiono tylko `WAYLAND_DISPLAY`, jest teraz traktowany jako posiadający wyświetlacz. v9 uruchamiało tam workery pod Xvfb, ponieważ `DISPLAY` nie było ustawione. v10 niczego nie uruchamia, otwiera okna przeglądarki w Twoim kompozytorze i ustawia na czas przebiegu `XDG_SESSION_TYPE`, `GDK_BACKEND` i `ELECTRON_OZONE_PLATFORM_HINT` na `wayland`. Aby uruchamiać je pod Xvfb jak wcześniej, usuń `WAYLAND_DISPLAY` i ustaw `displayServer: 'xvfb'`.
- Domyślny ekran ma rozdzielczość 1920x1080. v9 używało domyślnej wartości `xvfb-run`, czyli 1280x1024 w Debianie i Ubuntu oraz 640x480 w Fedorze, RHEL i Arch. Aby zachować rozmiar używany przez Twoje obrazy bazowe, ustaw na niego `displayServerWidth` i `displayServerHeight`.
- Przeglądarki wybierają Wayland lub X11 na podstawie `XDG_SESSION_TYPE` ustawianego przez serwer wyświetlania. Pod Westonem WebdriverIO dodaje też `--ozone-platform=wayland` do uruchamianych przez siebie Chrome i Edge, ponieważ Chrome i Edge starsze niż 140 (Chrome for Testing starszy niż 135) ignorują `XDG_SESSION_TYPE`. Weston nie zapewnia `DISPLAY`, więc jeśli Twoje testy lub narzędzia potrzebują X11, ustaw `displayServer: 'xvfb'`.
- Jeśli używałeś bezpośrednio `XvfbManager` lub instancji `xvfb` z `@wdio/xvfb`, użyj zamiast nich `DisplayServerManager` z `@wdio/display-server`. Tam, gdzie uruchamiałeś `xvfb.init()` i opakowywałeś polecenia w `xvfb-run` lub uruchamiałeś procesy przez `ProcessFactory`, uruchom wyświetlacz i przekaż jego środowisko procesom, które go potrzebują. Przykład używa Xvfb w rozdzielczości 1280x1024, tak jak v9 w Debianie i Ubuntu. Na hoście, na którym ustawiono tylko `WAYLAND_DISPLAY`, najpierw usuń tę zmienną, w przeciwnym razie `startDaemon()` niczego nie uruchomi:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() zwraca też null, gdy wyświetlacz już istnieje
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulacja

`browser.emulate()` steruje modułem emulacji WebDriver BiDi dla bieżącego kontekstu przeglądania najwyższego poziomu. v9 wstrzykiwało skrypt preload, który modyfikował `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` i `navigator.onLine`. Tych skryptów już nie ma. `browser.emulate('clock', …)` nadal instaluje fałszywe timery na bieżącej stronie i na stronach otwieranych później.

Przeładowanie nie jest już wymagane dla zakresów BiDi.

```diff
  await browser.emulate('onLine', false)
- // zmieniło się tylko `navigator.onLine`; ruch sieciowy nadal przepływał
+ // kontekst przeglądania jest offline, w tym fetch, WebSocket i WebTransport
```

- `onLine: false` wywołuje `emulation.setNetworkConditions` z `{ type: 'offline' }`. `true` oraz przywrócenie zakresu czyszczą to ustawienie. Przepustowość i opóźnienie pozostają w `browser.throttleNetwork()`.
- `colorScheme` ustawia funkcję mediów `prefers-color-scheme`, więc CSS `@media (prefers-color-scheme)` podąża za `matchMedia`.
- `userAgent` to nadpisanie user agenta przeglądarki, a nie zmodyfikowana właściwość `navigator.userAgent`.
- `geolocation` używa stosu geolokalizacji przeglądarki. Strona może nadal wymagać `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` zgłasza ten błąd zamiast współrzędnych.
- `colorScheme` i `media` współdzielą jedną mapę funkcji mediów. Późniejsze wywołanie zastępuje całą mapę, a przywrócenie dowolnego z tych zakresów ją czyści.
- `device` ustawia user agenta, viewport, dotyk, mobilny układ tekstu i meta viewport na podstawie deskryptora urządzenia. Nie zmienia `screen` ani `orientation`.

Nowe zakresy to `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` i `forcedColors`. Przeglądarka, która nie implementuje danego polecenia, odrzuca wywołanie z własnym błędem (`unknown command` lub `unsupported operation`). WebdriverIO nie przechodzi awaryjnie na skrypt preload ani na CDP. Jeśli `device` zostanie odrzucone w trakcie, poprzedni user agent, viewport, dotyk, układ tekstu i meta viewport zostają przywrócone.

`wdio session emulate` akceptuje te same zakresy. Nie każe już przeładowywać strony dla nadpisania, które działa natychmiast. Presety `emulate network` i `emulate cpu` pozostają bez zmian i nadal działają tylko w Chromium. Zobacz [Emulacja](/docs/emulation).

## Kolejne kroki

- Skopiuj [umiejętność migracji](#migrate-with-a-coding-agent) do projektu i poproś agenta o jej zastosowanie.
- [WebdriverIO dla agentów kodujących](/docs/ai-agents) — do pisania nowych testów w v10.
- [Headless i serwery wyświetlania](/docs/headless-and-display-servers) — gdy zestaw testów działa w Linuksie.