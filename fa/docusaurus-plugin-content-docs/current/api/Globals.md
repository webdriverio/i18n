---
id: globals
title: متغیرهای جهانی
---

در فایل‌های آزمون شما، WebdriverIO هر یک از این متدها و اشیاء را در محیط جهانی قرار می‌دهد. برای استفاده از آن‌ها نیازی به وارد کردن چیزی ندارید. با این حال، اگر واردات صریح را ترجیح می‌دهید، می‌توانید از `import { browser, $, $$, expect } from '@wdio/globals'` استفاده کنید و `injectGlobals: false` را در پیکربندی WDIO خود تنظیم کنید.

اشیاء جهانی زیر در صورت عدم پیکربندی دیگری تنظیم می‌شوند:

- `browser`: شیء [Browser object](https://webdriver.io/docs/api/browser) در WebdriverIO
- `driver`: نام مستعار برای `browser` (هنگام اجرای آزمون‌های موبایل استفاده می‌شود)
- `multiremotebrowser`: نام مستعار برای `browser` یا `driver` اما فقط برای جلسات [Multiremote](/docs/multiremote) تنظیم می‌شود
- `$`: دستور برای دریافت یک عنصر (اطلاعات بیشتر در [API docs](/docs/api/browser/$))
- `$$`: دستور برای دریافت عناصر (اطلاعات بیشتر در [API docs](/docs/api/browser/$$))
- `expect`: چارچوب تأیید برای WebdriverIO (به [API docs](/docs/api/expect-webdriverio) مراجعه کنید)

__نکته:__ WebdriverIO هیچ کنترلی بر روی چارچوب‌های مورد استفاده (مانند Mocha یا Jasmine) که هنگام راه‌اندازی محیط خود متغیرهای جهانی را تنظیم می‌کنند، ندارد.