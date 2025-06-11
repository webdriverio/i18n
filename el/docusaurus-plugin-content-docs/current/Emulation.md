---
id: emulation
title: Προσομοίωση
---

Με το WebdriverIO μπορείτε να προσομοιώσετε Web APIs χρησιμοποιώντας την εντολή [`emulate`](/docs/api/browser/emulate) για να επιστρέψετε προσαρμοσμένες τιμές που σας βοηθούν να προσομοιώσετε συγκεκριμένες συμπεριφορές του προγράμματος περιήγησης. Σημειώστε ότι αυτό απαιτεί η εφαρμογή σας να χρησιμοποιεί ρητά αυτά τα APIs.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Αυτή η λειτουργία απαιτεί υποστήριξη WebDriver Bidi για το πρόγραμμα περιήγησης. Ενώ οι πρόσφατες εκδόσεις των Chrome, Edge και Firefox έχουν τέτοια υποστήριξη, το Safari __δεν έχει__. Για ενημερώσεις ακολουθήστε το [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Επιπλέον, εάν χρησιμοποιείτε έναν πάροχο cloud για την εκκίνηση προγραμμάτων περιήγησης, βεβαιωθείτε ότι ο πάροχός σας υποστηρίζει επίσης το WebDriver Bidi.

Για να ενεργοποιήσετε το WebDriver Bidi για τη δοκιμή σας, βεβαιωθείτε ότι έχετε ορίσει `webSocketUrl: true` στις δυνατότητές σας.

:::

## Γεωτοποθεσία

Αλλάξτε τη γεωτοποθεσία του προγράμματος περιήγησης σε μια συγκεκριμένη περιοχή, π.χ.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Αυτό θα τροποποιήσει τον τρόπο λειτουργίας του [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) και θα επιστρέψει την τοποθεσία που παρέχετε εσείς.

## Χρωματικό Σχήμα

Αλλάξτε την προεπιλεγμένη ρύθμιση χρωματικού σχήματος του προγράμματος περιήγησης μέσω:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

Αυτό θα τροποποιήσει τον τρόπο συμπεριφοράς του [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) όταν ερωτάτε το χρωματικό σχήμα μέσω `(prefers-color-scheme: dark)`.

## User Agent

Αλλάξτε το user agent του προγράμματος περιήγησης σε διαφορετική συμβολοσειρά μέσω:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Αυτό θα αλλάξει την τιμή του [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Σημειώστε ότι οι προμηθευτές προγραμμάτων περιήγησης καταργούν σταδιακά το User Agent.

## Ιδιότητα onLine

Αλλάξτε την κατάσταση σύνδεσης του προγράμματος περιήγησης μέσω:

```ts
await browser.emulate('onLine', false)
```

Αυτό __δεν__ θα απενεργοποιήσει την κυκλοφορία δικτύου μεταξύ του προγράμματος περιήγησης και του διαδικτύου και αλλάζει μόνο την τιμή επιστροφής του [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Εάν ενδιαφέρεστε να τροποποιήσετε τις δυνατότητες δικτύου του προγράμματος περιήγησης, ανατρέξτε στην εντολή [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Ρολόι

Μπορείτε να τροποποιήσετε το ρολόι συστήματος του προγράμματος περιήγησης χρησιμοποιώντας την εντολή [`emulate`](/docs/emulation). Αντικαθιστά τις εγγενείς καθολικές συναρτήσεις που σχετίζονται με το χρόνο επιτρέποντάς τους να ελέγχονται συγχρόνως μέσω του `clock.tick()` ή του αντικειμένου clock που παράγεται. Αυτό περιλαμβάνει τον έλεγχο:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Το ρολόι ξεκινά από την εποχή unix (χρονική σήμανση 0). Αυτό σημαίνει ότι όταν δημιουργείτε νέα ημερομηνία στην εφαρμογή σας, θα έχει χρόνο 1η Ιανουαρίου 1970 εάν δεν περάσετε άλλες επιλογές στην εντολή `emulate`.

##### Παράδειγμα

Όταν καλείτε `browser.emulate('clock', { ... })` θα αντικαταστήσει αμέσως τις καθολικές συναρτήσεις για την τρέχουσα σελίδα καθώς και για όλες τις επόμενες σελίδες, π.χ.:

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

Μπορείτε να τροποποιήσετε την ώρα του συστήματος καλώντας [`setSystemTime`](/docs/api/clock/setSystemTime) ή [`tick`](/docs/api/clock/tick).

Το αντικείμενο `FakeTimerInstallOpts` μπορεί να έχει τις ακόλουθες ιδιότητες:

 ```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Συσκευή

Η εντολή `emulate` υποστηρίζει επίσης την προσομοίωση μιας συγκεκριμένης κινητής ή επιτραπέζιας συσκευής αλλάζοντας το viewport, τον συντελεστή κλίμακας της συσκευής και το user agent. Αυτό δεν πρέπει, σε καμία περίπτωση, να χρησιμοποιείται για δοκιμές σε κινητά, καθώς οι μηχανές προγραμμάτων περιήγησης σε επιτραπέζιους υπολογιστές διαφέρουν από αυτές των κινητών. Αυτό θα πρέπει να χρησιμοποιείται μόνο εάν η εφαρμογή σας προσφέρει μια συγκεκριμένη συμπεριφορά για μικρότερα μεγέθη viewport.

Για παράδειγμα, για να αλλάξετε το user agent και το viewport σε iPhone 15, απλά εκτελέστε:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

Το WebdriverIO διατηρεί μια σταθερή λίστα με [όλες τις καθορισμένες συσκευές](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).