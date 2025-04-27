---
id: tick
title: tick（时钟跳转）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

将时钟向前移动指定的 `milliseconds`（毫秒）数。任何在受影响时间范围内的计时器都将被调用。

##### 用法

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>时钟要移动的毫秒数。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### 返回值

- **&lt; `Promise<void>` &gt;**