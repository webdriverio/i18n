---
id: allure-reporter
title: Allure Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-rapporterarplugin för att skapa [Allure-testrapporter](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## Installation

Det enklaste sättet är att inkludera `@wdio/allure-reporter` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Du kan enkelt göra det genom:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Configuration

Konfigurera utdatakatalogen i din wdio.conf.js-fil:

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
- `outputDir` är som standard `./allure-results`. Efter att en testkörning är klar kommer du att se att denna katalog har fyllts med en `.xml`-fil för varje spec, plus ett antal `.txt`- och `.png`-filer och andra bilagor.
- `disableWebdriverStepsReporting` - valfri parameter (`false` som standard), för att endast logga anpassade steg till rapportören.
- `issueLinkTemplate` - valfri parameter, för att specificera mönstret för problemlänken. Rapportören kommer att ersätta platshållaren `{}` med värdet som anges i anropet `addIssue(value)`. Samma logik tillämpas om Cucumber används och taggen `issue` är inställd på någon nivå, den kommer att konverteras till länken i rapporten. Exempel på parametervärde:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - valfri parameter, för att specificera TMS-länkmönster (Test Management System). Rapportören kommer att ersätta platshållaren `{}` med värdet som anges i anropet `addTestId(value)`. Samma logik tillämpas om Cucumber används och taggen `testId` är inställd på någon nivå, den kommer att konverteras till länken i rapporten. Exempel på parametervärde:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - valfri parameter (`false` som standard), för att inte bifoga skärmbilder till rapportören.
- `useCucumberStepReporter` - valfri parameter (`false` som standard), ställ in på true för att ändra rapportens hierarki när du använder cucumber. Prova själv och se hur det ser ut.
- `disableMochaHooks` - valfri parameter (`false` som standard), ställ in på true för att inte hämta `before/after` stacktrace/screenshot/result hooks till Allure Reporter.
- `addConsoleLogs` - valfri parameter (`false` som standard), ställ in på true för att bifoga konsollloggar från steg till rapportören.
- `reportedEnvironmentVars` (**typ:** `Record<string, string>`) - Ställ in detta alternativ för att visa miljövariabler i rapporten. Observera att detta inte ändrar de faktiska miljövariablerna.

## Stödd Allure API
* `addLabel(name, value)` - tilldela en anpassad etikett till test
* `addFeature(featureName)` – tilldela funktioner till test
* `addStory(storyName)` – tilldela användarberättelse till test
* `addSeverity(value)` – tilldela allvarlighetsgrad till test, accepterar ett av dessa värden: blocker, critical, normal, minor, trivial
* `addTag(value)` – tilldela en taggetikett till test
* `addEpic(value)` – tilldela en episk etikett till test
* `addOwner(value)` – tilldela en ägaretikett till test
* `addSuite(value)` – tilldela en suite-etikett till test
* `addSubSuite(value)` – tilldela en sub-suite-etikett till test
* `addParentSuite(value)` – tilldela en parent-suite-etikett till test
* `addIssue(value)` – tilldela problem-id till test
* `addAllureId(value)` – tilldela allure test ops-id-etikett till test
* `addTestId(value)` – tilldela TMS-test-id till test
* ~~`addEnvironment(name, value)` ~~ – en föråldrad funktion som inte längre fungerar. Använd `reportedEnvironmentVars` istället
* `addAttachment(name, content, [type])` – spara bilaga till test.
    * `name` (*String*) - bilagans namn.
    * `content` – bilagans innehåll.
    * `type` (*String*, valfritt) – bilagans MIME-typ, `text/plain` som standard
* `addArgument(name, value)` - lägg till ett ytterligare argument till test
* `addDescription(description, [type])` – lägg till beskrivning till test.
    * `description` (*String*) - beskrivning av testet.
    * `type` (*String*, valfritt) – beskrivningstyp, `text` som standard. Värden ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - lägg till steg till test.
    * `title` (*String*) - namn på steget.
    * `content` (*String*, valfritt) - stegbilaga
    * `name` (*String*, valfritt) - stegbilagans namn, `attachment` som standard.
    * `status` (*String*, valfritt) - stegstatus, `passed` som standard. Måste vara "failed", "passed" eller "broken"
* `startStep(title)` - starta med ett steg
    * `title` (*String*) - namn på steget.
* `endStep(status)` - avsluta med ett steg
    * `status` (*String*, valfritt) - stegstatus, `passed` som standard. Måste vara "failed", "passed" eller "broken"
* `step(name, body)` - startar steg med innehållsfunktion inuti. Tillåter att skapa steg med oändlig hierarki
    * `body` (*Function*) - stegets body-async-funktion

### Användning
Allure Api kan nås med:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Mocha-exempel

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Grundläggande Cucumber-exempel:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Anpassade steg

Metoden `step` förenklar hanteringen av steg eftersom varje steg presenteras som en asynkron funktion med valfritt innehåll inuti.
Det första argumentet i funktionen är det aktuella steget, som har de flesta av allure API-metoderna (som `label`, `epic`, `attach` etc):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Cucumber Tags

Cucumber-taggar med speciella namn (`issue` och `testId`) konverteras till länkar (motsvarande länkmallar måste konfigureras i förväg):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Cucumber-taggar med speciella namn (`feature`) mappas till Allure-etiketter:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Visa rapporten

Resultaten kan användas av något av de [rapporteringsverktyg](https://allurereport.org/) som erbjuds av Allure. Till exempel:

### Kommandoraden

Installera [Allure-kommandoradsverktyget](https://www.npmjs.com/package/allure-commandline) och bearbeta resultatmappen:

```sh
allure generate [allure_output_dir] && allure open
```

Detta genererar en rapport (som standard i `./allure-report`) och öppnar den i din webbläsare.

### Autogenerera rapport

Du kan också autogenerera rapporten genom att använda Allure-kommandoradsverktyget programmatiskt. För att göra det, installera paketet i ditt projekt genom:

```sh
npm i allure-commandline
```

Lägg sedan till eller utvidga din `onComplete`-hook eller skapa en [anpassad tjänst](/docs/customservices) för detta:

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

Installera och konfigurera [Allure Jenkins-pluginet](https://allurereport.org/docs/integrations-jenkins/)

## Lägg till skärmbilder

Skärmbilder kan bifogas rapporten genom att använda funktionen `takeScreenshot` från WebDriverIO i `afterTest`-hooken för Mocha och Jasmine eller `afterStep`-hooken för Cucumber.
Sätt först `disableWebdriverScreenshotsReporting: false` i rapportörsalternativen, lägg sedan till i afterStep-hooken:

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

Som visas i exemplet ovan, när denna funktion anropas, kommer en skärmbild att bifogas till allure-rapporten.