---
id: swipe
title: சுவைப்
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
                      <td colspan="3"><strong>Down</strong><br /><strong>தொடக்க புள்ளி:</strong><br/>திரையின் மேல் பகுதியில் உங்கள் விரலை வைக்கிறீர்கள்.<br/><strong>இயக்கம்:</strong><br/>திரையின் கீழ் பகுதி நோக்கி உங்கள் விரலை கீழே நகர்த்துகிறீர்கள்.<br/><strong>செயல்:</strong><br/>இது சூழலைப் பொறுத்து மாறுபடுகிறது:<br />- முகப்புத் திரையில் அல்லது பயன்பாடுகளில், இது பொதுவாக உள்ளடக்கத்தை மேலே உருட்டுகிறது.<br />- மேல் விளிம்பிலிருந்து, இது பெரும்பாலும் அறிவிப்பு பலகம் அல்லது விரைவு அமைப்புகளைத் திறக்கிறது.<br />- உலாவிகள் அல்லது படிக்கும் பயன்பாடுகளில், உள்ளடக்கத்தை உருட்டப் பயன்படுத்தலாம்.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left</strong><br /><strong>தொடக்க புள்ளி:</strong><br/>திரையின் வலது பக்கத்தில் உங்கள் விரலை வைக்கிறீர்கள்.<br/><strong>இயக்கம்:</strong><br/>உங்கள் விரலை கிடைமட்டமாக இடதுபுறமாக நகர்த்துகிறீர்கள்.><br/><strong>செயல்:</strong><br/>இந்த சைகைக்கான பதில் பயன்பாட்டைப் பொறுத்து அமையும்:<br />- இது கருசெல் அல்லது படங்களின் தொகுப்பில் அடுத்த உருப்படிக்கு நகரலாம்.<br />- வழிசெலுத்தல் சூழலில், இது முந்தைய பக்கத்திற்குத் திரும்பச் செல்லலாம் அல்லது தற்போதைய காட்சியை மூடலாம்.<br />- முகப்புத் திரையில், இது பொதுவாக அடுத்த மெய்நிகர் டெஸ்க்டாப் அல்லது திரைக்கு மாறும்.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right</strong><br /><strong>தொடக்க புள்ளி:</strong><br/>திரையின் இடது பக்கத்தில் உங்கள் விரலை வைக்கிறீர்கள்.<br/><strong>இயக்கம்:</strong><br/>உங்கள் விரலை கிடைமட்டமாக வலதுபுறமாக நகர்த்துகிறீர்கள்.<br/><strong>செயல்:</strong><br/>இடதுபுறமாக சுவைப் செய்வதைப் போலவே, ஆனால் எதிர் திசையில்:<br />-- இது பெரும்பாலும் கருசெல் அல்லது தொகுப்பில் முந்தைய உருப்படிக்கு நகரும்.<br />- பயன்பாடுகளில் பக்க மெனுக்கள் அல்லது வழிசெலுத்தல் இழுப்பதை திறக்கப் பயன்படுத்தலாம்.<br />- முகப்புத் திரையில், இது பொதுவாக முந்தைய மெய்நிகர் டெஸ்க்டாப்பிற்கு மாறும்.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up</strong><br /><strong>தொடக்க புள்ளி:</strong><br/>திரையின் கீழ் பகுதியில் உங்கள் விரலை வைக்கிறீர்கள்.<br/><strong>இயக்கம்:</strong><br/>திரையின் மேல் பகுதி நோக்கி உங்கள் விரலை மேலே நகர்த்துகிறீர்கள்.><br/><strong>செயல்:</strong><br/>சூழலைப் பொறுத்து, வெவ்வேறு செயல்கள் நிகழலாம்:<br />- முகப்புத் திரையில் அல்லது பட்டியலில், இது பொதுவாக உள்ளடக்கத்தை கீழ்நோக்கி உருட்டுகிறது.<br />- முழுத்திரை பயன்பாட்டில், இது கூடுதல் விருப்பங்களையோ அல்லது பயன்பாட்டு இழுப்பையோ திறக்கலாம்.<br />- குறிப்பிட்ட இடைமுகங்களில், இது 'புதுப்பிப்பு' செயலைத் தூண்டலாம் அல்லது தேடல் பட்டியைத் திறக்கலாம்.</td>
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