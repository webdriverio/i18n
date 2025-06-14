---
id: security
title: Ασφάλεια
---

Το WebdriverIO λαμβάνει υπόψη την πτυχή της ασφάλειας κατά την παροχή λύσεων. Παρακάτω παρουσιάζονται ορισμένοι τρόποι για την καλύτερη ασφάλεια των δοκιμών σας.

## Βέλτιστες Πρακτικές

- Ποτέ μην κωδικοποιείτε ευαίσθητα δεδομένα που μπορούν να βλάψουν τον οργανισμό σας εάν εκτεθούν σε καθαρό κείμενο.
- Χρησιμοποιήστε έναν μηχανισμό (όπως ένα vault) για την ασφαλή αποθήκευση κλειδιών και κωδικών πρόσβασης και την ανάκτησή τους κατά την έναρξη των end-to-end δοκιμών σας.
- Βεβαιωθείτε ότι δεν εκτίθενται ευαίσθητα δεδομένα στα αρχεία καταγραφής και από τον πάροχο cloud, όπως τα διακριτικά ταυτοποίησης στα αρχεία καταγραφής δικτύου.

:::info

Ακόμη και για δεδομένα δοκιμών, είναι απαραίτητο να αναρωτηθείτε εάν σε λάθος χέρια, ένα κακόβουλο άτομο θα μπορούσε να ανακτήσει πληροφορίες ή να χρησιμοποιήσει αυτούς τους πόρους με κακόβουλη πρόθεση.

:::

## Απόκρυψη Ευαίσθητων Δεδομένων

Εάν χρησιμοποιείτε ευαίσθητα δεδομένα κατά τη διάρκεια της δοκιμής σας, είναι σημαντικό να διασφαλίσετε ότι δεν είναι ορατά σε όλους, όπως στα αρχεία καταγραφής. Επίσης, όταν χρησιμοποιείτε έναν πάροχο cloud, συχνά εμπλέκονται ιδιωτικά κλειδιά. Αυτές οι πληροφορίες πρέπει να αποκρύπτονται από τα αρχεία καταγραφής, τους αναφορείς και άλλα σημεία επαφής. Τα παρακάτω παρέχουν ορισμένες λύσεις απόκρυψης για την εκτέλεση δοκιμών χωρίς την έκθεση αυτών των τιμών.

### WebDriverIO

#### Απόκρυψη Τιμών Κειμένου Εντολών

Οι εντολές `addValue` και `setValue` υποστηρίζουν μια λογική τιμή mask για απόκρυψη στα αρχεία καταγραφής, καθώς και στους αναφορείς. Επιπλέον, άλλα εργαλεία, όπως εργαλεία απόδοσης και εργαλεία τρίτων, θα λάβουν επίσης την έκδοση με απόκρυψη, ενισχύοντας την ασφάλεια.

Για παράδειγμα, εάν χρησιμοποιείτε έναν πραγματικό χρήστη παραγωγής και πρέπει να εισαγάγετε έναν κωδικό πρόσβασης που θέλετε να αποκρύψετε, τότε είναι πλέον δυνατό με τα εξής:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Τα παραπάνω θα αποκρύψουν την τιμή κειμένου από τα αρχεία καταγραφής WDIO ως εξής:

Παράδειγμα αρχείων καταγραφής:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Οι αναφορείς, όπως οι αναφορείς Allure, και εργαλεία τρίτων όπως το Percy από το BrowserStack θα χειριστούν επίσης την έκδοση με απόκρυψη.
Σε συνδυασμό με την κατάλληλη έκδοση Appium, τα αρχεία καταγραφής Appium θα εξαιρεθούν επίσης από τα ευαίσθητα δεδομένα σας.

:::info

