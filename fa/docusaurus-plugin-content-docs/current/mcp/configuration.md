---
id: configuration
title: پیکربندی
description: "پیکربندی سرور MCP در WebdriverIO، شامل گزینه‌های نشست، مرورگر، موبایل، ارائه‌دهنده ابری، تشخیص عنصر و Appium."
---

این صفحه تمام گزینه‌های پیکربندی سرور MCP در WebdriverIO را مستند می‌کند.

## پیکربندی سرور MCP

سرور MCP از طریق فایل‌های پیکربندی یا دستورات پیکربندی می‌شود.

### پیکربندی پایه

فایل پیکربندی MCP خود (مثلاً `./.mcp.json`) را ویرایش کرده و موارد زیر را اضافه کنید:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## گزینه‌های نشست

تمام گزینه‌های نشست به ابزار `start_session` ارسال می‌شوند. یک ابزار واحد و یکپارچه برای نشست‌های مرورگر و موبایل وجود دارد؛ پارامتر `platform` نوع نشست را تعیین می‌کند.

### گزینه‌های مشترک

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

پلتفرمی که باید خودکارسازی شود.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

محل اجرای نشست. برای دستگاه‌های راه دور از نام یک ارائه‌دهنده ابری استفاده کنید؛ هر کدام به متغیرهای محیطی مخصوص به خود نیاز دارند. برای جزئیات بیشتر به [ارائه‌دهندگان ابری](./cloud-providers) مراجعه کنید.

</Option>
## گزینه‌های نشست مرورگر

گزینه‌های مربوط به نشست‌های `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

مرورگری که باید اجرا شود.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

نسخه مرورگر. فقط برای ارائه‌دهندگان ابری (پیش‌فرض: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

سیستم‌عامل برای نشست‌های مرورگر در ارائه‌دهندگان ابری. مثال‌ها: `os: "Windows"`، `osVersion: "11"` یا `os: "OS X"`، `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

اجرای مرورگر در حالت headless (بدون پنجره قابل مشاهده). برای دیدن مرورگر آن را روی `false` تنظیم کنید.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **محدوده:** `400` - `3840`

عرض اولیه پنجره مرورگر بر حسب پیکسل.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **محدوده:** `400` - `2160`

ارتفاع اولیه پنجره مرورگر بر حسب پیکسل.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URLای که بلافاصله پس از راه‌اندازی مرورگر به آن هدایت می‌شود. کارآمدتر از فراخوانی جداگانه `start_session` و سپس `navigate` است.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

اتصال به یک نمونه Chrome موجود به جای راه‌اندازی یک نمونه جدید. پس از `launch_chrome` برای اتصال از طریق CDP استفاده کنید.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

پیکربندی اتصال اشکال‌زدایی از راه دور Chrome. فقط زمانی اعمال می‌شود که `attach: true` باشد.

</Option>
## گزینه‌های نشست موبایل

گزینه‌های مربوط به نشست‌های `platform: "ios"` یا `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

نام دستگاه، شبیه‌ساز (simulator) یا امولاتور.

**مثال‌ها:**
-   شبیه‌ساز iOS: `"iPhone 16"`، `"iPad Air (5th generation)"`
-   امولاتور Android: `"Pixel 7"`، `"Nexus 5X"`
-   دستگاه واقعی: نام دستگاه همان‌طور که در سیستم شما نمایش داده می‌شود

</Option>
### `platformVersion`

<Option type="string" required="No">

نسخه سیستم‌عامل دستگاه/شبیه‌ساز/امولاتور (مثلاً `"18.0"` برای iOS، `"14"` برای Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

درایور خودکارسازی. به طور پیش‌فرض برای iOS از `XCUITest` و برای Android از `UiAutomator2` استفاده می‌شود.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

شناسه یکتای دستگاه (Unique Device Identifier). برای دستگاه‌های واقعی iOS الزامی است (شناسه ۴۰ کاراکتری).

**یافتن UDID:**
-   **iOS:** دستگاه را متصل کنید، Finder را باز کنید، روی دستگاه کلیک کنید ← Serial Number (برای نمایش UDID کلیک کنید)
-   **Android:** دستور `adb devices` را در ترمینال اجرا کنید

</Option>
### `appPath`

<Option type="string" required="No">

مسیر فایل برنامه برای نصب و اجرا.

**فرمت‌های پشتیبانی‌شده:**
-   شبیه‌ساز iOS: پوشه `.app`
-   دستگاه واقعی iOS: فایل `.ipa`
-   Android: فایل `.apk`

یا باید `appPath` ارائه شود، یا `noReset: true` برای اتصال به برنامه‌ای که از قبل در حال اجراست.

</Option>
### `app`

<Option type="string" required="No">

URL برنامه در ارائه‌دهنده ابری (`bs://...` برای BrowserStack، `storage:filename=` برای Sauce Labs، `lt://...` برای TestMu، app_url در TestingBot) یا `customId`. به جای `appPath` برای نشست‌های موبایل ابری استفاده می‌شود.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activityای که هنگام اجرای برنامه باید منتظر آن ماند. در صورت عدم تعیین، activity اصلی/launcher برنامه استفاده می‌شود.

