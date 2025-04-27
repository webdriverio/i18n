---
id: multiremote
title: பல்திறன் தொலை அணுகல்
---

WebdriverIO ஒரு தனி சோதனையில் பல தானியங்கு அமர்வுகளை இயக்க அனுமதிக்கிறது. இது சில அம்சங்களை சோதிக்க வசதியாக இருக்கும், எடுத்துக்காட்டாக அரட்டை அல்லது WebRTC பயன்பாடுகள் போன்ற பல பயனர்கள் தேவைப்படும் அம்சங்களை சோதிக்கும் போது.

பல தொலை இயக்க நிறுவல்களை உருவாக்குவதற்குப் பதிலாக, ஒவ்வொரு நிறுவலிலும் [`newSession`](/docs/api/webdriver#newsession) அல்லது [`url`](/docs/api/browser/url) போன்ற பொதுவான கட்டளைகளை இயக்க வேண்டிய அவசியம் இல்லாமல், நீங்கள் எளிதாக ஒரு **multiremote** நிறுவலை உருவாக்கி அனைத்து உலாவிகளையும் ஒரே நேரத்தில் கட்டுப்படுத்தலாம்.

இதைச் செய்ய, வெறுமனே `multiremote()` செயல்பாட்டைப் பயன்படுத்தி, பெயர்களுடன் `capabilities` மதிப்புகளை திறவுகளாகக் கொண்ட ஒரு பொருளை உள்ளிடவும். ஒவ்வொரு திறனுக்கும் ஒரு பெயரைக் கொடுப்பதன் மூலம், நீங்கள் ஒரு தனி நிறுவலில் கட்டளைகளை இயக்கும் போது அந்த ஒற்றை நிறுவலை எளிதாகத் தேர்ந்தெடுத்து அணுகலாம்.

:::info

Multiremote உங்கள் அனைத்து சோதனைகளையும் இணையாக இயக்குவதற்கான வழியல்ல.
இது சிறப்பு ஒருங்கிணைப்பு சோதனைகளுக்கு (எ.கா. அரட்டை பயன்பாடுகள்) பல உலாவிகள் மற்றும்/அல்லது மொபைல் சாதனங்களை ஒருங்கிணைக்க உதவும் நோக்கத்துடன் உள்ளது.

:::

அனைத்து பல்திறன் தொலை நிறுவல்களும் முடிவுகளின் அரையை திருப்பி அனுப்புகின்றன. முதல் முடிவு திறன் பொருளில் முதலில் வரையறுக்கப்பட்ட திறனைக் குறிக்கிறது, இரண்டாவது முடிவு இரண்டாவது திறனைக் குறிக்கிறது, இவ்வாறே தொடர்கிறது.

## தனித்து இயங்கும் முறையில் பயன்படுத்துதல்

இங்கே __தனித்து இயங்கும் முறையில__ ஒரு பல்திறன் தொலை நிறுவலை எவ்வாறு உருவாக்குவது என்பதற்கான எடுத்துக்காட்டு உள்ளது:

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

## WDIO Testrunner பயன்படுத்துதல்

WDIO testrunner இல் multiremote ஐப் பயன்படுத்த, உங்கள் `wdio.conf.js` இல் `capabilities` பொருளை உலாவி பெயர்களை சாவிகளாகக் கொண்ட பொருளாக வரையறுக்கவும் (திறன்களின் பட்டியலுக்குப் பதிலாக):

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

இது Chrome மற்றும் Firefox உடன் இரண்டு WebDriver அமர்வுகளை உருவாக்கும். Chrome மற்றும் Firefox க்குப் பதிலாக, நீங்கள் [Appium](http://appium.io) ஐப் பயன்படுத்தி இரண்டு மொபைல் சாதனங்களை அல்லது ஒரு மொபைல் சாதனம் மற்றும் ஒரு உலாவியை துவக்கலாம்.

உலாவி திறன்கள் பொருளை ஒரு அரையில் வைப்பதன் மூலம் நீங்கள் multiremote ஐ இணையாக இயக்கலாம். ஒவ்வொரு பயன்முறையையும் நாங்கள் எவ்வாறு வேறுபடுத்துகிறோம் என்பதால், ஒவ்வொரு உலாவியிலும் `capabilities` புலம் சேர்க்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்.

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

உள்ளூர் Webdriver/Appium அல்லது Selenium Standalone நிறுவல்களுடன் [cloud services backend](https://webdriver.io/docs/cloudservices.html) ஐக்கூட நீங்கள் துவக்கலாம். உலாவி திறன்களில் `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), அல்லது `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) ஆகியவற்றில் ஏதேனும் ஒன்றைக் குறிப்பிட்டிருந்தால், WebdriverIO தானாகவே கிளவுட் பின்புற திறன்களைக் கண்டறியும்.

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

எந்தவகையான OS/உலாவி கலவையும் இங்கே சாத்தியமாகும் (மொபைல் மற்றும் டெஸ்க்டாப் உலாவிகள் உட்பட). உங்கள் சோதனைகள் `browser` மாறியின் மூலம் அழைக்கும் அனைத்து கட்டளைகளும் ஒவ்வொரு நிறுவலுடனும் இணையாக செயல்படுத்தப்படுகின்றன. இது உங்கள் ஒருங்கிணைப்பு சோதனைகளை மேம்படுத்த உதவுகிறது மற்றும் அவற்றின் செயல்பாட்டை விரைவுபடுத்துகிறது.

எடுத்துக்காட்டாக, நீங்கள் ஒரு URL ஐத் திறந்தால்:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ஒவ்வொரு கட்டளையின் முடிவும் உலாவி பெயர்களை திறவுகளாகக் கொண்ட ஒரு பொருளாக இருக்கும், மற்றும் கட்டளையின் முடிவு மதிப்பாக இருக்கும், இவ்வாறு:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

ஒவ்வொரு கட்டளையும் ஒன்றன் பின் ஒன்றாக இயக்கப்படுகிறது என்பதை கவனிக்கவும். அதாவது, அனைத்து உலாவிகளும் அதை செயல்படுத்திய பிறகு கட்டளை முடிகிறது. இது உலாவி செயல்களை ஒத்திசைத்துள்ளதால் இது பயனுள்ளதாக உள்ளது, இது தற்போது என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள எளிதாக்குகிறது.

சில நேரங்களில் ஏதாவதொன்றை சோதிப்பதற்காக ஒவ்வொரு உலாவியிலும் வெவ்வேறு செயல்களைச் செய்ய வேண்டியது அவசியம். எடுத்துக்காட்டாக, நாங்கள் ஒரு அரட்டை பயன்பாட்டைச் சோதிக்க விரும்பினால், ஒரு உலாவி ஒரு உரைச் செய்தியை அனுப்பும் போது மற்றொரு உலாவி அதைப் பெற காத்திருக்க வேண்டும், பின்னர் அதன் மீது ஒரு உறுதிப்படுத்தலை இயக்க வேண்டும்.

WDIO testrunner ஐப் பயன்படுத்தும்போது, அது உலகளாவிய நோக்கில் அவற்றின் நிறுவல்களுடன் உலாவி பெயர்களைப் பதிவு செய்கிறது:

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

இந்த எடுத்துக்காட்டில், `myChromeBrowser` நிறுவல் `#send` பொத்தானைக் கிளிக் செய்த பிறகு `myFirefoxBrowser` நிறுவல் ஒரு செய்திக்காகக் காத்திருக்கத் தொடங்கும்.

பல்திறன் தொலை அணுகல் பல உலாவிகளைக் கட்டுப்படுத்த எளிதாகவும் வசதியாகவும் உள்ளது, நீங்கள் அவற்றை இணையாக ஒரே செயலைச் செய்ய விரும்பினாலும் அல்லது ஒருங்கிணைந்து வெவ்வேறு செயல்களைச் செய்ய விரும்பினாலும்.

## உலாவி பொருள் வழியாக சரங்களைப் பயன்படுத்தி உலாவி நிறுவல்களை அணுகுதல்
உலாவி நிறுவலை அவற்றின் உலகளாவிய மாறிகள் மூலம் அணுகுவதோடு (எ.கா. `myChromeBrowser`, `myFirefoxBrowser`), நீங்கள் அவற்றை `browser` பொருள் மூலமும் அணுகலாம், எ.கா. `browser["myChromeBrowser"]` அல்லது `browser["myFirefoxBrowser"]`. `browser.instances` மூலம் உங்கள் அனைத்து நிறுவல்களின் பட்டியலைப் பெறலாம். இது குறிப்பாக எந்த உலாவியிலும் செயல்படுத்தக்கூடிய மீண்டும் பயன்படுத்தக்கூடிய சோதனை படிகளை எழுதும்போது பயனுள்ளதாக இருக்கும், எ.கா.:

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

## TypeScript வகைகளை விரிவுபடுத்துதல்

நீங்கள் TypeScript ஐப் பயன்படுத்துகிறீர்கள் மற்றும் multiremote பொருளிலிருந்து நேரடியாக இயக்கி நிறுவலை அணுக விரும்பினால், நீங்கள் அவ்வாறு செய்வதற்கான multiremote வகைகளையும் விரிவுபடுத்தலாம். எடுத்துக்காட்டாக, பின்வரும் திறன்கள் இருந்தால்:

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

உங்கள் தனிப்பயன் இயக்கி பெயர்களைச் சேர்ப்பதன் மூலம் நீங்கள் multiremote நிறுவலை விரிவுபடுத்தலாம், எ.கா.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

இப்போது நீங்கள் இயக்கிகளை நேரடியாக அணுகலாம், எ.கா.:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```