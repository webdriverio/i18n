---
id: autocompletion
title: تکمیل خودکار
---

## IntelliJ

تکمیل خودکار به صورت پیش‌فرض در IDEA و WebStorm کار می‌کند.

اگر مدتی است که کد برنامه‌نویسی می‌نویسید، احتمالاً تکمیل خودکار را دوست دارید. تکمیل خودکار در بسیاری از ویرایشگرهای کد به صورت پیش‌فرض در دسترس است.

![Autocompletion](/img/autocompletion/0.png)

تعاریف نوع بر اساس [JSDoc](http://usejsdoc.org/) برای مستندسازی کد استفاده می‌شود. این به شما کمک می‌کند تا جزئیات بیشتری در مورد پارامترها و انواع آنها ببینید.

![Autocompletion](/img/autocompletion/1.png)

از میانبرهای استاندارد <kbd>⇧ + ⌥ + SPACE</kbd> در پلتفرم IntelliJ برای دیدن مستندات موجود استفاده کنید:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code معمولاً پشتیبانی از نوع را به طور خودکار یکپارچه می‌کند و هیچ اقدامی لازم نیست.

![Autocompletion](/img/autocompletion/14.png)

اگر از JavaScript خالص استفاده می‌کنید و می‌خواهید پشتیبانی مناسب از نوع داشته باشید، باید یک `jsconfig.json` در ریشه پروژه خود ایجاد کنید و به بسته‌های wdio مورد استفاده ارجاع دهید، به عنوان مثال:

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