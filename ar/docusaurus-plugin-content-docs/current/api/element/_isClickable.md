---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

يُعتبر العنصر قابلاً للنقر عندما تتحقق الشروط التالية:

- العنصر موجود
- العنصر معروض
- العنصر غير معطل
- العنصر ضمن منطقة العرض
- يمكن تمرير العنصر ليكون ضمن منطقة العرض
- مركز العنصر لا يتداخل مع عنصر آخر

وإلا ترجع القيمة false.

:::info

يرجى ملاحظة أن `isClickable` يعمل فقط في متصفح الويب وفي منطقة عرض الويب على الأجهزة المحمولة،
ولا يعمل في سياق التطبيقات الأصلية للهاتف المحمول. أيضًا، على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر لتنفيذ هذا الأمر.

:::

##### الاستخدام

```js
$(selector).isClickable()
```

##### مثال

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### النتائج

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true إذا كان العنصر قابلاً للنقر