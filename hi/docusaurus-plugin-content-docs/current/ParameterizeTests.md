---
id: parameterize-tests
title: टेस्ट को पैरामीटराइज़ करें
description: "लूप और डायनामिक फ़ंक्शन, एनवायरनमेंट वेरिएबल, .env फ़ाइलों या CSV फ़ाइल के डेटा के साथ टेस्ट को पैरामीटराइज़ करें।"
---

आप टेस्ट लेवल पर सरल `for` लूप के माध्यम से टेस्ट को आसानी से पैरामीटराइज़ कर सकते हैं, उदाहरण के लिए:

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

या टेस्ट को डायनामिक फ़ंक्शन में निकालकर, उदाहरण के लिए:

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

## एनवायरनमेंट वेरिएबल पास करना

आप कमांड लाइन से टेस्ट को कॉन्फ़िगर करने के लिए एनवायरनमेंट वेरिएबल का उपयोग कर सकते हैं।

उदाहरण के लिए, निम्नलिखित टेस्ट फ़ाइल पर विचार करें जिसे एक यूज़रनेम और पासवर्ड की आवश्यकता है। आमतौर पर अपने सीक्रेट्स को सोर्स कोड में संग्रहीत न करना एक अच्छा विचार है, इसलिए हमें बाहर से सीक्रेट्स पास करने का एक तरीका चाहिए।

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

आप इस टेस्ट को कमांड लाइन में सेट किए गए अपने सीक्रेट यूज़रनेम और पासवर्ड के साथ चला सकते हैं।

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

इसी प्रकार, कॉन्फ़िगरेशन फ़ाइल भी कमांड लाइन के माध्यम से पास किए गए एनवायरनमेंट वेरिएबल को पढ़ सकती है।

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

अब, आप स्टेजिंग या प्रोडक्शन एनवायरनमेंट के विरुद्ध टेस्ट चला सकते हैं:

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

एनवायरनमेंट वेरिएबल को प्रबंधित करना आसान बनाने के लिए, `.env` फ़ाइलों जैसी किसी चीज़ पर विचार करें। WebdriverIO `.env` फ़ाइलों को स्वचालित रूप से आपके एनवायरनमेंट में लोड करता है। एनवायरनमेंट वेरिएबल को कमांड कॉल के हिस्से के रूप में परिभाषित करने के बजाय, आप निम्नलिखित `.env` परिभाषित कर सकते हैं:

```bash title=".env"
# .env फ़ाइल
STAGING=0
USERNAME=me
PASSWORD=secret
```

टेस्ट को सामान्य रूप से चलाएं, आपके एनवायरनमेंट वेरिएबल अपने आप ले लिए जाने चाहिए।

```sh
npx wdio run wdio.conf.js
```

## CSV फ़ाइल के माध्यम से टेस्ट बनाएं

WebdriverIO टेस्ट-रनर Node.js में चलता है, इसका मतलब है कि आप सीधे फ़ाइल सिस्टम से फ़ाइलें पढ़ सकते हैं और उन्हें अपनी पसंदीदा CSV लाइब्रेरी के साथ पार्स कर सकते हैं।

उदाहरण के लिए इस CSV फ़ाइल को देखें, हमारे उदाहरण में input.csv:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

इसके आधार पर हम NPM की csv-parse लाइब्रेरी का उपयोग करके कुछ टेस्ट जनरेट करेंगे:

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