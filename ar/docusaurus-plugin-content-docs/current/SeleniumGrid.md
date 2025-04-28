---
id: seleniumgrid
title: سيلينيوم جريد
---

يمكنك استخدام WebdriverIO مع مثيل Selenium Grid الحالي لديك. للاتصال باختباراتك بشبكة Selenium Grid، تحتاج فقط إلى تحديث الخيارات في تكوينات مشغل الاختبار الخاص بك.

إليك مقتطف من الشفرة من ملف wdio.conf.ts النموذجي.

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
تحتاج إلى توفير القيم المناسبة للبروتوكول، واسم المضيف، والمنفذ، والمسار استنادًا إلى إعداد Selenium Grid الخاص بك.
إذا كنت تقوم بتشغيل Selenium Grid على نفس الجهاز الذي يحتوي على سكريبتات الاختبار الخاصة بك، فإليك بعض الخيارات النموذجية:

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

عند استخدام Selenium Grid ديناميكي حيث يتم تشغيل حاويات المتصفح عند الطلب، قد يواجه إنشاء الجلسة بداية باردة. في مثل هذه الحالات، يُنصح بزيادة مهلات إنشاء الجلسة. القيمة الافتراضية في الخيارات هي 120 ثانية، ولكن يمكنك زيادتها إذا كانت الشبكة الخاصة بك تستغرق وقتًا أطول لإنشاء جلسة جديدة.

```ts
connectionRetryTimeout: 180000,
```

### التكوينات المتقدمة

للتكوينات المتقدمة، يرجى الرجوع إلى [ملف تكوين](https://webdriver.io/docs/configurationfile) مشغل الاختبار.

### عمليات الملفات مع Selenium Grid

عند تشغيل حالات الاختبار باستخدام Selenium Grid عن بُعد، يعمل المتصفح على جهاز بعيد، وتحتاج إلى توخي الحذر الخاص مع حالات الاختبار التي تتضمن تحميل الملفات وتنزيلها.

### تنزيل الملفات

بالنسبة للمتصفحات المستندة إلى Chromium، يمكنك الرجوع إلى وثائق [تنزيل الملف](https://webdriver.io/docs/api/browser/downloadFile). إذا كانت سكريبتات الاختبار الخاصة بك تحتاج إلى قراءة محتوى ملف تم تنزيله، فأنت بحاجة إلى تنزيله من عقدة Selenium البعيدة إلى جهاز مشغل الاختبار. إليك مثال على مقتطف من الشفرة من عينة تكوين `wdio.conf.ts` لمتصفح Chrome:

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

### تحميل الملفات مع Selenium Grid البعيد

لتحميل ملف إلى تطبيق ويب في المتصفح البعيد، تحتاج أولاً إلى تحميل الملف إلى الشبكة البعيدة. يمكنك الرجوع إلى وثائق [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) للحصول على التفاصيل.

### عمليات أخرى للملفات/الشبكة

هناك بعض العمليات الإضافية التي يمكنك إجراؤها باستخدام Selenium Grid. يجب أن تعمل تعليمات Selenium Standalone بشكل جيد مع Selenium Grid أيضًا. يرجى الرجوع إلى وثائق [Selenium Standalone](https://webdriver.io/docs/api/selenium/) للخيارات المتاحة.


### الوثائق الرسمية لـ Selenium Grid

لمزيد من المعلومات حول Selenium Grid، يمكنك الرجوع إلى [وثائق](https://www.selenium.dev/documentation/grid/) Selenium Grid الرسمية.

إذا كنت ترغب في تشغيل Selenium Grid في Docker أو Docker compose أو Kubernetes، فيرجى الرجوع إلى [مستودع GitHub](https://github.com/SeleniumHQ/docker-selenium) الخاص بـ Selenium-Docker.