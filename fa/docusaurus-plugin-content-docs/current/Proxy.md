---
id: proxy
title: راه‌اندازی پروکسی
---

شما می‌توانید دو نوع مختلف درخواست را از طریق یک پروکسی هدایت کنید:

- اتصال بین اسکریپت تست و درایور مرورگر (یا نقطه پایانی WebDriver)
- اتصال بین مرورگر و اینترنت

## پروکسی بین درایور و تست

اگر شرکت شما پروکسی سازمانی (مثلاً در `http://my.corp.proxy.com:9090`) برای تمام درخواست‌های خروجی دارد، مراحل زیر را برای نصب و پیکربندی [undici](https://github.com/nodejs/undici) دنبال کنید.

### نصب undici

```bash npm2yarn
npm install undici --save-dev
```

### افزودن undici setGlobalDispatcher به فایل پیکربندی خود

عبارت require زیر را به بالای فایل پیکربندی خود اضافه کنید.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

اطلاعات بیشتر درباره پیکربندی پروکسی را می‌توانید [اینجا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) پیدا کنید.

اگر از [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) استفاده می‌کنید، آن را به صورت زیر شروع کنید:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## پروکسی بین مرورگر و اینترنت

برای هدایت اتصال بین مرورگر و اینترنت، می‌توانید یک پروکسی راه‌اندازی کنید که می‌تواند برای مثال برای جمع‌آوری اطلاعات شبکه و سایر داده‌ها با ابزارهایی مانند [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) مفید باشد.

پارامترهای `proxy` را می‌توان از طریق قابلیت‌های استاندارد به شکل زیر اعمال کرد:

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

برای اطلاعات بیشتر، به [مشخصات WebDriver](https://w3c.github.io/webdriver/#proxy) مراجعه کنید.