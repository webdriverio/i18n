---
id: cloud-providers
title: مزودو الخدمات السحابية
description: "تشغيل جلسات المتصفح والأجهزة المحمولة الخاصة بـ WebdriverIO MCP على مزارع الأجهزة السحابية، بما في ذلك بيانات الاعتماد ورفع التطبيقات والأنفاق وإعداد التقارير."
---

يدعم خادم WebdriverIO MCP بشكل أصلي تشغيل جلسات أتمتة المتصفح والأجهزة المحمولة على مزارع الأجهزة السحابية، دون الحاجة إلى برامج تشغيل محلية أو محاكيات. يتم دعم أربعة مزودين:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (المتصفحات) و[App Automate](https://www.browserstack.com/app-automate) (تطبيقات الأجهزة المحمولة)
- **Sauce Labs** — سحابة الأجهزة الحقيقية والمتصفحات الافتراضية من [Sauce Labs](https://saucelabs.com)
- **TestMu (المعروف سابقًا باسم LambdaTest)** — سحابة الأجهزة الحقيقية والمتصفحات من [TestMu](https://www.lambdatest.com)
- **TestingBot** — سحابة الأجهزة الحقيقية وشبكة المتصفحات من [TestingBot](https://testingbot.com)

يشترك المزودون الأربعة في سير العمل نفسه: تعيين بيانات الاعتماد، ثم رفع تطبيق للأجهزة المحمولة اختياريًا، ثم استدعاء `start_session` مع اسم المزود. كما أن تسميات التقارير وإعدادات النفق ودورة حياة تطبيقات الأجهزة المحمولة متطابقة لدى جميع المزودين.

## المتطلبات الأساسية

قم بتعيين بيانات الاعتماد الخاصة بك كمتغيرات بيئة قبل تشغيل خادم MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| المزود       | متغير اسم المستخدم      | متغير مفتاح الوصول        | مكان العثور عليه                                                   |
| ------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [إعدادات الحساب](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [إعدادات المستخدم](https://app.saucelabs.com/user-settings)           |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [إعدادات الحساب](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [إعدادات الحساب](https://testingbot.com/membership)              |

## أتمتة المتصفح

شغّل جلسة متصفح على أي مزود سحابي عن طريق تعيين `provider` في `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

يدعم جميع المزودين القيم التالية لـ `browser`: `"chrome"` و`"firefox"` و`"edge"` و`"safari"`. إذا أغفلت `os` / `osVersion`، فسيستخدم المزود قيمًا افتراضية معقولة (عادةً أحدث إصدار من Linux لجلسات المتصفح).

### مناطق Sauce Labs

يدعم Sauce Labs مناطق متعددة لمراكز البيانات. قم بتعيين المعامل `region` في `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

القيم المدعومة: `"us-west-1"` و`"eu-central-1"` (الافتراضية) و`"apac-southeast-1"`.

## أتمتة تطبيقات الأجهزة المحمولة

يتكون سير عمل الأجهزة المحمولة من ثلاث خطوات، متطابقة لدى جميع المزودين:

### الخطوة 1: رفع تطبيقك

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

يُرجع كل منها مرجعًا للتطبيق ستستخدمه في `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

يمكنك اختياريًا تعيين `customId` للحصول على مراجع ثابتة عبر عمليات الرفع المختلفة:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

بالنسبة إلى Sauce Labs، أضف `region` ليتطابق مع منطقة التخزين الخاصة بك (القيمة الافتراضية `"eu-central-1"`).

### الخطوة 2: عرض التطبيقات المتاحة

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

معاملات اختيارية لجميع المزودين:
- `sortBy`: `"app_name"` أو `"uploaded_at"` (الافتراضي)
- `limit`: الحد الأقصى للنتائج (الافتراضي 20)

يدعم BrowserStack أيضًا `organizationWide: true` لعرض جميع عمليات الرفع في المؤسسة. ويقبل Sauce Labs المعامل `region`.

### الخطوة 3: بدء الجلسة

استخدم مرجع التطبيق من `upload_app`، أو `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## النفق المحلي

يدعم جميع المزودين نفقًا محليًا بحيث يمكن للجلسات السحابية الوصول إلى الخوادم الموجودة على جهازك (localhost وبيئات التجهيز والخدمات الداخلية).

يستخدم خادم MCP **معاملًا موحدًا `tunnel`** يعمل بشكل متطابق لدى جميع المزودين:

### نفق مُدار تلقائيًا (موصى به)

يقوم خادم MCP بتشغيل النفق وإيقافه تلقائيًا:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

قبل جلستك الأولى باستخدام `tunnel: true`، يتولى خادم MCP تنزيل الملف التنفيذي للنفق وتشغيله. إذا كنت ترغب في التحقق من الإعداد يدويًا، فاقرأ مورد الملف التنفيذي المحلي الخاص بالمزود:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

يتوقف النفق تلقائيًا عند إغلاق الجلسة.

### نفق خارجي

إذا كنت تشغّل النفق بالفعل في عملية منفصلة:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

تُخبر القيمة `"external"` خادم MCP بأن هناك نفقًا قيد التشغيل بالفعل؛ فيقوم بتعيين علامات القدرات المناسبة دون تشغيل أي عملية أو إيقافها. قم بتعيين `tunnelName` ليتطابق مع النفق قيد التشغيل.

### إعداد النفق يدويًا

إذا كنت تفضل تشغيل النفق يدويًا، فاقرأ تعليمات الإعداد من مورد MCP الخاص بمزودك ومنصتك. على سبيل المثال:

```text
// قراءة تعليمات الإعداد (من عميل الذكاء الاصطناعي الخاص بك)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

يُرجع كل مورد رابط التنزيل والأوامر الخاصة بالمنصة وتعليمات تشغيل العملية في الخلفية.

## التقارير

ضع وسومًا للجلسات بتسميات المشروع والبناء والجلسة لعرضها في لوحة تحكم المزود. يعمل هذا بشكل متطابق لدى جميع المزودين:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

تظهر الجلسات في لوحة تحكم المزود ضمن المشروع والبناء المحددين:
- BrowserStack: [لوحة تحكم Automate](https://automate.browserstack.com)
- Sauce Labs: [نتائج الاختبار](https://app.saucelabs.com/dashboard/builds)
- TestMu: [لوحة تحكم الأتمتة](https://automation.lambdatest.com)
- TestingBot: [نتائج الاختبار](https://testingbot.com/members)

## ملاحظات خاصة بكل مزود

### BrowserStack

- جلسات المتصفح: يقبل `os` القيمة `"Windows"` أو `"OS X"`. إصدارات Windows: `"10"` و`"11"`. إصدارات macOS: `"Ventura"` و`"Sonoma"` و`"Sequoia"`.
- واجهة برمجة إدارة التطبيقات: يؤدي `organizationWide: true` في `list_apps` إلى عرض جميع عمليات الرفع الخاصة بالفريق.

### Sauce Labs

- **المناطق مهمة.** المنطقة الافتراضية هي `eu-central-1`. إذا كان حسابك في منطقة مختلفة، فقم بتعيين `region` في `start_session` و`list_apps` و`upload_app` لتتطابق معها.
- تدعم جلسات الأجهزة المحمولة `automationName` (`"XCUITest"` أو `"UiAutomator2"`)؛ والقيم الافتراضية معقولة لكل منصة.
- يُدار نفق Sauce Connect تلقائيًا عبر حزمة npm `saucelabs`. لا حاجة إلى ملف تنفيذي خارجي عند استخدام `tunnel: true`.

### TestMu

- اسم المزود هو `"testmu"` في `start_session` و`list_apps` و`upload_app`.
- تتصل جلسات المتصفح بـ `hub.lambdatest.com`؛ وتتصل جلسات الأجهزة المحمولة بـ `mobile-hub.lambdatest.com`؛ ويتم التعامل مع ذلك تلقائيًا.
- يُدار النفق تلقائيًا عبر حزمة npm `@lambdatest/node-tunnel`.
- تجلب إدارة تطبيقات الأجهزة المحمولة تطبيقات Android وiOS عبر استدعاءات منفصلة لواجهة البرمجة، ثم تدمج النتائج.

### TestingBot

- اسم المزود هو `"testingbot"` في `start_session` و`list_apps` و`upload_app`.
- تتصل جلسات المتصفح والأجهزة المحمولة كلاهما بـ `hub.testingbot.com` على المنفذ 443 (يتم التعامل مع ذلك تلقائيًا).
- تستخدم بيانات الاعتماد `TESTINGBOT_KEY` و`TESTINGBOT_SECRET` (وليس زوجًا من اسم المستخدم/مفتاح الوصول كما لدى المزودين الآخرين).
- يُدار النفق تلقائيًا عبر حزمة npm `testingbot-tunnel-launcher` (يتطلب Java 11+).
- لا يوجد معامل للمنطقة — فمركز TestingBot عالمي.
- وضع متصفح الأجهزة المحمولة/المحاكي مدعوم: قم بتعيين `platform: "android"` أو `"ios"` مع اسم `browser` (مثل `"chrome"`) بدلًا من `app`.