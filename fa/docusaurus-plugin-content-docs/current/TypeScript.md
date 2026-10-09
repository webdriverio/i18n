---
id: typescript
title: راه‌اندازی TypeScript
description: "تست‌های WebdriverIO را با TypeScript و tsx بنویسید، فایل tsconfig.json را تنظیم کنید و تعاریف نوع را برای فریم‌ورک‌ها، سرویس‌ها و دستورات سفارشی اضافه کنید."
---

شما می‌توانید تست‌ها را با استفاده از [TypeScript](http://www.typescriptlang.org) بنویسید تا از تکمیل خودکار و ایمنی نوع (type safety) بهره‌مند شوید.

شما باید [`tsx`](https://github.com/privatenumber/tsx) را در `devDependencies` نصب کنید، از طریق:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO به طور خودکار تشخیص می‌دهد که آیا این وابستگی‌ها نصب شده‌اند یا خیر و پیکربندی و تست‌های شما را کامپایل می‌کند. اطمینان حاصل کنید که یک فایل `tsconfig.json` در همان دایرکتوری پیکربندی WDIO خود دارید.

#### TSConfig سفارشی

اگر نیاز دارید مسیر متفاوتی برای `tsconfig.json` تنظیم کنید، لطفاً متغیر محیطی TSCONFIG_PATH را با مسیر دلخواه خود تنظیم کنید، یا از [تنظیم tsConfigPath](/docs/configurationfile) در پیکربندی wdio استفاده کنید.

به عنوان جایگزین، می‌توانید از [متغیر محیطی](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) مربوط به `tsx` استفاده کنید.


#### بررسی نوع

توجه داشته باشید که `tsx` از بررسی نوع (type-checking) پشتیبانی نمی‌کند - اگر می‌خواهید نوع‌های خود را بررسی کنید، باید این کار را در یک مرحله جداگانه با `tsc` انجام دهید.

## راه‌اندازی فریم‌ورک

فایل `tsconfig.json` شما به موارد زیر نیاز دارد:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

لطفاً از import کردن صریح `webdriverio` یا `@wdio/sync` خودداری کنید.
نوع‌های `WebdriverIO` و `WebDriver` پس از اضافه شدن به `types` در `tsconfig.json` از هر جایی قابل دسترسی هستند. اگر از سرویس‌ها، پلاگین‌های اضافی WebdriverIO یا بسته اتوماسیون `devtools` استفاده می‌کنید، لطفاً آن‌ها را نیز به لیست `types` اضافه کنید، زیرا بسیاری از آن‌ها نوع‌های اضافی ارائه می‌دهند.

## نوع‌های فریم‌ورک

بسته به فریم‌ورکی که استفاده می‌کنید، باید نوع‌های آن فریم‌ورک را به ویژگی types در `tsconfig.json` اضافه کنید و همچنین تعاریف نوع آن را نصب کنید. این موضوع به ویژه زمانی اهمیت دارد که بخواهید از پشتیبانی نوع برای کتابخانه assertion داخلی [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) بهره‌مند شوید.

به عنوان مثال، اگر تصمیم دارید از فریم‌ورک Mocha استفاده کنید، باید `@types/mocha` را نصب کرده و آن را به این صورت اضافه کنید تا همه نوع‌ها به صورت سراسری در دسترس باشند:

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

`jasmine` بسته `@types/jasmine` را بارگذاری می‌کند که `jasmine`، `spyOn` و `expectAsync` را فراهم می‌کند. با `@wdio/jasmine-framework`، تابع سراسری `expect` برای matcherهای همگام Jasmine مقدار `void` و برای matcherهای WebdriverIO و matcherهای ناهمگام Jasmine یک `Promise` برمی‌گرداند. `expectAsync` نیز matcherهای WebdriverIO را دارد. خروجی `expect` از `expect-webdriverio` matcherهای Jest خود را حفظ می‌کند.

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

اگر از سرویس‌هایی استفاده می‌کنید که دستوراتی را به محدوده browser اضافه می‌کنند، باید آن‌ها را نیز در `tsconfig.json` خود قرار دهید. به عنوان مثال، اگر از `@wdio/lighthouse-service` استفاده می‌کنید، اطمینان حاصل کنید که آن را نیز به `types` اضافه کرده‌اید، برای مثال:

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

افزودن سرویس‌ها و گزارش‌دهنده‌ها (reporters) به پیکربندی TypeScript شما، ایمنی نوع فایل پیکربندی WebdriverIO شما را نیز تقویت می‌کند.

## تعاریف نوع

هنگام اجرای دستورات WebdriverIO، معمولاً همه ویژگی‌ها دارای نوع هستند، بنابراین نیازی به import کردن نوع‌های اضافی ندارید. با این حال، مواردی وجود دارد که می‌خواهید متغیرها را از قبل تعریف کنید. برای اطمینان از ایمن بودن نوع آن‌ها، می‌توانید از تمام نوع‌های تعریف شده در بسته [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) استفاده کنید. به عنوان مثال، اگر می‌خواهید گزینه remote را برای `webdriverio` تعریف کنید، می‌توانید به این صورت عمل کنید:

```ts
import type { Options } from '@wdio/types'

// در اینجا مثالی آمده است که ممکن است بخواهید نوع‌ها را مستقیماً import کنید
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // خطا: نوع 'string' قابل انتساب به نوع 'number' نیست.ts(2322)
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

### کامپایل و Lint

برای اطمینان کامل، می‌توانید بهترین شیوه‌ها را دنبال کنید: کد خود را با کامپایلر TypeScript کامپایل کنید (`tsc` یا `npx tsc` را اجرا کنید) و [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) را روی [pre-commit hook](https://github.com/typicode/husky) اجرا کنید.