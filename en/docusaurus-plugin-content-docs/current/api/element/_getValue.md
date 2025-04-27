---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Get the value of a `<textarea>`, `<select>` or text `<input>` found by given selector.
If multiple elements are found via the given selector, an array of values is returned instead.
For input with checkbox or radio type use isSelected.

##### Usage

```js
$(selector).getValue()
```

##### Examples

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

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   requested element(s) value    

