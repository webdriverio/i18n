---
id: wdio-aws-device-farm-service
title: خدمة AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## خدمة AWS Device Farm لـ WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) خدمة لـ WebdriverIO.

هذه الخدمة تدعم فقط اختبار متصفح سطح المكتب.

## الترقية إلى WebDriverIO v8

توفر الحزمة الآن دعمًا لـ [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) بدءًا من الإصدار v8.0.0. ومع ذلك، يرجى ملاحظة أن WebDriverIO v7 سيستمر دعمه حتى نهاية [دعم LTS](https://webdriver.io/versions/) في أكتوبر 2023.

مع الترقية الرئيسية إلى الإصدار v8، انتقلت هذه الحزمة إلى نظام وحدات ES. وهي الآن تصدر وحدات متوافقة مع كل من CommonJS (CJS-) و ECMAScript Modules (ESM-).

## التثبيت

```
npm install --save-dev wdio-aws-device-farm-service
```

## مثال

يمكنك تشغيل المثال المقدم باستخدام `npm run example`. يتطلب:

1. مشروع AWS Device Farm ARN كمتغير بيئة `PROJECT_ARN`
2. بيانات اعتماد AWS ([انظر الوثائق](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). لاحظ أن AWS Device Farm يدعم فقط `us-west-2`. يمكنك فرض منطقة AWS بمتغير البيئة `AWS_REGION`.

على سبيل المثال، هكذا سيبدو الأمر باستخدام بيانات اعتماد AWS المؤقتة:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## الأمان

انظر [المساهمة](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) لمزيد من المعلومات.

## الحصول على المساعدة

أفضل طريقة للتفاعل مع فريقنا هي من خلال GitHub. يمكنك [فتح مشكلة](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) للحصول على المساعدة أو للإبلاغ عن أي مشكلات تواجهها.

## الترخيص

هذا المشروع مرخص بموجب ترخيص Apache-2.0.