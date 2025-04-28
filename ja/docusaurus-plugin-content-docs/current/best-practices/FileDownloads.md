---
id: file-download
title: ファイルのダウンロード
---

Webテストでファイルのダウンロードを自動化する場合、信頼性の高いテスト実行を保証するために、異なるブラウザ間で一貫した方法で処理することが不可欠です。

ここでは、ファイルのダウンロードに関するベストプラクティスを提供し、**Google Chrome**、**Mozilla Firefox**、**Microsoft Edge**のダウンロードディレクトリを設定する方法を示します。

## ダウンロードパス

テストスクリプトでダウンロードパスを**ハードコーディング**すると、メンテナンスの問題や移植性の問題が発生する可能性があります。異なる環境間での移植性と互換性を確保するために、ダウンロードディレクトリには**相対パス**を使用しましょう。

```javascript
// 👎
// ハードコードされたダウンロードパス
const downloadPath = '/path/to/downloads';

// 👍
// 相対ダウンロードパス
const downloadPath = path.join(__dirname, 'downloads');
```

## 待機戦略

適切な待機戦略を実装しないと、特にダウンロード完了の際に競合状態や信頼性の低いテストが発生する可能性があります。ファイルのダウンロードが完了するまで待機するために、**明示的な**待機戦略を実装し、テストステップ間の同期を確保します。

```javascript
// 👎
// ダウンロード完了を待機しない
await browser.pause(5000);

// 👍
// ファイルダウンロードの完了を待機
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## ダウンロードディレクトリの設定

**Google Chrome**、**Mozilla Firefox**、**Microsoft Edge**のファイルダウンロード動作をオーバーライドするには、WebDriverIOのケーパビリティでダウンロードディレクトリを指定します：

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

実装例については、[WebdriverIOテストダウンロード動作レシピ](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior)を参照してください。

## Chromiumブラウザのダウンロード設定

WebDriverIOの`getPuppeteer`メソッドを使用してChrome DevToolsにアクセスし、__Chromium系__ブラウザ（Chrome、Edge、Braveなど）のダウンロードパスを変更します。

```javascript
const page = await browser.getPuppeteer();
// CDPセッションを開始：
const cdpSession = await page.target().createCDPSession();
// ダウンロードパスを設定：
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## 複数ファイルのダウンロード処理

複数のファイルダウンロードを伴うシナリオでは、各ダウンロードを効果的に管理および検証するための戦略を実装することが不可欠です。以下のアプローチを検討してください：

__順次ダウンロード処理：__ ファイルを1つずつダウンロードし、次のダウンロードを開始する前に各ダウンロードを確認して、順序正しい実行と正確な検証を確保します。

__並列ダウンロード処理：__ 非同期プログラミング技術を活用して複数のファイルダウンロードを同時に開始し、テスト実行時間を最適化します。すべてのダウンロードが完了したら検証する堅牢な検証メカニズムを実装します。

## クロスブラウザ互換性の考慮事項

WebDriverIOはブラウザ自動化のための統一インターフェースを提供していますが、ブラウザの動作や機能の違いを考慮することが重要です。互換性と一貫性を確保するために、異なるブラウザでファイルダウンロード機能をテストすることを検討してください。

__ブラウザ固有の設定：__ Chrome、Firefox、Edgeなど、サポートされているブラウザ間での動作や設定の違いに対応するために、ダウンロードパスの設定や待機戦略を調整します。

__ブラウザバージョンの互換性：__ 最新の機能や拡張機能を活用しながら、既存のテストスイートとの互換性を確保するために、WebDriverIOとブラウザのバージョンを定期的に更新します。