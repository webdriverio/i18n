---
id: gecko
title: Firefox (பயர்பாக்ஸ்)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
முழு பக்கத்தின் திரைப்பிடிப்பை எடுக்கிறது.<br /><br />Firefox கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46) காணப்படலாம்.

##### பயன்பாடு

```js
browser.fullPageScreenshot()
```


##### திரும்ப தருவது

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** முழு பக்கத்தின் திரைப்பிடிப்பை உள்ளடக்கிய base64-encoded PNG படத் தரவு.


---

## getMozContext
தற்போது செயலில் உள்ள சூழலை பெறுகிறது, எ.கா. `CHROME` அல்லது `CONTENT`.<br /><br />Firefox கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622) காணப்படலாம்.

##### பயன்பாடு

```js
browser.getMozContext()
```

##### எடுத்துக்காட்டு


```js
console.log(await browser.getMozContext()); // வெளியீடு: 'CHROME'
```


##### திரும்ப தருவது

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** உலாவி சூழல், `CHROME` அல்லது `CONTENT` ஆக இருக்கும்


---

## setMozContext
இலக்கு சூழலை chrome மற்றும் content-க்கு இடையே மாற்றுகிறது.<br /><br />தற்போதைய சூழலை மாற்றுவது அடுத்தடுத்த அனைத்து கட்டளைகளிலும் நிலையான தாக்கத்தை ஏற்படுத்தும். `CONTENT` சூழல் சாதாரண வலை தளத்தின் ஆவண அனுமதிகளைக் கொண்டுள்ளது, நீங்கள் தன்னிச்சையான JavaScript-ஐ மதிப்பீடு செய்வது போல. `CHROME` சூழல் உயர்ந்த அனுமதிகளைப் பெறுகிறது, இது உலாவி chrome-ஐத் தானாகவே கையாள அனுமதிக்கிறது, XUL toolkit-க்கு முழு அணுகலுடன்.<br /><br />Firefox கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645) காணப்படலாம்.

##### பயன்பாடு

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>உலாவி சூழல், `CHROME` அல்லது `CONTENT` ஆக இருக்க வேண்டும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு


```js
console.log(await browser.getMozContext()); // வெளியீடு: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // வெளியீடு: 'CONTENT'
```



---

## installAddOn
தற்போதைய அமர்வில் ஒரு புதிய add-on-ஐ நிறுவுகிறது. இந்த செயல்பாடு ஒரு ID-ஐத் திருப்பித் தரும், இது பின்னர் `uninstallAddon` பயன்படுத்தி add-on-ஐ நீக்க பயன்படுத்தப்படலாம்.<br /><br />Firefox கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668) காணப்படலாம்.

##### பயன்பாடு

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>add on கோப்பின் base64 சரம்</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>விரிவாக்கம் தற்காலிகமாக நிறுவப்பட வேண்டுமா என்பதைக் குறிக்கும் கொடி - மறுதொடக்கத்தின் போது அகற்றப்படும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### திரும்ப தருவது

- **&lt;String&gt;**
            **<code><var>id</var></code>:** புதிதாக நிறுவப்பட்ட add-on-க்கான ID-ஐ தீர்மானிக்கும் ஒரு வாக்குறுதி.


---

## uninstallAddOn
தற்போதைய உலாவி அமர்வின் சுயவிவரத்திலிருந்து ஒரு add-on-ஐ நீக்குகிறது.<br /><br />Firefox கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687) காணப்படலாம்.

##### பயன்பாடு

```js
browser.uninstallAddOn(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>நீக்க வேண்டிய add-on-இன் ID</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```