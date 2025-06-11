---
id: multiremote
title: Πολλαπλές απομακρυσμένες συνδέσεις
---

Το WebdriverIO σας επιτρέπει να εκτελείτε πολλαπλές αυτοματοποιημένες συνεδρίες σε ένα μόνο τεστ. Αυτό είναι χρήσιμο όταν δοκιμάζετε λειτουργίες που απαιτούν πολλαπλούς χρήστες (για παράδειγμα, εφαρμογές συνομιλίας ή WebRTC).

Αντί να δημιουργείτε πολλές απομακρυσμένες εκδόσεις όπου χρειάζεται να εκτελείτε κοινές εντολές όπως [`newSession`](/docs/api/webdriver#newsession) ή [`url`](/docs/api/browser/url) σε κάθε περίπτωση, μπορείτε απλά να δημιουργήσετε μια **multiremote** περίπτωση και να ελέγχετε όλους τους browsers ταυτόχρονα.

Για να το κάνετε αυτό, απλά χρησιμοποιήστε τη συνάρτηση `multiremote()` και περάστε ένα αντικείμενο με ονόματα που αντιστοιχούν σε τιμές `capabilities`. Δίνοντας ένα όνομα σε κάθε δυνατότητα, μπορείτε εύκολα να επιλέξετε και να αποκτήσετε πρόσβαση σε αυτή τη συγκεκριμένη περίπτωση κατά την εκτέλεση εντολών σε μία μόνο περίπτωση.

:::info

Το Multiremote _δεν_ προορίζεται για την εκτέλεση όλων των δοκιμών σας παράλληλα.
Προορίζεται να βοηθήσει στο συντονισμό πολλαπλών προγραμμάτων περιήγησης ή/και κινητών συσκευών για ειδικές δοκιμές ολοκλήρωσης (π.χ. εφαρμογές συνομιλίας).

:::

Όλες οι περιπτώσεις multiremote επιστρέφουν έναν πίνακα αποτελεσμάτων. Το πρώτο αποτέλεσμα αντιπροσωπεύει τη δυνατότητα που ορίζεται πρώτη στο αντικείμενο δυνατότητας, το δεύτερο αποτέλεσμα τη δεύτερη δυνατότητα και ούτω καθεξής.

## Χρήση αυτόνομης λειτουργίας

Εδώ είναι ένα παράδειγμα για το πώς να δημιουργήσετε μια περίπτωση multiremote σε __αυτόνομη λειτουργία__:

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

Για να χρησιμοποιήσετε το multiremote στο WDIO testrunner, απλώς ορίστε το αντικείμενο `capabilities` στο `wdio.conf.js` ως αντικείμενο με τα ονόματα των προγραμμάτων περιήγησης ως κλειδιά (αντί για μια λίστα δυνατοτήτων):

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

Αυτό θα δημιουργήσει δύο συνεδρίες WebDriver με Chrome και Firefox. Αντί για Chrome και Firefox μπορείτε επίσης να εκκινήσετε δύο κινητές συσκευές χρησιμοποιώντας το [Appium](http://appium.io) ή μία κινητή συσκευή και ένα πρόγραμμα περιήγησης.

Μπορείτε επίσης να εκτελέσετε το multiremote παράλληλα τοποθετώντας το αντικείμενο δυνατοτήτων του προγράμματος περιήγησης σε έναν πίνακα. Παρακαλώ βεβαιωθείτε ότι έχετε συμπεριλάβει το πεδίο `capabilities` σε κάθε πρόγραμμα περιήγησης, καθώς έτσι διακρίνουμε κάθε λειτουργία.

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

Μπορείτε ακόμη να εκκινήσετε μία από τις [υπηρεσίες cloud](https://webdriver.io/docs/cloudservices.html) μαζί με τοπικές εκδόσεις Webdriver/Appium ή Selenium Standalone. Το WebdriverIO ανιχνεύει αυτόματα τις δυνατότητες του cloud backend εάν έχετε καθορίσει είτε το `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), ή `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) στις δυνατότητες του προγράμματος περιήγησης.

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

Είναι δυνατός οποιοσδήποτε συνδυασμός λειτουργικού συστήματος/προγράμματος περιήγησης (συμπεριλαμβανομένων των προγραμμάτων περιήγησης για κινητά και επιτραπέζιους υπολογιστές). Όλες οι εντολές που καλούν οι δοκιμές σας μέσω της μεταβλητής `browser` εκτελούνται παράλληλα με κάθε περίπτωση. Αυτό βοηθά στη βελτιστοποίηση των δοκιμών ολοκλήρωσης και στην επιτάχυνση της εκτέλεσής τους.

Για παράδειγμα, αν ανοίξετε ένα URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Το αποτέλεσμα κάθε εντολής θα είναι ένα αντικείμενο με τα ονόματα των προγραμμάτων περιήγησης ως κλειδί και το αποτέλεσμα της εντολής ως τιμή, όπως παρακάτω:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Παρατηρήστε ότι κάθε εντολή εκτελείται μία προς μία. Αυτό σημαίνει ότι η εντολή ολοκληρώνεται μόλις όλα τα προγράμματα περιήγησης την εκτελέσουν. Αυτό είναι χρήσιμο επειδή διατηρεί τις ενέργειες του προγράμματος περιήγησης συγχρονισμένες, γεγονός που διευκολύνει την κατανόηση του τι συμβαίνει αυτή τη στιγμή.

Μερικές φορές είναι απαραίτητο να κάνετε διαφορετικά πράγματα σε κάθε πρόγραμμα περιήγησης για να δοκιμάσετε κάτι. Για παράδειγμα, αν θέλουμε να δοκιμάσουμε μια εφαρμογή συνομιλίας, πρέπει να υπάρχει ένα πρόγραμμα περιήγησης που στέλνει ένα μήνυμα κειμένου ενώ ένα άλλο πρόγραμμα περιήγησης περιμένει να το λάβει και στη συνέχεια να εκτελέσει μια επιβεβαίωση σε αυτό.

Όταν χρησιμοποιείτε το WDIO testrunner, καταχωρεί τα ονόματα των προγραμμάτων περιήγησης με τις περιπτώσεις τους στο παγκόσμιο πεδίο:

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

Σε αυτό το παράδειγμα, η περίπτωση `myFirefoxBrowser` θα αρχίσει να περιμένει για ένα μήνυμα μόλις η περίπτωση `myChromeBrowser` κάνει κλικ στο κουμπί `#send`.

Το Multiremote καθιστά εύκολο και βολικό τον έλεγχο πολλαπλών προγραμμάτων περιήγησης, είτε θέλετε να κάνουν το ίδιο πράγμα παράλληλα, είτε διαφορετικά πράγματα σε συνδυασμό.

## Πρόσβαση σε περιπτώσεις προγράμματος περιήγησης χρησιμοποιώντας συμβολοσειρές μέσω του αντικειμένου browser
Εκτός από την πρόσβαση στην περίπτωση του προγράμματος περιήγησης μέσω των παγκόσμιων μεταβλητών τους (π.χ. `myChromeBrowser`, `myFirefoxBrowser`), μπορείτε επίσης να αποκτήσετε πρόσβαση σε αυτές μέσω του αντικειμένου `browser`, π.χ. `browser["myChromeBrowser"]` ή `browser["myFirefoxBrowser"]`. Μπορείτε να πάρετε μια λίστα με όλες τις περιπτώσεις σας μέσω του `browser.instances`. Αυτό είναι ιδιαίτερα χρήσιμο όταν γράφετε επαναχρησιμοποιήσιμα βήματα δοκιμών που μπορούν να εκτελεστούν σε οποιοδήποτε πρόγραμμα περιήγησης, π.χ.:

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

Αρχείο ορισμού βήματος:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Επέκταση Τύπων TypeScript

Εάν χρησιμοποιείτε TypeScript και θέλετε να αποκτήσετε πρόσβαση στο στιγμιότυπο του προγράμματος οδήγησης απευθείας από το αντικείμενο multiremote, μπορείτε επίσης να επεκτείνετε τους τύπους multiremote για να το κάνετε. Για παράδειγμα, δεδομένων των ακόλουθων δυνατοτήτων:

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

Μπορείτε να επεκτείνετε το στιγμιότυπο multiremote προσθέτοντας τα προσαρμοσμένα ονόματα προγραμμάτων οδήγησης, π.χ.:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Τώρα μπορείτε να αποκτήσετε πρόσβαση στα προγράμματα οδήγησης απευθείας μέσω, π.χ.:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```