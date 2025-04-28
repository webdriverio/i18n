---
id: executeAsync
title: تنفيذ غير متزامن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
أمر `executeAsync` مهمل وسيتم إزالته في إصدار مستقبلي.
يرجى استخدام أمر `execute` بدلاً من ذلك حيث يوفر دعمًا أفضل
للتعامل مع الأخطاء عبر `async`/`await`.
:::

يحقن مقطع من جافا سكريبت في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا
باستخدام العنصر المعطى كنطاق، نظرًا لأنه في نطاق العنصر فهذا يعني أن WebdriverIO سوف
ينتظر تلقائيًا وجود العنصر قبل تنفيذ النص البرمجي.
يُفترض أن النص البرمجي المنفذ غير متزامن ويجب أن يشير إلى اكتماله عن طريق استدعاء
رد الاتصال المقدم، والذي يتم توفيره دائمًا كوسيط نهائي للدالة. سيتم إرجاع القيمة
المرسلة إلى رد الاتصال هذا إلى العميل.

قد لا تمتد أوامر النصوص البرمجية غير المتزامنة عبر تحميلات الصفحة. إذا تم إطلاق حدث إلغاء التحميل أثناء الانتظار
لنتيجة النص البرمجي، فيجب إرجاع خطأ إلى العميل.

يحدد وسيط النص البرمجي النص البرمجي الذي سيتم تنفيذه في شكل نص الدالة. سيتم
استدعاء الدالة مع مصفوفة الوسائط المقدمة ويمكن الوصول إلى القيم عبر كائن الوسائط
بالترتيب المحدد. سيكون الوسيط النهائي دائمًا دالة رد اتصال يجب استدعاؤها
للإشارة إلى أن النص البرمجي قد انتهى.

يمكن أن تكون الوسائط أي JSON-primitive، أو مصفوفة، أو كائن JSON. كائنات JSON التي تحدد مرجع WebElement
سيتم تحويلها إلى عنصر DOM المقابل. وبالمثل، أي WebElements في نتيجة
النص البرمجي سيتم إرجاعها إلى العميل ككائنات WebElement JSON.

:::caution

يرجى استخدام `execute` بدلاً من ذلك
:::

##### الاستخدام

```js
$(selector).executeAsync(script, arguments)
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
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### العائد

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة النص البرمجي.