---
id: multiremote
title: Multiremote
---

WebdriverIO pozwala na uruchomienie wielu zautomatyzowanych sesji w jednym teście. Jest to przydatne podczas testowania funkcji, które wymagają wielu użytkowników (na przykład aplikacje czatu lub WebRTC).

Zamiast tworzenia kilku zdalnych instancji, w których musisz wykonać wspólne polecenia, takie jak [`newSession`](/docs/api/webdriver#newsession) lub [`url`](/docs/api/browser/url) na każdej instancji, możesz po prostu utworzyć instancję **multiremote** i kontrolować wszystkie przeglądarki jednocześnie.

Aby to zrobić, użyj funkcji `multiremote()` i przekaż obiekt z nazwami przypisanymi do wartości `capabilities`. Nadając każdej funkcji nazwę, możesz łatwo wybierać i uzyskiwać dostęp do pojedynczej instancji podczas wykonywania poleceń na niej.

:::info

Multiremote _nie_ służy do wykonywania wszystkich testów równolegle.
Jest przeznaczony do pomocy w koordynacji wielu przeglądarek i/lub urządzeń mobilnych dla specjalnych testów integracyjnych (np. aplikacji czatowych).

:::

Wszystkie instancje multiremote zwracają tablicę wyników. Pierwszy wynik reprezentuje pierwszą zdefiniowaną funkcję w obiekcie capabilities, drugi wynik drugą funkcję i tak dalej.

## Używanie trybu Standalone

Oto przykład jak utworzyć instancję multiremote w __trybie standalone__:

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

## Używanie WDIO Testrunner

Aby używać multiremote w WDIO testrunner, zdefiniuj obiekt `capabilities` w swoim `wdio.conf.js` jako obiekt z nazwami przeglądarek jako kluczami (zamiast listy capabilities):

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

Spowoduje to utworzenie dwóch sesji WebDriver z Chrome i Firefox. Zamiast tylko Chrome i Firefox możesz również uruchomić dwa urządzenia mobilne przy użyciu [Appium](http://appium.io) lub jedno urządzenie mobilne i jedną przeglądarkę.

Możesz także uruchamiać multiremote równolegle, umieszczając obiekt zdolności przeglądarek w tablicy. Upewnij się, że każda przeglądarka zawiera pole `capabilities`, ponieważ w ten sposób rozróżniamy poszczególne tryby.

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

Możesz nawet uruchomić jeden z [backendów usług chmurowych](https://webdriver.io/docs/cloudservices.html) razem z lokalnymi instancjami Webdriver/Appium lub Selenium Standalone. WebdriverIO automatycznie wykrywa możliwości backendu chmurowego, jeśli określiłeś `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) lub `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) w możliwościach przeglądarki.

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

Możliwa jest dowolna kombinacja systemu operacyjnego/przeglądarki (w tym przeglądarki mobilne i desktopowe). Wszystkie polecenia, które Twoje testy wywołują za pośrednictwem zmiennej `browser`, są wykonywane równolegle na każdej instancji. Pomaga to usprawnić testy integracyjne i przyspieszyć ich wykonanie.

Na przykład, jeśli otwierasz adres URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Wynik każdego polecenia będzie obiektem z nazwami przeglądarek jako kluczami i wynikami polecenia jako wartościami, jak poniżej:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Zauważ, że każde polecenie jest wykonywane jedno po drugim. Oznacza to, że polecenie kończy się, gdy wszystkie przeglądarki je wykonały. Jest to pomocne, ponieważ utrzymuje zsynchronizowane działania przeglądarek, co ułatwia zrozumienie, co dzieje się w danym momencie.

Czasami konieczne jest wykonanie różnych rzeczy w każdej przeglądarce w celu przetestowania czegoś. Na przykład, jeśli chcemy przetestować aplikację czatu, jedna przeglądarka musi wysłać wiadomość tekstową, podczas gdy druga przeglądarka czeka na jej otrzymanie, a następnie przeprowadza na niej test.

Podczas korzystania z WDIO testrunner, rejestruje on nazwy przeglądarek wraz z ich instancjami w zakresie globalnym:

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

W tym przykładzie instancja `myFirefoxBrowser` zacznie czekać na wiadomość, gdy instancja `myChromeBrowser` kliknie przycisk `#send`.

Multiremote sprawia, że kontrolowanie wielu przeglądarek jest łatwe i wygodne, niezależnie od tego, czy chcesz, aby robiły to samo równolegle, czy różne rzeczy w uzgodniony sposób.

## Dostęp do instancji przeglądarek za pomocą ciągów znaków przez obiekt przeglądarki
Oprócz dostępu do instancji przeglądarki za pośrednictwem ich zmiennych globalnych (np. `myChromeBrowser`, `myFirefoxBrowser`), możesz również uzyskać do nich dostęp za pośrednictwem obiektu `browser`, np. `browser["myChromeBrowser"]` lub `browser["myFirefoxBrowser"]`. Możesz uzyskać listę wszystkich swoich instancji za pomocą `browser.instances`. Jest to szczególnie przydatne podczas pisania ponownie używanych kroków testowych, które można wykonać w dowolnej przeglądarce, np.:

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

Plik Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Plik definicji kroków:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Rozszerzanie typów TypeScript

Jeśli używasz TypeScript i chcesz uzyskać dostęp do instancji sterownika bezpośrednio z obiektu multiremote, możesz również rozszerzyć typy multiremote, aby to zrobić. Na przykład, mając następujące możliwości:

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

Możesz rozszerzyć instancję multiremote, dodając własne nazwy sterowników, np.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Teraz możesz uzyskać dostęp do sterowników bezpośrednio za pomocą, np.:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```