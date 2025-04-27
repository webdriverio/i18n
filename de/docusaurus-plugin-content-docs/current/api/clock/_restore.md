---
id: restore
title: wiederherstellen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

Stellt alle überschriebenen nativen Funktionen wieder her. Dies wird automatisch zwischen Tests aufgerufen und sollte daher in der Regel nicht benötigt werden.

##### Verwendung

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### Beispiel

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### Gibt zurück

- **&lt; `Promise<void>` &gt;**