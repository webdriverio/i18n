---
id: shared-store-service
title: سرویس اشتراک‌گذاری انباره
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> تبادل داده بین فرآیند اصلی و کارگرها (مشخصات).

## نصب

ساده‌ترین راه این است که `@wdio/shared-store-service` را به عنوان وابستگی توسعه در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/shared-store-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## استفاده

دریافت/تنظیم یک مقدار (یک شیء ساده) به/از انباره با کلید (رشته). کلید می‌تواند هر رشته دلخواهی باشد به جز `*` که رزرو شده است زیرا به شما اجازه می‌دهد کل انباره را دریافت کنید.

### تنظیم مقادیر

برای تنظیم مقادیر در انباره فراخوانی کنید:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### دریافت مقادیر

برای دریافت مقادیر از انباره فراخوانی کنید:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // returns "foobar123"
```

همچنین می‌توانید همه مقادیر کلید را با استفاده از کلید `*` دریافت کنید:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // returns `{ key: "foobar" }`
```

### دسترسی به انباره در هوک‌های WDIO

همچنین می‌توانید مستقیماً به هندلرهای ناهمگام `setValue` و `getValue` دسترسی داشته باشید.
مطمئن شوید که آنها را با کلیدواژه `await` به درستی فراخوانی می‌کنید.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

مهم! هر فایل مشخصات باید اتمی و مستقل از مشخصات دیگر باشد.
ایده سرویس، مقابله با مسائل خاص راه‌اندازی محیط است.
لطفاً از اشتراک‌گذاری داده‌های اجرای آزمون خودداری کنید!

### استخر منابع

اگر رشته‌های کارگر برای منابعی که باید برای هر کارگر تخصیص داده شوند رقابت می‌کنند، می‌توانید از API استخر منابع استفاده کنید:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

این مثال اطمینان می‌دهد که هر دو کارگر هرگز از یک `baseUrl` یکسان استفاده نمی‌کنند. یک آدرس یکتا فقط به یک کارگر اختصاص می‌یابد تا زمانی که توسط آن آزاد شود.

## پیکربندی

`shared-store` را به لیست سرویس‌ها اضافه کنید و شی `sharedStore` در [محدوده `browser`](https://webdriver.io/docs/api/browser) در آزمون شما قابل دسترسی خواهد بود.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

اگر از تایپ‌اسکریپت استفاده می‌کنید، مطمئن شوید که `@wdio/shared-store-service` را به `compilerOptions.types` خود اضافه کرده‌اید:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```