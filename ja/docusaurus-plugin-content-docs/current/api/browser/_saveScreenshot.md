---
id: saveScreenshot
title: スクリーンショットを保存する
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

現在のブラウジングコンテキストのスクリーンショットをOSのPNGファイルとして保存します。いくつかのブラウザドライバは文書全体のスクリーンショットを撮影し（例：FirefoxでのGeckodriver）、他のドライバは現在のビューポートのみを撮影する（例：ChromeでのChromedriver）ことに注意してください。

##### 使い方

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>生成される画像へのパス（`.png`サフィックスが必要）実行ディレクトリからの相対パス</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>スクリーンショットオプション</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>ページ全体のスクリーンショットを撮るか、現在のビューポートのみを撮るか</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>スクリーンショットのフォーマット（`png`または`jpeg`）</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>JPEGフォーマットの場合のスクリーンショットの品質（0-100パーセントの範囲）</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object`</td>
      <td>スクリーンショットの矩形領域の切り抜き</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="saveScreenshot.js"
it('should save a screenshot of the browser viewport', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png');
});

it('should save a screenshot of the full page', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { fullPage: true });
});

it('should save a screenshot of a specific rectangle', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { clip: { x: 0, y: 0, width: 100, height: 100 } });
});

it('should save a screenshot of the full page in JPEG format', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg' });
});

it('should save a screenshot of the full page in JPEG format with quality 50', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg', quality: 50 });
});

 running from a hook, make sure to explicitly define the hook as async:

```

```js title="wdio.conf.js"
afterTest: async function(test) {
    await browser.saveScreenshot('./some/path/screenshot.png');
}
```

##### 戻り値

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             スクリーンショットバッファ