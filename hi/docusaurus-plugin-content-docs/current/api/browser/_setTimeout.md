---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

वर्तमान सत्र से जुड़े टाइमआउट को सेट करता है, टाइमआउट अवधि स्क्रिप्ट इंजेक्शन, दस्तावेज़ नेविगेशन और तत्व प्राप्ति जैसे व्यवहारों को नियंत्रित करती है।
अधिक जानकारी और उदाहरणों के लिए, [टाइमआउट गाइड](https://webdriver.io/docs/timeouts#selenium-timeouts) देखें।

:::info

`implicit` टाइमआउट सेट करने की सिफारिश नहीं की जाती है क्योंकि वे WebdriverIO के व्यवहार को प्रभावित करते हैं
और कुछ कमांड्स में त्रुटियों का कारण बन सकते हैं, जैसे रिवर्स फ्लैग के साथ `waitForExist`।

:::

##### उपयोग

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>सत्र टाइमआउट मानों वाला ऑब्जेक्ट</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>किसी तत्व को खोजते समय तत्व स्थान रणनीति को पुन: प्रयास करने के लिए मिलीसेकंड में समय।</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>दस्तावेज़ को लोड होने के लिए प्रतीक्षा करने का समय मिलीसेकंड में।</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>[`execute`](https://webdriver.io/docs/api/browser/execute) या [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) के साथ इंजेक्ट की गई स्क्रिप्ट तब तक चलेंगी जब तक वे स्क्रिप्ट टाइमआउट अवधि तक नहीं पहुंचती हैं, जो मिलीसेकंड में भी दी जाती है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```