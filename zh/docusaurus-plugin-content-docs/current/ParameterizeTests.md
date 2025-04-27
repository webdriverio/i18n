---
id: parameterize-tests
title: 参数化测试
---

您可以在测试级别简单地参数化测试，通过简单的 `for` 循环，例如：

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

或者通过提取测试到动态函数中，例如：

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

## 传递环境变量

您可以使用环境变量从命令行配置测试。

例如，考虑以下需要用户名和密码的测试文件。通常最好不要在源代码中存储您的秘密，因此我们需要一种从外部传递秘密的方法。

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

您可以在命令行中设置您的秘密用户名和密码来运行此测试。

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

同样，配置文件也可以读取通过命令行传递的环境变量。

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

现在，您可以针对暂存或生产环境运行测试：

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

## `.env` 文件

为了更容易管理环境变量，可以考虑使用 `.env` 文件。WebdriverIO 自动将 `.env` 文件加载到您的环境中。您可以定义以下 `.env` 文件，而不是将环境变量作为命令调用的一部分定义：

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

正常运行测试，您的环境变量应该会被识别。

```sh
npx wdio run wdio.conf.js
```

## 通过 CSV 文件创建测试

WebdriverIO 测试运行器在 Node.js 中运行，这意味着您可以直接从文件系统读取文件，并使用您喜欢的 CSV 库解析它们。

例如看这个 CSV 文件，在我们的示例 input.csv 中：

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

基于此，我们将使用 NPM 的 csv-parse 库生成一些测试：

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