---
id: parameterize-tests
title: परिक्षणों को पैरामीटराइज़ करें
---

आप किसी परीक्षण स्तर पर, सरल `for` लूप के माध्यम से परीक्षणों को आसानी से पैरामीटराइज़ कर सकते हैं, उदाहरण के लिए:

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

या परीक्षणों को गतिशील फ़ंक्शन में निकालकर, उदाहरण के लिए:

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

## पर्यावरण वेरिएबल पास करना

आप कमांड लाइन से परीक्षणों को कॉन्फ़िगर करने के लिए पर्यावरण वेरिएबल का उपयोग कर सकते हैं।

उदाहरण के लिए, निम्नलिखित परीक्षण फ़ाइल पर विचार करें जिसे यूज़रनेम और पासवर्ड की आवश्यकता है। आमतौर पर अपने गोपनीय जानकारी को सोर्स कोड में संग्रहित न करना एक अच्छा विचार होता है, इसलिए हमें बाहर से गोपनीय जानकारी पास करने का एक तरीका चाहिए होगा।

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

आप इस परीक्षण को अपने गुप्त उपयोगकर्ता नाम और पासवर्ड के साथ कमांड लाइन में सेट करके चला सकते हैं।

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

इसी तरह, कॉन्फ़िगरेशन फ़ाइल भी कमांड लाइन के माध्यम से पास किए गए पर्यावरण वेरिएबल को पढ़ सकती है।

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

अब, आप स्टेजिंग या प्रोडक्शन वातावरण के खिलाफ परीक्षण चला सकते हैं:

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

## `.env` फ़ाइलें

पर्यावरण वेरिएबल को आसानी से प्रबंधित करने के लिए, `.env` फ़ाइलों जैसे कुछ पर विचार करें। WebdriverIO स्वचालित रूप से `.env` फ़ाइलों को आपके पर्यावरण में लोड करता है। कमांड कॉल के हिस्से के रूप में पर्यावरण वेरिएबल को परिभाषित करने के बजाय, आप निम्नलिखित `.env` को परिभाषित कर सकते हैं:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

सामान्य रूप से परीक्षण चलाएं, आपके पर्यावरण वेरिएबल को पिक अप किया जाना चाहिए।

```sh
npx wdio run wdio.conf.js
```

## CSV फ़ाइल के माध्यम से परीक्षण बनाएं

WebdriverIO टेस्ट-रनर Node.js में चलता है, इसका मतलब है कि आप फ़ाइल सिस्टम से सीधे फ़ाइलें पढ़ सकते हैं और उन्हें अपनी पसंदीदा CSV लाइब्रेरी के साथ पार्स कर सकते हैं।

उदाहरण के लिए इस CSV फ़ाइल को देखें, हमारे उदाहरण में input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

इसके आधार पर हम NPM से csv-parse लाइब्रेरी का उपयोग करके कुछ परीक्षण उत्पन्न करेंगे:

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