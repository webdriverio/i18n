---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
シンプルなダイアログが現在開いているかどうか。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49)で確認できます。

##### 使用法

```js
browser.isAlertOpen()
```

##### 例


```js
console.log(browser.isAlertOpen()); // 出力: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // 出力: true
```


##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** シンプルなダイアログが存在するかどうかに基づいて`true`または`false`を返します。


---

## isAutoReporting
ブラウザログのエラーを自動的に発生させるかどうか。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://codereview.chromium.org/101203012)で確認できます。

##### 使用法

```js
browser.isAutoReporting()
```


##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** 自動レポートが有効かどうかに基づいて`true`または`false`を返します。


---

## setAutoReporting
以降のすべてのコマンドに対して、最初のブラウザエラー（例：403/404レスポンスによるリソースのロード失敗）を含む不明なエラーを返すかどうかを切り替えます（一度有効にすると）。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://codereview.chromium.org/101203012)で確認できます。

##### 使用法

```js
browser.setAutoReporting(enabled)
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
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>自動レポートを有効にする場合は`true`、以前に有効にした自動レポートを無効にする場合は`false`を使用します。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// セッション開始後に空のブラウザログで最初に自動レポートを有効にする
console.log(browser.setAutoReporting(true)); // 出力: null
// 存在しないリソースをリクエストすると、不明なエラーのために実行が中止されます
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// セッション中にブラウザログを生成する操作を行う
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// 最初のブラウザログ（404レスポンス）に対して不明なエラーをスローする自動レポートを有効にする
browser.setAutoReporting(true);
```


##### 戻り値

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** このコマンドを実行する前に最初のブラウザエラーが既に発生していた場合、最初のブラウザエラーを説明する「message」キーを持つオブジェクトとして不明なエラーをスローします。それ以外の場合は成功すると`null`を返します。


---

## isLoading
アクティブなウィンドウハンドルの読み込み状態を判断します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802)で確認できます。

##### 使用法

```js
browser.isLoading()
```

##### 例


```js
console.log(browser.isLoading()); // 出力: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // 出力: true
```


##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** アクティブなウィンドウハンドルが読み込み中かどうかに基づいて`true`または`false`を返します。


---

## takeHeapSnapshot
現在の実行コンテキストのヒープスナップショットを取得します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202)で確認できます。

##### 使用法

```js
browser.takeHeapSnapshot()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** ヒープスナップショットのJSON表現。Chrome DevToolsにファイルとして読み込むことで検査できます。


---

## getNetworkConnection
ネットワークエミュレーションの接続タイプを取得します。このコマンドは、リモートエンドが`networkConnectionEnabled`機能を`true`に設定している場合にのみ適用されます。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)で確認できます。

##### 使用法

```js
browser.getNetworkConnection()
```

##### 例


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // ネットワークエミュレーションにはデバイスモードが必要で、モバイルエミュレーションがオンの場合にのみ有効です
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // 出力: 6（Wi-FiとデータWeb共）
```


##### 戻り値

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** ネットワーク接続タイプを表すビットマスク。機内モード（`1`）、Wi-Fiのみ（`2`）、Wi-Fiとデータ（`6`）、4G（`8`）、3G（`10`）、2G（`20`）。デフォルトでは[Wi-Fiとデータが有効](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37)になっています。


---

## setNetworkConnection
ネットワーク接続の接続タイプを変更します。このコマンドは、リモートエンドが`networkConnectionEnabled`機能を`true`に設定している場合にのみ適用されます。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)で確認できます。

##### 使用法

```js
browser.setNetworkConnection(parameters)
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
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>ConnectionTypeを含むオブジェクト、オブジェクトの`type`キーの値としてビットマスクを設定します。機内モード（`1`）、Wi-Fiのみ（`2`）、Wi-Fiとデータ（`6`）、4G（`8`）、3G（`10`）、2G（`20`）。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // ネットワークエミュレーションにはデバイスモードが必要で、モバイルエミュレーションがオンの場合にのみ有効です
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // 出力: 1（機内モード）
```


##### 戻り値

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** ネットワーク接続タイプを表すビットマスク。値はオブジェクトで指定された`type`と一致するはずですが、デバイスがリクエストされたネットワーク接続タイプをサポートしていない場合があります。


---

## getNetworkConditions
エミュレーションに使用されている現在のネットワーク条件を取得します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859)で確認できます。

##### 使用法

```js
browser.getNetworkConditions()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** `offline`、`latency`、`download_throughput`、`upload_throughput`のネットワーク条件を含むオブジェクト。ネットワーク条件は取得する前に設定する必要があります。


---

## setNetworkConditions
接続をスロットリングすることでエミュレーションに使用するネットワーク条件を設定します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722)で確認できます。

##### 使用法

```js
browser.setNetworkConditions(network_conditions, network_name)
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
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>`latency`、`throughput`（または`download_throughput`/`upload_throughput`）および`offline`（オプション）を含むネットワーク条件を含むオブジェクト。</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string</td>
      <td>[ネットワークスロットリングプリセット](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25)の名前。`GPRS`、`Regular 2G`、`Good 2G`、`Regular 3G`、`Good 3G`、`Regular 4G`、`DSL`、`WiFi`、または無効にするための`No throttling`。プリセットが指定されている場合、最初の引数で渡された値は尊重されません。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// スロットリングのために異なるダウンロード（25kb/s）とアップロード（50kb/s）のスループット値を1000msのレイテンシで使用
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// 'offline'をtrueに設定してネットワークから強制的に切断
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// プリセット名（例：'DSL'）が指定されている場合、オブジェクト内の値（例：'offline'）は尊重されません
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// ネットワークスロットリングプリセットを指定するためのベストプラクティスは空のオブジェクトを使用すること
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
設定されているネットワークスロットリングを無効にします。`No throttling`プリセットを設定するのと同等です。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745)で確認できます。

