---
id: customservices
title: الخدمات المخصصة
---

يمكنك كتابة خدمة مخصصة خاصة بك لمشغل اختبار WDIO لتناسب احتياجاتك.

الخدمات هي إضافات تم إنشاؤها للمنطق القابل لإعادة الاستخدام لتبسيط الاختبارات وإدارة مجموعة الاختبار الخاصة بك ودمج النتائج. تمتلك الخدمات وصولاً إلى نفس [الخطافات](/docs/configurationfile) المتوفرة في ملف `wdio.conf.js`.

هناك نوعان من الخدمات التي يمكن تعريفها: خدمة المُطلق التي لديها فقط وصول إلى خطاف `onPrepare` و`onWorkerStart` و`onWorkerEnd` و`onComplete` والتي يتم تنفيذها مرة واحدة فقط لكل اختبار، وخدمة العامل التي لديها وصول إلى جميع الخطافات الأخرى ويتم تنفيذها لكل عامل. لاحظ أنه لا يمكنك مشاركة المتغيرات (العالمية) بين نوعي الخدمات لأن خدمات العامل تعمل في عملية مختلفة (عامل).

يمكن تعريف خدمة المُطلق على النحو التالي:

```js
export default class CustomLauncherService {
    // إذا أعاد الخطاف وعداً، فإن WebdriverIO سينتظر حتى يتم حل هذا الوعد للمتابعة.
    async onPrepare(config, capabilities) {
        // TODO: شيء ما قبل إطلاق جميع العمال
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: شيء ما بعد إيقاف تشغيل العمال
    }

    // طرق الخدمة المخصصة ...
}
```

بينما يجب أن تبدو خدمة العامل كما يلي:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` يحتوي على جميع الخيارات الخاصة بالخدمة
     * على سبيل المثال، إذا تم تحديدها على النحو التالي:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * فسيكون معامل `serviceOptions`: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * يتم تمرير كائن المتصفح هنا للمرة الأولى
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: شيء ما قبل تشغيل جميع الاختبارات، على سبيل المثال:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: شيء ما بعد تشغيل جميع الاختبارات
    }

    beforeTest(test, context) {
        // TODO: شيء ما قبل كل اختبار Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: شيء ما قبل كل سيناريو Cucumber
    }

    // خطافات أخرى أو طرق خدمة مخصصة ...
}
```

يوصى بتخزين كائن المتصفح من خلال المعلمة الممررة في المنشئ. وأخيراً، قم بكشف كلا النوعين من العمال على النحو التالي:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

إذا كنت تستخدم TypeScript وتريد التأكد من أن معلمات طرق الخطاف آمنة نوعياً، فيمكنك تعريف فئة الخدمة الخاصة بك على النحو التالي:

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

## معالجة أخطاء الخدمة

سيتم تسجيل خطأ مُلقى أثناء خطاف الخدمة بينما يستمر المشغل. إذا كان الخطاف في خدمتك ضرورياً لإعداد أو إزالة مشغل الاختبار، فيمكن استخدام `SevereServiceError` المُستخرج من حزمة `webdriverio` لإيقاف المشغل.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: شيء ما حيوي للإعداد قبل إطلاق جميع العمال

        throw new SevereServiceError('حدث خطأ ما.')
    }

    // طرق الخدمة المخصصة ...
}
```

## استيراد الخدمة من الوحدة

الشيء الوحيد الذي يجب القيام به الآن لاستخدام هذه الخدمة هو تعيينها لخاصية `services`.

قم بتعديل ملف `wdio.conf.js` الخاص بك ليبدو كما يلي:

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

لجعل الخدمات أسهل استهلاكاً واكتشافاً من قبل مجتمع WebdriverIO، يرجى اتباع هذه التوصيات:

* يجب أن تستخدم الخدمات اتفاقية التسمية هذه: `wdio-*-service`
* استخدم كلمات مفتاحية NPM: `wdio-plugin`، `wdio-service`
* يجب أن يقوم إدخال `main` بتصدير `export` نسخة من الخدمة
* أمثلة على الخدمات: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

إن اتباع نمط التسمية الموصى به يسمح بإضافة الخدمات بالاسم:

```js
// إضافة wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### إضافة الخدمة المنشورة إلى WDIO CLI والمستندات

نحن نقدر حقًا كل إضافة جديدة يمكن أن تساعد الآخرين على إجراء اختبارات أفضل! إذا قمت بإنشاء مثل هذه الإضافة، فيرجى التفكير في إضافتها إلى واجهة سطر الأوامر (CLI) والمستندات لدينا لتسهيل العثور عليها.

يرجى تقديم طلب سحب مع التغييرات التالية:

- أضف خدمتك إلى قائمة [الخدمات المدعومة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) في وحدة CLI
- تحسين [قائمة الخدمات](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) لإضافة وثائقك إلى صفحة Webdriver.io الرسمية