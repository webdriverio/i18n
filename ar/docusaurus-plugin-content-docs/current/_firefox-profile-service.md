---
id: firefox-profile-service
title: خدمة ملف تعريف فايرفوكس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

هل تريد تشغيل متصفح فايرفوكس مع إضافة معينة أو تحتاج لضبط بعض التفضيلات؟ يسمح لك سيلينيوم باستخدام ملف تعريف لمتصفح فايرفوكس عن طريق تمرير هذا الملف كسلسلة `base64` إلى خاصية `moz:firefoxOptions.profile` في الإمكانيات المطلوبة. هذا يتطلب بناء ذلك الملف وتحويله إلى `base64`. تأخذ هذه الخدمة لـ [wdio testrunner](https://webdriver.io/docs/clioptions) عمل تجميع الملف من يديك وتتيح لك تحديد الخيارات المطلوبة بشكل مريح من ملف `wdio.conf.js`.

للعثور على جميع الخيارات الممكنة، افتح [about:config](about:config) في متصفح فايرفوكس أو انتقل إلى موقع [mozillaZine](http://kb.mozillazine.org/About:config_entries) للعثور على التوثيق الكامل حول كل إعداد. بالإضافة إلى ذلك، يمكنك تحديد إضافات فايرفوكس المجمعة (كـ `*.xpi`) التي يجب تثبيتها قبل بدء الاختبار.

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/firefox-profile-service` كاعتماد تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## التكوين

قم بإعداد ملفك الشخصي عن طريق إضافة خدمة `firefox-profile` إلى قائمة الخدمات الخاصة بك. ثم حدد إعداداتك في خاصية `firefoxProfile` بهذه الطريقة:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // مسار لملف .xpi
                '/path/to/extensionB' // أو مسار لإضافة فايرفوكس غير مضغوطة
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // استخدم فقط لفايرفوكس <= 55
        }]
    ],
    // ...
};
```

إذا قمت ببناء إضافة فايرفوكس مخصصة وتريد تثبيتها في المتصفح، تأكد من تعيين `'xpinstall.signatures.required': false` كعلامة ملف تعريف حيث يُطلب أن تكون إضافات فايرفوكس [موقعة من قبل موزيلا](https://wiki.mozilla.org/Add-ons/Extension_Signing).

لاستخدام إضافات مخصصة غير موقعة، ستحتاج أيضًا إلى استخدام [فايرفوكس إصدار المطور](https://www.mozilla.org/en-GB/firefox/developer/) لأن فايرفوكس العادي الإصدار 48 والأحدث [لا يسمح بذلك](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## الخيارات

تحتوي على جميع الإعدادات كأزواج قيمة ومفتاح. يمكنك العثور على جميع الإعدادات المتاحة في صفحة `about:config`.

### extensions

أضف واحدة أو عدة إضافات إلى جلسة المتصفح. يمكن أن تكون جميع الإدخالات إما مسارًا مطلقًا لملف `.xpi` أو مسارًا لدليل إضافة فايرفوكس غير مضغوط.

النوع: `String[]`<br />
الافتراضي: `[]`

### profileDirectory

إنشاء ملف تعريف فايرفوكس بناءً على ملف موجود عن طريق تعيين مسار مطلق لذلك الملف الشخصي.

النوع: `String`<br />
الافتراضي: `null`

### proxy

تعيين إعدادات وكيل الشبكة. المعلمة `proxy` هي كائن تعتمد بنيته على قيمة المفتاح الإلزامي `proxyType`، الذي يأخذ إحدى قيم السلسلة التالية:

* `direct` - اتصال مباشر (بدون وكيل)
* `system` - استخدام إعدادات وكيل نظام التشغيل
* `pac` - استخدام تكوين وكيل تلقائي يتم تعيينه بناءً على قيمة مفتاح `autoconfigUrl`
* `manual` - إعدادات وكيل يدوية محددة بشكل منفصل لبروتوكولات مختلفة باستخدام قيم من المفاتيح التالية: `ftpProxy`، `httpProxy`، `sslProxy`، `socksProxy`

النوع: `Object`<br />
الافتراضي: `null`<br />
مثال:

- وكيل تلقائي:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- وكيل HTTP يدوي:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- وكيل HTTP و HTTPS يدوي:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

يرجى تعيين هذه العلامة إلى `true` إذا كنت تستخدم فايرفوكس الإصدار 55 أو أقل.

النوع: `Boolean`<br />
الافتراضي: `false`

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).