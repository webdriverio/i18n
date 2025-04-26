---
id: ocr-testing
title: Pruebas OCR
---

Las pruebas automatizadas en aplicaciones nativas móviles y sitios de escritorio pueden ser particularmente desafiantes cuando se trata de elementos que carecen de identificadores únicos. Los [selectores estándar de WebdriverIO](https://webdriver.io/docs/selectors) no siempre pueden ayudarte. Entra al mundo del `@wdio/ocr-service`, un servicio potente que aprovecha OCR ([Reconocimiento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition)) para buscar, esperar e interactuar con elementos en pantalla basándose en su **texto visible**.

Los siguientes comandos personalizados se proporcionarán y añadirán al objeto `browser/driver` para que tengas las herramientas adecuadas para hacer tu trabajo.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Cómo funciona

Este servicio:

1. crea una captura de pantalla de tu pantalla/dispositivo. (Si es necesario, puedes proporcionar un haystack, que puede ser un elemento o un objeto rectángulo, para señalar un área específica. Consulta la documentación de cada comando.)
1. optimiza el resultado para OCR convirtiendo la captura de pantalla en blanco/negro con un alto contraste (el alto contraste es necesario para evitar mucho ruido de fondo en la imagen. Esto se puede personalizar por comando.)
1. utiliza [Reconocimiento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition) de [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) para obtener todo el texto de la pantalla y resaltar todo el texto encontrado en una imagen. Puede soportar varios idiomas que se pueden encontrar [aquí.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utiliza Lógica Difusa de [Fuse.js](https://fusejs.io/) para encontrar cadenas que son _aproximadamente iguales_ a un patrón dado (en lugar de exactamente). Esto significa, por ejemplo, que el valor de búsqueda `Username` también puede encontrar el texto `Usename` o viceversa.
1. Proporciona un asistente de cli (`npx ocr-service`) para validar tus imágenes y recuperar texto a través de tu terminal

Un ejemplo de los pasos 1, 2 y 3 se puede encontrar en esta imagen

![Pasos del proceso](/img/ocr/processing-steps.jpg)

Funciona con **CERO** dependencias del sistema (además de lo que usa WebdriverIO), pero si es necesario, también puede funcionar con una instalación local de [Tesseract](https://tesseract-ocr.github.io/tessdoc/) ¡lo que reducirá drásticamente el tiempo de ejecución! (Consulta también la [Optimización de Ejecución de Pruebas](#test-execution-optimization) sobre cómo acelerar tus pruebas.)

¿Entusiasmado? Comienza a usarlo hoy siguiendo la guía de [Primeros Pasos](./getting-started).

:::caution Importante
Hay una variedad de razones por las que podrías no obtener una salida de buena calidad de Tesseract. Una de las razones más importantes que podría estar relacionada con tu aplicación y este módulo podría ser el hecho de que no hay una distinción de color adecuada entre el texto que debe encontrarse y el fondo. Por ejemplo, el texto blanco sobre un fondo oscuro puede encontrarse _fácilmente_, pero el texto claro sobre un fondo blanco o el texto oscuro sobre un fondo oscuro difícilmente se puede encontrar.

Consulta también [esta página](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) para obtener más información de Tesseract.

No olvides leer también las [Preguntas Frecuentes](./ocr-faq).
:::