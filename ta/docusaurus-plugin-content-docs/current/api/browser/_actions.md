---
id: actions
title: செயல்கள்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

ஒரே நேரத்தில் பல செயல் இடைவினைகளை இயக்க அனுமதிக்கிறது, எ.கா. பின்ச் ஜூம் போன்றவற்றை உருவகப்படுத்த.
`action` கட்டளை பற்றிய கூடுதல் தகவலுக்கு, [ஆவணங்களை](/docs/api/browser/action) பார்க்கவும்.

##### பயன்பாடு

```js
browser.actions()
```

##### உதாரணம்

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