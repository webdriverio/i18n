---
id: wdio-nuxt-service
title: خدمة Nuxt
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---


> wdio-nuxt-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

تساعدك هذه الخدمة على تشغيل تطبيقك عند استخدام [Nuxt](https://nuxt.com/) كأداة بناء. تقوم تلقائيًا بتشغيل خادم Nuxt باستخدام ملف `nuxt.conf.js` الخاص بك قبل بدء الاختبار.

## التثبيت

إذا كنت تبدأ مع WebdriverIO، يمكنك استخدام معالج التكوين لإعداد كل شيء:

```sh
npm init wdio@latest .
```

سيكتشف مشروعك كمشروع Nuxt وسيقوم بتثبيت جميع المكونات الإضافية الضرورية لك. إذا كنت تضيف هذه الخدمة إلى إعداد موجود، فيمكنك دائمًا تثبيتها عبر:

```bash
npm install wdio-nuxt-service --save-dev
```

## التكوين

لتمكين الخدمة، أضفها فقط إلى قائمة `services` في ملف `wdio.conf.js` الخاص بك، على سبيل المثال:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

يمكنك تطبيق خيارات الخدمة عن طريق تمرير مصفوفة مع كائن التكوين، على سبيل المثال:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## الاستخدام

إذا تم إعداد التكوين الخاص بك وفقًا لذلك، ستقوم الخدمة بتعيين خيار [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) للإشارة إلى تطبيقك. يمكنك التنقل إليه عبر أمر [`url`](https://webdriver.io/docs/api/browser/url)، على سبيل المثال:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## الخيارات

### `rootDir`

الدليل الجذر للمشروع.

النوع: `string`<br />
الافتراضي: `process.cwd()`

### `dotenv`

ملف البيئة الذي سيتم تحميله قبل بدء الخادم.

النوع: `string`<br />
الافتراضي: `.env`

### `hostname`

اسم المضيف لبدء الخادم عليه.

النوع: `string`<br />
الافتراضي: `localhost`

### `port`

المنفذ لبدء الخادم عليه.

النوع: `number`<br />
الافتراضي: `process.env.NUXT_PORT || config.devServer.port`

### `https`

قم بتعيينه على true إذا كان يجب بدء خادم الاختبار على https (يجب تكوين الشهادات في تكوين Nuxt).

النوع: `boolean`<br />
الافتراضي: `false`

### `sslCert`

شهادة SSL المراد استخدامها لبدء الخادم على https.

النوع: `string`

### `sslKey`

مفتاح SSL المراد استخدامه لبدء الخادم على https.

النوع: `string`

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).