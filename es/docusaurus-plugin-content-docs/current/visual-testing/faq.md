---
id: faq
title: Preguntas frecuentes
description: "Encuentra respuestas a preguntas comunes sobre pruebas visuales, como actualizar las imágenes de referencia, solucionar errores de instalación de canvas y actualizar a la v10."
---

### ¿Necesito usar los métodos `save(Screen/Element/FullPageScreen)` cuando quiero ejecutar `check(Screen/Element/FullPageScreen)`?

No, no necesitas hacerlo. `check(Screen/Element/FullPageScreen)` lo hará automáticamente por ti.

### Mis pruebas visuales fallan con una diferencia, ¿cómo puedo actualizar mi imagen de referencia?

Puedes actualizar las imágenes de referencia a través de la línea de comandos añadiendo el argumento `--update-visual-baseline`. Esto hará lo siguiente:

-   copiará automáticamente la captura de pantalla actual tomada y la colocará en la carpeta de referencia
-   si hay diferencias, permitirá que la prueba pase porque la imagen de referencia ha sido actualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Al ejecutar con los logs en modo info/debug, verás que se añaden los siguientes logs

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

Es posible que se lance el error `Width and height cannot be negative`. 9 de cada 10 veces esto está relacionado con crear una imagen de un elemento que no está en la vista. Asegúrate siempre de que el elemento esté en la vista antes de intentar crear una imagen del elemento.

### La instalación de Canvas en Windows falló con logs de Node-Gyp

Si encuentras problemas con la instalación de Canvas en Windows debido a errores de Node-Gyp, ten en cuenta que esto solo aplica a la versión 4 e inferiores. Para evitar estos problemas, considera actualizar a la versión 5 o superior, que no tiene estas dependencias. Las versiones 5 a 9 usaban [Jimp](https://github.com/jimp-dev/jimp) para el procesamiento de imágenes; la versión 10 y posteriores usan [fast-png](https://github.com/image-js/fast-png) y [Pixelmatch](https://github.com/mapbox/pixelmatch) sin dependencias nativas.

Si aún necesitas resolver los problemas con la versión 4, consulta:

-   la sección de Node Canvas en la guía de [Primeros pasos](/docs/visual-testing#system-requirements)
-   [esta publicación](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) sobre cómo solucionar problemas de Node-Gyp en Windows. (Gracias a [IgorSasovets](https://github.com/IgorSasovets))

### Actualicé a la v10, ¿por qué fallan mis pruebas visuales?

El motor de comparación cambió de ResembleJS a [Pixelmatch](https://github.com/mapbox/pixelmatch) en la v10. Pixelmatch utiliza un modelo de color perceptual (YIQ) en lugar de RGB sin procesar, por lo que los porcentajes de discrepancia difieren de los de la v9. Tus pruebas no se han roto; simplemente es necesario regenerar las imágenes de referencia una vez. Ejecuta tus pruebas con `--update-visual-baseline` para aceptar los nuevos valores, o elimina tu carpeta de referencia y deja que `autoSaveBaseline` la vuelva a crear.