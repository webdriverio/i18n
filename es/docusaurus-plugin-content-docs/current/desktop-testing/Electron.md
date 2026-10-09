---
id: electron
title: Electron
description: "Prueba aplicaciones Electron con el servicio Electron de WebdriverIO, que configura Chromedriver, detecta el binario de tu aplicación y te permite simular las API de Electron."
---

Electron es un framework para crear aplicaciones de escritorio usando JavaScript, HTML y CSS. Al integrar Chromium y Node.js en su binario, Electron te permite mantener una única base de código JavaScript y crear aplicaciones multiplataforma que funcionan en Windows, macOS y Linux, sin necesidad de experiencia en desarrollo nativo.

WebdriverIO proporciona un servicio integrado que simplifica la interacción con tu aplicación Electron y hace que probarla sea muy sencillo. Las ventajas de usar WebdriverIO para probar aplicaciones Electron son:

- 🚗 configuración automática del Chromedriver requerido
- 📦 detección automática de la ruta de tu aplicación Electron: compatible con [Electron Forge](https://www.electronforge.io/) y [Electron Builder](https://www.electron.build/)
- 🧩 acceso a las API de Electron dentro de tus pruebas
- 🕵️ simulación (mocking) de las API de Electron mediante una API similar a la de Vitest

Solo necesitas unos pocos pasos sencillos para comenzar. Mira este sencillo tutorial en video paso a paso para empezar, del canal de [YouTube de WebdriverIO](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

O sigue la guía de la siguiente sección.

## Primeros pasos

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Cuando se te pregunte qué tipo de pruebas deseas realizar, selecciona _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ y luego elige _Electron_ cuando se te pida el framework. Después, proporciona la ruta a tu aplicación Electron compilada, p. ej. `./dist`, y luego simplemente mantén los valores predeterminados o modifícalos según tus preferencias.

El asistente de configuración instalará todos los paquetes necesarios y creará un `wdio.conf.js` o `wdio.conf.ts` con la configuración necesaria para probar tu aplicación. Si aceptas generar automáticamente algunos archivos de prueba, puedes ejecutar tu primera prueba mediante `npm run wdio`.

## Configuración manual

Si ya estás usando WebdriverIO en tu proyecto, puedes omitir el asistente de instalación y simplemente agregar las siguientes dependencias:

```sh
npm install --save-dev @wdio/electron-service
```

Luego puedes usar la siguiente configuración:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

¡Eso es todo! 🎉

Obtén más información sobre [cómo configurar el servicio Electron](/docs/desktop-testing/electron/configuration), [cómo simular las API de Electron](/docs/desktop-testing/electron/api-reference) y [cómo acceder a las API de Electron](/docs/desktop-testing/electron/api).