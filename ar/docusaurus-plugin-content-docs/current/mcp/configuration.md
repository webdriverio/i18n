---
id: configuration
title: الإعدادات
description: "قم بتهيئة خادم WebdriverIO MCP، بما في ذلك خيارات الجلسة والمتصفح والأجهزة المحمولة ومزودي الخدمات السحابية واكتشاف العناصر وAppium."
---

توثق هذه الصفحة جميع خيارات الإعدادات لخادم WebdriverIO MCP.

## إعدادات خادم MCP

تتم تهيئة خادم MCP من خلال ملفات الإعدادات أو الأوامر.

### الإعدادات الأساسية

قم بتحرير ملف إعدادات MCP الخاص بك (مثل `./.mcp.json`) وأضف ما يلي:

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

## خيارات الجلسة

يتم تمرير جميع خيارات الجلسة إلى أداة `start_session`. توجد أداة موحدة واحدة لجلسات المتصفح والأجهزة المحمولة؛ ويحدد المعامل `platform` نوع الجلسة.

### الخيارات المشتركة

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

المنصة المراد أتمتتها.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

مكان تشغيل الجلسة. استخدم اسم مزود خدمة سحابية للأجهزة البعيدة؛ ويتطلب كل منها متغيرات البيئة الخاصة به. راجع [مزودو الخدمات السحابية](./cloud-providers) للحصول على التفاصيل.

</Option>
## خيارات جلسة المتصفح

خيارات لجلسات `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

المتصفح المراد تشغيله.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

إصدار المتصفح. لمزودي الخدمات السحابية فقط (الافتراضي: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

نظام التشغيل لجلسات المتصفح لدى مزودي الخدمات السحابية. أمثلة: `os: "Windows"`، `osVersion: "11"` أو `os: "OS X"`، `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

تشغيل المتصفح في الوضع الخفي (بدون نافذة مرئية). اضبطه على `false` لرؤية المتصفح.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **النطاق:** `400` - `3840`

العرض الأولي لنافذة المتصفح بالبكسل.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **النطاق:** `400` - `2160`

الارتفاع الأولي لنافذة المتصفح بالبكسل.

</Option>
### `navigationUrl`

<Option type="string" required="No">

عنوان URL للانتقال إليه فور بدء تشغيل المتصفح. أكثر كفاءة من استدعاء `start_session` متبوعًا بـ `navigate` بشكل منفصل.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

الاتصال بنسخة Chrome موجودة بدلاً من تشغيل نسخة جديدة. استخدمه بعد `launch_chrome` للاتصال عبر CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

إعدادات اتصال التصحيح عن بُعد لـ Chrome. ينطبق فقط عندما يكون `attach: true`.

</Option>
## خيارات جلسة الأجهزة المحمولة

خيارات لجلسات `platform: "ios"` أو `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

اسم الجهاز أو المحاكي (simulator أو emulator).

**أمثلة:**
-   محاكي iOS: `"iPhone 16"`، `"iPad Air (5th generation)"`
-   محاكي Android: `"Pixel 7"`، `"Nexus 5X"`
-   جهاز حقيقي: اسم الجهاز كما يظهر في نظامك

</Option>
### `platformVersion`

<Option type="string" required="No">

إصدار نظام التشغيل للجهاز/المحاكي (على سبيل المثال، `"18.0"` لـ iOS، `"14"` لـ Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

مشغل الأتمتة. القيمة الافتراضية هي `XCUITest` لـ iOS و`UiAutomator2` لـ Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

المعرف الفريد للجهاز. مطلوب لأجهزة iOS الحقيقية (معرف مكون من 40 حرفًا).

**العثور على UDID:**
-   **iOS:** قم بتوصيل الجهاز، وافتح Finder، وانقر على الجهاز ← الرقم التسلسلي (انقر لإظهار UDID)
-   **Android:** قم بتشغيل `adb devices` في الطرفية

</Option>
### `appPath`

<Option type="string" required="No">

المسار إلى ملف التطبيق المراد تثبيته وتشغيله.

**الصيغ المدعومة:**
-   محاكي iOS: مجلد `.app`
-   جهاز iOS حقيقي: ملف `.ipa`
-   Android: ملف `.apk`

يجب توفير `appPath`، أو استخدام `noReset: true` للاتصال بتطبيق قيد التشغيل بالفعل.

</Option>
### `app`

<Option type="string" required="No">

عنوان URL للتطبيق لدى مزود الخدمة السحابية (`bs://...` لـ BrowserStack، `storage:filename=` لـ Sauce Labs، `lt://...` لـ TestMu، app_url لـ TestingBot) أو `customId`. يُستخدم بدلاً من `appPath` لجلسات الأجهزة المحمولة السحابية.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

