---
id: scrollIntoView
title: اسکرول به دیدِ عنصر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

اسکرول کردن عنصر به داخل صفحه نمایش برای وب دسکتاپ/موبایل <strong>و</strong> اپلیکیشن‌های بومی موبایل.

:::info

اسکرول کردن برای اپلیکیشن‌های بومی موبایل بر اساس دستور موبایلی `swipe` انجام می‌شود.

این دستور فقط با اجزای به‌روز شده زیر کار می‌کند:
 - سرور Appium (نسخه 2.0.0 یا بالاتر)
 - `appium-uiautomator2-driver` (برای اندروید)
 - `appium-xcuitest-driver` (برای iOS)

مطمئن شوید که محیط Appium محلی یا مبتنی بر ابر شما به طور منظم به‌روزرسانی می‌شود تا از مشکلات سازگاری جلوگیری شود.

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
      <td>گزینه‌های `Element.scrollIntoView()`. پیش‌فرض برای دسکتاپ/وب موبایل: <br/> `{ block: 'start', inline: 'nearest' }` <br /> پیش‌فرض برای اپلیکیشن بومی موبایل <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>فقط دسکتاپ/وب موبایل</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>به [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) مراجعه کنید. <br /><strong>فقط برای وب</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>به [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) مراجعه کنید. <br /><strong>فقط برای وب</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>به [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) مراجعه کنید. <br /><strong>فقط برای وب</strong> (دسکتاپ/موبایل)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>فقط اپلیکیشن بومی موبایل</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>می‌تواند یکی از مقادیر `down`، `up`، `left` یا `right` باشد، پیش‌فرض `up` است. <br /><strong>فقط برای اپلیکیشن بومی موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>حداکثر تعداد اسکرول‌ها تا زمانی که جستجوی عنصر متوقف شود، پیش‌فرض `10` است. <br /><strong>فقط برای اپلیکیشن بومی موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مدت زمان سوایپ به میلی‌ثانیه. پیش‌فرض `1500` میلی‌ثانیه است. هرچه مقدار کمتر باشد، سوایپ سریع‌تر انجام می‌شود.<br /><strong>فقط برای اپلیکیشن بومی موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Element`</td>
      <td>عنصری که برای اسکرول در آن استفاده می‌شود. اگر هیچ عنصری ارائه نشود، از انتخابگر زیر برای iOS استفاده می‌کند `-ios predicate string:type == "XCUIElementTypeApplication"` و انتخابگر زیر برای اندروید `//android.widget.ScrollView'`. اگر عناصر بیشتری با انتخابگر پیش‌فرض مطابقت داشته باشند، به طور پیش‌فرض اولین عنصر مطابق انتخاب می‌شود. <br /> <strong>فقط برای اپلیکیشن بومی موبایل</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>درصد عنصر قابل اسکرول (پیش‌فرض) برای سوایپ. این مقداری بین 0 و 1 است. پیش‌فرض `0.95` است.<br /><strong>هرگز</strong> از نقطه دقیق بالا|پایین|چپ|راست صفحه سوایپ نکنید، ممکن است نوار اعلان یا سایر ویژگی‌های سیستم‌عامل/اپلیکیشن را فعال کنید که می‌تواند منجر به نتایج غیرمنتظره شود.<br /> <strong>فقط برای اپلیکیشن بومی موبایل</strong></td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```