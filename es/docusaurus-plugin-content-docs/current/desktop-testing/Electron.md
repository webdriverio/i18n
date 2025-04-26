---
id: electron
title: Electron
---

Electron es un framework para construir aplicaciones de escritorio utilizando JavaScript, HTML y CSS. Al incorporar Chromium y Node.js en su binario, Electron te permite mantener una base de código JavaScript y crear aplicaciones multiplataforma que funcionan en Windows, macOS y Linux — no se requiere experiencia en desarrollo nativo.

WebdriverIO proporciona un servicio integrado que simplifica la interacción con tu aplicación Electron y hace que probarla sea muy sencillo. Las ventajas de usar WebdriverIO para probar aplicaciones Electron son:

- 🚗 configuración automática del Chromedriver requerido
- 📦 detección automática de la ruta de tu aplicación Electron - compatible con [Electron Forge](https://www.electronforge.io/) y [Electron Builder](https://www.electron.build/)
- 🧩 acceso a las APIs de Electron dentro de tus pruebas
- 🕵️ simulación de APIs de Electron a través de una API similar a Vitest

Solo necesitas unos simples pasos para comenzar. Mira este sencillo tutorial paso a paso en video del canal de [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

O sigue la guía en la siguiente sección.

## Primeros pasos

Para iniciar un nuevo proyecto WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar _"Desktop Testing - of Electron Applications"_ cuando te pregunte qué tipo de pruebas te gustaría hacer. Después proporciona la ruta a tu aplicación Electron compilada, por ejemplo `./dist`, luego simplemente mantén los valores predeterminados o modifícalos según tus preferencias.

El asistente de configuración instalará todos los paquetes necesarios y creará un `wdio.conf.js` o `wdio.conf.ts` con la configuración necesaria para probar tu aplicación. Si aceptas autogenerar algunos archivos de prueba, puedes ejecutar tu primera prueba mediante `npm run wdio`.

## Configuración manual

Si ya estás utilizando WebdriverIO en tu proyecto, puedes omitir el asistente de instalación y simplemente agregar las siguientes dependencias:

```sh
npm install --save-dev wdio-electron-service
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

¡Eso es todo 🎉

Aprende más sobre [cómo configurar el Servicio Electron](/docs/desktop-testing/electron/configuration), [cómo simular APIs de Electron](/docs/desktop-testing/electron/mocking) y [cómo acceder a las APIs de Electron](/docs/desktop-testing/electron/api).