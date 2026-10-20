---
id: exec
title: اجرای کد در یک نشست
description: اجرای کد و assertionهای WebdriverIO در یک نشست زندهٔ wdio با exec.
---

`exec` کد WebdriverIO را در نشست باز اجرا می‌کند. از آن زمانی استفاده کنید که یک مرحله چیزی بیش از یک `click` یا `fill` ساده باشد، و همچنین برای همهٔ assertionها.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

همیشه برای دستورات از `await` استفاده کنید. `$` یک عنصر برمی‌گرداند و اگر عنصر وجود نداشته باشد خطا پرتاب می‌کند. `$$` یک لیست برمی‌گرداند. حالت sync و `browser.element` وجود ندارد.

نام‌هایی که تعریف می‌کنید در `exec` بعدی نیز در دسترس می‌مانند. یک `import` در سطح بالا از دایرکتوری پروژه بارگذاری می‌شود.

## Assertionها

assertionها را با `expect-webdriverio` در `exec` قرار دهید. آن را در پروژهٔ خود نصب کنید. بدون آن، `expect(...)` با یک راهنمای نصب شکست می‌خورد.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

زمانی که سؤال این است که صفحه چگونه به نظر می‌رسد، از `visual check <tag>` استفاده کنید. این دستور به `@wdio/visual-service` نیاز دارد:

```sh
npx wdio session visual check cart
```

`visual accept cart` آخرین تصویر واقعی مربوط به آن tag را روی baseline کپی می‌کند. این دستور تصاویر قدیمی‌تری را که پیشوند tag یکسانی دارند کپی نمی‌کند.

## چه زمانی به‌جای آن از میان‌بر استفاده کنیم

`click`، `fill`، `type`، `press` و `tap` برای یک تعامل واحد کوتاه‌تر از `exec` هستند و خط WebdriverIO‌ای را که اجرا کرده‌اند چاپ می‌کنند. استفاده از آن‌ها را همراه با یک ref از آخرین [snapshot](/docs/session/snapshots) ترجیح دهید. از `exec` برای انتظارها (waits)، assertionها و هر چیزی که به بیش از یک دستور نیاز دارد استفاده کنید.

## گام‌های بعدی

- [خروجی گرفتن از یک تست](/docs/session/export) — ذخیرهٔ مراحل، از جمله `exec`
- [دستورات](/docs/session-commands) — فلگ‌های `exec` و `visual`