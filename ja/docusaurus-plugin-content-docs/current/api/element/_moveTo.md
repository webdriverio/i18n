---
id: moveTo
title: マウスの移動
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

指定された要素のオフセットだけマウスを移動します。要素が指定されていない場合、
移動は現在のマウスカーソルに対して相対的に行われます。要素が提供されているがオフセットがない場合、
マウスは要素の中央に移動します。要素が表示されていない場合は、
表示されるようにスクロールされます。

##### 使用法

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`MoveToOptions`</td>
      <td>moveToコマンドのオプション</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Number`</td>
      <td>要素の中心に対して相対的に移動するX軸のオフセット。指定されない場合、マウスは要素の中心に移動します。</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Number`</td>
      <td>要素の中心に対して相対的に移動するY軸のオフセット。指定されない場合、マウスは要素の中心に移動します。</td>
    </tr>
  </tbody>
</table>