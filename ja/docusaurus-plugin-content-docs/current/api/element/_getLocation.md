---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

ページ上の要素の位置を決定します。座標 (0, 0) はページの左上隅を指します。

##### 使用方法

```js
$(selector).getLocation(prop)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>より簡単なアサーションのために直接結果値を取得するための "x" または "y" を指定できます</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### 戻り値

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   ページ上の要素のXおよびY座標 `{x:number, y:number}`