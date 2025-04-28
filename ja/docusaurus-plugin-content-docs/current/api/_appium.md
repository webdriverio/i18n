---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)で確認できます。

##### 使用法

```js
driver.getAppiumContext()
```


##### 戻り値

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** 現在のコンテキストを表す文字列、または「コンテキストなし」を表すnull


---

## switchAppiumContext
Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)で確認できます。

##### 使用法

```js
driver.switchAppiumContext(name)
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
      <td>string</td>
      <td>利用可能なコンテキストを表す文字列</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)で確認できます。

##### 使用法

```js
driver.getAppiumContexts()
```


##### 戻り値

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** 利用可能なコンテキストを表す文字列の配列（例：'WEBVIEW'、'NATIVE'）


---

## shake
デバイスでシェイクアクションを実行します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/)で確認できます。

##### 使用法

```js
driver.shake()
```




##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
デバイスをロックします。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/)で確認できます。

##### 使用法

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>画面をロックする時間（iOSのみ）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
デバイスのロックを解除します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/)で確認できます。

##### 使用法

```js
driver.unlock()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
デバイスがロックされているかどうかを確認します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/)で確認できます。

##### 使用法

```js
driver.isLocked()
```


##### 戻り値

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** デバイスがロックされている場合はtrue、そうでない場合はfalse

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
画面の録画を開始します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/)で確認できます。

##### 使用法

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>remotePath、username、password、method、forceRestart、timeLimit、videoType、videoQuality、videoFps、bitRate、videoSize、bugReportなどのキーを含むコマンドパラメータ（詳細はAppiumのドキュメントを参照）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
画面の録画を停止します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/)で確認できます。

##### 使用法

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>結果のビデオをアップロードするリモートロケーションへのパス。http/https、ftpプロトコルがサポートされています。このオプションは、画面録画プロセスが進行中でforceRestartパラメータがtrueに設定されていない場合にのみ効果があります。nullまたは空の文字列値（デフォルト設定）は、結果ファイルの内容がBase64としてエンコードされることを意味します。</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>リモート認証のためのユーザー名。</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>リモート認証のためのパスワード。</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>httpマルチパートアップロードメソッド名。デフォルトでは'PUT'が使用されます。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64エンコードされた文字列。remote_pathが設定されている場合、レスポンスは空の文字列

##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
CPUやメモリ、ネットワークトラフィック、バッテリーなどのシステム状態情報タイプを返します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/)で確認できます。

##### 使用法

```js
driver.getPerformanceDataTypes()
```


##### 戻り値

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** 利用可能なパフォーマンスデータタイプ（cpuinfo|batteryinfo|networkinfo|memoryinfo）

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
CPUやメモリ、ネットワークトラフィック、バッテリーなどの読み取りサポートされているシステム状態の情報を返します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/)で確認できます。

##### 使用法

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>アプリケーションのパッケージ名</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>読み取りたいシステム状態のタイプ。サポートされているパフォーマンスデータタイプの一つである必要があります</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>読み取りを試みる回数</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** CPU、メモリ、ネットワークトラフィック、バッテリーなどの読み取りがサポートされているシステム状態の情報タイプ

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
デバイス上の特定のキーを押します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/)で確認できます。

##### 使用法

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>押すキーコード</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>キーコードを押す際のメタ状態</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>キー押下のフラグ</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
デバイス上の特定のキーコードを長押しします。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/)で確認できます。

##### 使用法

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>デバイス上で押すキーコード</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>キー押下のメタ状態</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>キー押下のフラグ</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
デバイスにキーコードを送信します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)で確認できます。

##### 使用法

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>押すキーコード</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>キーコードを押す際のメタ状態</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
デバイスを3次元で回転させます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation)で確認できます。

##### 使用法

