---
id: clock
title: Clockオブジェクト
---

[`emulate`](/docs/emulation)コマンドを使用して、ブラウザのシステムクロックを変更できます。これにより、時間に関連するネイティブなグローバル関数が上書きされ、`clock.tick()`または生成されたclockオブジェクトを介して同期的に制御できるようになります。これには以下の制御が含まれます：

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

クロックはUnixエポック（タイムスタンプ0）から開始します。つまり、アプリケーションで新しいDateをインスタンス化すると、`emulate`コマンドに他のオプションを渡さない限り、1970年1月1日の時間になります。

## 例

`browser.emulate('clock', { ... })`を呼び出すと、現在のページと以降のすべてのページのグローバル関数が即座に上書きされます：

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

[`setSystemTime`](/docs/api/clock/setSystemTime)または[`tick`](/docs/api/clock/tick)を呼び出すことでシステム時間を変更できます。