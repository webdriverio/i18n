---
id: seleniumgrid
title: Selenium Grid
description: "قم بتوصيل اختبارات WebdriverIO بـ Selenium Grid موجود عن طريق تعيين البروتوكول واسم المضيف والمنفذ والمسار في ملف الإعدادات الخاص بك."
---

يمكنك استخدام WebdriverIO مع نسخة Selenium Grid الموجودة لديك. لتوصيل اختباراتك بـ Selenium Grid، كل ما عليك هو تحديث الخيارات في إعدادات مشغل الاختبار الخاص بك.

فيما يلي مقتطف برمجي من نموذج ملف wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
تحتاج إلى توفير القيم المناسبة للبروتوكول واسم المضيف والمنفذ والمسار بناءً على إعداد Selenium Grid الخاص بك.
إذا كنت تشغل Selenium Grid على نفس الجهاز الذي توجد عليه سكربتات الاختبار، فإليك بعض الخيارات النموذجية:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### المصادقة الأساسية مع Selenium Grid المحمي

يُوصى بشدة بتأمين Selenium Grid الخاص بك. إذا كان لديك Selenium Grid محمي يتطلب المصادقة، يمكنك تمرير ترويسات المصادقة عبر الخيارات.
يرجى الرجوع إلى قسم [headers](https://webdriver.io/docs/configuration/#headers) في الوثائق لمزيد من المعلومات.

### إعدادات المهلة الزمنية مع Selenium Grid الديناميكي

عند استخدام Selenium Grid ديناميكي حيث يتم تشغيل حاويات المتصفح (pods) عند الطلب، قد يواجه إنشاء الجلسة بدءًا باردًا (cold start). في مثل هذه الحالات، يُنصح بزيادة المهلات الزمنية لإنشاء الجلسة. القيمة الافتراضية في الخيارات هي 120 ثانية، ولكن يمكنك زيادتها إذا كان الـ grid الخاص بك يستغرق وقتًا أطول لإنشاء جلسة جديدة.

```ts
connectionRetryTimeout: 180000,
```

### الإعدادات المتقدمة

للإعدادات المتقدمة، يرجى الرجوع إلى [ملف الإعدادات](https://webdriver.io/docs/configurationfile) الخاص بـ Testrunner.

### عمليات الملفات مع Selenium Grid

عند تشغيل حالات الاختبار مع Selenium Grid بعيد، يعمل المتصفح على جهاز بعيد، وتحتاج إلى عناية خاصة بحالات الاختبار التي تتضمن رفع الملفات وتنزيلها.

### تنزيل الملفات

بالنسبة للمتصفحات المبنية على Chromium، يمكنك الرجوع إلى وثائق [تنزيل الملف](https://webdriver.io/docs/api/browser/downloadFile). إذا كانت سكربتات الاختبار الخاصة بك تحتاج إلى قراءة محتوى ملف تم تنزيله، فأنت بحاجة إلى تنزيله من عقدة Selenium البعيدة إلى جهاز مشغل الاختبار. فيما يلي مثال لمقتطف برمجي من نموذج ملف الإعدادات `wdio.conf.ts` لمتصفح Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### رفع الملفات مع Selenium Grid بعيد

يقوم [`element.setFiles()`](/docs/api/element/setFiles) بتعيين حقل إدخال الملف عبر WebDriver BiDi. المسارات التي تمررها يفتحها المتصفح، لذا يجب أن تكون موجودة على الجهاز الذي يشغّل المتصفح. لا يقوم WebdriverIO بنقل ملف محلي إلى عقدة Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

مجموعة الاختبارات التي كانت تستخدم `browser.uploadFile()` لدفع البيانات إلى العقدة يجب أن تضع الملف في مكان يستطيع المتصفح قراءته منه، ثم تستدعي `setFiles`. لا تزال نقطة النهاية [`file`](/docs/api/selenium#file) الخاصة بـ Selenium متاحة باسم `browser.file()` لكل من Chromedriver وEdgedriver وSelenium Grid. وهي ليست أمرًا من أوامر WebDriver أو WebDriver BiDi.

### عمليات أخرى على الملفات/الـ grid

هناك بعض العمليات الأخرى التي يمكنك تنفيذها باستخدام Selenium Grid. يجب أن تعمل التعليمات الخاصة بـ Selenium Standalone بشكل جيد مع Selenium Grid أيضًا. يرجى الرجوع إلى وثائق [Selenium Standalone](https://webdriver.io/docs/api/selenium/) للاطلاع على الخيارات المتاحة.


### الوثائق الرسمية لـ Selenium Grid

لمزيد من المعلومات حول Selenium Grid، يمكنك الرجوع إلى [الوثائق](https://www.selenium.dev/documentation/grid/) الرسمية لـ Selenium Grid.

إذا كنت ترغب في تشغيل Selenium Grid في Docker أو Docker compose أو Kubernetes، يرجى الرجوع إلى [مستودع GitHub](https://github.com/SeleniumHQ/docker-selenium) الخاص بـ Selenium-Docker.