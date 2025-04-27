---
id: execute
title: நிறைவேற்று
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Inject a snippet of JavaScript into the page for execution in the context of the currently selected
frame using the given element as scope, because it is on the element scope it means that WebdriverIO will
automatically wait for the element to exist before executing the script.
The executed script is assumed to be synchronous and the result of evaluating the script is returned to
the client.

The script argument defines the script to execute in the form of a function body. The value returned by
that function will be returned to the client. The function will be invoked with the provided args array
and the values may be accessed via the arguments object in the order specified.

Arguments may be any JSON-primitive, array, or JSON object. JSON objects that define a WebElement
reference will be converted to the corresponding DOM element. Likewise, any WebElements in the script
result will be returned to the client as WebElement JSON objects.

##### Usage

```js
$(selector).execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>The script to execute.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>script arguments</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              The script result.    