---
id: parameterize-tests
title: Parametrizar Pruebas
---

Puedes parametrizar pruebas a nivel de test, mediante simples bucles `for`, por ejemplo:

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

o extrayendo pruebas en funciones dinámicas, por ejemplo:

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

## Pasando Variables de Entorno

Puedes usar variables de entorno para configurar pruebas desde la línea de comandos.

Por ejemplo, considera el siguiente archivo de prueba que necesita un nombre de usuario y una contraseña. Generalmente es una buena idea no almacenar tus secretos en el código fuente, por lo que necesitaremos una forma de pasar secretos desde el exterior.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Puedes ejecutar esta prueba con tu nombre de usuario y contraseña secretos establecidos en la línea de comandos.

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

De manera similar, el archivo de configuración también puede leer variables de entorno pasadas a través de la línea de comandos.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Ahora, puedes ejecutar pruebas contra un entorno de staging o de producción:

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

## Archivos `.env`

Para facilitar la gestión de variables de entorno, considera algo como los archivos `.env`. WebdriverIO carga automáticamente los archivos `.env` en tu entorno. En lugar de definir la variable de entorno como parte de la llamada de comando, puedes definir el siguiente `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Ejecuta las pruebas como de costumbre, tus variables de entorno deberían ser detectadas.

```sh
npx wdio run wdio.conf.js
```

## Crear pruebas a través de un archivo CSV

El test-runner de WebdriverIO se ejecuta en Node.js, esto significa que puedes leer archivos directamente desde el sistema de archivos y analizarlos con tu biblioteca CSV preferida.

Mira por ejemplo este archivo CSV, en nuestro ejemplo input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Basándonos en esto, generaremos algunas pruebas utilizando la biblioteca csv-parse de NPM:

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