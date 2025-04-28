---
id: parameterize-tests
title: Parametrizzare i Test
---

Puoi semplicemente parametrizzare i test a livello di test, tramite semplici cicli `for`, ad esempio:

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

o estraendo i test in funzioni dinamiche, ad esempio:

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

## Passare Variabili d'Ambiente

Puoi utilizzare le variabili d'ambiente per configurare i test dalla riga di comando.

Ad esempio, considera il seguente file di test che necessita di un nome utente e una password. Di solito è una buona idea non memorizzare i tuoi segreti nel codice sorgente, quindi avremo bisogno di un modo per passare i segreti dall'esterno.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Puoi eseguire questo test con il tuo nome utente e password segreti impostati nella riga di comando.

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

Analogamente, il file di configurazione può anche leggere le variabili d'ambiente passate attraverso la riga di comando.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Ora, puoi eseguire i test su un ambiente di staging o di produzione:

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

## File `.env`

Per rendere più facile la gestione delle variabili d'ambiente, considera qualcosa come i file `.env`. WebdriverIO carica automaticamente i file `.env` nel tuo ambiente. Invece di definire la variabile d'ambiente come parte della chiamata di comando, puoi definire il seguente `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Esegui i test come al solito, le tue variabili d'ambiente dovrebbero essere rilevate.

```sh
npx wdio run wdio.conf.js
```

## Creare test tramite un file CSV

Il test-runner di WebdriverIO viene eseguito in Node.js, ciò significa che puoi leggere direttamente file dal file system e analizzarli con la tua libreria CSV preferita.

Vedi ad esempio questo file CSV, nel nostro esempio input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Basato su questo, genereremo alcuni test utilizzando la libreria csv-parse da NPM:

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