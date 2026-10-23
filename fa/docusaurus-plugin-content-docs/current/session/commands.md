---
id: session-commands
title: دستورات wdio session
description: تمام اکشن‌ها و فلگ‌های wdio session، از open تا doctor و skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

این صفحه تمام اکشن‌های `wdio session` را شرح می‌دهد. فلگ‌های سراسری روی همه‌ی آن‌ها اعمال می‌شوند. همین متن توسط `npx wdio session <action> --help` نیز چاپ می‌شود. بقیه‌ی بخش [WebdriverIO Session](/docs/session) موضوعات [targetها](/docs/session/targets)، [snapshotها](/docs/session/snapshots)، [`exec`](/docs/session/exec)، [export](/docs/session/export) و [دیباگ](/docs/session/debug) را پوشش می‌دهد.

```sh
npx wdio session <action> [arguments] [flags]
```

## فلگ‌های سراسری

| فلگ | توضیحات |
| --- | --- |
| `-s, --session` | نام session (متغیر محیطی WDIO_SESSION، پیش‌فرض "default") |
| `--json` | چاپ یک شیء JSON (متغیر محیطی WDIO_SESSION_JSON=1) |
| `--timeout` | مهلت زمانی درخواست بر حسب میلی‌ثانیه (حداکثر 60000، به جز برای wait) |
| `-q, --quiet` | در صورت موفقیت چیزی جز داده‌ی درخواست‌شده چاپ نمی‌شود |
| `--color` | برای غیرفعال کردن رنگ‌ها از --no-color استفاده کنید |

کدهای خروج: 0 موفقیت، 1 شکست اکشن یا کد شما، 2 خطای نحوه‌ی استفاده، 3 نبودِ وابستگی یا اعتبارنامه، 4 نبودِ session با آن نام.

## `open`

شروع یک session: browser، android، ios، macos، windows، electron، tauri، dioxus یا یک فایل پیکربندی wdio.

یک daemon پس‌زمینه راه‌اندازی می‌کند که session را تا زمان `close`، یا تا زمانی که به مدت --idle-timeout (پیش‌فرض 30m) بیکار بماند، زنده نگه می‌دارد. مرورگرها به صورت headless اجرا می‌شوند مگر اینکه --headed را بدهید. نام session، target، پوشه‌ی artifacts که snapshotها، اسکرین‌شات‌ها و خروجی‌ها در آن ذخیره می‌شوند، و برای مرورگری که روی یک URL باز شده، snapshot تعاملی آن صفحه را چاپ می‌کند.

