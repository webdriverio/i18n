---
id: json-reporter
title: مراسل Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## التثبيت

```bash
npm install @wdio/json-reporter --save-dev
```

## التكوين

### النتائج إلى `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### النتائج إلى ملف

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### النتائج إلى ملف بإسم ملف مخصص

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## ملفات النتائج

مع WDIO الإصدار الخامس فما فوق، انتقل الإبلاغ من عملية مركزية إلى عملية يتم التعامل معها من قبل كل "جلسة" مُنشأة لتنفيذ الاختبار المتوازي. ساعد هذا التغيير في تقليل حجم الاتصالات أثناء تنفيذ اختبار WDIO وبالتالي تحسين الأداء. الجانب السلبي هو أنه لم يعد من الممكن الحصول على تقرير واحد لجميع عمليات تنفيذ الاختبار.

يوفر `@wdio/json-reporter` وظيفة مساعدة لدمج ملفات json المتعددة في ملف واحد. اتبع الخطوات أدناه للاستفادة من هذه الأداة.

يمكنك تنفيذ هذا في [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) في ملف `wdio.conf.js` الخاص بك:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_ملاحظة:_ `wdio-custom-filename.json` اختياري، إذا لم يتم توفير المعلمة فإن القيمة الافتراضية هي `wdio-merged.json`.

## المساهمة

تم استلهام شفرة المصدر لهذا المراسل بشكل كبير من [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) مراسل المجتمع من قبل [Jim Davis](https://github.com/fijijavis). شكراً على كل العمل في صيانة المشروع!

---

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](http://webdriver.io).