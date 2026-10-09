---
id: preparing-flutter-application
title: Vorbereiten der Flutter-App
description: "Aktivieren Sie die flutter_driver-Erweiterung in einer Flutter-App und erstellen Sie einen Test-Build, damit WebdriverIO und Appium mit ihren Widgets interagieren können."
---

Damit WebdriverIO und Appium interne Elemente innerhalb des Flutter-Canvas untersuchen und mit ihnen interagieren können, muss die Anwendung einen Kommunikationskanal bereitstellen. Dies wird erreicht, indem die Test-Erweiterung von Flutter im Quellcode der Anwendung aktiviert wird.

:::info Teilen mit Entwicklungsteams
Automatisierungsingenieure (QAs) haben oft keinen direkten Zugriff auf die Codebasis der Flutter-App. Wenn Sie den App-Code nicht selbst pflegen, teilen Sie diese Seite mit Ihrem Entwicklungsteam, damit es die `flutter_driver`-Erweiterung hinzufügen und einen Test-Build (`.apk`, `.app` oder `.ipa`) bereitstellen kann.
:::

:::note Legacy-Erweiterung
Der von Flutter empfohlene Testansatz für neuere Apps ist das `integration_test`-Paket. Der Appium Flutter Driver integriert sich jedoch mit der Legacy-Erweiterung `flutter_driver`, weshalb dieser Leitfaden `enableFlutterDriverExtension()` verwendet.
:::

### Konfigurieren von `pubspec.yaml`

Fügen Sie `flutter_driver` unter `dev_dependencies` in der Datei `pubspec.yaml` Ihres Flutter-Projekts hinzu:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Laden Sie die Abhängigkeiten herunter:

```bash
flutter pub get
```

### Aktivieren der Erweiterung in `main.dart`

Um den Instrumentierungsserver zu starten, der auf Befehle von WebdriverIO reagiert, rufen Sie `enableFlutterDriverExtension()` vor `runApp` auf:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Flutter-Driver-Erweiterung vor dem Start der App aktivieren
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

:::tip Best Practice: Separater Test-Einstiegspunkt
Um zu verhindern, dass Test-Instrumentierungscode in Produktions-Builds gelangt, erstellen Sie eine separate Einstiegspunktdatei (z. B. `lib/main_e2e.dart`), die die Erweiterung aktiviert und die Haupt-App aufruft. So bleiben Produktions-Builds sauber und sicher:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Offizielle Referenzdokumentation

Weitere Informationen zu den Mechanismen der Komponentenbereitstellung und zu `enableFlutterDriverExtension()` finden Sie in der offiziellen [Flutter API Reference](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) und im [Integration Testing Guide](https://docs.flutter.dev/testing/integration-tests) von Flutter.