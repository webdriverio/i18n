---
id: browser-logs
title: Logi przeglądarki
---

Podczas uruchamiania testów przeglądarka może rejestrować ważne informacje, którymi jesteś zainteresowany lub względem których chcesz tworzyć asercje.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Korzystając z WebDriver Bidi, który jest domyślnym sposobem automatyzacji przeglądarki przez WebdriverIO, możesz subskrybować zdarzenia pochodzące z przeglądarki. W przypadku zdarzeń logowania chcesz nasłuchiwać na `log.entryAdded'`, np.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

W teście możesz po prostu dodawać zdarzenia logowania do tablicy i sprawdzać tę tablicę po zakończeniu akcji, np.:

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

Jeśli nadal używasz WebDriver Classic lub wyłączyłeś użycie Bidi za pomocą możliwości `'wdio:enforceWebDriverClassic': true`, możesz użyć polecenia JSONWire `getLogs`, aby pobrać najnowsze logi. Ponieważ WebdriverIO usunęło te przestarzałe polecenia, będziesz musiał użyć [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service), aby dodać polecenie z powrotem do swojej instancji przeglądarki.

Po dodaniu lub zainicjowaniu usługi możesz pobierać logi za pomocą:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Uwaga: polecenie `getLogs` może pobierać tylko najnowsze logi z przeglądarki. Może w końcu usunąć komunikaty logów, jeśli staną się zbyt stare.
</TabItem>

</Tabs>

Należy pamiętać, że możesz użyć tej metody do pobierania komunikatów o błędach i sprawdzania, czy Twoja aplikacja napotkała jakiekolwiek błędy.