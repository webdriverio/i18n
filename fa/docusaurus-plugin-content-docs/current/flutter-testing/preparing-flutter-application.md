---
id: preparing-flutter-application
title: آماده‌سازی برنامه Flutter
description: "افزونه flutter_driver را در یک برنامه Flutter فعال کنید و یک بیلد آزمایشی تولید کنید تا WebdriverIO و Appium بتوانند با ویجت‌های آن تعامل داشته باشند."
---

برای اینکه WebdriverIO و Appium بتوانند عناصر داخلی درون بوم (canvas) Flutter را بررسی کرده و با آن‌ها تعامل داشته باشند، برنامه باید یک کانال ارتباطی در اختیار بگذارد. این کار با فعال‌سازی افزونه تست Flutter در کد منبع برنامه انجام می‌شود.

:::info اشتراک‌گذاری با تیم‌های توسعه
مهندسان اتوماسیون (QAها) اغلب دسترسی مستقیم به کدبیس برنامه Flutter ندارند. اگر خودتان کد برنامه را نگهداری نمی‌کنید، این صفحه را با تیم توسعه خود به اشتراک بگذارید تا آن‌ها افزونه `flutter_driver` را اضافه کرده و یک بیلد آزمایشی (`.apk`، `.app` یا `.ipa`) در اختیارتان قرار دهند.
:::

:::note افزونه قدیمی
مسیر پیشنهادی Flutter برای تست برنامه‌های جدیدتر، پکیج `integration_test` است. با این حال، Appium Flutter Driver با افزونه قدیمی `flutter_driver` یکپارچه می‌شود و به همین دلیل این راهنما از `enableFlutterDriverExtension()` استفاده می‌کند.
:::

### پیکربندی `pubspec.yaml`

`flutter_driver` را زیر `dev_dependencies` در فایل `pubspec.yaml` پروژه Flutter خود اضافه کنید:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

وابستگی‌ها را دریافت کنید:

```bash
flutter pub get
```

### فعال‌سازی افزونه در `main.dart`

برای راه‌اندازی سرور ابزارگذاری (instrumentation) که به دستورات WebdriverIO پاسخ می‌دهد، `enableFlutterDriverExtension()` را پیش از `runApp` فراخوانی کنید:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // افزونه Flutter driver را پیش از شروع برنامه فعال کنید
  enableFlutterDriverExtension();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('E2E Testing Flutter')),
        body: const Center(child: Text('Application ready for automation!')),
      ),
    );
  }
}
```

:::tip بهترین روش: نقطه ورود جداگانه برای تست
برای جلوگیری از ورود کد ابزارگذاری تست به بیلدهای production، یک فایل نقطه ورود جداگانه (مانند `lib/main_e2e.dart`) ایجاد کنید که افزونه را فعال کرده و برنامه اصلی را فراخوانی کند. این کار بیلدهای production را تمیز و امن نگه می‌دارد:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### مستندات مرجع رسمی

برای آشنایی بیشتر با سازوکار در دسترس قرار دادن کامپوننت‌ها و `enableFlutterDriverExtension()`، به [مرجع API در Flutter](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) و [راهنمای تست یکپارچه‌سازی](https://docs.flutter.dev/testing/integration-tests) رسمی Flutter مراجعه کنید.