---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

`react$$` कमांड एक उपयोगी कमांड है जो कई React कंपोनेंट्स को उनके वास्तविक नाम से क्वेरी करती है और उन्हें props और state के द्वारा फ़िल्टर करती है।

:::info

यह कमांड केवल React v16.x का उपयोग करने वाले एप्लिकेशन के साथ काम करती है। React सिलेक्टर्स के बारे में अधिक जानकारी [Selectors](/docs/selectors#react-selectors) गाइड में पढ़ें।

:::

##### उपयोग

```js
$(selector).react$$(selector, { props, state })
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
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>React कंपोनेंट का</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React सिलेक्टर विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Object`</td>
      <td>React props जो एलिमेंट में होने चाहिए</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state जिसमें एलिमेंट होना चाहिए</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### रिटर्न्स

- **&lt;WebdriverIO.ElementArray&gt;**