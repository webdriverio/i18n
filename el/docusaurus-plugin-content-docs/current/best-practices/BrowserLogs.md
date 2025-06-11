---
id: browser-logs
title: Αρχεία Καταγραφής Περιηγητή
---

Κατά την εκτέλεση των δοκιμών, ο περιηγητής μπορεί να καταγράψει σημαντικές πληροφορίες που σας ενδιαφέρουν ή θέλετε να ελέγξετε.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Όταν χρησιμοποιείτε το WebDriver Bidi, που είναι ο προεπιλεγμένος τρόπος με τον οποίο το WebdriverIO αυτοματοποιεί τον περιηγητή, μπορείτε να εγγραφείτε σε συμβάντα που προέρχονται από τον περιηγητή. Για συμβάντα καταγραφής, θέλετε να ακούσετε το `log.entryAdded'`, π.χ.:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Σε μια δοκιμή, μπορείτε απλά να προσθέσετε συμβάντα καταγραφής σε έναν πίνακα και να ελέγξετε αυτόν τον πίνακα όταν ολοκληρωθεί η ενέργειά σας, π.χ.:

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

Εάν εξακολουθείτε να χρησιμοποιείτε το WebDriver Classic ή έχετε απενεργοποιήσει τη χρήση Bidi μέσω της δυνατότητας `'wdio:enforceWebDriverClassic': true`, μπορείτε να χρησιμοποιήσετε την εντολή JSONWire `getLogs` για να λάβετε τα πιο πρόσφατα αρχεία καταγραφής. Δεδομένου ότι το WebdriverIO έχει αφαιρέσει αυτές τις παρωχημένες εντολές, θα πρέπει να χρησιμοποιήσετε την [Υπηρεσία JSONWP](https://github.com/webdriverio-community/wdio-jsonwp-service) για να προσθέσετε ξανά την εντολή στο αντικείμενο του περιηγητή σας.

Αφού προσθέσετε ή εκκινήσετε την υπηρεσία, μπορείτε να λάβετε αρχεία καταγραφής μέσω:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Σημείωση: η εντολή `getLogs` μπορεί να ανακτήσει μόνο τα πιο πρόσφατα αρχεία καταγραφής από τον περιηγητή. Ενδέχεται να καθαρίσει τα μηνύματα καταγραφής τελικά εάν γίνουν πολύ παλιά.
</TabItem>

</Tabs>

Σημειώστε ότι μπορείτε να χρησιμοποιήσετε αυτή τη μέθοδο για να ανακτήσετε μηνύματα σφαλμάτων και να επαληθεύσετε εάν η εφαρμογή σας έχει αντιμετωπίσει τυχόν σφάλματα.