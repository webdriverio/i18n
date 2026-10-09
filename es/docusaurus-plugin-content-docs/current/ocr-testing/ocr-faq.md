---
id: ocr-faq
title: Preguntas frecuentes
description: "Encuentra respuestas a preguntas comunes sobre pruebas OCR lentas, texto que no se encuentra y cómo combinar comandos OCR con selectores normales."
---

## Mis pruebas son muy lentas

Cuando utilizas este `@wdio/ocr-service` no lo haces para acelerar tus pruebas, lo usas porque tienes dificultades para localizar elementos en tu aplicación web/móvil y quieres una forma más sencilla de localizarlos. Y todos sabemos, con suerte, que cuando quieres algo, pierdes otra cosa. **Pero...**, hay una forma de hacer que el `@wdio/ocr-service` se ejecute más rápido de lo normal. Puedes encontrar más información al respecto [aquí](./more-test-optimization).

## ¿Puedo usar los comandos de este servicio con los comandos/selectores predeterminados de WebdriverIO?

¡Sí, puedes combinar los comandos para hacer tu script aún más potente! El consejo es usar los comandos/selectores predeterminados de WebdriverIO tanto como sea posible y solo usar este servicio cuando no puedas encontrar un selector único, o cuando tu selector se vuelva demasiado frágil.

## Mi texto no se encuentra, ¿cómo es posible?

Primero, es importante entender cómo funciona el proceso de OCR en este módulo, así que por favor lee [esta](./ocr-testing) página. Si aún no puedes encontrar tu texto, puedes probar lo siguiente.

### El área de la imagen es demasiado grande

Cuando el módulo necesita procesar un área grande de la captura de pantalla, es posible que no encuentre el texto. Puedes proporcionar un área más pequeña indicando un haystack cuando uses un comando. Consulta los [comandos](./ocr-click-on-text) para ver qué comandos admiten proporcionar un haystack.

### El contraste entre el texto y el fondo no es correcto

Esto significa que podrías tener texto claro sobre un fondo blanco o texto oscuro sobre un fondo oscuro. Esto puede provocar que no se encuentre el texto. En los ejemplos a continuación puedes ver que el texto `Why WebdriverIO?` es blanco y está rodeado por un botón gris. En este caso, el texto `Why WebdriverIO?` no se encontrará. Al aumentar el contraste para el comando específico, se encuentra el texto y se puede hacer clic en él; consulta la segunda imagen.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Con el contraste predeterminado de 0.25, el texto no se encuentra
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## ¿Por qué se hace clic en mi elemento pero el teclado de mis dispositivos móviles nunca aparece?

Esto puede ocurrir en algunos campos de texto donde el clic se considera demasiado largo y se interpreta como una pulsación prolongada. Puedes usar la opción `clickDuration` en [`ocrClickOnText`](./ocr-click-on-text) y [`ocrSetValue`](./ocr-set-value) para mitigar esto. Consulta [aquí](./ocr-click-on-text#options).

## ¿Puede este módulo devolver múltiples elementos como normalmente puede hacer WebdriverIO?

No, actualmente esto no es posible. Si el módulo encuentra múltiples elementos que coinciden con el selector proporcionado, encontrará automáticamente el elemento con la puntuación de coincidencia más alta.

## ¿Puedo automatizar completamente mi aplicación con los comandos OCR proporcionados por este servicio?

Nunca lo he hecho, pero en teoría debería ser posible. Por favor, avísanos si lo consigues ☺️.

## Veo que se añade un archivo adicional llamado `{languageCode}.traineddata`, ¿qué es esto?

`{languageCode}.traineddata` es un archivo de datos de idioma utilizado por Tesseract. Contiene los datos de entrenamiento para el idioma seleccionado, que incluyen la información necesaria para que Tesseract reconozca caracteres y palabras en inglés de manera eficaz.

### Contenido de `{languageCode}.traineddata`

El archivo generalmente contiene:

1. **Datos del conjunto de caracteres:** Información sobre los caracteres del idioma inglés.
1. **Modelo de idioma:** Un modelo estadístico de cómo los caracteres forman palabras y las palabras forman oraciones.
1. **Extractores de características:** Datos sobre cómo extraer características de las imágenes para el reconocimiento de caracteres.
1. **Datos de entrenamiento:** Datos derivados del entrenamiento de Tesseract con un gran conjunto de imágenes de texto en inglés.

### ¿Por qué es importante `{languageCode}.traineddata`?

1. **Reconocimiento de idioma:** Tesseract depende de estos archivos de datos entrenados para reconocer y procesar con precisión el texto en un idioma específico. Sin `{languageCode}.traineddata`, Tesseract no podría reconocer texto en inglés.
1. **Rendimiento:** La calidad y precisión del OCR están directamente relacionadas con la calidad de los datos de entrenamiento. Usar el archivo de datos entrenados correcto garantiza que el proceso de OCR sea lo más preciso posible.
1. **Compatibilidad:** Asegurarse de que el archivo `{languageCode}.traineddata` esté incluido en tu proyecto facilita replicar el entorno de OCR en diferentes sistemas o en las máquinas de los miembros del equipo.

### Control de versiones de `{languageCode}.traineddata`

Se recomienda incluir `{languageCode}.traineddata` en tu sistema de control de versiones por las siguientes razones:

1. **Consistencia:** Garantiza que todos los miembros del equipo o entornos de despliegue usen exactamente la misma versión de los datos de entrenamiento, lo que produce resultados de OCR consistentes en diferentes entornos.
1. **Reproducibilidad:** Almacenar este archivo en el control de versiones facilita reproducir los resultados al ejecutar el proceso de OCR en una fecha posterior o en una máquina diferente.
1. **Gestión de dependencias:** Incluirlo en el sistema de control de versiones ayuda a gestionar las dependencias y garantiza que cualquier configuración o ajuste del entorno incluya los archivos necesarios para que el proyecto se ejecute correctamente.

## ¿Hay una forma sencilla de ver qué texto se encuentra en mi pantalla sin ejecutar una prueba?

Sí, puedes usar nuestro asistente de CLI para eso. Puedes encontrar la documentación [aquí](./cli-wizard)