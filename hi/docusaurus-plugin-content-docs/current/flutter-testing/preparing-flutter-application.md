---
id: preparing-flutter-application
title: Flutter ऐप तैयार करना
description: "Flutter ऐप में flutter_driver एक्सटेंशन सक्षम करें और एक टेस्ट बिल्ड तैयार करें ताकि WebdriverIO और Appium इसके विजेट्स के साथ इंटरैक्ट कर सकें।"
---

WebdriverIO और Appium को Flutter कैनवास के अंदर मौजूद आंतरिक एलिमेंट्स का निरीक्षण करने और उनके साथ इंटरैक्ट करने के लिए, एप्लिकेशन को एक संचार चैनल उपलब्ध कराना होगा। यह एप्लिकेशन के सोर्स कोड में Flutter के टेस्ट एक्सटेंशन को सक्षम करके किया जाता है।

:::info डेवलपमेंट टीमों के साथ साझा करना
ऑटोमेशन इंजीनियरों (QAs) के पास अक्सर Flutter ऐप के कोडबेस तक सीधी पहुँच नहीं होती। यदि आप स्वयं ऐप कोड का रखरखाव नहीं करते हैं, तो इस पेज को अपनी डेवलपमेंट टीम के साथ साझा करें ताकि वे `flutter_driver` एक्सटेंशन जोड़ सकें और एक टेस्ट बिल्ड (`.apk`, `.app`, या `.ipa`) प्रदान कर सकें।
:::

:::note लीगेसी एक्सटेंशन
नए ऐप्स के लिए Flutter द्वारा अनुशंसित टेस्टिंग तरीका `integration_test` पैकेज है। हालाँकि, Appium Flutter Driver लीगेसी `flutter_driver` एक्सटेंशन के साथ इंटीग्रेट होता है, इसीलिए यह गाइड `enableFlutterDriverExtension()` का उपयोग करती है।
:::

### `pubspec.yaml` को कॉन्फ़िगर करना

अपने Flutter प्रोजेक्ट की `pubspec.yaml` फ़ाइल में `dev_dependencies` के अंतर्गत `flutter_driver` जोड़ें:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

डिपेंडेंसीज़ प्राप्त करें:

```bash
flutter pub get
```

### `main.dart` में एक्सटेंशन को सक्षम करना

WebdriverIO से आने वाले कमांड्स का जवाब देने वाले इंस्ट्रूमेंटेशन सर्वर को शुरू करने के लिए, `runApp` से पहले `enableFlutterDriverExtension()` को कॉल करें:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // ऐप शुरू करने से पहले Flutter driver एक्सटेंशन सक्षम करें
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

:::tip सर्वोत्तम अभ्यास: अलग टेस्ट एंट्री पॉइंट
टेस्ट इंस्ट्रूमेंटेशन कोड को प्रोडक्शन बिल्ड्स में शामिल होने से रोकने के लिए, एक अलग एंट्री पॉइंट फ़ाइल (जैसे `lib/main_e2e.dart`) बनाएँ जो एक्सटेंशन को सक्षम करे और मुख्य ऐप को कॉल करे। इससे प्रोडक्शन बिल्ड्स साफ़ और सुरक्षित रहते हैं:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### आधिकारिक संदर्भ दस्तावेज़

कंपोनेंट एक्सपोज़र की कार्यप्रणाली और `enableFlutterDriverExtension()` के बारे में अधिक जानने के लिए, आधिकारिक [Flutter API Reference](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) और Flutter की [Integration Testing Guide](https://docs.flutter.dev/testing/integration-tests) देखें।