---
id: preparing-flutter-application
title: Przygotowanie aplikacji Flutter
description: "Włącz rozszerzenie flutter_driver w aplikacji Flutter i przygotuj build testowy, aby WebdriverIO i Appium mogły wchodzić w interakcję z jej widżetami."
---

Aby WebdriverIO i Appium mogły analizować wewnętrzne elementy w obrębie canvasu Fluttera i wchodzić z nimi w interakcję, aplikacja musi udostępniać kanał komunikacji. Osiąga się to poprzez włączenie rozszerzenia testowego Fluttera w kodzie źródłowym aplikacji.

:::info Udostępnianie zespołom deweloperskim
Inżynierowie automatyzacji (QA) często nie mają bezpośredniego dostępu do kodu źródłowego aplikacji Flutter. Jeśli nie utrzymujesz samodzielnie kodu aplikacji, udostępnij tę stronę swojemu zespołowi deweloperskiemu, aby mógł dodać rozszerzenie `flutter_driver` i dostarczyć build testowy (`.apk`, `.app` lub `.ipa`).
:::

:::note Starsze rozszerzenie
Zalecaną przez Fluttera metodą testowania nowszych aplikacji jest pakiet `integration_test`. Jednak Appium Flutter Driver integruje się ze starszym rozszerzeniem `flutter_driver`, dlatego ten przewodnik korzysta z `enableFlutterDriverExtension()`.
:::

### Konfiguracja `pubspec.yaml`

Dodaj `flutter_driver` w sekcji `dev_dependencies` w pliku `pubspec.yaml` swojego projektu Flutter:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Pobierz zależności:

```bash
flutter pub get
```

### Włączanie rozszerzenia w `main.dart`

Aby uruchomić serwer instrumentacji, który odpowiada na polecenia z WebdriverIO, wywołaj `enableFlutterDriverExtension()` przed `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Włącz rozszerzenie Flutter driver przed uruchomieniem aplikacji
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

:::tip Dobra praktyka: oddzielny punkt wejścia dla testów
Aby zapobiec przedostawaniu się kodu instrumentacji testowej do buildów produkcyjnych, utwórz oddzielny plik punktu wejścia (np. `lib/main_e2e.dart`), który włącza rozszerzenie i wywołuje główną aplikację. Dzięki temu buildy produkcyjne pozostają czyste i bezpieczne:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Oficjalna dokumentacja referencyjna

Aby dowiedzieć się więcej o mechanizmach udostępniania komponentów oraz o `enableFlutterDriverExtension()`, zapoznaj się z oficjalną [dokumentacją API Fluttera](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) oraz [przewodnikiem po testach integracyjnych](https://docs.flutter.dev/testing/integration-tests) Fluttera.