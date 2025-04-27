---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

WebdriverIO का `getContexts` मेथड डिफॉल्ट Appium के `contexts` (और पिछले WebdriverIO `getContexts`) कमांड का एक बेहतर संस्करण है। यह मोबाइल ऐप सेशन में उपलब्ध संदर्भों के बारे में विस्तृत और कार्रवाई योग्य जानकारी प्रदान करता है, जो डिफॉल्ट Appium मेथड्स की सीमाओं को दूर करता है।

### वेबव्यूज कैसे काम करते हैं और यह मेथड कैसे मदद करता है
अधिक विवरण के लिए, [हाइब्रिड ऐप्स डॉक्यूमेंटेशन](/docs/api/mobile#hybrid-apps) देखें। नीचे `getContexts` कमांड द्वारा संबोधित चुनौतियों का सारांश दिया गया है:

#### एंड्रॉइड चुनौतियां
- एक एकल वेबव्यू (जैसे, `WEBVIEW_{packageName}`) में कई पेज (ब्राउज़र टैब के समान) हो सकते हैं।
- डिफॉल्ट Appium मेथड्स में इन पेजों के बारे में विवरण शामिल नहीं हैं, जैसे उनका `title`, `url`, या दृश्यता,
  जिससे सही पेज की पहचान करना मुश्किल हो जाता है और संभावित अस्थिरता पैदा हो सकती है।

#### iOS चुनौतियां
- डिफॉल्ट Appium मेथड किसी भी अतिरिक्त मेटाडेटा के बिना केवल जेनेरिक वेबव्यू आईडी (जैसे, `WEBVIEW_{id}`) लौटाता है।
- इससे यह निर्धारित करना मुश्किल हो जाता है कि कौन सा वेबव्यू लक्षित ऐप स्क्रीन से संबंधित है।

बेहतर `getContexts` मेथड इन समस्याओं को विस्तृत संदर्भ ऑब्जेक्ट्स लौटाकर हल करता है, जिनमें शामिल हैं:
- **एंड्रॉइड के लिए:** `title`, `url`, `packageName`, `webviewPageId`, और लेआउट विवरण (`screenX`, `screenY`, `width`, और `height`)।
- **iOS के लिए:** `bundleId`, `title`, और `url`।

ये सुधार हाइब्रिड ऐप्स के साथ डीबगिंग और इंटरेक्शन को अधिक विश्वसनीय बनाते हैं।

### इस मेथड का उपयोग क्यों करें?
डिफॉल्ट रूप से, Appium `contexts` मेथड केवल उपलब्ध संदर्भों का प्रतिनिधित्व करने वाले स्ट्रिंग्स की एक एरे लौटाता है:
- **एंड्रॉइड के लिए:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **iOS के लिए:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

हालांकि सरल परिदृश्यों के लिए पर्याप्त है, इन डिफॉल्ट प्रतिक्रियाओं में हाइब्रिड ऐप टेस्टिंग के लिए महत्वपूर्ण मेटाडेटा की कमी होती है:
- **एंड्रॉइड के लिए:** पेज-विशिष्ट मेटाडेटा की कमी सही वेबव्यू के साथ इंटरैक्ट करना चुनौतीपूर्ण बनाती है।
- **iOS के लिए:** जेनेरिक वेबव्यू आईडी सामग्री या ऐप स्क्रीन के बारे में कोई जानकारी नहीं देते हैं जिनका वे प्रतिनिधित्व करते हैं।

बेहतर `getContexts` मेथड प्रदान करता है:
- एंड्रॉइड और iOS दोनों के लिए विस्तृत मेटाडेटा।
- बेहतर टारगेटिंग और इंटरैक्शन के लिए वापस किए गए संदर्भों को फ़िल्टर करने और कस्टमाइज़ करने के विकल्प।

:::info नोट्स और सीमाएं

- बेहतर `getContexts` मेथड एंड्रॉइड और iOS प्लेटफॉर्म दोनों पर काम करता है। हालांकि, वापस किया गया डेटा प्लेटफॉर्म और टेस्ट किए जा रहे ऐप के आधार पर भिन्न हो सकता है।
- यदि आप `returnDetailedContexts` विकल्प निर्दिष्ट नहीं करते हैं, तो मेथड डिफॉल्ट Appium `contexts` मेथड की तरह व्यवहार करता है, एक सरल संदर्भ एरे लौटाता है।
- "डिफॉल्ट" Appium `contexts` मेथड का उपयोग करने के लिए, `driver.getAppiumContexts()` का उपयोग करें। अधिक जानकारी के लिए, [Appium Contexts डॉक्यूमेंटेशन](/docs/api/appium#getappiumcontexts) देखें।

#### एंड्रॉइड वेबव्यूज:
- `androidWebviewData` जैसा मेटाडेटा केवल तभी उपलब्ध होता है जब `returnAndroidDescriptionData` `true` है।
- Chrome ब्राउज़र पर `getContexts` मेथड का उपयोग करने पर कभी-कभी असंगत ब्राउज़र/वेबव्यू/ChromeDriver संस्करणों के कारण अधूरा डेटा लौट सकता है। ऐसे मामलों में, डिफॉल्ट मान या एक गलत `webviewPageId` (जैसे, `0`) वापस किया जा सकता है।

:::

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
      <td>`GetContextsOptions`</td>
      <td>`getContexts` विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>डिफॉल्ट रूप से, हम केवल डिफॉल्ट Appium `contexts` API के आधार पर संदर्भ नाम लौटाते हैं। यदि आप सभी डेटा प्राप्त करना चाहते हैं, तो आप इसे `true` पर सेट कर सकते हैं। डिफॉल्ट `false` है (वैकल्पिक)।</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>वेबव्यू से कनेक्ट करने के प्रत्येक प्रयास के बीच प्रतीक्षा करने का समय मिलीसेकंड में। डिफॉल्ट `500` ms है (वैकल्पिक)। <br /><strong>केवल-एंड्रॉइड</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>वेब व्यू पेज का पता लगाने के लिए प्रतीक्षा करने का अधिकतम समय मिलीसेकंड में। डिफॉल्ट `5000` ms है (वैकल्पिक)। <br /><strong>केवल-एंड्रॉइड</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>डिफॉल्ट रूप से, हम सभी वेबव्यू लौटाते हैं। यदि आप वर्तमान खुले एंड्रॉइड ऐप द्वारा वेबव्यू को फ़िल्टर करना चाहते हैं, तो आप इसे `true` पर सेट कर सकते हैं। डिफॉल्ट `false` है (वैकल्पिक)। <br /><strong>नोट:</strong> ध्यान रखें कि इस "प्रतिबंध" के आधार पर आप किसी भी वेबव्यू को नहीं भी ढूंढ सकते हैं। <br /><strong>केवल-एंड्रॉइड</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>डिफॉल्ट रूप से, हम केवल उन वेबव्यूज़ को लौटाते हैं जो अटैच्ड और दृश्यमान हैं। यदि आप सभी वेबव्यूज़ प्राप्त करना चाहते हैं, तो आप इसे `false` पर सेट कर सकते हैं (वैकल्पिक)। डिफॉल्ट `true` है। <br /><strong>केवल-एंड्रॉइड</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>डिफॉल्ट रूप से, कोई एंड्रॉइड वेबव्यू (Chrome) विवरण डेटा नहीं। यदि आप सभी डेटा प्राप्त करना चाहते हैं, तो आप इसे `true` पर सेट कर सकते हैं। डिफॉल्ट `false` है (वैकल्पिक)। <br />इस विकल्प को सक्षम करके आपको प्रतिक्रिया में अतिरिक्त डेटा मिलेगा, अधिक जानकारी के लिए `description.data.test.js` देखें। <br /><strong>केवल-एंड्रॉइड</strong></td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```