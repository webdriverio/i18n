---
id: selectors
title: انتخابگرها
---

سرور WebdriverIO MCP از استراتژی‌های انتخابگر متعددی برای پیدا کردن عناصر در صفحات وب و برنامه‌های موبایل پشتیبانی می‌کند.

:::info

برای مستندات جامع انتخابگرها شامل تمامی استراتژی‌های انتخابگر WebdriverIO، راهنمای اصلی [Selectors](/docs/selectors) را ببینید. این صفحه بر روی انتخابگرهایی که معمولاً با سرور MCP استفاده می‌شوند تمرکز دارد.

:::

## انتخابگرهای وب

برای اتوماسیون مرورگر، سرور MCP از تمامی انتخابگرهای استاندارد WebdriverIO پشتیبانی می‌کند. رایج‌ترین موارد عبارتند از:

| انتخابگر | مثال | توضیحات |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | انتخابگرهای CSS استاندارد |
| XPath | `//button[@id='submit']` | عبارات XPath |
| متن | `button=Submit`, `a*=Click` | انتخابگرهای متنی WebdriverIO |
| ARIA | `aria/Submit Button` | انتخابگرهای نام دسترسی‌پذیری |
| Test ID | `[data-testid="submit"]` | توصیه شده برای تست |

برای مثال‌های دقیق و بهترین شیوه‌ها، مستندات [Selectors](/docs/selectors) را ببینید.

---

## انتخابگرهای موبایل

انتخابگرهای موبایل با هر دو پلتفرم iOS و Android از طریق Appium کار می‌کنند.

### شناسه دسترسی‌پذیری (توصیه شده)

شناسه‌های دسترسی‌پذیری **قابل اعتمادترین انتخابگر چند پلتفرمی** هستند. آنها روی هر دو پلتفرم iOS و Android کار می‌کنند و در بروزرسانی‌های برنامه پایدار هستند.

```
# نحو
~accessibilityId

# مثال‌ها
~loginButton
~submitForm
~usernameField
```

:::tip بهترین شیوه
همیشه در صورت وجود، شناسه‌های دسترسی‌پذیری را ترجیح دهید. آنها موارد زیر را فراهم می‌کنند:
- سازگاری بین پلتفرم‌ها (iOS + Android)
- پایداری در برابر تغییرات رابط کاربری
- قابلیت نگهداری بهتر تست‌ها
- بهبود دسترسی‌پذیری برنامه شما
:::

### انتخابگرهای Android

#### UiAutomator

انتخابگرهای UiAutomator برای Android قدرتمند و سریع هستند.

```
# براساس متن
android=new UiSelector().text("Login")

# براساس متن جزئی
android=new UiSelector().textContains("Log")

# براساس شناسه منبع
android=new UiSelector().resourceId("com.example:id/login_button")

# براساس نام کلاس
android=new UiSelector().className("android.widget.Button")

# براساس توضیحات (دسترسی‌پذیری)
android=new UiSelector().description("Login button")

# شرایط ترکیبی
android=new UiSelector().className("android.widget.Button").text("Login")

# کانتینر قابل اسکرول
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### شناسه منبع

شناسه‌های منبع، شناسایی پایدار عناصر را در Android فراهم می‌کنند.

```
# شناسه منبع کامل
id=com.example.app:id/login_button

# شناسه جزئی (بسته برنامه استنباط می‌شود)
id=login_button
```

#### XPath (Android)

XPath در Android کار می‌کند اما از UiAutomator کندتر است.

```
# براساس کلاس و متن
//android.widget.Button[@text='Login']

# براساس شناسه منبع
//android.widget.EditText[@resource-id='com.example:id/username']

# براساس توضیحات محتوا
//android.widget.ImageButton[@content-desc='Menu']

# سلسله مراتبی
//android.widget.LinearLayout/android.widget.Button[1]
```

### انتخابگرهای iOS

#### رشته Predicate

رشته‌های Predicate iOS برای اتوماسیون iOS سریع و قدرتمند هستند.

```
# براساس برچسب
-ios predicate string:label == "Login"

