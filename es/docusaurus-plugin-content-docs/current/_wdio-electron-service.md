---
id: wdio-electron-service
title: Servicio Electron
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---


> wdio-electron-service es un paquete de terceros, para más información por favor visite [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Servicio de WebdriverIO para probar aplicaciones Electron**

Permite realizar pruebas E2E multiplataforma de aplicaciones Electron a través del extenso ecosistema de WebdriverIO.

Sucesor espiritual de [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Características

Facilita las pruebas de aplicaciones Electron mediante:

- 🚗 configuración automática del Chromedriver requerido (para Electron v26 y superior)
- 📦 detección automática de la ruta de tu aplicación Electron
  - compatible con [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) y aplicaciones sin empaquetar
- 🧩 acceso a las APIs de Electron dentro de tus pruebas
- 🕵️ simulación de APIs de Electron a través de una API similar a Vitest

## Instalación

Necesitarás instalar `WebdriverIO`, las instrucciones se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Inicio Rápido

La forma recomendada para comenzar rápidamente es utilizar el [asistente de configuración de WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Inicio Rápido Manual

Para comenzar sin utilizar el asistente de configuración, necesitarás instalar el servicio y `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

O utiliza tu gestor de paquetes preferido: pnpm, yarn, etc.

A continuación, crea tu archivo de configuración WDIO. Si necesitas inspiración para esto, hay una configuración funcional en el [directorio de ejemplos](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) de este repositorio, así como la [página de referencia de configuración de WDIO](https://webdriver.io/docs/configuration).

Necesitarás añadir `electron` a tu array de servicios y establecer una capacidad Electron, por ejemplo:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Finalmente, [ejecuta algunas pruebas](https://webdriver.io/docs/gettingstarted#run-test) utilizando tu archivo de configuración.

Esto iniciará una instancia de tu aplicación de la misma manera que WDIO maneja navegadores como Chrome o Firefox. El servicio funciona con [WDIO (paralelo) multiremote](https://webdriver.io/docs/multiremote) si necesitas ejecutar instancias adicionales simultáneamente, por ejemplo, múltiples instancias de tu aplicación o diferentes combinaciones de tu aplicación y un navegador web.

Si utilizas [Electron Forge](https://www.electronforge.io/) o [Electron Builder](https://www.electron.build/) para empaquetar tu aplicación, el servicio intentará automáticamente encontrar la ruta a tu aplicación Electron empaquetada. Puedes proporcionar una ruta personalizada al binario a través de capacidades de servicio personalizadas, por ejemplo:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Consulta el [documento de configuración](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) para saber cómo encontrar el valor de `appBinaryPath` para los diferentes sistemas operativos soportados por Electron.

Alternativamente, puedes dirigir el servicio a una aplicación sin empaquetar proporcionando la ruta al script `main.js`. Electron deberá estar instalado en tus `node_modules`. Se recomienda empaquetar aplicaciones sin empaquetar utilizando un empaquetador como Rollup, Parcel, Webpack, etc.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Configuración de Chromedriver

**Si tu aplicación utiliza una versión de Electron inferior a la v26, necesitarás [configurar manualmente Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Esto se debe a que WDIO utiliza Chrome for Testing para descargar Chromedriver, que solo proporciona versiones de Chromedriver de v115 o más recientes.

## Documentación

**[Configuración del Servicio](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Configuración de Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Acceso a las APIs de Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Simulación de APIs de Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Gestión de Ventanas](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Modo Independiente](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Desarrollo](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Problemas Comunes y Depuración](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Desarrollo

Lee el [documento de desarrollo](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) si estás interesado en contribuir.

## Integraciones de Ejemplo

Consulta nuestro proyecto [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate) que muestra cómo integrar WebdriverIO en una aplicación de ejemplo. También puedes echar un vistazo a los directorios de [Aplicaciones de Ejemplo](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) y [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) en este repositorio.

## Soporte

Si tienes problemas para ejecutar WDIO con el servicio, deberías consultar los [Problemas Comunes](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) documentados en primera instancia, y luego abrir una discusión en el [foro principal de WDIO](https://github.com/webdriverio/webdriverio/discussions).

El foro de discusión del servicio Electron es mucho menos activo que el de WDIO, pero si el problema que estás experimentando es específico de Electron o del uso del servicio, puedes abrir una discusión [aquí](https://github.com/webdriverio-community/wdio-electron-service/discussions).