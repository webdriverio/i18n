---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Fait tout ce que `mock.clear()` fait, et supprime également toutes les valeurs de retour simulées ou les implémentations.
Le mock restauré n'émet pas d'événements et ne peut pas simuler de réponses.

##### Utilisation

```js
mock.restore()
```

##### Exemple

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```