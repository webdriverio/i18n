---
id: web-extensions
title: Pruebas de extensiones web
description: "Carga una extensión web en Chrome o Firefox para una sesión de WebdriverIO, incluyendo la instalación y desinstalación mediante BiDi durante la sesión."
---

WebdriverIO es la herramienta ideal para automatizar un navegador. Las extensiones web forman parte del navegador y pueden automatizarse de la misma manera. Siempre que tu extensión web utilice content scripts para ejecutar JavaScript en sitios web u ofrezca un modal emergente, puedes ejecutar una prueba e2e para ello usando WebdriverIO.

Carga la extensión antes de la primera navegación con la configuración de capacidades que se muestra a continuación. Para instalar y eliminar una en medio de una sesión de [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), usa [`installExtension`](/docs/api/browser/installExtension) y [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Cargar una extensión web en el navegador

Como primer paso, tenemos que cargar la extensión que se va a probar en el navegador como parte de nuestra sesión. Esto funciona de forma diferente en Chrome y Firefox.

:::info

Esta documentación omite las extensiones web de Safari, ya que su soporte está muy atrasado y la demanda de los usuarios no es alta. Safari tampoco tiene una sesión de WebDriver BiDi, por lo que [`installExtension`](/docs/api/browser/installExtension) no cubre Safari. Si estás desarrollando una extensión web para Safari, por favor [abre un issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) y colabora para incluirla aquí también.

:::

### Chrome

Cargar una extensión web en Chrome se puede hacer proporcionando una cadena codificada en `base64` del archivo `crx` o proporcionando una ruta a la carpeta de la extensión web. Lo más sencillo es hacer esto último definiendo tus capacidades de Chrome de la siguiente manera:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // suponiendo que tu wdio.conf.js está en el directorio raíz y los archivos
            // compilados de tu extensión web se encuentran en la carpeta `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Si automatizas un navegador distinto de Chrome, por ejemplo Brave, Edge u Opera, es probable que la opción del navegador coincida con el ejemplo anterior, solo que usando un nombre de capacidad diferente, por ejemplo `ms:edgeOptions`.

:::

Si compilas tu extensión como archivo `.crx` usando, por ejemplo, el paquete NPM [crx](https://www.npmjs.com/package/crx), también puedes inyectar la extensión empaquetada mediante:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

Para crear un perfil de Firefox que incluya extensiones, puedes usar el [Firefox Profile Service](/docs/firefox-profile-service) para configurar tu sesión en consecuencia. Sin embargo, podrías encontrarte con problemas en los que tu extensión desarrollada localmente no se puede cargar debido a problemas de firma. En este caso, también puedes cargar una extensión en el hook `before` mediante el comando [`installAddOn`](/docs/api/gecko#installaddon), por ejemplo:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

Para generar un archivo `.xpi`, se recomienda usar el paquete NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Puedes empaquetar tu extensión usando el siguiente comando de ejemplo:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Instalar una extensión durante la sesión

Desde la v10, [`browser.installExtension`](/docs/api/browser/installExtension) y [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) instalan una extensión web en medio de una sesión de WebDriver BiDi y devuelven su id. Úsalos cuando la extensión no deba estar presente al iniciar, o cuando la misma prueba la instala, la ejercita y la elimina.

La configuración de capacidades y `installAddOn` descritos anteriormente siguen siendo la forma de cargar una extensión antes de la primera navegación. `installExtension` no los reemplaza. `browser.webExtensionInstall` y `browser.webExtensionUninstall` siguen disponibles cuando quieras construir tú mismo el [payload de la especificación](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

```ts title="test/specs/extension.e2e.ts"
import path from 'node:path'
import url from 'node:url'
import { browser, expect } from '@wdio/globals'

const extensionPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '../../dist'
)

describe('web extension', () => {
    it('installs and removes the extension', async () => {
        const extensionId = await browser.installExtension(extensionPath)
        expect(extensionId).not.toEqual('')

        await browser.url('https://webdriver.io')
        await browser.uninstallExtension(extensionId)
    })
})
```

`installExtension` acepta tres tipos de entrada:

| Entrada | Payload enviado al navegador |
| --- | --- |
| Una ruta de directorio | `{ type: 'path', path }` después de `path.resolve`. El navegador tiene que poder leer ese directorio. |
| Una ruta `.zip`, `.xpi` o `.crx` | `{ type: 'archivePath', path }` después de `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Bytes del archivo. Cualquier otro objeto es rechazado. |

Una ruta en forma de cadena siempre se resuelve en el ejecutor de pruebas. En una sesión remota —un hostname distinto de `localhost`, `127.0.0.1` o `::1`, o un `user` y `key` de la nube— esa ruta no es una ruta en la máquina del navegador. El comando lee un archivo, o comprime un directorio en memoria, y envía `base64`. No tienes que distinguir tú mismo entre local y remoto. Las sesiones locales envían `path` o `archivePath` y no leen los bytes.

Apunta un directorio a la raíz de la extensión, la carpeta que contiene `manifest.json`.

La sesión tiene que usar WebDriver BiDi. Una sesión clásica lanza `installExtension requires a WebDriver BiDi session (webExtension.install)`. Un navegador que implementa BiDi pero no este módulo hace fallar el comando con `unsupported operation` (o `unknown command` cuando el módulo no existe). Un archivo incorrecto falla con `invalid web extension`. Desinstalar un id que el navegador no conoce falla con `no such web extension`.

`uninstallExtension` recibe la cadena de id que devolvió `installExtension`.

### Chromium

Chrome y Edge implementan `webExtension.install` y lo mantienen desactivado hasta que inicias el navegador con `--enable-unsafe-extension-debugging` y `--remote-debugging-pipe`. Chrome 136 y versiones posteriores también requieren `--user-data-dir` siempre que se establezca `--remote-debugging-pipe`. Sin esos argumentos, el comando falla con `unknown error - Method not available`.

`--remote-debugging-pipe` es el canal entre el driver y el navegador. La sesión BiDi sigue usando `webSocketUrl`.

```ts title="wdio.conf.ts"
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdio-chrome-'))

export const config: WebdriverIO.Config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--enable-unsafe-extension-debugging',
                '--remote-debugging-pipe',
                `--user-data-dir=${userDataDir}`
            ]
        }
    }]
}
```

Usa `ms:edgeOptions` para Edge. Firefox carga la extensión en una sesión BiDi normal y no necesita estos argumentos.

## Consejos y trucos

La siguiente sección contiene un conjunto de consejos y trucos útiles que pueden ser de ayuda al probar una extensión web.

### Probar el modal emergente en Chrome

Si defines una entrada de acción del navegador `default_popup` en el [manifiesto de tu extensión](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), puedes probar esa página HTML directamente, ya que hacer clic en el icono de la extensión en la barra superior del navegador no funcionará. En su lugar, tienes que abrir directamente el archivo html del popup.

En Chrome, esto funciona obteniendo el ID de la extensión y abriendo la página del popup mediante `browser.url('...')`. El comportamiento en esa página será el mismo que dentro del popup. Para ello, recomendamos escribir el siguiente comando personalizado:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

En tu `wdio.conf.js` puedes importar este archivo y registrar el comando personalizado en tu hook `before`, por ejemplo:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

Ahora, en tu prueba, puedes acceder a la página del popup mediante:

```ts
await browser.openExtensionPopup('My Web Extension')
```