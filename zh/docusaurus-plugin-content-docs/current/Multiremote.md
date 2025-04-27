---
id: multiremote
title: 多重远程
---

WebdriverIO 允许您在单个测试中运行多个自动化会话。这在测试需要多个用户的功能时非常方便（例如，聊天或 WebRTC 应用程序）。

与其创建多个远程实例，在每个实例上都需要执行常见命令如 [`newSession`](/docs/api/webdriver#newsession) 或 [`url`](/docs/api/browser/url)，您可以简单地创建一个 **multiremote** 实例并同时控制所有浏览器。

要做到这一点，只需使用 `multiremote()` 函数，并传入一个对象，对象的键为名称，值为 `capabilities`。通过给每个能力一个名称，您可以在对单个实例执行命令时轻松选择和访问该实例。

:::info

Multiremote 并_不_是用来并行执行所有测试的。
它旨在帮助协调多个浏览器和/或移动设备进行特殊的集成测试（例如聊天应用程序）。

:::

所有多重远程实例都会返回一个结果数组。第一个结果代表在能力对象中首先定义的能力，第二个结果代表第二个能力，依此类推。

## 使用独立模式

以下是如何在__独立模式__中创建多重远程实例的示例：

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

要在 WDIO 测试运行器中使用多重远程，只需在 `wdio.conf.js` 中将 `capabilities` 对象定义为一个以浏览器名称为键的对象（而不是能力列表）：

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

这将创建两个使用 Chrome 和 Firefox 的 WebDriver 会话。除了 Chrome 和 Firefox，您还可以使用 [Appium](http://appium.io) 启动两个移动设备，或者一个移动设备和一个浏览器。

您还可以通过将浏览器能力对象放在数组中来并行运行多重远程。请确保在每个浏览器中都包含 `capabilities` 字段，因为这是我们区分每种模式的方式。

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

您甚至可以将[云服务后端](https://webdriver.io/docs/cloudservices.html)与本地 Webdriver/Appium 或 Selenium Standalone 实例一起启动。如果您在浏览器能力中指定了 `bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）或 `tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)），WebdriverIO 会自动检测云后端能力。

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

这里可以使用任何操作系统/浏览器组合（包括移动和桌面浏览器）。您的测试通过 `browser` 变量调用的所有命令都会在每个实例上并行执行。这有助于简化集成测试并加快执行速度。

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

请注意，每个命令都是一个接一个执行的。这意味着命令在所有浏览器都执行完后才会完成。这很有帮助，因为它保持浏览器操作的同步，使得更容易理解当前正在发生什么。

有时，为了测试某些功能，需要在每个浏览器中执行不同的操作。例如，如果我们要测试聊天应用程序，必须有一个浏览器发送文本消息，而另一个浏览器等待接收它，然后对其进行断言。

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

在这个例子中，一旦 `myChromeBrowser` 实例点击了 `#send` 按钮，`myFirefoxBrowser` 实例就会开始等待消息。

多重远程使控制多个浏览器变得简单方便，无论您是希望它们并行执行相同的操作，还是协同执行不同的操作。

## 通过浏览器对象使用字符串访问浏览器实例
除了通过全局变量（例如 `myChromeBrowser`、`myFirefoxBrowser`）访问浏览器实例外，您还可以通过 `browser` 对象访问它们，例如 `browser["myChromeBrowser"]` 或 `browser["myFirefoxBrowser"]`。您可以通过 `browser.instances` 获取所有实例的列表。这在编写可以在任一浏览器中执行的可重用测试步骤时特别有用，例如：

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

如果您使用 TypeScript 并希望直接从多重远程对象访问驱动程序实例，您也可以扩展多重远程类型。例如，给定以下能力：

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

您可以通过添加自定义驱动名称来扩展多重远程实例，例如：

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
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```