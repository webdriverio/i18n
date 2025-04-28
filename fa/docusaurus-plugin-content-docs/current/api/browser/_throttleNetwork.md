---
id: throttleNetwork
title: محدودسازی شبکه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

محدود کردن قابلیت‌های شبکه مرورگر. این می‌تواند به شبیه‌سازی سناریوهایی کمک کند که در آن کاربر اتصال اینترنت خود را از دست می‌دهد و برنامه شما باید به آن رسیدگی کند.

تنظیمات پیش‌فرض زیادی با پیکربندی‌های آماده برای سهولت استفاده وجود دارند.
آن‌ها عبارتند از `offline`، `GPRS`، `Regular2G`، `Good2G`، `Regular3G`، `Good3G`،
`Regular4G`، `DSL`، `WiFi`، `online`.

شما می‌توانید مقادیر این تنظیمات پیش‌فرض را [در کد منبع](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29) مشاهده کنید.

:::info

توجه داشته باشید که استفاده از دستور `throttleNetwork` نیازمند پشتیبانی از پروتکل Chrome DevTools است و مثلاً
نمی‌تواند هنگام اجرای تست‌های خودکار در فضای ابری استفاده شود. پروتکل Chrome DevTools به صورت پیش‌فرض نصب نمی‌شود،
از دستور `npm install puppeteer-core` برای نصب آن استفاده کنید.
اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

##### استفاده

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>پارامترهای محدودسازی</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>اگر true باشد، قطع اتصال اینترنت شبیه‌سازی می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>حداقل تأخیر از زمان ارسال درخواست تا دریافت هدرهای پاسخ (میلی‌ثانیه).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>حداکثر توان عملیاتی دانلود تجمعی (بایت/ثانیه). مقدار -1 محدودسازی دانلود را غیرفعال می‌کند.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>حداکثر توان عملیاتی آپلود تجمعی (بایت/ثانیه). مقدار -1 محدودسازی آپلود را غیرفعال می‌کند.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```