---
id: repl
title: REPL इंटरफ़ेस
description: "कमांड लाइन से या चल रहे टेस्ट के भीतर से कमांड आज़माने और टेस्ट को इंटरैक्टिव रूप से डीबग करने के लिए WebdriverIO REPL का उपयोग करें।"
---

`v4.5.0` के साथ, WebdriverIO ने एक [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) इंटरफ़ेस पेश किया जो न केवल फ्रेमवर्क API सीखने में, बल्कि आपके टेस्ट को डीबग और इंस्पेक्ट करने में भी आपकी मदद करता है। इसका उपयोग कई तरीकों से किया जा सकता है।

सबसे पहले, आप `npm install -g @wdio/cli` इंस्टॉल करके इसे CLI कमांड के रूप में उपयोग कर सकते हैं और कमांड लाइन से एक WebDriver सेशन शुरू कर सकते हैं, उदाहरण के लिए:

```sh
wdio repl chrome
```

यह एक Chrome ब्राउज़र खोलेगा जिसे आप REPL इंटरफ़ेस से नियंत्रित कर सकते हैं। सेशन शुरू करने के लिए सुनिश्चित करें कि पोर्ट `4444` पर एक ब्राउज़र ड्राइवर चल रहा है। यदि आपके पास [Sauce Labs](https://saucelabs.com) (या किसी अन्य क्लाउड वेंडर) का अकाउंट है, तो आप अपनी कमांड लाइन से सीधे क्लाउड में ब्राउज़र भी चला सकते हैं:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

यदि ड्राइवर किसी अलग पोर्ट पर चल रहा है, जैसे: 9515, तो इसे कमांड लाइन आर्ग्यूमेंट --port या उसके उपनाम -p के साथ पास किया जा सकता है

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL को WebdriverIO कॉन्फ़िग फ़ाइल की capabilities का उपयोग करके भी चलाया जा सकता है। Wdio capabilities ऑब्जेक्ट; या; मल्टी-रिमोट capability सूची या ऑब्जेक्ट को सपोर्ट करता है।

यदि कॉन्फ़िग फ़ाइल capabilities ऑब्जेक्ट का उपयोग करती है तो बस कॉन्फ़िग फ़ाइल का पाथ पास करें, अन्यथा यदि यह मल्टी-रिमोट capability है, तो पोज़िशनल आर्ग्यूमेंट का उपयोग करके निर्दिष्ट करें कि सूची या मल्टी-रिमोट में से कौन सी capability उपयोग करनी है। नोट: सूची के लिए हम शून्य-आधारित इंडेक्स मानते हैं।

### उदाहरण

capability ऐरे के साथ WebdriverIO:

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

[मल्टी-रिमोट](https://webdriver.io/docs/multiremote/) capability ऑब्जेक्ट के साथ WebdriverIO:

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

या यदि आप Appium का उपयोग करके लोकल मोबाइल टेस्ट चलाना चाहते हैं:

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

यह कनेक्टेड डिवाइस/एमुलेटर/सिम्युलेटर पर Chrome/Safari सेशन खोलेगा। सेशन शुरू करने के लिए सुनिश्चित करें कि Appium पोर्ट `4444` पर चल रहा है।

```sh
wdio repl './path/to/your_app.apk'
```

यह कनेक्टेड डिवाइस/एमुलेटर/सिम्युलेटर पर ऐप सेशन खोलेगा। सेशन शुरू करने के लिए सुनिश्चित करें कि Appium पोर्ट `4444` पर चल रहा है।

iOS डिवाइस के लिए capabilities को आर्ग्यूमेंट्स के साथ पास किया जा सकता है:

* `-v`      - `platformVersion`: Android/iOS प्लेटफ़ॉर्म का वर्ज़न
* `-d`      - `deviceName`: मोबाइल डिवाइस का नाम
* `-u`      - `udid`: रियल डिवाइसेज़ के लिए udid

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

आप अपने REPL सेशन के लिए उपलब्ध कोई भी विकल्प (देखें `wdio repl --help`) लागू कर सकते हैं।

### `wdio session` से अटैच करें

`wdio repl --session <name>` (उपनाम `-s`) कोई ब्राउज़र शुरू नहीं करता। यह REPL को उस सेशन से अटैच करता है जिसे [`wdio session`](/docs/session) पहले ही खोल चुका है, और डिटैच करने पर वह सेशन चलता रहता है। टेस्ट रन को पॉज़ करने के बारे में [Debug a test with a session](/docs/session/debug) में बताया गया है:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

REPL में, प्रत्येक लाइन `wdio session exec` के रूप में चलती है। `.exit` प्रिंट करता है `Detached from "default" (still running)`।

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPL का उपयोग करने का एक और तरीका है अपने टेस्ट के भीतर [`debug`](/docs/api/browser/debug) कमांड के माध्यम से। कॉल किए जाने पर यह ब्राउज़र को रोक देगा, और आपको एप्लिकेशन में जाने (जैसे dev tools में) या कमांड लाइन से ब्राउज़र को नियंत्रित करने में सक्षम बनाता है। यह तब मददगार होता है जब कुछ कमांड अपेक्षा के अनुसार कोई निश्चित एक्शन ट्रिगर नहीं करतीं। REPL के साथ, आप फिर कमांड्स को आज़माकर देख सकते हैं कि कौन सी सबसे विश्वसनीय रूप से काम कर रही हैं।