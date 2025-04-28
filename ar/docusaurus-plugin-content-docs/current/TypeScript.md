---
id: typescript
title: إعداد TypeScript
---

يمكنك كتابة الاختبارات باستخدام [TypeScript](http://www.typescriptlang.org) للحصول على الإكمال التلقائي وأمان الأنواع.

ستحتاج إلى تثبيت [`tsx`](https://github.com/privatenumber/tsx) في `devDependencies`، عبر:

```bash npm2yarn
$ npm install tsx --save-dev
```

سيكتشف WebdriverIO تلقائيًا ما إذا كانت هذه التبعيات مثبتة وسيقوم بتجميع التكوين والاختبارات لك. تأكد من وجود ملف `tsconfig.json` في نفس دليل تكوين WDIO الخاص بك.

#### TSConfig مخصص

إذا كنت بحاجة إلى تعيين مسار مختلف لـ `tsconfig.json`، يرجى تعيين متغير البيئة TSCONFIG_PATH بالمسار المطلوب، أو استخدام [إعداد tsConfigPath](/docs/configurationfile) في تكوين wdio.

بدلاً من ذلك، يمكنك استخدام [متغير البيئة](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) لـ `tsx`.


#### فحص الأنواع

لاحظ أن `tsx` لا يدعم فحص الأنواع - إذا كنت ترغب في التحقق من الأنواع الخاصة بك، فستحتاج إلى القيام بذلك في خطوة منفصلة باستخدام `tsc`.

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
أنواع `WebdriverIO` و `WebDriver` يمكن الوصول إليها من أي مكان بمجرد إضافتها إلى `types` في `tsconfig.json`. إذا كنت تستخدم خدمات WebdriverIO إضافية أو إضافات أو حزمة أتمتة `devtools`، فيرجى إضافتها أيضًا إلى قائمة `types` حيث توفر الكثير منها أنواعًا إضافية.

## أنواع الإطار

اعتمادًا على الإطار الذي تستخدمه، ستحتاج إلى إضافة أنواع لذلك الإطار إلى خاصية `types` في `tsconfig.json`، وكذلك تثبيت تعريفات النوع الخاصة به. هذا مهم بشكل خاص إذا كنت تريد دعم النوع لمكتبة التأكيد المدمجة [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

على سبيل المثال، إذا قررت استخدام إطار Mocha، فأنت بحاجة إلى تثبيت `@types/mocha` وإضافته بهذه الطريقة لجعل جميع الأنواع متاحة عالميًا:

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

إذا كنت تستخدم خدمات تضيف أوامر إلى نطاق المتصفح، فأنت بحاجة أيضًا إلى تضمينها في `tsconfig.json` الخاص بك. على سبيل المثال، إذا كنت تستخدم `@wdio/lighthouse-service`، تأكد من إضافته إلى `types` أيضًا، مثل:

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

تضيف إضافة الخدمات والمراقبين إلى تكوين TypeScript الخاص بك أيضًا على تعزيز سلامة النوع لملف تكوين WebdriverIO الخاص بك.

## تعريفات النوع

عند تشغيل أوامر WebdriverIO، تكون جميع الخصائص عادةً مكتوبة بحيث لا تضطر إلى التعامل مع استيراد أنواع إضافية. ومع ذلك، هناك حالات ترغب فيها في تحديد المتغيرات مسبقًا. لضمان أن هذه آمنة من حيث النوع، يمكنك استخدام جميع الأنواع المحددة في حزمة [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). على سبيل المثال، إذا كنت ترغب في تحديد خيار التحكم عن بعد لـ `webdriverio`، يمكنك القيام بذلك:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## نصائح وتلميحات

### التجميع والتدقيق

لتكون آمنًا تمامًا، قد تفكر في اتباع أفضل الممارسات: قم بتجميع التعليمات البرمجية الخاصة بك باستخدام مترجم TypeScript (قم بتشغيل `tsc` أو `npx tsc`) واستخدم [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) الذي يعمل على [خطاف ما قبل الالتزام](https://github.com/typicode/husky).