---
id: waitForClickable
title: انتظار ليكون قابل للنقر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

انتظر عنصرًا للمدة المحددة بالميلي ثانية ليكون قابلاً للنقر أو غير قابل للنقر.

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
      <td>الوقت بالميلي ثانية (القيمة الافتراضية تعتمد على إعداد [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت القيمة true فإنه ينتظر حدوث العكس (الافتراضي: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>إذا كانت موجودة فإنها تحل محل رسالة الخطأ الافتراضية</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين الفحوصات (الافتراضي: `waitforInterval`)</td>
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
            **<code><var>return</var></code>:**  `true` إذا كان العنصر قابلاً للنقر (أو لا يكون إذا تم تعيين العلامة)