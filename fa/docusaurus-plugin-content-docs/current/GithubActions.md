---
id: githubactions
title: گیت‌هاب اکشنز
---

اگر مخزن شما در گیت‌هاب میزبانی می‌شود، می‌توانید از [Github Actions](https://docs.github.com/en/actions) برای اجرای تست‌های خود روی زیرساخت‌های گیت‌هاب استفاده کنید.

1. هر بار که تغییرات را پوش می‌کنید
2. در هر ایجاد درخواست پول
3. در زمان‌های زمانبندی شده
4. با راه‌اندازی دستی

در ریشه مخزن خود، یک دایرکتوری `.github/workflows` ایجاد کنید. یک فایل Yaml اضافه کنید، به عنوان مثال `.github/workflows/ci.yaml`. در آنجا نحوه اجرای تست‌های خود را پیکربندی خواهید کرد.

به [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) برای پیاده‌سازی مرجع، و [نمونه اجرای تست‌ها](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) مراجعه کنید.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

در [مستندات گیت‌هاب](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) اطلاعات بیشتری درباره ایجاد فایل‌های گردش کار پیدا کنید.