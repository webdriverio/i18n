---
id: proxy
title: إعداد البروكسي
---

يمكنك توجيه نوعين مختلفين من الطلبات عبر بروكسي:

- الاتصال بين سكريبت الاختبار الخاص بك ومتصفح السائق (أو نقطة نهاية WebDriver)
- الاتصال بين المتصفح والإنترنت

## البروكسي بين السائق والاختبار

إذا كانت شركتك تستخدم بروكسي مؤسسي (على سبيل المثال على `http://my.corp.proxy.com:9090`) لجميع الطلبات الصادرة، اتبع الخطوات التالية لتثبيت وتكوين [undici](https://github.com/nodejs/undici).

### تثبيت undici

```bash npm2yarn
npm install undici --save-dev
```

### إضافة undici setGlobalDispatcher إلى ملف التكوين الخاص بك

أضف عبارة require التالية إلى أعلى ملف التكوين الخاص بك.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

يمكن العثور على معلومات إضافية حول تكوين البروكسي [هنا](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

إذا كنت تستخدم [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)، ابدأه عبر:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## البروكسي بين المتصفح والإنترنت

لتوجيه الاتصال بين المتصفح والإنترنت، يمكنك إعداد بروكسي والذي يمكن أن يكون مفيدًا (على سبيل المثال) لالتقاط معلومات الشبكة وبيانات أخرى باستخدام أدوات مثل [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

يمكن تطبيق معلمات `proxy` عبر الإمكانيات القياسية بالطريقة التالية:

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