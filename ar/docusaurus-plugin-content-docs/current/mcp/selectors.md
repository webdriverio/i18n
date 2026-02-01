---
id: selectors
title: المحددات
---

يدعم خادم WebdriverIO MCP استراتيجيات متعددة للمحددات لتحديد مواقع العناصر على صفحات الويب وتطبيقات الجوال.

:::info

للحصول على وثائق شاملة للمحددات بما في ذلك جميع استراتيجيات محددات WebdriverIO، راجع دليل [المحددات](/docs/selectors) الرئيسي. تركز هذه الصفحة على المحددات المستخدمة بشكل شائع مع خادم MCP.

:::

## محددات الويب

بالنسبة لأتمتة المتصفح، يدعم خادم MCP جميع محددات WebdriverIO القياسية. من بين أكثر المحددات استخداماً:

| المحدد | مثال | الوصف |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | محددات CSS القياسية |
| XPath | `//button[@id='submit']` | تعبيرات XPath |
| النص | `button=Submit`, `a*=Click` | محددات نصية لـ WebdriverIO |
| ARIA | `aria/Submit Button` | محددات اسم إمكانية الوصول |
| معرّف الاختبار | `[data-testid="submit"]` | موصى به للاختبار |

للحصول على أمثلة مفصلة وأفضل الممارسات، راجع وثائق [المحددات](/docs/selectors).

---

## محددات الجوال

تعمل محددات الجوال مع منصات iOS و Android من خلال Appium.

### معرّف إمكانية الوصول (موصى به)

معرّفات إمكانية الوصول هي **المحدد الأكثر موثوقية عبر المنصات**. تعمل على كل من iOS و Android وتظل مستقرة عبر تحديثات التطبيق.

```
# الصيغة
~accessibilityId

# أمثلة
~loginButton
~submitForm
~usernameField
```

:::tip أفضل الممارسات
فضّل دائماً معرّفات إمكانية الوصول عندما تكون متاحة. فهي توفر:
- توافق عبر المنصات (iOS + Android)
- استقرار عبر تغييرات واجهة المستخدم
- صيانة أفضل للاختبار
- تحسين إمكانية الوصول للتطبيق
:::

### محددات Android

#### UiAutomator

محددات UiAutomator قوية وسريعة لنظام Android.

```
# بواسطة النص
android=new UiSelector().text("Login")

# بواسطة جزء من النص
android=new UiSelector().textContains("Log")

# بواسطة معرّف الموارد
android=new UiSelector().resourceId("com.example:id/login_button")

# بواسطة اسم الفئة
android=new UiSelector().className("android.widget.Button")

# بواسطة الوصف (إمكانية الوصول)
android=new UiSelector().description("Login button")

# شروط مجمعة
android=new UiSelector().className("android.widget.Button").text("Login")

# حاوية قابلة للتمرير
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### معرّف الموارد

توفر معرّفات الموارد تعريفاً مستقراً للعناصر على Android.

```
# معرّف الموارد الكامل
id=com.example.app:id/login_button

# معرّف جزئي (حزمة التطبيق مستنتجة)
id=login_button
```

#### XPath (Android)

يعمل XPath على Android ولكنه أبطأ من UiAutomator.

```
# بواسطة الفئة والنص
//android.widget.Button[@text='Login']

# بواسطة معرّف الموارد
//android.widget.EditText[@resource-id='com.example:id/username']

# بواسطة وصف المحتوى
//android.widget.ImageButton[@content-desc='Menu']

# هرمياً
//android.widget.LinearLayout/android.widget.Button[1]
```

### محددات iOS

#### سلسلة التنبؤ (Predicate String)

سلاسل التنبؤ في iOS سريعة وقوية لأتمتة iOS.

```
# بواسطة التسمية
-ios predicate string:label == "Login"

# بواسطة تسمية جزئية
-ios predicate string:label CONTAINS "Log"

