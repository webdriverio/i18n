---
id: console-logs
title: گزارش‌های کنسول
---

ثبت و بررسی تمام خروجی‌های کنسول مرورگر در طول اجرای آزمون. DevTools پیام‌های کنسول از برنامه شما (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) و همچنین گزارش‌های چارچوب WebDriverIO را بر اساس `logLevel` پیکربندی شده در `wdio.conf.ts` شما ثبت می‌کند.

**ویژگی‌ها:**
- ثبت پیام‌های کنسول بلادرنگ در طول اجرای آزمون
- گزارش‌های کنسول مرورگر (log، warn، error، info، debug)
- گزارش‌های چارچوب WebDriverIO فیلتر شده بر اساس `logLevel` پیکربندی شده (trace، debug، info، warn، error، silent)
- مهرهای زمانی که نشان می‌دهد هر پیام دقیقاً چه زمانی ثبت شده است
- نمایش گزارش‌های کنسول در کنار مراحل آزمون و تصاویر مرورگر برای ارائه زمینه

**پیکربندی:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

این کار اشکال‌زدایی خطاهای جاوااسکریپت، پیگیری رفتار برنامه و مشاهده عملیات داخلی WebDriverIO در حین اجرای آزمون را آسان می‌کند.

## نمایش

### >_ گزارش‌های کنسول
![Console Logs](./demo/console-logs.gif)