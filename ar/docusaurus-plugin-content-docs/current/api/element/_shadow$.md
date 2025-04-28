---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

الوصول إلى عنصر داخل shadowRoot للعنصر المحدد. إذا كنت تعمل مع الكثير من shadow roots المتداخلة، فإن النهج البديل لـ `shadow$` هو استخدام [محدد العمق (deep selector)](https://webdriver.io/docs/selectors#deep-selectors).

:::info

يقوم WebdriverIO تلقائيًا باختراق shadow roots عند استخدام أوامر `$` أو `$$`.
هذا الأمر مطلوب فقط إذا كنت تقوم بالأتمتة في بيئة لا تدعم WebDriver Bidi بعد، مثل اختبار الويب على الهاتف المحمول باستخدام Appium.

:::

##### الاستخدام

```js
$(selector).shadow$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>محدد أو دالة JS لجلب عنصر معين</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### النتائج

- **&lt;WebdriverIO.Element&gt;**