---
id: githubactions
title: Github Actions
description: "تست‌های WebdriverIO خود را با افزودن یک فایل workflow به مخزن خود، روی GitHub Actions اجرا کنید."
---

اگر مخزن شما روی Github میزبانی می‌شود، می‌توانید از [Github Actions](https://docs.github.com/en/actions) برای اجرای تست‌های خود روی زیرساخت Github استفاده کنید.

1. هر بار که تغییرات را push می‌کنید
2. با ایجاد هر pull request
3. در زمان‌بندی مشخص
4. با اجرای دستی

در ریشه مخزن خود، یک پوشه `.github/workflows` ایجاد کنید. یک فایل Yaml اضافه کنید، برای مثال `.github/workflows/ci.yaml`. در این فایل نحوه اجرای تست‌های خود را پیکربندی خواهید کرد.

برای پیاده‌سازی مرجع به [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) و برای مشاهده [نمونه‌های اجرای تست](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) مراجعه کنید.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

برای کسب اطلاعات بیشتر درباره ایجاد فایل‌های workflow، به [مستندات Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) مراجعه کنید.