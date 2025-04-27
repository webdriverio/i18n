---
id: chromium
title: क्रोमियम
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
क्या वर्तमान में एक सरल डायलॉग खुला है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49) मिल सकती है।

##### उपयोग

```js
browser.isAlertOpen()
```

##### उदाहरण


```js
console.log(browser.isAlertOpen()); // outputs: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // outputs: true
```


##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** सरल डायलॉग मौजूद होने या न होने के आधार पर `true` या `false`।


---

## isAutoReporting
क्या यह स्वचालित रूप से ब्राउज़र लॉग पर त्रुटियों को उठाता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://codereview.chromium.org/101203012) मिल सकती है।

##### उपयोग

```js
browser.isAutoReporting()
```


##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** स्वचालित रिपोर्टिंग सक्षम होने के आधार पर `true` या `false`।


---

## setAutoReporting
सभी आगामी कमांड्स के लिए (एक बार सक्षम होने के बाद) अज्ञात त्रुटि के साथ पहली ब्राउज़र त्रुटि (जैसे 403/404 प्रतिक्रिया के कारण संसाधन लोड करने में विफल) के साथ प्रतिक्रिया लौटाने के लिए टॉगल करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://codereview.chromium.org/101203012) मिल सकती है।

##### उपयोग

```js
browser.setAutoReporting(enabled)
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
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` यदि स्वचालित रिपोर्टिंग को सक्षम किया जाना चाहिए, पहले से सक्षम स्वचालित रिपोर्टिंग को अक्षम करने के लिए `false` का उपयोग करें।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// Enable auto reporting first thing after session was initiated with empty browser logs
console.log(browser.setAutoReporting(true)); // outputs: null
// Upon requesting an non-existing resource it will abort execution due to thrown unknown error
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// During the session do some operations which populate the browser logs
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Enable auto reporting which throws an unknown error for first browser log (404 response)
browser.setAutoReporting(true);
```


##### रिटर्न्स

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** यदि इस कमांड को निष्पादित करने से पहले पहली ब्राउज़र त्रुटि पहले से ही हो चुकी है, तो यह अज्ञात त्रुटि के रूप में प्रतिक्रिया देगा, जो पहली ब्राउज़र त्रुटि का वर्णन करने वाली 'message' कुंजी के साथ एक ऑब्जेक्ट है। अन्यथा यह सफलता पर `null` लौटाता है।


---

## isLoading
सक्रिय विंडो हैंडल के लिए लोड स्थिति निर्धारित करता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802) मिल सकती है।

##### उपयोग

```js
browser.isLoading()
```

##### उदाहरण


```js
console.log(browser.isLoading()); // outputs: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // outputs: true
```


##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** सक्रिय विंडो हैंडल के लोड होने या न होने के आधार पर `true` या `false`।


---

## takeHeapSnapshot
वर्तमान निष्पादन संदर्भ का हीप स्नैपशॉट लेता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202) मिल सकती है।

##### उपयोग

```js
browser.takeHeapSnapshot()
```


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** हीप स्नैपशॉट का JSON प्रतिनिधित्व। जिसे Chrome DevTools में फ़ाइल के रूप में लोड करके निरीक्षण किया जा सकता है।


---

## getNetworkConnection
नेटवर्क एमुलेशन के लिए कनेक्शन प्रकार प्राप्त करें। यह कमांड केवल तभी लागू होता है जब रिमोट एंड `networkConnectionEnabled` क्षमता को `true` पर सेट करके उत्तर देता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) मिल सकती है।

##### उपयोग

```js
browser.getNetworkConnection()
```

##### उदाहरण


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // outputs: 6 (Both Wi-Fi and data)
```


##### रिटर्न्स

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** नेटवर्क कनेक्शन प्रकार का प्रतिनिधित्व करने के लिए एक बिटमास्क। हवाई जहाज मोड (`1`), केवल वाई-फाई (`2`), वाई-फाई और डेटा (`6`), 4G (`8`), 3G (`10`), 2G (`20`)। डिफ़ॉल्ट रूप से [वाई-फाई और डेटा सक्षम हैं](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37)।


---

## setNetworkConnection
नेटवर्क कनेक्शन के लिए कनेक्शन प्रकार बदलें। यह कमांड केवल तभी लागू होता है जब रिमोट एंड `networkConnectionEnabled` क्षमता को `true` पर सेट करके उत्तर देता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) मिल सकती है।

##### उपयोग

```js
browser.setNetworkConnection(parameters)
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
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>ConnectionType युक्त ऑब्जेक्ट, ऑब्जेक्ट में `type` कुंजी के लिए मूल्य के रूप में बिटमास्क सेट करें। हवाई जहाज मोड (`1`), केवल वाई-फाई (`2`), वाई-फाई और डेटा (`6`), 4G (`8`), 3G (`10`), 2G (`20`)।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // outputs: 1 (Airplane Mode)
```


