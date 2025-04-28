---
id: doubleClick
title: ダブルクリック
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/doubleClick.ts
---

要素をダブルクリックします。

##### 使用方法

```js
$(selector).doubleClick()
```

##### 例

```html title="example.html"
<button id="myButton" ondblclick="document.getElementById('someText').innerHTML='I was dblclicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="doubleClick.js"
it('should demonstrate the doubleClick command', async () => {
    const myButton = await $('#myButton')
    await myButton.doubleClick()

    const value = await myButton.getText()
    assert(value === 'I was dblclicked') // true
})
```