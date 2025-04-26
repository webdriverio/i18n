---
id: getting-started
title: Primeros Pasos
---

## Instalación

La forma más fácil es mantener `@wdio/ocr-service` como una dependencia en tu `package.json` a través de.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](../gettingstarted)

:::note
Este módulo utiliza Tesseract como motor OCR. Por defecto, verificará si tienes una instalación local de Tesseract en tu sistema, si es así, la utilizará. Si no, utilizará el módulo [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) que se instala automáticamente para ti.

Si quieres acelerar el procesamiento de imágenes, se recomienda usar una versión de Tesseract instalada localmente. Consulta también [Tiempo de ejecución de pruebas](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Las instrucciones sobre cómo instalar Tesseract como dependencia del sistema en tu sistema local se pueden encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Para preguntas/errores de instalación con Tesseract, consulta el proyecto
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

### Opciones de Configuración

#### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### `imagesFolder`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `{project-root}/.tmp/ocr`

La carpeta donde se almacenan los resultados del OCR.

:::note
Si proporcionas una `imagesFolder` personalizada, el servicio añadirá automáticamente la subcarpeta `ocr` a ella.
:::

#### `language`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `eng`

El idioma que Tesseract reconocerá. Más información se puede encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas soportados se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Registros

Este módulo añadirá automáticamente registros adicionales a los registros de WebdriverIO. Escribe en los registros `INFO` y `WARN` con el nombre `@wdio/ocr-service`.
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