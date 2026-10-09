---
id: integrate-with-app-percy
title: Para aplicaciones móviles
description: "Integra las pruebas de aplicaciones móviles de WebdriverIO con BrowserStack App Percy para pruebas visuales, comenzando por configurar tu PERCY_TOKEN."
---

## Integra tus pruebas de WebdriverIO con App Percy

Antes de la integración, puedes explorar el [tutorial de compilación de ejemplo de App Percy para WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integra tu suite de pruebas con BrowserStack App Percy; aquí tienes una descripción general de los pasos de integración:

### Paso 1: Crea un nuevo proyecto de aplicación en el panel de Percy

[Inicia sesión](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) en Percy y [crea un nuevo proyecto de tipo aplicación](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Después de crear el proyecto, se te mostrará una variable de entorno `PERCY_TOKEN`. Percy usará el `PERCY_TOKEN` para saber a qué organización y proyecto subir las capturas de pantalla. Necesitarás este `PERCY_TOKEN` en los siguientes pasos.

### Paso 2: Configura el token del proyecto como variable de entorno

Ejecuta el comando indicado para configurar PERCY_TOKEN como variable de entorno:

```sh
export PERCY_TOKEN="<your token here>"   // macOS o Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Paso 3: Instala los paquetes de Percy

Instala los componentes necesarios para establecer el entorno de integración para tu suite de pruebas.
Para instalar las dependencias, ejecuta el siguiente comando:

```sh
npm install --save-dev @percy/cli
```

### Paso 4: Instala las dependencias

Instala Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Paso 5: Actualiza el script de prueba
Asegúrate de importar @percy/appium-app en tu código.

A continuación se muestra una prueba de ejemplo que usa la función percyScreenshot. Usa esta función siempre que necesites tomar una captura de pantalla.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Estamos pasando los argumentos requeridos al método percyScreenshot.

Los argumentos del método de captura de pantalla son:

```sh
percyScreenshot(driver, name[, options])
```
### Paso 6: Ejecuta tu script de prueba

Ejecuta tus pruebas usando `percy app:exec`.

Si no puedes usar el comando percy app:exec o prefieres ejecutar tus pruebas usando las opciones de ejecución del IDE, puedes usar los comandos percy app:exec:start y percy app:exec:stop. Para obtener más información, visita [Ejecutar Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Este comando inicia Percy, crea una nueva compilación de Percy, toma instantáneas y las sube a tu proyecto, y detiene Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Visita las siguientes páginas para obtener más detalles:
- [Integra tus pruebas de WebdriverIO con Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variables de entorno](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integra usando el SDK de BrowserStack](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si estás usando BrowserStack Automate.


| Recurso                                                                                                                                                            | Descripción                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentación oficial](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentación de WebdriverIO de App Percy |
| [Compilación de ejemplo - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial de WebdriverIO de App Percy      |
| [Video oficial](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Pruebas visuales con App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Conoce App Percy: plataforma de pruebas visuales automatizadas impulsada por IA para aplicaciones nativas    |