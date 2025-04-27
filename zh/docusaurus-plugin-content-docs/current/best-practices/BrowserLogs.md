---
id: browser-logs
title: 浏览器日志
---

在运行测试时，浏览器可能会记录您感兴趣或想要断言的重要信息。

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

当使用WebDriver Bidi（WebdriverIO默认的浏览器自动化方式）时，您可以订阅来自浏览器的事件。对于日志事件，您需要监听`log.entryAdded'`，例如：

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

在测试中，您可以将日志事件推送到数组中，并在操作完成后断言该数组，例如：

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

如果您仍在使用WebDriver Classic或通过`'wdio:enforceWebDriverClassic': true`功能禁用了Bidi，您可以使用`getLogs` JSONWire命令获取最新的日志。由于WebdriverIO已经移除了这些已弃用的命令，您需要使用[JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service)将该命令添加回您的浏览器实例。

在添加或初始化服务后，您可以通过以下方式获取日志：

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

注意：`getLogs`命令只能获取浏览器中最近的日志。如果日志消息太旧，它们最终可能会被清理。
</TabItem>

</Tabs>

请注意，您可以使用此方法检索错误消息并验证您的应用程序是否遇到任何错误。