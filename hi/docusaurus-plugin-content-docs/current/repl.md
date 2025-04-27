---
id: repl
title: REPL इंटरफ़ेस
---

WebdriverIO ने `v4.5.0` के साथ एक [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) इंटरफ़ेस पेश किया है जो आपको न केवल फ्रेमवर्क API सीखने में मदद करता है, बल्कि अपने टेस्ट को डिबग और इंस्पेक्ट करने में भी मदद करता है। इसे कई तरीकों से उपयोग किया जा सकता है।

पहले आप इसे CLI कमांड के रूप में उपयोग कर सकते हैं `npm install -g @wdio/cli` इंस्टॉल करके और कमांड लाइन से एक WebDriver सेशन शुरू करके, उदाहरण के लिए

```sh
wdio repl chrome
```

यह एक Chrome ब्राउज़र खोलेगा जिसे आप REPL इंटरफ़ेस के साथ नियंत्रित कर सकते हैं। सुनिश्चित करें कि सेशन शुरू करने के लिए आपके पास पोर्ट `4444` पर एक ब्राउज़र ड्राइवर चल रहा है। यदि आपके पास [Sauce Labs](https://saucelabs.com) (या अन्य क्लाउड वेंडर) अकाउंट है, तो आप अपने कमांड लाइन पर सीधे क्लाउड में ब्राउज़र भी चला सकते हैं:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

अगर ड्राइवर अलग पोर्ट पर चल रहा है जैसे: 9515, तो इसे कमांड लाइन आर्गुमेंट --port या एलियास -p के साथ पास किया जा सकता है

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl को webdriverIO कॉन्फिग फाइल से कैपेबिलिटीज का उपयोग करके भी चलाया जा सकता है। Wdio कैपेबिलिटीज ऑब्जेक्ट को सपोर्ट करता है; या; मल्टिरिमोट कैपेबिलिटी लिस्ट या ऑब्जेक्ट।

अगर कॉन्फिग फाइल कैपेबिलिटीज ऑब्जेक्ट का उपयोग करती है तो बस कॉन्फिग फाइल का पाथ पास करें, अन्यथा अगर यह एक मल्टिरिमोट कैपेबिलिटी है, तो पोजिशनल आर्गुमेंट का उपयोग करके लिस्ट या मल्टिरिमोट से किस कैपेबिलिटी का उपयोग करना है, यह निर्दिष्ट करें। नोट: लिस्ट के लिए हम जीरो बेस्ड इंडेक्स का उपयोग करते हैं।

### उदाहरण

कैपेबिलिटी एरे के साथ WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

[मल्टिरिमोट](https://webdriver.io/docs/multiremote/) कैपेबिलिटी ऑब्जेक्ट के साथ WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

या अगर आप Appium का उपयोग करके लोकल मोबाइल टेस्ट चलाना चाहते हैं:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

यह कनेक्टेड डिवाइस/एमुलेटर/सिमुलेटर पर Chrome/Safari सेशन खोलेगा। सुनिश्चित करें कि सेशन शुरू करने के लिए Appium पोर्ट `4444` पर चल रहा है।

```sh
wdio repl './path/to/your_app.apk'
```

यह कनेक्टेड डिवाइस/एमुलेटर/सिमुलेटर पर ऐप सेशन खोलेगा। सुनिश्चित करें कि सेशन शुरू करने के लिए Appium पोर्ट `4444` पर चल रहा है।

iOS डिवाइस के लिए कैपेबिलिटीज आर्गुमेंट्स के साथ पास की जा सकती हैं:

* `-v`      - `platformVersion`: Android/iOS प्लेटफॉर्म का वर्जन
* `-d`      - `deviceName`: मोबाइल डिवाइस का नाम
* `-u`      - `udid`: रियल डिवाइसेज के लिए udid

उपयोग:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

आप अपने REPL सेशन के लिए उपलब्ध किसी भी विकल्प (देखें `wdio repl --help`) को लागू कर सकते हैं।

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPL का उपयोग करने का एक और तरीका है [`debug`](/docs/api/browser/debug) कमांड के माध्यम से अपने टेस्ट के अंदर। यह कॉल किए जाने पर ब्राउज़र को रोक देगा, और आपको एप्लिकेशन में जाने (जैसे डेव टूल्स में) या कमांड लाइन से ब्राउज़र को नियंत्रित करने की अनुमति देता है। यह तब सहायक होता है जब कुछ कमांड्स अपेक्षित अनुसार एक निश्चित क्रिया को ट्रिगर नहीं करते हैं। REPL के साथ, आप फिर कमांड्स को आजमा सकते हैं यह देखने के लिए कि कौन से सबसे विश्वसनीय तरीके से काम कर रहे हैं।