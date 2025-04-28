---
id: spec-reporter
title: Reportero Spec
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin de WebdriverIO para informar en estilo spec.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Instalación

La forma más fácil es mantener `@wdio/spec-reporter` como una devDependency en tu `package.json`, a través de:

```sh
npm install @wdio/spec-reporter --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo agrega `'spec'` como reportero
al array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Opciones del Reportero Spec
### symbols
Proporciona símbolos personalizados para pruebas `passed`, `failed` y/o `skipped`

Tipo: `object`
Predeterminado: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Ejemplo
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
Por defecto, los resultados de las pruebas en Sauce Labs solo pueden ser vistos por un miembro del mismo equipo, no por un miembro
de un equipo diferente. Esta opción habilitará [enlaces compartibles](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)
por defecto, lo que significa que todas las pruebas que se ejecutan en Sauce Labs pueden ser vistas por cualquier persona.
Solo agrega `sauceLabsSharableLinks: false`, como se muestra a continuación, en las opciones del reportero para deshabilitar esta función.

Tipo: `boolean`
Predeterminado: `true`

#### Ejemplo
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Imprime solo los resultados de las especificaciones fallidas.

Tipo: `boolean`
Predeterminado: `false`

#### Ejemplo
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Establece en `true` para mostrar los registros de consola de los pasos en el informe final

Tipo: `boolean`
Predeterminado: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Establece en `true` para mostrar el estado de las pruebas en tiempo real en lugar de solo al final de la ejecución

Tipo: `boolean`
Predeterminado: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Establece en `false` para deshabilitar el prefacio `[ MutliRemoteBrowser ... ]` en los informes.

Tipo: `boolean`
Predeterminado: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Con esta opción establecida en `false`, verás la salida como:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

y con `true` (predeterminado), cada línea tendrá el prefacio:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
Establece en `true` para mostrar salida coloreada en la terminal

Tipo: `boolean`
Predeterminado: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Opciones de Entorno

Hay ciertas opciones que puedes configurar a través de variables de entorno:

### `FORCE_COLOR`

Si se establece en true, por ejemplo, mediante `FORCE_COLOR=0 npx wdio run wdio.conf.js`, toda la coloración del terminal se deshabilitará.