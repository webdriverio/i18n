---
id: wdio-light-reporter
title: گزارشگر لایت
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter) مراجعه کنید

## الهام گرفته از گزارشگرهای HTML و Mochawesome

!فلسفه:

> این گزارشگر از بازسازی گزارش خیار (cucumber) پشتیبانی نمی‌کند و با در نظر گرفتن چارچوب‌های bdd و mocha توسعه یافته است.
> در اینجا، بخش `describe()` به عنوان سناریوی آزمون و `it()` به عنوان مورد آزمون در داخل سناریوهای آزمون در نظر گرفته می‌شود.

## ویژگی‌ها

1. راه‌اندازی آسان
2. رابط کاربری پیشرفته
3. تصاویر در گزارش HTML جاسازی شده
4. addLabel() برای گنجاندن مراحل متن یا نام


## نسخه‌ها
V 0.1.9 - نسخه اولیه
V 0.2.6 - (آخرین)
  1. شامل اجراهای محیط‌های متعدد و تفکیک بر اساس محیط.
  2. رفع اشکالات
  3. بهبود عملکرد.


## نمونه‌ها

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## نصب

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## پیکربندی

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## تصاویر

گزارشگر قابلیت پیکربندی خودکار برای گرفتن تصاویر را ندارد اما اگر به صورت دستی پیکربندی شود، به رویداد گوش می‌دهد و تصاویر را در گزارش HTML پیوست می‌کند.
**برای گنجاندن تصاویر در گزارش، کد زیر را در قلاب afterTest() در فایل wdio conf اضافه کنید.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## فایل‌های نتایج

هر اجرا گزارش JSON را برای هر فایل مشخصات بازسازی می‌کند، برای ایجاد گزارش ترکیبی JSON و HTML، کد زیر را در قلاب **onComplete()** در فایل wdio conf اضافه کنید

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> اگر آزمون خود را بدون هیچ گزینه --suite اجرا کنید، آن را به عنوان مجموعه پیش‌فرض در نظر می‌گیرد
> گزارشگر اگر هنگام اجرا چندین پارامتر به عنوان مجموعه استفاده کنید، کار نمی‌کند.
> wdio run `wdio.conf.js --suite firstSuite` - **(به خوبی کار می‌کند)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(کار نمی‌کند)** :(

## افزودن متن

> می‌توانید از `useLabel()` برای افزودن متن به هر مرحله یا افزودن آن به عنوان مراحل استفاده کنید.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## به‌روزرسانی‌ها
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## مجوز

MIT
**رایگان، بله!**