---
id: configuration
title: پیکربندی
description: "پیکربندی سرور MCP در WebdriverIO، شامل گزینه‌های نشست، مرورگر، موبایل، ارائه‌دهنده ابری، تشخیص عناصر و Appium."
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

تمام گزینه‌های نشست به ابزار `start_session` ارسال می‌شوند. یک ابزار واحد برای نشست‌های مرورگر و موبایل وجود دارد؛ پارامتر `platform` نوع نشست را تعیین می‌کند.

### گزینه‌های مشترک

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="بله">

پلتفرمی که باید خودکارسازی شود.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="خیر">

محل اجرای نشست. برای دستگاه‌های راه دور از نام یک ارائه‌دهنده ابری استفاده کنید؛ هر کدام به متغیرهای محیطی خاص خود نیاز دارند. برای جزئیات بیشتر به [ارائه‌دهندگان ابری](./cloud-providers) مراجعه کنید.

</Option>
## گزینه‌های نشست مرورگر

گزینه‌ها برای نشست‌های `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="بله (برای پلتفرم مرورگر)">

مرورگری که باید اجرا شود.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="خیر">

نسخه مرورگر. فقط برای ارائه‌دهندگان ابری (پیش‌فرض: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="خیر">

سیستم‌عامل برای نشست‌های مرورگر ارائه‌دهنده ابری. مثال‌ها: `os: "Windows"`، `osVersion: "11"` یا `os: "OS X"`، `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="خیر">

اجرای مرورگر در حالت headless (بدون پنجره قابل مشاهده). برای دیدن مرورگر، آن را روی `false` تنظیم کنید.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="خیر">

-   **محدوده:** `400` - `3840`

عرض اولیه پنجره مرورگر بر حسب پیکسل.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="خیر">

-   **محدوده:** `400` - `2160`

ارتفاع اولیه پنجره مرورگر بر حسب پیکسل.

</Option>
### `navigationUrl`

<Option type="string" required="خیر">

URL‌ای که بلافاصله پس از شروع مرورگر به آن هدایت می‌شود. کارآمدتر از فراخوانی جداگانه `start_session` و سپس `navigate` است.

</Option>
### `attach`

<Option type="boolean" default="false" required="خیر">

اتصال به یک نمونه موجود از Chrome به جای اجرای نمونه جدید. پس از `launch_chrome` برای اتصال از طریق CDP استفاده کنید.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="خیر">

پیکربندی اتصال اشکال‌زدایی راه دور Chrome. فقط زمانی اعمال می‌شود که `attach: true` باشد.

</Option>
## گزینه‌های نشست موبایل

گزینه‌ها برای نشست‌های `platform: "ios"` یا `platform: "android"`.

### `deviceName`

<Option type="string" required="بله (برای پلتفرم‌های موبایل)">

نام دستگاه، شبیه‌ساز (simulator) یا امولاتور.

**مثال‌ها:**
-   شبیه‌ساز iOS: `"iPhone 16"`، `"iPad Air (5th generation)"`
-   امولاتور Android: `"Pixel 7"`، `"Nexus 5X"`
-   دستگاه واقعی: نام دستگاه همان‌طور که در سیستم شما نمایش داده می‌شود

</Option>
### `platformVersion`

<Option type="string" required="خیر">

