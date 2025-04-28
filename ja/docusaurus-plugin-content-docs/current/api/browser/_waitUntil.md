---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

このwaitコマンドは、何かを待ちたい場合の万能ツールです。条件を指定すると、その条件が真の値を返すまで待機します。

一般的な例としては、特定の要素が特定のテキストを含むまで待つことがあります（例を参照）。

##### 使用法

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>真の値を返すまで待機する条件</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`WaitUntilOptions`</td>
      <td>コマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>ミリ秒単位の時間（デフォルトは[`waitforTimeout`](/docs/configuration#waitfortimeout)設定値に基づきます）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>waitUntilがタイムアウトした時にスローするエラーメッセージ</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>条件チェックの間隔（デフォルトは[`waitforInterval`](/docs/configuration#waitforinterval)設定値に基づきます）</td>
    </tr>
  </tbody>
</table>

##### 例

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  条件が満たされた場合はtrue