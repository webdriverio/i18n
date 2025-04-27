---
id: clock
title: घड़ी वस्तु
---

आप [`emulate`](/docs/emulation) कमांड का उपयोग करके ब्राउज़र सिस्टम घड़ी को संशोधित कर सकते हैं। यह समय से संबंधित native global functions को override करता है जिससे उन्हें `clock.tick()` या yielded clock object के माध्यम से synchronously नियंत्रित किया जा सकता है। इसमें निम्नलिखित को नियंत्रित करना शामिल है:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

घड़ी unix epoch (timestamp 0) से शुरू होती है। इसका मतलब है कि जब आप अपने अनुप्रयोग में new Date को instantiate करते हैं, तो इसका समय 1 जनवरी, 1970 होगा यदि आप `emulate` कमांड में कोई अन्य विकल्प नहीं देते हैं।

## उदाहरण

जब आप `browser.emulate('clock', { ... })` कॉल करते हैं, तो यह तुरंत वर्तमान पेज के साथ-साथ सभी आगामी पेजों के लिए global functions को ओवरराइट कर देगा, उदाहरण के लिए:

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

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

आप [`setSystemTime`](/docs/api/clock/setSystemTime) या [`tick`](/docs/api/clock/tick) को कॉल करके सिस्टम समय को संशोधित कर सकते हैं।