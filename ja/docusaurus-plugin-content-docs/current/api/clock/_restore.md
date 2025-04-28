---
id: restore
title: 復元
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/restore.ts
---

オーバーライドされたすべてのネイティブ関数を復元します。これはテスト間で自動的に呼び出されるため、
通常は必要ありません。

##### 使用法

```js
const clock = await browser.emulate('clock', { ... })
await clock.restore()
```

##### 例

```js title="restore.js"
console.log(new Date()) // 例えば 1722560447102 を返す

const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // 1618383600000 を返す

await clock.restore()
console.log(await browser.execute(() => new Date().getTime())) // 1722560447102 を返す
```

##### 戻り値

- **&lt; `Promise<void>` &gt;**