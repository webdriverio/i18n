---
id: retry
title: Flaky Tests wiederholen
---

Mit dem WebdriverIO Testrunner können Sie bestimmte Tests wiederholen, die aufgrund von Faktoren wie instabilen Netzwerken oder Race Conditions unzuverlässig sind. (Es wird jedoch nicht empfohlen, einfach die Wiederholungsrate zu erhöhen, wenn Tests instabil werden!)

## Suites in Mocha wiederholen

Seit Version 3 von Mocha können Sie ganze Test-Suites wiederholen (alles innerhalb eines `describe`-Blocks). Wenn Sie Mocha verwenden, sollten Sie diesen Wiederholungsmechanismus bevorzugen, anstatt die WebdriverIO-Implementierung zu nutzen, die nur das Wiederholen bestimmter Testblöcke (alles innerhalb eines `it`-Blocks) erlaubt. Um die `this.retries()`-Methode zu verwenden, muss der Suite-Block `describe` eine ungebundene Funktion `function(){}` anstelle einer Fat-Arrow-Funktion `() => {}` verwenden, wie in der [Mocha-Dokumentation](https://mochajs.org/#arrow-functions) beschrieben. Mit Mocha können Sie auch eine Wiederholungsanzahl für alle Specs mit `mochaOpts.retries` in Ihrer `wdio.conf.js` festlegen.

Hier ist ein Beispiel:

```js
describe('retries', function () {
    // Alle Tests in dieser Suite bis zu 4 Mal wiederholen
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Legt fest, dass dieser Test nur bis zu 2 Mal wiederholt wird
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Einzelne Tests in Jasmine oder Mocha wiederholen

Um einen bestimmten Testblock zu wiederholen, können Sie einfach die Anzahl der Wiederholungen als letzten Parameter nach der Testblock-Funktion angeben:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Das Gleiche funktioniert auch für Hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Das Gleiche funktioniert auch für Hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Wenn Sie Jasmine verwenden, ist der zweite Parameter für das Timeout reserviert. Um einen Wiederholungsparameter anzuwenden, müssen Sie das Timeout auf seinen Standardwert `jasmine.DEFAULT_TIMEOUT_INTERVAL` setzen und dann Ihre Wiederholungsanzahl angeben.

</TabItem>
</Tabs>

Dieser Wiederholungsmechanismus erlaubt nur das Wiederholen einzelner Hooks oder Testblöcke. Wenn Ihr Test mit einem Hook zur Einrichtung Ihrer Anwendung einhergeht, wird dieser Hook nicht ausgeführt. [Mocha bietet](https://mochajs.org/#retry-tests) native Testwiederholungen, die dieses Verhalten ermöglichen, während Jasmine dies nicht tut. Sie können auf die Anzahl der ausgeführten Wiederholungen im `afterTest`-Hook zugreifen.

## Wiederholungen in Cucumber

### Vollständige Suites in Cucumber wiederholen

Für Cucumber >=6 können Sie die [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests)-Konfigurationsoption zusammen mit einem optionalen `retryTagFilter`-Parameter angeben, damit alle oder einige Ihrer fehlgeschlagenen Szenarien zusätzliche Wiederholungen erhalten, bis sie erfolgreich sind. Damit diese Funktion funktioniert, müssen Sie `scenarioLevelReporter` auf `true` setzen.

### Step Definitions in Cucumber wiederholen

Um eine Wiederholungsrate für bestimmte Step Definitions zu definieren, wenden Sie einfach eine Retry-Option darauf an, wie:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Wiederholungen können nur in Ihrer Step-Definitions-Datei definiert werden, niemals in Ihrer Feature-Datei.

## Wiederholungen auf Basis einzelner Specdateien hinzufügen

Bisher waren nur Test- und Suite-Level-Wiederholungen verfügbar, was in den meisten Fällen ausreicht.

Aber bei Tests, die Zustandsänderungen beinhalten (wie auf einem Server oder in einer Datenbank), kann der Zustand nach dem ersten Testfehler ungültig bleiben. Nachfolgende Wiederholungen haben möglicherweise keine Chance zu bestehen, da sie mit einem ungültigen Zustand beginnen würden.

Für jede Specdatei wird eine neue `browser`-Instanz erstellt, was dies zu einem idealen Ort macht, um andere Zustände (Server, Datenbanken) einzurichten. Wiederholungen auf dieser Ebene bedeuten, dass der gesamte Einrichtungsprozess einfach wiederholt wird, genau wie bei einer neuen Specdatei.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Einen bestimmten Test mehrmals ausführen

Dies soll verhindern, dass flaky Tests in eine Codebasis eingeführt werden. Durch Hinzufügen der `--repeat`-CLI-Option werden die angegebenen Specs oder Suites N-mal ausgeführt. Bei Verwendung dieses CLI-Flags muss auch das `--spec`- oder `--suite`-Flag angegeben werden.

Wenn neue Tests zu einer Codebasis hinzugefügt werden, insbesondere durch einen CI/CD-Prozess, könnten die Tests bestehen und zusammengeführt werden, aber später instabil werden. Diese Instabilität kann durch verschiedene Faktoren wie Netzwerkprobleme, Serverauslastung, Datenbankgröße usw. verursacht werden. Die Verwendung des `--repeat`-Flags in Ihrem CI/CD-Prozess kann helfen, diese flaky Tests zu erkennen, bevor sie in eine Hauptcodebasis zusammengeführt werden.

Eine Strategie besteht darin, Ihre Tests wie gewohnt in Ihrem CI/CD-Prozess auszuführen, aber wenn Sie einen neuen Test einführen, können Sie einen weiteren Testsatz mit dem neuen Spec ausführen, der in `--spec` zusammen mit `--repeat` angegeben ist, sodass der neue Test x-mal ausgeführt wird. Wenn der Test bei einem dieser Durchläufe fehlschlägt, wird der Test nicht zusammengeführt und muss untersucht werden, warum er fehlgeschlagen ist.

```sh
# Dies führt die example.e2e.js-Spec 5 Mal aus
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```