برای هر نام فقط یک session وجود دارد. باز کردن نامی که در حال اجراست با شکست مواجه می‌شود؛ از آن استفاده کنید، آن را ببندید، یا --replace را بدهید. فقط زمانی `-s <name>` را بدهید که به دو session هم‌زمان نیاز دارید.

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
| `--replace` | ابتدا session در حال اجرا با همین نام را ببند |
| `--launch-timeout <n>` | میلی‌ثانیه‌های انتظار برای آماده شدن session |
| `--idle-timeout <value>` | خاموش شدن پس از این مدت بدون درخواست (مثلاً 30m، مقدار 0 غیرفعال می‌کند) |
| `--capabilities <value>` | capabilityهای اضافی به صورت JSON یا مسیر یک فایل JSON |
| `--hostname <value>` | میزبان WebDriver راه دور |
| `--port <n>` | پورت WebDriver راه دور |
| `--path <value>` | مسیر WebDriver راه دور |
| `--protocol <value>` | پروتکل WebDriver راه دور |
| `--log-level <value>` | سطح لاگ WebdriverIO که در daemon.log نوشته می‌شود |
| `--bidi` | درخواست WebDriver BiDi (برای غیرفعال کردن از --no-bidi استفاده کنید) |
| `--headed` | نمایش پنجره‌ی مرورگر |
| `--headless` | اجرا بدون پنجره (پیش‌فرض برای مرورگرها؛ --headed را باطل می‌کند) |
| `--snapshot` | چاپ snapshot تعاملی صفحه‌ی باز‌شده (برای رد کردن از --no-snapshot استفاده کنید) |
| `--viewport <value>` | viewport اولیه، مثلاً 1280x720 |
| `--browser-version <value>` | نسخه‌ی مرورگر |
| `--binary <value>` | فایل اجرایی مرورگر |
| `--arg <value>` | آرگومان اضافی مرورگر. مقداری که با `-` شروع می‌شود به `=` نیاز دارد، مثلاً `--arg=--disable-gpu` (قابل تکرار) |
| `--profile <value>` | پوشه‌ی پروفایل ماندگار |
| `--attach <value>` | اتصال به یک Chrome/Edge در حال اجرا (پورت دیباگ یا URL) |
| `--app <value>` | فایل برنامه یا URL برنامه‌ی ابری |
| `--package <value>` | package برنامه‌ی Android |
| `--activity <value>` | activity برنامه‌ی Android |
| `--bundle-id <value>` | bundle id در iOS/macOS |
| `--browser <value>` | مرورگر وب موبایل (chrome، safari) |
| `--device <value>` | نام دستگاه |
| `--platform-version <value>` | نسخه‌ی پلتفرم |
| `--udid <value>` | UDID دستگاه |
| `--reset` | برای حفظ وضعیت برنامه از --no-reset استفاده کنید (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | جهت اولیه‌ی صفحه |
| `--appium-url <value>` | استفاده از یک سرور Appium در حال اجرا |
| `--app-arg <value>` | آرگومانی که به برنامه‌ی دسکتاپ داده می‌شود. مقداری که با `-` شروع می‌شود به `=` نیاز دارد، مثلاً `--app-arg=--no-sandbox` (قابل تکرار) |
| `--chromedriver <value>` | Electron: فایل اجرایی Chromedriver |
| `--electron-version <value>` | Electron: نادیده گرفتن تشخیص خودکار نسخه |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | ارائه‌دهنده‌ی ابری |
| `--os <value>` | ابری: سیستم‌عامل دسکتاپ |
| `--os-version <value>` | ابری: نسخه‌ی سیستم‌عامل دسکتاپ |
| `--region <value>` | ابری: منطقه‌ی Sauce Labs |
| `--tunnel <value>` | ابری: راه‌اندازی تونل ارائه‌دهنده (یا "external") |
| `--tunnel-name <value>` | ابری: شناسه‌ی تونل |
| `--project <value>` | ابری: برچسب پروژه |
| `--build <value>` | ابری: برچسب build |
| `--name <value>` | ابری: برچسب نام session |

**مثال‌ها**

```sh
# باز کردن Chrome به صورت headless روی یک برنامه‌ی محلی
npx wdio session open chrome http://localhost:3000

# باز کردن Firefox با پنجره‌ی قابل مشاهده
npx wdio session open firefox http://localhost:3000 --headed

# باز کردن یک برنامه‌ی Android از طریق Appium
npx wdio session open android --app ./app.apk

# باز کردن یک برنامه‌ی نصب‌شده‌ی iOS
npx wdio session open ios --bundle-id com.example.shop

# باز کردن یک برنامه‌ی Electron
npx wdio session open electron ./main.js

# باز کردن اولین capability یک پیکربندی
npx wdio session open ./wdio.conf.ts 0

# باز کردن Chrome در یک grid ابری
npx wdio session open chrome https://example.com --provider browserstack
```

همچنین ببینید: [`snapshot`](#snapshot)، [`close`](#close)، [`doctor`](#doctor).

## `close`

پایان دادن به session و متوقف کردن daemon آن.

روی sessionی که توسط `wdio run --debug=agent` باز شده، این کار تست متوقف‌شده را ناموفق می‌کند؛ برای ادامه‌ی آن از `resume` استفاده کنید.

```sh
npx wdio session close
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--all` | بستن همه‌ی sessionها |
| `--clean` | پوشه‌ی artifacts را نیز حذف کن |

**مثال‌ها**

```sh
# بستن session پیش‌فرض
npx wdio session close

# بستن همه‌ی sessionها و حذف artifactهای آن‌ها
npx wdio session close --all --clean
```

همچنین ببینید: [`open`](#open)، [`list`](#list).

## `list`

فهرست sessionهای در حال اجرا.

برای هر session یک خط چاپ می‌کند: نام، target، URL و مدت عمر. وضعیت باقی‌مانده از sessionهایی که از کار افتاده‌اند را پاک می‌کند.

```sh
npx wdio session list
```

**مثال‌ها**

```sh
# نمایش همه‌ی sessionهای در حال اجرا
npx wdio session list
```

همچنین ببینید: [`info`](#info)، [`status`](#status).

## `info`

نمایش جزئیات session.

target، مرورگر و نسخه‌ی آن، پشتیبانی از BiDi، پوشه‌ی artifacts، و URL فعلی، عنوان، اندازه‌ی پنجره و frame (وب) یا context و activity (موبایل) را چاپ می‌کند.

```sh
npx wdio session info
```

**مثال‌ها**

```sh
# نمایش اینکه session کجاست و چه چیزی را اجرا می‌کند
npx wdio session info
```

همچنین ببینید: [`list`](#list)، [`get`](#get).

## `restart`

بستن و باز کردن مجدد با همان target و فلگ‌ها.

تاریخچه‌ی ثبت‌شده را حفظ می‌کند، بنابراین `export` همچنان مراحل قبل از راه‌اندازی مجدد را پوشش می‌دهد.

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

اگر session در حال اجرا باشد با کد 0 و در غیر این صورت با کد 4 خارج می‌شود.

```sh
npx wdio session status
```

**مثال‌ها**

```sh
# باز کردن session فقط زمانی که هیچ sessionی در حال اجرا نیست
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

همچنین ببینید: [`list`](#list)، [`open`](#open).

## `exec`

اجرای کد WebdriverIO از stdin، ‏-e یا یک فایل.

به صورت یک تابع async اجرا می‌شود که `browser`، `$`، `$$`، `expect` و `ref('e3')` در دسترس آن هستند. متغیرهای سطح بالا بین فراخوانی‌ها حفظ می‌شوند. `wdio session` بدون اکشن، زمانی که کد از طریق stdin به آن pipe شود، `exec` را اجرا می‌کند.

همیشه دستورات را `await` کنید. `$` دقیقاً یک عنصر برمی‌گرداند و زمانی که بیش از یک عنصر مطابقت داشته باشد StrictSelectorError پرتاب می‌کند. وقتی یک اکشن واحد (click، fill، …) کار را انجام می‌دهد آن را ترجیح دهید؛ از `exec` برای حلقه‌ها، شرط‌ها و assertionها استفاده کنید.

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
| `-e, --eval <value>` | کدی که اجرا می‌شود |
| `--history` | ثبت کد در تاریخچه (برای رد کردن از --no-history استفاده کنید) |

**مثال‌ها**

```sh
# اجرای یک دستور یک‌خطی
npx wdio session exec -e "await browser.getTitle()"

# assertion روی صفحه (کوتیشن تکی، shell را از $ دور نگه می‌دارد)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# pipe کردن چند مرحله از طریق stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# اجرای یک فایل اسکریپت
npx wdio session exec ./scripts/login.ts
```

همچنین ببینید: [`helpers`](#helpers)، [`history`](#history)، [`export`](#export).

## `helpers`

فهرست helperهای پروژه از .wdio/helpers.

هر فایل در .wdio/helpers به صورت default یک تابع export می‌کند که browser را دریافت کرده و دستورات سفارشی را با addCommand ثبت می‌کند. helperها هنگام باز شدن session بارگذاری می‌شوند و در تست export‌شده به دستورات سفارشی تبدیل می‌شوند.

```sh
npx wdio session helpers
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--reload` | import مجدد helperها |

**مثال‌ها**

```sh
# فهرست helperها و دستوراتی که اضافه می‌کنند
npx wdio session helpers

# اعمال تغییرات انجام‌شده در یک helper
npx wdio session helpers --reload
```

همچنین ببینید: [`exec`](#exec)، [`export`](#export).

## `snapshot`

snapshot دسترس‌پذیری همراه با refها. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

درخت دسترس‌پذیری را چاپ می‌کند، هر گره در یک خط، مثلاً `button "Add to cart" [ref=e3]`. یک ref را به click، fill، get و سایر اکشن‌ها بدهید. refها تا زمانی که عنصر وجود دارد معتبر می‌مانند؛ اکشن روی عنصر حذف‌شده با REF_STALE شکست می‌خورد.

هر snapshot در پوشه‌ی artifacts نوشته می‌شود. خروجی طولانی‌تر از --max-chars در چند بخش چاپ می‌شود: بخش اول، سپس `--offset <line>` برای بخش بعدی. `find` در تمام آن جستجو می‌کند.

چیدمان متن و ساختار --json آزمایشی هستند و ممکن است در یک نسخه‌ی minor تغییر کنند. نحو ref و اکشن‌هایی که ref می‌پذیرند پایدار می‌مانند.

```sh
npx wdio session snapshot
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--depth <n>` | حداکثر عمق |
| `--scope <value>` | فقط snapshot از زیر این ref یا selector |
| `-i, --interactive` | فقط عناصر تعاملی |
| `--all` | شامل عناصر پنهان |
| `--boxes` | افزودن bounding boxها |
| `--viewport` | فقط آنچه در viewport است (وب: baseline مربوط به diff را به‌روز نمی‌کند) |
| `--selectors` | پایان هر خط ref با بهترین selector آن |
| `--compact` | حذف گره‌های بی‌نام که محتوایی ندارند |
| `-u, --urls` | شامل hrefهای لینک‌ها |
| `--file-only` | فقط فایل را بنویس |
| `--max-chars <n>` | چاپ حداکثر این تعداد کاراکتر در هر بار (پیش‌فرض 8000) |
| `--offset <n>` | چاپ از این خط به بعد، برای بخش بعدی یک snapshot طولانی |

**مثال‌ها**

```sh
# فقط عناصر تعاملی، نگاه اول معمول
npx wdio session snapshot -i

# کل صفحه همراه با مقصد لینک‌ها
npx wdio session snapshot --compact --urls

# فقط بخشی از صفحه
npx wdio session snapshot --scope "#checkout" --depth 4

# آنچه اکنون روی صفحه است
npx wdio session snapshot --viewport -i

# هر ref همراه با یک selector برای قرار دادن در تست
npx wdio session snapshot --selectors -i

# انجام اکشن، سپس نگاه دوباره
npx wdio session click e3 && npx wdio session snapshot -i
```

همچنین ببینید: [`find`](#find)، [`diff`](#diff)، [`screenshot`](#screenshot).

## `read`

خواندن متن صفحه به صورت Markdown. برای وب کاربرد دارد.

عنوان‌ها، پاراگراف‌ها، آیتم‌های فهرست، ردیف‌های جدول و لینک‌ها همراه با URL آن‌ها، از محتوای اصلی وقتی صفحه آن را مشخص کرده باشد (main، article)، و در غیر این صورت از کل صفحه؛ ناوبری، footerها و متن پنهان کنار گذاشته می‌شوند. در --max-chars (پیش‌فرض 6000) بریده می‌شود؛ محل برش می‌گوید کدام --offset بخش بعدی را می‌خواند. با --scope، آن بخش به داخل دید اسکرول می‌شود. از آن برای پاسخ به «صفحه چه می‌گوید» استفاده کنید؛ برای refهایی که باید روی آن‌ها اکشن انجام دهید از snapshot یا find استفاده کنید.

```sh
npx wdio session read
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--scope <value>` | فقط خواندن زیر این ref یا selector |
| `--max-chars <n>` | چاپ حداکثر این تعداد کاراکتر (پیش‌فرض 6000) |
| `--offset <n>` | شروع از این کاراکتر متن، برای بخش بعدی یک صفحه‌ی طولانی |

**مثال‌ها**

```sh
# خواندن محتوای اصلی
npx wdio session read

# خواندن یک بخش
npx wdio session read --scope e12
```

همچنین ببینید: [`find`](#find)، [`snapshot`](#snapshot)، [`get`](#get).

## `find`

جستجوی متن در یک snapshot تازه. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

یک snapshot جدید می‌گیرد و هر مورد منطبق را همراه با گره‌ی اطراف آن (مثلاً کل آیتم فهرست، تا مقداری که کنار مورد منطبق است نیز شامل شود)، با شماره‌ی خطوط و refها چاپ می‌کند، و اولین مورد منطبق را به داخل دید اسکرول می‌کند. تطبیق ابتدا بزرگی و کوچکی حروف، سپس فاصله‌ها را نادیده می‌گیرد ("SO2" عبارت "SO 2" را پیدا می‌کند)، سپس به دنبال همه‌ی کلمات و کلمات مشابه آن‌ها می‌گردد. متنی که فقط در بخش‌های پنهان صفحه است (منوهای بسته، تب‌ها، "Show more") به همین صورت فهرست می‌شود. از خواندن کل snapshot یک صفحه‌ی بزرگ کم‌هزینه‌تر است. ‏-A/-B/-C به جای آن، مانند grep، زمینه‌ی خطی ساده چاپ می‌کنند.

```sh
npx wdio session find <text>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `text` | بله | متنی که جستجو می‌شود |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--regex` | متن را به عنوان عبارت منظم (regular expression) در نظر بگیر |
| `--scope <value>` | فقط جستجو زیر این ref یا selector |
| `-C, --context <n>` | خطوط زمینه قبل و بعد به جای گره‌ی اطراف |
| `-A, --after-context <n>` | خطوط زمینه پس از هر مورد منطبق |
| `-B, --before-context <n>` | خطوط زمینه پیش از هر مورد منطبق |
| `--offset <n>` | رد کردن این تعداد مورد منطبق، برای موارد بعدی وقتی خروجی بریده شده است |

**مثال‌ها**

```sh
# پیدا کردن ref یک دکمه
npx wdio session find "Add to cart"

# فهرست همه‌ی لینک‌ها
npx wdio session find "^\s*link" --regex --context 0
```

همچنین ببینید: [`snapshot`](#snapshot)، [`wait`](#wait).

## `diff`

مقایسه‌ی یک snapshot تازه با snapshot قبلی. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

یک diff یکپارچه از آنچه از آخرین snapshot تغییر کرده، یا "No changes"، چاپ می‌کند. اولین فراخوانی یک baseline ذخیره می‌کند. پس از یک اکشن از آن استفاده کنید تا ببینید اکشن چه کرده، بدون اینکه کل صفحه را دوباره بخوانید. در وب، baseline آخرین snapshotی است که بدون `--viewport` گرفته شده است.

```sh
npx wdio session diff
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--baseline <value>` | فایل snapshot برای مقایسه |
| `--scope <value>` | فقط snapshot درون این ref یا selector، مانند `snapshot --scope` |
| `--interactive` | فقط عناصر تعاملی، مانند `snapshot -i` |

**مثال‌ها**

```sh
# دیدن اینکه یک کلیک چه چیزی را تغییر داد
npx wdio session click e7 && npx wdio session diff

# مقایسه با یک snapshot ذخیره‌شده
npx wdio session diff --baseline before.yml
```

همچنین ببینید: [`snapshot`](#snapshot)، [`find`](#find).

## `screenshot`

ذخیره‌ی یک PNG از viewport، یک عنصر یا کل صفحه. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

مسیر فایل و اندازه‌ی تصویر را چاپ می‌کند. وقتی سؤال درباره‌ی چیدمان یا ظاهر است اسکرین‌شات بگیرید؛ متن و وضعیت را با `snapshot` و `get` بخوانید.

```sh
npx wdio session screenshot [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | ref یا selector عنصری که ثبت می‌شود |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--full` | کل صفحه (وب) |
| `--path <value>` | فایل خروجی |

**مثال‌ها**

```sh
# ثبت viewport
npx wdio session screenshot

# ثبت یک عنصر
npx wdio session screenshot e5 --path card.png

# ثبت کل صفحه
npx wdio session screenshot --full
```

همچنین ببینید: [`visual`](#visual)، [`pdf`](#pdf)، [`snapshot`](#snapshot).

## `pdf`

ذخیره‌ی صفحه‌ی فعلی به صورت PDF. برای وب کاربرد دارد.

`browser.savePDF` را فراخوانی می‌کند. یک session از نوع BiDi با `browsingContext.print`، به صورت headed یا headless، در Chrome، Edge و Firefox چاپ می‌کند. یک session از نوع Classic از `printPage` استفاده می‌کند که Chrome قدیمی فقط در حالت headless از آن پشتیبانی می‌کند.

```sh
npx wdio session pdf [file]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `file` | خیر | فایل خروجی (باید به .pdf ختم شود) |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--path <value>` | فایل خروجی (باید به .pdf ختم شود) |

**مثال‌ها**

```sh
# نوشتن report.pdf در پوشه‌ی فعلی
npx wdio session pdf report.pdf
```

همچنین ببینید: [`screenshot`](#screenshot).

## `source`

ذخیره‌ی HTML صفحه یا XML برنامه. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

فایل را می‌نویسد و مسیر و اندازه‌ی آن را چاپ می‌کند. وقتی snapshot چیزی را که نیاز دارید، مانند attributeها برای یک selector، پنهان می‌کند از آن استفاده کنید.

```sh
npx wdio session source
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--path <value>` | فایل خروجی |

**مثال‌ها**

```sh
# ذخیره‌ی HTML در پوشه‌ی فعلی
npx wdio session source --path page.html
```

همچنین ببینید: [`snapshot`](#snapshot)، [`get`](#get).

## `get`

خواندن text، html، value، یک attribute، عنوان، URL، تعداد یا یک box. برای وب کاربرد دارد.

مقدار را چاپ می‌کند، سپس کد WebdriverIO که اجرا کرده است (`→ …`). برای چاپ فقط مقدار، مثلاً برای ذخیره در یک متغیر shell، ‏-q را بدهید. پیش از نوشتن یک assertion برای یک مقدار، آن را بخوانید.

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

# چند عنصر مطابقت دارند
npx wdio session get count "aria/Remove"
```

همچنین ببینید: [`is`](#is)، [`wait`](#wait)، [`exec`](#exec).

## `is`

بررسی اینکه آیا یک عنصر visible، enabled یا checked است. برای وب کاربرد دارد.

true یا false را چاپ می‌کند، سپس کد WebdriverIO که اجرا کرده است؛ برای چاپ فقط مقدار ‏-q را بدهید. کد خروج در هر صورت 0 است.

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

چاپ لاگ‌های console، خطاهای صفحه، شبکه و دستگاه از آخرین فراخوانی. برای وب و موبایل native کاربرد دارد.

هر فراخوانی یک نشانگر خواندن را جلو می‌برد، بنابراین فراخوانی بعدی فقط ورودی‌های جدید را نشان می‌دهد. پس از یک اکشن آن را اجرا کنید تا خطاهایی را که آن اکشن ایجاد کرده ببینید.

```sh
npx wdio session logs
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--errors` | فقط خطاها |
| `--network` | فقط ورودی‌های شبکه |
| `--since <value>` | فقط ورودی‌های جدیدتر از این مدت (مثلاً 30s) |
| `--peek` | نشانگر خواندن را جلو نبر |
| `--source <browser\|driver\|logcat\|syslog\|main>` | منبع لاگ |

**مثال‌ها**

```sh
# خطاهای ناشی از یک کلیک
npx wdio session click e4 && npx wdio session logs --errors

# ورودی‌های اخیر، و نگه داشتن آن‌ها برای فراخوانی بعدی
npx wdio session logs --since 30s --peek
```

همچنین ببینید: [`requests`](#requests).

## `navigate`

باز کردن یک URL. برای وب کاربرد دارد.

`example.com`، URLهای کامل و مسیرهای نسبی به baseUrl را می‌پذیرد. ابتدا از هر frameی خارج می‌شود. URL و عنوان جدید را چاپ می‌کند.

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

بازگشت به عقب. برای وب کاربرد دارد.

```sh
npx wdio session back
```

**مثال‌ها**

```sh
# بازگشت یک صفحه به عقب
npx wdio session back
```

همچنین ببینید: [`forward`](#forward)، [`navigate`](#navigate).

## `forward`

رفتن به جلو. برای وب کاربرد دارد.

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

بارگذاری مجدد صفحه. برای وب کاربرد دارد.

```sh
npx wdio session reload
```

**مثال‌ها**

```sh
# بارگذاری مجدد و انتظار تا آرام شدن شبکه
npx wdio session reload && npx wdio session wait --load networkidle
```

همچنین ببینید: [`navigate`](#navigate)، [`wait`](#wait).

## `wait`

انتظار برای یک عنصر، متن، یک URL، یک وضعیت بارگذاری، یک شرط یا چند میلی‌ثانیه. برای وب کاربرد دارد.

دقیقاً یکی از این‌ها را بدهید: یک ref یا selector، ‏--text، ‏--url، ‏--load، ‏--fn، یا میلی‌ثانیه. پس از --limit با کد خروج 1 شکست می‌خورد.

یک شرط را بر یک توقف ترجیح دهید، هم اینجا و هم به جای `sleep` در یک زنجیره. توقف طولانی‌تر از 30 ثانیه پذیرفته نمی‌شود.

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
| `--text <value>` | انتظار تا زمانی که صفحه شامل این متن شود |
| `--url <value>` | انتظار تا زمانی که URL مطابقت کند (زیررشته، یا globهای * و **) |
| `--load <value>` | domcontentloaded، load یا networkidle |
| `--fn <value>` | انتظار تا زمانی که این عبارت JavaScript برابر true شود |
| `--state <value>` | همراه با target: ‏visible (پیش‌فرض)، hidden، enabled یا disabled |
| `--limit <n>` | میلی‌ثانیه‌های انتظار (پیش‌فرض 10000) |

**مثال‌ها**

```sh
# انتظار تا visible شدن یک ref
npx wdio session wait e1

# انتظار تا ناپدید شدن یک spinner
npx wdio session wait "aria/Loading" --state hidden

# انجام اکشن، انتظار برای نتیجه، نگاه دوباره
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# انتظار برای یک URL
npx wdio session wait --url "**/dashboard"

# انتظار تا زمانی که هیچ درخواستی در جریان نباشد
npx wdio session wait --load networkidle

# توقف 500 میلی‌ثانیه
npx wdio session wait 500
```

همچنین ببینید: [`find`](#find)، [`is`](#is)، [`get`](#get).

## `click`

کلیک روی یک عنصر. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

چاپ می‌کند روی چه چیزی کلیک شد و، اگر کلیک باعث ناوبری شد، URL جدید را. پیش از استفاده از refها در صفحه‌ی بعدی یک snapshot جدید بگیرید. عنصر پنهان یا پوشیده‌شده بلافاصله همراه با چیزی که سر راه است شکست می‌خورد. `x,y` روی نقطه‌ای از viewport کلیک می‌کند (پیکسل از بالا چپ، همانند یک اسکرین‌شات) برای چیزهایی که ref ندارند، مانند canvas یا نقشه.

```sh
npx wdio session click <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12)، selector در WebdriverIO، یا مختصات x,y در viewport |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--double` | دابل‌کلیک |
| `--right` | کلیک راست |
| `--new-tab` | باز کردن لینک در یک تب جدید و جابه‌جایی به آن |

**مثال‌ها**

```sh
# کلیک روی یک ref از آخرین snapshot
npx wdio session click e3

# کلیک بر اساس نام دسترس‌پذیر
npx wdio session click "aria/Add to cart"

# کلیک، انتظار، نگاه دوباره
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# باز کردن یک لینک در تب جدید
npx wdio session click e8 --new-tab

# کلیک روی نقطه‌ای از viewport، مثلاً روی یک نقشه
npx wdio session click 320,480
```

همچنین ببینید: [`tap`](#tap)، [`fill`](#fill)، [`wait`](#wait)، [`snapshot`](#snapshot).

## `tap`

لمس (tap) یک عنصر (موبایل). برای موبایل native کاربرد دارد.

```sh
npx wdio session tap <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# لمس یک ref از آخرین snapshot
npx wdio session tap e2
```

همچنین ببینید: [`click`](#click)، [`long-press`](#long-press)، [`swipe`](#swipe).

## `fill`

جایگزینی مقدار یک input. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

ابتدا فیلد را پاک می‌کند. برای تایپ در هر چیزی که focus دارد از `type` استفاده کنید؛ برای ارسال کلیدهایی مانند Enter از `press` استفاده کنید.

```sh
npx wdio session fill <target> <text..>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |
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

تایپ در یک عنصر یا عنصری که focus دارد. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

متن را به صورت فشردن کلیدها و بدون پاک کردن چیزی ارسال می‌کند: `type e2 Ada` در e2 تایپ می‌کند و `type Ada` در هر چیزی که focus دارد. برای جایگزینی یک مقدار از `fill` استفاده کنید.

```sh
npx wdio session type <text..>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `text` | بله | متن (کلمات با فاصله به هم متصل می‌شوند). برای تایپ در یک عنصر مشخص به جای عنصر دارای focus، با یک ref شروع کنید، مثلاً `type e2 Ada` |

**مثال‌ها**

```sh
# تایپ در یک فیلد
npx wdio session type e5 hello

# تایپ در هر چیزی که focus دارد
npx wdio session focus e5 && npx wdio session type "hello"
```

همچنین ببینید: [`fill`](#fill)، [`press`](#press)، [`focus`](#focus).

## `press`

فشردن کلیدها، مثلاً Enter، ‏Control+a. برای وب و دسکتاپ native کاربرد دارد.

کلیدها را با + ترکیب کنید. در نام‌ها بزرگی و کوچکی حروف نادیده گرفته می‌شود؛ ctrl، cmd، esc، up، down، left و right به عنوان شکل‌های کوتاه پذیرفته می‌شوند.

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
| `--times <n>` | این تعداد بار فشرده شود (تا 100)، مثلاً برای حرکت دادن یک slider |

**مثال‌ها**

```sh
# ارسال یک فرم
npx wdio session press Enter

# حرکت دادن یک slider دارای focus به اندازه‌ی پنج گام
npx wdio session press ArrowRight --times 5

# انتخاب همه
npx wdio session press Control+a

# بازگرداندن focus به عقب
npx wdio session press Shift+Tab
```

همچنین ببینید: [`type`](#type)، [`fill`](#fill).

## `select`

انتخاب یک گزینه از یک `<select>`. برای وب کاربرد دارد.

```sh
npx wdio session select <target> <value>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |
| `value` | بله | متن، مقدار یا اندیس گزینه |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--by <text\|value\|index>` | نحوه‌ی تطبیق گزینه (پیش‌فرض text) |

**مثال‌ها**

```sh
# انتخاب بر اساس متن قابل مشاهده
npx wdio session select e6 Germany

# انتخاب بر اساس مقدار
npx wdio session select e6 de --by value
```

همچنین ببینید: [`fill`](#fill)، [`check`](#check).

## `upload`

تنظیم یک input فایل. برای وب کاربرد دارد.

مسیر نسبت به پوشه‌ی کاری شماست. خودِ `<input type="file">` را هدف قرار دهید، نه دکمه‌ای که انتخابگر فایل را باز می‌کند.

```sh
npx wdio session upload <target> <file>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |
| `file` | بله | فایلی که آپلود می‌شود |

**مثال‌ها**

```sh
# پیوست کردن یک فایل
npx wdio session upload e9 ./fixtures/avatar.png
```

همچنین ببینید: [`fill`](#fill).

## `hover`

بردن اشاره‌گر روی یک عنصر. برای وب و دسکتاپ native کاربرد دارد.

```sh
npx wdio session hover <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# باز کردن یک منوی hover و نگاه کردن به آن
npx wdio session hover e4 && npx wdio session snapshot -i
```

همچنین ببینید: [`click`](#click).

## `focus`

focus کردن یک عنصر. برای وب کاربرد دارد.

```sh
npx wdio session focus <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# focus کردن یک فیلد پیش از `type`
npx wdio session focus e5
```

همچنین ببینید: [`type`](#type)، [`press`](#press).

## `check`

علامت زدن یک checkbox یا radio. برای وب کاربرد دارد.

وقتی از قبل علامت خورده باشد کاری انجام نمی‌دهد، و وقتی در نهایت علامت نخورد شکست می‌خورد.

```sh
npx wdio session check <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# پذیرفتن شرایط
npx wdio session check e7
```

همچنین ببینید: [`uncheck`](#uncheck)، [`is`](#is).

## `uncheck`

برداشتن علامت یک checkbox. برای وب کاربرد دارد.

وقتی از قبل علامت نخورده باشد کاری انجام نمی‌دهد. علامت یک دکمه‌ی radio انتخاب‌شده را نمی‌توان برداشت.

```sh
npx wdio session uncheck <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

**مثال‌ها**

```sh
# انصراف از خبرنامه
npx wdio session uncheck e7
```

همچنین ببینید: [`check`](#check)، [`is`](#is).

## `drag`

کشیدن یک عنصر روی عنصری دیگر. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

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
# انتقال یک کارت به ستونی دیگر
npx wdio session drag e3 e9
```

همچنین ببینید: [`scroll`](#scroll).

## `scroll`

اسکرول یک عنصر به داخل دید یا اسکرول صفحه. برای وب کاربرد دارد.

بدون target، ‏600px به پایین اسکرول می‌کند. محتوای lazy-load در snapshot بعدی ظاهر می‌شود.

```sh
npx wdio session scroll [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | ref، selector، ‏up، down، top یا bottom |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--px <n>` | پیکسل برای up/down (پیش‌فرض 600) |

**مثال‌ها**

```sh
# آوردن یک عنصر به داخل دید
npx wdio session scroll e40

# بارگذاری نتایج بیشتر و نگاه کردن به آن‌ها
npx wdio session scroll bottom && npx wdio session snapshot -i

# اسکرول به اندازه‌ی دو صفحه
npx wdio session scroll down --px 1200
```

همچنین ببینید: [`swipe`](#swipe)، [`snapshot`](#snapshot).

## `swipe`

کشیدن (swipe) صفحه (موبایل). برای موبایل native کاربرد دارد.

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
| `--percent <n>` | طول swipe بین 0..1 |

**مثال‌ها**

```sh
# اسکرول یک فهرست و نگاه کردن به آن
npx wdio session swipe up && npx wdio session snapshot
```

همچنین ببینید: [`scroll`](#scroll)، [`tap`](#tap).

## `long-press`

فشردن طولانی یک عنصر (موبایل). برای موبایل native کاربرد دارد.

```sh
npx wdio session long-press <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref ‏(e12) یا selector در WebdriverIO |

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

فهرست، باز کردن، جابه‌جایی یا بستن تب‌ها. برای وب کاربرد دارد.

بدون زیردستور، تب‌ها را با اندیس آن‌ها فهرست می‌کند؛ تب فعلی علامت‌گذاری می‌شود. `new` یک تب باز کرده و به آن جابه‌جا می‌شود. `switch` و `close` یک اندیس یا handle می‌پذیرند.

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

# بازگشت به تب اول
npx wdio session tabs switch 0

# بستن تب دوم
npx wdio session tabs close 1
```

همچنین ببینید: [`windows`](#windows)، [`frame`](#frame).

## `windows`

فهرست یا جابه‌جایی پنجره‌ها. برای وب و دسکتاپ native کاربرد دارد.

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

# جابه‌جایی به پنجره‌ی دوم
npx wdio session windows switch 1
```

همچنین ببینید: [`tabs`](#tabs).

## `frame`

جابه‌جایی به درون یک iframe، به والد یا به بالاترین سطح. برای وب کاربرد دارد.

snapshot صفحه از قبل محتوای iframeهای آن را با refهایی که اکشن‌ها مستقیماً از آن‌ها استفاده می‌کنند نشان می‌دهد، بنابراین `frame` فقط برای کار درون یک frame به مدت طولانی‌تر یا دیدن frameی که snapshot آن را کوتاه کرده لازم است. snapshotها و اکشن‌ها تا زمانی که برگردید روی frame فعلی اعمال می‌شوند. `navigate` به سند بالاترین سطح بازمی‌گردد.

```sh
npx wdio session frame <target>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | بله | ref، selector، ‏parent یا top |

**مثال‌ها**

```sh
# ورود به یک iframe و نگاه کردن به داخل آن
npx wdio session frame e12 && npx wdio session snapshot -i

# بازگشت به صفحه
npx wdio session frame top
```

همچنین ببینید: [`tabs`](#tabs)، [`snapshot`](#snapshot).

## `contexts`

فهرست یا جابه‌جایی contextهای native/webview. برای موبایل native کاربرد دارد.

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

پذیرفتن، رد کردن یا گزارش یک dialog باز. برای وب و موبایل native کاربرد دارد.

یک alert، confirm یا prompt باز، سایر اکشن‌ها را مسدود می‌کند و آن‌ها با یک راهنمایی برای اجرای این دستور شکست می‌خورند.

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

اجرا، خاتمه، نصب یا پرس‌وجوی یک برنامه. برای موبایل native و دسکتاپ native کاربرد دارد.

```sh
npx wdio session app <sub> <id>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | launch \| terminate \| install \| state |
| `id` | بله | شناسه‌ی برنامه، bundle id یا فایل |

**مثال‌ها**

```sh
# راه‌اندازی مجدد برنامه
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# آیا در حال اجراست؟
npx wdio session app state com.example.shop
```

همچنین ببینید: [`deeplink`](#deeplink)، [`background`](#background).

## `deeplink`

باز کردن یک deep link. برای موبایل native کاربرد دارد.

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
| `--package <value>` | package در Android یا bundle id در iOS |

**مثال‌ها**

```sh
# باز کردن صفحه‌ی یک محصول
npx wdio session deeplink shop://product/42 --package com.example.shop
```

همچنین ببینید: [`app`](#app).

## `rotate`

چرخاندن دستگاه. برای موبایل native کاربرد دارد.

```sh
npx wdio session rotate <orientation>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `orientation` | بله | portrait \| landscape |

**مثال‌ها**

```sh
# افقی کردن دستگاه
npx wdio session rotate landscape
```

## `keyboard`

پنهان کردن صفحه‌کلید روی صفحه. برای موبایل native کاربرد دارد.

```sh
npx wdio session keyboard <sub>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | بله | hide |

**مثال‌ها**

```sh
# آشکار کردن عناصر زیر صفحه‌کلید
npx wdio session keyboard hide
```

## `background`

فرستادن برنامه به پس‌زمینه. برای موبایل native کاربرد دارد.

```sh
npx wdio session background <seconds>
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `seconds` | بله | ثانیه (‏-1 آن را در پس‌زمینه نگه می‌دارد) |

**مثال‌ها**

```sh
# فرستادن برنامه به پس‌زمینه به مدت 3 ثانیه
npx wdio session background 3
```

همچنین ببینید: [`app`](#app).

## `lock`

قفل کردن دستگاه. برای موبایل native کاربرد دارد.

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

باز کردن قفل دستگاه. برای موبایل native کاربرد دارد.

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

تنظیم موقعیت جغرافیایی. برای وب و موبایل native کاربرد دارد.

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

شبیه‌سازی یک دستگاه، viewport، شبکه، cpu، ساعت یا یک دامنه‌ی شبیه‌سازی BiDi. برای وب کاربرد دارد.

یک شبیه‌سازی تا `emulate reset` یا پایان session باقی می‌ماند؛ تنظیم دوباره‌ی همان نوع، آن را جایگزین می‌کند. `emulate device` بدون مقدار، نام دستگاه‌ها را فهرست می‌کند. presetهای شبکه و محدودسازی cpu به یک مرورگر Chromium نیاز دارند.

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
| `--tick <n>` | جلو بردن ساعت شبیه‌سازی‌شده به اندازه‌ی ms (clock) |

**مثال‌ها**

```sh
# شبیه‌سازی یک گوشی
npx wdio session emulate device "iPhone 15"

# تنظیم یک viewport
npx wdio session emulate viewport 375x812 --dpr 3

# آفلاین شدن
npx wdio session emulate network offline

# حالت تاریک
npx wdio session emulate color-scheme dark

# ثابت نگه داشتن تاریخ
npx wdio session emulate clock 2030-01-01T00:00:00Z

# کاهش حرکت
npx wdio session emulate media prefersReducedMotion=reduce

# لغو همه‌ی شبیه‌سازی‌ها
npx wdio session emulate reset
```

همچنین ببینید: [`geolocation`](#geolocation)، [`screenshot`](#screenshot).

## `requests`

فهرست درخواست‌های شبکه‌ی ثبت‌شده (BiDi). برای وب کاربرد دارد.

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

mock کردن پاسخ‌ها برای یک الگوی URL ‏(BiDi). برای وب کاربرد دارد.

شناسه‌ی mock ‏(m1، m2، …) را چاپ می‌کند. mock کردن دوباره‌ی همان الگو، mock قبلی را جایگزین می‌کند.

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
| `--body <value>` | body به صورت JSON/متن یا مسیر یک فایل |
| `--header <value>` | header به صورت k:v (قابل تکرار) |
| `--abort` | لغو درخواست‌های منطبق |
| `--method <value>` | فقط این method |
| `--once` | فقط درخواست بعدی |

**مثال‌ها**

```sh
# برگرداندن JSON ثابت
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# ناموفق کردن درخواست بعدی
npx wdio session mock "**/api/cart" --status 500 --once

# مسدود کردن تصاویر
npx wdio session mock "**/*.png" --abort
```

همچنین ببینید: [`unmock`](#unmock)، [`requests`](#requests).

## `unmock`

حذف mockها. برای وب کاربرد دارد.

```sh
npx wdio session unmock [pattern]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `pattern` | خیر | الگو یا شناسه‌ی mock |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--all` | حذف همه‌ی mockها |

**مثال‌ها**

```sh
# حذف یک mock
npx wdio session unmock m1

# حذف همه‌ی mockها
npx wdio session unmock --all
```

همچنین ببینید: [`mock`](#mock).

## `cookies`

دریافت، تنظیم یا پاک کردن cookieها. برای وب کاربرد دارد.

بدون زیردستور، همه‌ی cookieها را به صورت name=value چاپ می‌کند. `clear` بدون نام، همه‌ی cookieها را حذف می‌کند.

```sh
npx wdio session cookies [sub] [name] [value]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `sub` | خیر | get \| set \| clear |
| `name` | خیر | نام cookie |
| `value` | خیر | مقدار cookie |

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--domain <value>` | دامنه‌ی cookie ‏(set) |
| `--path <value>` | مسیر cookie ‏(set) |
| `--http-only` | cookie از نوع HttpOnly ‏(set) |
| `--secure` | cookie از نوع Secure ‏(set) |
| `--same-site <value>` | lax، strict، none یا default ‏(set) |
| `--expiry <n>` | انقضا به صورت Unix timestamp بر حسب ثانیه (set) |

**مثال‌ها**

```sh
# فهرست cookieها
npx wdio session cookies

# مقدار یک cookie
npx wdio session cookies get session

# تنظیم یک cookie و بارگذاری مجدد
npx wdio session cookies set session abc && npx wdio session reload

# حذف همه‌ی cookieها
npx wdio session cookies clear
```

همچنین ببینید: [`storage`](#storage)، [`state`](#state).

## `storage`

دریافت، تنظیم یا پاک کردن localStorage (یا sessionStorage). برای وب کاربرد دارد.

بدون زیردستور، همه‌ی ورودی‌ها را چاپ می‌کند. `clear` بدون کلید، فضای ذخیره‌سازی را خالی می‌کند.

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
| `--session-storage` | استفاده از sessionStorage |

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

ذخیره یا بارگذاری cookieها و storage. برای وب کاربرد دارد.

`save` ‏cookieها، localStorage و sessionStorage مربوط به origin فعلی را در یک فایل JSON می‌نویسد. `load` آن origin را باز کرده و آن‌ها را بازیابی می‌کند، مثلاً برای رد شدن از مرحله‌ی ورود.

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
# ذخیره‌ی وضعیت واردشده (logged-in)
npx wdio session state save .wdio/logged-in.json

# شروع در حالت واردشده
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

همچنین ببینید: [`cookies`](#cookies)، [`storage`](#storage).

## `visual`

snapshotهای بصری از طریق @wdio/visual-service. برای وب، موبایل native و دسکتاپ native کاربرد دارد.

`save` یک baseline در .wdio/visual/baseline ذخیره می‌کند، `check` با آن مقایسه کرده و عدم تطابق را چاپ می‌کند، `accept` آخرین تصویر واقعی را به baseline تبدیل می‌کند، `list` تگ‌ها را نشان می‌دهد. به @wdio/visual-service در پروژه نیاز دارد.

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
| `--element <value>` | فقط این عنصر |
| `--full` | کل صفحه |
| `--tabbable` | صفحه‌ی tabbable |
| `--threshold <n>` | عدم تطابق مجاز بر حسب درصد (پیش‌فرض 0) |
| `--all` | accept: همه‌ی تگ‌ها |

**مثال‌ها**

```sh
# ذخیره‌ی یک baseline
npx wdio session visual save cart

# مقایسه با آن
npx wdio session visual check cart --threshold 0.5

# پذیرفتن یک تغییر عمدی
npx wdio session visual accept cart
```

همچنین ببینید: [`screenshot`](#screenshot).

## `trace`

ثبت همه‌ی مراحل همراه با اسکرین‌شات‌ها و snapshotها.

`stop` پوشه‌ی trace و رونوشتی از مراحل را چاپ می‌کند.

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
| `--screenshots` | اسکرین‌شات پس از هر مرحله (برای رد کردن از --no-screenshots استفاده کنید) |
| `--snapshots` | snapshot پس از هر مرحله (برای رد کردن از --no-snapshots استفاده کنید) |

**مثال‌ها**

```sh
# شروع tracing
npx wdio session trace start

# توقف و چاپ رونوشت
npx wdio session trace stop
```

همچنین ببینید: [`record`](#record)، [`history`](#history).

## `record`

ضبط ویدیو. برای وب و موبایل native کاربرد دارد.

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

# توقف و ذخیره‌ی ویدیو
npx wdio session record stop --path checkout.mp4
```

همچنین ببینید: [`trace`](#trace)، [`screenshot`](#screenshot).

## `history`

چاپ مراحل ثبت‌شده.

هر اکشنی که صفحه را تغییر می‌دهد، کد WebdriverIO که اجرا کرده را ثبت می‌کند. `export` این تاریخچه را به یک spec تبدیل می‌کند.

```sh
npx wdio session history
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--clear` | پاک کردن تاریخچه |

**مثال‌ها**

```sh
# نمایش مراحل تا اینجا
npx wdio session history

# شروع دوباره‌ی ثبت پیش از مراحلی که می‌خواهید نگه دارید
npx wdio session history --clear
```

همچنین ببینید: [`export`](#export)، [`exec`](#exec).

## `export`

تولید یک spec از تاریخچه.

یک spec به شکل describe/it با مراحل ثبت‌شده می‌نویسد. refها به selectorهای پایدار و helperها به دستورات سفارشی تبدیل می‌شوند. بدون --out، فایل در پوشه‌ی artifacts قرار می‌گیرد. آن را با `wdio run` اجرا کنید تا از موفق بودنش مطمئن شوید.

```sh
npx wdio session export
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--out <value>` | فایل خروجی |
| `--title <value>` | عنوان suite |
| `--page-objects` | تولید page objectها |
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

ادامه‌ی تستی که توسط wdio run --debug=agent متوقف شده است.

`wdio run --debug=agent` یک تست در حال شکست را متوقف کرده و آن را به صورت session ‏debug-`<worker>` در دسترس قرار می‌دهد. آن را با هر اکشنی بررسی کنید، سپس resume کنید. اجرای `close` روی آن session به جای آن، تست را ناموفق می‌کند.

```sh
npx wdio session resume
```

**مثال‌ها**

```sh
# نگاه کردن به تست متوقف‌شده، سپس اجازه‌ی ادامه به آن
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

همچنین ببینید: [`close`](#close)، [`list`](#list).

## `doctor`

بررسی محیط شما.

برای هر بررسی یک خط همراه با راه‌حلی برای هر شکست چاپ می‌کند. وقتی یک بررسی شکست بخورد با کد 1 خارج می‌شود.

```sh
npx wdio session doctor [target]
```

**آرگومان‌ها**

| نام | الزامی | توضیحات |
| --- | --- | --- |
| `target` | خیر | فقط بررسی آنچه این target نیاز دارد |

**مثال‌ها**

```sh
# بررسی همه چیز
npx wdio session doctor

# بررسی آنچه یک session اندروید نیاز دارد
npx wdio session doctor android
```

همچنین ببینید: [`open`](#open).

## `skill`

چاپ skill عامل (agent).

```sh
npx wdio session skill
```

**فلگ‌ها**

| فلگ | توضیحات |
| --- | --- |
| `--install <value>` | نوشتن آن در .agents/skills/wdio-session/SKILL.md (یا این پوشه) |

**مثال‌ها**

```sh
# چاپ skill
npx wdio session skill

# افزودن آن به این پروژه
npx wdio session skill --install .
```