النشاط (Activity) المراد انتظاره عند تشغيل التطبيق. إذا لم يتم تحديده، يُستخدم النشاط الرئيسي/المُشغِّل للتطبيق.

**مثال:** `"com.example.app.MainActivity"`

</Option>
### خيارات حالة الجلسة

#### `noReset`

<Option type="boolean" required="No">

الحفاظ على حالة التطبيق بين الجلسات. عندما تكون القيمة `true`:
-   يتم الحفاظ على بيانات التطبيق (حالة تسجيل الدخول، التفضيلات، إلخ)
-   سيتم **فصل** الجلسة بدلاً من إغلاقها (يبقى التطبيق قيد التشغيل)
-   يمكن استخدامه بدون `appPath` للاتصال بتطبيق قيد التشغيل بالفعل

</Option>
#### `fullReset`

<Option type="boolean" required="No">

إعادة تعيين التطبيق بالكامل قبل الجلسة:
-   iOS: يلغي تثبيت التطبيق ثم يعيد تثبيته
-   Android: يمسح بيانات التطبيق وذاكرة التخزين المؤقت

اضبط `fullReset: false` مع `noReset: true` للحفاظ على حالة التطبيق بالكامل.

</Option>
### مهلة الجلسة

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

المدة (بالثواني) التي سينتظرها Appium لأمر جديد قبل إنهاء الجلسة. قم بزيادتها لجلسات التصحيح الأطول.

</Option>
### المعالجة التلقائية

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

منح أذونات التطبيق تلقائيًا عند التثبيت/التشغيل (الكاميرا، الميكروفون، الموقع، إلخ).

:::note Android فقط
يؤثر هذا الخيار بشكل أساسي على Android. يجب التعامل مع أذونات iOS بشكل مختلف بسبب قيود النظام.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

قبول تنبيهات النظام (مربعات الحوار) تلقائيًا أثناء الأتمتة ("السماح بالإشعارات؟"، إلخ).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

رفض تنبيهات النظام بدلاً من قبولها. له الأولوية على `autoAcceptAlerts` عندما تكون القيمة `true`.

</Option>
### الاتصال بخادم Appium

تجاوز إعدادات الاتصال بخادم Appium لكل جلسة على حدة باستخدام `appiumConfig`:

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

الاتصال بخادم Appium. القيمة الافتراضية هي `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## خيارات مزودي الخدمات السحابية

### بيانات الاعتماد

يتطلب كل مزود خدمة سحابية متغيرات البيئة الخاصة به:

| المزود       | متغير اسم المستخدم      | متغير مفتاح الوصول        |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

اضبط هذه المتغيرات قبل بدء تشغيل خادم MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

منطقة مركز بيانات Sauce Labs. يتم تجاهله لدى المزودين الآخرين.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

تمكين التوجيه عبر نفق محلي لجلسات مزودي الخدمات السحابية (للوصول إلى localhost وبيئات التجهيز (staging) والخدمات الداخلية).

-   `true` — بدء تشغيل النفق تلقائيًا قبل الجلسة وإيقافه عند الإغلاق
-   `"external"` — النفق قيد التشغيل خارجيًا بالفعل؛ يضبط فقط العلامات المناسبة للمزود

قبل استخدام `true`، اقرأ مورد local-binary الخاص بالمزود (`wdio://browserstack/local-binary` أو `wdio://saucelabs/local-binary` أو `wdio://testmu/local-binary` أو `wdio://testingbot/local-binary`) للحصول على تعليمات الإعداد الخاصة بنظام التشغيل والبنية لديك.

</Option>
### `tunnelName`

<Option type="string" required="No">

