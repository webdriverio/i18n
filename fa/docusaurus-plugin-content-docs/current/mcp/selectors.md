---
id: selectors
title: انتخابگرها
description: "انتخابگرهایی را برای یافتن عناصر در صفحات وب و اپلیکیشن‌های موبایل هنگام خودکارسازی با سرور MCP در WebdriverIO انتخاب کنید."
---

سرور MCP در WebdriverIO از چندین راهبرد انتخابگر برای یافتن عناصر در صفحات وب و اپلیکیشن‌های موبایل پشتیبانی می‌کند.

:::info

برای مستندات جامع انتخابگرها شامل تمام راهبردهای انتخابگر WebdriverIO، راهنمای اصلی [انتخابگرها](/docs/selectors) را ببینید. این صفحه بر انتخابگرهایی تمرکز دارد که معمولاً همراه با سرور MCP استفاده می‌شوند.

:::

## انتخابگرهای وب

برای خودکارسازی مرورگر، سرور MCP از تمام انتخابگرهای استاندارد WebdriverIO پشتیبانی می‌کند. پرکاربردترین آن‌ها عبارتند از:

| انتخابگر | مثال                           | توضیحات                      |
| -------- | ------------------------------ | ---------------------------- |
| CSS      | `#login-button`, `.submit-btn` | انتخابگرهای استاندارد CSS    |
| XPath    | `//button[@id='submit']`       | عبارات XPath                 |
| Text     | `button=Submit`, `a*=Click`    | انتخابگرهای متنی WebdriverIO |
| ARIA     | `aria/Submit Button`           | انتخابگرهای نام دسترس‌پذیری  |
| Test ID  | `[data-testid="submit"]`       | توصیه‌شده برای تست           |

برای مثال‌های دقیق و بهترین روش‌ها، مستندات [انتخابگرها](/docs/selectors) را ببینید.

## انتخابگرهای موبایل

انتخابگرهای موبایل از طریق Appium با هر دو پلتفرم iOS و Android کار می‌کنند.

### Accessibility ID (توصیه‌شده)

Accessibility IDها **قابل‌اعتمادترین انتخابگر چندسکویی** هستند. آن‌ها هم روی iOS و هم روی Android کار می‌کنند و در به‌روزرسانی‌های اپلیکیشن پایدار می‌مانند.

```text
# نحو
~accessibilityId

# مثال‌ها
~loginButton
~submitForm
~usernameField
```

:::tip بهترین روش
همیشه در صورت امکان Accessibility IDها را ترجیح دهید. آن‌ها موارد زیر را فراهم می‌کنند:
- سازگاری چندسکویی (iOS + Android)
- پایداری در برابر تغییرات رابط کاربری
- نگهداری‌پذیری بهتر تست‌ها
- بهبود دسترس‌پذیری اپلیکیشن شما
:::

### انتخابگرهای Android

#### UiAutomator

انتخابگرهای UiAutomator برای Android قدرتمند و سریع هستند.

```text
# بر اساس متن
android=new UiSelector().text("Login")

# بر اساس بخشی از متن
android=new UiSelector().textContains("Log")

# بر اساس Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# بر اساس نام کلاس
android=new UiSelector().className("android.widget.Button")

# بر اساس توضیحات (دسترس‌پذیری)
android=new UiSelector().description("Login button")

# شرایط ترکیبی
android=new UiSelector().className("android.widget.Button").text("Login")

# کانتینر قابل اسکرول
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource IDها شناسایی پایدار عناصر را در Android فراهم می‌کنند.

```text
# Resource ID کامل
id=com.example.app:id/login_button

# ID جزئی (پکیج اپلیکیشن به‌طور خودکار استنباط می‌شود)
id=login_button
```

#### XPath (Android)

XPath روی Android کار می‌کند اما از UiAutomator کندتر است.

```text
# بر اساس کلاس و متن
//android.widget.Button[@text='Login']

# بر اساس Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# بر اساس Content Description
//android.widget.ImageButton[@content-desc='Menu']

# سلسله‌مراتبی
//android.widget.LinearLayout/android.widget.Button[1]
```

### انتخابگرهای iOS

#### Predicate String

Predicate Stringهای iOS برای خودکارسازی iOS سریع و قدرتمند هستند.

```text
# بر اساس برچسب
-ios predicate string:label == "Login"

