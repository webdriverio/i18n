---
id: proxy
title: راه‌اندازی پروکسی
description: "درخواست‌ها را از طریق یک پروکسی هدایت کنید، چه بین تست‌ها و درایور و چه بین مرورگر و اینترنت."
---

شما می‌توانید دو نوع مختلف از درخواست‌ها را از طریق یک پروکسی تونل کنید:

- اتصال بین اسکریپت تست شما و درایور مرورگر (یا اندپوینت WebDriver)
- اتصال بین مرورگر و اینترنت

## پروکسی بین درایور و تست

اگر شرکت شما یک پروکسی سازمانی (مثلاً روی `http://my.corp.proxy.com:9090`) برای تمام درخواست‌های خروجی دارد، دو گزینه برای پیکربندی WebdriverIO جهت استفاده از پروکسی در اختیار دارید:

### گزینه ۱: استفاده از متغیرهای محیطی (توصیه‌شده)

از نسخه WebdriverIO v9.12.0 به بعد، می‌توانید به‌سادگی متغیرهای محیطی استاندارد پروکسی را تنظیم کنید:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# اختیاری: دور زدن پروکسی برای برخی میزبان‌ها
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

سپس تست‌های خود را طبق معمول اجرا کنید. WebdriverIO به‌طور خودکار از این متغیرهای محیطی برای پیکربندی پروکسی استفاده خواهد کرد.

### گزینه ۲: استفاده از setGlobalDispatcher در undici

برای پیکربندی‌های پیشرفته‌تر پروکسی یا اگر به کنترل برنامه‌نویسی نیاز دارید، می‌توانید از متد `setGlobalDispatcher` در undici استفاده کنید:

#### نصب undici

```bash npm2yarn
npm install undici --save-dev
```

#### افزودن setGlobalDispatcher از undici به فایل پیکربندی

دستور require زیر را به بالای فایل پیکربندی خود اضافه کنید.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

اطلاعات بیشتر درباره پیکربندی پروکسی را می‌توانید [اینجا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) پیدا کنید.

### از کدام روش باید استفاده کنم؟

- **از متغیرهای محیطی استفاده کنید** اگر رویکردی ساده و استاندارد می‌خواهید که در ابزارهای مختلف کار کند و نیازی به تغییر کد نداشته باشد.
- **از setGlobalDispatcher استفاده کنید** اگر به قابلیت‌های پیشرفته پروکسی مانند احراز هویت سفارشی، پیکربندی‌های متفاوت پروکسی برای هر محیط نیاز دارید، یا می‌خواهید رفتار پروکسی را به‌صورت برنامه‌نویسی کنترل کنید.

هر دو روش به‌طور کامل پشتیبانی می‌شوند و WebdriverIO ابتدا وجود یک dispatcher سراسری را بررسی می‌کند و در صورت نبود آن، به متغیرهای محیطی رجوع می‌کند.

### Sauce Connect Proxy

اگر از [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) استفاده می‌کنید، آن را به این صورت اجرا کنید:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## پروکسی برای دانلود مرورگر و درایور

WebdriverIO مرورگر و درایور مورد نیاز خود را در صورتی که هنوز نصب نشده باشند، دانلود می‌کند.

- دانلودهای **Geckodriver و Edgedriver** از `HTTPS_PROXY`، `HTTP_PROXY` و `NO_PROXY` استفاده می‌کنند. یک dispatcher که با `setGlobalDispatcher` تنظیم شده باشد، بر این متغیرها اولویت دارد.
- دانلودهای **Chrome، Chromium، Firefox و Chromedriver** تنها زمانی از `HTTPS_PROXY`، `HTTP_PROXY` و `NO_PROXY` استفاده می‌کنند که یکی از موارد زیر برقرار باشد:
  - پکیج `proxy-agent` در پروژه شما نصب شده باشد:

    ```bash
    npm install --save-dev proxy-agent
    ```

  - Node.js با پشتیبانی داخلی پروکسی خود اجرا شود:

    ```bash
    NODE_USE_ENV_PROXY=1 npx wdio run ./wdio.conf.ts
    ```

  WebdriverIO پکیج `proxy-agent` را برای شما نصب نمی‌کند، زیرا درخت وابستگی‌های آن دارای هشدارهای امنیتی بدون راه‌حل است. زمانی که یک متغیر پروکسی تنظیم شده باشد و هیچ‌یک از این دو گزینه فعال نباشد، WebdriverIO پیش از اولین دانلود یک هشدار ثبت می‌کند.

## پروکسی بین مرورگر و اینترنت

برای تونل کردن اتصال بین مرورگر و اینترنت، می‌توانید یک پروکسی راه‌اندازی کنید که (برای مثال) می‌تواند برای ثبت اطلاعات شبکه و سایر داده‌ها با ابزارهایی مانند [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) مفید باشد.

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