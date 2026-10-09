---
id: emulation
title: Εξομοίωση
description: "Εξομοιώστε γεωγραφική θέση, χαρακτηριστικά μέσων, user agent, δίκτυο, τοπικές ρυθμίσεις, ζώνη ώρας, οθόνη και συσκευές με την εντολή emulate."
---

Με το WebdriverIO μπορείτε να εξομοιώσετε τη συμπεριφορά του προγράμματος περιήγησης χρησιμοποιώντας την εντολή [`emulate`](/docs/api/browser/emulate). Η εντολή χρησιμοποιεί το [WebDriver BiDi emulation module](https://w3c.github.io/webdriver-bidi/#module-emulation) για το τρέχον top-level browsing context. Η παράκαμψη εφαρμόζεται αμέσως. Δεν χρειάζεται να επαναφορτώσετε τη σελίδα. Εξαίρεση αποτελεί το `clock`: το BiDi δεν διαθέτει εντολή ρολογιού, επομένως αυτό το scope εξακολουθεί να εγκαθιστά ψεύτικους χρονομετρητές (fake timers).

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Αυτή η λειτουργία απαιτεί υποστήριξη WebDriver Bidi από το πρόγραμμα περιήγησης. Ενώ οι πρόσφατες εκδόσεις των Chrome, Edge και Firefox διαθέτουν τέτοια υποστήριξη, το Safari __δεν__ τη διαθέτει. Για ενημερώσεις ακολουθήστε το [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Επιπλέον, αν χρησιμοποιείτε κάποιον πάροχο cloud για την εκκίνηση προγραμμάτων περιήγησης, βεβαιωθείτε ότι ο πάροχός σας υποστηρίζει επίσης το WebDriver Bidi.

Για να ενεργοποιήσετε το WebDriver Bidi για το τεστ σας, βεβαιωθείτε ότι έχετε ορίσει `webSocketUrl: true` στα capabilities σας.

Ένα πρόγραμμα περιήγησης που δεν υλοποιεί μια εντολή απορρίπτει την κλήση με το δικό του σφάλμα, `unknown command` ή `unsupported operation`. Το WebdriverIO επιστρέφει αυτό το σφάλμα. Δεν καταφεύγει σε preload script ή σε CDP.

:::

Το `emulate` επιστρέφει μια συνάρτηση που καθαρίζει το συγκεκριμένο scope. Το [`browser.restore()`](/docs/api/browser/restore) καθαρίζει κάθε ενεργό scope, ή τα scopes που καθορίζετε.

## Γεωγραφική θέση

Αλλάξτε τη γεωγραφική θέση του προγράμματος περιήγησης σε μια συγκεκριμένη περιοχή, π.χ.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Αυτό χρησιμοποιεί τη στοίβα γεωγραφικής θέσης του προγράμματος περιήγησης, συμπεριλαμβανομένων των `getCurrentPosition` και `watchPosition`. Μια σελίδα μπορεί να εξακολουθεί να χρειάζεται να έχει παραχωρηθεί η άδεια γεωγραφικής θέσης, όπως στο παράδειγμα. Τα προαιρετικά πεδία είναι `accuracy`, `altitude`, `altitudeAccuracy`, `heading` και `speed`.

Για να κάνετε τη σελίδα να αποτύχει στην ανάγνωση θέσης:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Χρωματικό σχήμα και άλλα χαρακτηριστικά μέσων

Αλλάξτε το χαρακτηριστικό μέσων `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

Αυτό ενημερώνει το CSS `@media (prefers-color-scheme)` καθώς και το [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Δεν απαιτείται επαναφόρτωση.

Το `media` ορίζει τον υπόλοιπο χάρτη χαρακτηριστικών μέσων, για παράδειγμα μειωμένη κίνηση:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

Τα `colorScheme` και `media` μοιράζονται έναν χάρτη. Η εντολή BiDi αντικαθιστά ολόκληρο τον χάρτη, οπότε επικρατεί η μεταγενέστερη κλήση. Η επαναφορά οποιουδήποτε από τα δύο scopes καθαρίζει τον χάρτη.

Το `forcedColors` είναι διαφορετική εντολή. Ορίζει το θέμα forced-colors (`'light'` ή `'dark'`), όχι το χαρακτηριστικό μέσων `forced-colors`. Αυτό το χαρακτηριστικό μέσων παραμένει στο `media` ως `forcedColors: 'none' | 'active'`.

## User Agent

Αλλάξτε το user agent του προγράμματος περιήγησης μέσω:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Αυτή είναι η παράκαμψη user agent του προγράμματος περιήγησης. Δεν πρόκειται για τροποποιημένη ιδιότητα `navigator.userAgent`. Οι κατασκευαστές προγραμμάτων περιήγησης καταργούν σταδιακά το User Agent.

## Κατάσταση σύνδεσης

Θέστε το browsing context εκτός σύνδεσης:

```ts
await browser.emulate('onLine', false)
```

Το `false` στέλνει `emulation.setNetworkConditions` με `{ type: 'offline' }`. Τα Fetch, WebSocket και WebTransport αποτυγχάνουν, και το [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) ακολουθεί. Το `true`, καθώς και η επαναφορά του scope, καθαρίζει τη συνθήκη. Η ταχύτητα μεταφοράς και η καθυστέρηση παραμένουν στο [`throttleNetwork`](/docs/api/browser/throttleNetwork). Οι συνθήκες δικτύου του BiDi υποστηρίζουν μόνο την κατάσταση εκτός σύνδεσης.

## Τοπικές ρυθμίσεις, ζώνη ώρας και αφή

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

Το `locale` είναι ένα tag BCP 47. Το `timezone` είναι ένα όνομα IANA ή μια μετατόπιση όπως `+02:00`. Το `touch` είναι το `maxTouchPoints` και πρέπει να είναι ακέραιος `>= 1`. Η επαναφορά του `touch` καθαρίζει την παράκαμψη. Δεν μπορεί να ορίσει `0`.

## Οθόνη, προσανατολισμός και διάταξη

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

Το `screen` είναι η περιοχή οθόνης που εκτίθεται στο web, όχι το viewport. Το `orientation.natural` είναι `'portrait'` ή `'landscape'`. Το `orientation.type` είναι `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` ή `'landscape-secondary'`.

Το `viewportMeta` δέχεται μόνο `true`. Η τιμή κατά την προδιαγραφή είναι `true | null`, επομένως δεν υπάρχει `false`. Η επαναφορά το καθαρίζει. Το `textLayout` δέχεται μόνο `'mobile'`. Το `scripting` μπορεί μόνο να απενεργοποιηθεί. Η προδιαγραφή δεν μπορεί να επιβάλει την ενεργοποίηση του scripting. Το `scrollbar` είναι `'classic'` ή `'overlay'`.

## Ρολόι

Μπορείτε να τροποποιήσετε το ρολόι συστήματος του προγράμματος περιήγησης χρησιμοποιώντας την εντολή [`emulate`](/docs/emulation). Αντικαθιστά εγγενείς καθολικές συναρτήσεις που σχετίζονται με τον χρόνο, επιτρέποντας τον σύγχρονο έλεγχό τους μέσω του `clock.tick()` ή του επιστρεφόμενου αντικειμένου ρολογιού. Αυτό περιλαμβάνει τον έλεγχο των:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Το ρολόι ξεκινά από την εποχή unix (χρονοσφραγίδα 0). Αυτό σημαίνει ότι όταν δημιουργείτε ένα νέο Date στην εφαρμογή σας, θα έχει ώρα 1η Ιανουαρίου 1970, εάν δεν περάσετε άλλες επιλογές στην εντολή `emulate`.

##### Παράδειγμα

Κατά την κλήση του `browser.emulate('clock', { ... })` θα αντικαταστήσει αμέσως τις καθολικές συναρτήσεις για την τρέχουσα σελίδα καθώς και για όλες τις επόμενες σελίδες, π.χ.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Μπορείτε να τροποποιήσετε την ώρα συστήματος καλώντας το [`setSystemTime`](/docs/api/clock/setSystemTime) ή το [`tick`](/docs/api/clock/tick).

Το αντικείμενο `FakeTimerInstallOpts` μπορεί να έχει τις ακόλουθες ιδιότητες:

 ```ts
interface FakeTimerInstallOpts {
    // Εγκαθιστά ψεύτικους χρονομετρητές με την καθορισμένη εποχή unix
    // @default: 0
    now?: number | Date | undefined;

    // Ένας πίνακας με ονόματα καθολικών μεθόδων και APIs προς παραποίηση. Από προεπιλογή, το WebdriverIO
    // δεν αντικαθιστά τα `nextTick()` και `queueMicrotask()`. Για παράδειγμα,
    // το `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` θα παραποιήσει μόνο
    // τα `setTimeout()` και `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Ο μέγιστος αριθμός χρονομετρητών που θα εκτελεστούν κατά την κλήση του runAll() (προεπιλογή: 1000)
    loopLimit?: number | undefined;

    // Λέει στο WebdriverIO να αυξάνει αυτόματα τον εικονικό χρόνο με βάση την πραγματική
    // μεταβολή του χρόνου συστήματος (π.χ. ο εικονικός χρόνος θα αυξάνεται κατά 20ms για κάθε 20ms αλλαγής
    // στον πραγματικό χρόνο συστήματος)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Σχετικό μόνο όταν χρησιμοποιείται με shouldAdvanceTime: true. Αυξάνει τον εικονικό χρόνο κατά
    // advanceTimeDelta ms για κάθε αλλαγή advanceTimeDelta ms στον πραγματικό χρόνο συστήματος
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Λέει στο FakeTimers να καθαρίζει τους 'εγγενείς' (δηλ. μη ψεύτικους) χρονομετρητές αναθέτοντας στους
    // αντίστοιχους handlers τους. Αυτοί δεν καθαρίζονται από προεπιλογή, οδηγώντας σε πιθανώς
    // απρόσμενη συμπεριφορά αν υπήρχαν χρονομετρητές πριν από την εγκατάσταση του FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Συσκευή

Η εντολή `emulate` υποστηρίζει επίσης την εξομοίωση μιας συγκεκριμένης κινητής ή επιτραπέζιας συσκευής. Αυτό δεν πρέπει, σε καμία περίπτωση, να χρησιμοποιείται για δοκιμές σε κινητές συσκευές, καθώς οι μηχανές των επιτραπέζιων προγραμμάτων περιήγησης διαφέρουν από αυτές των κινητών. Θα πρέπει να χρησιμοποιείται μόνο εάν η εφαρμογή σας προσφέρει συγκεκριμένη συμπεριφορά για μικρότερα μεγέθη viewport.

Για μια συσκευή, το WebdriverIO:

- ορίζει το user agent από τον descriptor
- ορίζει το viewport και τον συντελεστή κλίμακας της συσκευής
- ορίζει το `maxTouchPoints` σε `1` όταν ο descriptor διαθέτει αφή, και καθαρίζει την αφή σε διαφορετική περίπτωση
- ορίζει τη διάταξη κειμένου για κινητά και το viewport meta tag όταν ο descriptor αφορά κινητή συσκευή, και τα καθαρίζει σε διαφορετική περίπτωση

Δεν επινοεί μέγεθος οθόνης ή προσανατολισμό από το όνομα της συσκευής. Το viewport δεν είναι το `screen.width`. Χρησιμοποιήστε τα scopes `screen` και `orientation` για αυτά.

Η αλλαγή του viewport αποστέλλεται στο top-level context που ήταν τρέχον όταν κλήθηκε το `emulate`. Η επαναφορά της συσκευής αλλάζει το μέγεθος αυτού του context, ακόμη και μετά από εναλλαγή σε άλλο παράθυρο.

Εάν το πρόγραμμα περιήγησης απορρίψει μία από αυτές τις εντολές, το προηγούμενο user agent, viewport, αφή, διάταξη κειμένου και viewport meta επανέρχονται και επιστρέφεται το σφάλμα. Ένα προσαρμοσμένο user agent ή μέγεθος `setViewport` δεν αντικαθίσταται με κάποια προεπιλογή.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// δοκιμάστε την εφαρμογή σας ...

// επαναφορά user agent, viewport, αφής, διάταξης κειμένου και viewport meta
await restore()
```

Το WebdriverIO διατηρεί μια σταθερή λίστα με [όλες τις καθορισμένες συσκευές](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).