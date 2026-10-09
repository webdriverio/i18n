---
id: preparing-flutter-application
title: Preparare l'app Flutter
description: "Abilita l'estensione flutter_driver in un'app Flutter e genera una build di test in modo che WebdriverIO e Appium possano interagire con i suoi widget."
---

Affinché WebdriverIO e Appium possano ispezionare e interagire con gli elementi interni del canvas Flutter, l'applicazione deve esporre un canale di comunicazione. Ciò si ottiene abilitando l'estensione di test di Flutter nel codice sorgente dell'applicazione.

:::info Condivisione con i team di sviluppo
Gli automation engineer (QA) spesso non hanno accesso diretto al codice sorgente dell'app Flutter. Se non gestisci tu stesso il codice dell'app, condividi questa pagina con il tuo team di sviluppo in modo che possa aggiungere l'estensione `flutter_driver` e fornire una build di test (`.apk`, `.app` o `.ipa`).
:::

:::note Estensione legacy
Il percorso di test consigliato da Flutter per le app più recenti è il pacchetto `integration_test`. Tuttavia, l'Appium Flutter Driver si integra con l'estensione legacy `flutter_driver`, motivo per cui questa guida utilizza `enableFlutterDriverExtension()`.
:::

### Configurare `pubspec.yaml`

Aggiungi `flutter_driver` sotto `dev_dependencies` nel file `pubspec.yaml` del tuo progetto Flutter:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Scarica le dipendenze:

```bash
flutter pub get
```

### Abilitare l'estensione in `main.dart`

Per avviare il server di strumentazione che risponde ai comandi di WebdriverIO, invoca `enableFlutterDriverExtension()` prima di `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Abilita l'estensione Flutter driver prima di avviare l'app
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

:::tip Best practice: entry point di test separato
Per evitare che il codice di strumentazione dei test finisca nelle build di produzione, crea un file di entry point separato (ad esempio `lib/main_e2e.dart`) che abiliti l'estensione e richiami l'app principale. In questo modo le build di produzione restano pulite e sicure:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Documentazione di riferimento ufficiale

Per saperne di più sui meccanismi di esposizione dei componenti e su `enableFlutterDriverExtension()`, consulta la [Flutter API Reference](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) ufficiale e la [Integration Testing Guide](https://docs.flutter.dev/testing/integration-tests) di Flutter.