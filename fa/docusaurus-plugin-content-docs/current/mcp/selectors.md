---
id: selectors
title: سلکتورها
description: "انتخاب سلکتورها برای یافتن عناصر در صفحات وب و اپلیکیشن‌های موبایل هنگام خودکارسازی با سرور WebdriverIO MCP."
---

سرور WebdriverIO MCP از چندین استراتژی سلکتور برای یافتن عناصر در صفحات وب و اپلیکیشن‌های موبایل پشتیبانی می‌کند.

:::info

برای مستندات جامع سلکتورها، شامل تمام استراتژی‌های سلکتور WebdriverIO، به راهنمای اصلی [سلکتورها](/docs/selectors) مراجعه کنید. این صفحه بر سلکتورهایی تمرکز دارد که معمولاً با سرور MCP استفاده می‌شوند.

:::

## سلکتورهای وب

برای خودکارسازی مرورگر، سرور MCP از تمام سلکتورهای استاندارد WebdriverIO پشتیبانی می‌کند. پرکاربردترین آن‌ها عبارتند از:

| سلکتور | مثال                        | توضیحات                  |
| -------- | ------------------------------ | ---------------------------- |
| CSS      | `#login-button`, `.submit-btn` | سلکتورهای استاندارد CSS       |
| XPath    | `//button[@id='submit']`       | عبارات XPath            |
| Text     | `button=Submit`, `a*=Click`    | سلکتورهای متنی WebdriverIO   |
| ARIA     | `aria/Submit Button`           | سلکتورهای مبتنی بر نام دسترس‌پذیری |
| Test ID  | `[data-testid="submit"]`       | توصیه‌شده برای تست      |

برای مثال‌های دقیق و بهترین روش‌ها، به مستندات [سلکتورها](/docs/selectors) مراجعه کنید.

## سلکتورهای موبایل

سلکتورهای موبایل از طریق Appium روی هر دو پلتفرم iOS و Android کار می‌کنند.

### Accessibility ID (توصیه‌شده)

Accessibility IDها **قابل‌اعتمادترین سلکتور چندپلتفرمی** هستند. آن‌ها روی هر دو پلتفرم iOS و Android کار می‌کنند و در به‌روزرسانی‌های اپلیکیشن پایدار می‌مانند.

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
- سازگاری چندپلتفرمی (iOS + Android)
- پایداری در برابر تغییرات رابط کاربری
- نگهداری‌پذیری بهتر تست‌ها
- بهبود دسترس‌پذیری اپلیکیشن شما
:::

### سلکتورهای Android

#### UiAutomator

سلکتورهای UiAutomator برای Android قدرتمند و سریع هستند.

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

XPath روی Android کار می‌کند اما کندتر از UiAutomator است.

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

### سلکتورهای iOS

#### Predicate String

Predicate Stringهای iOS برای خودکارسازی iOS سریع و قدرتمند هستند.

```text
# بر اساس Label
-ios predicate string:label == "Login"

# بر اساس بخشی از Label
-ios predicate string:label CONTAINS "Log"

# بر اساس Name
-ios predicate string:name == "loginButton"

# بر اساس Type
-ios predicate string:type == "XCUIElementTypeButton"

# بر اساس Value
-ios predicate string:value == "ON"

# شرایط ترکیبی
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# قابلیت مشاهده
-ios predicate string:label == "Login" AND visible == 1

# بدون حساسیت به حروف بزرگ و کوچک
-ios predicate string:label ==[c] "login"
```

**عملگرهای Predicate:**

| عملگر     | توضیحات        |
| ------------ | ------------------ |
| `==`         | برابر است با             |
| `!=`         | برابر نیست با         |
| `CONTAINS`   | شامل زیررشته است |
| `BEGINSWITH` | شروع می‌شود با        |
| `ENDSWITH`   | پایان می‌یابد با          |
| `LIKE`       | تطبیق با کاراکتر جایگزین (Wildcard)     |
| `MATCHES`    | تطبیق با عبارت باقاعده (Regex)        |
| `AND`        | AND منطقی        |
| `OR`         | OR منطقی         |

#### Class Chain

Class Chainهای iOS یافتن سلسله‌مراتبی عناصر را با کارایی خوب فراهم می‌کنند.

```text
# فرزند مستقیم
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# هر نوادهٔ دلخواه
-ios class chain:**/XCUIElementTypeButton

# بر اساس ایندکس
-ios class chain:**/XCUIElementTypeCell[3]

# ترکیب با Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# سلسله‌مراتبی
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# آخرین عنصر
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath روی iOS کار می‌کند اما کندتر از Predicate Stringها است.

```text
# بر اساس Type و Label
//XCUIElementTypeButton[@label='Login']

# بر اساس Name
//XCUIElementTypeTextField[@name='username']

# بر اساس Value
//XCUIElementTypeSwitch[@value='1']

# سلسله‌مراتبی
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## استراتژی سلکتور چندپلتفرمی

هنگام نوشتن تست‌هایی که باید روی هر دو پلتفرم iOS و Android کار کنند، از این ترتیب اولویت استفاده کنید:

### ۱. Accessibility ID (بهترین)

