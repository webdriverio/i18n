---
id: actions
title: actions
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Permite executar várias interações de ação de uma só vez, por exemplo, para simular um zoom de pinça.
Para mais informações sobre o comando `action`, consulte a [documentação](/docs/api/browser/action).

##### Uso

```js
browser.actions()
```

##### Exemplo

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