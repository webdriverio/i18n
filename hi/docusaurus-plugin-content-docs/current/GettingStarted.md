---
id: gettingstarted
title: शुरुआत करें
description: npm init wdio@latest के साथ एक WebdriverIO प्रोजेक्ट बनाएं, अपना पहला टेस्ट चलाएं और अपने प्लेटफ़ॉर्म के लिए अगली गाइड खोजें।
---

एक ही कमांड से किसी मौजूदा या नए प्रोजेक्ट में WebdriverIO सेट अप करें, फिर अपना पहला टेस्ट चलाएं। कॉन्फ़िगरेशन विज़ार्ड पूछता है कि आप क्या टेस्ट करना चाहते हैं (वेब, मोबाइल, डेस्कटॉप या VS Code एक्सटेंशन), कौन सा फ्रेमवर्क और रिपोर्टर उपयोग करने हैं, और आपके लिए सब कुछ इंस्टॉल कर देता है।

:::info
ये WebdriverIO __v10__ के डॉक्स हैं। अभी भी v9 पर हैं? [v9 डॉक्यूमेंटेशन](https://v9.webdriver.io) का उपयोग करें या [v10 माइग्रेशन गाइड](/docs/v10-migration) का पालन करें।
:::

:::tip कोडिंग एजेंट का उपयोग कर रहे हैं?
इसे [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) की ओर निर्देशित करें या `https://webdriver.io/mcp` पर डॉक्स MCP सर्वर से कनेक्ट करें। [कोडिंग एजेंट्स के लिए WebdriverIO](/docs/ai-agents) देखें।
:::

## WebdriverIO सेटअप शुरू करें

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) किसी मौजूदा या नए प्रोजेक्ट में एक पूर्ण WebdriverIO सेटअप जोड़ता है। किसी मौजूदा प्रोजेक्ट की रूट डायरेक्टरी में, यह चलाएं:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

या यदि आप एक नया प्रोजेक्ट बनाना चाहते हैं:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

या यदि आप एक नया प्रोजेक्ट बनाना चाहते हैं:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

या यदि आप एक नया प्रोजेक्ट बनाना चाहते हैं:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

या यदि आप एक नया प्रोजेक्ट बनाना चाहते हैं:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

यह एकल कमांड WebdriverIO CLI टूल डाउनलोड करता है और एक कॉन्फ़िगरेशन विज़ार्ड चलाता है जो आपके टेस्ट सूट को कॉन्फ़िगर करने में आपकी मदद करता है।

<CreateProjectAnimation />

