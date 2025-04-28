---
id: waitForEnabled
title: انتظار التمكين
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

انتظر عنصرًا (محددًا بواسطة محدد CSS) لمدة معينة من 
المللي ثانية ليصبح (معطل/ممكّن). إذا تم استعلام عناصر متعددة بواسطة المحدد المعين، يتم إرجاع قيمة true إذا كان عنصر واحد على الأقل (معطل/ممكّن).

:::info

على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر
لتنفيذ هذا الأمر.

:::

##### الاستخدام

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>الوقت بالمللي ثانية (الافتراضي يستند إلى قيمة التكوين [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت القيمة true فإنه ينتظر النتيجة المعاكسة (الافتراضي: false)</td>
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

##### أمثلة

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### العائدات

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     إذا كان العنصر (معطل/ممكّن)