---
id: browser-logs
title: Webbläsarloggar
description: "Fånga webbläsarens konsolloggar under ett test med WebDriver Bidi-logghändelser och gör assertioner mot de insamlade meddelandena."
---

När du kör tester kan webbläsaren logga viktig information som du är intresserad av eller vill göra assertioner mot.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

När du använder WebDriver Bidi, vilket är standardsättet som WebdriverIO automatiserar webbläsaren på, kan du prenumerera på händelser som kommer från webbläsaren. För logghändelser vill du lyssna på `log.entryAdded'`, t.ex.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

I ett test kan du helt enkelt lägga till logghändelser i en array och göra assertioner mot den arrayen när din åtgärd är klar, t.ex.:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // lägg till loggmeddelandet i arrayen
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // få webbläsaren att skicka ett meddelande till konsolen
        ...

        // kontrollera om loggen fångades
        expect(logs).toContain('Hello Bidi')
    })

    // rensa upp lyssnaren efteråt
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Om Bidi är inaktiverat med capability-inställningen `'wdio:enforceWebDriverClassic': true` kan Chromium-sessioner fortfarande läsa webbläsarens loggbuffert med `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Obs: kommandot `getLogs` kan endast hämta de senaste loggarna från webbläsaren. Det kan så småningom rensa bort loggmeddelanden om de blir för gamla.
</TabItem>

</Tabs>

Observera att du kan använda den här metoden för att hämta felmeddelanden och verifiera om din applikation har stött på några fel.