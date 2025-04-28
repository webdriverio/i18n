---
id: component-testing
title: اختبار المكونات
---

باستخدام [مشغل المتصفح](/docs/runner#browser-runner) من WebdriverIO، يمكنك تشغيل الاختبارات داخل متصفح سطح المكتب أو الجوال الفعلي أثناء استخدام WebdriverIO وبروتوكول WebDriver للأتمتة والتفاعل مع ما يتم عرضه على الصفحة. يتميز هذا النهج [بالعديد من المزايا](/docs/runner#browser-runner) مقارنة بأطر الاختبار الأخرى التي تسمح فقط بالاختبار ضد [JSDOM](https://www.npmjs.com/package/jsdom).

## كيف يعمل؟

يستخدم مشغل المتصفح [Vite](https://vitejs.dev/) لعرض صفحة اختبار وتهيئة إطار اختبار لتشغيل اختباراتك في المتصفح. حاليًا يدعم فقط Mocha ولكن Jasmine وCucumber [على خارطة الطريق](https://github.com/orgs/webdriverio/projects/1). هذا يسمح باختبار أي نوع من المكونات حتى للمشاريع التي لا تستخدم Vite.

يتم تشغيل خادم Vite بواسطة مشغل اختبار WebdriverIO وتكوينه بحيث يمكنك استخدام جميع أدوات التقارير والخدمات كما اعتدت بالنسبة لاختبارات e2e العادية. علاوة على ذلك، يقوم بتهيئة نسخة [`browser`](/docs/api/browser) تتيح لك الوصول إلى مجموعة فرعية من [واجهة برمجة تطبيقات WebdriverIO](/docs/api) للتفاعل مع أي عناصر على الصفحة. بشكل مشابه لاختبارات e2e، يمكنك الوصول إلى تلك النسخة من خلال متغير `browser` المرفق بالنطاق العالمي أو من خلال استيراده من `@wdio/globals` اعتمادًا على كيفية تعيين [`injectGlobals`](/docs/api/globals).

يحتوي WebdriverIO على دعم مدمج للأطر التالية:

- [__Nuxt__](https://nuxt.com/): يكتشف مشغل اختبار WebdriverIO تطبيق Nuxt ويقوم تلقائيًا بإعداد composables المشروع الخاص بك ويساعد في محاكاة خلفية Nuxt، اقرأ المزيد في [وثائق Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): يكتشف مشغل اختبار WebdriverIO ما إذا كنت تستخدم TailwindCSS ويقوم بتحميل البيئة بشكل صحيح في صفحة الاختبار

## الإعداد

لإعداد WebdriverIO لاختبار الوحدة أو المكونات في المتصفح، قم بإنشاء مشروع WebdriverIO جديد عبر:

```bash
npm init wdio@latest ./
# أو
yarn create wdio ./
```

بمجرد بدء معالج التكوين، اختر `browser` لتشغيل اختبار الوحدة والمكونات واختر أحد الإعدادات المسبقة إذا كنت ترغب في ذلك، وإلا فاختر _"Other"_ إذا كنت تريد فقط تشغيل اختبارات الوحدة الأساسية. يمكنك أيضًا تكوين تكوين Vite مخصص إذا كنت تستخدم Vite بالفعل في مشروعك. لمزيد من المعلومات، تحقق من جميع [خيارات المشغل](/docs/runner#runner-options).

:::info

__ملاحظة:__ سيقوم WebdriverIO افتراضيًا بتشغيل اختبارات المتصفح في CI بدون رأس، على سبيل المثال، يتم تعيين متغير بيئة `CI` إلى `'1'` أو `'true'`. يمكنك تكوين هذا السلوك يدويًا باستخدام خيار [`headless`](/docs/runner#headless) للمشغل.

:::

في نهاية هذه العملية، يجب أن تجد ملف `wdio.conf.js` يحتوي على تكوينات WebdriverIO المختلفة، بما في ذلك خاصية `runner`، على سبيل المثال:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

من خلال تحديد [قدرات](/docs/configuration#capabilities) مختلفة، يمكنك تشغيل اختباراتك في متصفحات مختلفة، بالتوازي إذا رغبت في ذلك.

إذا كنت لا تزال غير متأكد من كيفية عمل كل شيء، شاهد البرنامج التعليمي التالي حول كيفية البدء باختبار المكونات في WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## منصة الاختبار

الأمر متروك لك تمامًا فيما ترغب في تشغيله في اختباراتك وكيف ترغب في عرض المكونات. ومع ذلك، نوصي باستخدام [Testing Library](https://testing-library.com/) كإطار عمل مساعد لأنه يوفر إضافات للعديد من أطر المكونات، مثل React وPreact وSvelte وVue. إنه مفيد جدًا لعرض المكونات في صفحة الاختبار ويقوم تلقائيًا بتنظيف هذه المكونات بعد كل اختبار.

يمكنك مزج أوليات Testing Library مع أوامر WebdriverIO كما تشاء، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__ملاحظة:__ استخدام طرق العرض من Testing Library يساعد على إزالة المكونات التي تم إنشاؤها بين الاختبارات. إذا كنت لا تستخدم Testing Library، فتأكد من إرفاق مكونات الاختبار الخاصة بك بحاوية يتم تنظيفها بين الاختبارات.

## نصوص الإعداد

يمكنك إعداد اختباراتك من خلال تشغيل نصوص برمجية عشوائية في Node.js أو في المتصفح، مثل حقن الأنماط، أو محاكاة واجهات برمجة تطبيقات المتصفح، أو الاتصال بخدمة طرف ثالث. يمكن استخدام [hooks](/docs/configuration#hooks) من WebdriverIO لتشغيل التعليمات البرمجية في Node.js بينما يسمح [`mochaOpts.require`](/docs/frameworks#require) باستيراد النصوص إلى المتصفح قبل تحميل الاختبارات، على سبيل المثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // توفير نص إعداد للتشغيل في المتصفح
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // إعداد بيئة الاختبار في Node.js
    }
    // ...
}
```

على سبيل المثال، إذا كنت ترغب في محاكاة جميع استدعاءات [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) في اختبارك باستخدام نص الإعداد التالي:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// تشغيل التعليمات البرمجية قبل تحميل جميع الاختبارات
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // تشغيل التعليمات البرمجية بعد تحميل ملف الاختبار
}

export const mochaGlobalTeardown = () => {
    // تشغيل التعليمات البرمجية بعد تنفيذ ملف المواصفات
}

```

الآن في اختباراتك يمكنك توفير قيم استجابة مخصصة لجميع طلبات المتصفح. اقرأ المزيد عن الإعدادات العالمية في [وثائق Mocha](https://mochajs.org/#global-fixtures).

## مراقبة ملفات الاختبار والتطبيق

هناك طرق متعددة لكيفية تصحيح اختبارات المتصفح الخاصة بك. الأسهل هو بدء مشغل اختبار WebdriverIO باستخدام العلامة `--watch`، على سبيل المثال:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

سيؤدي هذا إلى تشغيل جميع الاختبارات في البداية والتوقف بمجرد تشغيل الكل. يمكنك بعد ذلك إجراء تغييرات على الملفات الفردية التي سيتم إعادة تشغيلها بشكل فردي. إذا قمت بتعيين [`filesToWatch`](/docs/configuration#filestowatch) يشير إلى ملفات التطبيق الخاصة بك، فسيعيد تشغيل جميع الاختبارات عند إجراء تغييرات على تطبيقك.

## التصحيح

على الرغم من أنه ليس من الممكن (بعد) تعيين نقاط توقف في بيئة التطوير المتكاملة الخاصة بك والتعرف عليها من قبل المتصفح البعيد، يمكنك استخدام الأمر [`debug`](/docs/api/browser/debug) لإيقاف الاختبار في أي نقطة. يتيح لك هذا فتح أدوات المطور لتصحيح الاختبار من خلال تعيين نقاط توقف في [علامة تبويب المصادر](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

عند استدعاء الأمر `debug`، ستحصل أيضًا على واجهة Node.js repl في المحطة الطرفية الخاصة بك، تقول:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

اضغط على `Ctrl` أو `Command` + `c` أو أدخل `.exit` للمتابعة مع الاختبار.

## التشغيل باستخدام Selenium Grid

إذا كان لديك [Selenium Grid](https://www.selenium.dev/documentation/grid/) تم إعداده وقمت بتشغيل المتصفح من خلال تلك الشبكة، فيجب عليك تعيين خيار مشغل المتصفح `host` للسماح للمتصفح بالوصول إلى المضيف الصحيح حيث يتم خدمة ملفات الاختبار، على سبيل المثال:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // عنوان IP للشبكة للجهاز الذي يشغل عملية WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

سيضمن ذلك فتح المتصفح بشكل صحيح لمثيل الخادم الصحيح المستضاف على المثيل الذي يشغل اختبارات WebdriverIO.

## أمثلة

يمكنك العثور على أمثلة مختلفة لاختبار المكونات باستخدام أطر عمل المكونات الشائعة في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples) الخاص بنا.