---
id: mock
title: Το αντικείμενο Mock
---

Το αντικείμενο mock είναι ένα αντικείμενο που αντιπροσωπεύει ένα δικτυακό mock και περιέχει πληροφορίες σχετικά με αιτήματα που ταίριαζαν με το δοθέν `url` και `filterOptions`. Μπορεί να ληφθεί χρησιμοποιώντας την εντολή [`mock`](/docs/api/browser/mock).

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη για το πρωτόκολλο Chrome DevTools.
Αυτή η υποστήριξη παρέχεται αν εκτελείτε τοπικά δοκιμές σε browser βασισμένο σε Chromium ή αν
χρησιμοποιείτε Selenium Grid v4 ή νεότερη έκδοση. Αυτή η εντολή __δεν__ μπορεί να χρησιμοποιηθεί κατά την εκτέλεση
αυτοματοποιημένων δοκιμών στο cloud. Μάθετε περισσότερα στην ενότητα [Automation Protocols](/docs/automationProtocols).

:::

Μπορείτε να διαβάσετε περισσότερα σχετικά με τη δημιουργία mock αιτημάτων και απαντήσεων στο WebdriverIO στον οδηγό μας [Mocks and Spies](/docs/mocksandspies).

## Ιδιότητες

Ένα αντικείμενο mock περιέχει τις ακόλουθες ιδιότητες:

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `url` | `String` | Το url που δόθηκε στην εντολή mock |
| `filterOptions` | `Object` | Οι επιλογές φίλτρου πόρων που δόθηκαν στην εντολή mock |
| `browser` | `Object` | Το [Browser Object](/docs/api/browser) που χρησιμοποιήθηκε για να ληφθεί το αντικείμενο mock. |
| `calls` | `Object[]` | Πληροφορίες σχετικά με αντίστοιχα αιτήματα του browser, που περιέχουν ιδιότητες όπως `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` και `body` |

## Μέθοδοι

Τα αντικείμενα Mock παρέχουν διάφορες εντολές, που αναφέρονται στην ενότητα `mock`, οι οποίες επιτρέπουν στους χρήστες να τροποποιούν τη συμπεριφορά του αιτήματος ή της απάντησης.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Συμβάντα

Το αντικείμενο mock είναι ένα EventEmitter και εκπέμπει διάφορα συμβάντα για τις περιπτώσεις χρήσης σας.

Εδώ είναι μια λίστα με τα συμβάντα.

### `request`

Αυτό το συμβάν εκπέμπεται κατά την εκτέλεση ενός δικτυακού αιτήματος που ταιριάζει με τα πρότυπα του mock. Το αίτημα περνιέται στο callback του συμβάντος.

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

Αυτό το συμβάν εκπέμπεται όταν η δικτυακή απάντηση αντικαθίσταται με το [`respond`](/docs/api/mock/respond) ή [`respondOnce`](/docs/api/mock/respondOnce). Η απάντηση περνιέται στο callback του συμβάντος.

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

Αυτό το συμβάν εκπέμπεται όταν το δικτυακό αίτημα ματαιώνεται με το [`abort`](/docs/api/mock/abort) ή [`abortOnce`](/docs/api/mock/abortOnce). Η αποτυχία περνιέται στο callback του συμβάντος.

Διεπαφή αποτυχίας:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Αυτό το συμβάν εκπέμπεται όταν προστίθεται ένα νέο ταίριασμα, πριν από το `continue` ή `overwrite`. Το ταίριασμα περνιέται στο callback του συμβάντος.

Διεπαφή ταιριάσματος:
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

Αυτό το συμβάν εκπέμπεται όταν η δικτυακή απάντηση δεν έχει ούτε αντικατασταθεί ούτε διακοπεί, ή αν η απάντηση έχει ήδη σταλεί από άλλο mock. Το `requestId` περνιέται στο callback του συμβάντος.

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

Ρίψη σφάλματος σε περίπτωση δικτυακής αποτυχίας 404:

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

Προσδιορισμός αν χρησιμοποιήθηκε η τιμή απάντησης του mock:

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

Σε αυτό το παράδειγμα, το `firstMock` ορίστηκε πρώτα και έχει μία κλήση `respondOnce`, οπότε η τιμή απάντησης του `secondMock` δεν θα χρησιμοποιηθεί για το πρώτο αίτημα, αλλά θα χρησιμοποιηθεί για τα υπόλοιπα.