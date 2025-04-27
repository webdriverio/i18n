---
id: parameterize-tests
title: சோதனைகளை அளவுருக்கள்படுத்துதல்
---

சோதனை அளவில், எளிய `for` loops போன்றவற்றின் மூலம் சோதனைகளை எளிதாக அளவுருக்கள்படுத்தலாம், எ.கா:

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

அல்லது சோதனைகளை இயக்க செயல்பாடுகளாக பிரித்தெடுப்பதன் மூலம், எ.கா:

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

## சுற்றுச்சூழல் மாறிகளை அனுப்புதல்

கட்டளை வரியிலிருந்து சோதனைகளை உள்ளமைக்க சுற்றுச்சூழல் மாறிகளைப் பயன்படுத்தலாம்.

எடுத்துக்காட்டாக, பயனர்பெயர் மற்றும் கடவுச்சொல் தேவைப்படும் பின்வரும் சோதனை கோப்பைக் கருதுங்கள். உங்கள் ரகசியங்களை மூலக் குறியீட்டில் சேமிக்காமல் இருப்பது பொதுவாக நல்ல யோசனை, எனவே வெளியிலிருந்து ரகசியங்களை அனுப்ப ஒரு வழி தேவைப்படும்.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

உங்கள் ரகசிய பயனர்பெயர் மற்றும் கடவுச்சொல்லை கட்டளை வரியில் அமைத்து இந்த சோதனையை இயக்கலாம்.

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

இதேபோல், கட்டமைப்பு கோப்பும் கட்டளை வரி மூலம் அனுப்பப்படும் சுற்றுச்சூழல் மாறிகளைப் படிக்கலாம்.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

இப்போது, நீங்கள் ஸ்டேஜிங் அல்லது உற்பத்தி சூழலில் சோதனைகளை இயக்கலாம்:

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

## `.env` கோப்புகள்

சுற்றுச்சூழல் மாறிகளை எளிதாக நிர்வகிக்க, `.env` கோப்புகள் போன்றவற்றைப் பரிசீலிக்கவும். WebdriverIO தானாகவே `.env` கோப்புகளை உங்கள் சூழலில் ஏற்றுகிறது. கட்டளை அழைப்பின் ஒரு பகுதியாக சுற்றுச்சூழல் மாறியை வரையறுப்பதற்குப் பதிலாக, நீங்கள் பின்வரும் `.env` ஐ வரையறுக்கலாம்:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

வழக்கம்போல் சோதனைகளை இயக்கவும், உங்கள் சுற்றுச்சூழல் மாறிகள் கண்டறியப்படும்.

```sh
npx wdio run wdio.conf.js
```

## CSV கோப்பு மூலம் சோதனைகளை உருவாக்குதல்

WebdriverIO சோதனை-இயக்கி Node.js இல் இயங்குகிறது, இதன் பொருள் நீங்கள் நேரடியாக கோப்பு அமைப்பிலிருந்து கோப்புகளைப் படித்து, உங்கள் விருப்பமான CSV நூலகத்துடன் அவற்றை பகுப்பாய்வு செய்யலாம்.

எடுத்துக்காட்டாக, இந்த CSV கோப்பைப் பார்க்கவும், நமது எடுத்துக்காட்டில் input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

இதன் அடிப்படையில் NPM இலிருந்து csv-parse நூலகத்தைப் பயன்படுத்தி சில சோதனைகளை உருவாக்குவோம்:

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