---
id: waitForClickable
title: waitForClickable（クリック可能かどうかの待機）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

指定したミリ秒の間、要素がクリック可能になるか、またはクリック不可能になるのを待ちます。

:::info

他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

##### 使用方法

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled オプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは [`waitforTimeout`](/docs/configuration#waitfortimeout) 設定値に基づく）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、反対の状態を待ちます（デフォルト: false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>存在する場合、デフォルトのエラーメッセージを上書きします</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
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
            **<code><var>return</var></code>:**  要素がクリック可能な場合は `true`（またはフラグが設定されている場合はその逆）