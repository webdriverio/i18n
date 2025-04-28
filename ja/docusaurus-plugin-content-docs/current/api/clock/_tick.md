---
id: tick
title: tick（ティック）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

時計を指定した数の `milliseconds`（ミリ秒）進めます。影響を受ける時間範囲内のタイマーはすべて呼び出されます。

##### 使用方法

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>時計を進めるミリ秒数。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### 戻り値

- **&lt; `Promise<void>` &gt;**