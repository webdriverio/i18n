---
id: getValue
title: getValue（値を取得）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

指定されたセレクタで見つかった `<textarea>`、`<select>` またはテキスト `<input>` の値を取得します。
複数の要素が指定されたセレクタで見つかった場合は、代わりに値の配列が返されます。
チェックボックスやラジオタイプの入力には isSelected を使用してください。

##### 使用方法

```js
$(selector).getValue()
```

##### 例

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   リクエストされた要素の値