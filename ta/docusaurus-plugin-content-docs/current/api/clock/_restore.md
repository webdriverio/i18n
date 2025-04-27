---
id: restore
title: மீட்டமை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

எல்லா மாற்றியமைக்கப்பட்ட உள்ளமைந்த செயல்பாடுகளை மீட்டமைக்கிறது. இது சோதனைகளுக்கு இடையே தானாகவே அழைக்கப்படுகிறது, எனவே பொதுவாக தேவைப்படாது.

##### பயன்பாடு

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### உதாரணம்

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### திரும்பப் பெறுவது

- **&lt; `Promise<void>` &gt;**