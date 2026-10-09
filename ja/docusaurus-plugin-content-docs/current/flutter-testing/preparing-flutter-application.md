---
id: preparing-flutter-application
title: Flutterアプリの準備
description: "Flutterアプリでflutter_driver拡張機能を有効にし、WebdriverIOとAppiumがウィジェットを操作できるようにテストビルドを作成します。"
---

WebdriverIOとAppiumがFlutterキャンバス内部の要素を検査・操作できるようにするには、アプリケーションが通信チャネルを公開する必要があります。これは、アプリケーションのソースコードでFlutterのテスト拡張機能を有効にすることで実現します。

:::info 開発チームとの共有
自動化エンジニア（QA）は、Flutterアプリのコードベースに直接アクセスできないことがよくあります。アプリのコードを自分で管理していない場合は、このページを開発チームと共有し、`flutter_driver`拡張機能を追加してテストビルド（`.apk`、`.app`、または`.ipa`）を提供してもらってください。
:::

:::note レガシー拡張機能
新しいアプリに対してFlutterが推奨するテスト手法は`integration_test`パッケージです。しかし、Appium Flutter Driverはレガシーの`flutter_driver`拡張機能と統合されているため、このガイドでは`enableFlutterDriverExtension()`を使用しています。
:::

### `pubspec.yaml`の設定

Flutterプロジェクトの`pubspec.yaml`ファイルの`dev_dependencies`に`flutter_driver`を追加します：

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

依存関係を取得します：

```bash
flutter pub get
```

### `main.dart`で拡張機能を有効にする

WebdriverIOからのコマンドに応答するインストルメンテーションサーバーを起動するには、`runApp`の前に`enableFlutterDriverExtension()`を呼び出します：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // アプリを起動する前にFlutter driver拡張機能を有効にする
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

:::tip ベストプラクティス：テスト用エントリーポイントを分離する
テスト用のインストルメンテーションコードが本番ビルドに混入するのを防ぐため、拡張機能を有効にしてメインアプリを呼び出す別のエントリーポイントファイル（`lib/main_e2e.dart`など）を作成してください。これにより、本番ビルドをクリーンかつ安全に保つことができます：

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### 公式リファレンスドキュメント

コンポーネント公開の仕組みや`enableFlutterDriverExtension()`の詳細については、公式の[Flutter APIリファレンス](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html)およびFlutterの[統合テストガイド](https://docs.flutter.dev/testing/integration-tests)を参照してください。