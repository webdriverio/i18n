---
id: parameterize-tests
title: Parametrisera tester
---

Du kan enkelt parametrisera tester på testnivå, via enkla `for`-loopar t.ex.:

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

eller genom att extrahera tester till dynamiska funktioner, t.ex.:

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

## Skicka miljövariabler

Du kan använda miljövariabler för att konfigurera tester från kommandoraden.

Betrakta till exempel följande testfil som behöver ett användarnamn och ett lösenord. Det är vanligtvis en bra idé att inte lagra dina hemligheter i källkoden, så vi behöver ett sätt att skicka hemligheter utifrån.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Du kan köra detta test med ditt hemliga användarnamn och lösenord inställda i kommandoraden.

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

På samma sätt kan konfigurationsfilen också läsa miljövariabler som skickas via kommandoraden.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Nu kan du köra tester mot en staging- eller produktionsmiljö:

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

## `.env`-filer

För att göra miljövariabler lättare att hantera, överväg något som `.env`-filer. WebdriverIO laddar `.env`-filer automatiskt in i din miljö. Istället för att definiera miljövariabeln som en del av kommandoanropet kan du definiera följande `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Kör tester som vanligt, dina miljövariabler bör registreras.

```sh
npx wdio run wdio.conf.js
```

## Skapa tester via en CSV-fil

WebdriverIO-testrunner körs i Node.js, vilket betyder att du direkt kan läsa filer från filsystemet och tolka dem med ditt föredragna CSV-bibliotek.

Se till exempel denna CSV-fil, i vårt exempel input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Baserat på detta kommer vi att generera några tester genom att använda csv-parse-biblioteket från NPM:

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