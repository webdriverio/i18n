---
id: multiremote
title: Multiremote
---

WebdriverIO tillåter dig att köra flera automatiserade sessioner i ett enda test. Detta blir praktiskt när du testar funktioner som kräver flera användare (till exempel, chatt- eller WebRTC-applikationer).

Istället för att skapa flera fjärrinstanser där du behöver köra vanliga kommandon som [`newSession`](/docs/api/webdriver#newsession) eller [`url`](/docs/api/browser/url) på varje instans, kan du enkelt skapa en **multiremote**-instans och kontrollera alla webbläsare samtidigt.

För att göra detta, använd helt enkelt `multiremote()`-funktionen och skicka in ett objekt med namn kopplade till `capabilities` som värden. Genom att ge varje capability ett namn kan du enkelt välja och komma åt den enskilda instansen när du kör kommandon på en enskild instans.

:::info

Multiremote är _inte_ avsett för att köra alla dina tester parallellt.
Det är tänkt att hjälpa till att koordinera flera webbläsare och/eller mobila enheter för särskilda integrationstester (t.ex. chattapplikationer).

:::

Alla multiremote-instanser returnerar en array med resultat. Det första resultatet representerar den capability som definierades först i capability-objektet, det andra resultatet representerar den andra capability:n och så vidare.

## Använda fristående läge

Här är ett exempel på hur man skapar en multiremote-instans i __fristående läge__:

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

## Använda WDIO Testrunner

För att använda multiremote i WDIO testrunner, definiera bara `capabilities`-objektet i din `wdio.conf.js` som ett objekt med webbläsarnamnen som nycklar (istället för en lista med capabilities):

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

Detta kommer att skapa två WebDriver-sessioner med Chrome och Firefox. Istället för bara Chrome och Firefox kan du också starta två mobila enheter med [Appium](http://appium.io) eller en mobil enhet och en webbläsare.

Du kan också köra multiremote parallellt genom att lägga webbläsarens capabilities-objekt i en array. Se till att ha fältet `capabilities` inkluderat i varje webbläsare, eftersom detta är hur vi skiljer varje läge åt.

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

Du kan till och med starta en av [molntjänsternas backend](https://webdriver.io/docs/cloudservices.html) tillsammans med lokala Webdriver/Appium eller Selenium Standalone-instanser. WebdriverIO upptäcker automatiskt molnbackendens capabilities om du har angett antingen `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) eller `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) i webbläsarens capabilities.

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

Alla typer av OS/webbläsarkombinationer är möjliga här (inklusive mobila och skrivbordswebbläsare). Alla kommandon som dina tester anropar via `browser`-variabeln körs parallellt med varje instans. Detta hjälper till att effektivisera dina integrationstester och påskynda deras genomförande.

Till exempel, om du öppnar en URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Varje kommandos resultat kommer att vara ett objekt med webbläsarnamnen som nyckel och kommandoresultatet som värde, så här:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Observera att varje kommando körs ett i taget. Detta innebär att kommandot avslutas när alla webbläsare har kört det. Detta är användbart eftersom det håller webbläsaråtgärderna synkroniserade, vilket gör det lättare att förstå vad som för närvarande händer.

Ibland är det nödvändigt att göra olika saker i varje webbläsare för att testa något. Till exempel, om vi vill testa en chattapplikation, måste det finnas en webbläsare som skickar ett textmeddelande medan en annan webbläsare väntar på att ta emot det, och sedan kör en assertion på det.

När du använder WDIO testrunner registrerar den webbläsarnamnen med deras instanser till det globala scopet:

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

I detta exempel kommer `myFirefoxBrowser`-instansen att börja vänta på ett meddelande när `myChromeBrowser`-instansen har klickat på `#send`-knappen.

Multiremote gör det enkelt och bekvämt att kontrollera flera webbläsare, oavsett om du vill att de ska göra samma sak parallellt eller olika saker i samverkan.

## Åtkomst till webbläsarinstanser med strängar via browserobjektet
Förutom att komma åt webbläsarinstansen via deras globala variabler (t.ex. `myChromeBrowser`, `myFirefoxBrowser`), kan du också komma åt dem via `browser`-objektet, t.ex. `browser["myChromeBrowser"]` eller `browser["myFirefoxBrowser"]`. Du kan få en lista över alla dina instanser via `browser.instances`. Detta är särskilt användbart när du skriver återanvändbara teststeg som kan utföras i endera webbläsaren, t.ex.:

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

Cucumber-fil:
    ```feature
    When User A types a message into the chat
    ```

Stegdefinitionsfil:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Utöka TypeScript-typer

Om du använder TypeScript och vill komma åt drivrutinsinstansen direkt från multiremote-objektet, kan du även utöka multiremote-typerna för att göra det. Till exempel, med följande capabilities:

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

Du kan utöka multiremote-instansen genom att lägga till dina anpassade drivrutinsnamn, t.ex.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Nu kan du komma åt drivrutinerna direkt via, t.ex.:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```