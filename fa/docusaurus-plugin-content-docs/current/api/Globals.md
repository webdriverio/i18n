---
id: globals
title: متغیرهای عمومی
---

در فایل‌های تست شما، WebdriverIO هر یک از این متدها و اشیاء را در محیط عمومی قرار می‌دهد. برای استفاده از آن‌ها نیازی به وارد کردن چیزی ندارید. با این حال، اگر واردات صریح را ترجیح می‌دهید، می‌توانید از `import { browser, $, $$, expect } from '@wdio/globals'` استفاده کنید و `injectGlobals: false` را در پیکربندی WDIO خود تنظیم کنید.

اشیاء عمومی زیر در صورت عدم پیکربندی دیگری تنظیم می‌شوند:

- `browser`: شیء [Browser](https://webdriver.io/docs/api/browser) در WebdriverIO
- `driver`: نام مستعار برای `browser` (زمانی که تست‌های موبایل اجرا می‌شوند استفاده می‌شود)
- `multiRemoteBrowser`: نام مستعار برای `browser` یا `driver` اما فقط برای جلسات [Multiremote](/docs/multiremote) تنظیم می‌شود
- `$`: دستور برای واکشی یک عنصر (اطلاعات بیشتر در [مستندات API](/docs/api/browser/$))
- `$$`: دستور برای واکشی عناصر (اطلاعات بیشتر در [مستندات API](/docs/api/browser/$$))
- `expect`: چارچوب تأیید برای WebdriverIO (مشاهده [مستندات API](/docs/api/expect-webdriverio))

__نکته:__ WebdriverIO هیچ کنترلی بر چارچوب‌های مورد استفاده (مانند Mocha یا Jasmine) که هنگام راه‌اندازی محیط خود متغیرهای عمومی را تنظیم می‌کنند، ندارد.