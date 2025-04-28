---
id: isExisting
title: وجود داشتن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isExisting.ts
---

برمی‌گرداند true اگر عنصر در DOM وجود داشته باشد.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر نمی‌ماند.

:::

##### استفاده

```js
$(selector).isExisting()
```

##### مثال‌ها

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

##### برمی‌گرداند

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true اگر عنصر(ها) وجود داشته باشند