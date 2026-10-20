---
id: proxy
title: تنظیمات پروکسی
description: "درخواست‌ها را از طریق یک پروکسی مسیریابی کنید، چه بین تست‌ها و درایور و چه بین مرورگر و اینترنت."
---

شما می‌توانید دو نوع مختلف درخواست را از طریق یک پروکسی تونل کنید:

- اتصال بین اسکریپت تست شما و درایور مرورگر (یا اندپوینت WebDriver)
- اتصال بین مرورگر و اینترنت

## پروکسی بین درایور و تست

اگر شرکت شما یک پروکسی سازمانی (مثلاً روی `http://my.corp.proxy.com:9090`) برای تمام درخواست‌های خروجی دارد، دو گزینه برای پیکربندی WebdriverIO جهت استفاده از پروکسی دارید:

### گزینه ۱: استفاده از متغیرهای محیطی (توصیه شده)

از نسخه v9.12.0 در WebdriverIO به بعد، می‌توانید به سادگی متغیرهای محیطی استاندارد پروکسی را تنظیم کنید:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

سپس تست‌های خود را طبق معمول اجرا کنید. WebdriverIO به طور خودکار از این متغیرهای محیطی برای پیکربندی پروکسی استفاده خواهد کرد.

### گزینه ۲: استفاده از setGlobalDispatcher در undici

برای پیکربندی‌های پیشرفته‌تر پروکسی یا اگر به کنترل برنامه‌نویسی نیاز دارید، می‌توانید از متد `setGlobalDispatcher` در undici استفاده کنید:

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

اطلاعات بیشتر درباره پیکربندی پروکسی را می‌توانید [اینجا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) بیابید.

### از کدام روش استفاده کنم؟

- **از متغیرهای محیطی استفاده کنید** اگر رویکردی ساده و استاندارد می‌خواهید که در ابزارهای مختلف کار کند و نیازی به تغییر کد نداشته باشد.
- **از setGlobalDispatcher استفاده کنید** اگر به ویژگی‌های پیشرفته پروکسی مانند احراز هویت سفارشی، پیکربندی‌های متفاوت پروکسی برای هر محیط نیاز دارید، یا می‌خواهید رفتار پروکسی را به صورت برنامه‌نویسی کنترل کنید.

هر دو روش به طور کامل پشتیبانی می‌شوند و WebdriverIO ابتدا وجود یک dispatcher سراسری را بررسی می‌کند و سپس به سراغ متغیرهای محیطی می‌رود.

### Sauce Connect Proxy

اگر از [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) استفاده می‌کنید، آن را به این صورت اجرا کنید:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## پروکسی برای دانلود مرورگر و درایور

WebdriverIO مرورگر و درایور مورد نیاز خود را در صورتی که هنوز نصب نشده باشند دانلود می‌کند.

- دانلودهای **Geckodriver و Edgedriver** از `HTTPS_PROXY`، `HTTP_PROXY` و `NO_PROXY` استفاده می‌کنند. یک dispatcher که با `setGlobalDispatcher` تنظیم شده باشد بر این متغیرها اولویت دارد.
- دانلودهای **Chrome، Chromium، Firefox و Chromedriver** تنها در صورتی از `HTTPS_PROXY`، `HTTP_PROXY` و `NO_PROXY` استفاده می‌کنند که یکی از شرایط زیر برقرار باشد:
  - پکیج `proxy-agent` در پروژه شما نصب شده باشد:

    ```bash
    npm install --save-dev proxy-agent
    ```

  - Node.js با پشتیبانی داخلی پروکسی خود اجرا شود (Node.js نسخه 22.21.0 / 24.5.0 یا بالاتر):

    ```bash
    NODE_USE_ENV_PROXY=1 npx wdio run ./wdio.conf.ts
    ```

  WebdriverIO پکیج `proxy-agent` را برای شما نصب نمی‌کند، زیرا درخت وابستگی‌های آن دارای هشدارهای امنیتی بدون راه‌حل است. هنگامی که یک متغیر پروکسی تنظیم شده باشد و هیچ‌یک از این گزینه‌ها فعال نباشد، WebdriverIO پیش از اولین دانلود یک هشدار در لاگ ثبت می‌کند.

## پروکسی بین مرورگر و اینترنت

برای تونل کردن اتصال بین مرورگر و اینترنت، می‌توانید یک پروکسی راه‌اندازی کنید که می‌تواند (برای مثال) برای ثبت اطلاعات شبکه و سایر داده‌ها با ابزارهایی مانند [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) مفید باشد.

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