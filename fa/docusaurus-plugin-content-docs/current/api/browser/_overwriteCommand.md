---
id: overwriteCommand
title: بازنویسی دستور
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

متد مرورگر `overwriteCommand` به شما کمک می‌کند تا دستورات اصلی مرورگر و المان مانند `pause` و `click` را بازنویسی کنید.

:::info

شما می‌توانید اطلاعات بیشتری در مورد این موضوع در بخش [دستورات سفارشی](/docs/customcommands#overwriting-native-commands) مشاهده کنید.

:::

##### استفاده

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>نام دستور اصلی</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>عبور تابع اصلی</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>گسترش شیء Element به جای شیء Browser</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```