نسخه سیستم‌عامل دستگاه/شبیه‌ساز/امولاتور (مثلاً `"18.0"` برای iOS، `"14"` برای Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="خیر">

درایور خودکارسازی. به‌طور پیش‌فرض برای iOS مقدار `XCUITest` و برای Android مقدار `UiAutomator2` است.

</Option>
### `udid`

<Option type="string" required="خیر (برای دستگاه‌های واقعی iOS الزامی است)">

شناسه یکتای دستگاه (Unique Device Identifier). برای دستگاه‌های واقعی iOS الزامی است (شناسه ۴۰ کاراکتری).

**یافتن UDID:**
-   **iOS:** دستگاه را متصل کنید، Finder را باز کنید، روی دستگاه کلیک کنید ← Serial Number (برای نمایش UDID کلیک کنید)
-   **Android:** دستور `adb devices` را در ترمینال اجرا کنید

</Option>
### `appPath`

<Option type="string" required="خیر">

مسیر فایل اپلیکیشن برای نصب و اجرا.

**فرمت‌های پشتیبانی‌شده:**
-   شبیه‌ساز iOS: دایرکتوری `.app`
-   دستگاه واقعی iOS: فایل `.ipa`
-   Android: فایل `.apk`

یا باید `appPath` ارائه شود، یا `noReset: true` برای اتصال به اپلیکیشنی که از قبل در حال اجراست.

</Option>
### `app`

<Option type="string" required="خیر">

URL اپلیکیشن ارائه‌دهنده ابری (`bs://...` برای BrowserStack، `storage:filename=` برای Sauce Labs، `lt://...` برای TestMu، app_url در TestingBot) یا `customId`. به جای `appPath` برای نشست‌های موبایل ابری استفاده می‌شود.

</Option>
### `appWaitActivity`

<Option type="string" required="خیر (فقط Android)">

Activity‌ای که هنگام اجرای اپلیکیشن باید منتظر آن ماند. اگر مشخص نشود، Activity اصلی/لانچر اپلیکیشن استفاده می‌شود.

**مثال:** `"com.example.app.MainActivity"`

</Option>
### گزینه‌های وضعیت نشست

#### `noReset`

<Option type="boolean" required="خیر">

حفظ وضعیت اپلیکیشن بین نشست‌ها. وقتی `true` باشد:
-   داده‌های اپلیکیشن حفظ می‌شوند (وضعیت ورود، تنظیمات و غیره)
-   نشست به جای بسته شدن، **جدا (detach)** می‌شود (اپلیکیشن در حال اجرا باقی می‌ماند)
-   می‌توان بدون `appPath` برای اتصال به اپلیکیشنی که از قبل در حال اجراست استفاده کرد

</Option>
#### `fullReset`

<Option type="boolean" required="خیر">

بازنشانی کامل اپلیکیشن قبل از نشست:
-   iOS: اپلیکیشن را حذف و دوباره نصب می‌کند
-   Android: داده‌ها و کش اپلیکیشن را پاک می‌کند

برای حفظ کامل وضعیت اپلیکیشن، `fullReset: false` را همراه با `noReset: true` تنظیم کنید.

</Option>
### مهلت زمانی نشست

#### `newCommandTimeout`

<Option type="number" default="300" required="خیر">

مدت زمانی (بر حسب ثانیه) که Appium پیش از پایان دادن به نشست منتظر یک دستور جدید می‌ماند. برای نشست‌های اشکال‌زدایی طولانی‌تر آن را افزایش دهید.

</Option>
### مدیریت خودکار

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="خیر">

اعطای خودکار مجوزهای اپلیکیشن هنگام نصب/اجرا (دوربین، میکروفون، موقعیت مکانی و غیره).

:::note فقط Android
این گزینه عمدتاً روی Android تأثیر دارد. مجوزهای iOS به دلیل محدودیت‌های سیستمی باید به روش دیگری مدیریت شوند.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="خیر">

پذیرش خودکار هشدارهای سیستمی (دیالوگ‌ها) در حین خودکارسازی ("Allow notifications?" و غیره).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="خیر">

رد کردن هشدارهای سیستمی به جای پذیرش آن‌ها. وقتی `true` باشد، بر `autoAcceptAlerts` اولویت دارد.

</Option>
### اتصال به سرور Appium

با استفاده از `appiumConfig`، اتصال به سرور Appium را برای هر نشست به‌صورت جداگانه بازنویسی کنید:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="خیر">

اتصال به سرور Appium. مقدار پیش‌فرض `{ host: "127.0.0.1", port: 4723, path: "/" }` است.

</Option>
## گزینه‌های ارائه‌دهنده ابری

### اعتبارنامه‌ها

هر ارائه‌دهنده ابری به متغیرهای محیطی خاص خود نیاز دارد:

| ارائه‌دهنده     | متغیر نام کاربری       | متغیر کلید دسترسی       |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

این متغیرها را قبل از شروع سرور MCP تنظیم کنید.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="خیر">

منطقه مرکز داده Sauce Labs. برای سایر ارائه‌دهندگان نادیده گرفته می‌شود.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="خیر">

فعال‌سازی مسیریابی تونل محلی برای نشست‌های ارائه‌دهنده ابری (دسترسی به localhost، محیط‌های staging، سرویس‌های داخلی).

-   `true` — تونل را به‌طور خودکار قبل از نشست شروع کرده و هنگام بسته شدن متوقف می‌کند
-   `"external"` — تونل از قبل به‌صورت خارجی در حال اجراست؛ فقط فلگ‌های مناسب ارائه‌دهنده را تنظیم می‌کند

قبل از استفاده از `true`، منبع local-binary ارائه‌دهنده (`wdio://browserstack/local-binary`، `wdio://saucelabs/local-binary`، `wdio://testmu/local-binary` یا `wdio://testingbot/local-binary`) را برای دستورالعمل‌های راه‌اندازی مخصوص سیستم‌عامل و معماری خود مطالعه کنید.

</Option>
### `tunnelName`

<Option type="string" required="خیر">

نام شناسه تونل. وقتی `tunnel: "external"` باشد، برای تطبیق با تونل در حال اجرا الزامی است. وقتی `tunnel: true` باشد، در صورت عدم ارائه، یک نام یکتا به‌طور خودکار تولید می‌شود.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="خیر">

برچسب‌های نشست ارائه‌دهنده ابری که در داشبورد ارائه‌دهنده قابل مشاهده هستند. در BrowserStack، Sauce Labs، TestMu و TestingBot به‌طور یکسان کار می‌کند.

</Option>
### `trace`

<Option type="boolean" default="false" required="خیر">

فعال‌سازی ضبط trace. یک فایل zip با پسوند `.trace` سازگار با Playwright تولید می‌کند که هنگام `close_session` در `.trace/` ذخیره می‌شود. traceها را در [player.vibium.dev](https://player.vibium.dev) مشاهده کنید.

</Option>
## گزینه‌های تشخیص عناصر

گزینه‌ها برای ابزار `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="خیر">

فقط عناصری را برمی‌گرداند که در viewport فعلی قابل مشاهده هستند. برای کاهش نتایج در صفحات طولانی، آن را روی `true` تنظیم کنید.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="خیر">

شامل کردن عناصر container/layout در نتایج:

**containerهای Android:** `ViewGroup`، `FrameLayout`، `LinearLayout`، `RelativeLayout`، `ConstraintLayout`، `ScrollView`، `RecyclerView`

**containerهای iOS:** `View`، `StackView`، `CollectionView`، `ScrollView`، `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="خیر">

شامل کردن مختصات کادر محدودکننده عنصر (x، y، width، height) در پاسخ.

</Option>
### صفحه‌بندی

#### `limit`

<Option type="number" default="0 (نامحدود)" required="خیر">

حداکثر تعداد عناصری که باید برگردانده شوند.

</Option>
#### `offset`

<Option type="number" default="0" required="خیر">

تعداد عناصری که قبل از برگرداندن نتایج باید رد شوند.

**مثال:** دریافت عناصر ۲۱ تا ۴۰:
```text
Get elements with limit 20 and offset 20
```

</Option>
## گزینه‌های درخت دسترسی‌پذیری

گزینه‌ها برای ابزار `get_accessibility_tree` (فقط مرورگر).

### `limit`

<Option type="number" default="0 (نامحدود)" required="خیر">

حداکثر تعداد گره‌هایی که باید برگردانده شوند.

</Option>
### `offset`

<Option type="number" default="0" required="خیر">

تعداد گره‌هایی که برای صفحه‌بندی باید رد شوند.

</Option>
### `roles`

<Option type="string[]" default="همه نقش‌ها" required="خیر">

فیلتر کردن بر اساس نقش‌های دسترسی‌پذیری خاص.

**نقش‌های رایج:** `button`، `link`، `textbox`، `checkbox`، `radio`، `heading`، `img`، `listitem`

**مثال:** دریافت فقط دکمه‌ها و لینک‌ها:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## اسکرین‌شات

ابزار `get_screenshot` هیچ پارامتری نمی‌گیرد. اسکرین‌شات‌ها به‌طور خودکار پردازش می‌شوند:

| بهینه‌سازی  | مقدار    | توضیحات                                       |
| ------------- | -------- | ------------------------------------------------- |
| حداکثر ابعاد | 2000px   | تصاویر بزرگ‌تر از 2000px کوچک می‌شوند         |
| حداکثر حجم فایل | 1MB      | تصاویر فشرده می‌شوند تا زیر 1MB بمانند           |
| فرمت        | PNG/JPEG | PNG با حداکثر فشرده‌سازی؛ در صورت نیاز به کاهش حجم، JPEG |

## رفتار نشست

### انواع نشست

| نوع      | توضیحات         | جداسازی خودکار                              |
| --------- | ------------------- | ---------------------------------------- |
| `browser` | نشست مرورگر     | خیر                                       |
| `ios`     | نشست اپلیکیشن iOS     | بله (اگر `noReset: true` باشد یا `appPath` وجود نداشته باشد) |
| `android` | نشست اپلیکیشن Android | بله (اگر `noReset: true` باشد یا `appPath` وجود نداشته باشد) |

### مدل تک‌نشستی

سرور MCP با یک **مدل تک‌نشستی** کار می‌کند:

-   در هر زمان فقط یک نشست مرورگر یا اپلیکیشن می‌تواند فعال باشد
-   شروع یک نشست جدید، نشست فعلی را می‌بندد/جدا می‌کند
-   وضعیت نشست به‌صورت سراسری در بین فراخوانی‌های ابزار حفظ می‌شود

### جداسازی در مقابل بستن

| عملیات     | `detach: false` (بستن)      | `detach: true` (جداسازی)                      |
| ---------- | ---------------------------- | -------------------------------------------- |
| مرورگر    | مرورگر را به‌طور کامل می‌بندد    | مرورگر را در حال اجرا نگه می‌دارد و WebDriver را قطع می‌کند |
| اپلیکیشن موبایل | اپلیکیشن را خاتمه می‌دهد               | اپلیکیشن را در وضعیت فعلی در حال اجرا نگه می‌دارد           |
| کاربرد   | شروع از صفر برای نشست بعدی | حفظ وضعیت، بررسی دستی            |

## ملاحظات عملکردی

### خودکارسازی مرورگر

-   **حالت headless** سریع‌تر است اما عناصر بصری را رندر نمی‌کند
-   **اندازه‌های کوچک‌تر پنجره** زمان گرفتن اسکرین‌شات را کاهش می‌دهند
-   **تشخیص عناصر** با یک بار اجرای اسکریپت بهینه شده است
-   **بهینه‌سازی اسکرین‌شات** تصاویر را برای پردازش کارآمد زیر 1MB نگه می‌دارد

### خودکارسازی موبایل

-   **تجزیه XML منبع صفحه** فقط از ۲ فراخوانی HTTP استفاده می‌کند (در مقابل بیش از ۶۰۰ فراخوانی برای کوئری‌های سنتی عناصر)
-   **انتخابگرهای Accessibility ID** سریع‌ترین و قابل‌اعتمادترین هستند
-   **انتخابگرهای XPath** کندترین هستند؛ فقط به عنوان آخرین راه‌حل از آن‌ها استفاده کنید
-   **صفحه‌بندی** (`limit` و `offset`) مصرف توکن را برای صفحه‌هایی با عناصر زیاد کاهش می‌دهد

### نکات مصرف توکن

| تنظیم                    | تأثیر                                              |
| -------------------------- | --------------------------------------------------- |
| `inViewportOnly: true`     | عناصر خارج از صفحه را فیلتر می‌کند و حجم پاسخ را کاهش می‌دهد |
| `includeContainers: false` | عناصر layout را حذف می‌کند (ViewGroup و غیره)          |
| `includeBounds: false`     | داده‌های x/y/width/height را حذف می‌کند                         |
| `limit` همراه با صفحه‌بندی    | عناصر را به‌صورت دسته‌ای به جای همه به‌یکباره پردازش می‌کند  |

## راه‌اندازی سرور Appium

قبل از استفاده از خودکارسازی موبایل، مطمئن شوید که Appium به‌درستی پیکربندی شده است.

### راه‌اندازی پایه

```sh
# نصب سراسری Appium
npm install -g appium

# نصب درایورها
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# شروع سرور
appium
```

### پیکربندی سفارشی سرور

```sh
# شروع با host و port سفارشی
appium --address 0.0.0.0 --port 4724

# شروع با لاگ‌گیری
appium --log-level debug

# شروع با مسیر پایه مشخص
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

### سرور MCP شروع نمی‌شود

1. تأیید کنید که npm/npx نصب شده است: `npm --version`
2. اجرای دستی را امتحان کنید: `npx @wdio/mcp`
3. لاگ‌های harness خود را برای یافتن خطاها بررسی کنید

### مشکلات اتصال Appium

1. تأیید کنید که Appium در حال اجراست: `curl http://localhost:4723/status`
2. بررسی کنید که `appiumConfig` در `start_session` با تنظیمات سرور Appium مطابقت داشته باشد
3. مطمئن شوید که فایروال اجازه اتصال روی پورت Appium را می‌دهد

### نشست شروع نمی‌شود

1. **مرورگر:** مطمئن شوید که مرورگر هدف نصب شده است
2. **iOS:** تأیید کنید که Xcode و شبیه‌سازها در دسترس هستند
3. **Android:** `ANDROID_HOME` را بررسی کنید و مطمئن شوید امولاتور در حال اجراست
4. لاگ‌های سرور Appium را برای پیام‌های خطای دقیق بررسی کنید

### پایان مهلت زمانی نشست‌ها

اگر نشست‌ها در حین اشکال‌زدایی با پایان مهلت زمانی مواجه می‌شوند:
1. هنگام شروع نشست، `newCommandTimeout` را افزایش دهید
2. از `noReset: true` برای حفظ وضعیت بین نشست‌ها استفاده کنید
3. هنگام بستن، از `detach: true` برای در حال اجرا نگه داشتن اپلیکیشن استفاده کنید