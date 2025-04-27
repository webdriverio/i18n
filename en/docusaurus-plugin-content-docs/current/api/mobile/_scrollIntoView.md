---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Scroll element into viewport for Desktop/Mobile Web <strong>AND</strong> Mobile Native Apps.

:::info

Scrolling for Mobile Native Apps is done based on the mobile `swipe` command.

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object, boolean`</td>
      <td>options for `Element.scrollIntoView()`. Default for desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Default for Mobile Native App <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Desktop/Mobile Web Only</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-ONLY</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-ONLY</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-ONLY</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Mobile Native App Only</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Can be one of `down`, `up`, `left` or `right`, default is `up`. <br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The max amount of scrolls until it will stop searching for the element, default is `10`. <br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The duration in milliseconds for the swipe. Default is `1500` ms. The lower the value, the faster the swipe.<br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element that is used to scroll within. If no element is provided it will use the following selector for iOS `-ios predicate string:type == "XCUIElementTypeApplication"` and the following for Android `//android.widget.ScrollView'`. If more elements match the default selector, then by default it will pick the first matching element. <br /> <strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The percentage of the (default) scrollable element to swipe. This is a value between 0 and 1. Default is `0.95`.<br /><strong>NEVER</strong> swipe from the exact top|bottom|left|right of the screen, you might trigger for example the notification bar or other OS/App features which can lead to unexpected results.<br /> <strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```

