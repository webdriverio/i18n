---
id: integrate-with-app-percy
title: لتطبيقات الهاتف المحمول
description: "ادمج اختبارات تطبيقات الهاتف المحمول في WebdriverIO مع BrowserStack App Percy للاختبار المرئي، بدءًا من تعيين PERCY_TOKEN الخاص بك."
---

## ادمج اختبارات WebdriverIO الخاصة بك مع App Percy

قبل الدمج، يمكنك استكشاف [البرنامج التعليمي للبناء النموذجي من App Percy لـ WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
ادمج مجموعة اختباراتك مع BrowserStack App Percy، وإليك نظرة عامة على خطوات الدمج:

### الخطوة 1: إنشاء مشروع تطبيق جديد على لوحة تحكم Percy

[سجّل الدخول](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إلى Percy و[أنشئ مشروعًا جديدًا من نوع التطبيق](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). بعد إنشاء المشروع، سيظهر لك متغير البيئة `PERCY_TOKEN`. سيستخدم Percy المتغير `PERCY_TOKEN` لمعرفة المؤسسة والمشروع اللذين سيرفع إليهما لقطات الشاشة. ستحتاج إلى `PERCY_TOKEN` هذا في الخطوات التالية.

### الخطوة 2: تعيين رمز المشروع كمتغير بيئة

شغّل الأمر التالي لتعيين PERCY_TOKEN كمتغير بيئة:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### الخطوة 3: تثبيت حزم Percy

ثبّت المكونات المطلوبة لإعداد بيئة الدمج لمجموعة اختباراتك.
لتثبيت التبعيات، شغّل الأمر التالي:

```sh
npm install --save-dev @percy/cli
```

### الخطوة 4: تثبيت التبعيات

ثبّت تطبيق Percy Appium

```sh
npm install --save-dev @percy/appium-app
```

### الخطوة 5: تحديث سكربت الاختبار
تأكد من استيراد @percy/appium-app في الكود الخاص بك.

فيما يلي مثال على اختبار يستخدم الدالة percyScreenshot. استخدم هذه الدالة في كل موضع تحتاج فيه إلى التقاط لقطة شاشة.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
نحن نمرر الوسائط المطلوبة إلى التابع percyScreenshot.

وسائط تابع لقطة الشاشة هي:

```sh
percyScreenshot(driver, name[, options])
```
### الخطوة 6: تشغيل سكربت الاختبار

شغّل اختباراتك باستخدام `percy app:exec`.

إذا لم تتمكن من استخدام الأمر percy app:exec أو كنت تفضل تشغيل اختباراتك باستخدام خيارات التشغيل في بيئة التطوير المتكاملة (IDE)، يمكنك استخدام الأمرين percy app:exec:start وpercy app:exec:stop. لمعرفة المزيد، تفضل بزيارة [تشغيل Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
يبدأ هذا الأمر تشغيل Percy، وينشئ بناءً جديدًا في Percy، ويلتقط اللقطات ويرفعها إلى مشروعك، ثم يوقف Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## تفضل بزيارة الصفحات التالية لمزيد من التفاصيل:
- [ادمج اختبارات WebdriverIO الخاصة بك مع Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحة متغيرات البيئة](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [الدمج باستخدام BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إذا كنت تستخدم BrowserStack Automate.


| المورد                                                                                                                                                            | الوصف                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [التوثيق الرسمي](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | توثيق WebdriverIO من App Percy |
| [بناء نموذجي - برنامج تعليمي](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | البرنامج التعليمي لـ WebdriverIO من App Percy      |
| [الفيديو الرسمي](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | الاختبار المرئي باستخدام App Percy         |
| [المدونة](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | تعرّف على App Percy: منصة اختبار مرئي آلي مدعومة بالذكاء الاصطناعي للتطبيقات الأصلية    |