---
id: debugging
title: تصحيح الأخطاء
description: "تصحيح أخطاء اختبارات WebdriverIO باستخدام browser.debug أو نقاط التوقف في VS Code أو WebStorm، واستراتيجيات للتعامل مع الاختبارات غير المستقرة، وتحليل أداء المعالج والذاكرة."
---

يصبح تصحيح الأخطاء أكثر صعوبة بشكل ملحوظ عندما تُنشئ عدة عمليات عشرات الاختبارات في متصفحات متعددة.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

في البداية، من المفيد للغاية تقليل التوازي عن طريق ضبط `maxInstances` على `1`، واستهداف ملفات المواصفات والمتصفحات التي تحتاج إلى تصحيح أخطائها فقط.

في `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## أمر التصحيح

في كثير من الحالات، يمكنك استخدام [`browser.debug()`](/docs/api/browser/debug) لإيقاف اختبارك مؤقتًا وفحص المتصفح.

ستتحول واجهة سطر الأوامر أيضًا إلى وضع REPL. يتيح لك هذا الوضع تجربة الأوامر والعناصر الموجودة في الصفحة. في وضع REPL، يمكنك الوصول إلى كائن `browser`&mdash;أو الدالتين `$` و`$$`&mdash;كما تفعل في اختباراتك.

عند استخدام `browser.debug()`، ستحتاج على الأرجح إلى زيادة مهلة مُشغّل الاختبارات لمنعه من إفشال الاختبار بسبب استغراقه وقتًا طويلًا. على سبيل المثال:

في `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

راجع [المهلات](timeouts) لمزيد من المعلومات حول كيفية القيام بذلك باستخدام أطر عمل أخرى.

لمتابعة الاختبارات بعد التصحيح، استخدم في الطرفية الاختصار `^C` أو الأمر `.exit`.

### الإيقاف المؤقت لوكيل برمجي (`--debug=agent`)

يرفع الأمر `wdio run --debug=agent` مهلة إطار العمل إلى 24 ساعة ويوقف العامل مؤقتًا عندما يستدعي ملف المواصفات `await browser.debug()` أو عندما يفشل اختبار ما. يطبع التشغيل سطرًا مثل:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

افحص المتصفح المتوقف مؤقتًا باستخدام [`wdio session`](/docs/session/debug) (`snapshot`، `exec`، …)، ثم استخدم `wdio session -s debug-0-0 resume` للمتابعة. يؤدي الأمر `wdio session -s debug-0-0 close` إلى إفشال الاختبار المتوقف مع الرسالة `Session closed from wdio session`. اسم الجلسة هو `debug-<cid>` (`debug-0-0` للعامل الأول). بقية سير العمل هذا موجودة في قسم [جلسة WebdriverIO](/docs/session).
## الإعداد الديناميكي

لاحظ أن `wdio.conf.js` يمكن أن يحتوي على كود Javascript. بما أنك على الأرجح لا ترغب في تغيير قيمة المهلة بشكل دائم إلى يوم واحد، فقد يكون من المفيد غالبًا تغيير هذه الإعدادات من سطر الأوامر باستخدام متغير بيئة.

باستخدام هذه التقنية، يمكنك تغيير الإعدادات ديناميكيًا:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

