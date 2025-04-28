---
id: debugging
title: تصحيح الأخطاء
---

عملية تصحيح الأخطاء تصبح أكثر صعوبة عندما تقوم عدة عمليات بإطلاق عشرات الاختبارات في متصفحات متعددة.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

للبدء، من المفيد جدًا تحديد التوازي من خلال ضبط `maxInstances` إلى `1`، واستهداف فقط المواصفات والمتصفحات التي تحتاج إلى تصحيح.

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

## أمر التصحيح (Debug)

في كثير من الحالات، يمكنك استخدام [`browser.debug()`](/docs/api/browser/debug) لإيقاف الاختبار مؤقتًا وفحص المتصفح.

سيتحول سطر الأوامر الخاص بك أيضًا إلى وضع REPL. يتيح لك هذا الوضع العبث بالأوامر والعناصر على الصفحة. في وضع REPL، يمكنك الوصول إلى كائن `browser` - أو وظائف `$` و `$$` - كما يمكنك في اختباراتك.

عند استخدام `browser.debug()`، من المحتمل أن تحتاج إلى زيادة مهلة مشغل الاختبار لمنع مشغل الاختبار من فشل الاختبار لأنه يستغرق وقتًا طويلًا. على سبيل المثال:

في `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

انظر [المهل الزمنية](timeouts) لمزيد من المعلومات حول كيفية القيام بذلك باستخدام أطر أخرى.

للمتابعة مع الاختبارات بعد التصحيح، استخدم في الصدفة اختصار `^C` أو الأمر `.exit`.

## التكوين الديناميكي

لاحظ أن `wdio.conf.js` يمكن أن يحتوي على جافا سكريبت. نظرًا لأنك على الأرجح لا تريد تغيير قيمة المهلة الخاصة بك بشكل دائم إلى يوم واحد، غالبًا ما يكون من المفيد تغيير هذه الإعدادات من سطر الأوامر باستخدام متغير بيئي.

باستخدام هذه التقنية، يمكنك تغيير التكوين ديناميكيًا:

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

يمكنك بعد ذلك إضافة علامة `debug` كبادئة للأمر `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...وتصحيح ملف المواصفات الخاص بك باستخدام DevTools!

## التصحيح باستخدام Visual Studio Code (VSCode)

إذا كنت ترغب في تصحيح اختباراتك باستخدام نقاط التوقف في أحدث إصدار من VSCode، فلديك خياران لبدء مصحح الأخطاء حيث يعتبر الخيار 1 هو الطريقة الأسهل:
 1. إرفاق المصحح تلقائيًا
 2. إرفاق المصحح باستخدام ملف التكوين

### تبديل الإرفاق التلقائي لـ VSCode

يمكنك إرفاق المصحح تلقائيًا باتباع هذه الخطوات في VSCode:
 - اضغط على CMD + Shift + P (Linux و Macos) أو CTRL + Shift + P (Windows)
 - اكتب "attach" في حقل الإدخال
 - حدد "Debug: Toggle Auto Attach"
 - حدد "Only With Flag"

 هذا كل شيء! الآن عندما تقوم بتشغيل اختباراتك (تذكر أنك ستحتاج إلى تعيين علامة --inspect في التكوين الخاص بك كما هو موضح سابقًا) سيبدأ تلقائيًا مصحح الأخطاء ويتوقف عند نقطة التوقف الأولى التي يصل إليها.

### ملف تكوين VSCode

من الممكن تشغيل كل أو ملفات المواصفات المحددة. يجب إضافة تكوين (تكوينات) التصحيح إلى `.vscode/launch.json`، لتصحيح المواصفات المحددة أضف التكوين التالي:
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

لتشغيل جميع ملفات المواصفات، قم بإزالة `"--spec", "${file}"` من `"args"`

مثال: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

معلومات إضافية: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl الديناميكي مع Atom

إذا كنت من مستخدمي [Atom](https://atom.io/) فيمكنك تجربة [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) بواسطة [@kurtharriger](https://github.com/kurtharriger) وهو repl ديناميكي يسمح لك بتنفيذ أسطر التعليمات البرمجية الفردية في Atom. شاهد [هذا](https://www.youtube.com/watch?v=kdM05ChhLQE) الفيديو على YouTube لمشاهدة عرض توضيحي.

## التصحيح باستخدام WebStorm / Intellij
يمكنك إنشاء تكوين تصحيح node.js مثل هذا:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
شاهد [فيديو YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) هذا للحصول على مزيد من المعلومات حول كيفية إنشاء تكوين.

## تصحيح الاختبارات غير المستقرة

يمكن أن تكون الاختبارات غير المستقرة صعبة التصحيح، لذا إليك بعض النصائح حول كيفية محاولة استنساخ تلك النتيجة غير المستقرة التي حصلت عليها في CI الخاص بك محليًا.

### الشبكة
لتصحيح مشاكل عدم الاستقرار المتعلقة بالشبكة، استخدم الأمر [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### سرعة العرض
لتصحيح المشكلات المتعلقة بسرعة الجهاز، استخدم الأمر [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
هذا سيتسبب في عرض صفحاتك بشكل أبطأ، وهو ما يمكن أن ينتج عن العديد من الأشياء مثل تشغيل عمليات متعددة في CI الخاص بك مما قد يبطئ اختباراتك.
```js
await browser.throttleCPU(4)
```

### سرعة تنفيذ الاختبار

إذا لم تبدو اختباراتك متأثرة، فمن الممكن أن يكون WebdriverIO أسرع من التحديث من إطار العمل الأمامي / المتصفح. يحدث هذا عند استخدام التأكيدات المتزامنة لأن WebdriverIO ليس لديه فرصة لإعادة محاولة هذه التأكيدات بعد الآن. بعض الأمثلة على الكود الذي يمكن أن يتعطل بسبب هذا:
```js
expect(elementList.length).toEqual(7) // قد لا تكون القائمة قد تم تعبئتها في وقت التأكيد
expect(await elem.getText()).toEqual('this button was clicked 3 times') // قد لا يكون النص قد تم تحديثه بعد في وقت التأكيد مما يؤدي إلى خطأ ("this button was clicked 2 times" لا يتطابق مع المتوقع "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // قد لا يكون معروضًا بعد
```
لحل هذه المشكلة، يجب استخدام التأكيدات غير المتزامنة بدلاً من ذلك. الأمثلة أعلاه ستبدو كالتالي:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
باستخدام هذه التأكيدات، سينتظر WebdriverIO تلقائيًا حتى تتطابق الحالة. عند تأكيد النص، هذا يعني أن العنصر يجب أن يكون موجودًا وأن النص يجب أن يكون مساويًا للقيمة المتوقعة.
نتحدث أكثر عن هذا في [دليل أفضل الممارسات](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) الخاص بنا.