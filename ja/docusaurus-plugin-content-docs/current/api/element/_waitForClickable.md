---
id: waitForClickable
title: waitForClickable（クリック可能になるまで待機）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

指定したミリ秒間、要素がクリック可能または非クリック可能になるまで待機します。

:::info

他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

##### 使い方

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled オプション（省略可能）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは [`waitforTimeout`](/docs/configuration#waitfortimeout) 設定値に基づく）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Boolean`</td>
      <td>trueの場合は逆の状態を待機（デフォルト: false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`String`</td>
      <td>存在する場合はデフォルトのエラーメッセージを上書きします</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Number`</td>
      <td>チェック間の間隔（デフォルト: `waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 要素がクリック可能な場合は `true`（または、フラグが設定されている場合はその逆）