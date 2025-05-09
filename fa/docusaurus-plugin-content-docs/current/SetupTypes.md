---
id: setuptypes
title: انواع راه‌اندازی
---

WebdriverIO را می‌توان برای اهداف مختلفی استفاده کرد. این ابزار API پروتکل WebDriver را پیاده‌سازی می‌کند و می‌تواند مرورگر را به صورت خودکار اجرا کند. این فریم‌ورک طراحی شده است تا در هر محیط دلخواه و برای هر نوع کاری کار کند. این ابزار مستقل از هرگونه فریم‌ورک شخص ثالث است و فقط به Node.js برای اجرا نیاز دارد.

## اتصالات پروتکل

برای تعاملات اساسی با WebDriver و سایر پروتکل‌های خودکارسازی، WebdriverIO از اتصالات پروتکل خود بر اساس بسته NPM [`webdriver`](https://www.npmjs.com/package/webdriver) استفاده می‌کند:

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

تمام [دستورات پروتکل](api/webdriver) پاسخ خام را از درایور خودکارسازی برمی‌گردانند. این بسته بسیار سبک است و هیچ منطق هوشمندی مانند انتظار خودکار برای ساده‌سازی تعامل با استفاده از پروتکل وجود __ندارد__.

دستورات پروتکل اعمال شده به نمونه، به پاسخ جلسه اولیه درایور بستگی دارد. به عنوان مثال، اگر پاسخ نشان دهد که یک جلسه موبایل آغاز شده است، بسته تمام دستورات پروتکل Appium و Mobile JSON Wire را به نمونه اولیه اعمال می‌کند.

شما می‌توانید همان مجموعه دستورات (به جز موارد موبایل) را با استفاده از پروتکل Chrome DevTools هنگام وارد کردن بسته NPM [`devtools`](https://www.npmjs.com/package/devtools) اجرا کنید. این بسته همان رابط را با بسته `webdriver` دارد اما اتوماسیون خود را بر اساس [Puppeteer](https://pptr.dev/) اجرا می‌کند.

برای اطلاعات بیشتر در مورد رابط‌های این بسته، به [Modules API](/docs/api/modules) مراجعه کنید.

## حالت مستقل

برای ساده‌سازی تعامل با پروتکل WebDriver، بسته `webdriverio` مجموعه‌ای از دستورات را در بالای پروتکل (مانند دستور [`dragAndDrop`](api/element/dragAndDrop)) و مفاهیم اصلی مانند [انتخاب‌کننده‌های هوشمند](selectors) یا [انتظار خودکار](autowait) پیاده‌سازی می‌کند. مثال فوق را می‌توان به این صورت ساده‌سازی کرد:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

استفاده از WebdriverIO در حالت مستقل همچنان به شما دسترسی به تمام دستورات پروتکل را می‌دهد اما مجموعه‌ای از دستورات اضافی را فراهم می‌کند که تعامل سطح بالاتری با مرورگر ایجاد می‌کند. این به شما امکان می‌دهد این ابزار خودکارسازی را در پروژه (تست) خود ادغام کنید تا یک کتابخانه خودکارسازی جدید ایجاد کنید. نمونه‌های محبوب شامل [Oxygen](https://github.com/oxygenhq/oxygen) یا [CodeceptJS](http://codecept.io) می‌شوند. همچنین می‌توانید اسکریپت‌های ساده Node را برای جمع‌آوری محتوا از وب بنویسید (یا هر چیز دیگری که به یک مرورگر در حال اجرا نیاز دارد).

اگر گزینه‌های خاصی تنظیم نشده باشند، WebdriverIO همیشه تلاش می‌کند درایور مرورگری را که با ویژگی `browserName` در قابلیت‌های شما مطابقت دارد، دانلود و راه‌اندازی کند. در مورد Chrome و Firefox ممکن است آنها را نیز نصب کند، بسته به اینکه بتواند مرورگر مربوطه را در دستگاه پیدا کند یا خیر.

برای اطلاعات بیشتر در مورد رابط‌های بسته `webdriverio`، به [Modules API](/docs/api/modules) مراجعه کنید.

## اجراکننده تست WDIO

با این حال، هدف اصلی WebdriverIO، تست انتها به انتها در مقیاس بزرگ است. بنابراین، ما یک اجراکننده تست را پیاده‌سازی کردیم که به شما کمک می‌کند تا یک مجموعه تست قابل اعتماد ایجاد کنید که خواندن و نگهداری آن آسان باشد.

اجراکننده تست بسیاری از مشکلاتی را که هنگام کار با کتابخانه‌های خودکارسازی ساده رایج هستند، مدیریت می‌کند. برای یک مورد، آن اجراهای تست شما را سازماندهی می‌کند و مشخصات تست را تقسیم می‌کند تا تست‌های شما با حداکثر همزمانی اجرا شوند. همچنین مدیریت جلسه را انجام می‌دهد و ویژگی‌های زیادی را برای کمک به شما در اشکال‌زدایی مشکلات و یافتن خطاها در تست‌های خود فراهم می‌کند.

در اینجا همان مثال از بالا، به عنوان یک مشخصه تست نوشته شده و توسط WDIO اجرا می‌شود:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

اجراکننده تست، انتزاعی از فریم‌ورک‌های تست محبوب مانند Mocha، Jasmine، یا Cucumber است. برای اجرای تست‌های خود با استفاده از اجراکننده تست WDIO، بخش [شروع به کار](gettingstarted) را برای اطلاعات بیشتر بررسی کنید.

برای اطلاعات بیشتر در مورد رابط بسته اجراکننده تست `@wdio/cli`، به [Modules API](/docs/api/modules) مراجعه کنید.