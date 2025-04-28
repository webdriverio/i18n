---
id: setSystemTime
title: システム時間の設定
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

システム時間を新しい時間に変更します。現在時刻はタイムスタンプ、日付オブジェクト、または省略した場合はデフォルトで0になります。どのタイマーも呼び出されず、タイマーが起動するまでの残り時間も変わりません。

##### 使用方法

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>システム時間に設定する新しい日付</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### 戻り値

- **&lt; `Promise<void>` &gt;**