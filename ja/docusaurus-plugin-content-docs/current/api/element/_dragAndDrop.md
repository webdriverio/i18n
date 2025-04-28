---
id: dragAndDrop
title: ドラッグアンドドロップ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

アイテムを目標要素または位置にドラッグします。

:::info

このコマンドの機能は、アプリケーションでのドラッグアンドドロップの実装方法に大きく依存しています。問題が発生した場合は、[#4134](https://github.com/webdriverio/webdriverio/issues/4134)に例を投稿してください。

:::

##### 使用法

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>目標要素またはxとyプロパティを持つオブジェクト</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDropコマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>ドラッグにかかる時間</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```