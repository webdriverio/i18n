---
id: preparing-flutter-application
title: Preparando o App Flutter
description: "Habilite a extensão flutter_driver em um app Flutter e gere um build de teste para que o WebdriverIO e o Appium possam interagir com seus widgets."
---

Para que o WebdriverIO e o Appium possam inspecionar e interagir com os elementos internos do canvas do Flutter, a aplicação precisa expor um canal de comunicação. Isso é feito habilitando a extensão de testes do Flutter no código-fonte da aplicação.

:::info Compartilhando com as Equipes de Desenvolvimento
Engenheiros de automação (QAs) frequentemente não têm acesso direto ao código-fonte do app Flutter. Se você não mantém o código do app, compartilhe esta página com sua equipe de desenvolvimento para que ela adicione a extensão `flutter_driver` e forneça um build de teste (`.apk`, `.app` ou `.ipa`).
:::

:::note Extensão Legada
O caminho de testes recomendado pelo Flutter para apps mais recentes é o pacote `integration_test`. No entanto, o Appium Flutter Driver se integra com a extensão legada `flutter_driver`, e é por isso que este guia usa `enableFlutterDriverExtension()`.
:::

### Configurando o `pubspec.yaml`

Adicione `flutter_driver` em `dev_dependencies` no arquivo `pubspec.yaml` do seu projeto Flutter:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

Baixe as dependências:

```bash
flutter pub get
```

### Habilitando a Extensão no `main.dart`

Para iniciar o servidor de instrumentação que responde aos comandos do WebdriverIO, chame `enableFlutterDriverExtension()` antes de `runApp`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';

void main() {
  // Habilita a extensão do Flutter driver antes de iniciar o app
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

:::tip Boa Prática: Ponto de Entrada de Teste Separado
Para evitar que o código de instrumentação de testes entre nos builds de produção, crie um arquivo de ponto de entrada separado (como `lib/main_e2e.dart`) que habilite a extensão e chame o app principal. Isso mantém os builds de produção limpos e seguros:

```dart
import 'package:flutter_driver/driver_extension.dart';
import 'main.dart' as app;

void main() {
  enableFlutterDriverExtension();
  app.main();
}
```
:::

### Documentação Oficial de Referência

Para saber mais sobre os mecanismos de exposição de componentes e sobre `enableFlutterDriverExtension()`, consulte a [Referência da API do Flutter](https://api.flutter.dev/flutter/flutter_driver_extension/enableFlutterDriverExtension.html) oficial e o [Guia de Testes de Integração](https://docs.flutter.dev/testing/integration-tests) do Flutter.