विज़ार्ड कुछ प्रश्न पूछेगा जो सेटअप में आपका मार्गदर्शन करते हैं। आप एक डिफ़ॉल्ट सेटअप चुनने के लिए `--yes` पैरामीटर पास कर सकते हैं, जो [Page Object](https://martinfowler.com/bliki/PageObject.html) पैटर्न का उपयोग करते हुए Chrome के साथ Mocha का उपयोग करेगा।

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### फ़्लैग्स के साथ विज़ार्ड के उत्तर दें

विज़ार्ड के हर प्रश्न के लिए एक कमांड लाइन फ़्लैग है। एक फ़्लैग अपने प्रश्न का उत्तर देता है और विज़ार्ड केवल बाकी प्रश्न पूछता है। `--yes` के साथ, विज़ार्ड बाकी के लिए डिफ़ॉल्ट का उपयोग करता है और कभी कोई प्रॉम्प्ट नहीं दिखाता, जो कि एक कोडिंग एजेंट या CI जॉब को चाहिए:

```sh
# JavaScript में Cucumber, spec और JUnit रिपोर्टर्स के साथ
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Chrome के बजाय Firefox और Edge
npm init wdio@latest . -- --yes --browsers firefox,edge

# Appium के साथ एक Android ऐप
npm init wdio@latest . -- --yes --mobile-environment android

# React कंपोनेंट टेस्ट
npm init wdio@latest . -- --yes --runner component --preset react

# कॉन्फ़िग लिखें, लेकिन डिपेंडेंसीज़ स्वयं इंस्टॉल करें
npm init wdio@latest . -- --yes --no-npm-install
```

Yarn, pnpm और bun के साथ, फ़्लैग्स को `--` सेपरेटर के बिना पास करें, जैसे `pnpm create wdio@latest . --yes --framework cucumber`।

सबसे आम फ़्लैग्स:

| फ़्लैग | मान |
| --- | --- |
| `--runner` | `e2e` (डिफ़ॉल्ट), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (डिफ़ॉल्ट), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | जब प्रोजेक्ट में `tsconfig.json` हो तो TypeScript डिफ़ॉल्ट है |
| `--browsers` | `chrome` (डिफ़ॉल्ट), `firefox`, `safari`, `edge` की कॉमा-से-अलग सूची |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (डिफ़ॉल्ट), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, `--runner component` के साथ |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, `--runner desktop` के साथ |
| `--reporters`, `--services`, `--plugins` | कॉमा-से-अलग छोटे नाम, जैसे `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | `AGENTS.md` सेक्शन और `wdio-session` स्किल लिखें (डिफ़ॉल्ट रूप से चालू) |
| `--npm-install` / `--no-npm-install` | डिपेंडेंसीज़ इंस्टॉल करें (डिफ़ॉल्ट रूप से चालू) |

`npm init wdio@latest -- --help` हर फ़्लैग, उसके द्वारा स्वीकार किए जाने वाले मान और उसके द्वारा उत्तर दिए जाने वाले प्रश्न की सूची देता है। बूलियन फ़्लैग्स `--no-` प्रीफ़िक्स लेते हैं। यही फ़्लैग्स `npx wdio config` के साथ भी काम करते हैं।

विज़ार्ड हर फ़्लैग को आपके सेटअप के अनुसार जांचता है। कोई अज्ञात मान, किसी ऐसे प्रश्न के लिए फ़्लैग जो वह नहीं पूछेगा, या कोई ऐसा मान जो वह आपके सेटअप के लिए प्रदान नहीं करेगा, किसी भी फ़ाइल को लिखने से पहले उसे एग्ज़िट कोड 2 के साथ रोक देता है:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## CLI मैन्युअल रूप से इंस्टॉल करें

आप CLI पैकेज को अपने प्रोजेक्ट में मैन्युअल रूप से भी इस प्रकार जोड़ सकते हैं:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # उदाहरण के लिए `8.13.10` प्रिंट करता है

# कॉन्फ़िगरेशन विज़ार्ड चलाएं
npx wdio config
```

## टेस्ट चलाएं

आप `run` कमांड का उपयोग करके और अभी-अभी बनाए गए WebdriverIO कॉन्फ़िग की ओर इंगित करके अपना टेस्ट सूट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

यदि आप विशिष्ट टेस्ट फ़ाइलें चलाना चाहते हैं तो आप `--spec` पैरामीटर जोड़ सकते हैं:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

या अपनी कॉन्फ़िग फ़ाइल में सूट्स परिभाषित करें और केवल किसी सूट में परिभाषित टेस्ट फ़ाइलें चलाएं:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## स्क्रिप्ट में चलाएं

यदि आप किसी Node.JS स्क्रिप्ट के भीतर [Standalone Mode](/docs/setuptypes#standalone-mode) में WebdriverIO को एक ऑटोमेशन इंजन के रूप में उपयोग करना चाहते हैं, तो आप WebdriverIO को सीधे इंस्टॉल करके एक पैकेज के रूप में भी उपयोग कर सकते हैं, जैसे किसी वेबसाइट का स्क्रीनशॉट बनाने के लिए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__नोट:__ सभी WebdriverIO कमांड्स एसिंक्रोनस हैं और इन्हें [`async/await`](https://javascript.info/async-await) का उपयोग करके ठीक से हैंडल करना आवश्यक है।

## टेस्ट रिकॉर्ड करें

WebdriverIO ऐसे टूल्स प्रदान करता है जो स्क्रीन पर आपके टेस्ट एक्शन्स को रिकॉर्ड करके और स्वचालित रूप से WebdriverIO टेस्ट स्क्रिप्ट्स जनरेट करके शुरुआत करने में आपकी मदद करते हैं। अधिक जानकारी के लिए [Chrome DevTools Recorder के साथ टेस्ट रिकॉर्ड करें](/docs/record) देखें।

## सिस्टम आवश्यकताएं

आपके पास [Node.js](http://nodejs.org) इंस्टॉल होना चाहिए।

- कम से कम v22.19.0 या उससे ऊपर का संस्करण इंस्टॉल करें क्योंकि यह सबसे पुराना समर्थित LTS संस्करण है
- केवल वही रिलीज़ आधिकारिक रूप से समर्थित हैं जो LTS रिलीज़ हैं या बनेंगी

यदि आपके सिस्टम पर वर्तमान में Node इंस्टॉल नहीं है, तो हम कई सक्रिय Node.js संस्करणों को प्रबंधित करने में सहायता के लिए [NVM](https://github.com/creationix/nvm) या [Volta](https://volta.sh/) जैसे टूल का उपयोग करने का सुझाव देते हैं। NVM एक लोकप्रिय विकल्प है, जबकि Volta भी एक अच्छा विकल्प है।

## परिचय देखें

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

अधिक वीडियो [आधिकारिक YouTube चैनल](https://youtube.com/@webdriverio) पर उपलब्ध हैं।

## अगले कदम

- अपना प्लेटफ़ॉर्म चुनें: [वेब ब्राउज़र](/docs/platforms/web), [मोबाइल ऐप्स](/docs/platforms/mobile), [डेस्कटॉप ऐप्स](/docs/platforms/desktop) या [एक्सटेंशन और एडिटर](/docs/platforms/apps-and-extensions)
- जानें कि [एलिमेंट्स कैसे चुनें](/docs/selectors) और [असर्शन](/docs/assertion) कैसे लिखें
- [`wdio.conf.ts`](/docs/configurationfile) में टेस्ट रनर को कॉन्फ़िगर करें
- [Discord](https://discord.webdriver.io) पर सहायता प्राप्त करें