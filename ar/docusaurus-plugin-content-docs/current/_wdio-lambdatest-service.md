---
id: wdio-lambdatest-service
title: خدمة LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> خدمة WebdriverIO التي تدير النفق وبيانات التعريف للمهام لمستخدمي LambdaTest.

## التثبيت

```bash
npm i wdio-lambdatest-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)


## الإعداد

يتمتع WebdriverIO بدعم LambdaTest بشكل أساسي. يجب عليك ببساطة تعيين `user` و`key` في ملف `wdio.conf.js` الخاص بك. لتمكين الميزة لأتمتة التطبيقات، قم بتعيين `product: 'appAutomation'` في ملف `wdio.conf.js` الخاص بك. يوفر هذا البرنامج المساعد للخدمة دعمًا لـ [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). قم بتعيين `tunnel: true` أيضًا لتنشيط هذه الميزة.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### للحصول على ملاحظات خطأ الاختبار على لوحة معلومات الأتمتة
للحصول على ملاحظات خطأ الاختبار على لوحة معلومات الأتمتة، قم ببساطة بإضافة `ltErrorRemark: true` في ملف `wdio.conf.js` الخاص بك.


### لرفع التطبيق من الجهاز المحلي أو عبر URL
قم برفع تطبيقات `android` أو `ios` من التطبيق المحلي أو URL المستضاف من خلال إضافة هذا الإعداد المطلوب في ملف `wdio.conf.js` الخاص بك. لاستخدام التطبيق المرفوع للاختبار في نفس التشغيل، قم بتعيين `enableCapability = true`، وهذا سيضبط قيمة URL التطبيق في الإمكانيات.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## الخيارات

من أجل التفويض لخدمة LambdaTest، يجب أن يحتوي التكوين الخاص بك على خيار [`user`](https://webdriver.io/docs/options.html#user) و [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
قم بتعيين هذا إلى true لتمكين توجيه الاتصالات من سحابة LambdaTest من خلال جهاز الكمبيوتر الخاص بك. ستحتاج أيضًا إلى تعيين `tunnel` إلى true في إمكانيات المتصفح.

النوع: `Boolean`<br />
الافتراضي: `false`

### lambdatestOpts
سيتم تمرير الخيارات المحددة اختيارياً إلى LambdaTest Tunnel.

النوع: `Object`<br />
الافتراضي: `{}`

فيما يلي قائمة شاملة بجميع الخيارات المتاحة:

#### tunnelName
يحدد اسم نفق LambdaTest المخصص المراد استخدامه.

**مثال:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
منفذ LambdaTest Tunnel للتنشيط.

**مثال:**
```json
{"port": 33000}
```
#### user
اسم المستخدم LambdaTest.

**مثال:**
```json
{"user": "your_username"}
```

#### key
مفتاح الوصول LambdaTest.

**مثال:**
```json
{"key": "your_access_key"}
```

#### verbose
هل يجب تسجيل كل طلب وكيل في stdout.

**مثال:**
```json
{"verbose": true}
```

#### logFile
موقع ملف سجل LambdaTest Tunnel.

**مثال:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

مسار ملف التكوين المراد استخدامه.
**مثال:**
```json
{"config": "/path/to/config/file"}
```

#### dir
حدد الدليل المحلي الذي سيتم تقديمه بواسطة خادم ملفات على منفذ Tunnel.

**مثال:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
يحدد اسم مضيف منفذ وكيل Tunnel.

**مثال:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
يحدد اسم مستخدم منفذ وكيل Tunnel.

**مثال:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
يحدد كلمة مرور منفذ وكيل Tunnel.

**مثال:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
يحدد رقم المنفذ الذي سيتم تنشيط وكيل Tunnel فيه.

**مثال:**
```json
{"proxyPort": 8080}
```

#### egressOnly
يستخدم إعدادات الوكيل للطلبات الصادرة فقط.

**مثال:**
```json
{"egressOnly": true}
```


#### ingressOnly
يوجه حركة المرور الواردة فقط عبر الوكيل المحدد.

**مثال:**
```json
{"ingressOnly": true}
```


#### pacfile
لاستخدام PAC (Proxy Auto-Configuration) في الاختبار المحلي، قم بتقديم
مسار ملف PAC.

**مثال:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
ينشط [توازن الحمل](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) لـ LambdaTest Tunnel.

**مثال:**
```json
{"loadBalanced": true}
```

#### mode
يحدد الوضع الذي يجب أن يعمل فيه النفق "ssh" أو "ws". (الافتراضي "ssh").

**مثال:**
```json
{"mode": "ssh"}
```

#### sshConnType
حدد نوع اتصال ssh (over_22, over_443, over_ws). لاستخدام --sshConnType، حدد ––mode ssh flag أولاً.

**مثال:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
زيادة اتصال SSH من عميل Tunnel إلى خادم Tunnel. الحد الأقصى المسموح به هو 30.

**مثال:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
مشاركة Tunnel بين أعضاء الفريق.

**مثال:**
```json
{"sharedTunnel": true}
```

#### env
البيئة التي سيعمل عليها LambdaTest Tunnel.

**مثال:**
```json
{"env": "production"}
```


#### infoAPIPort
يكشف [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) في المنفذ المحدد.

**مثال:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
عنوان URL لرد الاتصال لحالة النفق.

**مثال:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
قائمة المضيفين المفصولة بفواصل للتوجيه عبر النفق. سيتم توجيه كل شيء آخر عبر الإنترنت.

**مثال:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
قائمة المضيفين المفصولة بفواصل لتجاوزها من النفق. سيتم توجيه هذه عبر الإنترنت.

**مثال:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
مسار ملف شهادة العميل mTLS.

**مثال:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
مسار ملف مفتاح العميل mTLS.

**مثال:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
قائمة مضيفي mTLS مفصولة بفواصل.

**مثال:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
قائمة خوادم DNS مفصولة بفواصل.

**مثال:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
تمكين وضع [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) لـ LambdaTest Tunnel.

**مثال:**
```json
{"mitm": true}
```

#### ntlm
لاستخدام مصادقة Microsoft NTLM (Windows NT LAN Manager) للاتصال أو أغراض النقل.

**مثال:**
```json
{"ntlm": true}
```

#### pidfile
مسار ملف pidfile، حيث سيتم كتابة معرف العملية.

**مثال:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
يضبط العنوان البعيد على IP داخلي لجهاز العميل.

**مثال:**
```json
{"usePrivateIp": true}
```

يمكنك معرفة المزيد حول هذه الخيارات [هنا](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Cucumber فقط. قم بتعيين اسم الجلسة إلى اسم السيناريو إذا تم تشغيل سيناريو واحد فقط.
مفيد عند التشغيل بالتوازي مع [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

النوع: `Boolean`<br />
الافتراضي: `false`

### sessionNameFormat
تخصيص تنسيق اسم الجلسة.

النوع: `Function`<br />
الافتراضي (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
الافتراضي (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Mocha فقط. لا تقم بإلحاق عنوان الاختبار باسم الجلسة.

النوع: `Boolean`<br />
الافتراضي: `false`

### sessionNamePrependTopLevelSuiteTitle
Mocha فقط. قم بإلحاق عنوان المجموعة العليا إلى اسم الجلسة.

النوع: `Boolean`<br />
الافتراضي: `false`

### setSessionName
قم تلقائيًا بتعيين اسم الجلسة.

النوع: `Boolean`<br />
الافتراضي: `true`

### setSessionStatus
قم تلقائيًا بتعيين حالة الجلسة (نجاح/فشل).

النوع: `Boolean`<br />
الافتراضي: `true`


### ignoreTestCountInName
تجاهل عدد إعادة المحاولات للاختبار في الاسم

النوع: `Boolean`<br />
الافتراضي: `false`


### useScenarioName
للحصول على أسماء الاختبارات كأسماء سيناريو للاختبارات الخاصة بـ cucumber، قم ببساطة بإضافة `useScenarioName: true` في ملف `wdio.conf.js` الخاص بك.

## خطوات التجميع والنشر
1. انسخ هذا المستودع بواسطة git clone.
2. قم بتشغيل "npm install"
3. قم بتشغيل "npm run build"
4. خطوات النشر: قم بتشغيل "npm login"
5. قم بتشغيل "npm publish --access public"

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).