```js
driver.rotateDevice(x, y, z)
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
      <td>回転ジェスチャーの中心に使用するxオフセット</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>回転ジェスチャーの中心に使用するyオフセット</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>回転ジェスチャーの中心に使用するzオフセット</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
現在のAndroidアクティビティの名前を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/)で確認できます。

##### 使用法

```js
driver.getCurrentActivity()
```


##### 戻り値

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** 現在のアクティビティの名前

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
現在のAndroidパッケージの名前を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/)で確認できます。

##### 使用法

```js
driver.getCurrentPackage()
```


##### 戻り値

- **&lt;string&gt;**
            **<code><var>package</var></code>:** 現在のパッケージの名前

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
指定されたアプリをデバイスにインストールします。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/)で確認できます。

##### 使用法

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>アプリケーションの.apkファイルへのパス</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
指定されたアプリをデバイス上でアクティブにします<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/)で確認できます。

##### 使用法

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>アプリID（AndroidのパッケージID、iOSのバンドルID）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
デバイスからアプリを削除します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/)で確認できます。

##### 使用法

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>アプリID（AndroidのパッケージID、iOSのバンドルID）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
デバイス上の指定されたアプリを終了します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/)で確認できます。

##### 使用法

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>アプリID（AndroidのパッケージID、iOSのバンドルID）</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>コマンドオプション。例えば「timeout」：（Androidのみ）アプリの終了を再試行するタイムアウト（Appiumドキュメントで詳細を参照）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
指定されたアプリがデバイスにインストールされているかどうかを確認します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/)で確認できます。

##### 使用法

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>アプリID（AndroidのパッケージID、iOSのバンドルID）</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** インストールされている場合はtrue、そうでない場合はfalseを返します

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
デバイス上の指定されたアプリの状態を取得します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/)で確認できます。

##### 使用法

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>アプリID（AndroidのパッケージID、iOSのバンドルID）</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0はインストールされていない。1は実行されていない。2はバックグラウンドで実行中または一時停止中。3はバックグラウンドで実行中。4はフォアグラウンドで実行中

##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
ソフトキーボードを非表示にします。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/)で確認できます。

##### 使用法

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>キーボード非表示の戦略（UIAutomationのみ）、利用可能な戦略 - 'press'、'pressKey'、'swipeDown'、'tapOut'、'tapOutside'、'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>戦略が'pressKey'の場合のキー値</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>戦略が'pressKey'の場合のキーコード</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>戦略が'pressKey'の場合のキー名</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
ソフトキーボードが表示されているかどうか。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/)で確認できます。

##### 使用法

```js
driver.isKeyboardShown()
```


##### 戻り値

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** キーボードが表示されている場合はtrue

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
ファイルをデバイスの特定の場所に配置します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/)で確認できます。

##### 使用法

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>データをインストールするパス</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>base64形式のファイル内容</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
デバイスのファイルシステムからファイルを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/)で確認できます。

##### 使用法

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ファイルを取得するデバイス上のパス</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>response</var></code>:** base64形式のファイル内容

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
デバイスのファイルシステムからフォルダを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/)で確認できます。

##### 使用法

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>デバイス上のフォルダ全体へのパス</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
デバイスの機内モードを切り替えます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/)で確認できます。

##### 使用法

```js
driver.toggleAirplaneMode()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
データサービスの状態を切り替えます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/)で確認できます。

##### 使用法

```js
driver.toggleData()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
WiFiサービスの状態を切り替えます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/)で確認できます。

##### 使用法

```js
driver.toggleWiFi()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
位置情報サービスの状態を切り替えます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/)で確認できます。

##### 使用法

```js
driver.toggleLocationServices()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
ネットワーク速度を設定します（エミュレータのみ）<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/)で確認できます。

##### 使用法

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>ネットワークタイプ - 'full'、'gsm'、'edge'、'hscsd'、'gprs'、'umts'、'hsdpa'、'lte'、'evdo'</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Android通知を開きます（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/)で確認できます。

##### 使用法

```js
driver.openNotifications()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
パッケージ名とアクティビティ名を指定してAndroidアクティビティを開始します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/)で確認できます。

