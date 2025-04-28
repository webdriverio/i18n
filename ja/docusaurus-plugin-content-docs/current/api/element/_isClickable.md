---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

要素が以下の条件を満たすときに、クリック可能であると見なされます：

- 要素が存在する
- 要素が表示されている
- 要素が無効化されていない
- 要素がビューポート内にある
- 要素がビューポートにスクロールして表示できる
- 要素の中心が他の要素と重なっていない

それ以外の場合はfalseを返します。

:::info

`isClickable`はWebブラウザとモバイルのWebビューでのみ機能し、
モバイルアプリのネイティブコンテキストでは機能しないことに注意してください。また、他の要素
コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素の存在を待ちません。

:::

##### 使用法

```js
$(selector).isClickable()
```

##### 例

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             要素がクリック可能な場合はtrue