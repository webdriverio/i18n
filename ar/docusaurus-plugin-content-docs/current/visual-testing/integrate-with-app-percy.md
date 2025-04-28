---
id: integrate-with-app-percy
title: للتطبيقات الجوالة
---

## دمج اختبارات WebdriverIO مع App Percy

قبل التكامل، يمكنك استكشاف [دليل بناء العينات في App Percy لـ WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
قم بدمج مجموعة الاختبارات الخاصة بك مع BrowserStack App Percy وإليك نظرة عامة على خطوات التكامل:

### الخطوة 1: إنشاء مشروع تطبيق جديد على لوحة تحكم Percy

[قم بتسجيل الدخول](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إلى Percy و[إنشاء مشروع جديد من نوع التطبيق](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). بعد إنشاء المشروع، سيتم عرض متغير بيئة `PERCY_TOKEN`. سيستخدم Percy الرمز `PERCY_TOKEN` لمعرفة المؤسسة والمشروع الذي سيتم تحميل لقطات الشاشة إليه. ستحتاج إلى `PERCY_TOKEN` هذا في الخطوات التالية.

### الخطوة 2: تعيين رمز المشروع كمتغير بيئي

قم بتشغيل الأمر المعطى لتعيين PERCY_TOKEN كمتغير بيئي:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### الخطوة 3: تثبيت حزم Percy

قم بتثبيت المكونات المطلوبة لإنشاء بيئة التكامل لمجموعة الاختبارات الخاصة بك.
لتثبيت التبعيات، قم بتشغيل الأمر التالي:

```sh
npm install --save-dev @percy/cli
```

### الخطوة 4: تثبيت التبعيات

قم بتثبيت تطبيق Percy Appium

```sh
npm install --save-dev @percy/appium-app
```

### الخطوة 5: تحديث نص الاختبار
تأكد من استيراد @percy/appium-app في التعليمات البرمجية الخاصة بك.

فيما يلي مثال على اختبار باستخدام وظيفة percyScreenshot. استخدم هذه الوظيفة حيثما كنت بحاجة إلى التقاط لقطة شاشة.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
نحن نمرر الوسيطات المطلوبة لطريقة percyScreenshot.

وسيطات طريقة لقطة الشاشة هي:

```sh
percyScreenshot(driver, name[, options])
```
### الخطوة 6: تشغيل نص الاختبار الخاص بك

قم بتشغيل اختباراتك باستخدام `percy app:exec`.

إذا كنت غير قادر على استخدام أمر percy app:exec أو تفضل تشغيل اختباراتك باستخدام خيارات تشغيل IDE، يمكنك استخدام أوامر percy app:exec:start و percy app:exec:stop. لمعرفة المزيد، قم بزيارة [تشغيل Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
يبدأ هذا الأمر Percy، وينشئ بناءً جديدًا لـ Percy، ويأخذ لقطات ويحملها إلى مشروعك، ويوقف Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## قم بزيارة الصفحات التالية لمزيد من التفاصيل:
- [دمج اختبارات WebdriverIO مع Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحة متغير البيئة](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [التكامل باستخدام BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إذا كنت تستخدم BrowserStack Automate.


| المورد                                                                                                                                                            | الوصف                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [الوثائق الرسمية](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | وثائق WebdriverIO لتطبيق Percy |
| [بناء نموذجي - دليل تعليمي](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | دليل WebdriverIO لتطبيق Percy      |
| [فيديو رسمي](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | الاختبار المرئي مع تطبيق Percy         |
| [مدونة](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | تعرّف على App Percy: منصة اختبار مرئي آلية مدعومة بالذكاء الاصطناعي للتطبيقات الأصلية    |