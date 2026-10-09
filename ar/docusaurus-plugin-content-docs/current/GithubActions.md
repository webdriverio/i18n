---
id: githubactions
title: إجراءات Github
description: "قم بتشغيل اختبارات WebdriverIO الخاصة بك على GitHub Actions عن طريق إضافة ملف سير عمل إلى مستودعك."
---

إذا كان مستودعك مستضافًا على Github، فيمكنك استخدام [Github Actions](https://docs.github.com/en/actions) لتشغيل اختباراتك على البنية التحتية لـ Github.

1. في كل مرة تدفع فيها التغييرات
2. عند إنشاء كل طلب سحب
3. في وقت مجدول
4. عن طريق التشغيل اليدوي

في جذر مستودعك، أنشئ مجلد `.github/workflows`. أضف ملف Yaml، على سبيل المثال `.github/workflows/ci.yaml`. ستقوم فيه بتكوين كيفية تشغيل اختباراتك.

راجع [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) للاطلاع على تطبيق مرجعي، و[نماذج من عمليات تشغيل الاختبارات](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

اطلع على [وثائق Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) لمزيد من المعلومات حول إنشاء ملفات سير العمل.