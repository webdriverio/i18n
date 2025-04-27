---
id: touchAction
title: स्पर्श क्रिया
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution मूल्यह्रास चेतावनी

`touchAction` कमांड __अप्रचलित__ है और भविष्य के संस्करण में हटा दिया जाएगा।
हम [`action`](/docs/api/browser/action) कमांड का उपयोग करने की सिफारिश करते हैं
पॉइंटर प्रकार `touch` के साथ, उदाहरण के लिए:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

टच एक्शन API उन सभी जेस्चर्स का आधार प्रदान करता है जिन्हें Appium में स्वचालित किया जा सकता है।
यह वर्तमान में केवल नेटिव ऐप्स के लिए उपलब्ध है और वेबऐप्स के साथ इंटरैक्ट करने के लिए इस्तेमाल नहीं किया जा सकता है।
इसके मूल में _ad hoc_ व्यक्तिगत क्रियाओं को एक साथ श्रृंखलाबद्ध करने की क्षमता है, जिन्हें फिर
डिवाइस पर एप्लिकेशन में एक तत्व पर लागू किया जाएगा। मूल क्रियाएँ जिनका उपयोग किया जा सकता है:

- press (element या (`x`, `y`) या दोनों पास करें)
- longPress (element या (`x`, `y`) या दोनों पास करें)
- tap (element या (`x`, `y`) या दोनों पास करें)
- moveTo (पूर्ण `x`, `y` निर्देशांक पास करें)
- wait (`ms` (मिलीसेकंड के रूप में) पास करें)
- release (कोई आर्गुमेंट नहीं)

##### उपयोग

```js
browser.touchAction(action)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>निष्पादित करने के लिए क्रिया</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```