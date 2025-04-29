---
id: allure-reporter
title: Raportowanie Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Wtyczka raportująca dla WebdriverIO do tworzenia [Raportów Testowych Allure](https://allurereport.org/docs/webdriverio/).

![Przykład Raportera Allure](/img/allure.png)

## Instalacja

Najprostszym sposobem jest dołączenie `@wdio/allure-reporter` jako devDependency w pliku `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Możesz to zrobić po prostu przez:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Konfiguracja

Skonfiguruj katalog wyjściowy w pliku wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` domyślnie to `./allure-results`. Po zakończeniu testów, w tym katalogu znajdziesz pliki `.xml` dla każdej specyfikacji, a także wiele plików `.txt`, `.png` i innych załączników.
- `disableWebdriverStepsReporting` - opcjonalny parametr (`false` domyślnie), aby logować tylko niestandardowe kroki do raportera.
- `issueLinkTemplate` - opcjonalny parametr, aby określić szablon linku do problemu. Reporter zastąpi `{}` wartością podaną w wywołaniu `addIssue(value)`. Ta sama logika jest stosowana, jeśli używany jest Cucumber i tag `issue` jest ustawiony na dowolnym poziomie, zostanie on przekształcony w link w raporcie. Przykładowa wartość parametru:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - opcjonalny parametr, aby określić szablon linku do TMS (System Zarządzania Testami). Reporter zastąpi `{}` wartością podaną w wywołaniu `addTestId(value)`. Ta sama logika jest stosowana, jeśli używany jest Cucumber i tag `testId` jest ustawiony na dowolnym poziomie, zostanie on przekształcony w link w raporcie. Przykładowa wartość parametru:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - opcjonalny parametr (`false` domyślnie), aby nie załączać zrzutów ekranu do raportera.
- `useCucumberStepReporter` - opcjonalny parametr (`false` domyślnie), ustaw na true, aby zmienić hierarchię raportów podczas korzystania z Cucumber. Wypróbuj to samodzielnie i zobacz, jak to wygląda.
- `disableMochaHooks` - opcjonalny parametr (`false` domyślnie), ustaw na true, aby nie pobierać haków `before/after` stacktrace/screenshot/result do Allure Reporter.
- `addConsoleLogs` - opcjonalny parametr (`false` domyślnie), ustaw na true, aby załączyć logi konsoli z kroku do raportera.
- `reportedEnvironmentVars` (**typ:** `Record<string, string>`) - Ustaw tę opcję, aby wyświetlić zmienne środowiskowe w raporcie. Pamiętaj, że ustawienie tego nie modyfikuje rzeczywistych zmiennych środowiskowych.

## Obsługiwane API Allure
* `addLabel(name, value)` - przypisz niestandardową etykietę do testu
* `addFeature(featureName)` – przypisz funkcje do testu
* `addStory(storyName)` – przypisz historię użytkownika do testu
* `addSeverity(value)` – przypisz ważność do testu, akceptuje jedną z tych wartości: blocker, critical, normal, minor, trivial
* `addTag(value)` – przypisz etykietę tagu do testu
* `addEpic(value)` – przypisz etykietę epiki do testu
* `addOwner(value)` – przypisz etykietę właściciela do testu
* `addSuite(value)` – przypisz etykietę zestawu do testu
* `addSubSuite(value)` – przypisz etykietę podzespołu do testu
* `addParentSuite(value)` – przypisz etykietę nadrzędnego zestawu do testu
* `addIssue(value)` – przypisz identyfikator problemu do testu
* `addAllureId(value)` – przypisz etykietę allure test ops id do testu
* `addTestId(value)` – przypisz identyfikator TMS do testu
* ~~`addEnvironment(name, value)` ~~ – przestarzała funkcja, która już nie działa. Zamiast tego użyj `reportedEnvironmentVars`
* `addAttachment(name, content, [type])` – zapisz załącznik do testu.
    * `name` (*String*) - nazwa załącznika.
    * `content` – zawartość załącznika.
    * `type` (*String*, opcjonalnie) – typ MIME załącznika, domyślnie `text/plain`
* `addArgument(name, value)` - dodaj dodatkowy argument do testu
* `addDescription(description, [type])` – dodaj opis do testu.
    * `description` (*String*) - opis testu.
    * `type` (*String*, opcjonalnie) – typ opisu, domyślnie `text`. Wartości ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - dodaj krok do testu.
    * `title` (*String*) - nazwa kroku.
    * `content` (*String*, opcjonalnie) - załącznik kroku
    * `name` (*String*, opcjonalnie) - nazwa załącznika kroku, domyślnie `attachment`.
    * `status` (*String*, opcjonalnie) - status kroku, domyślnie `passed`. Musi być "failed", "passed" lub "broken"
* `startStep(title)` - rozpocznij krok
    * `title` (*String*) - nazwa kroku.
* `endStep(status)` - zakończ krok
    * `status` (*String*, opcjonalnie) - status kroku, domyślnie `passed`. Musi być "failed", "passed" lub "broken"
* `step(name, body)` - rozpoczyna krok z funkcją zawartości wewnątrz. Umożliwia tworzenie kroków z nieskończoną hierarchią
    * `body` (*Function*) - funkcja asynchroniczna zawartości kroku

### Użycie
Dostęp do API Allure można uzyskać za pomocą:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Przykład Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Podstawowy przykład Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Niestandardowe kroki

Metoda `step` upraszcza obsługę kroków, ponieważ każdy krok reprezentowany jest jako funkcja asynchroniczna z dowolną zawartością wewnątrz.
Pierwszy argument funkcji to bieżący krok, który ma większość metod API allure (takich jak `label`, `epic`, `attach` itp.):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // możesz dodać dowolną kombinację kroków w funkcji ciała
    })
})
```

##### Tagi Cucumber

Tagi Cucumber o specjalnych nazwach (`issue` i `testId`) są konwertowane na linki (odpowiednie szablony linków muszą być wcześniej skonfigurowane):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Tagi Cucumber o specjalnych nazwach (`feature`) są mapowane na etykiety Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Wyświetlanie raportu

Wyniki mogą być wykorzystywane przez dowolne [narzędzia raportujące](https://allurereport.org/) oferowane przez Allure. Na przykład:

### Command-line

Zainstaluj [narzędzie wiersza poleceń Allure](https://www.npmjs.com/package/allure-commandline) i przetwórz katalog wyników:

```sh
allure generate [allure_output_dir] && allure open
```

To wygeneruje raport (domyślnie w `./allure-report`) i otworzy go w przeglądarce.

### Automatyczne generowanie raportu

Możesz również automatycznie generować raport za pomocą narzędzia wiersza poleceń Allure programowo. Aby to zrobić, zainstaluj pakiet w swoim projekcie:

```sh
npm i allure-commandline
```

Następnie dodaj lub rozszerz swój hook `onComplete` lub stwórz [niestandardową usługę](/docs/customservices) do tego celu:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

Zainstaluj i skonfiguruj [wtyczkę Jenkins Allure](https://allurereport.org/docs/integrations-jenkins/)

## Dodawanie zrzutów ekranu

Zrzuty ekranu można dołączyć do raportu, używając funkcji `takeScreenshot` z WebDriverIO w hooku `afterTest` dla Mocha i Jasmine lub hooku `afterStep` dla Cucumber.
Najpierw ustaw `disableWebdriverScreenshotsReporting: false` w opcjach reportera, a następnie dodaj w hooku afterStep:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

Jak pokazano w powyższym przykładzie, gdy ta funkcja zostanie wywołana, obraz zrzutu ekranu zostanie dołączony do raportu allure.