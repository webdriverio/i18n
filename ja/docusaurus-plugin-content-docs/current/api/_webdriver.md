---
id: webdriver
title: WebDriverプロトコル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
New Sessionコマンドは、エンドポイントノードで新しいWebDriverセッションを作成します。作成に失敗した場合は、セッション未作成エラーが返されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-new-sessions)を参照してください。

##### 使用法

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>機能処理アルゴリズムで最終的にマージされ、マッチングされた機能セットを含むJSONオブジェクト</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** 作成されたWebDriverセッションのsessionIdとcapabilitiesを含むオブジェクト。


---

## deleteSession
Delete Sessionコマンドは、現在のセッションに関連付けられている最上位ブラウジングコンテキストを閉じ、接続を終了し、最後に現在のセッションを閉じます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-delete-session)を参照してください。

##### 使用法

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>object</td>
      <td>deleteSessionコマンドのオプションを含むオブジェクト、例：`{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Statusコマンドは、リモートエンドが新しいセッションを作成できる状態にあるかどうかに関する情報を返し、実装に固有の任意のメタ情報を含めることができます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-status)を参照してください。

##### 使用法

```js
browser.status()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** ドライバーステータスの状態を含むオブジェクト。


---

## getTimeouts
Get Timeoutsコマンドは、現在のセッションに関連付けられたタイムアウト時間を取得します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-timeouts)を参照してください。

##### 使用法

```js
browser.getTimeouts()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** `script`、`pageLoad`、`implicit`タイムアウトのタイムアウト時間を含むオブジェクト。


---

## setTimeouts
Set Timeoutsコマンドは、現在のセッションに関連付けられたタイムアウト時間を設定します。制御できるタイムアウトは、以下のセッションタイムアウトの表に記載されています。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-set-timeouts)を参照してください。

##### 使用法

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>セッションの暗黙的な待機タイムアウトのミリ秒単位の整数</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>セッションのページロードタイムアウトのミリ秒単位の整数</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>セッションのスクリプトタイムアウトのミリ秒単位の整数</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Get Current URLコマンドは、現在の最上位ブラウジングコンテキストのURLを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-current-url)を参照してください。

##### 使用法

```js
browser.getUrl()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>url</var></code>:** 現在の最上位ブラウジングコンテキストのアクティブドキュメントのドキュメントURL


---

## navigateTo
navigateTo（go）コマンドは、ユーザーエージェントに現在の最上位ブラウジングコンテキストを新しい場所に移動させるために使用されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-navigate-to)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[url](/docs/api/browser/url)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>絶対URL（http(s)で始まる）を表す文字列、フラグメント（#...）を含む場合もあり、ローカルスキーム（about:など）の場合もあります</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Backコマンドは、ブラウザに現在の最上位ブラウジングコンテキストの共同セッション履歴内で1ステップ後退するよう指示します。これはブラウザのクロームの戻るボタンを押すか、`window.history.back`を呼び出すのと同等です。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-back)を参照してください。

##### 使用法

```js
browser.back()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Forwardコマンドは、ブラウザに現在の最上位ブラウジングコンテキストの共同セッション履歴内で1ステップ前進するよう指示します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-forward)を参照してください。

##### 使用法

```js
browser.forward()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Refreshコマンドは、ブラウザに現在の最上位ブラウジングコンテキストでページを再読み込みさせます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-refresh)を参照してください。

##### 使用法

```js
browser.refresh()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Get Titleコマンドは、現在の最上位ブラウジングコンテキストのドキュメントタイトルを返します。これは`document.title`を呼び出すのと同等です。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-title)を参照してください。

##### 使用法

```js
browser.getTitle()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>title</var></code>:** 現在の最上位ブラウジングコンテキストの`document.title`と同じ文字列を返します。


---

## getWindowHandle
Get Window Handleコマンドは、現在の最上位ブラウジングコンテキストのウィンドウハンドルを返します。これはSwitch To Windowの引数として使用できます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-window-handle)を参照してください。

##### 使用法

