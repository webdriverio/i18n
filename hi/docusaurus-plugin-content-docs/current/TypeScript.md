---
id: typescript
title: टाइपस्क्रिप्ट सेटअप
---

आप [TypeScript](http://www.typescriptlang.org) का उपयोग करके टेस्ट लिख सकते हैं, जिससे आपको ऑटो-कंप्लीशन और टाइप सेफ्टी मिलेगी।

आपको [`tsx`](https://github.com/privatenumber/tsx) को `devDependencies` में इंस्टॉल करना होगा, इस तरह से:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO स्वचालित रूप से पता लगा लेगा कि क्या ये डिपेंडेंसीज इंस्टॉल की गई हैं और आपके कॉन्फिग और टेस्ट को आपके लिए कंपाइल करेगा। सुनिश्चित करें कि आपके WDIO कॉन्फिग के साथ एक ही डायरेक्टरी में `tsconfig.json` हो।

#### कस्टम TSConfig

यदि आपको `tsconfig.json` के लिए एक अलग पथ सेट करने की आवश्यकता है, तो कृपया अपने वांछित पथ के साथ TSCONFIG_PATH पर्यावरण वेरिएबल सेट करें, या wdio कॉन्फिग के [tsConfigPath सेटिंग](/docs/configurationfile) का उपयोग करें।

वैकल्पिक रूप से, आप `tsx` के लिए [पर्यावरण वेरिएबल](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) का उपयोग कर सकते हैं।


#### टाइप चेकिंग

ध्यान दें कि `tsx` टाइप-चेकिंग का समर्थन नहीं करता है - यदि आप अपने टाइप्स की जांच करना चाहते हैं तो आपको `tsc` के साथ एक अलग चरण में ऐसा करना होगा।

## फ्रेमवर्क सेटअप

आपके `tsconfig.json` में निम्नलिखित की आवश्यकता होती है:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

कृपया `webdriverio` या `@wdio/sync` को स्पष्ट रूप से इम्पोर्ट करने से बचें।
`WebdriverIO` और `WebDriver` टाइप्स कहीं से भी एक्सेसिबल हैं, एक बार `tsconfig.json` में `types` में जोड़ने के बाद। यदि आप अतिरिक्त WebdriverIO सेवाओं, प्लगइन्स या `devtools` ऑटोमेशन पैकेज का उपयोग करते हैं, तो कृपया उन्हें भी `types` सूची में जोड़ें क्योंकि कई अतिरिक्त टाइपिंग प्रदान करते हैं।

## फ्रेमवर्क टाइप्स

आप जिस फ्रेमवर्क का उपयोग करते हैं, उसके आधार पर आपको उस फ्रेमवर्क के लिए टाइप्स को अपने `tsconfig.json` टाइप्स प्रॉपर्टी में जोड़ना होगा, साथ ही उसके टाइप डेफिनिशन्स भी इंस्टॉल करनी होंगी। यह विशेष रूप से महत्वपूर्ण है यदि आप बिल्ट-इन असर्शन लाइब्रेरी [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) के लिए टाइप सपोर्ट चाहते हैं।

उदाहरण के लिए, यदि आप Mocha फ्रेमवर्क का उपयोग करने का निर्णय लेते हैं, तो आपको `@types/mocha` इंस्टॉल करने और इसे इस तरह से जोड़ने की आवश्यकता है ताकि सभी टाइप्स ग्लोबली उपलब्ध हों:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## सेवाएँ

यदि आप ऐसी सेवाओं का उपयोग करते हैं जो ब्राउज़र स्कोप में कमांड जोड़ती हैं, तो आपको इन्हें अपने `tsconfig.json` में भी शामिल करना होगा। उदाहरण के लिए यदि आप `@wdio/lighthouse-service` का उपयोग करते हैं, तो सुनिश्चित करें कि आप इसे भी `types` में जोड़ें, जैसे:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

अपने TypeScript कॉन्फिग में सेवाओं और रिपोर्टर्स को जोड़ने से आपके WebdriverIO कॉन्फिग फ़ाइल की टाइप सेफ्टी भी मजबूत होती है।

## टाइप डेफिनिशन्स

WebdriverIO कमांड्स चलाते समय सभी प्रॉपर्टीज आमतौर पर टाइप की होती हैं ताकि आपको अतिरिक्त टाइप्स इम्पोर्ट करने से निपटने की आवश्यकता न हो। हालांकि, ऐसे मामले हैं जहां आप वेरिएबल्स को पहले से परिभाषित करना चाहते हैं। यह सुनिश्चित करने के लिए कि ये टाइप सेफ हैं, आप [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) पैकेज में परिभाषित सभी टाइप्स का उपयोग कर सकते हैं। उदाहरण के लिए यदि आप `webdriverio` के लिए रिमोट ऑप्शन को परिभाषित करना चाहते हैं तो आप कर सकते हैं:

```ts
import type { Options } from '@wdio/types'

// यहां एक उदाहरण है जहां आप सीधे प्रकारों को आयात करना चाह सकते हैं
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// अन्य मामलों के लिए, आप `WebdriverIO` नेमस्पेस का उपयोग कर सकते हैं
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // अन्य कॉन्फिग विकल्प
}
```

## टिप्स और हिंट्स

### कंपाइल और लिंट

पूरी तरह से सुरक्षित होने के लिए, आप सर्वोत्तम प्रथाओं का पालन करने पर विचार कर सकते हैं: अपने कोड को TypeScript कंपाइलर (run `tsc` या `npx tsc`) के साथ कंपाइल करें और [pre-commit hook](https://github.com/typicode/husky) पर [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) चलाएं।