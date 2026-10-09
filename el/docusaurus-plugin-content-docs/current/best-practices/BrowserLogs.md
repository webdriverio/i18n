---
id: browser-logs
title: Αρχεία καταγραφής περιηγητή
description: "Καταγράψτε τα αρχεία καταγραφής της κονσόλας του περιηγητή κατά τη διάρκεια ενός τεστ με τα συμβάντα log του WebDriver Bidi και κάντε επαληθεύσεις στα μηνύματα που συλλέχθηκαν."
---

Κατά την εκτέλεση των τεστ, ο περιηγητής ενδέχεται να καταγράφει σημαντικές πληροφορίες που σας ενδιαφέρουν ή στις οποίες θέλετε να κάνετε επαληθεύσεις.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Όταν χρησιμοποιείτε το WebDriver Bidi, που είναι ο προεπιλεγμένος τρόπος με τον οποίο το WebdriverIO αυτοματοποιεί τον περιηγητή, μπορείτε να εγγραφείτε σε συμβάντα που προέρχονται από τον περιηγητή. Για συμβάντα καταγραφής, πρέπει να ακούτε το `log.entryAdded'`, π.χ.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Σε ένα τεστ, μπορείτε απλώς να προσθέτετε τα συμβάντα καταγραφής σε έναν πίνακα και να κάνετε επαληθεύσεις σε αυτόν τον πίνακα μόλις ολοκληρωθεί η ενέργειά σας, π.χ.:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // προσθήκη του μηνύματος καταγραφής στον πίνακα
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // προκαλέστε τον περιηγητή να στείλει ένα μήνυμα στην κονσόλα
        ...

        // επαλήθευση ότι το μήνυμα καταγραφής συλλέχθηκε
        expect(logs).toContain('Hello Bidi')
    })

    // καθαρισμός του listener στη συνέχεια
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Εάν το Bidi είναι απενεργοποιημένο με το capability `'wdio:enforceWebDriverClassic': true`, οι συνεδρίες Chromium μπορούν ακόμα να διαβάσουν την προσωρινή μνήμη καταγραφής του περιηγητή με το `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Σημείωση: η εντολή `getLogs` μπορεί να ανακτήσει μόνο τα πιο πρόσφατα αρχεία καταγραφής από τον περιηγητή. Ενδέχεται τελικά να διαγράψει μηνύματα καταγραφής εάν γίνουν πολύ παλιά.
</TabItem>

</Tabs>

Λάβετε υπόψη ότι μπορείτε να χρησιμοποιήσετε αυτή τη μέθοδο για να ανακτήσετε μηνύματα σφάλματος και να επαληθεύσετε εάν η εφαρμογή σας έχει αντιμετωπίσει σφάλματα.