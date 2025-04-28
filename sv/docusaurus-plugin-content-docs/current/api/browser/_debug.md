---
id: debug
title: debug
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Detta kommando hjälper dig att felsöka dina integrationstester. Det stoppar den körande webbläsaren och ger
dig tid att hoppa in i den och kontrollera tillståndet för din applikation (t.ex. med hjälp av utvecklarverktyg).
Din terminal omvandlas till ett [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
gränssnitt som låter dig prova vissa kommandon, hitta element och testa åtgärder på
dem.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Om du kör WDIO-testrunnern, se till att öka timeout-egenskapen för det testramverk
du använder (t.ex. Mocha eller Jasmine) för att förhindra att testet avslutas på grund av en testtimeout.
Undvik också att köra kommandot med flera capabilities som körs samtidigt.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Användning

```js
browser.debug()
```

##### Exempel

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```