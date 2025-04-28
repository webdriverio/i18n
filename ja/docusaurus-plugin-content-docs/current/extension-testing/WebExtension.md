---
id: web-extensions
title: Webエクステンションのテスト
---

WebdriverIOはブラウザを自動化するための理想的なツールです。Webエクステンションはブラウザの一部であり、同じ方法で自動化することができます。Webエクステンションがウェブサイト上でJavaScriptを実行するためのコンテンツスクリプトを使用したり、ポップアップモーダルを提供したりする場合はいつでも、WebdriverIOを使用してe2eテストを実行できます。

## ブラウザにWebエクステンションを読み込む

最初のステップとして、セッションの一部としてテスト対象のエクステンションをブラウザに読み込む必要があります。これはChromeとFirefoxで異なる方法で動作します。

:::info

これらのドキュメントではSafariウェブエクステンションについては言及していません。Safariのサポートは大幅に遅れており、ユーザーからの需要も高くないためです。Safariウェブエクステンションを開発している場合は、[イシューを作成](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E)して、ここに含めるための協力をお願いします。

:::

### Chrome

Chromeにウェブエクステンションを読み込むには、`crx`ファイルの`base64`エンコードされた文字列を提供するか、ウェブエクステンションフォルダへのパスを提供します。最も簡単な方法は、Chrome機能を次のように定義して後者を行うことです：

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // wdio.conf.jsがルートディレクトリにあり、コンパイルされた
            // ウェブエクステンションファイルが`./dist`フォルダにある場合
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Chrome以外のブラウザ（例：Brave、Edge、Opera）を自動化する場合、ブラウザオプションは上記の例と一致する可能性が高いですが、機能名が異なります（例：`ms:edgeOptions`）。

:::

[crx](https://www.npmjs.com/package/crx) NPMパッケージなどを使用してエクステンションを`.crx`ファイルとしてコンパイルする場合は、バンドルされたエクステンションを次のように注入することもできます：

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

エクステンションを含むFirefoxプロファイルを作成するには、[Firefox Profile Service](/docs/firefox-profile-service)を使用してセッションを適切に設定できます。ただし、署名の問題により、ローカルで開発されたエクステンションを読み込めない場合があります。この場合、[`installAddOn`](/docs/api/gecko#installaddon)コマンドを使用して`before`フックでエクステンションを読み込むこともできます：

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

`.xpi`ファイルを生成するには、[`web-ext`](https://www.npmjs.com/package/web-ext) NPMパッケージを使用することをお勧めします。次の例のコマンドを使用してエクステンションをバンドルできます：

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## ヒントとコツ

以下のセクションには、Webエクステンションをテストする際に役立つヒントとコツのセットが含まれています。

### Chromeでポップアップモーダルをテストする

[エクステンションマニフェスト](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)で`default_popup`ブラウザアクションエントリを定義している場合、そのHTMLページを直接テストできます。ブラウザ上部バーでエクステンションアイコンをクリックしても機能しないため、ポップアップHTMLファイルを直接開く必要があります。

Chromeでは、エクステンションIDを取得し`browser.url('...')`を通じてポップアップページを開くことができます。そのページでの動作はポップアップ内と同じになります。そのために以下のカスタムコマンドを作成することをお勧めします：

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

`wdio.conf.js`でこのファイルをインポートし、`before`フックでカスタムコマンドを登録できます：

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

これで、テスト内でポップアップページにアクセスできるようになります：

```ts
await browser.openExtensionPopup('My Web Extension')
```