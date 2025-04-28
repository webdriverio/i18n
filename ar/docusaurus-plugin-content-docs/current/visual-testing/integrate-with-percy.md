---
id: integrate-with-percy
title: لتطبيق الويب
---

## دمج اختبارات WebdriverIO الخاصة بك مع Percy

قبل التكامل، يمكنك استكشاف [البرنامج التعليمي لبناء عينة Percy لـ WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
قم بدمج اختبارات WebdriverIO الآلية مع BrowserStack Percy وإليك نظرة عامة على خطوات التكامل:

### الخطوة 1: إنشاء مشروع Percy
[سجل الدخول](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إلى Percy. في Percy، قم بإنشاء مشروع من النوع، ويب، ثم قم بتسمية المشروع. بعد إنشاء المشروع، يقوم Percy بإنشاء رمز. سجّل ملاحظة به. يجب عليك استخدامه لتعيين متغير البيئة الخاص بك في الخطوة التالية.

للحصول على تفاصيل حول إنشاء مشروع، راجع [إنشاء مشروع Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### الخطوة 2: تعيين رمز المشروع كمتغير بيئة

قم بتشغيل الأمر المعطى لتعيين PERCY_TOKEN كمتغير بيئة:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### الخطوة 3: تثبيت تبعيات Percy

قم بتثبيت المكونات المطلوبة لإنشاء بيئة التكامل لمجموعة الاختبارات الخاصة بك.

لتثبيت التبعيات، قم بتشغيل الأمر التالي:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### الخطوة 4: تحديث نص الاختبار الخاص بك

قم باستيراد مكتبة Percy لاستخدام الطريقة والسمات المطلوبة لالتقاط لقطات الشاشة.
يستخدم المثال التالي وظيفة percySnapshot() في الوضع المتزامن:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

عند استخدام WebdriverIO في [الوضع المستقل](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)، قم بتوفير كائن المتصفح كوسيطة أولى لوظيفة `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
وسائط طريقة اللقطة هي:

```sh
percySnapshot(name[, options])
```
### الوضع المستقل

```sh
percySnapshot(browser, name[, options])
```

- browser (مطلوب) - كائن متصفح WebdriverIO
- name (مطلوب) - اسم اللقطة؛ يجب أن يكون فريدًا لكل لقطة
- options - انظر خيارات التكوين لكل لقطة

لمعرفة المزيد، راجع [لقطة Percy](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### الخطوة 5: تشغيل Percy
قم بتشغيل اختباراتك باستخدام أمر `percy exec` كما هو موضح أدناه:

إذا كنت غير قادر على استخدام أمر `percy:exec` أو تفضل تشغيل اختباراتك باستخدام خيارات تشغيل IDE، يمكنك استخدام أوامر `percy:exec:start` و `percy:exec:stop`. لمعرفة المزيد، قم بزيارة [تشغيل Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## قم بزيارة الصفحات التالية لمزيد من التفاصيل:
- [دمج اختبارات WebdriverIO الخاصة بك مع Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحة متغير البيئة](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [التكامل باستخدام BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إذا كنت تستخدم BrowserStack Automate.


| المورد                                                                                                                                                                | الوصف                             |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [الوثائق الرسمية](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | وثائق Percy لـ WebdriverIO       |
| [بناء عينة - برنامج تعليمي](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | برنامج Percy التعليمي لـ WebdriverIO |
| [فيديو رسمي](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                                    | اختبار مرئي مع Percy              |
| [مدونة](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                      | تقديم المراجعات المرئية 2.0       |