---
id: debug
title: debug
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Dieser Befehl hilft dir dabei, deine Integrationstests zu debuggen. Er stoppt den laufenden Browser und gibt
dir Zeit, hineinzuspringen und den Zustand deiner Anwendung zu überprüfen (z.B. mit Hilfe der Entwicklertools).
Dein Terminal verwandelt sich in eine [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
Schnittstelle, die es dir ermöglicht, bestimmte Befehle auszuprobieren, Elemente zu finden und Aktionen an
ihnen zu testen.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Wenn du den WDIO Testrunner verwendest, stelle sicher, dass du die Timeout-Eigenschaft des Test-Frameworks,
das du verwendest (z.B. Mocha oder Jasmine), erhöhst, um zu verhindern, dass der Test aufgrund eines Test-Timeouts beendet wird.
Vermeide auch die Ausführung des Befehls mit mehreren gleichzeitig laufenden Capabilities.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Verwendung

```js
browser.debug()
```

##### Beispiel

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```
