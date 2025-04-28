---
id: dragAndDrop
title: کشیدن و رها کردن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

کشیدن یک آیتم به یک عنصر مقصد یا موقعیت.

:::info

عملکرد این دستور به شدت به نحوه پیاده‌سازی کشیدن و رها کردن در برنامه شما بستگی دارد. اگر با مشکلاتی مواجه شدید، لطفاً مثال خود را در [#4134](https://github.com/webdriverio/webdriverio/issues/4134) ارسال کنید.

:::

##### استفاده

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>عنصر مقصد یا شیء با ویژگی‌های x و y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`DragAndDropOptions`</td>
      <td>گزینه‌های دستور dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>مدت زمانی که عملیات کشیدن باید طول بکشد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```