##### 使用法

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>アプリの名前</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>アクティビティの名前</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>待機するアプリの名前</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>待機するアクティビティの名前</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>アクティビティを開始するために使用されるインテントアクション</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>アクティビティを開始するために使用されるインテントカテゴリ</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>アクティビティを開始するために使用されるフラグ</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>アクティビティを開始するために使用される追加のインテント引数</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>adbを使用してアプリを開始する前に、テスト対象のアプリのプロセスを停止しない</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
ステータスバーとナビゲーションバーの可視性と境界情報を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/)で確認できます。

##### 使用法

```js
driver.getSystemBars()
```


##### 戻り値

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** ステータスバーとナビゲーションバーの可視性と境界に関する情報

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
デバイスの時刻を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/)で確認できます。

##### 使用法

```js
driver.getDeviceTime()
```


##### 戻り値

- **&lt;string&gt;**
            **<code><var>time</var></code>:** デバイス上の時刻

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
デバイスのディスプレイ密度を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)で確認できます。

##### 使用法

```js
driver.getDisplayDensity()
```


##### 戻り値

- **&lt;*&gt;**


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
[Touch ID](https://support.apple.com/en-ca/ht201371)イベントをシミュレートします（iOSシミュレータのみ）。この機能を有効にするには、`allowTouchIdEnroll`の希望ケイパビリティをtrueに設定し、シミュレータを[登録](https://support.apple.com/en-ca/ht201371)する必要があります。allowTouchIdEnrollをtrueに設定すると、デフォルトでシミュレータが登録されるように設定されます。登録状態は[切り替え](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html)できます。このコールは、Appiumプロセスまたはその親アプリケーション（例：Terminal.app、Appium.app）がシステム環境設定 > セキュリティとプライバシー > プライバシー > アクセシビリティリストでMac OSのアクセシビリティにアクセスできる場合にのみ機能します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/)で確認できます。

##### 使用法

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>成功したタッチ（true）または失敗したタッチ（false）をシミュレートしているか</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
シミュレータがTouch IDを受け入れるように[登録](https://support.apple.com/en-ca/ht201371)されているかどうかを切り替えます（iOSシミュレータのみ）。この機能を有効にするには、`allowTouchIdEnroll`の希望ケイパビリティをtrueに設定する必要があります。`allowTouchIdEnroll`がtrueに設定されている場合、シミュレータはデフォルトで登録され、「Touch ID登録の切り替え」が登録状態を変更します。このコールは、Appiumプロセスまたはその親アプリケーション（例：Terminal.app、Appium.app）がシステム環境設定 > セキュリティとプライバシー > プライバシー > アクセシビリティリストでMac OSのアクセシビリティにアクセスできる場合にのみ機能します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/)で確認できます。

##### 使用法

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>TouchID登録を有効にする場合はtrue</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
デバイス上でアプリを起動します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/)で確認できます。
:::caution

このプロトコルコマンドは非推奨です<br />iOSでは `driver.execute('mobile: launchApp', { ... })`、Androidでは `driver.execute('mobile: activateApp', { ... })` を使用してください。
:::

##### 使用法

```js
driver.launchApp()
```




##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
デバイス上のアプリを閉じます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/)で確認できます。
:::caution

このプロトコルコマンドは非推奨です<br />代わりに `driver.execute('mobile: terminateApp', { ... })` を使用してください
:::

##### 使用法

```js
driver.closeApp()
```




##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
このセッションで現在実行中のアプリをバックグラウンドに送ります。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/)で確認できます。
:::caution

このプロトコルコマンドは非推奨です<br />代わりに `driver.execute('mobile: backgroundApp', { ... })` を使用してください
:::

##### 使用法

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>アプリを復元するタイムアウト、'null'の場合はアプリは復元されません</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
テストカバレッジデータを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/)で確認できます。

