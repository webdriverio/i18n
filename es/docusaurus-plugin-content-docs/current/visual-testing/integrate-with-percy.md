---
id: integrate-with-percy
title: Para aplicaciones web
description: "Integra las pruebas de WebdriverIO para aplicaciones web con BrowserStack Percy para pruebas visuales, desde la creación de un proyecto hasta la ejecución de builds."
---

## Integra tus pruebas de WebdriverIO con Percy

Antes de la integración, puedes explorar el [tutorial de build de ejemplo de Percy para WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integra tus pruebas automatizadas de WebdriverIO con BrowserStack Percy. A continuación, se presenta una descripción general de los pasos de integración:

### Paso 1: Crear un proyecto de Percy
[Inicia sesión](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) en Percy. En Percy, crea un proyecto de tipo Web y luego asígnale un nombre. Después de crear el proyecto, Percy genera un token. Toma nota de él. Debes usarlo para configurar tu variable de entorno en el siguiente paso.

Para obtener detalles sobre cómo crear un proyecto, consulta [Crear un proyecto de Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Paso 2: Configurar el token del proyecto como variable de entorno

Ejecuta el comando indicado para configurar PERCY_TOKEN como variable de entorno:

```sh
export PERCY_TOKEN="<your token here>"   // macOS o Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Paso 3: Instalar las dependencias de Percy

Instala los componentes necesarios para establecer el entorno de integración para tu conjunto de pruebas.

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

Cuando uses WebdriverIO en [modo standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), proporciona el objeto browser como primer argumento de la función `percySnapshot`:

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
// el objeto browser es obligatorio en modo standalone
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Los argumentos del método snapshot son:

```sh
percySnapshot(name[, options])
```
### Modo standalone

```sh
percySnapshot(browser, name[, options])
```

- browser (obligatorio) - El objeto browser de WebdriverIO
- name (obligatorio) - El nombre de la snapshot; debe ser único para cada snapshot
- options - Consulta las opciones de configuración por snapshot

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

## Visita las siguientes páginas para obtener más detalles:
- [Integra tus pruebas de WebdriverIO con Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variables de entorno](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integra usando el SDK de BrowserStack](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si estás usando BrowserStack Automate.


| Recurso                                                                                                                                                             | Descripción                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentación oficial](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)     | Documentación de WebdriverIO de Percy |
| [Build de ejemplo - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial de WebdriverIO de Percy |
| [Video oficial](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                               | Pruebas visuales con Percy        |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Presentamos Visual Reviews 2.0    |