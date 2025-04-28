---
id: customservices
title: سرویس‌های سفارشی
---

شما می‌توانید سرویس سفارشی خود را برای WDIO test runner بنویسید تا با نیازهای خود متناسب باشد.

سرویس‌ها افزونه‌هایی هستند که برای منطق قابل استفاده مجدد ایجاد شده‌اند تا تست‌ها را ساده‌تر کنند، مجموعه تست خود را مدیریت کنند و نتایج را یکپارچه سازند. سرویس‌ها به تمام [hooks](/docs/configurationfile) یکسانی که در `wdio.conf.js` در دسترس است، دسترسی دارند.

دو نوع سرویس وجود دارد که می‌توان تعریف کرد: یک سرویس راه‌انداز که فقط به هوک‌های `onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete` دسترسی دارد که فقط یکبار در هر اجرای تست اجرا می‌شوند، و یک سرویس کارگر که به تمام هوک‌های دیگر دسترسی دارد و برای هر کارگر اجرا می‌شود. توجه داشته باشید که شما نمی‌توانید متغیرهای (سراسری) را بین هر دو نوع سرویس به اشتراک بگذارید زیرا سرویس‌های کارگر در یک فرآیند (کارگر) متفاوت اجرا می‌شوند.

یک سرویس راه‌انداز را می‌توان به شکل زیر تعریف کرد:

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

در حالی که یک سرویس کارگر باید اینگونه باشد:

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

توصیه می‌شود که شیء مرورگر را از طریق پارامتر منتقل شده در سازنده ذخیره کنید. در نهایت هر دو نوع کارگر را به صورت زیر نمایش دهید:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

اگر از TypeScript استفاده می‌کنید و می‌خواهید مطمئن شوید که پارامترهای متد هوک از نظر نوع ایمن هستند، می‌توانید کلاس سرویس خود را به صورت زیر تعریف کنید:

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

## مدیریت خطای سرویس

خطایی که در طول یک هوک سرویس رخ می‌دهد، ثبت می‌شود در حالی که اجرا کننده ادامه می‌دهد. اگر هوکی در سرویس شما برای راه‌اندازی یا جمع‌آوری تست راه‌انداز حیاتی است، از `SevereServiceError` که از بسته `webdriverio` نمایان شده است، می‌توان برای متوقف کردن اجرا کننده استفاده کرد.

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

## وارد کردن سرویس از ماژول

تنها کاری که باید انجام دهید تا از این سرویس استفاده کنید، اختصاص آن به ویژگی `services` است.

فایل `wdio.conf.js` خود را به شکل زیر تغییر دهید:

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

برای سهولت مصرف و کشف سرویس‌ها توسط جامعه WebdriverIO، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نامگذاری استفاده کنند: `wdio-*-service`
* از کلمات کلیدی NPM استفاده کنید: `wdio-plugin`، `wdio-service`
* ورودی `main` باید یک نمونه از سرویس را `export` کند
* سرویس‌های نمونه: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

پیروی از الگوی نامگذاری توصیه شده، امکان افزودن سرویس‌ها با نام را فراهم می‌کند:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### افزودن سرویس منتشر شده به CLI و مستندات WDIO

ما واقعاً از هر افزونه جدیدی که می‌تواند به دیگران کمک کند تا تست‌های بهتری اجرا کنند، قدردانی می‌کنیم! اگر چنین افزونه‌ای ایجاد کرده‌اید، لطفاً افزودن آن را به CLI و مستندات ما در نظر بگیرید تا یافتن آن آسان‌تر شود.

لطفاً با تغییرات زیر یک درخواست pull ارسال کنید:

- سرویس خود را به لیست [سرویس‌های پشتیبانی شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) در ماژول CLI اضافه کنید
- [لیست سرویس](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) را برای افزودن مستندات خود به صفحه رسمی Webdriver.io بهبود بخشید