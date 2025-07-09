---
id: proxy
title: إعداد البروكسي
---

يمكنك توجيه نوعين مختلفين من الطلبات عبر بروكسي:

- الاتصال بين سكريبت الاختبار الخاص بك ومشغل المتصفح (أو نقطة نهاية WebDriver)
- الاتصال بين المتصفح والإنترنت

## البروكسي بين المشغل والاختبار

إذا كانت شركتك تستخدم بروكسي مؤسسي (على سبيل المثال على `http://my.corp.proxy.com:9090`) لجميع الطلبات الصادرة، فلديك خياران لتكوين WebdriverIO لاستخدام البروكسي:

### الخيار 1: استخدام متغيرات البيئة (موصى به)

بدءًا من WebdriverIO v9.12.0، يمكنك ببساطة تعيين متغيرات بيئة البروكسي القياسية:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# اختياري: تجاوز البروكسي لمضيفين معينين
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

ثم قم بتشغيل اختباراتك كالمعتاد. سيستخدم WebdriverIO تلقائيًا متغيرات البيئة هذه لتكوين البروكسي.

### الخيار 2: استخدام setGlobalDispatcher من undici

للحصول على تكوينات بروكسي أكثر تقدمًا أو إذا كنت بحاجة إلى تحكم برمجي، يمكنك استخدام طريقة `setGlobalDispatcher` من undici:

#### تثبيت undici

```bash npm2yarn
npm install undici --save-dev
```

#### إضافة undici setGlobalDispatcher إلى ملف التكوين الخاص بك

أضف بيان require التالي إلى أعلى ملف التكوين الخاص بك.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

يمكن العثور على معلومات إضافية حول تكوين البروكسي [هنا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### أي طريقة يجب أن أستخدم؟

- **استخدم متغيرات البيئة** إذا كنت تريد نهجًا بسيطًا وقياسيًا يعمل عبر أدوات مختلفة ولا يتطلب تغييرات في الكود.
- **استخدم setGlobalDispatcher** إذا كنت بحاجة إلى ميزات بروكسي متقدمة مثل المصادقة المخصصة، أو تكوينات بروكسي مختلفة لكل بيئة، أو تريد التحكم برمجيًا في سلوك البروكسي.

كلا الطريقتين مدعومتان بالكامل وسيتحقق WebdriverIO من وجود موزع عام أولاً قبل الرجوع إلى متغيرات البيئة.

### بروكسي Sauce Connect

إذا كنت تستخدم [بروكسي Sauce Connect](https://docs.saucelabs.com/secure-connections/sauce-connect-5)، قم بتشغيله عبر:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## البروكسي بين المتصفح والإنترنت

لتوجيه الاتصال بين المتصفح والإنترنت، يمكنك إعداد بروكسي مما قد يكون مفيدًا (على سبيل المثال) لالتقاط معلومات الشبكة وبيانات أخرى باستخدام أدوات مثل [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

يمكن تطبيق معلمات `proxy` عبر القدرات القياسية بالطريقة التالية:

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

للمزيد من المعلومات، راجع [مواصفات WebDriver](https://w3c.github.io/webdriver/#proxy).