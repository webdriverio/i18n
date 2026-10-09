---
id: capabilities
title: क्षमताएँ
description: "वह ब्राउज़र या मोबाइल वातावरण चुनने के लिए क्षमताएँ परिभाषित करें जिसमें आपके परीक्षण चलते हैं, जिसमें कस्टम वेंडर क्षमताएँ और विशेष उपयोग के मामले शामिल हैं।"
---

एक क्षमता (capability) एक रिमोट इंटरफेस के लिए एक परिभाषा है। यह WebdriverIO को यह समझने में मदद करती है कि आप अपने परीक्षण किस ब्राउज़र या मोबाइल वातावरण में चलाना चाहते हैं। स्थानीय रूप से परीक्षण विकसित करते समय क्षमताएँ कम महत्वपूर्ण होती हैं क्योंकि अधिकांश समय आप इसे एक ही रिमोट इंटरफेस पर चलाते हैं, लेकिन CI/CD में इंटीग्रेशन परीक्षणों का एक बड़ा सेट चलाते समय ये अधिक महत्वपूर्ण हो जाती हैं।

:::info

क्षमता ऑब्जेक्ट का प्रारूप [WebDriver स्पेसिफिकेशन](https://w3c.github.io/webdriver/#capabilities) द्वारा स्पष्ट रूप से परिभाषित है। यदि उपयोगकर्ता द्वारा परिभाषित क्षमताएँ उस स्पेसिफिकेशन का पालन नहीं करती हैं, तो WebdriverIO टेस्टरनर शुरुआत में ही विफल हो जाएगा।

:::

## कस्टम क्षमताएँ

हालाँकि निश्चित रूप से परिभाषित क्षमताओं की संख्या बहुत कम है, कोई भी ऐसी कस्टम क्षमताएँ प्रदान और स्वीकार कर सकता है जो ऑटोमेशन ड्राइवर या रिमोट इंटरफेस के लिए विशिष्ट हों:

### ब्राउज़र विशिष्ट क्षमता एक्सटेंशन

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) एक्सटेंशन, केवल Chrome में परीक्षण के लिए लागू
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) एक्सटेंशन, केवल Firefox में परीक्षण के लिए लागू
- `ms:edgeOptions`: Chromium Edge के परीक्षण के लिए EdgeDriver का उपयोग करते समय वातावरण निर्दिष्ट करने हेतु [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)

### क्लाउड वेंडर क्षमता एक्सटेंशन

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- और भी बहुत कुछ...

### ऑटोमेशन इंजन क्षमता एक्सटेंशन

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- और भी बहुत कुछ...

### ब्राउज़र ड्राइवर विकल्पों को प्रबंधित करने के लिए WebdriverIO क्षमताएँ

WebdriverIO आपके लिए ब्राउज़र ड्राइवर को इंस्टॉल करने और चलाने का प्रबंधन करता है। WebdriverIO एक कस्टम क्षमता का उपयोग करता है जो आपको ड्राइवर को पैरामीटर पास करने की अनुमति देती है।

#### `wdio:chromedriverOptions`

Chromedriver को शुरू करते समय उसमें पास किए जाने वाले विशिष्ट विकल्प।

#### `wdio:geckodriverOptions`

Geckodriver को शुरू करते समय उसमें पास किए जाने वाले विशिष्ट विकल्प।

#### `wdio:edgedriverOptions`

Edgedriver को शुरू करते समय उसमें पास किए जाने वाले विशिष्ट विकल्प।

#### `wdio:safaridriverOptions`

Safari को शुरू करते समय उसमें पास किए जाने वाले विशिष्ट विकल्प।

#### `wdio:maxInstances`

<Option type="number">

