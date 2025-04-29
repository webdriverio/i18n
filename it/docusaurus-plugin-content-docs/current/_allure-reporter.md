---
id: allure-reporter
title: Allure Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin reporter di WebdriverIO per creare [Rapporti di Test Allure](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## Installazione

Il modo più semplice è includere `@wdio/allure-reporter` come devDependency nel tuo `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Puoi farlo semplicemente con:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Configurazione

Configura la directory di output nel tuo file wdio.conf.js:

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
- `outputDir` è impostato di default su `./allure-results`. Dopo l'esecuzione di un test, troverai questa directory popolata con un file `.xml` per ogni spec, più una serie di file `.txt` e `.png` e altri allegati.
- `disableWebdriverStepsReporting` - parametro opzionale (`false` di default), per registrare solo i passaggi personalizzati nel reporter.
- `issueLinkTemplate` - parametro opzionale, per specificare il modello di link per i problemi. Il reporter sostituirà il segnaposto `{}` con il valore specificato nella chiamata `addIssue(value)`. La stessa logica viene applicata se si utilizza Cucumber e il tag `issue` è impostato a qualsiasi livello, sarà convertito in un link nel report. Esempio di valore del parametro:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - parametro opzionale, per specificare il modello di link TMS (Test Management System). Il reporter sostituirà il segnaposto `{}` con il valore specificato nella chiamata `addTestId(value)`. La stessa logica viene applicata se si utilizza Cucumber e il tag `testId` è impostato a qualsiasi livello, sarà convertito in un link nel report. Esempio di valore del parametro:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - parametro opzionale (`false` di default), per non allegare screenshot al reporter.
- `useCucumberStepReporter` - parametro opzionale (`false` di default), impostalo a true per modificare la gerarchia del report quando si utilizza cucumber. Provalo e vedi come appare.
- `disableMochaHooks` - parametro opzionale (`false` di default), impostalo a true per non recuperare gli hook `before/after` stacktrace/screenshot/result nel Reporter Allure.
- `addConsoleLogs` - parametro opzionale (`false` di default), impostalo a true per allegare i log della console dal passaggio al reporter.
- `reportedEnvironmentVars` (**tipo:** `Record<string, string>`) - Imposta questa opzione per visualizzare le variabili d'ambiente nel report. Nota che questa impostazione non modifica le variabili d'ambiente effettive.

## API Allure supportate
* `addLabel(name, value)` - assegna un'etichetta personalizzata al test
* `addFeature(featureName)` – assegna funzionalità al test
* `addStory(storyName)` – assegna una user story al test
* `addSeverity(value)` – assegna la gravità al test, accetta uno di questi valori: blocker, critical, normal, minor, trivial
* `addTag(value)` – assegna un'etichetta tag al test
* `addEpic(value)` – assegna un'etichetta epic al test
* `addOwner(value)` – assegna un'etichetta proprietario al test
* `addSuite(value)` – assegna un'etichetta suite al test
* `addSubSuite(value)` – assegna un'etichetta sub suite al test
* `addParentSuite(value)` – assegna un'etichetta parent suite al test
* `addIssue(value)` – assegna un ID problema al test
* `addAllureId(value)` – assegna un'etichetta ID test ops Allure al test
* `addTestId(value)` – assegna un ID test TMS al test
* ~~`addEnvironment(name, value)` ~~ – una funzione deprecata che non funziona più. Usa `reportedEnvironmentVars` invece
* `addAttachment(name, content, [type])` – salva un allegato al test.
    * `name` (*String*) - nome dell'allegato.
    * `content` – contenuto dell'allegato.
    * `type` (*String*, opzionale) – MIME-type dell'allegato, `text/plain` di default
* `addArgument(name, value)` - aggiunge un argomento aggiuntivo al test
* `addDescription(description, [type])` – aggiunge una descrizione al test.
    * `description` (*String*) - descrizione del test.
    * `type` (*String*, opzionale) – tipo di descrizione, `text` di default. Valori ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - aggiunge un passaggio al test.
    * `title` (*String*) - nome del passaggio.
    * `content` (*String*, opzionale) - allegato del passaggio
    * `name` (*String*, opzionale) - nome dell'allegato al passaggio, `attachment` di default.
    * `status` (*String*, opzionale) - stato del passaggio, `passed` di default. Deve essere "failed", "passed" o "broken"
* `startStep(title)` - inizia con un passaggio
    * `title` (*String*) - nome del passaggio.
* `endStep(status)` - termina con un passaggio
    * `status` (*String*, opzionale) - stato del passaggio, `passed` di default. Deve essere "failed", "passed" o "broken"
* `step(name, body)` - inizia il passaggio con la funzione di contenuto all'interno. Permette di creare passaggi con gerarchia infinita
    * `body` (*Function*) - la funzione asincrona del corpo del passaggio

### Utilizzo
Si può accedere all'API Allure usando:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Esempio Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Esempio base di Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Passaggi personalizzati

Il metodo `step` semplifica la gestione dei passaggi perché ogni passaggio si presenta come una funzione asincrona con qualsiasi contenuto all'interno.
Il primo argomento della funzione è il passaggio corrente, che ha la maggior parte dei metodi API di allure (come `label`, `epic`, `attach` ecc):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Tag Cucumber

I tag Cucumber con nomi speciali (`issue` e `testId`) vengono convertiti in link (i modelli di link corrispondenti devono essere configurati in precedenza):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

I tag Cucumber con nomi speciali (`feature`) sono mappati alle etichette Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Visualizzazione del report

I risultati possono essere utilizzati da qualsiasi [strumento di reporting](https://allurereport.org/) offerto da Allure. Per esempio:

### Linea di comando

Installa lo [strumento a linea di comando Allure](https://www.npmjs.com/package/allure-commandline) e processa la directory dei risultati:

```sh
allure generate [allure_output_dir] && allure open
```

Questo genererà un report (per default in `./allure-report`) e lo aprirà nel tuo browser.

### Generazione automatica del report

Puoi anche generare automaticamente il report utilizzando lo strumento a linea di comando Allure in modo programmatico. Per farlo installa il pacchetto nel tuo progetto con:

```sh
npm i allure-commandline
```

Quindi aggiungi o estendi il tuo hook `onComplete` o crea un [servizio personalizzato](/docs/customservices) per questo:

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

Installa e configura il [plugin Jenkins Allure](https://allurereport.org/docs/integrations-jenkins/)

## Aggiungere Screenshot

Gli screenshot possono essere allegati al report utilizzando la funzione `takeScreenshot` di WebDriverIO nell'hook `afterTest` per Mocha e Jasmine o nell'hook `afterStep` per Cucumber.
Prima imposta `disableWebdriverScreenshotsReporting: false` nelle opzioni del reporter, poi aggiungi nell'hook afterStep:

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

Come mostrato nell'esempio sopra, quando questa funzione viene chiamata, un'immagine screenshot sarà allegata al report Allure.