---
id: multiremote
title: मल्टीरिमोट
---

WebdriverIO आपको एक ही टेस्ट में कई स्वचालित सत्रों को चलाने की अनुमति देता है। यह तब उपयोगी होता है जब आप ऐसी सुविधाओं का परीक्षण कर रहे हों जिन्हें कई उपयोगकर्ताओं की आवश्यकता होती है (उदाहरण के लिए, चैट या WebRTC एप्लिकेशन)।

कई रिमोट इंस्टेंस बनाने के बजाय जहां आपको प्रत्येक इंस्टेंस पर [`newSession`](/docs/api/webdriver#newsession) या [`url`](/docs/api/browser/url) जैसे सामान्य कमांड निष्पादित करने की आवश्यकता होती है, आप सिंपल तरीके से एक **मल्टीरिमोट** इंस्टेंस बना सकते हैं और सभी ब्राउज़रों को एक साथ नियंत्रित कर सकते हैं।

ऐसा करने के लिए, बस `multiremote()` फ़ंक्शन का उपयोग करें, और एक ऑब्जेक्ट पास करें जिसमें नामों को मूल्यों के लिए `capabilities` से कुंजीबद्ध किया गया हो। प्रत्येक क्षमता को एक नाम देकर, आप आसानी से एकल इंस्टेंस पर कमांड निष्पादित करते समय उस एकल इंस्टेंस का चयन और एक्सेस कर सकते हैं।

:::info

मल्टीरिमोट आपके सभी परीक्षणों को समानांतर में निष्पादित करने के लिए _नहीं_ है।
इसका उद्देश्य विशेष एकीकरण परीक्षणों (जैसे चैट एप्लिकेशन) के लिए कई ब्राउज़रों और/या मोबाइल उपकरणों के समन्वय में मदद करना है।

:::

सभी मल्टीरिमोट इंस्टेंस परिणामों की एक सरणी (array) लौटाते हैं। पहला परिणाम क्षमता ऑब्जेक्ट में पहले परिभाषित क्षमता का प्रतिनिधित्व करता है, दूसरा परिणाम दूसरी क्षमता का प्रतिनिधित्व करता है और इसी तरह आगे।

## स्टैंडअलोन मोड का उपयोग

यहां __स्टैंडअलोन मोड__ में मल्टीरिमोट इंस्टेंस बनाने का एक उदाहरण दिया गया है:

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

## WDIO टेस्टरनर का उपयोग

WDIO टेस्टरनर में मल्टीरिमोट का उपयोग करने के लिए, बस अपने `wdio.conf.js` में `capabilities` ऑब्जेक्ट को ब्राउज़र नामों के साथ कुंजी के रूप में परिभाषित करें (क्षमताओं की एक सूची के बजाय):

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

यह Chrome और Firefox के साथ दो WebDriver सत्र बनाएगा। केवल Chrome और Firefox के बजाय आप [Appium](http://appium.io) का उपयोग करके दो मोबाइल डिवाइस या एक मोबाइल डिवाइस और एक ब्राउज़र भी बूट कर सकते हैं।

आप ब्राउज़र क्षमताओं के ऑब्जेक्ट को एक सरणी में रखकर मल्टीरिमोट को समानांतर में भी चला सकते हैं। कृपया सुनिश्चित करें कि प्रत्येक ब्राउज़र में `capabilities` फ़ील्ड शामिल है, क्योंकि यही वह तरीका है जिससे हम प्रत्येक मोड को अलग करते हैं।

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

आप स्थानीय Webdriver/Appium, या Selenium Standalone इंस्टेंस के साथ [क्लाउड सर्विसेज बैकएंड](https://webdriver.io/docs/cloudservices.html) में से एक को भी बूट कर सकते हैं। WebdriverIO स्वचालित रूप से क्लाउड बैकएंड क्षमताओं का पता लगाता है यदि आपने ब्राउज़र क्षमताओं में `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), या `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) में से कोई भी निर्दिष्ट किया है।

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

यहां किसी भी प्रकार का OS/ब्राउज़र संयोजन संभव है (मोबाइल और डेस्कटॉप ब्राउज़र सहित)। आपके टेस्ट `browser` वेरिएबल के माध्यम से जो भी कमांड कॉल करते हैं, वे प्रत्येक इंस्टेंस के साथ समानांतर में निष्पादित होते हैं। यह आपके एकीकरण परीक्षणों को सुव्यवस्थित करने और उनके निष्पादन को तेज करने में मदद करता है।

उदाहरण के लिए, यदि आप एक URL खोलते हैं:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

प्रत्येक कमांड का परिणाम एक ऑब्जेक्ट होगा जिसमें ब्राउज़र नाम कुंजी के रूप में होंगे, और कमांड परिणाम मान के रूप में, जैसे:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

ध्यान दें कि प्रत्येक कमांड एक-एक करके निष्पादित होता है। इसका मतलब है कि कमांड तब पूरा होता है जब सभी ब्राउज़र इसे निष्पादित कर चुके होते हैं। यह मददगार है क्योंकि यह ब्राउज़र कार्यों को सिंक रखता है, जिससे यह समझना आसान हो जाता है कि वर्तमान में क्या हो रहा है।

कभी-कभी किसी चीज़ का परीक्षण करने के लिए प्रत्येक ब्राउज़र में अलग-अलग चीजें करना आवश्यक होता है। उदाहरण के लिए, यदि हम एक चैट एप्लिकेशन का परीक्षण करना चाहते हैं, तो एक ब्राउज़र को एक टेक्स्ट मैसेज भेजना होगा जबकि दूसरा ब्राउज़र उसे प्राप्त करने के लिए प्रतीक्षा करता है, और फिर उस पर एक असर्शन चलाता है।

WDIO टेस्टरनर का उपयोग करते समय, यह ब्राउज़र नामों को उनके इंस्टेंस के साथ ग्लोबल स्कोप में रजिस्टर करता है:

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

इस उदाहरण में, `myFirefoxBrowser` इंस्टेंस एक संदेश की प्रतीक्षा करना शुरू कर देगा जब `myChromeBrowser` इंस्टेंस `#send` बटन पर क्लिक कर चुका होगा।

मल्टीरिमोट कई ब्राउज़रों को नियंत्रित करना आसान और सुविधाजनक बनाता है, चाहे आप उन्हें समानांतर में एक ही काम करना चाहते हों, या सहयोगात्मक रूप से अलग-अलग काम करना चाहते हों।

## स्ट्रिंग्स के माध्यम से ब्राउज़र ऑब्जेक्ट से ब्राउज़र इंस्टेंस तक पहुंचना
ग्लोबल वेरिएबल्स के माध्यम से ब्राउज़र इंस्टेंस तक पहुंचने के अलावा (जैसे `myChromeBrowser`, `myFirefoxBrowser`), आप उन्हें `browser` ऑब्जेक्ट के माध्यम से भी एक्सेस कर सकते हैं, जैसे `browser["myChromeBrowser"]` या `browser["myFirefoxBrowser"]`। आप `browser.instances` के माध्यम से अपने सभी इंस्टेंस की एक सूची प्राप्त कर सकते हैं। यह विशेष रूप से उपयोगी है जब पुन: प्रयोज्य टेस्ट स्टेप्स लिख रहे हों जो किसी भी ब्राउज़र में किए जा सकते हैं, जैसे:

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

Cucumber file:
    ```feature
    When User A types a message into the chat
    ```

Step definition file:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## TypeScript टाइप्स का विस्तार

यदि आप TypeScript का उपयोग कर रहे हैं और मल्टीरिमोट ऑब्जेक्ट से सीधे ड्राइवर इंस्टेंस तक पहुंचना चाहते हैं, तो आप ऐसा करने के लिए मल्टीरिमोट टाइप्स का भी विस्तार कर सकते हैं। उदाहरण के लिए, निम्नलिखित क्षमताएँ दी गई हैं:

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

आप अपने कस्टम ड्राइवर नामों को जोड़कर मल्टीरिमोट इंस्टेंस का विस्तार कर सकते हैं, जैसे:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

अब आप सीधे ड्राइवर्स तक पहुंच सकते हैं, जैसे:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```