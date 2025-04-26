---
id: visual-reporter
title: Reportero Visual
---

El Reportero Visual es una nueva característica introducida en el `@wdio/visual-service`, a partir de la versión [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Este reportero permite a los usuarios visualizar los informes de diferencias JSON generados por el servicio de Pruebas Visuales y transformarlos en un formato legible para humanos. Ayuda a los equipos a analizar y gestionar mejor los resultados de las pruebas visuales proporcionando una interfaz gráfica para revisar la salida.

Para utilizar esta característica, asegúrese de tener la configuración necesaria para generar el archivo `output.json` requerido. Este documento le guiará a través de la configuración, ejecución y comprensión del Reportero Visual.

# Prerrequisitos

Antes de usar el Reportero Visual, asegúrese de haber configurado el servicio de Pruebas Visuales para generar archivos de informe JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Genera el archivo output.json
            },
        ],
    ],
};
```

Para instrucciones de configuración más detalladas, consulte la [Documentación de Pruebas Visuales](./) de WebdriverIO o el [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Instalación

Para instalar el Reportero Visual, añádalo como una dependencia de desarrollo a su proyecto usando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Esto asegurará que los archivos necesarios estén disponibles para generar informes de sus pruebas visuales.

# Uso

## Construyendo el Informe Visual

Una vez que haya ejecutado sus pruebas visuales y hayan generado el archivo `output.json`, puede construir el informe visual utilizando la CLI o los mensajes interactivos.

### Uso de CLI

Puede usar el comando CLI para generar el informe ejecutando:

```bash
npx wdio-visual-reporter --jsonOutput=<ruta-a-output.json> --reportFolder=<ruta-para-almacenar-informe> --logLevel=debug
```

#### Opciones requeridas:

-   `--jsonOutput`: La ruta relativa al archivo `output.json` generado por el servicio de Pruebas Visuales. Esta ruta es relativa al directorio desde el cual ejecuta el comando.
-   `--reportFolder`: El directorio relativo donde se almacenará el informe generado. Esta ruta también es relativa al directorio desde el cual ejecuta el comando.

#### Opciones opcionales:

-   `--logLevel`: Establezca en `debug` para obtener un registro detallado, especialmente útil para solucionar problemas.

#### Ejemplo

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Esto generará el informe en la carpeta especificada y proporcionará retroalimentación en la consola. Por ejemplo:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visualización del Informe

:::warning
Abrir `path/to/report/index.html` directamente en un navegador **sin servirlo desde un servidor local** **NO** funcionará.
:::

Para ver el informe, necesita usar un servidor simple como [sirv-cli](https://www.npmjs.com/package/sirv-cli). Puede iniciar el servidor con el siguiente comando:

```bash
npx sirv-cli /path/to/report --single
```

Esto producirá registros similares al ejemplo a continuación. Tenga en cuenta que el número de puerto puede variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ahora puede ver el informe abriendo la URL proporcionada en su navegador.

### Uso de Mensajes Interactivos

Alternativamente, puede ejecutar el siguiente comando y responder a los mensajes para generar el informe:

```bash
npx @wdio/visual-reporter
```

Los mensajes le guiarán a través de la provisión de las rutas y opciones requeridas. Al final, el mensaje interactivo también le preguntará si desea iniciar un servidor para ver el informe. Si elige iniciar el servidor, la herramienta lanzará un servidor simple y mostrará una URL en los registros. Puede abrir esta URL en su navegador para ver el informe.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visualización del Informe

:::warning
Abrir `path/to/report/index.html` directamente en un navegador **sin servirlo desde un servidor local** **NO** funcionará.
:::

Si optó por **no** iniciar el servidor a través del mensaje interactivo, aún puede ver el informe ejecutando el siguiente comando manualmente:

```bash
npx sirv-cli /path/to/report --single
```

Esto producirá registros similares al ejemplo a continuación. Tenga en cuenta que el número de puerto puede variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ahora puede ver el informe abriendo la URL proporcionada en su navegador.

# Demo del Informe

Para ver un ejemplo de cómo se ve el informe, visite nuestra [demo en GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Entendiendo el Informe Visual

El Reportero Visual proporciona una vista organizada de los resultados de sus pruebas visuales. Para cada ejecución de prueba, podrá:

-   Navegar fácilmente entre casos de prueba y ver resultados agregados.
-   Revisar metadatos como nombres de pruebas, navegadores utilizados y resultados de comparación.
-   Ver imágenes de diferencias que muestran dónde se detectaron diferencias visuales.

Esta representación visual simplifica el análisis de los resultados de sus pruebas, facilitando la identificación y solución de regresiones visuales.

# Integraciones CI

Estamos trabajando en el soporte de diferentes herramientas de CI como Jenkins, GitHub Actions y más. Si desea ayudarnos, póngase en contacto con nosotros en [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).