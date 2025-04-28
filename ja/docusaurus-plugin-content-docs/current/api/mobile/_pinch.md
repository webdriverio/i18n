---
id: pinch
title: ピンチ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

画面上の指定された要素でピンチジェスチャーを実行します。

:::info

ピンチはネイティブモバイルジェスチャーに基づいて行われます。次のドライバーのみでサポートされています：
- Androidの場合は[appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture)
- iOSの場合は[appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

このコマンドは、以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるために、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

:::

##### 使用法

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>ピンチオプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ピンチを実行する速さのミリ秒単位の時間。最小は500 ms、最大は10000 msです。デフォルトは1500 ms（1.5秒）です（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>画面に対してピンチの大きさを表すスケール。有効な値は0..1の範囲の浮動小数点数であり、1.0は100%です（オプション）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```