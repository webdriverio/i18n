---
id: getting-started
title: Primeros pasos
description: "Instala WebdriverIO DevTools y ejecuta tu primera prueba en modo en vivo o en modo de traza para reproducir el DOM, las capturas de pantalla, la red y la salida de la consola."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools proporciona a tus pruebas de navegador de extremo a extremo una interfaz de herramientas de desarrollo para ejecutar, depurar e inspeccionar la automatización: reproducción del DOM, capturas de pantalla por comando, captura de red y consola, y grabaciones de pantalla de la sesión. Funciona en dos modos. El **modo en vivo** abre un [panel](/docs/devtools/dashboard) interactivo en una ventana del navegador mientras se ejecutan tus pruebas, para que puedas observarlas y volver a ejecutarlas en tiempo real. El **modo de traza** omite la interfaz y genera un [artefacto de traza](/docs/devtools/wdio/trace-mode) portátil y sin conexión (`trace.zip`) que puedes abrir más tarde en el reproductor `show-trace`, ideal para CI. Esta página te permite empezar rápidamente con el modo en vivo; el modo de traza está a solo una opción de distancia.

## Instalación y primera ejecución

Elige tu adaptador, instálalo y añade la configuración mínima que se muestra a continuación. Ejecuta tus pruebas como de costumbre: el panel de DevTools se abre automáticamente en una nueva ventana del navegador.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Instala el servicio:

```sh
npm install @wdio/devtools-service --save-dev
```

Añádelo a la configuración de tu ejecutor de pruebas:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Ejecuta tus pruebas de WebdriverIO de forma normal: la interfaz de DevTools se abre automáticamente y las pruebas comienzan a visualizarse de inmediato.

</TabItem>
<TabItem value="selenium">

Funciona con Mocha, Jest, Cucumber o un script `node` simple; el plugin detecta automáticamente el ejecutor. Instálalo:

```bash
npm install @wdio/selenium-devtools
```

Añade una sola importación y una llamada a `configure` al principio de tu archivo de prueba (se muestra Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Ejecútalo: la interfaz de DevTools se abre en una nueva ventana de Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Consulta la [página de Selenium](/docs/devtools/selenium) para ver las configuraciones de Jest, Cucumber y Node simple.

</TabItem>
<TabItem value="nightwatch">

Instala el adaptador:

```bash
npm install @wdio/nightwatch-devtools
```

Intégralo en tu configuración de Nightwatch mediante `globals`; no es necesario modificar los archivos de prueba:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Necesario para capturar las solicitudes de red
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Ejecuta tus pruebas de forma normal: la interfaz de DevTools se abre automáticamente:

```bash
nightwatch
```

Consulta la [página de Nightwatch](/docs/devtools/nightwatch) para ver la configuración de Cucumber/BDD.

</TabItem>
</Tabs>

## Próximos pasos

- **[Modo de traza](/docs/devtools/wdio/trace-mode)**: establece `mode: 'trace'` para omitir la interfaz y generar un artefacto de traza portátil y sin conexión para CI.
- **[Referencia de configuración](/docs/devtools/reference)**: todas las opciones de los tres adaptadores.
- **Frameworks**: guías completas para cada adaptador: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).