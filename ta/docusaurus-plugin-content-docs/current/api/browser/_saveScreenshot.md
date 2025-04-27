---
id: saveScreenshot
title: திரைப்பிடிப்பைச் சேமி
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

உங்கள் இயக்க முறைமையில் தற்போதைய உலாவல் சூழலின் திரைப்பிடிப்பை PNG கோப்பாக சேமிக்கவும். சில உலாவி இயக்கிகள் முழு ஆவணத்தின் திரைப்பிடிப்புகளை எடுக்கும் (எ.கா. Firefox உடன் Geckodriver) மற்றும் மற்றவை தற்போதைய பார்வை திரையை மட்டுமே (எ.கா. Chrome உடன் Chromedriver) என்பதை கவனத்தில் கொள்ளவும்.

##### பயன்பாடு

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>உருவாக்கப்பட்ட படத்திற்கான பாதை (`.png` பின்னொட்டு தேவை) இயக்க அடைவிற்கு தொடர்புடையது</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>திரைப்பிடிப்பு விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>முழு பக்கத்தின் திரைப்பிடிப்பை எடுக்க வேண்டுமா அல்லது தற்போதைய பார்வை திரையை மட்டுமா</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>திரைப்பிடிப்பின் வடிவம் (`png` அல்லது `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>JPEG வடிவத்தில் திரைப்பிடிப்பின் தரம் 0-100 சதவீதம் வரம்பில்</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>திரைப்பிடிப்பின் செவ்வக வெட்டு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="saveScreenshot.js"
it('should save a screenshot of the browser viewport', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png');
});

it('should save a screenshot of the full page', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { fullPage: true });
});

it('should save a screenshot of a specific rectangle', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { clip: { x: 0, y: 0, width: 100, height: 100 } });
});

it('should save a screenshot of the full page in JPEG format', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg' });
});

it('should save a screenshot of the full page in JPEG format with quality 50', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg', quality: 50 });
});

 running from a hook, make sure to explicitly define the hook as async:

```

```js title="wdio.conf.js"
afterTest: async function(test) {
    await browser.saveScreenshot('./some/path/screenshot.png');
}
```

##### திரும்பப் பெறுபவை

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             திரைப்பிடிப்பு பஃபர்