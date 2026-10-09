---
id: base-appium-configuration
title: پیکربندی پایه Appium
description: "سرویس Appium و پکیج Flutter finder را نصب کنید و تنظیمات پایه Appium را برای تست اپلیکیشن‌های Flutter با WebdriverIO پیکربندی کنید."
---

WebdriverIO از Appium برای اجرای تست‌ها روی امولاتورها، شبیه‌سازها و دستگاه‌های واقعی موبایل استفاده می‌کند. `@wdio/appium-service` به‌طور خودکار چرخه حیات سرور Appium را در طول اجرای تست‌ها مدیریت می‌کند.

برای راه‌اندازی عمومی Appium و گزینه‌های capability، به [مستندات سرویس Appium](https://webdriver.io/docs/appium-service/) مراجعه کنید.

## نصب وابستگی‌ها

برای تست اپلیکیشن‌های Flutter، سرویس Appium و پکیج Flutter finder را نصب کنید:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### نصب Appium Flutter Driver

می‌توانید Appium Flutter Driver (`appium-flutter-driver`) را به یکی از دو روش زیر نصب کنید:

#### گزینه ۱: به‌عنوان وابستگی توسعه (توصیه‌شده برای CI/CD)

افزودن مستقیم درایور به `devDependencies` تضمین می‌کند که همه اعضای تیم و پایپ‌لاین‌های CI/CD بدون نیاز به مراحل راه‌اندازی اضافی، درایور را به‌طور خودکار نصب داشته باشند:

```bash
npm install --save-dev appium-flutter-driver
```

> همچنین می‌توانید همه پکیج‌های مورد نیاز را با یک دستور واحد نصب کنید:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### گزینه ۲: از طریق Appium CLI (راه‌اندازی محلی)

به‌عنوان جایگزین، می‌توانید درایور را با استفاده از Appium CLI به‌صورت محلی در محیط Appium خود نصب کنید:

```bash
npx appium driver install flutter
```

### مرور کلی پکیج‌ها

این پکیج‌ها موارد زیر را فراهم می‌کنند:
- **`@wdio/appium-service` و `appium`**: سرور Appium را در طول اجرای تست‌ها راه‌اندازی و مدیریت می‌کند.
- **`appium-flutter-driver`**: درایور Appium که مسئول ارتباط با افزونه تست Flutter است.
- **`appium-flutter-finder`**: کتابخانه کمکی که استراتژی‌های locator مخصوص Flutter (`byValueKey`، `byText`، `byTooltip`) را فراهم می‌کند.