---
id: longPress
title: فشار طولانی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

حرکت فشار طولانی روی عنصر مورد نظر در صفحه نمایش را انجام می‌دهد.

این دستور یک فرمان WebDriver `action` را برای عنصر انتخاب شده صادر می‌کند. این دستور بر اساس دستور `click` است.

:::info

این دستور فقط با اجزای به‌روز زیر کار می‌کند:
 - سرور Appium (نسخه 2.0.0 یا بالاتر)
 - `appium-uiautomator2-driver` (برای اندروید)
 - `appium-xcuitest-driver` (برای iOS)

اطمینان حاصل کنید که محیط Appium محلی یا مبتنی بر فضای ابری شما به طور منظم به‌روزرسانی می‌شود تا از مشکلات سازگاری جلوگیری شود.

:::

##### استفاده

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`LongPressOptions`</td>
      <td>گزینه‌های فشار طولانی (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>عدد (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>عدد (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مدت زمان فشار بر حسب میلی‌ثانیه، پیش‌فرض 1500 میلی‌ثانیه است <br /><strong>فقط-موبایل</strong></td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```