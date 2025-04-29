---
id: shared-store-service
title: خدمة المخزن المشترك
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> تبادل البيانات بين العملية الرئيسية والعمال (المواصفات).

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/shared-store-service` كتبعية تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/shared-store-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## الاستخدام

احصل على/اضبط قيمة (كائن بسيط) من/إلى المخزن بواسطة المفتاح (سلسلة نصية). يمكن أن يكون المفتاح أي سلسلة نصية اعتباطية باستثناء `*` التي تم حجزها حيث تسمح لك بجلب المخزن بأكمله.

### ضبط القيم

لضبط القيم في المخزن، قم باستدعاء:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### الحصول على القيم

للحصول على القيم من المخزن، قم باستدعاء:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // returns "foobar123"
```

يمكنك أيضًا جلب جميع القيم بواسطة استخدام المفتاح `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // returns `{ key: "foobar" }`
```

### الوصول إلى المخزن في WDIO Hooks

يمكنك أيضًا الوصول مباشرة إلى معالجات `setValue` و`getValue` غير المتزامنة.
تأكد من استدعائها بشكل صحيح باستخدام الكلمة المفتاحية `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

مهم! يجب أن يكون كل ملف مواصفات ذريًا ومعزولًا عن مواصفات الآخرين.
فكرة الخدمة هي التعامل مع مشكلات إعداد بيئة محددة جدًا.
يرجى تجنب مشاركة بيانات تنفيذ الاختبار!

### مجمعات الموارد

إذا كانت سلاسل العمال تتنافس على الموارد التي يجب تخصيصها لكل عامل، يمكنك استخدام واجهة برمجة تطبيقات مجمع الموارد:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

هذا المثال يضمن أن كلا العاملين لا يستخدمان نفس `baseUrl`. يتم تعيين عنوان URL فريد لعامل واحد فقط حتى يتم تحريره بواسطته.

## التكوين

أضف `shared-store` إلى قائمة الخدمات وسيكون الكائن `sharedStore` متاحًا لك في [نطاق `browser`](https://webdriver.io/docs/api/browser) في اختبارك.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

إذا كنت تستخدم TypeScript، تأكد من إضافة `@wdio/shared-store-service` إلى `compilerOptions.types` الخاص بك:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```