---
id: sharding
title: شاردینگ
description: "مجموعه تست‌های خود را با گزینه --shard بین چندین ماشین تقسیم کنید تا تست‌ها سریع‌تر اجرا شوند، برای مثال در GitHub Actions."
---

به‌طور پیش‌فرض، WebdriverIO تست‌ها را به‌صورت موازی اجرا می‌کند و تلاش می‌کند از هسته‌های CPU ماشین شما به بهینه‌ترین شکل استفاده کند. برای دستیابی به موازی‌سازی بیشتر، می‌توانید اجرای تست‌های WebdriverIO را با اجرای هم‌زمان تست‌ها روی چندین ماشین، مقیاس‌پذیرتر کنید. ما این حالت اجرا را «شاردینگ» (sharding) می‌نامیم.

## شاردینگ تست‌ها بین چندین ماشین

برای شارد کردن مجموعه تست، `--shard=x/y` را به خط فرمان ارسال کنید. برای مثال، برای تقسیم مجموعه به چهار شارد که هر کدام یک‌چهارم تست‌ها را اجرا می‌کند:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

اکنون، اگر این شاردها را به‌صورت موازی روی کامپیوترهای مختلف اجرا کنید، مجموعه تست شما چهار برابر سریع‌تر به پایان می‌رسد.

## مثال GitHub Actions

GitHub Actions از [شاردینگ تست‌ها بین چندین job](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) با استفاده از گزینه [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) پشتیبانی می‌کند. گزینه matrix برای هر ترکیب ممکن از گزینه‌های ارائه‌شده، یک job جداگانه اجرا می‌کند.

مثال زیر به شما نشان می‌دهد که چگونه یک job را پیکربندی کنید تا تست‌هایتان را روی چهار ماشین به‌صورت موازی اجرا کند. می‌توانید کل تنظیمات pipeline را در پروژه [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml) پیدا کنید.

-   ابتدا یک گزینه matrix به پیکربندی job خود اضافه می‌کنیم که گزینه shard شامل تعداد شاردهایی است که می‌خواهیم ایجاد کنیم. `shard: [1, 2, 3, 4]` چهار شارد ایجاد می‌کند که هر کدام شماره شارد متفاوتی دارند.
-   سپس تست‌های WebdriverIO خود را با گزینه `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` اجرا می‌کنیم. این دستور تست ما برای هر شارد خواهد بود.
-   در نهایت گزارش لاگ wdio خود را در Artifacts مربوط به GitHub Actions آپلود می‌کنیم. این کار باعث می‌شود در صورت شکست یک شارد، لاگ‌ها در دسترس باشند.

pipeline تست به‌صورت زیر تعریف شده است:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

این کار همه شاردها را به‌صورت موازی اجرا می‌کند و زمان اجرای تست‌ها را به یک‌چهارم کاهش می‌دهد:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

کامیت [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) از پروژه [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) را ببینید که شاردینگ را به pipeline تست آن اضافه کرد و به کاهش زمان کلی اجرا از `2:23 min` به `1:30 min` کمک کرد، یعنی کاهشی معادل __۳۷٪__ 🎉.