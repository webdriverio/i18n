---
id: multiremote
title: मल्टीरिमोट
---

WebdriverIO आपको एक ही परीक्षण में कई स्वचालित सत्रों को चलाने की अनुमति देता है। यह तब उपयोगी होता है जब आप ऐसी सुविधाओं का परीक्षण कर रहे हैं जिन्हें कई उपयोगकर्ताओं की आवश्यकता होती है (उदाहरण के लिए, चैट या WebRTC अनुप्रयोग)।

प्रत्येक इंस्टेंस पर सामान्य कमांड जैसे [`newSession`](/docs/api/webdriver#newsession) या [`url`](/docs/api/browser/url) को निष्पादित करने के लिए कई रिमोट इंस्टेंस बनाने के बजाय, आप सिर्फ एक **मल्टीरिमोट** इंस्टेंस बना सकते हैं और सभी ब्राउज़रों को एक साथ नियंत्रित कर सकते हैं।

ऐसा करने के लिए, बस `multiremote()` फ़ंक्शन का उपयोग करें, और मानों के लिए `capabilities` से कीड वाले नामों के साथ एक ऑब्जेक्ट पास करें। प्रत्येक क्षमता को एक नाम देकर, आप एकल इंस्टेंस पर कमांड निष्पादित करते समय उस एकल इंस्टेंस को आसानी से चुन और एक्सेस कर सकते हैं।

:::info

मल्टीरिमोट का उद्देश्य आपके सभी परीक्षणों को समानांतर रूप से निष्पादित करना _नहीं_ है।
इसका उद्देश्य विशेष एकीकरण परीक्षणों (जैसे चैट अनुप्रयोग) के लिए कई ब्राउज़रों और/या मोबाइल उपकरणों को समन्वयित करने में मदद करना है।

:::

सभी मल्टीरिमोट इंस्टेंस परिणामों की एक सरणी लौटाते हैं। पहला परिणाम क्षमता ऑब्जेक्ट में पहले परिभाषित क्षमता का प्रतिनिधित्व करता है, दूसरा परिणाम दूसरी क्षमता का और इसी तरह।

## स्टैंडअलोन मोड का उपयोग करना

यहां __स्टैंडअलोन मोड__ में मल्टीरिमोट इंस्टेंस बनाने का एक उदाहरण है:

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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
    })

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## WDIO टेस्टरनर का उपयोग करना

WDIO टेस्टरनर में मल्टीरिमोट का उपयोग करने के लिए, बस अपने `wdio.conf.js` में `capabilities` ऑब्जेक्ट को ब्राउज़र नामों के साथ कीज़ के रूप में परिभाषित करें (क्षमताओं की सूची के बजाय):

```js
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
    // ...
}
```

