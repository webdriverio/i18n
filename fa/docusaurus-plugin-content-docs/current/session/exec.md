---
id: exec
title: اجرای کد در یک نشست
description: کد و assertionهای WebdriverIO را با exec در یک نشست زنده‌ی wdio اجرا کنید.
---

`exec` کد WebdriverIO را در نشست باز اجرا می‌کند. وقتی یک مرحله چیزی بیش از یک `click` یا `fill` ساده است، و برای همه‌ی assertionها از آن استفاده کنید.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

همیشه از `await` برای دستورها استفاده کنید. `$` یک المنت برمی‌گرداند و اگر آن المنت وجود نداشته باشد خطا می‌دهد. `$$` یک لیست برمی‌گرداند. هیچ حالت sync و هیچ `browser.element`ای وجود ندارد.

نام‌هایی که تعریف می‌کنید در `exec` بعدی نیز در دسترس می‌مانند. یک `import` در سطح بالا از دایرکتوری پروژه بارگذاری می‌شود.

## Assertionها

assertionها را با `expect-webdriverio` در `exec` قرار دهید. آن را در پروژه‌ی خود نصب کنید. بدون آن، `expect(...)` با یک راهنمای نصب شکست می‌خورد.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

وقتی سؤال این است که صفحه چگونه به نظر می‌رسد، از `visual check <tag>` استفاده کنید. این دستور به `@wdio/visual-service` نیاز دارد:

```sh
npx wdio session visual check cart
```

`visual accept cart` آخرین تصویر واقعی مربوط به آن tag را روی baseline کپی می‌کند. این دستور تصاویر قدیمی‌تری را که پیشوند tag مشترکی دارند کپی نمی‌کند.

## چه زمانی به جای آن از یک میان‌بر استفاده کنیم

`click`، `fill`، `type`، `press` و `tap` برای یک تعامل واحد کوتاه‌تر از `exec` هستند و خط WebdriverIO‌ای را که اجرا کرده‌اند چاپ می‌کنند. استفاده از این‌ها را همراه با یک ref از آخرین [snapshot](/docs/session/snapshots) ترجیح دهید. برای انتظارها (waits)، assertionها و هر چیزی که به بیش از یک دستور نیاز دارد از `exec` استفاده کنید.

## گام‌های بعدی

- [خروجی گرفتن از یک تست](/docs/session/export) — ذخیره‌ی مراحل، از جمله `exec`
- [دستورها](/docs/session-commands) — فلگ‌های `exec` و `visual`