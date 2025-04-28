---
id: wdio-nuxt-service
title: Servicio de Nuxt
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service es un paquete de terceros, para más información por favor vea [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Este servicio te ayuda a lanzar tu aplicación cuando usas [Nuxt](https://nuxt.com/) como herramienta de construcción. Inicia automáticamente el servidor Nuxt usando tu `nuxt.conf.js` antes de iniciar la prueba.

## Instalación

Si estás comenzando con WebdriverIO puedes usar el asistente de configuración para configurar todo:

```sh
npm init wdio@latest .
```

Detectará tu proyecto como un proyecto Nuxt e instalará todos los plugins necesarios para ti. Si estás añadiendo este servicio a una configuración existente, siempre puedes instalarlo mediante:

```bash
npm install wdio-nuxt-service --save-dev
```

## Configuración

Para habilitar el servicio, simplemente añádelo a tu lista de `services` en tu archivo `wdio.conf.js`, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Puedes aplicar opciones de servicio pasando un array con un objeto de configuración, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## Uso

Si tu configuración está correctamente establecida, el servicio establecerá la opción [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) para apuntar a tu aplicación. Puedes navegar a ella mediante el comando [`url`](https://webdriver.io/docs/api/browser/url), por ejemplo:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Opciones

### `rootDir`

Directorio raíz del proyecto.

Tipo: `string`<br />
Por defecto: `process.cwd()`

### `dotenv`

Archivo de entorno que se cargará antes de que se inicie el servidor.

Tipo: `string`<br />
Por defecto: `.env`

### `hostname`

Nombre de host en el que se iniciará el servidor.

Tipo: `string`<br />
Por defecto: `localhost`

### `port`

Puerto en el que se iniciará el servidor.

Tipo: `number`<br />
Por defecto: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Establecer en true si el servidor de prueba debe iniciarse en https (los certificados deben configurarse en la configuración de Nuxt).

Tipo: `boolean`<br />
Por defecto: `false`

### `sslCert`

Certificado SSL que se utilizará para iniciar el servidor en https.

Tipo: `string`

### `sslKey`

Clave SSL que se utilizará para iniciar el servidor en https.

Tipo: `string`

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).