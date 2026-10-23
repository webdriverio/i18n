---
id: capabilities
title: कैपेबिलिटीज़
description: "उस ब्राउज़र या मोबाइल एनवायरनमेंट को चुनने के लिए कैपेबिलिटीज़ परिभाषित करें जिसमें आपके टेस्ट चलते हैं, जिसमें कस्टम वेंडर कैपेबिलिटीज़ और विशेष उपयोग के मामले शामिल हैं।"
---

कैपेबिलिटी एक रिमोट इंटरफ़ेस की परिभाषा है। यह WebdriverIO को यह समझने में मदद करती है कि आप अपने टेस्ट किस ब्राउज़र या मोबाइल एनवायरनमेंट में चलाना चाहते हैं। लोकल रूप से टेस्ट विकसित करते समय कैपेबिलिटीज़ कम महत्वपूर्ण होती हैं क्योंकि ज़्यादातर समय आप उन्हें एक ही रिमोट इंटरफ़ेस पर चलाते हैं, लेकिन CI/CD में इंटीग्रेशन टेस्ट का एक बड़ा सेट चलाते समय ये अधिक महत्वपूर्ण हो जाती हैं।

:::info

कैपेबिलिटी ऑब्जेक्ट का फ़ॉर्मेट [WebDriver स्पेसिफिकेशन](https://w3c.github.io/webdriver/#capabilities) द्वारा अच्छी तरह से परिभाषित है। यदि यूज़र द्वारा परिभाषित कैपेबिलिटीज़ उस स्पेसिफिकेशन का पालन नहीं करती हैं, तो WebdriverIO टेस्टरनर शुरुआत में ही विफल हो जाएगा।

:::

## कस्टम कैपेबिलिटीज़

हालाँकि निश्चित रूप से परिभाषित कैपेबिलिटीज़ की संख्या बहुत कम है, कोई भी ऐसी कस्टम कैपेबिलिटीज़ प्रदान और स्वीकार कर सकता है जो ऑटोमेशन ड्राइवर या रिमोट इंटरफ़ेस के लिए विशिष्ट हों:

### ब्राउज़र विशिष्ट कैपेबिलिटी एक्सटेंशन

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) एक्सटेंशन, केवल Chrome में टेस्टिंग के लिए लागू
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) एक्सटेंशन, केवल Firefox में टेस्टिंग के लिए लागू
- `ms:edgeOptions`: Chromium Edge की टेस्टिंग के लिए EdgeDriver का उपयोग करते समय एनवायरनमेंट निर्दिष्ट करने के लिए [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)

### क्लाउड वेंडर कैपेबिलिटी एक्सटेंशन

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- और भी बहुत कुछ...

### ऑटोमेशन इंजन कैपेबिलिटी एक्सटेंशन

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- और भी बहुत कुछ...

### ब्राउज़र ड्राइवर विकल्पों को प्रबंधित करने के लिए WebdriverIO कैपेबिलिटीज़

WebdriverIO आपके लिए ब्राउज़र ड्राइवर को इंस्टॉल करने और चलाने का प्रबंधन करता है। WebdriverIO एक कस्टम कैपेबिलिटी का उपयोग करता है जो आपको ड्राइवर में पैरामीटर पास करने की अनुमति देती है।

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

