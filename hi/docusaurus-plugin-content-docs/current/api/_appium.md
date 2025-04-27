---
id: appium
title: एप्पियम
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) में मिल सकती है।

##### उपयोग

```js
driver.getAppiumContext()
```


##### रिटर्न्स

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** वर्तमान संदर्भ का प्रतिनिधित्व करने वाली स्ट्रिंग या 'कोई संदर्भ नहीं' का प्रतिनिधित्व करने वाला null


---

## switchAppiumContext
Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) में मिल सकती है।

##### उपयोग

```js
driver.switchAppiumContext(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>उपलब्ध संदर्भ का प्रतिनिधित्व करने वाली स्ट्रिंग</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) में मिल सकती है।

##### उपयोग

```js
driver.getAppiumContexts()
```


##### रिटर्न्स

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** उपलब्ध संदर्भों का प्रतिनिधित्व करने वाली स्ट्रिंग्स की एक एरे, जैसे 'WEBVIEW', या 'NATIVE'


---

## shake
डिवाइस पर शेक एक्शन करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/) में मिल सकती है।

##### उपयोग

```js
driver.shake()
```




##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
डिवाइस को लॉक करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/) में मिल सकती है।

##### उपयोग

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>स्क्रीन को कितने समय तक लॉक रखना है (केवल iOS)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
डिवाइस को अनलॉक करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/) में मिल सकती है।

##### उपयोग

```js
driver.unlock()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
जांचें कि डिवाइस लॉक है या नहीं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/) में मिल सकती है।

##### उपयोग

```js
driver.isLocked()
```


##### रिटर्न्स

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** अगर डिवाइस लॉक है तो True, नहीं तो false

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
स्क्रीन रिकॉर्डिंग शुरू करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) में मिल सकती है।

##### उपयोग

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>कमांड पैरामीटर्स जिनमें remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport जैसी कीज़ शामिल हो सकती हैं (Appium दस्तावेज़ों में अधिक विवरण देखें)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
स्क्रीन रिकॉर्डिंग बंद करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/) में मिल सकती है।

##### उपयोग

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>रिमोट लोकेशन का पथ, जहां परिणामी वीडियो अपलोड किया जाना चाहिए। http/https, ftp प्रोटोकॉल समर्थित हैं। यह विकल्प केवल तभी प्रभावी होता है जब स्क्रीन रिकॉर्डिंग प्रक्रिया प्रगति पर हो और forceRestart पैरामीटर true पर सेट न हो। null या खाली स्ट्रिंग मान (डिफ़ॉल्ट सेटिंग) का अर्थ है कि परिणामी फ़ाइल की सामग्री को Base64 के रूप में एनकोड किया जाना चाहिए।</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>रिमोट प्रमाणीकरण के लिए उपयोगकर्ता का नाम।</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>रिमोट प्रमाणीकरण के लिए पासवर्ड।</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>http मल्टीपार्ट अपलोड मेथड का नाम। 'PUT' डिफॉल्ट रूप से उपयोग किया जाता है।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64 एनकोडेड स्ट्रिंग। अगर remote_path सेट है, तो रिस्पांस खाली स्ट्रिंग है

##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
सिस्टम स्टेट के इन्फॉर्मेशन टाइप्स लौटाता है जिन्हें पढ़ने का समर्थन है, जैसे सीपीयू, मेमोरी, नेटवर्क ट्रैफिक और बैटरी।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/) में मिल सकती है।

##### उपयोग

```js
driver.getPerformanceDataTypes()
```


##### रिटर्न्स

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** उपलब्ध परफॉरमेंस डेटा टाइप्स (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
सिस्टम स्थिति की जानकारी लौटाता है जिसे पढ़ने का समर्थन है, जैसे सीपीयू, मेमोरी, नेटवर्क ट्रैफिक और बैटरी।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/) में मिल सकती है।

