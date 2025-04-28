---
id: json-reporter
title: Reportero Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Instalación

```bash
npm install @wdio/json-reporter --save-dev
```

## Configuración

### Resultados a `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Resultados a Archivo

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Resultados a Archivo con nombre de archivo personalizado

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Archivos de Resultados

Con WDIO v5 en adelante, la generación de informes se ha trasladado de un proceso centralizado a uno que es manejado por cada una de las "sesiones" iniciadas para la ejecución paralela de pruebas. Este cambio ayudó a reducir la cantidad de comunicación durante la ejecución de pruebas de WDIO y, por lo tanto, mejoró el rendimiento. La desventaja es que ya no es posible obtener un solo informe para toda la ejecución de pruebas.

`@wdio/json-reporter` proporciona una función de utilidad para fusionar los múltiples archivos json en un solo archivo. Sigue los pasos a continuación para aprovechar esta utilidad.

Puedes ejecutar esto en el [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) de tu `wdio.conf.js`:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Nota:_ `wdio-custom-filename.json` es opcional, si no se proporciona el parámetro, el valor predeterminado es `wdio-merged.json`.

## Contribución

El código fuente de este reportero fue altamente inspirado por el reportero comunitario [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) de [Jim Davis](https://github.com/fijijavis). ¡Gracias por todo el trabajo manteniendo el proyecto!

---

Para más información sobre WebdriverIO, consulta la [página principal](http://webdriver.io).