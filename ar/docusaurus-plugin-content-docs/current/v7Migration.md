---
id: v7-migration
title: من الإصدار v6 إلى v7
description: "قم بترقية مشروع WebdriverIO من الإصدار v6 إلى v7 عن طريق تحديث التبعيات وتحويل ملف الإعدادات وتحديث تعريفات خطوات Cucumber."
---

هذا البرنامج التعليمي مخصص للأشخاص الذين لا يزالون يستخدمون الإصدار `v6` من WebdriverIO ويرغبون في الترحيل إلى الإصدار `v7`. كما ذكرنا في [منشور المدونة الخاص بالإصدار](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released)، فإن التغييرات تتم في الغالب خلف الكواليس، ومن المفترض أن تكون عملية الترقية سهلة ومباشرة.

:::info

إذا كنت تستخدم WebdriverIO الإصدار `v5` أو ما دونه، فيرجى الترقية إلى الإصدار `v6` أولاً. يرجى الاطلاع على [دليل الترحيل إلى الإصدار v6](v6-migration).

:::

على الرغم من أننا نود أن تكون لدينا عملية مؤتمتة بالكامل لهذا الغرض، إلا أن الواقع مختلف. فلكل شخص إعداداته الخاصة. يجب اعتبار كل خطوة بمثابة إرشاد أكثر من كونها تعليمات تُتبع خطوة بخطوة. إذا واجهت مشاكل في عملية الترحيل، فلا تتردد في [التواصل معنا](https://github.com/webdriverio/codemod/discussions/new).

## الإعداد

على غرار عمليات الترحيل الأخرى، يمكننا استخدام [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO. في هذا البرنامج التعليمي، نستخدم [مشروعًا نموذجيًا](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) قدّمه أحد أعضاء المجتمع، ونقوم بترحيله بالكامل من الإصدار `v6` إلى الإصدار `v7`.

لتثبيت codemod، قم بتشغيل:

```sh
npm install jscodeshift @wdio/codemod
```

#### الإيداعات (Commits):

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## ترقية تبعيات WebdriverIO

نظرًا لأن جميع إصدارات WebdriverIO مرتبطة ببعضها البعض، فمن الأفضل دائمًا الترقية إلى وسم محدد، مثل `latest`. للقيام بذلك، ننسخ جميع التبعيات المتعلقة بـ WebdriverIO من ملف `package.json` الخاص بنا ونعيد تثبيتها عبر:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

عادةً ما تكون تبعيات WebdriverIO جزءًا من تبعيات التطوير (dev dependencies)، لكن هذا قد يختلف حسب مشروعك. بعد ذلك، يجب أن يتم تحديث ملفي `package.json` و`package-lock.json`. __ملاحظة:__ هذه هي التبعيات المستخدمة في [المشروع النموذجي](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)، وقد تختلف التبعيات الخاصة بك.

#### الإيداعات (Commits):

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## تحويل ملف الإعدادات

من الجيد أن تكون الخطوة الأولى هي البدء بملف الإعدادات. في الإصدار `v7` من WebdriverIO، لم نعد بحاجة إلى تسجيل أي من المُصرّفات (compilers) يدويًا. بل في الواقع، يجب إزالتها. ويمكن القيام بذلك تلقائيًا بالكامل باستخدام codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

لا يدعم codemod مشاريع TypeScript حتى الآن. راجع [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). نحن نعمل على إضافة الدعم لها قريبًا. إذا كنت تستخدم TypeScript، فيرجى المشاركة!

:::

#### الإيداعات (Commits):

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## تحديث تعريفات الخطوات

إذا كنت تستخدم Jasmine أو Mocha، فقد انتهيت هنا. الخطوة الأخيرة هي تحديث عمليات استيراد Cucumber.js من `cucumber` إلى `@cucumber/cucumber`. ويمكن القيام بذلك أيضًا تلقائيًا عبر codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

هذا كل شيء! لا حاجة إلى أي تغييرات أخرى 🎉

#### الإيداعات (Commits):

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## الخلاصة

نأمل أن يرشدك هذا البرنامج التعليمي قليلًا خلال عملية الترحيل إلى الإصدار `v7` من WebdriverIO. يواصل المجتمع تحسين codemod أثناء اختباره مع فرق متنوعة في مؤسسات مختلفة. لا تتردد في [فتح مشكلة](https://github.com/webdriverio/codemod/issues/new) إذا كانت لديك ملاحظات، أو [بدء نقاش](https://github.com/webdriverio/codemod/discussions/new) إذا واجهت صعوبات أثناء عملية الترحيل.