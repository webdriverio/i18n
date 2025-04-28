---
id: seleniumgrid
title: سيلينيوم جريد
---

يمكنك استخدام WebdriverIO مع نظام Selenium Grid الخاص بك. لتوصيل اختباراتك بـ Selenium Grid، تحتاج فقط إلى تحديث الخيارات في تكوين مشغل الاختبار الخاص بك.

إليك مقتطف من الكود من ملف wdio.conf.ts عينة.

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
تحتاج إلى توفير القيم المناسبة للبروتوكول والمضيف والمنفذ والمسار بناءً على إعداد Selenium Grid الخاص بك.
إذا كنت تقوم بتشغيل Selenium Grid على نفس الجهاز مثل نصوص الاختبار الخاصة بك، فإليك بعض الخيارات النموذجية:

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

يوصى بشدة بتأمين Selenium Grid الخاص بك. إذا كان لديك Selenium Grid محمي يتطلب المصادقة، يمكنك تمرير رؤوس المصادقة عبر الخيارات.
يرجى الرجوع إلى قسم [headers](https://webdriver.io/docs/configuration/#headers) في الوثائق للحصول على مزيد من المعلومات.

### تكوينات المهلة مع Selenium Grid الديناميكي

عند استخدام Selenium Grid ديناميكي حيث يتم تشغيل حاويات المتصفح عند الطلب، قد يواجه إنشاء الجلسة بداية باردة. في مثل هذه الحالات، يُنصح بزيادة مهلات إنشاء الجلسة. القيمة الافتراضية في الخيارات هي 120 ثانية، ولكن يمكنك زيادتها إذا كانت الشبكة تستغرق وقتًا أطول لإنشاء جلسة جديدة.

```ts
connectionRetryTimeout: 180000,
```

### التكوينات المتقدمة

للتكوينات المتقدمة، يرجى الرجوع إلى [ملف التكوين](https://webdriver.io/docs/configurationfile) لمشغل الاختبار.

### عمليات الملفات مع Selenium Grid

عند تشغيل حالات الاختبار باستخدام Selenium Grid عن بُعد، يتم تشغيل المتصفح على جهاز بعيد، وتحتاج إلى اتخاذ عناية خاصة مع حالات الاختبار التي تتضمن تحميل وتنزيل الملفات.

### تنزيل الملفات

بالنسبة للمتصفحات المستندة إلى Chromium، يمكنك الرجوع إلى وثائق [تنزيل الملف](https://webdriver.io/docs/api/browser/downloadFile). إذا كانت نصوص الاختبار الخاصة بك تحتاج إلى قراءة محتوى ملف تم تنزيله، فأنت بحاجة إلى تنزيله من عقدة Selenium البعيدة إلى جهاز مشغل الاختبار. إليك مثال على مقتطف الكود من تكوين `wdio.conf.ts` العينة لمتصفح Chrome:

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

### رفع الملفات مع Selenium Grid عن بُعد

لرفع ملف إلى تطبيق ويب في المتصفح البعيد، تحتاج أولاً إلى رفع الملف إلى الشبكة البعيدة. يمكنك الرجوع إلى وثائق [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) للحصول على التفاصيل.

### عمليات أخرى للملفات/الشبكة

هناك بعض العمليات الأخرى التي يمكنك تنفيذها مع Selenium Grid. يجب أن تعمل تعليمات Selenium Standalone بشكل جيد مع Selenium Grid أيضًا. يرجى الرجوع إلى وثائق [Selenium Standalone](https://webdriver.io/docs/api/selenium/) للخيارات المتاحة.


### الوثائق الرسمية لـ Selenium Grid

لمزيد من المعلومات حول Selenium Grid، يمكنك الرجوع إلى [وثائق](https://www.selenium.dev/documentation/grid/) Selenium Grid الرسمية.

إذا كنت ترغب في تشغيل Selenium Grid في Docker أو Docker compose أو Kubernetes، يرجى الرجوع إلى [مستودع GitHub](https://github.com/SeleniumHQ/docker-selenium) الخاص بـ Selenium-Docker.