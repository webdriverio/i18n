---
id: browser-logs
title: Browser-Logs
description: "Erfassen Sie Browser-Konsolenlogs während eines Tests mit WebDriver-Bidi-Log-Events und prüfen Sie die gesammelten Nachrichten."
---

Beim Ausführen von Tests kann der Browser wichtige Informationen protokollieren, die für Sie von Interesse sind oder die Sie überprüfen möchten.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Wenn Sie WebDriver Bidi verwenden, was die Standardmethode ist, mit der WebdriverIO den Browser automatisiert, können Sie Events abonnieren, die vom Browser kommen. Für Log-Events sollten Sie auf `log.entryAdded'` hören, z. B.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

In einem Test können Sie Log-Events einfach in ein Array einfügen und dieses Array überprüfen, sobald Ihre Aktion abgeschlossen ist, z. B.:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // Log-Nachricht zum Array hinzufügen
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // den Browser dazu veranlassen, eine Nachricht an die Konsole zu senden
        ...

        // prüfen, ob das Log erfasst wurde
        expect(logs).toContain('Hello Bidi')
    })

    // Listener anschließend aufräumen
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Wenn Bidi mit der Capability `'wdio:enforceWebDriverClassic': true` deaktiviert ist, können Chromium-Sessions den Log-Puffer des Browsers weiterhin mit `getLogs` auslesen:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Hinweis: Der Befehl `getLogs` kann nur die neuesten Logs aus dem Browser abrufen. Log-Nachrichten können irgendwann entfernt werden, wenn sie zu alt werden.
</TabItem>

</Tabs>

Bitte beachten Sie, dass Sie diese Methode verwenden können, um Fehlermeldungen abzurufen und zu überprüfen, ob in Ihrer Anwendung Fehler aufgetreten sind.