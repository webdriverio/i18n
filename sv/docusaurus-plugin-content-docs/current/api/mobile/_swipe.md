---
id: swipe
title: svep
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Swipe in a specific direction within viewport or element for Desktop/Mobile Web <strong>AND</strong> Mobile Native Apps.

:::info

Swiping for Mobile Native Apps is based on the W3C-actions protocol, simulating a finger press and movement.
This is different from the [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) for Android
or [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) for iOS command which is based on the Appium Driver protocol and is
only available for mobile platforms in the NATIVE context.

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

:::

:::caution Swiping based on coordinates

Avoid using `from` and `to` options unless absolutely necessary. These are device-specific and may not work consistently across devices.
Use the `scrollableElement` option for reliable swipes within an element.

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
      <td>options for `browser.swipe()`. Default for desktop/mobile web: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Can be one of `down`, `up`, `left` or `right`, default is `up`. <br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down</strong><br /><strong>Starting Point:</strong><br/>You place your finger towards the top of the screen.<br/><strong>Movement:</strong><br/>You slide your finger downwards towards the bottom of the screen.<br/><strong>Action:</strong><br/>This also varies by context:<br />- On the home screen or in applications, it typically scrolls the content upwards.<br />- From the top edge, it often opens the notifications panel or quick settings.<br />- In browsers or reading apps, it can be used to scroll through content.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left</strong><br /><strong>Starting Point:</strong><br/>You place your finger on the right side of the screen.<br/><strong>Movement:</strong><br/>You slide your finger horizontally to the left.><br/><strong>Action:</strong><br/>The response to this gesture depends on the application:<br />- It can move to the next item in a carousel or a set of images.<br />- In a navigation context, it might go back to the previous page or close the current view.<br />- On the home screen, it usually switches to the next virtual desktop or screen.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right</strong><br /><strong>Starting Point:</strong><br/>You place your finger on the left side of the screen.<br/><strong>Movement:</strong><br/>You slide your finger horizontally to the right.<br/><strong>Action:</strong><br/>Similar to swiping left, but in the opposite direction:<br />-- It often moves to the previous item in a carousel or gallery.<br />- Can be used to open side menus or navigation drawers in apps.<br />- On the home screen, it typically switches to the previous virtual desktop.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up</strong><br /><strong>Starting Point:</strong><br/>You place your finger towards the bottom of the screen.<br/><strong>Movement:</strong><br/>You slide your finger upwards towards the top of the screen.><br/><strong>Action:</strong><br/>Depending on the context, different actions can occur:<br />- On the home screen or in a list, this usually scrolls the content downwards.<br />- In a full-screen app, it might open additional options or the app drawer.<br />- On certain interfaces, it could trigger a 'refresh' action or open a search bar.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The duration in milliseconds for the swipe. Default is `1500` ms. The lower the value, the faster the swipe.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element that is used to swipe within. If no element is provided it will use the following selector for iOS `-ios predicate string:type == "XCUIElementTypeApplication"` and the following for Android `//android.widget.ScrollView'`. If more elements match the default selector, then by default it will pick the first matching element. <br /> <strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The percentage of the (default) scrollable element to swipe. This is a value between 0 and 1. Default is `0.95`.<br /><strong>NEVER</strong> swipe from the exact top|bottom|left|right of the screen, you might trigger for example the notification bar or other OS/App features which can lead to unexpected results.<br />This has no effect if `from` and `to` are provided.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>The below values <strong>ONLY</strong> have an effect if the `scrollableElement` is <strong>NOT</strong> provided, otherwise they are ignored.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>The x and y coordinates of the start of the swipe. If a `scrollableElement` is provided, then these coordinates have no effect.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The x-coordinate of the start of the swipe.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The y-coordinate of the start of the swipe.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>The x and y coordinates of the end of the swipe. If a `scrollableElement` is provided, then these coordinates have no effect.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The x-coordinate of the end of the swipe.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The y-coordinate of the end of the swipe.</td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```