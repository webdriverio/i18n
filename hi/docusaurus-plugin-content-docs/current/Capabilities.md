---
id: capabilities
title: क्षमताएँ
---

क्षमता एक दूरस्थ इंटरफ़ेस के लिए परिभाषा है। यह WebdriverIO को समझने में मदद करता है कि आप अपने टेस्ट किस ब्राउज़र या मोबाइल वातावरण में चलाना चाहते हैं। क्षमताएँ स्थानीय स्तर पर टेस्ट विकसित करते समय कम महत्वपूर्ण होती हैं क्योंकि आप ज्यादातर समय एक ही दूरस्थ इंटरफ़ेस पर चलाते हैं, लेकिन CI/CD में बड़े सेट के एकीकरण परीक्षण चलाते समय अधिक महत्वपूर्ण हो जाती हैं।

:::info

क्षमता ऑब्जेक्ट का फॉर्मेट [WebDriver स्पेसिफिकेशन](https://w3c.github.io/webdriver/#capabilities) द्वारा अच्छी तरह से परिभाषित है। WebdriverIO टेस्टरनर जल्दी ही फेल हो जाएगा अगर उपयोगकर्ता द्वारा परिभाषित क्षमताएँ उस स्पेसिफिकेशन का पालन नहीं करती हैं।

:::

## कस्टम क्षमताएँ

जबकि निश्चित परिभाषित क्षमताओं की संख्या बहुत कम है, हर कोई कस्टम क्षमताएँ प्रदान और स्वीकार कर सकता है जो ऑटोमेशन ड्राइवर या दूरस्थ इंटरफ़ेस के लिए विशिष्ट हैं:

### ब्राउज़र विशिष्ट क्षमता एक्सटेंशन

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) एक्सटेंशन, केवल Chrome में परीक्षण के लिए लागू
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) एक्सटेंशन, केवल Firefox में परीक्षण के लिए लागू
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium Edge के परीक्षण के लिए EdgeDriver का उपयोग करते समय पर्यावरण को निर्दिष्ट करने के लिए

### क्लाउड वेंडर क्षमता एक्सटेंशन

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- और बहुत कुछ...

### ऑटोमेशन इंजन क्षमता एक्सटेंशन

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- और बहुत कुछ...

### ब्राउज़र ड्राइवर विकल्पों को प्रबंधित करने के लिए WebdriverIO क्षमताएँ

WebdriverIO आपके लिए ब्राउज़र ड्राइवर इंस्टॉल करने और चलाने का प्रबंधन करता है। WebdriverIO एक कस्टम क्षमता का उपयोग करता है जो आपको ड्राइवर में पैरामीटर पास करने की अनुमति देता है।

#### `wdio:chromedriverOptions`

Chromedriver को शुरू करते समय विशिष्ट विकल्प पास किए जाते हैं।

#### `wdio:geckodriverOptions`

Geckodriver को शुरू करते समय विशिष्ट विकल्प पास किए जाते हैं।

#### `wdio:edgedriverOptions`

Edgedriver को शुरू करते समय विशिष्ट विकल्प पास किए जाते हैं।

#### `wdio:safaridriverOptions`

Safari को शुरू करते समय विशिष्ट विकल्प पास किए जाते हैं।

#### `wdio:maxInstances`