यह Chrome और Firefox के साथ दो WebDriver सत्र बनाएगा। केवल Chrome और Firefox के बजाय, आप [Appium](http://appium.io) का उपयोग करके दो मोबाइल उपकरणों को भी बूट कर सकते हैं या एक मोबाइल डिवाइस और एक ब्राउज़र को बूट कर सकते हैं।

आप ब्राउज़र क्षमताओं ऑब्जेक्ट को एक सरणी में रखकर समानांतर में मल्टीरिमोट भी चला सकते हैं। कृपया सुनिश्चित करें कि प्रत्येक ब्राउज़र में `capabilities` फील्ड शामिल है, क्योंकि यही वह है जिससे हम प्रत्येक मोड को अलग करते हैं।

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

आप स्थानीय Webdriver/Appium, या Selenium स्टैंडअलोन इंस्टेंस के साथ [क्लाउड सर्विसेज बैकएंड](https://webdriver.io/docs/cloudservices.html) में से एक को भी बूट कर सकते हैं। WebdriverIO स्वचालित रूप से क्लाउड बैकएंड क्षमताओं का पता लगाता है यदि आपने ब्राउज़र क्षमताओं में `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), या `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) में से कोई भी निर्दिष्ट किया है।

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

यहां किसी भी प्रकार का OS/ब्राउज़र संयोजन संभव है (मोबाइल और डेस्कटॉप ब्राउज़रों सहित)। आपके परीक्षण `browser` वेरिएबल के माध्यम से जितने भी कमांड कॉल करते हैं, वे प्रत्येक इंस्टेंस के साथ समानांतर रूप से निष्पादित होते हैं। यह आपके एकीकरण परीक्षणों को सरल बनाने और उनके निष्पादन को गति देने में मदद करता है।

उदाहरण के लिए, यदि आप एक URL खोलते हैं:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

प्रत्येक कमांड का परिणाम एक ऑब्जेक्ट होगा जिसमें ब्राउज़र के नाम कुंजी के रूप में होंगे, और कमांड परिणाम मान के रूप में, जैसे:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

ध्यान दें कि प्रत्येक कमांड एक-एक करके निष्पादित होता है। इसका मतलब है कि कमांड तब समाप्त होता है जब सभी ब्राउज़रों ने इसे निष्पादित कर दिया हो। यह उपयोगी है क्योंकि यह ब्राउज़र कार्यों को सिंक रखता है, जिससे यह समझना आसान हो जाता है कि वर्तमान में क्या हो रहा है।

कभी-कभी किसी चीज़ का परीक्षण करने के लिए प्रत्येक ब्राउज़र में अलग-अलग चीजें करना आवश्यक होता है। उदाहरण के लिए, यदि हम एक चैट एप्लिकेशन का परीक्षण करना चाहते हैं, तो एक ब्राउज़र को टेक्स्ट मैसेज भेजना होगा जबकि दूसरा ब्राउज़र उसे प्राप्त करने के लिए प्रतीक्षा करता है, और फिर उस पर एक सत्यापन चलाता है।

WDIO टेस्टरनर का उपयोग करते समय, यह ब्राउज़र नामों को उनके इंस्टेंस के साथ वैश्विक स्कोप में रजिस्टर करता है:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

इस उदाहरण में, `myFirefoxBrowser` इंस्टेंस एक संदेश पर प्रतीक्षा करना शुरू कर देगा जब `myChromeBrowser` इंस्टेंस `#send` बटन पर क्लिक करता है।

मल्टीरिमोट कई ब्राउज़रों को नियंत्रित करना आसान और सुविधाजनक बनाता है, चाहे आप उन्हें समानांतर में एक ही काम करते हुए देखना चाहते हों, या संगति में अलग-अलग काम करते हुए देखना चाहते हों।

## स्ट्रिंग्स के माध्यम से ब्राउज़र ऑब्जेक्ट का उपयोग करके ब्राउज़र इंस्टेंस तक पहुँचना
वैश्विक वेरिएबल्स के माध्यम से ब्राउज़र इंस्टेंस तक पहुँचने के अलावा (जैसे `myChromeBrowser`, `myFirefoxBrowser`), आप उन्हें `browser` ऑब्जेक्ट के माध्यम से भी एक्सेस कर सकते हैं, जैसे `browser["myChromeBrowser"]` या `browser["myFirefoxBrowser"]`। आप `browser.instances` के माध्यम से अपने सभी इंस्टेंस की एक सूची प्राप्त कर सकते हैं। यह विशेष रूप से पुन: प्रयोज्य परीक्षण चरणों को लिखने के लिए उपयोगी है जिन्हें किसी भी ब्राउज़र में किया जा सकता है, उदाहरण के लिए:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Cucumber फ़ाइल:
    ```feature
    When User A types a message into the chat
    ```

स्टेप डेफिनिशन फ़ाइल:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## TypeScript प्रकारों का विस्तार करना

यदि आप TypeScript का उपयोग कर रहे हैं और मल्टीरिमोट ऑब्जेक्ट से सीधे ड्राइवर इंस्टेंस तक पहुँचना चाहते हैं, तो आप ऐसा करने के लिए मल्टीरिमोट प्रकारों का भी विस्तार कर सकते हैं। उदाहरण के लिए, निम्नलिखित क्षमताओं के दिए गए:

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

आप अपने कस्टम ड्राइवर नामों को जोड़कर मल्टीरिमोट इंस्टेंस का विस्तार कर सकते हैं, उदाहरण के लिए:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

अब आप ड्राइवरों को सीधे एक्सेस कर सकते हैं, उदाहरण के लिए:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```