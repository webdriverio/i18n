---
id: parameterize-tests
title: Параметризация тестов
---

Вы можете легко параметризовать тесты на уровне теста с помощью простых циклов `for`, например:

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

или путем извлечения тестов в динамические функции, например:

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

## Передача переменных окружения

Вы можете использовать переменные окружения для настройки тестов из командной строки.

Например, рассмотрим следующий тестовый файл, который требует имя пользователя и пароль. Обычно не рекомендуется хранить секретные данные в исходном коде, поэтому нам нужен способ передавать их извне.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Вы можете запустить этот тест, установив секретное имя пользователя и пароль в командной строке.

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

Аналогично, конфигурационный файл также может считывать переменные окружения, переданные через командную строку.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Теперь вы можете запускать тесты в среде тестирования или в производственной среде:

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

## Файлы `.env`

Чтобы упростить управление переменными окружения, вы можете использовать файлы `.env`. WebdriverIO автоматически загружает файлы `.env` в ваше окружение. Вместо определения переменной окружения как части вызова команды, вы можете определить следующий файл `.env`:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Запустите тесты как обычно, ваши переменные окружения будут использованы автоматически.

```sh
npx wdio run wdio.conf.js
```

## Создание тестов через CSV-файл

Тест-раннер WebdriverIO работает в Node.js, это означает, что вы можете напрямую читать файлы из файловой системы и парсить их с помощью предпочитаемой библиотеки для работы с CSV.

Посмотрите, например, на этот CSV-файл, в нашем примере input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

На основе этого мы сгенерируем несколько тестов, используя библиотеку csv-parse из NPM:

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