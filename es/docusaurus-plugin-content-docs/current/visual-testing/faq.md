---
id: faq
title: Preguntas frecuentes
---

### ¿Necesito usar los métodos `save(Screen/Element/FullPageScreen)` cuando quiero ejecutar `check(Screen/Element/FullPageScreen)`?

No, no necesitas hacer esto. El método `check(Screen/Element/FullPageScreen)` lo hará automáticamente por ti.

### Mis pruebas visuales fallan con una diferencia, ¿cómo puedo actualizar mi línea base?

Puedes actualizar las imágenes de línea base a través de la línea de comandos agregando el argumento `--update-visual-baseline`. Esto:

-   copiará automáticamente la captura de pantalla actual y la colocará en la carpeta de línea base
-   si hay diferencias, permitirá que la prueba pase porque la línea base ha sido actualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Cuando se ejecutan los registros en modo info/debug, verás los siguientes registros añadidos

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### El ancho y la altura no pueden ser negativos

Podría ser que se lance el error `Width and height cannot be negative`. 9 de cada 10 veces esto está relacionado con la creación de una imagen de un elemento que no está en la vista. Asegúrate siempre de que el elemento esté en la vista antes de intentar hacer una imagen del elemento.

### La instalación de Canvas en Windows falló con registros de Node-Gyp

Si encuentras problemas con la instalación de Canvas en Windows debido a errores de Node-Gyp, ten en cuenta que esto solo se aplica a la Versión 4 y anteriores. Para evitar estos problemas, considera actualizar a la Versión 5 o superior, que no tiene estas dependencias y utiliza [Jimp](https://github.com/jimp-dev/jimp) para el procesamiento de imágenes.

Si aún necesitas resolver los problemas con la Versión 4, por favor revisa:

-   la sección de Node Canvas en la guía de [Primeros pasos](/docs/visual-testing#system-requirements)
-   [este post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) para solucionar problemas de Node-Gyp en Windows. (Gracias a [IgorSasovets](https://github.com/IgorSasovets))