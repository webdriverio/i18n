---
id: zoom
title: ズーム
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

画面上の指定された要素にズームジェスチャーを実行します。

:::info

ズームはネイティブモバイルジェスチャーに基づいて実行されます。以下のドライバーでのみサポートされています：
- Androidの場合は[appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture)
- iOSの場合は[appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

このコマンドは以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android用）
 - `appium-xcuitest-driver`（iOS用）

互換性の問題を避けるため、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

:::

##### 使用方法

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>ズームオプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>ズームを実行する速度をミリ秒単位で指定します。最小値は500ms、最大値は10000msです。デフォルトは1500ms（1.5秒）です（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>画面に対してどれだけ大きくズームするかのスケール。有効な値は0〜1の範囲の浮動小数点数で、1.0は100%を意味します（オプション）</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```