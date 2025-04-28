---
id: actions
title: actions
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Tillåter att köra flera interaktionsåtgärder på en gång, t.ex. för att simulera en nyp-zoom.
För mer information om kommandot `action`, kolla in [dokumentationen](/docs/api/browser/action).

##### Användning

```js
browser.actions()
```

##### Exempel

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