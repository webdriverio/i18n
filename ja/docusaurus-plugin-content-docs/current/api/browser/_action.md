---
id: action
title: アクション
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

action コマンドは、Webブラウザに仮想化されたデバイス入力アクションを提供するための低レベルインターフェースです。

`scrollIntoView`、`doubleClick` などの高レベルコマンドに加えて、Actions APIは指定された入力デバイスが実行できることを細かく制御できます。WebdriverIOは3種類の入力ソースのインターフェースを提供しています：

- キーボードデバイス用のキー入力
- マウス、ペンまたはタッチデバイス用のポインター入力
- スクロールホイールデバイス用のホイール入力

アクションコマンドのチェーンはすべて、`perform` を呼び出して一連のアクションをトリガーする必要があります。これにより、アクションが[解放され](https://w3c.github.io/webdriver/#release-actions)、イベントが発生します。`true`を渡すことでこれをスキップできます（例：`browser.actions(...).perform(true)`）。

:::info

このコマンドと特定のアクションのサポートは環境によって異なる場合があります。開発の進行状況は[wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned)で確認できます。
モバイルの場合は、[iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)および[Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands)向けのAppium固有のジェスチャーコマンドを使用することをお勧めします。

:::

### キー入力ソース

キー入力ソースは、キーボード型デバイスに関連付けられた入力ソースです。`key`タイプパラメータを使用してトリガーできます。例：

```ts
browser.action('key')
```

これにより、以下のアクションをサポートする`KeyAction`オブジェクトが返されます：

- `down(value: string)`: キーダウンアクションを生成します
- `up(value: string)`: キーアップアクションを生成します
- `pause(ms: number)`: 特定のティックの間、入力ソースが何もしないことを示します

#### 特殊文字

`Control`、`Page Up`または`Shift`などの特殊文字を使用したい場合は、`webdriverio`パッケージから[`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)オブジェクトをインポートしてください：

```ts
import { Key } from 'webdriverio'
```

このオブジェクトを使用すると、目的の特殊文字のUnicode表現にアクセスできます。

### ポインター入力ソース

ポインター入力ソースは、ポインタータイプの入力デバイスに関連付けられた入力ソースです。タイプは`action`コマンドを呼び出すときに指定できます。例：

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse"がデフォルト値、"pen"または"touch"も可能
})
```

これにより、以下のアクションをサポートする`PointerAction`オブジェクトが返されます：

- `down (button: 'left' | 'middle' | 'right')`: 単一のキーを押すアクションを作成します
- `down (params: PointerActionParams)`: 詳細なパラメータを持つ単一のキーを押すアクションを作成します
- `move (x: number, y: number)`: ビューポートから`x`および`y`ピクセル分ポインターを移動するアクションを作成します
- `move (params: PointerActionMoveParams)`: 指定された`origin`から`x`および`y`ピクセル分ポインターを移動するアクションを作成します。`origin`はポインターの現在位置（例：「pointer」）、ビューポート（例：「viewport」）、または特定の要素の中心として定義できます。
- `up (button: 'left' | 'middle' | 'right')`: 単一のキーを離すアクションを作成します
- `up (params: PointerActionUpParams)`: 詳細なパラメータを持つ単一のキーを離すアクションを作成します
- `cancel()`: このポインターの現在の入力をキャンセルするアクション。
- `pause(ms: number)`: 特定のティックの間、入力ソースが何もしないことを示します

[`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35)、[`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42)、[`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)パラメータタイプの詳細情報は、プロジェクトの型定義で確認できます。

### ホイール入力ソース

ホイール入力ソースは、ホイールタイプの入力デバイスに関連付けられた入力ソースです。

```ts
browser.action('wheel')
```

これにより、以下のアクションをサポートする`WheelAction`オブジェクトが返されます：

- `scroll (params: ScrollParams)`: 指定された座標または原点にページをスクロールします
- `pause(ms: number)`: 特定のティックの間、入力ソースが何もしないことを示します

[`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29)パラメータタイプの詳細情報は、プロジェクトの型定義で確認できます。

##### 使用法

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