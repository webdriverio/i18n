---
id: restore
title: पुनर्स्थापित
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

सभी ओवरराइड किए गए मूल फ़ंक्शन्स को पुनर्स्थापित करें। यह परीक्षणों के बीच स्वचालित रूप से कॉल किया जाता है, इसलिए आमतौर पर इसकी आवश्यकता नहीं होती है।

##### उपयोग

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### उदाहरण

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### रिटर्न्स

- **&lt; `Promise<void>` &gt;**
    