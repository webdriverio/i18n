---
id: customservices
title: سرویس‌های سفارشی
description: "با استفاده از هوک‌های testrunner، یک سرویس launcher یا worker سفارشی برای WDIO testrunner بنویسید، خطاهای سرویس را مدیریت کنید و آن را در NPM منتشر کنید."
---

شما می‌توانید سرویس سفارشی خود را برای WDIO test runner بنویسید تا دقیقاً متناسب با نیازهای شما باشد.

سرویس‌ها افزونه‌هایی هستند که برای منطق قابل استفاده مجدد ایجاد می‌شوند تا تست‌ها را ساده‌تر کنند، مجموعه تست شما را مدیریت کنند و نتایج را یکپارچه سازند. سرویس‌ها به همه [هوک‌هایی](/docs/configurationfile) که در `wdio.conf.js` در دسترس هستند، دسترسی دارند.

دو نوع سرویس قابل تعریف است: یک سرویس launcher که فقط به هوک‌های `onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete` دسترسی دارد که در هر اجرای تست فقط یک بار اجرا می‌شوند، و یک سرویس worker که به همه هوک‌های دیگر دسترسی دارد و برای هر worker اجرا می‌شود. توجه داشته باشید که نمی‌توانید متغیرهای (سراسری) را بین این دو نوع سرویس به اشتراک بگذارید، زیرا سرویس‌های worker در یک فرآیند (worker) متفاوت اجرا می‌شوند.

یک سرویس launcher را می‌توان به صورت زیر تعریف کرد:

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

در حالی که یک سرویس worker باید به این شکل باشد:

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

توصیه می‌شود شیء browser را از طریق پارامتر ارسال‌شده در constructor ذخیره کنید. در نهایت هر دو نوع worker را به صورت زیر export کنید:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

اگر از TypeScript استفاده می‌کنید و می‌خواهید مطمئن شوید که پارامترهای متدهای هوک type safe هستند، می‌توانید کلاس سرویس خود را به صورت زیر تعریف کنید:

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

## سرویس‌های Worker شرطی

یک سرویس می‌تواند تصمیم بگیرد که آیا کد worker آن برای یک اجرای تست یا برای یک worker خاص مورد نیاز است یا خیر. دو بررسی اختیاری وجود دارد:

| بررسی | محل اجرا | آرگومان‌ها | اثر بازگرداندن `false` |
| --- | --- | --- | --- |
| export نام‌دار ماژول `shouldLoad` | فرآیند launcher، پس از import کردن ماژول سرویس | پیکربندی، همه capabilityهای پیکربندی‌شده | ماژول سرویس در هیچ workerی import نمی‌شود. سرویس launcher آن همچنان اجرا می‌شود. |
| متد استاتیک سرویس worker با نام `shouldRun` | فرآیند worker، پیش از ساخت سرویس | گزینه‌های سرویس، capabilityهای آن worker، پیکربندی | سرویس worker ساخته نمی‌شود، بنابراین هیچ‌یک از هوک‌های آن در آن worker اجرا نمی‌شوند. |

از `shouldLoad(config, capabilities)` برای ماژول‌های سرویسی استفاده کنید که با نام یا مسیر پیکربندی شده‌اند. این یک تصمیم در سطح کل پکیج است: اگر یک سرویس یکسان بیش از یک بار با گزینه‌های متفاوت ظاهر شود، نتیجه برای همه آن ورودی‌ها اعمال می‌شود. برای مثال، یک سرویس سفارشی که به اعتبارنامه‌های راه دور نیاز دارد می‌تواند این‌گونه export کند:

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

از `static shouldRun(options, capabilities, config)` برای تصمیم‌گیری جداگانه برای هر ورودی سرویس و هر worker استفاده کنید. این روش با کلاس‌های سرویس سفارشی که مستقیماً در `services` ارسال می‌شوند نیز کار می‌کند. برای مثال، این سرویس می‌تواند هوک‌های خود را به یک مرورگر پیکربندی‌شده محدود کند:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Runs only in workers that passed shouldRun.
    }
}
```

با `services: [['custom', { browserName: 'chrome' }]]`، این سرویس worker فقط برای capabilityهای Chrome ساخته می‌شود، به شرطی که بررسی `shouldLoad` پکیج نیز اجازه آن را بدهد. worker باید ماژول سرویس را import کند تا بتواند `shouldRun` را فراخوانی کند؛ بازگرداندن `false` از این متد مانع آن import نمی‌شود و بر سرویس launcher تأثیری ندارد.

هر دو بررسی می‌توانند یک مقدار boolean یا یک promise از boolean بازگردانند. WebdriverIO منتظر هر نتیجه می‌ماند و فقط `false` بارگذاری یا ساخت را غیرفعال می‌کند. سرویس‌هایی که این بررسی‌ها را ندارند رفتار فعلی خود را حفظ می‌کنند. اشیای سرویسِ از پیش ساخته‌شده که حاوی هوک هستند بدون تغییر باقی می‌مانند.

اگر هر یک از بررسی‌ها خطا throw کند یا reject شود، مقداردهی اولیه سرویس با خطایی که سرویس را مشخص می‌کند شکست می‌خورد. این با خطاهایی که توسط هوک‌های سرویس throw می‌شوند و در ادامه توضیح داده شده‌اند، متفاوت است.

## مدیریت خطای سرویس

خطایی که در طول یک هوک سرویس throw شود، ثبت (log) می‌شود و runner به کار خود ادامه می‌دهد. اگر یک هوک در سرویس شما برای راه‌اندازی یا پایان کار test runner حیاتی است، می‌توان از `SevereServiceError` که از پکیج `webdriverio` در دسترس است برای متوقف کردن runner استفاده کرد.

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

## Import کردن سرویس از ماژول

تنها کاری که اکنون برای استفاده از این سرویس باید انجام دهید، اختصاص دادن آن به ویژگی `services` است.

فایل `wdio.conf.js` خود را به این شکل تغییر دهید:

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

## انتشار سرویس در NPM

برای اینکه استفاده و یافتن سرویس‌ها برای جامعه WebdriverIO آسان‌تر شود، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نام‌گذاری استفاده کنند: `wdio-*-service`
* از کلیدواژه‌های NPM استفاده کنید: `wdio-plugin`، `wdio-service`
* ورودی `main` باید یک نمونه از سرویس را `export` کند
* نمونه سرویس‌ها: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

پیروی از الگوی نام‌گذاری توصیه‌شده اجازه می‌دهد سرویس‌ها با نام اضافه شوند:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### افزودن سرویس منتشرشده به WDIO CLI و مستندات

ما واقعاً از هر پلاگین جدیدی که بتواند به دیگران در اجرای تست‌های بهتر کمک کند، قدردانی می‌کنیم! اگر چنین پلاگینی ایجاد کرده‌اید، لطفاً افزودن آن به CLI و مستندات ما را در نظر بگیرید تا یافتن آن آسان‌تر شود.

لطفاً یک pull request با تغییرات زیر ایجاد کنید:

- سرویس خود را به فهرست [سرویس‌های پشتیبانی‌شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) در ماژول CLI اضافه کنید
- [فهرست سرویس‌ها](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) را برای افزودن مستندات خود به صفحه رسمی Webdriver.io تکمیل کنید