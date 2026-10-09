---
id: retry
title: Instabile Tests wiederholen
description: "Wiederholen Sie instabile Tests in Mocha, Jasmine oder Cucumber, führen Sie ganze Spec-Dateien erneut aus und führen Sie einen bestimmten Test mehrmals aus, um Instabilität zu erkennen."
---

Mit dem WebdriverIO-Testrunner können Sie bestimmte Tests erneut ausführen, die sich aufgrund von Dingen wie einem instabilen Netzwerk oder Race Conditions als unzuverlässig erweisen. (Es wird jedoch nicht empfohlen, einfach die Wiederholungsrate zu erhöhen, wenn Tests instabil werden!)

## Suites in Mocha erneut ausführen

Seit Version 3 von Mocha können Sie ganze Test-Suites erneut ausführen (alles innerhalb eines `describe`-Blocks). Wenn Sie Mocha verwenden, sollten Sie diesen Wiederholungsmechanismus der WebdriverIO-Implementierung vorziehen, die nur das erneute Ausführen bestimmter Testblöcke erlaubt (alles innerhalb eines `it`-Blocks). Um die Methode `this.retries()` verwenden zu können, muss der Suite-Block `describe` eine ungebundene Funktion `function(){}` anstelle einer Arrow-Funktion `() => {}` verwenden, wie in der [Mocha-Dokumentation](https://mochajs.org/#arrow-functions) beschrieben. Mit Mocha können Sie außerdem über `mochaOpts.retries` in Ihrer `wdio.conf.js` eine Wiederholungsanzahl für alle Specs festlegen.

Hier ist ein Beispiel:

```js
describe('retries', function () {
    // Alle Tests in dieser Suite bis zu 4 Mal wiederholen
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Diesen Test nur bis zu 2 Mal wiederholen
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
     * Spec, die maximal 4 Mal läuft (1 tatsächlicher Durchlauf + 3 Wiederholungen)
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
     * Hook, der maximal 2 Mal läuft (1 tatsächlicher Durchlauf + 1 Wiederholung)
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
     * Spec, die maximal 4 Mal läuft (1 tatsächlicher Durchlauf + 3 Wiederholungen)
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
     * Hook, der maximal 2 Mal läuft (1 tatsächlicher Durchlauf + 1 Wiederholung)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Wenn Sie Jasmine verwenden, ist der zweite Parameter für das Timeout reserviert. Um einen Wiederholungsparameter anzugeben, müssen Sie das Timeout auf seinen Standardwert `jasmine.DEFAULT_TIMEOUT_INTERVAL` setzen und anschließend Ihre Wiederholungsanzahl angeben.

</TabItem>
</Tabs>

Dieser Wiederholungsmechanismus erlaubt nur das Wiederholen einzelner Hooks oder Testblöcke. Wenn Ihr Test von einem Hook begleitet wird, der Ihre Anwendung einrichtet, wird dieser Hook nicht ausgeführt. [Mocha bietet](https://mochajs.org/#retry-tests) native Testwiederholungen, die dieses Verhalten ermöglichen, Jasmine hingegen nicht. Sie können im `afterTest`-Hook auf die Anzahl der ausgeführten Wiederholungen zugreifen.

## Erneutes Ausführen in Cucumber

### Vollständige Suites in Cucumber erneut ausführen

Für Cucumber >=6 können Sie die Konfigurationsoption [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) zusammen mit dem optionalen Parameter `retryTagFilter` angeben, damit alle oder einige Ihrer fehlgeschlagenen Szenarien zusätzliche Wiederholungen erhalten, bis sie erfolgreich sind. Damit diese Funktion funktioniert, müssen Sie `scenarioLevelReporter` auf `true` setzen.

### Step-Definitionen in Cucumber erneut ausführen

Um eine Wiederholungsrate für bestimmte Step-Definitionen festzulegen, wenden Sie einfach eine Retry-Option darauf an, zum Beispiel:

```js
export default function () {
    /**
     * Step-Definition, die maximal 3 Mal läuft (1 tatsächlicher Durchlauf + 2 Wiederholungen)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Wiederholungen können nur in Ihrer Step-Definitions-Datei festgelegt werden, niemals in Ihrer Feature-Datei.

## Wiederholungen pro Spec-Datei hinzufügen

Bisher waren nur Wiederholungen auf Test- und Suite-Ebene verfügbar, die in den meisten Fällen ausreichen.

Bei Tests, die jedoch einen Zustand beinhalten (etwa auf einem Server oder in einer Datenbank), kann dieser Zustand nach dem ersten Fehlschlag ungültig bleiben. Nachfolgende Wiederholungen haben dann möglicherweise keine Chance mehr, erfolgreich zu sein, da sie mit einem ungültigen Zustand starten würden.

Für jede Spec-Datei wird eine neue `browser`-Instanz erstellt, was dies zu einem idealen Ort macht, um sich einzuklinken und weitere Zustände (Server, Datenbanken) einzurichten. Wiederholungen auf dieser Ebene bedeuten, dass der gesamte Einrichtungsprozess einfach wiederholt wird, genau so, als ob es sich um eine neue Spec-Datei handeln würde.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Wie oft die gesamte Spec-Datei wiederholt werden soll, wenn sie als Ganzes fehlschlägt
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

Dies soll helfen zu verhindern, dass instabile Tests in eine Codebasis eingeführt werden. Durch Hinzufügen der CLI-Option `--repeat` werden die angegebenen Specs oder Suites N-mal ausgeführt. Bei Verwendung dieses CLI-Flags muss außerdem das Flag `--spec` oder `--suite` angegeben werden.

Wenn neue Tests zu einer Codebasis hinzugefügt werden, insbesondere über einen CI/CD-Prozess, könnten die Tests bestehen und gemergt werden, später jedoch instabil werden. Diese Instabilität kann verschiedene Ursachen haben, wie Netzwerkprobleme, Serverlast, Datenbankgröße usw. Die Verwendung des Flags `--repeat` in Ihrem CI/CD-Prozess kann helfen, diese instabilen Tests zu erkennen, bevor sie in die Haupt-Codebasis gemergt werden.

Eine mögliche Strategie besteht darin, Ihre Tests wie gewohnt in Ihrem CI/CD-Prozess auszuführen. Wenn Sie jedoch einen neuen Test einführen, können Sie zusätzlich einen weiteren Testlauf starten, bei dem die neue Spec in `--spec` zusammen mit `--repeat` angegeben wird, sodass der neue Test x-mal ausgeführt wird. Schlägt der Test bei einem dieser Durchläufe fehl, wird er nicht gemergt, und es muss untersucht werden, warum er fehlgeschlagen ist.

```sh
# Dies führt die Spec example.e2e.js 5 Mal aus
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```