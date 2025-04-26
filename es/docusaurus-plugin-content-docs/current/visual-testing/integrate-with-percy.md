---
id: integrate-with-percy
title: Para Aplicaciones Web
---

## Integra tus pruebas de WebdriverIO con Percy

Antes de la integración, puedes explorar [el tutorial de muestra de Percy para WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integra tus pruebas automatizadas de WebdriverIO con BrowserStack Percy y aquí tienes una descripción general de los pasos de integración:

### Paso 1: Crear un proyecto Percy
[Inicia sesión](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) en Percy. En Percy, crea un proyecto del tipo Web y luego nombra el proyecto. Después de crear el proyecto, Percy genera un token. Toma nota de él. Tendrás que usarlo para configurar tu variable de entorno en el siguiente paso.

Para obtener detalles sobre cómo crear un proyecto, consulta [Crear un proyecto Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Paso 2: Establecer el token del proyecto como una variable de entorno

Ejecuta el siguiente comando para establecer PERCY_TOKEN como una variable de entorno:

```sh
export PERCY_TOKEN="<your token here>"   // macOS o Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Paso 3: Instalar las dependencias de Percy

Instala los componentes necesarios para establecer el entorno de integración para tu suite de pruebas.

Para instalar las dependencias, ejecuta el siguiente comando:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Paso 4: Actualizar tu script de prueba

Importa la biblioteca de Percy para usar el método y los atributos necesarios para tomar capturas de pantalla.
El siguiente ejemplo usa la función percySnapshot() en modo asíncrono:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Cuando uses WebdriverIO en [modo independiente](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), proporciona el objeto del navegador como primer argumento a la función `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Los argumentos del método snapshot son:

```sh
percySnapshot(name[, options])
```
### Modo independiente

```sh
percySnapshot(browser, name[, options])
```

- browser (requerido) - El objeto navegador de WebdriverIO
- name (requerido) - El nombre de la captura; debe ser único para cada captura
- options - Ver opciones de configuración por captura

Para obtener más información, consulta [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Paso 5: Ejecutar Percy
Ejecuta tus pruebas usando el comando `percy exec` como se muestra a continuación:

Si no puedes usar el comando `percy:exec` o prefieres ejecutar tus pruebas usando las opciones de ejecución del IDE, puedes usar los comandos `percy:exec:start` y `percy:exec:stop`. Para obtener más información, visita [Ejecutar Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Visita las siguientes páginas para más detalles:
- [Integra tus pruebas de WebdriverIO con Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variables de entorno](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integración usando BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si estás usando BrowserStack Automate.


| Recurso                                                                                                                                                            | Descripción                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentación oficial](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentación de Percy para WebdriverIO |
| [Construcción de muestra - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial de Percy para WebdriverIO      |
| [Video oficial](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Pruebas visuales con Percy         |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Presentando Visual Reviews 2.0    |