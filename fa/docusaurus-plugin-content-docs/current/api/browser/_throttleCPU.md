---
id: throttleCPU
title: کند کردن پردازنده (CPU)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Throttles the CPU to emulate a slower processor.

:::info

توجه داشته باشید که استفاده از دستور `throttleCPU` نیازمند پشتیبانی از پروتکل Chrome DevTools است و برای مثال
نمی‌توان از آن هنگام اجرای تست‌های خودکار در فضای ابری استفاده کرد. پروتکل Chrome DevTools به صورت پیش‌فرض نصب نشده است،
از `npm install puppeteer-core` برای نصب آن استفاده کنید.
اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

##### استفاده

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>فاکتور کند کردن (۱ بدون کاهش سرعت، ۲ یعنی کاهش سرعت ۲ برابری، و غیره)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```