---
id: mocksandspies
title: Εικονικά Αντικείμενα και Κατάσκοποι Αιτημάτων
---

Το WebdriverIO διαθέτει ενσωματωμένη υποστήριξη για την τροποποίηση αποκρίσεων δικτύου που σας επιτρέπει να επικεντρωθείτε στη δοκιμή της εφαρμογής frontend χωρίς να χρειάζεται να ρυθμίσετε το backend ή έναν εικονικό διακομιστή. Μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για διαδικτυακούς πόρους όπως αιτήματα REST API στη δοκιμή σας και να τις τροποποιήσετε δυναμικά.

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη για το πρωτόκολλο Chrome DevTools. Αυτή η υποστήριξη παρέχεται εάν εκτελείτε δοκιμές τοπικά σε πρόγραμμα περιήγησης βασισμένο στο Chromium, μέσω Selenium Grid v4 ή νεότερης έκδοσης, ή μέσω παρόχου cloud με υποστήριξη για το πρωτόκολλο Chrome DevTools (π.χ. SauceLabs, BrowserStack, TestMu AI (παλαιότερα LambdaTest)). Πλήρης υποστήριξη σε όλους τους browsers θα είναι διαθέσιμη μόλις οι απαιτούμενες λειτουργίες ενσωματωθούν στο [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) και υλοποιηθούν στους αντίστοιχους browsers.

:::

## Δημιουργία εικονικού αντικειμένου (mock)

Πριν μπορέσετε να τροποποιήσετε οποιεσδήποτε αποκρίσεις, πρέπει πρώτα να ορίσετε ένα εικονικό αντικείμενο. Αυτό το εικονικό αντικείμενο περιγράφεται από το URL του πόρου και μπορεί να φιλτραριστεί από τη [μέθοδο αιτήματος](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ή τις [κεφαλίδες](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Ο πόρος υποστηρίζει εκφράσεις glob από το [minimatch](https://www.npmjs.com/package/minimatch):

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

Αφού ορίσετε ένα εικονικό αντικείμενο, μπορείτε να ορίσετε προσαρμοσμένες αποκρίσεις για αυτό. Αυτές οι προσαρμοσμένες αποκρίσεις μπορεί να είναι είτε ένα αντικείμενο για την απάντηση με JSON, ένα τοπικό αρχείο για απάντηση με προσαρμοσμένο αρχείο fixture ή έναν διαδικτυακό πόρο για αντικατάσταση της απάντησης με πόρο από το διαδίκτυο.

### Εικονική προσομοίωση αιτημάτων API

Για να προσομοιώσετε αιτήματα API όπου αναμένετε μια απόκριση JSON, το μόνο που χρειάζεται να κάνετε είναι να καλέσετε την `respond` στο αντικείμενο mock με ένα αυθαίρετο αντικείμενο που θέλετε να επιστρέψετε, π.χ.:

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

Μπορείτε επίσης να τροποποιήσετε τις κεφαλίδες απόκρισης καθώς και τον κωδικό κατάστασης περνώντας κάποιες παραμέτρους απόκρισης mock ως εξής:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Αν θέλετε το mock να μην καλέσει καθόλου το backend, μπορείτε να περάσετε `false` στη σημαία `fetchResponse`.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

Συνιστάται να αποθηκεύετε προσαρμοσμένες αποκρίσεις σε αρχεία fixture ώστε να μπορείτε απλά να τα εισάγετε στη δοκιμή σας ως εξής:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Προσομοίωση πόρων κειμένου

Εάν θέλετε να τροποποιήσετε πόρους κειμένου όπως αρχεία JavaScript, CSS ή άλλους πόρους που βασίζονται σε κείμενο, μπορείτε απλά να περάσετε μια διαδρομή αρχείου και το WebdriverIO θα αντικαταστήσει τον αρχικό πόρο με αυτό, π.χ.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Ανακατεύθυνση διαδικτυακών πόρων

Μπορείτε επίσης απλά να αντικαταστήσετε έναν διαδικτυακό πόρο με έναν άλλο διαδικτυακό πόρο αν η επιθυμητή σας απόκριση φιλοξενείται ήδη στο διαδίκτυο. Αυτό λειτουργεί με μεμονωμένους πόρους σελίδας καθώς και με μια ιστοσελίδα, π.χ.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Δυναμικές αποκρίσεις

Αν η απόκρισή σας εξαρτάται από την αρχική απόκριση του πόρου, μπορείτε επίσης να τροποποιήσετε δυναμικά τον πόρο περνώντας μια συνάρτηση που λαμβάνει την αρχική απόκριση ως παράμετρο και ορίζει το mock βάσει της τιμής επιστροφής, π.χ.:

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

## Ματαίωση εικονικών αντικειμένων

Αντί να επιστρέφετε μια προσαρμοσμένη απόκριση, μπορείτε επίσης απλά να ματαιώσετε το αίτημα με ένα από τα παρακάτω σφάλματα HTTP:

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

Αυτό είναι πολύ χρήσιμο αν θέλετε να μπλοκάρετε σενάρια τρίτων από τη σελίδα σας που έχουν αρνητική επιρροή στη λειτουργική σας δοκιμή. Μπορείτε να ματαιώσετε ένα εικονικό αντικείμενο καλώντας απλά `abort` ή `abortOnce`, π.χ.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Κατάσκοποι

Κάθε εικονικό αντικείμενο είναι αυτόματα ένας κατάσκοπος που μετρά τον αριθμό των αιτημάτων που έκανε το πρόγραμμα περιήγησης σε αυτόν τον πόρο. Αν δεν εφαρμόσετε μια προσαρμοσμένη απόκριση ή λόγο ματαίωσης στο mock, συνεχίζει με την προεπιλεγμένη απόκριση που θα λαμβάνατε κανονικά. Αυτό σας επιτρέπει να ελέγξετε πόσες φορές το πρόγραμμα περιήγησης έκανε το αίτημα, π.χ. σε ένα συγκεκριμένο τελικό σημείο API.

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

Αν χρειάζεται να περιμένετε μέχρι να απαντήσει ένα αίτημα που ταιριάζει, χρησιμοποιήστε το `mock.waitForResponse(options)`. Δείτε την αναφορά API: [waitForResponse](/docs/api/mock/waitForResponse).