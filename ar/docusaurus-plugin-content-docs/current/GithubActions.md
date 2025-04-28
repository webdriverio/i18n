---
id: githubactions
title: إجراءات Github
---

إذا كانت المستودع الخاص بك مستضافًا على Github، يمكنك استخدام [Github Actions](https://docs.github.com/en/actions) لتشغيل اختباراتك على بنية تحتية Github.

1. في كل مرة تقوم فيها بدفع التغييرات
2. عند إنشاء كل طلب سحب
3. في وقت مجدول
4. بواسطة المشغل اليدوي

في جذر المستودع الخاص بك، قم بإنشاء دليل `.github/workflows`. أضف ملف Yaml، على سبيل المثال `.github/workflows/ci.yaml`. هناك ستقوم بتكوين كيفية تشغيل اختباراتك.

انظر إلى [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) للتنفيذ المرجعي، و[عينات تشغيل الاختبار](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

اكتشف المزيد في [وثائق Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) حول مزيد من المعلومات عن إنشاء ملفات سير العمل.