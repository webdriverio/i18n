---
id: security
title: الأمان
description: "احمِ بيانات الاختبار الحساسة باتباع أفضل ممارسات الأمان وإخفاء كلمات المرور والمفاتيح في السجلات والتقارير."
---

تأخذ WebdriverIO جانب الأمان في الاعتبار عند تقديم الحلول. فيما يلي بعض الطرق لتأمين اختباراتك بشكل أفضل.

## أفضل الممارسات

- لا تقم أبدًا بتضمين البيانات الحساسة بشكل ثابت في الكود إذا كان من الممكن أن يضر كشفها كنص واضح بمؤسستك.
- استخدم آلية (مثل الخزنة vault) لتخزين المفاتيح وكلمات المرور بشكل آمن واسترجاعها عند بدء اختباراتك الشاملة (end-to-end).
- تحقق من عدم كشف أي بيانات حساسة في السجلات ولدى مزود الخدمة السحابية، مثل رموز المصادقة في سجلات الشبكة.

:::info

حتى بالنسبة لبيانات الاختبار، من الضروري التساؤل عما إذا كان بإمكان شخص خبيث، إذا وقعت هذه البيانات في الأيدي الخطأ، استرجاع معلومات أو استخدام تلك الموارد بنية خبيثة.

:::

## إخفاء البيانات الحساسة

إذا كنت تستخدم بيانات حساسة أثناء اختبارك، فمن الضروري التأكد من أنها ليست مرئية للجميع، كما هو الحال في السجلات. أيضًا، عند استخدام مزود خدمة سحابية، غالبًا ما تكون المفاتيح الخاصة متضمنة. يجب إخفاء هذه المعلومات من السجلات والمُبلِّغات (reporters) ونقاط الاتصال الأخرى. فيما يلي بعض حلول الإخفاء لتشغيل الاختبارات دون كشف تلك القيم.

### WebDriverIO

#### إخفاء القيمة النصية للأوامر

يدعم الأمران `addValue` و `setValue` قيمة منطقية mask لإخفاء القيمة في السجلات وكذلك في المُبلِّغات. علاوة على ذلك، ستتلقى الأدوات الأخرى، مثل أدوات الأداء وأدوات الطرف الثالث، النسخة المخفية أيضًا، مما يعزز الأمان.

على سبيل المثال، إذا كنت تستخدم مستخدمًا حقيقيًا من بيئة الإنتاج وتحتاج إلى إدخال كلمة مرور تريد إخفاءها، فأصبح ذلك ممكنًا الآن بما يلي:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

سيؤدي ما سبق إلى إخفاء القيمة النصية من سجلات WDIO كما يلي:

مثال على السجلات:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

ستتعامل المُبلِّغات، مثل مُبلِّغات Allure، وأدوات الطرف الثالث مثل Percy من BrowserStack أيضًا مع النسخة المخفية.
وبالاقتران مع إصدار Appium المناسب، ستكون سجلات Appium أيضًا خالية من بياناتك الحساسة.

:::info

القيود:
  - في Appium، يمكن أن تتسبب الإضافات (plugins) الإضافية في تسريب المعلومات حتى لو طلبنا إخفاءها.
  - يمكن لمزودي الخدمات السحابية استخدام وكيل (proxy) لتسجيل HTTP، مما يتجاوز آلية الإخفاء المطبقة.
  - الأمر `getValue` غير مدعوم. علاوة على ذلك، إذا تم استخدامه على نفس العنصر، فقد يكشف القيمة المقصود إخفاؤها عند استخدام `addValue` أو `setValue`.

الحد الأدنى للإصدار المطلوب:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### الإخفاء في سجلات WDIO

باستخدام إعداد `maskingPatterns`، يمكننا إخفاء المعلومات الحساسة من سجلات WDIO. ومع ذلك، لا تشمل هذه الطريقة سجلات Appium.

على سبيل المثال، إذا كنت تستخدم مزود خدمة سحابية وتستخدم مستوى info، فمن المؤكد تقريبًا أنك "ستسرّب" مفتاح المستخدم كما هو موضح أدناه:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

لمواجهة ذلك، يمكننا تمرير التعبير النمطي `'--key=([^ ]*)'` وستظهر الآن في السجلات

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

يمكنك تحقيق ما سبق عن طريق توفير التعبير النمطي في حقل `maskingPatterns` في الإعدادات.
  - لاستخدام تعبيرات نمطية متعددة، استخدم سلسلة نصية واحدة ولكن بقيم مفصولة بفواصل.
  - لمزيد من التفاصيل حول أنماط الإخفاء، راجع [قسم Masking Patterns في ملف README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * إعدادات الاختبار
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info
الحد الأدنى للإصدار المطلوب:
 - WDIO v9.15.0
:::

:::warning
بالنسبة للأسرار التي يتم تمريرها عبر سطر الأوامر، قد يفشل الإخفاء لأن ملف wdio.conf.ts يتم تحليله في مرحلة لاحقة من دورة التنفيذ. يُوصى بشدة باستخدام متغيرات البيئة في هذه الحالات، فهي أكثر أمانًا بكثير.
:::

#### تعطيل مسجلات WDIO

طريقة أخرى لمنع تسجيل البيانات الحساسة هي خفض مستوى السجل أو جعله صامتًا أو تعطيل المسجل.
يمكن تحقيق ذلك على النحو التالي:

```ts
import logger from '@wdio/logger';

/**
  * تعيين مستوى مسجل WDIO إلى 'silent' قبل *تشغيل الوعد (promise)، مما يساعد على إخفاء المعلومات الحساسة في السجلات.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### حلول الطرف الثالث

#### Appium
يقدم Appium حل الإخفاء الخاص به؛ راجع [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - قد يكون استخدام حلهم معقدًا بعض الشيء. إحدى الطرق، إن أمكن، هي تمرير رمز مميز في السلسلة النصية مثل `@mask@` واستخدامه كتعبير نمطي
 - في بعض إصدارات Appium، يتم تسجيل القيم أيضًا مع فصل كل حرف بفاصلة، لذلك يجب أن نكون حذرين.
 - للأسف، لا تدعم BrowserStack هذا الحل، لكنه يظل مفيدًا محليًا

باستخدام مثال `@mask@` المذكور سابقًا، يمكننا استخدام ملف JSON التالي المسمى `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

ثم مرر اسم ملف JSON إلى حقل `logFilters` في إعدادات خدمة appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

تقدم BrowserStack أيضًا مستوى معينًا من الإخفاء لإخفاء بعض البيانات؛ راجع [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - للأسف، الحل إما كل شيء أو لا شيء، لذلك سيتم إخفاء جميع القيم النصية للأوامر المحددة.