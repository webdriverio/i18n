---
id: parameterize-tests
title: Παραμετροποίηση Δοκιμών
description: "Παραμετροποιήστε δοκιμές με βρόχους και δυναμικές συναρτήσεις, μεταβλητές περιβάλλοντος, αρχεία .env ή δεδομένα από ένα αρχείο CSV."
---

Μπορείτε απλά να παραμετροποιήσετε δοκιμές σε επίπεδο δοκιμής, μέσω απλών βρόχων `for`, π.χ.:

```ts title=example.spec.js
const people = ['Alice', 'Bob']
describe('my tests', () => {
    for (const name of people) {
        it(`testing with ${name}`, async () => {
            // ...
        })
    }
})
```

ή εξάγοντας δοκιμές σε δυναμικές συναρτήσεις, π.χ.:

```js title=dynamic.spec.js
import { browser } from '@wdio/globals'

function testComponent(componentName, options) {
  it(`should test my ${componentName}`, async () => {
    await browser.url(`/${componentName}`)
    await expect($('input')).toHaveValue(options.expectedValue)
  })
}

describe('page components', () => {
    testComponent('component-a', { expectedValue: 'some expected value' })
    testComponent('component-b', { expectedValue: 'some other expected value' })
})
```

## Μεταβίβαση Μεταβλητών Περιβάλλοντος

Μπορείτε να χρησιμοποιήσετε μεταβλητές περιβάλλοντος για να διαμορφώσετε δοκιμές από τη γραμμή εντολών.

Για παράδειγμα, εξετάστε το ακόλουθο αρχείο δοκιμής που χρειάζεται ένα όνομα χρήστη και έναν κωδικό πρόσβασης. Συνήθως είναι καλή ιδέα να μην αποθηκεύετε τα μυστικά σας στον πηγαίο κώδικα, οπότε θα χρειαστούμε έναν τρόπο να μεταβιβάσουμε μυστικά από έξω.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Μπορείτε να εκτελέσετε αυτή τη δοκιμή με το μυστικό όνομα χρήστη και τον κωδικό πρόσβασής σας ορισμένα στη γραμμή εντολών.

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
USERNAME=me PASSWORD=secret npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:USERNAME=me
$env:PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set USERNAME=me
set PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

Ομοίως, το αρχείο διαμόρφωσης μπορεί επίσης να διαβάσει μεταβλητές περιβάλλοντος που μεταβιβάζονται μέσω της γραμμής εντολών.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Τώρα, μπορείτε να εκτελέσετε δοκιμές σε ένα περιβάλλον staging ή production:

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
STAGING=1 npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

## Αρχεία `.env`

Για να διευκολύνετε τη διαχείριση των μεταβλητών περιβάλλοντος, εξετάστε κάτι σαν τα αρχεία `.env`. Το WebdriverIO φορτώνει αυτόματα τα αρχεία `.env` στο περιβάλλον σας. Αντί να ορίσετε τη μεταβλητή περιβάλλοντος ως μέρος της κλήσης της εντολής, μπορείτε να ορίσετε το ακόλουθο `.env`:

```bash title=".env"
# αρχείο .env
STAGING=0
USERNAME=me
PASSWORD=secret
```

Εκτελέστε τις δοκιμές ως συνήθως, οι μεταβλητές περιβάλλοντός σας θα πρέπει να αναγνωριστούν.

```sh
npx wdio run wdio.conf.js
```

## Δημιουργία δοκιμών μέσω αρχείου CSV

Το test-runner του WebdriverIO εκτελείται σε Node.js, αυτό σημαίνει ότι μπορείτε να διαβάσετε απευθείας αρχεία από το σύστημα αρχείων και να τα αναλύσετε με τη βιβλιοθήκη CSV της προτίμησής σας.

Δείτε για παράδειγμα αυτό το αρχείο CSV, στο παράδειγμά μας το input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Με βάση αυτό, θα δημιουργήσουμε κάποιες δοκιμές χρησιμοποιώντας τη βιβλιοθήκη csv-parse από το NPM:

```js title=test.spec.ts
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

const records = parse(fs.readFileSync(path.join(__dirname, 'input.csv')), {
  columns: true,
  skip_empty_lines: true
})

describe('my test suite', () => {
    for (const record of records) {
        it(`foo: ${record.test_case}`, async () => {
            console.log(record.test_case, record.some_value, record.some_other_value)
        })
    }
})
```