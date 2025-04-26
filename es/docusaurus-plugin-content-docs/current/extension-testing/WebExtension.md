---
id: web-extensions
title: Pruebas de Extensiones Web
---

WebdriverIO es la herramienta ideal para automatizar un navegador. Las extensiones web son parte del navegador y pueden automatizarse de la misma manera. Siempre que tu extensión web utilice scripts de contenido para ejecutar JavaScript en sitios web u ofrezca un modal emergente, puedes ejecutar una prueba e2e para eso usando WebdriverIO.

## Cargar una Extensión Web en el Navegador

Como primer paso, debemos cargar la extensión bajo prueba en el navegador como parte de nuestra sesión. Esto funciona de manera diferente para Chrome y Firefox.

:::info

Esta documentación omite las extensiones web de Safari ya que su soporte está muy por detrás y la demanda de los usuarios no es alta. Si estás desarrollando una extensión web para Safari, por favor [crea un issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) y colabora para incluirla aquí también.

:::

### Chrome

Cargar una extensión web en Chrome se puede hacer proporcionando una cadena codificada en `base64` del archivo `crx` o proporcionando una ruta a la carpeta de la extensión web. Lo más sencillo es hacer lo último definiendo tus capacidades de Chrome de la siguiente manera:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // dado que tu wdio.conf.js está en el directorio raíz y tus archivos
            // de extensión web compilados están ubicados en la carpeta `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Si automatizas un navegador diferente a Chrome, por ejemplo, Brave, Edge u Opera, es probable que la opción del navegador coincida con el ejemplo anterior, solo usando un nombre de capacidad diferente, por ejemplo, `ms:edgeOptions`.

:::

Si compilas tu extensión como archivo `.crx` usando, por ejemplo, el paquete NPM [crx](https://www.npmjs.com/package/crx), también puedes inyectar la extensión empaquetada a través de:

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

Para crear un perfil de Firefox que incluya extensiones, puedes usar el [Servicio de Perfil de Firefox](/docs/firefox-profile-service) para configurar tu sesión en consecuencia. Sin embargo, podrías encontrarte con problemas donde tu extensión desarrollada localmente no puede cargarse debido a problemas de firma. En este caso, también puedes cargar una extensión en el hook `before` a través del comando [`installAddOn`](/docs/api/gecko#installaddon), por ejemplo:

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

## Consejos y Trucos

La siguiente sección contiene un conjunto de consejos y trucos útiles que pueden ser útiles al probar una extensión web.

### Probar Modal Emergente en Chrome

Si defines una entrada de acción del navegador `default_popup` en tu [manifiesto de extensión](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), puedes probar esa página HTML directamente, ya que hacer clic en el icono de la extensión en la barra superior del navegador no funcionará. En su lugar, tienes que abrir el archivo html emergente directamente.

En Chrome, esto funciona recuperando el ID de la extensión y abriendo la página emergente a través de `browser.url('...')`. El comportamiento en esa página será el mismo que dentro del popup. Para hacerlo, recomendamos escribir el siguiente comando personalizado:

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

Ahora, en tu prueba, puedes acceder a la página emergente a través de:

```ts
await browser.openExtensionPopup('Mi Extensión Web')
```