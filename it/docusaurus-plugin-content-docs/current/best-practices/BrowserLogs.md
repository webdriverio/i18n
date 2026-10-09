---
id: browser-logs
title: Log del Browser
description: "Cattura i log della console del browser durante un test con gli eventi di log di WebDriver Bidi ed esegui asserzioni sui messaggi raccolti."
---

Durante l'esecuzione dei test, il browser potrebbe registrare informazioni importanti che ti interessano o su cui vuoi eseguire asserzioni.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Quando si utilizza WebDriver Bidi, che è il modo predefinito con cui WebdriverIO automatizza il browser, puoi iscriverti agli eventi provenienti dal browser. Per gli eventi di log devi metterti in ascolto su `log.entryAdded'`, ad esempio:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

In un test puoi semplicemente inserire gli eventi di log in un array ed eseguire asserzioni su quell'array una volta completata la tua azione, ad esempio:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // aggiunge il messaggio di log all'array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // fa sì che il browser invii un messaggio alla console
        ...

        // verifica se il log è stato catturato
        expect(logs).toContain('Hello Bidi')
    })

    // rimuove il listener alla fine
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Se Bidi è disabilitato con la capability `'wdio:enforceWebDriverClassic': true`, le sessioni Chromium possono comunque leggere il buffer dei log del browser con `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Nota: il comando `getLogs` può recuperare solo i log più recenti dal browser. I messaggi di log potrebbero essere eliminati col tempo se diventano troppo vecchi.
</TabItem>

</Tabs>

Tieni presente che puoi utilizzare questo metodo per recuperare i messaggi di errore e verificare se la tua applicazione ha riscontrato degli errori.