विशिष्ट ब्राउज़र/क्षमता के लिए समानांतर चलने वाले कुल कार्यकर्ताओं की अधिकतम संख्या। [maxInstances](#configuration#maxInstances) और [maxInstancesPerCapability](configuration/#maxinstancespercapability) पर प्राथमिकता लेता है।

प्रकार: `number`

#### `wdio:specs`

उस ब्राउज़र/क्षमता के लिए परीक्षण निष्पादन के लिए स्पेक्स को परिभाषित करें। [नियमित `specs` कॉन्फ़िगरेशन विकल्प](configuration#specs) के समान, लेकिन ब्राउज़र/क्षमता के लिए विशिष्ट। `specs` पर प्राथमिकता लेता है।

प्रकार: `(String | String[])[]`

#### `wdio:exclude`

उस ब्राउज़र/क्षमता के लिए परीक्षण निष्पादन से स्पेक्स को बाहर करें। [नियमित `exclude` कॉन्फ़िगरेशन विकल्प](configuration#exclude) के समान, लेकिन ब्राउज़र/क्षमता के लिए विशिष्ट। वैश्विक `exclude` कॉन्फ़िगरेशन विकल्प लागू होने के बाद बाहर करता है।

प्रकार: `String[]`

#### `wdio:enforceWebDriverClassic`

डिफ़ॉल्ट रूप से, WebdriverIO एक WebDriver Bidi सत्र स्थापित करने का प्रयास करता है। अगर आप इसे पसंद नहीं करते हैं, तो आप इस व्यवहार को अक्षम करने के लिए इस फ्लैग को सेट कर सकते हैं।

प्रकार: `boolean`

#### सामान्य ड्राइवर विकल्प

जबकि सभी ड्राइवर कॉन्फ़िगरेशन के लिए अलग-अलग पैरामीटर प्रदान करते हैं, कुछ सामान्य पैरामीटर हैं जिन्हें WebdriverIO समझता है और आपके ड्राइवर या ब्राउज़र को सेट करने के लिए उपयोग करता है:

##### `cacheDir`

कैश डायरेक्टरी के रूट का पथ। इस डायरेक्टरी का उपयोग सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सत्र शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

प्रकार: `string`<br />
डिफ़ॉल्ट: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

कस्टम ड्राइवर बाइनरी का पथ। अगर सेट किया गया है तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

आप इस पथ को `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` या `EDGEDRIVER_PATH` पर्यावरण वैरिएबल्स के माध्यम से प्रदान कर सकते हैं।

प्रकार: `string`

:::caution

अगर ड्राइवर `binary` सेट है, तो WebdriverIO ड्राइवर डाउनलोड करने का प्रयास नहीं करेगा बल्कि इस पथ द्वारा प्रदान किए गए ड्राइवर का उपयोग करेगा। सुनिश्चित करें कि ड्राइवर आपके द्वारा उपयोग किए जा रहे ब्राउज़र के साथ संगत है।

:::

#### ब्राउज़र विशिष्ट ड्राइवर विकल्प

ड्राइवर को विकल्प प्रसारित करने के लिए आप निम्नलिखित कस्टम क्षमताओं का उपयोग कर सकते हैं:

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
जिस पोर्ट पर ADB ड्राइवर को चलाना चाहिए।

उदाहरण: `9515`

प्रकार: `number`

##### urlBase
कमांड्स के लिए बेस URL पथ प्रीफिक्स, जैसे `wd/url`।

उदाहरण: `/`

प्रकार: `string`

##### logPath
stderr के बजाय फाइल में सर्वर लॉग लिखें, लॉग लेवल को `INFO` तक बढ़ाता है

प्रकार: `string`

##### logLevel
लॉग लेवल सेट करें। संभावित विकल्प `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`।

प्रकार: `string`

##### verbose
वर्बोज़ लॉग करें (जो कि `--log-level=ALL` के बराबर है)

प्रकार: `boolean`

##### silent
कुछ भी लॉग न करें (जो कि `--log-level=OFF` के बराबर है)

प्रकार: `boolean`

##### appendLog
रीराइट करने के बजाय लॉग फाइल में अपेंड करें।

प्रकार: `boolean`

##### replayable
वर्बोज़ लॉग करें और लंबी स्ट्रिंग्स को ट्रंकेट न करें ताकि लॉग को रीप्ले किया जा सके (प्रयोगात्मक)।

प्रकार: `boolean`

##### readableTimestamp
लॉग में पठनीय टाइमस्टैम्प जोड़ें।

प्रकार: `boolean`

##### enableChromeLogs
ब्राउज़र से लॉग दिखाएं (अन्य लॉगिंग विकल्पों को ओवरराइड करता है)।

प्रकार: `boolean`

##### bidiMapperPath
कस्टम bidi मैपर पथ।

प्रकार: `string`

##### allowedIps
अल्पविराम से अलग की गई रिमोट IP एड्रेस की अलाउलिस्ट जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है।

प्रकार: `string[]`<br />
डिफ़ॉल्ट: `['']`

##### allowedOrigins
अल्पविराम से अलग की गई अनुरोध मूल की अलाउलिस्ट जिन्हें EdgeDriver से कनेक्ट करने की अनुमति है। किसी भी होस्ट मूल को अनुमति देने के लिए `*` का उपयोग करना खतरनाक है!

प्रकार: `string[]`<br />
डिफ़ॉल्ट: `['*']`

##### spawnOpts
ड्राइवर प्रोसेस में पास किए जाने वाले विकल्प।

प्रकार: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
डिफ़ॉल्ट: `undefined`

</TabItem>
<TabItem value="firefox">

आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-geckodriver#options) में सभी Geckodriver विकल्प देखें।

</TabItem>
<TabItem value="msedge">

आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-edgedriver#options) में सभी Edgedriver विकल्प देखें।

</TabItem>
<TabItem value="safari">

आधिकारिक [ड्राइवर पैकेज](https://github.com/webdriverio-community/node-safaridriver#options) में सभी Safaridriver विकल्प देखें।

</TabItem>
</Tabs>

## विशिष्ट उपयोग के मामलों के लिए विशेष क्षमताएँ

यह उदाहरणों की एक सूची है जो दिखाती है कि किसी विशेष उपयोग के मामले को प्राप्त करने के लिए किन क्षमताओं को लागू करने की आवश्यकता है।

### हेडलेस ब्राउज़र चलाएं

हेडलेस ब्राउज़र चलाने का मतलब है बिना विंडो या UI के ब्राउज़र इंस्टेंस चलाना। इसका उपयोग ज्यादातर CI/CD वातावरण में किया जाता है जहां कोई डिस्प्ले नहीं होता है। ब्राउज़र को हेडलेस मोड में चलाने के लिए, निम्नलिखित क्षमताओं को लागू करें:

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

ऐसा लगता है कि Safari [हेडलेस मोड में चलाने का समर्थन नहीं करता](https://discussions.apple.com/thread/251837694)।

</TabItem>
</Tabs>

### विभिन्न ब्राउज़र चैनलों को ऑटोमेट करें

यदि आप एक ब्राउज़र वर्शन का परीक्षण करना चाहते हैं जो अभी तक स्टेबल के रूप में रिलीज़ नहीं हुआ है, जैसे Chrome Canary, तो आप ऐसा क्षमताओं को सेट करके और आपके द्वारा शुरू करने के लिए पसंदीदा ब्राउज़र की ओर इशारा करके कर सकते हैं, जैसे:

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

Chrome पर परीक्षण करते समय, WebdriverIO आपके द्वारा परिभाषित `browserVersion` के आधार पर स्वचालित रूप से वांछित ब्राउज़र वर्शन और ड्राइवर डाउनलोड कर लेगा, जैसे:

```ts
{
    browserName: 'chrome', // या 'chromium'
    browserVersion: '116' // या '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' या 'latest' ('canary' के समान)
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए ब्राउज़र का परीक्षण करना चाहते हैं, तो आप ब्राउज़र के लिए बाइनरी पथ प्रदान कर सकते हैं:

```ts
{
    browserName: 'chrome',  // या 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर के लिए बाइनरी पथ प्रदान कर सकते हैं:

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

Firefox पर परीक्षण करते समय, WebdriverIO आपके द्वारा परिभाषित `browserVersion` के आधार पर स्वचालित रूप से वांछित ब्राउज़र वर्शन और ड्राइवर डाउनलोड कर लेगा, जैसे:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // या 'latest'
}
```

यदि आप मैन्युअल रूप से डाउनलोड किए गए वर्शन का परीक्षण करना चाहते हैं, तो आप ब्राउज़र के लिए बाइनरी पथ प्रदान कर सकते हैं:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर के लिए बाइनरी पथ प्रदान कर सकते हैं:

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

Microsoft Edge पर परीक्षण करते समय, सुनिश्चित करें कि आपके मशीन पर वांछित ब्राउज़र वर्शन इंस्टॉल है। आप WebdriverIO को निष्पादित करने के लिए ब्राउज़र की ओर इशारा कर सकते हैं:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO आपके द्वारा परिभाषित `browserVersion` के आधार पर स्वचालित रूप से वांछित ड्राइवर वर्शन डाउनलोड कर लेगा, जैसे:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // या '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

इसके अतिरिक्त, यदि आप मैन्युअल रूप से डाउनलोड किए गए ड्राइवर का उपयोग करना चाहते हैं, तो आप ड्राइवर के लिए बाइनरी पथ प्रदान कर सकते हैं:

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

Safari पर परीक्षण करते समय, सुनिश्चित करें कि आपके मशीन पर [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) इंस्टॉल है। आप WebdriverIO को उस वर्शन की ओर इशारा कर सकते हैं:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## कस्टम क्षमताओं का विस्तार करें

यदि आप अपना खुद का क्षमता सेट परिभाषित करना चाहते हैं, जैसे उस विशिष्ट क्षमता के लिए परीक्षणों के भीतर उपयोग करने के लिए मनमानी डेटा स्टोर करने के लिए, आप ऐसा कर सकते हैं:

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

क्षमता नामकरण के मामले में [W3C प्रोटोकॉल](https://w3c.github.io/webdriver/#dfn-extension-capability) का पालन करने की सलाह दी जाती है जिसमें एक `:` (कोलन) वर्ण की आवश्यकता होती है, जो एक कार्यान्वयन विशिष्ट नेमस्पेस को दर्शाता है। अपने परीक्षणों के भीतर आप अपनी कस्टम क्षमता तक पहुंच सकते हैं, जैसे:

```ts
browser.capabilities['custom:caps']
```

टाइप सुरक्षा सुनिश्चित करने के लिए आप WebdriverIO क्षमता इंटरफेस को इस प्रकार विस्तारित कर सकते हैं:

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