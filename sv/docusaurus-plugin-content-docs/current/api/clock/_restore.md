---
id: restore
title: återställ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

Återställer alla åsidosatta inbyggda funktioner. Detta anropas automatiskt mellan tester, så det behövs 
generellt inte.

##### Användning

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### Exempel

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### Returnerar

- **&lt; `Promise<void>` &gt;**