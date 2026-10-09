---
id: component-testing
title: اختبار المكونات
description: "شغّل اختبارات الوحدات والمكونات في متصفحات حقيقية باستخدام مشغّل المتصفح في WebdriverIO المدعوم بـ Vite، بما في ذلك الإعداد وأداة الاختبار وتصحيح الأخطاء."
---

باستخدام [مشغّل المتصفح](/docs/runner#browser-runner) في WebdriverIO يمكنك تشغيل الاختبارات داخل متصفح فعلي لسطح المكتب أو للهاتف المحمول، مع استخدام WebdriverIO وبروتوكول WebDriver لأتمتة ما يُعرض على الصفحة والتفاعل معه. يتمتع هذا النهج [بمزايا عديدة](/docs/runner#browser-runner) مقارنة بأطر الاختبار الأخرى التي تسمح فقط بالاختبار باستخدام [JSDOM](https://www.npmjs.com/package/jsdom).

## دعم المتصفحات

ينفّذ مشغّل المتصفح حزمة الاختبار داخل المتصفح. تعمل هذه الحزمة على Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1، وعلى الإصدارات الأحدث من هذه المتصفحات.

تعمل اختبارات الطرف إلى الطرف (end-to-end) في Node.js. أما الشيفرة التي تُمرَّر إلى [`browser.execute`](/docs/api/browser/execute) فتعمل في المتصفح المؤتمت بدلاً من ذلك، والذي قد يكون أقدم من الإصدارات المذكورة أعلاه. لذا احرص على أن تكون هذه الشيفرة متوافقة مع ES2021.

## كيف يعمل؟

يستخدم مشغّل المتصفح [Vite](https://vitejs.dev/) لعرض صفحة اختبار وتهيئة إطار اختبار لتشغيل اختباراتك في المتصفح. حالياً يدعم Mocha فقط، لكن Jasmine وCucumber [ضمن خارطة الطريق](https://github.com/orgs/webdriverio/projects/1). يتيح ذلك اختبار أي نوع من المكونات حتى في المشاريع التي لا تستخدم Vite.

يُشغَّل خادم Vite بواسطة مشغّل اختبارات WebdriverIO ويُهيَّأ بحيث يمكنك استخدام جميع المُبلِّغات (reporters) والخدمات كما اعتدت في اختبارات e2e العادية. علاوة على ذلك، يُهيّئ نسخة من [`browser`](/docs/api/browser) تتيح لك الوصول إلى مجموعة فرعية من [واجهة WebdriverIO البرمجية](/docs/api) للتفاعل مع أي عناصر على الصفحة. وكما في اختبارات e2e، يمكنك الوصول إلى هذه النسخة عبر المتغير `browser` المرتبط بالنطاق العام أو باستيراده من `@wdio/globals` بحسب كيفية ضبط [`injectGlobals`](/docs/api/globals).

يتضمن WebdriverIO دعماً مدمجاً للأطر التالية:

- [__Nuxt__](https://nuxt.com/): يكتشف مشغّل اختبارات WebdriverIO تطبيق Nuxt ويُعدّ تلقائياً الـ composables الخاصة بمشروعك ويساعد في محاكاة الواجهة الخلفية لـ Nuxt، اقرأ المزيد في [توثيق Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): يكتشف مشغّل اختبارات WebdriverIO ما إذا كنت تستخدم TailwindCSS ويحمّل البيئة بشكل صحيح في صفحة الاختبار

## الإعداد

لإعداد WebdriverIO لاختبار الوحدات أو المكونات في المتصفح، أنشئ مشروع WebdriverIO جديداً عبر:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

بمجرد بدء معالج التهيئة، اختر `browser` لتشغيل اختبارات الوحدات والمكونات واختر أحد الإعدادات المسبقة إن رغبت، وإلا فاختر _"Other"_ إذا كنت تريد تشغيل اختبارات وحدات أساسية فقط. يمكنك أيضاً تهيئة إعدادات Vite مخصصة إذا كنت تستخدم Vite بالفعل في مشروعك. لمزيد من المعلومات، اطّلع على جميع [خيارات المشغّل](/docs/runner#runner-options).

:::info

__ملاحظة:__ سيشغّل WebdriverIO افتراضياً اختبارات المتصفح في بيئة CI دون واجهة رسومية (headless)، على سبيل المثال عند ضبط متغير البيئة `CI` على `'1'` أو `'true'`. يمكنك تهيئة هذا السلوك يدوياً باستخدام خيار [`headless`](/docs/runner#headless) الخاص بالمشغّل.

:::

في نهاية هذه العملية، يجب أن تجد ملف `wdio.conf.js` يحتوي على إعدادات WebdriverIO متنوعة، بما في ذلك خاصية `runner`، على سبيل المثال:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

من خلال تحديد [قدرات (capabilities)](/docs/configuration#capabilities) مختلفة، يمكنك تشغيل اختباراتك في متصفحات مختلفة، وبالتوازي إن رغبت.

إذا كنت لا تزال غير متأكد من كيفية عمل كل شيء، شاهد الدرس التعليمي التالي حول كيفية البدء باختبار المكونات في WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## أداة الاختبار

الأمر متروك لك تماماً فيما تريد تشغيله في اختباراتك وكيف تفضّل عرض المكونات. ومع ذلك، نوصي باستخدام [Testing Library](https://testing-library.com/) كإطار أدوات مساعدة، إذ يوفر إضافات لأطر مكونات متعددة، مثل React وPreact وSvelte وVue. وهو مفيد جداً لعرض المكونات في صفحة الاختبار، كما يقوم تلقائياً بتنظيف هذه المكونات بعد كل اختبار.

يمكنك المزج بين أساسيات Testing Library وأوامر WebdriverIO كما تشاء، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__ملاحظة:__ يساعد استخدام دوال العرض من Testing Library على إزالة المكونات المُنشأة بين الاختبارات. إذا كنت لا تستخدم Testing Library، فتأكد من إرفاق مكونات الاختبار الخاصة بك بحاوية يتم تنظيفها بين الاختبارات.

## سكربتات الإعداد

يمكنك إعداد اختباراتك عبر تشغيل سكربتات عشوائية في Node.js أو في المتصفح، مثل حقن الأنماط، أو محاكاة واجهات المتصفح البرمجية، أو الاتصال بخدمة طرف ثالث. يمكن استخدام [خطافات (hooks)](/docs/configuration#hooks) WebdriverIO لتشغيل الشيفرة في Node.js، بينما يتيح لك [`mochaOpts.require`](/docs/frameworks#require) استيراد سكربتات إلى المتصفح قبل تحميل الاختبارات، على سبيل المثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // provide a setup script to run in the browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // set up test environment in Node.js
    }
    // ...
}
```

على سبيل المثال، إذا أردت محاكاة جميع استدعاءات [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) في اختبارك باستخدام سكربت الإعداد التالي:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// run code before all tests are loaded
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // run code after test file is loaded
}

export const mochaGlobalTeardown = () => {
    // run code after spec file was executed
}

```

الآن يمكنك في اختباراتك توفير قيم استجابة مخصصة لجميع طلبات المتصفح. اقرأ المزيد عن التجهيزات العامة (global fixtures) في [توثيق Mocha](https://mochajs.org/#global-fixtures).

## مراقبة ملفات الاختبار والتطبيق

هناك طرق متعددة لتصحيح أخطاء اختبارات المتصفح. أسهلها هو تشغيل مشغّل اختبارات WebdriverIO مع العلم `--watch`، على سبيل المثال:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

سيؤدي ذلك إلى تشغيل جميع الاختبارات في البداية ثم التوقف بمجرد اكتمالها. يمكنك بعد ذلك إجراء تغييرات على ملفات فردية سيُعاد تشغيلها بشكل فردي. إذا قمت بضبط [`filesToWatch`](/docs/configuration#filestowatch) ليشير إلى ملفات تطبيقك، فسيُعاد تشغيل جميع الاختبارات عند إجراء تغييرات على تطبيقك.

## تصحيح الأخطاء

على الرغم من أنه ليس من الممكن (بعد) تعيين نقاط توقف في بيئة التطوير المتكاملة (IDE) الخاصة بك وجعل المتصفح البعيد يتعرف عليها، يمكنك استخدام الأمر [`debug`](/docs/api/browser/debug) لإيقاف الاختبار عند أي نقطة. يتيح لك ذلك فتح أدوات المطور (DevTools) ثم تصحيح أخطاء الاختبار عبر تعيين نقاط توقف في [علامة تبويب المصادر](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

عند استدعاء الأمر `debug`، ستحصل أيضاً على واجهة Node.js repl في الطرفية الخاصة بك، تقول:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

اضغط `Ctrl` أو `Command` + `c` أو أدخل `.exit` لمتابعة الاختبار.

## التشغيل باستخدام Selenium Grid

إذا كان لديك [Selenium Grid](https://www.selenium.dev/documentation/grid/) مُعدّ وتشغّل متصفحك من خلاله، فعليك ضبط خيار `host` لمشغّل المتصفح للسماح للمتصفح بالوصول إلى المضيف الصحيح حيث تُقدَّم ملفات الاختبار، على سبيل المثال:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // network IP of the machine that runs the WebdriverIO process
        host: 'http://172.168.0.2'
    }]
}
```

سيضمن ذلك أن يفتح المتصفح بشكل صحيح نسخة الخادم الصحيحة المستضافة على الجهاز الذي يشغّل اختبارات WebdriverIO.

## أمثلة

يمكنك العثور على أمثلة متنوعة لاختبار المكونات باستخدام أطر المكونات الشائعة في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples) الخاص بنا.