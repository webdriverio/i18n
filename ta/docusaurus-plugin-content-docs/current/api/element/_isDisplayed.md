---
id: isDisplayed
title: காட்டப்படுகிறதா
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Return true if the selected DOM-element is displayed (even when the element is outside the viewport). It is using
the [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
method provided by the browser to determine if an element is being displayed or not. Since WebdriverIO acts as a
real user, the default values for the `contentVisibilityAuto`, `opacityProperty`, and `visibilityProperty` flags
are set to `true` to default to a more strict behavior. This means that the command will check if the element is
visible due to the value of its `content-visibility`, `opacity`, and `visibility` properties.

If you want to also verify that the element is also within the viewport, provide the `withinViewport` flag to the command.

:::info

As opposed to other element commands WebdriverIO will not wait for the element
to exist to execute this command.

:::

WebdriverIO, when conducting browser tests, utilizes a [custom script](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
specifically designed to assess the visibility of elements. This script is key in determining whether an
element is displayed on the page. Conversely, for native mobile testing scenarios with Appium, WebdriverIO
defers to the [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
command provided by Appium. This command evaluates the visibility of elements using criteria established by the
underlying Appium driver, ensuring accurate and driver-specific assessments for mobile applications.

##### Usage

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element is within the viewport. `false` by default.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element content-visibility property has (or inherits) the value auto, and it is currently skipping its rendering. `true` by default.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element opacity property has (or inherits) a value of 0. `true` by default.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element is invisible due to the value of its visibility property. `true` by default.</td>
    </tr>
  </tbody>
</table>

##### Examples

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true if element is displayed