---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

الوصول إلى العناصر داخل shadowRoot لعنصر معين. إذا كنت تعمل مع الكثير من جذور الظل المتداخلة، فإن النهج البديل لـ `shadow$$` هو استخدام [محدد العمق](https://webdriver.io/docs/selectors#deep-selectors).

:::info

يقوم WebdriverIO تلقائيًا باختراق جذور الظل عند استخدام أوامر `$` أو `$$`.
هذا الأمر مطلوب فقط إذا كنت تقوم بالأتمتة في بيئة لا تدعم WebDriver Bidi بعد،
على سبيل المثال اختبار الويب للموبايل باستخدام Appium.

:::

##### الاستخدام

```js
$(selector).shadow$$(selector)
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
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### العائد

- **&lt;WebdriverIO.ElementArray&gt;**