# براساس برچسب جزئی
-ios predicate string:label CONTAINS "Log"

# براساس نام
-ios predicate string:name == "loginButton"

# براساس نوع
-ios predicate string:type == "XCUIElementTypeButton"

# براساس مقدار
-ios predicate string:value == "ON"

# شرایط ترکیبی
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# قابلیت مشاهده
-ios predicate string:label == "Login" AND visible == 1

# غیرحساس به حروف بزرگ و کوچک
-ios predicate string:label ==[c] "login"
```

**عملگرهای Predicate:**

| عملگر | توضیحات |
|----------|-------------|
| `==` | برابر |
| `!=` | نابرابر |
| `CONTAINS` | شامل زیررشته |
| `BEGINSWITH` | شروع با |
| `ENDSWITH` | پایان با |
| `LIKE` | تطابق با الگو |
| `MATCHES` | تطابق با regex |
| `AND` | AND منطقی |
| `OR` | OR منطقی |

#### زنجیره کلاس

زنجیره‌های کلاس iOS مکان‌یابی سلسله مراتبی عناصر با کارایی خوب را فراهم می‌کنند.

```
# فرزند مستقیم
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# هر فرزند
-ios class chain:**/XCUIElementTypeButton

# براساس شاخص
-ios class chain:**/XCUIElementTypeCell[3]

# ترکیب با Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# سلسله مراتبی
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# آخرین عنصر
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath در iOS کار می‌کند اما از رشته‌های predicate کندتر است.

```
# براساس نوع و برچسب
//XCUIElementTypeButton[@label='Login']

# براساس نام
//XCUIElementTypeTextField[@name='username']

# براساس مقدار
//XCUIElementTypeSwitch[@value='1']

# سلسله مراتبی
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## استراتژی انتخابگر چند پلتفرمی

هنگام نوشتن تست‌هایی که باید روی هر دو پلتفرم iOS و Android کار کنند، از این ترتیب اولویت استفاده کنید:

### 1. شناسه دسترسی‌پذیری (بهترین)

```
# روی هر دو پلتفرم کار می‌کند
~loginButton
```

### 2. انتخابگرهای مختص پلتفرم با منطق شرطی

وقتی شناسه‌های دسترسی‌پذیری در دسترس نیستند، از انتخابگرهای مختص پلتفرم استفاده کنید:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (آخرین راه‌حل)

XPath روی هر دو پلتفرم کار می‌کند اما با انواع عنصر متفاوت:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## مرجع انواع عنصر

### انواع عنصر Android

| نوع | توضیحات |
|------|-------------|
| `android.widget.Button` | دکمه |
| `android.widget.EditText` | ورودی متن |
| `android.widget.TextView` | برچسب متنی |
| `android.widget.ImageView` | تصویر |
| `android.widget.ImageButton` | دکمه تصویری |
| `android.widget.CheckBox` | چک‌باکس |
| `android.widget.RadioButton` | دکمه رادیویی |
| `android.widget.Switch` | کلید تغییر وضعیت |
| `android.widget.Spinner` | منوی کشویی |
| `android.widget.ListView` | نمای لیست |
| `android.widget.RecyclerView` | نمای بازیافت‌کننده |
| `android.widget.ScrollView` | کانتینر اسکرول |

### انواع عنصر iOS

| نوع | توضیحات |
|------|-------------|
| `XCUIElementTypeButton` | دکمه |
| `XCUIElementTypeTextField` | ورودی متن |
| `XCUIElementTypeSecureTextField` | ورودی رمز عبور |
| `XCUIElementTypeStaticText` | برچسب متنی |
| `XCUIElementTypeImage` | تصویر |
| `XCUIElementTypeSwitch` | کلید تغییر وضعیت |
| `XCUIElementTypeSlider` | اسلایدر |
| `XCUIElementTypePicker` | انتخابگر چرخشی |
| `XCUIElementTypeTable` | نمای جدول |
| `XCUIElementTypeCell` | سلول جدول |
| `XCUIElementTypeCollectionView` | نمای مجموعه |
| `XCUIElementTypeScrollView` | نمای اسکرول |

---

## بهترین شیوه‌ها

### انجام دهید

- **از شناسه‌های دسترسی‌پذیری** برای انتخابگرهای پایدار و چند پلتفرمی استفاده کنید
- **ویژگی‌های data-testid** را به عناصر وب برای تست اضافه کنید
- **از شناسه‌های منبع** در Android وقتی شناسه‌های دسترسی‌پذیری در دسترس نیستند استفاده کنید
- **رشته‌های predicate را به XPath** در iOS ترجیح دهید
- **انتخابگرها را ساده** و خاص نگه دارید

### انجام ندهید

- **از عبارات طولانی XPath اجتناب کنید** - آنها کند و شکننده هستند
- **به شاخص‌ها** برای لیست‌های پویا تکیه نکنید
- **از انتخابگرهای مبتنی بر متن** برای برنامه‌های محلی‌سازی شده اجتناب کنید
- **از XPath مطلق** (شروع از ریشه) استفاده نکنید

### مثال‌هایی از انتخابگرهای خوب در مقابل بد

```
# خوب - شناسه دسترسی‌پذیری پایدار
~loginButton