# بر اساس بخشی از برچسب
-ios predicate string:label CONTAINS "Log"

# بر اساس نام
-ios predicate string:name == "loginButton"

# بر اساس نوع
-ios predicate string:type == "XCUIElementTypeButton"

# بر اساس مقدار
-ios predicate string:value == "ON"

# شرایط ترکیبی
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# قابلیت مشاهده
-ios predicate string:label == "Login" AND visible == 1

# حساس نبودن به حروف بزرگ و کوچک
-ios predicate string:label ==[c] "login"
```

**عملگرهای Predicate:**

| عملگر        | توضیحات                |
| ------------ | ---------------------- |
| `==`         | برابر است با           |
| `!=`         | برابر نیست با          |
| `CONTAINS`   | شامل زیررشته است       |
| `BEGINSWITH` | شروع می‌شود با         |
| `ENDSWITH`   | پایان می‌یابد با       |
| `LIKE`       | تطبیق با Wildcard      |
| `MATCHES`    | تطبیق با عبارت منظم    |
| `AND`        | AND منطقی              |
| `OR`         | OR منطقی               |

#### Class Chain

Class Chainهای iOS یافتن سلسله‌مراتبی عناصر را با عملکرد خوب فراهم می‌کنند.

```text
# فرزند مستقیم
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# هر نسل فرزندی
-ios class chain:**/XCUIElementTypeButton

# بر اساس اندیس
-ios class chain:**/XCUIElementTypeCell[3]

# ترکیب با Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# سلسله‌مراتبی
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# آخرین عنصر
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath روی iOS کار می‌کند اما از Predicate Stringها کندتر است.

```text
# بر اساس نوع و برچسب
//XCUIElementTypeButton[@label='Login']

# بر اساس نام
//XCUIElementTypeTextField[@name='username']

# بر اساس مقدار
//XCUIElementTypeSwitch[@value='1']

# سلسله‌مراتبی
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## راهبرد انتخابگر چندسکویی

هنگام نوشتن تست‌هایی که باید هم روی iOS و هم روی Android کار کنند، از این ترتیب اولویت استفاده کنید:

### ۱. Accessibility ID (بهترین)

```text
# روی هر دو پلتفرم کار می‌کند
~loginButton
```

### ۲. انتخابگرهای مختص پلتفرم همراه با منطق شرطی

وقتی Accessibility IDها در دسترس نیستند، از انتخابگرهای مختص هر پلتفرم استفاده کنید:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### ۳. XPath (آخرین راه‌حل)

XPath روی هر دو پلتفرم کار می‌کند اما با انواع عناصر متفاوت:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## مرجع انواع عناصر

### انواع عناصر Android

| نوع                           | توضیحات          |
| ----------------------------- | ---------------- |
| `android.widget.Button`       | دکمه             |
| `android.widget.EditText`     | ورودی متن        |
| `android.widget.TextView`     | برچسب متنی       |
| `android.widget.ImageView`    | تصویر            |
| `android.widget.ImageButton`  | دکمه تصویری      |
| `android.widget.CheckBox`     | چک‌باکس          |
| `android.widget.RadioButton`  | دکمه رادیویی     |
| `android.widget.Switch`       | کلید تغییر وضعیت |
| `android.widget.Spinner`      | منوی کشویی       |
| `android.widget.ListView`     | نمای لیست        |
| `android.widget.RecyclerView` | نمای Recycler    |
| `android.widget.ScrollView`   | کانتینر اسکرول   |

### انواع عناصر iOS

| نوع                              | توضیحات          |
| -------------------------------- | ---------------- |
| `XCUIElementTypeButton`          | دکمه             |
| `XCUIElementTypeTextField`       | ورودی متن        |
| `XCUIElementTypeSecureTextField` | ورودی رمز عبور   |
| `XCUIElementTypeStaticText`      | برچسب متنی       |
| `XCUIElementTypeImage`           | تصویر            |
| `XCUIElementTypeSwitch`          | کلید تغییر وضعیت |
| `XCUIElementTypeSlider`          | اسلایدر          |
| `XCUIElementTypePicker`          | چرخ انتخاب‌گر    |
| `XCUIElementTypeTable`           | نمای جدول        |
| `XCUIElementTypeCell`            | سلول جدول        |
| `XCUIElementTypeCollectionView`  | نمای Collection  |
| `XCUIElementTypeScrollView`      | نمای اسکرول      |

## بهترین روش‌ها

### انجام دهید

- **از Accessibility IDها استفاده کنید** برای انتخابگرهای پایدار و چندسکویی
- **ویژگی‌های data-testid را اضافه کنید** به عناصر وب برای تست
- **از Resource IDها استفاده کنید** در Android وقتی Accessibility IDها در دسترس نیستند
- **Predicate Stringها را ترجیح دهید** به XPath در iOS
- **انتخابگرها را ساده** و مشخص نگه دارید

### انجام ندهید

- **از عبارات XPath طولانی پرهیز کنید** - کند و شکننده هستند
- **به اندیس‌ها تکیه نکنید** برای لیست‌های پویا
- **از انتخابگرهای مبتنی بر متن پرهیز کنید** برای اپلیکیشن‌های بومی‌سازی‌شده
- **از XPath مطلق استفاده نکنید** (شروع از ریشه)

### نمونه‌هایی از انتخابگرهای خوب در مقابل بد

```text
# خوب - Accessibility ID پایدار
~loginButton

