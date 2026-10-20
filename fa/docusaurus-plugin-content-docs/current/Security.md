---
id: security
title: امنیت
description: "با پیروی از بهترین شیوه‌های امنیتی و پنهان‌سازی رمزهای عبور و کلیدها در لاگ‌ها و گزارش‌ها، از داده‌های حساس تست محافظت کنید."
---

WebdriverIO هنگام ارائه راه‌حل‌ها، جنبه امنیتی را در نظر دارد. در ادامه چند روش برای ایمن‌سازی بهتر تست‌های شما آورده شده است.

## بهترین شیوه‌ها

- هرگز داده‌های حساسی را که در صورت افشا به‌صورت متن ساده می‌توانند به سازمان شما آسیب برسانند، به‌صورت hardcode در کد قرار ندهید.
- از یک سازوکار (مانند vault) برای ذخیره‌سازی ایمن کلیدها و رمزهای عبور و بازیابی آن‌ها هنگام شروع تست‌های end-to-end خود استفاده کنید.
- اطمینان حاصل کنید که هیچ داده حساسی در لاگ‌ها و توسط ارائه‌دهنده ابری افشا نمی‌شود، مانند توکن‌های احراز هویت در لاگ‌های شبکه (Network Logs).

:::info

حتی برای داده‌های تست نیز ضروری است این سؤال را بپرسید که آیا در صورت افتادن به دست افراد نادرست، یک فرد مخرب می‌تواند اطلاعاتی را بازیابی کند یا از آن منابع با نیت بد استفاده کند.

:::

## پنهان‌سازی داده‌های حساس

اگر در طول تست خود از داده‌های حساس استفاده می‌کنید، ضروری است اطمینان حاصل کنید که این داده‌ها برای همه قابل مشاهده نیستند، مثلاً در لاگ‌ها. همچنین، هنگام استفاده از یک ارائه‌دهنده ابری، اغلب کلیدهای خصوصی در کار هستند. این اطلاعات باید از لاگ‌ها، گزارش‌دهنده‌ها (reporters) و سایر نقاط تماس پنهان شوند. در ادامه چند راه‌حل پنهان‌سازی برای اجرای تست‌ها بدون افشای این مقادیر ارائه شده است.

### WebDriverIO

#### پنهان‌سازی مقدار متنی دستورات

دستورات `addValue` و `setValue` از یک مقدار بولی mask برای پنهان‌سازی در لاگ‌ها و همچنین گزارش‌دهنده‌ها پشتیبانی می‌کنند. علاوه بر این، ابزارهای دیگر، مانند ابزارهای عملکرد (performance) و ابزارهای شخص ثالث، نیز نسخه پنهان‌شده را دریافت خواهند کرد که باعث افزایش امنیت می‌شود.

برای مثال، اگر از یک کاربر واقعی محیط production استفاده می‌کنید و نیاز دارید رمز عبوری را وارد کنید که می‌خواهید پنهان شود، اکنون این کار به شکل زیر امکان‌پذیر است:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // دریافت فوکوس
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

کد بالا مقدار متنی را در لاگ‌های WDIO به شکل زیر پنهان می‌کند:

نمونه لاگ:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

گزارش‌دهنده‌ها، مانند گزارش‌دهنده‌های Allure، و ابزارهای شخص ثالث مانند Percy از BrowserStack نیز با نسخه پنهان‌شده کار خواهند کرد.
در صورت استفاده همراه با نسخه مناسب Appium، لاگ‌های Appium نیز عاری از داده‌های حساس شما خواهند بود.

:::info

محدودیت‌ها:
  - در Appium، پلاگین‌های اضافی ممکن است اطلاعات را نشت دهند، حتی اگر ما درخواست پنهان‌سازی اطلاعات را داده باشیم.
  - ارائه‌دهندگان ابری ممکن است از یک پروکسی برای ثبت لاگ HTTP استفاده کنند که سازوکار پنهان‌سازی پیاده‌شده را دور می‌زند.
  - دستور `getValue` پشتیبانی نمی‌شود. علاوه بر این، اگر روی همان عنصر استفاده شود، می‌تواند مقداری را که قرار بوده هنگام استفاده از `addValue` یا `setValue` پنهان شود، افشا کند.

