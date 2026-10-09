---
id: parameterize-tests
title: Parametryzacja testów
description: "Parametryzuj testy za pomocą pętli i funkcji dynamicznych, zmiennych środowiskowych, plików .env lub danych z pliku CSV."
---

Możesz w prosty sposób parametryzować testy na poziomie testu, za pomocą zwykłych pętli `for`, np.:

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

lub wydzielając testy do funkcji dynamicznych, np.:

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

Możesz używać zmiennych środowiskowych, aby konfigurować testy z poziomu wiersza poleceń.

Na przykład rozważ poniższy plik testowy, który wymaga nazwy użytkownika i hasła. Zazwyczaj dobrym pomysłem jest nieprzechowywanie sekretów w kodzie źródłowym, więc potrzebujemy sposobu na przekazanie ich z zewnątrz.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Możesz uruchomić ten test, ustawiając swoją tajną nazwę użytkownika i hasło w wierszu poleceń.

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

Podobnie plik konfiguracyjny może odczytywać zmienne środowiskowe przekazane przez wiersz poleceń.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Teraz możesz uruchamiać testy w środowisku testowym (staging) lub produkcyjnym:

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

Aby ułatwić zarządzanie zmiennymi środowiskowymi, rozważ użycie plików `.env`. WebdriverIO automatycznie ładuje pliki `.env` do Twojego środowiska. Zamiast definiować zmienną środowiskową jako część wywołania polecenia, możesz zdefiniować następujący plik `.env`:

```bash title=".env"
# plik .env
STAGING=0
USERNAME=me
PASSWORD=secret
```

Uruchom testy jak zwykle, a Twoje zmienne środowiskowe powinny zostać wczytane.

```sh
npx wdio run wdio.conf.js
```

## Tworzenie testów na podstawie pliku CSV

Test runner WebdriverIO działa w Node.js, co oznacza, że możesz bezpośrednio odczytywać pliki z systemu plików i parsować je za pomocą preferowanej biblioteki CSV.

Spójrz na przykład na ten plik CSV, w naszym przykładzie input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Na jego podstawie wygenerujemy kilka testów, korzystając z biblioteki csv-parse z NPM:

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