##### 使用法

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
DevToolsデバッガーにコマンドを送信します。<br />利用可能なコマンドとそのパラメータのリストについては、[Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)を参照してください。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304)で確認できます。

##### 使用法

```js
browser.sendCommand(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>コマンドの名前（例：[`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)）。</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>コマンドへのパラメータ。コマンドにパラメータがない場合は、空のオブジェクトを指定します。</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
DevToolsデバッガーにコマンドを送信し、結果を待ちます。<br />利用可能なコマンドとそのパラメータのリストについては、[Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)を参照してください。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320)で確認できます。

##### 使用法

```js
browser.sendCommandAndGetResult(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>結果を返すコマンドの名前（例：[`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)）。</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>コマンドへのパラメータ。コマンドにパラメータがない場合は、空のオブジェクトを指定します。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;*&gt;**
            **<code><var>result</var></code>:** コマンドの戻り値、またはコマンドの失敗理由であるエラーのいずれか。


---

## file
ブラウザが実行されているリモートマシンにファイルをアップロードします。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065)で確認できます。

##### 使用法

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>アップロードする単一のファイルを含むBase64エンコードされたZIPアーカイブ。Base64エンコードされたデータがZIPアーカイブを表していない場合や、アーカイブに複数のファイルが含まれている場合は、不明なエラーがスローされます。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;String&gt;**
            **<code><var>path</var></code>:** リモートマシン上のアップロードされたファイルの絶対パス。


---

## launchChromeApp
指定されたIDでChromeアプリを起動します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539)で確認できます。

##### 使用法

```js
browser.launchChromeApp(id)
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
      <td>string</td>
      <td>chrome://extensionsで定義されている、起動するアプリの拡張機能ID。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // 起動するためにブラウザ起動時にインストール
            extensions: [
              // エントリはBase64エンコードされたパッケージ化されたChromeアプリ（.crx）である必要があります
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google ドキュメント (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
指定されたフォームコントロール要素の値を取得します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443)で確認できます。

##### 使用法

```js
browser.getElementValue(elementId)
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
      <td>値を取得する要素のID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** 要素の現在の値。指定された要素がフォームコントロール要素でない場合は、`null`を返します。


---

## elementHover
要素のホバー状態を有効にします。これは次のインタラクションでリセットされます。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146)で確認できます。

##### 使用法

```js
browser.elementHover(elementId)
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
      <td>ホバーする要素のID</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
ピンチズーム効果をトリガーします。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827)で確認できます。

##### 使用法

```js
browser.touchPinch(x, y, scale)
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
      <td>number</td>
      <td>ピンチするx位置</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>ピンチするy位置</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>ピンチズームのスケール</td>
    </tr>
  </tbody>
</table>



---

## freeze
現在のページをフリーズします。[Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)の拡張機能です。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633)で確認できます。

##### 使用法

```js
browser.freeze()
```



---

## resume
現在のページを再開します。[Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)の拡張機能です。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645)で確認できます。

##### 使用法

```js
browser.resume()
```



---

## getCastSinks
Chromeメディアルーターで利用可能なキャストシンク（Castデバイス）のリストを返します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748)で確認できます。

##### 使用法

```js
browser.getCastSinks()
```


##### 戻り値

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** 利用可能なシンクのリスト。


---

## selectCastSink
キャストシンク（Castデバイス）をメディアルーターのインテント（接続または再生）の受信者として選択します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737)で確認できます。

##### 使用法

```js
browser.selectCastSink(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>ターゲットデバイスの名前。</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
指定されたデバイスで現在のブラウザタブのタブミラーリングを開始します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741)で確認できます。

##### 使用法

```js
browser.startCastTabMirroring(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>ターゲットデバイスの名前。</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Castセッションで問題がある場合にエラーメッセージを返します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751)で確認できます。

##### 使用法

```js
browser.getCastIssueMessage()
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>message</var></code>:** エラーメッセージ（存在する場合）。


---

## stopCasting
メディアルーターから指定されたデバイスへのキャストを停止します（接続されている場合）。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744)で確認できます。

##### 使用法

```js
browser.stopCasting(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>ターゲットデバイスの名前。</td>
    </tr>
  </tbody>
</table>



---

## shutdown
ChromeDriverプロセスをシャットダウンし、結果としてすべてのアクティブなセッションを終了します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498)で確認できます。

##### 使用法

```js
browser.shutdown()
```



---

## takeElementScreenshot
要素のスクリーンショットコマンドは、要素の境界矩形に含まれる可視領域のスクリーンショットを撮影します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://w3c.github.io/webdriver/#dfn-take-element-screenshot)で確認できます。

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
      <td>要素を表示するためにスクロールする。デフォルト：true</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** 表示エリアにスクロールした後の要素の境界矩形の可視領域のスクリーンショットを構成するBase64エンコードされたPNG画像データ。


---

## getLogTypes
利用可能なログタイプを取得します。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes)で確認できます。

##### 使用法

```js
browser.getLogTypes()
```


##### 戻り値

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** 利用可能なログタイプのリスト、例：browser、driver。


---

## getLogs
指定されたログタイプのログを取得します。ログバッファはリクエストごとにリセットされます。<br /><br />非公式かつ未文書化のChromiumコマンドです。このコマンドについての詳細は[こちら](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog)で確認できます。

##### 使用法

```js
browser.getLogs(type)
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
      <td>ログタイプ</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** ログエントリのリスト。
