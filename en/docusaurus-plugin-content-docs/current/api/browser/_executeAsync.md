---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
The `executeAsync` command is deprecated and will be removed in a future version.
Please use the `execute` command instead as it provides better support for
error handling via `async`/`await`.
:::

Inject a snippet of JavaScript into the page for execution in the context of the currently selected
frame. The executed script is assumed to be asynchronous and must signal that is done by invoking
the provided callback, which is always provided as the final argument to the function. The value
to this callback will be returned to the client.

Asynchronous script commands may not span page loads. If an unload event is fired while waiting
for a script result, an error should be returned to the client.

The script argument defines the script to execute in the form of a function body. The function will
be invoked with the provided args array and the values may be accessed via the arguments object
in the order specified. The final argument will always be a callback function that must be invoked
to signal that the script has finished.

Arguments may be any JSON-primitive, array, or JSON object. JSON objects that define a WebElement
reference will be converted to the corresponding DOM element. Likewise, any WebElements in the script
result will be returned to the client as WebElement JSON objects.

:::caution

Please use `execute` instead
:::

##### Usage

```js
browser.executeAsync(script, arguments)
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

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              The script result.    

