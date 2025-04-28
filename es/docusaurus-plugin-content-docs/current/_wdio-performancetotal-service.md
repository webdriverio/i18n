---
id: wdio-performancetotal-service
title: Servicio PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Nota:<br/>
Para WebdriverIO v9 usa la versión 4.x.x.<br/>
Para WebdriverIO v8 usa la versión 3.x.x.<br/>
Para WebdriverIO v7 usa la versión 2.x.x.<br/>
Para WebdriverIO v6 usa la versión 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Con este plugin para [webdriver.io](https://webdriver.io/) puedes añadir fácilmente análisis de rendimiento a cualquier flujo en tus pruebas, ya sea una interfaz de usuario pura, API, o una combinación de ambos. Este plugin proporciona una forma simple y eficiente de medir los tiempos de respuesta de varios procedimientos e identificar posibles cuellos de botella en tu aplicación. Con esta información, puedes tomar decisiones informadas sobre optimizaciones y mejoras para aumentar el rendimiento general de tu aplicación.

## Instalación

La forma más fácil de instalar este módulo como dependencia de desarrollo es utilizando el siguiente comando:

```
npm install wdio-performancetotal-service --save-dev
```

## Uso

Añade wdio-performancetotal-service a tu `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...o con las opciones del servicio:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // Las opciones (con valores predeterminados)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Opciones

#### __disableAppendToExistingFile__

Cuando se establece en `true`, las nuevas ejecuciones de prueba comenzarán de nuevo y sobrescribirán cualquier dato de rendimiento existente.
Cuando se establece en `false` (predeterminado), los datos de rendimiento se añadirán a los datos existentes.

> **⚠️ Precaución:**
>
> Esta acción eliminará todos tus datos de rendimiento permanentemente. Asegúrate de tener una copia de seguridad antes de continuar.

#### __performanceResultsFileName__

Puedes anular el nombre predeterminado del archivo de resultados (`performance-results`).
Un archivo de resultados recién creado normalmente sobrescribe el archivo antiguo. Si deseas mantener archivos antiguos, se recomienda añadir una marca de tiempo al nombre del archivo. Por ejemplo:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

El valor predeterminado es `false`. Cuando el valor se establece en `true`, el análisis de rendimiento de las pruebas fallidas se excluirá.

#### __recentDays__

El valor predeterminado es `0` (sin límite). Para establecer el número de días a considerar para el análisis de rendimiento, establece el número de días. También se admiten días parciales (por ejemplo, `recentDays: 0.5`)

#### __performanceResultsDirectory__

Puedes anular la ruta predeterminada para el directorio de resultados en el directorio raíz del proyecto.
Por ejemplo:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

El valor predeterminado es `false`. Si es `true`, los datos de rendimiento también se analizarán por tipo de navegador.


### Uso en pruebas

Simplemente importa __performancetotal__ donde lo necesites, ya sea en tu archivo de prueba o en cualquier otra clase. Este objeto proporciona métodos para medir datos de rendimiento en tus pruebas, incluidos sampleStart y sampleEnd para iniciar y finalizar mediciones de rendimiento.
Aquí hay un ejemplo de cómo podrías usar el objeto performancetotal para medir el rendimiento de inicio de dos sitios web:

```typescript
// Este caso de prueba mide el rendimiento de inicio de Github y SourceForge utilizando el objeto performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Inicia una nueva medición de rendimiento para Github
    performancetotal.sampleStart("GH-Startup");

    // Navega a Github
    browser.url("https://github.com/");

    // Finaliza la medición de Github y guarda los resultados
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Inicia una nueva medición de rendimiento para SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navega a SourceForge
    await browser.url("https://sourceforge.net/");

    // Finaliza la medición de SourceForge y guarda los resultados
    performancetotal.sampleEnd("SF-Startup");
});

```

Puedes recuperar el tiempo empleado para una muestra de rendimiento individual llamando a performancetotal.getSampleTime(sampleName) en tu prueba. Esto te permite verificar el rendimiento de una sección específica de código y asegurarte de que cumple con tus expectativas.

```typescript
// Obtiene el tiempo empleado para una sola muestra
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Obtener los resultados

Cuando todas las pruebas están completas, se crea un nuevo directorio de resultados en la carpeta raíz de tu proyecto (el nombre de directorio predeterminado es performance-results). Dentro de este directorio, se crean dos archivos: performance-results.json y performance-results.csv. Estos archivos contienen datos analizados para cada muestra, incluido el tiempo promedio, el error estándar de la media (SEM), el número de muestras, el valor mínimo, el valor máximo, el tiempo más temprano y el tiempo más reciente. Puedes usar estos datos para identificar cualquier regresión o mejora de rendimiento a lo largo del tiempo.

### Análisis de datos de rendimiento en masa

Para analizar datos de rendimiento existentes en masa sin generar nuevas pruebas, se recomienda utilizar la [herramienta __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Soporte de Typescript

Este plugin es compatible con Typescript.

## Soporte

Para soporte y sugerencias, no dudes en contactarme en [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).