حداقل نسخه مورد نیاز:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### پنهان‌سازی در لاگ‌های WDIO

با استفاده از پیکربندی `maskingPatterns`، می‌توانیم اطلاعات حساس را از لاگ‌های WDIO پنهان کنیم. با این حال، لاگ‌های Appium پوشش داده نمی‌شوند.

برای مثال، اگر از یک ارائه‌دهنده ابری استفاده می‌کنید و از سطح info استفاده می‌کنید، به احتمال زیاد کلید کاربر را همان‌طور که در زیر نشان داده شده "نشت" خواهید داد:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

برای مقابله با این مشکل می‌توانیم عبارت باقاعده (regular expression) `'--key=([^ ]*)'` را ارسال کنیم و اکنون در لاگ‌ها خواهید دید:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

می‌توانید با ارائه عبارت باقاعده به فیلد `maskingPatterns` در پیکربندی، به نتیجه بالا برسید.
  - برای چندین عبارت باقاعده، از یک رشته واحد اما با مقادیر جداشده با کاما استفاده کنید.
  - برای جزئیات بیشتر درباره الگوهای پنهان‌سازی، به [بخش Masking Patterns در README مربوط به WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) مراجعه کنید.

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * پیکربندی‌های تست
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

:::warning
برای اطلاعات محرمانه‌ای که از طریق خط فرمان ارسال می‌شوند، پنهان‌سازی ممکن است با شکست مواجه شود، زیرا فایل wdio.conf.ts در مراحل بعدی چرخه اجرا تجزیه می‌شود. استفاده از متغیرهای محیطی برای این موارد به‌شدت توصیه می‌شود و بسیار ایمن‌تر است.
:::

#### غیرفعال‌سازی لاگرهای WDIO

راه دیگر برای جلوگیری از ثبت داده‌های حساس در لاگ، کاهش یا بی‌صدا کردن سطح لاگ یا غیرفعال کردن لاگر است.
این کار را می‌توان به شکل زیر انجام داد:

```ts
import logger from '@wdio/logger';

/**
  * سطح لاگر WDIO را پیش از *اجرای یک promise روی 'silent' تنظیم می‌کند که به پنهان کردن اطلاعات حساس در لاگ‌ها کمک می‌کند.
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
Appium راه‌حل پنهان‌سازی خود را ارائه می‌دهد؛ به [Log filter](https://appium.io/docs/en/latest/guides/log-filters/) مراجعه کنید
 - استفاده از راه‌حل آن‌ها ممکن است دشوار باشد. یک روش، در صورت امکان، این است که یک توکن مانند `@mask@` را در رشته خود قرار دهید و از آن به‌عنوان یک عبارت باقاعده استفاده کنید
 - در برخی از نسخه‌های Appium، مقادیر به‌صورت کاراکتر به کاراکتر و جداشده با کاما نیز در لاگ ثبت می‌شوند، بنابراین باید مراقب باشیم.
 - متأسفانه، BrowserStack از این راه‌حل پشتیبانی نمی‌کند، اما همچنان در محیط محلی مفید است

با استفاده از مثال `@mask@` که پیش‌تر ذکر شد، می‌توانیم از فایل JSON زیر با نام `appiumMaskLogFilters.json` استفاده کنیم
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

BrowserStack نیز سطحی از پنهان‌سازی را برای مخفی کردن برخی داده‌ها ارائه می‌دهد؛ به [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) مراجعه کنید
 - متأسفانه، این راه‌حل به‌صورت همه یا هیچ است، بنابراین تمام مقادیر متنی دستورات ارائه‌شده پنهان خواهند شد.