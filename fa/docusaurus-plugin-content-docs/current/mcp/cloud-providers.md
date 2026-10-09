---
id: cloud-providers
title: ارائه‌دهندگان ابری
description: "اجرای جلسات مرورگر و موبایل WebdriverIO MCP روی مزارع دستگاه ابری، شامل اعتبارنامه‌ها، آپلود اپلیکیشن، تونل‌ها و گزارش‌دهی."
---

سرور WebdriverIO MCP به‌صورت بومی از اجرای جلسات اتوماسیون مرورگر و موبایل روی مزارع دستگاه ابری پشتیبانی می‌کند. نیازی به درایورهای محلی، شبیه‌سازها (emulator) یا سیمولاتورها نیست. چهار ارائه‌دهنده پشتیبانی می‌شوند:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (مرورگرها) و [App Automate](https://www.browserstack.com/app-automate) (اپلیکیشن‌های موبایل)
- **Sauce Labs** — ابر دستگاه‌های واقعی و مرورگرهای مجازی [Sauce Labs](https://saucelabs.com)
- **TestMu (که پیش‌تر LambdaTest نام داشت)** — ابر دستگاه‌های واقعی و مرورگرهای [TestMu](https://www.lambdatest.com)
- **TestingBot** — ابر دستگاه‌های واقعی و شبکه مرورگرهای [TestingBot](https://testingbot.com)

هر چهار ارائه‌دهنده روند کاری یکسانی دارند: اعتبارنامه‌ها را تنظیم کنید، در صورت نیاز یک اپلیکیشن موبایل آپلود کنید، سپس `start_session` را با نام ارائه‌دهنده فراخوانی کنید. برچسب‌های گزارش‌دهی، پیکربندی تونل و چرخه عمر اپلیکیشن موبایل در همه ارائه‌دهندگان یکسان است.

## پیش‌نیازها

پیش از راه‌اندازی سرور MCP، اعتبارنامه‌های خود را به‌عنوان متغیرهای محیطی تنظیم کنید:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| ارائه‌دهنده     | متغیر نام کاربری       | متغیر کلید دسترسی       | محل یافتن                                                      |
| ------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [تنظیمات حساب](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [تنظیمات کاربر](https://app.saucelabs.com/user-settings)           |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [تنظیمات حساب](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [تنظیمات حساب](https://testingbot.com/membership)              |

## اتوماسیون مرورگر

با تنظیم `provider` در `start_session`، یک جلسه مرورگر را روی هر ارائه‌دهنده ابری اجرا کنید:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

همه ارائه‌دهندگان از مقادیر `"chrome"`، `"firefox"`، `"edge"` و `"safari"` برای `browser` پشتیبانی می‌کنند. اگر `os` / `osVersion` را حذف کنید، ارائه‌دهنده از مقادیر پیش‌فرض معقول استفاده می‌کند (معمولاً آخرین نسخه Linux برای جلسات مرورگر).

### مناطق Sauce Labs

Sauce Labs از چندین منطقه مرکز داده پشتیبانی می‌کند. پارامتر `region` را در `start_session` تنظیم کنید:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

مقادیر پشتیبانی‌شده: `"us-west-1"`، `"eu-central-1"` (پیش‌فرض)، `"apac-southeast-1"`.

## اتوماسیون اپلیکیشن موبایل

روند کاری موبایل سه مرحله دارد که در همه ارائه‌دهندگان یکسان است:

### مرحله ۱: اپلیکیشن خود را آپلود کنید

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

هر کدام یک مرجع اپلیکیشن برمی‌گرداند که در `start_session` از آن استفاده خواهید کرد:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

می‌توانید به‌صورت اختیاری یک `customId` برای داشتن مرجع پایدار در آپلودهای مختلف تنظیم کنید:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

برای Sauce Labs، پارامتر `region` را متناسب با منطقه ذخیره‌سازی خود اضافه کنید (پیش‌فرض `"eu-central-1"`).

### مرحله ۲: فهرست اپلیکیشن‌های موجود

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

پارامترهای اختیاری برای همه ارائه‌دهندگان:
- `sortBy`: `"app_name"` یا `"uploaded_at"` (پیش‌فرض)
- `limit`: حداکثر تعداد نتایج (پیش‌فرض 20)

BrowserStack همچنین از `organizationWide: true` برای فهرست کردن همه آپلودهای سازمان پشتیبانی می‌کند. Sauce Labs پارامتر `region` را می‌پذیرد.

### مرحله ۳: جلسه را شروع کنید

از مرجع اپلیکیشن بازگشتی از `upload_app` یا یک `customId` استفاده کنید:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## تونل محلی

همه ارائه‌دهندگان از تونل محلی پشتیبانی می‌کنند تا جلسات ابری بتوانند به سرورهای روی دستگاه شما (localhost، محیط‌های staging، سرویس‌های داخلی) دسترسی داشته باشند.

سرور MCP از یک **پارامتر یکپارچه `tunnel`** استفاده می‌کند که در همه ارائه‌دهندگان به‌طور یکسان کار می‌کند:

### تونل با مدیریت خودکار (توصیه‌شده)

سرور MCP تونل را به‌طور خودکار راه‌اندازی و متوقف می‌کند:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

پیش از اولین جلسه با `tunnel: true`، سرور MCP دانلود و راه‌اندازی فایل اجرایی تونل را انجام می‌دهد. اگر می‌خواهید راه‌اندازی را به‌صورت دستی بررسی کنید، منبع local-binary ارائه‌دهنده را بخوانید:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

تونل هنگام بستن جلسه به‌طور خودکار متوقف می‌شود.

### تونل خارجی

اگر از قبل تونل را در یک فرایند جداگانه اجرا می‌کنید:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

مقدار `"external"` به سرور MCP اعلام می‌کند که یک تونل از قبل در حال اجراست؛ این گزینه پرچم‌های capability مناسب را تنظیم می‌کند اما هیچ فرایندی را راه‌اندازی یا متوقف نمی‌کند. `tunnelName` را مطابق با تونل در حال اجرا تنظیم کنید.

### راه‌اندازی دستی تونل

اگر ترجیح می‌دهید تونل را به‌صورت دستی اجرا کنید، دستورالعمل‌های راه‌اندازی را از منبع MCP مربوط به ارائه‌دهنده و پلتفرم خود بخوانید. برای مثال:

```text
// خواندن دستورالعمل‌های راه‌اندازی (از کلاینت هوش مصنوعی شما)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

هر منبع، URL دانلود، دستورات مخصوص پلتفرم و دستورالعمل‌های daemon را برمی‌گرداند.

## گزارش‌دهی

جلسات را با برچسب‌های پروژه، build و جلسه برای داشبورد ارائه‌دهنده علامت‌گذاری کنید. این قابلیت در همه ارائه‌دهندگان به‌طور یکسان کار می‌کند:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

جلسات در داشبورد ارائه‌دهنده، زیر پروژه و build مشخص‌شده نمایش داده می‌شوند:
- BrowserStack: [داشبورد Automate](https://automate.browserstack.com)
- Sauce Labs: [نتایج تست](https://app.saucelabs.com/dashboard/builds)
- TestMu: [داشبورد اتوماسیون](https://automation.lambdatest.com)
- TestingBot: [نتایج تست](https://testingbot.com/members)

## نکات مخصوص هر ارائه‌دهنده

### BrowserStack

- جلسات مرورگر: `os` مقادیر `"Windows"` یا `"OS X"` را می‌پذیرد. نسخه‌های Windows: `"10"`، `"11"`. نسخه‌های macOS: `"Ventura"`، `"Sonoma"`، `"Sequoia"`.
- API مدیریت اپلیکیشن: `organizationWide: true` در `list_apps` همه آپلودهای تیم را فهرست می‌کند.

### Sauce Labs

- **منطقه اهمیت دارد.** منطقه پیش‌فرض `eu-central-1` است. اگر حساب شما در منطقه دیگری است، `region` را در `start_session`، `list_apps` و `upload_app` مطابق با آن تنظیم کنید.
- جلسات موبایل از `automationName` (`"XCUITest"` یا `"UiAutomator2"`) پشتیبانی می‌کنند؛ مقادیر پیش‌فرض برای هر پلتفرم معقول هستند.
- تونل Sauce Connect از طریق بسته npm `saucelabs` به‌طور خودکار مدیریت می‌شود. برای `tunnel: true` به فایل اجرایی خارجی نیازی نیست.

### TestMu

- نام ارائه‌دهنده در `start_session`، `list_apps` و `upload_app` برابر `"testmu"` است.
- جلسات مرورگر به `hub.lambdatest.com` و جلسات موبایل به `mobile-hub.lambdatest.com` متصل می‌شوند؛ این موضوع به‌طور خودکار مدیریت می‌شود.
- تونل از طریق بسته npm `@lambdatest/node-tunnel` به‌طور خودکار مدیریت می‌شود.
- مدیریت اپلیکیشن موبایل، اپلیکیشن‌های Android و iOS را از طریق فراخوانی‌های API جداگانه دریافت کرده و سپس نتایج را ادغام می‌کند.

### TestingBot

- نام ارائه‌دهنده در `start_session`، `list_apps` و `upload_app` برابر `"testingbot"` است.
- جلسات مرورگر و موبایل هر دو به `hub.testingbot.com` روی پورت 443 متصل می‌شوند (به‌طور خودکار مدیریت می‌شود).
- اعتبارنامه‌ها از `TESTINGBOT_KEY` و `TESTINGBOT_SECRET` استفاده می‌کنند (نه جفت نام کاربری/کلید دسترسی مانند سایر ارائه‌دهندگان).
- تونل از طریق بسته npm `testingbot-tunnel-launcher` به‌طور خودکار مدیریت می‌شود (به Java 11+ نیاز دارد).
- پارامتر منطقه وجود ندارد — hub مربوط به TestingBot جهانی است.
- حالت مرورگر موبایل/شبیه‌ساز پشتیبانی می‌شود: به‌جای `app`، مقدار `platform: "android"` یا `"ios"` را همراه با نام یک `browser` (مثلاً `"chrome"`) تنظیم کنید.