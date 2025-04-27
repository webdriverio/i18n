---
id: actions
title: acciones
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Permite ejecutar múltiples interacciones de acción a la vez, por ejemplo, para simular un zoom con pellizco.
Para más información sobre el comando `action`, consulta la [documentación](/docs/api/browser/action).

##### Uso

```js
browser.actions()
```

##### Ejemplo

```js title="action.js"
it('run multiple actions at once for a pinch zoom', async () => {
    await browser.actions([
        browser.action('pointer')
            .move(500, 500)
            .down()
            .move(250, 250)
            .up(),
        browser.action('pointer')
            .move(500, 500)
            .down()
            .move(750, 750)
            .up()
    ])
});
```