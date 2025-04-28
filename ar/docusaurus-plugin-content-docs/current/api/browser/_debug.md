---
id: debug
title: التصحيح
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

يساعدك هذا الأمر في تصحيح اختبارات التكامل الخاصة بك. فهو يوقف المتصفح قيد التشغيل ويمنحك الوقت للدخول إليه والتحقق من حالة تطبيقك (مثل استخدام أدوات المطور).
يتحول طرفية التشغيل الخاصة بك إلى واجهة [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
التي ستسمح لك بتجربة أوامر معينة، والعثور على العناصر واختبار الإجراءات عليها.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

إذا كنت تشغّل أداة اختبار WDIO، تأكد من زيادة خاصية الزمن المستقطع (timeout) لإطار الاختبار
الذي تستخدمه (مثل Mocha أو Jasmine) لمنع إنهاء الاختبار بسبب انتهاء المهلة. 
تجنب أيضًا تنفيذ الأمر مع تشغيل إمكانيات متعددة في نفس الوقت.

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