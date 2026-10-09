---
id: dioxus
title: Dioxus
description: "Prueba aplicaciones de escritorio de Dioxus en Windows, macOS y Linux con el servicio Dioxus de WebdriverIO, usando el asistente de configuración o una configuración manual."
---

[Dioxus](https://dioxuslabs.com/) es un framework de Rust para crear aplicaciones multiplataforma a partir de una única base de código. Sus aplicaciones de escritorio se renderizan en el webview nativo del sistema operativo (Wry), y el servicio Dioxus de WebdriverIO automatiza su detección, lanzamiento y control en Windows (WebView2), macOS (WKWebView) y Linux (WebKitGTK), de modo que el mismo conjunto de pruebas funciona en todas partes.

Las ventajas de usar WebdriverIO para probar aplicaciones Dioxus son:

- 🚗 aprovisionamiento automático de la capa WebDriver: el driver integrado en el proceso (recomendado) no necesita ningún binario de driver externo en ninguna plataforma
- 📦 detección de binarios multiplataforma (el driver de Edge WebView2 viene incluido en Windows para el proveedor `external`)
- 🧩 `browser.dioxus.execute()`, mocking y gestión de ventanas, proporcionados por el servicio a través del crate `wdio-dioxus-bridge`
- 🔗 pruebas de deeplinks y manejadores de protocolos
- 🪵 reenvío de los logs de Rust y del frontend al reporter de pruebas de WebdriverIO

## Primeros pasos

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Cuando el asistente pregunte qué tipo de pruebas deseas realizar, selecciona _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ y luego elige _Dioxus_ cuando se te pida el framework. A continuación, el asistente te preguntará qué proveedor de WebDriver quieres usar (el driver integrado en el proceso, recomendado, o el driver externo, solo para Windows) y la ruta a tu binario de depuración compilado.

El asistente instala automáticamente los paquetes de npm e imprime en stdout las adiciones de Cargo necesarias para que las pegues en tu `Cargo.toml`.

## Configuración manual

Si ya tienes un proyecto de WebdriverIO, instala el servicio:

```sh
npm install --save-dev @wdio/dioxus-service
```

Las pruebas requieren el crate `wdio-dioxus-bridge`, que habilita `browser.dioxus.execute()`, el mocking y la captura de logs. Añádelo a tu `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…e instálalo en la configuración de escritorio de Dioxus en `src/main.rs`. La guarda `#[cfg(debug_assertions)]` mantiene el bridge fuera de las compilaciones de release:

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

Compila la aplicación para las pruebas (una compilación de depuración mantiene el bridge activo):

```sh
cargo build
```

Después, añade el servicio y las capabilities a tu configuración:

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

¡Eso es todo! 🎉

Obtén más información sobre [cómo configurar el servicio Dioxus](/docs/desktop-testing/dioxus/configuration), [la configuración del bridge](/docs/desktop-testing/dioxus/plugin-setup), [las notas específicas de cada plataforma](/docs/desktop-testing/dioxus/platform-support) y [los patrones de uso comunes](/docs/desktop-testing/dioxus/usage-examples).