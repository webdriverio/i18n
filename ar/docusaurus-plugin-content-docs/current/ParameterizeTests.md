---
id: parameterize-tests
title: اختبارات مع المعلمات
---

يمكنك ببساطة إنشاء اختبارات مع معلمات على مستوى الاختبار، عبر حلقات `for` البسيطة، على سبيل المثال:

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

أو من خلال استخراج الاختبارات إلى دوال ديناميكية، على سبيل المثال:

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

## تمرير متغيرات البيئة

يمكنك استخدام متغيرات البيئة لتكوين الاختبارات من سطر الأوامر.

على سبيل المثال، ضع في اعتبارك ملف الاختبار التالي الذي يحتاج إلى اسم مستخدم وكلمة مرور. عادة ما تكون فكرة جيدة عدم تخزين بياناتك السرية في كود المصدر، لذلك سنحتاج إلى طريقة لتمرير الأسرار من الخارج.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

يمكنك تشغيل هذا الاختبار مع تعيين اسم المستخدم وكلمة المرور السرية في سطر الأوامر.

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

وبالمثل، يمكن لملف التكوين أيضًا قراءة متغيرات البيئة التي تم تمريرها عبر سطر الأوامر.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

الآن، يمكنك تشغيل الاختبارات على بيئة الاختبار أو بيئة الإنتاج:

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

## ملفات `.env`

لتسهيل إدارة متغيرات البيئة، يمكنك استخدام ملفات `.env`. يقوم WebdriverIO بتحميل ملفات `.env` تلقائيًا في بيئتك. بدلاً من تعريف متغير البيئة كجزء من استدعاء الأمر، يمكنك تعريف ملف `.env` التالي:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

قم بتشغيل الاختبارات كالمعتاد، سيتم التعرف على متغيرات البيئة الخاصة بك.

```sh
npx wdio run wdio.conf.js
```

## إنشاء اختبارات عبر ملف CSV

يعمل مشغل اختبار WebdriverIO في Node.js، وهذا يعني أنه يمكنك قراءة الملفات مباشرة من نظام الملفات وتحليلها باستخدام مكتبة CSV المفضلة لديك.

انظر على سبيل المثال إلى ملف CSV هذا، في مثالنا input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

بناءً على هذا، سنقوم بإنشاء بعض الاختبارات باستخدام مكتبة csv-parse من NPM:

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