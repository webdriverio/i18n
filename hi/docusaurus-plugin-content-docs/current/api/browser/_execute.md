---
id: execute
title: निष्पादित करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

वर्तमान में चयनित फ्रेम के संदर्भ में निष्पादन के लिए पृष्ठ पर JavaScript का एक स्निपेट इंजेक्ट करें।
निष्पादित स्क्रिप्ट को सिंक्रोनस माना जाता है और स्क्रिप्ट का मूल्यांकन करने का परिणाम क्लाइंट को 
वापस किया जाता है।

स्क्रिप्ट तर्क एक फंक्शन बॉडी के रूप में निष्पादित होने वाली स्क्रिप्ट को परिभाषित करता है। उस फंक्शन 
द्वारा लौटाया गया मान क्लाइंट को वापस कर दिया जाएगा। फंक्शन को प्रदान किए गए args ऐरे के साथ आमंत्रित 
किया जाएगा और मानों तक निर्दिष्ट क्रम में आर्ग्युमेंट्स ऑब्जेक्ट के माध्यम से पहुंचा जा सकता है।

आर्ग्युमेंट्स कोई भी JSON-प्रिमिटिव, ऐरे, या JSON ऑब्जेक्ट हो सकते हैं। JSON ऑब्जेक्ट जो WebElement 
रेफरेंस को परिभाषित करते हैं, उन्हें संबंधित DOM एलिमेंट में परिवर्तित किया जाएगा। इसी तरह, स्क्रिप्ट 
परिणाम में कोई भी WebElements क्लाइंट को WebElement JSON ऑब्जेक्ट्स के रूप में वापस किया जाएगा।

##### उपयोग

```js
browser.execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>निष्पादित करने के लिए स्क्रिप्ट।</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`*`</td>
      <td>स्क्रिप्ट आर्ग्युमेंट्स</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### रिटर्न

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              स्क्रिप्ट का परिणाम।