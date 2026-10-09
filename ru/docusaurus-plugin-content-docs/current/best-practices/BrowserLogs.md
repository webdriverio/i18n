---
id: browser-logs
title: Логи браузера
description: "Сбор логов консоли браузера во время теста с помощью событий логирования WebDriver Bidi и проверка собранных сообщений."
---

Во время выполнения тестов браузер может записывать в лог важную информацию, которая вас интересует или которую вы хотите проверить.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

При использовании WebDriver Bidi, который является способом автоматизации браузера в WebdriverIO по умолчанию, вы можете подписаться на события, поступающие из браузера. Для событий логирования нужно слушать `log.entryAdded'`, например:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * возвращает: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

В тесте вы можете просто добавлять события логирования в массив и проверять этот массив после завершения действия, например:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // добавляем сообщение лога в массив
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // заставляем браузер отправить сообщение в консоль
        ...

        // проверяем, было ли перехвачено сообщение лога
        expect(logs).toContain('Hello Bidi')
    })

    // после этого удаляем слушатель
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Если Bidi отключён с помощью capability `'wdio:enforceWebDriverClassic': true`, сессии Chromium всё равно могут читать буфер логов браузера с помощью `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Примечание: команда `getLogs` может получать только самые последние логи из браузера. Со временем сообщения лога могут удаляться, если они становятся слишком старыми.
</TabItem>

</Tabs>

Обратите внимание, что вы можете использовать этот метод для получения сообщений об ошибках и проверки того, не возникли ли в вашем приложении какие-либо ошибки.