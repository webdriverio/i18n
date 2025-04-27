---
id: parameterize-tests
title: Параметризація тестів
---

Ви можете просто параметризувати тести на рівні тесту за допомогою простих циклів `for`, наприклад:

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

або шляхом вилучення тестів у динамічні функції, наприклад:

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

## Передача змінних середовища

Ви можете використовувати змінні середовища для налаштування тестів з командного рядка.

Наприклад, розглянемо наступний тестовий файл, який потребує ім'я користувача та пароль. Зазвичай добре не зберігати свої секрети у вихідному коді, тому нам потрібен спосіб передачі секретів ззовні.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Ви можете запустити цей тест із вашим секретним ім'ям користувача та паролем, встановленими в командному рядку.

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

Аналогічно, файл конфігурації також може читати змінні середовища, передані через командний рядок.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Тепер ви можете запускати тести проти тестового або виробничого середовища:

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

## Файли `.env`

Щоб полегшити керування змінними середовища, розгляньте використання файлів `.env`. WebdriverIO автоматично завантажує файли `.env` у ваше середовище. Замість визначення змінних середовища як частини виклику команди, ви можете визначити наступний `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Запустіть тести як зазвичай, ваші змінні середовища повинні бути підхоплені.

```sh
npx wdio run wdio.conf.js
```

## Створення тестів через CSV файл

Тест-раннер WebdriverIO працює в Node.js, це означає, що ви можете безпосередньо читати файли з файлової системи та аналізувати їх за допомогою вашої улюбленої CSV бібліотеки.

Розгляньмо, наприклад, цей CSV файл, у нашому прикладі input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

На основі цього ми генеруватимемо деякі тести, використовуючи бібліотеку csv-parse з NPM:

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