##### 使用法

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>ブロードキャストするインテント</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>.ecファイルへのパス</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
アプリの文字列を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/)で確認できます。

##### 使用法

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>言語コード</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>文字列ファイルへのパス</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** 指定された言語と文字列ファイル名に対するアプリからのすべての定義された文字列

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)で確認できます。

##### 使用法

```js
driver.setValueImmediate(elementId, text)
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
      <td>以前のFind Element(s)呼び出しで返されたエレメントのID</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>エレメントに設定するテキスト</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
エレメントの値を直接置き換えます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)で確認できます。

##### 使用法

```js
driver.replaceValue(elementId, value)
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
      <td>以前のFind Element(s)呼び出しで返されたエレメントのID</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>エレメントに置き換える値</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
デバイスの現在の設定を取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/)で確認できます。

##### 使用法

```js
driver.getSettings()
```


##### 戻り値

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** 現在指定されているすべての設定のJSONハッシュ、Settings APIを参照

##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
デバイスの現在の設定を更新します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/)で確認できます。

##### 使用法

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>更新する設定のキー/値オブジェクト</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
JavaScriptの非同期実行のためのコールバックURL。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)で確認できます。

##### 使用法

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>デバイスで受信するレスポンス</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
GSM通話を行います（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/)で確認できます。

##### 使用法

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>発信する電話番号</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>アクション - 'call'、'accept'、'cancel'、'hold'</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
GSM信号強度を設定します（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/)で確認できます。

##### 使用法

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>信号強度[0, 4]の範囲</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>信号強度[0, 4]の範囲。Appium v1.11.0以下を使用する場合は、このパラメータも同じ値で設定してください（https://github.com/appium/appium/issues/12234を参照）。</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
バッテリーの残量をパーセンテージで設定します（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/)で確認できます。

##### 使用法

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>範囲[0, 100]のパーセンテージ値</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
バッテリー充電器の状態を接続または非接続に設定します（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/)で確認できます。

##### 使用法

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>状態を設定します。onまたはoff</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
GSM音声状態を設定します（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/)で確認できます。

##### 使用法

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>GSM音声の状態 - 'unregistered'、'home'、'roaming'、'searching'、'denied'、'off'、'on'</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
SMSメッセージをシミュレートします（エミュレータのみ）。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/)で確認できます。

##### 使用法

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>SMSを送信する電話番号</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMSメッセージ</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
サポートされているエミュレータで指紋スキャンを使用してユーザーを認証します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/)で確認できます。

##### 使用法

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>Android Keystoreシステムに保存された指紋（1から10）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
システムクリップボードの内容を設定します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/)で確認できます。

##### 使用法

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>実際のbase64エンコードされたクリップボードコンテンツ</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>取得するコンテンツのタイプ。Plaintext、Image、URL。Androidはプレーンテキストのみサポート</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Android用のクリップボードデータラベル</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Appiumサーバーからのレスポンス

##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
システムクリップボードの内容を取得します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/)で確認できます。

##### 使用法

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>取得するコンテンツのタイプ。Plaintext、Image、URL。Androidはプレーンテキストのみサポート</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;string&gt;**
            **<code><var>response</var></code>:** base64エンコードされた文字列としてのクリップボードコンテンツ、またはクリップボードが空の場合は空の文字列

##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
この機能はネイティブコンテキスト内からのみ利用できます。「Touch Perform」は他の単一タッチ操作と同様に機能しますが、これにより複数のタッチアクションを1つのコマンドとして連鎖させることができます。これが役立つのは、Appiumコマンドがネットワーク経由で送信され、コマンド間に遅延があるためです。この遅延により、特定のタッチ操作が不可能になることがあります。例えば、垂直スワイプでは、押し下げ、異なるY座標への移動、そして解除が必要です。それが機能するためには、操作間に遅延があってはいけません。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/)で確認できます。

