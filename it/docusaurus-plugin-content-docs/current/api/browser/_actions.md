---
id: actions
title: actions
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Consente di eseguire più interazioni di azione contemporaneamente, ad esempio per simulare uno zoom con pizzicamento.
Per maggiori informazioni sul comando `action`, consulta la [documentazione](/docs/api/browser/action).

##### Utilizzo

```js
browser.actions()
```

##### Esempio

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