---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
`executeAsync` कमांड पुरानी हो चुकी है और भविष्य के संस्करण में हटा दी जाएगी।
कृपया इसके बजाय `execute` कमांड का उपयोग करें क्योंकि यह `async`/`await` के माध्यम से
त्रुटि संभालने के लिए बेहतर समर्थन प्रदान करता है।
:::

वर्तमान में चयनित फ्रेम के संदर्भ में निष्पादन के लिए पेज में JavaScript का एक स्निपेट इंजेक्ट करें। निष्पादित स्क्रिप्ट को अनुकूल (asynchronous) माना जाता है और उसे प्रदान किए गए कॉलबैक को इनवोक करके समाप्ति का संकेत देना चाहिए, जो हमेशा फ़ंक्शन के अंतिम आर्गुमेंट के रूप में प्रदान किया जाता है। इस कॉलबैक के मान को क्लाइंट को वापस कर दिया जाएगा।

अतुल्यकालिक स्क्रिप्ट कमांड पेज लोड के दौरान काम नहीं कर सकते। यदि स्क्रिप्ट परिणाम का इंतज़ार करते समय एक अनलोड इवेंट फायर होता है, तो क्लाइंट को एक त्रुटि वापस की जानी चाहिए।

स्क्रिप्ट आर्गुमेंट फ़ंक्शन बॉडी के रूप में निष्पादित करने के लिए स्क्रिप्ट को परिभाषित करता है। फ़ंक्शन को प्रदान किए गए आर्गुमेंट्स ऐरे के साथ इनवोक किया जाएगा और मानों को निर्दिष्ट क्रम में आर्गुमेंट्स ऑब्जेक्ट के माध्यम से एक्सेस किया जा सकता है। अंतिम आर्गुमेंट हमेशा एक कॉलबैक फ़ंक्शन होगा जिसे स्क्रिप्ट के समाप्त होने का संकेत देने के लिए इनवोक करना होगा।

आर्गुमेंट्स कोई भी JSON-प्रिमिटिव, ऐरे, या JSON ऑब्जेक्ट हो सकते हैं। WebElement रेफरेंस को परिभाषित करने वाले JSON ऑब्जेक्ट्स को संबंधित DOM एलिमेंट में परिवर्तित किया जाएगा। इसी तरह, स्क्रिप्ट परिणाम में किसी भी WebElements को क्लाइंट को WebElement JSON ऑब्जेक्ट्स के रूप में वापस कर दिया जाएगा।

:::caution

कृपया इसके बजाय `execute` का उपयोग करें
:::

##### उपयोग

```js
browser.executeAsync(script, arguments)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
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
      <td>स्क्रिप्ट आर्गुमेंट्स</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### रिटर्न्स

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              स्क्रिप्ट का परिणाम।