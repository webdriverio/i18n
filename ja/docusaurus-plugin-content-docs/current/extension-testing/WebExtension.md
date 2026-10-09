---
id: web-extensions
title: Web拡張機能のテスト
description: "WebdriverIOセッションでChromeまたはFirefoxにWeb拡張機能を読み込む方法と、セッション中のBiDiによるインストールおよびアンインストールについて説明します。"
---

WebdriverIOはブラウザを自動化するための理想的なツールです。Web拡張機能はブラウザの一部であり、同じ方法で自動化できます。Web拡張機能がコンテンツスクリプトを使用してWebサイト上でJavaScriptを実行したり、ポップアップモーダルを提供したりする場合は、WebdriverIOを使用してe2eテストを実行できます。

以下のcapability設定を使用して、最初のナビゲーションの前に拡張機能を読み込みます。[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension)セッションの途中で拡張機能をインストールおよび削除するには、[`installExtension`](/docs/api/browser/installExtension)と[`uninstallExtension`](/docs/api/browser/uninstallExtension)を使用します。

## ブラウザへのWeb拡張機能の読み込み

最初のステップとして、テスト対象の拡張機能をセッションの一部としてブラウザに読み込む必要があります。これはChromeとFirefoxで方法が異なります。

:::info

Safariのサポートは大きく遅れており、ユーザーの需要も高くないため、このドキュメントではSafariのWeb拡張機能を扱いません。また、SafariにはWebDriver BiDiセッションがないため、[`installExtension`](/docs/api/browser/installExtension)はSafariに対応していません。Safari向けのWeb拡張機能を構築している場合は、[issueを作成](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E)し、ここに含めるための協力をお願いします。

:::

### Chrome

ChromeでのWeb拡張機能の読み込みは、`crx`ファイルを`base64`エンコードした文字列を指定するか、Web拡張機能フォルダへのパスを指定することで行えます。最も簡単なのは後者で、Chromeのcapabilitiesを次のように定義します：

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
            // Web拡張機能のファイルが`./dist`フォルダにあると仮定します
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Chrome以外のブラウザ（例：Brave、Edge、Opera）を自動化する場合、ブラウザオプションは上記の例と一致する可能性が高く、異なるcapability名（例：`ms:edgeOptions`）を使用するだけです。

:::

例えば[crx](https://www.npmjs.com/package/crx) NPMパッケージを使用して拡張機能を`.crx`ファイルとしてコンパイルする場合は、次の方法でバンドルされた拡張機能を注入することもできます：

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

拡張機能を含むFirefoxプロファイルを作成するには、[Firefox Profile Service](/docs/firefox-profile-service)を使用してセッションを適切に設定できます。ただし、ローカルで開発した拡張機能が署名の問題により読み込めないという問題が発生する場合があります。その場合は、[`installAddOn`](/docs/api/gecko#installaddon)コマンドを使用して`before`フックで拡張機能を読み込むこともできます。例：

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

`.xpi`ファイルを生成するには、[`web-ext`](https://www.npmjs.com/package/web-ext) NPMパッケージの使用をお勧めします。次のコマンド例を使用して拡張機能をバンドルできます：

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## セッション中に拡張機能をインストールする

v10以降、[`browser.installExtension`](/docs/api/browser/installExtension)と[`browser.uninstallExtension`](/docs/api/browser/uninstallExtension)は、WebDriver BiDiセッションの途中でWeb拡張機能をインストールし、そのIDを返します。起動時に拡張機能が存在してはならない場合や、同じテスト内で拡張機能をインストールし、動作を確認し、削除する場合に使用してください。

最初のナビゲーションの前に拡張機能を読み込む方法としては、引き続き上記のcapability設定と`installAddOn`を使用します。`installExtension`はそれらを置き換えるものではありません。[仕様のペイロード](https://w3c.github.io/webdriver-bidi/#command-webExtension-install)を自分で指定したい場合は、引き続き`browser.webExtensionInstall`と`browser.webExtensionUninstall`を利用できます。

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

`installExtension`は3種類の入力を受け付けます：

| 入力 | ブラウザに送信されるペイロード |
| --- | --- |
| ディレクトリパス | `path.resolve`後の`{ type: 'path', path }`。ブラウザがそのディレクトリを読み取れる必要があります。 |
| `.zip`、`.xpi`、または`.crx`のパス | `path.resolve`後の`{ type: 'archivePath', path }`。 |
| `{ base64: string }` | `{ type: 'base64', value }`。アーカイブのバイト列です。それ以外のオブジェクトは拒否されます。 |

文字列のパスは常にテストランナー上で解決されます。リモートセッション（`localhost`、`127.0.0.1`、`::1`以外のホスト名、またはクラウドの`user`と`key`を使用する場合）では、そのパスはブラウザマシン上のパスではありません。コマンドはアーカイブを読み込むか、ディレクトリをメモリ上でzip圧縮し、`base64`を送信します。ローカルかリモートかによる分岐を自分で行う必要はありません。ローカルセッションでは`path`または`archivePath`を送信し、バイト列は読み込みません。

ディレクトリを指定する場合は、拡張機能のルート、つまり`manifest.json`を含むフォルダを指定してください。

セッションはWebDriver BiDiに対応している必要があります。クラシックセッションでは`installExtension requires a WebDriver BiDi session (webExtension.install)`がスローされます。BiDiを実装していてもこのモジュールを実装していないブラウザでは、コマンドは`unsupported operation`（モジュールが存在しない場合は`unknown command`）で失敗します。不正なアーカイブは`invalid web extension`で失敗します。ブラウザが認識していないIDをアンインストールしようとすると`no such web extension`で失敗します。

`uninstallExtension`は、`installExtension`が返したID文字列を受け取ります。

### Chromium

ChromeとEdgeは`webExtension.install`を実装していますが、`--enable-unsafe-extension-debugging`と`--remote-debugging-pipe`を指定してブラウザを起動するまでは無効になっています。Chrome 136以降では、`--remote-debugging-pipe`を設定する場合は常に`--user-data-dir`も必要です。これらの引数がない場合、コマンドは`unknown error - Method not available`で失敗します。

`--remote-debugging-pipe`はドライバーとブラウザ間のパイプです。BiDiセッションは引き続き`webSocketUrl`を使用します。

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

Edgeの場合は`ms:edgeOptions`を使用してください。Firefoxは通常のBiDiセッションで拡張機能を読み込むため、これらの引数は必要ありません。

## ヒントとコツ

以下のセクションには、Web拡張機能をテストする際に役立つヒントとコツをまとめています。

### Chromeでのポップアップモーダルのテスト

[拡張機能のマニフェスト](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)で`default_popup`ブラウザアクションのエントリを定義している場合、ブラウザ上部バーの拡張機能アイコンをクリックすることはできないため、そのHTMLページを直接テストできます。代わりに、ポップアップのHTMLファイルを直接開く必要があります。

Chromeでは、拡張機能IDを取得し、`browser.url('...')`を通じてポップアップページを開くことで実現できます。そのページでの動作はポップアップ内と同じになります。そのためには、次のカスタムコマンドを作成することをお勧めします：

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

`wdio.conf.js`でこのファイルをインポートし、`before`フックでカスタムコマンドを登録できます。例：

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

これで、テスト内で次のようにポップアップページにアクセスできます：

```ts
await browser.openExtensionPopup('My Web Extension')
```