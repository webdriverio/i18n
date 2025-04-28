---
id: overwriteCommand
title: تجاوز الأمر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

تساعدك طريقة المتصفح `overwriteCommand` على تجاوز أوامر المتصفح والعنصر الأصلية مثل `pause` و`click`.

:::info

يمكنك عرض مزيد من المعلومات حول هذا في قسم [الأوامر المخصصة](/docs/customcommands#overwriting-native-commands).

:::

##### الاستخدام

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>اسم الأمر الأصلي</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>تمرير الدالة الأصلية</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>توسيع كائن العنصر بدلاً من كائن المتصفح</td>
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