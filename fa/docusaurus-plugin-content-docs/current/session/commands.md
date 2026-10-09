---
id: session-commands
title: دستورات wdio session
description: همهٔ اکشن‌ها و فلگ‌های wdio session، از open تا doctor و skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

همهٔ اکشن‌های `wdio session` در این صفحه آمده‌اند. فلگ‌های سراسری روی همهٔ آن‌ها اعمال می‌شوند. همین متن با `npx wdio session <action> --help` هم چاپ می‌شود. بقیهٔ بخش [WebdriverIO Session](/docs/session) به [هدف‌ها](/docs/session/targets)، [اسنپ‌شات‌ها](/docs/session/snapshots)، [`exec`](/docs/session/exec)، [خروجی گرفتن](/docs/session/export) و [اشکال‌زدایی](/docs/session/debug) می‌پردازد.

```sh
npx wdio session <action> [arguments] [flags]
```

## فلگ‌های سراسری

| فلگ | توضیحات |
| --- | --- |
| `-s, --session` | نام نشست (متغیر محیطی WDIO_SESSION، پیش‌فرض "default") |
| `--json` | یک شیء JSON چاپ می‌کند (متغیر محیطی WDIO_SESSION_JSON=1) |
| `--timeout` | مهلت زمانی درخواست بر حسب میلی‌ثانیه (حداکثر 60000، به‌جز برای wait) |
| `-q, --quiet` | در صورت موفقیت، چیزی جز داده‌های درخواست‌شده چاپ نمی‌کند |
| `--color` | برای غیرفعال کردن رنگ‌ها از --no-color استفاده کنید |

کدهای خروج: 0 یعنی موفقیت، 1 یعنی اکشن یا کد شما شکست خورد، 2 یعنی خطای استفاده، 3 یعنی وابستگی یا اعتبارنامه موجود نیست، 4 یعنی نشستی با آن نام وجود ندارد.

## `open`

یک نشست را شروع می‌کند: browser، android، ios، macos، windows، electron، tauri، dioxus یا یک فایل پیکربندی wdio.

یک daemon پس‌زمینه راه‌اندازی می‌کند که نشست را تا زمان `close` زنده نگه می‌دارد، یا تا زمانی که به مدت --idle-timeout (پیش‌فرض 30m) بیکار بماند. مرورگرها به‌صورت headless اجرا می‌شوند، مگر اینکه --headed را بدهید. نام نشست، هدف و پوشهٔ artifacts (جایی که اسنپ‌شات‌ها، اسکرین‌شات‌ها و خروجی‌ها ذخیره می‌شوند) را چاپ می‌کند و برای مرورگری که روی یک URL باز شده، اسنپ‌شات تعاملی آن صفحه را هم نمایش می‌دهد.

برای هر نام فقط یک نشست وجود دارد. باز کردن نامی که در حال اجراست با شکست مواجه می‌شود؛ از آن استفاده کنید، آن را ببندید یا --replace را بدهید. فقط زمانی `-s <name>` را بدهید که به دو نشست هم‌زمان نیاز دارید.

