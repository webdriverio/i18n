---
id: restore
title: Wiederherstellen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Führt alles aus, was `mock.clear()` tut, und entfernt auch alle gemockten Rückgabewerte oder Implementierungen.
Ein wiederhergestellter Mock sendet keine Ereignisse und kann keine Antworten mocken.

##### Verwendung

```js
mock.restore()
```

##### Beispiel

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```