```js
browser.getWindowHandle()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** 現在の最上位ブラウジングコンテキストのウィンドウハンドルである文字列を返します。


---

## closeWindow
Close Windowコマンドは、現在の最上位ブラウジングコンテキストを閉じます。一度完了すると、開いている最上位ブラウジングコンテキストがなくなった場合、WebDriverセッション自体が閉じられます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-close-window)を参照してください。

##### 使用法

```js
browser.closeWindow()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Switch To Windowコマンドは、現在のセッションの現在の最上位ブラウジングコンテキストを選択するために使用されます。つまり、コマンドの処理に使用されるコンテキストを選択します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-switch-to-window)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[switchWindow](/docs/api/browser/switchWindow)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>ウィンドウハンドルを表す文字列。getWindowHandlesの呼び出しで返された文字列の1つである必要があります</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
新しい最上位ブラウジングコンテキストを作成します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#new-window)を参照してください。

##### 使用法

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>新しく作成されたウィンドウが現在のブラウジングコンテキストとOS レベルのウィンドウを共有する場合は 'tab' に設定し、そうでない場合は 'window' に設定します。</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** ハンドルの値を持つ「handle」と作成されたウィンドウタイプの値を持つ「type」を含む新しいウィンドウオブジェクト


---

## getWindowHandles
Get Window Handlesコマンドは、開いているすべての最上位ブラウジングコンテキストのウィンドウハンドルのリストを返します。ウィンドウハンドルが返される順序は任意です。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-window-handles)を参照してください。

##### 使用法

```js
browser.getWindowHandles()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### 戻り値

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** ウィンドウハンドルのリストである配列。


---

## printPage
Print Pageコマンドは、ドキュメントをページ分割されたPDFドキュメントにレンダリングします。__注意:__ Chromeは現在、[ヘッドレスモード](https://webdriver.io/docs/capabilities/#run-browser-headless)でのみこれをサポートしています。[`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)を参照してください。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#print-page)を参照してください。

##### 使用法

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>ページの向き。デフォルト：`portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>ページのスケール。デフォルト：`1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>ページの背景。デフォルト：`false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>ページの幅（cm）。デフォルト：ページから`21.59`</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>ページの高さ（cm）。デフォルト：ページから`27.94`</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>上部マージンからのページマージン（cm）。デフォルト：`1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>下部マージンからのページマージン（cm）。デフォルト：`1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>左マージンからのページマージン（cm）。デフォルト：`1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>右マージンからのページマージン（cm）。デフォルト：`1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>PDFをページに合わせて縮小。デフォルト：`true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>object[]</td>
      <td>ページ範囲。デフォルト `[]`</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** ページ分割されたドキュメントのBase64エンコードされたPDF表現。


---

## switchToFrame
Switch To Frameコマンドは、現在の最上位ブラウジングコンテキストまたは現在のブラウジングコンテキストの子ブラウジングコンテキストを選択し、後続のコマンドの現在のブラウジングコンテキストとして使用するために使用されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-switch-to-frame)を参照してください。
:::caution

このプロトコルコマンドは非推奨です<br />このコマンドは非推奨であり、フレームに切り替えるには代わりに`switchFrame`を使用することをお勧めします。このコマンドの詳細については、https://webdriver.io/docs/api/browser/switchFrame をご覧ください。
:::

##### 使用法

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>3つの可能なタイプのうちの1つ：null：これは最上位ブラウジングコンテキスト（つまり、iframeではない）を表します、数値：フレームに対応するウィンドウオブジェクトのインデックスを表します、`findElement`を使用して受け取ったElementオブジェクト。</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Switch to Parent Frameコマンドは、将来のコマンドの現在のブラウジングコンテキストを現在のブラウジングコンテキストの親に設定します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame)を参照してください。

##### 使用法

