---
id: dioxus
title: Dioxus
description: "Тестируйте настольные приложения Dioxus на Windows, macOS и Linux с помощью сервиса WebdriverIO Dioxus, используя мастер настройки или ручную конфигурацию."
---

[Dioxus](https://dioxuslabs.com/) — это фреймворк на Rust для создания кроссплатформенных приложений из единой кодовой базы. Его настольные приложения отображаются в нативном webview операционной системы (Wry), а сервис Dioxus для WebdriverIO автоматизирует их обнаружение, запуск и управление ими на Windows (WebView2), macOS (WKWebView) и Linux (WebKitGTK), так что один и тот же набор тестов работает везде.

Преимущества использования WebdriverIO для тестирования приложений Dioxus:

- 🚗 автоматическое развёртывание слоя WebDriver — рекомендуемый встроенный внутрипроцессный драйвер не требует внешнего бинарного файла драйвера ни на одной платформе
- 📦 кроссплатформенное обнаружение бинарных файлов (драйвер Edge WebView2 поставляется в комплекте на Windows для провайдера `external`)
- 🧩 `browser.dioxus.execute()`, мокирование и управление окнами, предоставляемые сервисом через крейт `wdio-dioxus-bridge`
- 🔗 тестирование deeplink и обработчиков протоколов
- 🪵 перенаправление логов Rust и фронтенда в репортер тестов WebdriverIO

## Начало работы

Чтобы создать новый проект WebdriverIO, выполните:

```sh
npm create wdio@latest ./
```

Когда мастер спросит, какой тип тестирования вы хотите выполнять, выберите _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_, а затем выберите _Dioxus_ при запросе фреймворка. Затем мастер спросит, какой провайдер WebDriver вы хотите использовать (рекомендуемый встроенный внутрипроцессный драйвер или внешний драйвер, доступный только для Windows), и путь к собранному отладочному бинарному файлу.

Мастер автоматически устанавливает npm-пакеты и выводит в stdout необходимые дополнения для Cargo, которые нужно вставить в ваш `Cargo.toml`.

## Ручная настройка

Если у вас уже есть проект WebdriverIO, установите сервис:

```sh
npm install --save-dev @wdio/dioxus-service
```

Для тестирования требуется крейт `wdio-dioxus-bridge` — он обеспечивает работу `browser.dioxus.execute()`, мокирования и захвата логов. Добавьте его в ваш `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…и подключите его в конфигурации настольного приложения Dioxus в `src/main.rs`. Условие `#[cfg(debug_assertions)]` исключает мост из релизных сборок:

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

Соберите приложение для тестирования (отладочная сборка сохраняет мост активным):

```sh
cargo build
```

Затем добавьте сервис и capabilities в вашу конфигурацию:

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

Вот и всё 🎉

Узнайте больше о [настройке сервиса Dioxus](/docs/desktop-testing/dioxus/configuration), [настройке моста](/docs/desktop-testing/dioxus/plugin-setup), [особенностях платформ](/docs/desktop-testing/dioxus/platform-support) и [типичных сценариях использования](/docs/desktop-testing/dioxus/usage-examples).