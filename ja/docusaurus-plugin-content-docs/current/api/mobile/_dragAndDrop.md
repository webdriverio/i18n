---
id: dragAndDrop
title: ドラッグアンドドロップ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

アイテムを目的の要素または位置にドラッグします。

:::info

このコマンドの機能は、アプリでのドラッグアンドドロップの実装方法に大きく依存します。
問題が発生した場合は、[#4134](https://github.com/webdriverio/webdriverio/issues/4134)に例を投稿してください。

また、ドラッグする要素とドロップする対象の両方が画面上に表示されていることを確認してください。

このコマンドは、以下の最新コンポーネントでのみ動作します：
 - Appiumサーバー（バージョン2.0.0以上）
 - `appium-uiautomator2-driver`（Android向け）
 - `appium-xcuitest-driver`（iOS向け）

互換性の問題を避けるため、ローカルまたはクラウドベースのAppium環境を定期的に更新してください。

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
      <td>目的の要素またはxとyプロパティを持つオブジェクト</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDropコマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">任意</span></td>
      <td>`Number`</td>
      <td>ドラッグ操作の所要時間</td>
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