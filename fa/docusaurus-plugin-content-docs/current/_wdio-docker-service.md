---
id: wdio-docker-service
title: سرویس Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service یک بسته شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service) مراجعه کنید

این سرویس برای استفاده با [WebdriverIO](http://webdriver.io/) در نظر گرفته شده است و به اجرای تست‌های عملکردی/یکپارچگی 
با استفاده از برنامه‌های کانتینری کمک می‌کند. این سرویس از [Docker](https://www.docker.com/) محبوب (که جداگانه نصب می‌شود) برای اجرای کانتینرها استفاده می‌کند.

## چرا از آن استفاده کنیم؟
در حالت ایده‌آل، تست‌های شما در انواع مختلفی از خط لوله CI/CD اجرا می‌شوند که اغلب در آنها مرورگرهای "واقعی" و سایر منابعی که
برنامه شما به آنها وابسته است وجود ندارد. با ظهور Docker، تقریباً تمام وابستگی‌های لازم برنامه می‌توانند در کانتینر قرار گیرند.
با این سرویس می‌توانید کانتینر برنامه خود یا [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) را در CI و در انزوای کامل 
اجرا کنید (با فرض اینکه CI می‌تواند Docker را به عنوان یک وابستگی نصب کند). همین امر می‌تواند برای توسعه محلی نیز صدق کند اگر برنامه شما نیاز به سطحی
از انزوا از سیستم عامل اصلی شما داشته باشد.

## چگونه کار می‌کند
سرویس یک تصویر docker موجود را اجرا می‌کند و هنگامی که آماده شد، تست‌های WebdriverIO را شروع می‌کند که باید در برابر برنامه کانتینری شما اجرا شوند.

## نصب

اجرا کنید:

```bash
npm install wdio-docker-service --save-dev
```

دستورالعمل‌های نحوه نصب WebdriverIO را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی
به طور پیش‌فرض، Google Chrome، Firefox و PhantomJS زمانی که روی سیستم میزبان نصب شده باشند در دسترس هستند.
برای استفاده از سرویس، باید `docker` را به آرایه سرویس خود اضافه کنید:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## گزینه‌ها

### dockerOptions
گزینه‌های مختلف مورد نیاز برای اجرای کانتینر docker

نوع: `Object`

پیش‌فرض: `{ 
    options: {
        rm: true
    }
}`

مثال:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
برچسب نام کانتینر Docker. می‌تواند محلی یا از Docker HUB باشد.

نوع: `String`

الزامی: `true`

### dockerOptions.healthCheck
پیکربندی که آمادگی کانتینرهای شما را قبل از شروع تست‌ها بررسی می‌کند. معمولاً این یک آدرس localhost خواهد بود.
اگر healthCheck پیکربندی نشده باشد، Webdriver بلافاصله پس از شروع کانتینر Docker، اجرای تست‌ها را شروع می‌کند، که
ممکن است با توجه به اینکه راه‌اندازی سرویس وب در داخل کانتینر Docker زمان می‌برد، خیلی زود باشد.

نوع: `String|Object`

گزینه‌ها برای استفاده از Object:
- *url* - آدرس برنامه‌ای که در داخل کانتینر شما اجرا می‌شود
- *maxRetries* - تعداد تلاش‌های مجدد تا زمانی که healthcheck با شکست مواجه شود. پیش‌فرض: 10
- *inspectInterval* - فاصله بین هر تلاش مجدد به میلی‌ثانیه. پیش‌فرض: 500
- *startDelay* - تأخیر اولیه برای شروع healthcheck به میلی‌ثانیه. پیش‌فرض: 0

مثال 1 (String): `healthCheck: 'http://localhost:4444'`

مثال 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
نقشه گزینه‌های استفاده شده توسط دستور `docker run`. برای جزئیات بیشتر در مورد دستور `run` [اینجا](https://docs.docker.com/edge/engine/reference/commandline/run/) کلیک کنید.

هر گزینه تک‌حرفی به `-[option]` تبدیل می‌شود (مثلاً `d: true` -> `-d`). 

هر گزینه با دو کاراکتر یا بیشتر به
`--[option]` تبدیل می‌شود (مثلاً `rm: true` -> `--rm`). 

برای گزینه‌هایی که ممکن است بیش از یک بار استفاده شوند
(مانند `-e`، `-add-host`، `--expose` و غیره)، لطفاً از نشانه‌گذاری آرایه استفاده کنید (مثلاً `e: ["NODE_ENV=development", "FOO=bar"]`).

نوع: `Object`

مثال:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
هر آرگومانی که ممکن است بخواهید به کانتینر منتقل کنید. مطابق با `[ARG...]` در Docker run CLI است.

نوع: `String`

### dockerOptions.command
هر دستوری که ممکن است بخواهید به کانتینر منتقل کنید. مطابق با `[COMMAND]` در Docker run CLI است.

نوع: `String`

### onDockerReady
یک متد بازگشتی که وقتی برنامه Docker آماده باشد فراخوانی می‌شود. آمادگی با توانایی پینگ کردن آدرس `healthCheck` تعیین می‌شود.

نوع: `Function`

### dockerLogs
مسیری که لاگ‌های کانتینر docker باید در آن ذخیره شوند

نوع: `String`

## موارد استفاده از تست / دستورالعمل‌ها
لطفاً برای جزئیات بیشتر به [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) ما مراجعه کنید.