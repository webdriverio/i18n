---
id: touchAction
title: عملیات لمسی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution اخطار منسوخ شدن

دستور `touchAction` __منسوخ__ شده است و در نسخه‌های آینده حذف خواهد شد.
ما پیشنهاد می‌کنیم به جای آن از دستور [`action`](/docs/api/browser/action) با 
نوع اشاره‌گر `touch` استفاده کنید، به عنوان مثال:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API عملیات لمسی، اساس تمام حرکات دستی را فراهم می‌کند که می‌توانند در Appium خودکار شوند.
در حال حاضر فقط برای برنامه‌های بومی در دسترس است و نمی‌تواند برای تعامل با وب‌اپ‌ها استفاده شود.
اساس این عملکرد، توانایی زنجیره کردن اقدامات فردی است که سپس
روی یک عنصر در برنامه دستگاه اعمال می‌شود. اقدامات اساسی که می‌توان استفاده کرد عبارتند از:

- press (عنصر یا (x,y) یا هر دو را ارسال کنید)
- longPress (عنصر یا (x,y) یا هر دو را ارسال کنید)
- tap (عنصر یا (x,y) یا هر دو را ارسال کنید)
- moveTo (مختصات مطلق x,y را ارسال کنید)
- wait (زمان را بر حسب میلی‌ثانیه ارسال کنید)
- release (بدون آرگومان)

##### استفاده

```js
$(selector).touchAction(action)
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