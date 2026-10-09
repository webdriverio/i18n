---
id: mock
title: Το αντικείμενο Mock
---

Το αντικείμενο mock είναι ένα αντικείμενο που αναπαριστά ένα network mock και περιέχει πληροφορίες σχετικά με τα αιτήματα που ταίριαξαν με τα δοσμένα `url` και `filterOptions`. Μπορείτε να το λάβετε χρησιμοποιώντας την εντολή [`mock`](/docs/api/browser/mock).

:::info

Σημειώστε ότι η χρήση της εντολής `mock` απαιτεί υποστήριξη για το πρωτόκολλο Chrome DevTools.
Αυτή η υποστήριξη παρέχεται εάν εκτελείτε τα tests τοπικά σε browser βασισμένο στο Chromium ή εάν
χρησιμοποιείτε Selenium Grid v4 ή νεότερο. Αυτή η εντολή __δεν__ μπορεί να χρησιμοποιηθεί κατά την εκτέλεση
αυτοματοποιημένων tests στο cloud. Μάθετε περισσότερα στην ενότητα [Πρωτόκολλα Αυτοματισμού](/docs/automationProtocols).

:::

Μπορείτε να διαβάσετε περισσότερα σχετικά με το mocking αιτημάτων και αποκρίσεων στο WebdriverIO στον οδηγό μας [Mocks και Spies](/docs/mocksandspies).

## Multi-remote

Σε έναν browser [multi-remote](/docs/multiremote), η [`browser.mock()`](/docs/api/browser/mock) επιστρέφει ένα `MultiRemoteMock` αντί για αυτό το αντικείμενο. Το `instances` παραθέτει τα ονόματα των browsers και το `getInstance(name)` επιστρέφει το `Mock` για τον συγκεκριμένο browser. Οι `respond()`, `restore()` και οι υπόλοιπες μέθοδοι παρακάτω εκτελούνται σε κάθε instance. Το `calls` παραμένει στο mock κάθε instance: `mock.getInstance('myChromeBrowser').calls`.

Το `getInstance` πετάει το σφάλμα `Multi-remote object has no instance named "<name>"` όταν το `name` δεν είναι ένα από τα `instances`.

## Ιδιότητες

Ένα αντικείμενο mock περιέχει τις ακόλουθες ιδιότητες:

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `url` | `String` | Το url που δόθηκε στην εντολή mock |
| `filterOptions` | `Object` | Οι επιλογές φιλτραρίσματος πόρων που δόθηκαν στην εντολή mock |
| `browser` | `Object` | Το [Αντικείμενο Browser](/docs/api/browser) που χρησιμοποιήθηκε για τη λήψη του αντικειμένου mock. |
| `calls` | `Object[]` | Πληροφορίες σχετικά με τα αιτήματα του browser που ταίριαξαν, οι οποίες περιέχουν ιδιότητες όπως `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` και `body` |

## Μέθοδοι

Τα αντικείμενα mock παρέχουν διάφορες εντολές, που παρατίθενται στην ενότητα `mock`, οι οποίες επιτρέπουν στους χρήστες να τροποποιήσουν τη συμπεριφορά του αιτήματος ή της απόκρισης.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Events

Το αντικείμενο mock είναι ένας EventEmitter και εκπέμπει μερικά events για τις περιπτώσεις χρήσης σας.

Ακολουθεί μια λίστα με τα events.

### `request`

Αυτό το event εκπέμπεται κατά την εκκίνηση ενός αιτήματος δικτύου που ταιριάζει με τα μοτίβα του mock. Το αίτημα περνιέται στο callback του event.

Interface αιτήματος:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Αυτό το event εκπέμπεται όταν η απόκριση δικτύου αντικαθίσταται με [`respond`](/docs/api/mock/respond) ή [`respondOnce`](/docs/api/mock/respondOnce). Η απόκριση περνιέται στο callback του event.

Interface απόκρισης:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Αυτό το event εκπέμπεται όταν το αίτημα δικτύου ματαιώνεται με [`abort`](/docs/api/mock/abort) ή [`abortOnce`](/docs/api/mock/abortOnce). Η αποτυχία περνιέται στο callback του event.

Interface αποτυχίας:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Αυτό το event εκπέμπεται όταν προστίθεται ένα νέο ταίριασμα, πριν από το `continue` ή το `overwrite`. Το ταίριασμα περνιέται στο callback του event.

Interface ταιριάσματος:
```ts
interface MatchEvent {
    url: string // URL αιτήματος (χωρίς fragment).
    urlFragment?: string // Fragment του ζητούμενου URL που ξεκινά με hash, εάν υπάρχει.
    method: string // Μέθοδος αιτήματος HTTP.
    headers: Record<string, string> // Headers αιτήματος HTTP.
    postData?: string // Δεδομένα αιτήματος HTTP POST.
    hasPostData?: boolean // True όταν το αίτημα έχει δεδομένα POST.
    mixedContentType?: MixedContentType // Ο τύπος mixed content export του αιτήματος.
    initialPriority: ResourcePriority // Προτεραιότητα του αιτήματος πόρου τη στιγμή που αποστέλλεται το αίτημα.
    referrerPolicy: ReferrerPolicy // Η πολιτική referrer του αιτήματος, όπως ορίζεται στο https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Εάν φορτώνεται μέσω link preload.
    body: string | Buffer | JsonCompatible // Σώμα απόκρισης του πραγματικού πόρου.
    responseHeaders: Record<string, string> // Headers απόκρισης HTTP.
    statusCode: number // Κωδικός κατάστασης απόκρισης HTTP.
    mockedResponse?: string | Buffer // Εάν το mock που εκπέμπει το event τροποποίησε επίσης την απόκρισή του.
}
```

### `continue`

Αυτό το event εκπέμπεται όταν η απόκριση δικτύου δεν έχει ούτε αντικατασταθεί ούτε διακοπεί, ή εάν η απόκριση έχει ήδη σταλεί από άλλο mock. Το `requestId` περνιέται στο callback του event.

## Παραδείγματα

Λήψη του αριθμού των εκκρεμών αιτημάτων:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // είναι σημαντικό να ταιριάζουν όλα τα αιτήματα, διαφορετικά η τελική τιμή μπορεί να είναι πολύ παραπλανητική.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Πρόκληση σφάλματος σε αποτυχία δικτύου 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // αναμονή εδώ, επειδή ορισμένα αιτήματα μπορεί να εκκρεμούν ακόμη
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

Προσδιορισμός του εάν χρησιμοποιήθηκε η τιμή απόκρισης του mock:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // ενεργοποιείται για το πρώτο αίτημα προς '**/foo/**'
}).on('continue', () => {
    // ενεργοποιείται για τα υπόλοιπα αιτήματα προς '**/foo/**'
})

secondMock.on('continue', () => {
    // ενεργοποιείται για το πρώτο αίτημα προς '**/foo/bar/**'
}).on('overwrite', () => {
    // ενεργοποιείται για τα υπόλοιπα αιτήματα προς '**/foo/bar/**'
})
```

Σε αυτό το παράδειγμα, το `firstMock` ορίστηκε πρώτο και έχει μία κλήση `respondOnce`, επομένως η τιμή απόκρισης του `secondMock` δεν θα χρησιμοποιηθεί για το πρώτο αίτημα, αλλά θα χρησιμοποιηθεί για τα υπόλοιπα.