```text
# روی هر دو پلتفرم کار می‌کند
~loginButton
```

### ۲. سلکتورهای مختص پلتفرم همراه با منطق شرطی

وقتی Accessibility IDها در دسترس نیستند، از سلکتورهای مختص هر پلتفرم استفاده کنید:

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

| نوع                          | توضیحات      |
| ----------------------------- | ---------------- |
| `android.widget.Button`       | دکمه           |
| `android.widget.EditText`     | ورودی متن       |
| `android.widget.TextView`     | برچسب متنی       |
| `android.widget.ImageView`    | تصویر            |
| `android.widget.ImageButton`  | دکمهٔ تصویری     |
| `android.widget.CheckBox`     | چک‌باکس         |
| `android.widget.RadioButton`  | دکمهٔ رادیویی     |
| `android.widget.Switch`       | کلید تغییر وضعیت    |
| `android.widget.Spinner`      | منوی کشویی         |
| `android.widget.ListView`     | نمای لیست        |
| `android.widget.RecyclerView` | نمای Recycler    |
| `android.widget.ScrollView`   | کانتینر اسکرول |

### انواع عناصر iOS

| نوع                             | توضیحات     |
| -------------------------------- | --------------- |
| `XCUIElementTypeButton`          | دکمه          |
| `XCUIElementTypeTextField`       | ورودی متن      |
| `XCUIElementTypeSecureTextField` | ورودی رمز عبور  |
| `XCUIElementTypeStaticText`      | برچسب متنی      |
| `XCUIElementTypeImage`           | تصویر           |
| `XCUIElementTypeSwitch`          | کلید تغییر وضعیت   |
| `XCUIElementTypeSlider`          | اسلایدر          |
| `XCUIElementTypePicker`          | چرخ انتخاب    |
| `XCUIElementTypeTable`           | نمای جدول      |
| `XCUIElementTypeCell`            | سلول جدول      |
| `XCUIElementTypeCollectionView`  | نمای Collection |
| `XCUIElementTypeScrollView`      | نمای اسکرول     |

## بهترین روش‌ها

### انجام دهید

- **از Accessibility IDها استفاده کنید** تا سلکتورهایی پایدار و چندپلتفرمی داشته باشید
- **ویژگی‌های data-testid را اضافه کنید** به عناصر وب برای تست
- **از Resource IDها استفاده کنید** در Android وقتی Accessibility IDها در دسترس نیستند
- **Predicate Stringها را ترجیح دهید** به XPath در iOS
- **سلکتورها را ساده** و مشخص نگه دارید

### انجام ندهید

- **از عبارات XPath طولانی پرهیز کنید** - آن‌ها کند و شکننده هستند
- **به ایندکس‌ها تکیه نکنید** برای لیست‌های پویا
- **از سلکتورهای مبتنی بر متن پرهیز کنید** برای اپلیکیشن‌های بومی‌سازی‌شده
- **از XPath مطلق استفاده نکنید** (که از ریشه شروع می‌شود)

### نمونه‌هایی از سلکتورهای خوب در مقابل بد

```text
# خوب - Accessibility ID پایدار
~loginButton

# بد - XPath شکننده با ایندکس‌ها
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

## اشکال‌زدایی سلکتورها

### وب (Chrome DevTools)

1. Chrome DevTools را باز کنید (F12)
2. از پنل Elements برای بررسی عناصر استفاده کنید
3. روی یک عنصر راست‌کلیک کنید ← Copy ← Copy selector
4. سلکتورها را در Console تست کنید: `document.querySelector('your-selector')`

### موبایل (Appium Inspector)

1. Appium Inspector را اجرا کنید
2. به نشست (session) در حال اجرای خود متصل شوید
3. روی عناصر کلیک کنید تا تمام ویژگی‌های موجود را ببینید
4. از قابلیت "Search for element" برای تست سلکتورها استفاده کنید

### استفاده از `get_elements`

ابزار `get_elements` سرور MCP برای هر عنصر چندین استراتژی سلکتور برمی‌گرداند:

```text
Ask: "Get all visible elements on the screen"
```

این ابزار عناصر را همراه با سلکتورهای از پیش تولیدشده‌ای برمی‌گرداند که می‌توانید مستقیماً از آن‌ها استفاده کنید.

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

این ابزار یک پاسخ صفحه‌بندی‌شده برمی‌گرداند:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### استفاده از `get_accessibility` (فقط مرورگر)

برای خودکارسازی مرورگر، ابزار `get_accessibility` اطلاعات معنایی دربارهٔ عناصر صفحه فراهم می‌کند:

```text
# تمام گره‌های دسترس‌پذیری دارای نام را دریافت کنید
Get accessibility tree

# فیلتر کردن فقط به نقش‌های button و link
Get accessibility tree filtered to button and link roles

# صفحهٔ بعدی نتایج را دریافت کنید
Get accessibility tree with limit 50 and offset 50
```

این ابزار زمانی مفید است که `get_elements` عناصر مورد انتظار را برنگرداند، زیرا از API بومی دسترس‌پذیری مرورگر پرس‌وجو می‌کند.