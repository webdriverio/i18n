---
id: multiremote
title: 多重远程
---

WebdriverIO 允许您在单个测试中运行多个自动化会话。这在测试需要多个用户的功能时非常方便（例如，聊天或 WebRTC 应用程序）。

您无需创建多个远程实例，在每个实例上执行常见命令（如 [`newSession`](/docs/api/webdriver#newsession) 或 [`url`](/docs/api/browser/url)），而是可以简单地创建一个 **multiremote** 实例，同时控制所有浏览器。

为此，只需使用 `multiremote()` 函数，并传入一个对象，该对象中的名称作为键，`capabilities` 作为值。通过为每个能力指定名称，您可以在对单个实例执行命令时轻松选择和访问该实例。

:::info

Multiremote 的目的_不是_并行执行所有测试。
它旨在帮助协调多个浏览器和/或移动设备进行特殊集成测试（例如聊天应用程序）。

:::

所有 multiremote 实例都会返回结果数组。第一个结果代表能力对象中定义的第一个能力，第二个结果代表第二个能力，依此类推。

## 使用独立模式

以下是在__独立模式__中创建 multiremote 实例的示例：

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

## 使用 WDIO 测试运行器

要在 WDIO 测试运行器中使用 multiremote，只需在 `wdio.conf.js` 中将 `capabilities` 对象定义为以浏览器名称为键的对象（而不是能力列表）：

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

这将创建两个 WebDriver 会话，分别使用 Chrome 和 Firefox。除了 Chrome 和 Firefox 外，您还可以使用 [Appium](http://appium.io) 启动两个移动设备，或者一个移动设备和一个浏览器。

您还可以通过将浏览器 capabilities 对象放入数组中来并行运行 multiremote。请确保在每个浏览器中包含 `capabilities` 字段，因为这是我们区分每种模式的方式。

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

您甚至可以启动其中一个[云服务后端](https://webdriver.io/docs/cloudservices.html)，并结合本地 Webdriver/Appium 或 Selenium Standalone 实例。如果您在浏览器功能中指定了 `bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）或 `tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)），WebdriverIO 会自动检测云后端功能。

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

这里可以使用任何操作系统/浏览器组合（包括移动和桌面浏览器）。您的测试通过 `browser` 变量调用的所有命令都会在每个实例中并行执行。这有助于简化集成测试并加快执行速度。

例如，如果您打开一个 URL：

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

每个命令的结果将是一个对象，以浏览器名称为键，命令结果为值，如下所示：

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

请注意，每个命令都是一个接一个地执行的。这意味着命令在所有浏览器都执行完毕后才算完成。这很有用，因为它可以保持浏览器操作同步，使理解当前发生的事情变得更加容易。

有时，为了测试某些功能，需要在每个浏览器中做不同的事情。例如，如果我们想测试一个聊天应用程序，必须有一个浏览器发送文本消息，而另一个浏览器等待接收它，然后对其进行断言。

使用 WDIO 测试运行器时，它会将浏览器名称及其实例注册到全局作用域：

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

在此示例中，一旦 `myChromeBrowser` 实例点击 `#send` 按钮，`myFirefoxBrowser` 实例将开始等待消息。

Multiremote 使控制多个浏览器变得简单便捷，无论您想让它们并行做同样的事情，还是协调做不同的事情。

## 通过浏览器对象使用字符串访问浏览器实例
除了通过全局变量（例如 `myChromeBrowser`、`myFirefoxBrowser`）访问浏览器实例外，您还可以通过 `browser` 对象访问它们，例如 `browser["myChromeBrowser"]` 或 `browser["myFirefoxBrowser"]`。您可以通过 `browser.instances` 获取所有实例的列表。这在编写可在任一浏览器中执行的可重用测试步骤时特别有用，例如：

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

Cucumber 文件：
    ```feature
    When User A types a message into the chat
    ```

步骤定义文件：
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## 扩展 TypeScript 类型

如果您使用 TypeScript 并想直接从 multiremote 对象访问驱动程序实例，您也可以扩展 multiremote 类型。例如，给定以下功能：

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

您可以通过添加自定义驱动程序名称来扩展 multiremote 实例，例如：

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

现在您可以直接访问驱动程序，例如：

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```