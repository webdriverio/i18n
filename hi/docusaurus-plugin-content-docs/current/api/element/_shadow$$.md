---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

किसी दिए गए एलिमेंट के shadowRoot के अंदर एलिमेंट्स तक पहुंचें। अगर आप बहुत सारे नेस्टेड शैडो रूट्स के साथ काम कर रहे हैं, तो `shadow$$` के लिए एक वैकल्पिक दृष्टिकोण [डीप सेलेक्टर](https://webdriver.io/docs/selectors#deep-selectors) का उपयोग करना है।

:::info

WebdriverIO स्वचालित रूप से `$` या `$$` कमांड्स का उपयोग करते समय शैडो रूट्स के माध्यम से प्रवेश करता है।
यह कमांड केवल तभी आवश्यक है जब आप ऐसे वातावरण में स्वचालन कर रहे हों जो 
WebDriver Bidi का समर्थन नहीं करता है, जैसे Appium के साथ मोबाइल वेब टेस्टिंग।

:::

##### उपयोग

```js
$(selector).shadow$$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### रिटर्न्स

- **&lt;WebdriverIO.ElementArray&gt;**