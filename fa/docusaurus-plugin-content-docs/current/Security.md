---
id: security
title: امنیت
---

WebdriverIO جنبه امنیتی را هنگام ارائه راه‌حل‌ها در نظر می‌گیرد. در زیر برخی از راه‌های بهبود امنیت آزمون‌های شما آمده است.

# مخفی‌سازی داده‌های حساس

اگر در طول آزمون خود از داده‌های حساس استفاده می‌کنید، ضروری است اطمینان حاصل کنید که آن‌ها برای همه قابل مشاهده نیستند، مانند در گزارش‌ها. همچنین، هنگام استفاده از یک ارائه‌دهنده ابری، اغلب کلیدهای خصوصی دخیل هستند. این اطلاعات باید از گزارش‌ها، گزارشگرها و سایر نقاط تماس پنهان شوند. موارد زیر برخی راه‌حل‌های مخفی‌سازی را برای اجرای آزمون‌ها بدون افشای این مقادیر ارائه می‌دهد.

## WebDriverIO

### مخفی‌سازی مقدار متنی دستورات

دستورات `addValue` و `setValue` از یک مقدار بولین mask پشتیبانی می‌کنند تا در گزارش‌های WDIO و Appium و همچنین گزارشگرها مخفی شوند. علاوه بر این، سایر ابزارها، مانند ابزارهای عملکردی و ابزارهای شخص ثالث، نیز نسخه مخفی‌شده را دریافت می‌کنند که امنیت را افزایش می‌دهد.

به عنوان مثال، اگر از یک کاربر واقعی در محیط تولید استفاده می‌کنید و نیاز به وارد کردن رمز عبوری دارید که می‌خواهید مخفی کنید، اکنون با استفاده از روش زیر امکان‌پذیر است:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

کد بالا مقدار متنی را از گزارش‌های WDIO و همچنین از گزارش‌های Appium پنهان می‌کند.

مثال گزارش‌ها:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

محدودیت‌ها:
  - در Appium، پلاگین‌های اضافی ممکن است اطلاعات را افشا کنند حتی اگر ما درخواست مخفی کردن اطلاعات را داده باشیم.
  - ارائه‌دهندگان ابری ممکن است از یک پروکسی برای ثبت HTTP استفاده کنند که مکانیسم مخفی‌سازی را دور می‌زند.

:::info

حداقل نسخه مورد نیاز:
 - WDIO v9.15.0
 - Appium v2.19.0

### مخفی‌سازی در گزارش‌های WDIO

با استفاده از پیکربندی `maskingPatterns`، می‌توانیم اطلاعات حساس را از گزارش‌های WDIO مخفی کنیم. با این حال، گزارش‌های Appium پوشش داده نمی‌شوند.

به عنوان مثال، اگر از یک ارائه‌دهنده ابری استفاده می‌کنید و از سطح اطلاعات استفاده می‌کنید، پس احتمالاً کلید کاربر را به صورت زیر "نشت" خواهید داد:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

برای مقابله با آن می‌توانیم عبارت منظم `'--key=([^ ]*)'` را ارسال کنیم و اکنون در گزارش‌ها خواهید دید:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

شما می‌توانید به موارد بالا با ارائه عبارت منظم به فیلد `maskingPatterns` پیکربندی دست یابید.
  - برای چندین عبارت منظم، از یک رشته واحد اما با مقدار جدا شده با کاما استفاده کنید.
  - برای اطلاعات بیشتر در مورد الگوهای مخفی‌سازی، به [بخش الگوهای مخفی‌سازی در README لاگر WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

روش دیگر برای جلوگیری از ثبت داده‌های حساس، کاهش یا خاموش کردن سطح گزارش یا غیرفعال کردن لاگر است.
این کار به شکل زیر قابل انجام است:

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
Appium راه‌حل مخفی‌سازی خود را ارائه می‌دهد؛ به [فیلتر گزارش](https://appium.io/docs/en/latest/guides/log-filters/) مراجعه کنید
 - استفاده از راه‌حل آن‌ها می‌تواند پیچیده باشد. یک روش در صورت امکان، ارسال یک توکن در رشته خود مانند `@mask@` و استفاده از آن به عنوان یک عبارت منظم است
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

BrowserStack نیز برخی سطوح مخفی‌سازی را برای پنهان کردن برخی داده‌ها ارائه می‌دهد؛ به [پنهان کردن داده‌های حساس](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) مراجعه کنید
 - متأسفانه، راه‌حل به صورت همه یا هیچ است، بنابراین تمام مقادیر متنی دستورات ارائه شده مخفی خواهند شد.