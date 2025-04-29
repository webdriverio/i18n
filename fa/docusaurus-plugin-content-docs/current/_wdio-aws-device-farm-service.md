---
id: wdio-aws-device-farm-service
title: سرویس AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---


> wdio-aws-device-farm-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service) مراجعه کنید
## سرویس AWS Device Farm برای WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) سرویسی برای WebdriverIO.

این سرویس فقط از تست مرورگر دسکتاپ پشتیبانی می‌کند.

## ارتقا به WebDriverIO v8

این پکیج اکنون از [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) از نسخه v8.0.0 پشتیبانی می‌کند. با این حال، لطفاً توجه داشته باشید که WebDriverIO v7 تا پایان [پشتیبانی LTS](https://webdriver.io/versions/) آن در اکتبر 2023 همچنان پشتیبانی خواهد شد.

با ارتقاء نسخه اصلی به v8، این پکیج به سیستم ماژول ES منتقل شده است. و اکنون هم ماژول‌های سازگار با CommonJS (CJS-) و هم ECMAScript Modules (ESM-) را ارائه می‌دهد.

## نصب

```
npm install --save-dev wdio-aws-device-farm-service
```

## مثال

شما می‌توانید مثال ارائه شده را با `npm run example` اجرا کنید. این نیاز دارد به:

1. یک ARN پروژه AWS Device Farm به عنوان متغیر محیطی `PROJECT_ARN`
2. اعتبارنامه‌های AWS ([مستندات را ببینید](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). توجه داشته باشید که AWS Device Farm فقط از `us-west-2` پشتیبانی می‌کند. شما می‌توانید یک منطقه AWS را با متغیر محیطی `AWS_REGION` اجبار کنید.

برای مثال، این نحوه استفاده از اعتبارنامه‌های موقت AWS است:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## امنیت

برای اطلاعات بیشتر به [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) مراجعه کنید.

## دریافت کمک

بهترین راه برای تعامل با تیم ما از طریق GitHub است. شما می‌توانید [یک مسئله باز کنید](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) برای دریافت کمک یا گزارش هر مشکلی که تجربه می‌کنید.

## مجوز

این پروژه تحت مجوز Apache-2.0 است.