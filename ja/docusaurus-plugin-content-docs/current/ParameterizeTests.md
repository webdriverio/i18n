---
id: parameterize-tests
title: テストのパラメータ化
---

テストレベルでのテストのパラメータ化は、単純な `for` ループなどを使って簡単に行うことができます：

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

または、テストを動的関数に抽出することでも実現できます：

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

## 環境変数の受け渡し

コマンドラインから環境変数を使用してテストを設定することができます。

例えば、ユーザー名とパスワードが必要なテストファイルを考えてみましょう。通常、機密情報をソースコードに保存することは避けるべきであり、外部から機密情報を渡す方法が必要です。

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

コマンドラインで秘密のユーザー名とパスワードを設定してこのテストを実行できます。

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

同様に、設定ファイルもコマンドラインを通じて渡された環境変数を読み取ることができます。

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

これで、ステージング環境または本番環境に対してテストを実行できます：

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

## `.env` ファイル

環境変数の管理を容易にするために、`.env`ファイルのような方法を検討してください。WebdriverIOは`.env`ファイルを自動的に環境に読み込みます。コマンド呼び出しの一部として環境変数を定義する代わりに、以下のような`.env`ファイルを定義できます：

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

通常通りテストを実行すると、環境変数が取得されます。

```sh
npx wdio run wdio.conf.js
```

## CSVファイルを使用してテストを作成する

WebdriverIOテストランナーはNode.js上で実行されるため、ファイルシステムから直接ファイルを読み取り、好みのCSVライブラリで解析することができます。

例えば、次のようなCSVファイル（例：input.csv）を考えてみましょう：

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

これに基づいて、NPMからcsv-parseライブラリを使用していくつかのテストを生成します：

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