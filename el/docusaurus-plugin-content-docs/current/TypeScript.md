---
id: typescript
title: Εγκατάσταση TypeScript
---

Μπορείτε να γράψετε δοκιμές χρησιμοποιώντας [TypeScript](http://www.typescriptlang.org) για να έχετε αυτόματη συμπλήρωση και ασφάλεια τύπων.

Θα χρειαστείτε το [`tsx`](https://github.com/privatenumber/tsx) εγκατεστημένο στις `devDependencies`, μέσω:

```bash npm2yarn
$ npm install tsx --save-dev
```

Το WebdriverIO θα ανιχνεύσει αυτόματα αν αυτές οι εξαρτήσεις είναι εγκατεστημένες και θα μεταγλωττίσει τη διαμόρφωση και τις δοκιμές σας. Βεβαιωθείτε ότι έχετε ένα `tsconfig.json` στον ίδιο κατάλογο με τη διαμόρφωση WDIO.

#### Προσαρμοσμένο TSConfig

Εάν χρειάζεστε να ορίσετε διαφορετική διαδρομή για το `tsconfig.json`, παρακαλώ ορίστε τη μεταβλητή περιβάλλοντος TSCONFIG_PATH με την επιθυμητή διαδρομή σας, ή χρησιμοποιήστε τη [ρύθμιση tsConfigPath](/docs/configurationfile) της διαμόρφωσης wdio.

Εναλλακτικά, μπορείτε να χρησιμοποιήσετε τη [μεταβλητή περιβάλλοντος](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) για το `tsx`.

#### Έλεγχος Τύπων

Σημειώστε ότι το `tsx` δεν υποστηρίζει τον έλεγχο τύπων - αν θέλετε να ελέγξετε τους τύπους σας, θα χρειαστεί να το κάνετε σε ξεχωριστό βήμα με το `tsc`.

## Εγκατάσταση Πλαισίου

Το `tsconfig.json` σας χρειάζεται τα ακόλουθα:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Παρακαλώ αποφύγετε την ρητή εισαγωγή των `webdriverio` ή `@wdio/sync`.
Οι τύποι `WebdriverIO` και `WebDriver` είναι προσβάσιμοι από οπουδήποτε μόλις προστεθούν στα `types` στο `tsconfig.json`. Εάν χρησιμοποιείτε πρόσθετες υπηρεσίες WebdriverIO, πρόσθετα ή το πακέτο αυτοματισμού `devtools`, προσθέστε τα επίσης στη λίστα `types` καθώς πολλά παρέχουν επιπλέον τύπους.

## Τύποι Πλαισίου

Ανάλογα με το πλαίσιο που χρησιμοποιείτε, θα χρειαστεί να προσθέσετε τους τύπους για αυτό το πλαίσιο στην ιδιότητα `types` του `tsconfig.json`, καθώς και να εγκαταστήσετε τους ορισμούς τύπων του. Αυτό είναι ιδιαίτερα σημαντικό αν θέλετε να έχετε υποστήριξη τύπων για την ενσωματωμένη βιβλιοθήκη ισχυρισμών [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Για παράδειγμα, αν αποφασίσετε να χρησιμοποιήσετε το πλαίσιο Mocha, πρέπει να εγκαταστήσετε το `@types/mocha` και να το προσθέσετε ως εξής για να έχετε όλους τους τύπους διαθέσιμους παγκοσμίως:

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
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

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

## Υπηρεσίες

Εάν χρησιμοποιείτε υπηρεσίες που προσθέτουν εντολές στο πεδίο του προγράμματος περιήγησης, πρέπει επίσης να τις συμπεριλάβετε στο `tsconfig.json` σας. Για παράδειγμα, αν χρησιμοποιείτε το `@wdio/lighthouse-service`, βεβαιωθείτε ότι το προσθέτετε και στα `types`, π.χ.:

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

Η προσθήκη υπηρεσιών και αναφορέων στη διαμόρφωση TypeScript σας ενισχύει επίσης την ασφάλεια τύπων του αρχείου διαμόρφωσης WebdriverIO.

## Ορισμοί Τύπων

Όταν εκτελείτε εντολές WebdriverIO, όλες οι ιδιότητες είναι συνήθως τυποποιημένες, ώστε να μην χρειάζεται να ασχοληθείτε με την εισαγωγή πρόσθετων τύπων. Ωστόσο, υπάρχουν περιπτώσεις όπου θέλετε να ορίσετε μεταβλητές εκ των προτέρων. Για να διασφαλίσετε ότι αυτές είναι ασφαλείς ως προς τον τύπο, μπορείτε να χρησιμοποιήσετε όλους τους τύπους που ορίζονται στο πακέτο [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Για παράδειγμα, αν θέλετε να ορίσετε την απομακρυσμένη επιλογή για το `webdriverio`, μπορείτε να κάνετε:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## Συμβουλές και Υποδείξεις

### Μεταγλώττιση & Lint

Για να είστε απόλυτα ασφαλείς, μπορείτε να εξετάσετε την τήρηση των βέλτιστων πρακτικών: μεταγλωττίστε τον κώδικά σας με τον μεταγλωττιστή TypeScript (εκτελέστε `tsc` ή `npx tsc`) και να έχετε το [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) να εκτελείται στο [pre-commit hook](https://github.com/typicode/husky).