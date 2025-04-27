---
id: actions
title: actions
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Permet d'exécuter plusieurs interactions d'action à la fois, par exemple pour simuler un zoom par pincement.
Pour plus d'informations sur la commande `action`, consultez la [documentation](/docs/api/browser/action).

##### Utilisation

```js
browser.actions()
```

##### Exemple

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