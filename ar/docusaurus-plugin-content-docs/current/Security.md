---
id: security
title: الأمان
description: "احمِ بيانات الاختبار الحساسة باتباع أفضل ممارسات الأمان وإخفاء كلمات المرور والمفاتيح في السجلات والتقارير."
---

يضع WebdriverIO جانب الأمان في الاعتبار عند تقديم الحلول. فيما يلي بعض الطرق لتأمين اختباراتك بشكل أفضل.

## أفضل الممارسات

- لا تقم أبدًا بكتابة البيانات الحساسة بشكل ثابت في الكود إذا كان كشفها كنص واضح قد يُلحق الضرر بمؤسستك.
- استخدم آلية (مثل الخزنة vault) لتخزين المفاتيح وكلمات المرور بشكل آمن واسترجاعها عند بدء اختبارات end-to-end الخاصة بك.
- تحقق من عدم كشف أي بيانات حساسة في السجلات أو من قِبل مزود الخدمة السحابية، مثل رموز المصادقة (authentication tokens) في سجلات الشبكة (Network Logs).

:::info

حتى بالنسبة لبيانات الاختبار، من الضروري أن تسأل نفسك عمّا إذا كان بإمكان شخص خبيث، إذا وقعت هذه البيانات في الأيدي الخطأ، استرجاع معلومات أو استخدام تلك الموارد بنية سيئة.

:::

## إخفاء البيانات الحساسة

إذا كنت تستخدم بيانات حساسة أثناء اختبارك، فمن الضروري التأكد من أنها غير مرئية للجميع، كما في السجلات مثلًا. كذلك، عند استخدام مزود خدمة سحابية، غالبًا ما تكون هناك مفاتيح خاصة معنية بالأمر. يجب إخفاء هذه المعلومات من السجلات والمُبلِّغات (reporters) ونقاط التماس الأخرى. فيما يلي بعض حلول الإخفاء لتشغيل الاختبارات دون كشف تلك القيم.

### WebDriverIO

#### إخفاء القيمة النصية للأوامر

يدعم الأمران `addValue` و`setValue` قيمة منطقية (boolean) باسم mask لإخفاء القيمة في السجلات وكذلك في المُبلِّغات. علاوة على ذلك، ستتلقى الأدوات الأخرى، مثل أدوات الأداء وأدوات الطرف الثالث، النسخة المخفية أيضًا، مما يعزز الأمان.

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

ستتعامل المُبلِّغات، مثل مُبلِّغات Allure، وأدوات الطرف الثالث مثل Percy من BrowserStack، مع النسخة المخفية أيضًا.
وبالاقتران مع إصدار Appium المناسب، ستكون سجلات Appium أيضًا خالية من بياناتك الحساسة.

:::info

القيود:
  - في Appium، قد تتسبب إضافات (plugins) إضافية في تسريب المعلومات حتى لو طلبنا إخفاءها.
  - قد يستخدم مزودو الخدمات السحابية وكيلًا (proxy) لتسجيل HTTP، مما يتجاوز آلية الإخفاء المعمول بها.
  - الأمر `getValue` غير مدعوم. علاوة على ذلك، إذا استُخدم على نفس العنصر، فقد يكشف القيمة المراد إخفاؤها عند استخدام `addValue` أو `setValue`.

الحد الأدنى للإصدار المطلوب:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### الإخفاء في سجلات WDIO

باستخدام إعداد `maskingPatterns`، يمكننا إخفاء المعلومات الحساسة من سجلات WDIO. ومع ذلك، لا تشمل هذه الآلية سجلات Appium.

على سبيل المثال، إذا كنت تستخدم مزود خدمة سحابية وتستخدم مستوى info، فمن المؤكد تقريبًا أنك ستقوم بـ"تسريب" مفتاح المستخدم كما هو موضح أدناه:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

لمواجهة ذلك، يمكننا تمرير التعبير النمطي `'--key=([^ ]*)'` وستظهر لك الآن في السجلات

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

يمكنك تحقيق ما سبق من خلال تمرير التعبير النمطي إلى الحقل `maskingPatterns` في الإعدادات.
  - لتعابير نمطية متعددة، استخدم سلسلة نصية واحدة ولكن بقيم مفصولة بفواصل.
  - لمزيد من التفاصيل حول أنماط الإخفاء، راجع [قسم Masking Patterns في ملف README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
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
بالنسبة للأسرار التي تُمرَّر عبر سطر الأوامر، قد يفشل الإخفاء لأن ملف wdio.conf.ts يُحلَّل في مرحلة لاحقة من دورة التنفيذ. يُوصى بشدة باستخدام متغيرات البيئة في هذه الحالات، فهي أكثر أمانًا بكثير.
:::

#### تعطيل مُسجِّلات WDIO

طريقة أخرى لمنع تسجيل البيانات الحساسة هي خفض مستوى السجل أو جعله صامتًا أو تعطيل المُسجِّل.
يمكن تحقيق ذلك كما يلي:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
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
 - في بعض إصدارات Appium، تُسجَّل القيم أيضًا مع فصل كل حرف بفاصلة، لذا يجب أن نكون حذرين.
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

ثم مرِّر اسم ملف JSON إلى الحقل `logFilters` في إعدادات خدمة appium:
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
 - للأسف، الحل إما كل شيء أو لا شيء، لذا ستُخفى جميع القيم النصية للأوامر المحددة.