##### 使用法

```js
driver.touchPerform(actions)
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
      <td>実行するアクションのタイプ（例：moveTo、release、press、tap、wait）</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// パーセンテージによる水平スワイプを行う
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
この機能はネイティブコンテキスト内からのみ利用できます。マルチタッチアクションシーケンスを実行します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/)で確認できます。

##### 使用法

```js
driver.multiTouchPerform(actions)
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
      <td>実行するアクションのタイプ（例：moveTo、release、press、tap、wait）</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
このコマンドを使用すると、WebdriverIOスクリプトを文字列として指定し、Appiumサーバーに送信してサーバー自体でローカル実行することができます。このアプローチは、各コマンドに関連する潜在的な遅延を最小限に抑えるのに役立ちます。***Appium 2.0でこのコマンドを使用するには、[`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)プラグインをインストールする必要があります。***<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md)で確認できます。

##### 使用法

```js
driver.executeDriverScript(script, type, timeout)
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
      <td>実行するスクリプト。現在のサーバーに接続されたWebdriverIOセッションを表す'driver'オブジェクトにアクセスできます。</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>スクリプトで使用される言語/フレームワーク。現在、'webdriverio'のみがサポートされており、これがデフォルトです。</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>スクリプトがAppiumサーバーによって終了されるまでに許可されるミリ秒数。デフォルトは1時間に相当する値です。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>result</var></code>:** 2つのフィールドを含むオブジェクト：'result'（スクリプト自体の戻り値）と'logs'（3つの内部フィールド'log'、'warn'、'error'を含み、それぞれスクリプト実行中のconsole.log、console.warn、console.errorによってログに記録された文字列の配列を保持）。


---

## getEvents
Appiumサーバーに保存されたイベントを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md)で確認できます。

##### 使用法

```js
driver.getEvents(type)
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
      <td>string[]</td>
      <td>タイプが提供されている場合、タイプでフィルタリングされたイベントを取得します。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>result</var></code>:** `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`のようなイベントのJSONハッシュ。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
カスタムイベントを保存します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md)で確認できます。

##### 使用法

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>ベンダーの名前。`vendor:event`の`vendor`になります。</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>イベントの名前。`vendor:event`の`event`になります。</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
この機能は、OpenCVフレームワークの機能を利用して画像比較を行います。この機能を動作させるには、OpenCVフレームワークとopencv4nodejsモジュールの両方がAppiumサーバーが動作しているマシンにインストールされている必要があります。***さらに、Appium 2.0でこの機能を使用するには、[`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin)プラグインをインストールする必要があります。***<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/)で確認できます。

##### 使用法

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>可能な比較モードの一つ：'matchFeatures'、'getSimilarity'、'matchTemplate'。デフォルトは'matchFeatures'です。</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>画像データ。OpenCVライブラリ自体が受け入れるすべての画像形式がサポートされています。</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>画像データ。OpenCVライブラリ自体が受け入れるすべての画像形式がサポートされています。</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>この辞書の内容は実際の`mode`値に依存します。詳細については`appium-support`モジュールのドキュメントを参照してください。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>result</var></code>:** 結果の辞書の内容は、実際の`mode`と`options`の値に依存します。詳細については`appium-support`モジュールのドキュメントを参照してください。


---

## implicitWait
ドライバーがエレメントを検索する際に待機する時間を設定します。単一のエレメントを検索する場合、ドライバーはエレメントが見つかるかタイムアウトが切れるまでページをポーリングする必要があります。複数のエレメントを検索する場合、ドライバーは少なくとも1つのエレメントが見つかるかタイムアウトが切れるまでページをポーリングし、その時点で空のリストを返す必要があります。このコマンドが送信されない場合、ドライバーはデフォルトで0msの暗黙的な待機を使用する必要があります。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>エレメントを待機するミリ秒単位の時間。</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
エレメントがビューにスクロールされた後の画面上の位置を決定します。<br /><br />__注意:__ これは内部コマンドと見なされ、ネイティブイベントを正しく生成するためにエレメントの位置を決定する目的でのみ使用する必要があります。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getLocationInView(elementId)
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
      <td>コマンドをルーティングするエレメントのID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** ページ上のエレメントのX座標とY座標。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
