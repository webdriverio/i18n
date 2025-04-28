---
id: shared-store-service
title: Servicio de Almacenamiento Compartido
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Intercambio de datos entre el proceso principal y los trabajadores (specs).

## Instalación

La forma más sencilla es mantener `@wdio/shared-store-service` como una dependencia de desarrollo en tu `package.json`, mediante:

```sh
npm install @wdio/shared-store-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Uso

Obtén/establece un valor (un objeto plano) desde/hacia el almacenamiento mediante una clave (string). La clave puede ser cualquier cadena arbitraria excepto `*` que está reservada ya que permite obtener todo el almacenamiento.

### Establecer Valores

Para establecer valores en el almacenamiento, llama a:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Obtener Valores

Para obtener valores del almacenamiento, llama a:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // devuelve "foobar123"
```

También puedes obtener todos los valores de clave usando la clave `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // devuelve `{ key: "foobar" }`
```

### Acceder al Almacenamiento en los Hooks de WDIO

También puedes acceder directamente a los manejadores asincrónicos `setValue` y `getValue`.
Asegúrate de llamarlos correctamente con la palabra clave `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

¡IMPORTANTE! Cada archivo de especificación debe ser atómico y aislado de las especificaciones de otros.
La idea del servicio es manejar problemas muy específicos de configuración del entorno.
¡Por favor, evita compartir datos de ejecución de pruebas!

### Grupos de Recursos

Si los hilos de trabajo compiten por recursos que deben asignarse a cada trabajador, puedes usar la API de Grupo de Recursos:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // el trabajador devuelve el recurso utilizado para que lo usen los siguientes trabajadores
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Este ejemplo asegura que ambos trabajadores nunca usen la misma `baseUrl`. Una URL única solo se asigna a un trabajador hasta que éste la libera.

## Configuración

Agrega `shared-store` a la lista de servicios y el objeto `sharedStore` será accesible para ti en el [ámbito del `browser`](https://webdriver.io/docs/api/browser) en tu prueba.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Si estás usando typescript, asegúrate de agregar `@wdio/shared-store-service` a tus `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```