---
id: proxy
title: تنظیم پراکسی
description: "درخواست‌ها را از طریق یک پراکسی هدایت کنید، چه بین تست‌ها و درایور و چه بین مرورگر و اینترنت."
---

شما می‌توانید دو نوع مختلف درخواست را از طریق یک پراکسی تونل کنید:

- اتصال بین اسکریپت تست و درایور مرورگر (یا نقطه پایانی WebDriver)
- اتصال بین مرورگر و اینترنت

## پراکسی بین درایور و تست

اگر شرکت شما یک پراکسی سازمانی (مثلاً روی `http://my.corp.proxy.com:9090`) برای تمام درخواست‌های خروجی دارد، دو گزینه برای پیکربندی WebdriverIO جهت استفاده از پراکسی در اختیار دارید:

### گزینه ۱: استفاده از متغیرهای محیطی (توصیه‌شده)

از نسخه WebdriverIO v9.12.0 به بعد، می‌توانید به سادگی متغیرهای محیطی استاندارد پراکسی را تنظیم کنید:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# اختیاری: دور زدن پراکسی برای میزبان‌های خاص
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

سپس تست‌های خود را طبق معمول اجرا کنید. WebdriverIO به طور خودکار از این متغیرهای محیطی برای پیکربندی پراکسی استفاده خواهد کرد.

### گزینه ۲: استفاده از setGlobalDispatcher در undici

برای پیکربندی‌های پیشرفته‌تر پراکسی یا اگر به کنترل برنامه‌نویسی نیاز دارید، می‌توانید از متد `setGlobalDispatcher` در undici استفاده کنید:

#### نصب undici

```bash npm2yarn
npm install undici --save-dev
```

#### افزودن setGlobalDispatcher از undici به فایل پیکربندی

دستور require زیر را به ابتدای فایل پیکربندی خود اضافه کنید.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

اطلاعات بیشتر درباره پیکربندی پراکسی را می‌توانید [اینجا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) بیابید.

### از کدام روش باید استفاده کنم؟

- **از متغیرهای محیطی استفاده کنید** اگر رویکردی ساده و استاندارد می‌خواهید که در ابزارهای مختلف کار کند و نیازی به تغییر کد نداشته باشد.
- **از setGlobalDispatcher استفاده کنید** اگر به ویژگی‌های پیشرفته پراکسی مانند احراز هویت سفارشی، پیکربندی‌های متفاوت پراکسی برای هر محیط نیاز دارید، یا می‌خواهید رفتار پراکسی را به صورت برنامه‌نویسی کنترل کنید.

هر دو روش به طور کامل پشتیبانی می‌شوند و WebdriverIO ابتدا وجود یک dispatcher سراسری را بررسی می‌کند و در صورت عدم وجود، به سراغ متغیرهای محیطی می‌رود.

### Sauce Connect Proxy

اگر از [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) استفاده می‌کنید، آن را به این صورت اجرا کنید:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## پراکسی بین مرورگر و اینترنت

برای تونل کردن اتصال بین مرورگر و اینترنت، می‌توانید یک پراکسی راه‌اندازی کنید که می‌تواند (به عنوان مثال) برای ثبت اطلاعات شبکه و سایر داده‌ها با ابزارهایی مانند [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) مفید باشد.

پارامترهای `proxy` را می‌توان از طریق capabilities استاندارد به روش زیر اعمال کرد:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

برای اطلاعات بیشتر، [مشخصات WebDriver](https://w3c.github.io/webdriver/#proxy) را ببینید.