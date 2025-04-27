---
id: emulation
title: एमुलेशन
---

WebdriverIO के साथ आप [`emulate`](/docs/api/browser/emulate) कमांड का उपयोग करके वेब API का एमुलेशन कर सकते हैं और कस्टम वैल्यू रिटर्न कर सकते हैं जो आपको कुछ ब्राउज़र व्यवहारों का एमुलेशन करने में मदद करता है। ध्यान दें कि इसके लिए आपके एप्लिकेशन को स्पष्ट रूप से इन API का उपयोग करना आवश्यक है।

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

इस फीचर के लिए ब्राउज़र के लिए WebDriver Bidi समर्थन की आवश्यकता है। हालांकि Chrome, Edge और Firefox के हालिया वर्शन में ऐसा समर्थन है, Safari __नहीं__ करता है। अपडेट के लिए [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) का अनुसरण करें। इसके अलावा, यदि आप ब्राउज़र लॉन्च करने के लिए क्लाउड वेंडर का उपयोग करते हैं, तो सुनिश्चित करें कि आपका वेंडर भी WebDriver Bidi का समर्थन करता है।

अपने टेस्ट के लिए WebDriver Bidi सक्षम करने के लिए, सुनिश्चित करें कि आपकी कैपेबिलिटीज में `webSocketUrl: true` सेट है।

:::

## जियोलोकेशन

ब्राउज़र जियोलोकेशन को किसी विशिष्ट क्षेत्र में बदलें, उदाहरण के लिए:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

यह मंकी पैच करेगा कि [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) कैसे काम करता है और आपके द्वारा प्रदान किया गया स्थान वापस करता है।

## कलर स्कीम

ब्राउज़र के डिफ़ॉल्ट कलर स्कीम सेटअप को इस तरह बदलें:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

यह मंकी पैच करेगा कि [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) कैसे व्यवहार करता है जब आप `(prefers-color-scheme: dark)` के माध्यम से कलर स्कीम क्वेरी करते हैं।

## यूजर एजेंट

ब्राउज़र के यूजर एजेंट को एक अलग स्ट्रिंग में इस तरह बदलें:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

यह [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) के मान को बदलेगा। ध्यान दें कि ब्राउज़र वेंडर प्रोग्रेसिव रूप से User Agent को डेप्रिकेट कर रहे हैं।

## onLine प्रॉपर्टी

ब्राउज़र की ऑनलाइन स्थिति को इस तरह बदलें:

```ts
await browser.emulate('onLine', false)
```

यह ब्राउज़र और इंटरनेट के बीच नेटवर्क ट्रैफिक को __बंद नहीं__ करेगा और केवल [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) के रिटर्न वैल्यू को बदलेगा। यदि आप ब्राउज़र की नेटवर्क क्षमताओं को संशोधित करने में रुचि रखते हैं, तो [`throttleNetwork`](/docs/api/browser/throttleNetwork) कमांड देखें।

## क्लॉक

आप [`emulate`](/docs/emulation) कमांड का उपयोग करके ब्राउज़र सिस्टम क्लॉक को संशोधित कर सकते हैं। यह समय से संबंधित नेटिव ग्लोबल फंक्शंस को ओवरराइड करता है, जिससे उन्हें `clock.tick()` या यील्डेड क्लॉक ऑब्जेक्ट के माध्यम से सिंक्रोनस रूप से नियंत्रित किया जा सकता है। इसमें शामिल है:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

क्लॉक यूनिक्स एपोक (टाइमस्टैम्प 0) से शुरू होता है। इसका मतलब है कि जब आप अपने एप्लिकेशन में new Date इंस्टेंशिएट करते हैं, तो यदि आप `emulate` कमांड में कोई अन्य विकल्प पास नहीं करते हैं तो इसका समय 1 जनवरी, 1970 होगा।

##### उदाहरण

जब `browser.emulate('clock', { ... })` कॉल करते हैं, तो यह तुरंत वर्तमान पेज के साथ-साथ सभी अगले पेजों के लिए ग्लोबल फंक्शंस को ओवरराइट कर देगा, उदाहरण के लिए:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

आप [`setSystemTime`](/docs/api/clock/setSystemTime) या [`tick`](/docs/api/clock/tick) को कॉल करके सिस्टम टाइम संशोधित कर सकते हैं।

`FakeTimerInstallOpts` ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज हो सकती हैं:

 ```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## डिवाइस

`emulate` कमांड व्यूपोर्ट, डिवाइस स्केल फैक्टर और यूजर एजेंट को बदलकर एक निश्चित मोबाइल या डेस्कटॉप डिवाइस का एमुलेशन करने का भी समर्थन करता है। किसी भी तरह से इसका उपयोग मोबाइल टेस्टिंग के लिए नहीं किया जाना चाहिए क्योंकि डेस्कटॉप ब्राउज़र इंजन मोबाइल से अलग होते हैं। इसका उपयोग केवल तभी किया जाना चाहिए जब आपका एप्लिकेशन छोटे व्यूपोर्ट आकारों के लिए एक विशिष्ट व्यवहार प्रदान करता है।

उदाहरण के लिए, यूजर एजेंट और व्यूपोर्ट को iPhone 15 में बदलने के लिए, बस चलाएं:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO [सभी परिभाषित डिवाइसों](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) की एक निश्चित सूची बनाए रखता है।