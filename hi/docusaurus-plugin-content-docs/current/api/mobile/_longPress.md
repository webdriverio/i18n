---
id: longPress
title: लॉन्गप्रेस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

स्क्रीन पर दिए गए तत्व पर लंबा प्रेस जेस्चर करता है।

यह चयनित तत्व के लिए WebDriver `action` कमांड जारी करता है। यह `click` कमांड पर आधारित है।

:::info

यह कमांड केवल निम्नलिखित अप-टू-डेट कंपोनेंट्स के साथ काम करता है:
 - Appium सर्वर (वर्जन 2.0.0 या उससे अधिक)
 - `appium-uiautomator2-driver` (Android के लिए)
 - `appium-xcuitest-driver` (iOS के लिए)

संगतता समस्याओं से बचने के लिए सुनिश्चित करें कि आपका स्थानीय या क्लाउड-आधारित Appium वातावरण नियमित रूप से अपडेट किया जाता है।

:::

##### उपयोग

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`LongPressOptions`</td>
      <td>लॉन्ग प्रेस विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>संख्या (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>संख्या (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>प्रेस की अवधि ms में, डिफ़ॉल्ट 1500 ms है <br /><strong>MOBILE-ONLY</strong></td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```