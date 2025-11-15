---
id: mocksandspies
title: Προσομοιώσεις και Κατασκοπεύσεις Αιτημάτων
---

Το WebdriverIO έρχεται με ενσωματωμένη υποστήριξη για τροποποίηση των αποκρίσεων δικτύου που σας επιτρέπει να επικεντρωθείτε στη δοκιμή της εφαρμογής frontend χωρίς να χρειάζεται να ρυθμίσετε το backend ή έναν διακομιστή προσομοίωσης. Μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για πόρους ιστού όπως αιτήματα REST API στο τεστ σας και να τις τροποποιήσετε δυναμικά.

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη για το πρωτόκολλο Chrome DevTools. Αυτή η υποστήριξη παρέχεται εάν εκτελείτε δοκιμές τοπικά σε ένα πρόγραμμα περιήγησης με βάση το Chromium, μέσω ενός Selenium Grid v4 ή νεότερης έκδοσης, ή μέσω ενός παρόχου υπηρεσιών cloud με υποστήριξη για το πρωτόκολλο Chrome DevTools (π.χ. SauceLabs, BrowserStack, LambdaTest). Πλήρης υποστήριξη για όλα τα προγράμματα περιήγησης θα είναι διαθέσιμη μόλις τα απαιτούμενα πρωτόγονα στοιχεία προστεθούν στο [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) και εφαρμοστούν στα αντίστοιχα προγράμματα περιήγησης.

:::

## Δημιουργία προσομοίωσης

Πριν μπορέσετε να τροποποιήσετε οποιεσδήποτε αποκρίσεις πρέπει πρώτα να ορίσετε μια προσομοίωση. Αυτή η προσομοίωση περιγράφεται από το URL του πόρου και μπορεί να φιλτραριστεί με τη [μέθοδο αιτήματος](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ή [επικεφαλίδες](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Ο πόρος υποστηρίζει εκφράσεις glob από το [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('**/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('**', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})
```

## Καθορισμός προσαρμοσμένων αποκρίσεων

Μόλις ορίσετε μια προσομοίωση, μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για αυτήν. Αυτές οι προσαρμοσμένες αποκρίσεις μπορεί να είναι είτε ένα αντικείμενο για απάντηση με JSON, ένα τοπικό αρχείο για απάντηση με προσαρμοσμένο fixture ή έναν πόρο ιστού για αντικατάσταση της απόκρισης με έναν πόρο από το διαδίκτυο.

### Προσομοίωση αιτημάτων API

Για να προσομοιώσετε αιτήματα API όπου περιμένετε μια απόκριση JSON, το μόνο που χρειάζεται να κάνετε είναι να καλέσετε το `respond` στο αντικείμενο προσομοίωσης με ένα αυθαίρετο αντικείμενο που θέλετε να επιστρέψετε, π.χ.:

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
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Μπορείτε επίσης να τροποποιήσετε τις επικεφαλίδες απόκρισης καθώς και τον κωδικό κατάστασης περνώντας κάποιες παραμέτρους απόκρισης προσομοίωσης ως εξής:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Εάν δεν θέλετε η προσομοίωση να καλέσει καθόλου το backend, μπορείτε να περάσετε `false` για τη σημαία `fetchResponse`.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

Συνιστάται να αποθηκεύετε προσαρμοσμένες αποκρίσεις σε αρχεία fixture, ώστε να μπορείτε απλώς να τις εισάγετε στο τεστ σας ως εξής:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Προσομοίωση πόρων κειμένου

Εάν θέλετε να τροποποιήσετε πόρους κειμένου όπως αρχεία JavaScript, CSS ή άλλους πόρους με βάση το κείμενο, μπορείτε απλά να δώσετε μια διαδρομή αρχείου και το WebdriverIO θα αντικαταστήσει τον αρχικό πόρο με αυτό, π.χ.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Ανακατεύθυνση πόρων ιστού

Μπορείτε επίσης απλώς να αντικαταστήσετε έναν πόρο ιστού με έναν άλλο πόρο ιστού εάν η επιθυμητή σας απόκριση φιλοξενείται ήδη στον ιστό. Αυτό λειτουργεί με μεμονωμένους πόρους σελίδας καθώς και με μια ιστοσελίδα, π.χ.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Δυναμικές αποκρίσεις

Εάν η απόκριση προσομοίωσής σας εξαρτάται από την αρχική απόκριση του πόρου, μπορείτε επίσης να τροποποιήσετε δυναμικά τον πόρο περνώντας μια συνάρτηση που λαμβάνει την αρχική απόκριση ως παράμετρο και ορίζει την προσομοίωση με βάση την τιμή επιστροφής, π.χ.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // replace todo content with their list number
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Ακύρωση προσομοιώσεων

Αντί να επιστρέψετε μια προσαρμοσμένη απόκριση, μπορείτε επίσης απλά να ακυρώσετε το αίτημα με ένα από τα παρακάτω σφάλματα HTTP:

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

Αυτό είναι πολύ χρήσιμο εάν θέλετε να αποκλείσετε σενάρια τρίτων από τη σελίδα σας που έχουν αρνητική επιρροή στη λειτουργική σας δοκιμή. Μπορείτε να ακυρώσετε μια προσομοίωση καλώντας απλά `abort` ή `abortOnce`, π.χ.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Κατασκοπεύσεις

Κάθε προσομοίωση είναι αυτόματα μια κατασκόπευση που μετρά τον αριθμό των αιτημάτων που έκανε το πρόγραμμα περιήγησης σε αυτόν τον πόρο. Εάν δεν εφαρμόσετε μια προσαρμοσμένη απόκριση ή λόγο ακύρωσης στην προσομοίωση, συνεχίζεται με την προεπιλεγμένη απόκριση που θα λαμβάνατε κανονικά. Αυτό σας επιτρέπει να ελέγξετε πόσες φορές το πρόγραμμα περιήγησης έκανε το αίτημα, π.χ. σε ένα συγκεκριμένο τελικό σημείο API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// register user
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// check if API request was made
expect(mock.calls.length).toBe(1)

// assert response
expect(mock.calls[0].body).toEqual({ success: true })
```

Εάν χρειάζεται να περιμένετε μέχρι να απαντηθεί ένα αντίστοιχο αίτημα, χρησιμοποιήστε το `mock.waitForResponse(options)`. Δείτε την αναφορά API: [waitForResponse](/docs/api/mock/waitForResponse).