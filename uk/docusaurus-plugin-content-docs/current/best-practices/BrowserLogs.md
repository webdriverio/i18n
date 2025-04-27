---
id: browser-logs
title: Логи Браузера
---

При запуску тестів браузер може виводити важливу інформацію, яка вас цікавить або за якою ви хочете виконати перевірку.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

При використанні WebDriver Bidi, що є усталеним способом автоматизації браузера в WebdriverIO, ви можете підписатися на події, що надходять від браузера. Для подій логування ви захочете прослуховувати `log.entryAdded'`, наприклад:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

У тесті ви можете просто додавати події логування до масиву та перевіряти цей масив після завершення дії, наприклад:

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

Якщо ви все ще використовуєте WebDriver Classic або вимкнули використання Bidi через можливість `'wdio:enforceWebDriverClassic': true`, ви можете використовувати команду JSONWire `getLogs` для отримання останніх логів. Оскільки WebdriverIO видалив ці застарілі команди, вам потрібно буде використовувати [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service), щоб додати команду назад до вашого екземпляра браузера.

Після додавання або ініціалізації сервісу ви можете отримати логи через:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Примітка: команда `getLogs` може отримати лише найновіші логи з браузера. Вона може очищати повідомлення логів, якщо вони стають надто старими.
</TabItem>

</Tabs>

Зверніть увагу, що ви можете використовувати цей метод для отримання повідомлень про помилки та перевірки, чи виникли якісь помилки у вашій програмі.