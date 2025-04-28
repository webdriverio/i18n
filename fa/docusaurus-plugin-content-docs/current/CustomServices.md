---
id: customservices
title: سرویس‌های سفارشی
---

شما می‌توانید سرویس سفارشی خود را برای اجرا کننده آزمون WDIO ایجاد کنید تا نیازهای شما را به طور دقیق برآورده سازد.

سرویس‌ها افزونه‌هایی هستند که برای منطق قابل استفاده مجدد جهت ساده‌سازی آزمون‌ها، مدیریت مجموعه آزمون و ادغام نتایج ایجاد شده‌اند. سرویس‌ها به تمام [هوک‌های](/docs/configurationfile) یکسانی که در `wdio.conf.js` در دسترس هستند، دسترسی دارند.

دو نوع سرویس می‌توان تعریف کرد: سرویس راه‌انداز که فقط به هوک‌های `onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete` دسترسی دارد که فقط یک بار در هر اجرای آزمون اجرا می‌شوند، و سرویس کارگر که به تمام هوک‌های دیگر دسترسی دارد و برای هر کارگر اجرا می‌شود. توجه داشته باشید که نمی‌توانید متغیرهای (جهانی) را بین این دو نوع سرویس به اشتراک بگذارید زیرا سرویس‌های کارگر در یک فرآیند (کارگر) متفاوت اجرا می‌شوند.

یک سرویس راه‌انداز را می‌توان به صورت زیر تعریف کرد:

```js
export default class CustomLauncherService {
    // اگر یک هوک پرامیس برگرداند، WebdriverIO منتظر می‌ماند تا آن پرامیس حل شود و سپس ادامه می‌دهد.
    async onPrepare(config, capabilities) {
        // TODO: کاری قبل از راه‌اندازی تمام کارگرها
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: کاری پس از خاموش شدن کارگرها
    }

    // متدهای سفارشی سرویس ...
}
```

در حالی که یک سرویس کارگر باید به شکل زیر باشد:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` شامل تمام گزینه‌های مخصوص به سرویس است
     * به عنوان مثال اگر به صورت زیر تعریف شده باشد:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * پارامتر `serviceOptions` برابر خواهد بود با: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * این شیء مرورگر برای اولین بار در اینجا ارسال می‌شود
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: کاری قبل از اجرای همه آزمون‌ها، مثلاً:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: کاری پس از اجرای همه آزمون‌ها
    }

    beforeTest(test, context) {
        // TODO: کاری قبل از هر اجرای آزمون Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: کاری قبل از هر اجرای سناریوی Cucumber
    }

    // هوک‌های دیگر یا متدهای سفارشی سرویس ...
}
```

توصیه می‌شود شیء مرورگر را از طریق پارامتر ارسال شده در سازنده ذخیره کنید. در نهایت هر دو نوع کارگر را به صورت زیر ارائه دهید:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

اگر از TypeScript استفاده می‌کنید و می‌خواهید مطمئن شوید که پارامترهای متد هوک از نظر نوع امن هستند، می‌توانید کلاس سرویس خود را به صورت زیر تعریف کنید:

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

خطایی که در یک هوک سرویس رخ می‌دهد ثبت می‌شود در حالی که اجرا کننده ادامه می‌یابد. اگر هوکی در سرویس شما برای راه‌اندازی یا جمع‌آوری اجرا کننده آزمون حیاتی است، می‌توان از `SevereServiceError` که از بسته `webdriverio` ارائه شده است برای متوقف کردن اجرا کننده استفاده کرد.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: کاری مهم برای راه‌اندازی قبل از شروع همه کارگرها

        throw new SevereServiceError('مشکلی رخ داده است.')
    }

    // متدهای سفارشی سرویس ...
}
```

## وارد کردن سرویس از ماژول

تنها کاری که اکنون برای استفاده از این سرویس باید انجام دهید، اختصاص آن به ویژگی `services` است.

فایل `wdio.conf.js` خود را به صورت زیر تغییر دهید:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * استفاده از کلاس سرویس وارد شده
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * استفاده از مسیر مطلق به سرویس
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## انتشار سرویس در NPM

برای آسان‌تر کردن استفاده و کشف سرویس‌ها توسط جامعه WebdriverIO، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نام‌گذاری استفاده کنند: `wdio-*-service`
* از کلمات کلیدی NPM استفاده کنید: `wdio-plugin`، `wdio-service`
* ورودی `main` باید یک نمونه از سرویس را `export` کند
* نمونه سرویس‌ها: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

پیروی از الگوی نام‌گذاری توصیه شده امکان افزودن سرویس‌ها با نام را فراهم می‌کند:

```js
// افزودن wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### افزودن سرویس منتشر شده به CLI و مستندات WDIO

ما واقعاً از هر افزونه جدیدی که می‌تواند به دیگران در اجرای آزمون‌های بهتر کمک کند، قدردانی می‌کنیم! اگر چنین افزونه‌ای ایجاد کرده‌اید، لطفاً افزودن آن به CLI و مستندات ما را در نظر بگیرید تا پیدا کردن آن آسان‌تر شود.

لطفاً یک درخواست پول با تغییرات زیر ارسال کنید:

- سرویس خود را به لیست [سرویس‌های پشتیبانی شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) در ماژول CLI اضافه کنید
- [لیست سرویس](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) را برای اضافه کردن مستندات خود به صفحه رسمی Webdriver.io گسترش دهید