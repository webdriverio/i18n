---
id: touchAction
title: عملیات لمسی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution هشدار منسوخ شدن

دستور `touchAction` __منسوخ شده__ است و در نسخه‌های آینده حذف خواهد شد.
ما پیشنهاد می‌کنیم که به جای آن از دستور [`action`](/docs/api/browser/action) با 
نوع اشاره‌گر `touch` استفاده کنید، به عنوان مثال:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API عملیات لمسی، اساس تمام حرکات دستی را فراهم می‌کند که می‌توانند در Appium خودکارسازی شوند.
در حال حاضر فقط برای برنامه‌های بومی در دسترس است و نمی‌تواند برای تعامل با برنامه‌های وب استفاده شود.
در هسته آن، توانایی زنجیره‌سازی اقدامات فردی _موردی_ وجود دارد که سپس به یک عنصر در برنامه روی دستگاه اعمال می‌شود. اقدامات اساسی که می‌توان استفاده کرد عبارتند از:

- press (عنصر یا (`x`, `y`) یا هر دو را ارسال کنید)
- longPress (عنصر یا (`x`, `y`) یا هر دو را ارسال کنید)
- tap (عنصر یا (`x`, `y`) یا هر دو را ارسال کنید)
- moveTo (مختصات مطلق `x`، `y` را ارسال کنید)
- wait (زمان انتظار `ms` به میلی‌ثانیه را ارسال کنید)
- release (بدون آرگومان)

##### استفاده

```js
browser.touchAction(action)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>عملیاتی که باید اجرا شود</td>
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