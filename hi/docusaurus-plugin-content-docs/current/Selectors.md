---
id: selectors
title: सेलेक्टर्स
description: "CSS, टेक्स्ट, XPath, एक्सेसिबिलिटी नाम, ARIA रोल और अन्य सेलेक्टर रणनीतियों से एलिमेंट खोजें, और जानें कि उनमें से कौन-सी सबसे अधिक भरोसेमंद हैं।"
---

[WebDriver प्रोटोकॉल](https://w3c.github.io/webdriver/) किसी एलिमेंट को क्वेरी करने के लिए कई सेलेक्टर रणनीतियाँ प्रदान करता है। WebdriverIO इन्हें सरल बनाता है ताकि एलिमेंट चुनना आसान रहे। कृपया ध्यान दें कि भले ही एलिमेंट क्वेरी करने वाले कमांड का नाम `$` और `$$` है, उनका jQuery या [Sizzle Selector Engine](https://github.com/jquery/sizzle) से कोई लेना-देना नहीं है।

हालाँकि बहुत सारे अलग-अलग सेलेक्टर उपलब्ध हैं, उनमें से केवल कुछ ही सही एलिमेंट खोजने का भरोसेमंद तरीका प्रदान करते हैं। उदाहरण के लिए, निम्नलिखित बटन को लें:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

हम निम्नलिखित सेलेक्टर्स की __सिफ़ारिश करते हैं__ और __सिफ़ारिश नहीं करते__:

| सेलेक्टर | अनुशंसित | टिप्पणियाँ |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 कभी नहीं | सबसे खराब - बहुत सामान्य, कोई संदर्भ नहीं। |
| `$('.btn.btn-large')` | 🚨 कभी नहीं | खराब। स्टाइलिंग से जुड़ा हुआ। बदलाव की बहुत अधिक संभावना। |
| `$('#main')` | ⚠️ कम से कम | बेहतर। लेकिन फिर भी स्टाइलिंग या JS इवेंट लिसनर्स से जुड़ा हुआ। |
| `$(() => document.queryElement('button'))` | ⚠️ कम से कम | प्रभावी क्वेरी, लेकिन लिखने में जटिल। |
| `$('button[name="submission"]')` | ⚠️ कम से कम | `name` एट्रिब्यूट से जुड़ा हुआ, जिसकी HTML सिमेंटिक्स होती है। |
| `$('button[data-testid="submit"]')` | ✅ अच्छा | अतिरिक्त एट्रिब्यूट की आवश्यकता होती है, a11y से जुड़ा नहीं है। |
| `$('aria/Submit')` | ✅ अच्छा | अच्छा। यह उपयोगकर्ता के पेज के साथ इंटरैक्ट करने के तरीके जैसा है। अनुवाद फ़ाइलों का उपयोग करने की सिफ़ारिश की जाती है ताकि अनुवाद अपडेट होने पर आपके टेस्ट न टूटें। WebDriver BiDi सेशन पर यह ब्राउज़र के एक्सेसिबिलिटी ट्री का उपयोग करता है। Classic सेशन पर यह XPath पर वापस चला जाता है और बड़े पेजों पर धीमा हो सकता है। |
| `$('button=Submit')` | ✅ हमेशा | सबसे अच्छा। यह उपयोगकर्ता के पेज के साथ इंटरैक्ट करने के तरीके जैसा है और तेज़ है। अनुवाद फ़ाइलों का उपयोग करने की सिफ़ारिश की जाती है ताकि अनुवाद अपडेट होने पर आपके टेस्ट न टूटें। |

## स्ट्रिक्ट मोड

v10 से [`$`](/docs/api/browser/$) कमांड __स्ट्रिक्ट__ है: यह ठीक एक एलिमेंट को दर्शाता है। यदि सेलेक्टर एक से अधिक एलिमेंट से मेल खाता है, तो कमांड चुपचाप पहला मैच चुनने के बजाय `StrictSelectorError` थ्रो करता है:

```js
// पेज पर 12 बटन हैं
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

यह [Playwright लोकेटर्स](https://playwright.dev/docs/locators#strictness) जैसा ही व्यवहार है। Cypress इससे अलग है: इसकी क्वेरी कई एलिमेंट्स पर रिज़ॉल्व हो सकती हैं, और [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) जैसे एक्शन कमांड ही डिफ़ॉल्ट रूप से कई एलिमेंट वाले सब्जेक्ट को अस्वीकार करते हैं। स्ट्रिक्ट मोड उन सेलेक्टर्स को सामने लाता है जो बहुत व्यापक हैं, और जो अन्यथा पेज के बढ़ते ही चुपचाप गलत एलिमेंट के साथ इंटरैक्ट करते।

यह नियम किसी [चेन](#chain-selectors) के हर चरण पर और `$` द्वारा स्वीकार किए जाने वाले हर सेलेक्टर प्रकार पर लागू होता है — स्ट्रिंग सेलेक्टर्स (शैडो DOM को भेदने वाले सहित), [JS फ़ंक्शन](#js-function), [मोबाइल सेलेक्टर्स](#mobile-selectors) और [कस्टम रणनीति](#custom-selector-strategies) संदर्भ।

### क्या प्रभावित नहीं होता

- `$$` पहले की तरह शून्य या कई एलिमेंट्स को [`ElementArray`](/docs/api/browser/$$) के रूप में लौटाता रहता है। गिनती पढ़ने या `for...of` का उपयोग करने से पहले सूची (या उसकी `.length`) को await करें। `for await` सीधे सूची पर काम करता है।
- समर्पित हेल्पर कमांड `custom$`, `shadow$` और `react$` स्ट्रिक्ट नहीं हैं — वे अब भी अपना पहला मैच लौटाते हैं, और उनके `$$` समकक्ष भी ऐसा ही करते हैं।
- जो सेलेक्टर किसी से मेल नहीं खाता, वह अब भी एक लेज़ी-रिज़ॉल्व्ड एलिमेंट लौटाता है, इसलिए [`waitForExist`](/docs/api/element/waitForExist) और [ऑटो-वेटिंग](/docs/autowait) व्यवहार अपरिवर्तित रहते हैं।
- एलिमेंट संदर्भ पास करना, जैसे `$(await browser.getActiveElement())`, हमेशा एक ही नोड को संदर्भित करता है और इसकी कभी जाँच नहीं की जाती।

:::info v10 पर माइग्रेट करना

स्ट्रिक्ट-मोड उल्लंघनों के लिए अपने सूट का ऑडिट कैसे करें, अलग-अलग क्वेरी को सीमित कैसे करें या उनसे बाहर कैसे निकलें, और पूरे प्रोजेक्ट में स्ट्रिक्ट मोड को कैसे अक्षम करें, यह जानने के लिए [v10 माइग्रेशन गाइड](/docs/v10-migration) देखें।

:::

## CSS क्वेरी सेलेक्टर

यदि अन्यथा न बताया गया हो, तो WebdriverIO [CSS सेलेक्टर](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) पैटर्न का उपयोग करके एलिमेंट्स को क्वेरी करेगा, उदाहरण के लिए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## लिंक टेक्स्ट

किसी विशिष्ट टेक्स्ट वाले एंकर एलिमेंट को प्राप्त करने के लिए, बराबर (`=`) चिह्न से शुरू करके टेक्स्ट को क्वेरी करें।

उदाहरण के लिए:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

आप इस एलिमेंट को इस प्रकार कॉल करके क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## आंशिक लिंक टेक्स्ट

ऐसे एंकर एलिमेंट को खोजने के लिए जिसका दृश्यमान टेक्स्ट आपके खोज मान से आंशिक रूप से मेल खाता हो,
क्वेरी स्ट्रिंग के आगे `*=` का उपयोग करके उसे क्वेरी करें (जैसे `*=driver`)।

आप ऊपर दिए गए उदाहरण के एलिमेंट को इस प्रकार कॉल करके भी क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__ध्यान दें:__ आप एक सेलेक्टर में कई सेलेक्टर रणनीतियों को मिला नहीं सकते। समान लक्ष्य तक पहुँचने के लिए कई चेन किए गए एलिमेंट क्वेरी का उपयोग करें, उदाहरण के लिए:

```js
const elem = await $('header h1*=Welcome') // काम नहीं करता!!!
// इसके बजाय इसका उपयोग करें
const elem = await $('header').$('*=driver')
```

## किसी निश्चित टेक्स्ट वाला एलिमेंट

यही तकनीक एलिमेंट्स पर भी लागू की जा सकती है। इसके अतिरिक्त, क्वेरी के भीतर `.=` या `.*=` का उपयोग करके केस-इनसेंसिटिव मिलान करना भी संभव है।

उदाहरण के लिए, यहाँ "Welcome to my Page" टेक्स्ट वाले लेवल 1 हेडिंग के लिए एक क्वेरी है:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

आप इस एलिमेंट को इस प्रकार कॉल करके क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

या आंशिक टेक्स्ट क्वेरी का उपयोग करके:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

यही `id` और `class` नामों के लिए भी काम करता है:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

आप इस एलिमेंट को इस प्रकार कॉल करके क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__ध्यान दें:__ आप एक सेलेक्टर में कई सेलेक्टर रणनीतियों को मिला नहीं सकते। समान लक्ष्य तक पहुँचने के लिए कई चेन किए गए एलिमेंट क्वेरी का उपयोग करें, उदाहरण के लिए:

```js
const elem = await $('header h1*=Welcome') // काम नहीं करता!!!
// इसके बजाय इसका उपयोग करें
const elem = await $('header').$('h1*=Welcome')
```

## टैग नाम

किसी विशिष्ट टैग नाम वाले एलिमेंट को क्वेरी करने के लिए, `<tag>` या `<tag />` का उपयोग करें।

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

आप इस एलिमेंट को इस प्रकार कॉल करके क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name एट्रिब्यूट

किसी विशिष्ट name एट्रिब्यूट वाले एलिमेंट्स को क्वेरी करने के लिए, `[name="some-name"]` जैसे CSS सेलेक्टर का उपयोग करें। मोबाइल सेशन पर वही शॉर्टहैंड Appium की `name` लोकेटर रणनीति के साथ भेजा जाता है:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__ध्यान दें:__ `name` लोकेटर रणनीति एक Appium लोकेटर है। डेस्कटॉप सेशन `[name="some-name"]` को CSS रणनीति पर ही रखते हैं।

## xPath

किसी विशिष्ट [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) के माध्यम से भी एलिमेंट्स को क्वेरी करना संभव है।

एक xPath सेलेक्टर का प्रारूप `//body/div[6]/div[1]/span[1]` जैसा होता है।

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

आप दूसरे पैराग्राफ़ को इस प्रकार कॉल करके क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

आप xPath का उपयोग DOM ट्री में ऊपर और नीचे जाने के लिए भी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## एक्सेसिबिलिटी नाम सेलेक्टर

एलिमेंट्स को उनके एक्सेसिबल नाम से क्वेरी करें। एक्सेसिबल नाम वह है जो स्क्रीन रीडर द्वारा तब घोषित किया जाता है जब उस एलिमेंट पर फ़ोकस आता है। एक्सेसिबल नाम का मान दृश्य सामग्री या छिपे हुए टेक्स्ट विकल्प दोनों हो सकता है।

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) सेशन (Chrome, Edge, Firefox और अन्य BiDi-सक्षम ब्राउज़र) पर WebdriverIO पहले एक्सेसिबिलिटी लोकेटर के साथ [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) का उपयोग करता है। यह सीधे ब्राउज़र के एक्सेसिबिलिटी ट्री को क्वेरी करता है और आमतौर पर XPath अनुमान की तुलना में बहुत तेज़ होता है। यदि एक्सेसिबिलिटी लोकेटर को कुछ नहीं मिलता है, तो WebdriverIO Classic XPath ह्यूरिस्टिक पर वापस चला जाता है ताकि मौजूदा `aria/` क्वेरी मेल खाती रहें।

