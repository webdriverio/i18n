---
id: scroll
title: स्क्रॉल
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

ब्राउज़र व्यूपोर्ट के भीतर स्क्रॉल करें। ध्यान दें कि `x` और `y` निर्देशांक वर्तमान
स्क्रॉल स्थिति के सापेक्ष हैं, इसलिए `browser.scroll(0, 0)` कोई क्रिया नहीं है।

##### उपयोग

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>क्षैतिज स्क्रॉल स्थिति (डिफ़ॉल्ट: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>लंबवत स्क्रॉल स्थिति (डिफ़ॉल्ट: `0`)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```