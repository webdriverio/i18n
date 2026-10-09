---
id: integrate-with-percy
title: لتطبيقات الويب
description: "دمج اختبارات WebdriverIO لتطبيقات الويب مع BrowserStack Percy للاختبار المرئي، بدءًا من إنشاء مشروع وحتى تشغيل البُنى."
---

## دمج اختبارات WebdriverIO الخاصة بك مع Percy

قبل الدمج، يمكنك استكشاف [البرنامج التعليمي لنموذج البناء من Percy الخاص بـ WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
ادمج اختبارات WebdriverIO الآلية الخاصة بك مع BrowserStack Percy، وإليك نظرة عامة على خطوات الدمج:

### الخطوة 1: إنشاء مشروع Percy
[سجّل الدخول](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إلى Percy. في Percy، أنشئ مشروعًا من النوع Web، ثم قم بتسمية المشروع. بعد إنشاء المشروع، يُنشئ Percy رمزًا مميزًا (token). دوّنه، إذ يجب عليك استخدامه لتعيين متغير البيئة في الخطوة التالية.

لمزيد من التفاصيل حول إنشاء مشروع، راجع [إنشاء مشروع Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### الخطوة 2: تعيين رمز المشروع كمتغير بيئة

شغّل الأمر المُعطى لتعيين PERCY_TOKEN كمتغير بيئة:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### الخطوة 3: تثبيت اعتماديات Percy

ثبّت المكونات المطلوبة لإعداد بيئة الدمج لمجموعة الاختبارات الخاصة بك.

لتثبيت الاعتماديات، شغّل الأمر التالي:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### الخطوة 4: تحديث سكربت الاختبار الخاص بك

استورد مكتبة Percy لاستخدام الدالة والسمات المطلوبة لالتقاط لقطات الشاشة.
يستخدم المثال التالي الدالة percySnapshot() في الوضع غير المتزامن (async):

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

عند استخدام WebdriverIO في [الوضع المستقل](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)، مرّر كائن المتصفح كأول وسيط للدالة `percySnapshot`:

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
// كائن المتصفح مطلوب في الوضع المستقل
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
وسائط دالة اللقطة هي:

```sh
percySnapshot(name[, options])
```
### الوضع المستقل

```sh
percySnapshot(browser, name[, options])
```

- browser (مطلوب) - كائن متصفح WebdriverIO
- name (مطلوب) - اسم اللقطة؛ يجب أن يكون فريدًا لكل لقطة
- options - راجع خيارات الإعداد الخاصة بكل لقطة

لمعرفة المزيد، راجع [لقطة Percy](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### الخطوة 5: تشغيل Percy
شغّل اختباراتك باستخدام الأمر `percy exec` كما هو موضح أدناه:

إذا لم تتمكن من استخدام الأمر `percy:exec` أو كنت تفضل تشغيل اختباراتك باستخدام خيارات التشغيل في بيئة التطوير المتكاملة (IDE)، يمكنك استخدام الأمرين `percy:exec:start` و`percy:exec:stop`. لمعرفة المزيد، تفضل بزيارة [تشغيل Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## تفضل بزيارة الصفحات التالية لمزيد من التفاصيل:
- [دمج اختبارات WebdriverIO الخاصة بك مع Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحة متغيرات البيئة](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [الدمج باستخدام BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) إذا كنت تستخدم BrowserStack Automate.


| المورد                                                                                                                                                            | الوصف                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [الوثائق الرسمية](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | وثائق Percy الخاصة بـ WebdriverIO |
| [نموذج بناء - برنامج تعليمي](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | البرنامج التعليمي من Percy الخاص بـ WebdriverIO      |
| [الفيديو الرسمي](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | الاختبار المرئي باستخدام Percy         |
| [المدونة](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | تقديم Visual Reviews 2.0    |