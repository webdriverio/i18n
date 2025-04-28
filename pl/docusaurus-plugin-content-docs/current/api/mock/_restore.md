---
id: restore
title: przywracanie
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Wykonuje wszystko, co robi `mock.clear()`, a także usuwa wszelkie zamockowane wartości zwracane lub implementacje.
Przywrócony mock nie emituje zdarzeń i nie może mockować odpowiedzi.

##### Użycie

```js
mock.restore()
```

##### Przykład

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```