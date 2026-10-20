---
id: retry
title: Instabile Tests wiederholen
description: "Wiederholen Sie instabile Tests in Mocha, Jasmine oder Cucumber, führen Sie ganze Spec-Dateien erneut aus und führen Sie einen bestimmten Test mehrmals aus, um Instabilität zu erkennen."
---

Sie können mit dem WebdriverIO-Testrunner bestimmte Tests erneut ausführen, die sich aufgrund von Dingen wie einem instabilen Netzwerk oder Race Conditions als unzuverlässig erweisen. (Es wird jedoch nicht empfohlen, einfach die Wiederholungsrate zu erhöhen, wenn Tests instabil werden!)

## Suites in Mocha erneut ausführen

Seit Version 3 von Mocha können Sie ganze Test-Suites erneut ausführen (alles innerhalb eines `describe`-Blocks). Wenn Sie Mocha verwenden, sollten Sie diesen Wiederholungsmechanismus der WebdriverIO-Implementierung vorziehen, die es nur erlaubt, bestimmte Testblöcke (alles innerhalb eines `it`-Blocks) erneut auszuführen. Um die Methode `this.retries()` zu verwenden, muss der Suite-Block `describe` eine ungebundene Funktion `function(){}` anstelle einer Pfeilfunktion `() => {}` verwenden, wie in der [Mocha-Dokumentation](https://mochajs.org/#arrow-functions) beschrieben. Mit Mocha können Sie außerdem über `mochaOpts.retries` in Ihrer `wdio.conf.js` eine Wiederholungsanzahl für alle Specs festlegen.

Hier ist ein Beispiel:

```js
describe('retries', function () {
    // Alle Tests in dieser Suite bis zu 4 Mal wiederholen
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Festlegen, dass dieser Test nur bis zu 2 Mal wiederholt wird
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Einzelne Tests in Jasmine oder Mocha erneut ausführen

Um einen bestimmten Testblock erneut auszuführen, können Sie einfach die Anzahl der Wiederholungen als letzten Parameter nach der Testblock-Funktion angeben:

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
     * Spec, die maximal 4 Mal ausgeführt wird (1 tatsächlicher Durchlauf + 3 Wiederholungen)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // gibt die Anzahl der Wiederholungen zurück
        // ...
    }, 3)
})
```

Dasselbe funktioniert auch für Hooks:

```js
describe('my flaky app', () => {
    /**
     * Hook, der maximal 2 Mal ausgeführt wird (1 tatsächlicher Durchlauf + 1 Wiederholung)
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
     * Spec, die maximal 4 Mal ausgeführt wird (1 tatsächlicher Durchlauf + 3 Wiederholungen)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // gibt die Anzahl der Wiederholungen zurück
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Dasselbe funktioniert auch für Hooks:

```js
describe('my flaky app', () => {
    /**
     * Hook, der maximal 2 Mal ausgeführt wird (1 tatsächlicher Durchlauf + 1 Wiederholung)
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

Dieser Wiederholungsmechanismus erlaubt nur das Wiederholen einzelner Hooks oder Testblöcke. Wenn Ihr Test von einem Hook begleitet wird, der Ihre Anwendung einrichtet, wird dieser Hook nicht ausgeführt. [Mocha bietet](https://mochajs.org/#retry-tests) native Testwiederholungen, die dieses Verhalten ermöglichen, Jasmine hingegen nicht. Sie können im `afterTest`-Hook auf die Anzahl der ausgeführten Wiederholungen zugreifen.

Bei Mocha teilen sich alle Versuche eines Tests oder Hooks dessen Timeout: Mocha startet den Timer einmal und lässt den Test fehlschlagen, wenn alle Versuche zusammen länger als das Timeout dauern. Daher wiederholt dieser Mechanismus einen Test oder Hook, der fehlschlägt (zum Beispiel durch eine fehlgeschlagene Assertion oder einen fehlgeschlagenen Befehl), aber nicht einen, der sein Timeout erreicht, da ein späterer Versuch nicht rechtzeitig abgeschlossen werden könnte. Die Timeout-Fehlermeldung eines Tests oder Hooks mit WebdriverIO-Wiederholungen nennt den Versuch, bei dem das Timeout auftrat, zum Beispiel `(WDIO attempt 2/3)`. Für Tests, bei denen ein Timeout auftreten kann, verwenden Sie [Mochas Wiederholungen](https://mochajs.org/#retry-tests) (`this.retries()`): Mocha führt jeden Versuch erneut mit einem vollständigen Timeout aus.

## Erneutes Ausführen in Cucumber

### Vollständige Suites in Cucumber erneut ausführen

Für Cucumber >=6 können Sie die Konfigurationsoption [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) zusammen mit einem optionalen Parameter `retryTagFilter` angeben, damit alle oder einige Ihrer fehlschlagenden Szenarien zusätzliche Wiederholungen erhalten, bis sie erfolgreich sind. Damit diese Funktion funktioniert, müssen Sie `scenarioLevelReporter` auf `true` setzen.

### Step-Definitionen in Cucumber erneut ausführen

Um eine Wiederholungsrate für bestimmte Step-Definitionen festzulegen, wenden Sie einfach eine Retry-Option darauf an, zum Beispiel:

```js
export default function () {
    /**
     * Step-Definition, die maximal 3 Mal ausgeführt wird (1 tatsächlicher Durchlauf + 2 Wiederholungen)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Wiederholungen können nur in Ihrer Step-Definitions-Datei festgelegt werden, niemals in Ihrer Feature-Datei.

## Wiederholungen pro Spec-Datei hinzufügen

Bisher waren nur Wiederholungen auf Test- und Suite-Ebene verfügbar, was in den meisten Fällen ausreichend ist.

Bei Tests, die jedoch einen Zustand beinhalten (zum Beispiel auf einem Server oder in einer Datenbank), kann dieser Zustand nach dem ersten fehlgeschlagenen Test ungültig sein. Nachfolgende Wiederholungen haben aufgrund des ungültigen Zustands, mit dem sie beginnen würden, möglicherweise keine Chance, erfolgreich zu sein.

Für jede Spec-Datei wird eine neue `browser`-Instanz erstellt, was dies zu einem idealen Ort macht, um sich einzuklinken und beliebige andere Zustände (Server, Datenbanken) einzurichten. Wiederholungen auf dieser Ebene bedeuten, dass der gesamte Einrichtungsprozess einfach wiederholt wird, so als wäre es eine neue Spec-Datei.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Die Anzahl der Wiederholungen der gesamten Spec-Datei, wenn sie als Ganzes fehlschlägt
     */
    specFileRetries: 1,
    /**
     * Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spec-Datei
     */
    specFileRetriesDelay: 0,
    /**
     * Wiederholte Spec-Dateien werden am Anfang der Warteschlange eingefügt und sofort wiederholt
     */
    specFileRetriesDeferred: false
}
```

## Einen bestimmten Test mehrmals ausführen

Dies soll helfen zu verhindern, dass instabile Tests in eine Codebasis eingeführt werden. Durch Hinzufügen der CLI-Option `--repeat` werden die angegebenen Specs oder Suites N-mal ausgeführt. Bei Verwendung dieses CLI-Flags muss auch das Flag `--spec` oder `--suite` angegeben werden.

Wenn neue Tests zu einer Codebasis hinzugefügt werden, insbesondere über einen CI/CD-Prozess, könnten die Tests bestehen und gemergt werden, aber später instabil werden. Diese Instabilität kann von einer Reihe von Faktoren herrühren, wie Netzwerkproblemen, Serverlast, Datenbankgröße usw. Die Verwendung des Flags `--repeat` in Ihrem CD/CD-Prozess kann helfen, diese instabilen Tests zu erkennen, bevor sie in eine Haupt-Codebasis gemergt werden.

Eine mögliche Strategie besteht darin, Ihre Tests wie gewohnt in Ihrem CI/CD-Prozess auszuführen. Wenn Sie jedoch einen neuen Test einführen, können Sie anschließend einen weiteren Testdurchlauf mit der neuen Spec in `--spec` zusammen mit `--repeat` ausführen, sodass der neue Test x-mal ausgeführt wird. Wenn der Test bei einem dieser Durchläufe fehlschlägt, wird der Test nicht gemergt, und es muss untersucht werden, warum er fehlgeschlagen ist.

```sh
# Dies führt die Spec example.e2e.js 5 Mal aus
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```