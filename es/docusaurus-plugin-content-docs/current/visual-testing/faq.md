---
id: faq
title: Preguntas frecuentes
description: "Encuentra respuestas a preguntas comunes sobre pruebas visuales, como actualizar las imágenes de referencia, solucionar errores de instalación de canvas y actualizar a la v10."
---

### ¿Necesito usar los métodos `save(Screen/Element/FullPageScreen)` cuando quiero ejecutar `check(Screen/Element/FullPageScreen)`?

No, no necesitas hacerlo. `check(Screen/Element/FullPageScreen)` lo hará automáticamente por ti.

### Mis pruebas visuales fallan con una diferencia, ¿cómo puedo actualizar mi imagen de referencia (baseline)?

Puedes actualizar las imágenes de referencia desde la línea de comandos añadiendo el argumento `--update-visual-baseline`. Esto:

-   copiará automáticamente la captura de pantalla tomada y la colocará en la carpeta de referencia (baseline)
-   si hay diferencias, permitirá que la prueba pase porque la imagen de referencia ha sido actualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Al ejecutar en modo de logs info/debug verás que se añaden los siguientes logs

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### El ancho y el alto no pueden ser negativos

Es posible que se lance el error `Width and height cannot be negative`. 9 de cada 10 veces esto está relacionado con crear una imagen de un elemento que no está en la vista. Asegúrate siempre de que el elemento esté en la vista antes de intentar crear una imagen del elemento.

### La instalación de Canvas en Windows falló con logs de Node-Gyp

Si encuentras problemas con la instalación de Canvas en Windows debido a errores de Node-Gyp, ten en cuenta que esto solo aplica a la versión 4 y anteriores. Para evitar estos problemas, considera actualizar a la versión 5 o superior, que no tiene estas dependencias. Las versiones 5 a 9 usaban [Jimp](https://github.com/jimp-dev/jimp) para el procesamiento de imágenes; la versión 10 y posteriores usan [fast-png](https://github.com/image-js/fast-png) y [Pixelmatch](https://github.com/mapbox/pixelmatch) sin dependencias nativas.

Si aún necesitas resolver los problemas con la versión 4, consulta:

-   la sección de Node Canvas en la guía de [Primeros pasos](/docs/visual-testing#system-requirements)
-   [esta publicación](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) sobre cómo solucionar problemas de Node-Gyp en Windows. (Gracias a [IgorSasovets](https://github.com/IgorSasovets))

### Actualicé a la v11, ¿por qué cambió el porcentaje de discrepancia?

En la v11 el motor de comparación es pixelmatch 8, que mide las diferencias de color en el espacio de color OKLab con la distancia HyAB en lugar de YIQ. La escala del umbral (`0` a `1`) y los preajustes `ignore*` no cambiaron, pero el número de píxeles diferentes puede variar un poco para las mismas imágenes (alrededor de −3 % a +3 % en capturas de pantalla reales). Si una verificación depende de un porcentaje de discrepancia exacto o de una tolerancia ajustada, vuelve a comprobarla y actualiza la imagen de referencia con `--update-visual-baseline` solo cuando el nuevo resultado sea correcto. Algunas correcciones también pueden cambiar una imagen de referencia una vez, por ejemplo, las capturas de pantalla de elementos en iOS de elementos más grandes que el viewport, que ya no tienen un área negra. Consulta la [guía de migración a la v11](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md).

### Actualicé a la v10, ¿por qué fallan mis pruebas visuales?

El motor de comparación cambió de ResembleJS a [Pixelmatch](https://github.com/mapbox/pixelmatch) en la v10. Pixelmatch usa un modelo de color perceptual (YIQ) en lugar de RGB sin procesar, por lo que los porcentajes de discrepancia difieren de los de la v9. Tus pruebas no se han roto; simplemente es necesario regenerar las imágenes de referencia una vez. Ejecuta tus pruebas con `--update-visual-baseline` para aceptar los nuevos valores, o elimina tu carpeta de imágenes de referencia y deja que `autoSaveBaseline` la vuelva a crear.