विशिष्ट ब्राउज़र/कैपेबिलिटी के लिए समानांतर रूप से चलने वाले वर्कर्स की कुल अधिकतम संख्या। यह [maxInstances](configuration/#maxinstances) और [maxInstancesPerCapability](configuration/#maxinstancespercapability) पर प्राथमिकता लेता है।

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

उस ब्राउज़र/कैपेबिलिटी के लिए टेस्ट एक्ज़ीक्यूशन हेतु specs परिभाषित करें। यह [सामान्य `specs` कॉन्फ़िगरेशन विकल्प](configuration#specs) के समान है, लेकिन ब्राउज़र/कैपेबिलिटी के लिए विशिष्ट है। यह `specs` पर प्राथमिकता लेता है।

</Option>

#### `wdio:exclude`

<Option type="String[]">

उस ब्राउज़र/कैपेबिलिटी के लिए टेस्ट एक्ज़ीक्यूशन से specs को बाहर रखें। यह [सामान्य `exclude` कॉन्फ़िगरेशन विकल्प](configuration#exclude) के समान है, लेकिन ब्राउज़र/कैपेबिलिटी के लिए विशिष्ट है। ग्लोबल `exclude` कॉन्फ़िगरेशन विकल्प लागू होने के बाद बाहर रखता है।

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

डिफ़ॉल्ट रूप से, WebdriverIO एक WebDriver Bidi सेशन स्थापित करने का प्रयास करता है। यदि आप ऐसा नहीं चाहते हैं, तो आप इस व्यवहार को अक्षम करने के लिए यह फ़्लैग सेट कर सकते हैं।

</Option>

#### `wdio:experimentalBiDiCommands`

<Option type="boolean" default="false">

WebDriver BiDi सेशन में, एलिमेंट कमांड्स और `getTitle`, `getUrl`, `refresh` तथा `takeScreenshot` जैसे ब्राउज़र कमांड्स को WebDriver Classic के बजाय WebDriver BiDi पर चलाता है। [एक spec फ़ाइल में समानांतर टेस्ट](./ParallelTests.md) के लिए आवश्यक है। प्रायोगिक: यह हर टेस्ट में कुछ कमांड्स के व्यवहार को बदल देता है, जैसे `addValue` और `clearValue` सिंथेटिक DOM इवेंट्स डिस्पैच करते हैं और `click` को Actions API के माध्यम से भेजा जाता है। [BiDi एलिमेंट कमांड्स के व्यवहार में बदलाव](./ParallelTests.md#behavior-changes-of-the-bidi-element-commands) देखें।

```ts
{
    browserName: 'chrome',
    'wdio:experimentalBiDiCommands': true
}
```

</Option>

#### `wdio:electronVersion`

<Option type="string">

`goog:chromeOptions.binary` के रूप में सेट किए गए Electron ऐप की टेस्टिंग के लिए, Chrome for Testing वाले Chromedriver के बजाय इस Electron रिलीज़ के साथ बंडल किया गया Chromedriver डाउनलोड करता है। यदि `browserVersion` भी सेट है, तो जब Electron रिलीज़ डाउनलोड नहीं की जा सकती या `CHROMEDRIVER_CDNURL` सेट है, तब WebdriverIO उसके बजाय उस वर्ज़न के Chromedriver का उपयोग करता है। Nightly वर्ज़न [electron/nightlies](https://github.com/electron/nightlies/releases) से आते हैं। Electron सर्विस इसे ऐप के Electron वर्ज़न से आपके लिए सेट कर देती है।

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

हालाँकि सभी ड्राइवर कॉन्फ़िगरेशन के लिए अलग-अलग पैरामीटर प्रदान करते हैं, कुछ सामान्य पैरामीटर हैं जिन्हें WebdriverIO समझता है और आपके ड्राइवर या ब्राउज़र को सेट अप करने के लिए उपयोग करता है:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

कैश डायरेक्टरी के रूट का पाथ। इस डायरेक्टरी का उपयोग उन सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सेशन शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

</Option>

##### `binary`

<Option type="string">

कस्टम ड्राइवर बाइनरी का पाथ। यदि सेट है, तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पाथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

आप यह पाथ `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` या `EDGEDRIVER_PATH` एनवायरनमेंट वेरिएबल्स के माध्यम से प्रदान कर सकते हैं।

</Option>
:::caution

यदि ड्राइवर `binary` सेट है, तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पाथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

:::

#### कस्टम ड्राइवर डाउनलोड होस्ट

यदि सार्वजनिक ड्राइवर CDN आपके एनवायरनमेंट से पहुँच योग्य नहीं हैं, जैसे कि आप अपने टेस्ट किसी कॉर्पोरेट प्रॉक्सी के पीछे चलाते हैं या ड्राइवरों को किसी आंतरिक आर्टिफ़ैक्ट रजिस्ट्री में मिरर करते हैं, तो आप निम्नलिखित एनवायरनमेंट वेरिएबल्स का उपयोग करके डाउनलोड को किसी कस्टम होस्ट पर इंगित कर सकते हैं:

- Chrome: `CHROMEDRIVER_CDNURL`, डिफ़ॉल्ट `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, डिफ़ॉल्ट `https://msedgedriver.microsoft.com`

मिरर से अपेक्षा की जाती है कि वह ड्राइवर आर्काइव्स को मूल CDN के समान पाथ के अंतर्गत सर्व करे, जैसे Chrome के लिए:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

जो ड्राइवर को `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` पर रिज़ॉल्व करता है, जहाँ `<platform>` इनमें से एक है: `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` या `win64`, जैसे `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`।

:::info पूरी तरह से ऑफ़लाइन एनवायरनमेंट

ये वेरिएबल्स केवल ड्राइवर डाउनलोड को रीडायरेक्ट करते हैं। WebdriverIO को सार्वजनिक इंटरनेट तक बिल्कुल भी पहुँचने से रोकने के लिए, चार और शर्तें पूरी करनी होंगी:

- **एक ब्राउज़र लोकल रूप से उपलब्ध होना चाहिए।** यदि WebdriverIO को इंस्टॉल किया हुआ Chrome या Firefox नहीं मिलता है, तो वह ब्राउज़र भी डाउनलोड करता है, और वह डाउनलोड इन वेरिएबल्स का पालन नहीं करता। या तो मशीन पर ब्राउज़र इंस्टॉल करें या `goog:chromeOptions.binary` / `moz:firefoxOptions.binary` के माध्यम से WebdriverIO को उस पर इंगित करें।
- **पूर्ण वर्ज़न नंबर का उपयोग करें।** यदि `browserVersion` छोड़ दिया जाता है, तो WebdriverIO लोकल ब्राउज़र से सटीक वर्ज़न पढ़ता है और किसी वर्ज़न लुकअप की आवश्यकता नहीं होती। यदि आप इसे सेट करते हैं, तो पूर्ण चार भागों वाले वर्ज़न का उपयोग करें, जैसे `140.0.7339.207`। एक रिलीज़ चैनल (`stable`), एक माइलस्टोन (`140`) या आंशिक वर्ज़न (`140.0.7339`) के लिए एक सार्वजनिक Google एंडपॉइंट पर वर्ज़न लुकअप की आवश्यकता होती है जिसे रीडायरेक्ट नहीं किया जा सकता।
- **Chromedriver, Chrome for Testing से आना चाहिए।** Linux ARM64 पर `153.0.8001.0` से पुराने Chrome के लिए, और `browserVersion` के बिना `wdio:electronVersion` के साथ, Chromedriver को Electron की GitHub रिलीज़ से डाउनलोड किया जाता है, जिसे ये वेरिएबल्स रीडायरेक्ट नहीं करते।
- **सुनिश्चित करें कि मिरर में वास्तव में आपको आवश्यक वर्ज़न मौजूद है।** यदि ड्राइवर आपके होस्ट से प्राप्त नहीं किया जा सकता — चाहे इसलिए कि वर्ज़न मिरर नहीं किया गया है, या इसलिए कि url गलत है या क्रेडेंशियल्स अस्वीकार कर दिए गए — तो WebdriverIO एक चेतावनी लॉग करता है और फिर निकटतम ज्ञात अच्छे वर्ज़न को खोजता है, जो फिर से सार्वजनिक एंडपॉइंट से क्वेरी करता है। यदि कोई रन अप्रत्याशित रूप से इंटरनेट तक पहुँचता है या ऐसा वर्ज़न चुनता है जो आपने नहीं माँगा था, तो चेतावनी में उस होस्ट की जाँच करें जिसका उसने प्रयास किया था।

:::

#### ब्राउज़र विशिष्ट ड्राइवर विकल्प

ड्राइवर तक विकल्प पहुँचाने के लिए आप निम्नलिखित कस्टम कैपेबिलिटीज़ का उपयोग कर सकते हैं:

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

वह पोर्ट जिस पर ADB ड्राइवर को चलना चाहिए।

उदाहरण: `9515`

</Option>

##### urlBase

<Option type="string">

कमांड्स के लिए बेस URL पाथ प्रीफ़िक्स, जैसे `wd/url`।

उदाहरण: `/`

</Option>

##### logPath

<Option type="string">

सर्वर लॉग को stderr के बजाय फ़ाइल में लिखें, लॉग लेवल को `INFO` तक बढ़ाता है

</Option>

##### logLevel

<Option type="string">

लॉग लेवल सेट करें। संभावित विकल्प `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`।

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

रिमोट IP एड्रेस की कॉमा से अलग की गई अनुमति सूची, जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है।

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

रिक्वेस्ट ओरिजिन की कॉमा से अलग की गई अनुमति सूची, जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है। किसी भी होस्ट ओरिजिन को अनुमति देने के लिए `*` का उपयोग करना खतरनाक है!

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

## विशिष्ट उपयोग के मामलों के लिए विशेष कैपेबिलिटीज़

यह उदाहरणों की एक सूची है जो दिखाती है कि किसी निश्चित उपयोग के मामले को प्राप्त करने के लिए कौन सी कैपेबिलिटीज़ लागू करनी होंगी।

### ब्राउज़र को हेडलेस चलाएँ

हेडलेस ब्राउज़र चलाने का अर्थ है बिना विंडो या UI के ब्राउज़र इंस्टेंस चलाना। इसका उपयोग ज़्यादातर CI/CD एनवायरनमेंट में किया जाता है जहाँ कोई डिस्प्ले उपयोग नहीं होता। ब्राउज़र को हेडलेस मोड में चलाने के लिए, निम्नलिखित कैपेबिलिटीज़ लागू करें:

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

ऐसा लगता है कि Safari हेडलेस मोड में चलने को [सपोर्ट नहीं करता](https://discussions.apple.com/thread/251837694)।

</TabItem>
</Tabs>

### विभिन्न ब्राउज़र चैनलों को ऑटोमेट करें

यदि आप किसी ऐसे ब्राउज़र वर्ज़न का टेस्ट करना चाहते हैं जो अभी तक stable के रूप में रिलीज़ नहीं हुआ है, जैसे Chrome Canary, तो आप कैपेबिलिटीज़ सेट करके और उस ब्राउज़र की ओर इंगित करके ऐसा कर सकते हैं जिसे आप शुरू करना चाहते हैं, जैसे:

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

Chrome पर टेस्टिंग करते समय, WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ब्राउज़र वर्ज़न और ड्राइवर स्वचालित रूप से डाउनलोड कर देगा, जैसे:

```ts
{
    browserName: 'chrome', // या 'chromium'
    browserVersion: '116' // या '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' या 'latest' ('canary' के समान)
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए ब्राउज़र का टेस्ट करना चाहते हैं, तो आप ब्राउज़र का बाइनरी पाथ इस प्रकार प्रदान कर सकते हैं:

```ts
{
    browserName: 'chrome',  // या 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इस प्रकार प्रदान कर सकते हैं:

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

Firefox पर टेस्टिंग करते समय, WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ब्राउज़र वर्ज़न और ड्राइवर स्वचालित रूप से डाउनलोड कर देगा, जैसे:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // या 'latest'
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए वर्ज़न का टेस्ट करना चाहते हैं, तो आप ब्राउज़र का बाइनरी पाथ इस प्रकार प्रदान कर सकते हैं:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इस प्रकार प्रदान कर सकते हैं:

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

Microsoft Edge पर टेस्टिंग करते समय, सुनिश्चित करें कि आपकी मशीन पर वांछित ब्राउज़र वर्ज़न इंस्टॉल है। आप WebdriverIO को एक्ज़ीक्यूट करने के लिए ब्राउज़र की ओर इस प्रकार इंगित कर सकते हैं:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO परिभाषित `browserVersion` के आधार पर आपके लिए वांछित ड्राइवर वर्ज़न स्वचालित रूप से डाउनलोड कर देगा, जैसे:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // या '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर का बाइनरी पाथ इस प्रकार प्रदान कर सकते हैं:

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

Safari पर टेस्टिंग करते समय, सुनिश्चित करें कि आपकी मशीन पर [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) इंस्टॉल है। आप WebdriverIO को उस वर्ज़न की ओर इस प्रकार इंगित कर सकते हैं:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## कस्टम कैपेबिलिटीज़ का विस्तार करें

यदि आप अपनी स्वयं की कैपेबिलिटीज़ का सेट परिभाषित करना चाहते हैं, उदाहरण के लिए उस विशिष्ट कैपेबिलिटी के टेस्ट में उपयोग किए जाने वाले मनमाने डेटा को स्टोर करने के लिए, तो आप ऐसा उदाहरण के लिए इस प्रकार सेट करके कर सकते हैं:

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

कैपेबिलिटी के नामकरण के मामले में [W3C प्रोटोकॉल](https://w3c.github.io/webdriver/#dfn-extension-capability) का पालन करने की सलाह दी जाती है, जिसके लिए एक `:` (कोलन) कैरेक्टर की आवश्यकता होती है, जो एक इम्प्लीमेंटेशन विशिष्ट नेमस्पेस को दर्शाता है। अपने टेस्ट के भीतर आप अपनी कस्टम कैपेबिलिटी को उदाहरण के लिए इस प्रकार एक्सेस कर सकते हैं:

```ts
browser.capabilities['custom:caps']
```

टाइप सेफ़्टी सुनिश्चित करने के लिए आप WebdriverIO के कैपेबिलिटी इंटरफ़ेस का विस्तार इस प्रकार कर सकते हैं:

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