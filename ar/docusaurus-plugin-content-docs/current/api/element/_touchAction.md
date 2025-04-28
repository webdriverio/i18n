---
id: touchAction
title: إجراء اللمس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution تحذير من الاستنساخ

أمر `touchAction` __مستنسخ__ وسيتم إزالته في إصدار مستقبلي.
نوصي باستخدام أمر [`action`](/docs/api/browser/action) بدلاً من ذلك مع
نوع المؤشر `touch`، على سبيل المثال:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

توفر واجهة برمجة إجراءات اللمس الأساس لجميع الإيماءات التي يمكن أتمتتها في Appium.
وهي متاحة حاليًا فقط للتطبيقات الأصلية ولا يمكن استخدامها للتفاعل مع تطبيقات الويب.
في جوهرها، هناك القدرة على ربط الإجراءات الفردية المخصصة معًا، والتي سيتم بعد ذلك
تطبيقها على عنصر في التطبيق على الجهاز. الإجراءات الأساسية التي يمكن استخدامها هي:

- press (تمرير العنصر أو (x,y) أو كليهما)
- longPress (تمرير العنصر أو (x,y) أو كليهما)
- tap (تمرير العنصر أو (x,y) أو كليهما)
- moveTo (تمرير إحداثيات x,y المطلقة)
- wait (تمرير ms (بالمللي ثانية))
- release (بدون وسيطات)

##### الاستخدام

```js
$(selector).touchAction(action)
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
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```