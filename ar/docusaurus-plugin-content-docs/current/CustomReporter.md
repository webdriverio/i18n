---
id: customreporter
title: مُبلِّغ مخصص
description: "أنشئ مُبلِّغًا مخصصًا لمشغّل اختبارات WDIO استنادًا إلى @wdio/reporter، وتعامل مع أحداث المشغّل وانشره على NPM."
---

يمكنك كتابة مُبلِّغ (reporter) مخصص خاص بك لمشغّل اختبارات WDIO مصمم وفقًا لاحتياجاتك. والأمر سهل!

كل ما عليك فعله هو إنشاء وحدة node ترث من الحزمة `@wdio/reporter`، حتى تتمكن من استقبال الرسائل من الاختبار.

يجب أن يبدو الإعداد الأساسي كما يلي:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * اجعل المُبلِّغ يكتب إلى مجرى الإخراج افتراضيًا
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

لاستخدام هذا المُبلِّغ، كل ما عليك فعله هو تعيينه للخاصية `reporter` في الإعدادات الخاصة بك.


يجب أن يبدو ملف `wdio.conf.js` الخاص بك كما يلي:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * استخدام صنف المُبلِّغ المستورد
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * استخدام المسار المطلق إلى المُبلِّغ
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

يمكنك أيضًا نشر المُبلِّغ على NPM حتى يتمكن الجميع من استخدامه. سمِّ الحزمة مثل المُبلِّغات الأخرى `wdio-<reportername>-reporter`، وأضف إليها كلمات مفتاحية مثل `wdio` أو `wdio-reporter`.

## معالج الأحداث

يمكنك تسجيل معالج أحداث لعدة أحداث يتم إطلاقها أثناء الاختبار. ستتلقى جميع المعالجات التالية حمولات (payloads) تحتوي على معلومات مفيدة حول الحالة الحالية والتقدم.

تعتمد بنية كائنات الحمولة هذه على الحدث، وهي موحدة عبر أطر العمل (Mocha وJasmine وCucumber). بمجرد تنفيذ مُبلِّغ مخصص، يجب أن يعمل مع جميع أطر العمل.

تحتوي القائمة التالية على جميع الدوال الممكنة التي يمكنك إضافتها إلى صنف المُبلِّغ الخاص بك:

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

أسماء الدوال واضحة بذاتها إلى حد كبير.

لطباعة شيء ما عند حدث معين، استخدم الدالة `this.write(...)`، التي يوفرها الصنف الأب `WDIOReporter`. فهي إما تبث المحتوى إلى `stdout`، أو إلى ملف سجل (اعتمادًا على خيارات المُبلِّغ).

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

تأكد من الاطلاع على [قسم الأمثلة](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) حيث يمكنك العثور على مثال لمُبلِّغ مخصص يطبع اسم الحدث لكل حدث.

إذا قمت بتنفيذ مُبلِّغ مخصص قد يكون مفيدًا للمجتمع، فلا تتردد في تقديم طلب سحب (Pull Request) حتى نتمكن من إتاحة المُبلِّغ للعامة!

