---
id: wdio-roku-service
title: Servicio Roku
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service es un paquete de terceros, para más información por favor consulte [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Este servicio reemplaza muchas partes de WebdriverIO para permitir que se utilicen con aplicaciones Roku y proporciona acceso al [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) para controlar el Roku durante las pruebas.

## Requisitos

### Roku
Un canal de prueba/channel.zip y un dispositivo Roku (con el Modo Desarrollador habilitado) en la misma red que tu mac.

### WebdriverIO
Esto no es un producto independiente -- se utiliza como un complemento del marco de pruebas de WebdriverIO (o Servicio, en su vocabulario). Antes de usarlo, deberías completar la configuración de WDIO ejecutando `npm init wdio@latest`.

Al pasar por los pasos de configuración, para no tener que navegar por todas las preguntas/opciones, puedes simplemente elegir las siguientes selecciones durante la fase de inicialización:
- Roku Testing (NOTA: Usa esto si tu repositorio solo se usará para pruebas de Roku, ya que se convertirá en el servicio predeterminado y único instalado. De lo contrario, usa E2E Testing para poder instalar múltiples servicios.)
- On my local machine (solo E2E)
- Web (solo E2E)
- Chrome (solo E2E)
- Mocha
- Typescript [modules funciona tanto para TS como para JS, así que elige cualquiera]
- autogenerate some test files (Y)
-- ubicación predeterminada
- page objects (Y)
-- ubicación predeterminada
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Configuración de Typescript
Si quieres usar Typescript para escribir pruebas, deberás asegurarte de que las siguientes opciones estén configuradas en el archivo tsconfig.json generado por Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Luego puedes usar el servicio importándolo en tus pruebas como se detalla a continuación.

### Configuración de WDIO
Actualmente, las pruebas solo son compatibles con un solo dispositivo Roku. Se requieren las siguientes actualizaciones de configuración:
* `maxInstances` y `maxInstancesPerCapability` deben ser 1. Las pruebas automáticas en múltiples dispositivos no son compatibles y resultarán en comandos duplicados enviados al Roku. Solo debe haber una sola capacidad.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // o si quieres el modo sin cabeza:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Se recomienda aumentar el `waitforInterval` y `waitforTimeout`, ya que cada intervalo implica descargar el xml desde Roku. Para aprovechar más la función `browser.debug()`, también puedes optar por extender el tiempo de espera del ejecutor de pruebas mocha a 5+ minutos para desarrollo.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //opcional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

¡Estás listo para escribir tu primera prueba!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

También se recomienda que utilices la función `browser.debug()` en wdio para detener tu prueba para depuración y creación de pruebas:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // la prueba se detiene, un REPL está disponible para comandos

```
Si chrome no está en modo sin cabeza, puedes ver la última vez que se llamó a `openRokuXML()` (probablemente a través de un `waitForX` o `expect`). Usando el REPL en tu terminal, puedes hacer uso de cualquier comando `$` válido, y un par de comandos personalizados clave agregados (`browser.openRokuXML()` y `browser.saveScreenshot('path/to/ss.jpg')`) -- la clase `controller` no está adjunta al objeto `browser`, por lo que actualmente no puedes usarlos. Afortunadamente, ¡probablemente estés sentado junto al Roku y tengas un control remoto que puedas usar para navegar y ocasionalmente llamar a `browser.openRokuXML()` para ver qué pasó con el estado de la página! Y recuerda que XML funciona de forma nativa con xpath en el propio navegador chrome, por lo que puedes evaluar/desarrollar tus selectores directamente en la consola de chrome durante la depuración.

### .env
Ver el archivo `.env.example`. Cópialo y renómbralo a `.env` dentro de tu proyecto WebdriverIO que usa este servicio. Probablemente querrás ponerlo en tu .gitignore también.

* `ROKU_IP` debe ser la IP de tu Roku. Los comandos usarán esta IP para comunicarse con él. Esto es obligatorio.
* `ROKU_USER` y `ROKU_PW`: Se necesitan credenciales de inicio de sesión para instalar un archivo, así como para tomar capturas de pantalla.
* `ROKU_APP_PATH` debe ser la ruta absoluta del archivo zip del canal Roku.
* `ROKU_CHANNEL_ID` debe ser el ID del canal de tu Roku (esto suele ser "dev").
* `DEBUG=wdio-roku-service` habilitará los mensajes de depuración. Elimina el '#' al inicio de la línea si quieres verlos.

## Funciones modificadas
### Browser
* `waitUntil` obtendrá el xml del Roku en cada iteración para verificar los cambios.
* `saveScreenshot` descargará una captura de pantalla de la pantalla actual del Roku. Notablemente, estas capturas están en formato .jpg, en lugar del .png que WebdriverIO suele usar.
* `openRokuXML` obtendrá el xml del Roku si necesitas hacerlo manualmente en lugar de con esperas.

### Elementos
* Todas las esperas son compatibles de la misma manera que el navegador. `waitForClickable` se mapea a `waitForDisplayed`, y `waitForStable` se mapea a `waitForExist`.
* `click`, `doubleClick` y `moveTo` no son compatibles. Tienes que navegar manualmente por la aplicación.
* `isFocused` verificará si el atributo `focused` en el elemento es verdadero.
* `isDisplayed` verificará si existe un atributo `bounds` en el elemento, y que `visible` no esté establecido como falso. Si `withinViewport` está establecido, los límites se compararán con el tamaño de la pantalla del Roku.
* `getSize` y `getLocation` toman los valores del atributo `bounds`, devolviendo 0 para el tamaño y -Infinity para la posición si no está presente.

Otras funciones no han sido cambiadas, pero muchas siguen funcionando como se esperaba.

### Matchers
La mayoría de los matchers se han actualizado para obtener el xml mientras esperan. Algunos tienen una funcionalidad ligeramente diferente.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` y `toHaveAttribute` funcionan como se esperaba, considerando los cambios en Element.
* `toHaveElementProperty` se mapea a `toHaveAttribute`.
* `toHaveElementClass` comprueba el atributo `name` del elemento.
* `toHaveId` se mapea a `toHaveElementClass`.
* `toHaveText` comprueba el atributo `text` del elemento.
* `toHaveChildren` comprueba el atributo `children` del elemento.
* `toHaveHTML` tratará el xml como si fuera HTML, aunque probablemente no sea muy útil.

Los siguientes no son compatibles actualmente:
* `toBeSelected` - Podría ser compatible pronto después de determinar cómo se ven los botones seleccionados en xml, si hay alguna diferencia.
* `toBeChecked` - Podría ser compatible pronto después de determinar cómo se ven las casillas de verificación marcadas en xml, si hay alguna diferencia.
* `toHaveComputedLabel` - Si tienes un equivalente de esto en tus elementos Roku, verifica el atributo con `toHaveAttribute`.
* `toHaveComputedRole` - Si tienes un equivalente de esto en tus elementos Roku, verifica el atributo con `toHaveAttribute`.
* `toHaveHref` - Si tienes URLs en tus elementos Roku, verifica el atributo con `toHaveAttribute`.
* `toHaveStyle` - Los elementos xml no tienen estilos.
* `toHaveClipboardText` - Esto no se conoce.
* `toHaveTitle` - El título será el nombre de archivo temporal generado aleatoriamente del xml.
* `toHaveUrl` - La URL será la ruta al archivo xml en tu computadora.

## Uso
### Instalación del canal

Esto requiere que tu canal tenga un ID asignado.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Instalación desde archivo

Se recomienda almacenar la ruta en el .env, especialmente si tienes varios desarrolladores que podrían tener diferentes ubicaciones y/o nombres de archivo.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Canal preinstalado

Si ya has instalado el canal tú mismo antes de las pruebas, puedes simplemente lanzarlo.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Cierra el canal si ya está abierto. Si el canal admite reanudación instantánea, esto solo lo enviará a segundo plano
    await exitChannel();
    // Usar el ID de canal 'dev' lanzará la aplicación cargada lateralmente.
    await launchChannel('dev');
}
```

### Pruebas
`wdio-roku-service/controller` proporciona la capacidad de enviar pulsaciones de botones al Roku. `keySequence` es el principal, que envía varias pulsaciones de botones en secuencia.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navega a través de la aplicación
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Obtén la interfaz de usuario actual de la aplicación desde el Roku y cárgala en el navegador
await browser.openRokuXML();
// O usa esperas, que cargarán repetidamente el XML hasta que se agote el tiempo o la condición se cumpla
await browser.waitUntil(condition);
await element.waitForDisplayed();
// usa los matchers de WDIO en el XML del roku como si fuera una página web
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` también tiene funciones para mantener o soltar botones, así como para escribir texto en un teclado.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplink
`wdio-roku-service/channel` proporciona funcionalidad relacionada con el canal. `inputChannel` te permite enviar información arbitraria a tu aplicación.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Otras funciones
`wdio-roku-service/info` proporciona funcionalidad miscelánea, como obtener el icono de la aplicación o nodos huérfanos.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` es la interfaz directa con el ECP si necesitas hacer algo altamente específico.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Problemas comunes
* Los elementos Roku tienen su texto en un atributo 'text', no entre sus etiquetas. Al hacer selectores, hacer `$('element=Text')` no funcionará para casi todos los elementos. En su lugar, tendrás que hacer `$('element[text=Text]')`.

## Hoja de ruta de características
* Pronto se enviará un PR que permitirá que este servicio se instale durante el cuestionario `npm init wdio@latest`.
* Actualmente se está evaluando la comunicación Socket con el Roku para que se puedan implementar más características, como un medio para despertar un Roku en modo de suspensión.
* Características de proxy de red que permiten activarse a partir de la actividad de red.

## Aprovechar el Informe Allure con capturas de pantalla y archivos XML adjuntos

De forma predeterminada, el Informe Allure no tiene una configuración para generar capturas de pantalla de la aplicación o una copia del código XML representativo del estado actual de la aplicación Roku en cualquier punto de la ejecución de la prueba. La documentación que sigue explica cómo abordar esto para que se genere una captura de pantalla del estado actual de la aplicación y se adjunte al Informe Allure cada vez que una prueba `it` complete su ejecución. También permite obtener una instantánea del XML representativo del estado actual de la aplicación Roku cuando una ejecución de prueba `it` falla.

Para la documentación completa sobre Allure Reporter, visita los documentos de @wdio/allure-reporter en https://webdriver.io/docs/allure-reporter/

### Dependencia Utils.js
Agrega el siguiente código a un archivo llamado `Utils.js`. Este archivo puede estar en tu carpeta `/helpers` o similar.
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Código wdio.conf.js
Agrega las siguientes declaraciones de importación en el archivo `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Reemplaza <Utils.js file path> con la ruta relativa real al archivo Utils.js

```

Define el siguiente gancho `afterTest` en el archivo `wdio.conf.js`. Si ya tienes código funcionando en este gancho, añade el código proporcionado a continuación.
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Comportamiento esperado
Con este código en la configuración del proyecto, la expectativa es que cada vez que se ejecute una prueba `it`, independientemente del resultado de la prueba, se tomará una captura de pantalla al final de la ejecución y se adjuntará a su sección relevante en el informe Allure. En el caso específico de que la prueba falle, también se adjuntará una instantánea del estado de la aplicación en formato XML a la sección de la prueba en el informe Allure.

### Notas
* Los informes Allure predeterminados admiten capturas de pantalla en formato `.png`. Las anulaciones de métodos en este servicio admiten la imagen en formato `.jpg` en su lugar.
* Los archivos XML adjuntos pueden consultarse en el propio informe Allure o abrirse en una pestaña separada en un navegador.