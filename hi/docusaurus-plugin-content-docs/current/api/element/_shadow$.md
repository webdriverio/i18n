---
id: shadow$
title: शैडो$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

किसी दिए गए एलिमेंट के शैडोरूट के अंदर एक एलिमेंट तक पहुंचें। यदि आप कई नेस्टेड शैडो रूट्स के साथ काम कर रहे हैं, तो `shadow$` के लिए एक वैकल्पिक दृष्टिकोण [डीप सिलेक्टर](https://webdriver.io/docs/selectors#deep-selectors) का उपयोग करना है।

:::info

जब `$` या `$$` कमांड का उपयोग करते हैं तो WebdriverIO स्वचालित रूप से शैडो रूट्स के माध्यम से जाता है।
यह कमांड केवल तभी आवश्यक है जब आप ऐसे वातावरण में स्वचालन कर रहे हों जो WebDriver Bidi का समर्थन नहीं करता है, जैसे Appium के साथ मोबाइल वेब टेस्टिंग।

:::

##### उपयोग

```js
$(selector).shadow$(selector)
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
      <td>`String, Function`</td>
      <td>एक निश्चित एलिमेंट प्राप्त करने के लिए सिलेक्टर या JS फ़ंक्शन</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### रिटर्न्स

- **&lt;WebdriverIO.Element&gt;**