##### रिटर्न्स

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** नेटवर्क कनेक्शन प्रकार का प्रतिनिधित्व करने के लिए एक बिटमास्क। मान ऑब्जेक्ट में निर्दिष्ट `type` से मेल खाना चाहिए, हालांकि डिवाइस अनुरोधित नेटवर्क कनेक्शन प्रकार में सक्षम नहीं हो सकता है।


---

## getNetworkConditions
एमुलेशन के लिए उपयोग की जाने वाली वर्तमान नेटवर्क स्थितियां प्राप्त करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859) मिल सकती है।

##### उपयोग

```js
browser.getNetworkConditions()
```


##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** `offline`, `latency`, `download_throughput` और `upload_throughput` के लिए नेटवर्क स्थितियों वाला ऑब्जेक्ट। इसे प्राप्त करने से पहले नेटवर्क स्थितियां सेट की जानी चाहिए।


---

## setNetworkConditions
कनेक्शन को थ्रॉटल करके एमुलेशन के लिए उपयोग की जाने वाली नेटवर्क स्थितियां सेट करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722) मिल सकती है।

##### उपयोग

```js
browser.setNetworkConditions(network_conditions, network_name)
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
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>नेटवर्क स्थितियों वाला ऑब्जेक्ट जो `latency`, `throughput` (या `download_throughput`/`upload_throughput`) और `offline` (वैकल्पिक) हैं।</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>string</td>
      <td>[नेटवर्क थ्रॉटलिंग प्रीसेट](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25) का नाम। `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` या अक्षम करने के लिए `No throttling`। जब प्रीसेट निर्दिष्ट किया जाता है, तो पहले आर्गुमेंट में पास किए गए मानों का सम्मान नहीं किया जाता है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// Use different download (25kb/s) and upload (50kb/s) throughput values for throttling with a latency of 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Force disconnected from network by setting 'offline' to true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// When preset name (e.g. 'DSL') is specified it does not respect values in object (e.g. 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Best practice for specifying network throttling preset is to use an empty object
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
किसी भी नेटवर्क थ्रॉटलिंग को अक्षम करें जो सेट हो सकता है। `No throttling` प्रीसेट सेट करने के बराबर है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745) मिल सकती है।

##### उपयोग

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
DevTools डीबगर को एक कमांड भेजें।<br />उपलब्ध कमांड्स और उनके पैरामीटर्स की सूची के लिए [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) देखें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304) मिल सकती है।

##### उपयोग

```js
browser.sendCommand(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>कमांड का नाम (जैसे [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close))।</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>कमांड के लिए पैरामीटर्स। यदि कमांड के लिए कोई पैरामीटर नहीं है, तो एक खाली ऑब्जेक्ट निर्दिष्ट करें।</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
DevTools डीबगर को एक कमांड भेजें और परिणाम की प्रतीक्षा करें।<br />उपलब्ध कमांड्स और उनके पैरामीटर्स की सूची के लिए [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) देखें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320) मिल सकती है।

##### उपयोग

```js
browser.sendCommandAndGetResult(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>कमांड का नाम जो परिणाम लौटाता है (जैसे [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies))।</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>कमांड के लिए पैरामीटर्स। यदि कमांड के लिए कोई पैरामीटर नहीं है, तो एक खाली ऑब्जेक्ट निर्दिष्ट करें।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;*&gt;**
            **<code><var>result</var></code>:** या तो आपके कमांड का रिटर्न वैल्यू, या त्रुटि जो आपके कमांड की विफलता का कारण थी।


---

## file
रिमोट मशीन पर जिस पर ब्राउज़र चल रहा है, फ़ाइल अपलोड करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065) मिल सकती है।

##### उपयोग

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>अपलोड करने के लिए __एकल__ फ़ाइल वाला Base64-एन्कोडेड ज़िप आर्काइव। यदि base64-एन्कोडेड डेटा ज़िप आर्काइव का प्रतिनिधित्व नहीं करता है या आर्काइव में एक से अधिक फ़ाइलें हैं, तो यह एक अज्ञात त्रुटि फेंकेगा।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>path</var></code>:** रिमोट मशीन पर अपलोड की गई फ़ाइल का पूर्ण पथ।


---

## launchChromeApp
निर्दिष्ट आईडी द्वारा एक Chrome ऐप लॉन्च करता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539) मिल सकती है।

##### उपयोग

```js
browser.launchChromeApp(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>लॉन्च किए जाने वाले ऐप का एक्सटेंशन आईडी, जैसा कि chrome://extensions में परिभाषित है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Install upon starting browser in order to launch it
            extensions: [
              // Entry should be a base64-encoded packed Chrome app (.crx)
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
दिए गए फॉर्म कंट्रोल एलिमेंट का मान प्राप्त करता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443) मिल सकती है।

##### उपयोग

```js
browser.getElementValue(elementId)
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
      <td>वह एलिमेंट आईडी जिससे मान प्राप्त करना है</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** एलिमेंट का वर्तमान मान। यदि निर्दिष्ट एलिमेंट एक फॉर्म कंट्रोल एलिमेंट नहीं है, तो यह `null` लौटाएगा।


---

## elementHover
एक एलिमेंट के लिए होवर स्थिति सक्षम करें, जो अगली इंटरैक्शन पर रीसेट हो जाती है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146) मिल सकती है।

##### उपयोग

```js
browser.elementHover(elementId)
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
      <td>जिस एलिमेंट पर होवर करना है उसका आईडी</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
पिंच ज़ूम इफेक्ट ट्रिगर करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827) मिल सकती है।

