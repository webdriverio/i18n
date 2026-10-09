---
id: multiremote
title: Multi-remote
description: "Ελέγξτε πολλαπλές συνεδρίες προγράμματος περιήγησης ή συσκευών από ένα μόνο τεστ με το multi-remote, σε αυτόνομη λειτουργία ή με το WDIO testrunner."
---

Το WebdriverIO σας επιτρέπει να εκτελείτε πολλαπλές αυτοματοποιημένες συνεδρίες σε ένα μόνο τεστ. Αυτό είναι χρήσιμο όταν δοκιμάζετε λειτουργίες που απαιτούν πολλούς χρήστες (για παράδειγμα, εφαρμογές συνομιλίας ή WebRTC).

Αντί να δημιουργείτε μερικά απομακρυσμένα instances όπου πρέπει να εκτελείτε κοινές εντολές όπως [`newSession`](/docs/api/webdriver#newsession) ή [`url`](/docs/api/browser/url) σε κάθε instance, μπορείτε απλώς να δημιουργήσετε ένα **multi-remote** instance και να ελέγχετε όλα τα προγράμματα περιήγησης ταυτόχρονα.

Για να το κάνετε αυτό, απλώς χρησιμοποιήστε τη συνάρτηση `multiRemote()` και περάστε ένα αντικείμενο με ονόματα ως κλειδιά και `capabilities` ως τιμές. Δίνοντας ένα όνομα σε κάθε capability, μπορείτε εύκολα να επιλέξετε και να αποκτήσετε πρόσβαση σε αυτό το μεμονωμένο instance όταν εκτελείτε εντολές σε ένα μόνο instance.

:::info

Το MultiRemote _δεν_ προορίζεται για την παράλληλη εκτέλεση όλων των τεστ σας.
Προορίζεται για να βοηθά στον συντονισμό πολλαπλών προγραμμάτων περιήγησης ή/και κινητών συσκευών για ειδικά τεστ ολοκλήρωσης (π.χ. εφαρμογές συνομιλίας).

:::

Οι περισσότερες εντολές multi-remote επιστρέφουν έναν πίνακα αποτελεσμάτων. Το πρώτο αποτέλεσμα αντιστοιχεί στο capability που ορίστηκε πρώτο στο αντικείμενο capabilities, το δεύτερο αποτέλεσμα στο δεύτερο capability, κ.ο.κ. Το `mock()` επιστρέφει ένα `MultiRemoteMock` αντί για πίνακα. Δείτε [Τι επιστρέφει το mock()](#what-mock-returns).

## Χρήση της αυτόνομης λειτουργίας

Ακολουθεί ένα παράδειγμα για το πώς να δημιουργήσετε ένα multi-remote instance σε __αυτόνομη λειτουργία__:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // άνοιγμα url και με τα δύο προγράμματα περιήγησης ταυτόχρονα
    await browser.url('http://json.org')

    // κλήση εντολών ταυτόχρονα
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // κλικ σε ένα στοιχείο ταυτόχρονα
    const elem = await browser.$('#someElem')
    await elem.click()

    // κλικ μόνο με ένα πρόγραμμα περιήγησης (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Χρήση του WDIO Testrunner

Για να χρησιμοποιήσετε το multi-remote στο WDIO testrunner, απλώς ορίστε το αντικείμενο `capabilities` στο `wdio.conf.js` σας ως αντικείμενο με τα ονόματα των προγραμμάτων περιήγησης ως κλειδιά (αντί για λίστα από capabilities):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

Αυτό θα δημιουργήσει δύο συνεδρίες WebDriver με Chrome και Firefox. Αντί για Chrome και Firefox, μπορείτε επίσης να εκκινήσετε δύο κινητές συσκευές χρησιμοποιώντας το [Appium](http://appium.io) ή μία κινητή συσκευή και ένα πρόγραμμα περιήγησης.

Μπορείτε επίσης να εκτελέσετε το multi-remote παράλληλα τοποθετώντας το αντικείμενο capabilities των προγραμμάτων περιήγησης σε έναν πίνακα. Βεβαιωθείτε ότι το πεδίο `capabilities` περιλαμβάνεται σε κάθε πρόγραμμα περιήγησης, καθώς με αυτόν τον τρόπο ξεχωρίζουμε κάθε λειτουργία.

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

Μπορείτε ακόμη να εκκινήσετε ένα από τα [backend υπηρεσιών cloud](https://webdriver.io/docs/cloudservices.html) μαζί με τοπικά instances Webdriver/Appium ή Selenium Standalone. Το WebdriverIO ανιχνεύει αυτόματα τα capabilities του cloud backend εάν έχετε καθορίσει είτε `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), είτε `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), είτε `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) στα capabilities του προγράμματος περιήγησης.

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

Οποιοσδήποτε συνδυασμός λειτουργικού συστήματος/προγράμματος περιήγησης είναι δυνατός εδώ (συμπεριλαμβανομένων προγραμμάτων περιήγησης για κινητά και υπολογιστές). Όλες οι εντολές που καλούν τα τεστ σας μέσω της μεταβλητής `browser` εκτελούνται παράλληλα σε κάθε instance. Αυτό βοηθά στην απλοποίηση των τεστ ολοκλήρωσης και στην επιτάχυνση της εκτέλεσής τους.

Για παράδειγμα, αν ανοίξετε ένα URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Το αποτέλεσμα κάθε εντολής θα είναι ένα αντικείμενο με τα ονόματα των προγραμμάτων περιήγησης ως κλειδιά και το αποτέλεσμα της εντολής ως τιμή, ως εξής:

```js
// παράδειγμα wdio testrunner
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // επιστρέφει: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // επιστρέφει: 'Firefox 35 on Mac OS X (Yosemite)'
```

Παρατηρήστε ότι κάθε εντολή εκτελείται η μία μετά την άλλη. Αυτό σημαίνει ότι η εντολή ολοκληρώνεται μόλις την έχουν εκτελέσει όλα τα προγράμματα περιήγησης. Αυτό είναι χρήσιμο επειδή διατηρεί τις ενέργειες των προγραμμάτων περιήγησης συγχρονισμένες, κάτι που διευκολύνει την κατανόηση του τι συμβαίνει τη δεδομένη στιγμή.

Μερικές φορές είναι απαραίτητο να κάνετε διαφορετικά πράγματα σε κάθε πρόγραμμα περιήγησης για να δοκιμάσετε κάτι. Για παράδειγμα, αν θέλουμε να δοκιμάσουμε μια εφαρμογή συνομιλίας, πρέπει να υπάρχει ένα πρόγραμμα περιήγησης που στέλνει ένα μήνυμα κειμένου ενώ ένα άλλο περιμένει να το λάβει, και στη συνέχεια να εκτελεστεί ένας έλεγχος (assertion) σε αυτό.

Όταν χρησιμοποιείτε το WDIO testrunner, αυτό καταχωρεί τα ονόματα των προγραμμάτων περιήγησης μαζί με τα instances τους στο global scope:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// αναμονή μέχρι να φτάσουν τα μηνύματα
await $('.messages').waitForExist()
// έλεγχος αν κάποιο από τα μηνύματα περιέχει το μήνυμα του Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

Σε αυτό το παράδειγμα, το instance `myFirefoxBrowser` θα αρχίσει να περιμένει ένα μήνυμα μόλις το instance `myChromeBrowser` κάνει κλικ στο κουμπί `#send`.

Το MultiRemote κάνει εύκολο και βολικό τον έλεγχο πολλαπλών προγραμμάτων περιήγησης, είτε θέλετε να κάνουν το ίδιο πράγμα παράλληλα είτε διαφορετικά πράγματα συντονισμένα.

### Τι επιστρέφει το `$`

Σε ένα multi-remote πρόγραμμα περιήγησης, τα `$`, `custom$` και `react$` επιστρέφουν ένα `MultiRemoteElement`. Σε ένα multi-remote στοιχείο, τα `shadow$`, `nextElement`, `previousElement` και `parentElement` επιστρέφουν επίσης ένα. Οι εντολές του εκτελούνται σε κάθε instance, και το `getInstance` δίνει το στοιχείο ενός προγράμματος περιήγησης.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // κλικ σε κάθε πρόγραμμα περιήγησης
await button.getInstance('myChromeBrowser').click()  // κλικ μόνο στο Chrome
```

### Τι επιστρέφει το `$$`

Σε ένα multi-remote πρόγραμμα περιήγησης, το `$$` επιστρέφει ένα `MultiRemoteElementArray`. Κάθε καταχώρηση είναι ένα `MultiRemoteElement` που απευθύνεται σε όλα τα instances ταυτόχρονα, και ο ίδιος ο πίνακας φέρει τις ίδιες πληροφορίες με ένα κανονικό `ElementArray`. Τα `custom$$`, `react$$` και, σε ένα multi-remote στοιχείο, το `shadow$$` επιστρέφουν το ίδιο είδος λίστας.

```js
const messages = await $$('.messages')

messages.length      // ο μεγαλύτερος αριθμός στοιχείων που βρήκε ένα instance
messages[0]          // ένα MultiRemoteElement, που απευθύνεται σε όλα τα instances
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // το multi-remote πρόγραμμα περιήγησης ή στοιχείο από το οποίο ανακτήθηκε
messages.isMultiRemote // true, ώστε να διακρίνεται από ένα απλό ElementArray

// οι ασύγχρονοι βοηθοί πινάκων είναι διαθέσιμοι, όπως σε ένα μεμονωμένο πρόγραμμα περιήγησης
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Όταν τα instances βρίσκουν διαφορετικό αριθμό στοιχείων, μια καταχώρηση δεν έχει στοιχείο για ένα instance που βρήκε λιγότερα. Για αυτό το instance, το `getInstance()` προκαλεί σφάλμα, και μια εντολή στην καταχώρηση αποτυγχάνει. Χρησιμοποιήστε το `select()` με τα instances που έχουν το στοιχείο. Ένας matcher `expect` σε ολόκληρη τη λίστα ελέγχει κάθε instance με τα δικά του στοιχεία:

```js
// το myChromeBrowser βρίσκει 3 μηνύματα, το myFirefoxBrowser βρίσκει 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // μόνο το Chrome έχει τρίτο μήνυμα
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Πριν από την έκδοση v10 αυτό επέστρεφε έναν απλό πίνακα, εκτός αν είχε οριστεί `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. Ο πίνακας είναι πλέον η προεπιλογή και η μεταβλητή περιβάλλοντος έχει αφαιρεθεί. Η πρόσβαση μέσω δείκτη παραμένει αμετάβλητη, οπότε ο κώδικας που διάβαζε μόνο το `elements[0]` συνεχίζει να λειτουργεί.

:::

### Τι επιστρέφει το mock() {#what-mock-returns}

Σε ένα multi-remote πρόγραμμα περιήγησης, το `mock()` επιστρέφει ένα `MultiRemoteMock`. Δεν είναι πίνακας. Το `respond()`, το `restore()` και οι υπόλοιπες μέθοδοι mock εκτελούνται σε κάθε instance. Τα αιτήματα που καταγράφονται παραμένουν στο mock του κάθε προγράμματος περιήγησης, οπότε διαβάστε τα με το `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

Το `examples/bidi/multiremote-mock.js` το εκτελεί αυτό σε δύο headless συνεδρίες Chrome.

Το `instances` ακολουθεί τη σειρά με την οποία δημιουργήθηκαν τα mocks. Μετά το `select()`, αυτή η σειρά μπορεί να διαφέρει από το `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // το mock του Chrome, ανεξάρτητα από τη σειρά
```

Το `getInstance` προκαλεί το σφάλμα `Multi-remote object has no instance named "<name>"` όταν το `name` δεν υπάρχει στο `instances`.

Για να κάνετε mock μόνο σε ένα πρόγραμμα περιήγησης, καλέστε το `mock()` σε εκείνο το instance:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Πρόσβαση σε instances προγραμμάτων περιήγησης με συμβολοσειρές μέσω του αντικειμένου browser
Εκτός από την πρόσβαση στο instance του προγράμματος περιήγησης μέσω των global μεταβλητών τους (π.χ. `myChromeBrowser`, `myFirefoxBrowser`), μπορείτε επίσης να αποκτήσετε πρόσβαση σε αυτά μέσω του αντικειμένου `browser`, π.χ. `browser["myChromeBrowser"]` ή `browser["myFirefoxBrowser"]`. Μπορείτε να λάβετε μια λίστα με όλα τα instances σας μέσω του `browser.instances`. Αυτό είναι ιδιαίτερα χρήσιμο όταν γράφετε επαναχρησιμοποιήσιμα βήματα τεστ που μπορούν να εκτελεστούν σε οποιοδήποτε πρόγραμμα περιήγησης, π.χ.:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Αρχείο Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Αρχείο ορισμού βημάτων:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Έλεγχοι (Assertions)

Οι matchers `expect` υποστηρίζουν multi-remote προγράμματα περιήγησης, στοιχεία και mocks. Από προεπιλογή, κάθε instance πρέπει να ταιριάζει με την αναμενόμενη τιμή:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Για να αναμένετε διαφορετική τιμή ανά instance, χρησιμοποιήστε το `expect.multiRemote()` με μία τιμή ανά όνομα instance:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Για όλους τους υποστηριζόμενους matchers και την απαιτούμενη διαμόρφωση, δείτε τον [οδηγό multi-remote του expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Πρόσβαση σε ένα instance

Τα ονόματα των instances δεν είναι ιδιότητες του multi-remote προγράμματος περιήγησης ή ενός multi-remote στοιχείου. Τα `browser.myChromeBrowser` και `elem.myChromeDriver` δεν ορίζονται. Ζητήστε τη συνεδρία με το `getInstance` ή περιορίστε το multi-remote αντικείμενο με το `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Το testrunner εξακολουθεί να αναθέτει κάθε όνομα instance ως ξεχωριστή global μεταβλητή όταν το `injectGlobals` παραμένει ενεργοποιημένο, έτσι ώστε ένα τεστ να μπορεί να καλέσει το `myChromeBrowser.$('button')` χωρίς να περάσει μέσα από το `browser`. Αυτή η global μεταβλητή είναι η μεμονωμένη συνεδρία από το `getInstance`, όχι ένα πεδίο στο multi-remote αντικείμενο.