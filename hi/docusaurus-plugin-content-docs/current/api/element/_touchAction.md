---
id: touchAction
title: टचएक्शन
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Deprecation Warning

`touchAction` कमांड __deprecated__ है और भविष्य के वर्शन में हटा दिया जाएगा।
हम [`action`](/docs/api/browser/action) कमांड का उपयोग करने की सलाह देते हैं, 
pointer प्रकार `touch` के साथ, उदाहरण के लिए:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

टच एक्शन API उन सभी जेस्चर्स का आधार प्रदान करता है जिन्हें ऐप्पियम में स्वचालित किया जा सकता है।
यह वर्तमान में केवल नेटिव ऐप्स के लिए उपलब्ध है और वेबऐप्स के साथ इंटरैक्ट करने के लिए इसका उपयोग नहीं किया जा सकता है।
इसके मूल में _ad hoc_ व्यक्तिगत क्रियाओं को एक साथ जोड़ने की क्षमता है, जिन्हें तब
डिवाइस पर एप्लिकेशन में एक एलिमेंट पर लागू किया जाएगा। मूल क्रियाएं जिनका उपयोग किया जा सकता है वे हैं:

- press (एलिमेंट या (x,y) या दोनों पास करें)
- longPress (एलिमेंट या (x,y) या दोनों पास करें)
- tap (एलिमेंट या (x,y) या दोनों पास करें)
- moveTo (पूर्ण x,y कोऑर्डिनेट्स पास करें)
- wait (ms (मिलीसेकंड के रूप में) पास करें)
- release (कोई आर्गुमेंट नहीं)

##### उपयोग

```js
$(selector).touchAction(action)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>action to execute</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```