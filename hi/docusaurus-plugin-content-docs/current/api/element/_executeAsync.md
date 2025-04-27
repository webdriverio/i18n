---
id: executeAsync
title: एक्स्क्यूट-एसिंक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
`executeAsync` कमांड अप्रचलित है और भविष्य के संस्करण में हटा दी जाएगी।
कृपया इसके बजाय `execute` कमांड का उपयोग करें क्योंकि यह `async`/`await` के माध्यम से
त्रुटि हैंडलिंग के लिए बेहतर समर्थन प्रदान करता है।
:::

पेज में जावास्क्रिप्ट के एक टुकड़े को इंजेक्ट करें जो वर्तमान में चयनित फ्रेम के संदर्भ में निष्पादन के लिए हो, 
दिए गए एलिमेंट को स्कोप के रूप में उपयोग करके, क्योंकि यह एलिमेंट स्कोप पर है इसका मतलब है कि WebdriverIO
स्क्रिप्ट निष्पादित करने से पहले स्वचालित रूप से एलिमेंट के मौजूद होने की प्रतीक्षा करेगा।
निष्पादित स्क्रिप्ट को एसिंक्रोनस माना जाता है और उसे प्रदान किए गए कॉलबैक को इनवोक करके सिग्नल देना चाहिए कि 
यह पूरा हो गया है, जो हमेशा फंक्शन के अंतिम आर्गुमेंट के रूप में प्रदान किया जाता है। इस 
कॉलबैक का मान क्लाइंट को वापस कर दिया जाएगा।

एसिंक्रोनस स्क्रिप्ट कमांड पेज लोड को स्पैन नहीं कर सकतें। यदि स्क्रिप्ट परिणाम की प्रतीक्षा करते समय एक अनलोड 
इवेंट फायर होता है, तो क्लाइंट को एक त्रुटि वापस की जानी चाहिए।

स्क्रिप्ट आर्गुमेंट एक फंक्शन बॉडी के रूप में निष्पादित करने के लिए स्क्रिप्ट को परिभाषित करता है। फंक्शन को 
प्रदान किए गए args एरे के साथ इनवोक किया जाएगा और मान निर्दिष्ट क्रम में आर्गुमेंट्स ऑब्जेक्ट के माध्यम से
एक्सेस किए जा सकते हैं। अंतिम आर्गुमेंट हमेशा एक कॉलबैक फंक्शन होगा जिसे इनवोक किया जाना चाहिए
यह संकेत देने के लिए कि स्क्रिप्ट समाप्त हो गई है।

आर्गुमेंट्स कोई भी JSON-प्रिमिटिव, एरे, या JSON ऑब्जेक्ट हो सकते हैं। WebElement रेफरेंस को परिभाषित करने वाले
JSON ऑब्जेक्ट्स को संबंधित DOM एलिमेंट में परिवर्तित किया जाएगा। इसी तरह, स्क्रिप्ट परिणाम में कोई भी WebElements
क्लाइंट को WebElement JSON ऑब्जेक्ट के रूप में वापस किया जाएगा।

:::caution

कृपया इसके बजाय `execute` का उपयोग करें
:::

##### उपयोग

```js
$(selector).executeAsync(script, arguments)
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
      <td>स्क्रिप्ट आर्गुमेंट्स</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### रिटर्न्स

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              स्क्रिप्ट परिणाम।