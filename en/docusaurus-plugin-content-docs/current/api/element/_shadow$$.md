---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Access elements inside a given element's shadowRoot. If you are working
with lots of nested shadow roots, an alternative approach to `shadow$$`
is to use the [deep selector](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO automatically pierces through shadow roots when using `$` or `$$` commands.
This command is only needed if you automate within an environment that doesn't
support WebDriver Bidi yet, e.g. mobile web testing with Appium.

:::

##### Usage

```js
$(selector).shadow$$(selector)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**
    

