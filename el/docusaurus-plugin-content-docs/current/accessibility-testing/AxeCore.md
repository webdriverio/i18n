---
id: axe-core
title: Axe Core
---

Μπορείτε να συμπεριλάβετε δοκιμές προσβασιμότητας στη σουίτα δοκιμών WebdriverIO χρησιμοποιώντας τα εργαλεία προσβασιμότητας ανοιχτού κώδικα [από την Deque που ονομάζεται Axe](https://www.deque.com/axe/). Η εγκατάσταση είναι πολύ εύκολη, το μόνο που χρειάζεται να κάνετε είναι να εγκαταστήσετε τον προσαρμογέα WebdriverIO Axe μέσω:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Ο προσαρμογέας Axe μπορεί να χρησιμοποιηθεί είτε σε λειτουργία [standalone ή testrunner](/docs/setuptypes) απλά εισάγοντας και αρχικοποιώντας το με το [αντικείμενο browser](/docs/api/browser), π.χ.:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Μπορείτε να βρείτε περισσότερη τεκμηρίωση για τον προσαρμογέα Axe WebdriverIO [στο GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).