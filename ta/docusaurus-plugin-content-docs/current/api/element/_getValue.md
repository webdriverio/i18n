---
id: getValue
title: getValue பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

கொடுக்கப்பட்ட தேர்வியால் கண்டறியப்பட்ட `<textarea>`, `<select>` அல்லது `<input>` உரை-ன் மதிப்பைப் பெறுங்கள்.
கொடுக்கப்பட்ட தேர்வியால் பல உறுப்புகள் கண்டறியப்பட்டால், மதிப்புகளின் வரிசை திருப்பி அனுப்பப்படும்.
செக்பாக்ஸ் அல்லது ரேடியோ வகை உள்ளீட்டிற்கு isSelected பயன்படுத்துங்கள்.

##### பயன்பாடு

```js
$(selector).getValue()
```

##### எடுத்துக்காட்டுகள்

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### திரும்பப் பெறுபவை

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   கோரப்பட்ட உறுப்பு(கள்) மதிப்பு