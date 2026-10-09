---
id: setting-up-webdriverio
title: Configurando o WebdriverIO no seu ambiente
description: "Configure o wdio.conf.ts e as capabilities do Appium para iniciar um app Flutter com o Appium Flutter Driver no Android e no iOS."
---

O arquivo `wdio.conf.ts` é o arquivo de configuração central de qualquer projeto WebdriverIO. É nele que você define onde os testes são executados, quais frameworks de teste utilizar e as `capabilities` necessárias para que o Appium inicialize corretamente a aplicação Flutter.

:::warning
O `appium-flutter-driver` funciona de forma diferente dos drivers nativos tradicionais (como `UiAutomator2` ou `XCUITest`). Ele se comunica com a extensão de testes do Flutter (`flutter_driver`) por meio de um protocolo customizado. Por causa disso, os comandos padrão de automação nativa podem não funcionar da mesma maneira ou podem exigir estritamente o uso do `appium-flutter-finder`.

Para entender completamente as limitações, os comandos suportados e as extensões de protocolo, consulte o repositório oficial da ferramenta: [Appium Flutter Driver no GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Configuração de Capabilities (Android e iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... outras configurações do wdio.conf.ts (runner, specs, etc.)
    

    services: [
        ['appium', {
            // O WebdriverIO gerencia o ciclo de vida do servidor Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // CONFIGURAÇÃO ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Define o uso obrigatório do driver Flutter
            'appium:deviceName': 'Android_Emulator', // Nome do seu emulador configurado ou dispositivo real
            // OBSERVAÇÃO SOBRE CAMINHOS (Veja a nota sobre Sistemas Operacionais abaixo)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // CONFIGURAÇÃO IOS (Requer macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Define o uso obrigatório do driver Flutter
            'appium:deviceName': 'iPhone Simulator', // Nome do simulador iOS ou dispositivo real
            'appium:platformVersion': '17.2', // Altere para a versão do SO de destino
            // OBSERVAÇÃO SOBRE CAMINHOS (Veja a nota sobre Sistemas Operacionais abaixo)
            // Use .app para o Simulador iOS, ou .ipa para dispositivos iOS reais
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... restante da configuração
};
```

### Observações Importantes sobre Caminhos de Arquivos (appium:app)

Definir o caminho do binário da aplicação (`.apk` para Android, `.app` ou `.ipa` para iOS) na propriedade `appium:app` exige atenção cuidadosa, dependendo do sistema operacional e do ambiente de destino:

- **No Windows**: O sistema operacional utiliza barras invertidas (`\`) para caminhos de diretórios. Ao mapear o caminho para o seu arquivo `.apk` no Windows, certifique-se de escapar as barras invertidas no seu arquivo de configuração (por exemplo, `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) ou use barras normais (`/`) de forma consistente, que são interpretadas corretamente pelo Node.js.
- **No macOS / Linux**: São utilizados caminhos padrão com barras normais (`/`). Lembre-se de que builds iOS (`.app` para o Simulador ou `.ipa` para dispositivos reais) só podem ser compilados em ambientes macOS.
- **Simulador iOS vs Dispositivos Reais**: Use bundles `.app` ao executar no Simulador iOS e pacotes `.ipa` assinados ao executar em dispositivos iOS físicos.
- **Caminhos Absolutos vs Relativos**: É altamente recomendável usar caminhos relativos a partir da raiz do projeto (usando `./`) para garantir a portabilidade entre diferentes máquinas de desenvolvimento e ambientes de Integração Contínua (CI).