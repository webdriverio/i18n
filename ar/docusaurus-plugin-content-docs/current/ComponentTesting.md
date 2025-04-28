---
id: component-testing
title: اختبار المكونات
---

باستخدام [منفذ المتصفح](/docs/runner#browser-runner) الخاص بـ WebdriverIO، يمكنك تشغيل الاختبارات داخل متصفح سطح المكتب أو الهاتف المحمول الفعلي مع استخدام WebdriverIO وبروتوكول WebDriver للأتمتة والتفاعل مع ما يتم عرضه على الصفحة. يتمتع هذا النهج [بالعديد من المزايا](/docs/runner#browser-runner) مقارنة بأطر الاختبار الأخرى التي تسمح فقط بالاختبار مقابل [JSDOM](https://www.npmjs.com/package/jsdom).

## كيف يعمل؟

يستخدم منفذ المتصفح [Vite](https://vitejs.dev/) لعرض صفحة اختبار وتهيئة إطار عمل اختبار لتشغيل اختباراتك في المتصفح. حاليًا يدعم فقط Mocha ولكن Jasmine وCucumber [قيد التطوير](https://github.com/orgs/webdriverio/projects/1). هذا يسمح باختبار أي نوع من المكونات حتى للمشاريع التي لا تستخدم Vite.

يتم تشغيل خادم Vite بواسطة منفذ اختبار WebdriverIO وتكوينه بحيث يمكنك استخدام جميع أدوات التقارير والخدمات كما اعتدت بالنسبة لاختبارات end-to-end العادية. علاوة على ذلك، فإنه يقوم بتهيئة نسخة من [`browser`](/docs/api/browser) التي تتيح لك الوصول إلى مجموعة فرعية من [واجهة برمجة تطبيقات WebdriverIO](/docs/api) للتفاعل مع أي عناصر على الصفحة. بشكل مشابه لاختبارات e2e، يمكنك الوصول إلى تلك النسخة من خلال متغير `browser` المرفق بالنطاق العالمي أو عن طريق استيراده من `@wdio/globals` اعتمادًا على كيفية تعيين [`injectGlobals`](/docs/api/globals).

WebdriverIO لديه دعم مدمج للأطر التالية:

- [__Nuxt__](https://nuxt.com/): يكتشف منفذ اختبار WebdriverIO تطبيق Nuxt ويقوم تلقائيًا بإعداد composables الخاصة بمشروعك ويساعد في محاكاة الخلفية لـ Nuxt، اقرأ المزيد في [وثائق Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): يكتشف منفذ اختبار WebdriverIO ما إذا كنت تستخدم TailwindCSS ويقوم بتحميل البيئة بشكل صحيح في صفحة الاختبار

## الإعداد

لإعداد WebdriverIO لاختبار الوحدة أو المكون في المتصفح، قم بإنشاء مشروع WebdriverIO جديد عبر:

```bash
npm init wdio@latest ./
# أو
yarn create wdio ./
```

بمجرد بدء معالج التكوين، اختر `browser` لتشغيل اختبار الوحدة والمكون واختر أحد الإعدادات المسبقة إذا رغبت في ذلك، وإلا اختر _"Other"_ إذا كنت تريد فقط تشغيل اختبارات الوحدة الأساسية. يمكنك أيضًا تكوين تكوين Vite مخصص إذا كنت تستخدم Vite بالفعل في مشروعك. لمزيد من المعلومات، راجع جميع [خيارات المنفذ](/docs/runner#runner-options).

:::info

__ملاحظة:__ سيقوم WebdriverIO افتراضيًا بتشغيل اختبارات المتصفح في CI بدون واجهة، على سبيل المثال، عند تعيين متغير البيئة `CI` إلى `'1'` أو `'true'`. يمكنك تكوين هذا السلوك يدويًا باستخدام خيار [`headless`](/docs/runner#headless) للمنفذ.

:::

في نهاية هذه العملية، يجب أن تجد ملف `wdio.conf.js` يحتوي على تكوينات WebdriverIO المختلفة، بما في ذلك خاصية `runner`، على سبيل المثال:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

من خلال تحديد [إمكانيات](/docs/configuration#capabilities) مختلفة، يمكنك تشغيل اختباراتك في متصفحات مختلفة، بشكل متوازي إذا رغبت في ذلك.

إذا كنت لا تزال غير متأكد من كيفية عمل كل شيء، شاهد البرنامج التعليمي التالي حول كيفية البدء باختبار المكونات في WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## أداة الاختبار

الأمر متروك لك تمامًا لما تريد تشغيله في اختباراتك وكيف تحب عرض المكونات. ومع ذلك، فإننا نوصي باستخدام [Testing Library](https://testing-library.com/) كإطار عمل مساعد لأنه يوفر إضافات لمختلف أطر عمل المكونات، مثل React وPreact وSvelte وVue. وهو مفيد جدًا لعرض المكونات في صفحة الاختبار ويقوم تلقائيًا بتنظيف هذه المكونات بعد كل اختبار.

يمكنك مزج الأدوات الأولية من Testing Library مع أوامر WebdriverIO كما تشاء، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__ملاحظة:__ استخدام طرق العرض من Testing Library يساعد على إزالة المكونات التي تم إنشاؤها بين الاختبارات. إذا كنت لا تستخدم Testing Library، فتأكد من إرفاق مكونات الاختبار الخاصة بك بحاوية يتم تنظيفها بين الاختبارات.

## نصوص الإعداد

يمكنك إعداد اختباراتك عن طريق تشغيل نصوص برمجية عشوائية في Node.js أو في المتصفح، مثل حقن الأنماط، أو محاكاة واجهات برمجة تطبيقات المتصفح، أو الاتصال بخدمة خارجية. يمكن استخدام [hooks](/docs/configuration#hooks) الخاصة بـ WebdriverIO لتنفيذ التعليمات البرمجية في Node.js بينما يسمح [`mochaOpts.require`](/docs/frameworks#require) باستيراد النصوص إلى المتصفح قبل تحميل الاختبارات، على سبيل المثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // تقديم نص إعداد للتشغيل في المتصفح
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

الآن في اختباراتك، يمكنك توفير قيم استجابة مخصصة لجميع طلبات المتصفح. اقرأ المزيد عن الإعدادات العالمية في [وثائق Mocha](https://mochajs.org/#global-fixtures).

## مراقبة ملفات الاختبار والتطبيق

هناك طرق متعددة لتصحيح اختبارات المتصفح الخاصة بك. أسهل طريقة هي بدء منفذ اختبار WebdriverIO باستخدام العلامة `--watch`، على سبيل المثال:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

سيؤدي ذلك إلى تشغيل جميع الاختبارات مبدئيًا والتوقف بمجرد تشغيلها جميعًا. يمكنك بعد ذلك إجراء تغييرات على الملفات الفردية التي سيتم إعادة تشغيلها بشكل فردي. إذا قمت بتعيين [`filesToWatch`](/docs/configuration#filestowatch) يشير إلى ملفات التطبيق الخاصة بك، فسيعيد تشغيل جميع الاختبارات عند إجراء تغييرات على تطبيقك.

## التصحيح

على الرغم من أنه ليس من الممكن (بعد) تعيين نقاط توقف في IDE الخاص بك والتعرف عليها من قبل المتصفح البعيد، يمكنك استخدام الأمر [`debug`](/docs/api/browser/debug) لإيقاف الاختبار في أي نقطة. يتيح لك ذلك فتح DevTools لتصحيح الاختبار عن طريق تعيين نقاط توقف في [علامة التبويب sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

عند استدعاء الأمر `debug`، ستحصل أيضًا على واجهة repl لـ Node.js في المحطة الطرفية الخاصة بك، وتقول:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

اضغط على `Ctrl` أو `Command` + `c` أو أدخل `.exit` للمتابعة مع الاختبار.

## التشغيل باستخدام Selenium Grid

إذا كان لديك [Selenium Grid](https://www.selenium.dev/documentation/grid/) تم إعداده وتشغيل متصفحك من خلال تلك الشبكة، فيجب عليك تعيين خيار `host` لمنفذ المتصفح للسماح للمتصفح بالوصول إلى المضيف الصحيح حيث يتم خدمة ملفات الاختبار، على سبيل المثال:

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