# بواسطة الاسم
-ios predicate string:name == "loginButton"

# بواسطة النوع
-ios predicate string:type == "XCUIElementTypeButton"

# بواسطة القيمة
-ios predicate string:value == "ON"

# شروط مجمعة
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# الرؤية
-ios predicate string:label == "Login" AND visible == 1

# عدم حساسية حالة الأحرف
-ios predicate string:label ==[c] "login"
```

**عوامل التنبؤ:**

| العامل | الوصف |
|----------|-------------|
| `==` | يساوي |
| `!=` | لا يساوي |
| `CONTAINS` | يحتوي على سلسلة فرعية |
| `BEGINSWITH` | يبدأ بـ |
| `ENDSWITH` | ينتهي بـ |
| `LIKE` | تطابق باستخدام أحرف البدل |
| `MATCHES` | تطابق بواسطة التعبير العادي |
| `AND` | AND المنطقي |
| `OR` | OR المنطقي |

#### سلسلة الفئة (Class Chain)

توفر سلاسل فئات iOS تحديد موقع العنصر الهرمي مع أداء جيد.

```
# ابن مباشر
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# أي نسل
-ios class chain:**/XCUIElementTypeButton

# بواسطة الفهرس
-ios class chain:**/XCUIElementTypeCell[3]

# مجمع مع التنبؤ
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# هرمياً
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# آخر عنصر
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

يعمل XPath على iOS ولكنه أبطأ من سلاسل التنبؤ.

```
# بواسطة النوع والتسمية
//XCUIElementTypeButton[@label='Login']

# بواسطة الاسم
//XCUIElementTypeTextField[@name='username']

# بواسطة القيمة
//XCUIElementTypeSwitch[@value='1']

# هرمياً
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## استراتيجية المحدد عبر المنصات

عند كتابة اختبارات تحتاج إلى العمل على كل من iOS و Android، استخدم ترتيب الأولوية هذا:

### 1. معرّف إمكانية الوصول (الأفضل)

```
# يعمل على كلتا المنصتين
~loginButton
```

### 2. محددات خاصة بالمنصة مع منطق شرطي

عندما لا تتوفر معرّفات إمكانية الوصول، استخدم محددات خاصة بالمنصة:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (الملاذ الأخير)

يعمل XPath على كلتا المنصتين ولكن بأنواع عناصر مختلفة:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## مرجع أنواع العناصر

### أنواع عناصر Android

| النوع | الوصف |
|------|-------------|
| `android.widget.Button` | زر |
| `android.widget.EditText` | إدخال نصي |
| `android.widget.TextView` | تسمية نصية |
| `android.widget.ImageView` | صورة |
| `android.widget.ImageButton` | زر صورة |
| `android.widget.CheckBox` | خانة اختيار |
| `android.widget.RadioButton` | زر اختيار |
| `android.widget.Switch` | مفتاح تبديل |
| `android.widget.Spinner` | قائمة منسدلة |
| `android.widget.ListView` | عرض قائمة |
| `android.widget.RecyclerView` | عرض دوار |
| `android.widget.ScrollView` | حاوية تمرير |

### أنواع عناصر iOS

| النوع | الوصف |
|------|-------------|
| `XCUIElementTypeButton` | زر |
| `XCUIElementTypeTextField` | إدخال نصي |
| `XCUIElementTypeSecureTextField` | إدخال كلمة المرور |
| `XCUIElementTypeStaticText` | تسمية نصية |
| `XCUIElementTypeImage` | صورة |
| `XCUIElementTypeSwitch` | مفتاح تبديل |
| `XCUIElementTypeSlider` | شريط تمرير |
| `XCUIElementTypePicker` | عجلة اختيار |
| `XCUIElementTypeTable` | عرض جدول |
| `XCUIElementTypeCell` | خلية جدول |
| `XCUIElementTypeCollectionView` | عرض مجموعة |
| `XCUIElementTypeScrollView` | عرض تمرير |

---

## أفضل الممارسات

### افعل

- **استخدم معرّفات إمكانية الوصول** للمحددات المستقرة عبر المنصات
- **أضف سمات data-testid** إلى عناصر الويب للاختبار
- **استخدم معرّفات الموارد** على Android عندما لا تتوفر معرّفات إمكانية الوصول
- **فضّل سلاسل التنبؤ** على XPath في iOS
- **اجعل المحددات بسيطة** ومحددة

### لا تفعل

- **تجنب تعبيرات XPath الطويلة** - فهي بطيئة وهشة
- **لا تعتمد على الفهارس** للقوائم الديناميكية
- **تجنب المحددات المعتمدة على النص** للتطبيقات المترجمة
- **لا تستخدم XPath المطلق** (بدءًا من الجذر)

### أمثلة على المحددات الجيدة مقابل السيئة

```
# جيد - معرّف إمكانية وصول مستقر
~loginButton

