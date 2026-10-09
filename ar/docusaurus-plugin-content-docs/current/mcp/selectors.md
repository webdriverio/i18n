---
id: selectors
title: المحددات
description: "اختر المحددات لتحديد موقع العناصر في صفحات الويب وتطبيقات الهاتف المحمول عند الأتمتة باستخدام خادم WebdriverIO MCP."
---

يدعم خادم WebdriverIO MCP استراتيجيات محددات متعددة لتحديد موقع العناصر في صفحات الويب وتطبيقات الهاتف المحمول.

:::info

للاطلاع على توثيق شامل للمحددات يتضمن جميع استراتيجيات محددات WebdriverIO، راجع دليل [المحددات](/docs/selectors) الرئيسي. تركز هذه الصفحة على المحددات الشائعة الاستخدام مع خادم MCP.

:::

## محددات الويب

لأتمتة المتصفح، يدعم خادم MCP جميع محددات WebdriverIO القياسية. وتشمل الأكثر استخدامًا:

| المحدد | مثال                        | الوصف                  |
| -------- | ------------------------------ | ---------------------------- |
| CSS      | `#login-button`, `.submit-btn` | محددات CSS القياسية       |
| XPath    | `//button[@id='submit']`       | تعبيرات XPath            |
| Text     | `button=Submit`, `a*=Click`    | محددات النص في WebdriverIO   |
| ARIA     | `aria/Submit Button`           | محددات الاسم الخاص بإمكانية الوصول |
| Test ID  | `[data-testid="submit"]`       | موصى به للاختبار      |

للاطلاع على أمثلة تفصيلية وأفضل الممارسات، راجع توثيق [المحددات](/docs/selectors).

## محددات الهاتف المحمول

تعمل محددات الهاتف المحمول مع منصتي iOS وAndroid من خلال Appium.

### Accessibility ID (موصى به)

تُعد معرّفات إمكانية الوصول (Accessibility IDs) **المحدد الأكثر موثوقية عبر المنصات**. فهي تعمل على كل من iOS وAndroid وتظل مستقرة عبر تحديثات التطبيق.

```text
# الصيغة
~accessibilityId

# أمثلة
~loginButton
~submitForm
~usernameField
```

:::tip أفضل ممارسة
فضّل دائمًا معرّفات إمكانية الوصول عند توفرها. فهي توفر:
- التوافق عبر المنصات (iOS + Android)
- الاستقرار عبر تغييرات واجهة المستخدم
- سهولة أفضل في صيانة الاختبارات
- تحسين إمكانية الوصول في تطبيقك
:::

### محددات Android

#### UiAutomator

محددات UiAutomator قوية وسريعة على Android.

```text
# حسب النص
android=new UiSelector().text("Login")

# حسب جزء من النص
android=new UiSelector().textContains("Log")

# حسب معرّف المورد
android=new UiSelector().resourceId("com.example:id/login_button")

# حسب اسم الفئة
android=new UiSelector().className("android.widget.Button")

# حسب الوصف (إمكانية الوصول)
android=new UiSelector().description("Login button")

# شروط مجمّعة
android=new UiSelector().className("android.widget.Button").text("Login")

# حاوية قابلة للتمرير
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

توفر معرّفات الموارد (Resource IDs) تعريفًا مستقرًا للعناصر على Android.

```text
# معرّف المورد الكامل
id=com.example.app:id/login_button

# معرّف جزئي (يُستنتج اسم حزمة التطبيق)
id=login_button
```

#### XPath (Android)

يعمل XPath على Android لكنه أبطأ من UiAutomator.

```text
# حسب الفئة والنص
//android.widget.Button[@text='Login']

# حسب معرّف المورد
//android.widget.EditText[@resource-id='com.example:id/username']

# حسب وصف المحتوى
//android.widget.ImageButton[@content-desc='Menu']

# هرمي
//android.widget.LinearLayout/android.widget.Button[1]
```

### محددات iOS

#### Predicate String

تُعد سلاسل Predicate في iOS سريعة وقوية لأتمتة iOS.

```text
# حسب التسمية
-ios predicate string:label == "Login"

