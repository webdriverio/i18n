---
id: execute
title: تنفيذ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

حقن جزء من جافا سكريبت في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا.
يُفترض أن النص البرمجي المنفذ متزامن ويتم إرجاع نتيجة تقييم النص البرمجي إلى
العميل.

يحدد وسيط النص البرمجي النص البرمجي المراد تنفيذه على شكل نص وظيفة. سيتم إرجاع القيمة التي ترجعها
تلك الوظيفة إلى العميل. سيتم استدعاء الوظيفة باستخدام مصفوفة الوسائط المقدمة
ويمكن الوصول إلى القيم عبر كائن الوسائط بالترتيب المحدد.

يمكن أن تكون الوسائط أي نوع JSON أولي، أو مصفوفة، أو كائن JSON. كائنات JSON التي تحدد مرجع WebElement
سيتم تحويلها إلى عنصر DOM المقابل. وبالمثل، أي عناصر WebElements في نتيجة
النص البرمجي سيتم إرجاعها إلى العميل ككائنات JSON للـ WebElement.

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

##### النتائج

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة النص البرمجي.    
```