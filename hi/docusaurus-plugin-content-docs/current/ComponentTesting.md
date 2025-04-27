---
id: component-testing
title: कंपोनेंट टेस्टिंग
---

WebdriverIO के [Browser Runner](/docs/runner#browser-runner) के साथ आप वास्तविक डेस्कटॉप या मोबाइल ब्राउज़र में WebdriverIO और WebDriver प्रोटोकॉल का उपयोग करके टेस्ट चला सकते हैं, जिससे पेज पर रेंडर होने वाली चीज़ों को ऑटोमेट और इंटरैक्ट कर सकते हैं। इस दृष्टिकोण के [कई फायदे](/docs/runner#browser-runner) हैं, अन्य टेस्ट फ्रेमवर्क की तुलना में जो केवल [JSDOM](https://www.npmjs.com/package/jsdom) के खिलाफ टेस्टिंग की अनुमति देते हैं।

## यह कैसे काम करता है?

Browser Runner [Vite](https://vitejs.dev/) का उपयोग करके एक टेस्ट पेज रेंडर करता है और ब्राउज़र में आपके टेस्ट चलाने के लिए एक टेस्ट फ्रेमवर्क को इनिशियलाइज़ करता है। वर्तमान में यह केवल Mocha का समर्थन करता है, लेकिन Jasmine और Cucumber [रोडमैप पर हैं](https://github.com/orgs/webdriverio/projects/1)। यह किसी भी प्रकार के कंपोनेंट का परीक्षण करने की अनुमति देता है, यहां तक कि उन प्रोजेक्ट्स के लिए भी जो Vite का उपयोग नहीं करते हैं।

Vite सर्वर WebdriverIO टेस्टरनर द्वारा शुरू किया जाता है और इस तरह कॉन्फिगर किया जाता है कि आप सभी रिपोर्टर और सर्विसेज का उपयोग सामान्य e2e टेस्ट के लिए करते हैं। इसके अलावा यह एक [`browser`](/docs/api/browser) इंस्टेंस को इनिशियलाइज़ करता है जो आपको [WebdriverIO API](/docs/api) के एक सबसेट तक पहुंचने की अनुमति देता है ताकि आप पेज पर किसी भी एलिमेंट के साथ इंटरैक्ट कर सकें। e2e टेस्ट के समान, आप उस इंस्टेंस तक ग्लोबल स्कोप से जुड़े `browser` वेरिएबल के माध्यम से या `@wdio/globals` से इम्पोर्ट करके पहुंच सकते हैं, यह [`injectGlobals`](/docs/api/globals) के सेटिंग पर निर्भर करता है।

WebdriverIO में निम्नलिखित फ्रेमवर्क के लिए बिल्ट-इन सपोर्ट है:

- [__Nuxt__](https://nuxt.com/): WebdriverIO का टेस्टरनर Nuxt एप्लिकेशन का पता लगाता है और स्वचालित रूप से आपके प्रोजेक्ट कंपोजेबल्स को सेट करता है और Nuxt बैकएंड को मॉक करने में मदद करता है, [Nuxt दस्तावेज़ों](/docs/component-testing/vue#testing-vue-components-in-nuxt) में अधिक पढ़ें
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIO का टेस्टरनर पता लगाता है कि आप TailwindCSS का उपयोग कर रहे हैं और पर्यावरण को ठीक से टेस्ट पेज में लोड करता है

## सेटअप

ब्राउज़र में यूनिट या कंपोनेंट टेस्टिंग के लिए WebdriverIO सेट करने के लिए, एक नया WebdriverIO प्रोजेक्ट इस तरह शुरू करें:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

कॉन्फिगरेशन विज़ार्ड शुरू होने के बाद, यूनिट और कंपोनेंट टेस्टिंग के लिए `browser` चुनें और वांछित प्रीसेट में से एक चुनें, अन्यथा यदि आप केवल बेसिक यूनिट टेस्ट चलाना चाहते हैं तो _"Other"_ पर जाएं। यदि आप अपने प्रोजेक्ट में पहले से ही Vite का उपयोग करते हैं तो आप एक कस्टम Vite कॉन्फिगरेशन भी कॉन्फिगर कर सकते हैं। अधिक जानकारी के लिए सभी [रनर विकल्प](/docs/runner#runner-options) देखें।

:::info

__नोट:__ WebdriverIO डिफॉल्ट रूप से CI में ब्राउज़र टेस्ट हेडलेसली चलाएगा, उदाहरण के लिए, `CI` एनवायरनमेंट वेरिएबल `'1'` या `'true'` पर सेट है। आप रनर के लिए [`headless`](/docs/runner#headless) विकल्प का उपयोग करके इस व्यवहार को मैन्युअल रूप से कॉन्फिगर कर सकते हैं।

:::

इस प्रक्रिया के अंत में आपको एक `wdio.conf.js` मिलना चाहिए जिसमें विभिन्न WebdriverIO कॉन्फिगरेशन होंगी, जिसमें एक `runner` प्रॉपर्टी भी शामिल है, उदाहरण के लिए:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

विभिन्न [क्षमताओं](/docs/configuration#capabilities) को परिभाषित करके आप अपने टेस्ट को विभिन्न ब्राउज़र में चला सकते हैं, चाहें तो समानांतर रूप से।

अगर आप अभी भी अनिश्चित हैं कि सब कुछ कैसे काम करता है, तो WebdriverIO में कंपोनेंट टेस्टिंग के साथ शुरुआत करने के बारे में निम्नलिखित ट्यूटोरियल देखें:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## टेस्ट हार्नेस

यह पूरी तरह से आप पर निर्भर है कि आप अपने टेस्ट में क्या चलाना चाहते हैं और आप कंपोनेंट्स को कैसे रेंडर करना चाहते हैं। हालांकि हम यूटिलिटी फ्रेमवर्क के रूप में [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं क्योंकि यह विभिन्न कंपोनेंट फ्रेमवर्क के लिए प्लगइन प्रदान करता है, जैसे React, Preact, Svelte और Vue। यह टेस्ट पेज में कंपोनेंट्स को रेंडर करने के लिए बहुत उपयोगी है और यह हर टेस्ट के बाद स्वचालित रूप से इन कंपोनेंट्स को साफ करता है।

आप Testing Library प्रिमिटिव्स को WebdriverIO कमांड्स के साथ जैसे चाहें मिक्स कर सकते हैं, उदाहरण के लिए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__नोट:__ Testing Library से रेंडर मेथड्स का उपयोग करने से टेस्ट के बीच बनाए गए कंपोनेंट्स को हटाने में मदद मिलती है। यदि आप Testing Library का उपयोग नहीं करते हैं, तो सुनिश्चित करें कि आप अपने टेस्ट कंपोनेंट्स को ऐसे कंटेनर से जोड़ें जो टेस्ट के बीच साफ हो जाता है।

## सेटअप स्क्रिप्ट

आप Node.js या ब्राउज़र में मनमानी स्क्रिप्ट चलाकर अपने टेस्ट सेट अप कर सकते हैं, जैसे स्टाइल्स इंजेक्ट करना, ब्राउज़र API को मॉक करना या किसी तीसरे पक्ष की सेवा से कनेक्ट करना। WebdriverIO [hooks](/docs/configuration#hooks) का उपयोग Node.js में कोड चलाने के लिए किया जा सकता है, जबकि [`mochaOpts.require`](/docs/frameworks#require) आपको टेस्ट लोड होने से पहले ब्राउज़र में स्क्रिप्ट इम्पोर्ट करने की अनुमति देता है, उदाहरण के लिए:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // provide a setup script to run in the browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // set up test environment in Node.js
    }
    // ...
}
```

उदाहरण के लिए, यदि आप अपने टेस्ट में सभी [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) कॉल को निम्न सेट-अप स्क्रिप्ट के साथ मॉक करना चाहते हैं:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// run code before all tests are loaded
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // run code after test file is loaded
}

export const mochaGlobalTeardown = () => {
    // run code after spec file was executed
}

```

अब आप अपने टेस्ट में सभी ब्राउज़र अनुरोधों के लिए कस्टम रिस्पॉन्स वैल्यू प्रदान कर सकते हैं। ग्लोबल फिक्स्चर्स के बारे में [Mocha दस्तावेज़ों](https://mochajs.org/#global-fixtures) में अधिक पढ़ें।

## टेस्ट और एप्लिकेशन फाइल्स देखें

आप अपने ब्राउज़र टेस्ट को डीबग करने के कई तरीके हैं। सबसे आसान तरीका है WebdriverIO टेस्टरनर को `--watch` फ्लैग के साथ शुरू करना, उदाहरण के लिए:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

यह शुरू में सभी टेस्ट से गुजरेगा और सभी चलने के बाद रुक जाएगा। फिर आप व्यक्तिगत फाइलों में परिवर्तन कर सकते हैं जिन्हें फिर व्यक्तिगत रूप से फिर से चलाया जाएगा। यदि आप अपने एप्लिकेशन फाइलों को इंगित करने वाले [`filesToWatch`](/docs/configuration#filestowatch) सेट करते हैं, तो आपके ऐप में परिवर्तन होने पर यह सभी टेस्ट को फिर से चलाएगा।

## डीबगिंग

हालांकि आपके IDE में ब्रेकपॉइंट सेट करना और उन्हें रिमोट ब्राउज़र द्वारा पहचाना जाना (अभी तक) संभव नहीं है, आप किसी भी बिंदु पर टेस्ट को रोकने के लिए [`debug`](/docs/api/browser/debug) कमांड का उपयोग कर सकते हैं। इससे आप DevTools खोल सकते हैं और फिर [sources टैब](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) में ब्रेकपॉइंट सेट करके टेस्ट को डीबग कर सकते हैं।

जब `debug` कमांड कॉल की जाती है, तो आपको अपने टर्मिनल में एक Node.js repl इंटरफेस भी मिलेगा, जो कहता है:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

टेस्ट के साथ जारी रखने के लिए `Ctrl` या `Command` + `c` दबाएं या `.exit` दर्ज करें।

## Selenium Grid का उपयोग करके चलाएं

यदि आपके पास [Selenium Grid](https://www.selenium.dev/documentation/grid/) सेट अप है और आप अपना ब्राउज़र उस ग्रिड के माध्यम से चलाते हैं, तो आपको `host` ब्राउज़र रनर विकल्प सेट करना होगा ताकि ब्राउज़र सही होस्ट तक पहुंच सके जहां टेस्ट फाइलें सर्व की जा रही हैं, उदाहरण के लिए:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // network IP of the machine that runs the WebdriverIO process
        host: 'http://172.168.0.2'
    }]
}
```

यह सुनिश्चित करेगा कि ब्राउज़र सही तरीके से उस सर्वर इंस्टेंस को खोले जो WebdriverIO टेस्ट चलाने वाले इंस्टेंस पर होस्ट किया गया है।

## उदाहरण

आप लोकप्रिय कंपोनेंट फ्रेमवर्क का उपयोग करके कंपोनेंट्स के परीक्षण के लिए हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples) में विभिन्न उदाहरण पा सकते हैं।