---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

An element is considered to be clickable when the following conditions are met:

- the element exists
- the element is displayed
- the element is not disabled
- the element is within the viewport
- the element can be scrolled into the viewport
- the element's center is not overlapped with another element

otherwise return false.

:::info

Please note that `isClickable` works only in web browser and in mobile webviews,
it doesn't work in mobile app native context. Also, As opposed to other element
commands WebdriverIO will not wait for the element to exist to execute this command.

:::

##### Usage

```js
$(selector).isClickable()
```

##### Example

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true if element is clickable    

