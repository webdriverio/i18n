---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

要素のスクリーンショットをOS上のPNGファイルとして保存します。

##### 使用方法

```js
$(selector).saveScreenshot(filename)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>生成された画像のパス（`.png`の拡張子が必要）実行ディレクトリからの相対パス</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### 戻り値

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             スクリーンショットバッファ