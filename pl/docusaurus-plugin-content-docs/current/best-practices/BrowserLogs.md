---
id: browser-logs
title: Logi przeglądarki
description: "Przechwytuj logi konsoli przeglądarki podczas testu za pomocą zdarzeń logów WebDriver Bidi i wykonuj asercje na zebranych komunikatach."
---

Podczas uruchamiania testów przeglądarka może logować ważne informacje, które Cię interesują lub względem których chcesz wykonać asercje.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Korzystając z WebDriver Bidi, który jest domyślnym sposobem, w jaki WebdriverIO automatyzuje przeglądarkę, możesz subskrybować zdarzenia pochodzące z przeglądarki. W przypadku zdarzeń logów należy nasłuchiwać na `log.entryAdded'`, np.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * zwraca: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

W teście możesz po prostu dodawać zdarzenia logów do tablicy i wykonać asercję na tej tablicy po zakończeniu akcji, np.:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // dodaj komunikat logu do tablicy
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // spraw, aby przeglądarka wysłała komunikat do konsoli
        ...

        // sprawdź, czy log został przechwycony
        expect(logs).toContain('Hello Bidi')
    })

    // posprzątaj listener na koniec
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Jeśli Bidi jest wyłączone za pomocą capability `'wdio:enforceWebDriverClassic': true`, sesje Chromium nadal mogą odczytywać bufor logów przeglądarki za pomocą `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Uwaga: polecenie `getLogs` może pobrać tylko najnowsze logi z przeglądarki. Komunikaty logów mogą zostać z czasem usunięte, jeśli staną się zbyt stare.
</TabItem>

</Tabs>

Pamiętaj, że możesz użyć tej metody do pobierania komunikatów o błędach i sprawdzania, czy w Twojej aplikacji wystąpiły jakiekolwiek błędy.