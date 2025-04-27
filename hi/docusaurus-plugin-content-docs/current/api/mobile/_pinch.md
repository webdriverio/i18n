---
id: pinch
title: पिंच
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

स्क्रीन पर दिए गए तत्व पर पिंच जेस्चर करता है।

:::info

पिंचिंग नेटिव मोबाइल जेस्चर्स के आधार पर की जाती है। यह केवल निम्नलिखित ड्राइवरों के लिए समर्थित है:
- Android के लिए [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture)
- iOS के लिए [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

यह कमांड केवल निम्नलिखित अप-टू-डेट कंपोनेंट्स के साथ काम करता है:
 - Appium सर्वर (संस्करण 2.0.0 या उच्चतर)
 - `appium-uiautomator2-driver` (Android के लिए)
 - `appium-xcuitest-driver` (iOS के लिए)

संगतता समस्याओं से बचने के लिए सुनिश्चित करें कि आपका स्थानीय या क्लाउड-आधारित Appium वातावरण नियमित रूप से अपडेट किया गया है।

:::

##### उपयोग

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>पिंच विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>पिंच को कितनी जल्दी निष्पादित किया जाना चाहिए इसकी अवधि मिलीसेकंड में, न्यूनतम 500 ms और अधिकतम 10000 ms है। डिफॉल्ट 1500 ms (1.5 सेकंड) है (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्क्रीन के अनुसार पिंच का पैमाना कितना बड़ा होना चाहिए। मान्य मान 0..1 रेंज में फ्लोट नंबर होने चाहिए, जहां 1.0 100% है (वैकल्पिक)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```