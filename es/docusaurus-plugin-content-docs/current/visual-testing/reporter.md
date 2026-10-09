---
id: visual-reporter
title: Visual Reporter
description: "Genera y explora el Visual Reporter para revisar las diferencias de las pruebas visuales a partir de la salida JSON de @wdio/visual-service, de forma local o en CI."
---

El Visual Reporter es una nueva funcionalidad introducida en `@wdio/visual-service`, a partir de la versión [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Este reporter permite a los usuarios visualizar los informes de diferencias en JSON generados por el servicio de Visual Testing y transformarlos en un formato legible para humanos. Ayuda a los equipos a analizar y gestionar mejor los resultados de las pruebas visuales, proporcionando una interfaz gráfica para revisar la salida.

Para utilizar esta funcionalidad, asegúrate de tener la configuración necesaria para generar el archivo `output.json` requerido. Este documento te guiará en la configuración, ejecución y comprensión del Visual Reporter.

# Requisitos previos

Antes de usar el Visual Reporter, asegúrate de haber configurado el servicio de Visual Testing para generar archivos de informe JSON:

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

Para instrucciones de configuración más detalladas, consulta la [Documentación de Visual Testing](./) de WebdriverIO o [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Instalación

Para instalar el Visual Reporter, agrégalo como dependencia de desarrollo a tu proyecto usando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Esto garantizará que los archivos necesarios estén disponibles para generar informes de tus pruebas visuales.

# Uso

## Generar el informe visual

Una vez que hayas ejecutado tus pruebas visuales y estas hayan generado el archivo `output.json`, puedes generar el informe visual usando la CLI o los prompts interactivos.

### Uso de la CLI

Puedes usar el comando de la CLI para generar el informe ejecutando:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Opciones obligatorias:

-   `--jsonOutput`: La ruta relativa al archivo `output.json` generado por el servicio de Visual Testing. Esta ruta es relativa al directorio desde el que ejecutas el comando.
-   `--reportFolder`: El directorio relativo donde se almacenará el informe generado. Esta ruta también es relativa al directorio desde el que ejecutas el comando.

#### Opciones opcionales:

-   `--logLevel`: Establécelo en `debug` para obtener un registro detallado, especialmente útil para la resolución de problemas.

#### Ejemplo

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Esto generará el informe en la carpeta especificada y mostrará información en la consola. Por ejemplo:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Ver el informe

:::warning
Abrir `path/to/report/index.html` directamente en un navegador **sin servirlo desde un servidor local** **NO** funcionará.
:::

Para ver el informe, necesitas usar un servidor sencillo como [sirv-cli](https://www.npmjs.com/package/sirv-cli). Puedes iniciar el servidor con el siguiente comando:

```bash
npx sirv-cli /path/to/report --single
```

Esto producirá registros similares al ejemplo siguiente. Ten en cuenta que el número de puerto puede variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ahora puedes ver el informe abriendo la URL proporcionada en tu navegador.

### Uso de prompts interactivos

Como alternativa, puedes ejecutar el siguiente comando y responder a los prompts para generar el informe:

```bash
npx @wdio/visual-reporter
```

Los prompts te guiarán para proporcionar las rutas y opciones necesarias. Al final, el prompt interactivo también te preguntará si deseas iniciar un servidor para ver el informe. Si eliges iniciar el servidor, la herramienta lanzará un servidor sencillo y mostrará una URL en los registros. Puedes abrir esta URL en tu navegador para ver el informe.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Ver el informe

:::warning
Abrir `path/to/report/index.html` directamente en un navegador **sin servirlo desde un servidor local** **NO** funcionará.
:::

Si optaste por **no** iniciar el servidor mediante el prompt interactivo, aún puedes ver el informe ejecutando manualmente el siguiente comando:

```bash
npx sirv-cli /path/to/report --single
```

Esto producirá registros similares al ejemplo siguiente. Ten en cuenta que el número de puerto puede variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ahora puedes ver el informe abriendo la URL proporcionada en tu navegador.

# Demo del informe

Para ver un ejemplo de cómo se ve el informe, visita nuestra [demo en GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprender el informe visual

El Visual Reporter ofrece una vista organizada de los resultados de tus pruebas visuales. Para cada ejecución de pruebas, podrás:

-   Navegar fácilmente entre los casos de prueba y ver los resultados agregados.
-   Revisar metadatos como los nombres de las pruebas, los navegadores utilizados y los resultados de las comparaciones.
-   Ver imágenes de diferencias que muestran dónde se detectaron diferencias visuales.

Esta representación visual simplifica el análisis de los resultados de tus pruebas, facilitando la identificación y corrección de regresiones visuales.

# Integraciones con CI

Estamos trabajando para dar soporte a diferentes herramientas de CI como Jenkins, GitHub Actions, etc. Si te gustaría ayudarnos, contáctanos en [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).