---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

டெஸ்க்டாப்/மொபைல் வெப் <strong>மற்றும்</strong> மொபைல் நேட்டிவ் ஆப்ஸ்க்கான எலிமென்ட்டை பார்க்கும் திரைக்கு ஸ்க்ரோல் செய்யும்.

:::info

மொபைல் நேட்டிவ் ஆப்ஸில் ஸ்க்ரோலிங் மொபைல் `swipe` கமாண்டை அடிப்படையாகக் கொண்டு செய்யப்படுகிறது.

இந்த கமாண்ட் பின்வரும் புதுப்பிக்கப்பட்ட கூறுகளுடன் மட்டுமே வேலை செய்யும்:
 - Appium சர்வர் (பதிப்பு 2.0.0 அல்லது அதற்கு மேல்)
 - `appium-uiautomator2-driver` (ஆண்ட்ராய்டுக்கு)
 - `appium-xcuitest-driver` (iOS க்கு)

இணக்கப்பாட்டு சிக்கல்களைத் தவிர்க்க உங்கள் உள்ளூர் அல்லது கிளவுட் அடிப்படையிலான Appium சூழலை தொடர்ந்து புதுப்பித்து வைத்திருப்பதை உறுதி செய்யவும்.

:::

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object, boolean`</td>
      <td>options for `Element.scrollIntoView()`. Default for desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Default for Mobile Native App <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>டெஸ்க்டாப்/மொபைல் வெப் மட்டும்</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>வெப்-மட்டும்</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>வெப்-மட்டும்</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>வெப்-மட்டும்</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>மொபைல் நேட்டிவ் ஆப் மட்டும்</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Can be one of `down`, `up`, `left` or `right`, default is `up`. <br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The max amount of scrolls until it will stop searching for the element, default is `10`. <br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The duration in milliseconds for the swipe. Default is `1500` ms. The lower the value, the faster the swipe.<br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element that is used to scroll within. If no element is provided it will use the following selector for iOS `-ios predicate string:type == "XCUIElementTypeApplication"` and the following for Android `//android.widget.ScrollView'`. If more elements match the default selector, then by default it will pick the first matching element. <br /> <strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The percentage of the (default) scrollable element to swipe. This is a value between 0 and 1. Default is `0.95`.<br /><strong>எப்போதும்</strong> திரையின் மேல்|கீழ்|இடது|வலது முனையிலிருந்து ஸ்வைப் செய்யாதீர்கள், இது அறிவிப்பு பட்டியல் அல்லது பிற OS/ஆப் அம்சங்களைத் தூண்டலாம், இது எதிர்பாராத முடிவுகளுக்கு வழிவகுக்கும்.<br /> <strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டும்</strong></td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

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