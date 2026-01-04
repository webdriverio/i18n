---
id: multiremote
title: பல்முனை தொலைநிலை
---

WebdriverIO உங்களை ஒரே நேரத்தில் பல தானியங்கி அமர்வுகளை ஒரு சோதனையில் இயக்க அனுமதிக்கிறது. பல பயனர்களை தேவைப்படும் அம்சங்களை சோதிக்கும்போது இது பயனுள்ளதாக இருக்கும் (உதாரணமாக, அரட்டை அல்லது WebRTC பயன்பாடுகள்).

ஒவ்வொரு நிகழ்விலும் [`newSession`](/docs/api/webdriver#newsession) அல்லது [`url`](/docs/api/browser/url) போன்ற பொதுவான கட்டளைகளை நீங்கள் இயக்க வேண்டிய பல தொலைநிலை நிகழ்வுகளை உருவாக்குவதற்கு பதிலாக, நீங்கள் எளிதாக ஒரு **பல்முனை தொலைநிலை** நிகழ்வை உருவாக்கி அனைத்து உலாவிகளையும் ஒரே நேரத்தில் கட்டுப்படுத்தலாம்.

இதைச் செய்ய, `multiremote()` செயல்பாட்டைப் பயன்படுத்தி, மதிப்புகளுக்கான `capabilities`க்கு முக்கிய பெயர்களுடன் ஒரு பொருளை அனுப்பவும். ஒவ்வொரு திறனுக்கும் ஒரு பெயரைக் கொடுப்பதன் மூலம், ஒற்றை நிகழ்வில் கட்டளைகளை நிறைவேற்றும்போது அந்த ஒற்றை நிகழ்வை எளிதாகத் தேர்ந்தெடுத்து அணுகலாம்.

:::info

பல்முனை தொலைநிலை உங்கள் அனைத்து சோதனைகளையும் இணையாக செயல்படுத்துவதற்காக _அர்த்தப்படுத்தப்படவில்லை_.
இது சிறப்பு ஒருங்கிணைப்பு சோதனைகளுக்காக (எ.கா. அரட்டை பயன்பாடுகள்) பல உலாவிகள் மற்றும்/அல்லது மொபைல் சாதனங்களை ஒருங்கிணைக்க உதவும் வகையில் வடிவமைக்கப்பட்டுள்ளது.

:::

அனைத்து பல்முனை தொலைநிலை நிகழ்வுகளும் முடிவுகளின் அரேயை திருப்பி அனுப்புகின்றன. முதல் முடிவு திறன் பொருளில் முதலில் வரையறுக்கப்பட்ட திறனைக் குறிக்கிறது, இரண்டாவது முடிவு இரண்டாவது திறனைக் குறிக்கிறது, மேலும் பலவற்றைக் குறிக்கிறது.

## Standalone Mode பயன்படுத்துதல்

இங்கே __standalone mode__ இல் பல்முனை தொலைநிலை நிகழ்வை உருவாக்கும் எடுத்துக்காட்டு:

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

WDIO testrunner இல் பல்முனை தொலைநிலையைப் பயன்படுத்த, உங்கள் `wdio.conf.js` இல் உள்ள `capabilities` பொருளை உலாவி பெயர்களுடன் திறவுகளாகக் கொண்ட பொருளாக வரையறுக்கவும் (திறன்களின் பட்டியலுக்கு பதிலாக):

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

இது Chrome மற்றும் Firefox மூலம் இரண்டு WebDriver அமர்வுகளை உருவாக்கும். Chrome மற்றும் Firefox க்கு பதிலாக, நீங்கள் [Appium](http://appium.io) ஐப் பயன்படுத்தி இரண்டு மொபைல் சாதனங்களையும் அல்லது ஒரு மொபைல் சாதனத்தையும் ஒரு உலாவியையும் துவக்கலாம்.

நீங்கள் உலாவி திறன்கள் பொருளை ஒரு அரேயில் வைப்பதன் மூலம் பல்முனை தொலைநிலையை இணையாகவும் இயக்கலாம். ஒவ்வொரு பயன்முறையையும் நாங்கள் எவ்வாறு வேறுபடுத்துகிறோம் என்பதால், ஒவ்வொரு உலாவியிலும் `capabilities` புலம் சேர்க்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்.

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

நீங்கள் [cloud services backend](https://webdriver.io/docs/cloudservices.html) இல் ஒன்றை உள்ளூர் Webdriver/Appium அல்லது Selenium Standalone நிகழ்வுகளுடன் துவக்கலாம். நீங்கள் உலாவி திறன்களில் `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), அல்லது `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) ஆகியவற்றைக் குறிப்பிட்டிருந்தால், WebdriverIO தானாகவே கிளவுட் பேக்கெண்ட் திறன்களைக் கண்டறியும்.

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

எந்த வகையான OS/உலாவி கலவையும் இங்கே சாத்தியமாகும் (மொபைல் மற்றும் டெஸ்க்டாப் உலாவிகள் உட்பட). உங்கள் சோதனைகள் `browser` மாறி வழியாக அழைக்கும் அனைத்து கட்டளைகளும் ஒவ்வொரு நிகழ்வுடனும் இணையாக செயல்படுத்தப்படுகின்றன. இது உங்கள் ஒருங்கிணைப்பு சோதனைகளை ஒளிர்வுற செய்யவும், அவற்றின் செயல்பாட்டை விரைவுபடுத்தவும் உதவுகிறது.

எடுத்துக்காட்டாக, நீங்கள் ஒரு URL ஐத் திறந்தால்:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ஒவ்வொரு கட்டளையின் முடிவும் உலாவி பெயர்களைக் கீயாகவும், கட்டளை முடிவை மதிப்பாகவும் கொண்ட ஒரு பொருளாக இருக்கும்:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

ஒவ்வொரு கட்டளையும் ஒன்றன் பின் ஒன்றாக செயல்படுத்தப்படுவதைக் கவனிக்கவும். இதன் பொருள் அனைத்து உலாவிகளும் அதை செயல்படுத்திய பிறகே கட்டளை முடிவடைகிறது. இது உலாவி செயல்களை ஒத்திசைப்பதால் உதவியாக இருக்கும், இது தற்போது என்ன நடக்கிறது என்பதைப் புரிந்துகொள்வதை எளிதாக்குகிறது.

சில நேரங்களில் ஏதாவது ஒன்றை சோதிக்க ஒவ்வொரு உலாவியிலும் வெவ்வேறு விஷயங்களைச் செய்ய வேண்டியிருக்கும். எடுத்துக்காட்டாக, நாங்கள் ஒரு அரட்டை பயன்பாட்டை சோதிக்க விரும்பினால், மற்றொரு உலாவி அதைப் பெற காத்திருக்கும் போது உரைச் செய்தியை அனுப்பும் ஒரு உலாவி இருக்க வேண்டும், பின்னர் அதன் மீது உறுதிப்படுத்தலை இயக்கவும்.

WDIO testrunner ஐப் பயன்படுத்தும்போது, இது உலாவி பெயர்களை அவற்றின் நிகழ்வுகளுடன் உலகளாவிய நோக்கத்திற்குப் பதிவு செய்கிறது:

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

இந்த எடுத்துக்காட்டில், `myChromeBrowser` நிகழ்வு `#send` பொத்தானைக் கிளிக் செய்தவுடன், `myFirefoxBrowser` நிகழ்வு ஒரு செய்திக்காகக் காத்திருக்கத் தொடங்கும்.

பல்முனை தொலைநிலை, நீங்கள் அவற்றை இணையாக ஒரே விஷயத்தைச் செய்ய விரும்பினாலும், அல்லது கச்சேரியில் வெவ்வேறு விஷயங்களைச் செய்ய விரும்பினாலும், பல உலாவிகளைக் கட்டுப்படுத்த எளிதாகவும் வசதியாகவும் செய்கிறது.

## string வழியாக browser பொருளைப் பயன்படுத்தி உலாவி நிகழ்வுகளை அணுகுதல்
அவற்றின் உலகளாவிய மாறிகள் (எ.கா. `myChromeBrowser`, `myFirefoxBrowser`) வழியாக உலாவி நிகழ்வை அணுகுவதோடு, நீங்கள் அவற்றை `browser` பொருள் மூலமும் அணுகலாம், எ.கா. `browser["myChromeBrowser"]` அல்லது `browser["myFirefoxBrowser"]`. `browser.instances` வழியாக உங்கள் அனைத்து நிகழ்வுகளின் பட்டியலையும் நீங்கள் பெறலாம். குறிப்பாக எந்த உலாவியிலும் செய்யக்கூடிய மறுபயன்பாட்டு சோதனை படிகளை எழுதும்போது இது பயனுள்ளதாக இருக்கும், உதாரணமாக:

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

## TypeScript Types நீட்டித்தல்

நீங்கள் TypeScript ஐப் பயன்படுத்துகிறீர்கள் மற்றும் பல்முனை தொலைநிலை பொருளிலிருந்து நேரடியாக டிரைவர் நிகழ்வை அணுக விரும்புகிறீர்கள் என்றால், நீங்கள் அவ்வாறு செய்ய பல்முனை தொலைநிலை வகைகளை நீட்டிக்கலாம். எடுத்துக்காட்டாக, பின்வரும் திறன்கள்:

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

நீங்கள் உங்கள் தனிப்பயன் டிரைவர் பெயர்களைச் சேர்ப்பதன் மூலம் பல்முனை தொலைநிலை நிகழ்வை நீட்டிக்கலாம், எ.கா.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

இப்போது நீங்கள் டிரைவர்களை நேரடியாக அணுகலாம், எ.கா.:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```