يمكنك بعد ذلك إضافة العلامة `debug` كبادئة لأمر `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...وتصحيح أخطاء ملف المواصفات الخاص بك باستخدام DevTools!

## التصحيح باستخدام Visual Studio Code (VSCode)

إذا كنت ترغب في تصحيح أخطاء اختباراتك باستخدام نقاط التوقف في أحدث إصدار من VSCode، فلديك خياران لبدء المصحح، والخيار الأول هو الطريقة الأسهل:
 1. إرفاق المصحح تلقائيًا
 2. إرفاق المصحح باستخدام ملف إعدادات

### تبديل الإرفاق التلقائي في VSCode

يمكنك إرفاق المصحح تلقائيًا باتباع الخطوات التالية في VSCode:
 - اضغط CMD + Shift + P (في Linux وMacos) أو CTRL + Shift + P (في Windows)
 - اكتب "attach" في حقل الإدخال
 - اختر "Debug: Toggle Auto Attach"
 - اختر "Only With Flag"

 هذا كل شيء! الآن عند تشغيل اختباراتك (تذكر أنك ستحتاج إلى ضبط العلامة --inspect في إعداداتك كما هو موضح سابقًا) سيبدأ المصحح تلقائيًا ويتوقف عند أول نقطة توقف يصل إليها.

### ملف إعدادات VSCode

من الممكن تشغيل جميع ملفات المواصفات أو ملفات محددة منها. يجب إضافة إعداد (إعدادات) التصحيح إلى `.vscode/launch.json`، ولتصحيح ملف مواصفات محدد أضف الإعداد التالي:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

لتشغيل جميع ملفات المواصفات، احذف `"--spec", "${file}"` من `"args"`

مثال: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

معلومات إضافية: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## REPL ديناميكي مع Atom

إذا كنت من محترفي [Atom](https://atom.io/) فيمكنك تجربة [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) من تطوير [@kurtharriger](https://github.com/kurtharriger) وهو REPL ديناميكي يتيح لك تنفيذ أسطر برمجية منفردة في Atom. شاهد [هذا](https://www.youtube.com/watch?v=kdM05ChhLQE) الفيديو على YouTube لمشاهدة عرض توضيحي.

## التصحيح باستخدام WebStorm / Intellij
يمكنك إنشاء إعداد تصحيح لـ node.js على النحو التالي:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
شاهد [فيديو YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) هذا لمزيد من المعلومات حول كيفية إنشاء إعداد.

## تصحيح الاختبارات غير المستقرة

قد يكون تصحيح الاختبارات غير المستقرة صعبًا للغاية، لذا إليك بعض النصائح حول كيفية محاولة إعادة إنتاج النتيجة غير المستقرة التي حصلت عليها في CI محليًا.

### الشبكة
لتصحيح عدم الاستقرار المرتبط بالشبكة، استخدم الأمر [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### سرعة العرض
لتصحيح عدم الاستقرار المرتبط بسرعة الجهاز، استخدم الأمر [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
سيؤدي ذلك إلى عرض صفحاتك بشكل أبطأ، وهو ما قد ينتج عن أسباب عديدة مثل تشغيل عمليات متعددة في CI مما قد يبطئ اختباراتك.
```js
await browser.throttleCPU(4)
```

### سرعة تنفيذ الاختبارات

إذا لم تبدُ اختباراتك متأثرة، فمن المحتمل أن يكون WebdriverIO أسرع من التحديث الصادر عن إطار عمل الواجهة الأمامية / المتصفح. يحدث هذا عند استخدام التأكيدات المتزامنة، إذ لا تتاح لـ WebdriverIO فرصة إعادة محاولة هذه التأكيدات. إليك بعض أمثلة الكود التي قد تتعطل بسبب ذلك:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
لحل هذه المشكلة، يجب استخدام التأكيدات غير المتزامنة بدلًا من ذلك. ستبدو الأمثلة أعلاه على النحو التالي:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
باستخدام هذه التأكيدات، سينتظر WebdriverIO تلقائيًا حتى يتحقق الشرط. عند التأكد من النص، يعني هذا أن العنصر يجب أن يكون موجودًا وأن يكون النص مساويًا للقيمة المتوقعة.
نتحدث أكثر عن هذا في [دليل أفضل الممارسات](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) الخاص بنا.

## تحليل الأداء

يتيح لك WebdriverIO التقاط ملفات تعريف الأداء لاختباراتك لتحديد الاختناقات في تنفيذ الاختبارات أو تسربات الذاكرة. يستخدم ذلك إمكانيات تحليل الأداء الأصلية في Node.js.

### تحليل أداء المعالج (CPU)

لالتقاط ملف تعريف المعالج، يمكنك استخدام علامة سطر الأوامر `--cpu-prof` أو ضبط `cpuProf: true` في إعداداتك.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

سيؤدي هذا إلى إنشاء ملف `.cpuprofile` في المجلد `./profiles` (الافتراضي) لكل عملية عامل. يمكنك تحميل هذا الملف في **Chrome DevTools > Performance > Load Profile** لتحليل التنفيذ.

### تحليل الذاكرة (Heap)

لالتقاط ملف تعريف الذاكرة، استخدم علامة سطر الأوامر `--heap-prof` أو اضبط `heapProf: true` في إعداداتك.

```bash
npx wdio run wdio.conf.js --heap-prof
```

يُنشئ هذا ملف `.heapprofile` في المجلد `./profiles` (يستخدم محلل الذاكرة بأسلوب أخذ العينات). يمكنك تحميله في **Chrome DevTools > Memory > Load** لتحليل استخدام الذاكرة.

### مقاييس التوقيت

عند تفعيل تحليل الأداء، يسجل WebdriverIO أيضًا تلقائيًا مقاييس التوقيت لمراحل الإعداد والتنفيذ والإنهاء في اختبارك، مما يساعدك على فهم أين يُستهلك الوقت.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```