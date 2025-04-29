---
id: sauce-service
title: सॉस सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


WebdriverIO सेवा जो Sauce Labs के साथ बेहतर एकीकरण प्रदान करती है। इस सेवा का उपयोग निम्न के लिए किया जा सकता है:

- Sauce Labs वर्चुअल मशीन क्लाउड (डेस्कटॉप वेब/एमुलेटर/सिमुलेटर)
- Sauce Labs रियल डिवाइस क्लाउड (iOS और Android)

यह जॉब मेटाडेटा ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') को अपडेट कर सकता है और यदि आवश्यक हो तो Sauce Connect चलाता है।

इस सेवा से आपको और क्या मिलेगा:

- डिफ़ॉल्ट रूप से, Sauce सेवा जॉब शुरू होने पर जॉब का 'name' अपडेट करेगी। यह आपको किसी भी समय नाम अपडेट करने का विकल्प देगा।
- आप एक `setJobName` पैरामीटर को परिभाषित कर सकते हैं और अपनी क्षमताओं, विकल्पों और सूट शीर्षक के अनुसार जॉब का नाम अनुकूलित कर सकते हैं
- Sauce सेवा एक विफल परीक्षण के त्रुटि स्टैक को Sauce Labs कमांड टैब में भी पुश करेगी
- यह आपको स्वचालित रूप से [Sauce Connect](https://docs.saucelabs.com/secure-connections/) को कॉन्फ़िगर और शुरू करने की अनुमति देगा
- और यह आपकी कमांड सूची में संदर्भ बिंदु सेट करेगा जिससे पहचाना जा सके कि कौन से कमांड किस परीक्षण में निष्पादित किए गए थे

## इंस्टॉलेशन

सबसे आसान तरीका है `@wdio/sauce-service` को अपने `package.json` में devDependency के रूप में रखना:

```sh
npm install @wdio/sauce-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।

## कॉन्फिगरेशन

वर्चुअल डेस्कटॉप/एमुलेटर/सिमुलेटर मशीन और रियल डिवाइस क्लाउड के लिए सेवा का उपयोग करने के लिए आपको अपनी `wdio.conf.js` फ़ाइल में `user` और `key` सेट करने की आवश्यकता है। यह स्वचालित रूप से आपके एकीकरण परीक्षणों को चलाने के लिए Sauce Labs का उपयोग करेगा। यदि आप अपने परीक्षण Sauce Labs पर चलाते हैं, तो आप `region` प्रॉपर्टी के माध्यम से उस क्षेत्र को निर्दिष्ट कर सकते हैं जहां आप अपने परीक्षण चलाना चाहते हैं। क्षेत्रों के लिए उपलब्ध शॉर्ट हैंडल्स `us` (डिफ़ॉल्ट) और `eu` हैं। ये क्षेत्र Sauce Labs VM क्लाउड और Sauce Labs रियल डिवाइस क्लाउड के लिए उपयोग किए जाते हैं। यदि आप क्षेत्र प्रदान नहीं करते हैं, तो यह डिफ़ॉल्ट रूप से `us` होता है।

यदि आप चाहते हैं कि WebdriverIO स्वचालित रूप से [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) टनल शुरू करे, तो आपको `sauceConnect: true` सेट करना होगा। यदि आप डेटा सेंटर को EU में बदलना चाहते हैं, तो `region:'eu'` जोड़ें क्योंकि US डेटा सेंटर डिफ़ॉल्ट रूप से सेट है।

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // or 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

यदि आप मौजूदा Sauce Connect टनल का उपयोग करना चाहते हैं, तो आपको केवल एक `tunnelName` प्रदान करने की आवश्यकता है। यदि आप एक साझा टनल का उपयोग कर रहे हैं, और आप वह उपयोगकर्ता नहीं हैं जिसने टनल बनाया था, तो आपको अपने परीक्षण के लिए इसका उपयोग करने के लिए उस Sauce Labs उपयोगकर्ता की पहचान करनी होगी जिसने टनल बनाया था। क्षमताओं में `tunnelOwner` को इस प्रकार शामिल करें:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Sauce सर्विस विकल्प

Sauce Labs सेवा को अधिकृत करने के लिए आपके कॉन्फिग में [`user`](https://webdriver.io/docs/options#user) और [`key`](https://webdriver.io/docs/options#key) विकल्प होने चाहिए।

### maxErrorStackLength

यह सेवा जब परीक्षण विफल होता है तो स्वचालित रूप से त्रुटि स्टैक को Sauce Labs पर पुश करेगी। डिफ़ॉल्ट रूप से, यह केवल पहली 5 पंक्तियों को पुश करेगी, लेकिन यदि आवश्यक हो तो इसे बदला जा सकता है। ध्यान रखें कि अधिक पंक्तियों के परिणामस्वरूप अधिक WebDriver कॉल होंगे जो निष्पादन को धीमा कर सकते हैं।

प्रकार: `number`<br />
डिफ़ॉल्ट: `5`

### sauceConnect

यदि `true` है तो यह Sauce Connect चलाता है और आपके ब्राउज़र परीक्षणों को चलाने वाले Sauce Labs वर्चुअल मशीन के बीच एक सुरक्षित कनेक्शन खोलता है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### sauceConnectOpts

Sauce Connect विकल्प लागू करें (जैसे पोर्ट नंबर या logFile सेटिंग्स बदलने के लिए)। अधिक जानकारी के लिए [यह सूची](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) देखें।

नोट: विकल्पों को निर्दिष्ट करते समय `--` को छोड़ देना चाहिए। इसे camelCase में भी बदला जा सकता है (जैसे `shared-tunnel` या `sharedTunnel`)।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{ }`

### uploadLogs

यदि `true` है, तो यह विकल्प सभी WebdriverIO लॉग फ़ाइलों को आगे के निरीक्षण के लिए Sauce Labs प्लेटफॉर्म पर अपलोड करता है। सुनिश्चित करें कि आपके wdio कॉन्फिग में लॉग को फाइलों में लिखने के लिए [`outputDir`](https://webdriver.io/docs/options#outputdir) सेट है, अन्यथा डेटा stdout पर स्ट्रीम किया जाएगा और अपलोड नहीं किया जा सकता।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### setJobName

उपयोगकर्ताओं को WebdriverIO कॉन्फिगरेशन, उपयोग की गई क्षमताओं और मूल सूट शीर्षक जैसे वर्कर पैरामीटर के आधार पर गतिशील रूप से जॉब का नाम सेट करने की अनुमति देता है।

प्रकार: `Function`<br />
डिफ़ॉल्ट: `(config, capabilities, suiteTitle) => suiteTitle`

----

## उत्पन्न नाम मेटाडेटा को ओवरराइड करना

सेवा स्वचालित रूप से सूट नाम, ब्राउज़र नाम और अन्य जानकारी से प्रत्येक परीक्षण के लिए एक नाम उत्पन्न करती है।

आप वांछित क्षमता `name` के लिए एक मान प्रदान करके इसे ओवरराइड कर सकते हैं, लेकिन इसका साइड इफेक्ट यह होगा कि सभी परीक्षणों को एक ही नाम मिल जाएगा।

----

WebdriverIO के बारे में अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।