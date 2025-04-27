---
id: isExisting
title: இருப்பதைச் சரிபார்த்தல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isExisting.ts
---

DOM-இல் உறுப்பு இருக்கிறதா என்பதை சரிபார்க்க `true` என்ற மதிப்பை திருப்பி அனுப்புகிறது.

:::info

மற்ற உறுப்பு கட்டளைகளுக்கு மாறாக, இந்த கட்டளையை செயல்படுத்த WebdriverIO உறுப்பு இருப்பதற்காக காத்திருக்காது.

:::

##### பயன்பாடு

```js
$(selector).isExisting()
```

##### எடுத்துக்காட்டுகள்

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

##### திருப்பி அனுப்புவது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             உறுப்பு(கள்) இருந்தால் true என்ற மதிப்பைத் திருப்பி அனுப்பும்