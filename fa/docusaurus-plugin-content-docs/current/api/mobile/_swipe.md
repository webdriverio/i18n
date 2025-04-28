---
id: swipe
title: سوایپ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

سوایپ در جهت خاص در ویوپورت یا المان برای وب دسکتاپ/موبایل <strong>و</strong> اپلیکیشن‌های بومی موبایل.

:::info

سوایپ کردن برای اپلیکیشن‌های بومی موبایل بر اساس پروتکل W3C-actions است که فشار و حرکت انگشت را شبیه‌سازی می‌کند.
این با [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) برای اندروید
یا [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) برای iOS متفاوت است که بر اساس پروتکل Appium Driver است و
فقط برای پلتفرم‌های موبایل در محیط NATIVE در دسترس است.

این دستور فقط با اجزای به‌روز زیر کار می‌کند:
 - سرور Appium (نسخه 2.0.0 یا بالاتر)
 - `appium-uiautomator2-driver` (برای اندروید)
 - `appium-xcuitest-driver` (برای iOS)

مطمئن شوید که محیط Appium محلی یا ابری شما به طور منظم به‌روز می‌شود تا از مشکلات سازگاری جلوگیری شود.

:::

:::caution سوایپ بر اساس مختصات

از استفاده از گزینه‌های `from` و `to` خودداری کنید مگر اینکه کاملاً ضروری باشد. این‌ها مختص دستگاه هستند و ممکن است در دستگاه‌های مختلف به طور یکسان کار نکنند.
برای سوایپ‌های قابل اعتماد در یک عنصر، از گزینه `scrollableElement` استفاده کنید.

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
      <td>`object, boolean`</td>
      <td>گزینه‌های `browser.swipe()`. پیش‌فرض برای دسکتاپ/وب موبایل: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>می‌تواند یکی از `down`، `up`، `left` یا `right` باشد، پیش‌فرض `up` است. <br /><strong>فقط-اپلیکیشن-بومی-موبایل</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>پایین</strong><br /><strong>نقطه شروع:</strong><br/>انگشت خود را در قسمت بالای صفحه قرار می‌دهید.<br/><strong>حرکت:</strong><br/>انگشت خود را به سمت پایین صفحه حرکت می‌دهید.<br/><strong>عملکرد:</strong><br/>این نیز بسته به زمینه متفاوت است:<br />- در صفحه اصلی یا در برنامه‌ها، معمولاً محتوا را به سمت بالا اسکرول می‌کند.<br />- از لبه بالایی، اغلب پنل اعلان‌ها یا تنظیمات سریع را باز می‌کند.<br />- در مرورگرها یا برنامه‌های خواندن، می‌تواند برای اسکرول محتوا استفاده شود.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>چپ</strong><br /><strong>نقطه شروع:</strong><br/>انگشت خود را در سمت راست صفحه قرار می‌دهید.<br/><strong>حرکت:</strong><br/>انگشت خود را به صورت افقی به سمت چپ حرکت می‌دهید.><br/><strong>عملکرد:</strong><br/>پاسخ به این حرکت به برنامه بستگی دارد:<br />- می‌تواند به مورد بعدی در یک کاروسل یا مجموعه‌ای از تصاویر حرکت کند.<br />- در زمینه ناوبری، ممکن است به صفحه قبلی بازگردد یا نمای فعلی را ببندد.<br />- در صفحه اصلی، معمولاً به دسکتاپ یا صفحه مجازی بعدی تغییر می‌کند.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>راست</strong><br /><strong>نقطه شروع:</strong><br/>انگشت خود را در سمت چپ صفحه قرار می‌دهید.<br/><strong>حرکت:</strong><br/>انگشت خود را به صورت افقی به سمت راست حرکت می‌دهید.<br/><strong>عملکرد:</strong><br/>مشابه سوایپ به چپ، اما در جهت مخالف:<br />-- اغلب به مورد قبلی در یک کاروسل یا گالری حرکت می‌کند.<br />- می‌تواند برای باز کردن منوهای کناری یا کشوهای ناوبری در برنامه‌ها استفاده شود.<br />- در صفحه اصلی، معمولاً به دسکتاپ مجازی قبلی تغییر می‌کند.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>بالا</strong><br /><strong>نقطه شروع:</strong><br/>انگشت خود را در قسمت پایین صفحه قرار می‌دهید.<br/><strong>حرکت:</strong><br/>انگشت خود را به سمت بالای صفحه حرکت می‌دهید.><br/><strong>عملکرد:</strong><br/>بسته به زمینه، اقدامات مختلفی می‌تواند رخ دهد:<br />- در صفحه اصلی یا در یک لیست، این معمولاً محتوا را به سمت پایین اسکرول می‌کند.<br />- در یک برنامه تمام صفحه، ممکن است گزینه‌های اضافی یا کشوی برنامه را باز کند.<br />- در برخی رابط‌ها، ممکن است عمل 'تازه‌سازی' را فعال کند یا نوار جستجو را باز کند.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مدت زمان سوایپ به میلی‌ثانیه. پیش‌فرض `1500` میلی‌ثانیه است. هرچه مقدار کمتر باشد، سوایپ سریع‌تر خواهد بود.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Element`</td>
      <td>عنصری که برای سوایپ در داخل آن استفاده می‌شود. اگر هیچ عنصری ارائه نشود، از انتخابگر زیر برای iOS `-ios predicate string:type == "XCUIElementTypeApplication"` و برای اندروید `//android.widget.ScrollView'` استفاده می‌کند. اگر عناصر بیشتری با انتخابگر پیش‌فرض مطابقت داشته باشند، به طور پیش‌فرض اولین عنصر مطابق را انتخاب می‌کند. <br /> <strong>فقط-اپلیکیشن-بومی-موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>درصد عنصر قابل اسکرول (پیش‌فرض) برای سوایپ. این مقداری بین 0 و 1 است. پیش‌فرض `0.95` است.<br /><strong>هرگز</strong> از دقیقاً بالا|پایین|چپ|راست صفحه سوایپ نکنید، ممکن است به عنوان مثال نوار اعلان یا سایر ویژگی‌های سیستم‌عامل/برنامه را فعال کنید که می‌تواند منجر به نتایج غیرمنتظره شود.<br />اگر `from` و `to` ارائه شوند، این تأثیری ندارد.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>مقادیر زیر <strong>فقط</strong> در صورتی تأثیر دارند که `scrollableElement` ارائه <strong>نشده</strong> باشد، در غیر این صورت نادیده گرفته می‌شوند.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`object`</td>
      <td>مختصات x و y شروع سوایپ. اگر `scrollableElement` ارائه شود، این مختصات تأثیری ندارند.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مختصات x نقطه شروع سوایپ.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مختصات y نقطه شروع سوایپ.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`object`</td>
      <td>مختصات x و y پایان سوایپ. اگر `scrollableElement` ارائه شود، این مختصات تأثیری ندارند.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مختصات x نقطه پایان سوایپ.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مختصات y نقطه پایان سوایپ.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```