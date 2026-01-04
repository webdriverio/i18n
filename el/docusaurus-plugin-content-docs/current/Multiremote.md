---
id: multiremote
title: Multiremote
---

Το WebdriverIO σας επιτρέπει να εκτελείτε πολλαπλές αυτοματοποιημένες συνεδρίες σε ένα μόνο τεστ. Αυτό είναι χρήσιμο όταν δοκιμάζετε λειτουργίες που απαιτούν πολλούς χρήστες (για παράδειγμα, εφαρμογές συνομιλίας ή εφαρμογές WebRTC).

Αντί να δημιουργείτε ζευγάρια απομακρυσμένων στιγμιοτύπων όπου χρειάζεται να εκτελείτε κοινές εντολές όπως [`newSession`](/docs/api/webdriver#newsession) ή [`url`](/docs/api/browser/url) σε κάθε στιγμιότυπο, μπορείτε απλά να δημιουργήσετε ένα στιγμιότυπο **multiremote** και να ελέγχετε όλους τους περιηγητές ταυτόχρονα.

Για να το κάνετε αυτό, απλώς χρησιμοποιήστε τη συνάρτηση `multiremote()` και περάστε ένα αντικείμενο με ονόματα ως κλειδιά και `capabilities` ως τιμές. Δίνοντας σε κάθε δυνατότητα ένα όνομα, μπορείτε εύκολα να επιλέξετε και να αποκτήσετε πρόσβαση σε αυτό το συγκεκριμένο στιγμιότυπο κατά την εκτέλεση εντολών σε ένα μόνο στιγμιότυπο.

:::info

Το Multiremote _δεν_ προορίζεται για την εκτέλεση όλων των δοκιμών σας παράλληλα.
Προορίζεται να βοηθήσει στον συντονισμό πολλαπλών περιηγητών ή/και κινητών συσκευών για ειδικές δοκιμές ενσωμάτωσης (π.χ. εφαρμογές συνομιλίας).

:::

Όλα τα στιγμιότυπα multiremote επιστρέφουν έναν πίνακα αποτελεσμάτων. Το πρώτο αποτέλεσμα αντιπροσωπεύει την ικανότητα που ορίστηκε πρώτη στο αντικείμενο ικανοτήτων, το δεύτερο αποτέλεσμα τη δεύτερη ικανότητα και ούτω καθεξής.

## Χρήση της Αυτόνομης Λειτουργίας

Ακολουθεί ένα παράδειγμα για το πώς να δημιουργήσετε ένα στιγμιότυπο multiremote σε __αυτόνομη λειτουργία__:

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Χρήση του WDIO Testrunner

Για να χρησιμοποιήσετε το multiremote στον WDIO testrunner, απλώς ορίστε το αντικείμενο `capabilities` στο `wdio.conf.js` ως ένα αντικείμενο με τα ονόματα των περιηγητών ως κλειδιά (αντί για μια λίστα ικανοτήτων):

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

Αυτό θα δημιουργήσει δύο συνεδρίες WebDriver με Chrome και Firefox. Αντί μόνο για Chrome και Firefox μπορείτε επίσης να εκκινήσετε δύο κινητές συσκευές χρησιμοποιώντας το [Appium](http://appium.io) ή μία κινητή συσκευή και έναν περιηγητή.

Μπορείτε επίσης να εκτελέσετε multiremote παράλληλα τοποθετώντας το αντικείμενο ικανοτήτων περιηγητή σε έναν πίνακα. Βεβαιωθείτε ότι έχετε συμπεριλάβει το πεδίο `capabilities` σε κάθε περιηγητή, καθώς έτσι διαχωρίζουμε κάθε λειτουργία.

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

Μπορείτε ακόμη να εκκινήσετε μια από τις [υπηρεσίες νέφους](https://webdriver.io/docs/cloudservices.html) μαζί με τοπικά στιγμιότυπα Webdriver/Appium ή Selenium Standalone. Το WebdriverIO ανιχνεύει αυτόματα τις δυνατότητες backend νέφους αν έχετε καθορίσει είτε `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), ή `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) στις ικανότητες του περιηγητή.

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

Οποιοσδήποτε συνδυασμός λειτουργικού συστήματος/περιηγητή είναι δυνατός εδώ (συμπεριλαμβανομένων των περιηγητών για κινητά και υπολογιστές). Όλες οι εντολές που καλούν οι δοκιμές σας μέσω της μεταβλητής `browser` εκτελούνται παράλληλα με κάθε στιγμιότυπο. Αυτό βοηθά στον εξορθολογισμό των δοκιμών ενσωμάτωσης και στην επιτάχυνση της εκτέλεσής τους.

Για παράδειγμα, αν ανοίξετε ένα URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Το αποτέλεσμα κάθε εντολής θα είναι ένα αντικείμενο με τα ονόματα των περιηγητών ως κλειδί και το αποτέλεσμα της εντολής ως τιμή, όπως:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Σημειώστε ότι κάθε εντολή εκτελείται μία προς μία. Αυτό σημαίνει ότι η εντολή ολοκληρώνεται μόλις όλοι οι περιηγητές την έχουν εκτελέσει. Αυτό είναι χρήσιμο επειδή διατηρεί τις ενέργειες του περιηγητή συγχρονισμένες, γεγονός που διευκολύνει την κατανόηση του τι συμβαίνει αυτή τη στιγμή.

Μερικές φορές είναι απαραίτητο να κάνετε διαφορετικά πράγματα σε κάθε περιηγητή για να δοκιμάσετε κάτι. Για παράδειγμα, εάν θέλουμε να δοκιμάσουμε μια εφαρμογή συνομιλίας, πρέπει να υπάρχει ένας περιηγητής που στέλνει ένα μήνυμα κειμένου ενώ ένας άλλος περιηγητής περιμένει να το λάβει και, στη συνέχεια, να εκτελέσει μια επιβεβαίωση σε αυτό.

Όταν χρησιμοποιείτε τον WDIO testrunner, καταχωρεί τα ονόματα των περιηγητών με τα στιγμιότυπά τους στο παγκόσμιο περιβάλλον:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

Στο παράδειγμα αυτό, το στιγμιότυπο `myFirefoxBrowser` θα αρχίσει να περιμένει ένα μήνυμα αφού το στιγμιότυπο `myChromeBrowser` έχει κάνει κλικ στο κουμπί `#send`.

Το Multiremote κάνει εύκολο και βολικό τον έλεγχο πολλαπλών περιηγητών, είτε θέλετε να κάνουν το ίδιο πράγμα παράλληλα, είτε διαφορετικά πράγματα συντονισμένα.

## Πρόσβαση σε στιγμιότυπα περιηγητών χρησιμοποιώντας συμβολοσειρές μέσω του αντικειμένου browser
Εκτός από την πρόσβαση στο στιγμιότυπο του περιηγητή μέσω των καθολικών μεταβλητών τους (π.χ. `myChromeBrowser`, `myFirefoxBrowser`), μπορείτε επίσης να αποκτήσετε πρόσβαση σε αυτά μέσω του αντικειμένου `browser`, π.χ. `browser["myChromeBrowser"]` ή `browser["myFirefoxBrowser"]`. Μπορείτε να πάρετε μια λίστα με όλα τα στιγμιότυπά σας μέσω του `browser.instances`. Αυτό είναι ιδιαίτερα χρήσιμο όταν γράφετε επαναχρησιμοποιούμενα βήματα δοκιμών που μπορούν να εκτελεστούν σε οποιονδήποτε περιηγητή, π.χ.:

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

Cucumber file:
    ```feature
    When User A types a message into the chat
    ```

Step definition file:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Επέκταση Τύπων TypeScript

Αν χρησιμοποιείτε TypeScript και θέλετε να αποκτήσετε πρόσβαση στο στιγμιότυπο του driver απευθείας από το αντικείμενο multiremote, μπορείτε επίσης να επεκτείνετε τους τύπους multiremote για να το κάνετε. Για παράδειγμα, με τις ακόλουθες δυνατότητες:

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

Μπορείτε να επεκτείνετε το στιγμιότυπο multiremote προσθέτοντας τα προσαρμοσμένα ονόματα των οδηγών σας, π.χ.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Τώρα μπορείτε να αποκτήσετε πρόσβαση στους οδηγούς απευθείας μέσω, π.χ.:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```