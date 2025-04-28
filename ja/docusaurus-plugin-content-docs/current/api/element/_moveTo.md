---
id: moveTo
title: マウスの移動
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

指定された要素を基準にマウスをオフセット分移動します。要素が指定されていない場合、
移動は現在のマウスカーソルを基準にします。要素が提供されていてもオフセットがない場合、
マウスは要素の中央に移動します。要素が表示されていない場合は、
表示されるようにスクロールされます。

##### 使用方法

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td>`MoveToOptions`</td>
      <td>moveToコマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>要素の中心からの相対的なX軸のオフセット。指定されていない場合、マウスは要素の中心に移動します。</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>要素の中心からの相対的なY軸のオフセット。指定されていない場合、マウスは要素の中心に移動します。</td>
    </tr>
  </tbody>
</table>