# حسب جزء من التسمية
-ios predicate string:label CONTAINS "Log"

# حسب الاسم
-ios predicate string:name == "loginButton"

# حسب النوع
-ios predicate string:type == "XCUIElementTypeButton"

# حسب القيمة
-ios predicate string:value == "ON"

# شروط مجمّعة
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# الظهور
-ios predicate string:label == "Login" AND visible == 1

# غير حساس لحالة الأحرف
-ios predicate string:label ==[c] "login"
```

**عوامل Predicate:**

| العامل     | الوصف        |
| ------------ | ------------------ |
| `==`         | يساوي             |
| `!=`         | لا يساوي         |
| `CONTAINS`   | يحتوي على سلسلة فرعية |
| `BEGINSWITH` | يبدأ بـ        |
| `ENDSWITH`   | ينتهي بـ          |
| `LIKE`       | مطابقة بأحرف البدل     |
| `MATCHES`    | مطابقة بالتعبير النمطي        |
| `AND`        | AND المنطقي        |
| `OR`         | OR المنطقي         |

#### Class Chain

توفر سلاسل الفئات (Class Chains) في iOS تحديدًا هرميًا لموقع العناصر بأداء جيد.

```text
# ابن مباشر
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# أي سليل
-ios class chain:**/XCUIElementTypeButton

# حسب الفهرس
-ios class chain:**/XCUIElementTypeCell[3]

# مجمّع مع Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# هرمي
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# العنصر الأخير
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

يعمل XPath على iOS لكنه أبطأ من سلاسل Predicate.

```text
# حسب النوع والتسمية
//XCUIElementTypeButton[@label='Login']

# حسب الاسم
//XCUIElementTypeTextField[@name='username']

# حسب القيمة
//XCUIElementTypeSwitch[@value='1']

# هرمي
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## استراتيجية المحددات عبر المنصات

عند كتابة اختبارات يجب أن تعمل على كل من iOS وAndroid، استخدم ترتيب الأولوية التالي:

### 1. Accessibility ID (الأفضل)

```text
# يعمل على كلتا المنصتين
~loginButton
```

### 2. محددات خاصة بالمنصة مع منطق شرطي

عندما لا تتوفر معرّفات إمكانية الوصول، استخدم محددات خاصة بالمنصة:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (الملاذ الأخير)

يعمل XPath على كلتا المنصتين ولكن مع أنواع عناصر مختلفة:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## مرجع أنواع العناصر

### أنواع عناصر Android

| النوع                          | الوصف      |
| ----------------------------- | ---------------- |
| `android.widget.Button`       | زر           |
| `android.widget.EditText`     | حقل إدخال نص       |
| `android.widget.TextView`     | تسمية نصية       |
| `android.widget.ImageView`    | صورة            |
| `android.widget.ImageButton`  | زر صورة     |
| `android.widget.CheckBox`     | مربع اختيار         |
| `android.widget.RadioButton`  | زر اختيار     |
| `android.widget.Switch`       | مفتاح تبديل    |
| `android.widget.Spinner`      | قائمة منسدلة         |
| `android.widget.ListView`     | عرض قائمة        |
| `android.widget.RecyclerView` | عرض Recycler    |
| `android.widget.ScrollView`   | حاوية تمرير |

### أنواع عناصر iOS

| النوع                             | الوصف     |
| -------------------------------- | --------------- |
| `XCUIElementTypeButton`          | زر          |
| `XCUIElementTypeTextField`       | حقل إدخال نص      |
| `XCUIElementTypeSecureTextField` | حقل إدخال كلمة المرور  |
| `XCUIElementTypeStaticText`      | تسمية نصية      |
| `XCUIElementTypeImage`           | صورة           |
| `XCUIElementTypeSwitch`          | مفتاح تبديل   |
| `XCUIElementTypeSlider`          | شريط تمرير          |
| `XCUIElementTypePicker`          | عجلة اختيار    |
| `XCUIElementTypeTable`           | عرض جدول      |
| `XCUIElementTypeCell`            | خلية جدول      |
| `XCUIElementTypeCollectionView`  | عرض مجموعة |
| `XCUIElementTypeScrollView`      | عرض تمرير     |

## أفضل الممارسات

### افعل

- **استخدم معرّفات إمكانية الوصول** للحصول على محددات مستقرة وتعمل عبر المنصات
- **أضف سمات data-testid** إلى عناصر الويب لأغراض الاختبار
- **استخدم معرّفات الموارد** على Android عندما لا تتوفر معرّفات إمكانية الوصول
- **فضّل سلاسل Predicate** على XPath في iOS
- **اجعل المحددات بسيطة** ومحددة

### لا تفعل

- **تجنب تعبيرات XPath الطويلة** - فهي بطيئة وهشة
- **لا تعتمد على الفهارس** في القوائم الديناميكية
- **تجنب المحددات المعتمدة على النص** في التطبيقات المترجمة
- **لا تستخدم XPath المطلق** (الذي يبدأ من الجذر)

### أمثلة على المحددات الجيدة مقابل السيئة

```text
# جيد - معرّف إمكانية وصول مستقر
~loginButton

