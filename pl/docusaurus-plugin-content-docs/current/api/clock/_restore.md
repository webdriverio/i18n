---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

Przywraca wszystkie nadpisane natywne funkcje. Jest to automatycznie wywoływane między testami, więc generalnie nie powinno być potrzebne.

##### Użycie

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### Przykład

```js title="restore.js"
console.log(new Date()) // zwraca np. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // zwraca 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // zwraca 1722560447102
```

##### Zwraca

- **&lt; `Promise<void>` &gt;**