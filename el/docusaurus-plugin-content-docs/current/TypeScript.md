---
id: typescript
title: Ρύθμιση TypeScript
description: "Γράψτε δοκιμές WebdriverIO σε TypeScript με το tsx, ρυθμίστε το tsconfig.json και προσθέστε ορισμούς τύπων για frameworks, services και προσαρμοσμένες εντολές."
---

Μπορείτε να γράψετε δοκιμές χρησιμοποιώντας [TypeScript](http://www.typescriptlang.org) για να έχετε αυτόματη συμπλήρωση και ασφάλεια τύπων.

Θα χρειαστεί να έχετε εγκατεστημένο το [`tsx`](https://github.com/privatenumber/tsx) στα `devDependencies`, μέσω:

```bash npm2yarn
$ npm install tsx --save-dev
```

Το WebdriverIO θα εντοπίσει αυτόματα αν αυτές οι εξαρτήσεις είναι εγκατεστημένες και θα μεταγλωττίσει τη διαμόρφωση και τις δοκιμές σας για εσάς. Βεβαιωθείτε ότι έχετε ένα `tsconfig.json` στον ίδιο κατάλογο με τη διαμόρφωση WDIO.

#### Προσαρμοσμένο TSConfig

Αν χρειάζεται να ορίσετε διαφορετική διαδρομή για το `tsconfig.json`, ορίστε τη μεταβλητή περιβάλλοντος TSCONFIG_PATH με την επιθυμητή διαδρομή ή χρησιμοποιήστε τη [ρύθμιση tsConfigPath](/docs/configurationfile) της διαμόρφωσης wdio.

Εναλλακτικά, μπορείτε να χρησιμοποιήσετε τη [μεταβλητή περιβάλλοντος](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) για το `tsx`.


#### Έλεγχος Τύπων

Σημειώστε ότι το `tsx` δεν υποστηρίζει έλεγχο τύπων - αν θέλετε να ελέγξετε τους τύπους σας, θα πρέπει να το κάνετε σε ξεχωριστό βήμα με το `tsc`.

## Ρύθμιση Framework

Το `tsconfig.json` σας χρειάζεται τα εξής:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Αποφύγετε να εισάγετε ρητά το `webdriverio` ή το `@wdio/sync`.
Οι τύποι `WebdriverIO` και `WebDriver` είναι προσβάσιμοι από οπουδήποτε μόλις προστεθούν στα `types` του `tsconfig.json`. Αν χρησιμοποιείτε επιπλέον services, plugins του WebdriverIO ή το πακέτο αυτοματοποίησης `devtools`, προσθέστε τα επίσης στη λίστα `types`, καθώς πολλά παρέχουν επιπλέον ορισμούς τύπων.

## Τύποι Framework

Ανάλογα με το framework που χρησιμοποιείτε, θα χρειαστεί να προσθέσετε τους τύπους για αυτό το framework στην ιδιότητα types του `tsconfig.json`, καθώς και να εγκαταστήσετε τους ορισμούς τύπων του. Αυτό είναι ιδιαίτερα σημαντικό αν θέλετε να έχετε υποστήριξη τύπων για την ενσωματωμένη βιβλιοθήκη assertion [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Για παράδειγμα, αν αποφασίσετε να χρησιμοποιήσετε το framework Mocha, πρέπει να εγκαταστήσετε το `@types/mocha` και να το προσθέσετε ως εξής, ώστε όλοι οι τύποι να είναι διαθέσιμοι καθολικά:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

Το `jasmine` φορτώνει το `@types/jasmine`, το οποίο παρέχει τα `jasmine`, `spyOn` και `expectAsync`. Με το `@wdio/jasmine-framework`, το καθολικό `expect` επιστρέφει `void` για τους σύγχρονους matchers του Jasmine και ένα `Promise` για τους matchers του WebdriverIO και τους ασύγχρονους matchers του Jasmine. Το `expectAsync` διαθέτει επίσης τους matchers του WebdriverIO. Το export `expect` του `expect-webdriverio` διατηρεί τους matchers του Jest.

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Services

Αν χρησιμοποιείτε services που προσθέτουν εντολές στο scope του browser, πρέπει επίσης να τα συμπεριλάβετε στο `tsconfig.json` σας. Για παράδειγμα, αν χρησιμοποιείτε το `@wdio/lighthouse-service`, βεβαιωθείτε ότι το προσθέτετε επίσης στα `types`, π.χ.:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Η προσθήκη services και reporters στη διαμόρφωση TypeScript ενισχύει επίσης την ασφάλεια τύπων του αρχείου διαμόρφωσης WebdriverIO.

## Ορισμοί Τύπων

Κατά την εκτέλεση εντολών WebdriverIO, όλες οι ιδιότητες συνήθως έχουν τύπους, ώστε να μη χρειάζεται να εισάγετε επιπλέον τύπους. Ωστόσο, υπάρχουν περιπτώσεις όπου θέλετε να ορίσετε μεταβλητές εκ των προτέρων. Για να διασφαλίσετε ότι αυτές είναι ασφαλείς ως προς τους τύπους, μπορείτε να χρησιμοποιήσετε όλους τους τύπους που ορίζονται στο πακέτο [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Για παράδειγμα, αν θέλετε να ορίσετε την επιλογή remote για το `webdriverio`, μπορείτε να κάνετε:

```ts
import type { Options } from '@wdio/types'

// Ακολουθεί ένα παράδειγμα όπου ίσως θέλετε να εισάγετε τους τύπους απευθείας
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Για άλλες περιπτώσεις, μπορείτε να χρησιμοποιήσετε το namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Άλλες επιλογές διαμόρφωσης
}
```

## Συμβουλές και Υποδείξεις

### Μεταγλώττιση & Lint

Για να είστε απόλυτα ασφαλείς, μπορείτε να εξετάσετε το ενδεχόμενο να ακολουθήσετε τις βέλτιστες πρακτικές: μεταγλωττίστε τον κώδικά σας με τον μεταγλωττιστή TypeScript (εκτελέστε `tsc` ή `npx tsc`) και έχετε το [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) να εκτελείται σε [pre-commit hook](https://github.com/typicode/husky).