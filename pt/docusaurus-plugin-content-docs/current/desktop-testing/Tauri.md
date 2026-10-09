---
id: tauri
title: Tauri
description: "Teste aplicativos desktop Tauri no Windows, macOS e Linux com o serviço Tauri do WebdriverIO, usando o assistente de configuração ou uma configuração manual."
---

[Tauri](https://tauri.app/) é um framework para construir aplicativos desktop multiplataforma leves e seguros, usando um backend em Rust e o webview nativo do sistema operacional. O serviço Tauri do WebdriverIO automatiza a descoberta, a inicialização e o controle de aplicativos Tauri no Windows (WebView2), macOS (WKWebView) e Linux (WebKitGTK), para que o mesmo conjunto de testes funcione em todos os lugares.

As vantagens de usar o WebdriverIO para testar aplicativos Tauri são:

- 🚗 provisionamento automático da camada WebDriver — escolha `tauri-driver`, o driver da CrabNebula ou o plugin embutido no aplicativo
- 📦 detecção de binários multiplataforma (driver do Edge WebView2 incluído no Windows)
- 🧩 `@wdio/tauri-plugin` opcional para uma integração mais rica dentro do webview (`browser.tauri.execute`, mocking)
- 🔗 testes de deeplinks + manipuladores de protocolo
- 🪵 encaminhamento de logs do Rust + frontend para o reporter de testes do WebdriverIO

## Primeiros Passos

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Quando o assistente perguntar que tipo de teste você gostaria de fazer, selecione _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ e, em seguida, escolha _Tauri_ na pergunta sobre o framework. O assistente então perguntará qual provedor WebDriver você deseja usar (o `tauri-driver` oficial, CrabNebula ou o plugin embutido) e se você gostaria do `@wdio/tauri-plugin` opcional para uma integração mais rica.

O assistente instala os pacotes npm automaticamente e imprime no stdout quaisquer adições necessárias ao Cargo para que você as cole no seu `src-tauri/Cargo.toml`.

## Configuração Manual

Se você já tem um projeto WebdriverIO, instale o serviço:

```sh
npm install --save-dev @wdio/tauri-service
# opcional: integração mais rica dentro do webview
npm install --save-dev @wdio/tauri-plugin
```

Para o plugin WebDriver embutido (recomendado — executa o servidor W3C dentro do seu aplicativo, sem necessidade de um `tauri-driver` externo), adicione o crate do Cargo ao `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…e registre-o em `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Em seguida, adicione o serviço à sua configuração:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['tauri', {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded'
    }]]
}
```

É isso 🎉

Saiba mais sobre [como configurar o Serviço Tauri](/docs/desktop-testing/tauri/configuration), [a configuração do plugin Tauri](/docs/desktop-testing/tauri/plugin-setup), [observações específicas de cada plataforma](/docs/desktop-testing/tauri/platform-support) e [padrões de uso comuns](/docs/desktop-testing/tauri/usage-examples).