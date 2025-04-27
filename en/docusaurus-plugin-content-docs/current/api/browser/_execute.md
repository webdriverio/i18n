---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
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
browser.execute(script, arguments)
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
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              The script result.    

