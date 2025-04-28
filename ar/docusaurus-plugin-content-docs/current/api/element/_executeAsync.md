---
id: executeAsync
title: تنفيذ غير متزامن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
أمر `executeAsync` مهمل وسيتم إزالته في إصدار مستقبلي.
يرجى استخدام أمر `execute` بدلاً من ذلك حيث يوفر دعمًا أفضل للتعامل
مع الأخطاء عبر `async`/`await`.
:::

قم بحقن جزء من JavaScript في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا
باستخدام العنصر المعطى كنطاق، لأنه في نطاق العنصر يعني ذلك أن WebdriverIO سوف
ينتظر تلقائيًا وجود العنصر قبل تنفيذ البرنامج النصي.
يفترض أن البرنامج النصي المنفذ غير متزامن ويجب أن يشير إلى انتهائه عن طريق استدعاء
رد الاتصال المقدم، والذي يتم تقديمه دائمًا كوسيطة نهائية للدالة. القيمة
المرسلة إلى رد الاتصال هذا سيتم إرجاعها إلى العميل.

قد لا تمتد أوامر البرنامج النصي غير المتزامنة عبر تحميلات الصفحة. إذا تم إطلاق حدث تفريغ أثناء انتظار
نتيجة البرنامج النصي، يجب إرجاع خطأ إلى العميل.

تحدد وسيطة البرنامج النصي البرنامج المراد تنفيذه في شكل جسم دالة. سيتم
استدعاء الدالة مع مصفوفة الوسائط المقدمة ويمكن الوصول إلى القيم عبر كائن الوسائط
بالترتيب المحدد. الوسيطة النهائية ستكون دائمًا دالة رد اتصال يجب استدعاؤها
للإشارة إلى أن البرنامج النصي قد انتهى.

قد تكون الوسائط أي بدائية JSON، أو مصفوفة، أو كائن JSON. كائنات JSON التي تحدد مرجع WebElement
سيتم تحويلها إلى عنصر DOM المقابل. وبالمثل، أي WebElements في نتيجة
البرنامج النصي سيتم إرجاعها إلى العميل ككائنات JSON WebElement.

:::caution

يرجى استخدام `execute` بدلاً من ذلك
:::

##### الاستخدام

```js
$(selector).executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>البرنامج النصي المراد تنفيذه.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`*`</td>
      <td>وسائط البرنامج النصي</td>
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

##### القيم المرجعة

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة البرنامج النصي.