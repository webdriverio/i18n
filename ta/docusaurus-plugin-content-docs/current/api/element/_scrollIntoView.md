---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

டெஸ்க்டாப்/மொபைல் வெப் <strong>மற்றும்</strong> மொபைல் நேட்டிவ் ஆப்ஸ்க்கான எலிமெண்டை திரையில் தெரியும் வகையில் ஸ்க்ரோல் செய்தல்.

:::info

மொபைல் நேட்டிவ் ஆப்ஸில் ஸ்க்ரோலிங் மொபைல் `swipe` கமாண்டை அடிப்படையாகக் கொண்டது.

:::

##### பயன்பாடு

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
```

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
      <td>`Element.scrollIntoView()`க்கான விருப்பங்கள். டெஸ்க்டாப்/மொபைல் வெப்பிற்கான இயல்புநிலை: <br/> `{ block: 'start', inline: 'nearest' }` <br /> மொபைல் நேட்டிவ் ஆப்பிற்கான இயல்புநிலை <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>டெஸ்க்டாப்/மொபைல் வெப் மட்டும்</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDN குறிப்பு](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) ஐப் பார்க்கவும். <br /><strong>வெப்-மட்டுமே</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDN குறிப்பு](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) ஐப் பார்க்கவும். <br /><strong>வெப்-மட்டுமே</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>[MDN குறிப்பு](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) ஐப் பார்க்கவும். <br /><strong>வெப்-மட்டுமே</strong> (டெஸ்க்டாப்/மொபைல்)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>மொபைல் நேட்டிவ் ஆப் மட்டும்</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>`down`, `up`, `left` அல்லது `right` என இருக்கலாம், இயல்புநிலை `up`. <br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டுமே</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>எலிமெண்டைத் தேடுவதை நிறுத்தும் வரை அதிகபட்ச ஸ்க்ரோல்களின் எண்ணிக்கை, இயல்புநிலை `10`. <br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டுமே</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>ஸ்வைப்பிற்கான கால அளவு மில்லிவினாடிகளில். இயல்புநிலை `1500` மில்லிவினாடிகள். மதிப்பு குறைவாக இருந்தால், ஸ்வைப் வேகமாக இருக்கும்.<br /><strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டுமே</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>உள்ளே ஸ்க்ரோல் செய்ய பயன்படுத்தப்படும் எலிமெண்ட். எந்த எலிமெண்டும் வழங்கப்படாவிட்டால், iOS க்கு `-ios predicate string:type == "XCUIElementTypeApplication"` மற்றும் Android க்கு `//android.widget.ScrollView'` என்ற செலக்டரைப் பயன்படுத்தும். இயல்புநிலை செலக்டருக்கு பல எலிமெண்ட்கள் பொருந்தினால், இயல்பாக முதல் பொருந்தும் எலிமெண்டைத் தேர்ந்தெடுக்கும். <br /> <strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டுமே</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>ஸ்வைப் செய்ய (இயல்புநிலை) ஸ்க்ரோலைபல் எலிமெண்டின் சதவீதம். இது 0 முதல் 1 வரை உள்ள மதிப்பு. இயல்புநிலை `0.95`.<br /><strong>ஒருபோதும்</strong> திரையின் மேலே|கீழே|இடதுபுறம்|வலதுபுறத்திலிருந்து சரியாக ஸ்வைப் செய்யாதீர்கள், அறிவிப்புப் பட்டையை அல்லது பிற OS/ஆப் அம்சங்களை தூண்டக்கூடும், இது எதிர்பாராத முடிவுகளுக்கு வழிவகுக்கும்.<br /> <strong>மொபைல்-நேட்டிவ்-ஆப்-மட்டுமே</strong></td>
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