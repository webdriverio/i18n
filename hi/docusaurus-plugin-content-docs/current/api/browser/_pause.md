---
id: pause
title: पॉज़
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

निष्पादन को एक निश्चित समय के लिए रोकता है। किसी तत्व के दिखने का इंतज़ार करने के लिए इस कमांड का उपयोग न करने की सलाह दी जाती है। अस्थिर परीक्षण परिणामों से बचने के लिए [`waitForExist`](/docs/api/element/waitForExist) या अन्य waitFor* कमांड का उपयोग करना बेहतर है।

##### उपयोग

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>समय मिलीसेकंड में</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```