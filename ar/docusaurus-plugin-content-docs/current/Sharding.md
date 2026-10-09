---
id: sharding
title: التجزئة
description: "قسّم مجموعة اختباراتك على عدة أجهزة باستخدام الخيار ‎--shard لتشغيل الاختبارات بشكل أسرع، على سبيل المثال على GitHub Actions."
---

بشكل افتراضي، يقوم WebdriverIO بتشغيل الاختبارات بالتوازي ويسعى إلى الاستخدام الأمثل لأنوية المعالج على جهازك. ولتحقيق قدر أكبر من التوازي، يمكنك توسيع نطاق تنفيذ اختبارات WebdriverIO بشكل أكبر عن طريق تشغيل الاختبارات على عدة أجهزة في وقت واحد. نطلق على هذا النمط من التشغيل اسم "التجزئة" (sharding).

## تجزئة الاختبارات بين عدة أجهزة

لتجزئة مجموعة الاختبارات، مرّر `--shard=x/y` إلى سطر الأوامر. على سبيل المثال، لتقسيم المجموعة إلى أربعة أجزاء، يشغّل كل منها ربع الاختبارات:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

الآن، إذا قمت بتشغيل هذه الأجزاء بالتوازي على أجهزة كمبيوتر مختلفة، فستكتمل مجموعة اختباراتك أسرع بأربع مرات.

## مثال على GitHub Actions

يدعم GitHub Actions [تجزئة الاختبارات بين عدة مهام](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) باستخدام الخيار [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). سيقوم خيار المصفوفة بتشغيل مهمة منفصلة لكل تركيبة ممكنة من الخيارات المقدمة.

يوضح لك المثال التالي كيفية تكوين مهمة لتشغيل اختباراتك على أربعة أجهزة بالتوازي. يمكنك العثور على إعداد خط الأنابيب بالكامل في مشروع [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   أولاً نضيف خيار المصفوفة إلى تكوين المهمة مع خيار shard الذي يحتوي على عدد الأجزاء التي نريد إنشاءها. سيُنشئ `shard: [1, 2, 3, 4]` أربعة أجزاء، لكل منها رقم جزء مختلف.
-   بعد ذلك نشغّل اختبارات WebdriverIO باستخدام الخيار `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. سيكون هذا أمر الاختبار لكل جزء.
-   أخيرًا نرفع تقرير سجل wdio إلى GitHub Actions Artifacts. سيؤدي هذا إلى إتاحة السجلات في حال فشل الجزء.

يتم تعريف خط أنابيب الاختبار على النحو التالي:

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

سيؤدي هذا إلى تشغيل جميع الأجزاء بالتوازي، مما يقلل وقت تنفيذ الاختبارات بمقدار 4 مرات:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

راجع الالتزام [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) من مشروع [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) الذي أدخل التجزئة إلى خط أنابيب الاختبار الخاص به، مما ساعد في تقليل وقت التنفيذ الإجمالي من `2:23 min` إلى `1:30 min`، أي بانخفاض قدره __37%__ 🎉.