:::info

आप इस सेलेक्टर के बारे में हमारे [रिलीज़ ब्लॉग पोस्ट](/blog/2022/09/05/accessibility-selector) में और पढ़ सकते हैं

:::

### `aria-label` द्वारा प्राप्त करें

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### `aria-labelledby` द्वारा प्राप्त करें

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### सामग्री द्वारा प्राप्त करें

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### शीर्षक द्वारा प्राप्त करें

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### `alt` प्रॉपर्टी द्वारा प्राप्त करें

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## रोल सेलेक्टर

एलिमेंट्स को उनके ARIA रोल और एक्सेसिबल नाम से क्वेरी करें, उसी तरह जैसे एक स्क्रीन रीडर उनका वर्णन करता है: "*Add to cart* बटन"। एक रोल और एक नाम तब भी मेल खाते रहते हैं जब क्लास नाम, टेस्ट id या DOM संरचना बदल जाती है।

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// केवल रोल
const rows = await $$('role/row')

// किसी पैरेंट एलिमेंट तक सीमित
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

सिंटैक्स `role/<role>` या `role/<role>[name="<accessible name>"]` है। सिंगल कोट्स भी काम करते हैं, और नाम के भीतर किसी कोट को बैकस्लैश से एस्केप किया जाता है: `role/button[name="Say \"hi\""]`।

