---
id: debug
title: debug (debugowanie)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Ta komenda pomaga w debugowaniu testów integracyjnych. Zatrzymuje uruchomioną przeglądarkę i daje
czas na przejście do niej i sprawdzenie stanu aplikacji (np. za pomocą narzędzi deweloperskich).
Twój terminal przekształca się w interfejs [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop),
który pozwala wypróbować określone polecenia, znaleźć elementy i testować na nich działania.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Jeśli używasz WDIO testrunner, upewnij się, że zwiększyłeś właściwość timeout w używanym
frameworku testowym (np. Mocha lub Jasmine), aby zapobiec zakończeniu testu z powodu przekroczenia czasu.
Unikaj również wykonywania tego polecenia z wieloma capabilities uruchomionymi jednocześnie.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Użycie

```js
browser.debug()
```

##### Przykład

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```