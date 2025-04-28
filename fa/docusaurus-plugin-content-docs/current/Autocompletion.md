---
id: autocompletion
title: تکمیل خودکار
---

## IntelliJ

تکمیل خودکار به صورت پیش‌فرض در IDEA و WebStorm کار می‌کند.

اگر شما مدتی است که برنامه‌نویسی می‌کنید، احتمالاً تکمیل خودکار را دوست دارید. تکمیل خودکار به صورت پیش‌فرض در بسیاری از ویرایشگرهای کد در دسترس است.

![Autocompletion](/img/autocompletion/0.png)

تعاریف نوع بر اساس [JSDoc](http://usejsdoc.org/) برای مستندسازی کد استفاده می‌شود. این به شما کمک می‌کند جزئیات بیشتری درباره پارامترها و انواع آن‌ها ببینید.

![Autocompletion](/img/autocompletion/1.png)

از میانبر استاندارد <kbd>⇧ + ⌥ + SPACE</kbd> در پلتفرم IntelliJ برای دیدن مستندات موجود استفاده کنید:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code معمولاً پشتیبانی از نوع را به صورت خودکار یکپارچه دارد و نیازی به اقدام خاصی نیست.

![Autocompletion](/img/autocompletion/14.png)

اگر از جاوااسکریپت خالص استفاده می‌کنید و می‌خواهید پشتیبانی مناسب از نوع داشته باشید، باید یک `jsconfig.json` در ریشه پروژه خود ایجاد کنید و به بسته‌های wdio مورد استفاده اشاره کنید، به عنوان مثال:

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