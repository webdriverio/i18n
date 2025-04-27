---
id: element
title: एलिमेंट ऑब्जेक्ट
---

एलिमेंट ऑब्जेक्ट एक ऐसा ऑब्जेक्ट है जो रिमोट यूजर एजेंट पर एक एलिमेंट का प्रतिनिधित्व करता है, जैसे कि ब्राउज़र के अंदर एक सेशन चलाते समय [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) या मोबाइल के लिए [a mobile element](https://developer.apple.com/documentation/swift/sequence/element)। इसे विभिन्न एलिमेंट क्वेरी कमांड्स का उपयोग करके प्राप्त किया जा सकता है, जैसे [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) या [`shadow$`](/docs/api/element/shadow$)।

## प्रॉपर्टीज

एक एलिमेंट ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `sessionId` | `String` | रिमोट सर्वर से असाइन किया गया सेशन आईडी। |
| `elementId` | `String` | संबंधित [web element reference](https://w3c.github.io/webdriver/#elements) जिसका उपयोग प्रोटोकॉल स्तर पर एलिमेंट के साथ इंटरैक्ट करने के लिए किया जा सकता है |
| `selector` | `String` | एलिमेंट को क्वेरी करने के लिए उपयोग किया गया [Selector](/docs/selectors)। |
| `parent` | `Object` | या तो [Browser Object](/docs/api/browser) जब एलिमेंट को उससे फेच किया गया हो (जैसे `const elem = browser.$('selector')`) या [Element Object](/docs/api/element) अगर इसे एलिमेंट स्कोप से फेच किया गया हो (जैसे `elem.$('selector')`) |
| `options` | `Object` | WebdriverIO [options](/docs/configuration) जो इस पर निर्भर करता है कि ब्राउज़र ऑब्जेक्ट कैसे बनाया गया था। अधिक जानकारी के लिए [setup types](/docs/setuptypes) देखें। |

## मेथड्स
एक एलिमेंट ऑब्जेक्ट प्रोटोकॉल सेक्शन के सभी मेथड्स प्रदान करता है, जैसे [WebDriver](/docs/api/webdriver) प्रोटोकॉल और एलिमेंट सेक्शन में सूचीबद्ध कमांड्स। उपलब्ध प्रोटोकॉल कमांड्स सेशन के प्रकार पर निर्भर करते हैं। यदि आप एक ऑटोमेटेड ब्राउज़र सेशन चलाते हैं, तो Appium के किसी भी [commands](/docs/api/appium) उपलब्ध नहीं होंगे और इसके विपरीत।

इसके अलावा निम्नलिखित कमांड्स उपलब्ध हैं:

| नाम | पैरामीटर्स | विवरण |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`) | कस्टम कमांड्स को परिभाषित करने की अनुमति देता है जिन्हें कंपोजिशन उद्देश्यों के लिए ब्राउज़र ऑब्जेक्ट से कॉल किया जा सकता है। [Custom Command](/docs/customcommands) गाइड में अधिक पढ़ें। |
| `overwriteCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`) | किसी भी ब्राउज़र कमांड को कस्टम फंक्शनलिटी के साथ ओवरराइट करने की अनुमति देता है। सावधानी से उपयोग करें क्योंकि यह फ्रेमवर्क उपयोगकर्ताओं को भ्रमित कर सकता है। [Custom Command](/docs/customcommands#overwriting-native-commands) गाइड में अधिक पढ़ें। |

## टिप्पणियाँ

### एलिमेंट चेन

एलिमेंट्स के साथ काम करते समय WebdriverIO उन्हें क्वेरी करने और जटिल नेस्टेड एलिमेंट लुकअप्स को कंपोज़ करने के लिए विशेष सिंटैक्स प्रदान करता है। चूंकि एलिमेंट ऑब्जेक्ट आपको सामान्य क्वेरी मेथड्स का उपयोग करके उनके ट्री ब्रांच के भीतर एलिमेंट्स को खोजने की अनुमति देता है, उपयोगकर्ता नेस्टेड एलिमेंट्स को इस प्रकार फेच कर सकते हैं:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

गहरे नेस्टेड स्ट्रक्चर्स में किसी भी नेस्टेड एलिमेंट को एरे को असाइन करके फिर उसका उपयोग करना काफी वर्बोस हो सकता है। इसलिए WebdriverIO में चेन्ड एलिमेंट क्वेरीज़ की अवधारणा है जो नेस्टेड एलिमेंट्स को इस तरह से फेच करने की अनुमति देती है:

```js
console.log(await $('#header').$('#headline').getText())
```

यह तब भी काम करता है जब एलिमेंट्स का एक सेट फेच किया जाता है, उदाहरण के लिए:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

एलिमेंट्स के सेट के साथ काम करते समय यह विशेष रूप से उपयोगी हो सकता है जब उनके साथ इंटरैक्ट करने का प्रयास किया जाता है, इसलिए इसके बजाय:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

आप सीधे एलिमेंट चेन पर Array मेथड्स कॉल कर सकते हैं, उदाहरण के लिए:

```js
const location = await $$('div').map((el) => el.getLocation())
```

यह इसके समान है:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO एक कस्टम इम्प्लीमेंटेशन का उपयोग करता है जो अंडर द हुड एसिंक्रोनस इटरेटर्स का समर्थन करता है, इसलिए उनके API से सभी कमांड्स इन यूज़ केसेज़ के लिए भी समर्थित हैं।

__नोट:__ सभी एसिंक इटरेटर्स एक प्रॉमिस लौटाते हैं, भले ही आपका कॉलबैक कोई प्रॉमिस न लौटाए, उदाहरण के लिए:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returns "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returns "string[]"
```

### कस्टम कमांड्स

आप ब्राउज़र स्कोप पर कस्टम कमांड्स सेट कर सकते हैं ताकि उन वर्कफ़्लोज़ को एब्स्ट्रैक्ट किया जा सके जो आमतौर पर उपयोग किए जाते हैं। अधिक जानकारी के लिए हमारे [Custom Commands](/docs/customcommands#adding-custom-commands) गाइड को देखें।