---
id: preparing-flutter-application
title: تجهيز تطبيق Flutter
description: "قم بتفعيل امتداد flutter_driver في تطبيق Flutter وأنشئ نسخة اختبارية حتى يتمكن WebdriverIO وAppium من التفاعل مع عناصر الواجهة (widgets) الخاصة به."
---

لكي يتمكن WebdriverIO وAppium من فحص العناصر الداخلية داخل لوحة رسم Flutter (canvas) والتفاعل معها، يجب أن يوفر التطبيق قناة اتصال. ويتحقق ذلك عن طريق تفعيل امتداد الاختبار الخاص بـ Flutter في الشيفرة المصدرية للتطبيق.

:::info المشاركة مع فرق التطوير
غالبًا لا يملك مهندسو الأتمتة (QA) وصولًا مباشرًا إلى الشيفرة المصدرية لتطبيق Flutter. إذا لم تكن أنت من يدير شيفرة التطبيق، فشارك هذه الصفحة مع فريق التطوير لديك حتى يتمكنوا من إضافة امتداد `flutter_driver` وتوفير نسخة اختبارية (`.apk` أو `.app` أو `.ipa`).
:::

:::note امتداد قديم
المسار الموصى به من Flutter لاختبار التطبيقات الأحدث هو حزمة `integration_test`. ومع ذلك، يتكامل Appium Flutter Driver مع امتداد `flutter_driver` القديم، ولهذا السبب يستخدم هذا الدليل `enableFlutterDriverExtension()`.
:::

### إعداد ملف `pubspec.yaml`

أضف `flutter_driver` ضمن `dev_dependencies` في ملف `pubspec.yaml` الخاص بمشروع Flutter:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

قم بجلب الاعتماديات:

```bash
flutter pub get
```

### تفعيل الامتداد في `main.dart`

لتشغيل خادم القياس (instrumentation server) الذي يستجيب للأوامر الواردة من WebdriverIO، استدعِ `enableFlutterDriverExtension()` قبل `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // تفعيل امتداد Flutter driver قبل تشغيل التطبيق
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

:::tip أفضل ممارسة: نقطة دخول منفصلة للاختبار
لمنع دخول شيفرة القياس الخاصة بالاختبار إلى نسخ الإنتاج، أنشئ ملف نقطة دخول منفصلًا (مثل `lib/main_e2e.dart`) يقوم بتفعيل الامتداد ثم يستدعي التطبيق الرئيسي. يحافظ ذلك على نظافة نسخ الإنتاج وأمانها:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### الوثائق المرجعية الرسمية

لمعرفة المزيد حول آليات كشف المكونات و`enableFlutterDriverExtension()`، راجع [مرجع Flutter API](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) الرسمي و[دليل اختبار التكامل](https://docs.flutter.dev/testing/integration-tests) الخاص بـ Flutter.