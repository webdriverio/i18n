---
id: timeouts
title: Timeouts
---

Jeder Befehl in WebdriverIO ist eine asynchrone Operation. Eine Anfrage wird an den Selenium-Server (oder einen Cloud-Dienst wie [Sauce Labs](https://saucelabs.com)) gesendet, und dessen Antwort enthält das Ergebnis, sobald die Aktion abgeschlossen oder fehlgeschlagen ist.

Daher ist Zeit eine entscheidende Komponente im gesamten Testprozess. Wenn eine bestimmte Aktion vom Zustand einer anderen Aktion abhängt, müssen Sie sicherstellen, dass sie in der richtigen Reihenfolge ausgeführt werden. Timeouts spielen eine wichtige Rolle bei der Bewältigung dieser Probleme.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver Timeouts

### Session Script Timeout

Eine Sitzung hat ein zugehöriges Session-Script-Timeout, das eine Wartezeit für die Ausführung asynchroner Skripte angibt. Sofern nicht anders angegeben, beträgt es 30 Sekunden. Sie können dieses Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Session Page Load Timeout

Eine Sitzung hat ein zugehöriges Session-Page-Load-Timeout, das eine Wartezeit für den Abschluss des Seitenladens angibt. Sofern nicht anders angegeben, beträgt es 300.000 Millisekunden.

Sie können dieses Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Das Schlüsselwort `pageLoad` ist Teil der offiziellen WebDriver [Spezifikation](https://www.w3.org/TR/webdriver/#set-timeouts), wird aber möglicherweise für Ihren Browser nicht [unterstützt](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) (der frühere Name ist `page load`).

### Session Implicit Wait Timeout

Eine Sitzung hat ein zugehöriges Session-Implicit-Wait-Timeout. Dies gibt die Wartezeit für die implizite Element-Lokalisierungsstrategie an, wenn Elemente mit den Befehlen [`findElement`](/docs/api/webdriver#findelement) oder [`findElements`](/docs/api/webdriver#findelements) lokalisiert werden ([`$`](/docs/api/browser/$) bzw. [`$$`](/docs/api/browser/$$), wenn WebdriverIO mit oder ohne WDIO-Testrunner ausgeführt wird). Sofern nicht anders angegeben, beträgt es 0 Millisekunden.

Sie können dieses Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO-bezogene Timeouts

### `WaitFor*` Timeout

WebdriverIO bietet mehrere Befehle, um auf Elemente zu warten, bis sie einen bestimmten Zustand erreichen (z.B. aktiviert, sichtbar, vorhanden). Diese Befehle nehmen ein Selektor-Argument und eine Timeout-Zahl, die bestimmt, wie lange die Instanz darauf warten soll, dass dieses Element den Zustand erreicht. Die Option `waitforTimeout` ermöglicht es Ihnen, das globale Timeout für alle `waitFor*`-Befehle festzulegen, sodass Sie nicht immer wieder dasselbe Timeout festlegen müssen. _(Beachten Sie das Kleinbuchstaben `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

In Ihren Tests können Sie nun Folgendes tun:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Framework-bezogene Timeouts

Das Testframework, das Sie mit WebdriverIO verwenden, muss mit Timeouts umgehen, insbesondere da alles asynchron ist. Es stellt sicher, dass der Testprozess nicht hängen bleibt, wenn etwas schief geht.

Standardmäßig beträgt das Timeout 10 Sekunden, was bedeutet, dass ein einzelner Test nicht länger dauern sollte.

Ein einzelner Test in Mocha sieht wie folgt aus:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

In Cucumber gilt das Timeout für eine einzelne Schrittdefinition. Wenn Sie jedoch das Timeout erhöhen möchten, weil Ihr Test länger als der Standardwert dauert, müssen Sie es in den Framework-Optionen festlegen.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>