# سيء - XPath هش بالفهارس
//div[3]/form/button[2]

# جيد - CSS محدد مع معرّف اختبار
[data-testid="submit-button"]

# سيء - فئة قد تتغير
.btn-primary-lg-v2

# جيد - UiAutomator مع معرّف الموارد
android=new UiSelector().resourceId("com.app:id/submit")

# سيء - نص قد تتم ترجمته
android=new UiSelector().text("Submit")
```

---

## تصحيح المحددات

### الويب (أدوات مطور Chrome)

1. افتح أدوات مطور Chrome (F12)
2. استخدم لوحة العناصر لفحص العناصر
3. انقر بزر الماوس الأيمن على عنصر → نسخ → نسخ المحدد
4. اختبر المحددات في وحدة التحكم: `document.querySelector('your-selector')`

### الجوال (Appium Inspector)

1. ابدأ Appium Inspector
2. اتصل بجلستك الجارية
3. انقر على العناصر لرؤية جميع السمات المتاحة
4. استخدم ميزة "البحث عن عنصر" لاختبار المحددات

### استخدام `get_visible_elements`

تعيد أداة `get_visible_elements` في خادم MCP استراتيجيات محدد متعددة لكل عنصر:

```
اسأل كلود: "احصل على جميع العناصر المرئية على الشاشة"
```

هذا يعيد العناصر مع محددات مولدة مسبقًا يمكنك استخدامها مباشرة.

#### خيارات متقدمة

للمزيد من التحكم في اكتشاف العناصر:

```
# الحصول على الصور والعناصر المرئية فقط
احصل على العناصر المرئية بنوع العنصر "visual"

# احصل على العناصر مع إحداثياتها لتصحيح التخطيط
احصل على العناصر المرئية مع تفعيل includeBounds

# احصل على العناصر الـ 20 التالية (الترقيم)
احصل على العناصر المرئية مع الحد 20 والإزاحة 20

# تضمين حاويات التخطيط للتصحيح
احصل على العناصر المرئية مع تفعيل includeContainers
```

تعيد الأداة استجابة مرقمة:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### استخدام `get_accessibility` (المتصفح فقط)

بالنسبة لأتمتة المتصفح، توفر أداة `get_accessibility` معلومات دلالية حول عناصر الصفحة:

```
# احصل على جميع عقد إمكانية الوصول المسماة
احصل على شجرة إمكانية الوصول

# تصفية إلى الأزرار والروابط فقط
احصل على شجرة إمكانية الوصول مصفاة إلى أدوار الزر والرابط

# احصل على الصفحة التالية من النتائج
احصل على شجرة إمكانية الوصول مع الحد 50 والإزاحة 50
```

هذا مفيد عندما لا تعيد `get_visible_elements` العناصر المتوقعة، لأنها تستعلم عن واجهة برمجة تطبيقات إمكانية الوصول الأصلية للمتصفح.