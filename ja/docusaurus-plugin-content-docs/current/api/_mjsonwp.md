---
id: mjsonwp
title: モバイルJSON Wireプロトコル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints)で確認できます。
:::caution

このプロトコルコマンドは非推奨です<br />Appium 2.0では、このメソッドは非推奨としてマークされており、現在利用可能な代替手段はありません。
:::

##### 使用法

```js
driver.getPageIndex()
```


##### 戻り値

- **&lt;string&gt;**



---

## getNetworkConnection
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)で確認できます。

##### 使用法

```js
driver.getNetworkConnection()
```


##### 戻り値

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/ を参照


---

## setNetworkConnection
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)で確認できます。

##### 使用法

```js
driver.setNetworkConnection(type)
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
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>シリアル化されたときに整数値に変換されるビットマスク</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures)で確認できます。

##### 使用法

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>入力ソースとそれに関連するアクションを表すオブジェクトのリスト</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures)で確認できます。

##### 使用法

```js
driver.multiTouchPerform(actions, elementId)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>入力ソースとそれに関連するアクションを表すオブジェクトのリスト</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>以前のFind Element(s)呼び出しで返された要素のID</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
モバイルJSON Wireプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints)で確認できます。

##### 使用法

```js
driver.receiveAsyncResponse(status, value)
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
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>レスポンスの予想されるステータス</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>レスポンスの予想される値</td>
    </tr>
  </tbody>
</table>