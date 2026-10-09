---
id: tauri
title: Tauri
description: "Prueba aplicaciones de escritorio Tauri en Windows, macOS y Linux con el servicio Tauri de WebdriverIO, usando el asistente de configuración o una configuración manual."
---

[Tauri](https://tauri.app/) es un framework para crear aplicaciones de escritorio multiplataforma ligeras y seguras utilizando un backend en Rust y el webview nativo del sistema operativo. El servicio Tauri de WebdriverIO automatiza la detección, el lanzamiento y el control de aplicaciones Tauri en Windows (WebView2), macOS (WKWebView) y Linux (WebKitGTK), de modo que el mismo conjunto de pruebas funciona en todas partes.

Las ventajas de usar WebdriverIO para probar aplicaciones Tauri son:

- 🚗 aprovisionamiento automático de la capa WebDriver: elige `tauri-driver`, el driver de CrabNebula o el plugin integrado en la aplicación
- 📦 detección de binarios multiplataforma (driver de Edge WebView2 incluido en Windows)
- 🧩 `@wdio/tauri-plugin` opcional para una integración más completa dentro del webview (`browser.tauri.execute`, mocking)
- 🔗 pruebas de deeplinks y manejadores de protocolos
- 🪵 reenvío de los logs de Rust y del frontend al reporter de pruebas de WebdriverIO

## Primeros pasos

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Cuando el asistente te pregunte qué tipo de pruebas deseas realizar, selecciona _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ y luego elige _Tauri_ cuando se te pida el framework. A continuación, el asistente te preguntará qué proveedor de WebDriver quieres usar (el `tauri-driver` oficial, CrabNebula o el plugin integrado) y si deseas el `@wdio/tauri-plugin` opcional para una integración más completa.

El asistente instala automáticamente los paquetes de npm e imprime en stdout las adiciones de Cargo necesarias para que las pegues en tu `src-tauri/Cargo.toml`.

## Configuración manual

Si ya tienes un proyecto de WebdriverIO, instala el servicio:

```sh
npm install --save-dev @wdio/tauri-service
# opcional: integración más completa dentro del webview
npm install --save-dev @wdio/tauri-plugin
```

Para el plugin de WebDriver integrado (recomendado: ejecuta el servidor W3C dentro de tu aplicación, sin necesidad de un `tauri-driver` externo), añade el crate de Cargo a `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…y regístralo en `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Después, añade el servicio a tu configuración:

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

¡Eso es todo! 🎉

Obtén más información sobre [cómo configurar el servicio Tauri](/docs/desktop-testing/tauri/configuration), [la configuración del plugin de Tauri](/docs/desktop-testing/tauri/plugin-setup), [las notas específicas de cada plataforma](/docs/desktop-testing/tauri/platform-support) y [los patrones de uso comunes](/docs/desktop-testing/tauri/usage-examples).