```js
browser.switchToParentFrame()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Get Window Rectコマンドは、現在の最上位ブラウジングコンテキストに対応するオペレーティングシステムウィンドウの画面上のサイズと位置を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-window-rect)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getWindowSize](/docs/api/browser/getWindowSize)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getWindowRect()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** 「window rect」オブジェクトのJSON表現。これには4つのプロパティがあります：`x`、`y`、`width`、`height`。


---

## setWindowRect
Set Window Rectコマンドは、現在の最上位ブラウジングコンテキストに対応するオペレーティングシステムウィンドウのサイズと位置を変更します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-set-window-rect)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[setWindowSize](/docs/api/browser/setWindowSize)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>ウィンドウオブジェクトのscreenX属性</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>ウィンドウオブジェクトのscreenY属性</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>ブラウザのクロームなどを含む最上位ブラウジングコンテキストの外部寸法の幅</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>ブラウザのクロームなどを含む最上位ブラウジングコンテキストの外部寸法の高さ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** 新しいウィンドウ状態に基づく「window rect」オブジェクトのJSON表現。


---

## maximizeWindow
Maximize Windowコマンドは、現在の最上位ブラウジングコンテキストを含むウィンドウに対して、ウィンドウマネージャー固有の「最大化」操作があれば実行します。これは通常、フルスクリーンにすることなく、ウィンドウを最大限利用可能なサイズに拡大します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-maximize-window)を参照してください。

##### 使用法

```js
browser.maximizeWindow()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** 新しいウィンドウ状態に基づく「window rect」オブジェクトのJSON表現。


---

## minimizeWindow
Minimize Windowコマンドは、現在の最上位ブラウジングコンテキストを含むウィンドウに対して、ウィンドウマネージャー固有の「最小化」操作があれば実行します。これは通常、ウィンドウをシステムトレイに隠します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-minimize-window)を参照してください。

##### 使用法

```js
browser.minimizeWindow()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** （新しい）現在の最上位ブラウジングコンテキストの「window rect」オブジェクトのJSON表現。


---

## fullscreenWindow
Fullscreen Windowコマンドは、現在の最上位ブラウジングコンテキストを含むウィンドウに対して、ウィンドウマネージャー固有の「フルスクリーン」操作があれば実行します。これは通常、ウィンドウを物理ディスプレイのサイズに拡大し、ツールバーなどのブラウザのクローム要素を非表示にすることができます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-fullscreen-window)を参照してください。

##### 使用法

```js
browser.fullscreenWindow()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** （新しい）現在の最上位ブラウジングコンテキストの「window rect」オブジェクトのJSON表現。


---