アクティブなエレメントにキーストロークのシーケンスを送信します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>入力するキーのシーケンス。配列を提供する必要があります。</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
マシン上で利用可能なすべてのエンジンをリストします。エンジンを使用するには、このリストに存在する必要があります。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.availableIMEEngines()
```


##### 戻り値

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** 利用可能なエンジンのリスト

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
アクティブなIMEエンジンの名前を取得します。名前文字列はプラットフォーム固有です。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getActiveIMEEngine()
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** アクティブなIMEエンジンの名前

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
現在IME入力がアクティブかどうかを示します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.isIMEActivated()
```


##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** IME入力が利用可能で現在アクティブな場合はtrue、そうでない場合はfalse

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
現在アクティブなIMEエンジンを非アクティブ化します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.deactivateIMEEngine()
```




##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
利用可能なエンジンを有効にします<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>アクティブ化するエンジンの名前</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
`/session/:sessionId/execute_async`によって実行される非同期スクリプトが中断され、クライアントに`Timeout`エラーが返されるまでに実行を許可される時間をミリ秒単位で設定します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>時間制限のあるコマンドが実行を許可されるミリ秒単位の時間</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
フォームエレメントを送信します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.submit(elementId)
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
      <td>送信するフォームエレメントのID</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
エレメントのサイズをピクセル単位で決定します。サイズはJSONオブジェクトとして`width`と`height`プロパティとともに返されます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getElementSize(elementId)
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
      <td>コマンドをルーティングするエレメントのID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** エレメントの幅と高さ（ピクセル単位）。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
ページ上のエレメントの位置を決定します。ポイント`(0, 0)`はページの左上隅を参照します。エレメントの座標は`x`と`y`プロパティを持つJSONオブジェクトとして返されます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getElementLocation(elementId)
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
      <td>コマンドをルーティングするエレメントのID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** ページ上のエレメントのX座標とY座標。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
タッチ対応デバイスでのシングルタップ。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>シングルタップするエレメントのID。</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
画面上で指を下げる。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchDown(x, y)
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
      <td>画面上のx座標</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>画面上のy座標</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
画面上で指を上げる。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchUp(x, y)
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
      <td>画面上のx座標</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>画面上のy座標</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
画面上で指を動かす。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchMove(x, y)
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
      <td>画面上のx座標</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>画面上のy座標</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
指の動きイベントを使ってタッチスクリーンを長押しします。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>長押しするエレメントのID</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
指の動きイベントを使ってタッチスクリーンをフリックします。このフリックコマンドは特定の画面位置から開始します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>フリックするピクセル単位のxオフセット</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>フリックするピクセル単位のyオフセット</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>フリックが開始されるエレメントのID</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>秒あたりのピクセル単位の速度</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>秒あたりのピクセル単位のx速度</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>秒あたりのピクセル単位のy速度</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
現在のデバイスの向きを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getOrientation()
```


##### 戻り値

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** ScreenOrientationで定義された値に対応する現在の向き：`LANDSCAPE|PORTRAIT`。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
デバイスの向きを設定します<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>ScreenOrientationで定義された新しいブラウザの向き：`LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
指定されたログタイプのログを取得します。ログバッファは各リクエスト後にリセットされます。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getLogs(type)
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

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
利用可能なログタイプを取得します。<br /><br />Appiumコマンド。詳細は[公式プロトコルドキュメント](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)で確認できます。

##### 使用法

```js
driver.getLogTypes()
```


##### 戻り値

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** 利用可能なログタイプのリスト。

##### サポート

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)