اسم معرف النفق. مطلوب عندما يكون `tunnel: "external"` لمطابقة النفق قيد التشغيل. عندما يكون `tunnel: true`، يتم إنشاء اسم فريد تلقائيًا إذا لم يتم توفيره.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

تسميات الجلسة لدى مزود الخدمة السحابية المرئية في لوحة تحكم المزود. تعمل بشكل متطابق عبر BrowserStack وSauce Labs وTestMu وTestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

تمكين تسجيل التتبع. ينتج ملف zip بصيغة `.trace` متوافقًا مع Playwright يتم حفظه في `.trace/` عند `close_session`. يمكنك عرض التتبعات على [player.vibium.dev](https://player.vibium.dev).

</Option>
## خيارات اكتشاف العناصر

خيارات لأداة `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

إرجاع العناصر المرئية في منطقة العرض الحالية فقط. اضبطه على `true` لتقليل النتائج في الصفحات الطويلة.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

تضمين عناصر الحاويات/التخطيط في النتائج:

**حاويات Android:** `ViewGroup`، `FrameLayout`، `LinearLayout`، `RelativeLayout`، `ConstraintLayout`، `ScrollView`، `RecyclerView`

**حاويات iOS:** `View`، `StackView`، `CollectionView`، `ScrollView`، `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

تضمين إحداثيات المربع المحيط بالعنصر (x، y، العرض، الارتفاع) في الاستجابة.

</Option>
### الترقيم

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

الحد الأقصى لعدد العناصر المراد إرجاعها.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

عدد العناصر المراد تخطيها قبل إرجاع النتائج.

**مثال:** الحصول على العناصر من 21 إلى 40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## خيارات شجرة إمكانية الوصول

خيارات لأداة `get_accessibility_tree` (للمتصفح فقط).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

الحد الأقصى لعدد العُقد المراد إرجاعها.

</Option>
### `offset`

<Option type="number" default="0" required="No">

عدد العُقد المراد تخطيها للترقيم.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

التصفية حسب أدوار إمكانية وصول محددة.

**الأدوار الشائعة:** `button`، `link`، `textbox`، `checkbox`، `radio`، `heading`، `img`، `listitem`

**مثال:** الحصول على الأزرار والروابط فقط:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## لقطة الشاشة

لا تأخذ أداة `get_screenshot` أي معاملات. تتم معالجة لقطات الشاشة تلقائيًا:

| التحسين            | القيمة    | الوصف                                                       |
| ------------------ | -------- | ----------------------------------------------------------- |
| الحد الأقصى للأبعاد | 2000px   | يتم تصغير الصور الأكبر من 2000px                            |
| الحد الأقصى لحجم الملف | 1MB      | يتم ضغط الصور لتبقى أقل من 1MB                              |
| الصيغة             | PNG/JPEG | PNG مع أقصى ضغط؛ JPEG إذا لزم الأمر لتقليل الحجم            |

## سلوك الجلسة

### أنواع الجلسات

| النوع      | الوصف               | الفصل التلقائي                              |
| --------- | ------------------- | ---------------------------------------- |
| `browser` | جلسة متصفح          | لا                                       |
| `ios`     | جلسة تطبيق iOS      | نعم (إذا كان `noReset: true` أو لا يوجد `appPath`) |
| `android` | جلسة تطبيق Android  | نعم (إذا كان `noReset: true` أو لا يوجد `appPath`) |

### نموذج الجلسة الواحدة

يعمل خادم MCP وفق **نموذج الجلسة الواحدة**:

-   يمكن أن تكون جلسة متصفح واحدة فقط أو جلسة تطبيق واحدة فقط نشطة في وقت واحد
-   سيؤدي بدء جلسة جديدة إلى إغلاق/فصل الجلسة الحالية
-   يتم الحفاظ على حالة الجلسة بشكل عام عبر استدعاءات الأدوات

### الفصل مقابل الإغلاق

| الإجراء     | `detach: false` (إغلاق)      | `detach: true` (فصل)                      |
| ---------- | ---------------------------- | -------------------------------------------- |
| المتصفح    | يغلق المتصفح بالكامل          | يبقي المتصفح قيد التشغيل، ويقطع اتصال WebDriver |
| تطبيق الجوال | ينهي التطبيق               | يبقي التطبيق قيد التشغيل في حالته الحالية     |
| حالة الاستخدام | بداية نظيفة للجلسة التالية | الحفاظ على الحالة، الفحص اليدوي              |

## اعتبارات الأداء

### أتمتة المتصفح

-   **الوضع الخفي** أسرع لكنه لا يعرض العناصر المرئية
-   **أحجام النوافذ الأصغر** تقلل وقت التقاط لقطات الشاشة
-   **اكتشاف العناصر** مُحسَّن بتنفيذ سكريبت واحد
-   **تحسين لقطات الشاشة** يبقي الصور أقل من 1MB لمعالجة فعالة

### أتمتة الأجهزة المحمولة

-   **تحليل مصدر الصفحة بصيغة XML** يستخدم استدعاءين فقط لـ HTTP (مقابل أكثر من 600 لاستعلامات العناصر التقليدية)
-   **محددات Accessibility ID** هي الأسرع والأكثر موثوقية
-   **محددات XPath** هي الأبطأ؛ استخدمها فقط كملاذ أخير
-   **الترقيم** (`limit` و`offset`) يقلل استخدام الرموز (tokens) للشاشات التي تحتوي على عناصر كثيرة

### نصائح لاستخدام الرموز (Tokens)

| الإعداد                    | التأثير                                              |
| -------------------------- | --------------------------------------------------- |
| `inViewportOnly: true`     | يستبعد العناصر خارج الشاشة، مما يقلل حجم الاستجابة |
| `includeContainers: false` | يستبعد عناصر التخطيط (ViewGroup، إلخ)          |
| `includeBounds: false`     | يحذف بيانات x/y/العرض/الارتفاع                         |
| `limit` مع الترقيم    | معالجة العناصر على دفعات بدلاً من معالجتها كلها مرة واحدة  |

## إعداد خادم Appium

قبل استخدام أتمتة الأجهزة المحمولة، تأكد من تهيئة Appium بشكل صحيح.

### الإعداد الأساسي

```sh
# تثبيت Appium بشكل عام
npm install -g appium

# تثبيت المشغلات
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# بدء تشغيل الخادم
appium
```

### إعدادات الخادم المخصصة

```sh
# البدء بمضيف ومنفذ مخصصين
appium --address 0.0.0.0 --port 4724

# البدء مع التسجيل
appium --log-level debug

# البدء بمسار أساسي محدد
appium --base-path /wd/hub
```

### التحقق من التثبيت

```sh
# التحقق من المشغلات المثبتة
appium driver list --installed

# التحقق من إصدار Appium
appium --version

# اختبار الاتصال
curl http://localhost:4723/status
```

## استكشاف أخطاء الإعدادات وإصلاحها

### خادم MCP لا يبدأ التشغيل

1. تحقق من تثبيت npm/npx: `npm --version`
2. حاول التشغيل يدويًا: `npx @wdio/mcp`
3. تحقق من سجلات بيئة التشغيل (harness) الخاصة بك بحثًا عن أخطاء

### مشاكل الاتصال بـ Appium

1. تحقق من أن Appium قيد التشغيل: `curl http://localhost:4723/status`
2. تحقق من أن `appiumConfig` في `start_session` يطابق إعدادات خادم Appium
3. تأكد من أن جدار الحماية يسمح بالاتصالات على منفذ Appium

### الجلسة لا تبدأ

1. **المتصفح:** تأكد من تثبيت المتصفح المستهدف
2. **iOS:** تحقق من توفر Xcode والمحاكيات
3. **Android:** تحقق من `ANDROID_HOME` ومن أن المحاكي قيد التشغيل
4. راجع سجلات خادم Appium للحصول على رسائل خطأ مفصلة

### انتهاء مهلة الجلسات

إذا كانت الجلسات تنتهي مهلتها أثناء التصحيح:
1. قم بزيادة `newCommandTimeout` عند بدء الجلسة
2. استخدم `noReset: true` للحفاظ على الحالة بين الجلسات
3. استخدم `detach: true` عند الإغلاق لإبقاء التطبيق قيد التشغيل