## findElement
Find Elementコマンドは、現在のブラウジングコンテキストで将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-find-element)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[$](/docs/api/browser/$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### 戻り値

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 要素オブジェクトのJSON表現、例：`{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementFromShadowRoot
Find Element From Shadow Rootコマンドは、要素のシャドウルート内で将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#find-element-from-shadow-root)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[shadow$](/docs/api/element/shadow$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>シャドウルート要素の要素ID</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### 戻り値

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 要素シャドウオブジェクトのJSON表現、例：`{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElements
Find Elementsコマンドは、現在のブラウジングコンテキストで将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現の配列を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます（findElementを参照）。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-find-elements)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[$$](/docs/api/browser/$$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### 戻り値

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 要素オブジェクトの表現のJSON リスト（空の場合もある）、例：`[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`。


---

## findElementsFromShadowRoot
Find Elementsコマンドは、要素のシャドウルート内で将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現の配列を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます（findElementを参照）。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#find-elements-from-shadow-root)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[shadow$$](/docs/api/element/shadow$$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>シャドウルート要素の要素ID</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### 戻り値

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 要素オブジェクトの表現のJSON リスト（空の場合もある）、例：`{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementFromElement
Find Element From Elementコマンドは、現在のブラウジングコンテキスト内のウェブ要素から、将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます（findElementを参照）。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-find-element-from-element)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[$](/docs/api/element/$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### 戻り値

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 要素オブジェクトのJSON表現、例：`{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementsFromElement
Find Elements From Elementコマンドは、現在のブラウジングコンテキスト内のウェブ要素から、将来のコマンドに使用できる要素を見つけるために使用されます。このコマンドは、要素のJSON表現の配列を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます（findElementを参照）。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-find-elements-from-element)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[$$](/docs/api/element/$$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有効な要素の位置戦略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>要素を見つけるために使用される実際のセレクタ</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### 戻り値

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 要素オブジェクトの表現のJSON リスト（空の場合もある）、例：`[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`。


---

## getElementShadowRoot
要素のシャドウルートオブジェクトを取得します。結果オブジェクトは、findElementFromShadowRootsやfindElementsFromShadowRootsなどを使用してこのシャドウルート内の要素を取得するために使用できます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-active-element)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[shadow$](/docs/api/element/shadow$)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** 要素シャドウルートのJSON表現、例：`{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## getActiveElement
Get Active Elementは、現在のブラウジングコンテキストのドキュメント要素のアクティブな要素を返します。このコマンドは、要素のJSON表現を返し、それを$コマンドに渡して参照を拡張WebdriverIO要素に変換できます（findElementを参照）。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-active-element)を参照してください。

##### 使用法

```js
browser.getActiveElement()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>element</var></code>:** 要素オブジェクトのJSON表現、例：`{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## isElementSelected
Is Element Selectedは、参照された要素が選択されているかどうかを判断します。この操作は、チェックボックス状態とラジオボタン状態の入力要素、またはオプション要素でのみ意味があります。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-is-element-selected)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[isSelected](/docs/api/element/isSelected)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** 選択状態に基づいて `true` または `false`。


---

## isElementDisplayed
Is Element Displayedは、人間の目に知覚的に見えるものによって要素の可視性を判断します。このコンテキストでは、要素の表示状態は`visibility`または`display`スタイルプロパティには関連しません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#element-displayedness)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[isDisplayed](/docs/api/element/isDisplayed)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** 可視状態に基づいて `true` または `false`。


---

## getElementAttribute
Get Element Attributeコマンドは、Web要素の属性を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-attribute)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getAttribute](/docs/api/element/getAttribute)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>取得する属性値の名前</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** 要素の名前付き属性。


---

## getElementProperty
Get Element Propertyコマンドは、要素のプロパティを取得した結果を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-property)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getProperty](/docs/api/element/getProperty)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>取得する属性プロパティの名前</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>property</var></code>:** 要素オブジェクトでGetOwnPropertyを呼び出してアクセスした要素の名前付きプロパティ。


---

## getElementCSSValue
Get Element CSS Valueコマンドは、指定されたWeb要素の指定されたCSSプロパティの計算値を取得します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-css-value)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getCSSProperty](/docs/api/element/getCSSProperty)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>取得するCSSプロパティの名前</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** 要素のスタイル宣言からのプロパティ名に対応するパラメータの計算値（ドキュメントタイプがxmlの場合を除き、その場合は単に空の文字列を返します）。


---

## getElementText
Get Element Textコマンドは、要素のテキストを「レンダリングされたまま」返そうとします。要素のレンダリングされたテキストは、リンクテキストや部分的なリンクテキストによる要素の検索にも使用されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-text)を参照してください。

##### 使用法

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>text</var></code>:** 要素の可視テキスト（子要素を含む）、Selenium Atomsで定義されている[`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981)のアルゴリズムに従います。


---

## getElementTagName
Get Element Tag Nameコマンドは、指定されたWeb要素の修飾要素名を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-tag-name)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getTagName](/docs/api/element/getTagName)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>text</var></code>:** 要素のtagName属性。


---

## getElementRect
Get Element Rectコマンドは、指定されたWeb要素の寸法と座標を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-element-rect)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[getSize](/docs/api/element/getSize)、[getLocation](/docs/api/element/getLocation)。代わりにこれらのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** 要素の位置と境界矩形を表すJSONオブジェクト。


---

## isElementEnabled
Is Element Enabledは、参照された要素が有効かどうかを判断します。この操作はフォームコントロールでのみ意味があります。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-is-element-enabled)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[isEnabled](/docs/api/element/isEnabled)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** 要素がxmlドキュメント内にある場合、または無効なフォームコントロールである場合：`false`、それ以外の場合は`true`。


---

