---
id: mock
title: Το Αντικείμενο Mock
---

Το αντικείμενο mock είναι ένα αντικείμενο που αντιπροσωπεύει ένα δικτυακό mock και περιέχει πληροφορίες σχετικά με αιτήματα που ταίριαζαν με το δοθέν `url` και `filterOptions`. Μπορεί να ληφθεί χρησιμοποιώντας την εντολή [`mock`](/docs/api/browser/mock).

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη του πρωτοκόλλου Chrome DevTools.
Αυτή η υποστήριξη παρέχεται εάν εκτελείτε δοκιμές τοπικά σε πρόγραμμα περιήγησης βασισμένο στο Chromium ή εάν
χρησιμοποιείτε Selenium Grid v4 ή νεότερη έκδοση. Αυτή η εντολή __δεν__ μπορεί να χρησιμοποιηθεί κατά την εκτέλεση
αυτοματοποιημένων δοκιμών στο cloud. Μάθετε περισσότερα στην ενότητα [Πρωτόκολλα Αυτοματισμού](/docs/automationProtocols).

:::

Μπορείτε να διαβάσετε περισσότερα σχετικά με την προσομοίωση αιτημάτων και απαντήσεων στο WebdriverIO στον οδηγό [Mocks and Spies](/docs/mocksandspies).

## Ιδιότητες

Ένα αντικείμενο mock περιέχει τις ακόλουθες ιδιότητες:

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `url` | `String` | Το url που δόθηκε στην εντολή mock |
| `filterOptions` | `Object` | Οι επιλογές φίλτρου πόρων που δόθηκαν στην εντολή mock |
| `browser` | `Object` | Το [Αντικείμενο Browser](/docs/api/browser) που χρησιμοποιείται για τη λήψη του αντικειμένου mock. |
| `calls` | `Object[]` | Πληροφορίες σχετικά με αιτήματα περιηγητή που ταιριάζουν, που περιέχουν ιδιότητες όπως `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` και `body` |

## Μέθοδοι

Τα αντικείμενα mock παρέχουν διάφορες εντολές, που παρατίθενται στην ενότητα `mock`, και επιτρέπουν στους χρήστες να τροποποιήσουν τη συμπεριφορά του αιτήματος ή της απάντησης.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## Συμβάντα

Το αντικείμενο mock είναι ένα EventEmitter και εκπέμπονται διάφορα συμβάντα για τις περιπτώσεις χρήσης σας.

Ακολουθεί μια λίστα συμβάντων.

### `request`

Αυτό το συμβάν εκπέμπεται κατά την εκκίνηση ενός αιτήματος δικτύου που ταιριάζει με τα πρότυπα mock. Το αίτημα περνάει στην επανάκληση συμβάντος.

Διεπαφή αιτήματος:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Αυτό το συμβάν εκπέμπεται όταν η απάντηση δικτύου αντικαθίσταται με [`respond`](/docs/api/mock/respond) ή [`respondOnce`](/docs/api/mock/respondOnce). Η απάντηση περνάει στην επανάκληση συμβάντος.

Διεπαφή απάντησης:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Αυτό το συμβάν εκπέμπεται όταν το αίτημα δικτύου ματαιώνεται με [`abort`](/docs/api/mock/abort) ή [`abortOnce`](/docs/api/mock/abortOnce). Η αποτυχία περνάει στην επανάκληση συμβάντος.

Διεπαφή αποτυχίας:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Αυτό το συμβάν εκπέμπεται όταν προστίθεται νέα αντιστοιχία, πριν από το `continue` ή το `overwrite`. Η αντιστοιχία περνάει στην επανάκληση συμβάντος.

Διεπαφή αντιστοιχίας:
```ts
interface MatchEvent {
    url: string // Request URL (without fragment).
    urlFragment?: string // Fragment of the requested URL starting with hash, if present.
    method: string // HTTP request method.
    headers: Record<string, string> // HTTP request headers.
    postData?: string // HTTP POST request data.
    hasPostData?: boolean // True when the request has POST data.
    mixedContentType?: MixedContentType // The mixed content export type of the request.
    initialPriority: ResourcePriority // Priority of the resource request at the time request is sent.
    referrerPolicy: ReferrerPolicy // The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Whether is loaded via link preload.
    body: string | Buffer | JsonCompatible // Body response of actual resource.
    responseHeaders: Record<string, string> // HTTP response headers.
    statusCode: number // HTTP response status code.
    mockedResponse?: string | Buffer // If mock, emitting the event, also modified it's response.
}
```

### `continue`

Αυτό το συμβάν εκπέμπεται όταν η απάντηση δικτύου δεν έχει αντικατασταθεί ούτε διακοπεί, ή αν η απάντηση έχει ήδη σταλεί από άλλο mock. Το `requestId` περνάει στην επανάκληση συμβάντος.

## Παραδείγματα

Λήψη αριθμού εκκρεμών αιτημάτων:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // it is important to match all requests otherwise, the resulting value can be very confusing.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Πέταγμα σφάλματος σε αποτυχία δικτύου 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // waiting here, because some requests can still be pending
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

Προσδιορισμός εάν χρησιμοποιήθηκε η τιμή απάντησης mock:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // triggers for first request to '**/foo/**'
}).on('continue', () => {
    // triggers for rest requests to '**/foo/**'
})

secondMock.on('continue', () => {
    // triggers for first request to '**/foo/bar/**'
}).on('overwrite', () => {
    // triggers for rest requests to '**/foo/bar/**'
})
```

Σε αυτό το παράδειγμα, το `firstMock` ορίστηκε πρώτα και έχει μια κλήση `respondOnce`, οπότε η τιμή απάντησης `secondMock` δεν θα χρησιμοποιηθεί για το πρώτο αίτημα, αλλά θα χρησιμοποιηθεί για τα υπόλοιπα.