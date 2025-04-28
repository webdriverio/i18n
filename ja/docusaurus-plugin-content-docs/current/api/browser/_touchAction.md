---
id: touchAction
title: touchAction（タッチアクション）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution 非推奨の警告

`touchAction`コマンドは__非推奨__であり、将来のバージョンで削除される予定です。
代わりに、ポインタータイプ`touch`を使用した[`action`](/docs/api/browser/action)コマンドを使用することをお勧めします：

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action APIは、Appiumで自動化できるすべてのジェスチャーの基礎を提供します。
現在、ネイティブアプリケーションでのみ利用可能であり、ウェブアプリとの対話には使用できません。
その核心は、アドホックな個々のアクションを連鎖させる能力にあり、これらはデバイス上のアプリケーション内の要素に適用されます。使用できる基本的なアクションは次のとおりです：

- press（要素または（`x`、`y`）またはその両方を渡す）
- longPress（要素または（`x`、`y`）またはその両方を渡す）
- tap（要素または（`x`、`y`）またはその両方を渡す）
- moveTo（絶対的な`x`、`y`座標を渡す）
- wait（`ms`（ミリ秒単位）を渡す）
- release（引数なし）

##### 使用法

```js
browser.touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>実行するアクション</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```