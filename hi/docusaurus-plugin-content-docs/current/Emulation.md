---
id: emulation
title: इम्यूलेशन
description: "emulate कमांड के साथ जियोलोकेशन, मीडिया फ़ीचर्स, यूज़र एजेंट, नेटवर्क, लोकेल, टाइमज़ोन, स्क्रीन और डिवाइस का इम्यूलेशन करें।"
---

WebdriverIO के साथ आप [`emulate`](/docs/api/browser/emulate) कमांड का उपयोग करके ब्राउज़र व्यवहार का इम्यूलेशन कर सकते हैं। यह कमांड वर्तमान टॉप-लेवल ब्राउज़िंग कॉन्टेक्स्ट के लिए [WebDriver BiDi emulation module](https://w3c.github.io/webdriver-bidi/#module-emulation) को चलाती है। ओवरराइड तुरंत लागू होता है। आपको पेज रीलोड नहीं करना पड़ता। `clock` इसका अपवाद है: BiDi में कोई clock कमांड नहीं है, इसलिए वह स्कोप अभी भी फ़ेक टाइमर्स इंस्टॉल करता है।

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

इस फ़ीचर के लिए ब्राउज़र में WebDriver Bidi सपोर्ट आवश्यक है। जबकि Chrome, Edge और Firefox के हाल के संस्करणों में यह सपोर्ट मौजूद है, Safari में __नहीं__ है। अपडेट के लिए [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned) को फ़ॉलो करें। इसके अलावा, यदि आप ब्राउज़र शुरू करने के लिए किसी क्लाउड वेंडर का उपयोग करते हैं, तो सुनिश्चित करें कि आपका वेंडर भी WebDriver Bidi को सपोर्ट करता है।

अपने टेस्ट के लिए WebDriver Bidi सक्षम करने के लिए, सुनिश्चित करें कि आपकी capabilities में `webSocketUrl: true` सेट है।

जो ब्राउज़र किसी कमांड को लागू नहीं करता, वह कॉल को अपनी स्वयं की त्रुटि, `unknown command` या `unsupported operation`, के साथ अस्वीकार कर देता है। WebdriverIO वही त्रुटि लौटाता है। यह किसी preload script या CDP पर फ़ॉलबैक नहीं करता।

:::

`emulate` एक फ़ंक्शन लौटाता है जो उस स्कोप को साफ़ करता है। [`browser.restore()`](/docs/api/browser/restore) हर सक्रिय स्कोप को, या आपके द्वारा सूचीबद्ध स्कोप्स को, साफ़ करता है।

## जियोलोकेशन

ब्राउज़र जियोलोकेशन को किसी विशिष्ट क्षेत्र में बदलें, उदाहरण के लिए:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // आउटपुट: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

यह ब्राउज़र के जियोलोकेशन स्टैक का उपयोग करता है, जिसमें `getCurrentPosition` और `watchPosition` शामिल हैं। जैसा कि उदाहरण में है, किसी पेज को अभी भी जियोलोकेशन अनुमति दिए जाने की आवश्यकता हो सकती है। वैकल्पिक फ़ील्ड्स हैं `accuracy`, `altitude`, `altitudeAccuracy`, `heading` और `speed`।

पेज को पोज़िशन पढ़ने में विफल बनाने के लिए:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## कलर स्कीम और अन्य मीडिया फ़ीचर्स

`prefers-color-scheme` मीडिया फ़ीचर बदलें:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // आउटपुट: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // आउटपुट: "#000000"
```

यह CSS `@media (prefers-color-scheme)` के साथ-साथ [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) को भी अपडेट करता है। रीलोड की आवश्यकता नहीं है।

`media` बाकी मीडिया-फ़ीचर मैप सेट करता है, उदाहरण के लिए reduced motion:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` और `media` एक ही मैप साझा करते हैं। BiDi कमांड पूरे मैप को बदल देती है, इसलिए बाद वाली कॉल प्रभावी होती है। किसी भी स्कोप को रिस्टोर करने से मैप साफ़ हो जाता है।

`forcedColors` एक अलग कमांड है। यह forced-colors थीम (`'light'` या `'dark'`) सेट करता है, न कि `forced-colors` मीडिया फ़ीचर। वह मीडिया फ़ीचर `media` पर `forcedColors: 'none' | 'active'` के रूप में रहता है।

## यूज़र एजेंट

ब्राउज़र का यूज़र एजेंट इस प्रकार बदलें:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

यह ब्राउज़र का यूज़र-एजेंट ओवरराइड है। यह पैच की गई `navigator.userAgent` प्रॉपर्टी नहीं है। ब्राउज़र वेंडर्स धीरे-धीरे User Agent को डिप्रिकेट कर रहे हैं।

## ऑनलाइन स्थिति

ब्राउज़िंग कॉन्टेक्स्ट को ऑफ़लाइन करें:

```ts
await browser.emulate('onLine', false)
```

`false`, `{ type: 'offline' }` के साथ `emulation.setNetworkConditions` भेजता है। Fetch, WebSocket और WebTransport विफल हो जाते हैं, और [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) भी उसी के अनुसार बदल जाता है। `true`, और स्कोप को रिस्टोर करना, इस कंडीशन को साफ़ करता है। थ्रूपुट और लेटेंसी [`throttleNetwork`](/docs/api/browser/throttleNetwork) पर ही रहते हैं। BiDi नेटवर्क कंडीशन्स केवल ऑफ़लाइन को सपोर्ट करती हैं।

## लोकेल, टाइमज़ोन और टच

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` एक BCP 47 टैग है। `timezone` एक IANA नाम या `+02:00` जैसा ऑफ़सेट है। `touch`, `maxTouchPoints` है और यह `>= 1` का पूर्णांक होना चाहिए। `touch` को रिस्टोर करने से ओवरराइड साफ़ हो जाता है। यह `0` सेट नहीं कर सकता।

## स्क्रीन, ओरिएंटेशन और लेआउट

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` वेब पर उजागर स्क्रीन क्षेत्र है, न कि व्यूपोर्ट। `orientation.natural` का मान `'portrait'` या `'landscape'` होता है। `orientation.type` का मान `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` या `'landscape-secondary'` होता है।

`viewportMeta` केवल `true` स्वीकार करता है। स्पेक मान `true | null` है, इसलिए कोई `false` नहीं है। रिस्टोर इसे साफ़ करता है। `textLayout` केवल `'mobile'` स्वीकार करता है। `scripting` को केवल अक्षम किया जा सकता है। स्पेक स्क्रिप्टिंग को ज़बरदस्ती चालू नहीं कर सकता। `scrollbar` का मान `'classic'` या `'overlay'` होता है।

## क्लॉक

आप [`emulate`](/docs/emulation) कमांड का उपयोग करके ब्राउज़र की सिस्टम क्लॉक को संशोधित कर सकते हैं। यह समय से संबंधित नेटिव ग्लोबल फ़ंक्शन्स को ओवरराइड करता है, जिससे उन्हें `clock.tick()` या प्राप्त clock ऑब्जेक्ट के माध्यम से सिंक्रोनस रूप से नियंत्रित किया जा सकता है। इसमें निम्न को नियंत्रित करना शामिल है:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

क्लॉक unix epoch (टाइमस्टैम्प 0) से शुरू होती है। इसका अर्थ है कि जब आप अपने एप्लिकेशन में new Date इंस्टैंशिएट करते हैं, तो यदि आप `emulate` कमांड को कोई अन्य विकल्प नहीं देते, तो इसका समय 1 जनवरी, 1970 होगा।

##### उदाहरण

`browser.emulate('clock', { ... })` को कॉल करने पर यह वर्तमान पेज के साथ-साथ बाद के सभी पेजों के लिए ग्लोबल फ़ंक्शन्स को तुरंत ओवरराइट कर देगा, उदाहरण के लिए:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// लौटाता है "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// लौटाता है "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// लौटाता है "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// लौटाता है "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

आप [`setSystemTime`](/docs/api/clock/setSystemTime) या [`tick`](/docs/api/clock/tick) को कॉल करके सिस्टम समय संशोधित कर सकते हैं।

`FakeTimerInstallOpts` ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज़ हो सकती हैं:

 ```ts
interface FakeTimerInstallOpts {
    // निर्दिष्ट unix epoch के साथ फ़ेक टाइमर्स इंस्टॉल करता है
    // @default: 0
    now?: number | Date | undefined;

    // फ़ेक करने के लिए ग्लोबल मेथड्स और APIs के नामों वाला एक array। डिफ़ॉल्ट रूप से, WebdriverIO
    // `nextTick()` और `queueMicrotask()` को रिप्लेस नहीं करता। उदाहरण के लिए,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` केवल
    // `setTimeout()` और `nextTick()` को फ़ेक करेगा
    toFake?: FakeMethod[] | undefined;

    // runAll() कॉल करने पर चलाए जाने वाले टाइमर्स की अधिकतम संख्या (डिफ़ॉल्ट: 1000)
    loopLimit?: number | undefined;

    // WebdriverIO को वास्तविक सिस्टम समय में बदलाव के आधार पर मॉक किए गए समय को स्वचालित रूप से
    // बढ़ाने के लिए कहता है (उदा. वास्तविक सिस्टम समय में हर 20ms बदलाव पर मॉक किया गया समय
    // 20ms बढ़ाया जाएगा)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // केवल shouldAdvanceTime: true के साथ उपयोग करने पर प्रासंगिक। वास्तविक सिस्टम समय में हर
    // advanceTimeDelta ms बदलाव पर मॉक किए गए समय को advanceTimeDelta ms बढ़ाता है
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // FakeTimers को 'नेटिव' (यानी फ़ेक नहीं) टाइमर्स को उनके संबंधित हैंडलर्स को डेलीगेट करके
    // साफ़ करने के लिए कहता है। ये डिफ़ॉल्ट रूप से साफ़ नहीं किए जाते, जिससे FakeTimers इंस्टॉल
    // करने से पहले टाइमर्स मौजूद होने पर संभावित रूप से अप्रत्याशित व्यवहार हो सकता है।
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## डिवाइस

`emulate` कमांड किसी विशेष मोबाइल या डेस्कटॉप डिवाइस के इम्यूलेशन को भी सपोर्ट करती है। इसका उपयोग किसी भी स्थिति में मोबाइल टेस्टिंग के लिए नहीं किया जाना चाहिए, क्योंकि डेस्कटॉप ब्राउज़र इंजन मोबाइल इंजनों से भिन्न होते हैं। इसका उपयोग केवल तभी किया जाना चाहिए जब आपका एप्लिकेशन छोटे व्यूपोर्ट आकारों के लिए विशिष्ट व्यवहार प्रदान करता हो।

किसी डिवाइस के लिए, WebdriverIO:

- डिस्क्रिप्टर से यूज़र एजेंट सेट करता है
- व्यूपोर्ट और डिवाइस स्केल फ़ैक्टर सेट करता है
- जब डिस्क्रिप्टर में टच हो तो `maxTouchPoints` को `1` पर सेट करता है, अन्यथा टच को साफ़ करता है
- जब डिस्क्रिप्टर मोबाइल हो तो मोबाइल टेक्स्ट लेआउट और viewport meta टैग सेट करता है, अन्यथा उन्हें साफ़ करता है

यह डिवाइस के नाम से कोई स्क्रीन आकार या ओरिएंटेशन नहीं बनाता। व्यूपोर्ट `screen.width` नहीं है। उनके लिए `screen` और `orientation` स्कोप्स का उपयोग करें।

व्यूपोर्ट परिवर्तन उस टॉप-लेवल कॉन्टेक्स्ट को भेजा जाता है जो `emulate` कॉल किए जाने के समय वर्तमान था। डिवाइस को रिस्टोर करने से उसी कॉन्टेक्स्ट का आकार बदलता है, भले ही किसी अन्य विंडो पर स्विच किया गया हो।

यदि ब्राउज़र इनमें से किसी कमांड को अस्वीकार करता है, तो पिछला यूज़र एजेंट, व्यूपोर्ट, टच, टेक्स्ट लेआउट और viewport meta वापस लगा दिए जाते हैं और त्रुटि लौटाई जाती है। किसी कस्टम यूज़र एजेंट या `setViewport` आकार को डिफ़ॉल्ट से नहीं बदला जाता।

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// अपने एप्लिकेशन का परीक्षण करें ...

// यूज़र एजेंट, व्यूपोर्ट, टच, टेक्स्ट लेआउट और viewport meta रीसेट करें
await restore()
```

WebdriverIO [सभी परिभाषित डिवाइसों](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) की एक निश्चित सूची बनाए रखता है।