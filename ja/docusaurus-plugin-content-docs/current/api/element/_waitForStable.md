---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

指定されたミリ秒間、要素が安定する（アニメーションしない）のを待ちます。セレクタが
DOMで安定している少なくとも1つの要素と一致する場合はtrueを返し、そうでない場合はエラーを
スローします。reverse フラグがtrueの場合、このコマンドは、セレクタが安定した要素と
一致しない場合にtrueを返します。

__注意:__ このコマンドを使用するよりも、アニメーションを無効にする方が良いでしょう

##### 使用法

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td>waitForStableオプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは[`waitforTimeout`](/docs/configuration#waitfortimeout)設定値に基づく）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、反対の状態を待ちます（デフォルト: false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>存在する場合、デフォルトのエラーメッセージを上書きします</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>チェック間の間隔（デフォルト: `waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 例

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  要素が安定している場合はtrue