---
id: customreporter
title: گزارشگر سفارشی
description: "یک گزارشگر سفارشی برای اجراکننده تست WDIO بر پایه @wdio/reporter بسازید، رویدادهای اجراکننده را مدیریت کنید و آن را در NPM منتشر کنید."
---

شما می‌توانید گزارشگر سفارشی خود را برای اجراکننده تست WDIO بنویسید که متناسب با نیازهای شما باشد. و این کار آسان است!

تنها کاری که باید انجام دهید ایجاد یک ماژول node است که از پکیج `@wdio/reporter` ارث‌بری کند، تا بتواند پیام‌ها را از تست دریافت کند.

تنظیمات پایه باید به این شکل باشد:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * گزارشگر را وادار کنید تا به طور پیش‌فرض در جریان خروجی بنویسد
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

برای استفاده از این گزارشگر، تنها کاری که باید انجام دهید این است که آن را به ویژگی `reporter` در پیکربندی خود اختصاص دهید.


فایل `wdio.conf.js` شما باید به این شکل باشد:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * استفاده از کلاس گزارشگر وارد شده
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * استفاده از مسیر مطلق به گزارشگر
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

همچنین می‌توانید گزارشگر را در NPM منتشر کنید تا همه بتوانند از آن استفاده کنند. پکیج را مانند سایر گزارشگرها `wdio-<reportername>-reporter` نام‌گذاری کنید و آن را با کلمات کلیدی مانند `wdio` یا `wdio-reporter` برچسب‌گذاری کنید.

## مدیریت‌کننده رویداد

شما می‌توانید یک مدیریت‌کننده رویداد برای چندین رویداد که در طول تست فعال می‌شوند ثبت کنید. همه مدیریت‌کننده‌های زیر محموله‌هایی (payload) با اطلاعات مفید درباره وضعیت و پیشرفت فعلی دریافت خواهند کرد.

ساختار این اشیاء محموله به رویداد بستگی دارد و در تمام فریم‌ورک‌ها (Mocha، Jasmine و Cucumber) یکسان است. هنگامی که یک گزارشگر سفارشی پیاده‌سازی کنید، باید برای همه فریم‌ورک‌ها کار کند.

فهرست زیر شامل تمام متدهای ممکن است که می‌توانید به کلاس گزارشگر خود اضافه کنید:

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

نام‌های متدها کاملاً گویا هستند.

برای چاپ چیزی در یک رویداد خاص، از متد `this.write(...)` استفاده کنید که توسط کلاس والد `WDIOReporter` ارائه می‌شود. این متد محتوا را یا به `stdout` یا به یک فایل لاگ ارسال می‌کند (بسته به گزینه‌های گزارشگر).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

توجه داشته باشید که به هیچ وجه نمی‌توانید اجرای تست را به تأخیر بیندازید.

همه مدیریت‌کننده‌های رویداد باید روال‌های همگام (synchronous) را اجرا کنند (در غیر این صورت با شرایط رقابتی (race conditions) مواجه خواهید شد).

حتماً [بخش مثال‌ها](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) را بررسی کنید، جایی که می‌توانید یک گزارشگر سفارشی نمونه پیدا کنید که نام رویداد را برای هر رویداد چاپ می‌کند.

اگر گزارشگر سفارشی‌ای پیاده‌سازی کرده‌اید که می‌تواند برای جامعه مفید باشد، در ایجاد یک Pull Request تردید نکنید تا بتوانیم گزارشگر را در دسترس عموم قرار دهیم!

