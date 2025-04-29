---
id: testingbot-service
title: سرویس Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---


> سرویس WebdriverIO که ادغام بهتری با TestingBot فراهم می‌کند. این سرویس متادیتای کار ('name'، 'passed'، 'tags'، 'public'، 'build'، 'extra') را به‌روزرسانی می‌کند و در صورت نیاز، TestingBot Tunnel را اجرا می‌کند.

## نصب

ساده‌ترین راه این است که `@wdio/testingbot-service` را به عنوان یک devDependency در فایل `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/testingbot-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

برای استفاده از سرویس، شما باید `user` و `key` را در فایل `wdio.conf.js` خود تنظیم کنید و گزینه `hostname` را به `hub.testingbot.com` تغییر دهید. اگر می‌خواهید از [TestingBot Tunnel](https://testingbot.com/support/other/tunnel) استفاده کنید، باید `tbTunnel: true` را تنظیم کنید.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## گزینه‌ها

برای مجوز دادن به سرویس TestingBot، پیکربندی شما باید شامل گزینه‌های [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key) باشد.

### tbTunnel
اگر true باشد، TestingBot Tunnel را اجرا می‌کند و یک اتصال امن بین یک ماشین مجازی TestingBot که آزمایش‌های مرورگر شما را اجرا می‌کند، برقرار می‌کند.

نوع: `Boolean`<br />
پیش‌فرض: `false`

### tbTunnelOpts
گزینه‌های TestingBot Tunnel را اعمال کنید (مثلاً برای تغییر شماره پورت یا تنظیمات logFile). برای اطلاعات بیشتر [این لیست](https://github.com/testingbot/testingbot-tunnel-launcher) را ببینید.

نوع: `Object`<br />
پیش‌فرض: `{}`