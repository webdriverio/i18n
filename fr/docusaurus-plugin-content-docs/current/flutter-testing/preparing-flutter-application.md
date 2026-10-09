---
id: preparing-flutter-application
title: Préparer l'application Flutter
description: "Activez l'extension flutter_driver dans une application Flutter et produisez une version de test afin que WebdriverIO et Appium puissent interagir avec ses widgets."
---

Pour que WebdriverIO et Appium puissent inspecter les éléments internes du canvas Flutter et interagir avec eux, l'application doit exposer un canal de communication. Cela s'obtient en activant l'extension de test de Flutter dans le code source de l'application.

:::info Partage avec les équipes de développement
Les ingénieurs en automatisation (QA) n'ont souvent pas d'accès direct au code source de l'application Flutter. Si vous ne maintenez pas vous-même le code de l'application, partagez cette page avec votre équipe de développement afin qu'elle puisse ajouter l'extension `flutter_driver` et fournir une version de test (`.apk`, `.app` ou `.ipa`).
:::

:::note Extension historique
L'approche de test recommandée par Flutter pour les applications récentes est le package `integration_test`. Cependant, l'Appium Flutter Driver s'intègre avec l'ancienne extension `flutter_driver`, c'est pourquoi ce guide utilise `enableFlutterDriverExtension()`.
:::

### Configuration de `pubspec.yaml`

Ajoutez `flutter_driver` sous `dev_dependencies` dans le fichier `pubspec.yaml` de votre projet Flutter :

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Récupérez les dépendances :

```bash
flutter pub get
```

### Activation de l'extension dans `main.dart`

Pour démarrer le serveur d'instrumentation qui répond aux commandes de WebdriverIO, appelez `enableFlutterDriverExtension()` avant `runApp` :

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Activer l'extension Flutter driver avant de démarrer l'application
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

:::tip Bonne pratique : point d'entrée de test séparé
Pour éviter que le code d'instrumentation de test ne se retrouve dans les versions de production, créez un fichier de point d'entrée séparé (par exemple `lib/main_e2e.dart`) qui active l'extension et appelle l'application principale. Cela permet de garder les versions de production propres et sécurisées :

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Documentation de référence officielle

Pour en savoir plus sur les mécanismes d'exposition des composants et sur `enableFlutterDriverExtension()`, consultez la [Flutter API Reference](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) officielle et le [guide des tests d'intégration](https://docs.flutter.dev/testing/integration-tests) de Flutter.