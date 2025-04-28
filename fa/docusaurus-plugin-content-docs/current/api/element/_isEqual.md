---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

بررسی می‌کند که آیا عنصر انتخاب شده با عنصر ارائه شده مطابقت دارد یا خیر و در صورت مطابقت مقدار true برمی‌گرداند.

##### استفاده

```js
$(selector).isEqual(el)
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
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>عنصری که باید با آن مقایسه شود</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    مقدار true اگر عناصر یکسان باشند