Περιορισμοί:
  - Στο Appium, πρόσθετα plugins θα μπορούσαν να διαρρεύσουν παρόλο που ζητάμε να αποκρύψουμε τις πληροφορίες.
  - Οι πάροχοι cloud θα μπορούσαν να χρησιμοποιήσουν ένα διακομιστή μεσολάβησης για καταγραφή HTTP, ο οποίος παρακάμπτει τον μηχανισμό απόκρυψης που έχει τεθεί σε εφαρμογή.
  - Η εντολή `getValue` δεν υποστηρίζεται. Επιπλέον, εάν χρησιμοποιηθεί στο ίδιο στοιχείο, μπορεί να εκθέσει την τιμή που προορίζεται να αποκρυφτεί όταν χρησιμοποιείτε `addValue` ή `setValue`.

Ελάχιστη απαιτούμενη έκδοση:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Απόκρυψη στα Αρχεία Καταγραφής WDIO

Χρησιμοποιώντας τη διαμόρφωση `maskingPatterns`, μπορούμε να αποκρύψουμε ευαίσθητες πληροφορίες από τα αρχεία καταγραφής WDIO. Ωστόσο, τα αρχεία καταγραφής Appium δεν καλύπτονται.

Για παράδειγμα, εάν χρησιμοποιείτε έναν πάροχο Cloud και χρησιμοποιείτε το επίπεδο info, τότε σχεδόν σίγουρα θα "διαρρεύσετε" το κλειδί του χρήστη όπως φαίνεται παρακάτω:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Για να αντιμετωπίσουμε αυτό, μπορούμε να περάσουμε την κανονική έκφραση `'--key=([^ ]*)'` και τώρα στα αρχεία καταγραφής θα δείτε 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Μπορείτε να επιτύχετε τα παραπάνω παρέχοντας την κανονική έκφραση στο πεδίο `maskingPatterns` της διαμόρφωσης.
  - Για πολλαπλές κανονικές εκφράσεις, χρησιμοποιήστε μία μόνο συμβολοσειρά αλλά με τιμές διαχωρισμένες με κόμμα.
  - Για περισσότερες λεπτομέρειες σχετικά με τα μοτίβα απόκρυψης, δείτε την [ενότητα Masking Patterns στο README του WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Ελάχιστη απαιτούμενη έκδοση:
 - WDIO v9.15.0

:::

#### Απενεργοποίηση των Καταγραφέων WDIO

Ένας άλλος τρόπος για να αποκλείσετε την καταγραφή ευαίσθητων δεδομένων είναι να μειώσετε ή να σιγάσετε το επίπεδο καταγραφής ή να απενεργοποιήσετε τον καταγραφέα.
Μπορεί να επιτευχθεί ως εξής:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Λύσεις Τρίτων

#### Appium
Το Appium προσφέρει τη δική του λύση απόκρυψης· δείτε [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Μπορεί να είναι δύσκολο να χρησιμοποιήσετε τη λύση τους. Ένας τρόπος, αν είναι δυνατόν, είναι να περάσετε ένα διακριτικό στη συμβολοσειρά σας όπως `@mask@` και να το χρησιμοποιήσετε ως κανονική έκφραση
 - Σε ορισμένες εκδόσεις Appium, οι τιμές καταγράφονται επίσης με κάθε χαρακτήρα διαχωρισμένο με κόμμα, οπότε πρέπει να είμαστε προσεκτικοί.
 - Δυστυχώς, το BrowserStack δεν υποστηρίζει αυτή τη λύση, αλλά εξακολουθεί να είναι χρήσιμη τοπικά
 
Χρησιμοποιώντας το παράδειγμα `@mask@` που αναφέρθηκε προηγουμένως, μπορούμε να χρησιμοποιήσουμε το ακόλουθο αρχείο JSON με όνομα `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Στη συνέχεια, περάστε το όνομα του αρχείου JSON στο πεδίο `logFilters` στη διαμόρφωση της υπηρεσίας appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

Το BrowserStack προσφέρει επίσης κάποιο επίπεδο απόκρυψης για την απόκρυψη ορισμένων δεδομένων· δείτε [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Δυστυχώς, η λύση είναι όλα ή τίποτα, οπότε όλες οι τιμές κειμένου των παρεχόμενων εντολών θα αποκρύπτονται.