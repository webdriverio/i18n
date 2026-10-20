---
id: customreporter
title: مُعِدّ تقارير مخصص
description: "أنشئ مُعِدّ تقارير مخصصًا لمشغّل اختبارات WDIO بالاعتماد على @wdio/reporter، وتعامل مع أحداث المشغّل وانشره على NPM."
---

يمكنك كتابة مُعِدّ تقارير مخصص خاص بك لمشغّل اختبارات WDIO يكون مصممًا وفقًا لاحتياجاتك. والأمر سهل!

كل ما عليك فعله هو إنشاء وحدة node ترث من حزمة `@wdio/reporter`، حتى تتمكن من استقبال الرسائل من الاختبار.

يجب أن يبدو الإعداد الأساسي كما يلي:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * اجعل مُعِدّ التقارير يكتب إلى مجرى الإخراج افتراضيًا
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

لاستخدام مُعِدّ التقارير هذا، كل ما عليك فعله هو تعيينه إلى خاصية `reporter` في الإعدادات الخاصة بك.


يجب أن يبدو ملف `wdio.conf.js` الخاص بك كما يلي:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * استخدم فئة مُعِدّ التقارير المستوردة
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * استخدم المسار المطلق لمُعِدّ التقارير
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

يمكنك أيضًا نشر مُعِدّ التقارير على NPM حتى يتمكن الجميع من استخدامه. قم بتسمية الحزمة مثل مُعِدّات التقارير الأخرى `wdio-<reportername>-reporter`، وضع عليها كلمات مفتاحية مثل `wdio` أو `wdio-reporter`.

## معالج الأحداث

يمكنك تسجيل معالج أحداث لعدة أحداث يتم تشغيلها أثناء الاختبار. ستتلقى جميع المعالجات التالية حمولات تحتوي على معلومات مفيدة حول الحالة الحالية والتقدم.

تعتمد بنية كائنات الحمولة هذه على الحدث، وهي موحدة عبر أطر العمل (Mocha وJasmine وCucumber). بمجرد تنفيذ مُعِدّ تقارير مخصص، يجب أن يعمل مع جميع أطر العمل.

تحتوي القائمة التالية على جميع الطرق الممكنة التي يمكنك إضافتها إلى فئة مُعِدّ التقارير الخاصة بك:

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

أسماء الطرق واضحة بذاتها إلى حد كبير.

لطباعة شيء ما عند حدث معين، استخدم طريقة `this.write(...)`، التي توفرها الفئة الأم `WDIOReporter`. فهي إما تبث المحتوى إلى `stdout`، أو إلى ملف سجل (حسب خيارات مُعِدّ التقارير).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

لاحظ أنه لا يمكنك تأجيل تنفيذ الاختبار بأي شكل من الأشكال.

يجب أن تنفذ جميع معالجات الأحداث إجراءات متزامنة (وإلا ستواجه حالات تسابق).

تأكد من الاطلاع على [قسم الأمثلة](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) حيث يمكنك العثور على مثال لمُعِدّ تقارير مخصص يطبع اسم الحدث لكل حدث.

إذا قمت بتنفيذ مُعِدّ تقارير مخصص قد يكون مفيدًا للمجتمع، فلا تتردد في تقديم Pull Request حتى نتمكن من إتاحة مُعِدّ التقارير للعامة!

أيضًا، إذا قمت بتشغيل مشغّل اختبارات WDIO عبر واجهة `Launcher`، فلا يمكنك تطبيق مُعِدّ تقارير مخصص كدالة على النحو التالي:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // لن يعمل هذا، لأن CustomReporter غير قابل للتسلسل
    reporters: ['dot', CustomReporter]
})
```

## مُعِدّات التقارير والاختبارات المتوازية

مع [الاختبارات المتوازية في ملف المواصفات](./ParallelTests.md)، تتداخل اختبارات ملف المواصفات الواحد: فقد يأتي `onTestStart` لاختبار ما قبل `onTestEnd` لاختبار آخر، وتتشابك أوامر الاختبارات المختلفة. يتولى `WDIOReporter` معالجة ذلك نيابةً عنك. في الوضع المتوازي، تحمل أحداث إطار العمل حقلين إضافيين:

- `parentUid` في `suite:start` و`hook:start` و`test:start`: وهو uid المجموعة المالكة (`null` للمجموعة ذات المستوى الأعلى). يضيف مُعِدّ التقارير المجموعة أو الخطاف أو الاختبار إلى تلك المجموعة، وليس إلى المجموعة التي بدأت أخيرًا.
- `contextId` في أحداث الاختبار والأوامر: وهو سياق التصفح الخاص بالاختبار. يضيف مُعِدّ التقارير مخرجات الأوامر إلى الاختبار الذي تم تشغيله في ذلك السياق.

وبالتالي تكون أشجار `suites` و`tests` و`hooks` الخاصة بمُعِدّ التقارير صحيحة. إذا كان مُعِدّ التقارير الخاص بك يحتفظ بحالته الخاصة، فاجعل مفتاحها هو `uid` الخاص بالاختبار أو المجموعة بدلاً من تتبع اختبار حالي واحد.

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

## الانتظار حتى `isSynchronised`

إذا كان على مُعِدّ التقارير الخاص بك تنفيذ عمليات غير متزامنة للإبلاغ عن البيانات (مثل تحميل ملفات السجل أو الأصول الأخرى)، يمكنك إعادة كتابة طريقة `isSynchronised` في مُعِدّ التقارير المخصص الخاص بك للسماح لمشغّل WebdriverIO بالانتظار حتى تنتهي من حساب كل شيء. يمكن رؤية مثال على ذلك في [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * إعادة كتابة طريقة isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * مزامنة ملفات السجل
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
             * إزالة السجلات المنقولة من حاوية السجلات
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

بهذه الطريقة سينتظر المشغّل حتى يتم تحميل جميع معلومات السجل.

## نشر مُعِدّ التقارير على NPM

لتسهيل استخدام مُعِدّ التقارير واكتشافه من قبل مجتمع WebdriverIO، يرجى اتباع هذه التوصيات:

* يجب أن تستخدم الخدمات اصطلاح التسمية هذا: `wdio-*-reporter`
* استخدم كلمات NPM المفتاحية: `wdio-plugin`، `wdio-reporter`
* يجب أن يقوم المُدخل `main` بعمل `export` لنسخة من مُعِدّ التقارير
* مثال على مُعِدّ تقارير: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

يتيح اتباع نمط التسمية الموصى به إضافة الخدمات بالاسم:

```js
// إضافة wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### إضافة الخدمة المنشورة إلى WDIO CLI والوثائق

نحن نقدّر حقًا كل إضافة جديدة يمكن أن تساعد الآخرين على تشغيل اختبارات أفضل! إذا قمت بإنشاء مثل هذه الإضافة، فيرجى التفكير في إضافتها إلى واجهة CLI والوثائق الخاصة بنا لتسهيل العثور عليها.

يرجى تقديم pull request يتضمن التغييرات التالية:

- أضف خدمتك إلى قائمة [مُعِدّات التقارير المدعومة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) في وحدة CLI
- قم بتحسين [قائمة مُعِدّات التقارير](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) لإضافة وثائقك إلى صفحة Webdriver.io الرسمية