---
id: tauri
title: Tauri
description: "Тестируйте настольные приложения Tauri в Windows, macOS и Linux с помощью сервиса WebdriverIO для Tauri, используя мастер настройки или ручную конфигурацию."
---

[Tauri](https://tauri.app/) — это фреймворк для создания лёгких, безопасных кроссплатформенных настольных приложений с бэкендом на Rust и нативным webview операционной системы. Сервис WebdriverIO для Tauri автоматизирует обнаружение, запуск и управление приложениями Tauri в Windows (WebView2), macOS (WKWebView) и Linux (WebKitGTK), поэтому один и тот же набор тестов работает везде.

Преимущества использования WebdriverIO для тестирования приложений Tauri:

- 🚗 автоматическая подготовка слоя WebDriver — выберите `tauri-driver`, драйвер CrabNebula или встроенный в приложение плагин
- 📦 кроссплатформенное обнаружение бинарных файлов (драйвер Edge WebView2 поставляется в комплекте для Windows)
- 🧩 опциональный `@wdio/tauri-plugin` для более глубокой интеграции внутри webview (`browser.tauri.execute`, мокирование)
- 🔗 тестирование deeplink-ссылок и обработчиков протоколов
- 🪵 перенаправление логов Rust и фронтенда в репортер тестов WebdriverIO

## Начало работы

Чтобы создать новый проект WebdriverIO, выполните:

```sh
npm create wdio@latest ./
```

Когда мастер спросит, какой тип тестирования вы хотите выполнять, выберите _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, а затем выберите _Tauri_ при запросе фреймворка. После этого мастер спросит, какой провайдер WebDriver вы хотите использовать (официальный `tauri-driver`, CrabNebula или встроенный плагин) и хотите ли вы установить опциональный `@wdio/tauri-plugin` для более глубокой интеграции.

Мастер автоматически установит npm-пакеты и выведет в stdout все необходимые дополнения для Cargo, которые нужно вставить в ваш `src-tauri/Cargo.toml`.

## Ручная настройка

Если у вас уже есть проект WebdriverIO, установите сервис:

```sh
npm install --save-dev @wdio/tauri-service
# опционально: более глубокая интеграция внутри webview
npm install --save-dev @wdio/tauri-plugin
```

Для встроенного плагина WebDriver (рекомендуется — запускает W3C-сервер внутри вашего приложения, внешний `tauri-driver` не нужен) добавьте Cargo-крейт в `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…и зарегистрируйте его в `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Затем добавьте сервис в вашу конфигурацию:

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

Вот и всё 🎉

Узнайте больше о [настройке сервиса Tauri](/docs/desktop-testing/tauri/configuration), [настройке плагина Tauri](/docs/desktop-testing/tauri/plugin-setup), [особенностях отдельных платформ](/docs/desktop-testing/tauri/platform-support) и [типичных сценариях использования](/docs/desktop-testing/tauri/usage-examples).