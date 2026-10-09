---
id: mocksandspies
title: Mocks και Spies Αιτημάτων
description: "Προσομοιώστε αιτήματα και αποκρίσεις δικτύου στα τεστ σας με το browser.mock, ακυρώστε αιτήματα και επιθεωρήστε κλήσεις με spies."
---

Το WebdriverIO διαθέτει ενσωματωμένη υποστήριξη για την τροποποίηση αποκρίσεων δικτύου, η οποία σας επιτρέπει να εστιάσετε στον έλεγχο της frontend εφαρμογής σας χωρίς να χρειάζεται να ρυθμίσετε το backend ή έναν mock server. Μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για πόρους του web, όπως αιτήματα REST API, στο τεστ σας και να τις τροποποιείτε δυναμικά.

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη για WebDriver Bidi. Αυτό συμβαίνει συνήθως όταν εκτελείτε τεστ τοπικά σε έναν browser βασισμένο στο Chromium ή στον Firefox, καθώς και αν χρησιμοποιείτε Selenium Grid v4 ή νεότερο. Αν εκτελείτε τεστ στο cloud, βεβαιωθείτε ότι ο πάροχος cloud σας υποστηρίζει WebDriver Bidi.

:::

## Δημιουργία ενός mock

Πριν μπορέσετε να τροποποιήσετε οποιεσδήποτε αποκρίσεις, πρέπει πρώτα να ορίσετε ένα mock. Αυτό το mock περιγράφεται από το url του πόρου και μπορεί να φιλτραριστεί με βάση τη [μέθοδο αιτήματος](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ή τα [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Η αντιστοίχιση του πόρου γίνεται με χρήση ενός [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), όπου το `*` αντιστοιχεί σε οποιαδήποτε ακολουθία χαρακτήρων. Ένα url χωρίς πρωτόκολλο αντιστοιχίζεται μόνο με τη διαδρομή (path) του αιτήματος, οπότε το `*/users/list` αντιστοιχεί σε αυτή τη διαδρομή σε οποιοδήποτε origin:

```js
// προσομοίωση όλων των πόρων που τελειώνουν σε "/users/list"
const userListMock = await browser.mock('*/users/list')

// ή μπορείτε να καθορίσετε το mock φιλτράροντας πόρους με βάση τα headers ή
// τον κωδικό κατάστασης, προσομοιώνοντας μόνο επιτυχή αιτήματα σε πόρους json
const strictMock = await browser.mock('*', {
    // προσομοίωση όλων των αποκρίσεων json
    requestHeaders: { 'Content-Type': 'application/json' },
    // που ήταν επιτυχείς
    statusCode: 200
})

// αντί για string μπορείτε επίσης να περάσετε ένα `URLPattern`· το polyfill
// λειτουργεί επίσης σε runtimes χωρίς εγγενή υποστήριξη URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Χρησιμοποιήστε ένα μόνο `*` για wildcards σε URL· αντιστοιχεί επίσης και στο `/`. Διαδοχικά wildcards πριν από σταθερό κείμενο, όπως `**/api/**` ή `**/data.json`, μπορούν να προκαλέσουν υπερβολικό regex backtracking σε άσχετα URLs και να παγώσουν ένα τεστ. Δείτε το [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). Στα component tests, χρησιμοποιήστε επίσης σταθερό πρωτόκολλο και hostname ώστε η κίνηση του runner να παραμένει εκτός της υποκλοπής· δείτε τα [mocks αιτημάτων στο component testing](/docs/component-testing/mocking#requests).

:::

## Καθορισμός προσαρμοσμένων αποκρίσεων

Αφού ορίσετε ένα mock, μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για αυτό. Αυτές οι προσαρμοσμένες αποκρίσεις μπορεί να είναι είτε ένα αντικείμενο για απόκριση με JSON, ένα τοπικό αρχείο για απόκριση με ένα προσαρμοσμένο fixture, είτε ένας πόρος του web για την αντικατάσταση της απόκρισης με έναν πόρο από το διαδίκτυο.

### Προσομοίωση αιτημάτων API

Για να προσομοιώσετε αιτήματα API όπου αναμένετε απόκριση JSON, το μόνο που χρειάζεται να κάνετε είναι να καλέσετε το `respond` στο αντικείμενο mock με ένα αυθαίρετο αντικείμενο που θέλετε να επιστραφεί, π.χ.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// εξάγει: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Μπορείτε επίσης να τροποποιήσετε τα headers της απόκρισης καθώς και τον κωδικό κατάστασης, περνώντας κάποιες παραμέτρους απόκρισης mock ως εξής:

```js
mock.respond({ ... }, {
    // απόκριση με κωδικό κατάστασης 404
    statusCode: 404,
    // συγχώνευση των headers της απόκρισης με τα ακόλουθα headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Αν θέλετε το mock να μην καλεί καθόλου το backend, μπορείτε να περάσετε `false` στο flag `fetchResponse`.

```js
mock.respond({ ... }, {
    // να μην καλείται το πραγματικό backend
    fetchResponse: false
})
```

Το `fetchResponse: false` δεν καλεί ποτέ το backend. Ένα mock που δημιουργήθηκε με φίλτρο `statusCode` ή `responseHeaders` χρειάζεται αυτή την απόκριση για να αποφασίσει αν υπάρχει αντιστοίχιση, οπότε τα `respond()` και `respondOnce()` προκαλούν σφάλμα αν τα συνδυάσετε. Αφαιρέστε το φίλτρο απόκρισης ή αφήστε το `fetchResponse` χωρίς τιμή, ώστε το mock να μπορεί να διαβάσει την απόκριση του backend και στη συνέχεια να την αντικαταστήσει.

Συνιστάται να αποθηκεύετε τις προσαρμοσμένες αποκρίσεις σε αρχεία fixture, ώστε να μπορείτε απλώς να τα εισάγετε στο τεστ σας ως εξής:

```js
// απαιτεί Node.js v16.14.0 ή νεότερο για υποστήριξη των JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Προσομοίωση πόρων κειμένου

Αν θέλετε να τροποποιήσετε πόρους κειμένου όπως JavaScript, αρχεία CSS ή άλλους πόρους βασισμένους σε κείμενο, μπορείτε απλώς να περάσετε μια διαδρομή αρχείου και το WebdriverIO θα αντικαταστήσει τον αρχικό πόρο με αυτό, π.χ.:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// ή απόκριση με το δικό σας προσαρμοσμένο JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Ανακατεύθυνση πόρων web

Μπορείτε επίσης απλώς να αντικαταστήσετε έναν πόρο web με έναν άλλο πόρο web, αν η επιθυμητή απόκριση φιλοξενείται ήδη στο web. Αυτό λειτουργεί τόσο με μεμονωμένους πόρους σελίδας όσο και με μια ολόκληρη ιστοσελίδα, π.χ.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // επιστρέφει "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Δυναμικές αποκρίσεις

Αν η απόκριση του mock εξαρτάται από την απόκριση του αρχικού πόρου, μπορείτε επίσης να τροποποιήσετε δυναμικά τον πόρο περνώντας μια συνάρτηση που λαμβάνει την αρχική απόκριση ως παράμετρο και ορίζει το mock με βάση την τιμή επιστροφής, π.χ.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // αντικατάσταση του περιεχομένου των todo με τον αριθμό τους στη λίστα
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// επιστρέφει
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Ακύρωση mocks

Αντί να επιστρέψετε μια προσαρμοσμένη απόκριση, μπορείτε επίσης απλώς να ακυρώσετε το αίτημα με ένα από τα ακόλουθα σφάλματα HTTP:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

Αυτό είναι πολύ χρήσιμο αν θέλετε να μπλοκάρετε scripts τρίτων από τη σελίδα σας που επηρεάζουν αρνητικά το λειτουργικό σας τεστ. Μπορείτε να ακυρώσετε ένα mock απλώς καλώντας `abort` ή `abortOnce`, π.χ.:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Spies

Κάθε mock είναι αυτόματα ένας spy που μετρά τον αριθμό των αιτημάτων που έκανε ο browser σε αυτόν τον πόρο. Αν δεν εφαρμόσετε μια προσαρμοσμένη απόκριση ή λόγο ακύρωσης στο mock, συνεχίζει με την προεπιλεγμένη απόκριση που θα λαμβάνατε κανονικά. Αυτό σας επιτρέπει να ελέγξετε πόσες φορές έκανε ο browser το αίτημα, π.χ. σε ένα συγκεκριμένο API endpoint.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // επιστρέφει 0

// εγγραφή χρήστη
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// έλεγχος αν έγινε το αίτημα API
expect(mock.calls.length).toBe(1)

// επιβεβαίωση της απόκρισης
expect(mock.calls[0].body).toEqual({ success: true })
```

Αν χρειάζεται να περιμένετε μέχρι να λάβει απόκριση ένα αίτημα που αντιστοιχεί, χρησιμοποιήστε το `mock.waitForResponse(options)`. Δείτε την αναφορά του API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

Σε έναν browser [multi-remote](/docs/multiremote), το `mock()` επιστρέφει ένα `MultiRemoteMock` αντί για ένα μεμονωμένο `Mock`. Μέθοδοι όπως οι `respond()` και `restore()` εκτελούνται σε κάθε instance. Το `waitForResponse()` περιμένει μέχρι κάθε instance να έχει μια αντίστοιχη απόκριση. Τα αιτήματα που καταγράφονται παραμένουν στο mock του αντίστοιχου browser:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// εγγραφή χρήστη σε κάθε browser ώστε κάθε session να στείλει το αίτημα
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

Το `mock.instances` παραθέτει αυτά τα ονόματα με τη σειρά που δημιουργήθηκαν τα mocks. Το `getInstance` προκαλεί το σφάλμα `Multi-remote object has no instance named "<name>"` όταν το όνομα δεν υπάρχει σε αυτή τη λίστα. Ένα mock που δημιουργήθηκε από το `browser.select('myFirefoxBrowser', 'myChromeBrowser')` παραθέτει πρώτα τον Firefox, κάτι που μπορεί να διαφέρει από το `browser.instances`.

Για να κάνετε stub μόνο σε έναν browser, καλέστε το `mock()` σε εκείνο το instance:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```