**مثال:** `"com.example.app.MainActivity"`

</Option>
### گزینه‌های وضعیت نشست

#### `noReset`

<Option type="boolean" required="No">

حفظ وضعیت برنامه بین نشست‌ها. زمانی که `true` باشد:
-   داده‌های برنامه حفظ می‌شوند (وضعیت ورود، تنظیمات و غیره)
-   نشست به جای بسته شدن **جدا (detach)** می‌شود (برنامه در حال اجرا باقی می‌ماند)
-   می‌توان بدون `appPath` برای اتصال به برنامه‌ای که از قبل در حال اجراست از آن استفاده کرد

</Option>
#### `fullReset`

<Option type="boolean" required="No">

بازنشانی کامل برنامه پیش از نشست:
-   iOS: برنامه را حذف و دوباره نصب می‌کند
-   Android: داده‌ها و حافظه پنهان (cache) برنامه را پاک می‌کند

برای حفظ کامل وضعیت برنامه، `fullReset: false` را همراه با `noReset: true` تنظیم کنید.

</Option>
### مهلت زمانی نشست

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

مدت زمانی (بر حسب ثانیه) که Appium پیش از پایان دادن به نشست منتظر یک دستور جدید می‌ماند. برای نشست‌های اشکال‌زدایی طولانی‌تر آن را افزایش دهید.

</Option>
### مدیریت خودکار

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

اعطای خودکار مجوزهای برنامه هنگام نصب/اجرا (دوربین، میکروفون، موقعیت مکانی و غیره).

:::note فقط Android
این گزینه عمدتاً بر Android تأثیر می‌گذارد. مجوزهای iOS به دلیل محدودیت‌های سیستمی باید به شکل دیگری مدیریت شوند.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

پذیرش خودکار هشدارهای سیستمی (دیالوگ‌ها) در حین خودکارسازی ("Allow notifications?" و غیره).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

رد کردن هشدارهای سیستمی به جای پذیرش آن‌ها. زمانی که `true` باشد، بر `autoAcceptAlerts` اولویت دارد.

</Option>
### اتصال به سرور Appium

اتصال به سرور Appium را می‌توانید برای هر نشست به‌صورت جداگانه با استفاده از `appiumConfig` بازنویسی کنید:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

اتصال به سرور Appium. مقدار پیش‌فرض `{ host: "127.0.0.1", port: 4723, path: "/" }` است.

</Option>
## گزینه‌های ارائه‌دهنده ابری

### اعتبارنامه‌ها

هر ارائه‌دهنده ابری به متغیرهای محیطی مخصوص به خود نیاز دارد:

| ارائه‌دهنده  | متغیر نام کاربری        | متغیر کلید دسترسی         |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

این متغیرها را پیش از راه‌اندازی سرور MCP تنظیم کنید.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

منطقه مرکز داده Sauce Labs. برای سایر ارائه‌دهندگان نادیده گرفته می‌شود.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

فعال‌سازی مسیریابی تونل محلی برای نشست‌های ارائه‌دهنده ابری (دسترسی به localhost، محیط‌های staging، سرویس‌های داخلی).

-   `true` — تونل را به طور خودکار پیش از نشست راه‌اندازی کرده و هنگام بستن متوقف می‌کند
-   `"external"` — تونل از قبل به صورت خارجی در حال اجراست؛ فقط فلگ‌های مناسب ارائه‌دهنده را تنظیم می‌کند

پیش از استفاده از `true`، منبع local-binary ارائه‌دهنده (`wdio://browserstack/local-binary`، `wdio://saucelabs/local-binary`، `wdio://testmu/local-binary` یا `wdio://testingbot/local-binary`) را برای دستورالعمل‌های راه‌اندازی مخصوص سیستم‌عامل و معماری خود مطالعه کنید.

</Option>
### `tunnelName`

<Option type="string" required="No">

