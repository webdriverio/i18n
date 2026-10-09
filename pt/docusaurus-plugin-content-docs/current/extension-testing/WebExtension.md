---
id: web-extensions
title: Teste de Extensões Web
description: "Carregue uma extensão web no Chrome ou Firefox para uma sessão do WebdriverIO, incluindo instalação e desinstalação via BiDi no meio da sessão."
---

O WebdriverIO é a ferramenta ideal para automatizar um navegador. As extensões web fazem parte do navegador e podem ser automatizadas da mesma forma. Sempre que sua extensão web usar content scripts para executar JavaScript em sites ou oferecer um modal popup, você pode executar um teste e2e para isso usando o WebdriverIO.

Carregue a extensão antes da primeira navegação com a configuração de capabilities abaixo. Para instalar e remover uma extensão no meio de uma sessão [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), use [`installExtension`](/docs/api/browser/installExtension) e [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Carregando uma Extensão Web no Navegador

Como primeiro passo, precisamos carregar a extensão em teste no navegador como parte da nossa sessão. Isso funciona de forma diferente para o Chrome e o Firefox.

:::info

Esta documentação não aborda extensões web do Safari, pois o suporte a elas está muito atrasado e a demanda dos usuários não é alta. O Safari também não possui sessão WebDriver BiDi, então [`installExtension`](/docs/api/browser/installExtension) não cobre o Safari. Se você estiver desenvolvendo uma extensão web para o Safari, por favor [abra uma issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) e colabore para incluí-lo aqui também.

:::

### Chrome

O carregamento de uma extensão web no Chrome pode ser feito fornecendo uma string codificada em `base64` do arquivo `crx` ou fornecendo um caminho para a pasta da extensão web. O mais fácil é fazer a segunda opção, definindo suas capabilities do Chrome da seguinte forma:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // considerando que seu wdio.conf.js está no diretório raiz e os arquivos
            // compilados da sua extensão web estão localizados na pasta `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Se você automatizar um navegador diferente do Chrome, por exemplo Brave, Edge ou Opera, é provável que as opções do navegador correspondam ao exemplo acima, apenas usando um nome de capability diferente, por exemplo `ms:edgeOptions`.

:::

Se você compilar sua extensão como um arquivo `.crx` usando, por exemplo, o pacote NPM [crx](https://www.npmjs.com/package/crx), também pode injetar a extensão empacotada via:

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

Para criar um perfil do Firefox que inclua extensões, você pode usar o [Firefox Profile Service](/docs/firefox-profile-service) para configurar sua sessão adequadamente. No entanto, você pode encontrar problemas em que sua extensão desenvolvida localmente não pode ser carregada devido a problemas de assinatura. Nesse caso, você também pode carregar uma extensão no hook `before` através do comando [`installAddOn`](/docs/api/gecko#installaddon), por exemplo:

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

Para gerar um arquivo `.xpi`, é recomendado usar o pacote NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Você pode empacotar sua extensão usando o seguinte comando de exemplo:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Instalar uma extensão durante a sessão

Desde a v10, [`browser.installExtension`](/docs/api/browser/installExtension) e [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) instalam uma extensão web no meio de uma sessão WebDriver BiDi e retornam seu id. Use-os quando a extensão não deve estar presente na inicialização, ou quando o mesmo teste a instala, a exercita e a remove.

A configuração de capabilities e o `installAddOn` acima continuam sendo a forma de carregar uma extensão antes da primeira navegação. `installExtension` não os substitui. `browser.webExtensionInstall` e `browser.webExtensionUninstall` continuam disponíveis quando você quiser montar o [payload da especificação](https://w3c.github.io/webdriver-bidi/#command-webExtension-install) por conta própria.

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

`installExtension` aceita três tipos de entrada:

| Entrada | Payload enviado ao navegador |
| --- | --- |
| Um caminho de diretório | `{ type: 'path', path }` após `path.resolve`. O navegador precisa conseguir ler esse diretório. |
| Um caminho `.zip`, `.xpi` ou `.crx` | `{ type: 'archivePath', path }` após `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Bytes do arquivo. Qualquer outro objeto é rejeitado. |

Um caminho em string é sempre resolvido no test runner. Em uma sessão remota — um hostname diferente de `localhost`, `127.0.0.1` ou `::1`, ou com `user` e `key` de um serviço em nuvem — esse caminho não é um caminho na máquina do navegador. O comando lê o arquivo, ou compacta um diretório em memória, e envia `base64`. Você não precisa tratar a diferença entre local e remoto por conta própria. Sessões locais enviam `path` ou `archivePath` e não leem os bytes.

Aponte um diretório para a raiz da extensão, a pasta que contém o `manifest.json`.

A sessão precisa usar WebDriver BiDi. Uma sessão clássica lança `installExtension requires a WebDriver BiDi session (webExtension.install)`. Um navegador que implementa BiDi, mas não este módulo, falha o comando com `unsupported operation` (ou `unknown command` quando o módulo está ausente). Um arquivo inválido falha com `invalid web extension`. Desinstalar um id que o navegador não conhece falha com `no such web extension`.

`uninstallExtension` recebe a string de id que `installExtension` retornou.

### Chromium

O Chrome e o Edge implementam `webExtension.install` e o mantêm desativado até que você inicie o navegador com `--enable-unsafe-extension-debugging` e `--remote-debugging-pipe`. O Chrome 136 e versões mais recentes também exigem `--user-data-dir` sempre que `--remote-debugging-pipe` estiver definido. Sem esses argumentos, o comando falha com `unknown error - Method not available`.

`--remote-debugging-pipe` é o canal entre o driver e o navegador. A sessão BiDi continua usando `webSocketUrl`.

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

Use `ms:edgeOptions` para o Edge. O Firefox carrega a extensão em uma sessão BiDi normal e não precisa desses argumentos.

## Dicas e Truques

A seção a seguir contém um conjunto de dicas e truques úteis que podem ajudar ao testar uma extensão web.

### Testar Modal Popup no Chrome

Se você definir uma entrada de browser action `default_popup` no [manifesto da sua extensão](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), você pode testar essa página HTML diretamente, já que clicar no ícone da extensão na barra superior do navegador não funcionará. Em vez disso, você precisa abrir o arquivo html do popup diretamente.

No Chrome, isso funciona recuperando o ID da extensão e abrindo a página do popup através de `browser.url('...')`. O comportamento nessa página será o mesmo que dentro do popup. Para isso, recomendamos escrever o seguinte comando personalizado:

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

No seu `wdio.conf.js`, você pode importar este arquivo e registrar o comando personalizado no seu hook `before`, por exemplo:

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

Agora, no seu teste, você pode acessar a página do popup via:

```ts
await browser.openExtensionPopup('My Web Extension')
```