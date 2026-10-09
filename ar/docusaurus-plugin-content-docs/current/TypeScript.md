---
id: typescript
title: إعداد TypeScript
description: "اكتب اختبارات WebdriverIO بلغة TypeScript باستخدام tsx، وقم بإعداد ملف tsconfig.json وأضف تعريفات الأنواع لأطر العمل والخدمات والأوامر المخصصة."
---

يمكنك كتابة الاختبارات باستخدام [TypeScript](http://www.typescriptlang.org) للحصول على الإكمال التلقائي وأمان الأنواع.

ستحتاج إلى تثبيت [`tsx`](https://github.com/privatenumber/tsx) في `devDependencies`، عبر:

```bash npm2yarn
$ npm install tsx --save-dev
```

سيكتشف WebdriverIO تلقائيًا ما إذا كانت هذه التبعيات مثبتة وسيقوم بترجمة ملف الإعدادات والاختبارات نيابةً عنك. تأكد من وجود ملف `tsconfig.json` في نفس المجلد الذي يوجد فيه ملف إعدادات WDIO.

#### TSConfig مخصص

إذا كنت بحاجة إلى تعيين مسار مختلف لملف `tsconfig.json`، يرجى تعيين متغير البيئة TSCONFIG_PATH بالمسار المطلوب، أو استخدام [إعداد tsConfigPath](/docs/configurationfile) في ملف إعدادات wdio.

بدلاً من ذلك، يمكنك استخدام [متغير البيئة](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) الخاص بـ `tsx`.


#### التحقق من الأنواع

لاحظ أن `tsx` لا يدعم التحقق من الأنواع - إذا كنت ترغب في التحقق من الأنواع، فستحتاج إلى القيام بذلك في خطوة منفصلة باستخدام `tsc`.

## إعداد إطار العمل

يحتاج ملف `tsconfig.json` الخاص بك إلى ما يلي:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

يرجى تجنب استيراد `webdriverio` أو `@wdio/sync` بشكل صريح.
يمكن الوصول إلى أنواع `WebdriverIO` و`WebDriver` من أي مكان بمجرد إضافتها إلى `types` في ملف `tsconfig.json`. إذا كنت تستخدم خدمات أو إضافات WebdriverIO إضافية أو حزمة الأتمتة `devtools`، يرجى إضافتها أيضًا إلى قائمة `types` حيث يوفر الكثير منها تعريفات أنواع إضافية.

## أنواع إطار العمل

بناءً على إطار العمل الذي تستخدمه، ستحتاج إلى إضافة أنواع ذلك الإطار إلى خاصية types في ملف `tsconfig.json`، بالإضافة إلى تثبيت تعريفات الأنواع الخاصة به. وهذا مهم بشكل خاص إذا كنت ترغب في الحصول على دعم الأنواع لمكتبة التأكيدات المدمجة [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

على سبيل المثال، إذا قررت استخدام إطار عمل Mocha، فستحتاج إلى تثبيت `@types/mocha` وإضافته بهذا الشكل لجعل جميع الأنواع متاحة بشكل عام:

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
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

يقوم `jasmine` بتحميل `@types/jasmine`، الذي يوفر `jasmine` و`spyOn` و`expectAsync`. مع `@wdio/jasmine-framework`، تُرجع الدالة العامة `expect` القيمة `void` لمطابقات Jasmine المتزامنة و`Promise` لمطابقات WebdriverIO ومطابقات Jasmine غير المتزامنة. كما يحتوي `expectAsync` أيضًا على مطابقات WebdriverIO. أما تصدير `expect` من `expect-webdriverio` فيحتفظ بمطابقات Jest الخاصة به.

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

إذا كنت تستخدم خدمات تضيف أوامر إلى نطاق المتصفح، فستحتاج أيضًا إلى تضمينها في ملف `tsconfig.json`. على سبيل المثال، إذا كنت تستخدم `@wdio/lighthouse-service`، فتأكد من إضافتها إلى `types` أيضًا، على سبيل المثال:

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

كما أن إضافة الخدمات والمُبلِّغات (reporters) إلى إعدادات TypeScript الخاصة بك تعزز أيضًا أمان الأنواع في ملف إعدادات WebdriverIO.

## تعريفات الأنواع

عند تشغيل أوامر WebdriverIO، تكون جميع الخصائص عادةً محددة الأنواع بحيث لا تضطر للتعامل مع استيراد أنواع إضافية. ومع ذلك، هناك حالات تريد فيها تعريف المتغيرات مسبقًا. لضمان أن تكون هذه المتغيرات آمنة من حيث الأنواع، يمكنك استخدام جميع الأنواع المعرّفة في حزمة [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). على سبيل المثال، إذا كنت ترغب في تعريف الخيار البعيد (remote option) لـ `webdriverio`، يمكنك القيام بما يلي:

```ts
import type { Options } from '@wdio/types'

// هذا مثال على حالة قد ترغب فيها باستيراد الأنواع مباشرةً
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // خطأ: النوع 'string' غير قابل للإسناد إلى النوع 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// في الحالات الأخرى، يمكنك استخدام مساحة الأسماء `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // خيارات الإعدادات الأخرى
}
```

## نصائح وتلميحات

### الترجمة والتدقيق

لتكون في أمان تام، يمكنك التفكير في اتباع أفضل الممارسات: قم بترجمة الكود الخاص بك باستخدام مترجم TypeScript (شغّل `tsc` أو `npx tsc`) واجعل [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) يعمل على [خطاف ما قبل الإيداع (pre-commit hook)](https://github.com/typicode/husky).