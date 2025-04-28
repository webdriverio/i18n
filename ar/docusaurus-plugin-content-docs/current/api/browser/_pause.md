---
id: pause
title: إيقاف مؤقت
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

يوقف التنفيذ لمدة زمنية محددة. لا يُنصح باستخدام هذا الأمر للانتظار حتى يظهر عنصر ما. لتجنب نتائج الاختبار غير المستقرة، من الأفضل استخدام أوامر مثل
[`waitForExist`](/docs/api/element/waitForExist) أو غيرها من أوامر waitFor*.

##### الاستخدام

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>الوقت بالميلي ثانية</td>
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