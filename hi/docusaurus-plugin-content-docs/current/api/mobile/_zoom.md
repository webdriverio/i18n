---
id: zoom
title: ज़ूम
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

स्क्रीन पर दिए गए तत्व पर ज़ूम जेस्चर प्रदर्शन करता है।

:::info

ज़ूमिंग नेटिव मोबाइल जेस्चर के आधार पर की जाती है। यह केवल निम्नलिखित ड्राइवरों के लिए समर्थित है:
- Android के लिए [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture)
- iOS के लिए [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

यह कमांड केवल निम्नलिखित अप-टू-डेट कंपोनेंट्स के साथ काम करता है:
 - Appium सर्वर (वर्जन 2.0.0 या उच्चतर)
 - `appium-uiautomator2-driver` (Android के लिए)
 - `appium-xcuitest-driver` (iOS के लिए)

सुनिश्चित करें कि आपका स्थानीय या क्लाउड-आधारित Appium वातावरण नियमित रूप से अपडेट किया जाता है ताकि संगतता समस्याओं से बचा जा सके।

:::

##### उपयोग

```js
$(selector).zoom({ duration, scale })
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
      <td>`PinchAndZoomOptions`</td>
      <td>ज़ूम विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>ज़ूम को कितनी तेज़ी से निष्पादित किया जाना चाहिए उसकी अवधि मिलीसेकंड में, न्यूनतम 500 ms और अधिकतम 10000 ms है। डिफ़ॉल्ट 1500 ms (1.5 सेकंड) है (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्क्रीन के अनुसार ज़ूम कितना बड़ा होना चाहिए उसका स्केल। वैध मान 0..1 रेंज में फ्लोट नंबर होने चाहिए, जहां 1.0 100% है (वैकल्पिक)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```