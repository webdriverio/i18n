---
id: browser-logs
title: Логи браузера
---

При запуске тестов браузер может выводить важную информацию, которая вас интересует или которую вы хотите проверить.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

При использовании WebDriver Bidi, который является стандартным способом автоматизации браузера в WebdriverIO, вы можете подписаться на события, приходящие из браузера. Для событий логирования вам нужно слушать `log.entryAdded'`, например:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

В тесте вы можете просто добавлять события лога в массив и проверять этот массив после завершения действия, например:

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

Если вы все еще используете WebDriver Classic или отключили использование Bidi через возможность `'wdio:enforceWebDriverClassic': true`, вы можете использовать команду JSONWire `getLogs` для получения последних логов. Поскольку WebdriverIO удалил эти устаревшие команды, вам потребуется использовать [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service), чтобы добавить команду обратно в ваш экземпляр браузера.

После добавления или инициализации сервиса вы можете получить логи через:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Примечание: команда `getLogs` может получить только самые последние логи из браузера. Она может в конечном итоге очистить сообщения логов, если они становятся слишком старыми.
</TabItem>

</Tabs>

Обратите внимание, что вы можете использовать этот метод для получения сообщений об ошибках и проверки, столкнулось ли ваше приложение с какими-либо ошибками.