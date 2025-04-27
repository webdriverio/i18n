---
id: restore
title: 恢复
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

恢复所有被覆盖的原生函数。这会在测试之间自动调用，所以通常不需要手动调用。

##### 用法

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### 示例

```js title="restore.js"
console.log(new Date()) // returns e.g. 1722560447102

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
```

##### 返回值

- **&lt; `Promise<void>` &gt;**