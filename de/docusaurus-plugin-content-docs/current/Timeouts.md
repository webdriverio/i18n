---
id: timeouts
title: Timeouts
description: "Konfigurieren Sie WebDriver-Session-Timeouts, WebdriverIO-waitFor-Timeouts und Timeouts des Test-Frameworks, um Tests zuverlässig zu halten."
---

Jeder Befehl in WebdriverIO ist eine asynchrone Operation. Eine Anfrage wird an den Selenium-Server (oder einen Cloud-Dienst wie [Sauce Labs](https://saucelabs.com)) gesendet, und dessen Antwort enthält das Ergebnis, sobald die Aktion abgeschlossen oder fehlgeschlagen ist.

Daher ist Zeit eine entscheidende Komponente im gesamten Testprozess. Wenn eine bestimmte Aktion vom Zustand einer anderen Aktion abhängt, müssen Sie sicherstellen, dass sie in der richtigen Reihenfolge ausgeführt werden. Timeouts spielen beim Umgang mit diesen Problemen eine wichtige Rolle.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver-Timeouts

### Session Script Timeout

Eine Session hat einen zugehörigen Session Script Timeout, der angibt, wie lange auf die Ausführung asynchroner Skripte gewartet werden soll. Sofern nicht anders angegeben, beträgt er 30 Sekunden. Sie können diesen Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Session Page Load Timeout

Eine Session hat einen zugehörigen Session Page Load Timeout, der angibt, wie lange auf den vollständigen Ladevorgang der Seite gewartet werden soll. Sofern nicht anders angegeben, beträgt er 300.000 Millisekunden.

Sie können diesen Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` ist der Name gemäß den WebDriver-[Timeouts](https://www.w3.org/TR/webdriver/#set-timeouts). WebdriverIO v10 akzeptiert nur diesen Schlüssel.

### Session Implicit Wait Timeout

Eine Session hat einen zugehörigen Session Implicit Wait Timeout. Dieser gibt an, wie lange bei der impliziten Element-Lokalisierungsstrategie gewartet werden soll, wenn Elemente mit den Befehlen [`findElement`](/docs/api/webdriver#findelement) oder [`findElements`](/docs/api/webdriver#findelements) gesucht werden ([`$`](/docs/api/browser/$) bzw. [`$$`](/docs/api/browser/$$), wenn WebdriverIO mit oder ohne den WDIO-Testrunner ausgeführt wird). Sofern nicht anders angegeben, beträgt er 0 Millisekunden.

Sie können diesen Timeout wie folgt festlegen:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO-bezogene Timeouts

### `WaitFor*`-Timeout

WebdriverIO stellt mehrere Befehle bereit, um darauf zu warten, dass Elemente einen bestimmten Zustand erreichen (z. B. aktiviert, sichtbar, vorhanden). Diese Befehle nehmen ein Selektor-Argument und eine Timeout-Zahl entgegen, die bestimmt, wie lange die Instanz darauf warten soll, dass das Element diesen Zustand erreicht. Mit der Option `waitforTimeout` können Sie den globalen Timeout für alle `waitFor*`-Befehle festlegen, sodass Sie nicht immer wieder denselben Timeout setzen müssen. _(Beachten Sie das kleingeschriebene `f`!)_

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

// Sie können den Standard-Timeout bei Bedarf auch überschreiben
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Framework-bezogene Timeouts

Das Test-Framework, das Sie mit WebdriverIO verwenden, muss mit Timeouts umgehen, insbesondere da alles asynchron ist. Es stellt sicher, dass der Testprozess nicht hängen bleibt, wenn etwas schiefgeht.

Standardmäßig beträgt der Timeout 10 Sekunden, was bedeutet, dass ein einzelner Test nicht länger dauern sollte.

Ein einzelner Test in Mocha sieht so aus:

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

In Cucumber gilt der Timeout für eine einzelne Step-Definition. Wenn Sie den Timeout jedoch erhöhen möchten, weil Ihr Test länger als der Standardwert dauert, müssen Sie ihn in den Framework-Optionen festlegen.

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