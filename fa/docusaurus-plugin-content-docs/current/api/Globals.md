---
id: globals
title: متغیرهای سراسری
---

در فایل‌های تست شما، WebdriverIO هر یک از این متدها و اشیاء را در محیط سراسری قرار می‌دهد. برای استفاده از آن‌ها نیازی به import کردن چیزی ندارید. با این حال، اگر import صریح را ترجیح می‌دهید، می‌توانید از `import { browser, $, $$, expect } from '@wdio/globals'` استفاده کنید و `injectGlobals: false` را در پیکربندی WDIO خود تنظیم کنید.

اشیاء سراسری زیر در صورتی که به شکل دیگری پیکربندی نشده باشند، تنظیم می‌شوند:

- `browser`: [شیء Browser](https://webdriver.io/docs/api/browser) در WebdriverIO
- `driver`: نام مستعار برای `browser` (هنگام اجرای تست‌های موبایل استفاده می‌شود)
- `multiRemoteBrowser`: نام مستعار برای `browser` یا `driver` اما فقط برای جلسات [multi-remote](/docs/multiremote) تنظیم می‌شود
- `$`: دستوری برای دریافت یک عنصر (اطلاعات بیشتر در [مستندات API](/docs/api/browser/$))
- `$$`: دستوری برای دریافت عناصر (اطلاعات بیشتر در [مستندات API](/docs/api/browser/$$))
- `expect`: فریم‌ورک assertion برای WebdriverIO (به [مستندات API](/docs/api/expect-webdriverio) مراجعه کنید)

__توجه:__ WebdriverIO هیچ کنترلی بر روی فریم‌ورک‌های مورد استفاده (مانند Mocha یا Jasmine) که هنگام راه‌اندازی محیط خود متغیرهای سراسری را تنظیم می‌کنند، ندارد.