- नाम को पूरे एक्सेसिबल नाम से मेल खाना चाहिए।
- रोल एक ARIA रोल होना चाहिए। टाइपो होने पर सबसे निकटतम मान्य रोल के साथ विफलता मिलती है, उदाहरण के लिए `"buton" is not an ARIA role. Did you mean "button"?`।
- `img` और इसका ARIA 1.3 नाम `image` एक ही रोल हैं।
- यह सेलेक्टर हर अन्य सेलेक्टर की तरह `$` के [स्ट्रिक्ट मोड](#strict-mode) का पालन करता है।

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) सेशन पर, WebdriverIO रोल और नाम को [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) को पास करता है। ब्राउज़र दोनों की गणना स्वयं करता है, उसी तरह जैसे सहायक तकनीक पेज को देखती है। ओपन शैडो रूट्स के भीतर और फ़्रेम्स के भीतर के एलिमेंट्स, जिनमें किसी अन्य ओरिजिन के फ़्रेम भी शामिल हैं, मिल जाते हैं। यदि ब्राउज़र को कोई एलिमेंट नहीं मिलता है, तो किसी ह्यूरिस्टिक पर वापस नहीं जाया जाता। ध्यान दें कि रोल ब्राउज़र तय करता है: उदाहरण के लिए, हेडर या कैप्शन के बिना एक `<table>` लेआउट टेबल हो सकती है, और तब उसकी पंक्तियों का कोई `row` रोल नहीं होता।

