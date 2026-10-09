---
id: visual-testing
title: Οπτικός Έλεγχος
description: "Συγκρίνετε στιγμιότυπα οθόνης από οθόνες, στοιχεία ή ολόκληρες σελίδες με εικόνες αναφοράς (baselines) μέσω του @wdio/visual-service, συμπεριλαμβανομένης της εγκατάστασης και της χρήσης."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Τι μπορεί να κάνει;

Το WebdriverIO παρέχει συγκρίσεις εικόνων σε οθόνες, στοιχεία ή ολόκληρη σελίδα για

-   🖥️ Desktop browsers (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Mobile / Tablet browsers (Chrome σε Android emulators / Safari σε iOS Simulators / Simulators / πραγματικές συσκευές) μέσω Appium
-   📱 Native Apps (Android emulators / iOS Simulators / πραγματικές συσκευές) μέσω Appium (🌟 **ΝΕΟ** 🌟)
-   📳 Hybrid apps μέσω Appium

μέσω του [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), το οποίο είναι ένα ελαφρύ service του WebdriverIO.

Αυτό σας επιτρέπει να:

-   αποθηκεύετε ή να συγκρίνετε **οθόνες/στοιχεία/ολόκληρες σελίδες** με μια εικόνα αναφοράς (baseline)
-   **δημιουργείτε αυτόματα μια baseline** όταν δεν υπάρχει
-   **αποκλείετε προσαρμοσμένες περιοχές** και ακόμη και να **εξαιρείτε αυτόματα** τη γραμμή κατάστασης ή/και τις γραμμές εργαλείων (μόνο για κινητά) κατά τη σύγκριση
-   αυξάνετε τις διαστάσεις των στιγμιότυπων των στοιχείων
-   **αποκρύπτετε κείμενο** κατά τη σύγκριση ιστοσελίδων ώστε να:
    -   **βελτιώσετε τη σταθερότητα** και να αποτρέψετε την αστάθεια στην απόδοση γραμματοσειρών
    -   εστιάσετε μόνο στη **διάταξη (layout)** μιας ιστοσελίδας
-   χρησιμοποιείτε **διαφορετικές μεθόδους σύγκρισης** και ένα σύνολο **πρόσθετων matchers** για πιο ευανάγνωστα tests
-   επαληθεύετε πώς η ιστοσελίδα σας θα **υποστηρίζει την πλοήγηση με το πλήκτρο Tab του πληκτρολογίου)**, δείτε επίσης [Πλοήγηση με Tab σε μια ιστοσελίδα](#tabbing-through-a-website)
-   και πολλά ακόμη, δείτε τις επιλογές του [service](./visual-testing/service-options) και των [μεθόδων](./visual-testing/method-options)

Το service είναι ένα ελαφρύ module για την ανάκτηση των απαραίτητων δεδομένων και στιγμιότυπων οθόνης για όλους τους browsers/συσκευές. Η δύναμη της σύγκρισης προέρχεται από το [Pixelmatch](https://github.com/mapbox/pixelmatch), μια γρήγορη και ακριβή βιβλιοθήκη αντιληπτικής σύγκρισης εικόνων που χρησιμοποιεί τον χρωματικό χώρο YIQ. Οι εικόνες επεξεργάζονται με το [fast-png](https://github.com/image-js/fast-png), έναν PNG codec χωρίς native εξαρτήσεις.

:::info ΣΗΜΕΙΩΣΗ Για Native/Hybrid Apps
Οι μέθοδοι `saveScreen`, `saveElement`, `checkScreen`, `checkElement` και οι matchers `toMatchScreenSnapshot` και `toMatchElementSnapshot` μπορούν να χρησιμοποιηθούν για Native Apps/Context.

Χρησιμοποιήστε την ιδιότητα `isHybridApp:true` στις ρυθμίσεις του service όταν θέλετε να το χρησιμοποιήσετε για Hybrid Apps.
:::

:::caution Αναβάθμιση από v9 (ή παλαιότερη);

Το `@wdio/visual-service` **v10** άλλαξε τη μηχανή σύγκρισης από **ResembleJS** σε **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Το Pixelmatch χρησιμοποιεί ένα αντιληπτικό (YIQ) χρωματικό μοντέλο αντί για ακατέργαστο RGB, οπότε τα ποσοστά απόκλισης θα διαφέρουν από την v9. Αυτό σημαίνει:

-   **Ο κώδικας των tests σας δεν χρειάζεται να αλλάξει.** Όλα τα ονόματα μεθόδων, τα ονόματα επιλογών και οι matchers παραμένουν ίδια.
-   **Οι εικόνες baseline σας ίσως χρειαστεί να ενημερωθούν.** Μετά την αναβάθμιση, εκτελέστε τη σουίτα tests σας και ελέγξτε τυχόν οπτικές διαφορές. Μπορείτε να ενημερώσετε μεμονωμένες baselines που αποτυγχάνουν με το `--update-visual-baseline` ή να διαγράψετε ολόκληρο τον φάκελο baseline και να αφήσετε το `autoSaveBaseline` να τον δημιουργήσει ξανά από την αρχή. Δείτε τις [Συχνές Ερωτήσεις](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) για λεπτομέρειες.

:::

## Εγκατάσταση

Ο ευκολότερος τρόπος είναι να διατηρήσετε το `@wdio/visual-service` ως dev-dependency στο `package.json` σας, μέσω:

```sh
npm install --save-dev @wdio/visual-service
```

## Χρήση

Το `@wdio/visual-service` μπορεί να χρησιμοποιηθεί ως ένα κανονικό service. Μπορείτε να το ρυθμίσετε στο αρχείο διαμόρφωσής σας με τον εξής τρόπο:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Μερικές επιλογές, δείτε την τεκμηρίωση για περισσότερες
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... περισσότερες επιλογές
            },
        ],
    ],
    // ...
};
```

Περισσότερες επιλογές του service μπορείτε να βρείτε [εδώ](/docs/visual-testing/service-options).

Μόλις το ρυθμίσετε στη διαμόρφωση του WebdriverIO, μπορείτε να προχωρήσετε στην προσθήκη οπτικών assertions στα [tests σας](/docs/visual-testing/writing-tests).

### Capabilities
Για να χρησιμοποιήσετε το module Οπτικού Ελέγχου, **δεν χρειάζεται να προσθέσετε επιπλέον επιλογές στα capabilities σας**. Ωστόσο, σε ορισμένες περιπτώσεις, μπορεί να θέλετε να προσθέσετε επιπλέον μεταδεδομένα στα οπτικά σας tests, όπως ένα `logName`.

Το `logName` σας επιτρέπει να αναθέσετε ένα προσαρμοσμένο όνομα σε κάθε capability, το οποίο μπορεί στη συνέχεια να συμπεριληφθεί στα ονόματα αρχείων των εικόνων. Αυτό είναι ιδιαίτερα χρήσιμο για τη διάκριση στιγμιότυπων οθόνης που λήφθηκαν σε διαφορετικούς browsers, συσκευές ή διαμορφώσεις.

Για να το ενεργοποιήσετε, μπορείτε να ορίσετε το `logName` στην ενότητα `capabilities` και να βεβαιωθείτε ότι η επιλογή `formatImageName` στο service Οπτικού Ελέγχου αναφέρεται σε αυτό. Δείτε πώς μπορείτε να το ρυθμίσετε:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Προσαρμοσμένο όνομα log για το Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Προσαρμοσμένο όνομα log για το Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Μερικές επιλογές, δείτε την τεκμηρίωση για περισσότερες
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Η παρακάτω μορφή θα χρησιμοποιήσει το `logName` από τα capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... περισσότερες επιλογές
            },
        ],
    ],
    // ...
};
```