# سيئ - XPath هش مع فهارس
//div[3]/form/button[2]

# جيد - CSS محدد مع معرّف اختبار
[data-testid="submit-button"]

# سيئ - فئة قد تتغير
.btn-primary-lg-v2

# جيد - UiAutomator مع معرّف المورد
android=new UiSelector().resourceId("com.app:id/submit")

# سيئ - نص قد تتم ترجمته
android=new UiSelector().text("Submit")
```

## تصحيح أخطاء المحددات

### الويب (Chrome DevTools)

1. افتح Chrome DevTools (F12)
2. استخدم لوحة Elements لفحص العناصر
3. انقر بزر الماوس الأيمن على عنصر ← Copy ← Copy selector
4. اختبر المحددات في Console: `document.querySelector('your-selector')`

### الهاتف المحمول (Appium Inspector)

1. شغّل Appium Inspector
2. اتصل بجلستك قيد التشغيل
3. انقر على العناصر لرؤية جميع السمات المتاحة
4. استخدم ميزة "Search for element" لاختبار المحددات

### استخدام `get_elements`

تُرجع أداة `get_elements` في خادم MCP استراتيجيات محددات متعددة لكل عنصر:

```text
Ask: "Get all visible elements on the screen"
```

يُرجع هذا العناصر مع محددات مُولّدة مسبقًا يمكنك استخدامها مباشرة.

#### خيارات متقدمة

لمزيد من التحكم في اكتشاف العناصر:

```text
# الحصول على الصور والعناصر المرئية فقط
Get visible elements with elementType "visual"

# الحصول على العناصر مع إحداثياتها لتصحيح أخطاء التخطيط
Get visible elements with includeBounds enabled

# الحصول على العناصر العشرين التالية (ترقيم الصفحات)
Get visible elements with limit 20 and offset 20

# تضمين حاويات التخطيط لتصحيح الأخطاء
Get visible elements with includeContainers enabled
```

تُرجع الأداة استجابة مقسّمة إلى صفحات:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### استخدام `get_accessibility` (للمتصفح فقط)

لأتمتة المتصفح، توفر أداة `get_accessibility` معلومات دلالية حول عناصر الصفحة:

```text
# الحصول على جميع عقد إمكانية الوصول المسماة
Get accessibility tree

# التصفية للأزرار والروابط فقط
Get accessibility tree filtered to button and link roles

# الحصول على الصفحة التالية من النتائج
Get accessibility tree with limit 50 and offset 50
```

يكون هذا مفيدًا عندما لا تُرجع `get_elements` العناصر المتوقعة، إذ إنها تستعلم من واجهة برمجة تطبيقات إمكانية الوصول الأصلية في المتصفح.