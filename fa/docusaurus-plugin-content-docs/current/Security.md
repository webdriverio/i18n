---
id: security
title: امنیت
---

WebdriverIO به جنبه امنیتی در ارائه راهکارها توجه دارد. در زیر برخی از روش‌ها برای افزایش امنیت آزمون‌های شما آمده است.

## بهترین شیوه‌ها

- هرگز داده‌های حساسی که در صورت افشا شدن به صورت متن ساده می‌تواند به سازمان شما آسیب برساند، به صورت هاردکد ننویسید.
- از مکانیزمی (مانند خزانه) برای ذخیره‌سازی ایمن کلیدها و رمزهای عبور استفاده کنید و هنگام شروع آزمون‌های انتها به انتها، آن‌ها را بازیابی کنید.
- اطمینان حاصل کنید که هیچ داده حساسی در گزارش‌ها و توسط ارائه‌دهنده خدمات ابری، مانند توکن‌های احراز هویت در گزارش‌های شبکه، افشا نمی‌شود.

:::info

حتی برای داده‌های آزمایشی، ضروری است بپرسید که آیا در صورت قرار گرفتن در دست اشخاص نادرست، یک فرد بدخواه می‌تواند اطلاعات را بازیابی کند یا از آن منابع با اهداف مخرب استفاده کند.

:::

## پنهان‌سازی داده‌های حساس

اگر از داده‌های حساس در طول آزمون خود استفاده می‌کنید، ضروری است اطمینان حاصل کنید که این داده‌ها برای همه قابل مشاهده نیستند، مانند گزارش‌ها. همچنین، هنگام استفاده از یک ارائه‌دهنده خدمات ابری، اغلب کلیدهای خصوصی درگیر هستند. این اطلاعات باید از گزارش‌ها، گزارش‌دهنده‌ها و سایر نقاط تماس پنهان شوند. موارد زیر برخی راه‌حل‌های پنهان‌سازی را برای اجرای آزمون‌ها بدون افشای این مقادیر ارائه می‌دهد.

### WebDriverIO

#### پنهان‌سازی مقدار متنی دستورات

دستورات `addValue` و `setValue` از یک مقدار بولی mask برای پنهان‌سازی در گزارش‌ها و همچنین گزارش‌دهنده‌ها پشتیبانی می‌کنند. علاوه بر این، ابزارهای دیگر، مانند ابزارهای عملکرد و ابزارهای شخص ثالث، نسخه ماسک شده را دریافت می‌کنند که امنیت را افزایش می‌دهد.

به عنوان مثال، اگر از یک کاربر واقعی در محیط تولید استفاده می‌کنید و نیاز به وارد کردن رمز عبوری دارید که می‌خواهید پنهان کنید، اکنون با روش زیر امکان‌پذیر است:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

کد فوق مقدار متنی را از گزارش‌های WDIO به صورت زیر پنهان می‌کند:

مثال گزارش‌ها:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

گزارش‌دهنده‌ها، مانند گزارش‌دهنده‌های Allure، و ابزارهای شخص ثالث مانند Percy از BrowserStack نیز نسخه ماسک شده را مدیریت می‌کنند.
با نسخه مناسب Appium، گزارش‌های Appium نیز از داده‌های حساس شما مستثنی خواهند بود.

:::info

محدودیت‌ها:
  - در Appium، افزونه‌های اضافی ممکن است حتی با وجود درخواست ماسک کردن اطلاعات، آن‌ها را نشت دهند.
  - ارائه‌دهندگان خدمات ابری ممکن است از یک پروکسی برای گزارش HTTP استفاده کنند که مکانیزم ماسک را دور می‌زند.
  - دستور `getValue` پشتیبانی نمی‌شود. علاوه بر این، اگر روی همان عنصر استفاده شود، می‌تواند مقداری را که قصد داشتید هنگام استفاده از `addValue` یا `setValue` ماسک شود، افشا کند.

حداقل نسخه مورد نیاز:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### ماسک کردن در گزارش‌های WDIO

با استفاده از پیکربندی `maskingPatterns`، می‌توانیم اطلاعات حساس را از گزارش‌های WDIO پنهان کنیم. با این حال، گزارش‌های Appium پوشش داده نمی‌شوند.

به عنوان مثال، اگر از یک ارائه‌دهنده خدمات ابری استفاده می‌کنید و از سطح اطلاعات استفاده می‌کنید، بیشتر اوقات کلید کاربر "نشت" می‌کند، همانطور که در زیر نشان داده شده است:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

برای مقابله با این موضوع، می‌توانیم عبارت منظم `'--key=([^ ]*)'` را ارائه دهیم و اکنون در گزارش‌ها خواهید دید

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

شما می‌توانید با ارائه عبارت منظم به فیلد `maskingPatterns` پیکربندی، به موارد بالا دست یابید.
  - برای چندین عبارت منظم، از یک رشته واحد اما با مقادیر جدا شده با کاما استفاده کنید.
  - برای جزئیات بیشتر در مورد الگوهای ماسک، به [بخش الگوهای ماسک در README لاگر WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

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

:::

#### غیرفعال کردن لاگرهای WDIO

روش دیگر برای مسدود کردن ثبت داده‌های حساس، کاهش یا خاموش کردن سطح گزارش یا غیرفعال کردن لاگر است.
می‌توان به صورت زیر به آن دست یافت:

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

### راه‌حل‌های شخص ثالث

#### Appium
Appium راه‌حل ماسک خود را ارائه می‌دهد؛ به [Log filter](https://appium.io/docs/en/latest/guides/log-filters/) مراجعه کنید
 - استفاده از راه‌حل آن‌ها می‌تواند پیچیده باشد. یک روش، در صورت امکان، ارسال یک توکن در رشته خود مانند `@mask@` و استفاده از آن به عنوان یک عبارت منظم است
 - در برخی نسخه‌های Appium، مقادیر همچنین با هر کاراکتر جدا شده با کاما ثبت می‌شوند، بنابراین باید مراقب باشیم.
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

#### BrowserStack

BrowserStack همچنین سطحی از ماسک کردن را برای پنهان کردن برخی داده‌ها ارائه می‌دهد؛ به [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) مراجعه کنید
 - متأسفانه، راه‌حل یا همه یا هیچ است، بنابراین تمام مقادیر متنی دستورات ارائه شده ماسک خواهند شد.