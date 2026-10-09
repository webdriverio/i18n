---
id: snapshot
title: Στιγμιότυπα
description: "Επαληθεύστε αντικείμενα, δομές DOM και αποτελέσματα εντολών με τεστ στιγμιότυπων και ενσωματωμένων στιγμιότυπων, και συγκρίνετε οπτικά στιγμιότυπα."
---

Τα τεστ στιγμιότυπων (snapshot tests) μπορούν να είναι πολύ χρήσιμα για την επαλήθευση ενός ευρέος φάσματος πτυχών του component ή της λογικής σας ταυτόχρονα. Στο WebdriverIO μπορείτε να λάβετε στιγμιότυπα οποιουδήποτε αυθαίρετου αντικειμένου, καθώς και της δομής DOM ενός WebElement ή των αποτελεσμάτων εντολών του WebdriverIO.

Όπως και άλλα frameworks δοκιμών, το WebdriverIO θα λάβει ένα στιγμιότυπο της δεδομένης τιμής και στη συνέχεια θα το συγκρίνει με ένα αρχείο στιγμιότυπου αναφοράς που είναι αποθηκευμένο δίπλα στο τεστ. Το τεστ θα αποτύχει αν τα δύο στιγμιότυπα δεν ταιριάζουν: είτε η αλλαγή είναι απρόσμενη, είτε το στιγμιότυπο αναφοράς πρέπει να ενημερωθεί στη νέα έκδοση του αποτελέσματος.

:::info Υποστήριξη Πολλαπλών Πλατφορμών

Αυτές οι δυνατότητες στιγμιότυπων είναι διαθέσιμες τόσο για την εκτέλεση end-to-end τεστ στο περιβάλλον Node.js, όσο και για την εκτέλεση τεστ [μονάδων και components](/docs/component-testing) στον browser ή σε κινητές συσκευές.

:::

## Χρήση Στιγμιότυπων
Για να λάβετε στιγμιότυπο μιας τιμής, μπορείτε να χρησιμοποιήσετε το `toMatchSnapshot()` από το API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Την πρώτη φορά που εκτελείται αυτό το τεστ, το WebdriverIO δημιουργεί ένα αρχείο στιγμιότυπου που μοιάζει με αυτό:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Το αρχείο στιγμιότυπου θα πρέπει να γίνεται commit μαζί με τις αλλαγές του κώδικα και να ελέγχεται ως μέρος της διαδικασίας code review. Σε επόμενες εκτελέσεις των τεστ, το WebdriverIO θα συγκρίνει την παραγόμενη έξοδο με το προηγούμενο στιγμιότυπο. Αν ταιριάζουν, το τεστ θα περάσει. Αν δεν ταιριάζουν, είτε ο test runner εντόπισε ένα σφάλμα στον κώδικά σας που πρέπει να διορθωθεί, είτε η υλοποίηση έχει αλλάξει και το στιγμιότυπο πρέπει να ενημερωθεί.

Για να ενημερώσετε το στιγμιότυπο, περάστε το flag `-s` (ή `--updateSnapshot`) στην εντολή `wdio`, π.χ.:

```sh
npx wdio run wdio.conf.js -s
```

__Σημείωση:__ αν εκτελείτε τεστ με πολλούς browsers παράλληλα, δημιουργείται μόνο ένα στιγμιότυπο, με το οποίο γίνεται η σύγκριση. Αν θέλετε να έχετε ξεχωριστό στιγμιότυπο ανά capability, παρακαλούμε [ανοίξτε ένα issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) και ενημερώστε μας για την περίπτωση χρήσης σας.

## Ενσωματωμένα Στιγμιότυπα

Παρομοίως, μπορείτε να χρησιμοποιήσετε το `toMatchInlineSnapshot()` για να αποθηκεύσετε το στιγμιότυπο ενσωματωμένο μέσα στο αρχείο του τεστ.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Αντί να δημιουργήσει ένα αρχείο στιγμιότυπου, το Vitest θα τροποποιήσει απευθείας το αρχείο του τεστ για να ενημερώσει το στιγμιότυπο ως string:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Αυτό σας επιτρέπει να βλέπετε την αναμενόμενη έξοδο απευθείας, χωρίς να μεταβαίνετε σε διαφορετικά αρχεία.

## Οπτικά Στιγμιότυπα

Η λήψη στιγμιότυπου DOM ενός στοιχείου μπορεί να μην είναι η καλύτερη ιδέα, ειδικά αν η δομή DOM είναι πολύ μεγάλη και περιέχει δυναμικές ιδιότητες στοιχείων. Σε αυτές τις περιπτώσεις, συνιστάται να βασίζεστε σε οπτικά στιγμιότυπα για τα στοιχεία.

Για να ενεργοποιήσετε τα οπτικά στιγμιότυπα, προσθέστε το `@wdio/visual-service` στη διαμόρφωσή σας. Μπορείτε να ακολουθήσετε τις οδηγίες εγκατάστασης στην [τεκμηρίωση](/docs/visual-testing#installation) για τον Οπτικό Έλεγχο.

Στη συνέχεια, μπορείτε να λάβετε ένα οπτικό στιγμιότυπο μέσω του `toMatchElementSnapshot()`, π.χ.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Στη συνέχεια, μια εικόνα αποθηκεύεται στον κατάλογο baseline. Ανατρέξτε στον [Οπτικό Έλεγχο](/docs/visual-testing) για περισσότερες πληροφορίες.