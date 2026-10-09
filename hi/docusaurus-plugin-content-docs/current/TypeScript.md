---
id: typescript
title: TypeScript सेटअप
description: "tsx के साथ TypeScript में WebdriverIO टेस्ट लिखें, tsconfig.json सेट करें और फ्रेमवर्क, सर्विसेज़ और कस्टम कमांड के लिए टाइप डेफिनिशन जोड़ें।"
---

ऑटो-कम्प्लीशन और टाइप सेफ्टी पाने के लिए आप [TypeScript](http://www.typescriptlang.org) का उपयोग करके टेस्ट लिख सकते हैं।

आपको [`tsx`](https://github.com/privatenumber/tsx) को `devDependencies` में इंस्टॉल करना होगा, इसके माध्यम से:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO स्वचालित रूप से पता लगा लेगा कि ये डिपेंडेंसीज़ इंस्टॉल हैं या नहीं, और आपके कॉन्फ़िग और टेस्ट को आपके लिए कंपाइल करेगा। सुनिश्चित करें कि आपके WDIO कॉन्फ़िग वाली डायरेक्टरी में ही एक `tsconfig.json` मौजूद हो।

#### कस्टम TSConfig

यदि आपको `tsconfig.json` के लिए कोई अलग पाथ सेट करना है, तो कृपया TSCONFIG_PATH एनवायरनमेंट वेरिएबल को अपने इच्छित पाथ के साथ सेट करें, या wdio कॉन्फ़िग की [tsConfigPath सेटिंग](/docs/configurationfile) का उपयोग करें।

वैकल्पिक रूप से, आप `tsx` के लिए [एनवायरनमेंट वेरिएबल](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) का उपयोग कर सकते हैं।


#### टाइप चेकिंग

ध्यान दें कि `tsx` टाइप-चेकिंग को सपोर्ट नहीं करता है - यदि आप अपने टाइप्स की जाँच करना चाहते हैं, तो आपको इसे `tsc` के साथ एक अलग चरण में करना होगा।

## फ्रेमवर्क सेटअप

आपके `tsconfig.json` में निम्नलिखित होना आवश्यक है:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

कृपया `webdriverio` या `@wdio/sync` को स्पष्ट रूप से इम्पोर्ट करने से बचें।
`tsconfig.json` में `types` में जोड़े जाने के बाद `WebdriverIO` और `WebDriver` टाइप्स कहीं से भी एक्सेस किए जा सकते हैं। यदि आप अतिरिक्त WebdriverIO सर्विसेज़, प्लगइन्स या `devtools` ऑटोमेशन पैकेज का उपयोग करते हैं, तो कृपया उन्हें भी `types` सूची में जोड़ें, क्योंकि उनमें से कई अतिरिक्त टाइपिंग प्रदान करते हैं।

## फ्रेमवर्क टाइप्स

आप जिस फ्रेमवर्क का उपयोग करते हैं, उसके आधार पर आपको उस फ्रेमवर्क के टाइप्स को अपने `tsconfig.json` की types प्रॉपर्टी में जोड़ना होगा, साथ ही उसकी टाइप डेफिनिशन भी इंस्टॉल करनी होंगी। यह विशेष रूप से तब महत्वपूर्ण है जब आप बिल्ट-इन असर्शन लाइब्रेरी [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) के लिए टाइप सपोर्ट चाहते हैं।

उदाहरण के लिए, यदि आप Mocha फ्रेमवर्क का उपयोग करने का निर्णय लेते हैं, तो आपको `@types/mocha` इंस्टॉल करना होगा और सभी टाइप्स को ग्लोबली उपलब्ध कराने के लिए इसे इस प्रकार जोड़ना होगा:

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
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine`, `@types/jasmine` को लोड करता है, जो `jasmine`, `spyOn` और `expectAsync` प्रदान करता है। `@wdio/jasmine-framework` के साथ, ग्लोबल `expect` Jasmine सिंक मैचर्स के लिए `void` और WebdriverIO मैचर्स तथा Jasmine एसिंक मैचर्स के लिए एक `Promise` रिटर्न करता है। `expectAsync` में भी WebdriverIO मैचर्स उपलब्ध होते हैं। `expect-webdriverio` का `expect` एक्सपोर्ट अपने Jest मैचर्स को बनाए रखता है।

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

## सर्विसेज़

यदि आप ऐसी सर्विसेज़ का उपयोग करते हैं जो browser स्कोप में कमांड जोड़ती हैं, तो आपको इन्हें भी अपने `tsconfig.json` में शामिल करना होगा। उदाहरण के लिए, यदि आप `@wdio/lighthouse-service` का उपयोग करते हैं, तो सुनिश्चित करें कि आप इसे भी `types` में जोड़ें, जैसे:

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

अपने TypeScript कॉन्फ़िग में सर्विसेज़ और रिपोर्टर्स जोड़ने से आपकी WebdriverIO कॉन्फ़िग फ़ाइल की टाइप सेफ्टी भी मज़बूत होती है।

## टाइप डेफिनिशन

WebdriverIO कमांड चलाते समय सभी प्रॉपर्टीज़ आमतौर पर टाइप्ड होती हैं, ताकि आपको अतिरिक्त टाइप्स इम्पोर्ट करने की ज़रूरत न पड़े। हालाँकि, कुछ ऐसे मामले होते हैं जहाँ आप वेरिएबल्स को पहले से परिभाषित करना चाहते हैं। यह सुनिश्चित करने के लिए कि ये टाइप सेफ हों, आप [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) पैकेज में परिभाषित सभी टाइप्स का उपयोग कर सकते हैं। उदाहरण के लिए, यदि आप `webdriverio` के लिए रिमोट ऑप्शन परिभाषित करना चाहते हैं, तो आप ऐसा कर सकते हैं:

```ts
import type { Options } from '@wdio/types'

// यहाँ एक उदाहरण है जहाँ आप टाइप्स को सीधे इम्पोर्ट करना चाह सकते हैं
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
  // अन्य कॉन्फ़िग ऑप्शन
}
```

## टिप्स और संकेत

### कंपाइल और लिंट

पूरी तरह सुरक्षित रहने के लिए, आप सर्वोत्तम प्रथाओं का पालन करने पर विचार कर सकते हैं: अपने कोड को TypeScript कंपाइलर से कंपाइल करें (`tsc` या `npx tsc` चलाएँ) और [pre-commit hook](https://github.com/typicode/husky) पर [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) चलाएँ।