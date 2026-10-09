---
id: console-logs
title: لاگ‌های کنسول
description: "پیام‌های کنسول مرورگر و لاگ‌های فریم‌ورک WebdriverIO را که DevTools در حین اجرای تست ثبت می‌کند، دریافت و بررسی کنید."
---

تمام خروجی‌های کنسول مرورگر را در حین اجرای تست دریافت و بررسی کنید. DevTools پیام‌های کنسول برنامه شما (`console.log()`، `console.warn()`، `console.error()`، `console.info()`، `console.debug()`) و همچنین لاگ‌های فریم‌ورک WebDriverIO را بر اساس `logLevel` پیکربندی‌شده در فایل `wdio.conf.ts` ثبت می‌کند.

**ویژگی‌ها:**
- دریافت بلادرنگ پیام‌های کنسول در حین اجرای تست
- لاگ‌های کنسول مرورگر (log، warn، error، info، debug)
- لاگ‌های فریم‌ورک WebDriverIO که بر اساس `logLevel` پیکربندی‌شده فیلتر می‌شوند (trace، debug، info، warn، error، silent)
- مهر زمانی که دقیقاً نشان می‌دهد هر پیام چه زمانی ثبت شده است
- نمایش لاگ‌های کنسول در کنار مراحل تست و اسکرین‌شات‌های مرورگر برای درک بهتر زمینه

**پیکربندی:**
```js
// wdio.conf.ts
export const config = {
    // سطح جزئیات لاگ‌ها: trace | debug | info | warn | error | silent
    logLevel: 'info', // تعیین می‌کند کدام لاگ‌های فریم‌ورک دریافت شوند
    // ...
};
```

این قابلیت، اشکال‌زدایی خطاهای JavaScript، ردیابی رفتار برنامه و مشاهده عملیات داخلی WebDriverIO در حین اجرای تست را آسان می‌کند.

## نمایش

### >_ لاگ‌های کنسول
![Console Logs](/img/devtools/console-logs.gif)