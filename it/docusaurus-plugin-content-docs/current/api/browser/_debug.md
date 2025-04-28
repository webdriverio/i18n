---
id: debug
title: debug
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Questo comando ti aiuta a eseguire il debug dei tuoi test di integrazione. Ferma il browser in esecuzione e ti dà il tempo di accedervi e controllare lo stato della tua applicazione (ad esempio, utilizzando gli strumenti di sviluppo).
Il tuo terminale si trasforma in un'interfaccia [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) che ti permetterà di provare alcuni comandi, trovare elementi e testare azioni su di essi.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Se esegui il testrunner WDIO, assicurati di aumentare la proprietà timeout del framework di test che stai utilizzando (ad esempio Mocha o Jasmine) per evitare la terminazione del test a causa di un timeout. Evita anche di eseguire il comando con più capabilities in esecuzione contemporaneamente.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Utilizzo

```js
browser.debug()
```

##### Esempio

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```