نام شناسه تونل. زمانی که `tunnel: "external"` باشد، برای تطبیق با تونل در حال اجرا الزامی است. زمانی که `tunnel: true` باشد، در صورت عدم ارائه، یک نام یکتا به طور خودکار تولید می‌شود.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

برچسب‌های نشست ارائه‌دهنده ابری که در داشبورد ارائه‌دهنده قابل مشاهده هستند. در BrowserStack، Sauce Labs، TestMu و TestingBot به طور یکسان کار می‌کند.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

فعال‌سازی ضبط trace. یک فایل zip با پسوند `.trace` سازگار با Playwright تولید می‌کند که هنگام `close_session` در `.trace/` ذخیره می‌شود. traceها را در [player.vibium.dev](https://player.vibium.dev) مشاهده کنید.

</Option>
## گزینه‌های تشخیص عنصر

گزینه‌های مربوط به ابزار `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

فقط عناصری را برمی‌گرداند که در viewport فعلی قابل مشاهده هستند. برای کاهش نتایج در صفحات طولانی آن را روی `true` تنظیم کنید.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

عناصر container/layout را در نتایج لحاظ می‌کند:

**containerهای Android:** `ViewGroup`، `FrameLayout`، `LinearLayout`، `RelativeLayout`، `ConstraintLayout`، `ScrollView`، `RecyclerView`

**containerهای iOS:** `View`، `StackView`، `CollectionView`، `ScrollView`، `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

مختصات کادر محیطی عنصر (x، y، width، height) را در پاسخ لحاظ می‌کند.

</Option>
### صفحه‌بندی

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

حداکثر تعداد عناصری که برگردانده می‌شوند.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

تعداد عناصری که پیش از برگرداندن نتایج نادیده گرفته می‌شوند.

**مثال:** دریافت عناصر ۲۱ تا ۴۰:
```text
Get elements with limit 20 and offset 20
```

</Option>
## گزینه‌های درخت دسترسی‌پذیری

گزینه‌های مربوط به ابزار `get_accessibility_tree` (فقط مرورگر).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

حداکثر تعداد گره‌هایی که برگردانده می‌شوند.

</Option>
### `offset`

<Option type="number" default="0" required="No">

تعداد گره‌هایی که برای صفحه‌بندی نادیده گرفته می‌شوند.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

فیلتر کردن بر اساس نقش‌های دسترسی‌پذیری مشخص.

**نقش‌های رایج:** `button`، `link`، `textbox`، `checkbox`، `radio`، `heading`، `img`، `listitem`

**مثال:** دریافت فقط دکمه‌ها و لینک‌ها:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## اسکرین‌شات

ابزار `get_screenshot` هیچ پارامتری نمی‌گیرد. اسکرین‌شات‌ها به طور خودکار پردازش می‌شوند:

| بهینه‌سازی      | مقدار    | توضیحات                                                     |
| --------------- | -------- | ----------------------------------------------------------- |
| حداکثر ابعاد    | 2000px   | تصاویر بزرگ‌تر از 2000px کوچک می‌شوند                        |
| حداکثر حجم فایل | 1MB      | تصاویر فشرده می‌شوند تا زیر 1MB باقی بمانند                  |
| فرمت            | PNG/JPEG | PNG با حداکثر فشرده‌سازی؛ در صورت نیاز به کاهش حجم، JPEG     |

## رفتار نشست

### انواع نشست

| نوع       | توضیحات             | جداسازی خودکار                                |
| --------- | ------------------- | --------------------------------------------- |
| `browser` | نشست مرورگر         | خیر                                           |
| `ios`     | نشست برنامه iOS     | بله (اگر `noReset: true` باشد یا `appPath` نباشد) |
| `android` | نشست برنامه Android | بله (اگر `noReset: true` باشد یا `appPath` نباشد) |

### مدل تک‌نشستی

سرور MCP با یک **مدل تک‌نشستی** کار می‌کند:

-   در هر لحظه فقط یک نشست مرورگر یا برنامه می‌تواند فعال باشد
-   شروع یک نشست جدید، نشست فعلی را می‌بندد/جدا می‌کند
-   وضعیت نشست به صورت سراسری در میان فراخوانی‌های ابزار حفظ می‌شود

### جداسازی در مقابل بستن

| عملیات       | `detach: false` (بستن)          | `detach: true` (جداسازی)                          |
| ------------ | ------------------------------- | ------------------------------------------------- |
| مرورگر       | مرورگر را به طور کامل می‌بندد   | مرورگر را در حال اجرا نگه می‌دارد، اتصال WebDriver را قطع می‌کند |
| برنامه موبایل | برنامه را خاتمه می‌دهد          | برنامه را در وضعیت فعلی در حال اجرا نگه می‌دارد   |
| کاربرد       | شروع تمیز برای نشست بعدی        | حفظ وضعیت، بررسی دستی                             |

## ملاحظات عملکردی

### خودکارسازی مرورگر

-   **حالت headless** سریع‌تر است اما عناصر بصری را رندر نمی‌کند
-   **اندازه‌های کوچک‌تر پنجره** زمان گرفتن اسکرین‌شات را کاهش می‌دهند
-   **تشخیص عنصر** با یک بار اجرای اسکریپت بهینه شده است
-   **بهینه‌سازی اسکرین‌شات** تصاویر را برای پردازش کارآمد زیر 1MB نگه می‌دارد

### خودکارسازی موبایل

-   **تجزیه XML منبع صفحه** فقط از ۲ فراخوانی HTTP استفاده می‌کند (در مقایسه با بیش از ۶۰۰ فراخوانی برای کوئری‌های سنتی عناصر)
-   **انتخابگرهای Accessibility ID** سریع‌ترین و قابل‌اعتمادترین هستند
-   **انتخابگرهای XPath** کندترین هستند؛ فقط به عنوان آخرین راه‌حل از آن‌ها استفاده کنید
-   **صفحه‌بندی** (`limit` و `offset`) مصرف توکن را برای صفحه‌هایی با عناصر زیاد کاهش می‌دهد

### نکات مصرف توکن

| تنظیم                      | تأثیر                                                   |
| -------------------------- | ------------------------------------------------------- |
| `inViewportOnly: true`     | عناصر خارج از صفحه را فیلتر کرده و حجم پاسخ را کاهش می‌دهد |
| `includeContainers: false` | عناصر layout را حذف می‌کند (ViewGroup و غیره)           |
| `includeBounds: false`     | داده‌های x/y/width/height را حذف می‌کند                  |
| `limit` همراه با صفحه‌بندی  | عناصر را به جای همه به‌یک‌باره، به صورت دسته‌ای پردازش می‌کند |

## راه‌اندازی سرور Appium

پیش از استفاده از خودکارسازی موبایل، مطمئن شوید که Appium به درستی پیکربندی شده است.

### راه‌اندازی پایه

```sh
# نصب سراسری Appium
npm install -g appium

# نصب درایورها
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# راه‌اندازی سرور
appium
```

### پیکربندی سفارشی سرور

```sh
# راه‌اندازی با host و port سفارشی
appium --address 0.0.0.0 --port 4724

# راه‌اندازی همراه با ثبت لاگ
appium --log-level debug

# راه‌اندازی با مسیر پایه مشخص
appium --base-path /wd/hub
```

### تأیید نصب

```sh
# بررسی درایورهای نصب‌شده
appium driver list --installed

# بررسی نسخه Appium
appium --version

# آزمایش اتصال
curl http://localhost:4723/status
```

## عیب‌یابی پیکربندی

### سرور MCP راه‌اندازی نمی‌شود

1. بررسی کنید که npm/npx نصب شده باشد: `npm --version`
2. اجرای دستی را امتحان کنید: `npx @wdio/mcp`
3. لاگ‌های harness خود را برای یافتن خطاها بررسی کنید

### مشکلات اتصال به Appium

1. بررسی کنید که Appium در حال اجرا باشد: `curl http://localhost:4723/status`
2. بررسی کنید که `appiumConfig` در `start_session` با تنظیمات سرور Appium مطابقت داشته باشد
3. مطمئن شوید که فایروال اجازه اتصال روی پورت Appium را می‌دهد

### نشست شروع نمی‌شود

1. **مرورگر:** مطمئن شوید که مرورگر مورد نظر نصب شده است
2. **iOS:** بررسی کنید که Xcode و شبیه‌سازها در دسترس باشند
3. **Android:** `ANDROID_HOME` را بررسی کنید و مطمئن شوید که امولاتور در حال اجراست
4. لاگ‌های سرور Appium را برای مشاهده پیام‌های خطای دقیق بررسی کنید

### پایان مهلت زمانی نشست‌ها

اگر نشست‌ها در حین اشکال‌زدایی با پایان مهلت زمانی مواجه می‌شوند:
1. هنگام شروع نشست، `newCommandTimeout` را افزایش دهید
2. برای حفظ وضعیت بین نشست‌ها از `noReset: true` استفاده کنید
3. هنگام بستن، برای در حال اجرا نگه داشتن برنامه از `detach: true` استفاده کنید