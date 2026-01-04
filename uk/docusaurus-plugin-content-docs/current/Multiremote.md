---
id: multiremote
title: Мультиремоут
---

WebdriverIO дозволяє запускати кілька автоматизованих сесій в одному тесті. Це зручно, коли ви тестуєте функції, що вимагають кількох користувачів (наприклад, чат або WebRTC додатки).

Замість створення кількох віддалених екземплярів, де потрібно виконувати загальні команди, такі як [`newSession`](/docs/api/webdriver#newsession) або [`url`](/docs/api/browser/url) на кожному екземплярі, ви можете просто створити екземпляр **multiremote** і керувати всіма браузерами одночасно.

Для цього просто використовуйте функцію `multiremote()` і передайте об'єкт з іменами як ключами та `capabilities` як значеннями. Надаючи кожній можливості ім'я, ви можете легко вибирати та отримувати доступ до цього окремого екземпляра при виконанні команд.

:::info

Multiremote _не_ призначений для паралельного виконання всіх ваших тестів.
Він призначений для допомоги в координації кількох браузерів та/або мобільних пристроїв для спеціальних інтеграційних тестів (наприклад, чат-додатків).

:::

Всі екземпляри multiremote повертають масив результатів. Перший результат представляє можливість, визначену першою в об'єкті можливостей, другий результат - другу можливість і так далі.

## Використання в автономному режимі

Ось приклад того, як створити екземпляр multiremote в __автономному режимі__:

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

    // відкрити URL з обома браузерами одночасно
    await browser.url('http://json.org')

    // виконати команди одночасно
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // клікнути на елемент одночасно
    const elem = await browser.$('#someElem')
    await elem.click()

    // клікнути лише одним браузером (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Використання тестраннера WDIO

Щоб використовувати multiremote в тестраннері WDIO, просто визначте об'єкт `capabilities` у вашому `wdio.conf.js` як об'єкт з іменами браузерів як ключами (замість списку можливостей):

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

Це створить дві сесії WebDriver з Chrome та Firefox. Замість Chrome і Firefox ви також можете завантажити два мобільні пристрої за допомогою [Appium](http://appium.io) або один мобільний пристрій і один браузер.

Ви також можете запускати multiremote паралельно, помістивши об'єкт можливостей браузера в масив. Переконайтеся, що поле `capabilities` включено в кожен браузер, оскільки це те, як ми розрізняємо кожен режим.

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

Ви навіть можете завантажити один із [хмарних сервісів](https://webdriver.io/docs/cloudservices.html) разом з локальними екземплярами Webdriver/Appium або Selenium Standalone. WebdriverIO автоматично виявляє можливості хмарного бекенду, якщо ви вказали будь-який з `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) або `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) у можливостях браузера.

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

Тут можлива будь-яка комбінація ОС/браузера (включаючи мобільні та десктопні браузери). Всі команди, які ваші тести викликають через змінну `browser`, виконуються паралельно з кожним екземпляром. Це допомагає спростити ваші інтеграційні тести та прискорити їх виконання.

Наприклад, якщо ви відкриваєте URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Результат кожної команди буде об'єктом з іменами браузерів як ключами та результатом команди як значенням:

```js
// приклад з тестраннером wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // повертає: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // повертає: 'Firefox 35 on Mac OS X (Yosemite)'
```

Зверніть увагу, що кожна команда виконується по черзі. Це означає, що команда завершується, коли всі браузери її виконали. Це корисно, оскільки зберігає дії браузера синхронізованими, що полегшує розуміння того, що відбувається в даний момент.

Іноді необхідно робити різні речі в кожному браузері для тестування чогось. Наприклад, якщо ми хочемо перевірити чат-додаток, має бути один браузер, який надсилає текстове повідомлення, а інший браузер чекає на його отримання, а потім виконує перевірку.

При використанні тестраннера WDIO він реєструє імена браузерів з їх екземплярами у глобальній області видимості:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// чекаємо, поки повідомлення надійдуть
await $('.messages').waitForExist()
// перевіряємо, чи містить одне з повідомлень повідомлення Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

У цьому прикладі екземпляр `myFirefoxBrowser` почне чекати на повідомлення після того, як екземпляр `myChromeBrowser` клікне на кнопку `#send`.

Multiremote робить легким і зручним керування кількома браузерами, незалежно від того, чи ви хочете, щоб вони робили одне і те ж паралельно, чи різні речі узгоджено.

## Доступ до екземплярів браузера за допомогою рядків через об'єкт browser
Окрім доступу до екземпляра браузера через їх глобальні змінні (наприклад, `myChromeBrowser`, `myFirefoxBrowser`), ви також можете отримати доступ до них через об'єкт `browser`, наприклад, `browser["myChromeBrowser"]` або `browser["myFirefoxBrowser"]`. Ви можете отримати список всіх ваших екземплярів через `browser.instances`. Це особливо корисно при написанні кроків тестів, які можна повторно використовувати в будь-якому браузері, наприклад:

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

Якщо ви використовуєте TypeScript і хочете отримати доступ до екземпляра драйвера безпосередньо з об'єкта multiremote, ви також можете розширити типи multiremote для цього. Наприклад, при наступних можливостях:

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

Ви можете розширити екземпляр multiremote, додавши свої власні імена драйверів, наприклад:

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
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```