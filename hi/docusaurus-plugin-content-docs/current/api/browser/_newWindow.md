---
id: newWindow
title: नई विंडो
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

ब्राउज़र में नई विंडो या टैब खोलें (यदि निर्दिष्ट नहीं है तो डिफ़ॉल्ट रूप से एक नई विंडो खुलती है)।
यह कमांड `window.open()` फंक्शन के समान है। यह कमांड मोबाइल वातावरण में काम नहीं करता है।

__नोट:__ जब आप इस कमांड को कॉल करते हैं, तो आप स्वचालित रूप से नई विंडो या टैब पर स्विच कर जाते हैं।

##### उपयोग

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>खोलने के लिए वेबसाइट URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>नई विंडो का प्रकार: 'tab' या 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>नई विंडो का नाम</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>खुली विंडो की विशेषताएँ (जैसे आकार, स्थिति, स्क्रॉलबार, आदि)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           एक ऑब्जेक्ट जिसमें विंडो हैंडल और नई विंडो का प्रकार शामिल है `{handle: string, type: string}` handle - नए टैब या विंडो का विंडो हैंडल ID, type - नई विंडो का प्रकार, या तो 'tab' या 'window'    
##### थ्रोज़

- **Error**:  यदि `url` अमान्य है, यदि कमांड मोबाइल पर उपयोग किया जाता है, या `type` 'tab' या 'window' नहीं है।