همچنین، اگر اجراکننده تست WDIO را از طریق رابط `Launcher` اجرا می‌کنید، نمی‌توانید یک گزارشگر سفارشی را به صورت تابع به شکل زیر اعمال کنید:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // این کار نخواهد کرد، زیرا CustomReporter قابل سریال‌سازی نیست
    reporters: ['dot', CustomReporter]
})
```

## گزارشگرها و تست‌های موازی

با [تست‌های موازی در یک فایل spec](./ParallelTests.md)، تست‌های یک فایل spec با هم همپوشانی دارند: `onTestStart` یک تست می‌تواند قبل از `onTestEnd` تست دیگری بیاید و دستورات تست‌های مختلف در هم تنیده می‌شوند. `WDIOReporter` این موضوع را برای شما مدیریت می‌کند. در حالت موازی، رویدادهای فریم‌ورک دو فیلد اضافی دارند:

- `parentUid` در `suite:start`، `hook:start` و `test:start`: شناسه یکتا (uid) مجموعه مالک (`null` برای مجموعه سطح بالا). گزارشگر مجموعه، هوک یا تست را به آن مجموعه اضافه می‌کند، نه به مجموعه‌ای که آخرین بار شروع شده است.
- `contextId` در رویدادهای تست و دستور: زمینه مرورگر (browsing context) تست. گزارشگر خروجی دستور را به تستی اضافه می‌کند که در آن زمینه اجرا شده است.

آمار تست، هوک و مجموعه این فیلدها را زمانی که رویداد آن‌ها را داشته باشد حفظ می‌کنند: در `onTestEnd(test)`، `test.contextId` زمینه مرورگر تست و `test.parentUid` شناسه یکتای مجموعه آن است. بدون حالت موازی، آمار چنین ویژگی‌هایی ندارند.

بنابراین درخت‌های `suites`، `tests` و `hooks` گزارشگر صحیح هستند. اگر گزارشگر شما وضعیت خود را نگه می‌دارد، به جای ردیابی یک تست فعلی واحد، آن را با `uid` تست یا مجموعه کلیدگذاری کنید.

خروجی‌ای که بدون رویداد می‌آید، مانند خروجی کنسول یا یک رویداد سفارشی `process.emit`، دارای `uid` نیست. `this.getContextTest()` را فراخوانی کنید تا تستی را که زمینه مرورگر آن این خروجی را نوشته است دریافت کنید. در حالت موازی، زمانی که هیچ تست در حال اجرایی مالک آن زمینه نباشد، `undefined` برمی‌گرداند؛ بدون حالت موازی، تستی را که آخرین بار شروع شده برمی‌گرداند. هوک‌های `before()` یک تست موازی قبل از `test:start` آن اجرا می‌شوند، بنابراین هنوز هیچ تستی مالک زمینه نیست؛ `this.getContextId()` شناسه خام زمینه را برمی‌گرداند که برای کل تست ثابت می‌ماند.

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

## صبر کردن تا `isSynchronised`

اگر گزارشگر شما باید عملیات ناهمگام (async) را برای گزارش داده‌ها اجرا کند (مثلاً آپلود فایل‌های لاگ یا سایر دارایی‌ها)، می‌توانید متد `isSynchronised` را در گزارشگر سفارشی خود بازنویسی کنید تا اجراکننده WebdriverIO صبر کند تا همه چیز را محاسبه کنید. نمونه‌ای از این مورد را می‌توان در [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) مشاهده کرد:

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
             * حذف لاگ‌های منتقل شده از مخزن لاگ
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

به این ترتیب اجراکننده صبر می‌کند تا تمام اطلاعات لاگ آپلود شوند.

## انتشار گزارشگر در NPM

برای اینکه استفاده و کشف گزارشگر برای جامعه WebdriverIO آسان‌تر شود، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نام‌گذاری استفاده کنند: `wdio-*-reporter`
* از کلمات کلیدی NPM استفاده کنید: `wdio-plugin`، `wdio-reporter`
* ورودی `main` باید یک نمونه از گزارشگر را `export` کند
* گزارشگر نمونه: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

پیروی از الگوی نام‌گذاری توصیه شده اجازه می‌دهد سرویس‌ها با نام اضافه شوند:

```js
// افزودن wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### افزودن سرویس منتشر شده به WDIO CLI و مستندات

ما واقعاً از هر افزونه جدیدی که بتواند به دیگران در اجرای تست‌های بهتر کمک کند قدردانی می‌کنیم! اگر چنین افزونه‌ای ایجاد کرده‌اید، لطفاً افزودن آن به CLI و مستندات ما را در نظر بگیرید تا پیدا کردن آن آسان‌تر شود.

لطفاً یک pull request با تغییرات زیر ایجاد کنید:

- سرویس خود را به فهرست [گزارشگرهای پشتیبانی شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) در ماژول CLI اضافه کنید
- [فهرست گزارشگرها](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) را برای افزودن مستندات خود به صفحه رسمی Webdriver.io گسترش دهید