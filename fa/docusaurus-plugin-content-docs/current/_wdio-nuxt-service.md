---
id: wdio-nuxt-service
title: سرویس نوکست (Nuxt Service)
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---


> wdio-nuxt-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service) را ببینید

این سرویس به شما کمک می‌کند تا برنامه خود را هنگام استفاده از [Nuxt](https://nuxt.com/) به عنوان ابزار ساخت راه‌اندازی کنید. قبل از شروع تست، سرور Nuxt را با استفاده از `nuxt.conf.js` شما به طور خودکار راه‌اندازی می‌کند.

## نصب

اگر با WebdriverIO تازه شروع می‌کنید، می‌توانید از ویزارد پیکربندی استفاده کنید تا همه چیز را تنظیم کنید:

```sh
npm init wdio@latest .
```

این ابزار پروژه شما را به عنوان یک پروژه Nuxt شناسایی کرده و تمام پلاگین‌های لازم را برای شما نصب می‌کند. اگر این سرویس را به یک تنظیمات موجود اضافه می‌کنید، همیشه می‌توانید آن را از طریق دستور زیر نصب کنید:

```bash
npm install wdio-nuxt-service --save-dev
```

## پیکربندی

برای فعال‌سازی سرویس، آن را به لیست `services` در فایل `wdio.conf.js` خود اضافه کنید، به عنوان مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

می‌توانید گزینه‌های سرویس را با ارسال یک آرایه با یک آبجکت پیکربندی اعمال کنید، به عنوان مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## استفاده

اگر پیکربندی شما به درستی تنظیم شده باشد، سرویس گزینه [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) را تنظیم می‌کند تا به برنامه شما اشاره کند. می‌توانید با استفاده از دستور [`url`](https://webdriver.io/docs/api/browser/url) به آن مراجعه کنید، مثلاً:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## گزینه‌ها

### `rootDir`

دایرکتوری اصلی پروژه.

نوع: `string`<br />
پیش‌فرض: `process.cwd()`

### `dotenv`

فایل محیطی که قبل از شروع سرور باید بارگذاری شود.

نوع: `string`<br />
پیش‌فرض: `.env`

### `hostname`

نام میزبان برای شروع سرور.

نوع: `string`<br />
پیش‌فرض: `localhost`

### `port`

پورت برای شروع سرور.

نوع: `number`<br />
پیش‌فرض: `process.env.NUXT_PORT || config.devServer.port`

### `https`

اگر می‌خواهید سرور تست روی https راه‌اندازی شود، این گزینه را روی true تنظیم کنید (گواهینامه‌ها باید در پیکربندی Nuxt تنظیم شوند).

نوع: `boolean`<br />
پیش‌فرض: `false`

### `sslCert`

گواهینامه SSL که باید برای راه‌اندازی سرور روی https استفاده شود.

نوع: `string`

### `sslKey`

کلید SSL که باید برای راه‌اندازی سرور روی https استفاده شود.

نوع: `string`

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.