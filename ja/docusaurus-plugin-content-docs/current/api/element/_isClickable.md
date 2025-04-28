---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

要素は以下の条件を満たすとクリック可能と見なされます：

- 要素が存在する
- 要素が表示されている
- 要素が無効化されていない
- 要素がビューポート内にある
- 要素がビューポートにスクロールして表示できる
- 要素の中心が他の要素と重なっていない

条件を満たさない場合はfalseを返します。

:::info

`isClickable`はウェブブラウザとモバイルウェブビューでのみ動作し、モバイルアプリのネイティブコンテキストでは動作しないことに注意してください。また、他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

##### 使用方法

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