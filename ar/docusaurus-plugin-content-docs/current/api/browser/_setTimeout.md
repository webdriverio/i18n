---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

يضبط المهل الزمنية المرتبطة بالجلسة الحالية، حيث تتحكم مدة المهل في سلوكيات مثل
المهل الزمنية لحقن البرامج النصية، وتنقل المستند، واسترجاع العناصر.
لمزيد من المعلومات والأمثلة، راجع [دليل المهل الزمنية](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

لا يُنصح بتعيين مهل زمنية `implicit` لأنها تؤثر على سلوك WebdriverIO
ويمكن أن تسبب أخطاء في بعض الأوامر، مثل `waitForExist` مع علامة العكس.

:::

##### الاستخدام

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>كائن يحتوي على قيم مهلة الجلسة</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالميلي ثانية لإعادة محاولة استراتيجية تحديد موقع العنصر عند العثور على عنصر.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالميلي ثانية للانتظار حتى ينتهي المستند من التحميل.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>النصوص البرمجية المحقونة باستخدام [`execute`](https://webdriver.io/docs/api/browser/execute) أو [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) ستعمل حتى تصل إلى مدة مهلة النص البرمجي، والتي تُعطى أيضًا بالميلي ثانية.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```