## elementClick
Element Clickコマンドは、要素がまだポインターで操作可能でない場合はスクロールして表示し、その表示中の中心点をクリックします。要素の中心点が別の要素によって覆われている場合、要素クリックが遮断されたエラーが返されます。要素がビューポートの外にある場合、要素が操作できないエラーが返されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-element-click)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[click](/docs/api/element/click)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Element Clearコマンドは、編集可能またはリセット可能な要素をスクロールして表示し、選択されたファイルまたはテキストコンテンツをクリアしようとします。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-element-clear)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[clearValue](/docs/api/element/clearValue)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Element Send Keysコマンドは、フォーム制御要素をスクロールして表示し、指定されたキーを要素に送信します。要素がキーボードで操作できない場合、要素が操作できないエラーが返されます。<br /><br />キー入力状態は、「タイピング」の途中でnullキー（U+E000（NULL））を送信することでクリアできます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-element-send-keys)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[addValue](/docs/api/element/addValue)、[setValue](/docs/api/element/setValue)。代わりにこれらのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>要素にキーストロークとして送信する文字列</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Get Page Sourceコマンドは、現在のブラウジングコンテキストのアクティブドキュメントのDOMの文字列シリアライゼーションを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-page-source)を参照してください。

##### 使用法

```js
browser.getPageSource()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** 現在のブラウジングコンテキストのアクティブドキュメントのDOM


---

## executeScript
Execute Scriptコマンドは、現在のブラウジングコンテキストのコンテキストでJavaScript関数を実行し、関数の戻り値を返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-execute-script)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[execute](/docs/api/browser/execute)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>実行したいJavaScript関数本体を表す文字列</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>デシリアライズされて関数に引数として渡されるJSON値の配列</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>result</var></code>:** スクリプトの戻り値、スクリプトによって返されたPromiseの成功、またはスクリプトによって返されたPromiseの拒否理由となったエラー。


---

## executeAsyncScript
Execute Async Scriptコマンドは、JavaScriptを匿名関数として実行させます。Execute Scriptコマンドとは異なり、関数の結果は無視されます。代わりに、関数に最後の引数として追加の引数が提供されます。これは、呼び出されると、その最初の引数を応答として返す関数です。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-execute-async-script)を参照してください。

:::info

このプロトコルコマンドは、以下の便利なメソッドに組み込まれています：[executeAsync](/docs/api/browser/executeAsync)。代わりにこのコマンドを使用することをお勧めします。

:::


##### 使用法

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>実行したいJavaScript関数本体を表す文字列</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>デシリアライズされて関数に引数として渡されるJSON値の配列</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>result</var></code>:** スクリプトの戻り値、スクリプトによって返されたPromiseの成功、またはスクリプトによって返されたPromiseの拒否理由となったエラー。


---

## getAllCookies
Get All Cookiesコマンドは、現在のブラウジングコンテキストのアクティブドキュメントのアドレスに関連付けられているすべてのCookieを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-all-cookies)を参照してください。

##### 使用法

```js
browser.getAllCookies()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### 戻り値

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** シリアライズされたクッキーのリスト。各シリアライズされたクッキーには、`name`と`value`に加えて返されるかもしれないいくつかのオプションフィールドがあります。


---

## addCookie
Add Cookieコマンドは、アクティブドキュメントのアドレスに関連付けられたCookieストアに単一のCookieを追加します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-adding-a-cookie)を参照してください。

##### 使用法

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>クッキーを表すJSONオブジェクト。少なくとも名前と値のフィールドを持ち、有効期限などを含む他のフィールドを持つこともできます</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Delete All Cookiesコマンドは、アクティブドキュメントのアドレスに関連付けられているすべてのCookieの削除を可能にします。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-delete-all-cookies)を参照してください。

##### 使用法

```js
browser.deleteAllCookies()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Get Named Cookieコマンドは、現在のブラウジングコンテキストのアクティブドキュメントのCookieストア内の関連Cookieから要求された名前のCookieを返します。Cookieが見つからない場合、そのようなCookieがないというエラーが返されます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-named-cookie)を参照してください。

##### 使用法

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>取得するクッキーの名前</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** 名前と値のフィールドを持つシリアライズされたクッキー。`path`、`domain`、`expiry-time`などのオプションフィールドも存在する場合があります。


---

## deleteCookie
Delete Cookieコマンドを使用すると、パラメータ名で単一のCookieを削除するか、nameが未定義の場合はアクティブドキュメントのアドレスに関連付けられているすべてのCookieを削除できます。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-delete-cookie)を参照してください。

##### 使用法

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>削除するクッキーの名前</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Perform Actionsコマンドは、複雑なユーザーアクションを実行するために使用されます。詳細については、[仕様](https://github.com/jlipps/simple-wd-spec#perform-actions)を参照してください。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-perform-actions)を参照してください。

##### 使用法

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>オブジェクトのリスト。各オブジェクトは入力ソースとそれに関連するアクションを表します</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Release Actionsコマンドは、現在押されているすべてのキーとポインターボタンを解放するために使用されます。これにより、状態が一連の明示的なアクションによって解放されたかのようにイベントが発生します。また、仮想デバイスのすべての内部状態をクリアします。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-release-actions)を参照してください。

##### 使用法

```js
browser.releaseActions()
```



---

## dismissAlert
Dismiss Alertコマンドは、存在する場合は単純なダイアログを閉じ、そうでない場合はエラーを返します。必ずしも閉じるボタンがないかもしれないアラートユーザープロンプトを閉じるリクエストは、それを受け入れるのと同じ効果があります。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-dismiss-alert)を参照してください。

##### 使用法

```js
browser.dismissAlert()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Accept Alertコマンドは、存在する場合は単純なダイアログを受け入れ、そうでない場合はエラーを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-accept-alert)を参照してください。

