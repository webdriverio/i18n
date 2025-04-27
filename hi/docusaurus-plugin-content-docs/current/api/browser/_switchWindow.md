---
id: switchWindow
title: स्विचविंडो
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

एक विशेष टैब / विंडो पर फोकस स्विच करें।

##### उपयोग

```js
browser.switchWindow(matcher)
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
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>स्ट्रिंग या रेगुलर एक्सप्रेशन जो पेज टाइटल या URL, विंडो नाम, या विंडो हैंडल से मेल खाता है</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="switchWindow.js"
it('should switch to another window', async () => {
    // open url
    await browser.url('https://google.com')

    // get window handle
    const handle = await browser.getWindowHandle()

    // create new window
    await browser.newWindow('https://webdriver.io')

    // switch back via url match
    await browser.switchWindow('google.com')

    // switch back via title match
    await browser.switchWindow('Next-gen browser and mobile automation test framework for Node.js')

    // switch back via window handle
    await browser.switchWindow(handle)
});
```