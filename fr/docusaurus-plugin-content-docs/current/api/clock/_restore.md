---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

Restaure toutes les fonctions natives modifiées. Ceci est automatiquement appelé entre les tests, donc ne devrait généralement pas être nécessaire.

##### Usage

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### Example

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### Returns

- **&lt; `Promise<void>` &gt;**