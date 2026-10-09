---
id: customservices
title: الخدمات المخصصة
description: "اكتب خدمة مُشغِّل أو خدمة عامل مخصصة لمشغّل اختبارات WDIO باستخدام خطافات مشغّل الاختبارات، وتعامل مع أخطاء الخدمة وانشرها على NPM."
---

يمكنك كتابة خدمتك المخصصة لمشغّل اختبارات WDIO لتلائم احتياجاتك.

الخدمات هي إضافات تُنشأ لتوفير منطق قابل لإعادة الاستخدام بهدف تبسيط الاختبارات وإدارة مجموعة اختباراتك ودمج النتائج. تتمتع الخدمات بإمكانية الوصول إلى جميع [الخطافات](/docs/configurationfile) نفسها المتاحة في `wdio.conf.js`.

هناك نوعان من الخدمات يمكن تعريفهما: خدمة المُشغِّل (launcher service) التي لا يمكنها الوصول إلا إلى الخطافات `onPrepare` و`onWorkerStart` و`onWorkerEnd` و`onComplete` والتي تُنفَّذ مرة واحدة فقط لكل عملية تشغيل اختبار، وخدمة العامل (worker service) التي يمكنها الوصول إلى جميع الخطافات الأخرى وتُنفَّذ لكل عامل. لاحظ أنه لا يمكنك مشاركة المتغيرات (العامة) بين نوعي الخدمات لأن خدمات العامل تعمل في عملية (عامل) مختلفة.

يمكن تعريف خدمة المُشغِّل على النحو التالي:

```js
export default class CustomLauncherService {
    // إذا أعاد خطاف ما وعدًا (promise)، فسينتظر WebdriverIO حتى يتم حل هذا الوعد قبل المتابعة.
    async onPrepare(config, capabilities) {
        // TODO: شيء ما قبل تشغيل جميع العمال
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: شيء ما بعد إيقاف العمال
    }

    // توابع الخدمة المخصصة ...
}
```

بينما يجب أن تبدو خدمة العامل كما يلي:

```js
export default class CustomWorkerService {
    /**
     * يحتوي `serviceOptions` على جميع الخيارات الخاصة بالخدمة
     * على سبيل المثال، إذا تم تعريفها كما يلي:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * فستكون قيمة المعامل `serviceOptions`: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * يُمرَّر كائن المتصفح هذا هنا لأول مرة
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: شيء ما قبل تشغيل جميع الاختبارات، مثلًا:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: شيء ما بعد تشغيل جميع الاختبارات
    }

    beforeTest(test, context) {
        // TODO: شيء ما قبل تشغيل كل اختبار Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: شيء ما قبل تشغيل كل سيناريو Cucumber
    }

    // خطافات أخرى أو توابع خدمة مخصصة ...
}
```

يُوصى بتخزين كائن المتصفح من خلال المعامل المُمرَّر في المُنشئ. أخيرًا، قم بتصدير كلا النوعين من العمال كما يلي:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

إذا كنت تستخدم TypeScript وتريد التأكد من أن معاملات توابع الخطافات آمنة من حيث الأنواع، يمكنك تعريف فئة الخدمة الخاصة بك على النحو التالي:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## خدمات العامل الشرطية

يمكن للخدمة أن تقرر ما إذا كانت شيفرة العامل الخاصة بها مطلوبة لعملية تشغيل اختبار أو لعامل معين. هناك فحصان اختياريان:

| الفحص | مكان التشغيل | الوسائط | تأثير إرجاع `false` |
| --- | --- | --- | --- |
| تصدير الوحدة المُسمّى `shouldLoad` | عملية المُشغِّل، بعد استيراد وحدة الخدمة | الإعدادات، وجميع القدرات (capabilities) المُعدّة | لا يتم استيراد وحدة الخدمة في أي عامل. تظل خدمة المُشغِّل الخاصة بها تعمل. |
| تابع خدمة العامل الثابت `shouldRun` | عملية العامل، قبل إنشاء الخدمة | خيارات الخدمة، وقدرات ذلك العامل، والإعدادات | لا يتم إنشاء خدمة العامل، وبالتالي لا يعمل أي من خطافاتها في ذلك العامل. |

