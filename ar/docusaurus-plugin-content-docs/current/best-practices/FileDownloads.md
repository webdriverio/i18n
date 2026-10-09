---
id: file-download
title: تنزيل الملفات
description: "قم بتهيئة مجلدات التنزيل لمتصفحات Chrome وFirefox وEdge، وانتظر اكتمال التنزيلات، وتحقق من الملفات التي تم تنزيلها عبر المتصفحات المختلفة."
---

عند أتمتة تنزيل الملفات في اختبار الويب، من الضروري التعامل معها بشكل متسق عبر المتصفحات المختلفة لضمان تنفيذ موثوق للاختبارات.

نقدم هنا أفضل الممارسات لتنزيل الملفات ونوضح كيفية تهيئة مجلدات التنزيل لمتصفحات **Google Chrome** و**Mozilla Firefox** و**Microsoft Edge**.

## مسارات التنزيل

قد يؤدي **التثبيت الصريح** (Hardcoding) لمسارات التنزيل في سكربتات الاختبار إلى مشكلات في الصيانة وقابلية النقل. استخدم **المسارات النسبية** لمجلدات التنزيل لضمان قابلية النقل والتوافق عبر البيئات المختلفة.

```javascript
// 👎
// مسار تنزيل مثبت بشكل صريح
const downloadPath = '/path/to/downloads';

// 👍
// مسار تنزيل نسبي
const downloadPath = path.join(__dirname, 'downloads');
```

## استراتيجيات الانتظار

قد يؤدي عدم تطبيق استراتيجيات انتظار مناسبة إلى حالات تسابق (race conditions) أو اختبارات غير موثوقة، خاصةً فيما يتعلق باكتمال التنزيل. طبّق استراتيجيات انتظار **صريحة** للانتظار حتى يكتمل تنزيل الملفات، مما يضمن التزامن بين خطوات الاختبار.

```javascript
// 👎
// لا يوجد انتظار صريح لاكتمال التنزيل
await browser.pause(5000);

// 👍
// الانتظار حتى يكتمل تنزيل الملف
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## تهيئة مجلدات التنزيل

لتجاوز سلوك تنزيل الملفات الافتراضي في **Google Chrome** و**Mozilla Firefox** و**Microsoft Edge**، حدد مجلد التنزيل في إمكانيات (capabilities) WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

للاطلاع على مثال تطبيقي، راجع [وصفة WebdriverIO لاختبار سلوك التنزيل](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## تهيئة التنزيلات في متصفحات Chromium

لتغيير مسار التنزيل في المتصفحات __المبنية على Chromium__ (مثل Chrome وEdge وBrave وغيرها)، استخدم الدالة `getPuppeteer` في WebDriverIO للوصول إلى Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// بدء جلسة CDP:
const cdpSession = await page.target().createCDPSession();
// تعيين مسار التنزيل:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## التعامل مع تنزيل ملفات متعددة

عند التعامل مع سيناريوهات تتضمن تنزيل ملفات متعددة، من الضروري تطبيق استراتيجيات لإدارة كل عملية تنزيل والتحقق منها بفعالية. ضع في اعتبارك الأساليب التالية:

__التعامل مع التنزيل المتسلسل:__ قم بتنزيل الملفات واحدًا تلو الآخر وتحقق من كل تنزيل قبل بدء التنزيل التالي لضمان تنفيذ منظم وتحقق دقيق.

__التعامل مع التنزيل المتوازي:__ استخدم تقنيات البرمجة غير المتزامنة لبدء تنزيل ملفات متعددة في وقت واحد، مما يحسّن زمن تنفيذ الاختبار. طبّق آليات تحقق قوية للتحقق من جميع التنزيلات عند اكتمالها.

## اعتبارات التوافق عبر المتصفحات

على الرغم من أن WebDriverIO توفر واجهة موحدة لأتمتة المتصفحات، فمن الضروري مراعاة الاختلافات في سلوك المتصفحات وإمكانياتها. احرص على اختبار وظيفة تنزيل الملفات عبر متصفحات مختلفة لضمان التوافق والاتساق.

__التهيئات الخاصة بكل متصفح:__ اضبط إعدادات مسار التنزيل واستراتيجيات الانتظار لاستيعاب الاختلافات في سلوك المتصفحات وتفضيلاتها عبر Chrome وFirefox وEdge وغيرها من المتصفحات المدعومة.

__التوافق مع إصدارات المتصفحات:__ حدّث إصدارات WebDriverIO والمتصفحات بانتظام للاستفادة من أحدث الميزات والتحسينات مع ضمان التوافق مع مجموعة الاختبارات الحالية لديك.