##### उपयोग

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>एप्लिकेशन का पैकेज नाम</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>सिस्टम स्टेट का प्रकार जिसे पढ़ना चाहते हैं। यह समर्थित परफॉरमेंस डेटा प्रकारों में से एक होना चाहिए</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>पढ़ने के प्रयासों की संख्या</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** सिस्टम स्थिति की जानकारी का प्रकार जिसे पढ़ने का समर्थन है, जैसे सीपीयू, मेमोरी, नेटवर्क ट्रैफिक और बैटरी

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
डिवाइस पर एक विशेष की दबाएं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/) में मिल सकती है।

##### उपयोग

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>प्रेस करने के लिए कीकोड</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>कीकोड को किस मेटा स्टेट के साथ प्रेस करना है</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>कीप्रेस के लिए फ्लैग्स</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
डिवाइस पर एक विशेष की कोड को दबाकर रखें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/) में मिल सकती है।

##### उपयोग

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>डिवाइस पर प्रेस करने के लिए कीकोड</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>कीप्रेस के लिए मेटास्टेट</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>कीप्रेस के लिए फ्लैग्स</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
डिवाइस पर एक की कोड भेजें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>प्रेस करने के लिए कीकोड</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>कीकोड को किस मेटा स्टेट के साथ प्रेस करना है</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
डिवाइस को तीन आयामों में घुमाएं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation) में मिल सकती है।

##### उपयोग

```js
driver.rotateDevice(x, y, z)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>घूमने के इशारे के केंद्र के लिए उपयोग करने के लिए x ऑफसेट</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>घूमने के इशारे के केंद्र के लिए उपयोग करने के लिए y ऑफसेट</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>घूमने के इशारे के केंद्र के लिए उपयोग करने के लिए z ऑफसेट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
वर्तमान Android गतिविधि का नाम प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/) में मिल सकती है।

##### उपयोग

```js
driver.getCurrentActivity()
```


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** वर्तमान गतिविधि का नाम

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
वर्तमान Android पैकेज का नाम प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/) में मिल सकती है।

##### उपयोग

```js
driver.getCurrentPackage()
```


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>package</var></code>:** वर्तमान पैकेज का नाम

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
दिए गए ऐप को डिवाइस पर इंस्टॉल करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/) में मिल सकती है।

##### उपयोग

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>एप्लीकेशन .apk फ़ाइल का पथ</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
दिए गए ऐप को डिवाइस पर सक्रिय करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/) में मिल सकती है।

##### उपयोग

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ऐप आईडी (Android के लिए पैकेज आईडी, iOS के लिए बंडल आईडी)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
डिवाइस से ऐप को हटा दें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/) में मिल सकती है।

##### उपयोग

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ऐप आईडी (Android के लिए पैकेज आईडी, iOS के लिए बंडल आईडी)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
डिवाइस पर दिए गए ऐप को बंद करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/) में मिल सकती है।

##### उपयोग

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ऐप आईडी (Android के लिए पैकेज आईडी, iOS के लिए बंडल आईडी)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>कमांड विकल्प। जैसे "timeout": (केवल Android) ऐप को बंद करने के लिए पुनः प्रयास करने का टाइमआउट (Appium दस्तावेजों में अधिक जानकारी देखें)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
जांचें कि निर्दिष्ट ऐप डिवाइस पर इंस्टॉल है या नहीं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/) में मिल सकती है।

##### उपयोग

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ऐप आईडी (Android के लिए पैकेज आईडी, iOS के लिए बंडल आईडी)</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** अगर इंस्टॉल है तो true, नहीं तो false

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
डिवाइस पर दिए गए ऐप की स्थिति प्राप्त करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/) में मिल सकती है।

##### उपयोग

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ऐप आईडी (Android के लिए पैकेज आईडी, iOS के लिए बंडल आईडी)</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 इंस्टॉल नहीं है। 1 चल नहीं रहा है। 2 बैकग्राउंड में चल रहा है या सस्पेंडेड है। 3 बैकग्राउंड में चल रहा है। 4 फोरग्राउंड में चल रहा है

##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
सॉफ्ट कीबोर्ड छुपाएं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/) में मिल सकती है।

##### उपयोग

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>कीबोर्ड छुपाने की रणनीति (केवल UIAutomation), उपलब्ध रणनीतियां - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key मान अगर रणनीति 'pressKey' है</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key कोड अगर रणनीति 'pressKey' है</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key नाम अगर रणनीति 'pressKey' है</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
सॉफ्ट कीबोर्ड दिखाया गया है या नहीं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/) में मिल सकती है।

##### उपयोग

```js
driver.isKeyboardShown()
```


##### रिटर्न्स

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** अगर कीबोर्ड दिखाया गया है तो True

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
किसी विशेष स्थान पर डिवाइस पर एक फ़ाइल रखें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/) में मिल सकती है।

##### उपयोग

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>डेटा को इंस्टॉल करने का पथ</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>base64 में फ़ाइल की सामग्री</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
डिवाइस के फाइल सिस्टम से एक फ़ाइल प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/) में मिल सकती है।

##### उपयोग

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>डिवाइस पर पथ जहां से फ़ाइल प्राप्त करनी है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>response</var></code>:** base64 में फ़ाइल की सामग्री

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
डिवाइस के फाइल सिस्टम से एक फोल्डर प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/) में मिल सकती है।

##### उपयोग

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>डिवाइस पर पूरे फोल्डर का पथ</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
डिवाइस पर एयरप्लेन मोड टॉगल करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/) में मिल सकती है।

##### उपयोग

```js
driver.toggleAirplaneMode()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
डेटा सेवा की स्थिति स्विच करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/) में मिल सकती है।