##### 使用法

```js
browser.acceptAlert()
```



---

## getAlertText
Get Alert Textコマンドは、現在のユーザープロンプトのメッセージを返します。現在のユーザープロンプトがない場合は、エラーを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-get-alert-text)を参照してください。

##### 使用法

```js
browser.getAlertText()
```

##### 例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** ユーザープロンプトのメッセージ。


---

## sendAlertText
Send Alert Textコマンドは、window.promptユーザープロンプトのテキストフィールドを指定された値に設定します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-send-alert-text)を参照してください。

##### 使用法

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>プロンプトを設定する文字列</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Take Screenshotコマンドは、最上位ブラウジングコンテキストのビューポートのスクリーンショットを撮ります。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-take-screenshot)を参照してください。

##### 使用法

```js
browser.takeScreenshot()
```


##### 戻り値

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** 初期ビューポートのスクリーンショットを構成するBase64エンコードされたPNG画像データ。


---

## takeElementScreenshot
Take Element Screenshotコマンドは、要素の境界矩形によって包含される可視領域のスクリーンショットを撮ります。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#dfn-take-element-screenshot)を参照してください。

##### 使用法

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>要素を表示するためにスクロールします。デフォルト：true</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** 表示内に要素をスクロールした後の要素の境界矩形の可視領域のスクリーンショットを構成するBase64エンコードされたPNG画像データ。


---

## getElementComputedRole
要素の計算されたWAI-ARIAロールを取得します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#get-computed-role)を参照してください。

##### 使用法

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>role</var></code>:** 要素のWAI-ARIAロールを計算した結果。


---

## getElementComputedLabel
要素のアクセシブルな名前を取得します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver/#get-computed-label)を参照してください。

##### 使用法

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>以前のFind Element(s)の呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>label</var></code>:** 要素のアクセシブルな名前のアクセシブルな名前と説明の計算の結果。


---

## setPermissions
PermissionDescriptorの許可状態のユーザー変更をシミュレートします。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/permissions/#set-permission-command)を参照してください。

##### 使用法

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>強力な機能はそれぞれ、ウェブサイトがアクセス許可を要求できる1つ以上の側面を持っています。これらの側面を説明するために、各機能はPermissionDescriptorのサブタイプをその許可記述子タイプとして定義します。__注意:__ この機能はまだすべてのブラウザに実装されていません。</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>許可が付与されるか、拒否されるか、プロンプトが表示されるかを決定します。</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>すべての実行コンテキストに権限を適用するかどうか。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// MIDIの権限を設定
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // "denied"または"prompt"も可能
);
```


```js
// クリップボードの権限を設定
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// これでクリップボードを読み取ることができます、例えば
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
テスト用のレポートを生成します。[Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi)の拡張機能です。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/reporting/#automation)を参照してください。

##### 使用法

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>レポートに表示されるメッセージ。</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>レポートを配信するエンドポイントグループを指定します。</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
環境光センサーなどのセンサーをエミュレートするためのモックセンサーを作成します。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/sensors/#create-mock-sensor-command)を参照してください。

