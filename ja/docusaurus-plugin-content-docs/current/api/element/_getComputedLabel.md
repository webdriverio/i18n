---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

要素の計算されたWAI-ARIAラベルを取得します。

##### 使用方法

```js
$(selector).getComputedLabel()
```

##### 例

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  計算されたWAI-ARIAラベル