```sh
npx wdio session open <target> [url]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | خیر | URL برای باز کردن (مرورگرها)، مسیر برنامه (برنامه‌های دسکتاپ) یا capability (پیکربندی) |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--replace` | ابتدا نشست در حال اجرا با همین نام را می‌بندد |
| `--launch-timeout <n>` | چند میلی‌ثانیه برای آماده شدن نشست صبر شود |
| `--idle-timeout <value>` | پس از این مدت بدون درخواست خاموش می‌شود (مثلاً 30m؛ مقدار 0 غیرفعالش می‌کند) |
| `--capabilities <value>` | capabilityهای اضافی به‌صورت JSON یا مسیر یک فایل JSON |
| `--hostname <value>` | میزبان WebDriver راه دور |
| `--port <n>` | پورت WebDriver راه دور |
| `--path <value>` | مسیر WebDriver راه دور |
| `--protocol <value>` | پروتکل WebDriver راه دور |
| `--log-level <value>` | سطح لاگ WebdriverIO که در daemon.log نوشته می‌شود |
| `--bidi` | درخواست WebDriver BiDi (برای غیرفعال کردن از --no-bidi استفاده کنید) |
| `--headed` | پنجرهٔ مرورگر را نمایش می‌دهد |
| `--headless` | بدون پنجره اجرا می‌شود (پیش‌فرض برای مرورگرها؛ --headed را لغو می‌کند) |
| `--snapshot` | اسنپ‌شات تعاملی صفحهٔ بازشده را چاپ می‌کند (برای صرف‌نظر کردن از --no-snapshot استفاده کنید) |
| `--viewport <value>` | viewport اولیه، مثلاً 1280x720 |
| `--browser-version <value>` | نسخهٔ مرورگر |
| `--binary <value>` | فایل اجرایی مرورگر |
| `--arg <value>` | آرگومان اضافی مرورگر. مقداری که با `-` شروع می‌شود به `=` نیاز دارد، مثلاً `--arg=--disable-gpu` (قابل تکرار) |
| `--profile <value>` | پوشهٔ پروفایل ماندگار |
| `--attach <value>` | اتصال به یک Chrome/Edge در حال اجرا (پورت اشکال‌زدایی یا URL) |
| `--app <value>` | فایل برنامه یا URL برنامه در ابر |
| `--package <value>` | پکیج برنامهٔ Android |
| `--activity <value>` | activity برنامهٔ Android |
| `--bundle-id <value>` | bundle id در iOS/macOS |
| `--browser <value>` | مرورگر وب موبایل (chrome، safari) |
| `--device <value>` | نام دستگاه |
| `--platform-version <value>` | نسخهٔ پلتفرم |
| `--udid <value>` | UDID دستگاه |
| `--reset` | برای حفظ وضعیت برنامه از --no-reset استفاده کنید (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | جهت اولیه |
| `--appium-url <value>` | استفاده از یک سرور Appium در حال اجرا |
| `--app-arg <value>` | آرگومانی که به برنامهٔ دسکتاپ داده می‌شود. مقداری که با `-` شروع می‌شود به `=` نیاز دارد، مثلاً `--app-arg=--no-sandbox` (قابل تکرار) |
| `--chromedriver <value>` | Electron: فایل اجرایی Chromedriver |
| `--electron-version <value>` | Electron: نادیده گرفتن تشخیص خودکار نسخه |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | ارائه‌دهندهٔ ابری |
| `--os <value>` | ابر: سیستم‌عامل دسکتاپ |
| `--os-version <value>` | ابر: نسخهٔ سیستم‌عامل دسکتاپ |
| `--region <value>` | ابر: منطقهٔ Sauce Labs |
| `--tunnel <value>` | ابر: تونل ارائه‌دهنده را راه‌اندازی می‌کند (یا "external") |
| `--tunnel-name <value>` | ابر: شناسهٔ تونل |
| `--project <value>` | ابر: برچسب پروژه |
| `--build <value>` | ابر: برچسب build |
| `--name <value>` | ابر: برچسب نام نشست |

**مثال‌ها**

```sh
# باز کردن Chrome به‌صورت headless روی یک برنامهٔ محلی
npx wdio session open chrome http://localhost:3000

# باز کردن Firefox با پنجرهٔ قابل مشاهده
npx wdio session open firefox http://localhost:3000 --headed

# باز کردن یک برنامهٔ Android از طریق Appium
npx wdio session open android --app ./app.apk

# باز کردن یک برنامهٔ نصب‌شدهٔ iOS
npx wdio session open ios --bundle-id com.example.shop

# باز کردن یک برنامهٔ Electron
npx wdio session open electron ./main.js

# باز کردن اولین capability یک پیکربندی
npx wdio session open ./wdio.conf.ts 0

# باز کردن Chrome در یک گرید ابری
npx wdio session open chrome https://example.com --provider browserstack
```

همچنین ببینید: [`snapshot`](#snapshot)، [`close`](#close)، [`doctor`](#doctor).

## `close`

نشست را پایان می‌دهد و daemon آن را متوقف می‌کند.

روی نشستی که با `wdio run --debug=agent` باز شده، این کار باعث شکست تست متوقف‌شده می‌شود؛ برای ادامهٔ آن از `resume` استفاده کنید.

```sh
npx wdio session close
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--all` | همهٔ نشست‌ها را می‌بندد |
| `--clean` | پوشهٔ artifacts را هم حذف می‌کند |

**مثال‌ها**

```sh
# بستن نشست پیش‌فرض
npx wdio session close

# بستن همهٔ نشست‌ها و حذف artifactهای آن‌ها
npx wdio session close --all --clean
```

همچنین ببینید: [`open`](#open)، [`list`](#list).

## `list`

نشست‌های در حال اجرا را فهرست می‌کند.

برای هر نشست یک خط چاپ می‌کند: نام، هدف، URL و مدت عمر. وضعیت باقی‌مانده از نشست‌هایی که از کار افتاده‌اند را پاک می‌کند.

```sh
npx wdio session list
```

**مثال‌ها**

```sh
# نمایش همهٔ نشست‌های در حال اجرا
npx wdio session list
```

همچنین ببینید: [`info`](#info)، [`status`](#status).

## `info`

جزئیات نشست را نمایش می‌دهد.

هدف، مرورگر و نسخهٔ آن، پشتیبانی از BiDi، پوشهٔ artifacts، و URL فعلی، عنوان، اندازهٔ پنجره و frame (وب) یا context و activity (موبایل) را چاپ می‌کند.

```sh
npx wdio session info
```

**مثال‌ها**

```sh
# نمایش اینکه نشست کجاست و چه چیزی را اجرا می‌کند
npx wdio session info
```

همچنین ببینید: [`list`](#list)، [`get`](#get).

## `restart`

نشست را می‌بندد و با همان هدف و فلگ‌ها دوباره باز می‌کند.

تاریخچهٔ ضبط‌شده را نگه می‌دارد، بنابراین `export` همچنان مراحل قبل از راه‌اندازی مجدد را پوشش می‌دهد.

```sh
npx wdio session restart
```

**مثال‌ها**

```sh
# شروع دوباره با یک مرورگر تازه
npx wdio session restart
```

همچنین ببینید: [`open`](#open)، [`close`](#close).

## `status`

اگر نشست در حال اجرا باشد با کد 0 و در غیر این صورت با کد 4 خارج می‌شود.

```sh
npx wdio session status
```

**مثال‌ها**

```sh
# باز کردن نشست فقط وقتی هیچ نشستی در حال اجرا نیست
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

همچنین ببینید: [`list`](#list)، [`open`](#open).

## `exec`

کد WebdriverIO را از stdin، ‏-e یا یک فایل اجرا می‌کند.

به‌صورت یک تابع async اجرا می‌شود که `browser`، `$`، `$$`، `expect` و `ref('e3')` در دسترس آن هستند. متغیرهای سطح بالا بین فراخوانی‌ها حفظ می‌شوند. اجرای `wdio session` بدون اکشن، وقتی کد از طریق stdin به آن pipe شود، `exec` را اجرا می‌کند.

همیشه دستورات را `await` کنید. `$` دقیقاً یک المنت برمی‌گرداند و وقتی بیش از یک المنت منطبق باشد StrictSelectorError پرتاب می‌کند. وقتی یک اکشن واحد (click، fill، …) کار را انجام می‌دهد آن را ترجیح دهید؛ برای حلقه‌ها، شرط‌ها و assertionها از `exec` استفاده کنید.

```sh
npx wdio session exec [file]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `file` | خیر | فایل اسکریپت (.js، .ts، .mjs) |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `-e, --eval <value>` | کدی که باید اجرا شود |
| `--history` | کد را در تاریخچه ثبت می‌کند (برای صرف‌نظر کردن از --no-history استفاده کنید) |

**مثال‌ها**

```sh
# اجرای یک دستور تک‌خطی
npx wdio session exec -e "await browser.getTitle()"

# assertion روی صفحه (نقل‌قول تکی، shell را از $ دور نگه می‌دارد)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# ارسال چند مرحله از طریق stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# اجرای یک فایل اسکریپت
npx wdio session exec ./scripts/login.ts
```

همچنین ببینید: [`helpers`](#helpers)، [`history`](#history)، [`export`](#export).

## `helpers`

helperهای پروژه را از .wdio/helpers فهرست می‌کند.

هر فایل در .wdio/helpers به‌صورت default یک تابع export می‌کند که browser را دریافت کرده و با addCommand دستورات سفارشی ثبت می‌کند. helperها هنگام باز شدن نشست بارگذاری می‌شوند و در تست خروجی‌گرفته‌شده به دستورات سفارشی تبدیل می‌شوند.

```sh
npx wdio session helpers
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--reload` | helperها را دوباره import می‌کند |

**مثال‌ها**

```sh
# فهرست helperها و دستوراتی که اضافه می‌کنند
npx wdio session helpers

# اعمال تغییرات انجام‌شده در یک helper
npx wdio session helpers --reload
```

همچنین ببینید: [`exec`](#exec)، [`export`](#export).

## `snapshot`

اسنپ‌شات دسترس‌پذیری همراه با refها. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

درخت دسترس‌پذیری را چاپ می‌کند، هر گره در یک خط، مثلاً `button "Add to cart" [ref=e3]`. یک ref را به click، fill، get و سایر اکشن‌ها بدهید. refها تا زمانی که المنت وجود دارد معتبر می‌مانند؛ اکشن روی المنتی که حذف شده با REF_STALE شکست می‌خورد.

هر اسنپ‌شات در پوشهٔ artifacts نوشته می‌شود. خروجی طولانی‌تر از --max-chars به‌صورت بخش‌بخش چاپ می‌شود: ابتدا بخش اول، سپس `--offset <line>` برای بخش بعدی. `find` در کل آن جستجو می‌کند.

چیدمان متنی و ساختار --json آزمایشی هستند و ممکن است در یک نسخهٔ minor تغییر کنند. سینتکس ref و اکشن‌هایی که ref می‌گیرند پایدار می‌مانند.

```sh
npx wdio session snapshot
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--depth <n>` | حداکثر عمق |
| `--scope <value>` | فقط زیر این ref یا selector اسنپ‌شات می‌گیرد |
| `-i, --interactive` | فقط المنت‌های تعاملی |
| `--all` | المنت‌های مخفی را هم شامل می‌شود |
| `--boxes` | کادرهای محدوده (bounding box) را اضافه می‌کند |
| `--viewport` | فقط آنچه در viewport است (وب: مبنای diff را به‌روز نمی‌کند) |
| `--selectors` | انتهای هر خط ref بهترین selector آن را اضافه می‌کند |
| `--compact` | گره‌های بی‌نامی که محتوایی ندارند را حذف می‌کند |
| `-u, --urls` | hrefهای لینک‌ها را شامل می‌شود |
| `--file-only` | فقط فایل را می‌نویسد |
| `--max-chars <n>` | در هر بار حداکثر این تعداد کاراکتر چاپ می‌کند (پیش‌فرض 8000) |
| `--offset <n>` | از این خط به بعد چاپ می‌کند، برای بخش بعدی یک اسنپ‌شات طولانی |

**مثال‌ها**

```sh
# فقط المنت‌های تعاملی، نگاه اولیهٔ معمول
npx wdio session snapshot -i

# کل صفحه همراه با مقصد لینک‌ها
npx wdio session snapshot --compact --urls

# فقط بخشی از صفحه
npx wdio session snapshot --scope "#checkout" --depth 4

# آنچه اکنون روی صفحه است
npx wdio session snapshot --viewport -i

# هر ref همراه با یک selector برای استفاده در تست
npx wdio session snapshot --selectors -i

# انجام اکشن، سپس نگاه دوباره
npx wdio session click e3 && npx wdio session snapshot -i
```

همچنین ببینید: [`find`](#find)، [`diff`](#diff)، [`screenshot`](#screenshot).

## `read`

متن صفحه را به‌صورت Markdown می‌خواند. برای وب کاربرد دارد.

سرتیترها، پاراگراف‌ها، آیتم‌های فهرست، ردیف‌های جدول و لینک‌ها همراه با URLشان را از محتوای اصلی (وقتی صفحه آن را با main یا article مشخص کرده باشد) و در غیر این صورت از کل صفحه می‌خواند؛ ناوبری، فوترها و متن مخفی کنار گذاشته می‌شوند. در --max-chars (پیش‌فرض 6000) بریده می‌شود؛ محل برش می‌گوید کدام --offset بخش بعدی را می‌خواند. با --scope، آن بخش به نمای دید اسکرول می‌شود. برای پاسخ به «صفحه چه می‌گوید» از آن استفاده کنید؛ برای ref‌هایی که بتوان روی آن‌ها اکشن انجام داد از snapshot یا find استفاده کنید.

```sh
npx wdio session read
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--scope <value>` | فقط زیر این ref یا selector را می‌خواند |
| `--max-chars <n>` | حداکثر این تعداد کاراکتر چاپ می‌کند (پیش‌فرض 6000) |
| `--offset <n>` | از این کاراکتر متن شروع می‌کند، برای بخش بعدی یک صفحهٔ طولانی |

**مثال‌ها**

```sh
# خواندن محتوای اصلی
npx wdio session read

# خواندن یک بخش
npx wdio session read --scope e12
```

همچنین ببینید: [`find`](#find)، [`snapshot`](#snapshot)، [`get`](#get).

## `find`

در یک اسنپ‌شات تازه به دنبال متن می‌گردد. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

یک اسنپ‌شات جدید می‌گیرد و هر نتیجه را همراه با گرهٔ اطراف آن (مثلاً کل آیتم فهرست، تا مقداری که کنار نتیجه است هم شامل شود)، با شمارهٔ خط و refها چاپ می‌کند و اولین نتیجه را به نمای دید اسکرول می‌کند. تطبیق ابتدا بدون توجه به حروف بزرگ و کوچک، سپس بدون توجه به فاصله‌ها ("SO2" عبارت "SO 2" را پیدا می‌کند) انجام می‌شود و سپس به دنبال همهٔ کلمات و کلمات مشابه آن‌ها می‌گردد. متنی که فقط در بخش‌های مخفی صفحه است (منوهای بسته، تب‌ها، "Show more") به همین صورت فهرست می‌شود. ارزان‌تر از خواندن کل اسنپ‌شات یک صفحهٔ بزرگ است. ‏-A/-B/-C به‌جای آن، مانند grep، خطوط ساده‌ای از context چاپ می‌کنند.

```sh
npx wdio session find <text>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `text` | بله | متن مورد جستجو |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--regex` | متن را به‌عنوان عبارت منظم در نظر می‌گیرد |
| `--scope <value>` | فقط زیر این ref یا selector جستجو می‌کند |
| `-C, --context <n>` | خطوط context قبل و بعد، به‌جای گرهٔ اطراف |
| `-A, --after-context <n>` | خطوط context بعد از هر نتیجه |
| `-B, --before-context <n>` | خطوط context قبل از هر نتیجه |
| `--offset <n>` | از این تعداد نتیجه صرف‌نظر می‌کند، برای نتایج بعدی وقتی خروجی بریده شده است |

**مثال‌ها**

```sh
# پیدا کردن ref یک دکمه
npx wdio session find "Add to cart"

# فهرست همهٔ لینک‌ها
npx wdio session find "^\s*link" --regex --context 0
```

همچنین ببینید: [`snapshot`](#snapshot)، [`wait`](#wait).

## `diff`

یک اسنپ‌شات تازه را با اسنپ‌شات قبلی مقایسه می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

یک unified diff از آنچه از آخرین اسنپ‌شات تغییر کرده چاپ می‌کند، یا "No changes". اولین فراخوانی یک مبنا ذخیره می‌کند. پس از یک اکشن از آن استفاده کنید تا ببینید آن اکشن چه کرد، بدون اینکه کل صفحه را دوباره بخوانید. در وب، مبنا آخرین اسنپ‌شاتی است که بدون `--viewport` گرفته شده است.

```sh
npx wdio session diff
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--baseline <value>` | فایل اسنپ‌شاتی که مقایسه با آن انجام می‌شود |
| `--scope <value>` | فقط درون این ref یا selector اسنپ‌شات می‌گیرد، مانند `snapshot --scope` |
| `--interactive` | فقط المنت‌های تعاملی، مانند `snapshot -i` |

**مثال‌ها**

```sh
# دیدن اینکه یک کلیک چه چیزی را تغییر داد
npx wdio session click e7 && npx wdio session diff

# مقایسه با یک اسنپ‌شات ذخیره‌شده
npx wdio session diff --baseline before.yml
```

همچنین ببینید: [`snapshot`](#snapshot)، [`find`](#find).

## `screenshot`

یک PNG از viewport، یک المنت یا کل صفحه ذخیره می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

مسیر فایل و اندازهٔ تصویر را چاپ می‌کند. وقتی سؤال دربارهٔ چیدمان یا ظاهر است اسکرین‌شات بگیرید؛ متن و وضعیت را با `snapshot` و `get` بخوانید.

```sh
npx wdio session screenshot [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | ref یا selector المنتی که باید ثبت شود |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--full` | کل صفحه (وب) |
| `--path <value>` | فایل خروجی |

**مثال‌ها**

```sh
# ثبت viewport
npx wdio session screenshot

# ثبت یک المنت
npx wdio session screenshot e5 --path card.png

# ثبت کل صفحه
npx wdio session screenshot --full
```

همچنین ببینید: [`visual`](#visual)، [`pdf`](#pdf)، [`snapshot`](#snapshot).

## `pdf`

صفحهٔ فعلی را به‌صورت PDF ذخیره می‌کند. برای وب کاربرد دارد.

`browser.savePDF` را فراخوانی می‌کند. یک نشست BiDi با `browsingContext.print`، به‌صورت headed یا headless، در Chrome، Edge و Firefox چاپ می‌کند. یک نشست Classic از `printPage` استفاده می‌کند که نسخه‌های قدیمی‌تر Chrome فقط در حالت headless از آن پشتیبانی می‌کنند.

```sh
npx wdio session pdf [file]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `file` | خیر | فایل خروجی (باید با .pdf تمام شود) |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--path <value>` | فایل خروجی (باید با .pdf تمام شود) |

**مثال‌ها**

```sh
# نوشتن report.pdf در پوشهٔ فعلی
npx wdio session pdf report.pdf
```

همچنین ببینید: [`screenshot`](#screenshot).

## `source`

HTML صفحه یا XML برنامه را ذخیره می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

فایل را می‌نویسد و مسیر و اندازهٔ آن را چاپ می‌کند. وقتی اسنپ‌شات چیزی را که نیاز دارید پنهان می‌کند، مانند attributeها برای یک selector، از آن استفاده کنید.

```sh
npx wdio session source
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--path <value>` | فایل خروجی |

**مثال‌ها**

```sh
# ذخیرهٔ HTML در پوشهٔ فعلی
npx wdio session source --path page.html
```

همچنین ببینید: [`snapshot`](#snapshot)، [`get`](#get).

## `get`

text، html، value، یک attribute، عنوان، URL، تعداد یا یک box را می‌خواند. برای وب کاربرد دارد.

مقدار را چاپ می‌کند و سپس کد WebdriverIO که اجرا کرده است (`→ …`). برای چاپ فقط مقدار، مثلاً برای ذخیرهٔ آن در یک متغیر shell، ‏-q را بدهید. پیش از نوشتن assertion برای یک مقدار، آن را بخوانید.

```sh
npx wdio session get <sub> [target] [name]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | خیر | ref یا selector (برای title و url استفاده نمی‌شود) |
| `name` | خیر | نام attribute (فقط برای attr) |

**مثال‌ها**

```sh
# متن یک ref
npx wdio session get text e1

# URL فعلی
npx wdio session get url

# فقط مقدار، برای یک متغیر shell
url=$(npx wdio session get url -q)

# href یک لینک
npx wdio session get attr e3 href

# تعداد المنت‌های منطبق
npx wdio session get count "aria/Remove"
```

همچنین ببینید: [`is`](#is)، [`wait`](#wait)، [`exec`](#exec).

## `is`

بررسی می‌کند که آیا یک المنت visible، enabled یا checked است. برای وب کاربرد دارد.

true یا false را چاپ می‌کند و سپس کد WebdriverIO که اجرا کرده است؛ برای چاپ فقط مقدار ‏-q را بدهید. کد خروج در هر دو حالت 0 است.

```sh
npx wdio session is <sub> <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | visible \| enabled \| checked |
| `target` | بله | ref یا selector |

**مثال‌ها**

```sh
# چاپ true یا false
npx wdio session is visible e1

# بررسی یک دکمه با برچسب آن
npx wdio session is enabled "aria/Place order"
```

همچنین ببینید: [`get`](#get)، [`wait`](#wait).

## `logs`

لاگ‌های کنسول، خطاهای صفحه، شبکه و دستگاه را از آخرین فراخوانی چاپ می‌کند. برای وب و موبایل native کاربرد دارد.

هر فراخوانی یک نشانگر خواندن را جلو می‌برد، بنابراین فراخوانی بعدی فقط ورودی‌های جدید را نشان می‌دهد. پس از یک اکشن آن را اجرا کنید تا خطاهایی که آن اکشن ایجاد کرده را ببینید.

```sh
npx wdio session logs
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--errors` | فقط خطاها |
| `--network` | فقط ورودی‌های شبکه |
| `--since <value>` | فقط ورودی‌های جدیدتر از این مدت (مثلاً 30s) |
| `--peek` | نشانگر خواندن را جلو نمی‌برد |
| `--source <browser\|driver\|logcat\|syslog\|main>` | منبع لاگ |

**مثال‌ها**

```sh
# خطاهای ناشی از یک کلیک
npx wdio session click e4 && npx wdio session logs --errors

# ورودی‌های اخیر، با نگه داشتن آن‌ها برای فراخوانی بعدی
npx wdio session logs --since 30s --peek
```

همچنین ببینید: [`requests`](#requests).

## `navigate`

یک URL را باز می‌کند. برای وب کاربرد دارد.

`example.com`، URLهای کامل و مسیرهای نسبی به baseUrl را می‌پذیرد. ابتدا از هر frame خارج می‌شود. URL و عنوان جدید را چاپ می‌کند.

```sh
npx wdio session navigate <url>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `url` | بله | URL (URLهای نسبی از baseUrl استفاده می‌کنند) |

**مثال‌ها**

```sh
# رفتن به یک صفحه و نگاه کردن به آن
npx wdio session navigate /cart && npx wdio session snapshot -i

# باز کردن یک سایت دیگر
npx wdio session navigate example.com
```

همچنین ببینید: [`back`](#back)، [`reload`](#reload)، [`wait`](#wait).

## `back`

به عقب برمی‌گردد. برای وب کاربرد دارد.

```sh
npx wdio session back
```

**مثال‌ها**

```sh
# برگشت یک صفحه به عقب
npx wdio session back
```

همچنین ببینید: [`forward`](#forward)، [`navigate`](#navigate).

## `forward`

به جلو می‌رود. برای وب کاربرد دارد.

```sh
npx wdio session forward
```

**مثال‌ها**

```sh
# رفتن یک صفحه به جلو
npx wdio session forward
```

همچنین ببینید: [`back`](#back)، [`navigate`](#navigate).

## `reload`

صفحه را دوباره بارگذاری می‌کند. برای وب کاربرد دارد.

```sh
npx wdio session reload
```

**مثال‌ها**

```sh
# بارگذاری مجدد و صبر تا آرام شدن شبکه
npx wdio session reload && npx wdio session wait --load networkidle
```

همچنین ببینید: [`navigate`](#navigate)، [`wait`](#wait).

## `wait`

منتظر یک المنت، متن، URL، وضعیت بارگذاری، شرط یا چند میلی‌ثانیه می‌ماند. برای وب کاربرد دارد.

دقیقاً یکی از این‌ها را بدهید: یک ref یا selector، ‏--text، ‏--url، ‏--load، ‏--fn یا میلی‌ثانیه. پس از --limit با کد خروج 1 شکست می‌خورد.

یک شرط را بر مکث ترجیح دهید، هم اینجا و هم به‌جای `sleep` در یک زنجیره. مکث طولانی‌تر از 30 ثانیه پذیرفته نمی‌شود.

```sh
npx wdio session wait [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | ref، selector یا میلی‌ثانیه |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--text <value>` | صبر تا زمانی که صفحه شامل این متن شود |
| `--url <value>` | صبر تا زمانی که URL منطبق شود (زیررشته، یا globهای * و **) |
| `--load <value>` | domcontentloaded، load یا networkidle |
| `--fn <value>` | صبر تا زمانی که این عبارت JavaScript درست شود |
| `--state <value>` | همراه با یک target: visible (پیش‌فرض)، hidden، enabled یا disabled |
| `--limit <n>` | میلی‌ثانیه‌های انتظار (پیش‌فرض 10000) |

**مثال‌ها**

```sh
# صبر تا visible شدن یک ref
npx wdio session wait e1

# صبر تا ناپدید شدن یک spinner
npx wdio session wait "aria/Loading" --state hidden

# انجام اکشن، صبر برای نتیجه، نگاه دوباره
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# صبر برای یک URL
npx wdio session wait --url "**/dashboard"

# صبر تا زمانی که هیچ درخواستی در جریان نباشد
npx wdio session wait --load networkidle

# مکث 500 میلی‌ثانیه
npx wdio session wait 500
```

همچنین ببینید: [`find`](#find)، [`is`](#is)، [`get`](#get).

## `click`

روی یک المنت کلیک می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

چاپ می‌کند روی چه چیزی کلیک شد و، وقتی کلیک باعث ناوبری شود، URL جدید را. پیش از استفاده از refها در صفحهٔ بعدی یک اسنپ‌شات جدید بگیرید. المنت مخفی یا پوشیده‌شده بلافاصله شکست می‌خورد و می‌گوید چه چیزی مانع است. `x,y` روی یک نقطه از viewport کلیک می‌کند (پیکسل از بالا-چپ، مانند اسکرین‌شات)، برای چیزهایی که ref ندارند، مانند canvas یا نقشه.

```sh
npx wdio session click <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12)، selector در WebdriverIO یا مختصات x,y در viewport |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--double` | دابل‌کلیک |
| `--right` | کلیک راست |
| `--new-tab` | لینک را در تب جدید باز می‌کند و به آن می‌رود |

**مثال‌ها**

```sh
# کلیک روی یک ref از آخرین اسنپ‌شات
npx wdio session click e3

# کلیک بر اساس نام دسترس‌پذیر
npx wdio session click "aria/Add to cart"

# کلیک، صبر، نگاه دوباره
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# باز کردن یک لینک در تب جدید
npx wdio session click e8 --new-tab

# کلیک روی یک نقطه از viewport، مثلاً روی نقشه
npx wdio session click 320,480
```

همچنین ببینید: [`tap`](#tap)، [`fill`](#fill)، [`wait`](#wait)، [`snapshot`](#snapshot).

## `tap`

روی یک المنت ضربه می‌زند (موبایل). برای موبایل native کاربرد دارد.

```sh
npx wdio session tap <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# ضربه روی یک ref از آخرین اسنپ‌شات
npx wdio session tap e2
```

همچنین ببینید: [`click`](#click)، [`long-press`](#long-press)، [`swipe`](#swipe).

## `fill`

مقدار یک input را جایگزین می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

ابتدا فیلد را پاک می‌کند. برای تایپ در هر چیزی که فوکوس دارد از `type` استفاده کنید؛ برای ارسال کلیدهایی مانند Enter از `press` استفاده کنید.

```sh
npx wdio session fill <target> <text..>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |
| `text` | بله | متن (کلمات پس از target با فاصله به هم متصل می‌شوند) |

**مثال‌ها**

```sh
# پر کردن یک فیلد
npx wdio session fill e2 ada@example.com

# پر کردن یک فرم و ارسال آن
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

همچنین ببینید: [`type`](#type)، [`press`](#press)، [`select`](#select)، [`check`](#check).

## `type`

در یک المنت یا المنت دارای فوکوس تایپ می‌کند. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

متن را به‌صورت فشردن کلیدها و بدون پاک کردن چیزی ارسال می‌کند: `type e2 Ada` در e2 تایپ می‌کند و `type Ada` در هر چیزی که فوکوس دارد. برای جایگزین کردن یک مقدار از `fill` استفاده کنید.

```sh
npx wdio session type <text..>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `text` | بله | متن (کلمات با فاصله به هم متصل می‌شوند). برای تایپ در یک المنت به‌جای المنت دارای فوکوس، با یک ref شروع کنید، مثلاً `type e2 Ada` |

**مثال‌ها**

```sh
# تایپ در یک فیلد
npx wdio session type e5 hello

# تایپ در هر چیزی که فوکوس دارد
npx wdio session focus e5 && npx wdio session type "hello"
```

همچنین ببینید: [`fill`](#fill)، [`press`](#press)، [`focus`](#focus).

## `press`

کلیدها را فشار می‌دهد، مثلاً Enter، ‏Control+a. برای وب و دسکتاپ native کاربرد دارد.

کلیدها را با + ترکیب کنید. نام‌ها به حروف بزرگ و کوچک حساس نیستند؛ ctrl، cmd، esc، up، down، left و right به‌عنوان شکل‌های کوتاه پذیرفته می‌شوند.

```sh
npx wdio session press <keys>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `keys` | بله | ترکیب کلیدها |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--times <n>` | این تعداد بار فشار می‌دهد (حداکثر 100)، مثلاً برای حرکت دادن یک slider |

**مثال‌ها**

```sh
# ارسال یک فرم
npx wdio session press Enter

# حرکت دادن یک slider دارای فوکوس به اندازهٔ پنج گام
npx wdio session press ArrowRight --times 5

# انتخاب همه
npx wdio session press Control+a

# برگرداندن فوکوس به عقب
npx wdio session press Shift+Tab
```

همچنین ببینید: [`type`](#type)، [`fill`](#fill).

## `select`

یک گزینه از `<select>` را انتخاب می‌کند. برای وب کاربرد دارد.

```sh
npx wdio session select <target> <value>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |
| `value` | بله | متن، مقدار یا اندیس گزینه |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--by <text\|value\|index>` | نحوهٔ تطبیق گزینه (پیش‌فرض text) |

**مثال‌ها**

```sh
# انتخاب بر اساس متن قابل مشاهده
npx wdio session select e6 Germany

# انتخاب بر اساس مقدار
npx wdio session select e6 de --by value
```

همچنین ببینید: [`fill`](#fill)، [`check`](#check).

## `upload`

یک input فایل را مقداردهی می‌کند. برای وب کاربرد دارد.

مسیر نسبت به پوشهٔ کاری شماست. خود `<input type="file">` را هدف بگیرید، نه دکمه‌ای که انتخابگر فایل را باز می‌کند.

```sh
npx wdio session upload <target> <file>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |
| `file` | بله | فایلی که باید آپلود شود |

**مثال‌ها**

```sh
# پیوست کردن یک فایل
npx wdio session upload e9 ./fixtures/avatar.png
```

همچنین ببینید: [`fill`](#fill).

## `hover`

نشانگر را روی یک المنت می‌برد. برای وب و دسکتاپ native کاربرد دارد.

```sh
npx wdio session hover <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# باز کردن یک منوی hover و نگاه کردن به آن
npx wdio session hover e4 && npx wdio session snapshot -i
```

همچنین ببینید: [`click`](#click).

## `focus`

روی یک المنت فوکوس می‌کند. برای وب کاربرد دارد.

```sh
npx wdio session focus <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# فوکوس روی یک فیلد پیش از `type`
npx wdio session focus e5
```

همچنین ببینید: [`type`](#type)، [`press`](#press).

## `check`

یک checkbox یا radio را تیک می‌زند. برای وب کاربرد دارد.

وقتی از قبل تیک خورده باشد کاری نمی‌کند و وقتی در نهایت تیک‌خورده نباشد شکست می‌خورد.

```sh
npx wdio session check <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# پذیرفتن شرایط
npx wdio session check e7
```

همچنین ببینید: [`uncheck`](#uncheck)، [`is`](#is).

## `uncheck`

تیک یک checkbox را برمی‌دارد. برای وب کاربرد دارد.

وقتی از قبل تیک نخورده باشد کاری نمی‌کند. تیک یک radio button انتخاب‌شده را نمی‌توان برداشت.

```sh
npx wdio session uncheck <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# انصراف از خبرنامه
npx wdio session uncheck e7
```

همچنین ببینید: [`check`](#check)، [`is`](#is).

## `drag`

یک المنت را روی المنت دیگری می‌کشد. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

```sh
npx wdio session drag <from> <to>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `from` | بله | ref یا selector برای کشیدن |
| `to` | بله | ref یا selector برای رها کردن روی آن |

**مثال‌ها**

```sh
# انتقال یک کارت به ستون دیگر
npx wdio session drag e3 e9
```

همچنین ببینید: [`scroll`](#scroll).

## `scroll`

یک المنت را به نمای دید اسکرول می‌کند یا صفحه را اسکرول می‌کند. برای وب کاربرد دارد.

بدون target، ‏600px به پایین اسکرول می‌کند. محتوای lazy-load در اسنپ‌شات بعدی نمایان می‌شود.

```sh
npx wdio session scroll [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | ref، selector، up، down، top یا bottom |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--px <n>` | پیکسل برای up/down (پیش‌فرض 600) |

**مثال‌ها**

```sh
# آوردن یک المنت به نمای دید
npx wdio session scroll e40

# بارگذاری نتایج بیشتر و نگاه کردن به آن‌ها
npx wdio session scroll bottom && npx wdio session snapshot -i

# اسکرول به اندازهٔ دو صفحه
npx wdio session scroll down --px 1200
```

همچنین ببینید: [`swipe`](#swipe)، [`snapshot`](#snapshot).

## `swipe`

صفحه را سوایپ می‌کند (موبایل). برای موبایل native کاربرد دارد.

```sh
npx wdio session swipe <direction>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `direction` | بله | up \| down \| left \| right |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--percent <n>` | طول سوایپ بین 0..1 |

**مثال‌ها**

```sh
# اسکرول یک فهرست و نگاه کردن به آن
npx wdio session swipe up && npx wdio session snapshot
```

همچنین ببینید: [`scroll`](#scroll)، [`tap`](#tap).

## `long-press`

روی یک المنت فشار طولانی می‌دهد (موبایل). برای موبایل native کاربرد دارد.

```sh
npx wdio session long-press <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref (e12) یا selector در WebdriverIO |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--duration <n>` | میلی‌ثانیه |

**مثال‌ها**

```sh
# باز کردن یک منوی context
npx wdio session long-press e4 --duration 1500
```

همچنین ببینید: [`tap`](#tap).

## `tabs`

تب‌ها را فهرست می‌کند، باز می‌کند، بین آن‌ها جابه‌جا می‌شود یا آن‌ها را می‌بندد. برای وب کاربرد دارد.

بدون زیردستور، تب‌ها را همراه با اندیسشان فهرست می‌کند؛ تب فعلی علامت‌گذاری می‌شود. `new` یک تب باز می‌کند و به آن می‌رود. `switch` و `close` یک اندیس یا handle می‌گیرند.

```sh
npx wdio session tabs [sub] [arg]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | switch \| new \| close |
| `arg` | خیر | اندیس، handle یا URL |

**مثال‌ها**

```sh
# فهرست تب‌ها
npx wdio session tabs

# باز کردن یک تب
npx wdio session tabs new http://localhost:3000/help

# برگشت به اولین تب
npx wdio session tabs switch 0

# بستن تب دوم
npx wdio session tabs close 1
```

همچنین ببینید: [`windows`](#windows)، [`frame`](#frame).

## `windows`

پنجره‌ها را فهرست می‌کند یا بین آن‌ها جابه‌جا می‌شود. برای وب و دسکتاپ native کاربرد دارد.

```sh
npx wdio session windows [sub] [arg]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | switch |
| `arg` | خیر | اندیس یا handle |

**مثال‌ها**

```sh
# فهرست پنجره‌ها
npx wdio session windows

# رفتن به پنجرهٔ دوم
npx wdio session windows switch 1
```

همچنین ببینید: [`tabs`](#tabs).

## `frame`

به یک iframe، به والد یا به بالاترین سطح می‌رود. برای وب کاربرد دارد.

اسنپ‌شات صفحه از قبل محتوای iframeهای آن را همراه با refهایی که اکشن‌ها مستقیماً از آن‌ها استفاده می‌کنند نشان می‌دهد، بنابراین `frame` فقط زمانی لازم است که بخواهید مدتی درون یک frame کار کنید یا frameی را ببینید که اسنپ‌شات آن را کوتاه کرده است. اسنپ‌شات‌ها و اکشن‌ها تا زمانی که برگردید روی frame فعلی اعمال می‌شوند. `navigate` به سند بالاترین سطح برمی‌گردد.

```sh
npx wdio session frame <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref، selector، parent یا top |

**مثال‌ها**

```sh
# ورود به یک iframe و نگاه به داخل آن
npx wdio session frame e12 && npx wdio session snapshot -i

# برگشت به صفحه
npx wdio session frame top
```

همچنین ببینید: [`tabs`](#tabs)، [`snapshot`](#snapshot).

## `contexts`

contextهای native/webview را فهرست می‌کند یا بین آن‌ها جابه‌جا می‌شود. برای موبایل native کاربرد دارد.

```sh
npx wdio session contexts [sub] [name]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | switch |
| `name` | خیر | نام context |

**مثال‌ها**

```sh
# فهرست contextهای NATIVE_APP و WEBVIEW
npx wdio session contexts

# کنترل webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

همچنین ببینید: [`snapshot`](#snapshot).

## `dialog`

یک dialog باز را می‌پذیرد، رد می‌کند یا وضعیت آن را گزارش می‌دهد. برای وب و موبایل native کاربرد دارد.

یک alert، confirm یا prompt باز سایر اکشن‌ها را مسدود می‌کند و آن‌ها با راهنمایی برای اجرای این دستور شکست می‌خورند.

```sh
npx wdio session dialog <sub>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | accept \| dismiss \| status |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--text <value>` | متن prompt (فقط برای accept) |

**مثال‌ها**

```sh
# نمایش dialog باز
npx wdio session dialog status

# تأیید
npx wdio session dialog accept

# پاسخ به یک prompt
npx wdio session dialog accept --text "Ada"
```

همچنین ببینید: [`click`](#click).

## `app`

یک برنامه را اجرا، متوقف یا نصب می‌کند یا وضعیت آن را می‌پرسد. برای موبایل native و دسکتاپ native کاربرد دارد.

```sh
npx wdio session app <sub> <id>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | launch \| terminate \| install \| state |
| `id` | بله | شناسهٔ برنامه، bundle id یا فایل |

**مثال‌ها**

```sh
# راه‌اندازی مجدد برنامه
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# آیا در حال اجراست؟
npx wdio session app state com.example.shop
```

همچنین ببینید: [`deeplink`](#deeplink)، [`background`](#background).

## `deeplink`

یک deep link را باز می‌کند. برای موبایل native کاربرد دارد.

```sh
npx wdio session deeplink <url>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `url` | بله | URL |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--package <value>` | پکیج Android یا bundle id در iOS |

**مثال‌ها**

```sh
# باز کردن صفحهٔ یک محصول
npx wdio session deeplink shop://product/42 --package com.example.shop
```

همچنین ببینید: [`app`](#app).

## `rotate`

دستگاه را می‌چرخاند. برای موبایل native کاربرد دارد.

```sh
npx wdio session rotate <orientation>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `orientation` | بله | portrait \| landscape |

**مثال‌ها**

```sh
# چرخاندن دستگاه به حالت افقی
npx wdio session rotate landscape
```

## `keyboard`

صفحه‌کلید روی صفحه را پنهان می‌کند. برای موبایل native کاربرد دارد.

```sh
npx wdio session keyboard <sub>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | hide |

**مثال‌ها**

```sh
# آشکار کردن المنت‌های زیر صفحه‌کلید
npx wdio session keyboard hide
```

## `background`

برنامه را به پس‌زمینه می‌فرستد. برای موبایل native کاربرد دارد.

```sh
npx wdio session background <seconds>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `seconds` | بله | ثانیه (مقدار -1 آن را همان‌جا نگه می‌دارد) |

**مثال‌ها**

```sh
# فرستادن برنامه به پس‌زمینه به مدت 3 ثانیه
npx wdio session background 3
```

همچنین ببینید: [`app`](#app).

## `lock`

دستگاه را قفل می‌کند. برای موبایل native کاربرد دارد.

```sh
npx wdio session lock
```

**مثال‌ها**

```sh
# قفل کردن صفحه
npx wdio session lock
```

همچنین ببینید: [`unlock`](#unlock).

## `unlock`

قفل دستگاه را باز می‌کند. برای موبایل native کاربرد دارد.

```sh
npx wdio session unlock
```

**مثال‌ها**

```sh
# باز کردن قفل صفحه
npx wdio session unlock
```

همچنین ببینید: [`lock`](#lock).

## `geolocation`

موقعیت جغرافیایی را تنظیم می‌کند. برای وب و موبایل native کاربرد دارد.

```sh
npx wdio session geolocation <lat> <lon>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `lat` | بله | عرض جغرافیایی |
| `lon` | بله | طول جغرافیایی |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--accuracy <n>` | دقت بر حسب متر |

**مثال‌ها**

```sh
# وانمود به حضور در برلین
npx wdio session geolocation 52.52 13.405
```

همچنین ببینید: [`emulate`](#emulate).

## `emulate`

یک دستگاه، viewport، شبکه، cpu، ساعت یا یک محدودهٔ شبیه‌سازی BiDi را شبیه‌سازی می‌کند. برای وب کاربرد دارد.

یک شبیه‌سازی تا زمان `emulate reset` یا پایان نشست باقی می‌ماند؛ تنظیم دوبارهٔ همان نوع، جایگزین آن می‌شود. `emulate device` بدون مقدار، نام دستگاه‌ها را فهرست می‌کند. پیش‌تنظیم‌های شبکه و محدودسازی cpu به یک مرورگر Chromium نیاز دارند.

```sh
npx wdio session emulate <sub> [value]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | خیر | مقدار برای شبیه‌سازی |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--dpr <n>` | نسبت پیکسل دستگاه (viewport) |
| `--tick <n>` | ساعت شبیه‌سازی‌شده را به اندازهٔ ms جلو می‌برد (clock) |

**مثال‌ها**

```sh
# شبیه‌سازی یک گوشی
npx wdio session emulate device "iPhone 15"

# تنظیم viewport
npx wdio session emulate viewport 375x812 --dpr 3

# آفلاین شدن
npx wdio session emulate network offline

# حالت تاریک
npx wdio session emulate color-scheme dark

# ثابت کردن تاریخ
npx wdio session emulate clock 2030-01-01T00:00:00Z

# کاهش حرکت
npx wdio session emulate media prefersReducedMotion=reduce

# لغو همهٔ شبیه‌سازی‌ها
npx wdio session emulate reset
```

همچنین ببینید: [`geolocation`](#geolocation)، [`screenshot`](#screenshot).

## `requests`

درخواست‌های شبکهٔ ضبط‌شده را فهرست می‌کند (BiDi). برای وب کاربرد دارد.

```sh
npx wdio session requests
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--filter <value>` | زیررشته یا glob |
| `--failed` | فقط درخواست‌های ناموفق |
| `--since <value>` | فقط درخواست‌های جدیدتر از این مدت |
| `--limit <n>` | حداکثر تعداد خطوط (پیش‌فرض 50) |

**مثال‌ها**

```sh
# فقط فراخوانی‌های API
npx wdio session requests --filter "**/api/**"

# درخواست‌هایی که یک کلیک خراب کرد
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

همچنین ببینید: [`mock`](#mock)، [`logs`](#logs).

## `mock`

پاسخ‌ها را برای یک الگوی URL شبیه‌سازی (mock) می‌کند (BiDi). برای وب کاربرد دارد.

شناسهٔ mock را چاپ می‌کند (m1، m2، …). mock کردن دوبارهٔ همان الگو، جایگزین mock قبلی می‌شود.

```sh
npx wdio session mock <pattern>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `pattern` | بله | الگوی URL |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--status <n>` | کد وضعیت |
| `--body <value>` | بدنه به‌صورت JSON/متن یا مسیر یک فایل |
| `--header <value>` | هدر به شکل k:v (قابل تکرار) |
| `--abort` | درخواست‌های منطبق را لغو می‌کند |
| `--method <value>` | فقط این method |
| `--once` | فقط درخواست بعدی |

**مثال‌ها**

```sh
# برگرداندن JSON ثابت
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# شکست دادن درخواست بعدی
npx wdio session mock "**/api/cart" --status 500 --once

# مسدود کردن تصاویر
npx wdio session mock "**/*.png" --abort
```

همچنین ببینید: [`unmock`](#unmock)، [`requests`](#requests).

## `unmock`

mockها را حذف می‌کند. برای وب کاربرد دارد.

```sh
npx wdio session unmock [pattern]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `pattern` | خیر | الگو یا شناسهٔ mock |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--all` | همهٔ mockها را حذف می‌کند |

**مثال‌ها**

```sh
# حذف یک mock
npx wdio session unmock m1

# حذف همهٔ mockها
npx wdio session unmock --all
```

همچنین ببینید: [`mock`](#mock).

## `cookies`

کوکی‌ها را می‌خواند، تنظیم یا پاک می‌کند. برای وب کاربرد دارد.

بدون زیردستور، همهٔ کوکی‌ها را به شکل name=value چاپ می‌کند. `clear` بدون نام، همهٔ کوکی‌ها را حذف می‌کند.

```sh
npx wdio session cookies [sub] [name] [value]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | get \| set \| clear |
| `name` | خیر | نام کوکی |
| `value` | خیر | مقدار کوکی |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--domain <value>` | دامنهٔ کوکی (set) |
| `--path <value>` | مسیر کوکی (set) |
| `--http-only` | کوکی HttpOnly ‏(set) |
| `--secure` | کوکی Secure ‏(set) |
| `--same-site <value>` | lax، strict، none یا default ‏(set) |
| `--expiry <n>` | زمان انقضا به‌صورت Unix timestamp بر حسب ثانیه (set) |

**مثال‌ها**

```sh
# فهرست کوکی‌ها
npx wdio session cookies

# مقدار یک کوکی
npx wdio session cookies get session

# تنظیم یک کوکی و بارگذاری مجدد
npx wdio session cookies set session abc && npx wdio session reload

# حذف همهٔ کوکی‌ها
npx wdio session cookies clear
```

همچنین ببینید: [`storage`](#storage)، [`state`](#state).

## `storage`

localStorage (یا sessionStorage) را می‌خواند، تنظیم یا پاک می‌کند. برای وب کاربرد دارد.

بدون زیردستور، همهٔ ورودی‌ها را چاپ می‌کند. `clear` بدون کلید، مخزن را خالی می‌کند.

```sh
npx wdio session storage [sub] [key] [value]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | get \| set \| clear |
| `key` | خیر | کلید |
| `value` | خیر | مقدار |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--session-storage` | از sessionStorage استفاده می‌کند |

**مثال‌ها**

```sh
# فهرست localStorage
npx wdio session storage

# تنظیم یک کلید
npx wdio session storage set token abc

# خالی کردن sessionStorage
npx wdio session storage clear --session-storage
```

همچنین ببینید: [`cookies`](#cookies)، [`state`](#state).

## `state`

کوکی‌ها و storage را ذخیره یا بارگذاری می‌کند. برای وب کاربرد دارد.

`save` کوکی‌ها، localStorage و sessionStorage مربوط به origin فعلی را در یک فایل JSON می‌نویسد. `load` آن origin را باز می‌کند و آن‌ها را بازیابی می‌کند، مثلاً برای رد شدن از مرحلهٔ ورود.

```sh
npx wdio session state <sub> <file>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | save \| load |
| `file` | بله | فایل وضعیت |

**مثال‌ها**

```sh
# ذخیرهٔ وضعیت واردشده
npx wdio session state save .wdio/logged-in.json

# شروع در حالت واردشده
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

همچنین ببینید: [`cookies`](#cookies)، [`storage`](#storage).

## `visual`

اسنپ‌شات‌های بصری از طریق @wdio/visual-service. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

`save` یک مبنا در .wdio/visual/baseline ذخیره می‌کند، `check` با آن مقایسه کرده و میزان عدم تطابق را چاپ می‌کند، `accept` آخرین تصویر واقعی را به مبنا تبدیل می‌کند و `list` تگ‌ها را نشان می‌دهد. به @wdio/visual-service در پروژه نیاز دارد.

```sh
npx wdio session visual <sub> [tag]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | save \| check \| accept \| list |
| `tag` | خیر | تگ تصویر |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--element <value>` | فقط این المنت |
| `--full` | کل صفحه |
| `--tabbable` | صفحهٔ tabbable |
| `--threshold <n>` | عدم تطابق مجاز بر حسب درصد (پیش‌فرض 0) |
| `--all` | accept: همهٔ تگ‌ها |

**مثال‌ها**

```sh
# ذخیرهٔ یک مبنا
npx wdio session visual save cart

# مقایسه با آن
npx wdio session visual check cart --threshold 0.5

# پذیرفتن یک تغییر عمدی
npx wdio session visual accept cart
```

همچنین ببینید: [`screenshot`](#screenshot).

## `trace`

هر مرحله را همراه با اسکرین‌شات‌ها و اسنپ‌شات‌ها ضبط می‌کند.

`stop` پوشهٔ trace و رونوشتی از مراحل را چاپ می‌کند.

```sh
npx wdio session trace <sub>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | start \| stop |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--screenshots` | اسکرین‌شات پس از هر مرحله (برای صرف‌نظر کردن از --no-screenshots استفاده کنید) |
| `--snapshots` | اسنپ‌شات پس از هر مرحله (برای صرف‌نظر کردن از --no-snapshots استفاده کنید) |

**مثال‌ها**

```sh
# شروع trace
npx wdio session trace start

# توقف و چاپ رونوشت
npx wdio session trace stop
```

همچنین ببینید: [`record`](#record)، [`history`](#history).

## `record`

ویدیو ضبط می‌کند. برای وب و موبایل native کاربرد دارد.

```sh
npx wdio session record <sub>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | start \| stop |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--fps <n>` | فریم در ثانیه (پیش‌فرض 5) |
| `--path <value>` | فایل خروجی |

**مثال‌ها**

```sh
# شروع ضبط
npx wdio session record start

# توقف و ذخیرهٔ ویدیو
npx wdio session record stop --path checkout.mp4
```

همچنین ببینید: [`trace`](#trace)، [`screenshot`](#screenshot).

## `history`

مراحل ضبط‌شده را چاپ می‌کند.

هر اکشنی که صفحه را تغییر می‌دهد، کد WebdriverIO که اجرا کرده را ثبت می‌کند. `export` این تاریخچه را به یک spec تبدیل می‌کند.

```sh
npx wdio session history
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--clear` | تاریخچه را پاک می‌کند |

**مثال‌ها**

```sh
# نمایش مراحل تا اینجا
npx wdio session history

# شروع دوبارهٔ ضبط پیش از مراحلی که می‌خواهید نگه دارید
npx wdio session history --clear
```

همچنین ببینید: [`export`](#export)، [`exec`](#exec).

## `export`

از تاریخچه یک spec تولید می‌کند.

یک spec به شکل describe/it با مراحل ضبط‌شده می‌نویسد. refها به selectorهای پایدار و helperها به دستورات سفارشی تبدیل می‌شوند. بدون --out، فایل در پوشهٔ artifacts قرار می‌گیرد. آن را با `wdio run` اجرا کنید تا از موفق بودنش مطمئن شوید.

```sh
npx wdio session export
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--out <value>` | فایل خروجی |
| `--title <value>` | عنوان suite |
| `--page-objects` | page objectها را تولید می‌کند |
| `--framework <mocha\|jasmine>` | فریم‌ورک (پیش‌فرض mocha) |

**مثال‌ها**

```sh
# نوشتن spec
npx wdio session export --out test/specs/cart.e2e.ts

# نوشتن spec و اجرای آن
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

همچنین ببینید: [`history`](#history)، [`helpers`](#helpers).

## `resume`

تستی را که با wdio run --debug=agent متوقف شده ادامه می‌دهد.

`wdio run --debug=agent` یک تست در حال شکست را متوقف می‌کند و آن را به‌عنوان نشست debug-`<worker>` در دسترس قرار می‌دهد. با هر اکشنی آن را بررسی کنید و سپس ادامه دهید. اجرای `close` روی آن نشست، به‌جای آن، باعث شکست تست می‌شود.

```sh
npx wdio session resume
```

**مثال‌ها**

```sh
# نگاه به تست متوقف‌شده و سپس ادامهٔ آن
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

همچنین ببینید: [`close`](#close)، [`list`](#list).

## `doctor`

محیط شما را بررسی می‌کند.

برای هر بررسی یک خط چاپ می‌کند و برای هر شکست، راه‌حلی ارائه می‌دهد. وقتی یک بررسی شکست بخورد با کد 1 خارج می‌شود.

```sh
npx wdio session doctor [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | فقط آنچه این هدف نیاز دارد را بررسی می‌کند |

**مثال‌ها**

```sh
# بررسی همه چیز
npx wdio session doctor

# بررسی آنچه یک نشست Android نیاز دارد
npx wdio session doctor android
```

همچنین ببینید: [`open`](#open).

## `skill`

skill مربوط به agent را چاپ می‌کند.

```sh
npx wdio session skill
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--install <value>` | آن را در .agents/skills/wdio-session/SKILL.md (یا در این پوشه) می‌نویسد |

**مثال‌ها**

```sh
# چاپ skill
npx wdio session skill

# افزودن آن به این پروژه
npx wdio session skill --install .
```