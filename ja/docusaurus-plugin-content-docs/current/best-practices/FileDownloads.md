---
id: file-download
title: ファイルのダウンロード
description: "Chrome、Firefox、Edgeのダウンロードディレクトリを設定し、ダウンロードの完了を待機して、ブラウザ間でダウンロードされたファイルを検証します。"
---

Webテストでファイルのダウンロードを自動化する際には、信頼性の高いテスト実行を確保するために、異なるブラウザ間で一貫した方法でダウンロードを処理することが不可欠です。

ここでは、ファイルダウンロードのベストプラクティスを紹介し、**Google Chrome**、**Mozilla Firefox**、**Microsoft Edge**のダウンロードディレクトリを設定する方法を説明します。

## ダウンロードパス

テストスクリプト内でダウンロードパスを**ハードコーディング**すると、メンテナンス上の問題や移植性の問題につながる可能性があります。異なる環境間での移植性と互換性を確保するために、ダウンロードディレクトリには**相対パス**を使用してください。

```javascript
// 👎
// ハードコーディングされたダウンロードパス
const downloadPath = '/path/to/downloads';

// 👍
// 相対ダウンロードパス
const downloadPath = path.join(__dirname, 'downloads');
```

## 待機戦略

適切な待機戦略を実装しないと、特にダウンロードの完了に関して、競合状態や信頼性の低いテストにつながる可能性があります。ファイルダウンロードの完了を待機する**明示的な**待機戦略を実装し、テストステップ間の同期を確保してください。

```javascript
// 👎
// ダウンロード完了の明示的な待機なし
await browser.pause(5000);

// 👍
// ファイルダウンロードの完了を待機
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## ダウンロードディレクトリの設定

**Google Chrome**、**Mozilla Firefox**、**Microsoft Edge**のファイルダウンロードの動作を上書きするには、WebDriverIOのcapabilitiesでダウンロードディレクトリを指定します。

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

実装例については、[WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior)を参照してください。

## Chromiumブラウザのダウンロード設定

__Chromiumベース__のブラウザ（Chrome、Edge、Braveなど）のダウンロードパスを変更するには、Chrome DevToolsにアクセスするためのWebDriverIOの`getPuppeteer`メソッドを使用します。

```javascript
const page = await browser.getPuppeteer();
// CDPセッションを開始:
const cdpSession = await page.target().createCDPSession();
// ダウンロードパスを設定:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## 複数ファイルのダウンロードの処理

複数のファイルをダウンロードするシナリオを扱う場合、各ダウンロードを効果的に管理・検証するための戦略を実装することが不可欠です。以下のアプローチを検討してください。

__順次ダウンロードの処理:__ ファイルを1つずつダウンロードし、次のダウンロードを開始する前に各ダウンロードを検証することで、秩序ある実行と正確な検証を確保します。

__並列ダウンロードの処理:__ 非同期プログラミングの手法を活用して複数のファイルダウンロードを同時に開始し、テストの実行時間を最適化します。完了時にすべてのダウンロードを検証する堅牢な検証メカニズムを実装してください。

## クロスブラウザ互換性に関する考慮事項

WebDriverIOはブラウザ自動化のための統一されたインターフェースを提供していますが、ブラウザの動作や機能の違いを考慮することが不可欠です。互換性と一貫性を確保するために、異なるブラウザ間でファイルダウンロード機能をテストすることを検討してください。

__ブラウザ固有の設定:__ Chrome、Firefox、Edge、およびその他のサポートされているブラウザ間での動作や設定の違いに対応するために、ダウンロードパスの設定と待機戦略を調整してください。

__ブラウザバージョンの互換性:__ 既存のテストスイートとの互換性を確保しながら最新の機能や改善を活用するために、WebDriverIOとブラウザのバージョンを定期的に更新してください。