---
id: preparing-flutter-application
title: Προετοιμασία της εφαρμογής Flutter
description: "Ενεργοποιήστε την επέκταση flutter_driver σε μια εφαρμογή Flutter και δημιουργήστε ένα test build ώστε το WebdriverIO και το Appium να μπορούν να αλληλεπιδρούν με τα widgets της."
---

Για να μπορούν το WebdriverIO και το Appium να επιθεωρούν και να αλληλεπιδρούν με εσωτερικά στοιχεία μέσα στο canvas του Flutter, η εφαρμογή πρέπει να εκθέτει ένα κανάλι επικοινωνίας. Αυτό επιτυγχάνεται με την ενεργοποίηση της επέκτασης δοκιμών του Flutter στον πηγαίο κώδικα της εφαρμογής.

:::info Κοινοποίηση στις ομάδες ανάπτυξης
Οι μηχανικοί αυτοματοποίησης (QAs) συχνά δεν έχουν άμεση πρόσβαση στον κώδικα της εφαρμογής Flutter. Αν δεν συντηρείτε εσείς οι ίδιοι τον κώδικα της εφαρμογής, κοινοποιήστε αυτή τη σελίδα στην ομάδα ανάπτυξής σας ώστε να προσθέσει την επέκταση `flutter_driver` και να σας παρέχει ένα test build (`.apk`, `.app` ή `.ipa`).
:::

:::note Παλαιότερη επέκταση
Η προτεινόμενη από το Flutter προσέγγιση δοκιμών για νεότερες εφαρμογές είναι το πακέτο `integration_test`. Ωστόσο, το Appium Flutter Driver ενσωματώνεται με την παλαιότερη επέκταση `flutter_driver`, γι' αυτό ο παρών οδηγός χρησιμοποιεί το `enableFlutterDriverExtension()`.
:::

### Ρύθμιση του `pubspec.yaml`

Προσθέστε το `flutter_driver` κάτω από τα `dev_dependencies` στο αρχείο `pubspec.yaml` του έργου Flutter σας:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Κατεβάστε τις εξαρτήσεις:

```bash
flutter pub get
```

### Ενεργοποίηση της επέκτασης στο `main.dart`

Για να ξεκινήσει ο instrumentation server που αποκρίνεται στις εντολές του WebdriverIO, καλέστε το `enableFlutterDriverExtension()` πριν από το `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Ενεργοποίηση της επέκτασης Flutter driver πριν από την εκκίνηση της εφαρμογής
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

:::tip Βέλτιστη πρακτική: Ξεχωριστό σημείο εισόδου για δοκιμές
Για να αποτρέψετε την είσοδο κώδικα instrumentation δοκιμών στα production builds, δημιουργήστε ένα ξεχωριστό αρχείο σημείου εισόδου (όπως το `lib/main_e2e.dart`) που ενεργοποιεί την επέκταση και καλεί την κύρια εφαρμογή. Έτσι τα production builds παραμένουν καθαρά και ασφαλή:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Επίσημη τεκμηρίωση αναφοράς

Για να μάθετε περισσότερα σχετικά με τον μηχανισμό έκθεσης των components και το `enableFlutterDriverExtension()`, ανατρέξτε στο επίσημο [Flutter API Reference](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) και στον [Οδηγό Integration Testing](https://docs.flutter.dev/testing/integration-tests) του Flutter.