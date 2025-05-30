---
id: security
title: امنیت
---

WebdriverIO جنبه امنیتی را هنگام ارائه راه‌حل‌ها در نظر دارد. در زیر برخی روش‌ها برای امن‌تر کردن آزمون شما آمده است.

# پنهان‌سازی داده‌های حساس

اگر در طول آزمون خود از داده‌های حساس استفاده می‌کنید، ضروری است اطمینان حاصل کنید که برای همه قابل مشاهده نیستند، مانند در لاگ‌ها. همچنین، هنگام استفاده از یک ارائه‌دهنده ابری، کلیدهای خصوصی اغلب درگیر هستند. این اطلاعات باید از لاگ‌ها، گزارش‌دهنده‌ها و سایر نقاط تماس پنهان شوند. موارد زیر برخی راه‌حل‌های پنهان‌سازی را برای اجرای آزمون‌ها بدون افشای این مقادیر ارائه می‌دهد.

## WebDriverIO

### پنهان‌سازی مقدار متنی دستورات

دستورات `addValue` و `setValue` از یک مقدار بولین برای پنهان‌سازی در لاگ‌های WDIO و Appium و همچنین گزارش‌دهنده‌ها پشتیبانی می‌کنند. علاوه بر این، سایر ابزارها، مانند ابزارهای عملکردی و ابزارهای شخص ثالث، نیز نسخه پنهان‌شده را دریافت می‌کنند که امنیت را افزایش می‌دهد.

به عنوان مثال، اگر از یک کاربر واقعی تولیدی استفاده می‌کنید و نیاز به وارد کردن رمز عبوری دارید که می‌خواهید پنهان کنید، اکنون با موارد زیر امکان‌پذیر است:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

موارد بالا مقدار متنی را از لاگ‌های WDIO و همچنین از لاگ‌های Appium پنهان می‌کند.

مثال لاگ‌ها:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

محدودیت‌ها:
  - در Appium، افزونه‌های اضافی می‌توانند اطلاعات را نشت دهند حتی اگر ما درخواست کنیم اطلاعات را پنهان کنیم.
  - ارائه‌دهندگان ابری ممکن است از یک پروکسی برای ثبت HTTP استفاده کنند که مکانیسم پنهان‌سازی را دور می‌زند.

:::info

حداقل نسخه مورد نیاز:
 - WDIO v9.15.0
 - Appium v2.19.0

### پنهان‌سازی در لاگ‌های WDIO

با استفاده از پیکربندی `maskingPatterns`، می‌توانیم اطلاعات حساس را از لاگ‌های WDIO پنهان کنیم. با این حال، لاگ‌های Appium پوشش داده نمی‌شوند.

به عنوان مثال، اگر از یک ارائه‌دهنده ابری استفاده می‌کنید و از سطح اطلاعات استفاده می‌کنید، پس به احتمال زیاد کلید کاربر را "نشت" خواهید داد، همانطور که در زیر نشان داده شده است:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

برای مقابله با این مشکل می‌توانیم عبارت منظم `'--key=([^ ]*)'` را ارسال کنیم و اکنون در لاگ‌ها خواهید دید:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

می‌توانید با ارائه عبارت منظم به فیلد `maskingPatterns` پیکربندی، به موارد بالا دست یابید.
  - برای چندین عبارت منظم، از یک رشته واحد اما با مقدار جدا شده با کاما استفاده کنید.
  - برای اطلاعات بیشتر در مورد الگوهای پنهان‌سازی، بخش [Masking Patterns در README Logger WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) را ببینید.

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

حداقل نسخه مورد نیاز:
 - WDIO v9.15.0

### غیرفعال کردن لاگرهای WDIO

راه دیگر برای جلوگیری از ثبت داده‌های حساس، کاهش یا خاموش کردن سطح لاگ یا غیرفعال کردن لاگر است.
می‌توان به شکل زیر انجام داد:

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

## راه‌حل‌های شخص ثالث

### Appium
Appium راه‌حل پنهان‌سازی خود را ارائه می‌دهد؛ به [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/) مراجعه کنید
 - استفاده از راه‌حل آنها می‌تواند پیچیده باشد. یک راه در صورت امکان این است که یک توکن در رشته خود مانند `@mask@` قرار دهید و از آن به عنوان یک عبارت منظم استفاده کنید
 - در برخی نسخه‌های Appium، مقادیر همچنین با هر کاراکتر جدا شده با کاما ثبت می‌شوند، بنابراین باید مراقب باشیم
 - متأسفانه، BrowserStack از این راه‌حل پشتیبانی نمی‌کند، اما هنوز به صورت محلی مفید است
 
با استفاده از مثال `@mask@` که قبلاً ذکر شد، می‌توانیم از فایل JSON زیر با نام `appiumMaskLogFilters.json` استفاده کنیم
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

سپس نام فایل JSON را به فیلد `logFilters` در پیکربندی سرویس appium ارسال کنید:
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

BrowserStack نیز سطحی از پنهان‌سازی را برای مخفی کردن برخی داده‌ها ارائه می‌دهد؛ به [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) مراجعه کنید
 - متأسفانه، راه‌حل همه یا هیچ است، بنابراین تمام مقادیر متنی دستورات ارائه شده پنهان خواهند شد.