---
id: globals
title: Globales
---

En tus archivos de prueba, WebdriverIO coloca cada uno de estos métodos y objetos en el entorno global. No necesitas importar nada para usarlos. Sin embargo, si prefieres importaciones explícitas, puedes hacer `import { browser, $, $$, expect } from '@wdio/globals'` y configurar `injectGlobals: false` en tu configuración de WDIO.

Los siguientes objetos globales se establecen si no se configura de otra manera:

- `browser`: [objeto Browser](https://webdriver.io/docs/api/browser) de WebdriverIO
- `driver`: alias de `browser` (usado cuando se ejecutan pruebas móviles)
- `multiRemoteBrowser`: alias de `browser` o `driver` pero solo establecido para sesiones [Multiremote](/docs/multiremote)
- `$`: comando para buscar un elemento (ver más en [API docs](/docs/api/browser/$))
- `$$`: comando para buscar elementos (ver más en [API docs](/docs/api/browser/$$))
- `expect`: framework de aserciones para WebdriverIO (ver [API docs](/docs/api/expect-webdriverio))

__Nota:__ WebdriverIO no tiene control sobre los frameworks utilizados (por ejemplo, Mocha o Jasmine) que establecen variables globales al inicializar su entorno.