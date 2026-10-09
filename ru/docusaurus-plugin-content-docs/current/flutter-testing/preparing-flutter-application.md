---
id: preparing-flutter-application
title: Подготовка Flutter-приложения
description: "Включите расширение flutter_driver во Flutter-приложении и создайте тестовую сборку, чтобы WebdriverIO и Appium могли взаимодействовать с его виджетами."
---

Чтобы WebdriverIO и Appium могли инспектировать внутренние элементы на холсте Flutter и взаимодействовать с ними, приложение должно предоставлять канал связи. Для этого в исходном коде приложения необходимо включить тестовое расширение Flutter.

:::info Передача информации командам разработки
У инженеров по автоматизации (QA) зачастую нет прямого доступа к кодовой базе Flutter-приложения. Если вы не сопровождаете код приложения самостоятельно, поделитесь этой страницей с командой разработки, чтобы они добавили расширение `flutter_driver` и предоставили тестовую сборку (`.apk`, `.app` или `.ipa`).
:::

:::note Устаревшее расширение
Для новых приложений Flutter рекомендует проводить тестирование с помощью пакета `integration_test`. Однако Appium Flutter Driver интегрируется с устаревшим расширением `flutter_driver`, поэтому в этом руководстве используется `enableFlutterDriverExtension()`.
:::

### Настройка `pubspec.yaml`

Добавьте `flutter_driver` в раздел `dev_dependencies` файла `pubspec.yaml` вашего Flutter-проекта:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Загрузите зависимости:

```bash
flutter pub get
```

### Включение расширения в `main.dart`

Чтобы запустить сервер инструментирования, отвечающий на команды WebdriverIO, вызовите `enableFlutterDriverExtension()` перед `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Включите расширение Flutter driver перед запуском приложения
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

:::tip Рекомендация: отдельная точка входа для тестов
Чтобы код тестового инструментирования не попадал в production-сборки, создайте отдельный файл точки входа (например, `lib/main_e2e.dart`), который включает расширение и вызывает основное приложение. Это позволяет сохранить production-сборки чистыми и безопасными:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Официальная справочная документация

Чтобы узнать больше о механизмах предоставления доступа к компонентам и о `enableFlutterDriverExtension()`, обратитесь к официальному [справочнику Flutter API](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) и [руководству по интеграционному тестированию](https://docs.flutter.dev/testing/integration-tests) Flutter.