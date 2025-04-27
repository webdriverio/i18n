---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Performs a zoom gesture on the given element on the screen.

:::info

Zooming is done based on native mobile gestures. It is only supported for the following drivers:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) for Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) for iOS

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

:::

##### Usage

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Zoom options (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The duration in millisecond of how fast the zoom should be executed, minimal is 500 ms and max is 10000 ms. The default is 1500 ms (1.5 seconds) (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The scale of how big the zoom should be according to the screen. Valid values must be float numbers in range 0..1, where 1.0 is 100% (optional)</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```

