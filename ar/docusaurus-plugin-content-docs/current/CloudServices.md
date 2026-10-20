---
id: cloudservices
title: استخدام الخدمات السحابية
description: "تشغيل اختبارات WebdriverIO على Sauce Labs وBrowserStack وTestingBot وTestMu AI (المعروفة سابقًا باسم LambdaTest) وPerfecto وغيرها من مزودي الخدمات السحابية."
---

إن استخدام الخدمات حسب الطلب مثل Sauce Labs أو Browserstack أو TestingBot أو TestMu AI (المعروفة سابقًا باسم LambdaTest) أو Perfecto مع WebdriverIO أمر بسيط للغاية. كل ما عليك فعله هو تعيين `user` و`key` الخاصين بالخدمة في خياراتك.

اختياريًا، يمكنك أيضًا إضافة معاملات إلى اختبارك عن طريق تعيين قدرات خاصة بالخدمة السحابية مثل `build`. إذا كنت تريد تشغيل الخدمات السحابية في Travis فقط، يمكنك استخدام متغير البيئة `CI` للتحقق مما إذا كنت في Travis وتعديل الإعدادات وفقًا لذلك.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

يمكنك إعداد اختباراتك لتعمل عن بُعد في [Sauce Labs](https://saucelabs.com).

المتطلب الوحيد هو تعيين `user` و`key` في إعداداتك (سواء المُصدَّرة من `wdio.conf.js` أو الممررة إلى `webdriverio.remote(...)`) إلى اسم المستخدم ومفتاح الوصول الخاصين بك في Sauce Labs.

يمكنك أيضًا تمرير أي [خيار اختياري من خيارات إعداد الاختبار](https://docs.saucelabs.com/dev/test-configuration-options/) كمفتاح/قيمة في القدرات (capabilities) لأي متصفح.

### Sauce Connect

إذا كنت تريد تشغيل الاختبارات على خادم لا يمكن الوصول إليه من الإنترنت (مثل `localhost`)، فأنت بحاجة إلى استخدام [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

دعم ذلك خارج نطاق WebdriverIO، لذا سيتعين عليك تشغيله بنفسك.

إذا كنت تستخدم مشغل اختبارات WDIO، فقم بتنزيل وإعداد [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) في ملف `wdio.conf.js` الخاص بك. فهو يساعد على تشغيل Sauce Connect ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة Sauce.

### مع Travis CI

ومع ذلك، فإن Travis CI [يدعم](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) تشغيل Sauce Connect قبل كل اختبار، لذا فإن اتباع توجيهاتهم لذلك يُعد خيارًا متاحًا.

إذا قمت بذلك، يجب عليك تعيين خيار إعداد الاختبار `tunnel-identifier` في `capabilities` لكل متصفح. يقوم Travis بتعيين هذا إلى متغير البيئة `TRAVIS_JOB_NUMBER` افتراضيًا.

أيضًا، إذا كنت تريد أن يقوم Sauce Labs بتجميع اختباراتك حسب رقم البناء، يمكنك تعيين `build` إلى `TRAVIS_BUILD_NUMBER`.

أخيرًا، إذا قمت بتعيين `name`، فإن ذلك يغير اسم هذا الاختبار في Sauce Labs لهذا البناء. إذا كنت تستخدم مشغل اختبارات WDIO مع [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)، فإن WebdriverIO يعيّن تلقائيًا اسمًا مناسبًا للاختبار.

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

نظرًا لأنك تقوم بتشغيل اختباراتك عن بُعد، فقد يكون من الضروري زيادة بعض المهل الزمنية.

يمكنك تغيير [مهلة الخمول](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) عن طريق تمرير `idle-timeout` كخيار لإعداد الاختبار. يتحكم هذا في المدة التي سينتظرها Sauce بين الأوامر قبل إغلاق الاتصال.

## BrowserStack

يحتوي WebdriverIO أيضًا على تكامل مدمج مع [Browserstack](https://www.browserstack.com).

المتطلب الوحيد هو تعيين `user` و`key` في إعداداتك (سواء المُصدَّرة من `wdio.conf.js` أو الممررة إلى `webdriverio.remote(...)`) إلى اسم المستخدم ومفتاح الوصول الخاصين بك في Browserstack Automate.

يمكنك أيضًا تمرير أي من [القدرات المدعومة](https://www.browserstack.com/automate/capabilities) الاختيارية كمفتاح/قيمة في القدرات لأي متصفح. إذا قمت بتعيين `browserstack.debug` إلى `true` فسيتم تسجيل فيديو للشاشة خلال الجلسة، وهو ما قد يكون مفيدًا.

### الاختبار المحلي

إذا كنت تريد تشغيل الاختبارات على خادم لا يمكن الوصول إليه من الإنترنت (مثل `localhost`)، فأنت بحاجة إلى استخدام [الاختبار المحلي](https://www.browserstack.com/local-testing#command-line).

دعم ذلك خارج نطاق WebdriverIO، لذا يجب عليك تشغيله بنفسك.

إذا كنت تستخدم الاختبار المحلي، فيجب عليك تعيين `browserstack.local` إلى `true` في القدرات الخاصة بك.

إذا كنت تستخدم مشغل اختبارات WDIO، فقم بتنزيل وإعداد [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) في ملف `wdio.conf.js` الخاص بك. فهو يساعد على تشغيل BrowserStack، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة BrowserStack.

### مع Travis CI

إذا كنت تريد إضافة الاختبار المحلي في Travis، فيجب عليك تشغيله بنفسك.

سيقوم السكريبت التالي بتنزيله وتشغيله في الخلفية. يجب عليك تشغيل هذا في Travis قبل بدء الاختبارات.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

أيضًا، قد ترغب في تعيين `build` إلى رقم البناء في Travis.

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

المتطلب الوحيد هو تعيين `user` و`key` في إعداداتك (سواء المُصدَّرة من `wdio.conf.js` أو الممررة إلى `webdriverio.remote(...)`) إلى اسم المستخدم والمفتاح السري الخاصين بك في [TestingBot](https://testingbot.com).

يمكنك أيضًا تمرير أي من [القدرات المدعومة](https://testingbot.com/support/other/test-options) الاختيارية كمفتاح/قيمة في القدرات لأي متصفح.

### الاختبار المحلي

إذا كنت تريد تشغيل الاختبارات على خادم لا يمكن الوصول إليه من الإنترنت (مثل `localhost`)، فأنت بحاجة إلى استخدام [الاختبار المحلي](https://testingbot.com/support/other/tunnel). يوفر TestingBot نفقًا (tunnel) مبنيًا على Java للسماح لك باختبار المواقع التي لا يمكن الوصول إليها من الإنترنت.

تحتوي صفحة دعم النفق الخاصة بهم على المعلومات اللازمة لإعداده وتشغيله.

إذا كنت تستخدم مشغل اختبارات WDIO، فقم بتنزيل وإعداد [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) في ملف `wdio.conf.js` الخاص بك. فهو يساعد على تشغيل TestingBot، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة TestingBot.

## TestMu AI (المعروفة سابقًا باسم LambdaTest)

التكامل مع [TestMu AI](https://www.testmuai.com/) مدمج أيضًا.

المتطلب الوحيد هو تعيين `user` و`key` في إعداداتك (سواء المُصدَّرة من `wdio.conf.js` أو الممررة إلى `webdriverio.remote(...)`) إلى اسم المستخدم ومفتاح الوصول الخاصين بحسابك في TestMu AI.

يمكنك أيضًا تمرير أي من [القدرات المدعومة](https://www.testmuai.com/capabilities-generator/) الاختيارية كمفتاح/قيمة في القدرات لأي متصفح. إذا قمت بتعيين `visual` إلى `true` فسيتم تسجيل فيديو للشاشة خلال الجلسة، وهو ما قد يكون مفيدًا.

### النفق للاختبار المحلي

إذا كنت تريد تشغيل الاختبارات على خادم لا يمكن الوصول إليه من الإنترنت (مثل `localhost`)، فأنت بحاجة إلى استخدام [الاختبار المحلي](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

دعم ذلك خارج نطاق WebdriverIO، لذا يجب عليك تشغيله بنفسك.

إذا كنت تستخدم الاختبار المحلي، فيجب عليك تعيين `tunnel` إلى `true` في القدرات الخاصة بك.

إذا كنت تستخدم مشغل اختبارات WDIO، فقم بتنزيل وإعداد [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) في ملف `wdio.conf.js` الخاص بك. فهو يساعد على تشغيل TestMu AI، ويأتي بميزات إضافية تدمج اختباراتك بشكل أفضل في خدمة TestMu AI.

### مع Travis CI

إذا كنت تريد إضافة الاختبار المحلي في Travis، فيجب عليك تشغيله بنفسك.

سيقوم السكريبت التالي بتنزيله وتشغيله في الخلفية. يجب عليك تشغيل هذا في Travis قبل بدء الاختبارات.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

أيضًا، قد ترغب في تعيين `build` إلى رقم البناء في Travis.

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

عند استخدام wdio مع [`Perfecto`](https://www.perfecto.io)، تحتاج إلى إنشاء رمز أمان (security token) لكل مستخدم وإضافته في بنية القدرات (بالإضافة إلى القدرات الأخرى)، كما يلي:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

بالإضافة إلى ذلك، تحتاج إلى إضافة إعدادات السحابة، كما يلي:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

يوفر [RobotActions](https://robotactions.com) أجهزة Android وiOS حقيقية إلى جانب عُقد المتصفحات خلف نقطة نهاية واحدة. وهو يقوم بالمصادقة باستخدام رمز API بدلاً من زوج `user` و`key`. أرسل الرمز كترويسة bearer:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

بدلاً من ذلك، مرّر الرمز كبادئة للمسار، والتي تقوم الشبكة (grid) بإزالتها قبل إعادة توجيه الطلب:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

تقبل الشبكة أيضًا بيانات الاعتماد المضمنة في عنوان URL (`https://user:token@host`) لعملاء WebDriver الآخرين، لكن لا يمكن استخدام هذه الصيغة من WebdriverIO: فهو يعتمد على fetch، وNode.js يرفض بيانات الاعتماد المضمنة في عنوان URL.

للتشغيل على جهاز حقيقي، مرّر المتصفح كقدرة Appium إلى جانب أي من أسلوبي الاتصال المذكورين أعلاه:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```