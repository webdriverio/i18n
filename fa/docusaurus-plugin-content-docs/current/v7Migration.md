---
id: v7-migration
title: از v6 به v7
description: "ارتقای یک پروژه WebdriverIO از v6 به v7 با به‌روزرسانی وابستگی‌ها، تبدیل فایل پیکربندی و به‌روزرسانی تعاریف گام (step definitions) در Cucumber."
---

این آموزش برای افرادی است که هنوز از نسخه `v6` در WebdriverIO استفاده می‌کنند و می‌خواهند به `v7` مهاجرت کنند. همان‌طور که در [پست وبلاگ انتشار](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released) ما ذکر شد، تغییرات عمدتاً در پشت صحنه هستند و ارتقا باید فرآیندی ساده باشد.

:::info

اگر از WebdriverIO نسخه `v5` یا پایین‌تر استفاده می‌کنید، لطفاً ابتدا به `v6` ارتقا دهید. لطفاً [راهنمای مهاجرت v6](v6-migration) ما را بررسی کنید.

:::

اگرچه بسیار دوست داشتیم یک فرآیند کاملاً خودکار برای این کار داشته باشیم، اما واقعیت چیز دیگری است. هر کس پیکربندی متفاوتی دارد. هر مرحله را باید به‌عنوان راهنمایی در نظر گرفت و نه چندان به‌عنوان دستورالعمل گام‌به‌گام. اگر در مهاجرت با مشکلی مواجه شدید، در [تماس با ما](https://github.com/webdriverio/codemod/discussions/new) تردید نکنید.

## راه‌اندازی

مشابه مهاجرت‌های دیگر، می‌توانیم از [codemod](https://github.com/webdriverio/codemod) در WebdriverIO استفاده کنیم. در این آموزش از یک [پروژه نمونه (boilerplate)](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) که توسط یکی از اعضای جامعه ارسال شده استفاده می‌کنیم و آن را به‌طور کامل از `v6` به `v7` مهاجرت می‌دهیم.

برای نصب codemod، دستور زیر را اجرا کنید:

```sh
npm install jscodeshift @wdio/codemod
```

#### کامیت‌ها:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## ارتقای وابستگی‌های WebdriverIO

با توجه به اینکه همه نسخه‌های WebdriverIO به یکدیگر وابسته هستند، بهتر است همیشه به یک تگ مشخص، مثلاً `latest`، ارتقا دهید. برای این کار، همه وابستگی‌های مرتبط با WebdriverIO را از فایل `package.json` کپی کرده و آن‌ها را از طریق دستور زیر دوباره نصب می‌کنیم:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

معمولاً وابستگی‌های WebdriverIO بخشی از dev dependencies هستند، هرچند بسته به پروژه شما این موضوع ممکن است متفاوت باشد. پس از این کار، فایل‌های `package.json` و `package-lock.json` شما باید به‌روزرسانی شده باشند. __توجه:__ این‌ها وابستگی‌هایی هستند که در [پروژه نمونه](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) استفاده شده‌اند، وابستگی‌های شما ممکن است متفاوت باشند.

#### کامیت‌ها:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## تبدیل فایل پیکربندی

یک گام اول خوب، شروع با فایل پیکربندی است. در WebdriverIO نسخه `v7` دیگر نیازی به ثبت دستی هیچ‌یک از کامپایلرها نیست. در واقع، آن‌ها باید حذف شوند. این کار را می‌توان به‌طور کاملاً خودکار با codemod انجام داد:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemod هنوز از پروژه‌های TypeScript پشتیبانی نمی‌کند. به [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10) مراجعه کنید. ما در حال کار برای پیاده‌سازی پشتیبانی از آن در آینده نزدیک هستیم. اگر از TypeScript استفاده می‌کنید، لطفاً مشارکت کنید!

:::

#### کامیت‌ها:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## به‌روزرسانی تعاریف گام (Step Definitions)

اگر از Jasmine یا Mocha استفاده می‌کنید، کار شما در اینجا تمام است. آخرین مرحله، به‌روزرسانی importهای Cucumber.js از `cucumber` به `@cucumber/cucumber` است. این کار نیز می‌تواند به‌طور خودکار از طریق codemod انجام شود:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

همین! دیگر هیچ تغییری لازم نیست 🎉

#### کامیت‌ها:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## نتیجه‌گیری

امیدواریم این آموزش کمی شما را در فرآیند مهاجرت به WebdriverIO نسخه `v7` راهنمایی کند. جامعه همچنان در حال بهبود codemod است و آن را با تیم‌های مختلف در سازمان‌های گوناگون آزمایش می‌کند. اگر بازخوردی دارید، در [ثبت یک issue](https://github.com/webdriverio/codemod/issues/new) تردید نکنید، یا اگر در طول فرآیند مهاجرت با مشکل مواجه شدید، [یک بحث را آغاز کنید](https://github.com/webdriverio/codemod/discussions/new).