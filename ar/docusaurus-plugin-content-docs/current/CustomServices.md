---
id: customservices
title: الخدمات المخصصة
---

يمكنك كتابة خدمة مخصصة خاصة بك لمشغل اختبار WDIO لتناسب احتياجاتك.

الخدمات هي إضافات تم إنشاؤها للمنطق القابل لإعادة الاستخدام لتبسيط الاختبارات، وإدارة مجموعة الاختبارات الخاصة بك ودمج النتائج. تتيح الخدمات الوصول إلى جميع [الخطافات](/docs/configurationfile) المتوفرة في ملف `wdio.conf.js`.

هناك نوعان من الخدمات التي يمكن تعريفها: خدمة المشغل التي لديها حق الوصول فقط إلى خطافات `onPrepare` و`onWorkerStart` و`onWorkerEnd` و`onComplete` والتي يتم تنفيذها مرة واحدة فقط لكل تشغيل اختبار، وخدمة العامل التي لديها حق الوصول إلى جميع الخطافات الأخرى ويتم تنفيذها لكل عامل. لاحظ أنه لا يمكنك مشاركة المتغيرات (العامة) بين نوعي الخدمات حيث تعمل خدمات العمال في عملية (عامل) مختلفة.

يمكن تعريف خدمة المشغل على النحو التالي:

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

بينما يجب أن تبدو خدمة العامل على النحو التالي:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

يوصى بتخزين كائن المتصفح من خلال المعلمة التي تم تمريرها في المنشئ. أخيرًا، قم بعرض كلا النوعين من العمال على النحو التالي:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

إذا كنت تستخدم TypeScript وترغب في التأكد من أن معلمات طرق الخطاف آمنة من حيث النوع، يمكنك تعريف فئة الخدمة الخاصة بك على النحو التالي:

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

سيتم تسجيل أي خطأ يحدث أثناء خطاف الخدمة بينما يستمر المشغل. إذا كان الخطاف في خدمتك ضروريًا لإعداد أو إيقاف مشغل الاختبار، يمكن استخدام `SevereServiceError` المكشوف من حزمة `webdriverio` لإيقاف المشغل.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## استيراد الخدمة من الوحدة

الشيء الوحيد الذي يجب القيام به الآن من أجل استخدام هذه الخدمة هو تعيينها لخاصية `services`.

قم بتعديل ملف `wdio.conf.js` الخاص بك ليبدو كما يلي:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## نشر الخدمة على NPM

لجعل الخدمات أسهل في الاستخدام والاكتشاف من قبل مجتمع WebdriverIO، يرجى اتباع هذه التوصيات:

* يجب أن تستخدم الخدمات اتفاقية التسمية هذه: `wdio-*-service`
* استخدم كلمات مفتاحية NPM: `wdio-plugin`, `wdio-service`
* يجب أن يقوم إدخال `main` بـ `export` نسخة من الخدمة
* أمثلة على الخدمات: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

إن اتباع نمط التسمية الموصى به يسمح بإضافة الخدمات حسب الاسم:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### إضافة الخدمة المنشورة إلى واجهة سطر أوامر WDIO والوثائق

نحن نقدر حقًا كل إضافة جديدة يمكن أن تساعد الآخرين في إجراء اختبارات أفضل! إذا كنت قد أنشأت مثل هذه الإضافة، فيرجى النظر في إضافتها إلى واجهة سطر الأوامر والوثائق الخاصة بنا لتسهيل العثور عليها.

يرجى تقديم طلب سحب مع التغييرات التالية:

- أضف خدمتك إلى قائمة [الخدمات المدعومة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) في وحدة CLI
- قم بتحسين [قائمة الخدمة](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) لإضافة وثائقك إلى صفحة Webdriver.io الرسمية