---
id: v6-migration
title: من الإصدار v5 إلى v6
description: "قم بترقية مشروع WebdriverIO من الإصدار v5 إلى v6 عن طريق تحديث التبعيات وتحويل ملف الإعدادات وتحديث ملفات الاختبار وكائنات الصفحات."
---

هذا البرنامج التعليمي مخصص للأشخاص الذين لا يزالون يستخدمون الإصدار `v5` من WebdriverIO ويرغبون في الانتقال إلى الإصدار `v6` أو إلى أحدث إصدار من WebdriverIO. كما ذكرنا في [منشور المدونة الخاص بالإصدار](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)، يمكن تلخيص التغييرات الخاصة بترقية هذا الإصدار على النحو التالي:

- قمنا بتوحيد المعاملات لبعض الأوامر (مثل `newWindow` و`react$` و`react$$` و`waitUntil` و`dragAndDrop` و`moveTo` و`waitForDisplayed` و`waitForEnabled` و`waitForExist`) ونقلنا جميع المعاملات الاختيارية إلى كائن واحد، على سبيل المثال:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- نُقلت إعدادات الخدمات إلى قائمة الخدمات، على سبيل المثال:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- أُعيدت تسمية بعض خيارات الخدمات لأغراض التبسيط
- أعدنا تسمية الأمر `launchApp` إلى `launchChromeApp` لجلسات Chrome WebDriver

:::info

إذا كنت تستخدم WebdriverIO الإصدار `v4` أو أقدم، فيرجى الترقية إلى الإصدار `v5` أولاً.

:::

على الرغم من أننا نود أن تكون لدينا عملية مؤتمتة بالكامل لهذا الأمر، إلا أن الواقع يبدو مختلفاً. لكل شخص إعداد مختلف. يجب النظر إلى كل خطوة على أنها إرشاد وليست تعليمات خطوة بخطوة. إذا واجهت مشكلات في عملية الانتقال، فلا تتردد في [التواصل معنا](https://github.com/webdriverio/codemod/discussions/new).

## الإعداد

على غرار عمليات الانتقال الأخرى، يمكننا استخدام [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO. لتثبيت codemod، شغّل:

```sh
npm install jscodeshift @wdio/codemod
```

## ترقية تبعيات WebdriverIO

نظراً لأن جميع إصدارات WebdriverIO مرتبطة ببعضها البعض، فمن الأفضل دائماً الترقية إلى وسم محدد، مثل `6.12.0`. إذا قررت الترقية من الإصدار `v5` مباشرةً إلى `v7`، يمكنك حذف الوسم وتثبيت أحدث إصدارات جميع الحزم. للقيام بذلك، ننسخ جميع التبعيات المتعلقة بـ WebdriverIO من ملف `package.json` ونعيد تثبيتها عبر:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

عادةً ما تكون تبعيات WebdriverIO جزءاً من تبعيات التطوير (dev dependencies)، لكن قد يختلف ذلك حسب مشروعك. بعد ذلك، يجب أن يكون ملفا `package.json` و`package-lock.json` قد تم تحديثهما. __ملاحظة:__ هذه تبعيات على سبيل المثال، وقد تختلف تبعياتك. تأكد من العثور على أحدث إصدار من v6 عن طريق تشغيل الأمر التالي على سبيل المثال:

```sh
npm show webdriverio versions
```

حاول تثبيت أحدث إصدار متاح من الإصدار 6 لجميع حزم WebdriverIO الأساسية. أما بالنسبة لحزم المجتمع، فقد يختلف ذلك من حزمة إلى أخرى. وهنا نوصي بمراجعة سجل التغييرات (changelog) للحصول على معلومات حول الإصدار الذي لا يزال متوافقاً مع v6.

## تحويل ملف الإعدادات

من الخطوات الأولى الجيدة البدء بملف الإعدادات. يمكن حل جميع التغييرات الجذرية باستخدام codemod بشكل تلقائي بالكامل:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

لا يدعم codemod مشاريع TypeScript حتى الآن. راجع [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). نحن نعمل على تنفيذ الدعم لها قريباً. إذا كنت تستخدم TypeScript، فيرجى المشاركة!

:::

## تحديث ملفات الاختبار وكائنات الصفحات

لتحديث جميع التغييرات في الأوامر، شغّل codemod على جميع ملفات e2e التي تحتوي على أوامر WebdriverIO، على سبيل المثال:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

هذا كل شيء! لا حاجة لمزيد من التغييرات 🎉

## الخلاصة

نأمل أن يرشدك هذا البرنامج التعليمي قليلاً خلال عملية الانتقال إلى WebdriverIO الإصدار `v6`. نوصي بشدة بمواصلة الترقية إلى أحدث إصدار، نظراً لأن التحديث إلى `v7` أمر بسيط بسبب عدم وجود تغييرات جذرية تقريباً. يرجى الاطلاع على دليل الانتقال [للترقية إلى v7](v7-migration).

يواصل المجتمع تحسين codemod أثناء اختباره مع فرق مختلفة في مؤسسات مختلفة. لا تتردد في [فتح مشكلة](https://github.com/webdriverio/codemod/issues/new) إذا كانت لديك ملاحظات، أو [بدء نقاش](https://github.com/webdriverio/codemod/discussions/new) إذا واجهت صعوبات أثناء عملية الانتقال.