# بد - XPath شکننده با شاخص‌ها
//div[3]/form/button[2]

# خوب - CSS خاص با شناسه تست
[data-testid="submit-button"]

# بد - کلاسی که ممکن است تغییر کند
.btn-primary-lg-v2

# خوب - UiAutomator با شناسه منبع
android=new UiSelector().resourceId("com.app:id/submit")

# بد - متنی که ممکن است محلی‌سازی شود
android=new UiSelector().text("Submit")
```

---

## اشکال‌زدایی انتخابگرها

### وب (Chrome DevTools)

1. Chrome DevTools را باز کنید (F12)
2. از پنل Elements برای بررسی عناصر استفاده کنید
3. روی عنصر راست کلیک کنید → Copy → Copy selector
4. انتخابگرها را در کنسول تست کنید: `document.querySelector('your-selector')`

### موبایل (Appium Inspector)

1. Appium Inspector را اجرا کنید
2. به جلسه در حال اجرای خود متصل شوید
3. روی عناصر کلیک کنید تا تمام ویژگی‌های در دسترس را ببینید
4. از ویژگی "Search for element" برای تست انتخابگرها استفاده کنید

### استفاده از `get_visible_elements`

ابزار `get_visible_elements` سرور MCP، چندین استراتژی انتخابگر را برای هر عنصر برمی‌گرداند:

```
Ask Claude: "Get all visible elements on the screen"
```

این عناصر را با انتخابگرهای از پیش تولید شده برمی‌گرداند که می‌توانید مستقیماً استفاده کنید.

#### گزینه‌های پیشرفته

برای کنترل بیشتر روی کشف عنصر:

```
# فقط تصاویر و عناصر بصری را دریافت کنید
Get visible elements with elementType "visual"

# عناصر را با مختصات آنها برای اشکال‌زدایی طرح‌بندی دریافت کنید
Get visible elements with includeBounds enabled

# 20 عنصر بعدی را دریافت کنید (صفحه‌بندی)
Get visible elements with limit 20 and offset 20

# کانتینرهای طرح‌بندی را برای اشکال‌زدایی شامل کنید
Get visible elements with includeContainers enabled
```

این ابزار یک پاسخ صفحه‌بندی شده را برمی‌گرداند:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### استفاده از `get_accessibility` (فقط مرورگر)

برای اتوماسیون مرورگر، ابزار `get_accessibility` اطلاعات معنایی درباره عناصر صفحه فراهم می‌کند:

```
# تمام گره‌های دسترسی‌پذیری نام‌گذاری شده را دریافت کنید
Get accessibility tree

# فقط برای دکمه‌ها و لینک‌ها فیلتر کنید
Get accessibility tree filtered to button and link roles

# صفحه بعدی نتایج را دریافت کنید
Get accessibility tree with limit 50 and offset 50
```

این زمانی مفید است که `get_visible_elements` عناصر مورد انتظار را برنمی‌گرداند، زیرا از API دسترسی‌پذیری بومی مرورگر استفاده می‌کند.