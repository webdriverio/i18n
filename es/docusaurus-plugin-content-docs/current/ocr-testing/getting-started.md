---
id: getting-started
title: Primeros pasos
description: "Instala y configura @wdio/ocr-service, configura el soporte para TypeScript y ajusta las opciones de contraste, carpeta de imágenes e idioma."
---

## Instalación

La forma más sencilla es mantener `@wdio/ocr-service` como dependencia en tu `package.json` mediante:

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](../gettingstarted)

:::note
Este módulo utiliza Tesseract como motor de OCR. Por defecto, verificará si tienes una instalación local de Tesseract en tu sistema y, si es así, la utilizará. Si no, utilizará el módulo [Node.js Tesseract.js](https://github.com/naptha/tesseract.js), que se instala automáticamente.

Si quieres acelerar el procesamiento de imágenes, se recomienda utilizar una versión de Tesseract instalada localmente. Consulta también [Tiempo de ejecución de las pruebas](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Las instrucciones sobre cómo instalar Tesseract como dependencia del sistema en tu equipo local se pueden encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Para preguntas o errores de instalación con Tesseract, consulta el proyecto
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Soporte para Typescript

Asegúrate de añadir `@wdio/ocr-service` a tu archivo de configuración `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Configuración

Para usar el servicio, necesitas añadir `ocr` a tu array de servicios en `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // tus otros servicios
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Opciones de configuración

#### `contrast`

<Option type="number" default="0.25" required="No">

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

La carpeta donde se almacenan los resultados del OCR.

:::note
Si proporcionas un `imagesFolder` personalizado, el servicio le añadirá automáticamente la subcarpeta `ocr`.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

El idioma que Tesseract reconocerá. Puedes encontrar más información [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Logs

Este módulo añadirá automáticamente logs adicionales a los logs de WebdriverIO. Escribe en los logs `INFO` y `WARN` con el nombre `@wdio/ocr-service`.
A continuación se muestran algunos ejemplos.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```