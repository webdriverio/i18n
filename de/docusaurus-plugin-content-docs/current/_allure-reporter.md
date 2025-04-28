---
id: allure-reporter
title: Allure Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Ein WebdriverIO Reporter-Plugin zum Erstellen von [Allure Test Reports](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## Installation

Der einfachste Weg ist, `@wdio/allure-reporter` als devDependency in Ihre `package.json` aufzunehmen.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Sie können dies einfach tun mit:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Konfiguration

Konfigurieren Sie das Ausgabeverzeichnis in Ihrer wdio.conf.js-Datei:

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
- `outputDir` ist standardmäßig `./allure-results`. Nach Abschluss eines Testlaufs werden Sie feststellen, dass dieses Verzeichnis mit einer `.xml`-Datei für jede Spezifikation sowie einer Reihe von `.txt`- und `.png`-Dateien und anderen Anhängen gefüllt wurde.
- `disableWebdriverStepsReporting` - optionaler Parameter (standardmäßig `false`), um nur benutzerdefinierte Schritte für den Reporter zu protokollieren.
- `issueLinkTemplate` - optionaler Parameter, um das Issue-Link-Muster anzugeben. Der Reporter ersetzt den Platzhalter `{}` durch den Wert, der im Aufrufparameter `addIssue(value)` angegeben wurde. Die gleiche Logik wird angewendet, wenn Cucumber verwendet wird und das Tag `issue` auf beliebiger Ebene gesetzt ist, es wird im Bericht in einen Link umgewandelt. Beispiel für den Parameterwert:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - optionaler Parameter, um das TMS (Test Management System) Link-Muster anzugeben. Der Reporter ersetzt den Platzhalter `{}` durch den Wert, der im Aufrufparameter `addTestId(value)` angegeben wurde. Die gleiche Logik wird angewendet, wenn Cucumber verwendet wird und das Tag `testId` auf beliebiger Ebene gesetzt ist, es wird im Bericht in einen Link umgewandelt. Beispiel für den Parameterwert:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - optionaler Parameter (standardmäßig `false`), um keine Screenshots an den Reporter anzuhängen.
- `useCucumberStepReporter` - optionaler Parameter (standardmäßig `false`), auf `true` setzen, um die Berichtshierarchie bei Verwendung von Cucumber zu ändern. Probieren Sie es selbst aus und sehen Sie, wie es aussieht.
- `disableMochaHooks` - optionaler Parameter (standardmäßig `false`), auf `true` setzen, um die `before/after` Stacktrace/Screenshot/Result-Hooks nicht in den Allure Reporter einzubinden.
- `addConsoleLogs` - optionaler Parameter (standardmäßig `false`), auf `true` setzen, um Konsolenprotokolle vom Schritt an den Reporter anzuhängen.
- `reportedEnvironmentVars` (**Typ:** `Record<string, string>`) - Setzen Sie diese Option, um die Umgebungsvariablen im Bericht anzuzeigen. Beachten Sie, dass das Setzen dieser Option die tatsächlichen Umgebungsvariablen nicht ändert.

## Unterstützte Allure API
* `addLabel(name, value)` - weist einem Test ein benutzerdefiniertes Label zu
* `addFeature(featureName)` – weist einem Test Features zu
* `addStory(storyName)` – weist einem Test eine User Story zu
* `addSeverity(value)` – weist einem Test einen Schweregrad zu, akzeptiert einen dieser Werte: blocker, critical, normal, minor, trivial
* `addTag(value)` – weist einem Test ein Tag-Label zu
* `addEpic(value)` – weist einem Test ein Epic-Label zu
* `addOwner(value)` – weist einem Test ein Owner-Label zu
* `addSuite(value)` – weist einem Test ein Suite-Label zu
* `addSubSuite(value)` – weist einem Test ein Untersuite-Label zu
* `addParentSuite(value)` – weist einem Test ein übergeordnetes Suite-Label zu
* `addIssue(value)` – weist einem Test eine Issue-ID zu
* `addAllureId(value)` – weist einem Test eine Allure Test Ops ID zu
* `addTestId(value)` – weist einem Test eine TMS-Test-ID zu
* ~~`addEnvironment(name, value)` ~~ – eine veraltete Funktion, die nicht mehr funktioniert. Verwenden Sie stattdessen `reportedEnvironmentVars`
* `addAttachment(name, content, [type])` – speichert einen Anhang zum Test.
    * `name` (*String*) - Name des Anhangs.
    * `content` – Inhalt des Anhangs.
    * `type` (*String*, optional) – MIME-Typ des Anhangs, standardmäßig `text/plain`
* `addArgument(name, value)` - fügt einem Test ein zusätzliches Argument hinzu
* `addDescription(description, [type])` – fügt einem Test eine Beschreibung hinzu.
    * `description` (*String*) - Beschreibung des Tests.
    * `type` (*String*, optional) – Beschreibungstyp, standardmäßig `text`. Werte ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - fügt einem Test einen Schritt hinzu.
    * `title` (*String*) - Name des Schritts.
    * `content` (*String*, optional) - Schrittanhang
    * `name` (*String*, optional) - Name des Schrittanhangs, standardmäßig `attachment`.
    * `status` (*String*, optional) - Schrittstatus, standardmäßig `passed`. Muss "failed", "passed" oder "broken" sein
* `startStep(title)` - beginnt mit einem Schritt
    * `title` (*String*) - Name des Schritts.
* `endStep(status)` - beendet einen Schritt
    * `status` (*String*, optional) - Schrittstatus, standardmäßig `passed`. Muss "failed", "passed" oder "broken" sein
* `step(name, body)` - beginnt einen Schritt mit einer Inhaltsfunktion. Ermöglicht das Erstellen von Schritten mit unendlicher Hierarchie
    * `body` (*Function*) - die asynchrone Funktion des Schrittkörpers

### Verwendung
Auf die Allure API kann wie folgt zugegriffen werden:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Mocha-Beispiel

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Einfaches Cucumber-Beispiel:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Benutzerdefinierte Schritte

Die Methode `step` vereinfacht den Umgang mit Schritten, da jeder Schritt als asynchrone Funktion mit beliebigem Inhalt präsentiert wird.
Das erste Argument der Funktion ist der aktuelle Schritt, der die meisten Allure-API-Methoden (wie `label`, `epic`, `attach` usw.) enthält:

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Cucumber-Tags

Cucumber-Tags mit speziellen Namen (`issue` und `testId`) werden in Links umgewandelt (die entsprechenden Link-Vorlagen müssen vorher konfiguriert werden):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Cucumber-Tags mit speziellen Namen (`feature`) werden auf Allure-Labels abgebildet:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Anzeigen des Berichts

Die Ergebnisse können von jedem der von Allure angebotenen [Reporting-Tools](https://allurereport.org/) verwendet werden. Zum Beispiel:

### Kommandozeile

Installieren Sie das [Allure-Kommandozeilentool](https://www.npmjs.com/package/allure-commandline) und verarbeiten Sie das Ergebnisverzeichnis:

```sh
allure generate [allure_output_dir] && allure open
```

Dies generiert einen Bericht (standardmäßig in `./allure-report`) und öffnet ihn in Ihrem Browser.

### Automatische Berichtsgenerierung

Sie können den Bericht auch automatisch erstellen, indem Sie das Allure-Kommandozeilentool programmgesteuert verwenden. Installieren Sie dazu das Paket in Ihrem Projekt mit:

```sh
npm i allure-commandline
```

Fügen Sie dann Ihren `onComplete`-Hook hinzu oder erweitern Sie ihn, oder erstellen Sie einen [benutzerdefinierten Service](/docs/customservices) dafür:

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

Installieren und konfigurieren Sie das [Allure Jenkins-Plugin](https://allurereport.org/docs/integrations-jenkins/)

## Screenshots hinzufügen

Screenshots können dem Bericht hinzugefügt werden, indem die Funktion `takeScreenshot` von WebDriverIO im `afterTest`-Hook für Mocha und Jasmine oder im `afterStep`-Hook für Cucumber verwendet wird.
Setzen Sie zuerst `disableWebdriverScreenshotsReporting: false` in den Reporter-Optionen und fügen Sie dann im afterStep-Hook hinzu:

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

Wie im obigen Beispiel gezeigt, wird bei Aufruf dieser Funktion ein Screenshot-Bild an den Allure-Bericht angehängt.