##### उपयोग

```js
driver.toggleData()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
वाईफाई सेवा की स्थिति स्विच करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/) में मिल सकती है।

##### उपयोग

```js
driver.toggleWiFi()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
लोकेशन सेवा की स्थिति स्विच करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/) में मिल सकती है।

##### उपयोग

```js
driver.toggleLocationServices()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
नेटवर्क स्पीड सेट करें (केवल एमुलेटर)<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/) में मिल सकती है।

##### उपयोग

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>नेटवर्क प्रकार - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Android नोटिफिकेशन खोलें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/) में मिल सकती है।

##### उपयोग

```js
driver.openNotifications()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
पैकेज नाम और गतिविधि नाम प्रदान करके एक Android गतिविधि शुरू करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/) में मिल सकती है।

##### उपयोग

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>ऐप का नाम</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>गतिविधि का नाम</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>प्रतीक्षा करने के लिए ऐप का नाम</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>प्रतीक्षा करने के लिए गतिविधि का नाम</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>इंटेंट एक्शन जो गतिविधि शुरू करने के लिए उपयोग किया जाएगा</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>इंटेंट श्रेणी जो गतिविधि शुरू करने के लिए उपयोग की जाएगी</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>ध्वज जो गतिविधि शुरू करने के लिए उपयोग किए जाएंगे</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>अतिरिक्त इंटेंट आर्गुमेंट्स जो गतिविधि शुरू करने के लिए उपयोग किए जाएंगे</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>adb का उपयोग करके ऐप शुरू करने से पहले, परीक्षण के तहत ऐप की प्रक्रिया को नहीं रोकता है</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
स्टेटस और नेविगेशन बार की दृश्यता और सीमाओं की जानकारी प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/) में मिल सकती है।

##### उपयोग

```js
driver.getSystemBars()
```


##### रिटर्न्स

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** स्टेटस और नेविगेशन बार की दृश्यता और सीमाओं के बारे में जानकारी

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
डिवाइस पर समय प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/) में मिल सकती है।

##### उपयोग