##### उपयोग

```js
browser.touchPinch(x, y, scale)
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
      <td>पिंच करने के लिए x स्थिति</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>पिंच करने के लिए y स्थिति</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>पिंच ज़ूम स्केल</td>
    </tr>
  </tbody>
</table>



---

## freeze
वर्तमान पेज को फ्रीज करें। [पेज लाइफसाइकल API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api) के लिए एक्सटेंशन।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633) मिल सकती है।

##### उपयोग

```js
browser.freeze()
```



---

## resume
वर्तमान पेज को रिज्यूम करें। [पेज लाइफसाइकल API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api) के लिए एक्सटेंशन।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645) मिल सकती है।

##### उपयोग

```js
browser.resume()
```



---

## getCastSinks
Chrome मीडिया राउटर के लिए उपलब्ध कास्ट सिंक्स (कास्ट डिवाइस) की सूची लौटाता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748) मिल सकती है।

##### उपयोग

```js
browser.getCastSinks()
```


##### रिटर्न्स

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** उपलब्ध सिंक्स की सूची।


---

## selectCastSink
मीडिया राउटर इरादों (कनेक्ट या प्ले) के प्राप्तकर्ता के रूप में एक कास्ट सिंक (कास्ट डिवाइस) का चयन करता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737) मिल सकती है।

##### उपयोग

```js
browser.selectCastSink(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>लक्षित डिवाइस का नाम।</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
निर्दिष्ट डिवाइस पर वर्तमान ब्राउज़र टैब के लिए टैब मिररिंग शुरू करता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741) मिल सकती है।

##### उपयोग

```js
browser.startCastTabMirroring(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>लक्षित डिवाइस का नाम।</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
यदि कास्ट सेशन में कोई समस्या है तो त्रुटि संदेश लौटाता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751) मिल सकती है।

##### उपयोग

```js
browser.getCastIssueMessage()
```


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>message</var></code>:** त्रुटि संदेश, यदि कोई है।


---

## stopCasting
यदि कनेक्टेड है, तो निर्दिष्ट डिवाइस पर मीडिया राउटर से कास्टिंग रोकता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744) मिल सकती है।

##### उपयोग

```js
browser.stopCasting(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>लक्षित डिवाइस का नाम।</td>
    </tr>
  </tbody>
</table>



---

## shutdown
ChromeDriver प्रोसेस को बंद करें और परिणामस्वरूप सभी सक्रिय सेशनों को समाप्त करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498) मिल सकती है।

##### उपयोग

```js
browser.shutdown()
```



---

## takeElementScreenshot
टेक एलिमेंट स्क्रीनशॉट कमांड एक एलिमेंट के बाउंडिंग रेक्टैंगल द्वारा समाहित दृश्य क्षेत्र का स्क्रीनशॉट लेता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) मिल सकती है।

##### उपयोग

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td>Find Element(s) के पिछले कॉल में लौटाए गए एलिमेंट का आईडी</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>boolean</td>
      <td>एलिमेंट को व्यू में स्क्रॉल करें। डिफ़ॉल्ट: true</td>
    </tr>
  </tbody>
</table>


##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** व्यू में स्क्रॉल करने के बाद एलिमेंट के बाउंडिंग रेक्टैंगल के दृश्य क्षेत्र का स्क्रीनशॉट शामिल करने वाला base64-एन्कोडेड PNG इमेज डेटा।


---

## getLogTypes
उपलब्ध लॉग प्रकार प्राप्त करें।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) मिल सकती है।

##### उपयोग

```js
browser.getLogTypes()
```


##### रिटर्न्स

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** उपलब्ध लॉग प्रकारों की सूची, उदाहरण: browser, driver।


---

## getLogs
दिए गए लॉग प्रकार के लिए लॉग प्राप्त करें। प्रत्येक अनुरोध के बाद लॉग बफर रीसेट होता है।<br /><br />गैर-आधिकारिक और अप्रलेखित क्रोमियम कमांड। इस कमांड के बारे में अधिक जानकारी [यहां](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) मिल सकती है।

##### उपयोग

```js
browser.getLogs(type)
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
            **<code><var>logs</var></code>:** लॉग एंट्रियों की सूची।

