---
id: web-extensions
title: Web拡張機能のテスト
---

WebdriverIOはブラウザを自動化するための理想的なツールです。Web拡張機能はブラウザの一部であり、同じ方法で自動化することができます。Web拡張機能がウェブサイト上でJavaScriptを実行するためのコンテンツスクリプトを使用したり、ポップアップモーダルを提供したりする場合、WebdriverIOを使用してそのためのe2eテストを実行できます。

## ブラウザにWeb拡張機能をロードする

最初のステップとして、セッションの一部としてテスト対象の拡張機能をブラウザにロードする必要があります。これはChromeとFirefoxで異なる方法で動作します。

:::info

これらのドキュメントではSafari web拡張機能については触れていません。Safariのサポートは遅れており、ユーザーからの需要も高くないためです。Safariのweb拡張機能を開発している場合は、[問題を報告](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E)し、ここにも含めるよう協力してください。

:::

### Chrome

ChromeにWeb拡張機能をロードするには、`crx`ファイルの`base64`エンコードされた文字列を提供するか、Web拡張機能フォルダへのパスを提供します。最も簡単な方法は、Chrome機能を以下のように定義して後者を行うことです：

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
            // web拡張機能ファイルが`./dist`フォルダにある場合
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Chrome以外のブラウザ（例：Brave、Edge、Opera）を自動化する場合、ブラウザオプションは上記の例と一致する可能性がありますが、機能名が異なります（例：`ms:edgeOptions`）。

:::

例えば[crx](https://www.npmjs.com/package/crx) NPMパッケージを使用して拡張機能を`.crx`ファイルとしてコンパイルする場合、バンドルされた拡張機能を次のように注入することもできます：

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

拡張機能を含むFirefoxプロファイルを作成するには、[Firefox Profile Service](/docs/firefox-profile-service)を使用してセッションを適切に設定できます。ただし、署名の問題により、ローカルで開発された拡張機能が読み込めない場合があります。この場合、[`installAddOn`](/docs/api/gecko#installaddon)コマンドを使用して`before`フックで拡張機能をロードすることもできます：

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

`.xpi`ファイルを生成するには、[`web-ext`](https://www.npmjs.com/package/web-ext) NPMパッケージを使用することをお勧めします。次の例のコマンドを使用して拡張機能をバンドルできます：

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## ヒントとコツ

以下のセクションでは、Web拡張機能をテストする際に役立つヒントとコツのセットを紹介します。

### Chromeでポップアップモーダルをテストする

[拡張機能マニフェスト](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)で`default_popup`ブラウザアクションエントリを定義している場合、そのHTMLページを直接テストできます。ブラウザ上部バーの拡張機能アイコンをクリックする方法は機能しないため、ポップアップHTMLファイルを直接開く必要があります。

Chromeでは、拡張機能IDを取得し、`browser.url('...')`を通じてポップアップページを開くことで実現できます。そのページ上での動作はポップアップ内での動作と同じになります。そのために、次のようなカスタムコマンドを作成することをお勧めします：

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

これで、テスト内でポップアップページに次のようにアクセスできます：

```ts
await browser.openExtensionPopup('My Web Extension')
```