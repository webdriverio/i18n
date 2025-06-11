---
id: visual-testing
title: Οπτικός Έλεγχος
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Τι μπορεί να κάνει;

Το WebdriverIO παρέχει συγκρίσεις εικόνων σε οθόνες, στοιχεία ή ολόκληρη σελίδα για

-   🖥️ Επιτραπέζιους περιηγητές (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Κινητά / Tablet περιηγητές (Chrome σε Android emulators / Safari σε iOS Simulators / Simulators / πραγματικές συσκευές) μέσω Appium
-   📱 Native Εφαρμογές (Android emulators / iOS Simulators / πραγματικές συσκευές) μέσω Appium (🌟 **ΝΕΟ** 🌟)
-   📳 Υβριδικές εφαρμογές μέσω Appium

μέσω του [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) το οποίο είναι μια ελαφριά υπηρεσία WebdriverIO.

Αυτό σας επιτρέπει να:

-   αποθηκεύσετε ή να συγκρίνετε **οθόνες/στοιχεία/πλήρεις οθόνες σελίδας** με ένα σημείο αναφοράς
-   δημιουργήσετε αυτόματα **σημείο αναφοράς** όταν δεν υπάρχει ήδη
-   **αποκλείσετε συγκεκριμένες περιοχές** και ακόμη **αυτόματα να εξαιρέσετε** μια γραμμή κατάστασης ή/και γραμμές εργαλείων (μόνο κινητές συσκευές) κατά τη σύγκριση
-   αυξήσετε τις διαστάσεις των στιγμιότυπων οθόνης στοιχείων
-   **αποκρύψετε κείμενο** κατά τη σύγκριση ιστοσελίδας για:
    -   **βελτίωση της σταθερότητας** και αποτροπή της αστάθειας στην απόδοση γραμματοσειρών
    -   εστίαση μόνο στη **διάταξη** μιας ιστοσελίδας
-   χρησιμοποιήσετε **διαφορετικές μεθόδους σύγκρισης** και ένα σύνολο **πρόσθετων matchers** για καλύτερα αναγνώσιμες δοκιμές
-   επαληθεύσετε πώς ο ιστότοπός σας θα **υποστηρίζει την περιήγηση με το πληκτρολόγιο)**, δείτε επίσης [Περιήγηση σε ιστοσελίδα με το tab](#tabbing-through-a-website)
-   και πολλά άλλα, δείτε τις επιλογές [υπηρεσίας](./visual-testing/service-options) και [μεθόδου](./visual-testing/method-options)

Η υπηρεσία είναι ένα ελαφρύ module για την ανάκτηση των απαραίτητων δεδομένων και στιγμιότυπων οθόνης για όλους τους περιηγητές/συσκευές. Η δύναμη σύγκρισης προέρχεται από το [ResembleJS](https://github.com/Huddle/Resemble.js). Αν θέλετε να συγκρίνετε εικόνες online μπορείτε να ελέγξετε το [online εργαλείο](http://rsmbl.github.io/Resemble.js/).

:::info ΣΗΜΕΙΩΣΗ Για Native/Hybrid Εφαρμογές
Οι μέθοδοι `saveScreen`, `saveElement`, `checkScreen`, `checkElement` και οι matchers `toMatchScreenSnapshot` και `toMatchElementSnapshot` μπορούν να χρησιμοποιηθούν για Native Εφαρμογές/Context.

Παρακαλώ χρησιμοποιήστε την ιδιότητα `isHybridApp:true` στις ρυθμίσεις της υπηρεσίας σας όταν θέλετε να τη χρησιμοποιήσετε για Υβριδικές Εφαρμογές.
:::

## Εγκατάσταση

Ο πιο εύκολος τρόπος είναι να διατηρήσετε το `@wdio/visual-service` ως dev-dependency στο `package.json` σας, μέσω:

```sh
npm install --save-dev @wdio/visual-service
```

## Χρήση

Το `@wdio/visual-service` μπορεί να χρησιμοποιηθεί ως κανονική υπηρεσία. Μπορείτε να το ρυθμίσετε στο αρχείο ρυθμίσεών σας ως εξής:

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
                // Κάποιες επιλογές, δείτε τα έγγραφα για περισσότερα
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

Περισσότερες επιλογές υπηρεσίας μπορείτε να βρείτε [εδώ](/docs/visual-testing/service-options).

Μόλις ρυθμιστεί στη διαμόρφωση WebdriverIO, μπορείτε να προχωρήσετε και να προσθέσετε οπτικούς ελέγχους στις [δοκιμές σας](/docs/visual-testing/writing-tests).

### Δυνατότητες
Για να χρησιμοποιήσετε τη μονάδα Οπτικού Ελέγχου, **δεν χρειάζεται να προσθέσετε επιπλέον επιλογές στις δυνατότητές σας**. Ωστόσο, σε ορισμένες περιπτώσεις, ίσως θέλετε να προσθέσετε επιπλέον μεταδεδομένα στις οπτικές δοκιμές σας, όπως ένα `logName`.

Το `logName` σας επιτρέπει να αντιστοιχίσετε ένα προσαρμοσμένο όνομα σε κάθε δυνατότητα, το οποίο μπορεί στη συνέχεια να συμπεριληφθεί στα ονόματα αρχείων εικόνας. Αυτό είναι ιδιαίτερα χρήσιμο για τη διάκριση στιγμιότυπων οθόνης που λαμβάνονται σε διαφορετικούς περιηγητές, συσκευές ή διαμορφώσεις.

Για να το ενεργοποιήσετε, μπορείτε να ορίσετε το `logName` στην ενότητα `capabilities` και να βεβαιωθείτε ότι η επιλογή `formatImageName` στην υπηρεσία Οπτικού Ελέγχου το αναφέρει. Δείτε πώς μπορείτε να το ρυθμίσετε:

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
                logName: 'chrome-mac-15', // Προσαρμοσμένο όνομα καταγραφής για Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Προσαρμοσμένο όνομα καταγραφής για Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Κάποιες επιλογές, δείτε τα έγγραφα για περισσότερα
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Η παρακάτω μορφή θα χρησιμοποιήσει το `logName` από τις δυνατότητες
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

    - Στην ενότητα `capabilities`, αντιστοιχίστε ένα μοναδικό `logName` σε κάθε περιηγητή ή συσκευή. Για παράδειγμα, το `chrome-mac-15` προσδιορίζει δοκιμές που εκτελούνται στο Chrome σε macOS έκδοση 15.

2. Προσαρμοσμένη ονομασία εικόνων:

    - Η επιλογή `formatImageName` ενσωματώνει το `logName` στα ονόματα αρχείων στιγμιότυπων οθόνης. Για παράδειγμα, αν το `tag` είναι homepage και η ανάλυση είναι `1920x1080`, το όνομα αρχείου μπορεί να μοιάζει ως εξής:

        `homepage-chrome-mac-15-1920x1080.png`

3. Οφέλη της προσαρμοσμένης ονομασίας:

    - Η διάκριση μεταξύ στιγμιότυπων οθόνης από διαφορετικούς περιηγητές ή συσκευές γίνεται πολύ ευκολότερη, ειδικά κατά τη διαχείριση σημείων αναφοράς και την αποσφαλμάτωση αποκλίσεων.

4. Σημείωση για τις προεπιλογές:

    - Εάν το `logName` δεν έχει οριστεί στις δυνατότητες, η επιλογή `formatImageName` θα το εμφανίσει ως κενή συμβολοσειρά στα ονόματα αρχείων (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Υποστηρίζουμε επίσης το [MultiRemote](https://webdriver.io/docs/multiremote/). Για να λειτουργήσει σωστά, βεβαιωθείτε ότι έχετε προσθέσει το `wdio-ics:options` στις δυνατότητές σας όπως μπορείτε να δείτε παρακάτω. Αυτό θα διασφαλίσει ότι κάθε στιγμιότυπο οθόνης θα έχει το δικό του μοναδικό όνομα.

Η [σύνταξη των δοκιμών σας](/docs/visual-testing/writing-tests) δεν θα είναι διαφορετική σε σύγκριση με τη χρήση του [testrunner](https://webdriver.io/docs/testrunner)

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

### Εκτέλεση Προγραμματιστικά

Εδώ είναι ένα ελάχιστο παράδειγμα του πώς να χρησιμοποιήσετε το `@wdio/visual-service` μέσω των επιλογών `remote`:

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

// "Εκκινήστε" την υπηρεσία για να προσθέσετε τις προσαρμοσμένες εντολές στο `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// ή χρησιμοποιήστε αυτό ΜΟΝΟ για αποθήκευση ενός στιγμιότυπου οθόνης
await browser.saveFullPageScreen("examplePaged", {});

// ή χρησιμοποιήστε αυτό για επικύρωση. Και οι δύο μέθοδοι δεν χρειάζεται να συνδυαστούν, δείτε το FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Περιήγηση σε ιστοσελίδα με το tab

Μπορείτε να ελέγξετε αν μια ιστοσελίδα είναι προσβάσιμη χρησιμοποιώντας το πλήκτρο <kbd>TAB</kbd> του πληκτρολογίου. Ο έλεγχος αυτής της πτυχής της προσβασιμότητας ήταν πάντα μια χρονοβόρα (χειροκίνητη) εργασία και αρκετά δύσκολο να γίνει μέσω αυτοματισμού.
Με τις μεθόδους `saveTabbablePage` και `checkTabbablePage`, μπορείτε τώρα να σχεδιάσετε γραμμές και κουκίδες στην ιστοσελίδα σας για να επαληθεύσετε τη σειρά περιήγησης με tab.

Λάβετε υπόψη ότι αυτό είναι χρήσιμο μόνο για επιτραπέζιους περιηγητές και **ΟΧΙ\*\*** για κινητές συσκευές. Όλοι οι επιτραπέζιοι περιηγητές υποστηρίζουν αυτή τη λειτουργία.

:::note

Η εργασία αυτή εμπνεύστηκε από την ανάρτηση ιστολογίου του [Viv Richards](https://github.com/vivrichards600) με τίτλο ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Ο τρόπος επιλογής στοιχείων με δυνατότητα tab βασίζεται στη μονάδα [tabbable](https://github.com/davidtheclark/tabbable). Εάν υπάρχουν προβλήματα σχετικά με το tabbing, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ειδικά την ενότητα [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Πώς λειτουργεί

Και οι δύο μέθοδοι θα δημιουργήσουν ένα στοιχείο `canvas` στην ιστοσελίδα σας και θα σχεδιάσουν γραμμές και κουκίδες για να σας δείξουν πού θα πήγαινε το TAB σας αν ένας τελικός χρήστης το χρησιμοποιούσε. Μετά από αυτό, θα δημιουργήσει ένα στιγμιότυπο ολόκληρης της σελίδας για να σας δώσει μια καλή επισκόπηση της ροής.

:::important

**Χρησιμοποιήστε το `saveTabbablePage` μόνο όταν χρειάζεστε να δημιουργήσετε ένα στιγμιότυπο οθόνης και ΔΕΝ θέλετε να το συγκρίνετε **με μια **baseline** εικόνα.\*\*\*\*

:::

Όταν θέλετε να συγκρίνετε τη ροή tabbing με ένα σημείο αναφοράς, τότε μπορείτε να χρησιμοποιήσετε τη μέθοδο `checkTabbablePage`. **ΔΕΝ** χρειάζεται να χρησιμοποιήσετε τις δύο μεθόδους μαζί. Αν υπάρχει ήδη μια εικόνα σημείου αναφοράς, η οποία μπορεί να δημιουργηθεί αυτόματα παρέχοντας `autoSaveBaseline: true` όταν αρχικοποιείτε την υπηρεσία,
το `checkTabbablePage` θα δημιουργήσει πρώτα την _πραγματική_ εικόνα και στη συνέχεια θα τη συγκρίνει με το σημείο αναφοράς.

##### Επιλογές

Και οι δύο μέθοδοι χρησιμοποιούν τις ίδιες επιλογές με το [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) ή το
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Παράδειγμα

Αυτό είναι ένα παράδειγμα για το πώς λειτουργεί το tabbing στην [ιστοσελίδα πειραματισμού μας](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Αυτόματη ενημέρωση αποτυχημένων Οπτικών Στιγμιότυπων

Ενημερώστε τις εικόνες αναφοράς μέσω της γραμμής εντολών προσθέτοντας το όρισμα `--update-visual-baseline`. Αυτό θα

-   αντιγράψει αυτόματα το πραγματικό στιγμιότυπο οθόνης και θα το τοποθετήσει στο φάκελο αναφοράς
-   αν υπάρχουν διαφορές, θα επιτρέψει στη δοκιμή να περάσει επειδή το σημείο αναφοράς έχει ενημερωθεί

**Χρήση:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Κατά την εκτέλεση των αρχείων καταγραφής πληροφοριών/αποσφαλμάτωσης, θα δείτε τα ακόλουθα αρχεία καταγραφής να προστίθενται

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

Αυτή η μονάδα περιλαμβάνει υποστήριξη TypeScript, επιτρέποντάς σας να επωφεληθείτε από την αυτόματη συμπλήρωση, την ασφάλεια τύπων και τη βελτιωμένη εμπειρία προγραμματιστή κατά τη χρήση της υπηρεσίας Οπτικού Ελέγχου.

### Βήμα 1: Προσθήκη Ορισμών Τύπων
Για να διασφαλίσετε ότι η TypeScript αναγνωρίζει τους τύπους της μονάδας, προσθέστε την ακόλουθη καταχώρηση στο πεδίο types στο tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Βήμα 2: Ενεργοποίηση Ασφάλειας Τύπων για τις Επιλογές Υπηρεσίας
Για να επιβάλετε τον έλεγχο τύπων στις επιλογές υπηρεσίας, ενημερώστε τη διαμόρφωση WebdriverIO:

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
                // Επιλογές υπηρεσίας
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

### Έκδοση 5 και άνω

Για την έκδοση 5 και άνω, αυτή η μονάδα είναι μια καθαρά JavaScript-based μονάδα χωρίς πρόσθετες εξαρτήσεις συστήματος πέρα από τις γενικές [απαιτήσεις έργου](/docs/gettingstarted#system-requirements). Χρησιμοποιεί το [Jimp](https://github.com/jimp-dev/jimp), μια βιβλιοθήκη επεξεργασίας εικόνων για Node γραμμένη εξ ολοκλήρου σε JavaScript, χωρίς native εξαρτήσεις.

### Έκδοση 4 και Προηγούμενες

Για την έκδοση 4 και προηγούμενες, αυτή η μονάδα βασίζεται στο [Canvas](https://github.com/Automattic/node-canvas), μια υλοποίηση canvas για Node.js. Το Canvas εξαρτάται από το [Cairo](https://cairographics.org/).

#### Λεπτομέρειες Εγκατάστασης

Από προεπιλογή, τα εκτελέσιμα αρχεία για macOS, Linux και Windows θα ληφθούν κατά την εγκατάσταση `npm install` του έργου σας. Εάν δεν έχετε υποστηριζόμενο λειτουργικό σύστημα ή αρχιτεκτονική επεξεργαστή, η μονάδα θα μεταγλωττιστεί στο σύστημά σας. Αυτό απαιτεί αρκετές εξαρτήσεις, συμπεριλαμβανομένων των Cairo και Pango.

Για λεπτομερείς πληροφορίες εγκατάστασης, δείτε το [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Παρακάτω είναι οδηγίες εγκατάστασης μιας γραμμής για κοινά λειτουργικά συστήματα. Σημειώστε ότι το `libgif/giflib`, το `librsvg` και το `libjpeg` είναι προαιρετικά και απαιτούνται μόνο για υποστήριξη GIF, SVG και JPEG αντίστοιχα. Απαιτείται Cairo v1.10.0 ή νεότερο.

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

    **Mac OS X v10.11+:** Αν έχετε πρόσφατα ενημερώσει στο Mac OS X v10.11+ και αντιμετωπίζετε προβλήματα κατά τη μεταγλώττιση, εκτελέστε την ακόλουθη εντολή: `xcode-select --install`. Διαβάστε περισσότερα για το πρόβλημα [στο Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Αν έχετε εγκατεστημένο το Xcode 10.0 ή νεότερο, για να δημιουργήσετε από τον πηγαίο κώδικα χρειάζεστε NPM 6.4.1 ή νεότερο.

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