```js
driver.getDeviceTime()
```


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>time</var></code>:** डिवाइस पर समय

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
डिवाइस से डिस्प्ले डेंसिटी प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getDisplayDensity()
```


##### रिटर्न्स

- **&lt;*&gt;**


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
[टच आईडी](https://support.apple.com/en-ca/ht201371) इवेंट सिमुलेट करें (केवल iOS सिम्युलेटर)। इस सुविधा को सक्षम करने के लिए, `allowTouchIdEnroll` डिजायर्ड कैपेबिलिटी को true पर सेट किया जाना चाहिए और सिम्युलेटर को [एनरोल](https://support.apple.com/en-ca/ht201371) होना चाहिए। जब आप allowTouchIdEnroll को true पर सेट करते हैं, तो यह डिफ़ॉल्ट रूप से सिम्युलेटर को एनरोल्ड पर सेट कर देगा। एनरोलमेंट स्थिति को [टॉगल](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html) किया जा सकता है। यह कॉल केवल तभी काम करेगी जब Appium प्रोसेस या उसके पैरेंट एप्लिकेशन (जैसे Terminal.app या Appium.app) के पास System Preferences > Security & Privacy > Privacy > Accessibility सूची में Mac OS एक्सेसिबिलिटी तक पहुंच हो।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/) में मिल सकती है।

##### उपयोग

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>क्या हम एक सफल टच (true) या एक असफल टच (false) का अनुकरण कर रहे हैं</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
सिम्युलेटर को टचआईडी स्वीकार करने के लिए [एनरोल्ड](https://support.apple.com/en-ca/ht201371) करने के लिए टॉगल करें (केवल iOS सिम्युलेटर)। इस सुविधा को सक्षम करने के लिए, `allowTouchIdEnroll` डिजायर्ड कैपेबिलिटी को true पर सेट किया जाना चाहिए। जब `allowTouchIdEnroll` true पर सेट किया जाता है, तो सिम्युलेटर डिफ़ॉल्ट रूप से एनरोल किया जाएगा, और 'Toggle Touch ID Enrollment' एनरोलमेंट स्थिति को बदलता है। यह कॉल तभी काम करेगी जब Appium प्रोसेस या उसके पैरेंट एप्लिकेशन (जैसे, Terminal.app या Appium.app) के पास System Preferences > Security & Privacy > Privacy > Accessibility सूची में Mac OS एक्सेसिबिलिटी तक पहुंच हो।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/) में मिल सकती है।

##### उपयोग

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>true के बराबर अगर TouchID नामांकन सक्षम होना चाहिए</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
डिवाइस पर ऐप लॉन्च करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/) में मिल सकती है।
:::caution

यह प्रोटोकॉल कमांड डेप्रिकेटेड है<br />iOS के लिए, `driver.execute('mobile: launchApp', { ... })` का उपयोग करें, और Android के लिए, `driver.execute('mobile: activateApp', { ... })` का उपयोग करें।
:::

##### उपयोग

```js
driver.launchApp()
```




##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
डिवाइस पर ऐप बंद करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/) में मिल सकती है।
:::caution

यह प्रोटोकॉल कमांड डेप्रिकेटेड है<br />इसके बजाय `driver.execute('mobile: terminateApp', { ... })` का उपयोग करें
:::

##### उपयोग

```js
driver.closeApp()
```




##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
इस सेशन के लिए वर्तमान में चल रहे ऐप को बैकग्राउंड में भेजें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/) में मिल सकती है।
:::caution

यह प्रोटोकॉल कमांड डेप्रिकेटेड है<br />इसके बजाय `driver.execute('mobile: backgroundApp', { ... })` का उपयोग करें
:::

##### उपयोग

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>ऐप को रिस्टोर करने का समय, अगर 'null' है तो ऐप रिस्टोर नहीं होगा</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
टेस्ट कवरेज डेटा प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/) में मिल सकती है।

##### उपयोग

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>प्रसारित करने के लिए इंटेंट</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>.ec फ़ाइल का पथ</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
ऐप स्ट्रिंग्स प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/) में मिल सकती है।

##### उपयोग

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>भाषा कोड</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>स्ट्रिंग फ़ाइल का पथ</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** निर्दिष्ट भाषा और स्ट्रिंग्स फाइलनेम के लिए एक ऐप से सभी परिभाषित स्ट्रिंग्स

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.setValueImmediate(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>एक एलिमेंट की आईडी जो Find Element(s) के पिछले कॉल में वापस की गई थी</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>एलिमेंट पर सेट करने के लिए टेक्स्ट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
एलिमेंट पर सीधे वैल्यू बदलें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>एक एलिमेंट की आईडी जो Find Element(s) के पिछले कॉल में वापस की गई थी</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>एलिमेंट पर रिप्लेस करने के लिए वैल्यू</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
डिवाइस पर वर्तमान सेटिंग्स प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/) में मिल सकती है।

##### उपयोग

```js
driver.getSettings()
```


##### रिटर्न्स

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** वर्तमान में निर्दिष्ट सभी सेटिंग्स का JSON हैश, Settings API देखें

##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
डिवाइस पर वर्तमान सेटिंग अपडेट करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/) में मिल सकती है।

##### उपयोग

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>अपडेट करने के लिए सेटिंग्स के साथ key/value ऑब्जेक्ट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
जावास्क्रिप्ट के असिंक्रोनस निष्पादन के लिए कॉलबैक url।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>डिवाइस पर प्राप्त करने के लिए प्रतिक्रिया</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
GSM कॉल करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/) में मिल सकती है।

##### उपयोग

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>जिस फोन नंबर पर कॉल करना है</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>एक्शन - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
GSM सिग्नल स्ट्रेंथ सेट करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/) में मिल सकती है।

##### उपयोग

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>सिग्नल स्ट्रेंथ [0, 4] रेंज में</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>सिग्नल स्ट्रेंथ [0, 4] रेंज में। कृपया अगर आप Appium v1.11.0 या निचले वर्जन का उपयोग करते हैं तो इस पैरामीटर को भी समान मान के साथ सेट करें (https://github.com/appium/appium/issues/12234 देखें)।</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
बैटरी प्रतिशत सेट करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/) में मिल सकती है।

##### उपयोग

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>[0, 100] रेंज में प्रतिशत मान</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
बैटरी चार्जर की स्थिति को कनेक्टेड या नहीं पर सेट करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/) में मिल सकती है।

##### उपयोग

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>स्थिति सेट करें। on या off</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
GSM आवाज स्थिति सेट करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/) में मिल सकती है।

##### उपयोग

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>GSM आवाज की स्थिति - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
एक SMS संदेश सिम्युलेट करें (केवल एमुलेटर)।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/) में मिल सकती है।

##### उपयोग

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>SMS भेजने के लिए फोन नंबर</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMS संदेश</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
समर्थित एमुलेटर्स पर उपयोगकर्ताओं को उनके फिंगर प्रिंट स्कैन का उपयोग करके प्रमाणित करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/) में मिल सकती है।

##### उपयोग

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>Android Keystore सिस्टम में संग्रहीत फिंगर प्रिंट्स (1 से 10 तक)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
सिस्टम क्लिपबोर्ड की सामग्री सेट करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/) में मिल सकती है।

##### उपयोग

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>वास्तविक base64 एनकोडेड क्लिपबोर्ड सामग्री</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>प्राप्त करने के लिए सामग्री का प्रकार। Plaintext, Image, URL. Android केवल plaintext का समर्थन करता है</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Android के लिए क्लिपबोर्ड डेटा लेबल</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Appium सर्वर से प्रतिक्रिया

##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
सिस्टम क्लिपबोर्ड की सामग्री प्राप्त करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/) में मिल सकती है।

##### उपयोग

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>प्राप्त करने के लिए सामग्री का प्रकार। Plaintext, Image, URL. Android केवल plaintext का समर्थन करता है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>response</var></code>:** क्लिपबोर्ड सामग्री base64-एनकोडेड स्ट्रिंग के रूप में या एक खाली स्ट्रिंग अगर क्लिपबोर्ड खाली है

##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
यह फंक्शनैलिटी केवल नेटिव कॉन्टेक्स्ट के भीतर से ही उपलब्ध है। 'टच परफॉर्म' अन्य एकल टच इंटरैक्शन की तरह काम करता है, सिवाय इसके कि यह आपको एक कमांड के रूप में एक से अधिक टच एक्शन को चेन करने की अनुमति देता है। यह उपयोगी है क्योंकि Appium कमांड नेटवर्क पर भेजे जाते हैं और कमांड के बीच लेटेंसी होती है। यह लेटेंसी कुछ टच इंटरैक्शन को असंभव बना सकती है क्योंकि कुछ इंटरैक्शन को एक सीक्वेंस में करने की आवश्यकता होती है। उदाहरण के लिए, वर्टिकल के लिए, दबाए रखने, विभिन्न y कोऑर्डिनेट पर जाने और फिर छोड़ने की आवश्यकता होती है। इसके काम करने के लिए, इंटरैक्शन के बीच देरी नहीं हो सकती है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/) में मिल सकती है।

##### उपयोग

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>करने के लिए एक्शन का प्रकार (जैसे moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// प्रतिशत द्वारा एक क्षैतिज स्वाइप करें
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
यह फंक्शनैलिटी केवल नेटिव कॉन्टेक्स्ट के भीतर से ही उपलब्ध है। एक मल्टी टच एक्शन सीक्वेंस करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/) में मिल सकती है।

##### उपयोग

```js
driver.multiTouchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>करने के लिए एक्शन का प्रकार (जैसे moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
यह कमांड आपको एक WebdriverIO स्क्रिप्ट को स्ट्रिंग के रूप में निर्दिष्ट करने और इसे Appium सर्वर पर स्थानीय निष्पादन के लिए ट्रांसमिट करने की अनुमति देता है। यह दृष्टिकोण प्रत्येक कमांड से जुड़ी संभावित लेटेंसी को कम करने में मदद करता है। ***Appium 2.0 के साथ इस कमांड का उपयोग करने के लिए, आपके पास [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) प्लगइन इंस्टॉल होना चाहिए।***<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md) में मिल सकती है।

