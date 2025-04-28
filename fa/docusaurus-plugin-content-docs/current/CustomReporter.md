---
id: customreporter
title: گزارشگر سفارشی
---

شما می‌توانید گزارشگر سفارشی خود را برای اجراکننده تست WDIO که مطابق با نیازهای شما ساخته شده است، بنویسید. و این کار آسان است!

تمام کاری که باید انجام دهید، ایجاد یک ماژول node است که از بسته `@wdio/reporter` ارث‌بری می‌کند، تا بتواند پیام‌ها را از تست دریافت کند.

تنظیمات اولیه باید به شکل زیر باشد:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
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

فایل `wdio.conf.js` شما باید به شکل زیر باشد:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

شما همچنین می‌توانید گزارشگر را در NPM منتشر کنید تا همه بتوانند از آن استفاده کنند. نام بسته را مانند سایر گزارشگرها `wdio-<reportername>-reporter` بگذارید و آن را با کلمات کلیدی مانند `wdio` یا `wdio-reporter` برچسب گذاری کنید.

## رویداد‌هندلر

شما می‌توانید برای چندین رویداد که در طول تست فعال می‌شوند، یک رویداد‌هندلر ثبت کنید. تمامی هندلرهای زیر پیام‌هایی با اطلاعات مفید در مورد وضعیت و پیشرفت فعلی دریافت خواهند کرد.

ساختار این پیام‌ها به رویداد بستگی دارد و در تمام چارچوب‌ها (Mocha، Jasmine و Cucumber) یکسان است. وقتی یک گزارشگر سفارشی را پیاده‌سازی می‌کنید، باید برای همه چارچوب‌ها کار کند.

لیست زیر شامل تمام متدهای ممکنی است که می‌توانید به کلاس گزارشگر خود اضافه کنید:

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

نام‌های متد کاملاً خود‌توضیح هستند.

برای چاپ چیزی در یک رویداد خاص، از متد `this.write(...)` استفاده کنید که توسط کلاس والد `WDIOReporter` ارائه شده است. این متد محتوا را یا به `stdout` یا به یک فایل لاگ جریان می‌دهد (بسته به گزینه‌های گزارشگر).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

توجه داشته باشید که نمی‌توانید اجرای تست را به هیچ طریقی به تعویق بیندازید.

همه رویداد‌هندلرها باید روتین‌های همگام را اجرا کنند (در غیر این صورت با شرایط مسابقه (race conditions) مواجه خواهید شد).

حتماً بخش [مثال](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) را بررسی کنید که در آن می‌توانید یک گزارشگر سفارشی نمونه را پیدا کنید که نام رویداد را برای هر رویداد چاپ می‌کند.

اگر یک گزارشگر سفارشی پیاده‌سازی کرده‌اید که می‌تواند برای جامعه مفید باشد، در ارسال یک Pull Request تردید نکنید تا بتوانیم گزارشگر را برای عموم در دسترس قرار دهیم!

همچنین اگر تست‌رانر WDIO را از طریق رابط `Launcher` اجرا می‌کنید، نمی‌توانید یک گزارشگر سفارشی را به صورت تابع به این شکل اعمال کنید:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## انتظار تا `isSynchronised`

اگر گزارشگر شما باید عملیات غیرهمگام را برای گزارش داده‌ها اجرا کند (مانند آپلود فایل‌های لاگ یا سایر دارایی‌ها)، می‌توانید متد `isSynchronised` را در گزارشگر سفارشی خود بازنویسی کنید تا اجرا‌کننده WebdriverIO صبر کند تا شما همه چیز را محاسبه کرده باشید. مثالی از این مورد را می‌توان در [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) مشاهده کرد:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
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
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

به این ترتیب اجراکننده منتظر می‌ماند تا تمام اطلاعات لاگ آپلود شوند.

## انتشار گزارشگر در NPM

برای اینکه گزارشگر برای جامعه WebdriverIO آسان‌تر مصرف و کشف شود، لطفاً این توصیه‌ها را دنبال کنید:

* سرویس‌ها باید از این قرارداد نامگذاری استفاده کنند: `wdio-*-reporter`
* از کلمات کلیدی NPM استفاده کنید: `wdio-plugin`، `wdio-reporter`
* ورودی `main` باید یک نمونه از گزارشگر را `export` کند
* گزارشگر نمونه: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

پیروی از الگوی نامگذاری توصیه شده، امکان افزودن سرویس‌ها با نام را فراهم می‌کند:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### افزودن سرویس منتشر شده به WDIO CLI و مستندات

ما واقعاً از هر پلاگین جدیدی که می‌تواند به دیگران کمک کند تست‌های بهتری اجرا کنند، قدردانی می‌کنیم! اگر چنین پلاگینی ایجاد کرده‌اید، لطفاً آن را به CLI و مستندات ما اضافه کنید تا راحت‌تر پیدا شود.

لطفاً یک pull request با تغییرات زیر ارسال کنید:

- سرویس خود را به لیست [گزارشگرهای پشتیبانی شده](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) در ماژول CLI اضافه کنید
- [لیست گزارشگرها](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) را برای افزودن مستندات خود به صفحه رسمی Webdriver.io توسعه دهید