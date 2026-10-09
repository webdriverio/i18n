---
id: multiremote
title: Multi-remote
description: "Управляйте несколькими сеансами браузеров или устройств из одного теста с помощью multi-remote — в автономном режиме или с тестраннером WDIO."
---

WebdriverIO позволяет запускать несколько автоматизированных сеансов в одном тесте. Это удобно, когда вы тестируете функции, требующие нескольких пользователей (например, чаты или WebRTC-приложения).

Вместо того чтобы создавать несколько удалённых экземпляров, на каждом из которых нужно выполнять общие команды, такие как [`newSession`](/docs/api/webdriver#newsession) или [`url`](/docs/api/browser/url), вы можете просто создать экземпляр **multi-remote** и управлять всеми браузерами одновременно.

Для этого достаточно использовать функцию `multiRemote()` и передать в неё объект, ключами которого являются имена, а значениями — `capabilities`. Присвоив каждой capability имя, вы сможете легко выбрать этот отдельный экземпляр и обратиться к нему при выполнении команд только на нём.

:::info

MultiRemote _не_ предназначен для параллельного выполнения всех ваших тестов.
Он предназначен для координации нескольких браузеров и/или мобильных устройств в специальных интеграционных тестах (например, для чат-приложений).

:::

Большинство команд multi-remote возвращают массив результатов. Первый результат соответствует capability, определённой первой в объекте capabilities, второй результат — второй capability и так далее. `mock()` возвращает `MultiRemoteMock` вместо массива. См. [Что возвращает mock()](#what-mock-returns).

## Использование автономного режима

Вот пример создания экземпляра multi-remote в __автономном режиме__:

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

## Использование тестраннера WDIO

Чтобы использовать multi-remote в тестраннере WDIO, просто определите объект `capabilities` в вашем `wdio.conf.js` как объект, ключами которого являются имена браузеров (вместо списка capabilities):

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

Это создаст два сеанса WebDriver с Chrome и Firefox. Вместо Chrome и Firefox вы также можете запустить два мобильных устройства с помощью [Appium](http://appium.io) или одно мобильное устройство и один браузер.

Вы также можете запускать multi-remote параллельно, поместив объект capabilities браузеров в массив. Убедитесь, что поле `capabilities` указано для каждого браузера, поскольку именно по нему мы различаем режимы.

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

Вы даже можете запустить один из [облачных сервисов](https://webdriver.io/docs/cloudservices.html) вместе с локальными экземплярами Webdriver/Appium или Selenium Standalone. WebdriverIO автоматически определяет capabilities облачного бэкенда, если в capabilities браузера указан один из параметров `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) или `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)).

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

Здесь возможна любая комбинация ОС и браузеров (включая мобильные и десктопные браузеры). Все команды, которые ваши тесты вызывают через переменную `browser`, выполняются параллельно на каждом экземпляре. Это помогает упростить ваши интеграционные тесты и ускорить их выполнение.

Например, если вы открываете URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Результатом каждой команды будет объект, где ключом является имя браузера, а значением — результат команды, например:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Обратите внимание, что команды выполняются по очереди. Это означает, что команда завершается, когда её выполнили все браузеры. Это полезно, поскольку действия браузеров остаются синхронизированными, и так проще понять, что происходит в данный момент.

Иногда для тестирования необходимо выполнять разные действия в каждом браузере. Например, если мы хотим протестировать чат-приложение, один браузер должен отправить текстовое сообщение, в то время как другой ожидает его получения, а затем выполняет проверку.

При использовании тестраннера WDIO имена браузеров вместе с их экземплярами регистрируются в глобальной области видимости:

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

В этом примере экземпляр `myFirefoxBrowser` начнёт ожидать сообщение, как только экземпляр `myChromeBrowser` нажмёт на кнопку `#send`.

MultiRemote позволяет легко и удобно управлять несколькими браузерами — будь то выполнение одних и тех же действий параллельно или разных действий согласованно.

### Что возвращает `$`

В multi-remote браузере `$`, `custom$` и `react$` возвращают один `MultiRemoteElement`. На multi-remote элементе `shadow$`, `nextElement`, `previousElement` и `parentElement` также возвращают один такой элемент. Его команды выполняются на каждом экземпляре, а `getInstance` возвращает элемент одного браузера.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // clicks in every browser
await button.getInstance('myChromeBrowser').click()  // clicks only in Chrome
```

### Что возвращает `$$`

В multi-remote браузере `$$` возвращает `MultiRemoteElementArray`. Каждый элемент — это `MultiRemoteElement`, который обращается сразу ко всем экземплярам, а сам массив содержит ту же информацию, что и обычный `ElementArray`. `custom$$`, `react$$` и, на multi-remote элементе, `shadow$$` возвращают список такого же типа.

```js
const messages = await $$('.messages')

messages.length      // the largest number of elements that one instance found
messages[0]          // a MultiRemoteElement, addressing all instances
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // the multi-remote browser or element it was fetched from
messages.isMultiRemote // true, so it can be told apart from a plain ElementArray

// the async array helpers are available, as on a single browser
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Если экземпляры находят разное количество элементов, у записи нет элемента для экземпляра, который нашёл меньше. Для этого экземпляра `getInstance()` выбрасывает исключение, а команда на этой записи завершается ошибкой. Используйте `select()` с теми экземплярами, у которых этот элемент есть. Матчер `expect`, применённый ко всему списку, проверяет каждый экземпляр с его собственными элементами:

```js
// myChromeBrowser finds 3 messages, myFirefoxBrowser finds 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // only Chrome has a third message
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

До v10 возвращался обычный массив, если не была установлена переменная `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. Теперь этот массив используется по умолчанию, а переменная окружения удалена. Доступ по индексу не изменился, поэтому код, который только читал `elements[0]`, продолжит работать.

:::

### Что возвращает mock() {#what-mock-returns}

В multi-remote браузере `mock()` возвращает `MultiRemoteMock`. Это не массив. `respond()`, `restore()` и другие методы мока выполняются на каждом экземпляре. Перехваченные запросы хранятся в моке отдельного браузера, поэтому читайте их с помощью `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` запускает этот пример на двух сеансах headless Chrome.

`instances` следует порядку создания моков. После `select()` этот порядок может отличаться от `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // the Chrome mock, whatever the order
```

`getInstance` выбрасывает ошибку `Multi-remote object has no instance named "<name>"`, если `name` отсутствует в `instances`.

Чтобы замокать только один браузер, вызовите `mock()` на этом экземпляре:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Доступ к экземплярам браузеров по строковым именам через объект browser
Помимо доступа к экземплярам браузеров через их глобальные переменные (например, `myChromeBrowser`, `myFirefoxBrowser`), вы также можете обращаться к ним через объект `browser`, например `browser["myChromeBrowser"]` или `browser["myFirefoxBrowser"]`. Список всех ваших экземпляров можно получить через `browser.instances`. Это особенно полезно при написании переиспользуемых шагов теста, которые могут выполняться в любом из браузеров, например:

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

## Проверки

Матчеры `expect` поддерживают multi-remote браузеры, элементы и моки. По умолчанию каждый экземпляр должен соответствовать ожидаемому значению:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Чтобы ожидать разные значения для каждого экземпляра, используйте `expect.multiRemote()` с отдельным значением для каждого имени экземпляра:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Список всех поддерживаемых матчеров и необходимую конфигурацию см. в [руководстве по multi-remote в expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Доступ к одному экземпляру

Имена экземпляров не являются свойствами multi-remote браузера или multi-remote элемента. `browser.myChromeBrowser` и `elem.myChromeDriver` не определены. Получите сеанс с помощью `getInstance` или сузьте multi-remote объект с помощью `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Тестраннер по-прежнему регистрирует имя каждого экземпляра как отдельную глобальную переменную, если `injectGlobals` остаётся включённым, поэтому тест может вызывать `myChromeBrowser.$('button')`, не обращаясь к `browser`. Эта глобальная переменная — это отдельный сеанс, возвращаемый `getInstance`, а не поле multi-remote объекта.