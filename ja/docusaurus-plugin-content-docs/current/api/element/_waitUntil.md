---
id: waitUntil
title: waitUntil（待機まで）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

この待機コマンドは、何かを待ちたい場合の万能ツールです。条件を指定して、その条件が真値で満たされるまで待機します。

:::info

他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

一般的な例としては、特定の要素が特定のテキストを含むまで待機することがあります（例を参照）。

##### 使用法

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>待機する条件</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`WaitUntilOptions`</td>
      <td>コマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは [`waitforTimeout`](/docs/configuration#waitfortimeout) 設定値に基づく）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>waitUntilがタイムアウトした時にスローするエラーメッセージ</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>条件チェック間の間隔（デフォルトは [`waitforInterval`](/docs/configuration#waitforinterval) 設定値に基づく）</td>
    </tr>
  </tbody>
</table>

##### 例

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 条件が満たされた場合はtrue