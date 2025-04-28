---
id: waitForExist
title: انتظار الوجود
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

انتظر وجود عنصر لمدة معينة من الميلي ثانية ليكون موجودًا داخل DOM. يرجع `true` إذا كان المحدد يطابق عنصرًا واحدًا على الأقل موجودًا في DOM، وإلا فإنه يرمي خطأ. إذا كانت علامة العكس `true`، فستعيد الأمر بدلاً من ذلك `true` إذا كان المحدد لا يطابق أي عناصر.

:::info

على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر لتنفيذ هذا الأمر.

:::

##### الاستخدام

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`WaitForOptions`</td>
      <td>خيارات waitForEnabled (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالميلي ثانية (الافتراضي يعتمد على قيمة [`waitforTimeout`](/docs/configuration#waitfortimeout) في الإعدادات)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت true فإنه ينتظر العكس (الافتراضي: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>إذا وجدت فإنها تتجاوز رسالة الخطأ الافتراضية</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين الفحوصات (الافتراضي: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### العائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     إذا كان العنصر موجودًا (أو غير موجود إذا تم تعيين العلامة)