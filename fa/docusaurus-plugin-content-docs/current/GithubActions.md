---
id: githubactions
title: اکشن‌های گیت‌هاب
---

اگر مخزن شما در گیت‌هاب میزبانی می‌شود، می‌توانید از [Github Actions](https://docs.github.com/en/actions) برای اجرای آزمایش‌های خود روی زیرساخت گیت‌هاب استفاده کنید.

۱. هر بار که تغییرات را پوش می‌کنید
۲. با هر ایجاد درخواست پول
۳. در زمان‌های برنامه‌ریزی شده
۴. با راه‌اندازی دستی

در ریشه مخزن خود، یک دایرکتوری `.github/workflows` ایجاد کنید. یک فایل Yaml اضافه کنید، برای مثال `.github/workflows/ci.yaml`. در آنجا نحوه اجرای آزمایش‌های خود را پیکربندی خواهید کرد.

برای پیاده‌سازی مرجع به [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) مراجعه کنید، و [نمونه اجرای آزمایش‌ها](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) را ببینید.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

در [مستندات گیت‌هاب](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) اطلاعات بیشتری درباره ایجاد فایل‌های گردش کار پیدا کنید.