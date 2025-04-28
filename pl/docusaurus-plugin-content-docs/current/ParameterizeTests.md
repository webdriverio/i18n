---
id: parameterize-tests
title: Parametryzacja Testów
---

Możesz łatwo parametryzować testy na poziomie testu, za pomocą prostych pętli `for`, np.:

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

lub przez wyodrębnienie testów do dynamicznych funkcji, np.:

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

## Przekazywanie zmiennych środowiskowych

Możesz używać zmiennych środowiskowych do konfigurowania testów z wiersza poleceń.

Na przykład, rozważ następujący plik testowy, który wymaga nazwy użytkownika i hasła. Zwykle dobrym pomysłem jest nieprzetrzymywanie tajnych danych w kodzie źródłowym, więc będziemy potrzebować sposobu na przekazanie tych danych z zewnątrz.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Możesz uruchomić ten test z tajną nazwą użytkownika i hasłem ustawionymi w wierszu poleceń.

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

Podobnie, plik konfiguracyjny może również odczytywać zmienne środowiskowe przekazane przez wiersz poleceń.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Teraz możesz uruchomić testy w środowisku testowym lub produkcyjnym:

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

## Pliki `.env`

Aby ułatwić zarządzanie zmiennymi środowiskowymi, rozważ wykorzystanie plików `.env`. WebdriverIO automatycznie ładuje pliki `.env` do twojego środowiska. Zamiast definiować zmienną środowiskową jako część wywołania polecenia, możesz zdefiniować następujący plik `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Uruchom testy jak zwykle, twoje zmienne środowiskowe powinny zostać wykryte.

```sh
npx wdio run wdio.conf.js
```

## Tworzenie testów za pomocą pliku CSV

Test-runner WebdriverIO działa w środowisku Node.js, co oznacza, że możesz bezpośrednio odczytywać pliki z systemu plików i analizować je za pomocą preferowanej biblioteki CSV.

Zobacz na przykład ten plik CSV, w naszym przykładzie input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Na tej podstawie wygenerujemy kilka testów, używając biblioteki csv-parse z NPM:

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