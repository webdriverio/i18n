---
id: parameterize-tests
title: پارامتری کردن تست‌ها
---

شما می‌توانید به سادگی تست‌ها را در سطح تست با استفاده از حلقه‌های `for` ساده پارامتری کنید، مثلاً:

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

یا با استخراج تست‌ها به توابع پویا، مثلاً:

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

## انتقال متغیرهای محیطی

شما می‌توانید از متغیرهای محیطی برای پیکربندی تست‌ها از طریق خط فرمان استفاده کنید.

به عنوان مثال، فایل تست زیر را در نظر بگیرید که به نام کاربری و رمز عبور نیاز دارد. معمولاً ایده خوبی است که اطلاعات محرمانه خود را در کد منبع ذخیره نکنید، بنابراین ما به راهی برای انتقال اطلاعات محرمانه از خارج نیاز داریم.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

شما می‌توانید این تست را با نام کاربری و رمز عبور محرمانه خود که در خط فرمان تنظیم شده‌اند، اجرا کنید.

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

به طور مشابه، فایل پیکربندی نیز می‌تواند متغیرهای محیطی را که از طریق خط فرمان ارسال شده‌اند، بخواند.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

حالا می‌توانید تست‌ها را در محیط آزمایشی یا تولید اجرا کنید:

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

## فایل‌های `.env`

برای مدیریت آسان‌تر متغیرهای محیطی، می‌توانید از فایل‌های `.env` استفاده کنید. WebdriverIO فایل‌های `.env` را به طور خودکار در محیط شما بارگذاری می‌کند. به جای تعریف متغیر محیطی به عنوان بخشی از فراخوانی دستور، می‌توانید `.env` زیر را تعریف کنید:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

تست‌ها را به طور معمول اجرا کنید، متغیرهای محیطی شما باید شناسایی شوند.

```sh
npx wdio run wdio.conf.js
```

## ایجاد تست‌ها از طریق فایل CSV

تست‌ران WebdriverIO در Node.js اجرا می‌شود، این بدان معناست که می‌توانید مستقیماً فایل‌ها را از سیستم فایل بخوانید و با کتابخانه CSV مورد نظر خود تجزیه کنید.

به عنوان مثال این فایل CSV را در نظر بگیرید، در مثال ما input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

بر اساس این، ما با استفاده از کتابخانه csv-parse از NPM برخی تست‌ها را تولید می‌کنیم:

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