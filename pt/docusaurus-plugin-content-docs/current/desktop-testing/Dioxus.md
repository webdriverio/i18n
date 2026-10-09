---
id: dioxus
title: Dioxus
description: "Teste aplicativos desktop Dioxus no Windows, macOS e Linux com o serviço Dioxus do WebdriverIO, usando o assistente de configuração ou uma configuração manual."
---

[Dioxus](https://dioxuslabs.com/) é um framework Rust para criar aplicativos multiplataforma a partir de uma única base de código. Seus aplicativos desktop são renderizados na webview nativa do sistema operacional (Wry), e o serviço Dioxus do WebdriverIO automatiza a descoberta, a inicialização e o controle deles no Windows (WebView2), macOS (WKWebView) e Linux (WebKitGTK), para que o mesmo conjunto de testes funcione em todos os lugares.

As vantagens de usar o WebdriverIO para testar aplicativos Dioxus são:

- 🚗 provisionamento automático da camada WebDriver — o driver embutido em processo recomendado não precisa de nenhum binário de driver externo em nenhuma plataforma
- 📦 detecção de binários multiplataforma (driver do Edge WebView2 incluído no Windows para o provedor `external`)
- 🧩 `browser.dioxus.execute()`, mocking e gerenciamento de janelas, fornecidos pelo serviço por meio do crate `wdio-dioxus-bridge`
- 🔗 testes de deeplinks + manipuladores de protocolo
- 🪵 encaminhamento de logs do Rust + frontend para o reporter de testes do WebdriverIO

## Primeiros Passos

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Quando o assistente perguntar que tipo de teste você gostaria de fazer, selecione _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ e, em seguida, escolha _Dioxus_ na pergunta sobre o framework. O assistente então perguntará qual provedor de WebDriver você deseja usar (o driver embutido em processo recomendado ou o driver externo exclusivo do Windows) e o caminho para o seu binário de depuração compilado.

O assistente instala os pacotes npm automaticamente e imprime no stdout as adições necessárias do Cargo para você colar no seu `Cargo.toml`.

## Configuração Manual

Se você já tem um projeto WebdriverIO, instale o serviço:

```sh
npm install --save-dev @wdio/dioxus-service
```

Os testes exigem o crate `wdio-dioxus-bridge` — ele habilita `browser.dioxus.execute()`, mocking e captura de logs. Adicione-o ao seu `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…e instale-o na configuração desktop do Dioxus em `src/main.rs`. A proteção `#[cfg(debug_assertions)]` mantém a bridge fora das builds de release:

```rust
fn main() {
    let mut config = dioxus::desktop::Config::new();

    #[cfg(debug_assertions)]
    {
        config = wdio_dioxus_bridge::install(config);
    }

    dioxus::LaunchBuilder::desktop()
        .with_cfg(config)
        .launch(App);
}
```

Compile o aplicativo para testes (uma build de depuração mantém a bridge ativa):

```sh
cargo build
```

Em seguida, adicione o serviço e as capabilities à sua configuração:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['dioxus', { driverProvider: 'embedded' }]],
    capabilities: [{
        browserName: 'dioxus',
        'dioxus:options': {
            application: './target/debug/my-app'
        }
    }]
}
```

É isso 🎉

Saiba mais sobre [como configurar o Serviço Dioxus](/docs/desktop-testing/dioxus/configuration), [a configuração da bridge](/docs/desktop-testing/dioxus/plugin-setup), [notas específicas de cada plataforma](/docs/desktop-testing/dioxus/platform-support) e [padrões de uso comuns](/docs/desktop-testing/dioxus/usage-examples).