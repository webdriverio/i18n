---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

要素の計算されたWAI-ARIAロールを取得します。

##### 使用法

```js
$(selector).getComputedRole()
```

##### 例

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  計算されたWAI-ARIAラベル