أيضًا، إذا قمت بتشغيل مشغّل اختبارات WDIO عبر واجهة `Launcher`، فلا يمكنك تطبيق مُبلِّغ مخصص كدالة على النحو التالي:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // هذا لن يعمل، لأن CustomReporter غير قابل للتسلسل
    reporters: ['dot', CustomReporter]
})
```

## المُبلِّغات والاختبارات المتوازية

مع [الاختبارات المتوازية في ملف المواصفات](./ParallelTests.md)، تتداخل اختبارات ملف المواصفات الواحد: فقد يأتي `onTestStart` لاختبار ما قبل `onTestEnd` لاختبار آخر، وتتشابك أوامر الاختبارات المختلفة. يتولى `WDIOReporter` معالجة ذلك نيابةً عنك. في الوضع المتوازي، تحمل أحداث إطار العمل حقلين إضافيين:

- `parentUid` في `suite:start` و`hook:start` و`test:start`: معرّف uid للمجموعة المالكة (`null` للمجموعة ذات المستوى الأعلى). يضيف المُبلِّغ المجموعة أو الخطاف أو الاختبار إلى تلك المجموعة، وليس إلى المجموعة التي بدأت مؤخرًا.
- `contextId` في أحداث الاختبار والأوامر: سياق التصفح الخاص بالاختبار. يضيف المُبلِّغ مخرجات الأوامر إلى الاختبار الذي تم تشغيله في ذلك السياق.

تحتفظ إحصائيات الاختبار والخطاف والمجموعة بهذه الحقول عندما يحتوي الحدث عليها: في `onTestEnd(test)`، يكون `test.contextId` هو سياق التصفح الخاص بالاختبار و`test.parentUid` هو معرّف uid لمجموعته. بدون الوضع المتوازي، لا تحتوي الإحصائيات على مثل هذه الخصائص.

لذلك تكون أشجار `suites` و`tests` و`hooks` الخاصة بالمُبلِّغ صحيحة. إذا كان المُبلِّغ الخاص بك يحتفظ بحالته الخاصة، فاجعل مفتاحها هو `uid` الخاص بالاختبار أو المجموعة بدلاً من تتبع اختبار حالي واحد.

المخرجات التي تأتي بدون حدث، مثل مخرجات وحدة التحكم أو حدث `process.emit` مخصص، لا تحتوي على `uid`. استدعِ `this.getContextTest()` للحصول على الاختبار الذي كتب سياق التصفح الخاص به تلك المخرجات. في الوضع المتوازي، تُرجع `undefined` عندما لا يمتلك أي اختبار قيد التشغيل ذلك السياق؛ وبدون الوضع المتوازي، تُرجع الاختبار الذي بدأ مؤخرًا. يتم تشغيل خطافات `before()` لاختبار متوازٍ قبل `test:start` الخاص به، لذلك لا يمتلك أي اختبار السياق بعد؛ تُرجع `this.getContextId()` معرّف السياق الخام، الذي يبقى كما هو طوال الاختبار.

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

إذا كان على المُبلِّغ الخاص بك تنفيذ عمليات غير متزامنة للإبلاغ عن البيانات (مثل رفع ملفات السجل أو الأصول الأخرى)، يمكنك إعادة تعريف الدالة `isSynchronised` في المُبلِّغ المخصص الخاص بك لجعل مشغّل WebdriverIO ينتظر حتى تنتهي من حساب كل شيء. يمكن رؤية مثال على ذلك في [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * إعادة تعريف الدالة isSynchronised
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

بهذه الطريقة سينتظر المشغّل حتى يتم رفع جميع معلومات السجل.

## نشر المُبلِّغ على NPM

لتسهيل استخدام المُبلِّغ واكتشافه من قبل مجتمع WebdriverIO، يُرجى اتباع هذه التوصيات:

* يجب أن تستخدم الخدمات اصطلاح التسمية هذا: `wdio-*-reporter`
* استخدم كلمات NPM المفتاحية: `wdio-plugin`، `wdio-reporter`
* يجب أن يقوم المدخل `main` بعمل `export` لنسخة من المُبلِّغ
* مثال على مُبلِّغ: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

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

نحن نقدّر حقًا كل إضافة جديدة يمكن أن تساعد الآخرين على تشغيل اختبارات أفضل! إذا قمت بإنشاء مثل هذه الإضافة، يُرجى التفكير في إضافتها إلى واجهة سطر الأوامر (CLI) والوثائق الخاصة بنا لتسهيل العثور عليها.

يُرجى تقديم طلب سحب يتضمن التغييرات التالية:

- أضف خدمتك إلى قائمة [المُبلِّغات المدعومة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) في وحدة CLI
- حسِّن [قائمة المُبلِّغات](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) لإضافة وثائقك إلى صفحة Webdriver.io الرسمية