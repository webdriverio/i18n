---
id: isDisplayed
title: isDisplayed（表示されているか）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

選択されたDOM要素が表示されている場合にtrueを返します（要素がビューポート外にある場合でも）。これはブラウザが提供する[`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)メソッドを使用して、要素が表示されているかどうかを判断します。WebdriverIOは実際のユーザーのように動作するため、`contentVisibilityAuto`、`opacityProperty`、および`visibilityProperty`フラグのデフォルト値はより厳格な動作にするために`true`に設定されています。つまり、このコマンドは要素が`content-visibility`、`opacity`、および`visibility`プロパティの値によって表示されているかどうかをチェックします。

要素がビューポート内にあるかどうかも確認したい場合は、コマンドに`withinViewport`フラグを提供してください。

:::info

他の要素コマンドとは異なり、WebdriverIOはこのコマンドを実行するために要素が存在するのを待ちません。

:::

WebdriverIOは、ブラウザテストを実行する際に、要素の可視性を評価するために特別に設計された[カスタムスクリプト](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)を利用します。このスクリプトは、要素がページに表示されているかどうかを判断する上で重要です。一方、Appiumによるネイティブモバイルテストのシナリオでは、WebdriverIOはAppiumが提供する[`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)コマンドに委ねています。このコマンドは、基礎となるAppiumドライバーによって確立された基準を使用して要素の可視性を評価し、モバイルアプリケーションの正確かつドライバー固有の評価を保証します。

##### 使用法

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Boolean`</td>
      <td>要素がビューポート内にあるかどうかを確認する場合は`true`。デフォルトは`false`です。</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Boolean`</td>
      <td>要素のcontent-visibilityプロパティが（または継承している）値autoを持ち、現在レンダリングをスキップしているかどうかを確認する場合は`true`。デフォルトは`true`です。</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Boolean`</td>
      <td>要素のopacityプロパティが（または継承している）値0を持つかどうかを確認する場合は`true`。デフォルトは`true`です。</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Boolean`</td>
      <td>要素のvisibilityプロパティの値により非表示になっているかどうかを確認する場合は`true`。デフォルトは`true`です。</td>
    </tr>
  </tbody>
</table>

##### 例

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  要素が表示されている場合はtrue