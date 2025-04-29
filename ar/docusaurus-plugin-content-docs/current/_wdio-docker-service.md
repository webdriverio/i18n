---
id: wdio-docker-service
title: خدمة دوكر
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

هذه الخدمة مخصصة للاستخدام مع [WebdriverIO](http://webdriver.io/) وتساعد في تشغيل اختبارات وظيفية/تكاملية ضد/باستخدام تطبيقات حاويات. وهي تستخدم خدمة [Docker](https://www.docker.com/) الشهيرة (مثبتة بشكل منفصل) لتشغيل الحاويات.

## لماذا تستخدمها؟
مثالياً، يجب أن تعمل اختباراتك في نوع من خط أنابيب CI/CD حيث غالباً لا توجد متصفحات "حقيقية" وموارد أخرى يعتمد عليها تطبيقك. مع ظهور Docker، يمكن وضع جميع تبعيات التطبيق الضرورية في حاويات. مع هذه الخدمة يمكنك تشغيل حاوية التطبيق أو [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) في نظام CI الخاص بك وفي عزلة تامة (بافتراض أن CI يمكن أن يكون لديه Docker مثبت كتبعية). نفس الشيء قد ينطبق على التطوير المحلي إذا كان تطبيقك يحتاج إلى مستوى من العزلة عن نظام التشغيل الرئيسي الخاص بك.

## كيف تعمل
ستقوم الخدمة بتشغيل صورة Docker موجودة، وبمجرد أن تكون جاهزة، ستبدأ اختبارات WebdriverIO التي يجب أن تعمل ضد تطبيقك الموجود في الحاوية.

## التثبيت

قم بتشغيل:

```bash
npm install wdio-docker-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت WebdriverIO [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين
بشكل افتراضي، تتوفر Google Chrome وFirefox وPhantomJS عند تثبيتها على نظام المضيف. 
لاستخدام الخدمة، تحتاج إلى إضافة `docker` إلى مصفوفة الخدمات الخاصة بك:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## الخيارات

### dockerOptions
خيارات مختلفة مطلوبة لتشغيل حاوية docker

النوع: `Object`

الافتراضي: `{ 
    options: {
        rm: true
    }
}`

مثال:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
علامة اسم حاوية Docker. يمكن أن تكون محلية أو من Docker HUB.

النوع: `String`

مطلوب: `true`

### dockerOptions.healthCheck
التكوين الذي يتحقق من جاهزية الحاويات الخاصة بك قبل بدء الاختبارات. عادة ما يكون هذا عبارة عن عنوان URL للمضيف المحلي.
إذا لم يتم تكوين healthCheck، فسيبدأ Webdriver في تشغيل الاختبارات مباشرة بعد بدء حاوية Docker، وهو ما قد يكون مبكرًا جدًا بالنظر إلى أنه يستغرق وقتًا لبدء خدمة الويب داخل حاوية Docker.

النوع: `String|Object`

خيارات استخدام الكائن:
- *url* - رابط URL للتطبيق الذي يعمل داخل الحاوية الخاصة بك
- *maxRetries* - عدد إعادة المحاولات حتى يفشل healthcheck. الافتراضي: 10
- *inspectInterval* - الفاصل الزمني بين كل إعادة محاولة بالميلي ثانية. الافتراضي: 500
- *startDelay* - التأخير الأولي لبدء الفحص الصحي بالميلي ثانية. الافتراضي: 0

مثال 1 (سلسلة نصية): `healthCheck: 'http://localhost:4444'`

مثال 2 (كائن):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
خريطة الخيارات المستخدمة بواسطة أمر `docker run`. لمزيد من التفاصيل حول أمر `run`، انقر [هنا](https://docs.docker.com/edge/engine/reference/commandline/run/).

سيتم تحويل أي خيار من حرف واحد إلى `-[option]` (مثل `d: true` -> `-d`). 

سيتم تحويل أي خيار مكون من حرفين أو أكثر إلى `--[option]` (مثل `rm: true` -> `--rm`). 

بالنسبة للخيارات التي قد تُستخدم أكثر من مرة (مثل `-e`,`-add-host`, `--expose`, إلخ)، يرجى استخدام تدوين المصفوفة (مثل `e: ["NODE_ENV=development", "FOO=bar"]`).

النوع: `Object`

مثال:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
أي وسيطات قد ترغب في تمريرها إلى الحاوية. تتوافق مع `[ARG...]` في واجهة سطر أوامر Docker run.

النوع: `String`

### dockerOptions.command
أي أمر قد ترغب في تمريره إلى الحاوية. يتوافق مع `[COMMAND]` في واجهة سطر أوامر Docker run.

النوع: `String`

### onDockerReady
طريقة رد الاتصال التي يتم استدعاؤها عندما يكون تطبيق Docker جاهزًا. يتم تحديد الجاهزية من خلال القدرة على اختبار عنوان URL للـ `healthCheck`.

النوع: `Function`

### dockerLogs
المسار إلى المكان الذي يجب تخزين سجلات حاوية docker فيه

النوع: `String`

## حالات استخدام الاختبار / الوصفات
يرجى زيارة [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) الخاص بنا لمزيد من التفاصيل.