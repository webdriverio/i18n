---
id: sauce-service
title: سرویس ساس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


سرویس WebdriverIO که ادغام بهتری با Sauce Labs ارائه می‌دهد. این سرویس می‌تواند برای موارد زیر استفاده شود:

- فضای ابری ماشین مجازی Sauce Labs (دسکتاپ وب/شبیه‌ساز)
- فضای ابری دستگاه واقعی Sauce Labs (iOS و Android)

این سرویس می‌تواند متادیتای کار را به‌روزرسانی کند ('name'*، 'passed'، 'tags'، 'public'، 'build'، 'custom-data') و در صورت نیاز Sauce Connect را اجرا می‌کند.

این سرویس چه کارهای دیگری برای شما انجام می‌دهد:

- به‌طور پیش‌فرض، سرویس Sauce هنگام شروع کار، 'name' کار را به‌روزرسانی می‌کند. این به شما امکان می‌دهد نام را در هر زمان به‌روزرسانی کنید.
- می‌توانید پارامتر `setJobName` را تعریف کنید و نام کار را مطابق با قابلیت‌ها، گزینه‌ها و عنوان مجموعه آزمون خود سفارشی کنید
- سرویس Sauce همچنین استک خطای یک آزمون ناموفق را به برگه دستورات Sauce Labs ارسال می‌کند
- به شما امکان می‌دهد به‌طور خودکار [Sauce Connect](https://docs.saucelabs.com/secure-connections/) را پیکربندی و اجرا کنید
- و نقاط زمینه را در لیست دستورات شما تنظیم می‌کند تا مشخص شود کدام دستورات در چه آزمونی اجرا شده‌اند

## نصب

ساده‌ترین راه این است که `@wdio/sauce-service` را به عنوان یک devDependency در `package.json` خود نگه دارید:

```sh
npm install @wdio/sauce-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) بیابید.

## پیکربندی

برای استفاده از سرویس برای ماشین مجازی دسکتاپ/شبیه‌ساز و فضای ابری دستگاه واقعی، باید `user` و `key` را در فایل `wdio.conf.js` خود تنظیم کنید. این به‌طور خودکار از Sauce Labs برای اجرای آزمون‌های یکپارچه‌سازی شما استفاده می‌کند. اگر آزمون‌های خود را روی Sauce Labs اجرا می‌کنید، می‌توانید منطقه‌ای را که می‌خواهید آزمون‌های خود را در آن اجرا کنید از طریق ویژگی `region` مشخص کنید. راه‌های میانبر موجود برای مناطق `us` (پیش‌فرض) و `eu` هستند. این مناطق برای فضای ابری VM ساس لبز و فضای ابری دستگاه واقعی ساس لبز استفاده می‌شوند. اگر منطقه را مشخص نکنید، به طور پیش‌فرض `us` خواهد بود.

اگر می‌خواهید WebdriverIO به‌طور خودکار یک تونل [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) راه‌اندازی کند، باید `sauceConnect: true` را تنظیم کنید. اگر می‌خواهید مرکز داده را به EU تغییر دهید، `region:'eu'` را اضافه کنید زیرا مرکز داده US به‌طور پیش‌فرض تنظیم شده است.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // یا 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

اگر می‌خواهید از یک تونل Sauce Connect موجود استفاده کنید، فقط نیاز به ارائه یک `tunnelName` دارید. اگر از یک تونل اشتراکی استفاده می‌کنید و شما کاربری نیستید که تونل را ایجاد کرده است، باید کاربر Sauce Labs که تونل را ایجاد کرده است مشخص کنید تا بتوانید از آن برای آزمون خود استفاده کنید. `tunnelOwner` را در قابلیت‌ها به این شکل اضافه کنید:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // گزینه‌های Sauce را می‌توان در اینجا یافت https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // گزینه‌های نمونه
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // گزینه‌های Sauce را می‌توان در اینجا یافت https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // گزینه‌های نمونه
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## گزینه‌های سرویس Sauce

برای تأیید سرویس Sauce Labs، پیکربندی شما باید حاوی گزینه [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key) باشد.

### maxErrorStackLength

این سرویس به‌طور خودکار استک خطا را هنگام شکست آزمون به Sauce Labs ارسال می‌کند. به‌طور پیش‌فرض، فقط ۵ خط اول را ارسال می‌کند، اما در صورت نیاز می‌توان آن را تغییر داد. توجه داشته باشید که خطوط بیشتر منجر به فراخوانی‌های WebDriver بیشتری می‌شود که ممکن است اجرا را کند کند.

نوع: `number`<br />
پیش‌فرض: `5`

### sauceConnect

اگر `true` باشد، Sauce Connect را اجرا می‌کند و یک اتصال امن بین ماشین مجازی Sauce Labs که آزمون‌های مرورگر شما را اجرا می‌کند، باز می‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### sauceConnectOpts

گزینه‌های Sauce Connect را اعمال کنید (مثلاً برای تغییر تنظیمات شماره پورت یا فایل گزارش). برای اطلاعات بیشتر [این لیست](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) را ببینید.

توجه: هنگام مشخص کردن گزینه‌ها، باید `--` حذف شود. همچنین می‌تواند به camelCase تبدیل شود (مثلاً `shared-tunnel` یا `sharedTunnel`).

نوع: `Object`<br />
پیش‌فرض: `{ }`

### uploadLogs

اگر `true` باشد، این گزینه تمام فایل‌های گزارش WebdriverIO را به پلتفرم Sauce Labs برای بررسی بیشتر آپلود می‌کند. مطمئن شوید که [`outputDir`](https://webdriver.io/docs/options#outputdir) را در پیکربندی wdio خود تنظیم کرده‌اید تا گزارش‌ها در فایل‌ها نوشته شوند، در غیر این صورت داده‌ها به stdout جریان می‌یابند و نمی‌توانند آپلود شوند.

نوع: `Boolean`<br />
پیش‌فرض: `true`

### setJobName

به کاربران اجازه می‌دهد نام کار را بر اساس پارامترهای کارگر مانند پیکربندی WebdriverIO، قابلیت‌های استفاده شده و عنوان اصلی مجموعه آزمون به‌صورت پویا تنظیم کنند.

نوع: `Function`<br />
پیش‌فرض: `(config, capabilities, suiteTitle) => suiteTitle`

----

## لغو متادیتای نام تولیدشده

سرویس به‌طور خودکار یک نام برای هر آزمون از نام مجموعه، نام مرورگر و سایر اطلاعات تولید می‌کند.

می‌توانید با ارائه یک مقدار برای قابلیت مورد نظر `name`، این را لغو کنید، اما این کار باعث می‌شود تمام آزمون‌ها نام یکسانی داشته باشند.

----

برای اطلاعات بیشتر در مورد WebdriverIO، [صفحه اصلی](https://webdriver.io) را ببینید.