##### उपयोग

```js
driver.executeDriverScript(script, type, timeout)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>निष्पादित करने के लिए स्क्रिप्ट। इसमें 'driver' ऑब्जेक्ट तक पहुंच है जो वर्तमान सर्वर से जुड़े WebdriverIO सेशन का प्रतिनिधित्व करता है।</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>स्क्रिप्ट में उपयोग की जाने वाली भाषा/फ्रेमवर्क। वर्तमान में, केवल 'webdriverio' समर्थित है और यह डिफ़ॉल्ट है।</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>मिलीसेकंड की संख्या जिसके लिए स्क्रिप्ट को Appium सर्वर द्वारा मारे जाने से पहले चलने की अनुमति दी जानी चाहिए। डिफॉल्ट 1 घंटे के समकक्ष है।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;object&gt;**
            **<code><var>result</var></code>:** दो फील्ड वाला एक ऑब्जेक्ट: 'result', जो स्क्रिप्ट का रिटर्न वैल्यू है, और 'logs', जिसमें 3 इनर फील्ड्स, 'log', 'warn', और 'error' होते हैं, जो स्क्रिप्ट के निष्पादन में console.log, console.warn, और console.error द्वारा लॉग की गई स्ट्रिंग्स की एरे रखते हैं।


---

## getEvents
appium सर्वर में संग्रहीत इवेंट्स प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md) में मिल सकती है।

##### उपयोग

```js
driver.getEvents(type)
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
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>अगर प्रकार प्रदान किया गया है तो प्रकार के साथ फ़िल्टर किए गए इवेंट्स प्राप्त करें।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;object&gt;**
            **<code><var>result</var></code>:** इवेंट्स का JSON हैश जैसे `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
एक कस्टम इवेंट स्टोर करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md) में मिल सकती है।

##### उपयोग

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>विक्रेता का नाम। यह `vendor:event` में `vendor` होगा।</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>इवेंट का नाम। यह `vendor:event` में `event` होगा।</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
यह सुविधा OpenCV फ्रेमवर्क की क्षमताओं का उपयोग करके छवि तुलना करती है। कृपया ध्यान दें कि इस कार्यक्षमता के काम करने के लिए, OpenCV फ्रेमवर्क और opencv4nodejs मॉड्यूल दोनों को उस मशीन पर इंस्टॉल किया जाना चाहिए जहां Appium सर्वर ऑपरेशनल है। ***इसके अलावा, Appium 2.0 के साथ इस सुविधा का उपयोग करने के लिए, आपके पास [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) प्लगइन इंस्टॉल होना चाहिए।***<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/) में मिल सकती है।

##### उपयोग

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>संभावित तुलना मोड्स में से एक: 'matchFeatures', 'getSimilarity', 'matchTemplate'। 'matchFeatures' डिफॉल्ट द्वारा है।</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>एक छवि डेटा। सभी छवि प्रारूप, जिन्हें OpenCV लाइब्रेरी स्वयं स्वीकार करती है, समर्थित हैं।</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>एक छवि डेटा। सभी छवि प्रारूप, जिन्हें OpenCV लाइब्रेरी स्वयं स्वीकार करती है, समर्थित हैं।</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>इस डिक्शनरी की सामग्री वास्तविक `mode` मान पर निर्भर करती है। अधिक विवरण के लिए `appium-support` मॉड्यूल पर दस्तावेज़ीकरण देखें। </td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;object&gt;**
            **<code><var>result</var></code>:** परिणामी डिक्शनरी की सामग्री वास्तविक `mode` और `options` मान पर निर्भर करती है। अधिक विवरण के लिए `appium-support` मॉड्यूल पर दस्तावेज़ीकरण देखें।


---

## implicitWait
तत्वों की खोज करते समय ड्राइवर को प्रतीक्षा करने के लिए समय की मात्रा सेट करें। एक एकल एलिमेंट की खोज करते समय, ड्राइवर को तब तक पेज को पोल करना चाहिए जब तक कोई एलिमेंट नहीं मिल जाता या टाइमआउट समाप्त नहीं हो जाता, जो भी पहले हो। कई एलिमेंट्स की खोज करते समय, ड्राइवर को तब तक पेज को पोल करना चाहिए जब तक कम से कम एक एलिमेंट नहीं मिल जाता या टाइमआउट समाप्त नहीं हो जाता, जिस बिंदु पर इसे एक खाली सूची लौटानी चाहिए। अगर यह कमांड कभी नहीं भेजी जाती है, तो ड्राइवर को डिफ़ॉल्ट रूप से 0ms के इम्प्लिसिट वेट पर होना चाहिए।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>समय की मात्रा, मिलीसेकंड में, एक एलिमेंट पर प्रतीक्षा करने के लिए।</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
एक एलिमेंट को स्क्रॉल करके दृश्य में लाने के बाद स्क्रीन पर उसके स्थान को निर्धारित करें।<br /><br />__नोट:__ इसे एक आंतरिक कमांड माना जाता है और इसका उपयोग केवल नेटिव इवेंट्स को सही ढंग से जनरेट करने के लिए एलिमेंट के स्थान को निर्धारित करने के लिए किया जाना चाहिए।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getLocationInView(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>उस एलिमेंट की ID जिस पर कमांड रूट करनी है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** पेज पर एलिमेंट के लिए X और Y कोऑर्डिनेट्स।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
सक्रिय एलिमेंट पर की स्ट्रोक्स का एक सीक्वेंस भेजें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>टाइप करने के लिए कीज़ का सीक्वेंस। एक एरे प्रदान किया जाना चाहिए।</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
मशीन पर उपलब्ध सभी इंजनों की सूची बनाएं। किसी इंजन का उपयोग करने के लिए, उसे इस सूची में मौजूद होना चाहिए।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.availableIMEEngines()
```


