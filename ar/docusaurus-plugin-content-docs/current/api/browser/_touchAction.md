---
id: touchAction
title: إجراء اللمس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution تحذير الاستهلاك

أمر `touchAction` __مستهلك__ وسيتم إزالته في إصدار مستقبلي.
نوصي باستخدام أمر [`action`](/docs/api/browser/action) بدلاً من ذلك مع
نوع المؤشر `touch`، على سبيل المثال:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

توفر واجهة برمجة تطبيقات إجراء اللمس الأساس لجميع الإيماءات التي يمكن أتمتتها في Appium.
وهي متاحة حاليًا فقط للتطبيقات الأصلية ولا يمكن استخدامها للتفاعل مع تطبيقات الويب.
في جوهرها هي القدرة على ربط الإجراءات الفردية _المخصصة_ معًا، والتي سيتم تطبيقها على عنصر في التطبيق على الجهاز. الإجراءات الأساسية التي يمكن استخدامها هي:

- press (تمرير العنصر أو (`x`, `y`) أو كلاهما)
- longPress (تمرير العنصر أو (`x`, `y`) أو كلاهما)
- tap (تمرير العنصر أو (`x`, `y`) أو كلاهما)
- moveTo (تمرير إحداثيات `x`, `y` المطلقة)
- wait (تمرير `ms` (بالميلي ثانية))
- release (بدون وسيطات)

##### الاستخدام

```js
browser.touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>الإجراء المراد تنفيذه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```