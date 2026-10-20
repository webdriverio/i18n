---
id: customreporter
title: گزارش‌دهنده سفارشی
description: "یک گزارش‌دهنده سفارشی برای اجراکننده تست WDIO بر پایه @wdio/reporter بسازید، رویدادهای اجراکننده را مدیریت کنید و آن را در NPM منتشر کنید."
---

شما می‌توانید گزارش‌دهنده سفارشی خود را برای اجراکننده تست WDIO بنویسید که متناسب با نیازهای شما باشد. و این کار آسان است!

تنها کاری که باید انجام دهید این است که یک ماژول node ایجاد کنید که از پکیج `@wdio/reporter` ارث‌بری کند، تا بتواند پیام‌ها را از تست دریافت کند.

تنظیمات پایه باید به این شکل باشد:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * گزارش‌دهنده را به‌طور پیش‌فرض وادار به نوشتن در جریان خروجی کنید
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

برای استفاده از این گزارش‌دهنده، تنها کاری که باید انجام دهید این است که آن را به ویژگی `reporter` در پیکربندی خود اختصاص دهید.


فایل `wdio.conf.js` شما باید به این شکل باشد:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * استفاده از کلاس گزارش‌دهنده import شده
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * استفاده از مسیر مطلق به گزارش‌دهنده
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

همچنین می‌توانید گزارش‌دهنده را در NPM منتشر کنید تا همه بتوانند از آن استفاده کنند. پکیج را مانند سایر گزارش‌دهنده‌ها به صورت `wdio-<reportername>-reporter` نام‌گذاری کنید و آن را با کلمات کلیدی مانند `wdio` یا `wdio-reporter` برچسب‌گذاری کنید.

## مدیریت‌کننده رویداد

شما می‌توانید یک مدیریت‌کننده رویداد برای چندین رویداد که در طول تست فعال می‌شوند ثبت کنید. همه مدیریت‌کننده‌های زیر payloadهایی با اطلاعات مفید درباره وضعیت و پیشرفت فعلی دریافت خواهند کرد.

ساختار این اشیاء payload به رویداد بستگی دارد و در تمام فریم‌ورک‌ها (Mocha، Jasmine و Cucumber) یکسان است. پس از پیاده‌سازی یک گزارش‌دهنده سفارشی، باید برای همه فریم‌ورک‌ها کار کند.

فهرست زیر شامل تمام متدهای ممکنی است که می‌توانید به کلاس گزارش‌دهنده خود اضافه کنید:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

نام متدها کاملاً گویا هستند.

برای چاپ چیزی در یک رویداد خاص، از متد `this.write(...)` استفاده کنید که توسط کلاس والد `WDIOReporter` ارائه می‌شود. این متد محتوا را یا به `stdout` یا به یک فایل لاگ (بسته به گزینه‌های گزارش‌دهنده) ارسال می‌کند.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

توجه داشته باشید که به هیچ وجه نمی‌توانید اجرای تست را به تعویق بیندازید.

همه مدیریت‌کننده‌های رویداد باید روال‌های همگام (synchronous) را اجرا کنند (در غیر این صورت با شرایط رقابتی (race conditions) مواجه خواهید شد).

حتماً [بخش مثال](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) را بررسی کنید که در آن می‌توانید یک نمونه گزارش‌دهنده سفارشی پیدا کنید که نام رویداد را برای هر رویداد چاپ می‌کند.

اگر یک گزارش‌دهنده سفارشی پیاده‌سازی کرده‌اید که می‌تواند برای جامعه مفید باشد، در ایجاد یک Pull Request تردید نکنید تا بتوانیم گزارش‌دهنده را به صورت عمومی در دسترس قرار دهیم!

همچنین، اگر اجراکننده تست WDIO را از طریق رابط `Launcher` اجرا می‌کنید، نمی‌توانید یک گزارش‌دهنده سفارشی را به صورت تابع به شکل زیر اعمال کنید:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // این کار نخواهد کرد، زیرا CustomReporter قابل سریال‌سازی نیست
    reporters: ['dot', CustomReporter]
})
```

## گزارش‌دهنده‌ها و تست‌های موازی

با [تست‌های موازی در یک فایل spec](./ParallelTests.md)، تست‌های یک فایل spec با هم همپوشانی دارند: `onTestStart` یک تست می‌تواند قبل از `onTestEnd` تست دیگری رخ دهد و دستورات تست‌های مختلف در هم آمیخته می‌شوند. `WDIOReporter` این موضوع را برای شما مدیریت می‌کند. در حالت موازی، رویدادهای فریم‌ورک دو فیلد اضافی دارند:

- `parentUid` در `suite:start`، `hook:start` و `test:start`: شناسه uid مجموعه (suite) مالک (`null` برای یک suite سطح بالا). گزارش‌دهنده suite، hook یا تست را به آن suite اضافه می‌کند، نه به suiteای که آخر از همه شروع شده است.
- `contextId` در رویدادهای تست و دستور: زمینه مرور (browsing context) تست. گزارش‌دهنده خروجی دستور را به تستی اضافه می‌کند که در آن زمینه اجرا شده است.

بنابراین درخت‌های `suites`، `tests` و `hooks` گزارش‌دهنده صحیح هستند. اگر گزارش‌دهنده شما وضعیت خود را نگه می‌دارد، به جای دنبال کردن یک تست فعلی واحد، آن را بر اساس `uid` تست یا suite کلیدگذاری کنید.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

## صبر تا `isSynchronised`

اگر گزارش‌دهنده شما برای گزارش داده‌ها باید عملیات ناهمگام (async) انجام دهد (مثلاً آپلود فایل‌های لاگ یا سایر دارایی‌ها)، می‌توانید متد `isSynchronised` را در گزارش‌دهنده سفارشی خود بازنویسی کنید تا اجراکننده WebdriverIO صبر کند تا همه چیز را محاسبه کرده باشید. نمونه‌ای از این را می‌توان در [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) مشاهده کرد:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * بازنویسی متد isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * همگام‌سازی فایل‌های لاگ
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * حذف لاگ‌های منتقل‌شده از مخزن لاگ
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

به این ترتیب اجراکننده صبر می‌کند تا تمام اطلاعات لاگ آپلود شوند.

## انتشار گزارش‌دهنده در NPM

برای اینکه استفاده و کشف گزارش‌دهنده توسط جامعه WebdriverIO آسان‌تر شود، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نام‌گذاری استفاده کنند: `wdio-*-reporter`
* از کلمات کلیدی NPM استفاده کنید: `wdio-plugin`، `wdio-reporter`
* ورودی `main` باید یک نمونه از گزارش‌دهنده را `export` کند
* نمونه گزارش‌دهنده: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

پیروی از الگوی نام‌گذاری توصیه‌شده امکان افزودن سرویس‌ها با نام را فراهم می‌کند:

```js
// افزودن wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### افزودن سرویس منتشرشده به WDIO CLI و مستندات

ما واقعاً از هر پلاگین جدیدی که بتواند به دیگران در اجرای تست‌های بهتر کمک کند قدردانی می‌کنیم! اگر چنین پلاگینی ایجاد کرده‌اید، لطفاً افزودن آن به CLI و مستندات ما را در نظر بگیرید تا پیدا کردن آن آسان‌تر شود.

لطفاً یک pull request با تغییرات زیر ایجاد کنید:

- سرویس خود را به فهرست [گزارش‌دهنده‌های پشتیبانی‌شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) در ماژول CLI اضافه کنید
- [فهرست گزارش‌دهنده‌ها](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) را برای افزودن مستندات خود به صفحه رسمی Webdriver.io گسترش دهید