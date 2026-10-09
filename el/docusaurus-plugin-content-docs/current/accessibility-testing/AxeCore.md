---
id: axe-core
title: Axe Core
description: "Εκτελέστε αυτοματοποιημένους ελέγχους προσβασιμότητας στα τεστ σας με τον προσαρμογέα ανοιχτού κώδικα Axe της Deque, σε λειτουργία standalone ή testrunner."
---

Μπορείτε να συμπεριλάβετε τεστ προσβασιμότητας στη σουίτα τεστ του WebdriverIO χρησιμοποιώντας τα εργαλεία προσβασιμότητας ανοιχτού κώδικα [της Deque που ονομάζονται Axe](https://www.deque.com/axe/). Η ρύθμιση είναι πολύ εύκολη, το μόνο που χρειάζεται να κάνετε είναι να εγκαταστήσετε τον προσαρμογέα Axe για το WebdriverIO μέσω:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Ο προσαρμογέας Axe μπορεί να χρησιμοποιηθεί είτε σε λειτουργία [standalone είτε testrunner](/docs/setuptypes), απλώς εισάγοντάς τον και αρχικοποιώντας τον με το [αντικείμενο browser](/docs/api/browser), π.χ.:

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

Μπορείτε να βρείτε περισσότερη τεκμηρίωση για τον προσαρμογέα Axe για το WebdriverIO [στο GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).