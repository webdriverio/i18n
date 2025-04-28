---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

يعتبر العنصر قابلاً للنقر عندما تستوفى الشروط التالية:

- العنصر موجود
- العنصر معروض
- العنصر غير معطل
- العنصر ضمن نطاق العرض
- يمكن تمرير العنصر إلى نطاق العرض
- لا يتداخل مركز العنصر مع عنصر آخر

وإلا يتم إرجاع القيمة false.

:::info

يرجى ملاحظة أن `isClickable` يعمل فقط في متصفح الويب وفي طرق عرض الويب على الأجهزة المحمولة،
وهو لا يعمل في سياق التطبيقات الأصلية للجوال. أيضًا، على عكس أوامر العناصر الأخرى، 
لن ينتظر WebdriverIO وجود العنصر لتنفيذ هذا الأمر.

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

##### العائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true إذا كان العنصر قابلاً للنقر