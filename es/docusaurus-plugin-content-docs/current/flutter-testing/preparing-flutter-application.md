---
id: preparing-flutter-application
title: Preparación de la aplicación Flutter
description: "Habilita la extensión flutter_driver en una aplicación Flutter y genera una compilación de prueba para que WebdriverIO y Appium puedan interactuar con sus widgets."
---

Para que WebdriverIO y Appium puedan inspeccionar e interactuar con los elementos internos dentro del canvas de Flutter, la aplicación debe exponer un canal de comunicación. Esto se logra habilitando la extensión de pruebas de Flutter en el código fuente de la aplicación.

:::info Compartir con los equipos de desarrollo
Los ingenieros de automatización (QA) a menudo no tienen acceso directo al código fuente de la aplicación Flutter. Si no mantienes tú mismo el código de la aplicación, comparte esta página con tu equipo de desarrollo para que puedan añadir la extensión `flutter_driver` y proporcionar una compilación de prueba (`.apk`, `.app` o `.ipa`).
:::

:::note Extensión heredada
La ruta de pruebas recomendada por Flutter para las aplicaciones más recientes es el paquete `integration_test`. Sin embargo, Appium Flutter Driver se integra con la extensión heredada `flutter_driver`, por lo que esta guía utiliza `enableFlutterDriverExtension()`.
:::

### Configuración de `pubspec.yaml`

Añade `flutter_driver` en `dev_dependencies` dentro del archivo `pubspec.yaml` de tu proyecto Flutter:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Obtén las dependencias:

```bash
flutter pub get
```

### Habilitar la extensión en `main.dart`

Para iniciar el servidor de instrumentación que responde a los comandos de WebdriverIO, invoca `enableFlutterDriverExtension()` antes de `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Habilita la extensión de Flutter driver antes de iniciar la aplicación
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

:::tip Buena práctica: punto de entrada de pruebas separado
Para evitar que el código de instrumentación de pruebas llegue a las compilaciones de producción, crea un archivo de punto de entrada separado (como `lib/main_e2e.dart`) que habilite la extensión y llame a la aplicación principal. Esto mantiene las compilaciones de producción limpias y seguras:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Documentación de referencia oficial

Para obtener más información sobre los mecanismos de exposición de componentes y `enableFlutterDriverExtension()`, consulta la [Referencia de la API de Flutter](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) oficial y la [Guía de pruebas de integración](https://docs.flutter.dev/testing/integration-tests) de Flutter.