---
id: isExisting
title: isExisting
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isExisting.ts
---

如果元素存在于DOM中，则返回true。

:::info

与其他元素命令不同，WebdriverIO在执行此命令时不会等待元素存在。

:::

##### 用法

```js
$(selector).isExisting()
```

##### 示例

```html title="index.html"
<div id="notDisplayed" style="display: none"></div>
<div id="notVisible" style="visibility: hidden"></div>
<div id="notInViewport" style="position:absolute; left: 9999999"></div>
<div id="zeroOpacity" style="opacity: 0"></div>
```

```js title="isExisting.js"
it('should detect if elements are existing', async () => {
    let elem = await $('#someRandomNonExistingElement')
    let isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: false

    elem = await $('#notDisplayed')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notVisible')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notInViewport')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#zeroOpacity')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             如果元素存在则返回true