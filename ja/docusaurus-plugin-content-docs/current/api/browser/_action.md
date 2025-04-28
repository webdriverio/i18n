---
id: action
title: action（アクション）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

actionコマンドは、Webブラウザに仮想デバイス入力アクションを提供するための低レベルインターフェースです。

`scrollIntoView`や`doubleClick`などの高レベルコマンドに加えて、Actions APIは指定された入力デバイスが実行できることを細かく制御します。WebdriverIOは3種類の入力ソースのインターフェースを提供しています：

- キーボードデバイス用のキー入力
- マウス、ペン、タッチデバイス用のポインタ入力
- スクロールホイールデバイス用のホイール入力

アクションコマンドのチェーンはすべて、一連のアクションをトリガーするために`perform`を呼び出して完了する必要があります。これにより、アクションが[リリース](https://w3c.github.io/webdriver/#release-actions)され、イベントが発火します。`true`を渡すことでこれをスキップできます（例：`browser.actions(...).perform(true)`）。

:::info

このコマンドと特定のアクションのサポートは環境によって異なる場合があります。開発の進捗状況は[wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned)で確認できます。
モバイルの場合は、[iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)と[Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands)向けのAppium固有のジェスチャーコマンドを使用することをお勧めします。

:::

### キー入力ソース

キー入力ソースは、キーボード型デバイスに関連付けられた入力ソースです。`key`タイプパラメータを使用してトリガーできます。例：

```ts
browser.action('key')
```

これは以下のアクションをサポートする`KeyAction`オブジェクトを返します：

- `down(value: string)`: キーダウンアクションを生成します
- `up(value: string)`: キーアップアクションを生成します
- `pause(ms: number)`: 特定のティック中に入力ソースが何もしないことを示します

#### 特殊文字

`Control`、`Page Up`や`Shift`などの特殊文字を使用したい場合は、`webdriverio`パッケージから[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)オブジェクトをインポートしてください：

```ts
import { Key } from 'webdriverio'
```

このオブジェクトを使用すると、目的の特殊文字のユニコード表現にアクセスできます。

### ポインタ入力ソース

ポインタ入力ソースは、ポインタ型入力デバイスに関連付けられた入力ソースです。タイプは`action`コマンドを呼び出す際に指定できます。例：

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse"がデフォルト値、"pen"または"touch"も可能
})
```

これは以下のアクションをサポートする`PointerAction`オブジェクトを返します：

- `down (button: 'left' | 'middle' | 'right')`: 単一キーを押すアクションを作成します
- `down (params: PointerActionParams)`: 詳細なパラメータを含む単一キーを押すアクションを作成します
- `move (x: number, y: number)`: ビューポートから`x`および`y`ピクセル移動するアクションを作成します
- `move (params: PointerActionMoveParams)`: 指定された`origin`から`x`および`y`ピクセル移動するアクションを作成します。`origin`は、ポインタの現在位置（「pointer」）、ビューポート（「viewport」）、または特定の要素の中心として定義できます。
- `up (button: 'left' | 'middle' | 'right')`: 単一キーを離すアクションを作成します
- `up (params: PointerActionUpParams)`: 詳細なパラメータを含む単一キーを離すアクションを作成します
- `cancel()`: このポインタの現在の入力をキャンセルするアクション。
- `pause(ms: number)`: 特定のティック中に入力ソースが何もしないことを示します

[`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35)、[`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42)および[`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)パラメータ型に関する詳細情報は、プロジェクトの型定義で確認できます。

### ホイール入力ソース

ホイール入力ソースは、ホイール型入力デバイスに関連付けられた入力ソースです。

```ts
browser.action('wheel')
```

これは以下のアクションをサポートする`WheelAction`オブジェクトを返します：

- `scroll (params: ScrollParams)`: 指定された座標または原点にページをスクロールします
- `pause(ms: number)`: 特定のティック中に入力ソースが何もしないことを示します

[`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29)パラメータ型に関する詳細情報は、プロジェクトの型定義で確認できます。

##### 使用方法

```js
browser.action()
```

##### 例

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```