##### रिटर्न्स

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** उपलब्ध इंजनों की एक सूची

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
सक्रिय IME इंजन का नाम प्राप्त करें। नाम स्ट्रिंग प्लेटफॉर्म विशिष्ट है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getActiveIMEEngine()
```


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** सक्रिय IME इंजन का नाम

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
इंगित करता है कि IME इनपुट वर्तमान में सक्रिय है या नहीं<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.isIMEActivated()
```


##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** अगर IME इनपुट उपलब्ध है और वर्तमान में सक्रिय है तो true, अन्यथा false

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
वर्तमान में सक्रिय IME इंजन को डी-एक्टिवेट करता है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.deactivateIMEEngine()
```




##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
एक इंजन को उपलब्ध करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>सक्रिय करने के लिए इंजन का नाम</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
समय की मात्रा, मिलीसेकंड में, सेट करें, जिसमें `/session/:sessionId/execute_async` द्वारा निष्पादित असिंक्रोनस स्क्रिप्ट्स को अबॉर्ट होने और क्लाइंट को `टाइमआउट` त्रुटि लौटने से पहले चलने की अनुमति है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>समय की मात्रा, मिलीसेकंड में, जिसमें समय-सीमित कमांड्स को चलने की अनुमति है</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
एक फॉर्म एलिमेंट सबमिट करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.submit(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>सबमिट किए जाने वाले फॉर्म एलिमेंट की ID</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
पिक्सेल में एक एलिमेंट का आकार निर्धारित करें। आकार `width` और `height` गुणों के साथ एक JSON ऑब्जेक्ट के रूप में लौटाया जाएगा।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getElementSize(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>उस एलिमेंट की ID जिस पर कमांड रूट करनी है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** एलिमेंट की चौड़ाई और ऊंचाई, पिक्सेल में।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
पेज पर एक एलिमेंट का स्थान निर्धारित करें। बिंदु `(0, 0)` पेज के ऊपरी-बाएं कोने को संदर्भित करता है। एलिमेंट के कोऑर्डिनेट्स `x` और `y` गुणों के साथ एक JSON ऑब्जेक्ट के रूप में लौटाए जाते हैं।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getElementLocation(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>उस एलिमेंट की ID जिस पर कमांड रूट करनी है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** पेज पर एलिमेंट के लिए X और Y कोऑर्डिनेट्स।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
टच इनेबल्ड डिवाइस पर सिंगल टैप।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>सिंगल टैप करने के लिए एलिमेंट की ID।</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
स्क्रीन पर फिंगर डाउन।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchDown(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर x कोऑर्डिनेट</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर y कोऑर्डिनेट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
स्क्रीन पर फिंगर अप।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchUp(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर x कोऑर्डिनेट</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर y कोऑर्डिनेट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
स्क्रीन पर फिंगर मूव।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchMove(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर x कोऑर्डिनेट</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>स्क्रीन पर y कोऑर्डिनेट</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
फिंगर मोशन इवेंट्स का उपयोग करके टच स्क्रीन पर लंबा प्रेस करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>लंबे समय तक प्रेस करने के लिए एलिमेंट की ID</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
फिंगर मोशन इवेंट्स का उपयोग करके टच स्क्रीन पर फ्लिक करें। यह फ्लिक कमांड एक विशेष स्क्रीन स्थान से शुरू होती है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>फ्लिक करने के लिए पिक्सेल में x ऑफसेट</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>फ्लिक करने के लिए पिक्सेल में y ऑफसेट</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>उस एलिमेंट की ID जहां से फ्लिक शुरू होता है</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>प्रति सेकंड पिक्सेल में गति</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>प्रति सेकंड पिक्सेल में x गति</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>प्रति सेकंड पिक्सेल में y गति</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
वर्तमान डिवाइस ओरिएंटेशन प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getOrientation()
```


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** वर्तमान ओरिएंटेशन जो ScreenOrientation में परिभाषित मूल्य के अनुरूप है: `LANDSCAPE|PORTRAIT`।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
डिवाइस ओरिएंटेशन सेट करें<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>नया ब्राउज़र ओरिएंटेशन जैसा कि ScreenOrientation में परिभाषित है: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
दिए गए लॉग प्रकार के लिए लॉग प्राप्त करें। लॉग बफर प्रत्येक अनुरोध के बाद रीसेट किया जाता है।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getLogs(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>लॉग प्रकार</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** लॉग एंट्री की सूची।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
उपलब्ध लॉग प्रकार प्राप्त करें।<br /><br />Appium कमांड। अधिक जानकारी [आधिकारिक प्रोटोकॉल दस्तावेजों](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) में मिल सकती है।

##### उपयोग

```js
driver.getLogTypes()
```


##### रिटर्न्स

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** उपलब्ध लॉग प्रकारों की सूची।

##### समर्थन

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
