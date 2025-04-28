---
id: browser-logs
title: Log del Browser
---

Durante l'esecuzione dei test, il browser potrebbe registrare informazioni importanti a cui sei interessato o che vuoi verificare.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Quando utilizzi WebDriver Bidi, che è il modo predefinito con cui WebdriverIO automatizza il browser, puoi sottoscriverti agli eventi provenienti dal browser. Per gli eventi di log, devi ascoltare `log.entryAdded'`, ad esempio:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

In un test puoi semplicemente inserire gli eventi di log in un array e verificare quell'array una volta che la tua azione è completata, ad esempio:

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

Se utilizzi ancora WebDriver Classic o hai disabilitato l'utilizzo di Bidi tramite la capacità `'wdio:enforceWebDriverClassic': true`, puoi utilizzare il comando JSONWire `getLogs` per recuperare gli ultimi log. Poiché WebdriverIO ha rimosso questi comandi deprecati, dovrai utilizzare il [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) per aggiungere nuovamente il comando alla tua istanza del browser.

Dopo aver aggiunto o inizializzato il servizio, puoi recuperare i log tramite:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Nota: il comando `getLogs` può recuperare solo i log più recenti dal browser. Potrebbe eliminare i messaggi di log se diventano troppo vecchi.
</TabItem>

</Tabs>

Tieni presente che puoi utilizzare questo metodo per recuperare messaggi di errore e verificare se la tua applicazione ha riscontrato errori.