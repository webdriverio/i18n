---
id: executeAsync
title: تنفيذ غير متزامن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
الأمر `executeAsync` مهمل وسيتم إزالته في إصدار مستقبلي.
يرجى استخدام أمر `execute` بدلاً من ذلك حيث يوفر دعمًا أفضل لمعالجة 
الأخطاء عبر `async`/`await`.
:::

حقن مقتطف من JavaScript في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا. يفترض أن النص البرمجي الذي تم تنفيذه غير متزامن ويجب أن يشير إلى انتهائه من خلال استدعاء رد الاتصال المقدم، والذي يتم توفيره دائمًا كوسيط نهائي للدالة. القيمة المرسلة إلى رد الاتصال هذا سيتم إرجاعها إلى العميل.

لا يمكن أن تمتد أوامر النصوص البرمجية غير المتزامنة عبر تحميلات الصفحة. إذا تم إطلاق حدث تفريغ أثناء انتظار نتيجة نص برمجي، يجب إرجاع خطأ إلى العميل.

يحدد وسيط النص البرمجي النص البرمجي المراد تنفيذه في شكل نص وظيفة. سيتم استدعاء الدالة مع مصفوفة الوسائط المقدمة ويمكن الوصول إلى القيم عبر كائن الوسائط بالترتيب المحدد. الوسيط النهائي سيكون دائمًا دالة رد اتصال يجب استدعاؤها للإشارة إلى أن النص البرمجي قد انتهى.

قد تكون الوسائط أي JSON أولي، أو مصفوفة، أو كائن JSON. كائنات JSON التي تحدد مرجع WebElement سيتم تحويلها إلى عنصر DOM المقابل. وبالمثل، سيتم إرجاع أي WebElements في نتيجة النص البرمجي إلى العميل ككائنات WebElement JSON.

:::caution

يرجى استخدام `execute` بدلاً من ذلك
:::

##### الاستخدام

```js
browser.executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>النص البرمجي المراد تنفيذه.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`*`</td>
      <td>وسائط النص البرمجي</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### العائد

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة النص البرمجي.