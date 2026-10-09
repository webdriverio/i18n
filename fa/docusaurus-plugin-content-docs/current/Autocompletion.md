---
id: autocompletion
title: تکمیل خودکار
description: "تکمیل خودکار و مستندات درون‌خطی API را برای دستورات WebdriverIO در IntelliJ، WebStorm و Visual Studio Code دریافت کنید."
---

## IntelliJ

تکمیل خودکار به‌صورت پیش‌فرض در IDEA و WebStorm کار می‌کند.

اگر مدتی است که کد برنامه می‌نویسید، احتمالاً تکمیل خودکار را دوست دارید. تکمیل خودکار به‌صورت پیش‌فرض در بسیاری از ویرایشگرهای کد در دسترس است.

![Autocompletion](/img/autocompletion/0.png)

تعاریف نوع مبتنی بر [JSDoc](http://usejsdoc.org/) برای مستندسازی کد استفاده می‌شوند. این کار به دیدن جزئیات بیشتر درباره پارامترها و انواع آن‌ها کمک می‌کند.

![Autocompletion](/img/autocompletion/1.png)

برای مشاهده مستندات موجود، از میانبرهای استاندارد <kbd>⇧ + ⌥ + SPACE</kbd> در پلتفرم IntelliJ استفاده کنید:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code معمولاً پشتیبانی از نوع‌ها را به‌طور خودکار یکپارچه کرده است و نیازی به انجام کاری نیست.

![Autocompletion](/img/autocompletion/14.png)

اگر از JavaScript خالص (vanilla) استفاده می‌کنید و می‌خواهید پشتیبانی مناسبی از نوع‌ها داشته باشید، باید یک فایل `jsconfig.json` در ریشه پروژه خود ایجاد کنید و به پکیج‌های wdio مورد استفاده ارجاع دهید، برای مثال:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```