---
id: session
title: wdio session
description: یک مرورگر، اپلیکیشن موبایل یا اپلیکیشن دسکتاپ را با دستورات کوتاه wdio session از shell کنترل کنید، سپس گام‌ها را به‌صورت یک تست خروجی بگیرید.
---

`wdio session` یک نشست (session) WebdriverIO را در طول دستورات کوتاه متعدد shell زنده نگه می‌دارد. از آن برای کاوش یک رابط کاربری، بررسی یک تغییر و تبدیل گام‌هایی که کار کردند به یک تست استفاده کنید. این ابزار بخشی از `@wdio/cli` (WebdriverIO v10) است.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

نام نشست `default` است. فقط زمانی که به دو نشست هم‌زمان نیاز دارید، `-s <name>` را ارسال کنید. صفحه [اهداف](/docs/session/targets) یک guinea pig از نوع Expo را در یک پنجره Chrome با رابط گرافیکی (headed) و در یک پنجره Electron، هر دو در اندازه دسکتاپ، اجرا می‌کند. دستورات Android و iOS برای همان اپلیکیشن در آن صفحه آمده‌اند.

## نصب

`wdio session` بخشی از CLI مربوط به WebdriverIO است. `npx wdio` بسته بدون scope [`wdio`](https://www.npmjs.com/package/wdio) را نصب کرده و آن CLI را اجرا می‌کند. لازم نیست `@wdio/session` را خودتان نصب کنید.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` گردش کار، اکشن‌ها به تفکیک گروه، فلگ‌های سراسری و کدهای خروج را چاپ می‌کند. `<action> --help` آرگومان‌ها، فلگ‌ها، پلتفرم‌ها، مثال‌ها و اکشن‌های مرتبط با آن اکشن را چاپ می‌کند. همین متن در صفحه [دستورات](/docs/session-commands) نیز آمده است. مهارت (skill) عامل فقط حلقه اصلی را نگه می‌دارد و عامل‌ها را برای بقیه موارد به `--help` ارجاع می‌دهد، بنابراین با تغییر CLI منسوخ نمی‌شود.

یک پروژه را با دستور زیر ایجاد کنید:

```sh
npm init wdio@latest
```

گزینه "Set up coding agent support" را بپذیرید تا `.agents/skills/wdio-session/SKILL.md`، یک بخش در `AGENTS.md` و یک ورودی gitignore برای `.wdio/session/` نوشته شود. مهارت را بعداً با دستور زیر نصب کنید:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` موارد Node.js، مرورگر، Appium، SDKها و اعتبارنامه‌های ابری را بررسی می‌کند. `doctor <target>` فقط مواردی را که آن هدف نیاز دارد بررسی می‌کند. در صورت شکست یک بررسی، فرایند با کد 1 خارج می‌شود.

## باز کردن یک صفحه و انجام عمل روی آن

Chrome را به‌صورت headless باز کنید (برای نمایش پنجره `--headed` را اضافه کنید). `open` عناصر تعاملی صفحه را چاپ می‌کند:

```sh
npx wdio session open chrome http://localhost:3000
```

یک عنصر به شکل `button "Add to cart" [ref=e3]` است. از آن ref استفاده کنید. هر اکشن گزارش می‌دهد که چه چیزی را در صفحه تغییر داده است، همراه با refهایی برای عناصر جدید، بنابراین به‌ندرت به یک `snapshot` جداگانه نیاز دارید:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`، `open edge` و `open safari` همان URL را می‌پذیرند. Chrome، Firefox و Edge در صورت نصب نبودن، در اولین استفاده دانلود می‌شوند. Safari به macOS نیاز دارد.

### Android

Android و iOS از طریق Appium 3 اجرا می‌شوند. `doctor android` نبودِ سرور یا درایور را همراه با دستور نصب گزارش می‌دهد.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. دسکتاپ بومی: `open macos --bundle-id com.example.shop` و `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` و `open dioxus ./my-app` نیاز دارند که درایورشان در `PATH` باشد. در Linux بدون `DISPLAY` یا `WAYLAND_DISPLAY`، Xvfb یا weston را نصب کنید.

## مشاهده و refها

| دستور | کاربرد |
| --- | --- |
| `snapshot --interactive` | عناصری که می‌توانید روی آن‌ها عمل کنید، هر کدام با یک ref |
| `snapshot --compact` | همان درخت با حذف wrapperهای خالی بدون نام |
| `snapshot --urls` | آدرس پیوند روی هر پیوند |
| `find "Add to cart"` | یک خط از یک snapshot تازه |
| `diff` | آنچه از snapshot قبلی تغییر کرده است |
| `screenshot` | چیدمان. وقتی یک snapshot به سؤال پاسخ می‌دهد، از آن صرف‌نظر کنید |
| `pdf` | یک PDF از صفحه فعلی (`pdf report.pdf`). نشست‌های BiDi در حالت headed و headless چاپ می‌کنند |
| `source` | HTML صفحه یا XML بومی |

refها از آخرین snapshot می‌آیند. پس از پیمایش، دوباره snapshot بگیرید. یک ref قدیمی با `REF_STALE` شکست می‌خورد. یک ref ناشناخته با `REF_NOT_FOUND` شکست می‌خورد.

## `exec`

`exec` کد WebdriverIO را اجرا می‌کند. همیشه دستورات را `await` کنید. `$` یک عنصر برمی‌گرداند و در صورت نبودن آن خطا پرتاب می‌کند. هیچ حالت sync و هیچ `browser.element` وجود ندارد.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

assertionها را با `expect-webdriverio` در `exec` قرار دهید. وقتی سؤال درباره ظاهر صفحه است، از `visual check <tag>` (نیازمند `@wdio/visual-service`) استفاده کنید.

## خروجی گرفتن

`export` یک spec از گام‌های ضبط‌شده می‌نویسد. refها با selectorهای پایدار جایگزین می‌شوند.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`، `open edge` و `open safari` همان URL را می‌پذیرند. سایر اهداف، snapshotها، `exec`، خروجی گرفتن و اجرای تستِ متوقف‌شده، صفحات جداگانه‌ای در این بخش هستند.

## این بخش

| صفحه | کاربرد |
| --- | --- |
| [اهداف](/docs/session/targets) | مرورگرها، Android، iOS، دسکتاپ، Electron، Tauri، Dioxus و دستگاه‌های ابری، شامل اپلیکیشن نمایشی در Chrome، Android و Electron |
| [Snapshotها و refها](/docs/session/snapshots) | آنچه روی صفحه است و refهایی که روی آن‌ها کلیک می‌کنید |
| [اجرای کد](/docs/session/exec) | `exec`، assertionها و بررسی‌های بصری |
| [خروجی گرفتن یک تست](/docs/session/export) | specها، page objectها و `.wdio/helpers` |
| [اشکال‌زدایی یک تست](/docs/session/debug) | `wdio run --debug=agent` و `wdio repl --session` |
| [دستورات](/docs/session-commands) | همه اکشن‌ها و فلگ‌ها |

## عیب‌یابی

| پیام | چه باید کرد |
| --- | --- |
| `SESSION_EXISTS` | این نام از قبل در حال اجراست. با `-s` از نام دیگری استفاده کنید، یا `open --replace` را به کار ببرید. |
| `REF_STALE` / `REF_NOT_FOUND` | دوباره `snapshot` را اجرا کنید و از یک ref در آن خروجی استفاده کنید. |
| `NOT_EDITABLE` | هدف `fill` یک فیلد قابل ویرایش نیست و هیچ فیلد قابل ویرایش واحدی درون آن (یا پشت `aria-controls`/`aria-owns`/label) ندارد. `snapshot --scope <target>` را اجرا کنید و ref فیلد را پر کنید. |
| `MISSING_DEPENDENCY` | بسته نام‌برده‌شده در خطا را نصب کنید، یا `wdio session doctor <target>` را اجرا کنید. |
| `MISSING_APPIUM_DRIVER` | خط `npx appium driver install …` موجود در خطا را اجرا کنید. |
| `MISSING_CREDENTIALS` | متغیرهای نام‌برده‌شده را export کنید. Doctor هرگز مقادیر آن‌ها را چاپ نمی‌کند. |
| `Session closed from wdio session` | نشست اشکال‌زدایی بسته شد. وقتی تست باید ادامه یابد، به‌جای close از resume استفاده کنید. |

کدهای خروج: 0 موفقیت، 1 شکست اکشن، 2 نحوه استفاده (usage)، 3 نبودِ یک وابستگی یا اعتبارنامه، 4 نبودِ نشستی با آن نام.

## گام‌های بعدی

- [اهداف](/docs/session/targets) — یک مرورگر، یک اپلیکیشن Android یا iOS، یا یک پنجره Electron باز کنید
- [WebdriverIO برای عامل‌های کدنویسی](/docs/ai-agents) — مهارت، مستندات و قوانین پروژه
- [دستورات wdio session](/docs/session-commands) — همه اکشن‌ها و فلگ‌ها