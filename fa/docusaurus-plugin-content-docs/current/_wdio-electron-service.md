---
id: wdio-electron-service
title: سرویس الکترون
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---


> wdio-electron-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service) مراجعه کنید

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**سرویس WebdriverIO برای تست برنامه‌های الکترون**

امکان تست E2E چند پلتفرمی برنامه‌های الکترون را از طریق اکوسیستم گسترده WebdriverIO فراهم می‌کند.

جانشین معنوی [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### ویژگی‌ها

تست برنامه‌های الکترون را بسیار آسان‌تر می‌کند از طریق:

- 🚗 راه‌اندازی خودکار Chromedriver مورد نیاز (برای الکترون نسخه ۲۶ و بالاتر)
- 📦 تشخیص خودکار مسیر برنامه الکترون شما
  - از [Electron Forge](https://www.electronforge.io/)، [Electron Builder](https://www.electron.build/) و برنامه‌های بسته‌بندی نشده پشتیبانی می‌کند
- 🧩 دسترسی به API‌های الکترون در تست‌های خود
- 🕵️ شبیه‌سازی API‌های الکترون از طریق یک API شبیه به Vitest

## نصب

شما نیاز به نصب `WebdriverIO` دارید، دستورالعمل‌ها را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## شروع سریع

روش توصیه شده برای راه‌اندازی سریع، استفاده از [ویزارد پیکربندی WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup) است.

### شروع سریع دستی

برای شروع بدون استفاده از ویزارد پیکربندی، شما نیاز به نصب سرویس و `@wdio/cli` دارید:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

یا از مدیر بسته مورد نظر خود استفاده کنید - pnpm، yarn و غیره.

سپس، فایل پیکربندی WDIO خود را ایجاد کنید. اگر به الهام نیاز دارید، یک پیکربندی کارآمد در [دایرکتوری نمونه](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) این مخزن وجود دارد، همچنین [صفحه مرجع پیکربندی WDIO](https://webdriver.io/docs/configuration).

شما باید `electron` را به آرایه سرویس‌های خود اضافه کرده و یک قابلیت الکترون تنظیم کنید، مثلاً:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

در نهایت، [تست‌هایی را اجرا کنید](https://webdriver.io/docs/gettingstarted#run-test) با استفاده از فایل پیکربندی خود.

این یک نمونه از برنامه شما را به همان روشی که WDIO مرورگرهایی مانند Chrome یا Firefox را مدیریت می‌کند، راه‌اندازی می‌کند. این سرویس با [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote) کار می‌کند اگر نیاز به اجرای چندین نمونه همزمان دارید، مثلاً چندین نمونه از برنامه شما یا ترکیب‌های مختلف برنامه شما و یک مرورگر وب.

اگر از [Electron Forge](https://www.electronforge.io/) یا [Electron Builder](https://www.electron.build/) برای بسته‌بندی برنامه خود استفاده می‌کنید، سرویس به طور خودکار تلاش می‌کند مسیر برنامه الکترون بسته‌بندی شده شما را پیدا کند. می‌توانید از طریق قابلیت‌های سرویس سفارشی، یک مسیر سفارشی به باینری ارائه دهید، مثلاً:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

برای یافتن مقدار `appBinaryPath` خود برای سیستم‌عامل‌های مختلف پشتیبانی شده توسط الکترون، به [مستندات پیکربندی](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) مراجعه کنید.

به طور جایگزین، می‌توانید سرویس را به یک برنامه بسته‌بندی نشده با ارائه مسیر به اسکریپت `main.js` هدایت کنید. الکترون باید در `node_modules` شما نصب شده باشد. توصیه می‌شود برنامه‌های بسته‌بندی نشده را با استفاده از یک بسته‌بندی مانند Rollup، Parcel، Webpack و غیره بسته‌بندی کنید.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## پیکربندی Chromedriver

**اگر برنامه شما از نسخه‌ای از الکترون استفاده می‌کند که کمتر از نسخه ۲۶ است، شما نیاز به [پیکربندی دستی Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed) دارید.**

این به دلیل آن است که WDIO از Chrome for Testing برای دانلود Chromedriver استفاده می‌کند، که فقط نسخه‌های Chromedriver ۱۱۵ یا جدیدتر را ارائه می‌دهد.

## مستندات

**[پیکربندی سرویس](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[پیکربندی Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[دسترسی به API‌های الکترون](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[شبیه‌سازی API‌های الکترون](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[مدیریت پنجره](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[حالت مستقل](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[توسعه](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[مشکلات رایج و اشکال‌زدایی](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## توسعه

اگر علاقه‌مند به مشارکت هستید، [مستندات توسعه](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) را مطالعه کنید.

## نمونه‌های یکپارچه‌سازی

پروژه [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate) ما را بررسی کنید که نشان می‌دهد چگونه WebdriverIO را در یک برنامه نمونه یکپارچه کنید. همچنین می‌توانید به دایرکتوری‌های [برنامه‌های نمونه](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) و [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) در این مخزن نگاهی بیندازید.

## پشتیبانی

اگر در اجرای WDIO با این سرویس مشکل دارید، ابتدا باید [مشکلات رایج](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) مستند شده را بررسی کنید، سپس یک بحث در [انجمن اصلی WDIO](https://github.com/webdriverio/webdriverio/discussions) باز کنید.

انجمن بحث سرویس الکترون بسیار کمتر از انجمن WDIO فعال است، اما اگر مشکلی که تجربه می‌کنید خاص الکترون یا استفاده از سرویس است، می‌توانید یک بحث را [اینجا](https://github.com/webdriverio-community/wdio-electron-service/discussions) باز کنید.