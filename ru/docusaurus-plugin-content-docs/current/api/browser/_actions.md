---
id: actions
title: действия
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Позволяет выполнять несколько действий взаимодействия одновременно, например, для имитации масштабирования жестом "щипок".
Для получения дополнительной информации о команде `action`, ознакомьтесь с [документацией](/docs/api/browser/action).

##### Usage

```js
browser.actions()
```

##### Example

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