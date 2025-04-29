---
id: wdio-json-html-reporter
title: Reportero JSON HTML Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---


> wdio-json-html-reporter es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Este es un reportero personalizado de WebDriverIO que genera informes JSON detallados durante la ejecución de pruebas y proporciona un generador de informes HTML portátil para visualizar los resultados de tus pruebas. Registra marcas de tiempo, metadatos de ejecución y puede capturar capturas de pantalla según demanda. El paquete sigue la convención de WebDriverIO para reporteros y se publica como un paquete npm bajo el nombre `wdio-json-html-reporter`.

## Tabla de Contenidos

- [Descripción general](#overview)
- [Características](#features)
- [Instalación](#installation)
  - [1. Instalar el paquete](#1-install-the-package)
  - [2. Verificar la instalación](#2-verify-installation)
  - [3. Actualizar la configuración de WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Ejecutar tus pruebas](#4-run-your-tests)
- [Uso de CLI](#cli-usage)
- [Opción de historial y generación de historial agregado](#history-option-and-aggregated-history-generation)
- [Capturas de pantalla](#screenshots)

## Overview

WDIO JSON HTML REPORTER proporciona dos componentes principales:

- **JSONReporter**: Un reportero personalizado que extiende la interfaz de reportero de WebDriverIO para recopilar eventos de prueba y generar un archivo JSON con metadatos, resultados de pruebas y (opcionalmente) capturas de pantalla.
- **HTMLReportGenerator**: Una utilidad para convertir múltiples archivos de informe JSON en un informe HTML completo con gráficos interactivos, filtrado y funcionalidad de exportación. Además, el generador de informes ahora soporta un archivo de historial opcional para mostrar datos de ejecución históricos si están disponibles. Cuando no se proporcionan datos de historial, el informe omite la sección histórica y muestra solo los Errores Únicos.

Estas herramientas te ayudan a obtener información clara sobre tus ejecuciones de prueba, lo cual es esencial para la depuración y la integración continua.

## Features

- **Informes JSON**: Informe detallado con marcas de tiempo, nombres de suite, resultados de pruebas, errores y capturas de pantalla opcionales.
- **Informes HTML**: Convierte informes JSON en un informe HTML portátil con un panel de control, gráficos, informe de prueba detallado y capacidades de filtrado.
- **Exportación a Excel**: El informe de prueba detallado puede exportarse a un archivo Excel.
- **Soporte para capturas de pantalla**: Captura pantallas para pruebas fallidas (o todas las pruebas) según tu configuración.
- **Metadatos de ejecución**: Registra información del navegador, horas de inicio/fin de ejecución y duración total.
- **Ejecución histórica (Opcional)**: Proporciona un archivo JSON de historial para incluir datos de ejecución históricos por suite. Si no se proporcionan datos históricos, el informe ocultará automáticamente esta sección y mostrará solo los Errores Únicos.
- **Generación de historial agregado**: El reportero JSON ahora incluye una característica de generación de historial agregado. Usando el método estático `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, puedes escanear automáticamente todos los archivos de informe JSON (que coincidan con el patrón `test-report-*.json`) en tu directorio de informes, agregar resultados de pruebas y calcular comparaciones de defectos basadas en datos históricos. El registro de historial agregado se añade a tu archivo de historial y puede ser utilizado por el generador de informes HTML para visualizar tendencias a lo largo del tiempo.

## Installation

Para instalar el paquete `wdio-json-html-reporter`, sigue estos pasos:

### 1. Install the package

Ejecuta el siguiente comando para instalar el paquete como una dependencia de desarrollo:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Asegúrate de que el paquete se ha instalado correctamente ejecutando:

```bash
npm list wdio-json-html-reporter
```

Si se instaló correctamente, deberías ver una salida similar a:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Modifica tu archivo `wdio.conf.js` o `wdio.conf.ts` para incluir el reportero personalizado:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Ejecuta tu suite de pruebas WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Además de integrarse con WebDriverIO, puedes ejecutar el generador de informes HTML directamente desde la línea de comandos utilizando el CLI integrado.

**Uso:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Por ejemplo, si tienes tus archivos JSON en una carpeta llamada `test/reports/json-reports` y quieres generar un informe HTML llamado `test/reports/report.html`, puedes ejecutar:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Si también tienes un archivo de historial (por ejemplo, `test/reports/history.json`), inclúyelo como un cuarto parámetro opcional:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Nota:**  
La funcionalidad CLI se activa solo cuando pasas el comando `generate-html` como primer parámetro. Cuando se ejecuta a través de WebDriverIO (por ejemplo, con `wdio run wdio.conf.js`), la lógica CLI se omite.

## History Option and Aggregated History Generation

El generador de informes HTML ahora soporta una **opción de historial**. Esto te permite proporcionar un archivo JSON que contenga datos de ejecución históricos que se fusionan en el informe bajo la sección "Ejecución Histórica por Suite". Si se proporciona el archivo de historial y contiene datos válidos, el informe mostrará tendencias históricas junto con gráficos interactivos y un acordeón para cada suite. Si no se pasa ningún archivo de historial o si el archivo no contiene datos de suite, el informe ocultará automáticamente la sección histórica y mostrará solo la descripción general de Errores Únicos.

Además, el reportero JSON ahora incluye una característica de **generación de historial agregado**. Con el método estático `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, puedes escanear automáticamente todos los archivos de informe JSON (que coincidan con el patrón `test-report-*.json`) en tu directorio de informes, agregar resultados de pruebas (sumando recuentos de pruebas y fusionando datos de suite), y calcular comparaciones de defectos comparando con el último registro agregado. El registro de historial recién generado se añade al archivo de historial especificado. Estos datos de historial agregados pueden ser utilizados posteriormente por el generador de informes HTML para proporcionar información de ejecución histórica a lo largo de múltiples ejecuciones de pruebas.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)