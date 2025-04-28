---
id: execute
title: تنفيذ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

حقن قطعة من JavaScript في الصفحة للتنفيذ في سياق الإطار المحدد حاليًا
باستخدام العنصر المعطى كنطاق، لأنه في نطاق العنصر، هذا يعني أن WebdriverIO سوف
ينتظر تلقائيًا وجود العنصر قبل تنفيذ البرنامج النصي.
يُفترض أن البرنامج النصي المنفذ متزامن ويتم إرجاع نتيجة تقييم البرنامج النصي إلى
العميل.

تحدد وسيطة البرنامج النصي البرنامج المراد تنفيذه في شكل نص وظيفة. القيمة التي تُرجعها
تلك الوظيفة سيتم إرجاعها إلى العميل. سيتم استدعاء الوظيفة بمصفوفة الوسيطات المقدمة
ويمكن الوصول إلى القيم عبر كائن arguments بالترتيب المحدد.

قد تكون الوسيطات أي نوع بدائي JSON، أو مصفوفة، أو كائن JSON. سيتم تحويل كائنات JSON التي تحدد مرجع WebElement
إلى عنصر DOM المقابل. وبالمثل، سيتم إرجاع أي WebElements في نتيجة البرنامج النصي
إلى العميل ككائنات JSON WebElement.

##### الاستخدام

```js
$(selector).execute(script, arguments)
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
      <td>البرنامج النصي المراد تنفيذه.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`*`</td>
      <td>وسيطات البرنامج النصي</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### العائد

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              نتيجة البرنامج النصي.