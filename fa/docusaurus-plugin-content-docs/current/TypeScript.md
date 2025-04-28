---
id: typescript
title: راه‌اندازی TypeScript
---

شما می‌توانید تست‌ها را با استفاده از [TypeScript](http://www.typescriptlang.org) بنویسید تا از تکمیل خودکار و ایمنی نوع بهره‌مند شوید.

شما نیاز به نصب [`tsx`](https://github.com/privatenumber/tsx) در `devDependencies` خواهید داشت، از طریق:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO به طور خودکار تشخیص می‌دهد که آیا این وابستگی‌ها نصب شده‌اند و پیکربندی و تست‌های شما را کامپایل می‌کند. اطمینان حاصل کنید که یک `tsconfig.json` در همان دایرکتوری پیکربندی WDIO دارید.

#### TSConfig سفارشی

اگر نیاز به تنظیم مسیر متفاوتی برای `tsconfig.json` دارید، لطفاً متغیر محیطی TSCONFIG_PATH را با مسیر مورد نظر خود تنظیم کنید، یا از تنظیمات [tsConfigPath](/docs/configurationfile) در پیکربندی wdio استفاده کنید.

به طور جایگزین، می‌توانید از [متغیر محیطی](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) برای `tsx` استفاده کنید.


#### بررسی نوع

توجه داشته باشید که `tsx` از بررسی نوع پشتیبانی نمی‌کند - اگر می‌خواهید انواع خود را بررسی کنید، باید این کار را در یک مرحله جداگانه با `tsc` انجام دهید.

## راه‌اندازی چارچوب

فایل `tsconfig.json` شما نیاز به موارد زیر دارد:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

لطفاً از وارد کردن صریح `webdriverio` یا `@wdio/sync` خودداری کنید.
انواع `WebdriverIO` و `WebDriver` از هر جایی پس از اضافه شدن به `types` در `tsconfig.json` قابل دسترسی هستند. اگر از سرویس‌های اضافی WebdriverIO، افزونه‌ها یا بسته اتوماسیون `devtools` استفاده می‌کنید، لطفاً آنها را نیز به لیست `types` اضافه کنید زیرا بسیاری از آنها تایپینگ‌های اضافی ارائه می‌دهند.

## انواع چارچوب

بسته به چارچوبی که استفاده می‌کنید، باید انواع آن چارچوب را به ویژگی `types` در `tsconfig.json` خود اضافه کنید و همچنین تعاریف نوع آن را نصب کنید. این به ویژه زمانی مهم است که می‌خواهید از کتابخانه تأیید داخلی [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) پشتیبانی نوع داشته باشید.

به عنوان مثال، اگر تصمیم به استفاده از چارچوب Mocha دارید، باید `@types/mocha` را نصب کنید و آن را به این صورت اضافه کنید تا همه انواع به صورت جهانی در دسترس باشند:

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

## سرویس‌ها

اگر از سرویس‌هایی استفاده می‌کنید که دستوراتی را به محدوده مرورگر اضافه می‌کنند، باید آنها را نیز در `tsconfig.json` خود قرار دهید. به عنوان مثال، اگر از `@wdio/lighthouse-service` استفاده می‌کنید، اطمینان حاصل کنید که آن را نیز به `types` اضافه کنید، مانند:

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

افزودن سرویس‌ها و گزارشگرها به پیکربندی TypeScript شما همچنین ایمنی نوع فایل پیکربندی WebdriverIO شما را تقویت می‌کند.

## تعاریف نوع

هنگام اجرای دستورات WebdriverIO، تمام ویژگی‌ها معمولاً تایپ می‌شوند به طوری که نیازی به وارد کردن انواع اضافی ندارید. با این حال، مواردی وجود دارد که می‌خواهید متغیرها را از قبل تعریف کنید. برای اطمینان از اینکه اینها از نظر نوع ایمن هستند، می‌توانید از تمام انواع تعریف شده در بسته [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) استفاده کنید. به عنوان مثال، اگر می‌خواهید گزینه‌های از راه دور را برای `webdriverio` تعریف کنید، می‌توانید چنین کنید:

```ts
import type { Options } from '@wdio/types'

// اینجا مثالی است که ممکن است بخواهید انواع را مستقیماً وارد کنید
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// برای موارد دیگر، می‌توانید از فضای نام `WebdriverIO` استفاده کنید
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // سایر گزینه‌های پیکربندی
}
```

## نکات و راهنمایی‌ها

### کامپایل و بررسی کد

برای اطمینان کامل، ممکن است در نظر داشته باشید بهترین روش‌ها را دنبال کنید: کامپایل کد خود با کامپایلر TypeScript (اجرای `tsc` یا `npx tsc`) و داشتن [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) که در [قلاب پیش-کامیت](https://github.com/typicode/husky) اجرا می‌شود.