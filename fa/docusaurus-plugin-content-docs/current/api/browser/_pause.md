---
id: pause
title: مکث
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

اجرا را برای مدت زمان مشخصی متوقف می‌کند. توصیه می‌شود از این دستور برای انتظار جهت ظاهر شدن یک عنصر استفاده نکنید. برای جلوگیری از نتایج آزمون غیرقابل اعتماد، بهتر است از دستوراتی مانند
[`waitForExist`](/docs/api/element/waitForExist) یا سایر دستورات waitFor* استفاده کنید.

##### استفاده

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>زمان به میلی‌ثانیه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```