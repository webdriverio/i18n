---
id: actions
title: actions
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Umożliwia uruchamianie wielu interakcji akcji naraz, np. symulowanie gestu uszczypnięcia w celu przybliżenia.
Więcej informacji na temat komendy `action` znajdziesz w [dokumentacji](/docs/api/browser/action).

##### Użycie

```js
browser.actions()
```

##### Przykład

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