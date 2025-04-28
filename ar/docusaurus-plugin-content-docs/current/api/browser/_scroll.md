---
id: scroll
title: التمرير
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

التمرير داخل منظور المتصفح. لاحظ أن إحداثيات `x` و `y` هي نسبية إلى موضع التمرير الحالي، وبالتالي فإن `browser.scroll(0, 0)` ليست عملية.

##### الاستخدام

```js
browser.scroll(x, y)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>موضع التمرير الأفقي (الافتراضي: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>موضع التمرير العمودي (الافتراضي: `0`)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```