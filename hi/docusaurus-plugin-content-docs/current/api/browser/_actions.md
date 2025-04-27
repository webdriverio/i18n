---
id: actions
title: क्रियाएँ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

एक बार में कई क्रिया इंटरैक्शन चलाने की अनुमति देता है, जैसे कि पिंच ज़ूम का अनुकरण करना।
`action` कमांड के बारे में अधिक जानकारी के लिए, [डॉक्स](/docs/api/browser/action) देखें।

##### उपयोग

```js
browser.actions()
```

##### उदाहरण

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