---
id: security
title: الأمان
---

يضع WebdriverIO جانب الأمان في الاعتبار عند تقديم الحلول. فيما يلي بعض الطرق لتأمين اختباراتك بشكل أفضل.

## أفضل الممارسات

- لا تقم أبدًا بتضمين البيانات الحساسة في التعليمات البرمجية التي يمكن أن تضر بمؤسستك إذا تم كشفها بنص واضح.
- استخدم آلية (مثل خزنة) لتخزين المفاتيح وكلمات المرور بشكل آمن واستردادها عند بدء اختبارات النهاية إلى النهاية.
- تحقق من عدم كشف أي بيانات حساسة في السجلات ومن قبل مزود الخدمة السحابية، مثل رموز المصادقة في سجلات الشبكة.

:::info

حتى بالنسبة لبيانات الاختبار، من الضروري التساؤل عما إذا كان بإمكان شخص ذو نوايا سيئة، في حال وقوعها في الأيدي الخطأ، استرداد المعلومات أو استخدام تلك الموارد بقصد ضار.

:::

## إخفاء البيانات الحساسة

إذا كنت تستخدم بيانات حساسة أثناء الاختبار، فمن الضروري التأكد من أنها غير مرئية للجميع، مثل السجلات. أيضًا، عند استخدام مزود سحابي، غالبًا ما تكون المفاتيح الخاصة متضمنة. يجب إخفاء هذه المعلومات من السجلات والتقارير ونقاط الاتصال الأخرى. فيما يلي بعض حلول الإخفاء لتشغيل الاختبارات دون كشف تلك القيم.

### WebDriverIO

#### إخفاء قيمة نص الأوامر

تدعم الأوامر `addValue` و`setValue` قيمة إخفاء منطقية للإخفاء في السجلات وكذلك في التقارير. علاوة على ذلك، ستتلقى الأدوات الأخرى، مثل أدوات الأداء والأدوات الخارجية، أيضًا نسخة مخفية، مما يعزز الأمان.

على سبيل المثال، إذا كنت تستخدم مستخدمًا حقيقيًا للإنتاج وتحتاج إلى إدخال كلمة مرور ترغب في إخفائها، فيمكنك الآن القيام بذلك على النحو التالي:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

سيؤدي ما سبق إلى إخفاء قيمة النص من سجلات WDIO على النحو التالي:

مثال السجلات:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

ستتعامل أيضًا التقارير، مثل تقارير Allure، والأدوات الخارجية مثل Percy من BrowserStack مع النسخة المخفية.
إذا كانت مقترنة بإصدار Appium المناسب، فستكون سجلات Appium أيضًا معفاة من بياناتك الحساسة.

:::info

القيود:
  - في Appium، يمكن أن تتسرب الإضافات الإضافية حتى لو طلبنا إخفاء المعلومات.
  - يمكن لمزودي الخدمة السحابية استخدام وكيل لتسجيل HTTP، مما يتجاوز آلية الإخفاء الموضوعة.
  - الأمر `getValue` غير مدعوم. علاوة على ذلك، إذا تم استخدامه على نفس العنصر، فقد يكشف القيمة المراد إخفاؤها عند استخدام `addValue` أو `setValue`.

الحد الأدنى للإصدار المطلوب:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### الإخفاء في سجلات WDIO

باستخدام تكوين `maskingPatterns`، يمكننا إخفاء المعلومات الحساسة من سجلات WDIO. ومع ذلك، لا يتم تغطية سجلات Appium.

على سبيل المثال، إذا كنت تستخدم مزود سحابي وتستخدم مستوى المعلومات، فمن المؤكد أنك ستـ"تسرب" مفتاح المستخدم كما هو موضح أدناه:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

لمواجهة ذلك، يمكننا تمرير التعبير العادي `'--key=([^ ]*)'` والآن في السجلات سترى

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

يمكنك تحقيق ما سبق من خلال توفير التعبير العادي لحقل `maskingPatterns` في التكوين.
  - للتعبيرات العادية المتعددة، استخدم سلسلة واحدة ولكن بقيمة مفصولة بفواصل.
  - لمزيد من التفاصيل حول أنماط الإخفاء، راجع [قسم أنماط الإخفاء في ملف README لمسجل WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

#### تعطيل مسجلات WDIO

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

### حلول الأطراف الثالثة

#### Appium
يقدم Appium حل الإخفاء الخاص به؛ انظر [تصفية السجل](https://appium.io/docs/en/latest/guides/log-filters/)
 - يمكن أن يكون استخدام حلهم صعبًا. إحدى الطرق إذا كان ذلك ممكنًا هي تمرير رمز في سلسلتك مثل `@mask@` واستخدامه كتعبير عادي
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

ثم قم بتمرير اسم ملف JSON إلى حقل `logFilters` في تكوين خدمة appium:
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

يقدم BrowserStack أيضًا بعض مستويات الإخفاء لإخفاء بعض البيانات؛ انظر [إخفاء البيانات الحساسة](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - لسوء الحظ، فإن الحل هو كل شيء أو لا شيء، لذا سيتم إخفاء جميع قيم النص للأوامر المقدمة.