##### 使用法

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>モックするセンサーAPIのタイプ、例：'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>関連するモックセンサーの最大サポートサンプリング周波数を設定するために使用される、Hzでの周波数を表す倍精度浮動小数点数。</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>関連するモックセンサーの最小サポートサンプリング周波数を設定するために使用される、Hzでの周波数を表す倍精度浮動小数点数。</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
指定されたタイプのモックセンサーに関する情報を取得します。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/sensors/#get-mock-sensor-command)を参照してください。

##### 使用法

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>情報を取得するモックセンサータイプ。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** モックセンサー読み取りの値。


---

## updateMockSensor
モックセンサータイプを更新します。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/sensors/#update-mock-sensor-reading-command)を参照してください。

##### 使用法

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>情報を更新するモックセンサータイプ。</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>モックするセンサーAPIのタイプ、例：'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>関連するモックセンサーの最大サポートサンプリング周波数を設定するために使用される、Hzでの周波数を表す倍精度浮動小数点数。</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>number</td>
      <td>関連するモックセンサーの最小サポートサンプリング周波数を設定するために使用される、Hzでの周波数を表す倍精度浮動小数点数。</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Delete Sessionコマンドは、現在のセッションに関連付けられている最上位ブラウジングコンテキストをすべて閉じ、接続を終了し、最後に現在のセッションを閉じます。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/sensors/#delete-mock-sensor-command)を参照してください。

##### 使用法

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>削除するモックセンサータイプ。</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
テスト目的のためのタイムゾーンの変更をシミュレートします。__注意:__ この機能はまだすべてのブラウザに実装されていません。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/sensors/#create-mock-sensor-command)を参照してください。

##### 使用法

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>タイムゾーンの名前、例：Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
ソフトウェア[仮想認証器](https://www.w3.org/TR/webauthn-2/#virtual-authenticators)を作成します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator)を参照してください。

##### 使用法

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>有効な値：'ctap1/u2f'、'ctap2'、'ctap2_1'。</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>有効な値：'usb'、'nfc'、'ble'または'internal'。</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>有効な値：true、false。</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>有効な値：true、false。</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>有効な値：true、false。</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>有効な値：拡張機能識別子を含む配列。</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string[]</td>
      <td>有効な値：最大3つのユーザー検証方法エントリ。</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** 認証器の文字列IDを返します。


---

## removeVirtualAuthenticator
以前に作成された仮想認証器を削除します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator)を参照してください。

##### 使用法

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
  </tbody>
</table>



---

## addCredential
公開鍵資格情報ソースを既存の仮想認証器に注入します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential)を参照してください。

##### 使用法

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>Base64urlエンコーディングを使用してエンコードされた資格情報ID。</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>trueに設定すると、クライアント側で検出可能な資格情報が作成されます。falseに設定すると、代わりにサーバー側の資格情報が作成されます。</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>資格情報がスコープされているRelying Party ID。</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>[RFC5958]に従って単一の秘密鍵を含む非対称鍵パッケージで、Base64urlエンコーディングを使用してエンコードされています。</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>Base64urlエンコーディングを使用してエンコードされた資格情報に関連付けられたuserHandle。このプロパティは定義されていない場合があります。</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>公開鍵資格情報ソースに関連付けられた署名カウンターの初期値。</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>公開鍵資格情報ソースに関連付けられた大きな資格情報ごとのBlob。Base64urlエンコーディングを使用してエンコードされています。このプロパティは定義されていない場合があります。</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
AddCredentialまたは`navigator.credentials.create()`を使用して保存されたかどうかに関係なく、仮想認証器に保存されているすべての公開鍵資格情報ソースごとに1つの資格情報パラメータオブジェクトを返します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials)を参照してください。

##### 使用法

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** 資格情報の配列を返します。


---

## removeAllCredentials
仮想認証器に保存されているすべての公開鍵資格情報ソースを削除します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials)を参照してください。

##### 使用法

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
仮想認証器に保存されている公開鍵資格情報ソースを削除します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential)を参照してください。

##### 使用法

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>資格情報のID</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Set User Verified拡張コマンドは、仮想認証器上のisUserVerifiedプロパティを設定します。<br /><br />WebDriverプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified)を参照してください。

##### 使用法

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>認証器のID</td>
    </tr>
  </tbody>
</table>


