---
id: cloudservices
title: استخدام خدمات السحابة
---

استخدام الخدمات حسب الطلب مثل Sauce Labs وBrowserstack وTestingBot وLambdaTest أو Perfecto مع WebdriverIO أمر بسيط للغاية. كل ما عليك فعله هو تعيين `user` و`key` الخاص بخدمتك في خياراتك.

بشكل اختياري، يمكنك أيضًا وضع معلمات لاختبارك عن طريق تعيين إمكانيات خاصة بالسحابة مثل `build`. إذا كنت ترغب فقط في تشغيل خدمات السحابة في Travis، يمكنك استخدام متغير البيئة `CI` للتحقق مما إذا كنت في Travis وتعديل التكوين وفقًا لذلك.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

يمكنك إعداد اختباراتك لتشغيلها عن بُعد في [Sauce Labs](https://saucelabs.com).

المتطلب الوحيد هو تعيين `user` و`key` في التكوين الخاص بك (إما تم تصديره بواسطة `wdio.conf.js` أو تمريره إلى `webdriverio.remote(...)`) إلى اسم المستخدم ومفتاح الوصول الخاص بـ Sauce Labs.

يمكنك أيضًا تمرير أي [خيار تكوين اختبار](https://docs.saucelabs.com/dev/test-configuration-options/) اختياري كمفتاح/قيمة في الإمكانيات لأي متصفح.

### Sauce Connect

إذا كنت تريد تشغيل اختبارات على خادم غير متاح للإنترنت (مثل `localhost`)، فستحتاج إلى استخدام [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

إنه خارج نطاق WebdriverIO لدعم هذا، لذلك ستضطر إلى بدء تشغيله بنفسك.

إذا كنت تستخدم WDIO testrunner، قم بتنزيل وتكوين [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) في ملف `wdio.conf.js` الخاص بك. يساعد ذلك في تشغيل Sauce Connect ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة Sauce.

### مع Travis CI

ومع ذلك، فإن Travis CI [يدعم](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) بدء Sauce Connect قبل كل اختبار، لذا فإن اتباع توجيهاتهم لذلك هو خيار.

إذا قمت بذلك، يجب عليك تعيين خيار تكوين الاختبار `tunnel-identifier` في `capabilities` كل متصفح. يقوم Travis بتعيين هذا إلى متغير البيئة `TRAVIS_JOB_NUMBER` بشكل افتراضي.

أيضًا، إذا كنت تريد أن يقوم Sauce Labs بتجميع اختباراتك حسب رقم البناء، يمكنك تعيين `build` إلى `TRAVIS_BUILD_NUMBER`.

أخيرًا، إذا قمت بتعيين `name`، فهذا يغير اسم هذا الاختبار في Sauce Labs لهذا البناء. إذا كنت تستخدم WDIO testrunner مع [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)، يقوم WebdriverIO تلقائيًا بتعيين اسم مناسب للاختبار.

مثال على `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### المهل الزمنية

نظرًا لأنك تقوم بتشغيل اختباراتك عن بُعد، قد يكون من الضروري زيادة بعض المهل الزمنية.

يمكنك تغيير [مهلة الخمول](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) عن طريق تمرير `idle-timeout` كخيار تكوين اختبار. يتحكم هذا في المدة التي سينتظرها Sauce بين الأوامر قبل إغلاق الاتصال.

## BrowserStack

يحتوي WebdriverIO أيضًا على تكامل [Browserstack](https://www.browserstack.com) مدمج.

المتطلب الوحيد هو تعيين `user` و`key` في التكوين الخاص بك (إما تم تصديره بواسطة `wdio.conf.js` أو تمريره إلى `webdriverio.remote(...)`) إلى اسم المستخدم الآلي ومفتاح الوصول الخاص بـ Browserstack.

يمكنك أيضًا تمرير أي [إمكانيات مدعومة](https://www.browserstack.com/automate/capabilities) اختيارية كمفتاح/قيمة في الإمكانيات لأي متصفح. إذا قمت بتعيين `browserstack.debug` إلى `true`، فسيتم تسجيل مقطع فيديو للجلسة، مما قد يكون مفيدًا.

### الاختبار المحلي

إذا كنت تريد تشغيل اختبارات على خادم غير متاح للإنترنت (مثل `localhost`)، فستحتاج إلى استخدام [الاختبار المحلي](https://www.browserstack.com/local-testing#command-line).

إنه خارج نطاق WebdriverIO لدعم هذا، لذلك يجب عليك بدء تشغيله بنفسك.

إذا كنت تستخدم المحلي، يجب عليك تعيين `browserstack.local` إلى `true` في الإمكانيات الخاصة بك.

إذا كنت تستخدم WDIO testrunner، قم بتنزيل وتكوين [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) في ملف `wdio.conf.js` الخاص بك. يساعد هذا في تشغيل BrowserStack، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة BrowserStack.

### مع Travis CI

إذا كنت تريد إضافة الاختبار المحلي في Travis، فعليك بدء تشغيله بنفسك.

سيقوم النص البرمجي التالي بتنزيله وبدء تشغيله في الخلفية. يجب عليك تشغيل هذا في Travis قبل بدء الاختبارات.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

أيضًا، قد ترغب في تعيين `build` إلى رقم بناء Travis.

مثال على `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

المتطلب الوحيد هو تعيين `user` و`key` في التكوين الخاص بك (إما تم تصديره بواسطة `wdio.conf.js` أو تمريره إلى `webdriverio.remote(...)`) إلى اسم المستخدم والمفتاح السري الخاص بـ [TestingBot](https://testingbot.com).

يمكنك أيضًا تمرير أي [إمكانيات مدعومة](https://testingbot.com/support/other/test-options) اختيارية كمفتاح/قيمة في الإمكانيات لأي متصفح.

### الاختبار المحلي

إذا كنت تريد تشغيل اختبارات على خادم غير متاح للإنترنت (مثل `localhost`)، فستحتاج إلى استخدام [الاختبار المحلي](https://testingbot.com/support/other/tunnel). يوفر TestingBot نفقًا قائمًا على Java للسماح لك باختبار مواقع الويب غير المتاحة من الإنترنت.

تحتوي صفحة دعم النفق الخاصة بهم على المعلومات اللازمة لتشغيل هذا.

إذا كنت تستخدم WDIO testrunner، قم بتنزيل وتكوين [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) في ملف `wdio.conf.js` الخاص بك. يساعد هذا في تشغيل TestingBot، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة TestingBot.

## LambdaTest

تكامل [LambdaTest](https://www.lambdatest.com) مدمج أيضًا.

المتطلب الوحيد هو تعيين `user` و`key` في التكوين الخاص بك (إما تم تصديره بواسطة `wdio.conf.js` أو تمريره إلى `webdriverio.remote(...)`) إلى اسم مستخدم حساب LambdaTest ومفتاح الوصول الخاص بك.

يمكنك أيضًا تمرير أي [إمكانيات مدعومة](https://www.lambdatest.com/capabilities-generator/) اختيارية كمفتاح/قيمة في الإمكانيات لأي متصفح. إذا قمت بتعيين `visual` إلى `true`، فسيتم تسجيل مقطع فيديو للجلسة، مما قد يكون مفيدًا.

### نفق للاختبار المحلي

إذا كنت تريد تشغيل اختبارات على خادم غير متاح للإنترنت (مثل `localhost`)، فستحتاج إلى استخدام [الاختبار المحلي](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

إنه خارج نطاق WebdriverIO لدعم هذا، لذلك يجب عليك بدء تشغيله بنفسك.

إذا كنت تستخدم المحلي، يجب عليك تعيين `tunnel` إلى `true` في الإمكانيات الخاصة بك.

إذا كنت تستخدم WDIO testrunner، قم بتنزيل وتكوين [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) في ملف `wdio.conf.js` الخاص بك. يساعد هذا في تشغيل LambdaTest، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة LambdaTest.

### مع Travis CI

إذا كنت تريد إضافة الاختبار المحلي في Travis، فعليك بدء تشغيله بنفسك.

سيقوم النص البرمجي التالي بتنزيله وبدء تشغيله في الخلفية. يجب عليك تشغيل هذا في Travis قبل بدء الاختبارات.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

أيضًا، قد ترغب في تعيين `build` إلى رقم بناء Travis.

مثال على `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

عند استخدام wdio مع [`Perfecto`](https://www.perfecto.io)، تحتاج إلى إنشاء رمز أمان لكل مستخدم وإضافته في هيكل الإمكانيات (بالإضافة إلى إمكانيات أخرى)، على النحو التالي:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

بالإضافة إلى ذلك، تحتاج إلى إضافة تكوين السحابة، على النحو التالي:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```