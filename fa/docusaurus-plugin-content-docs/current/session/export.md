---
id: export
title: خروجی گرفتن از یک نشست به‌صورت تست
description: گام‌هایی را که در wdio session اجرا کرده‌اید به یک spec، page object و دستورات سفارشی تبدیل کنید.
---

`export` از گام‌های ضبط‌شده یک spec می‌نویسد. ارجاع‌ها (refs) با انتخابگرهای پایدار جایگزین می‌شوند. برای یک صفحه وب، اولین مورد از موارد زیر که دقیقاً با یک عنصر مطابقت داشته باشد استفاده می‌شود: یک شناسه تست (`data-testid`، `data-test`، `data-qa`)، یک [انتخابگر نقش](/docs/selectors#role-selector) مانند `role/button[name="Add to cart"]`، یک نام دسترس‌پذیر (`aria/Add to cart`)، یک id، متن یک دکمه یا لینک، نام یک فیلد فرم، و در نهایت یک مسیر CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` گام‌ها را پیش از خروجی گرفتن چاپ می‌کند. `history clear` آن‌ها را حذف می‌کند.

## Page objectها

`--page-objects` یک page object در کنار spec می‌نویسد. انتخابگرها بر اساس مسیری که روی آن اجرا شده‌اند گروه‌بندی می‌شوند. یک `$('…')` لفظی در یک گام ضبط‌شده به یک getter تبدیل می‌شود. `$$`، رشته‌هایی که به‌طور اتفاقی حاوی `$('…')` هستند، و یک `$(selector)` پویا همان‌طور که هستند باقی می‌مانند.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

این دستور از بازنویسی page objectی که از قبل در پوشه خروجی وجود دارد خودداری می‌کند. ابتدا `--out` را تغییر دهید یا آن فایل را حذف کنید. خود فایل spec دوباره نوشته می‌شود.

یک `import` در بالای یک گام `exec` به بالای spec، خارج از تابع تست، منتقل می‌شود.

## Helperها

وقتی یک گام برای `exec` بیش از حد طولانی است، یک فایل در `.wdio/helpers/` اضافه کنید. هر فایل به‌صورت پیش‌فرض تابعی را export می‌کند که browser را دریافت کرده و با `addCommand` دستورات را ثبت می‌کند. importهای نسبی نسبت به همان فایل باقی می‌مانند. importهای مستقیم پکیج‌ها از پروژه resolve می‌شوند.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Helperها هنگام باز شدن نشست و همچنین با `npx wdio session helpers --reload` بارگذاری می‌شوند. اگر `.wdio/helpers` هنوز وجود نداشته باشد، نشست منتظر ایجاد آن می‌ماند و آن را زیر نظر می‌گیرد. Helperها در تست خروجی به دستورات سفارشی تبدیل می‌شوند.

## گام‌های بعدی

- [اجرای کد](/docs/session/exec) — گام‌هایی که `export` ضبط می‌کند
- [دستورات](/docs/session-commands) — فلگ‌های `export`، `history` و `helpers`