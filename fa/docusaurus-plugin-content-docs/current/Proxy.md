---
id: proxy
title: تنظیم پراکسی
---

شما می‌توانید دو نوع مختلف درخواست را از طریق پراکسی ارسال کنید:

- اتصال بین اسکریپت تست شما و درایور مرورگر (یا نقطه پایانی WebDriver)
- اتصال بین مرورگر و اینترنت

## پراکسی بین درایور و تست

اگر شرکت شما یک پراکسی سازمانی (مثلاً در `http://my.corp.proxy.com:9090`) برای همه درخواست‌های خروجی دارد، دو گزینه برای پیکربندی WebdriverIO جهت استفاده از پراکسی دارید:

### گزینه ۱: استفاده از متغیرهای محیطی (توصیه شده)

از نسخه WebdriverIO v9.12.0 به بعد، شما می‌توانید به سادگی متغیرهای محیطی استاندارد پراکسی را تنظیم کنید:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

سپس تست‌های خود را به طور معمول اجرا کنید. WebdriverIO به طور خودکار از این متغیرهای محیطی برای پیکربندی پراکسی استفاده خواهد کرد.

### گزینه ۲: استفاده از setGlobalDispatcher در undici

برای پیکربندی‌های پیشرفته‌تر پراکسی یا اگر به کنترل برنامه‌نویسی نیاز دارید، می‌توانید از متد `setGlobalDispatcher` در undici استفاده کنید:

#### نصب undici

```bash npm2yarn
npm install undici --save-dev
```

#### افزودن undici setGlobalDispatcher به فایل پیکربندی شما

عبارت require زیر را به بالای فایل پیکربندی خود اضافه کنید.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

اطلاعات بیشتر در مورد پیکربندی پراکسی را می‌توان [اینجا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) پیدا کرد.

### کدام روش را باید انتخاب کنم؟

- **از متغیرهای محیطی استفاده کنید** اگر می‌خواهید یک رویکرد ساده و استاندارد داشته باشید که در ابزارهای مختلف کار می‌کند و نیازی به تغییر کد ندارد.
- **از setGlobalDispatcher استفاده کنید** اگر به ویژگی‌های پیشرفته پراکسی مانند احراز هویت سفارشی، پیکربندی‌های مختلف پراکسی برای محیط‌های مختلف نیاز دارید یا می‌خواهید به صورت برنامه‌ای رفتار پراکسی را کنترل کنید.

هر دو روش کاملاً پشتیبانی می‌شوند و WebdriverIO ابتدا یک dispatcher جهانی را بررسی می‌کند و سپس به متغیرهای محیطی مراجعه می‌کند.

### پراکسی Sauce Connect

اگر از [پراکسی Sauce Connect](https://docs.saucelabs.com/secure-connections/sauce-connect-5) استفاده می‌کنید، آن را از طریق دستور زیر راه‌اندازی کنید:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## پراکسی بین مرورگر و اینترنت

برای ایجاد تونل برای اتصال بین مرورگر و اینترنت، می‌توانید یک پراکسی راه‌اندازی کنید که می‌تواند برای (به عنوان مثال) جمع‌آوری اطلاعات شبکه و سایر داده‌ها با ابزارهایی مانند [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) مفید باشد.

پارامترهای `proxy` را می‌توان از طریق قابلیت‌های استاندارد به صورت زیر اعمال کرد:

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