---
id: setValue
title: setValue (सेट वैल्यू)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

इनपुट को पहले साफ़ करने के बाद एलिमेंट पर की स्ट्रोक्स का एक अनुक्रम भेजें। यदि एलिमेंट को पहले साफ़ करने की आवश्यकता नहीं है तो [`addValue`](/docs/api/element/addValue) का उपयोग करें।

:::info

यदि आप विशेष वर्णों का उपयोग करना चाहते हैं, जैसे एक इनपुट से दूसरे इनपुट में वैल्यू कॉपी और पेस्ट करना, तो [`keys`](/docs/api/browser/keys) कमांड का उपयोग करें।

:::

##### उपयोग

```js
$(selector).setValue(value)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>जोड़ा जाने वाला मान</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```