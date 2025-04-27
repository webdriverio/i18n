---
id: multiremote
title: Мультиремоут
---

WebdriverIO дозволяє запускати кілька автоматизованих сесій в одному тесті. Це стає зручним, коли ви тестуєте функції, які вимагають декількох користувачів (наприклад, чат або WebRTC додатки).

Замість створення кількох віддалених екземплярів, де вам потрібно виконувати загальні команди, такі як [`newSession`](/docs/api/webdriver#newsession) або [`url`](/docs/api/browser/url) для кожного екземпляра, ви можете просто створити екземпляр **multiremote** і керувати всіма браузерами одночасно.

Для цього просто використовуйте функцію `multiremote()` і передайте об'єкт з іменами, які вказують на значення `capabilities`. Надаючи кожному можливості ім'я, ви можете легко вибирати та отримувати доступ до цього окремого екземпляра під час виконання команд на одному екземплярі.

:::info

Мультиремоут _не_ призначений для паралельного виконання всіх ваших тестів.
Він призначений для координації кількох браузерів та/або мобільних пристроїв для спеціальних інтеграційних тестів (наприклад, чат-додатків).

:::

Всі екземпляри мультиремоута повертають масив результатів. Перший результат представляє можливості, визначені першими в об'єкті можливостей, другий результат - другу можливість і так далі.

## Використання автономного режиму

Ось приклад того, як створити екземпляр мультиремоута в __автономному режимі__:

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

## Використання WDIO Testrunner

Щоб використовувати мультиремоут у тестовому раннері WDIO, просто визначте об'єкт `capabilities` у своєму `wdio.conf.js` як об'єкт з іменами браузерів як ключами (замість списку можливостей):

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

Це створить дві сесії WebDriver з Chrome і Firefox. Замість Chrome і Firefox ви також можете запустити два мобільні пристрої за допомогою [Appium](http://appium.io) або один мобільний пристрій і один браузер.

Ви також можете запустити мультиремоут паралельно, розмістивши об'єкт можливостей браузера в масиві. Будь ласка, переконайтеся, що поле `capabilities` включено в кожний браузер, оскільки саме так ми розрізняємо кожен режим.

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

Ви навіть можете запустити один із [бекендів хмарних сервісів](https://webdriver.io/docs/cloudservices.html) разом з локальними екземплярами Webdriver/Appium або Selenium Standalone. WebdriverIO автоматично виявляє можливості хмарного бекенду, якщо ви вказали `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) або `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) у можливостях браузера.

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

Тут можлива будь-яка комбінація ОС/браузера (включаючи мобільні та настільні браузери). Всі команди, які ваші тести викликають через змінну `browser`, виконуються паралельно кожним екземпляром. Це допомагає впорядкувати ваші інтеграційні тести та прискорити їх виконання.

Наприклад, якщо ви відкриваєте URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Результат кожної команди буде об'єктом з іменами браузерів як ключами і результатами команд як значеннями, наприклад:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Зверніть увагу, що кожна команда виконується одна за одною. Це означає, що команда завершується, коли всі браузери її виконають. Це корисно, оскільки зберігає синхронізацію дій браузера, що полегшує розуміння того, що відбувається зараз.

Іноді необхідно робити різні речі в кожному браузері, щоб щось протестувати. Наприклад, якщо ми хочемо протестувати чат-додаток, один браузер повинен надсилати текстове повідомлення, а інший браузер чекає його отримання, а потім виконує твердження на його основі.

При використанні тестового раннера WDIO він реєструє імена браузерів з їх екземплярами у глобальній області:

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

У цьому прикладі екземпляр `myFirefoxBrowser` почне чекати повідомлення, як тільки екземпляр `myChromeBrowser` натисне кнопку `#send`.

Мультиремоут полегшує та зручно керує кількома браузерами, незалежно від того, хочете ви, щоб вони робили однакові речі паралельно чи різні речі узгоджено.

## Доступ до екземплярів браузера за допомогою рядків через об'єкт браузера
Окрім доступу до екземпляра браузера через їх глобальні змінні (наприклад, `myChromeBrowser`, `myFirefoxBrowser`), ви також можете отримати до них доступ через об'єкт `browser`, наприклад, `browser["myChromeBrowser"]` або `browser["myFirefoxBrowser"]`. Ви можете отримати список усіх своїх екземплярів через `browser.instances`. Це особливо корисно при написанні тестових кроків, які можна використовувати повторно, і які можуть бути виконані в будь-якому браузері, наприклад:

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

Cucumber файл:
    ```feature
    When User A types a message into the chat
    ```

Файл визначення кроків:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Розширення типів TypeScript

Якщо ви використовуєте TypeScript і хочете отримати доступ до екземпляра драйвера з об'єкта multiremote напряму, ви також можете розширити типи multiremote для цього. Наприклад, дані наступні можливості:

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

Ви можете розширити екземпляр multiremote, додавши власні імена драйверів, наприклад:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Тепер ви можете отримати доступ до драйверів безпосередньо, наприклад:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```