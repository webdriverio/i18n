---
id: globals
title: Globales
---

En tus archivos de prueba, WebdriverIO coloca cada uno de estos métodos y objetos en el entorno global. No tienes que importar nada para usarlos. Sin embargo, si prefieres importaciones explícitas, puedes hacer `import { browser, $, $$, expect } from '@wdio/globals'` y establecer `injectGlobals: false` en tu configuración de WDIO.

Los siguientes objetos globales se establecen si no se configura lo contrario:

- `browser`: [objeto Browser](https://webdriver.io/docs/api/browser) de WebdriverIO
- `driver`: alias de `browser` (se usa al ejecutar pruebas móviles)
- `multiRemoteBrowser`: alias de `browser` o `driver`, pero solo se establece para sesiones [multi-remote](/docs/multiremote)
- `$`: comando para obtener un elemento (ver más en la [documentación de la API](/docs/api/browser/$))
- `$$`: comando para obtener elementos (ver más en la [documentación de la API](/docs/api/browser/$$))
- `expect`: framework de aserciones para WebdriverIO (ver la [documentación de la API](/docs/api/expect-webdriverio))

__Nota:__ WebdriverIO no tiene control sobre los frameworks utilizados (p. ej., Mocha o Jasmine) que establecen variables globales al inicializar su entorno.