---
id: parameterize-tests
title: Параметризация тестов
description: "Параметризуйте тесты с помощью циклов и динамических функций, переменных окружения, файлов .env или данных из CSV-файла."
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

или вынося тесты в динамические функции, например:

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

Например, рассмотрим следующий тестовый файл, которому нужны имя пользователя и пароль. Обычно хранить секреты в исходном коде — не лучшая идея, поэтому нам понадобится способ передавать их извне.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Вы можете запустить этот тест, задав секретные имя пользователя и пароль в командной строке.

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

Аналогичным образом файл конфигурации также может считывать переменные окружения, переданные через командную строку.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Теперь вы можете запускать тесты в тестовом (staging) или в рабочем (production) окружении:

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

Чтобы упростить управление переменными окружения, используйте, например, файлы `.env`. WebdriverIO автоматически загружает файлы `.env` в ваше окружение. Вместо того чтобы задавать переменную окружения при вызове команды, вы можете определить следующий файл `.env`:

```bash title=".env"
# файл .env
STAGING=0
USERNAME=me
PASSWORD=secret
```

Запускайте тесты как обычно — ваши переменные окружения будут подхвачены.

```sh
npx wdio run wdio.conf.js
```

## Создание тестов на основе CSV-файла

Тестраннер WebdriverIO работает в Node.js, а значит, вы можете напрямую читать файлы из файловой системы и разбирать их с помощью предпочитаемой вами библиотеки для работы с CSV.

Рассмотрим, например, следующий CSV-файл, в нашем примере input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

На его основе мы сгенерируем несколько тестов с помощью библиотеки csv-parse из NPM:

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