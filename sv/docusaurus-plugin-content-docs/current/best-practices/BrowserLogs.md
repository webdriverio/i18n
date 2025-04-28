---
id: browser-logs
title: Webbläsarloggar
---

När du kör tester kan webbläsaren logga viktig information som du är intresserad av eller vill göra påståenden mot.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

När du använder WebDriver Bidi, som är standardsättet hur WebdriverIO automatiserar webbläsaren, kan du prenumerera på händelser från webbläsaren. För logghändelser vill du lyssna på `log.entryAdded'`, t.ex.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

I ett test kan du helt enkelt skicka logghändelser till en array och påstå att arrayen när din åtgärd är klar, t.ex.:

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

Om du fortfarande använder WebDriver Classic eller inaktiverat Bidi-användning via kapaciteten `'wdio:enforceWebDriverClassic': true`, kan du använda JSONWire-kommandot `getLogs` för att hämta de senaste loggarna. Eftersom WebdriverIO har tagit bort dessa föråldrade kommandon måste du använda [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) för att lägga till kommandot tillbaka till din webbläsarinstans.

Efter att du har lagt till eller initierat tjänsten kan du hämta loggar via:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Obs: kommandot `getLogs` kan bara hämta de senaste loggarna från webbläsaren. Det kan rensa loggmeddelanden om de blir för gamla.
</TabItem>

</Tabs>

Observera att du kan använda denna metod för att hämta felmeddelanden och verifiera om din applikation har stött på några fel.