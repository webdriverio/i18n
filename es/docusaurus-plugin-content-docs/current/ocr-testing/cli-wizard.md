---
id: cli-wizard
title: Asistente de CLI
---

Puedes validar qué texto se puede encontrar en una imagen sin ejecutar una prueba utilizando el Asistente CLI de OCR. Lo único que necesitas es:

-   tener instalado el `@wdio/ocr-service` como dependencia, consulta [Primeros pasos](./getting-started)
-   una imagen que quieras procesar

Luego ejecuta el siguiente comando para iniciar el asistente

```sh
npx ocr-service
```

Esto iniciará un asistente que te guiará a través de los pasos para seleccionar una imagen y usar un haystack más el modo avanzado. Se hacen las siguientes preguntas

## ¿Cómo te gustaría especificar el archivo?

Se pueden seleccionar las siguientes opciones

-   Usar un "explorador de archivos"
-   Escribir la ruta del archivo manualmente

### Usar un "explorador de archivos"

El asistente CLI proporciona una opción para usar un "explorador de archivos" para buscar archivos en tu sistema. Comienza desde la carpeta donde llamas al comando. Después de seleccionar una imagen (usa las teclas de flecha y la tecla ENTER) procederás a la siguiente pregunta

### Escribir la ruta del archivo manualmente

Esta es una ruta directa a un archivo en algún lugar de tu máquina local

### ¿Te gustaría usar un haystack?

Aquí tienes la opción de seleccionar un área que necesita ser procesada. Esto puede acelerar el proceso o reducir/limitar la cantidad de texto que el motor OCR podría encontrar. Necesitas proporcionar datos de `x`, `y`, `width`, `height` basados en las siguientes preguntas:

-   Ingresa la coordenada x:
-   Ingresa la coordenada y:
-   Ingresa el ancho:
-   Ingresa la altura:

## ¿Quieres usar el modo avanzado?

El modo avanzado incluirá características adicionales como:

-   ajustar el contraste
-   más opciones en el futuro

## Demostración

Aquí hay una demostración

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>