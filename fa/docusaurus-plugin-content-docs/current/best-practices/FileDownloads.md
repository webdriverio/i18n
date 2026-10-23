---
id: file-download
title: دانلود فایل
description: "پیکربندی پوشه‌های دانلود برای Chrome، Firefox و Edge، انتظار برای اتمام دانلودها و بررسی فایل‌های دانلودشده در مرورگرهای مختلف."
---

هنگام خودکارسازی دانلود فایل‌ها در تست وب، مدیریت یکسان آن‌ها در مرورگرهای مختلف برای اطمینان از اجرای قابل‌اعتماد تست‌ها ضروری است.

در اینجا، بهترین روش‌ها برای دانلود فایل‌ها را ارائه می‌دهیم و نحوه پیکربندی پوشه‌های دانلود را برای **Google Chrome**، **Mozilla Firefox** و **Microsoft Edge** نشان می‌دهیم.

## مسیرهای دانلود

**هاردکد کردن** مسیرهای دانلود در اسکریپت‌های تست می‌تواند منجر به مشکلات نگهداری و قابلیت انتقال شود. از **مسیرهای نسبی** برای پوشه‌های دانلود استفاده کنید تا قابلیت انتقال و سازگاری در محیط‌های مختلف تضمین شود.

```javascript
// 👎
// مسیر دانلود هاردکد شده
const downloadPath = '/path/to/downloads';

// 👍
// مسیر دانلود نسبی
const downloadPath = path.join(__dirname, 'downloads');
```

## استراتژی‌های انتظار

عدم پیاده‌سازی استراتژی‌های انتظار مناسب می‌تواند منجر به شرایط رقابتی (race condition) یا تست‌های غیرقابل‌اعتماد شود، به‌ویژه برای اتمام دانلود. استراتژی‌های انتظار **صریح** را برای انتظار تا اتمام دانلود فایل‌ها پیاده‌سازی کنید تا هماهنگی بین مراحل تست تضمین شود.

```javascript
// 👎
// بدون انتظار صریح برای اتمام دانلود
await browser.pause(5000);

// 👍
// انتظار برای اتمام دانلود فایل
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## پیکربندی پوشه‌های دانلود

برای تغییر رفتار دانلود فایل در **Google Chrome**، **Mozilla Firefox** و **Microsoft Edge**، پوشه دانلود را در capabilities مربوط به WebDriverIO مشخص کنید:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

برای مشاهده یک نمونه پیاده‌سازی، به [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior) مراجعه کنید.

## پیکربندی دانلودها در مرورگرهای Chromium

برای تغییر مسیر دانلود در مرورگرهای __مبتنی بر Chromium__ (مانند Chrome، Edge، Brave و غیره) می‌توانید از متد `getPuppeteer` در WebDriverIO برای دسترسی به Chrome DevTools استفاده کنید.

```javascript
const page = await browser.getPuppeteer();
// شروع یک نشست CDP:
const cdpSession = await page.target().createCDPSession();
// تنظیم مسیر دانلود:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## مدیریت دانلود چندین فایل

هنگام کار با سناریوهایی که شامل دانلود چندین فایل هستند، پیاده‌سازی استراتژی‌هایی برای مدیریت و اعتبارسنجی مؤثر هر دانلود ضروری است. رویکردهای زیر را در نظر بگیرید:

__مدیریت دانلود ترتیبی:__ فایل‌ها را یکی‌یکی دانلود کنید و هر دانلود را پیش از شروع دانلود بعدی بررسی کنید تا اجرای منظم و اعتبارسنجی دقیق تضمین شود.

__مدیریت دانلود موازی:__ از تکنیک‌های برنامه‌نویسی ناهمگام برای شروع هم‌زمان دانلود چندین فایل استفاده کنید تا زمان اجرای تست بهینه شود. سازوکارهای اعتبارسنجی مستحکمی را برای بررسی همه دانلودها پس از اتمام آن‌ها پیاده‌سازی کنید.

## ملاحظات سازگاری بین مرورگرها

اگرچه WebDriverIO یک رابط یکپارچه برای خودکارسازی مرورگر فراهم می‌کند، در نظر گرفتن تفاوت‌ها در رفتار و قابلیت‌های مرورگرها ضروری است. تست قابلیت دانلود فایل را در مرورگرهای مختلف در نظر بگیرید تا سازگاری و یکنواختی تضمین شود.

__پیکربندی‌های مخصوص هر مرورگر:__ تنظیمات مسیر دانلود و استراتژی‌های انتظار را طوری تنظیم کنید که تفاوت‌های رفتار و ترجیحات مرورگرها در Chrome، Firefox، Edge و سایر مرورگرهای پشتیبانی‌شده را پوشش دهد.

__سازگاری نسخه مرورگر:__ نسخه‌های WebDriverIO و مرورگرهای خود را به‌طور منظم به‌روزرسانی کنید تا از جدیدترین ویژگی‌ها و بهبودها بهره‌مند شوید و در عین حال سازگاری با مجموعه تست‌های موجود خود را حفظ کنید.