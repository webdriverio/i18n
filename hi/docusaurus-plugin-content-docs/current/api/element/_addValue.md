---
id: addValue
title: मान जोड़ें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

दिए गए सिलेक्टर द्वारा पाए गए इनपुट या टेक्स्टएरिया एलिमेंट में एक मान जोड़ें।

:::info

यदि आप विशेष वर्णों का उपयोग करना चाहते हैं, जैसे कि एक इनपुट से दूसरे में मान कॉपी और पेस्ट करने के लिए, 
[`keys`](/docs/api/browser/keys) कमांड का उपयोग करें।

:::

##### उपयोग

```js
$(selector).addValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>जोड़ा जाने वाला मान</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```