---
id: debug
title: تصحيح الأخطاء
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

يساعدك هذا الأمر على تصحيح اختبارات التكامل الخاصة بك. يوقف المتصفح الذي يعمل ويمنحك الوقت للدخول إليه والتحقق من حالة تطبيقك (مثلاً باستخدام أدوات المطور).
يتحول طرفية التحكم الخاصة بك إلى واجهة [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
التي تتيح لك تجربة أوامر معينة، والعثور على العناصر واختبار الإجراءات عليها.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

إذا كنت تقوم بتشغيل WDIO testrunner، تأكد من زيادة خاصية المهلة الزمنية في إطار الاختبار
الذي تستخدمه (مثل Mocha أو Jasmine) لمنع إنهاء الاختبار بسبب انتهاء المهلة الزمنية للاختبار.
تجنب أيضًا تنفيذ الأمر مع تشغيل قدرات متعددة في نفس الوقت.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### الاستخدام

```js
browser.debug()
```

##### مثال

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```