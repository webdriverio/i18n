---
id: keys
title: कुंजियाँ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

"सक्रिय" तत्व पर कुंजी दबाने का अनुक्रम भेजें। आप किसी इनपुट तत्व को केवल उस पर क्लिक करके सक्रिय कर सकते हैं। "लेफ्ट एरो" या "बैक स्पेस" जैसे वर्णों का उपयोग करने के लिए, WebdriverIO पैकेज से `Key` ऑब्जेक्ट आयात करें।

`Control`, `Shift`, `Alt` और `Command` जैसे मॉडिफायर दबे रहेंगे, इसलिए उन्हें छोड़ने के लिए आपको उन्हें फिर से ट्रिगर करना होगा। हालांकि, क्लिक को संशोधित करने के लिए आपको [performActions](https://webdriver.io/docs/api/webdriver#performactions) मेथड के माध्यम से WebDriver Actions API का उपयोग करना होगा।

:::info

नियंत्रण कुंजियाँ ब्राउज़र चलाने वाले ऑपरेटिंग सिस्टम के आधार पर भिन्न होती हैं, उदाहरण के लिए MacOS: `Command` और Windows: `Control`।
WebdriverIO एक क्रॉस ब्राउज़र मॉडिफायर कंट्रोल की प्रदान करता है जिसे `Ctrl` कहा जाता है (नीचे दिए गए उदाहरण देखें)।

:::

##### उपयोग

```js
browser.keys(value)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>टाइप करने के लिए कुंजियों का अनुक्रम। एक सरणी या स्ट्रिंग प्रदान की जानी चाहिए।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```