استخدم `shouldLoad(config, capabilities)` لوحدات الخدمة المُعدّة بالاسم أو بالمسار. هذا قرار على مستوى الحزمة بأكملها: إذا ظهرت الخدمة نفسها أكثر من مرة بخيارات مختلفة، فإن النتيجة تنطبق على جميع تلك الإدخالات. على سبيل المثال، يمكن لخدمة مخصصة تتطلب بيانات اعتماد بعيدة أن تُصدِّر:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

استخدم `static shouldRun(options, capabilities, config)` لاتخاذ القرار بشكل منفصل لكل إدخال خدمة ولكل عامل. يعمل هذا أيضًا مع فئات الخدمات المخصصة المُمرَّرة مباشرة في `services`. على سبيل المثال، يمكن لهذه الخدمة أن تقصر خطافاتها على متصفح مُعدّ:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // يعمل فقط في العمال الذين اجتازوا shouldRun.
    }
}
```

مع `services: [['custom', { browserName: 'chrome' }]]`، يتم إنشاء خدمة العامل هذه فقط لقدرات Chrome، بشرط أن يسمح بذلك أيضًا فحص `shouldLoad` الخاص بالحزمة. يجب على العامل استيراد وحدة الخدمة لاستدعاء `shouldRun`؛ وإرجاع `false` من هذا التابع لا يمنع ذلك الاستيراد ولا يؤثر على خدمة المُشغِّل.

يمكن لكلا الفحصين إرجاع قيمة منطقية (boolean) أو وعد بقيمة منطقية. ينتظر WebdriverIO كل نتيجة، والقيمة `false` وحدها هي التي تعطّل التحميل أو الإنشاء. تحتفظ الخدمات التي لا تحتوي على هذين الفحصين بسلوكها الحالي. أما كائنات الخدمات المُنشأة مسبقًا والتي تحتوي على خطافات فتبقى دون تغيير.

إذا ألقى أي من الفحصين استثناءً أو تم رفضه، تفشل تهيئة الخدمة مع خطأ يحدد الخدمة. يختلف هذا عن الأخطاء التي تلقيها خطافات الخدمة، والموضحة أدناه.

## معالجة أخطاء الخدمة

سيتم تسجيل الخطأ الذي يُلقى أثناء خطاف الخدمة بينما يستمر المشغّل في العمل. إذا كان أحد الخطافات في خدمتك بالغ الأهمية لإعداد مشغّل الاختبارات أو إنهائه، فيمكن استخدام `SevereServiceError` المُصدَّر من حزمة `webdriverio` لإيقاف المشغّل.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: شيء بالغ الأهمية للإعداد قبل تشغيل جميع العمال

        throw new SevereServiceError('Something went wrong.')
    }

    // توابع الخدمة المخصصة ...
}
```

## استيراد الخدمة من وحدة

الشيء الوحيد المتبقي الآن لاستخدام هذه الخدمة هو تعيينها إلى الخاصية `services`.

عدّل ملف `wdio.conf.js` الخاص بك ليبدو كما يلي:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * استخدام فئة الخدمة المستوردة
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * استخدام المسار المطلق للخدمة
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## نشر الخدمة على NPM

لتسهيل استخدام الخدمات واكتشافها من قِبل مجتمع WebdriverIO، يرجى اتباع هذه التوصيات:

* يجب أن تستخدم الخدمات اصطلاح التسمية هذا: `wdio-*-service`
* استخدم كلمات NPM المفتاحية: `wdio-plugin`، `wdio-service`
* يجب أن يقوم المدخل `main` بـ `export` لنسخة من الخدمة
* أمثلة على الخدمات: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

يتيح اتباع نمط التسمية الموصى به إضافة الخدمات بالاسم:

```js
// إضافة wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### إضافة الخدمة المنشورة إلى WDIO CLI والوثائق

نحن نقدّر حقًا كل إضافة جديدة يمكن أن تساعد الآخرين على تشغيل اختبارات أفضل! إذا أنشأت مثل هذه الإضافة، فيرجى التفكير في إضافتها إلى واجهة سطر الأوامر (CLI) والوثائق الخاصة بنا لتسهيل العثور عليها.

يرجى تقديم طلب سحب (pull request) يتضمن التغييرات التالية:

- أضف خدمتك إلى قائمة [الخدمات المدعومة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) في وحدة CLI
- حسّن [قائمة الخدمات](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) لإضافة وثائقك إلى صفحة Webdriver.io الرسمية