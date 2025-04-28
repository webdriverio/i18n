---
id: waitForClickable
title: انتظار حتى يصبح قابل للنقر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

انتظر عنصرًا للمدة المحددة بالمللي ثانية حتى يصبح قابلًا للنقر أو غير قابل للنقر.

:::info

على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر لتنفيذ
هذا الأمر.

:::

##### الاستخدام

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>الوقت بالمللي ثانية (الإعداد الافتراضي يعتمد على قيمة [`waitforTimeout`](/docs/configuration#waitfortimeout) في التكوين)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت القيمة صحيحة فإنه ينتظر العكس (الافتراضي: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>إذا كانت موجودة فإنها تحل محل رسالة الخطأ الافتراضية</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين عمليات التحقق (الافتراضي: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### العائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` إذا كان العنصر قابلًا للنقر (أو لا إذا تم تعيين العلامة)