---
id: cli-wizard
title: Asistente de CLI
description: "Comprueba qué texto puede encontrar el servicio OCR en una imagen sin ejecutar una prueba utilizando el asistente de CLI de OCR."
---

Puedes validar qué texto se puede encontrar en una imagen sin ejecutar una prueba utilizando el Asistente de CLI de OCR. Lo único que se necesita es:

-   que hayas instalado `@wdio/ocr-service` como dependencia, consulta [Primeros pasos](./getting-started)
-   una imagen que quieras procesar

Luego ejecuta el siguiente comando para iniciar el asistente

```sh
npx ocr-service
```

Esto iniciará un asistente que te guiará a través de los pasos para seleccionar una imagen y usar un haystack además del modo avanzado. Se hacen las siguientes preguntas

## ¿Cómo te gustaría especificar el archivo?

Se pueden seleccionar las siguientes opciones

-   Usar un "explorador de archivos"
-   Escribir la ruta del archivo manualmente

### Usar un "explorador de archivos"

El asistente de CLI ofrece la opción de usar un "explorador de archivos" para buscar archivos en tu sistema. Comienza desde la carpeta desde la que ejecutas el comando. Después de seleccionar una imagen (usa las teclas de flecha y la tecla ENTER) pasarás a la siguiente pregunta

### Escribir la ruta del archivo manualmente

Esta es una ruta directa a un archivo en algún lugar de tu máquina local

### ¿Te gustaría usar un haystack?

Aquí tienes la opción de seleccionar un área que debe procesarse. Esto puede acelerar el proceso o reducir/acotar la cantidad de texto que el motor OCR podría encontrar. Debes proporcionar los datos `x`, `y`, `width`, `height` según las siguientes preguntas:

-   Introduce la coordenada x:
-   Introduce la coordenada y:
-   Introduce el ancho:
-   Introduce la altura:

## ¿Quieres usar el modo avanzado?

El modo avanzado incluirá funciones adicionales como:

-   configurar el contraste
-   más funciones en el futuro

## Demostración

Aquí tienes una demostración

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>