#### Πώς λειτουργεί
1. Ρύθμιση του `logName`:

    - Στην ενότητα `capabilities`, αναθέστε ένα μοναδικό `logName` σε κάθε browser ή συσκευή. Για παράδειγμα, το `chrome-mac-15` προσδιορίζει tests που εκτελούνται στο Chrome σε macOS έκδοση 15.

2. Προσαρμοσμένη Ονοματοδοσία Εικόνων:

    - Η επιλογή `formatImageName` ενσωματώνει το `logName` στα ονόματα αρχείων των στιγμιότυπων. Για παράδειγμα, αν το `tag` είναι homepage και η ανάλυση είναι `1920x1080`, το όνομα αρχείου που προκύπτει μπορεί να μοιάζει έτσι:

        `homepage-chrome-mac-15-1920x1080.png`

3. Οφέλη της Προσαρμοσμένης Ονοματοδοσίας:

    - Η διάκριση μεταξύ στιγμιότυπων από διαφορετικούς browsers ή συσκευές γίνεται πολύ ευκολότερη, ειδικά κατά τη διαχείριση των baselines και την αποσφαλμάτωση αποκλίσεων.

4. Σημείωση για τις Προεπιλογές:

    -Αν το `logName` δεν έχει οριστεί στα capabilities, η επιλογή `formatImageName` θα το εμφανίσει ως κενή συμβολοσειρά στα ονόματα αρχείων (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Υποστηρίζουμε επίσης το [multi-remote](https://webdriver.io/docs/multiremote/). Για να λειτουργήσει σωστά, βεβαιωθείτε ότι προσθέτετε το `wdio-ics:options` στα
capabilities σας, όπως βλέπετε παρακάτω. Αυτό θα διασφαλίσει ότι κάθε στιγμιότυπο οθόνης θα έχει το δικό του μοναδικό όνομα.

Η [συγγραφή των tests σας](/docs/visual-testing/writing-tests) δεν θα διαφέρει σε σύγκριση με τη χρήση του [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ΑΥΤΟ!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ΑΥΤΟ!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Προγραμματική Εκτέλεση

Ακολουθεί ένα ελάχιστο παράδειγμα χρήσης του `@wdio/visual-service` μέσω των επιλογών `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Εκκινήστε" το service για να προσθέσετε τις προσαρμοσμένες εντολές στο `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// ή χρησιμοποιήστε αυτό ΜΟΝΟ για αποθήκευση ενός στιγμιότυπου οθόνης
await browser.saveFullPageScreen("examplePaged", {});

// ή χρησιμοποιήστε αυτό για επαλήθευση. Οι δύο μέθοδοι δεν χρειάζεται να συνδυαστούν, δείτε τις Συχνές Ερωτήσεις
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Πλοήγηση με Tab σε μια ιστοσελίδα

Μπορείτε να ελέγξετε αν μια ιστοσελίδα είναι προσβάσιμη χρησιμοποιώντας το πλήκτρο <kbd>TAB</kbd> του πληκτρολογίου. Ο έλεγχος αυτού του τμήματος της προσβασιμότητας ήταν πάντα μια χρονοβόρα (χειροκίνητη) εργασία και αρκετά δύσκολη να γίνει μέσω αυτοματοποίησης.
Με τις μεθόδους `saveTabbablePage` και `checkTabbablePage`, μπορείτε πλέον να σχεδιάσετε γραμμές και κουκκίδες στην ιστοσελίδα σας για να επαληθεύσετε τη σειρά πλοήγησης με Tab.

Έχετε υπόψη ότι αυτό είναι χρήσιμο μόνο για desktop browsers και **ΟΧΙ\*\*** για κινητές συσκευές. Όλοι οι desktop browsers υποστηρίζουν αυτή τη λειτουργία.

:::note

Η εργασία είναι εμπνευσμένη από την ανάρτηση του [Viv Richards](https://github.com/vivrichards600) στο ιστολόγιό του σχετικά με το ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Ο τρόπος με τον οποίο επιλέγονται τα στοιχεία που υποστηρίζουν Tab βασίζεται στο module [tabbable](https://github.com/davidtheclark/tabbable). Αν υπάρχουν προβλήματα σχετικά με την πλοήγηση με Tab, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ιδιαίτερα την ενότητα [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Πώς λειτουργεί

Και οι δύο μέθοδοι θα δημιουργήσουν ένα στοιχείο `canvas` στην ιστοσελίδα σας και θα σχεδιάσουν γραμμές και κουκκίδες για να σας δείξουν πού θα πήγαινε το TAB αν το χρησιμοποιούσε ένας τελικός χρήστης. Στη συνέχεια, θα δημιουργήσουν ένα στιγμιότυπο ολόκληρης της σελίδας για να σας δώσουν μια καλή επισκόπηση της ροής.

:::important

**Χρησιμοποιήστε το `saveTabbablePage` μόνο όταν χρειάζεται να δημιουργήσετε ένα στιγμιότυπο οθόνης και ΔΕΝ θέλετε να το συγκρίνετε **με μια εικόνα **baseline**.\*\*\*\*

:::

Όταν θέλετε να συγκρίνετε τη ροή πλοήγησης με Tab με μια baseline, μπορείτε να χρησιμοποιήσετε τη μέθοδο `checkTabbablePage`. **ΔΕΝ** χρειάζεται να χρησιμοποιήσετε τις δύο μεθόδους μαζί. Αν υπάρχει ήδη μια εικόνα baseline, κάτι που μπορεί να γίνει αυτόματα παρέχοντας `autoSaveBaseline: true` κατά την αρχικοποίηση του service,
το `checkTabbablePage` θα δημιουργήσει πρώτα την _πραγματική_ εικόνα και στη συνέχεια θα τη συγκρίνει με τη baseline.

##### Επιλογές

Και οι δύο μέθοδοι χρησιμοποιούν τις ίδιες επιλογές με το `saveFullPageScreen` ή το `compareFullPageScreen`.

#### Παράδειγμα

Αυτό είναι ένα παράδειγμα του πώς λειτουργεί η πλοήγηση με Tab στην [ιστοσελίδα πειραματόζωο (guinea pig)](https://guinea-pig.webdriver.io/image-compare.html) μας:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Αυτόματη ενημέρωση αποτυχημένων Οπτικών Snapshots

Ενημερώστε τις εικόνες baseline μέσω της γραμμής εντολών προσθέτοντας το όρισμα `--update-visual-baseline`. Αυτό θα

-   αντιγράψει αυτόματα το πραγματικό στιγμιότυπο που λήφθηκε και θα το τοποθετήσει στον φάκελο baseline
-   αν υπάρχουν διαφορές, θα αφήσει το test να περάσει επειδή η baseline έχει ενημερωθεί

**Χρήση:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Όταν εκτελείτε με logs σε λειτουργία info/debug, θα δείτε να προστίθενται τα ακόλουθα logs

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Υποστήριξη Typescript

Αυτό το module περιλαμβάνει υποστήριξη TypeScript, επιτρέποντάς σας να επωφεληθείτε από την αυτόματη συμπλήρωση, την ασφάλεια τύπων και τη βελτιωμένη εμπειρία προγραμματιστή κατά τη χρήση του service Οπτικού Ελέγχου.

### Βήμα 1: Προσθήκη Ορισμών Τύπων
Για να διασφαλίσετε ότι το TypeScript αναγνωρίζει τους τύπους του module, προσθέστε την ακόλουθη καταχώριση στο πεδίο types του tsconfig.json σας:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Βήμα 2: Ενεργοποίηση Ασφάλειας Τύπων για τις Επιλογές του Service
Για να επιβάλετε έλεγχο τύπων στις επιλογές του service, ενημερώστε τη διαμόρφωση του WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Εισαγωγή του ορισμού τύπου
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Επιλογές του service
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Διασφαλίζει την ασφάλεια τύπων
        ],
    ],
    // ...
};
```

## Απαιτήσεις Συστήματος

### Έκδοση 10 και νεότερες (τρέχουσα)

Για την έκδοση 10 και νεότερες, αυτό το module δεν έχει πρόσθετες εξαρτήσεις συστήματος πέρα από τις γενικές [απαιτήσεις του έργου](/docs/gettingstarted#system-requirements). Χρησιμοποιεί το [Pixelmatch](https://github.com/mapbox/pixelmatch) για αντιληπτική σύγκριση εικόνων και το [fast-png](https://github.com/image-js/fast-png) για κωδικοποίηση/αποκωδικοποίηση εικόνων. Και τα δύο είναι καθαρή JavaScript χωρίς native εξαρτήσεις.

### Έκδοση 5 έως 9 (παλαιότερες)

Οι εκδόσεις 5 έως 9 χρησιμοποιούσαν το [Jimp](https://github.com/jimp-dev/jimp), μια βιβλιοθήκη επεξεργασίας εικόνων για Node γραμμένη εξ ολοκλήρου σε JavaScript, χωρίς native εξαρτήσεις. Δεν απαιτούνταν πρόσθετες εξαρτήσεις συστήματος.

### Έκδοση 4 και Παλαιότερες

Για την έκδοση 4 και παλαιότερες, αυτό το module βασίζεται στο [Canvas](https://github.com/Automattic/node-canvas), μια υλοποίηση canvas για το Node.js. Το Canvas εξαρτάται από το [Cairo](https://cairographics.org/).

#### Λεπτομέρειες Εγκατάστασης

Από προεπιλογή, τα binaries για macOS, Linux και Windows θα ληφθούν κατά την εκτέλεση του `npm install` του έργου σας. Αν δεν έχετε υποστηριζόμενο λειτουργικό σύστημα ή αρχιτεκτονική επεξεργαστή, το module θα μεταγλωττιστεί στο σύστημά σας. Αυτό απαιτεί αρκετές εξαρτήσεις, συμπεριλαμβανομένων των Cairo και Pango.

Για λεπτομερείς πληροφορίες εγκατάστασης, δείτε το [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Παρακάτω υπάρχουν οδηγίες εγκατάστασης μίας γραμμής για συνηθισμένα λειτουργικά συστήματα. Σημειώστε ότι τα `libgif/giflib`, `librsvg` και `libjpeg` είναι προαιρετικά και χρειάζονται μόνο για υποστήριξη GIF, SVG και JPEG, αντίστοιχα. Απαιτείται Cairo v1.10.0 ή νεότερη.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Χρησιμοποιώντας το [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Αν ενημερώσατε πρόσφατα σε Mac OS X v10.11+ και αντιμετωπίζετε προβλήματα κατά τη μεταγλώττιση, εκτελέστε την ακόλουθη εντολή: `xcode-select --install`. Διαβάστε περισσότερα για το πρόβλημα [στο Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Αν έχετε εγκατεστημένο Xcode 10.0 ή νεότερο, για να κάνετε build από τον πηγαίο κώδικα χρειάζεστε NPM 6.4.1 ή νεότερο.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Δείτε το [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Δείτε το [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>