---
id: setSystemTime
title: 设置系统时间
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

将系统时间更改为新的时间点。时间点可以是时间戳、日期对象，或者不传入参数（默认为0）。不会调用任何计时器，也不会改变它们触发前的剩余时间。

##### 用法

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>要设置的新系统时间。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### 返回值

- **&lt; `Promise<void>` &gt;**