# بد - XPath شکننده با اندیس‌ها
//div[3]/form/button[2]

# خوب - CSS مشخص با Test ID
[data-testid="submit-button"]

# بد - کلاسی که ممکن است تغییر کند
.btn-primary-lg-v2

# خوب - UiAutomator با Resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# بد - متنی که ممکن است بومی‌سازی شود
android=new UiSelector().text("Submit")
```

## اشکال‌زدایی انتخابگرها

### وب (Chrome DevTools)

1. Chrome DevTools را باز کنید (F12)
2. از پنل Elements برای بررسی عناصر استفاده کنید
3. روی یک عنصر راست‌کلیک کنید ← Copy ← Copy selector
4. انتخابگرها را در Console تست کنید: `document.querySelector('your-selector')`

### موبایل (Appium Inspector)

1. Appium Inspector را اجرا کنید
2. به نشست در حال اجرای خود متصل شوید
3. روی عناصر کلیک کنید تا تمام ویژگی‌های موجود را ببینید
4. از قابلیت "Search for element" برای تست انتخابگرها استفاده کنید

### استفاده از `get_elements`

ابزار `get_elements` در سرور MCP برای هر عنصر چندین راهبرد انتخابگر بازمی‌گرداند:

```text
Ask: "Get all visible elements on the screen"
```

این دستور عناصر را همراه با انتخابگرهای از پیش تولیدشده بازمی‌گرداند که می‌توانید مستقیماً از آن‌ها استفاده کنید.

#### گزینه‌های پیشرفته

برای کنترل بیشتر بر کشف عناصر:

```text
# فقط تصاویر و عناصر بصری را دریافت کنید
Get visible elements with elementType "visual"

# عناصر را همراه با مختصاتشان برای اشکال‌زدایی چیدمان دریافت کنید
Get visible elements with includeBounds enabled

# ۲۰ عنصر بعدی را دریافت کنید (صفحه‌بندی)
Get visible elements with limit 20 and offset 20

# کانتینرهای چیدمان را برای اشکال‌زدایی شامل کنید
Get visible elements with includeContainers enabled
```

این ابزار یک پاسخ صفحه‌بندی‌شده بازمی‌گرداند:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### استفاده از `get_accessibility` (فقط مرورگر)

برای خودکارسازی مرورگر، ابزار `get_accessibility` اطلاعات معنایی درباره عناصر صفحه فراهم می‌کند:

```text
# تمام گره‌های دسترس‌پذیری دارای نام را دریافت کنید
Get accessibility tree

# فیلتر کردن فقط برای دکمه‌ها و لینک‌ها
Get accessibility tree filtered to button and link roles

# صفحه بعدی نتایج را دریافت کنید
Get accessibility tree with limit 50 and offset 50
```

این ابزار زمانی مفید است که `get_elements` عناصر مورد انتظار را بازنمی‌گرداند، زیرا از API بومی دسترس‌پذیری مرورگر پرس‌وجو می‌کند.