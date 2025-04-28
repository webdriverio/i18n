---
id: click
title: クリック
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

要素をクリックします。

これは選択した要素に対してWebDriverの`click`コマンドを発行します。オプションが渡されていない場合は、一般的に選択した要素までスクロールしてからクリックします。オプションオブジェクトが渡された場合は、webdriverのクリックの代わりにアクションクラスを使用し、ボタンタイプや座標などの追加機能を利用できます。デフォルトでは、オプションを使用する場合、クリックアクション後にリリースアクションコマンドが送信されますが、`option.skipRelease=true`を渡すとこのアクションをスキップできます。

:::info

固定位置の要素（固定ヘッダーやフッターなど）があり、選択した要素がビューポート内にスクロールされた後にその要素を覆ってしまう場合、クリックは指定された座標で発行されますが、固定（重なっている）要素によって受け取られます。このような場合、次のエラーが発生します：

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

この問題を回避するには、重なっている要素を見つけて`execute`コマンドで削除し、クリックを妨げないようにしてください。また、あなたのシナリオに適したオフセットを使用して`scroll`で要素まで自分でスクロールすることもできます。

:::

:::info

クリックコマンドは、モバイルデバイスでの長押しをシミュレートするためにも使用できます。これは`duration`を設定することで行います。詳細については以下の例を参照してください。

:::

##### 使用方法

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>クリックオプション（オプション）</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string, number`</td>
      <td>`[0, "left", 1, "middle", 2, "right"]`のいずれか <br /><strong>WEBのみ</strong>（デスクトップ/モバイル）</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>要素の位置（要素の中心点）から水平方向にX ピクセル離れた位置をクリック<br /><strong>WEBおよびネイティブ</strong>（デスクトップ/モバイル）</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>要素の位置（要素の中心点）から垂直方向にY ピクセル離れた位置をクリック<br /><strong>WEBおよびネイティブ対応</strong>（デスクトップ/モバイル）</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`boolean`</td>
      <td>ブール値（オプション） <br /><strong>WEBのみ</strong>（デスクトップ/モバイル）</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`number`</td>
      <td>クリックの持続時間、「長押し」 <br /><strong>モバイルネイティブアプリのみ</strong>（モバイル）</td>
    </tr>
  </tbody>
</table>

##### 例

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```