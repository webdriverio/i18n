---
id: preparing-flutter-application
title: Förbereda Flutter-appen
description: "Aktivera flutter_driver-tillägget i en Flutter-app och skapa en testbuild så att WebdriverIO och Appium kan interagera med dess widgets."
---

För att WebdriverIO och Appium ska kunna inspektera och interagera med interna element inuti Flutter-canvasen måste applikationen exponera en kommunikationskanal. Detta uppnås genom att aktivera Flutters testtillägg i applikationens källkod.

:::info Dela med utvecklingsteam
Automationsingenjörer (QA) har ofta inte direkt åtkomst till Flutter-appens kodbas. Om du inte själv underhåller appens kod, dela den här sidan med ditt utvecklingsteam så att de kan lägga till `flutter_driver`-tillägget och tillhandahålla en testbuild (`.apk`, `.app` eller `.ipa`).
:::

:::note Äldre tillägg
Flutters rekommenderade testmetod för nyare appar är paketet `integration_test`. Appium Flutter Driver integreras dock med det äldre `flutter_driver`-tillägget, vilket är anledningen till att den här guiden använder `enableFlutterDriverExtension()`.
:::

### Konfigurera `pubspec.yaml`

Lägg till `flutter_driver` under `dev_dependencies` i ditt Flutter-projekts `pubspec.yaml`-fil:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Hämta beroendena:

```bash
flutter pub get
```

### Aktivera tillägget i `main.dart`

För att starta instrumenteringsservern som svarar på kommandon från WebdriverIO, anropa `enableFlutterDriverExtension()` före `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Aktivera Flutter driver-tillägget innan appen startas
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

:::tip Bästa praxis: Separat startpunkt för tester
För att förhindra att testinstrumenteringskod hamnar i produktionsbuilds, skapa en separat startpunktsfil (till exempel `lib/main_e2e.dart`) som aktiverar tillägget och anropar huvudappen. Detta håller produktionsbuilds rena och säkra:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Officiell referensdokumentation

För att lära dig mer om hur komponenter exponeras och om `enableFlutterDriverExtension()`, se den officiella [Flutter API-referensen](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) och Flutters [guide för integrationstestning](https://docs.flutter.dev/testing/integration-tests).