---
id: wdio-cleanuptotal-service
title: سرویس CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service) مراجعه کنید

با سرویس `cleanup-total` برای [webdriver.io](https://webdriver.io/)، شما می‌توانید به راحتی از پاکسازی مناسب پس از هر تست اطمینان حاصل کنید. این سرویس یک روش سیستماتیک برای علامت‌گذاری موجودیت‌ها برای حذف بلافاصله پس از ایجاد ارائه می‌دهد. این به‌ویژه زمانی مفید است که تست‌ها شامل ایجاد ساختارهای پیچیده، مانند یک حساب بانکی با طرح سرمایه‌گذاری و سپرده باشند. بدون پاکسازی مناسب، تلاش برای حذف حساب ممکن است منجر به خطاهایی شود، مانند رد شدن به دلیل خالی نبودن حساب. با این حال، با __cleanup-total__، موجودیت‌ها به ترتیب صحیح حذف می‌شوند، تضمین می‌کند که تست‌ها پس از خود پاکسازی می‌کنند و با یکدیگر تداخل ندارند.

## نصب
ساده‌ترین راه برای نصب این ماژول به عنوان یک وابستگی (توسعه)، استفاده از دستور زیر است:

```
npm install wdio-cleanuptotal-service --save-dev
```

## استفاده

افزودن wdio-cleanuptotal-service به `wdio.conf.ts` خود:

```typescript
export const config: WebdriverIO.Config = {
  // ... گزینه‌های دیگر

  services: ['cleanuptotal']

  // ... گزینه‌های دیگر
};
```

یا با گزینه‌های سرویس:

```typescript
export const config: WebdriverIO.Config = {
  // ... گزینه‌های دیگر

  services: [
    [
      'cleanuptotal',
      {
        // از یک تابع لاگر سفارشی برای نوشتن پیام‌ها در گزارش تست استفاده کنید
        customLoggerMethod: console.log(), // TODO: در صورت نیاز با تابع لاگر خود جایگزین کنید

        // فقط هنگام بروز خطا به لاگ بنویسید تا شلوغی کاهش یابد
        logErrorsOnly: false, // TODO: اگر پیام‌های زیادی در گزارش دارید، تغییر به 'true' را در نظر بگیرید
      }
    ]
  ]

  // ... گزینه‌های دیگر
};
```

## استفاده در تست

می‌توانید سرویس __cleanuptotal__ را هر جایی که به آن نیاز دارید وارد کنید، چه در فایل تست شما باشد و چه در هر کلاس دیگری.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // ایجاد یک حساب و افزودن آن به لیست پاکسازی برای حذف پس از تست
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // افزودن یک طرح سرمایه‌گذاری به حساب و افزودن آن به لیست پاکسازی
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // واریز وجه به حساب و افزودن آن به لیست پاکسازی
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// توجه داشته باشید که کد پاکسازی واقعی پس از اتمام تست اجرا خواهد شد
```

## پشتیبانی از تایپ‌اسکریپت

این افزونه از تایپ‌اسکریپت پشتیبانی می‌کند.

## پشتیبانی

برای پشتیبانی و پیشنهادات، لطفاً با من در [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com) تماس بگیرید.