WebDriver Classic सेशन पर, और जब कोई ब्राउज़र रोल लोकेटर का समर्थन नहीं करता, तो WebdriverIO पेज में [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) के साथ रोल और एक्सेसिबल नाम की गणना करता है, जो Testing Library द्वारा उपयोग किया जाने वाला इम्प्लीमेंटेशन है। बिना लेबल वाले टेक्स्ट फ़ील्ड का नाम उसके `placeholder` से रखा जाता है, जैसा कि ब्राउज़र करते हैं। रोल सेलेक्टर नेटिव मोबाइल ऐप संदर्भ में उपलब्ध नहीं है। वहाँ [accessibility id](#accessibility-id) का उपयोग करें।

## ARIA - Role एट्रिब्यूट

[ARIA रोल्स](https://www.w3.org/TR/html-aria/#docconformance) के आधार पर एलिमेंट्स को क्वेरी करने के लिए, आप सेलेक्टर पैरामीटर के रूप में सीधे एलिमेंट का रोल जैसे `[role=button]` निर्दिष्ट कर सकते हैं। यह सेलेक्टर एलिमेंट के नाम और एट्रिब्यूट्स से रोल का अनुमान लगाता है। [रोल सेलेक्टर](#role-selector) को प्राथमिकता दें, जो ब्राउज़र द्वारा गणना किए गए रोल का उपयोग करता है और एक्सेसिबल नाम से भी मेल खा सकता है:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID एट्रिब्यूट

लोकेटर रणनीति "id" WebDriver प्रोटोकॉल में समर्थित नहीं है, ID का उपयोग करके एलिमेंट्स खोजने के लिए इसके बजाय CSS या xPath सेलेक्टर रणनीतियों का उपयोग करना चाहिए।

हालाँकि कुछ ड्राइवर (जैसे [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) अब भी इस सेलेक्टर का [समर्थन](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) कर सकते हैं।

ID के लिए वर्तमान में समर्थित सेलेक्टर सिंटैक्स हैं:

```js
//css लोकेटर
const button = await $('#someid')
//xpath लोकेटर
const button = await $('//*[@id="someid"]')
//id रणनीति
// ध्यान दें: केवल Appium या समान फ़्रेमवर्क में काम करता है जो लोकेटर रणनीति "ID" का समर्थन करते हैं
const button = await $('id=resource-id/iosname')
```

## JS फ़ंक्शन

आप वेब नेटिव APIs का उपयोग करके एलिमेंट्स प्राप्त करने के लिए JavaScript फ़ंक्शंस का भी उपयोग कर सकते हैं। बेशक, आप ऐसा केवल वेब संदर्भ के भीतर ही कर सकते हैं (जैसे, `browser`, या मोबाइल में वेब संदर्भ)।

निम्नलिखित HTML संरचना को देखते हुए:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

आप `#elem` के सिबलिंग एलिमेंट को इस प्रकार क्वेरी कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## डीप सेलेक्टर्स

:::warning

WebdriverIO के `v9` से इस विशेष सेलेक्टर की आवश्यकता नहीं है क्योंकि WebdriverIO आपके लिए स्वचालित रूप से शैडो DOM को भेद देता है। इस सेलेक्टर के आगे से `>>>` हटाकर इससे माइग्रेट करने की सिफ़ारिश की जाती है।

:::

WebDriver BiDi सेशन पर, `$` और `$$` हर ओपन शैडो रूट में देखते हैं: `attachShadow()` से बनाए गए रूट्स और डिक्लेरेटिव शैडो रूट्स (`<template shadowrootmode="open">`) जिन्हें पेज या `setHTMLUnsafe()` डॉक्यूमेंट में जोड़ता है। वे किसी क्लोज़्ड डिक्लेरेटिव शैडो रूट में, या ऐसे डिक्लेरेटिव शैडो रूट में नहीं देखते जिसे `setHTMLUnsafe()` किसी ऐसे एलिमेंट में बनाता है जो अभी डॉक्यूमेंट में नहीं है। इनके लिए, होस्ट एलिमेंट पर [`shadow$`](https://webdriver.io/docs/api/element/shadow$) का उपयोग करें।

कई फ्रंटएंड एप्लिकेशन [शैडो DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) वाले एलिमेंट्स पर बहुत अधिक निर्भर करते हैं। वर्कअराउंड के बिना शैडो DOM के भीतर एलिमेंट्स को क्वेरी करना तकनीकी रूप से असंभव है। [`shadow$`](https://webdriver.io/docs/api/element/shadow$) और [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) ऐसे ही वर्कअराउंड रहे हैं जिनकी अपनी [सीमाएँ](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) थीं। डीप सेलेक्टर के साथ अब आप सामान्य क्वेरी कमांड का उपयोग करके किसी भी शैडो DOM के भीतर सभी एलिमेंट्स को क्वेरी कर सकते हैं।

मान लीजिए हमारे पास निम्नलिखित संरचना वाला एक एप्लिकेशन है:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

इस सेलेक्टर के साथ आप `<button />` एलिमेंट को क्वेरी कर सकते हैं जो किसी अन्य शैडो DOM के भीतर नेस्टेड है, उदाहरण के लिए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## मोबाइल सेलेक्टर्स

हाइब्रिड मोबाइल टेस्टिंग के लिए, यह महत्वपूर्ण है कि कमांड निष्पादित करने से पहले ऑटोमेशन सर्वर सही *संदर्भ* में हो। जेस्चर को ऑटोमेट करने के लिए, ड्राइवर को आदर्श रूप से नेटिव संदर्भ पर सेट किया जाना चाहिए। लेकिन DOM से एलिमेंट्स चुनने के लिए, ड्राइवर को प्लेटफ़ॉर्म के वेबव्यू संदर्भ पर सेट करना होगा। केवल *तभी* ऊपर बताए गए तरीकों का उपयोग किया जा सकता है।

नेटिव मोबाइल टेस्टिंग के लिए, संदर्भों के बीच कोई स्विचिंग नहीं होती, क्योंकि आपको मोबाइल रणनीतियों का उपयोग करना होता है और अंतर्निहित डिवाइस ऑटोमेशन तकनीक का सीधे उपयोग करना होता है। यह विशेष रूप से तब उपयोगी है जब किसी टेस्ट को एलिमेंट्स खोजने पर बारीक नियंत्रण की आवश्यकता होती है।

### Android UiAutomator

Android का UI Automator फ़्रेमवर्क एलिमेंट्स खोजने के कई तरीके प्रदान करता है। आप एलिमेंट्स का पता लगाने के लिए [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), विशेष रूप से [UiSelector क्लास](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) का उपयोग कर सकते हैं। Appium में आप Java कोड को स्ट्रिंग के रूप में सर्वर पर भेजते हैं, जो इसे एप्लिकेशन के वातावरण में निष्पादित करता है और एलिमेंट या एलिमेंट्स लौटाता है।

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher और ViewMatcher (केवल Espresso)

Android की DataMatcher रणनीति [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) द्वारा एलिमेंट्स खोजने का एक तरीका प्रदान करती है

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

और इसी तरह [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (केवल Espresso)

व्यू टैग रणनीति एलिमेंट्स को उनके [टैग](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) द्वारा खोजने का एक सुविधाजनक तरीका प्रदान करती है।

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

iOS एप्लिकेशन को ऑटोमेट करते समय, एलिमेंट्स खोजने के लिए Apple के [UI Automation फ़्रेमवर्क](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) का उपयोग किया जा सकता है।

इस JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) में व्यू और उस पर मौजूद हर चीज़ तक पहुँचने के लिए मेथड्स हैं।

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

एलिमेंट चयन को और भी परिष्कृत करने के लिए आप Appium में iOS UI Automation के भीतर प्रेडिकेट सर्चिंग का भी उपयोग कर सकते हैं। विवरण के लिए [यहाँ](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) देखें।

### iOS XCUITest प्रेडिकेट स्ट्रिंग्स और क्लास चेन्स

iOS 10 और उससे ऊपर (`XCUITest` ड्राइवर का उपयोग करके) के साथ, आप [प्रेडिकेट स्ट्रिंग्स](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) का उपयोग कर सकते हैं:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

और [क्लास चेन्स](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

`accessibility id` लोकेटर रणनीति किसी UI एलिमेंट के लिए एक विशिष्ट पहचानकर्ता पढ़ने के लिए डिज़ाइन की गई है। इसका लाभ यह है कि यह लोकलाइज़ेशन या किसी अन्य प्रक्रिया के दौरान नहीं बदलता जो टेक्स्ट बदल सकती है। इसके अलावा, यदि कार्यात्मक रूप से समान एलिमेंट्स की accessibility id समान है, तो यह क्रॉस-प्लेटफ़ॉर्म टेस्ट बनाने में सहायक हो सकता है।

- iOS के लिए यह Apple द्वारा [यहाँ](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) निर्धारित `accessibility identifier` है।
- Android के लिए `accessibility id` एलिमेंट के `content-description` से मैप होता है, जैसा कि [यहाँ](https://developer.android.com/training/accessibility/accessible-app.html) वर्णित है।

दोनों प्लेटफ़ॉर्म के लिए, किसी एलिमेंट (या कई एलिमेंट्स) को उनकी `accessibility id` द्वारा प्राप्त करना आमतौर पर सबसे अच्छा तरीका है। यह अप्रचलित `name` रणनीति की तुलना में भी पसंदीदा तरीका है।

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

`class name` रणनीति एक `string` है जो वर्तमान व्यू पर किसी UI एलिमेंट को दर्शाती है।

- iOS के लिए यह किसी [UIAutomation क्लास](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) का पूरा नाम है, और `UIA-` से शुरू होगा, जैसे टेक्स्ट फ़ील्ड के लिए `UIATextField`। पूरा संदर्भ [यहाँ](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation) पाया जा सकता है।
- Android के लिए यह किसी [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [क्लास](https://developer.android.com/reference/android/widget/package-summary.html) का पूर्णतः योग्य नाम है, जैसे टेक्स्ट फ़ील्ड के लिए `android.widget.EditText`। पूरा संदर्भ [यहाँ](https://developer.android.com/reference/android/widget/package-summary.html) पाया जा सकता है।
- Youi.tv के लिए यह किसी Youi.tv क्लास का पूरा नाम है, और `CYI-` से शुरू होगा, जैसे पुश बटन एलिमेंट के लिए `CYIPushButtonView`। पूरा संदर्भ [You.i Engine Driver के GitHub पेज](https://github.com/YOU-i-Labs/appium-youiengine-driver) पर पाया जा सकता है

```js
// iOS उदाहरण
await $('UIATextField').click()
// Android उदाहरण
await $('android.widget.DatePicker').click()
// Youi.tv उदाहरण
await $('CYIPushButtonView').click()
```

## चेन सेलेक्टर्स

यदि आप अपनी क्वेरी में अधिक विशिष्ट होना चाहते हैं, तो आप सही एलिमेंट मिलने तक सेलेक्टर्स को चेन कर सकते हैं।
यदि आप अपने वास्तविक कमांड से पहले `element` को कॉल करते हैं, तो WebdriverIO उस एलिमेंट से क्वेरी शुरू करता है।

उदाहरण के लिए, यदि आपके पास ऐसी DOM संरचना है:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

और आप प्रोडक्ट B को कार्ट में जोड़ना चाहते हैं, तो केवल CSS सेलेक्टर का उपयोग करके ऐसा करना कठिन होगा।

सेलेक्टर चेनिंग के साथ, यह कहीं अधिक आसान है। बस चरण दर चरण वांछित एलिमेंट तक सीमित करें:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium इमेज सेलेक्टर

`-image` लोकेटर रणनीति का उपयोग करके, Appium को एक इमेज फ़ाइल भेजना संभव है जो उस एलिमेंट को दर्शाती है जिस तक आप पहुँचना चाहते हैं।

समर्थित फ़ाइल प्रारूप `jpg,png,gif,bmp,svg`

पूरा संदर्भ [यहाँ](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md) पाया जा सकता है

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**ध्यान दें**: Appium इस सेलेक्टर के साथ इस प्रकार काम करता है कि यह आंतरिक रूप से एक (ऐप)स्क्रीनशॉट लेगा और दिए गए इमेज सेलेक्टर का उपयोग
यह सत्यापित करने के लिए करेगा कि क्या एलिमेंट उस (ऐप)स्क्रीनशॉट में पाया जा सकता है।

इस तथ्य से अवगत रहें कि Appium लिए गए (ऐप)स्क्रीनशॉट का आकार बदल सकता है ताकि वह आपकी (ऐप)स्क्रीन के CSS-आकार से मेल खाए (यह
iPhones पर होगा, लेकिन Retina डिस्प्ले वाली Mac मशीनों पर भी, क्योंकि DPR 1 से बड़ा होता है)। इसके परिणामस्वरूप कोई मैच नहीं मिलेगा क्योंकि
दिया गया इमेज सेलेक्टर मूल स्क्रीनशॉट से लिया गया हो सकता है।
आप Appium सर्वर सेटिंग्स को अपडेट करके इसे ठीक कर सकते हैं, सेटिंग्स के लिए [Appium डॉक्स](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
और विस्तृत व्याख्या के लिए [यह टिप्पणी](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) देखें।

## React सेलेक्टर्स

WebdriverIO कंपोनेंट नाम के आधार पर React कंपोनेंट्स चुनने का एक तरीका प्रदान करता है। ऐसा करने के लिए, आपके पास दो कमांड्स का विकल्प है: `react$` और `react$$`।

ये कमांड्स आपको [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) से कंपोनेंट्स चुनने की अनुमति देते हैं और या तो एक एकल WebdriverIO Element या एलिमेंट्स की एक ऐरे लौटाते हैं (इस पर निर्भर करते हुए कि कौन-सा फ़ंक्शन उपयोग किया गया है)।

**ध्यान दें**: कमांड्स `react$` और `react$$` कार्यक्षमता में समान हैं, सिवाय इसके कि `react$$` *सभी* मेल खाने वाले इंस्टेंस को WebdriverIO एलिमेंट्स की ऐरे के रूप में लौटाएगा, और `react$` पहला मिला इंस्टेंस लौटाएगा।

ये कमांड्स React 16 से 19 के साथ काम करते हैं, ऐसे ऐप के लिए जो `createRoot` या `ReactDOM.render` के साथ शुरू होता है। वे वर्तमान रेंडर के कंपोनेंट्स को पढ़ते हैं, इसलिए वे उन कंपोनेंट्स को भी ढूँढ लेते हैं जिन्हें किसी स्टेट परिवर्तन ने जोड़ा है। यदि React ने अभी तक पेज का कोई रूट रेंडर नहीं किया है, तो वे इसके लिए 5 सेकंड तक प्रतीक्षा करते हैं।

#### बुनियादी उदाहरण

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

ऊपर दिए गए कोड में एप्लिकेशन के भीतर एक साधारण `MyComponent` इंस्टेंस है, जिसे React `id="root"` वाले एक HTML एलिमेंट के भीतर रेंडर कर रहा है।

`browser.react$` कमांड के साथ, आप `MyComponent` का एक इंस्टेंस चुन सकते हैं:

```js
const myCmp = await browser.react$('MyComponent')
```

अब जब आपके पास `myCmp` वेरिएबल में WebdriverIO एलिमेंट संग्रहीत है, तो आप उस पर एलिमेंट कमांड्स निष्पादित कर सकते हैं।

#### कंपोनेंट्स को फ़िल्टर करना

आप कंपोनेंट के props और/या state द्वारा अपने चयन को फ़िल्टर कर सकते हैं। ऐसा करने के लिए, कमांड के दूसरे आर्गुमेंट में `props` और/या `state` पास करें।

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

यदि आप `MyComponent` का वह इंस्टेंस चुनना चाहते हैं जिसका prop `name` `WebdriverIO` है, तो आप कमांड को इस प्रकार निष्पादित कर सकते हैं:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

यदि आप state द्वारा हमारे चयन को फ़िल्टर करना चाहते हैं, तो `browser` कमांड कुछ इस तरह दिखेगा:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

एक फ़िल्टर तब मेल खाता है जब उसकी हर वह key मेल खाती है जो कंपोनेंट के पास भी है। जो key कंपोनेंट के पास नहीं है, उसे अनदेखा कर दिया जाता है। एक नेस्टेड ऑब्जेक्ट भी इसी तरह मेल खाता है, और एक ऐरे तब मेल खाती है जब उसमें कंपोनेंट की ऐरे के साथ एक मान समान हो। `null`, `false` और `0` एक ही मान से मेल खाते हैं। hooks वाले फ़ंक्शन कंपोनेंट के लिए, state पहले hook (`useState` या `useReducer`) की state होती है: यदि पहला hook कोई अन्य hook है, उदाहरण के लिए `useRef`, तो state फ़िल्टर मेल नहीं खाता। `props` और `state` दोनों के साथ, कंपोनेंट को दोनों से मेल खाना चाहिए।

#### सेलेक्टर नियम

- `*` एक या अधिक वर्णों से मेल खाता है: `browser.react$$('My*')` `MyComponent` और `MyOtherComponent` को ढूँढता है।
- स्पेस से अलग किए गए नाम किसी अन्य कंपोनेंट के भीतर एक कंपोनेंट को ढूँढते हैं: `browser.react$$('List Item')` किसी `List` के भीतर हर `Item` को ढूँढता है।
- किसी कंपोनेंट का नाम उसका `displayName` होता है, अन्यथा उसके फ़ंक्शन या क्लास का नाम। `React.memo` के कंपोनेंट का नाम उसके फ़ंक्शन का नाम होता है (React 17 का डेवलपमेंट बिल्ड इसे memo ऑब्जेक्ट का `displayName` भी देता है)। `React.forwardRef` के कंपोनेंट का कोई नाम नहीं होता, जब तक कि उसका `displayName` न हो।
- `withRouter(MyComponent)` जैसे नाम वाले हायर-ऑर्डर कंपोनेंट के लिए, कोष्ठकों के भीतर का नाम उपयोग किया जाता है: `MyComponent`।
- एलिमेंट स्कोप के बिना, कमांड्स पेज के सभी React रूट्स को डॉक्यूमेंट के क्रम में खोजते हैं, जिनमें अन्य रूट्स के भीतर के रूट्स और ओपन शैडो रूट्स में मौजूद रूट्स भी शामिल हैं। `react$` पहला मैच देता है। केवल एक रूट खोजने के लिए, कमांड को उसके कंटेनर पर या उस रूट के किसी एलिमेंट पर कॉल करें: `$('#other-root').react$$('MyComponent')`।
- परिणाम एक रूट के बाद दूसरे रूट के क्रम में आते हैं। किसी रूट में, वे कंपोनेंट ट्री के क्रम में, लेवल दर लेवल आते हैं, न कि डॉक्यूमेंट के क्रम में। `react$$` हर DOM नोड को एक बार देता है।
- किसी फ़्रेम में मौजूद ऐप के लिए, कमांड को फ़्रेम के ब्राउज़िंग संदर्भ पर, या फ़्रेम के किसी एलिमेंट पर कॉल करें: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`।

ज्ञात सीमाएँ:

- जो कंपोनेंट केवल टेक्स्ट रेंडर करता है, वह एक टेक्स्ट नोड देता है। WebDriver Classic के साथ, टेक्स्ट नोड को वापस नहीं भेजा जा सकता, और कमांड `javascript error: circular reference` के साथ विफल हो जाता है।
- जब React किसी सर्वर-रेंडर्ड पेज की `Suspense` बाउंड्री को हाइड्रेट करता है, तब तक उसके भीतर के कंपोनेंट्स अभी मौजूद नहीं होते। पेज के हाइड्रेट होना समाप्त होने तक प्रतीक्षा करें।

#### `React.Fragment` से निपटना

React [फ़्रैगमेंट्स](https://reactjs.org/docs/fragments.html) चुनने के लिए `react$` कमांड का उपयोग करते समय, WebdriverIO उस कंपोनेंट के पहले चाइल्ड को कंपोनेंट के नोड के रूप में लौटाएगा। यदि आप `react$$` का उपयोग करते हैं, तो आपको एक ऐरे प्राप्त होगी जिसमें सेलेक्टर से मेल खाने वाले फ़्रैगमेंट्स के भीतर के सभी HTML नोड्स होंगे।

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

ऊपर दिए गए उदाहरण को देखते हुए, कमांड्स इस प्रकार काम करेंगे:

```js
await browser.react$('MyComponent') // पहले <div /> के लिए WebdriverIO Element लौटाता है
await browser.react$$('MyComponent') // ऐरे [<div />, <div />] के लिए WebdriverIO Elements लौटाता है
```

**ध्यान दें:** यदि आपके पास `MyComponent` के कई इंस्टेंस हैं और आप इन फ़्रैगमेंट कंपोनेंट्स को चुनने के लिए `react$$` का उपयोग करते हैं, तो आपको सभी नोड्स की एक एक-आयामी ऐरे लौटाई जाएगी। दूसरे शब्दों में, यदि आपके पास 3 `<MyComponent />` इंस्टेंस हैं, तो आपको छह WebdriverIO एलिमेंट्स वाली एक ऐरे लौटाई जाएगी।

## कस्टम सेलेक्टर रणनीतियाँ


यदि आपके ऐप को एलिमेंट्स प्राप्त करने के किसी विशिष्ट तरीके की आवश्यकता है, तो आप स्वयं एक कस्टम सेलेक्टर रणनीति परिभाषित कर सकते हैं जिसका उपयोग आप `custom$` और `custom$$` के साथ कर सकते हैं। इसके लिए अपनी रणनीति को टेस्ट की शुरुआत में एक बार रजिस्टर करें, उदाहरण के लिए `before` हुक में:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

निम्नलिखित HTML स्निपेट को देखते हुए:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

फिर इसे इस प्रकार कॉल करके उपयोग करें:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**ध्यान दें:** यह केवल ऐसे वेब वातावरण में काम करता है जिसमें [`execute`](/docs/api/browser/execute) कमांड चलाया जा सकता है।