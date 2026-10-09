---
id: ocr-testing
title: Pruebas con OCR
description: "Localiza e interactúa con elementos por su texto visible en aplicaciones web y móviles con el servicio OCR cuando los selectores habituales no son suficientes."
---

Las pruebas automatizadas en aplicaciones móviles nativas y sitios de escritorio pueden ser especialmente difíciles cuando se trata de elementos que carecen de identificadores únicos. Los [selectores estándar de WebdriverIO](https://webdriver.io/docs/selectors) no siempre podrán ayudarte. Adéntrate en el mundo de `@wdio/ocr-service`, un potente servicio que aprovecha el OCR ([Reconocimiento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition)) para buscar, esperar e interactuar con elementos en pantalla basándose en su **texto visible**.

Los siguientes comandos personalizados se proporcionarán y añadirán al objeto `browser/driver` para que tengas el conjunto de herramientas adecuado para hacer tu trabajo.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Cómo funciona

Este servicio:

1. crea una captura de pantalla de tu pantalla/dispositivo. (Si es necesario, puedes proporcionar un haystack, que puede ser un elemento o un objeto rectángulo, para delimitar un área específica. Consulta la documentación de cada comando).
1. optimiza el resultado para el OCR convirtiendo la captura de pantalla a blanco y negro con alto contraste (el alto contraste es necesario para evitar mucho ruido de fondo en la imagen. Esto se puede personalizar por comando).
1. utiliza el [Reconocimiento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition) de [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) para obtener todo el texto de la pantalla y resaltar todo el texto encontrado en una imagen. Admite varios idiomas, que puedes encontrar [aquí.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utiliza la lógica difusa de [Fuse.js](https://fusejs.io/) para encontrar cadenas que sean _aproximadamente iguales_ a un patrón dado (en lugar de exactamente iguales). Esto significa, por ejemplo, que el valor de búsqueda `Username` también puede encontrar el texto `Usename` o viceversa.
1. proporciona un asistente de CLI (`npx ocr-service`) para validar tus imágenes y obtener texto a través de tu terminal.

Puedes ver un ejemplo de los pasos 1, 2 y 3 en esta imagen

![Process steps](/img/ocr/processing-steps.jpg)

Funciona con **CERO** dependencias del sistema (además de las que usa WebdriverIO), pero si es necesario, también puede funcionar con una instalación local de [Tesseract](https://tesseract-ocr.github.io/tessdoc/), ¡lo que reducirá drásticamente el tiempo de ejecución! (Consulta también la sección [Optimización de la ejecución de pruebas](#test-execution-optimization) para saber cómo acelerar tus pruebas).

¿Entusiasmado? Empieza a usarlo hoy siguiendo la guía de [Primeros pasos](./getting-started).

:::caution Importante
Hay diversas razones por las que podrías no obtener resultados de buena calidad con Tesseract. Una de las principales razones que podría estar relacionada con tu aplicación y este módulo es que no haya una distinción de color adecuada entre el texto que se debe encontrar y el fondo. Por ejemplo, el texto blanco sobre un fondo oscuro se puede encontrar _fácilmente_, pero el texto claro sobre un fondo blanco o el texto oscuro sobre un fondo oscuro difícilmente se puede encontrar.

Consulta también [esta página](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) para obtener más información de Tesseract.

Y no olvides leer las [Preguntas frecuentes](./ocr-faq).
:::