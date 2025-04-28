---
id: execute
title: تنفيذ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

حقن مقطع من JavaScript في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا.
يُفترض أن البرنامج النصي المنفذ متزامن ويتم إرجاع نتيجة تقييم البرنامج النصي إلى
العميل.

يحدد وسيط البرنامج النصي البرنامج النصي المراد تنفيذه في شكل نص وظيفة. سيتم إرجاع القيمة التي ترجعها
تلك الوظيفة إلى العميل. سيتم استدعاء الوظيفة باستخدام مصفوفة الوسائط المقدمة،
ويمكن الوصول إلى القيم عبر كائن الوسائط بالترتيب المحدد.

قد تكون الوسائط أي قيمة بدائية في JSON، أو مصفوفة، أو كائن JSON. سيتم تحويل كائنات JSON التي تحدد
مرجع WebElement إلى عنصر DOM المقابل. وبالمثل، سيتم إرجاع أي عناصر WebElements في نتيجة
البرنامج النصي إلى العميل ككائنات JSON من نوع WebElement.

##### الاستخدام

```js
browser.execute(script, arguments)
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

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### الإرجاع

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة البرنامج النصي.