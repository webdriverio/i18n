---
id: multiremote
title: Мультиудаленный режим
---

WebdriverIO позволяет вам запускать несколько автоматизированных сессий в одном тесте. Это удобно, когда вы тестируете функции, требующие нескольких пользователей (например, чат или WebRTC приложения).

Вместо создания нескольких удаленных экземпляров, где вам нужно выполнять общие команды, такие как [`newSession`](/docs/api/webdriver#newsession) или [`url`](/docs/api/browser/url) для каждого экземпляра, вы можете просто создать экземпляр **multiremote** и управлять всеми браузерами одновременно.

Для этого просто используйте функцию `multiremote()` и передайте объект с именами в качестве ключей и `capabilities` в качестве значений. Присваивая каждой возможности имя, вы можете легко выбирать и получать доступ к отдельному экземпляру при выполнении команд.

:::info

Multiremote _не_ предназначен для параллельного выполнения всех тестов.
Он предназначен для координации нескольких браузеров и/или мобильных устройств для специальных интеграционных тестов (например, чат-приложений).

:::

Все экземпляры multiremote возвращают массив результатов. Первый результат представляет возможность, определенную первой в объекте возможностей, второй результат - вторую возможность и так далее.

## Использование в автономном режиме

Вот пример того, как создать экземпляр multiremote в __автономном режиме__:

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

    // открыть url в обоих браузерах одновременно
    await browser.url('http://json.org')

    // вызвать команды одновременно
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // кликнуть по элементу одновременно
    const elem = await browser.$('#someElem')
    await elem.click()

    // кликнуть только одним браузером (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Использование с тестраннером WDIO

Чтобы использовать multiremote в тестраннере WDIO, просто определите объект `capabilities` в вашем `wdio.conf.js` как объект с именами браузеров в качестве ключей (вместо списка возможностей):

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

Это создаст две сессии WebDriver с Chrome и Firefox. Вместо Chrome и Firefox вы также можете запустить два мобильных устройства с использованием [Appium](http://appium.io) или одно мобильное устройство и один браузер.

Вы также можете запускать multiremote параллельно, поместив объект возможностей браузера в массив. Убедитесь, что у вас включено поле `capabilities` в каждом браузере, так как это то, как мы различаем каждый режим.

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

Вы даже можете запустить один из [облачных сервисов](https://webdriver.io/docs/cloudservices.html) вместе с локальными экземплярами Webdriver/Appium или Selenium Standalone. WebdriverIO автоматически определит возможности облачного бэкенда, если вы указали `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) или `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) в возможностях браузера.

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

Здесь возможна любая комбинация ОС/браузера (включая мобильные и десктопные браузеры). Все команды, которые ваши тесты вызывают через переменную `browser`, выполняются параллельно в каждом экземпляре. Это помогает оптимизировать ваши интеграционные тесты и ускорить их выполнение.

Например, если вы открываете URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Результат каждой команды будет объектом с именами браузеров в качестве ключа и результатом команды в качестве значения, например:

```js
// пример тестраннера wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // возвращает: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // возвращает: 'Firefox 35 on Mac OS X (Yosemite)'
```

Обратите внимание, что каждая команда выполняется по одной. Это означает, что команда завершается, когда все браузеры её выполнили. Это полезно, потому что действия браузеров остаются синхронизированными, что упрощает понимание того, что происходит в данный момент.

Иногда необходимо делать разные вещи в каждом браузере для тестирования. Например, если мы хотим протестировать чат-приложение, должен быть один браузер, который отправляет текстовое сообщение, в то время как другой браузер ожидает его получения, а затем выполняет проверку.

При использовании тестраннера WDIO он регистрирует имена браузеров с их экземплярами в глобальной области:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// ждем, пока придут сообщения
await $('.messages').waitForExist()
// проверяем, содержит ли одно из сообщений сообщение Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

В этом примере экземпляр `myFirefoxBrowser` начнет ожидать сообщение, как только экземпляр `myChromeBrowser` нажмет на кнопку `#send`.

Multiremote делает управление несколькими браузерами простым и удобным, независимо от того, хотите ли вы, чтобы они делали одно и то же параллельно или разные вещи согласованно.

## Доступ к экземплярам браузера с использованием строк через объект browser
Помимо доступа к экземпляру браузера через их глобальные переменные (например, `myChromeBrowser`, `myFirefoxBrowser`), вы также можете получить доступ к ним через объект `browser`, например `browser["myChromeBrowser"]` или `browser["myFirefoxBrowser"]`. Вы можете получить список всех ваших экземпляров через `browser.instances`. Это особенно полезно при написании повторно используемых шагов тестирования, которые могут быть выполнены в любом браузере, например:

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

Файл Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Файл определения шагов:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Расширение типов TypeScript

Если вы используете TypeScript и хотите получить доступ к экземпляру драйвера из объекта multiremote напрямую, вы также можете расширить типы multiremote для этого. Например, при следующих возможностях:

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

Вы можете расширить экземпляр multiremote, добавив свои пользовательские имена драйверов, например:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Теперь вы можете получить доступ к драйверам напрямую, например:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```