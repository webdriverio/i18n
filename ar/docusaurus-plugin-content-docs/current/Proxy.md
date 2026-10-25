---
id: proxy
title: إعداد الوكيل (Proxy)
description: "توجيه الطلبات عبر وكيل، إما بين اختباراتك والمشغّل (driver) أو بين المتصفح والإنترنت."
---

يمكنك تمرير نوعين مختلفين من الطلبات عبر وكيل (proxy):

- الاتصال بين نص الاختبار الخاص بك ومشغّل المتصفح (أو نقطة نهاية WebDriver)
- الاتصال بين المتصفح والإنترنت

## الوكيل بين المشغّل والاختبار

إذا كانت لدى شركتك وكيل مؤسسي (على سبيل المثال على `http://my.corp.proxy.com:9090`) لجميع الطلبات الصادرة، فلديك خياران لتهيئة WebdriverIO لاستخدام الوكيل:

### الخيار 1: استخدام متغيرات البيئة (موصى به)

بدءًا من WebdriverIO v9.12.0، يمكنك ببساطة تعيين متغيرات بيئة الوكيل القياسية:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

ثم شغّل اختباراتك كالمعتاد. سيستخدم WebdriverIO متغيرات البيئة هذه تلقائيًا لتهيئة الوكيل.

### الخيار 2: استخدام setGlobalDispatcher من undici

لتهيئات وكيل أكثر تقدمًا أو إذا كنت بحاجة إلى تحكم برمجي، يمكنك استخدام الدالة `setGlobalDispatcher` من undici:

#### تثبيت undici

```bash npm2yarn
npm install undici --save-dev
```

#### إضافة setGlobalDispatcher من undici إلى ملف التهيئة الخاص بك

أضف عبارة الاستيراد التالية إلى أعلى ملف التهيئة الخاص بك.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

يمكن العثور على معلومات إضافية حول تهيئة الوكيل [هنا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### أي طريقة يجب أن أستخدم؟

- **استخدم متغيرات البيئة** إذا كنت تريد نهجًا بسيطًا وقياسيًا يعمل عبر أدوات مختلفة ولا يتطلب تغييرات في الكود.
- **استخدم setGlobalDispatcher** إذا كنت بحاجة إلى ميزات وكيل متقدمة مثل المصادقة المخصصة، أو تهيئات وكيل مختلفة لكل بيئة، أو تريد التحكم في سلوك الوكيل برمجيًا.

كلتا الطريقتين مدعومتان بالكامل، وسيتحقق WebdriverIO أولًا من وجود مُرسِل (dispatcher) عام قبل الرجوع إلى متغيرات البيئة.

### Sauce Connect Proxy

إذا كنت تستخدم [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)، فابدأ تشغيله عبر:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## الوكيل لتنزيلات المتصفح والمشغّل

يقوم WebdriverIO بتنزيل المتصفح والمشغّل اللذين يحتاجهما عندما لا يكونان مثبتين بعد.

- تستخدم تنزيلات **Geckodriver وEdgedriver** المتغيرات `HTTPS_PROXY` و`HTTP_PROXY` و`NO_PROXY`. ويتقدّم المُرسِل المعيّن باستخدام `setGlobalDispatcher` على هذه المتغيرات.
- تستخدم تنزيلات **Chrome وChromium وFirefox وChromedriver** المتغيرات `HTTPS_PROXY` و`HTTP_PROXY` و`NO_PROXY` فقط عند تحقق أحد الشرطين التاليين:
  - أن تكون الحزمة `proxy-agent` مثبتة في مشروعك:

    ```bash
    npm install --save-dev proxy-agent
    ```

  - أن يعمل Node.js مع دعم الوكيل المدمج فيه:

    ```bash
    NODE_USE_ENV_PROXY=1 npx wdio run ./wdio.conf.ts
    ```

  لا يقوم WebdriverIO بتثبيت `proxy-agent` نيابةً عنك، لأن شجرة تبعياتها تحتوي على تنبيهات أمنية دون إصلاح. وعند تعيين متغير وكيل مع عدم تفعيل أي من الخيارين، يسجّل WebdriverIO تحذيرًا قبل أول عملية تنزيل.

## الوكيل بين المتصفح والإنترنت

لتمرير الاتصال بين المتصفح والإنترنت، يمكنك إعداد وكيل قد يكون مفيدًا (على سبيل المثال) لالتقاط معلومات الشبكة وبيانات أخرى باستخدام أدوات مثل [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

يمكن تطبيق معاملات `proxy` عبر الإمكانيات (capabilities) القياسية بالطريقة التالية:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

لمزيد من المعلومات، راجع [مواصفات WebDriver](https://w3c.github.io/webdriver/#proxy).