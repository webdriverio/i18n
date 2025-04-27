---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Performs a tap gesture on:
- or the given element. It will **automatically scroll** if it can't be found.
- or the screen on a mobile device by providing `x` and `y` coordinates

Internally it uses:
- Element tap:
     - the `click` command for Web environments (Chrome/Safari browsers, or hybrid apps)
     - the Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
or iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) for Natives apps, including the `scrollIntoView`
command for automatic scrolling
- Screen tap:
     - the `action` command for Web environments (Chrome/Safari browsers, or hybrid apps)
     - the Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
or iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) for Natives apps

This difference makes the `tap` command a more reliable alternative to the `click` command for mobile apps.

For Native Apps, this command differs from the `click` command as it will <strong>automatically swipe</strong> to the element using the `scrollIntoView command`,
which is not supported for native apps with the `click` command. In hybrid apps or web environments, automatic scrolling is supported for both `click` and `tap` commands.

:::info

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

:::

:::caution For Screen taps

If you want to tap on a specific coordinate on the screen and you use a screenshot to determine the coordinates, remember that the
the coordinates for iOS are based on the device's screen size, and not the screenshot size. The screenshot size is larger due to the device pixel ratio.
The average device pixel ratio until the iPhone 8 and the current iPads is 2, for iPhones from the iPhone X the ratio is 3. This means that the screenshot
size is 2 or 3 times larger than the device's screen size which means that ff you find the coordinates on the screenshot, divide them by the device pixel
ratio to get the correct screen coordinates. For example:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Example for iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

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
      <td>`TapOptions`</td>
      <td>Tap options (optional)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Element tap options</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Number (optional, mandatory if y is set) <br /><strong>Only for SCREEN tap, not for ELEMENT tap</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Number (optional, mandatory if x is set) <br /><strong>Only for SCREEN tap, not for ELEMENT tap</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Screen tap options</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Can be one of `down`, `up`, `left` or `right`, default is `down`. <br /><strong>Only for ELEMENT tap, not for SCREEN tap</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The max amount of scrolls until it will stop searching for the element, default is `10`. <br /><strong>Only for ELEMENT tap, not for SCREEN tap</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element that is used to scroll within. If no element is provided it will use the following selector for iOS `-ios predicate string:type == "XCUIElementTypeApplication"` and the following for Android `//android.widget.ScrollView'`. If more elements match the default selector, then by default it will pick the first matching element. <br /><strong>Only for ELEMENT tap, not for SCREEN tap</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```

