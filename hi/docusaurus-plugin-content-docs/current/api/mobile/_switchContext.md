---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

एक विशिष्ट वेबव्यू `name`, `title`, या `url` का उपयोग करके एक विशिष्ट संदर्भ (context) में स्विच करें।

यह विधि डिफ़ॉल्ट Appium `context` कमांड को हाइब्रिड मोबाइल एप्लिकेशन में नेटिव और वेबव्यू संदर्भों के बीच स्विच करने के लिए अधिक लचीलापन और सटीकता प्रदान करके बढ़ाती है।

### संदर्भ कैसे काम करते हैं
हाइब्रिड ऐप्स और वेबव्यू के बारे में अवलोकन के लिए, [हाइब्रिड ऐप्स दस्तावेज़ीकरण](/docs/api/mobile#hybrid-apps) देखें।
नीचे `switchContext` कमांड कैसे सामान्य चुनौतियों का समाधान करती है, इसका सारांश है:

#### Android की चुनौतियाँ
- वेबव्यू में अक्सर कई पेज (ब्राउज़र टैब के समान) होते हैं। सही पेज की पहचान करने के लिए अतिरिक्त मेटाडेटा जैसे `title` या `url` की आवश्यकता होती है, जो डिफ़ॉल्ट Appium विधियों द्वारा प्रदान नहीं किया जाता है।
- डिफ़ॉल्ट Appium विधियाँ केवल बुनियादी संदर्भ नाम (जैसे, `WEBVIEW_{packageName}`) वापस करती हैं, वेबव्यू के भीतर सामग्री या पेजों के बारे में विवरण नहीं देती हैं।
- Android पर संदर्भ स्विच करने में दो चरण शामिल हैं, जिन्हें इस विधि द्वारा स्वचालित रूप से संभाला जाता है:
  1. `WEBVIEW_{packageName}` का उपयोग करके वेबव्यू संदर्भ में स्विच करें।
  2. `switchToWindow` विधि का उपयोग करके वेबव्यू के भीतर उपयुक्त पेज का चयन करें।

#### iOS की चुनौतियाँ
- वेबव्यू को जेनेरिक आईडी (जैसे, `WEBVIEW_{id}`) द्वारा पहचाना जाता है, जो सामग्री या उस ऐप स्क्रीन के बारे में जानकारी प्रदान नहीं करते हैं जिनसे वे संबंधित हैं।
- इंटरैक्शन के लिए सही वेबव्यू का निर्धारण अक्सर प्रयास और त्रुटि की आवश्यकता होती है।

`switchContext` विधि विस्तृत मेटाडेटा (जैसे, `title`, `url`, और दृश्यता) प्राप्त करके इस प्रक्रिया को सरल बनाती है, ताकि सटीक और विश्वसनीय संदर्भ स्विचिंग सुनिश्चित हो सके।

### इस विधि का उपयोग क्यों करें?
- **सरलीकृत स्विचिंग**: यदि आप वांछित वेबव्यू का `title` या `url` जानते हैं, तो यह विधि `getContexts` के लिए अतिरिक्त कॉल या `switchContext({id})` और `getTitle()` जैसी कई विधियों को संयोजित करने की आवश्यकता को समाप्त करती है।
- **स्वचालित संदर्भ मिलान**: निम्न के आधार पर संदर्भ के लिए सर्वोत्तम मिलान खोजता है:
  - प्लेटफॉर्म-विशिष्ट पहचानकर्ता (`bundleId` iOS के लिए, `packageName` Android के लिए)।
  - `title` या `url` के लिए सटीक या आंशिक मिलान (स्ट्रिंग्स और रेगुलर एक्सप्रेशन दोनों का समर्थन करता है)।
  - Android-विशिष्ट जांच यह सुनिश्चित करने के लिए कि वेबव्यू अटैच्ड और दृश्यमान हैं।
- **बारीक नियंत्रण**: कस्टम रीट्राई अंतराल और टाइमआउट (केवल Android) आपको वेबव्यू इनिशियलाइजेशन में देरी को संभालने की अनुमति देते हैं।
- **डिफॉल्ट Appium विधि एक्सेस**: यदि आवश्यक हो, तो आप `driver.switchAppiumContext()` के माध्यम से डिफॉल्ट Appium `switchContext` कमांड का उपयोग कर सकते हैं।

:::info नोट्स और सीमाएँ

- यदि वांछित वेबव्यू का `title` या `url` ज्ञात है, तो यह विधि अतिरिक्त `getContexts` कॉल के बिना मैचिंग संदर्भ को स्वचालित रूप से ढूंढ और स्विच कर सकती है।
- Android-विशिष्ट विकल्प जैसे `androidWebviewConnectionRetryTime` और `androidWebviewConnectTimeout` iOS पर लागू नहीं होते हैं।
- डीबगिंग में सहायता के लिए संदर्भ-मिलान विफलताओं के कारणों को लॉग करता है।
- इनपुट के रूप में एक ऑब्जेक्ट का उपयोग करते समय, `title` या `url` में से एक आवश्यक है।

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>स्विच करने के लिए संदर्भ का नाम। अधिक संदर्भ विकल्पों के साथ एक ऑब्जेक्ट प्रदान किया जा सकता है।</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>स्विच करने के लिए पेज का शीर्षक। यह वेबव्यूपेज के टाइटल-टैग की सामग्री होगी। आप एक स्ट्रिंग का उपयोग कर सकते हैं जिसे पूरी तरह से मेल खाना चाहिए या एक रेगुलर एक्सप्रेशन का उपयोग कर सकते हैं।<br /><strong>महत्वपूर्ण:</strong> जब आप विकल्पों का उपयोग करते हैं तो `title` या `url` गुण आवश्यक है।</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>स्विच करने के लिए पेज का url। यह वेबव्यूपेज का `url` होगा। आप एक स्ट्रिंग का उपयोग कर सकते हैं जिसे पूरी तरह से मेल खाना चाहिए या एक रेगुलर एक्सप्रेशन का उपयोग कर सकते हैं।<br /><strong>महत्वपूर्ण:</strong> जब आप विकल्पों का उपयोग करते हैं तो `title` या `url` गुण आवश्यक है।</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>वेबव्यू से कनेक्ट करने के प्रत्येक पुनः प्रयास के बीच प्रतीक्षा करने का समय मिलीसेकंड में। डिफॉल्ट `500` ms है (वैकल्पिक)। <br /><strong>केवल-ANDROID</strong> और केवल तभी उपयोग किया जाएगा जब `title` या `url` प्रदान किया गया हो।</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>वेब व्यू पेज का पता लगाने के लिए प्रतीक्षा करने के लिए अधिकतम समय मिलीसेकंड में। डिफॉल्ट `5000` ms है (वैकल्पिक)। <br /><strong>केवल-ANDROID</strong> और केवल तभी उपयोग किया जाएगा जब `title` या `url` प्रदान किया गया हो।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```