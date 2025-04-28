---
id: tap
title: ضربه‌زدن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

انجام حرکت ضربه زدن روی:
- یا عنصر مشخص شده. به طور **خودکار اسکرول می‌کند** اگر نتواند آن را پیدا کند.
- یا صفحه نمایش دستگاه موبایل با ارائه مختصات `x` و `y`

داخلی از این موارد استفاده می‌کند:
- ضربه زدن به عنصر:
     - دستور `click` برای محیط‌های وب (مرورگرهای کروم/سافاری، یا برنامه‌های هیبریدی)
     - [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture) اندروید
یا [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) iOS برای برنامه‌های بومی، شامل دستور
`scrollIntoView` برای اسکرول خودکار
- ضربه زدن به صفحه نمایش:
     - دستور `action` برای محیط‌های وب (مرورگرهای کروم/سافاری، یا برنامه‌های هیبریدی)
     - [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture) اندروید
یا [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) iOS برای برنامه‌های بومی

این تفاوت، دستور `tap` را به گزینه‌ای قابل اعتمادتر نسبت به دستور `click` برای برنامه‌های موبایل تبدیل می‌کند.

برای برنامه‌های بومی، این دستور با دستور `click` متفاوت است زیرا <strong>به طور خودکار به سمت عنصر اسکرول می‌کند</strong> با استفاده از دستور `scrollIntoView`،
که برای برنامه‌های بومی با دستور `click` پشتیبانی نمی‌شود. در برنامه‌های هیبریدی یا محیط‌های وب، اسکرول خودکار برای هر دو دستور `click` و `tap` پشتیبانی می‌شود.

:::info

این دستور فقط با اجزای به‌روز زیر کار می‌کند:
 - سرور Appium (نسخه 2.0.0 یا بالاتر)
 - `appium-uiautomator2-driver` (برای اندروید)
 - `appium-xcuitest-driver` (برای iOS)

اطمینان حاصل کنید که محیط Appium محلی یا مبتنی بر ابر شما به طور منظم به‌روزرسانی می‌شود تا از مشکلات سازگاری جلوگیری شود.

:::

:::caution برای ضربه‌های صفحه نمایش

اگر می‌خواهید روی مختصات خاصی از صفحه نمایش ضربه بزنید و از اسکرین‌شات برای تعیین مختصات استفاده می‌کنید، به یاد داشته باشید که
مختصات برای iOS بر اساس اندازه صفحه نمایش دستگاه است، نه اندازه اسکرین‌شات. اندازه اسکرین‌شات به دلیل نسبت پیکسل دستگاه بزرگتر است.
متوسط نسبت پیکسل دستگاه تا آیفون 8 و آیپدهای فعلی 2 است، برای آیفون‌ها از آیفون X به بعد نسبت 3 است. این بدان معناست که اندازه اسکرین‌شات
2 یا 3 برابر بزرگتر از اندازه صفحه نمایش دستگاه است که به این معنی است که اگر مختصات را روی اسکرین‌شات پیدا می‌کنید، آنها را بر نسبت پیکسل
دستگاه تقسیم کنید تا مختصات صحیح صفحه را به دست آورید. برای مثال:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // مثال برای آیفون 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

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
      <td>`TapOptions`</td>
      <td>گزینه‌های ضربه زدن (اختیاری)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>گزینه‌های ضربه زدن به عنصر</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>عدد (اختیاری، اگر y تنظیم شده باشد اجباری است) <br /><strong>فقط برای ضربه زدن به صفحه نمایش، نه برای ضربه زدن به عنصر</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>عدد (اختیاری، اگر x تنظیم شده باشد اجباری است) <br /><strong>فقط برای ضربه زدن به صفحه نمایش، نه برای ضربه زدن به عنصر</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>گزینه‌های ضربه زدن به صفحه نمایش</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>می‌تواند یکی از `down`، `up`، `left` یا `right` باشد، پیش‌فرض `down` است. <br /><strong>فقط برای ضربه زدن به عنصر، نه برای ضربه زدن به صفحه نمایش</strong><br /><strong>فقط-برنامه-بومی-موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>حداکثر تعداد اسکرول‌ها تا زمانی که جستجوی عنصر متوقف شود، پیش‌فرض `10` است. <br /><strong>فقط برای ضربه زدن به عنصر، نه برای ضربه زدن به صفحه نمایش</strong><br /><strong>فقط-برنامه-بومی-موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Element`</td>
      <td>عنصری که برای اسکرول در آن استفاده می‌شود. اگر هیچ عنصری ارائه نشود، از انتخابگر زیر برای iOS استفاده می‌کند `-ios predicate string:type == "XCUIElementTypeApplication"` و برای اندروید `//android.widget.ScrollView'`. اگر عناصر بیشتری با انتخابگر پیش‌فرض مطابقت داشته باشند، به طور پیش‌فرض اولین عنصر مطابق را انتخاب می‌کند. <br /><strong>فقط برای ضربه زدن به عنصر، نه برای ضربه زدن به صفحه نمایش</strong><br /><strong>فقط-برنامه-بومی-موبایل</strong></td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```