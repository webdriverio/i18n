---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

指定されたミリ秒間、（CSSセレクタで選択された）要素が有効/無効になるのを待ちます。指定されたセレクタによって複数の要素が照会される場合、少なくとも1つの要素が有効/無効になると、trueを返します。

:::info

他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

##### 使用法

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabledオプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは[`waitforTimeout`](/docs/configuration#waitfortimeout)設定値に基づく）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合は逆の状態を待つ（デフォルト：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>存在する場合は、デフォルトのエラーメッセージを上書きする</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>チェック間隔（デフォルト：`waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 例

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  要素が有効/無効の場合は true