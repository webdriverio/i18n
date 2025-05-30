---
id: security
title: الأمان
---

يضع WebdriverIO جانب الأمان في الاعتبار عند تقديم الحلول. فيما يلي بعض الطرق لتأمين اختبارك بشكل أفضل.

# إخفاء البيانات الحساسة

إذا كنت تستخدم بيانات حساسة أثناء الاختبار، فمن الضروري ضمان عدم ظهورها للجميع، مثل ظهورها في السجلات. أيضًا، عند استخدام مزود خدمة سحابية، غالبًا ما تكون المفاتيح الخاصة ضرورية. يجب إخفاء هذه المعلومات من السجلات والتقارير ونقاط الاتصال الأخرى. يقدم ما يلي بعض حلول الإخفاء لتشغيل الاختبارات دون الكشف عن تلك القيم.

## WebDriverIO

### إخفاء قيمة نص الأوامر

تدعم الأوامر `addValue` و`setValue` قيمة إخفاء منطقية لإخفاء البيانات في سجلات WDIO وAppium، وكذلك في التقارير. علاوة على ذلك، ستتلقى الأدوات الأخرى، مثل أدوات الأداء والأدوات الخارجية، أيضًا النسخة المخفية، مما يعزز الأمان.

على سبيل المثال، إذا كنت تستخدم مستخدمًا حقيقيًا للإنتاج وتحتاج إلى إدخال كلمة مرور تريد إخفاءها، فذلك ممكن الآن باستخدام ما يلي:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

سيخفي ما سبق قيمة النص من سجلات WDIO وأيضًا من سجلات Appium.

مثال على السجلات:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

القيود:
  - في Appium، قد تسرب الإضافات الإضافية المعلومات حتى عندما نطلب إخفاء المعلومات.
  - قد يستخدم مزودو الخدمات السحابية وكيلاً لتسجيل HTTP، مما يتجاوز آلية الإخفاء الموضوعة.

:::info

الحد الأدنى من الإصدار المطلوب:
 - WDIO v9.15.0
 - Appium v2.19.0

### الإخفاء في سجلات WDIO

باستخدام تكوين `maskingPatterns`، يمكننا إخفاء المعلومات الحساسة من سجلات WDIO. ومع ذلك، لا يتم تغطية سجلات Appium.

على سبيل المثال، إذا كنت تستخدم مزود خدمة سحابية وتستخدم مستوى المعلومات، فمن المؤكد أنك ستـ "تسرب" مفتاح المستخدم كما هو موضح أدناه:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

لمواجهة ذلك، يمكننا تمرير التعبير العادي `'--key=([^ ]*)'` والآن في السجلات سترى

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

يمكنك تحقيق ما سبق من خلال توفير التعبير العادي لحقل `maskingPatterns` في التكوين.
  - للتعبيرات العادية المتعددة، استخدم سلسلة واحدة ولكن بقيمة مفصولة بفواصل.
  - لمزيد من التفاصيل حول أنماط الإخفاء، راجع [قسم أنماط الإخفاء في ملف README لـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

الحد الأدنى من الإصدار المطلوب:
 - WDIO v9.15.0

### تعطيل مسجلات WDIO

طريقة أخرى لمنع تسجيل البيانات الحساسة هي خفض أو كتم مستوى السجل أو تعطيل المسجل.
يمكن تحقيق ذلك على النحو التالي:

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

## حلول الأطراف الثالثة

### Appium
يقدم Appium حل إخفاء خاص به؛ انظر [مرشح السجل](https://appium.io/docs/en/2.0/guides/log-filters/)
 - قد يكون استخدام حلهم معقدًا. إحدى الطرق إذا كان ذلك ممكنًا هي تمرير رمز في سلسلتك مثل `@mask@` واستخدامه كتعبير عادي
 - في بعض إصدارات Appium، يتم أيضًا تسجيل القيم مع فصل كل حرف بفاصلة، لذلك علينا توخي الحذر.
 - لسوء الحظ، لا يدعم BrowserStack هذا الحل، لكنه لا يزال مفيدًا محليًا
 
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

ثم مرر اسم ملف JSON إلى حقل `logFilters` في تكوين خدمة appium:
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

### BrowserStack

يقدم BrowserStack أيضًا مستوى معين من الإخفاء لإخفاء بعض البيانات؛ انظر [إخفاء البيانات الحساسة](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - لسوء الحظ، الحل هو الكل أو لا شيء، لذا سيتم إخفاء جميع قيم النص للأوامر المقدمة.