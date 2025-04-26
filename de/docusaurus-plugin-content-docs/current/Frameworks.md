---
id: frameworks
title: Frameworks
---

WebdriverIO Runner hat integrierte Unterstützung für [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) und [Cucumber.js](https://cucumber.io/). Sie können es auch mit Open-Source-Frameworks von Drittanbietern integrieren, wie z.B. [Serenity/JS](#using-serenityjs).

:::tip Integration von WebdriverIO mit Test-Frameworks
Um WebdriverIO mit einem Test-Framework zu integrieren, benötigen Sie ein Adapter-Paket, das auf NPM verfügbar ist.
Beachten Sie, dass das Adapter-Paket an derselben Stelle installiert werden muss, an der WebdriverIO installiert ist.
Wenn Sie WebdriverIO also global installiert haben, stellen Sie sicher, dass Sie das Adapter-Paket ebenfalls global installieren.
:::

Die Integration von WebdriverIO mit einem Test-Framework ermöglicht Ihnen den Zugriff auf die WebDriver-Instanz über die globale Variable `browser` in Ihren Spec-Dateien oder Step-Definitionen.
Beachten Sie, dass WebdriverIO auch die Instanziierung und Beendigung der Selenium-Sitzung übernimmt, sodass Sie dies nicht selbst tun müssen.

## Verwendung von Mocha

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Standardmäßig bietet WebdriverIO eine [Assertion-Bibliothek](assertion), die integriert ist und mit der Sie sofort beginnen können:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO unterstützt Mochas `BDD` (Standard), `TDD` und `QUnit` [Interfaces](https://mochajs.org/#interfaces).

Wenn Sie Ihre Specs im TDD-Stil schreiben möchten, setzen Sie die `ui`-Eigenschaft in Ihrer `mochaOpts`-Konfiguration auf `tdd`. Jetzt sollten Ihre Testdateien so geschrieben werden:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Wenn Sie andere Mocha-spezifische Einstellungen definieren möchten, können Sie dies mit dem Schlüssel `mochaOpts` in Ihrer Konfigurationsdatei tun. Eine Liste aller Optionen finden Sie auf der [Mocha-Projektwebsite](https://mochajs.org/api/mocha).

__Hinweis:__ WebdriverIO unterstützt nicht die veraltete Verwendung von `done`-Callbacks in Mocha:

```js
it('should test something', (done) => {
    done() // wirft "done is not a function"
})
```

### Mocha-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` angewendet werden, um Ihre Mocha-Umgebung zu konfigurieren. __Hinweis:__ Nicht alle Optionen werden unterstützt, z.B. führt die Anwendung der Option `parallel` zu einem Fehler, da der WDIO-Testrunner seine eigene Methode hat, Tests parallel auszuführen. Sie können diese Framework-Optionen als Argumente übergeben, z.B.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Dies übergibt die folgenden Mocha-Optionen:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Die folgenden Mocha-Optionen werden unterstützt:

#### require
Die Option `require` ist nützlich, wenn Sie grundlegende Funktionalitäten hinzufügen oder erweitern möchten (WebdriverIO-Framework-Option).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Verwenden Sie das/die angegebene(n) Modul(e), um Dateien zu kompilieren. Compiler werden vor Requires eingebunden (WebdriverIO-Framework-Option).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Nicht abgefangene Fehler weitergeben.

Type: `boolean`<br />
Default: `false`

#### bail
Nach dem ersten Testfehler abbrechen.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Auf Lecks globaler Variablen prüfen.

Type: `boolean`<br />
Default: `false`

#### delay
Ausführung der Root-Suite verzögern.

Type: `boolean`<br />
Default: `false`

#### fgrep
Testfilter für einen bestimmten String.

Type: `string`<br />
Default: `null`

#### forbidOnly
Tests, die mit `only` markiert sind, lassen die Suite fehlschlagen.

Type: `boolean`<br />
Default: `false`

#### forbidPending
Ausstehende Tests lassen die Suite fehlschlagen.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Vollständiger Stacktrace bei Fehlern.

Type: `boolean`<br />
Default: `false`

#### global
Variablen, die im globalen Bereich erwartet werden.

Type: `string[]`<br />
Default: `[]`

#### grep
Testfilter für einen bestimmten regulären Ausdruck.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Testfilterübereinstimmungen umkehren.

Type: `boolean`<br />
Default: `false`

#### retries
Anzahl der Wiederholungsversuche für fehlgeschlagene Tests.

Type: `number`<br />
Default: `0`

#### timeout
Timeout-Schwellenwert (in ms).

Type: `number`<br />
Default: `30000`

## Verwendung von Jasmine

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Sie können dann Ihre Jasmine-Umgebung konfigurieren, indem Sie eine `jasmineOpts`-Eigenschaft in Ihrer Konfiguration festlegen. Eine Liste aller Optionen finden Sie auf der [Jasmine-Projektwebsite](https://jasmine.github.io/api/3.5/Configuration.html).

### Jasmine-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` angewendet werden, um Ihre Jasmine-Umgebung mit der Eigenschaft `jasmineOpts` zu konfigurieren. Weitere Informationen zu diesen Konfigurationsoptionen finden Sie in der [Jasmine-Dokumentation](https://jasmine.github.io/api/edge/Configuration). Sie können diese Framework-Optionen als Argumente übergeben, z.B.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Dies übergibt die folgenden Mocha-Optionen:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Die folgenden Jasmine-Optionen werden unterstützt:

#### defaultTimeoutInterval
Standard-Timeout-Intervall für Jasmine-Operationen.

Type: `number`<br />
Default: `60000`

#### helpers
Array von Dateipfaden (und Globs) relativ zu spec_dir, die vor Jasmine-Specs eingebunden werden sollen.

Type: `string[]`<br />
Default: `[]`

#### requires
Die Option `requires` ist nützlich, wenn Sie grundlegende Funktionalitäten hinzufügen oder erweitern möchten.

Type: `string[]`<br />
Default: `[]`

#### random
Ob die Reihenfolge der Spec-Ausführung zufällig sein soll.

Type: `boolean`<br />
Default: `true`

#### seed
Seed, der als Grundlage für die Zufälligkeit verwendet wird. Null bewirkt, dass der Seed zu Beginn der Ausführung zufällig bestimmt wird.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Ob die Spec fehlschlagen soll, wenn sie keine Erwartungen ausgeführt hat. Standardmäßig wird eine Spec, die keine Erwartungen ausgeführt hat, als bestanden gemeldet. Wenn Sie dies auf true setzen, wird eine solche Spec als Fehler gemeldet.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Ob Specs nur einen Erwartungsfehler haben sollen.

Type: `boolean`<br />
Default: `false`

#### specFilter
Funktion zur Filterung von Specs.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Nur Tests ausführen, die mit diesem String oder regulären Ausdruck übereinstimmen. (Nur anwendbar, wenn keine benutzerdefinierte `specFilter`-Funktion festgelegt ist)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Wenn true, kehrt es die übereinstimmenden Tests um und führt nur Tests aus, die nicht mit dem in `grep` verwendeten Ausdruck übereinstimmen. (Nur anwendbar, wenn keine benutzerdefinierte `specFilter`-Funktion festgelegt ist)

Type: `boolean`<br />
Default: `false`

## Verwendung von Cucumber

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Wenn Sie Cucumber verwenden möchten, setzen Sie die `framework`-Eigenschaft auf `cucumber`, indem Sie `framework: 'cucumber'` zur [Konfigurationsdatei](configurationfile) hinzufügen.

Optionen für Cucumber können in der Konfigurationsdatei mit `cucumberOpts` angegeben werden. Die vollständige Liste der Optionen finden Sie [hier](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Um schnell mit Cucumber zu beginnen, schauen Sie sich unser [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate)-Projekt an, das mit allen Step-Definitionen geliefert wird, die Sie zum Starten benötigen, und Sie können sofort Feature-Dateien schreiben.

### Cucumber-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` angewendet werden, um Ihre Cucumber-Umgebung mit der Eigenschaft `cucumberOpts` zu konfigurieren:

:::tip Anpassen von Optionen über die Kommandozeile
Die `cucumberOpts`, wie benutzerdefinierte `tags` zum Filtern von Tests, können über die Kommandozeile angegeben werden. Dies geschieht durch Verwendung des Formats `cucumberOpts.{optionName}="value"`.

Wenn Sie beispielsweise nur die Tests ausführen möchten, die mit `@smoke` gekennzeichnet sind, können Sie den folgenden Befehl verwenden:

```sh
# Wenn Sie nur Tests ausführen möchten, die das Tag "@smoke" haben
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Dieser Befehl setzt die Option `tags` in `cucumberOpts` auf `@smoke`, wodurch sichergestellt wird, dass nur Tests mit diesem Tag ausgeführt werden.

:::

#### backtrace
Vollständigen Backtrace für Fehler anzeigen.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Module vor dem Laden von Support-Dateien laden.

Type: `string[]`<br />
Default: `[]`<br />
Beispiel:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // oder
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
Ausführung beim ersten Fehler abbrechen.

Type: `boolean`<br />
Default: `false`

#### name
Nur Szenarien ausführen, deren Name mit dem Ausdruck übereinstimmt (wiederholbar).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Dateien mit Ihren Step-Definitionen vor der Ausführung von Features laden. Sie können auch einen Glob für Ihre Step-Definitionen angeben.

Type: `string[]`<br />
Default: `[]`
Beispiel:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Pfade zu Ihrem Support-Code, für ESM.

Type: `String[]`<br />
Default: `[]`
Beispiel:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Fehlschlagen, wenn es undefinierte oder ausstehende Schritte gibt.

Type: `boolean`<br />
Default: `false`

#### tags
Nur Features oder Szenarien mit Tags ausführen, die dem Ausdruck entsprechen.
Weitere Informationen finden Sie in der [Cucumber-Dokumentation](https://docs.cucumber.io/cucumber/api/#tag-expressions).

Type: `String`<br />
Default: ``

#### timeout
Timeout in Millisekunden für Step-Definitionen.

Type: `Number`<br />
Default: `30000`

#### retry
Geben Sie die Anzahl der Wiederholungsversuche für fehlgeschlagene Testfälle an.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Nur Features oder Szenarien mit Tags wiederholen, die dem Ausdruck entsprechen (wiederholbar). Diese Option erfordert, dass '--retry' angegeben wird.

Type: `RegExp`

#### language
Standardsprache für Ihre Feature-Dateien

Type: `String`<br />
Default: `en`

#### order
Tests in definierter / zufälliger Reihenfolge ausführen

Type: `String`<br />
Default: `defined`

#### format
Name und Ausgabedateipfad des zu verwendenden Formatters.
WebdriverIO unterstützt hauptsächlich nur die [Formatters](https://github.