विशिष्ट ब्राउज़र/क्षमता के लिए समानांतर रूप से चलने वाले कुल वर्कर्स की अधिकतम संख्या। यह [maxInstances](#configuration#maxInstances) और [maxInstancesPerCapability](configuration/#maxinstancespercapability) पर प्राथमिकता लेता है।

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

उस ब्राउज़र/क्षमता के लिए परीक्षण निष्पादन हेतु specs परिभाषित करें। यह [सामान्य `specs` कॉन्फ़िगरेशन विकल्प](configuration#specs) के समान है, लेकिन ब्राउज़र/क्षमता के लिए विशिष्ट है। यह `specs` पर प्राथमिकता लेता है।

</Option>

#### `wdio:exclude`

<Option type="String[]">

उस ब्राउज़र/क्षमता के लिए परीक्षण निष्पादन से specs को बाहर करें। यह [सामान्य `exclude` कॉन्फ़िगरेशन विकल्प](configuration#exclude) के समान है, लेकिन ब्राउज़र/क्षमता के लिए विशिष्ट है। वैश्विक `exclude` कॉन्फ़िगरेशन विकल्प लागू होने के बाद बाहर करता है।

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

डिफ़ॉल्ट रूप से, WebdriverIO एक WebDriver Bidi सेशन स्थापित करने का प्रयास करता है। यदि आप ऐसा नहीं चाहते हैं, तो आप इस व्यवहार को अक्षम करने के लिए यह फ़्लैग सेट कर सकते हैं।

</Option>

#### `wdio:electronVersion`

<Option type="string">

`goog:chromeOptions.binary` के रूप में सेट किए गए Electron ऐप का परीक्षण करने के लिए, Chrome for Testing वाले Chromedriver के बजाय इस Electron रिलीज़ के साथ बंडल किया गया Chromedriver डाउनलोड करता है। यदि `browserVersion` भी सेट है, तो जब Electron रिलीज़ डाउनलोड नहीं की जा सकती या `CHROMEDRIVER_CDNURL` सेट हो, तब WebdriverIO उसके बजाय उस संस्करण के लिए Chromedriver का उपयोग करता है। Nightly संस्करण [electron/nightlies](https://github.com/electron/nightlies/releases) से आते हैं। Electron सर्विस इसे ऐप के Electron संस्करण से आपके लिए स्वचालित रूप से सेट करती है।

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // एक BiDi सेशन ऐप की विंडो को `data:,` से बदल देता है
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### सामान्य ड्राइवर विकल्प

हालाँकि सभी ड्राइवर कॉन्फ़िगरेशन के लिए अलग-अलग पैरामीटर प्रदान करते हैं, कुछ सामान्य पैरामीटर हैं जिन्हें WebdriverIO समझता है और आपके ड्राइवर या ब्राउज़र को सेट करने के लिए उपयोग करता है:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

कैश डायरेक्टरी के रूट का पाथ। इस डायरेक्टरी का उपयोग उन सभी ड्राइवरों को संग्रहीत करने के लिए किया जाता है जो सेशन शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

</Option>

##### `binary`

<Option type="string">

कस्टम ड्राइवर बाइनरी का पाथ। यदि सेट किया गया है, तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पाथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

आप यह पाथ `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` या `EDGEDRIVER_PATH` एनवायरनमेंट वेरिएबल्स के माध्यम से प्रदान कर सकते हैं।

</Option>
:::caution

यदि ड्राइवर `binary` सेट है, तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पाथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

:::

#### कस्टम ड्राइवर डाउनलोड होस्ट

यदि सार्वजनिक ड्राइवर CDN आपके वातावरण से पहुँच योग्य नहीं हैं, उदाहरण के लिए क्योंकि आप अपने परीक्षण किसी कॉर्पोरेट प्रॉक्सी के पीछे चलाते हैं या ड्राइवरों को किसी आंतरिक आर्टिफैक्ट रजिस्ट्री में मिरर करते हैं, तो आप निम्नलिखित एनवायरनमेंट वेरिएबल्स का उपयोग करके डाउनलोड को किसी कस्टम होस्ट की ओर निर्देशित कर सकते हैं:

- Chrome: `CHROMEDRIVER_CDNURL`, डिफ़ॉल्ट `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, डिफ़ॉल्ट `https://msedgedriver.microsoft.com`

मिरर से अपेक्षा की जाती है कि वह ड्राइवर आर्काइव्स को मूल CDN के समान पाथ के तहत प्रदान करे, उदाहरण के लिए Chrome के लिए:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

जो ड्राइवर को `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` पर रिज़ॉल्व करता है, जहाँ `<platform>` इनमें से एक है: `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` या `win64`, उदाहरण के लिए `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`।

:::info पूरी तरह से ऑफ़लाइन वातावरण

ये वेरिएबल्स केवल ड्राइवर डाउनलोड को पुनर्निर्देशित करते हैं। WebdriverIO को सार्वजनिक इंटरनेट तक बिल्कुल भी पहुँचने से रोकने के लिए, चार और शर्तें पूरी होनी चाहिए:

- **एक ब्राउज़र स्थानीय रूप से उपलब्ध होना चाहिए।** यदि WebdriverIO को कोई इंस्टॉल किया हुआ Chrome या Firefox नहीं मिलता है, तो वह ब्राउज़र भी डाउनलोड करता है, और वह डाउनलोड इन वेरिएबल्स का पालन नहीं करता है। या तो मशीन पर ब्राउज़र इंस्टॉल करें या `goog:chromeOptions.binary` / `moz:firefoxOptions.binary` के माध्यम से WebdriverIO को उसकी ओर निर्देशित करें।
- **पूर्ण संस्करण संख्या का उपयोग करें।** यदि `browserVersion` छोड़ दिया जाता है, तो WebdriverIO स्थानीय ब्राउज़र से सटीक संस्करण पढ़ता है और किसी संस्करण लुकअप की आवश्यकता नहीं होती है। यदि आप इसे सेट करते हैं, तो पूर्ण चार भाग वाले संस्करण का उपयोग करें, उदाहरण के लिए `140.0.7339.207`। एक रिलीज़ चैनल (`stable`), एक माइलस्टोन (`140`) या एक आंशिक संस्करण (`140.0.7339`) के लिए एक सार्वजनिक Google एंडपॉइंट पर संस्करण लुकअप की आवश्यकता होती है जिसे पुनर्निर्देशित नहीं किया जा सकता।
- **Chromedriver को Chrome for Testing से आना चाहिए।** Linux ARM64 पर `153.0.8001.0` से पुराने Chrome के लिए, और `wdio:electronVersion` के साथ लेकिन `browserVersion` के बिना, Chromedriver को Electron की GitHub रिलीज़ से डाउनलोड किया जाता है, जिसे ये वेरिएबल्स पुनर्निर्देशित नहीं करते हैं।
- **सुनिश्चित करें कि मिरर में वास्तव में वह संस्करण है जिसकी आपको आवश्यकता है।** यदि ड्राइवर को आपके होस्ट से प्राप्त नहीं किया जा सकता — क्योंकि संस्करण मिरर नहीं किया गया है, या समान रूप से क्योंकि url गलत है या क्रेडेंशियल्स अस्वीकार कर दिए गए थे — तो WebdriverIO एक चेतावनी लॉग करता है और फिर निकटतम ज्ञात सही संस्करण को खोजता है, जो फिर से सार्वजनिक एंडपॉइंट से क्वेरी करता है। यदि कोई रन अप्रत्याशित रूप से इंटरनेट तक पहुँचता है या कोई ऐसा संस्करण चुनता है जिसे आपने नहीं माँगा था, तो उस होस्ट के लिए चेतावनी देखें जिसे उसने आज़माया था।

:::

#### ब्राउज़र विशिष्ट ड्राइवर विकल्प

ड्राइवर तक विकल्प पहुँचाने के लिए आप निम्नलिखित कस्टम क्षमताओं का उपयोग कर सकते हैं:

- Chrome या Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort

<Option type="number">

वह पोर्ट जिस पर ADB ड्राइवर चलना चाहिए।

उदाहरण: `9515`

</Option>

##### urlBase

<Option type="string">

कमांड्स के लिए बेस URL पाथ प्रीफ़िक्स, उदाहरण के लिए `wd/url`।

उदाहरण: `/`

</Option>

##### logPath

<Option type="string">

सर्वर लॉग को stderr के बजाय फ़ाइल में लिखें, लॉग स्तर को `INFO` तक बढ़ाता है

</Option>

##### logLevel

<Option type="string">

लॉग स्तर सेट करें। संभावित विकल्प `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`।

</Option>

##### verbose

<Option type="boolean">

विस्तार से लॉग करें (`--log-level=ALL` के समतुल्य)

</Option>

##### silent

<Option type="boolean">

कुछ भी लॉग न करें (`--log-level=OFF` के समतुल्य)

</Option>

##### appendLog

<Option type="boolean">

लॉग फ़ाइल को दोबारा लिखने के बजाय उसमें जोड़ें।

</Option>

##### replayable

<Option type="boolean">

विस्तार से लॉग करें और लंबी स्ट्रिंग्स को छोटा न करें ताकि लॉग को फिर से चलाया जा सके (प्रायोगिक)।

</Option>

##### readableTimestamp

<Option type="boolean">

लॉग में पढ़ने योग्य टाइमस्टैम्प जोड़ें।

</Option>

##### enableChromeLogs

<Option type="boolean">

ब्राउज़र से लॉग दिखाएँ (अन्य लॉगिंग विकल्पों को ओवरराइड करता है)।

</Option>

##### bidiMapperPath

<Option type="string">

कस्टम bidi मैपर पाथ।

</Option>

##### allowedIps

<Option type="string[]" default="['']">

रिमोट IP पतों की अल्पविराम से अलग की गई अनुमति सूची जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है।

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

रिक्वेस्ट ऑरिजिन्स की अल्पविराम से अलग की गई अनुमति सूची जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है। किसी भी होस्ट ऑरिजिन की अनुमति देने के लिए `*` का उपयोग करना खतरनाक है!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

ड्राइवर प्रोसेस में पास किए जाने वाले विकल्प।

</Option>
</TabItem>
<TabItem value="firefox">

सभी Geckodriver विकल्प आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-geckodriver#options) में देखें।

</TabItem>
<TabItem value="msedge">

सभी Edgedriver विकल्प आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-edgedriver#options) में देखें।

</TabItem>
<TabItem value="safari">

सभी Safaridriver विकल्प आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-safaridriver#options) में देखें।

</TabItem>
</Tabs>

## विशिष्ट उपयोग के मामलों के लिए विशेष क्षमताएँ

यह उदाहरणों की एक सूची है जो दिखाती है कि किसी निश्चित उपयोग के मामले को प्राप्त करने के लिए किन क्षमताओं को लागू करने की आवश्यकता है।

### ब्राउज़र को हेडलेस चलाएँ

हेडलेस ब्राउज़र चलाने का अर्थ है बिना विंडो या UI के ब्राउज़र इंस्टेंस चलाना। इसका उपयोग ज़्यादातर CI/CD वातावरणों में किया जाता है जहाँ कोई डिस्प्ले उपयोग नहीं होता है। ब्राउज़र को हेडलेस मोड में चलाने के लिए, निम्नलिखित क्षमताएँ लागू करें:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // या 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

ऐसा लगता है कि Safari हेडलेस मोड में चलने का [समर्थन नहीं करता](https://discussions.apple.com/thread/251837694)।

</TabItem>
</Tabs>

### विभिन्न ब्राउज़र चैनलों को स्वचालित करें

यदि आप किसी ऐसे ब्राउज़र संस्करण का परीक्षण करना चाहते हैं जो अभी तक stable के रूप में जारी नहीं हुआ है, उदाहरण के लिए Chrome Canary, तो आप क्षमताएँ सेट करके और उस ब्राउज़र की ओर इंगित करके ऐसा कर सकते हैं जिसे आप शुरू करना चाहते हैं, उदाहरण के लिए:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Chrome पर परीक्षण करते समय, WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ब्राउज़र संस्करण और ड्राइवर स्वचालित रूप से डाउनलोड करेगा, उदाहरण के लिए:

```ts
{
    browserName: 'chrome', // या 'chromium'
    browserVersion: '116' // या '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' या 'latest' ('canary' के समान)
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए ब्राउज़र का परीक्षण करना चाहते हैं, तो आप ब्राउज़र का बाइनरी पाथ इसके माध्यम से प्रदान कर सकते हैं:

```ts
{
    browserName: 'chrome',  // या 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इसके माध्यम से प्रदान कर सकते हैं:

```ts
{
    browserName: 'chrome', // या 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefox पर परीक्षण करते समय, WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ब्राउज़र संस्करण और ड्राइवर स्वचालित रूप से डाउनलोड करेगा, उदाहरण के लिए:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // या 'latest'
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए संस्करण का परीक्षण करना चाहते हैं, तो आप ब्राउज़र का बाइनरी पाथ इसके माध्यम से प्रदान कर सकते हैं:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इसके माध्यम से प्रदान कर सकते हैं:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Microsoft Edge पर परीक्षण करते समय, सुनिश्चित करें कि आपकी मशीन पर वांछित ब्राउज़र संस्करण इंस्टॉल है। आप निष्पादित करने के लिए WebdriverIO को ब्राउज़र की ओर इसके माध्यम से निर्देशित कर सकते हैं:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ड्राइवर संस्करण स्वचालित रूप से डाउनलोड करेगा, उदाहरण के लिए:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // या '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इसके माध्यम से प्रदान कर सकते हैं:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Safari पर परीक्षण करते समय, सुनिश्चित करें कि आपकी मशीन पर [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) इंस्टॉल है। आप WebdriverIO को उस संस्करण की ओर इसके माध्यम से निर्देशित कर सकते हैं:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## कस्टम क्षमताओं का विस्तार करें

यदि आप अपनी स्वयं की क्षमताओं का सेट परिभाषित करना चाहते हैं, उदाहरण के लिए उस विशिष्ट क्षमता के परीक्षणों में उपयोग किए जाने वाले मनमाने डेटा को संग्रहीत करने के लिए, तो आप ऐसा उदाहरण के लिए यह सेट करके कर सकते हैं:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // कस्टम कॉन्फ़िगरेशन
        }
    }]
}
```

क्षमता नामकरण के मामले में [W3C प्रोटोकॉल](https://w3c.github.io/webdriver/#dfn-extension-capability) का पालन करने की सलाह दी जाती है, जिसके लिए एक `:` (कोलन) वर्ण की आवश्यकता होती है, जो एक कार्यान्वयन विशिष्ट नेमस्पेस को दर्शाता है। अपने परीक्षणों में आप अपनी कस्टम क्षमता तक इसके माध्यम से पहुँच सकते हैं, उदाहरण के लिए:

```ts
browser.capabilities['custom:caps']
```

टाइप सुरक्षा सुनिश्चित करने के लिए आप WebdriverIO के क्षमता इंटरफेस का विस्तार इसके माध्यम से कर सकते हैं:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```