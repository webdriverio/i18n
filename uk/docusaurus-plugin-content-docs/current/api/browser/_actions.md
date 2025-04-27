---
id: actions
title: дії
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Дозволяє виконувати кілька інтерактивних дій одночасно, наприклад, щоб імітувати масштабування жестом зведення пальців.
Для отримання додаткової інформації про команду `action`, ознайомтеся з [документацією](/docs/api/browser/action).

##### Використання

```js
browser.actions()
```

##### Приклад

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