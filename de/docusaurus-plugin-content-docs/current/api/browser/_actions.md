Here's the translated Markdown content following your instructions:

---
id: actions
title: Aktionen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

Allows to run multiple action interaction at once, e.g. to simulate a pinch zoom.
For more information on the `action` command, check out the [docs](/docs/api/browser/action).

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