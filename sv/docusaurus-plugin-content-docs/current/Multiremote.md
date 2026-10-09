---
id: multiremote
title: Multi-remote
description: "Styr flera webbläsar- eller enhetssessioner från ett enda test med multi-remote, i fristående läge eller med WDIO-testrunnern."
---

WebdriverIO låter dig köra flera automatiserade sessioner i ett enda test. Detta blir praktiskt när du testar funktioner som kräver flera användare (till exempel chatt- eller WebRTC-applikationer).

Istället för att skapa ett par fjärrinstanser där du behöver köra gemensamma kommandon som [`newSession`](/docs/api/webdriver#newsession) eller [`url`](/docs/api/browser/url) på varje instans, kan du helt enkelt skapa en **multi-remote**-instans och styra alla webbläsare samtidigt.

För att göra det använder du bara funktionen `multiRemote()` och skickar in ett objekt med namn som nycklar och `capabilities` som värden. Genom att ge varje capability ett namn kan du enkelt välja och komma åt just den instansen när du kör kommandon på en enskild instans.

:::info

MultiRemote är _inte_ avsett för att köra alla dina tester parallellt.
Det är avsett att hjälpa till att samordna flera webbläsare och/eller mobila enheter för speciella integrationstester (t.ex. chattapplikationer).

:::

De flesta multi-remote-kommandon returnerar en array med resultat. Det första resultatet representerar den capability som definierats först i capability-objektet, det andra resultatet den andra capabilityn och så vidare. `mock()` returnerar en `MultiRemoteMock` istället för en array. Se [Vad mock() returnerar](#what-mock-returns).

## Använda fristående läge

Här är ett exempel på hur man skapar en multi-remote-instans i __fristående läge__:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
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

    // öppna url med båda webbläsarna samtidigt
    await browser.url('http://json.org')

    // anropa kommandon samtidigt
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // klicka på ett element samtidigt
    const elem = await browser.$('#someElem')
    await elem.click()

    // klicka endast med en webbläsare (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Använda WDIO-testrunnern

För att använda multi-remote i WDIO-testrunnern definierar du bara `capabilities`-objektet i din `wdio.conf.js` som ett objekt med webbläsarnamnen som nycklar (istället för en lista med capabilities):

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

Detta skapar två WebDriver-sessioner med Chrome och Firefox. Istället för bara Chrome och Firefox kan du också starta två mobila enheter med [Appium](http://appium.io) eller en mobil enhet och en webbläsare.

Du kan också köra multi-remote parallellt genom att lägga webbläsarnas capabilities-objekt i en array. Se till att fältet `capabilities` finns med i varje webbläsare, eftersom det är så vi skiljer lägena åt.

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

Du kan till och med starta en av [molntjänsternas backend](https://webdriver.io/docs/cloudservices.html) tillsammans med lokala Webdriver/Appium- eller Selenium Standalone-instanser. WebdriverIO identifierar automatiskt molnbackendens capabilities om du har angett någon av `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) eller `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) i webbläsarens capabilities.

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

Alla typer av kombinationer av OS/webbläsare är möjliga här (inklusive mobila webbläsare och skrivbordswebbläsare). Alla kommandon som dina tester anropar via variabeln `browser` körs parallellt med varje instans. Detta hjälper till att effektivisera dina integrationstester och snabba upp deras körning.

Till exempel, om du öppnar en URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Varje kommandos resultat blir ett objekt med webbläsarnamnen som nyckel och kommandots resultat som värde, så här:

```js
// exempel med wdio testrunner
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returnerar: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returnerar: 'Firefox 35 on Mac OS X (Yosemite)'
```

Observera att varje kommando körs ett i taget. Det innebär att kommandot är klart när alla webbläsare har kört det. Detta är användbart eftersom det håller webbläsarnas åtgärder synkroniserade, vilket gör det lättare att förstå vad som händer för tillfället.

Ibland är det nödvändigt att göra olika saker i varje webbläsare för att testa något. Om vi till exempel vill testa en chattapplikation måste det finnas en webbläsare som skickar ett textmeddelande medan en annan webbläsare väntar på att ta emot det, och sedan köra en assertion på det.

När WDIO-testrunnern används registreras webbläsarnamnen med sina instanser i det globala scopet:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// vänta tills meddelanden anländer
await $('.messages').waitForExist()
// kontrollera om ett av meddelandena innehåller Chrome-meddelandet
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

I det här exemplet börjar instansen `myFirefoxBrowser` vänta på ett meddelande när instansen `myChromeBrowser` har klickat på knappen `#send`.

MultiRemote gör det enkelt och bekvämt att styra flera webbläsare, oavsett om du vill att de gör samma sak parallellt eller olika saker i samverkan.

### Vad `$` returnerar

På en multi-remote-webbläsare returnerar `$`, `custom$` och `react$` ett `MultiRemoteElement`. På ett multi-remote-element returnerar även `shadow$`, `nextElement`, `previousElement` och `parentElement` ett sådant. Dess kommandon körs på varje instans, och `getInstance` ger elementet för en webbläsare.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // klickar i varje webbläsare
await button.getInstance('myChromeBrowser').click()  // klickar endast i Chrome
```

### Vad `$$` returnerar

På en multi-remote-webbläsare returnerar `$$` en `MultiRemoteElementArray`. Varje post är ett `MultiRemoteElement` som adresserar alla instanser samtidigt, och arrayen själv innehåller samma information som en vanlig `ElementArray`. `custom$$`, `react$$` och, på ett multi-remote-element, `shadow$$` returnerar samma typ av lista.

```js
const messages = await $$('.messages')

messages.length      // det största antalet element som en instans hittade
messages[0]          // ett MultiRemoteElement som adresserar alla instanser
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // multi-remote-webbläsaren eller elementet den hämtades från
messages.isMultiRemote // true, så att den kan skiljas från en vanlig ElementArray

// de asynkrona array-hjälparna är tillgängliga, precis som för en enskild webbläsare
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

När instanserna hittar olika antal element har en post inget element för en instans som hittade färre. För den instansen kastar `getInstance()` ett fel, och ett kommando på posten misslyckas. Använd `select()` med de instanser som har elementet. En `expect`-matcher på hela listan kontrollerar varje instans med dess egna element:

```js
// myChromeBrowser hittar 3 meddelanden, myFirefoxBrowser hittar 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // endast Chrome har ett tredje meddelande
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Före v10 returnerade detta en vanlig array om inte `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` var satt. Arrayen är nu standard och miljövariabeln har tagits bort. Indexåtkomst är oförändrad, så kod som endast läste `elements[0]` fortsätter att fungera.

:::

### Vad mock() returnerar {#what-mock-returns}

På en multi-remote-webbläsare returnerar `mock()` en `MultiRemoteMock`. Den är inte en array. `respond()`, `restore()` och de andra mock-metoderna körs på varje instans. Fångade förfrågningar stannar på mocken för en webbläsare, så läs dem med `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` kör detta mot två headless Chrome-sessioner.

`instances` följer den ordning i vilken mockarna skapades. Efter `select()` kan den ordningen skilja sig från `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // Chrome-mocken, oavsett ordning
```

`getInstance` kastar `Multi-remote object has no instance named "<name>"` när `name` inte finns i `instances`.

För att mocka endast en webbläsare anropar du `mock()` på den instansen:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Komma åt webbläsarinstanser med strängar via browser-objektet
Förutom att komma åt webbläsarinstansen via deras globala variabler (t.ex. `myChromeBrowser`, `myFirefoxBrowser`) kan du också komma åt dem via `browser`-objektet, t.ex. `browser["myChromeBrowser"]` eller `browser["myFirefoxBrowser"]`. Du kan få en lista över alla dina instanser via `browser.instances`. Detta är särskilt användbart när du skriver återanvändbara teststeg som kan utföras i vilken webbläsare som helst, t.ex.:

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

Fil med stegdefinitioner:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertions

`expect`-matcharna stöder multi-remote-webbläsare, element och mockar. Som standard måste varje instans matcha det förväntade värdet:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

För att förvänta dig ett olika värde per instans använder du `expect.multiRemote()` med ett värde per instansnamn:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

För alla matchare som stöds och den konfiguration som krävs, se [expect-webdriverio-guiden för multi-remote](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Komma åt en instans

Instansnamn är inte egenskaper på multi-remote-webbläsaren eller på ett multi-remote-element. `browser.myChromeBrowser` och `elem.myChromeDriver` är inte satta. Be om sessionen med `getInstance`, eller begränsa multi-remote-objektet med `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Testrunnern tilldelar fortfarande varje instansnamn som en egen global variabel när `injectGlobals` är påslaget, så ett test kan anropa `myChromeBrowser.$('button')` utan att gå via `browser`. Den globala variabeln är den enskilda sessionen från `getInstance`, inte ett fält på multi-remote-objektet.