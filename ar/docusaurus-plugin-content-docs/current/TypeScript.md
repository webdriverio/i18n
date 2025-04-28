---
id: typescript
title: إعداد TypeScript
---

يمكنك كتابة الاختبارات باستخدام [TypeScript](http://www.typescriptlang.org) للحصول على الإكمال التلقائي والسلامة النوعية.

ستحتاج إلى تثبيت [`tsx`](https://github.com/privatenumber/tsx) في `devDependencies`، عبر:

```bash npm2yarn
$ npm install tsx --save-dev
```

سيكتشف WebdriverIO تلقائيًا إذا تم تثبيت هذه التبعيات وسيقوم بتجميع الإعدادات والاختبارات الخاصة بك. تأكد من وجود ملف `tsconfig.json` في نفس دليل إعدادات WDIO الخاص بك.

#### TSConfig مخصص

إذا كنت بحاجة إلى تعيين مسار مختلف لـ `tsconfig.json` يرجى تعيين متغير البيئة TSCONFIG_PATH بالمسار المطلوب، أو استخدام [إعداد tsConfigPath](/docs/configurationfile) في تكوين wdio.

بدلاً من ذلك، يمكنك استخدام [متغير البيئة](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) لـ `tsx`.


#### فحص النوع

لاحظ أن `tsx` لا يدعم فحص النوع - إذا كنت ترغب في التحقق من الأنواع الخاصة بك فستحتاج إلى القيام بذلك في خطوة منفصلة باستخدام `tsc`.

## إعداد الإطار

يحتاج ملف `tsconfig.json` الخاص بك إلى ما يلي:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

يرجى تجنب استيراد `webdriverio` أو `@wdio/sync` بشكل صريح.
أنواع `WebdriverIO` و `WebDriver` يمكن الوصول إليها من أي مكان بمجرد إضافتها إلى `types` في `tsconfig.json`. إذا كنت تستخدم خدمات WebdriverIO إضافية أو مكونات إضافية أو حزمة أتمتة `devtools`، يرجى إضافتها أيضًا إلى قائمة `types` حيث توفر العديد منها أنواعًا إضافية.

## أنواع الإطار

اعتمادًا على الإطار الذي تستخدمه، ستحتاج إلى إضافة الأنواع لذلك الإطار إلى خاصية `types` في ملف `tsconfig.json` الخاص بك، بالإضافة إلى تثبيت تعريفات النوع الخاصة به. هذا مهم بشكل خاص إذا كنت تريد الحصول على دعم النوع لمكتبة التأكيد المدمجة [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

على سبيل المثال، إذا قررت استخدام إطار Mocha، فأنت بحاجة إلى تثبيت `@types/mocha` وإضافته بالشكل التالي للحصول على جميع الأنواع المتاحة عالميًا:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## الخدمات

إذا كنت تستخدم خدمات تضيف أوامر إلى نطاق المتصفح، فأنت بحاجة أيضًا إلى تضمينها في ملف `tsconfig.json` الخاص بك. على سبيل المثال، إذا كنت تستخدم `@wdio/lighthouse-service`، تأكد من إضافته إلى `types` أيضًا، مثلاً:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

إضافة الخدمات والمراسلين إلى تكوين TypeScript الخاص بك يعزز أيضًا سلامة نوع ملف تكوين WebdriverIO الخاص بك.

## تعريفات النوع

عند تشغيل أوامر WebdriverIO، تكون جميع الخصائص عادةً مكتوبة بحيث لا تضطر للتعامل مع استيراد أنواع إضافية. ومع ذلك، هناك حالات حيث تريد تحديد المتغيرات مسبقًا. لضمان أن هذه آمنة من حيث النوع، يمكنك استخدام جميع الأنواع المحددة في حزمة [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). على سبيل المثال، إذا كنت ترغب في تحديد خيار التحكم عن بُعد لـ `webdriverio`، يمكنك القيام بذلك:

```ts
import type { Options } from '@wdio/types'

// هنا مثال على متى قد ترغب في استيراد الأنواع مباشرة
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// للحالات الأخرى، يمكنك استخدام مساحة الاسم `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // خيارات تكوين أخرى
}
```

## نصائح وتلميحات

### التجميع والتدقيق

لتكون آمنًا تمامًا، قد تفكر في اتباع أفضل الممارسات: قم بتجميع الكود الخاص بك باستخدام مجمع TypeScript (قم بتشغيل `tsc` أو `npx tsc`) واجعل [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) يعمل على [خطاف ما قبل الالتزام](https://github.com/typicode/husky).