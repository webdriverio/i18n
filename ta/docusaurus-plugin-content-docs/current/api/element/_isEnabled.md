---
id: isEnabled
title: இயக்கப்பட்டுள்ளதா
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEnabled.ts
---

தேர்ந்தெடுக்கப்பட்ட DOM-உறுப்பு இயக்கப்பட்டுள்ளதா என்பதை உண்மை அல்லது பொய் என திருப்பி அனுப்பும்.

##### பயன்பாடு

```js
$(selector).isEnabled()
```

##### எடுத்துக்காட்டுகள்

```html title="index.html"
<input type="text" name="inputField" class="input1">
<input type="text" name="inputField" class="input2" disabled>
<input type="text" name="inputField" class="input3" disabled="disabled">

```

```js title="isEnabled.js"
it('should detect if an element is enabled', async () => {
    let elem = await $('.input1')
    let isEnabled = await elem.isEnabled();
    console.log(isEnabled); // outputs: true

    elem = await $('.input2')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled2); // outputs: false

    elem = await $('.input3')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled3); // outputs: false
});
```

##### பெறுகிறது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  உறுப்பு(கள்) இயக்கப்பட்டிருந்தால் உண்மை