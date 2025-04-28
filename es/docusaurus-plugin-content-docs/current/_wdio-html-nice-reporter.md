---
id: wdio-html-nice-reporter
title: Reportador HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter es un paquete de terceros, para más información consulte [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Un reportador para webdriver.io que genera un bonito informe HTML.  
El nombre es tonto pero proporciona integración con webdriverio

### Nuevo: ya no está en beta.

### Nuevo: limpiado y cambiado el registro a wdio-logging. Las muestras están actualizadas.
    Necesitas eliminar la inicialización del registrador log4Js de tu configuración

### Nuevo: reescrito como un módulo ES para compatibilidad con webdriverio 8.
    Es posible que necesites cambios en tu aplicación de prueba

### Corrección de error: webdriverio se cerraba en medio de la escritura asíncrona de json.

### Corrección de error: la escritura json no se esperaba correctamente

### Gran nueva mejora: no más errores de memoria insuficiente debido a json.stringify

### Gran nueva característica: grabar videos de cada prueba


## [Registro de cambios](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Información

Este proyecto es una reescritura de [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Está escrito en typescript con muchas mejoras.



## Configuración

### WDIO.config.ts

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo agrega un objeto HtmlReporter como otro reportador al array de reportadores:

### Se proporciona un wdio.config.ts funcional en [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

a continuación hay fragmentos de ese archivo.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Opciones de configuración:
  
### Para generar un informe maestro para todas las suites

webdriver.io llamará al reportador para cada suite de prueba. No agrega los informes. Para hacer esto, agrega los siguientes manejadores de eventos a tu wdio.config.js

Añadir al archivo de configuración del navegador:
```
let reportAggregator : ReportAggregator;
```
Añadir al objeto de configuración del navegador:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Para generar un archivo pdf desde este informe

Requiere un plugin adicional para mantener el soporte ligero para aquellos que no lo quieren.
consulta [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Ejemplo de salida:

![Captura de pantalla del informe](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Esto debe configurarse manualmente. No está disponible en el tiempo de configuración ya que el objeto del navegador no existe hasta que inicias una sesión.